import { productShelfLabels, productShelfOrder } from "@/products";

export default function ProductFilters() {
  return (
    <nav
      className="-mx-[var(--page-pad)] overflow-x-auto px-[var(--page-pad)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0"
      aria-label="Catalogue sections"
    >
      <div className="flex w-max items-center gap-x-1 md:w-auto md:flex-wrap">
        {productShelfOrder.map((shelf, index) => (
          <span key={shelf} className="inline-flex shrink-0 items-center">
            {index > 0 ? (
              <span className="px-1 font-mono-label text-ink-soft/40" aria-hidden="true">
                ·
              </span>
            ) : null}
            <a
              href={`#shelf-${shelf}`}
              className="inline-flex min-h-11 items-center px-2 font-mono-label text-ink-soft hover:text-navy"
            >
              {productShelfLabels[shelf]}
            </a>
          </span>
        ))}
      </div>
    </nav>
  );
}
