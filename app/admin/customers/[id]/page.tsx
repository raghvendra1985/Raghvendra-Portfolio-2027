import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminCustomerActions from "@/components/commerce/AdminCustomerActions";
import { requireAdminClient } from "@/lib/supabase/admin";
import { formatInr, getProductById } from "@/products";

export const metadata: Metadata = { title: "Customer · Admin", robots: { index: false, follow: false } };

export default async function AdminCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = requireAdminClient();
  const { data: customer } = await admin.from("customers").select("*").eq("id", id).maybeSingle();
  if (!customer) notFound();
  const { data: orders } = await admin.from("orders").select("*").eq("customer_id", id).order("created_at", { ascending: false });
  const { data: entitlements } = await admin.from("entitlements").select("*").eq("customer_id", id);
  const { data: consents } = await admin.from("marketing_consents").select("*").eq("customer_id", id);
  const lifetime = (orders ?? []).filter((order) => order.status === "paid").reduce((sum, order) => sum + order.total, 0);
  const first = orders?.[orders.length - 1]?.created_at;
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin/customers" className="font-mono-label text-ink-soft">
        ← Customers
      </Link>
      <h1 className="mt-6 type-h2">{customer.name ?? customer.email}</h1>
      <dl className="mt-8 grid gap-3 text-sm">
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone ?? "—"}</p>
        <p>First purchase: {first ?? "—"}</p>
        <p>Last purchase: {customer.last_purchase_at ?? "—"}</p>
        <p>Lifetime: {formatInr(lifetime)}</p>
        <p>Consent: {(consents ?? []).map((row) => `${row.consent_type} ${row.status}`).join(" · ") || "—"}</p>
      </dl>
      <h2 className="mt-12 type-h3">Products owned</h2>
      <ul className="mt-4 space-y-2">
        {(entitlements ?? []).map((row) => (
          <li key={row.id}>
            {getProductById(row.product_id)?.name ?? row.product_id} · {row.status}
          </li>
        ))}
      </ul>
      <h2 className="mt-12 type-h3">Orders</h2>
      <ul className="mt-4 space-y-2">
        {(orders ?? []).map((order) => (
          <li key={order.id}>
            <Link href={`/admin/orders/${order.id}`}>{order.id}</Link> · {order.status} · {formatInr(order.total)}
          </li>
        ))}
      </ul>
      <AdminCustomerActions customerId={customer.id} entitlements={entitlements ?? []} />
    </section>
  );
}
