import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminClient } from "@/lib/supabase/admin";
import { formatInr } from "@/products";

export const metadata: Metadata = { title: "Order · Admin", robots: { index: false, follow: false } };

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = requireAdminClient();
  const { data: order } = await admin.from("orders").select("*").eq("id", id).maybeSingle();
  if (!order) notFound();
  const { data: customer } = await admin.from("customers").select("*").eq("id", order.customer_id).maybeSingle();
  const { data: items } = await admin.from("order_items").select("*").eq("order_id", id);
  const { data: payments } = await admin.from("payments").select("*").eq("order_id", id);
  const { data: entitlements } = await admin.from("entitlements").select("*").eq("order_id", id);
  const { data: emails } = await admin.from("email_events").select("*").eq("order_id", id);
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin/orders" className="font-mono-label text-[11px] text-ink-soft">
        ← Orders
      </Link>
      <h1 className="mt-6 font-display text-4xl">Order</h1>
      <dl className="mt-8 grid gap-4 text-sm">
        <Row label="Order ID" value={order.id} />
        <Row label="Status" value={order.status} />
        <Row label="Amount" value={formatInr(order.total)} />
        <Row label="Customer" value={customer?.email ?? order.customer_id} />
        <Row label="Razorpay order" value={order.razorpay_order_id ?? "—"} />
        <Row label="Razorpay payment" value={order.razorpay_payment_id ?? "—"} />
        <Row label="Paid at" value={order.paid_at ?? "—"} />
      </dl>
      <h2 className="mt-12 font-display text-2xl">Items</h2>
      <ul className="mt-4 space-y-2">
        {(items ?? []).map((item) => (
          <li key={item.id}>
            {item.product_name_snapshot} · {formatInr(item.unit_price_snapshot)}
          </li>
        ))}
      </ul>
      <h2 className="mt-12 font-display text-2xl">Payments</h2>
      <ul className="mt-4 space-y-2">
        {(payments ?? []).map((payment) => (
          <li key={payment.id}>
            {payment.status} · {payment.provider_payment_id}
          </li>
        ))}
      </ul>
      <h2 className="mt-12 font-display text-2xl">Entitlements</h2>
      <ul className="mt-4 space-y-2">
        {(entitlements ?? []).map((row) => (
          <li key={row.id}>
            {row.product_id} · {row.status}
          </li>
        ))}
      </ul>
      <h2 className="mt-12 font-display text-2xl">Email</h2>
      <ul className="mt-4 space-y-2">
        {(emails ?? []).map((row) => (
          <li key={row.id}>
            {row.type} · {row.status}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[12rem_1fr]">
      <dt className="font-mono-label text-[11px] text-ink-soft">{label}</dt>
      <dd className="break-all">{value}</dd>
    </div>
  );
}
