"use client";

import { useState } from "react";
import MagneticButton from "@/components/buttons/MagneticButton";
import CheckoutPanel from "@/components/commerce/CheckoutPanel";
import { track } from "@/lib/analytics";
import { productCta } from "@/products/commerce";
import type { Product } from "@/products";

export default function ProductCta({
  product,
  variant,
}: {
  product: Product;
  variant: "primary" | "secondary" | "gold";
}) {
  const cta = productCta(product);
  const [open, setOpen] = useState(false);

  if (cta.kind === "checkout") {
    return (
      <>
        <MagneticButton
          variant={variant}
          cursor="Open"
          onClick={() => {
            track("buy_cta_clicked", {
              from: "product_buy",
              channel: "razorpay",
              slug: product.slug,
              productId: product.id,
              price: product.price,
            });
            setOpen(true);
          }}
        >
          {cta.label}
        </MagneticButton>
        <CheckoutPanel product={product} open={open} onClose={() => setOpen(false)} />
      </>
    );
  }

  return (
    <MagneticButton
      href={cta.href ?? undefined}
      variant={variant}
      cursor="Open"
      onClick={() => {
        if (cta.kind === "external-checkout") {
          track("buy_cta_clicked", {
            from: "product_buy",
            channel: "checkout",
            slug: product.slug,
            price: product.price,
          });
          track("checkout_started", { slug: product.slug, price: product.price });
          return;
        }
        track(cta.kind === "whatsapp-buy" ? "buy_cta_clicked" : "contact_cta_clicked", {
          from: cta.kind === "whatsapp-buy" ? "product_buy" : "product_notify",
          channel: "whatsapp",
          slug: product.slug,
          price: product.price,
        });
      }}
    >
      {cta.label}
    </MagneticButton>
  );
}
