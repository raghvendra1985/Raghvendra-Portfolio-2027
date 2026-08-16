"use client";

import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";
import { formatInr, startingPrice, visibleProducts } from "@/products";

export default function ProductShelf() {
  const products = visibleProducts();
  const count = products.length;
  const from = formatInr(startingPrice());

  return (
    <SectionReveal className="border-t border-line px-[var(--page-pad)] py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div data-reveal-item>
            <p className="font-mono-label text-[11px] text-ink-soft">/ Secret Products</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl sm:text-5xl">
              Small tools built for the next generation of designers.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              Standalone products for design students. Buy once. Use when you need them.
            </p>
          </div>
          <div
            data-reveal-item
            className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-10"
          >
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
        <ul className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <li key={product.slug} data-reveal-item>
              <Link
                href={`/products/${product.slug}`}
                data-cursor="Open"
                onClick={() =>
                  track("product_card_clicked", { slug: product.slug, from: "shelf" })
                }
                className="flex min-h-14 items-baseline justify-between gap-4 border-t border-line py-5"
              >
                <span className="font-display text-xl">{product.name}</span>
                <span className="shrink-0 font-mono-label text-[11px] text-ink-soft">
                  {formatInr(product.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  );
}
