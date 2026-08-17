import { z } from "zod";
import { NextResponse } from "next/server";
import {
  hasRazorpayKeys,
  hasSupabaseAdmin,
  isCommerceConfigured,
  razorpayKeyId,
} from "@/lib/commerce/config";
import { createRazorpayOrder } from "@/lib/commerce/razorpay";
import { requireAdminClient } from "@/lib/supabase/admin";
import { upsertCatalogProduct, upsertCustomer } from "@/lib/commerce/fulfill";
import { recordCheckoutConsent } from "@/lib/commerce/subscribers";
import { getProductById } from "@/products";
import { canSell } from "@/products/commerce";

const bodySchema = z.object({
  productId: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1).max(120),
  phone: z.string().min(8).max(20),
  marketingOptIn: z.boolean().optional(),
  country: z.string().max(80).optional(),
  utm: z.record(z.string(), z.string()).optional(),
});

export async function POST(request: Request) {
  if (!isCommerceConfigured() || !hasRazorpayKeys() || !hasSupabaseAdmin()) {
    return NextResponse.json(
      { error: "Checkout is not configured yet. Message on WhatsApp instead." },
      { status: 503 },
    );
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Check name, email, and phone." }, { status: 400 });
  }

  const product = getProductById(parsed.data.productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  if (!canSell(product)) {
    return NextResponse.json({ error: "This product is not for sale yet." }, { status: 409 });
  }

  const admin = requireAdminClient();
  await upsertCatalogProduct(admin, product);
  const customer = await upsertCustomer(admin, {
    email: parsed.data.email,
    name: parsed.data.name,
    phone: parsed.data.phone,
    country: parsed.data.country,
  });

  await recordCheckoutConsent(admin, {
    customerId: customer.id,
    email: customer.email,
    optedIn: Boolean(parsed.data.marketingOptIn),
  });

  const amountPaise = product.price * 100;
  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      customer_id: customer.id,
      status: "pending",
      currency: product.currency,
      subtotal: product.price,
      total: product.price,
      payment_provider: "razorpay",
    })
    .select("id")
    .single();
  if (orderError || !order) {
    return NextResponse.json({ error: "Could not create order." }, { status: 500 });
  }

  await admin.from("order_items").insert({
    order_id: order.id,
    product_id: product.id,
    product_name_snapshot: product.name,
    unit_price_snapshot: product.price,
    quantity: 1,
  });

  try {
    const razorpayOrder = await createRazorpayOrder({
      amountPaise,
      currency: product.currency,
      receipt: order.id.replaceAll("-", "").slice(0, 40),
      notes: {
        orderId: order.id,
        productId: product.id,
        slug: product.slug,
        utm: JSON.stringify(parsed.data.utm ?? {}),
      },
    });

    await admin
      .from("orders")
      .update({ razorpay_order_id: razorpayOrder.id, updated_at: new Date().toISOString() })
      .eq("id", order.id);

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: razorpayKeyId(),
      productName: product.name,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
    });
  } catch (error) {
    await admin.from("orders").update({ status: "failed", updated_at: new Date().toISOString() }).eq("id", order.id);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not start checkout." },
      { status: 502 },
    );
  }
}
