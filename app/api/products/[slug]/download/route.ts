import { NextResponse } from "next/server";
import { hashIp } from "@/lib/commerce/normalize";
import { storageBucket } from "@/lib/commerce/config";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/supabase/server";
import { getProduct } from "@/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
  if (product.deliveryType === "app") {
    return NextResponse.json({ error: "This product is an app, not a file." }, { status: 409 });
  }

  const user = await getAuthUser();
  if (!user?.email) {
    return NextResponse.redirect(new URL(`/account/login?next=/api/products/${slug}/download`, request.url));
  }

  const admin = requireAdminClient();
  const { data: customer } = await admin
    .from("customers")
    .select("id")
    .eq("email_normalized", user.email.toLowerCase())
    .maybeSingle();
  if (!customer) {
    return NextResponse.redirect(new URL("/account/library?reason=no-purchase", request.url));
  }

  const { data: entitlement } = await admin
    .from("entitlements")
    .select("id, status")
    .eq("customer_id", customer.id)
    .eq("product_id", product.id)
    .eq("status", "active")
    .maybeSingle();
  if (!entitlement) {
    return NextResponse.redirect(new URL(`/products/${slug}?reason=no-access`, request.url));
  }

  const path = product.downloadAsset ?? `product-deliverables/${product.slug}/v1/pack.pdf`;
  const { data: signed, error } = await admin.storage.from(storageBucket()).createSignedUrl(path.replace(/^product-deliverables\//, ""), 60);
  if (error || !signed?.signedUrl) {
    return NextResponse.redirect(new URL(`/account/library?reason=missing-file&slug=${slug}`, request.url));
  }

  await admin.from("download_events").insert({
    customer_id: customer.id,
    product_id: product.id,
    entitlement_id: entitlement.id,
    ip_hash: hashIp(request.headers.get("x-forwarded-for")?.split(",")[0] ?? null),
    user_agent: request.headers.get("user-agent")?.slice(0, 180) ?? null,
  });

  return NextResponse.redirect(signed.signedUrl);
}
