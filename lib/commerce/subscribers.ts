import { firstNameFrom, normalizeEmail } from "@/lib/commerce/normalize";
import { resendApiKey } from "@/lib/commerce/config";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getProductById } from "@/products";

type Admin = ReturnType<typeof requireAdminClient>;

/**
 * Buyer: a row in `customers` (created at checkout, confirmed on paid order).
 * Subscriber: opted-in marketing consent. Only subscribers are synced to Resend
 * Contacts/Segments. Purchase emails do not create promotional contacts.
 */
export async function syncOptedInBuyerToResend(customerId: string) {
  const key = resendApiKey();
  if (!key) return { skipped: true as const, reason: "no-resend-key" };

  const admin = requireAdminClient();
  const { data: consent } = await admin
    .from("marketing_consents")
    .select("status")
    .eq("customer_id", customerId)
    .eq("consent_type", "product_updates")
    .maybeSingle();

  if (consent?.status !== "opted_in") {
    return { skipped: true as const, reason: "buyer-not-subscriber" };
  }

  const { data: customer } = await admin
    .from("customers")
    .select("email, name")
    .eq("id", customerId)
    .maybeSingle();
  if (!customer?.email) return { skipped: true as const, reason: "no-customer" };

  const { data: entitlements } = await admin
    .from("entitlements")
    .select("product_id")
    .eq("customer_id", customerId)
    .eq("status", "active");
  const owned = (entitlements ?? [])
    .map((row) => getProductById(row.product_id)?.slug)
    .filter((slug): slug is string => Boolean(slug));

  if (!owned.length) {
    return { skipped: true as const, reason: "not-yet-a-buyer" };
  }

  const { count: paidCount } = await admin
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("customer_id", customerId)
    .eq("status", "paid");

  const properties: Record<string, string> = {
    role: "subscriber",
    buyer: "true",
    products: owned.join(","),
    repeat_buyer: (paidCount ?? 0) > 1 ? "true" : "false",
    segment_all_customers: "true",
    segment_student_product_buyers: "true",
  };
  for (const slug of owned) {
    properties[`owns_${slug.replaceAll("-", "_")}`] = "true";
  }

  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: normalizeEmail(customer.email),
      first_name: firstNameFrom(customer.name),
      unsubscribed: false,
      properties,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json()) as { message?: string };
    throw new Error(payload.message ?? "Resend contact sync failed");
  }
  return { skipped: false as const };
}

export async function recordCheckoutConsent(
  admin: Admin,
  input: { customerId: string; email: string; optedIn: boolean },
) {
  if (!input.optedIn) return;
  const now = new Date().toISOString();
  await admin.from("marketing_consents").upsert(
    {
      customer_id: input.customerId,
      email: input.email,
      consent_type: "product_updates",
      status: "opted_in",
      source: "checkout",
      consented_at: now,
      revoked_at: null,
      updated_at: now,
    },
    { onConflict: "customer_id,consent_type" },
  );
}
