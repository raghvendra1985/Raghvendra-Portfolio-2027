import Image from "next/image";
import ProductCardLink from "@/components/products/ProductCardLink";
import ProductStatusMark from "@/components/products/ProductStatusMark";
import { formatCategories, formatInr, type Product } from "@/products";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const href = `/products/${product.slug}`;
  const hasCover = Boolean(product.cover);

  return (
    <li data-product-card>
      <ProductCardLink product={product} href={href}>
        {product.cover ? (
          <div className="relative aspect-[4/3] w-full bg-navy">
            <Image
              src={product.cover}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              priority={priority}
              unoptimized={product.cover.endsWith(".svg")}
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div className="relative aspect-[4/3] bg-navy p-6" aria-hidden="true">
            <span className="product-plate-grid pointer-events-none absolute inset-0 text-mist" />
            <p className="relative font-mono-label text-gold">{product.number}</p>
          </div>
        )}
        <div className="relative px-5 py-4">
          <h2 className={hasCover ? "sr-only" : "type-h3"}>{product.name}</h2>
          {hasCover ? null : (
            <p className="mt-1 text-sm leading-relaxed text-mist/70">{product.hook}</p>
          )}
          <div className={`flex items-end justify-between gap-4 ${hasCover ? "" : "mt-3"}`}>
            <div className="min-w-0">
              <ProductStatusMark status={product.status} inverted />
              <p className="mt-1 font-mono-label text-mist">{formatInr(product.price)}</p>
              <p className="mt-1 truncate font-mono-label text-mist/50">
                {formatCategories(product)}
              </p>
            </div>
            <p className="shrink-0 font-mono-label text-gold group-hover:text-mist">
              View →
            </p>
          </div>
        </div>
      </ProductCardLink>
    </li>
  );
}
