import type { Metadata } from "next";
import Link from "next/link";
import { commerceGoLiveChecklist, publicSiteUrl } from "@/lib/commerce/config";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getProduct } from "@/products";
import { SIMULATION_PROVIDER } from "@/lib/commerce/simulate";

export const metadata: Metadata = { title: "Go live · Admin", robots: { index: false, follow: false } };

const chainSlugs = ["design-roulette", "design-iq"] as const;

function Mark({ ok }: { ok: boolean }) {
  return <span className={ok ? "text-green" : "text-ink-soft"}>{ok ? "Set" : "Missing"}</span>;
}

export default async function AdminGoLivePage() {
  const checklist = commerceGoLiveChecklist();
  const site = publicSiteUrl();
  const chain: Array<{
    slug: string;
    name: string;
    paid: boolean;
    entitlement: boolean;
    email: boolean;
  }> = [];

  try {
    const admin = requireAdminClient();
    for (const slug of chainSlugs) {
      const product = getProduct(slug);
      if (!product) continue;
      const { data: items } = await admin.from("order_items").select("order_id").eq("product_id", product.id);
      const orderIds = (items ?? []).map((item) => item.order_id);
      let paid = false;
      if (orderIds.length) {
        const { data: paidOrders } = await admin
          .from("orders")
          .select("id")
          .in("id", orderIds)
          .eq("status", "paid")
          .neq("payment_provider", SIMULATION_PROVIDER);
        paid = (paidOrders ?? []).length > 0;
        const realIds = (paidOrders ?? []).map((row) => row.id as string);
        if (realIds.length) {
          const { count: entitlementCount } = await admin
            .from("entitlements")
            .select("id", { count: "exact", head: true })
            .eq("product_id", product.id)
            .eq("status", "active")
            .in("order_id", realIds);
          const { count: emailCount } = await admin
            .from("email_events")
            .select("id", { count: "exact", head: true })
            .eq("product_id", product.id)
            .eq("type", "purchase_confirmation")
            .eq("status", "sent")
            .in("order_id", realIds);
          chain.push({
            slug,
            name: product.name,
            paid,
            entitlement: (entitlementCount ?? 0) > 0,
            email: (emailCount ?? 0) > 0,
          });
          continue;
        }
      }
      chain.push({
        slug,
        name: product.name,
        paid: false,
        entitlement: false,
        email: false,
      });
    }
  } catch {
    if (!chain.length) {
      for (const slug of chainSlugs) {
        const product = getProduct(slug);
        if (!product) continue;
        chain.push({ slug, name: product.name, paid: false, entitlement: false, email: false });
      }
    }
  }

  const bothPassed = chain.length === 2 && chain.every((row) => row.paid && row.entitlement && row.email);
  const readyToFlipLive = bothPassed && checklist.secretsReady && !checklist.liveModeSet;

  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin" className="font-mono-label text-ink-soft">
        ← Admin
      </Link>
      <h1 className="mt-6 type-h2">Commerce go-live</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
        One success criterion: a real rupee payment becomes a verified webhook, an order, a customer, an entitlement, a purchase email, a magic-link login, and the purchased tool. Until that chain works for Design Roulette and Design IQ, keep NEXT_PUBLIC_COMMERCE_MODE=whatsapp. Do not paste secrets into git or chat. Put them in Vercel and local .env.
      </p>

      <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="font-mono-label text-ink-soft">Mode</dt>
          <dd className="mt-2 type-h2">{checklist.mode}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">Secrets present</dt>
          <dd className="mt-2 type-h2">{checklist.secretsReady ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">Checkout enabled</dt>
          <dd className="mt-2 type-h2">{checklist.checkoutEnabled ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">Flip live?</dt>
          <dd className="mt-2 type-h2">{readyToFlipLive ? "Ready" : "Not yet"}</dd>
        </div>
      </dl>

      <h2 className="mt-16 type-h3">Environment (presence only)</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        <li className="flex justify-between gap-4 py-3">
          <span>Razorpay key ID</span>
          <Mark ok={checklist.razorpay.keyId} />
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Razorpay key secret</span>
          <Mark ok={checklist.razorpay.keySecret} />
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Razorpay webhook secret</span>
          <Mark ok={checklist.razorpay.webhookSecret} />
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Supabase URL</span>
          <Mark ok={checklist.supabase.url} />
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Supabase anon key</span>
          <Mark ok={checklist.supabase.anonKey} />
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Supabase service role</span>
          <Mark ok={checklist.supabase.serviceRole} />
        </li>
        <li className="flex justify-between gap-4 py-3">
          <span>Resend API key</span>
          <Mark ok={checklist.resend.apiKey} />
        </li>
      </ul>
      <p className="mt-4 font-mono-label text-ink-soft">
        Webhook URL: {site}
        {checklist.webhookPath}
        <br />
        Auth redirect: {site}
        {checklist.authCallbackPath}
      </p>

      <h2 className="mt-16 type-h3">Paid chain</h2>
      <p className="mt-3 max-w-xl text-sm text-ink-soft">
        Run Design Roulette first, then Design IQ. Only a sent purchase email counts. Skipped mail is not production-ready.
      </p>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {chain.map((row) => (
          <li key={row.slug} className="grid gap-2 py-4 sm:grid-cols-[1fr_6rem_8rem_6rem]">
            <span>{row.name}</span>
            <span>Paid: {row.paid ? "yes" : "no"}</span>
            <span>Entitlement: {row.entitlement ? "yes" : "no"}</span>
            <span>Email: {row.email ? "yes" : "no"}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-xl text-sm text-ink-soft">
        {bothPassed
          ? "Both live products have a paid entitlement and a purchase email. Set NEXT_PUBLIC_COMMERCE_MODE=live in Vercel, then redeploy. Do not commit that value from this page."
          : "Automated commerce stays on WhatsApp until both rows are yes."}
      </p>
    </section>
  );
}
