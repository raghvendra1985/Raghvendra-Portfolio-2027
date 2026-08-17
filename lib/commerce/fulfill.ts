import { requireAdminClient } from "@/lib/supabase/admin";
import { publicSiteUrl } from "@/lib/commerce/config";
import { sendPurchaseEmail, sendRefundEmail } from "@/lib/commerce/email";
import { normalizeEmail } from "@/lib/commerce/normalize";
import { syncOptedInBuyerToResend } from "@/lib/commerce/subscribers";
import { getProductById, type Product } from "@/products";
import { productAccessHref } from "@/products/commerce";

type Admin = ReturnType<typeof requireAdminClient>;

export async function upsertCatalogProduct(admin: Admin, product: Product) {
  const { error } = await admin.from("products").upsert(
    {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      status: product.status,
      delivery_type: product.deliveryType,
      version: product.version,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
  if (error) throw error;
}

export async function upsertCustomer(
  admin: Admin,
  input: { email: string; name?: string; phone?: string; country?: string },
) {
  const email_normalized = normalizeEmail(input.email);
  const { data: existing, error: readError } = await admin
    .from("customers")
    .select("id, name, phone, country")
    .eq("email_normalized", email_normalized)
    .maybeSingle();
  if (readError) throw readError;
  if (existing) {
    const { data, error } = await admin
      .from("customers")
      .update({
        email: input.email.trim(),
        name: input.name || existing.name,
        phone: input.phone || existing.phone,
        country: input.country || existing.country,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select("id, email, name")
      .single();
    if (error) throw error;
    return data;
  }
  const { data, error } = await admin
    .from("customers")
    .insert({
      email: input.email.trim(),
      email_normalized,
      name: input.name ?? null,
      phone: input.phone ?? null,
      country: input.country ?? null,
    })
    .select("id, email, name")
    .single();
  if (error) throw error;
  return data;
}

async function recordEvent(admin: Admin, id: string, source: string) {
  const { error } = await admin.from("processed_events").insert({ id, source });
  if (error && error.code !== "23505") throw error;
  return error?.code !== "23505";
}

/**
 * Razorpay confirms that money moved. Ownership is granted here, on our
 * `orders` + `entitlements` rows — never by reading Razorpay as a database.
 * `razorpay_order_id` / `razorpay_payment_id` are correlation keys only.
 */
export async function fulfillPaidOrder(input: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  eventId: string;
  country?: string;
}) {
  const admin = requireAdminClient();
  const first = await recordEvent(admin, input.eventId, "razorpay");
  const { data: order, error: orderError } = await admin
    .from("orders")
    .select("id, customer_id, status, total, razorpay_payment_id")
    .eq("razorpay_order_id", input.razorpayOrderId)
    .maybeSingle();
  if (orderError) throw orderError;
  if (!order) throw new Error("Order not found");

  if (order.status === "paid" && order.razorpay_payment_id) {
    try {
      await syncOptedInBuyerToResend(order.customer_id);
    } catch (error) {
      console.error("Resend subscriber sync failed", error);
    }
    return { orderId: order.id as string, alreadyPaid: true };
  }

  const now = new Date().toISOString();
  const { error: payError } = await admin.from("payments").upsert(
    {
      order_id: order.id,
      provider: "razorpay",
      provider_order_id: input.razorpayOrderId,
      provider_payment_id: input.razorpayPaymentId,
      amount: order.total,
      currency: "INR",
      status: "captured",
      payload_reference: input.eventId,
      updated_at: now,
    },
    { onConflict: "provider_payment_id" },
  );
  if (payError && payError.code !== "23505") throw payError;

  const { error: updateError } = await admin
    .from("orders")
    .update({
      status: "paid",
      razorpay_payment_id: input.razorpayPaymentId,
      paid_at: now,
      updated_at: now,
    })
    .eq("id", order.id);
  if (updateError) throw updateError;

  const { data: items, error: itemsError } = await admin
    .from("order_items")
    .select("product_id, product_name_snapshot, unit_price_snapshot")
    .eq("order_id", order.id);
  if (itemsError) throw itemsError;

  const { data: customer, error: customerError } = await admin
    .from("customers")
    .select("id, email, name, country")
    .eq("id", order.customer_id)
    .single();
  if (customerError) throw customerError;

  if (input.country) {
    await admin.from("customers").update({ country: input.country, last_purchase_at: now, updated_at: now }).eq("id", customer.id);
  } else {
    await admin.from("customers").update({ last_purchase_at: now, updated_at: now }).eq("id", customer.id);
  }

  for (const item of items ?? []) {
    const product = getProductById(item.product_id);
    const { data: existing } = await admin
      .from("entitlements")
      .select("id, status")
      .eq("customer_id", customer.id)
      .eq("product_id", item.product_id)
      .eq("status", "active")
      .maybeSingle();
    if (!existing) {
      const { error: entitlementError } = await admin.from("entitlements").insert({
        customer_id: customer.id,
        product_id: item.product_id,
        order_id: order.id,
        status: "active",
        granted_at: now,
        expires_at: null,
        version: product?.version ?? "1.0",
      });
      if (entitlementError && entitlementError.code !== "23505") throw entitlementError;
    }

    const { data: alreadyMailed } = await admin
      .from("email_events")
      .select("id")
      .eq("order_id", order.id)
      .eq("type", "purchase_confirmation")
      .maybeSingle();

    if (!alreadyMailed && product) {
      try {
        const sent = await sendPurchaseEmail({
          to: customer.email,
          name: customer.name,
          productName: product.name,
          amount: item.unit_price_snapshot,
          orderId: order.id,
          accessHref: `${publicSiteUrl()}${productAccessHref(product)}`,
          download: product.deliveryType !== "app",
        });
        await admin.from("email_events").insert({
          customer_id: customer.id,
          order_id: order.id,
          product_id: product.id,
          type: "purchase_confirmation",
          provider_message_id: sent.id,
          status: sent.skipped ? "skipped" : "sent",
        });
      } catch (error) {
        await admin.from("email_events").insert({
          customer_id: customer.id,
          order_id: order.id,
          product_id: product.id,
          type: "purchase_confirmation",
          status: "failed",
        });
        console.error("Purchase email failed", error);
      }
    }
  }

  try {
    await syncOptedInBuyerToResend(customer.id);
  } catch (error) {
    console.error("Resend subscriber sync failed", error);
  }

  return { orderId: order.id as string, alreadyPaid: !first };
}

export async function markOrderFailed(razorpayOrderId: string) {
  const admin = requireAdminClient();
  await admin
    .from("orders")
    .update({ status: "failed", updated_at: new Date().toISOString() })
    .eq("razorpay_order_id", razorpayOrderId)
    .eq("status", "pending");
}

export async function refundPaidOrder(input: {
  razorpayPaymentId: string;
  eventId: string;
}) {
  const admin = requireAdminClient();
  await recordEvent(admin, input.eventId, "razorpay-refund");
  const { data: order, error } = await admin
    .from("orders")
    .select("id, customer_id")
    .eq("razorpay_payment_id", input.razorpayPaymentId)
    .maybeSingle();
  if (error) throw error;
  if (!order) return { ok: false };

  const now = new Date().toISOString();
  await admin.from("orders").update({ status: "refunded", updated_at: now }).eq("id", order.id);
  await admin.from("payments").update({ status: "refunded", updated_at: now }).eq("order_id", order.id);
  await admin
    .from("entitlements")
    .update({ status: "refunded", updated_at: now })
    .eq("order_id", order.id);

  const { data: customer } = await admin
    .from("customers")
    .select("email, name")
    .eq("id", order.customer_id)
    .single();
  const { data: items } = await admin
    .from("order_items")
    .select("product_name_snapshot, product_id")
    .eq("order_id", order.id);

  const productName = items?.[0]?.product_name_snapshot ?? "your product";
  if (customer?.email) {
    try {
      const sent = await sendRefundEmail({
        to: customer.email,
        name: customer.name,
        productName,
        orderId: order.id,
      });
      await admin.from("email_events").insert({
        customer_id: order.customer_id,
        order_id: order.id,
        product_id: items?.[0]?.product_id ?? null,
        type: "refund",
        provider_message_id: sent.id,
        status: sent.skipped ? "skipped" : "sent",
      });
    } catch (error) {
      console.error("Refund email failed", error);
    }
  }
  return { ok: true };
}
