"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import type { Product } from "@/products";

export default function ProductCardLink({
  product,
  href,
  children,
}: {
  product: Product;
  href: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let viewed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.setAttribute("data-in-view", "true");
          if (!viewed) {
            viewed = true;
            track("product_card_viewed", { slug: product.slug, status: product.status });
          }
        } else {
          node.removeAttribute("data-in-view");
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [product.slug, product.status]);

  return (
    <Link
      ref={ref}
      href={href}
      data-product-plate
      data-cursor="Open"
      onClick={() => track("product_card_clicked", { slug: product.slug })}
      className="group relative block overflow-hidden bg-navy text-mist"
    >
      {children}
    </Link>
  );
}
