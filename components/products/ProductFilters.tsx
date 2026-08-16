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
    <div
      className="flex flex-wrap items-center gap-x-1 gap-y-1"
      role="toolbar"
      aria-label="Filter products"
    >
      {productFilters.map((filter, index) => {
        const pressed = value === filter;
        return (
          <span key={filter} className="inline-flex items-center">
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
  );
}
