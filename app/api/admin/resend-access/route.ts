import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail, publicSiteUrl } from "@/lib/commerce/config";
import { sendAccessEmail } from "@/lib/commerce/email";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getAuthUser } from "@/lib/supabase/server";
import { getProductById } from "@/products";
import { productAccessHref } from "@/products/commerce";

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const parsed = z.object({ customerId: z.string(), productId: z.string() }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const product = getProductById(parsed.data.productId);
  if (!product) return NextResponse.json({ error: "Product missing" }, { status: 404 });
  const admin = requireAdminClient();
  const { data: customer } = await admin.from("customers").select("email, name").eq("id", parsed.data.customerId).single();
  if (!customer?.email) return NextResponse.json({ error: "Customer missing" }, { status: 404 });
  await sendAccessEmail({
    to: customer.email,
    name: customer.name,
    productName: product.name,
    accessHref: `${publicSiteUrl()}${productAccessHref(product)}`,
    download: product.deliveryType !== "app",
  });
  return NextResponse.json({ ok: true });
}
