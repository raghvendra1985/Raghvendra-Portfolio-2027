"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import ProductStatusMark from "@/components/products/ProductStatusMark";
import {
  formatCategories,
  formatInr,
  type Product,
} from "@/products";

export default function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const plate = node.querySelector("[data-product-plate]");
    let viewed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          plate?.setAttribute("data-in-view", "true");
          if (!viewed) {
            viewed = true;
            track("product_card_viewed", { slug: product.slug, status: product.status });
          }
        } else {
          plate?.removeAttribute("data-in-view");
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [product.slug, product.status]);

  return (
    <li ref={ref} data-product-card>
      <Link
        href={`/products/${product.slug}`}
        data-product-plate
        data-cursor="Open"
        onClick={() => track("product_card_clicked", { slug: product.slug })}
        className="group relative block overflow-hidden bg-navy p-6 text-mist sm:p-8"
        aria-label={`${product.name}. ${product.hook}. ${formatInr(product.price)}. ${product.status === "live" ? "Live" : "Coming soon"}.`}
      >
        <span
          className="product-plate-grid pointer-events-none absolute inset-0 text-mist"
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between gap-4">
          <p className="font-mono-label text-[11px] text-gold">{product.number}</p>
          <ProductStatusMark status={product.status} inverted />
        </div>
        <h2 className="relative mt-8 font-display text-2xl leading-[1.08] sm:text-3xl">
          {product.name}
        </h2>
        <p className="relative mt-4 max-w-sm text-base leading-relaxed text-mist/70">
          {product.hook}
        </p>
        {product.description ? (
          <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-mist/55">
            {product.description}
          </p>
        ) : null}
        <p className="relative mt-8 font-mono-label text-[11px] text-mist">{formatInr(product.price)}</p>
        <p className="relative mt-3 font-mono-label text-[11px] text-mist/50">
          {formatCategories(product)}
        </p>
        <div className="relative mt-10 flex items-end justify-between gap-4">
          <p className="font-mono-label text-[11px] text-gold group-hover:text-mist">
            View Product →
          </p>
          <p className="font-mono-label text-[11px] text-mist/45">{product.attribution}</p>
        </div>
      </Link>
    </li>
  );
}
