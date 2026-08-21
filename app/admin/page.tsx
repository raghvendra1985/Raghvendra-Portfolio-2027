import type { Metadata } from "next";
import Link from "next/link";
import { requireAdminClient } from "@/lib/supabase/admin";
import { formatInr, products } from "@/products";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminHomePage() {
  let orders = 0;
  let paid = 0;
  let revenue = 0;
  let customers = 0;
  let failed = 0;
  let optIns = 0;
  let recent: Array<{ id: string; status: string; total: number; created_at: string }> = [];
  try {
    const admin = requireAdminClient();
    const { data: orderRows } = await admin
      .from("orders")
      .select("id, status, total, created_at, payment_provider")
      .order("created_at", { ascending: false });
    const realOrders = (orderRows ?? []).filter((row) => row.payment_provider !== "simulation");
    recent = realOrders.slice(0, 8);
    orders = realOrders.length;
    paid = realOrders.filter((row) => row.status === "paid").length;
    failed = realOrders.filter((row) => row.status === "failed").length;
    revenue = realOrders.filter((row) => row.status === "paid").reduce((sum, row) => sum + row.total, 0);
    const { count } = await admin.from("customers").select("id", { count: "exact", head: true });
    customers = count ?? 0;
    const { count: consentCount } = await admin
      .from("marketing_consents")
      .select("id", { count: "exact", head: true })
      .eq("status", "opted_in");
    optIns = consentCount ?? 0;
  } catch {
    recent = [];
  }

  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <p className="font-mono-label text-ink-soft">Admin</p>
      <h1 className="mt-4 type-h2">Commerce</h1>
      <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Revenue" value={formatInr(revenue)} />
        <Stat label="Orders" value={String(orders)} />
        <Stat label="Paid" value={String(paid)} />
        <Stat label="Customers" value={String(customers)} />
        <Stat label="Failed payments" value={String(failed)} />
        <Stat label="Marketing opt-ins" value={String(optIns)} />
        <Stat label="Catalog products" value={String(products.length)} />
      </dl>
      <nav className="mt-12 flex flex-wrap gap-6 font-mono-label">
        <Link href="/admin/go-live">Go live</Link>
        <Link href="/admin/prelaunch">Pre-launch</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/customers">Customers</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/entitlements">Entitlements</Link>
      </nav>
      <h2 className="mt-16 type-h3">Recent purchases</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {recent.map((order) => (
          <li key={order.id} className="flex flex-wrap justify-between gap-4 py-4">
            <Link href={`/admin/orders/${order.id}`} className="font-mono-label">
              {order.id}
            </Link>
            <span className="capitalize">{order.status}</span>
            <span>{formatInr(order.total)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono-label text-ink-soft">{label}</dt>
      <dd className="mt-2 type-h2">{value}</dd>
    </div>
  );
}
