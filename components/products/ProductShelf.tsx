"use client";

import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";
import { formatInr, startingPrice, visibleProducts } from "@/products";

export default function ProductShelf() {
  const count = visibleProducts().length;
  const from = formatInr(startingPrice());

  return (
    <SectionReveal className="border-t border-line px-[var(--page-pad)] py-24">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div data-reveal-item>
          <p className="font-mono-label text-[11px] text-ink-soft">/ Secret Products</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl sm:text-5xl">
            Small tools built for the next generation of designers.
          </h2>
        </div>
        <div data-reveal-item className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-10">
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">{count} products</p>
            <p className="mt-2 font-mono-label text-[11px] text-ink-soft">{from} onwards</p>
          </div>
          <Link
            href="/products"
            data-cursor="Open"
            onClick={() => track("product_card_clicked", { slug: "shelf" })}
            className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-green"
          >
            Explore all →
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}
