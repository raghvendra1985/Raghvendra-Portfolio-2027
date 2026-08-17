export type CommerceMode = "whatsapp" | "test" | "live";

function readMode(): CommerceMode {
  const value = (process.env.NEXT_PUBLIC_COMMERCE_MODE ?? process.env.COMMERCE_MODE ?? "whatsapp")
    .trim()
    .toLowerCase();
  if (value === "test" || value === "live" || value === "whatsapp") return value;
  return "whatsapp";
}

export function commerceMode(): CommerceMode {
  return readMode();
}

export function publicSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://raghvendrasingh.com").replace(/\/$/, "");
}

export function razorpayKeyId() {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
}

export function razorpayKeySecret() {
  return process.env.RAZORPAY_KEY_SECRET ?? "";
}

export function razorpayWebhookSecret() {
  return process.env.RAZORPAY_WEBHOOK_SECRET ?? "";
}

export function supabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

export function supabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
}

export function supabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
}

export function resendApiKey() {
  return process.env.RESEND_API_KEY ?? "";
}

export function emailFrom() {
  return process.env.EMAIL_FROM ?? "Raghvendra Singh <hello@raghvendrasingh.com>";
}

export function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  return adminEmails().includes(email.trim().toLowerCase());
}

export function hasRazorpayKeys() {
  return Boolean(razorpayKeyId() && razorpayKeySecret());
}

export function hasSupabaseAdmin() {
  return Boolean(supabaseUrl() && supabaseServiceRoleKey());
}

export function hasSupabaseAuth() {
  return Boolean(supabaseUrl() && supabaseAnonKey());
}

export function isCommerceConfigured() {
  const mode = commerceMode();
  if (mode === "whatsapp") return false;
  return hasRazorpayKeys() && hasSupabaseAdmin();
}

export function isClientCheckoutEnabled() {
  const mode = commerceMode();
  return (mode === "test" || mode === "live") && Boolean(razorpayKeyId());
}

export function storageBucket() {
  return "product-deliverables";
}
