"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { animateProductCards, refreshProductCards } from "@/animations/products";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { track } from "@/lib/analytics";
import {
  isProductFilter,
  visibleProducts,
  type ProductCategory,
} from "@/products";

export default function ProductsIndex() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const raw = searchParams.get("category");
  const filter: "all" | ProductCategory = isProductFilter(raw) ? raw : "all";

  const list = useMemo(() => {
    const pool = visibleProducts();
    if (filter === "all") return pool;
    return pool.filter((product) => product.categories.includes(filter));
  }, [filter]);

  useEffect(() => {
    track("products_page_viewed", { category: filter });
    // Initial landing only — filter changes emit product_filter_selected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateProductCards(root, config);
    return () => ctx.revert();
  }, [config]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || filter === "all") return;
    refreshProductCards(root, config);
  }, [filter, config]);

  function setFilter(next: "all" | ProductCategory) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("category");
    else params.set("category", next);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    track("product_filter_selected", { category: next });
  }

  return (
    <div ref={rootRef} className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
      <ProductFilters value={filter} onChange={setFilter} />

      {list.length ? (
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>
      ) : (
        <p className="mt-12 max-w-md text-sm text-ink-soft" role="status">
          No tools in this category yet.
        </p>
      )}
    </div>
  );
}
