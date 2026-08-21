import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminClient } from "@/lib/supabase/admin";
import { formatInr } from "@/products";

export const metadata: Metadata = { title: "Orders · Admin", robots: { index: false, follow: false } };

export default async function AdminOrdersPage() {
  let rows: Array<{ id: string; status: string; total: number }> = [];
  try {
    const admin = requireAdminClient();
    const { data } = await admin
      .from("orders")
      .select("id, status, total, created_at, razorpay_order_id, customer_id")
      .order("created_at", { ascending: false })
      .limit(100);
    rows = data ?? [];
  } catch {
    rows = [];
  }
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin" className="font-mono-label text-ink-soft">
        ← Admin
      </Link>
      <h1 className="mt-6 type-h2">Orders</h1>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {rows.map((order) => (
          <li key={order.id} className="flex flex-wrap justify-between gap-4 py-4">
            <Link href={`/admin/orders/${order.id}`}>{order.id}</Link>
            <span className="capitalize">{order.status}</span>
            <span>{formatInr(order.total)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
