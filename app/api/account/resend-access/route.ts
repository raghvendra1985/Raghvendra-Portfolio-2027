import { NextResponse } from "next/server";
import { z } from "zod";
import { publicSiteUrl } from "@/lib/commerce/config";
import { sendAccessEmail } from "@/lib/commerce/email";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/supabase/server";
import { getProductById } from "@/products";
import { productAccessHref } from "@/products/commerce";

const bodySchema = z.object({ productId: z.string() });

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user?.email) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Missing product." }, { status: 400 });

  const admin = requireAdminClient();
  const { data: customer } = await admin
    .from("customers")
    .select("id, email, name")
    .eq("email_normalized", user.email.toLowerCase())
    .maybeSingle();
  if (!customer) return NextResponse.json({ error: "No purchases on this email." }, { status: 404 });

  const { data: entitlement } = await admin
    .from("entitlements")
    .select("id")
    .eq("customer_id", customer.id)
    .eq("product_id", parsed.data.productId)
    .eq("status", "active")
    .maybeSingle();
  if (!entitlement) return NextResponse.json({ error: "You do not own this product." }, { status: 403 });

  const product = getProductById(parsed.data.productId);
  if (!product) return NextResponse.json({ error: "Product missing." }, { status: 404 });

  const sent = await sendAccessEmail({
    to: customer.email,
    name: customer.name,
    productName: product.name,
    accessHref: `${publicSiteUrl()}${productAccessHref(product)}`,
    download: product.deliveryType !== "app",
  });
  await admin.from("email_events").insert({
    customer_id: customer.id,
    product_id: product.id,
    type: "product_access",
    provider_message_id: sent.id,
    status: sent.skipped ? "skipped" : "sent",
  });
  return NextResponse.json({ ok: true });
}
