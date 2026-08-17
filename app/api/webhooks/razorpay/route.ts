import { NextResponse } from "next/server";
import { razorpayWebhookSecret } from "@/lib/commerce/config";
import { fulfillPaidOrder, markOrderFailed, refundPaidOrder } from "@/lib/commerce/fulfill";
import { verifyWebhookSignature } from "@/lib/commerce/razorpay";

export async function POST(request: Request) {
  const secret = razorpayWebhookSecret();
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret missing." }, { status: 503 });
  }
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as {
    event?: string;
    payload?: {
      payment?: { entity?: { id?: string; order_id?: string; status?: string } };
    };
  };
  const payment = event.payload?.payment?.entity;
  if (!payment?.id || !payment.order_id) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  // Verified webhook is a payment signal only. Access is granted in fulfillPaidOrder.
  if (event.event === "payment.captured") {
    await fulfillPaidOrder({
      razorpayOrderId: payment.order_id,
      razorpayPaymentId: payment.id,
      eventId: `webhook:${event.event}:${payment.id}`,
    });
  } else if (event.event === "payment.failed") {
    await markOrderFailed(payment.order_id);
  } else if (event.event === "refund.processed" || event.event === "payment.refunded") {
    await refundPaidOrder({
      razorpayPaymentId: payment.id,
      eventId: `webhook:${event.event}:${payment.id}`,
    });
  }

  return NextResponse.json({ ok: true });
}
