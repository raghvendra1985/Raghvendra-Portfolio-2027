import { randomUUID } from "node:crypto";
import { requireAdminClient } from "@/lib/supabase/admin";
import { publicSiteUrl } from "@/lib/commerce/config";
import { purchaseConfirmedMarkup } from "@/lib/commerce/email";
import { upsertCatalogProduct, upsertCustomer } from "@/lib/commerce/fulfill";
import { getProduct, type Product } from "@/products";
import { productAccessHref } from "@/products/commerce";

export const SIMULATION_PROVIDER = "simulation";

export function isSimulationProvider(value: string | null | undefined) {
  return value === SIMULATION_PROVIDER;
}

export function purchaseEmailSubject(productName: string) {
  return `Your ${productName} is ready`;
}

export function previewPurchaseEmail(input: {
  name: string | null;
  product: Product;
  orderId: string;
}) {
  const accessHref = `${publicSiteUrl()}${productAccessHref(input.product)}`;
  return {
    subject: purchaseEmailSubject(input.product.name),
    html: purchaseConfirmedMarkup({
      name: input.name,
      productName: input.product.name,
      amount: input.product.price,
      orderId: input.orderId,
      accessHref,
      download: input.product.deliveryType !== "app",
    }),
    accessHref,
    libraryHref: `${publicSiteUrl()}/account/library`,
  };
}

/**
 * Creates a clearly labeled simulated purchase for the logged-in admin.
 * Does not call Razorpay, Resend, or marketing consent.
 */
export async function simulatePurchase(input: {
  slug: string;
  email: string;
  name?: string | null;
}) {
  const product = getProduct(input.slug);
  if (!product) throw new Error("Unknown product");

  const admin = requireAdminClient();
  await upsertCatalogProduct(admin, product);
  const customer = await upsertCustomer(admin, {
    email: input.email,
    name: input.name ?? undefined,
  });

  const now = new Date().toISOString();
  const simOrderId = `sim_${randomUUID()}`;
  const simPaymentId = `sim_pay_${randomUUID()}`;

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      customer_id: customer.id,
      status: "paid",
      currency: product.currency,
      subtotal: product.price,
      total: product.price,
      razorpay_order_id: simOrderId,
      razorpay_payment_id: simPaymentId,
      payment_provider: SIMULATION_PROVIDER,
      paid_at: now,
    })
    .select("id")
    .single();
  if (orderError) throw orderError;

  const { error: itemError } = await admin.from("order_items").insert({
    order_id: order.id,
    product_id: product.id,
    product_name_snapshot: product.name,
    unit_price_snapshot: product.price,
    quantity: 1,
  });
  if (itemError) throw itemError;

  const { error: payError } = await admin.from("payments").insert({
    order_id: order.id,
    provider: SIMULATION_PROVIDER,
    provider_order_id: simOrderId,
    provider_payment_id: simPaymentId,
    amount: product.price,
    currency: product.currency,
    status: "simulated",
    payload_reference: "prelaunch-simulation",
  });
  if (payError && payError.code !== "23505") throw payError;

  const { data: existing } = await admin
    .from("entitlements")
    .select("id")
    .eq("customer_id", customer.id)
    .eq("product_id", product.id)
    .eq("status", "active")
    .maybeSingle();

  let entitlementId = existing?.id as string | undefined;
  if (!entitlementId) {
    const { data: entitlement, error: entitlementError } = await admin
      .from("entitlements")
      .insert({
        customer_id: customer.id,
        product_id: product.id,
        order_id: order.id,
        status: "active",
        granted_at: now,
        expires_at: null,
        version: product.version,
      })
      .select("id")
      .single();
    if (entitlementError) throw entitlementError;
    entitlementId = entitlement.id as string;
  }

  const email = previewPurchaseEmail({
    name: customer.name,
    product,
    orderId: order.id,
  });

  await admin.from("email_events").insert({
    customer_id: customer.id,
    order_id: order.id,
    product_id: product.id,
    type: "purchase_confirmation",
    provider_message_id: null,
    status: "simulated",
  });

  return {
    orderId: order.id as string,
    customerId: customer.id as string,
    entitlementId,
    product,
    email,
    simulated: true as const,
  };
}
