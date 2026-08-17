import { NextResponse } from "next/server";
import { z } from "zod";
import { isCommerceConfigured } from "@/lib/commerce/config";
import { fulfillPaidOrder } from "@/lib/commerce/fulfill";
import { verifyCheckoutSignature } from "@/lib/commerce/razorpay";

const bodySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function POST(request: Request) {
  if (!isCommerceConfigured()) {
    return NextResponse.json({ error: "Checkout is not configured." }, { status: 503 });
  }
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Missing payment signature." }, { status: 400 });
  }
  const ok = verifyCheckoutSignature({
    orderId: parsed.data.razorpay_order_id,
    paymentId: parsed.data.razorpay_payment_id,
    signature: parsed.data.razorpay_signature,
  });
  if (!ok) {
    return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
  }
  // Signature proves checkout completed. Entitlements are written in fulfillPaidOrder.
  const result = await fulfillPaidOrder({
    razorpayOrderId: parsed.data.razorpay_order_id,
    razorpayPaymentId: parsed.data.razorpay_payment_id,
    eventId: `verify:${parsed.data.razorpay_payment_id}`,
  });
  return NextResponse.json({ ok: true, orderId: result.orderId });
}
