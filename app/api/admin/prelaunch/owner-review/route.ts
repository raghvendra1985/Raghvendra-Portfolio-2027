import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminEmail } from "@/lib/commerce/config";
import { getAuthUser } from "@/lib/supabase/server";
import { upsertOwnerReview } from "@/prelaunch/owner-reviews";

const bodySchema = z.object({
  productId: z.string(),
  reviewed: z.boolean().optional(),
  approvedForSale: z.boolean().optional(),
});

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  try {
    const row = await upsertOwnerReview({
      ...parsed.data,
      reviewerEmail: user.email,
    });
    return NextResponse.json({ ok: true, row });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
