import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Customers · Admin", robots: { index: false, follow: false } };

export default async function AdminCustomersPage() {
  let rows: Array<{ id: string; email: string; name: string | null }> = [];
  try {
    const admin = requireAdminClient();
    const { data } = await admin.from("customers").select("id, email, name, last_purchase_at").order("created_at", { ascending: false }).limit(100);
    rows = data ?? [];
  } catch {
    rows = [];
  }
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin" className="font-mono-label text-ink-soft">
        ← Admin
      </Link>
      <h1 className="mt-6 type-h2">Customers</h1>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {(rows ?? []).map((customer) => (
          <li key={customer.id} className="py-4">
            <Link href={`/admin/customers/${customer.id}`}>{customer.email}</Link>
            <p className="mt-1 text-sm text-ink-soft">{customer.name ?? "—"}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
