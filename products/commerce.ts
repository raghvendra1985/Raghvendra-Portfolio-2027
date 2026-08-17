import { formatInr, type Product } from "./index";
import { isClientCheckoutEnabled } from "@/lib/commerce/config";
import { site, whatsappHref } from "@/lib/site";
import { getStoredUtm } from "@/lib/utm";

export { formatInr };

export function canSell(product: Product) {
  return product.status === "live" || Boolean(product.allowPreorder);
}

export function isPurchasable(product: Product) {
  if (!canSell(product)) return false;
  return isClientCheckoutEnabled() || Boolean(product.checkoutUrl);
}

export type CheckoutIntent = {
  productId: string;
  slug: string;
  amount: number;
  currency: "INR";
  utm: Record<string, string>;
};

export function createCheckoutIntent(product: Product): CheckoutIntent {
  if (!canSell(product)) {
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

export function notifyWhatsApp(product: Product) {
  return whatsappHref(
    `Please tell me when ${product.name} is available to buy.\n\n${site.url}/products/${product.slug}`,
  );
}

export function buyWhatsApp(product: Product) {
  return whatsappHref(
    `I'd like to buy ${product.name} (${formatInr(product.price)}).\n\n${site.url}/products/${product.slug}`,
  );
}

export type ProductCtaKind = "checkout" | "external-checkout" | "whatsapp-buy" | "notify";

export function productCta(product: Product): {
  href: string | null;
  label: string;
  kind: ProductCtaKind;
} {
  if (!canSell(product)) {
    return { href: notifyWhatsApp(product), label: "Notify me", kind: "notify" };
  }
  if (isClientCheckoutEnabled()) {
    return { href: null, label: "Buy Now", kind: "checkout" };
  }
  if (product.checkoutUrl) {
    return { href: product.checkoutUrl, label: "Buy Now", kind: "external-checkout" };
  }
  return { href: buyWhatsApp(product), label: "Message to buy", kind: "whatsapp-buy" };
}

export function productAccessHref(product: Product) {
  if (product.deliveryType === "download") return "/account/library";
  return product.appPath ?? `/tools/${product.slug}`;
}
