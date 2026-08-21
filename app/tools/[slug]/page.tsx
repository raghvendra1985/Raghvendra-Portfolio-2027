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
  const { product, entitled, demo } = await requireProductEntitlement(slug);
  if (!product || product.deliveryType === "download") notFound();
  if (!entitled) redirect(`/products/${slug}?reason=no-access`);
  return (
    <>
      {demo ? (
        <p className="border-b border-gold bg-navy px-[var(--page-pad)] py-3 font-mono-label text-gold">
          ADMIN DEMO — not a purchase. Access is granted because this email is an admin, not because of a query parameter.
        </p>
      ) : null}
      <TrackOnMount event="product_opened" payload={{ slug: product.slug, productId: product.id, demo }} />
      <ProductRuntime product={product} />
    </>
  );
}
