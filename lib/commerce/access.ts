import { requireAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/supabase/server";
import { getProduct, type Product } from "@/products";

export async function getCustomerForUser() {
  const user = await getAuthUser();
  if (!user?.email) return { user: null, customer: null };
  try {
    const admin = requireAdminClient();
    const { data: customer } = await admin
      .from("customers")
      .select("id, email, name, phone, country, last_purchase_at, created_at")
      .eq("email_normalized", user.email.toLowerCase())
      .maybeSingle();
    return { user, customer };
  } catch {
    return { user, customer: null };
  }
}

/**
 * Access is decided by an active entitlement row, not by Razorpay payment state.
 */
export async function hasEntitlement(product: Product, customerId: string | null) {
  if (!customerId) return false;
  try {
    const admin = requireAdminClient();
    const { data } = await admin
      .from("entitlements")
      .select("id")
      .eq("customer_id", customerId)
      .eq("product_id", product.id)
      .eq("status", "active")
      .maybeSingle();
    return Boolean(data);
  } catch {
    return false;
  }
}

export async function requireProductEntitlement(slug: string) {
  const product = getProduct(slug);
  const { user, customer } = await getCustomerForUser();
  if (!product || !user) return { product, user, customer, entitled: false };
  const entitled = await hasEntitlement(product, customer?.id ?? null);
  return { product, user, customer, entitled };
}
