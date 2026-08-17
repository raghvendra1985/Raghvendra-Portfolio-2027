import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail, publicSiteUrl } from "@/lib/commerce/config";
import { sendAccessEmail } from "@/lib/commerce/email";
import { upsertCatalogProduct } from "@/lib/commerce/fulfill";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/supabase/server";
import { getProductById } from "@/products";
import { productAccessHref } from "@/products/commerce";

const bodySchema = z.object({
  customerId: z.string(),
  productId: z.string(),
  action: z.enum(["grant", "revoke"]),
});

async function requireAdmin() {
  const user = await getAuthUser();
  if (!user?.email || !isAdminEmail(user.email)) return null;
  return user;
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const product = getProductById(parsed.data.productId);
  if (!product) return NextResponse.json({ error: "Product missing" }, { status: 404 });
  const admin = requireAdminClient();
  await upsertCatalogProduct(admin, product);
  const now = new Date().toISOString();
  if (parsed.data.action === "revoke") {
    await admin
      .from("entitlements")
      .update({ status: "revoked", updated_at: now })
      .eq("customer_id", parsed.data.customerId)
      .eq("product_id", parsed.data.productId)
      .eq("status", "active");
    return NextResponse.json({ ok: true });
  }
  const { data: paid } = await admin
    .from("orders")
    .select("id")
    .eq("customer_id", parsed.data.customerId)
    .eq("status", "paid")
    .limit(1)
    .maybeSingle();
  let orderId = paid?.id as string | undefined;
  if (!orderId) {
    const { data: order } = await admin
      .from("orders")
      .insert({
        customer_id: parsed.data.customerId,
        status: "paid",
        currency: "INR",
        subtotal: 0,
        total: 0,
        payment_provider: "admin",
        paid_at: now,
      })
      .select("id")
      .single();
    orderId = order?.id;
  }
  if (!orderId) return NextResponse.json({ error: "Could not grant." }, { status: 500 });
  await admin.from("entitlements").insert({
    customer_id: parsed.data.customerId,
    product_id: product.id,
    order_id: orderId,
    status: "active",
    granted_at: now,
    version: product.version,
  });
  const { data: customer } = await admin.from("customers").select("email, name").eq("id", parsed.data.customerId).single();
  if (customer?.email) {
    await sendAccessEmail({
      to: customer.email,
      name: customer.name,
      productName: product.name,
      accessHref: `${publicSiteUrl()}${productAccessHref(product)}`,
      download: product.deliveryType !== "app",
    });
  }
  return NextResponse.json({ ok: true });
}
