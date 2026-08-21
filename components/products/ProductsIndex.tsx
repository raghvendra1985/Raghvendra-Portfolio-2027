import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import ProductsIndexMotion from "@/components/products/ProductsIndexMotion";
import {
  productShelfCopy,
  productShelfLabels,
  productShelfOrder,
  productsOnShelf,
} from "@/products";

export default function ProductsIndex() {
  return (
    <ProductsIndexMotion>
      <ProductFilters />

      {productShelfOrder.map((shelf) => {
        const list = productsOnShelf(shelf);
        if (!list.length) return null;
        const featured = shelf === "featured";
        return (
          <section key={shelf} id={`shelf-${shelf}`} className="mt-16 scroll-mt-28">
            <h2 className={`text-navy ${featured ? "type-h2" : "type-h3"}`}>
              {productShelfLabels[shelf]}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{productShelfCopy[shelf]}</p>
            <ul className={`mt-8 grid gap-6 lg:gap-8 ${featured ? "lg:grid-cols-3" : "sm:grid-cols-2"}`}>
              {list.map((product, index) => (
                <ProductCard key={product.slug} product={product} priority={featured && index < 3} />
              ))}
            </ul>
          </section>
        );
      })}
    </ProductsIndexMotion>
  );
}
