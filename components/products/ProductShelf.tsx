"use client";

import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";
import { formatInr, getProduct, startingPrice, visibleProducts } from "@/products";
import { homeTools } from "@/home/copy";

export default function ProductShelf() {
  const products = homeTools.slugs
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));
  const count = visibleProducts().length;
  const from = formatInr(startingPrice());

  return (
    <SectionReveal
      charmRest
      charmDense
      className="border-t border-line px-[var(--page-pad)] py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div data-reveal-item>
            <p className="font-mono-label text-navy/80">{homeTools.eyebrow}</p>
            <h2 className="mt-4 max-w-xl type-h2">{homeTools.title}</h2>
            <p className="mt-4 max-w-[65ch] type-body text-ink">{homeTools.body}</p>
          </div>
          <div data-reveal-item>
            <Link
              href="/products"
              data-cursor="Open"
              onClick={() => track("product_card_clicked", { slug: "shelf", surface: "home_tools" })}
              className="inline-flex min-h-11 items-center font-mono-label text-navy"
            >
              {homeTools.explore} →
            </Link>
          </div>
        </div>
        <ul className="mt-12 grid gap-px sm:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug} data-reveal-item>
              <Link
                href={`/products/${product.slug}`}
                data-cursor="Open"
                onClick={() =>
                  track("product_card_clicked", { slug: product.slug, from: "shelf" })
                }
                className="flex min-h-14 items-baseline justify-between gap-4 border-t border-line py-5"
              >
                <span className="type-h3">{product.name}</span>
                <span className="shrink-0 font-mono-label text-ink-soft">
                  {formatInr(product.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p data-reveal-item className="mt-8 font-mono-label text-ink-soft">
          {count} tools · From {from}
        </p>
      </div>
    </SectionReveal>
  );
}
