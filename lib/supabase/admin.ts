import { createClient } from "@supabase/supabase-js";
import { supabaseServiceRoleKey, supabaseUrl } from "@/lib/commerce/config";

export function createAdminClient() {
  const url = supabaseUrl();
  const key = supabaseServiceRoleKey();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function requireAdminClient() {
  const client = createAdminClient();
  if (!client) {
    throw new Error("Supabase service role is not configured");
  }
  return client;
}
