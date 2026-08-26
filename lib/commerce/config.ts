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

const AUTHENTICATED_FROM =
  "Raghvendra Singh Portfolio <portfolio@raghvendrasingh.com>";
const APPROVED_FROM_MAILBOX = "portfolio@raghvendrasingh.com";
const SMTP_AUTH_MAILBOX = "hello@growingwithkid.com";
const CONTACT_INBOX = "hello@raghvendrasingh.com";

function unwrapEnv(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

/** Parse a From/To header to a single mailbox. Rejects lists, nested angles, and header injection. */
function parsedMailbox(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || /[\r\n,]/.test(trimmed)) return null;
  const angled = trimmed.match(/^[^<>]*<([^<>]+)>\s*$/);
  const mailbox = (angled ? angled[1] : trimmed).trim().toLowerCase();
  if (!/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(mailbox)) return null;
  return mailbox;
}

/** Authenticated sender identity. Never the visitor. Contact sends via Workspace SMTP. */
export function emailFrom() {
  return unwrapEnv(process.env.EMAIL_FROM) || AUTHENTICATED_FROM;
}

/** Inbox that receives contact inquiries. Distinct from the From identity. */
export function emailTo() {
  return unwrapEnv(process.env.EMAIL_TO) || CONTACT_INBOX;
}

export function isAuthenticatedFromAddress(from = emailFrom()) {
  return parsedMailbox(from) === APPROVED_FROM_MAILBOX;
}

export function isApprovedContactInbox(to = emailTo()) {
  return parsedMailbox(to) === CONTACT_INBOX;
}

export function smtpHost() {
  return unwrapEnv(process.env.SMTP_HOST) || "smtp.gmail.com";
}

export function smtpPort() {
  const parsed = Number(unwrapEnv(process.env.SMTP_PORT) || "465");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 465;
}

export function smtpUser() {
  return unwrapEnv(process.env.SMTP_USER) || SMTP_AUTH_MAILBOX;
}

export function smtpPass() {
  return (
    process.env.SMTP_PASS?.trim()
      .replace(/^["']|["']$/g, "")
      .replace(/\s+/g, "") ?? ""
  );
}

export type ContactMailConfigDiagnosis = {
  missingVariables: string[];
  invalidVariables: string[];
  fromMailboxAllowed: boolean;
  smtpPortValid: boolean;
  smtpPassPresent: boolean;
  smtpPassLengthValid: undefined;
};

/** Names only. Never include env values, credentials, or mailboxes. */
export function inspectContactMailConfig(): ContactMailConfigDiagnosis {
  const missingVariables: string[] = [];
  const invalidVariables: string[] = [];

  const host = unwrapEnv(process.env.SMTP_HOST);
  if (!host) missingVariables.push("SMTP_HOST");

  const portRaw = unwrapEnv(process.env.SMTP_PORT);
  if (!portRaw) missingVariables.push("SMTP_PORT");
  const portNum = Number(portRaw || "465");
  const smtpPortValid = Number.isFinite(portNum) && portNum > 0;
  if (portRaw && !smtpPortValid) invalidVariables.push("SMTP_PORT");

  const user = unwrapEnv(process.env.SMTP_USER);
  if (!user) missingVariables.push("SMTP_USER");
  else if (parsedMailbox(user) !== SMTP_AUTH_MAILBOX) invalidVariables.push("SMTP_USER");

  const pass = smtpPass();
  const smtpPassPresent = Boolean(pass);
  if (!smtpPassPresent) missingVariables.push("SMTP_PASS");

  const fromRaw = unwrapEnv(process.env.EMAIL_FROM);
  if (!fromRaw) missingVariables.push("EMAIL_FROM");
  const fromMailboxAllowed = isAuthenticatedFromAddress(emailFrom());
  if (fromRaw && !fromMailboxAllowed) invalidVariables.push("EMAIL_FROM");

  const toRaw = unwrapEnv(process.env.EMAIL_TO);
  if (!toRaw) missingVariables.push("EMAIL_TO");
  else if (!isApprovedContactInbox(toRaw)) invalidVariables.push("EMAIL_TO");

  return {
    missingVariables,
    invalidVariables,
    fromMailboxAllowed,
    smtpPortValid,
    smtpPassPresent,
    smtpPassLengthValid: undefined,
  };
}

export function logContactMailConfigInvalid() {
  const diagnosis = inspectContactMailConfig();
  console.error("contact_mail_config_invalid", diagnosis);
  return diagnosis;
}

export function smtpConfigured() {
  const diagnosis = inspectContactMailConfig();
  return (
    diagnosis.missingVariables.length === 0 &&
    diagnosis.invalidVariables.length === 0 &&
    diagnosis.fromMailboxAllowed &&
    diagnosis.smtpPortValid
  );
}

export function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? process.env.NEXT_ADMIN_EMAILS ?? "")
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
  return hasRazorpayKeys() && hasSupabaseAdmin() && Boolean(razorpayWebhookSecret());
}

export function isClientCheckoutEnabled() {
  const mode = commerceMode();
  return (mode === "test" || mode === "live") && Boolean(razorpayKeyId());
}

/**
 * Presence-only checklist. Never return secret values.
 * Do not set commerceMode to live from code. Flip the env var only after
 * Design Roulette and Design IQ complete the paid chain.
 */
export function commerceGoLiveChecklist() {
  const mode = commerceMode();
  const razorpay = {
    keyId: Boolean(razorpayKeyId()),
    keySecret: Boolean(razorpayKeySecret()),
    webhookSecret: Boolean(razorpayWebhookSecret()),
  };
  const supabase = {
    url: Boolean(supabaseUrl()),
    anonKey: Boolean(supabaseAnonKey()),
    serviceRole: Boolean(supabaseServiceRoleKey()),
  };
  const resend = {
    apiKey: Boolean(resendApiKey()),
    from: isAuthenticatedFromAddress(),
  };
  const secretsReady =
    razorpay.keyId &&
    razorpay.keySecret &&
    razorpay.webhookSecret &&
    supabase.url &&
    supabase.anonKey &&
    supabase.serviceRole &&
    resend.apiKey;
  return {
    mode,
    webhookPath: "/api/webhooks/razorpay",
    authCallbackPath: "/account/callback",
    razorpay,
    supabase,
    resend,
    secretsReady,
    checkoutEnabled: isClientCheckoutEnabled() && isCommerceConfigured(),
    liveModeSet: mode === "live",
  };
}

export function storageBucket() {
  return "product-deliverables";
}
