import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/products";
import { liveSwitchBlockers, productMatrix } from "@/products/matrix";

export const metadata: Metadata = { title: "Products · Admin", robots: { index: false, follow: false } };

export default function AdminProductsPage() {
  const matrix = productMatrix();
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin" className="font-mono-label text-ink-soft">
        ← Admin
      </Link>
      <h1 className="mt-6 type-h2">Products</h1>
      <p className="mt-4 max-w-xl text-sm text-ink-soft">
        Catalogue status is what customers see. Release readiness is internal. Do not flip coming-soon to live until readiness is qa-ready or live, and never because content merely exists.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {products.map((product) => {
          const row = matrix.find((item) => item.slug === product.slug);
          const blockers = liveSwitchBlockers(product.slug);
          return (
            <li key={product.id} className="grid gap-2 py-4 lg:grid-cols-[8rem_1fr_9rem_8rem_6rem]">
              <span className="font-mono-label">{product.number}</span>
              <span>
                {product.name} · {product.deliveryType}
                {row?.releaseReadiness === "content-blocked" ? (
                  <span className="mt-1 block text-sm text-ink-soft">{blockers.join(" · ")}</span>
                ) : row?.releaseReadiness === "qa-ready" ? (
                  <span className="mt-1 block text-sm text-ink-soft">
                    QA-ready. Flip status in products/index.ts after you accept the release report.
                  </span>
                ) : (
                  <span className="mt-1 block text-sm text-ink-soft">Live in the catalogue.</span>
                )}
              </span>
              <span>{row?.releaseReadiness ?? "—"}</span>
              <span>{product.status}</span>
              <span>v{product.version}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
