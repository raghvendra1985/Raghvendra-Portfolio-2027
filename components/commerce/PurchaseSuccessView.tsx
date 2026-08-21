"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MagneticButton from "@/components/buttons/MagneticButton";
import { track } from "@/lib/analytics";
import { getProductById } from "@/products";
import { productAccessHref } from "@/products/commerce";

export default function PurchaseSuccessView() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [status, setStatus] = useState("pending");
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    async function poll() {
      const response = await fetch(`/api/purchase/status?orderId=${orderId}`);
      const payload = (await response.json()) as { status?: string; productId?: string };
      if (cancelled) return;
      if (payload.status) setStatus(payload.status);
      if (payload.productId) setProductId(payload.productId);
      if (payload.status === "paid") {
        track("purchase_completed", { productId: payload.productId });
        return;
      }
      window.setTimeout(poll, 1500);
    }
    poll();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const product = productId ? getProductById(productId) : null;
  const ready = status === "paid";

  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32 sm:pt-40">
      <p className="font-mono-label text-ink-soft">Purchase</p>
      <h1 className="mt-6 max-w-3xl type-h1 text-navy">
        {ready ? "Payment received." : "Payment is being confirmed."}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        {ready
          ? "Your product is ready. We’ve sent access to your email."
          : "If the page stays here, open My Library with the same email. Entitlement is granted after the server verifies payment — not before."}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        {product && ready ? (
          <MagneticButton href={productAccessHref(product)}>Open My Product</MagneticButton>
        ) : null}
        <MagneticButton href="/account/library" variant={product && ready ? "secondary" : "primary"}>
          View My Library
        </MagneticButton>
      </div>
    </section>
  );
}
