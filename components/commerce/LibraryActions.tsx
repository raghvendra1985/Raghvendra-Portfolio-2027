"use client";

import { useState } from "react";
import MagneticButton from "@/components/buttons/MagneticButton";
import { track } from "@/lib/analytics";
import type { Product } from "@/products";
import { productAccessHref } from "@/products/commerce";

export default function LibraryActions({
  product,
  purchasedAt,
}: {
  product: Product;
  purchasedAt: string | null;
}) {
  const [note, setNote] = useState("");
  const date = purchasedAt
    ? new Date(purchasedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

  async function resend() {
    const response = await fetch("/api/account/resend-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });
    setNote(response.ok ? "Access email sent." : "Could not send email. Your access still works here.");
  }

  return (
    <article className="border border-line px-5 py-6">
      <p className="font-mono-label text-[11px] text-ink-soft">Purchased {date}</p>
      <h2 className="mt-2 font-display text-2xl">{product.name}</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{product.hook}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {product.deliveryType !== "download" ? (
          <MagneticButton
            href={productAccessHref(product)}
            size="sm"
            onClick={() => track("product_opened", { slug: product.slug, productId: product.id })}
          >
            Open Tool
          </MagneticButton>
        ) : null}
        {product.deliveryType !== "app" ? (
          <MagneticButton
            href={`/api/products/${product.slug}/download`}
            variant="secondary"
            size="sm"
            onClick={() => track("product_downloaded", { slug: product.slug, productId: product.id })}
          >
            Download
          </MagneticButton>
        ) : null}
        <button
          type="button"
          onClick={resend}
          className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-ink-soft hover:text-navy"
        >
          Resend access email
        </button>
      </div>
      {note ? (
        <p className="mt-3 text-sm text-green" role="status">
          {note}
        </p>
      ) : null}
    </article>
  );
}
