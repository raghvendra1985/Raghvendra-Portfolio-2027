"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { track } from "@/lib/analytics";
import ProductStatusMark from "@/components/products/ProductStatusMark";
import { formatCategories, formatInr, type Product } from "@/products";

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
        className="group relative block overflow-hidden bg-navy text-mist"
        aria-label={`${product.name}. ${product.hook}. ${formatInr(product.price)}. ${product.status === "live" ? "Live" : "Coming soon"}.`}
      >
        {product.cover ? (
          <>
            <div className="relative aspect-[4/3] w-full bg-navy">
              <Image
                src={product.cover}
                alt={product.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                unoptimized={product.cover.endsWith(".svg")}
                className="object-cover object-top"
              />
            </div>
            <h2 className="sr-only">{product.name}</h2>
          </>
        ) : (
          <div className="relative aspect-[4/3] bg-navy p-6">
            <span
              className="product-plate-grid pointer-events-none absolute inset-0 text-mist"
              aria-hidden="true"
            />
            <p className="relative font-mono-label text-[11px] text-gold">{product.number}</p>
            <h2 className="relative mt-6 font-display text-2xl leading-[1.08]">{product.name}</h2>
            <p className="relative mt-3 text-sm leading-relaxed text-mist/70">{product.hook}</p>
          </div>
        )}
        <div className="relative flex items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0">
            <ProductStatusMark status={product.status} inverted />
            <p className="mt-1 font-mono-label text-[11px] text-mist">{formatInr(product.price)}</p>
            <p className="mt-1 truncate font-mono-label text-[11px] text-mist/50">
              {formatCategories(product)}
            </p>
          </div>
          <p className="shrink-0 font-mono-label text-[11px] text-gold group-hover:text-mist">
            View →
          </p>
        </div>
      </Link>
    </li>
  );
}
