import { createHash } from "node:crypto";
import { ipAddress } from "@vercel/functions";
import { createAdminClient } from "@/lib/supabase/admin";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_IP = 5;

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}

/** Vercel-owned headers only. Do not read client-supplied X-Forwarded-For chains. */
export function clientIp(request: Request) {
  const vercel = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercel) return vercel;
  const platform = ipAddress(request);
  return platform ?? null;
}

export type ContactRateDecision = "allow" | "limited" | "unavailable";

export async function contactRequestAllowed(ip: string | null): Promise<ContactRateDecision> {
  const admin = createAdminClient();
  if (!admin) return "unavailable";

  const ipKey = digest(ip?.trim() || "unknown");
  const { error: insertError } = await admin.from("contact_rate_events").insert({ ip_hash: ipKey });
  if (insertError) return "unavailable";

  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count, error } = await admin
    .from("contact_rate_events")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipKey)
    .gt("created_at", since);

  if (error || count == null) return "unavailable";
  return count > MAX_PER_IP ? "limited" : "allow";
}
