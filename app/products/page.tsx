import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import ProductsIndex from "@/components/products/ProductsIndex";
import { jsonLdScript } from "@/lib/seo";
import { secretProductsIntro } from "@/products";
import { productsIndexJsonLd, productsIndexMetadata } from "@/products/schema";
import { pageMarks } from "@/visual-language/marks";

export const metadata: Metadata = productsIndexMetadata();

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(productsIndexJsonLd()) }}
      />
      <PageHero
        index={secretProductsIntro.index}
        label={secretProductsIntro.label}
        title={secretProductsIntro.title}
        description={secretProductsIntro.description}
        mark={pageMarks.products}
      />
      <ProductsIndex />
    </>
  );
}
