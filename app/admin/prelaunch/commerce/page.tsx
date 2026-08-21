import type { Metadata } from "next";
import Link from "next/link";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import SimulatePurchaseForm from "@/components/admin/SimulatePurchaseForm";
import { commerceGoLiveChecklist, commerceMode, publicSiteUrl } from "@/lib/commerce/config";
import { buildPrelaunchReport } from "@/prelaunch/report";

export const metadata: Metadata = {
  title: "Commerce simulation · Pre-Launch",
  robots: { index: false, follow: false },
};

export default async function CommercePrelaunchPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const checklist = commerceGoLiveChecklist();
  const report = await buildPrelaunchReport();
  const site = publicSiteUrl();
  const liveGate =
    report.chainPassed &&
    checklist.resend.apiKey &&
    report.anyApproved &&
    checklist.mode !== "live";

  return (
    <PrelaunchShell
      title="Purchase Simulator"
      deck="SIMULATION MODE. This does not call Razorpay, does not create real revenue, and does not send email."
    >
      <ol className="mt-10 max-w-xl space-y-2 text-sm">
        <li>Product</li>
        <li>Buy</li>
        <li>Checkout</li>
        <li>Payment success</li>
        <li>Customer</li>
        <li>Order (payment_provider = simulation)</li>
        <li>Entitlement</li>
        <li>Email preview (not sent)</li>
        <li>
          <Link href="/admin/prelaunch/library" className="underline decoration-gold underline-offset-4">
            Library
          </Link>
        </li>
        <li>Open Product</li>
      </ol>

      <SimulatePurchaseForm defaultSlug={slug} />

      <h2 className="mt-16 type-h3">Commerce test mode</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Current mode: <span className="font-mono-label">{commerceMode()}</span>. When Razorpay TEST keys exist, set{" "}
        <span className="font-mono-label">NEXT_PUBLIC_COMMERCE_MODE=test</span> in Vercel by hand. Then: Razorpay test
        payment → webhook {site}/api/webhooks/razorpay → order → customer → entitlement → transactional email → login → product
        access. Do not fake a payment-success click here.
      </p>
      <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
        <li className="flex justify-between gap-4 py-3">
          <span>Razorpay keys present</span>
          <span>{checklist.razorpay.keyId && checklist.razorpay.keySecret ? "Yes" : "No"}</span>
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Webhook secret present</span>
          <span>{checklist.razorpay.webhookSecret ? "Yes" : "No"}</span>
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Resend key present</span>
          <span>{checklist.resend.apiKey ? "Yes" : "No"}</span>
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Checkout enabled</span>
          <span>{checklist.checkoutEnabled ? "Yes" : "No"}</span>
        </li>
      </ul>

      <h2 className="mt-16 type-h3">Paid chain (excludes simulation)</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
        {report.chain.map((row) => (
          <li key={row.slug} className="grid gap-2 py-4 sm:grid-cols-[1fr_6rem_8rem_6rem]">
            <span>{row.name}</span>
            <span>Paid: {row.paid ? "yes" : "no"}</span>
            <span>Entitlement: {row.entitlement ? "yes" : "no"}</span>
            <span>Email: {row.email ? "yes" : "no"}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 type-h3">Live commerce gate</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Live requires Razorpay test E2E and Resend E2E and entitlement E2E and owner approval. This page never writes{" "}
        <span className="font-mono-label">commerceMode=live</span>.
        {liveGate
          ? " Gates look close — still set the env var in Vercel yourself after you are satisfied."
          : " COMMERCE_LIVE_RELEASE stays NOT READY."}
      </p>
      <p className="mt-4 font-mono-label text-ink-soft">
        COMMERCE_TEST_RELEASE {report.states.COMMERCE_TEST_RELEASE} · COMMERCE_LIVE_RELEASE {report.states.COMMERCE_LIVE_RELEASE}
      </p>
    </PrelaunchShell>
  );
}
