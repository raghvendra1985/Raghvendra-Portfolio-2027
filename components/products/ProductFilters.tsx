"use client";

import {
  productFilterLabels,
  productFilters,
  type ProductCategory,
} from "@/products";

export default function ProductFilters({
  value,
  onChange,
}: {
  value: "all" | ProductCategory;
  onChange: (next: "all" | ProductCategory) => void;
}) {
  return (
    <div className="-mx-[var(--page-pad)] overflow-x-auto px-[var(--page-pad)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0">
      <div
        className="flex w-max items-center gap-x-1 md:w-auto md:flex-wrap"
        role="toolbar"
        aria-label="Filter products"
      >
        {productFilters.map((filter, index) => {
          const pressed = value === filter;
          return (
            <span key={filter} className="inline-flex shrink-0 items-center">
              {index > 0 ? (
                <span className="px-1 font-mono-label text-[11px] text-ink-soft/40" aria-hidden="true">
                  ·
                </span>
              ) : null}
              <button
                type="button"
                aria-pressed={pressed}
                onClick={() => onChange(filter)}
                className={`min-h-11 px-2 font-mono-label text-[11px] ${
                  pressed
                    ? "text-navy underline decoration-gold decoration-2 underline-offset-8"
                    : "text-ink-soft hover:text-navy"
                }`}
              >
                {productFilterLabels[filter]}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
