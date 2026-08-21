import Link from "next/link";
import type { Product } from "@/products";

export default function ProductHeader({ product }: { product: Product }) {
  return (
    <header>
      <Link
        href="/account/library"
        className="inline-flex min-h-11 items-center font-mono-label text-ink-soft hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        ← My Library
      </Link>
      <p className="mt-8 font-mono-label text-ink-soft">
        {product.number} / v{product.version}
      </p>
      <h1 className="mt-4 type-h2 text-navy">{product.name}</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">{product.hook}</p>
    </header>
  );
}
