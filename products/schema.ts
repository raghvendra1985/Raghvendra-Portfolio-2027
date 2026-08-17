import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMetadataExtras } from "@/lib/seo";
import {
  formatCategories,
  formatInr,
  visibleProducts,
  type Product,
} from "./index";

export const productsIndexTitle = "Secret Products";
export const productsIndexDescription =
  "Small, focused tools for design students. Practice, briefs, jury prep, and portfolio work. Buy once. Use when you need them.";

export function productsIndexMetadata(): Metadata {
  return {
    title: productsIndexTitle,
    description: productsIndexDescription,
    ...pageMetadataExtras({
      title: productsIndexTitle,
      description: productsIndexDescription,
      path: "/products",
    }),
  };
}

export function productMetadata(product: Product): Metadata {
  const title = product.seoTitle ?? product.name;
  const description = product.seoDescription ?? product.hook;
  const path = `/products/${product.slug}`;
  const extras = pageMetadataExtras({
    title,
    description,
    path,
    image: product.ogImage ?? product.cover,
  });

  return {
    title,
    description,
    ...extras,
  };
}

export function productsIndexJsonLd() {
  const items = visibleProducts();
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: productsIndexTitle,
    description: productsIndexDescription,
    url: `${site.url}/products`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    about: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.seoDescription ?? product.description ?? product.hook,
          url: `${site.url}/products/${product.slug}`,
          offers: {
            "@type": "Offer",
            url: `${site.url}/products/${product.slug}`,
            price: product.price,
            priceCurrency: product.currency,
            availability: "https://schema.org/PreOrder",
          },
        },
      })),
    },
  };
}

export function productJsonLd(product: Product) {
  const url = `${site.url}/products/${product.slug}`;
  const image = product.ogImage ?? product.cover;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription ?? product.description ?? product.hook,
    sku: product.id,
    url,
    image: image ? `${site.url}${image}` : undefined,
    brand: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    category: formatCategories(product),
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/PreOrder",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.price,
        priceCurrency: product.currency,
        name: `One-time ${formatInr(product.price)}`,
      },
    },
  };
}
