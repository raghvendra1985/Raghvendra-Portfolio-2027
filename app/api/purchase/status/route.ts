import { NextResponse } from "next/server";
import { requireAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const orderId = new URL(request.url).searchParams.get("orderId");
  if (!orderId) return NextResponse.json({ error: "Missing order." }, { status: 400 });
  try {
    const admin = requireAdminClient();
    const { data: order, error } = await admin
      .from("orders")
      .select("id, status, paid_at")
      .eq("id", orderId)
      .maybeSingle();
    if (error || !order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    const { data: items } = await admin
      .from("order_items")
      .select("product_id")
      .eq("order_id", orderId);
    return NextResponse.json({
      status: order.status,
      paidAt: order.paid_at,
      productId: items?.[0]?.product_id ?? null,
    });
  } catch {
    return NextResponse.json({ status: "pending" });
  }
}
