import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ProductRuntime from "@/components/product-app/ProductRuntime";
import TrackOnMount from "@/components/analytics/TrackOnMount";
import { requireProductEntitlement } from "@/lib/commerce/access";
import { getProduct } from "@/products";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product ? product.name : "Tool",
    robots: { index: false, follow: false },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { product, entitled } = await requireProductEntitlement(slug);
  if (!product || product.deliveryType === "download") notFound();
  if (!entitled) redirect(`/products/${slug}?reason=no-access`);
  return (
    <>
      <TrackOnMount event="product_opened" payload={{ slug: product.slug, productId: product.id }} />
      <ProductRuntime product={product} />
    </>
  );
}
