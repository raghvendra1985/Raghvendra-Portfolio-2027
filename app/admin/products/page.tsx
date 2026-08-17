import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/products";
import { liveSwitchBlockers, productMatrix } from "@/products/matrix";

export const metadata: Metadata = { title: "Products · Admin", robots: { index: false, follow: false } };

export default function AdminProductsPage() {
  const matrix = productMatrix();
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin" className="font-mono-label text-[11px] text-ink-soft">
        ← Admin
      </Link>
      <h1 className="mt-6 font-display text-4xl">Products</h1>
      <p className="mt-4 max-w-xl text-sm text-ink-soft">
        Repository catalog is the source of truth. Do not switch coming-soon to live until every content gate on the row is met. Commerce keys are platform-wide, not per product.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {products.map((product) => {
          const row = matrix.find((item) => item.slug === product.slug);
          const blockers = liveSwitchBlockers(product.slug);
          return (
            <li key={product.id} className="grid gap-2 py-4 lg:grid-cols-[8rem_1fr_8rem_6rem]">
              <span className="font-mono-label text-[11px]">{product.number}</span>
              <span>
                {product.name} · {product.deliveryType}
                {row && !row.canSwitchToLive ? (
                  <span className="mt-1 block text-sm text-ink-soft">{blockers.join(" · ")}</span>
                ) : (
                  <span className="mt-1 block text-sm text-ink-soft">
                    Content gate met. Flip status in products/index.ts when you intend to sell.
                  </span>
                )}
              </span>
              <span>{product.status}</span>
              <span>v{product.version}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
