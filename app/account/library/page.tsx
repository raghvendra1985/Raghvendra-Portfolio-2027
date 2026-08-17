import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/reveal/PageHero";
import LibraryActions from "@/components/commerce/LibraryActions";
import TrackOnMount from "@/components/analytics/TrackOnMount";
import { getCustomerForUser } from "@/lib/commerce/access";
import { requireAdminClient } from "@/lib/supabase/admin";
import { pageMetadataExtras } from "@/lib/seo";
import { getProductById } from "@/products";

export const metadata: Metadata = {
  title: "My Library",
  robots: { index: false, follow: false },
  ...pageMetadataExtras({
    title: "My Library",
    description: "Your purchased student products.",
    path: "/account/library",
  }),
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; slug?: string }>;
}) {
  const { reason } = await searchParams;
  const { customer } = await getCustomerForUser();
  let items: Array<{ productId: string; grantedAt: string | null }> = [];
  if (customer) {
    const admin = requireAdminClient();
    const { data } = await admin
      .from("entitlements")
      .select("product_id, granted_at")
      .eq("customer_id", customer.id)
      .eq("status", "active")
      .order("granted_at", { ascending: false });
    items = (data ?? []).map((row) => ({ productId: row.product_id, grantedAt: row.granted_at }));
  }

  return (
    <>
      <PageHero
        index="—"
        label="Library"
        title="Your products."
        description="Buy once. Come back whenever you need them."
      />
      <TrackOnMount event="library_view" />
      <div className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
        {reason === "missing-file" ? (
          <p className="mb-8 max-w-xl text-sm text-green" role="status">
            Your purchase is recorded. The downloadable file is still being prepared. Open the tool, or resend access email.
          </p>
        ) : null}
        {items.length ? (
          <div className="grid gap-6">
            <p className="font-mono-label text-[11px] text-ink-soft">YOUR PRODUCTS</p>
            {items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return <LibraryActions key={product.id} product={product} purchasedAt={item.grantedAt} />;
            })}
          </div>
        ) : (
          <p className="max-w-md text-base leading-relaxed text-ink-soft">
            No products on this email yet.{" "}
            <Link href="/products" className="underline decoration-gold underline-offset-4">
              Browse tools
            </Link>
            .
          </p>
        )}
      </div>
    </>
  );
}
