import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getProductById } from "@/products";

export const metadata: Metadata = { title: "Entitlements · Admin", robots: { index: false, follow: false } };

export default async function AdminEntitlementsPage() {
  let rows: Array<{ id: string; product_id: string; status: string; customer_id: string }> = [];
  try {
    const admin = requireAdminClient();
    const { data } = await admin
      .from("entitlements")
      .select("id, product_id, status, granted_at, customer_id")
      .order("created_at", { ascending: false })
      .limit(200);
    rows = data ?? [];
  } catch {
    rows = [];
  }
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin" className="font-mono-label text-[11px] text-ink-soft">
        ← Admin
      </Link>
      <h1 className="mt-6 font-display text-4xl">Entitlements</h1>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <li key={row.id} className="flex flex-wrap justify-between gap-4 py-4">
            <span>{getProductById(row.product_id)?.name ?? row.product_id}</span>
            <span className="capitalize">{row.status}</span>
            <Link href={`/admin/customers/${row.customer_id}`} className="font-mono-label text-[11px]">
              Customer
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
