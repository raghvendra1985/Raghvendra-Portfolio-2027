import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import { getCustomerForUser } from "@/lib/commerce/access";
import { requireAdminClient } from "@/lib/supabase/admin";
import { pageMetadataExtras } from "@/lib/seo";
import { formatInr } from "@/products";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
  ...pageMetadataExtras({ title: "Orders", description: "Your product orders.", path: "/account/orders" }),
};

export default async function OrdersPage() {
  const { customer } = await getCustomerForUser();
  let orders: Array<{
    id: string;
    status: string;
    total: number;
    created_at: string;
    razorpay_order_id: string | null;
  }> = [];
  if (customer) {
    const admin = requireAdminClient();
    const { data } = await admin
      .from("orders")
      .select("id, status, total, created_at, razorpay_order_id")
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false });
    orders = data ?? [];
  }

  return (
    <>
      <PageHero index="—" label="Orders" title="Purchase history." description="Records stay even if a product file later changes." />
      <div className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
        {orders.length ? (
          <ul className="divide-y divide-line border-y border-line">
            {orders.map((order) => (
              <li key={order.id} className="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <div>
                  <p className="font-mono-label text-[11px] text-ink-soft">{order.id}</p>
                  <p className="mt-2 text-base capitalize">{order.status}</p>
                </div>
                <p className="font-mono-label text-[11px]">{formatInr(order.total)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-soft">No orders yet.</p>
        )}
      </div>
    </>
  );
}
