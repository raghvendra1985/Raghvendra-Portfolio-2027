import type { Metadata } from "next";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import { getAuthUser } from "@/lib/supabase/server";
import { previewPurchaseEmail, purchaseEmailSubject } from "@/lib/commerce/simulate";
import { formatInr, getProduct, products } from "@/products";
import { productAccessHref } from "@/products/commerce";

export const metadata: Metadata = {
  title: "Email preview · Pre-Launch",
  robots: { index: false, follow: false },
};

export default async function EmailPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const product = getProduct(slug ?? "") ?? products[0];
  const user = await getAuthUser();
  const name = typeof user?.user_metadata?.name === "string" ? user.user_metadata.name : user?.email ?? "Raghvendra";
  const preview = previewPurchaseEmail({
    name,
    product,
    orderId: "PREVIEW-NOT-AN-ORDER",
  });

  return (
    <PrelaunchShell
      title="Email Preview"
      deck="This is purchaseConfirmedMarkup — the same HTML Resend would send. Nothing is sent from this page."
    >
      <form method="get" action="/admin/prelaunch/email-preview" className="mt-8 max-w-xl">
        <label className="block text-sm">
          Product
          <select
            name="slug"
            defaultValue={product.slug}
            className="mt-2 min-h-11 w-full border border-navy/20 bg-mist px-3"
          >
            {products.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="mt-4 inline-flex min-h-11 items-center border border-navy px-4 font-mono-label"
        >
          Preview
        </button>
      </form>

      <dl className="mt-12 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-mono-label text-ink-soft">Subject</dt>
          <dd className="mt-1">{purchaseEmailSubject(product.name)}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">Customer name</dt>
          <dd className="mt-1">{name}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">Product</dt>
          <dd className="mt-1">{product.name}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">Amount</dt>
          <dd className="mt-1">{formatInr(product.price)}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">Open Product</dt>
          <dd className="mt-1">{productAccessHref(product)}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">My Library</dt>
          <dd className="mt-1">/account/library</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">Order reference</dt>
          <dd className="mt-1">PREVIEW-NOT-AN-ORDER</dd>
        </div>
      </dl>

      <div className="mt-12 border border-line">
        <iframe
          title="Purchase email preview"
          className="h-[720px] w-full bg-mist"
          sandbox=""
          srcDoc={preview.html}
        />
      </div>
    </PrelaunchShell>
  );
}
