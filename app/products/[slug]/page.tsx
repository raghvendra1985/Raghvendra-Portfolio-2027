import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductView from "@/components/products/ProductView";
import { jsonLdScript } from "@/lib/seo";
import { getProduct, isPublicStatus, visibleProducts } from "@/products";
import { productJsonLd, productMetadata } from "@/products/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || !isPublicStatus(product.status)) return {};
  return productMetadata(product);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || !isPublicStatus(product.status)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(productJsonLd(product)) }}
      />
      <Suspense>
        <ProductView product={product} />
      </Suspense>
    </>
  );
}
