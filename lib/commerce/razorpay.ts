/**
 * Razorpay is the payment processor, not the database of record.
 * Orders API creates a payable order; checkout signatures and webhooks
 * prove money moved. Ownership is written in `fulfillPaidOrder` onto
 * `orders` + `entitlements`. Never ask Razorpay whether a customer owns a product.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { razorpayKeyId, razorpayKeySecret } from "@/lib/commerce/config";

function authHeader() {
  const id = razorpayKeyId();
  const secret = razorpayKeySecret();
  return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
}

export async function createRazorpayOrder(input: {
  amountPaise: number;
  currency: string;
  receipt: string;
  notes: Record<string, string>;
}) {
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: input.currency,
      receipt: input.receipt,
      notes: input.notes,
    }),
  });
  const payload = (await response.json()) as { id?: string; error?: { description?: string } };
  if (!response.ok || !payload.id) {
    throw new Error(payload.error?.description ?? "Could not create Razorpay order");
  }
  return payload as { id: string; amount: number; currency: string };
}

export function verifyCheckoutSignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const secret = razorpayKeySecret();
  const expected = createHmac("sha256", secret)
    .update(`${input.orderId}|${input.paymentId}`)
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(input.signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyWebhookSignature(rawBody: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
