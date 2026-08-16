import { formatInr, type Product } from "./index";
import { getStoredUtm } from "@/lib/utm";

export { formatInr };

export function isPurchasable(product: Product) {
  return product.status === "live";
}

export type CheckoutIntent = {
  productId: string;
  slug: string;
  amount: number;
  currency: "INR";
  utm: Record<string, string>;
};

/**
 * Builds a one-time checkout intent for a live product.
 * Razorpay order creation stays behind a future `/api/checkout` route.
 */
export function createCheckoutIntent(product: Product): CheckoutIntent {
  if (!isPurchasable(product)) {
    throw new Error(`${product.slug} is not available for purchase`);
  }

  return {
    productId: product.id,
    slug: product.slug,
    amount: product.price,
    currency: product.currency,
    utm: getStoredUtm(),
  };
}

export function notifyMailto(product: Product, email: string) {
  const subject = encodeURIComponent(`Notify me — ${product.name}`);
  const body = encodeURIComponent(
    `Please tell me when ${product.name} is available to buy.\n\nhttps://raghvendrasingh.com/products/${product.slug}\n`,
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

/**
 * Later checkout (not in this ship):
 * - POST /api/checkout creates a Razorpay order from CheckoutIntent
 * - POST /api/webhooks/razorpay verifies payment.captured
 * - Email delivers a one-time access link
 * - No accounts, subscriptions, or bundles
 */
