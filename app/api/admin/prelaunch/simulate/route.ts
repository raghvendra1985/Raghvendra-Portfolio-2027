import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail } from "@/lib/commerce/config";
import { simulatePurchase } from "@/lib/commerce/simulate";
import { getAuthUser } from "@/lib/supabase/server";

const bodySchema = z.object({
  slug: z.string(),
});

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  try {
    const result = await simulatePurchase({
      slug: parsed.data.slug,
      email: user.email,
      name: typeof user.user_metadata?.name === "string" ? user.user_metadata.name : user.email,
    });
    return NextResponse.json({
      ok: true,
      simulated: true,
      orderId: result.orderId,
      name: result.product.name,
      accessHref: result.email.accessHref,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Simulation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
