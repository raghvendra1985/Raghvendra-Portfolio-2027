import Link from "next/link";
import type { Product } from "@/products";

export default function ProductHeader({ product }: { product: Product }) {
  return (
    <header>
      <Link
        href="/account/library"
        className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-ink-soft hover:text-navy"
      >
        ← My Library
      </Link>
      <p className="mt-8 font-mono-label text-[11px] text-ink-soft">
        {product.number} / v{product.version}
      </p>
      <h1 className="mt-4 font-display text-4xl text-navy sm:text-5xl">{product.name}</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">{product.hook}</p>
    </header>
  );
}
