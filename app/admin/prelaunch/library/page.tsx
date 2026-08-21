import type { Metadata } from "next";
import Link from "next/link";
import LibraryActions from "@/components/commerce/LibraryActions";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import { getCustomerForUser } from "@/lib/commerce/access";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getProductById } from "@/products";
import { SIMULATION_PROVIDER } from "@/lib/commerce/simulate";

export const metadata: Metadata = {
  title: "Library preview · Pre-Launch",
  robots: { index: false, follow: false },
};

export default async function LibraryPreviewPage() {
  const { customer } = await getCustomerForUser();
  let items: Array<{ productId: string; grantedAt: string | null; simulated: boolean }> = [];

  if (customer) {
    try {
      const admin = requireAdminClient();
      const { data } = await admin
        .from("entitlements")
        .select("product_id, granted_at, order_id")
        .eq("customer_id", customer.id)
        .eq("status", "active")
        .order("granted_at", { ascending: false });
      const orderIds = [...new Set((data ?? []).map((row) => row.order_id as string).filter(Boolean))];
      const simulatedOrders = new Set<string>();
      if (orderIds.length) {
        const { data: orders } = await admin
          .from("orders")
          .select("id, payment_provider")
          .in("id", orderIds);
        for (const order of orders ?? []) {
          if (order.payment_provider === SIMULATION_PROVIDER) simulatedOrders.add(order.id as string);
        }
      }
      items = (data ?? []).map((row) => ({
        productId: row.product_id,
        grantedAt: row.granted_at,
        simulated: simulatedOrders.has(row.order_id as string),
      }));
    } catch {
      items = [];
    }
  }

  return (
    <PrelaunchShell
      title="Customer Library Preview"
      deck="This is the same LibraryActions a student sees after buying. Simulated purchases are labeled. Hybrid products keep Open Product and Download."
    >
      <p className="mt-6 font-mono-label text-ink-soft">
        Public library:{" "}
        <Link href="/account/library" className="underline decoration-gold underline-offset-4">
          /account/library
        </Link>
      </p>
      {items.length ? (
        <div className="mt-10 grid gap-6">
          <p className="font-mono-label text-ink-soft">MY PRODUCTS</p>
          {items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <div key={product.id}>
                {item.simulated ? (
                  <p className="mb-2 font-mono-label text-gold">SIMULATION MODE — not revenue</p>
                ) : null}
                <LibraryActions product={product} purchasedAt={item.grantedAt} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-10 max-w-xl text-sm leading-relaxed text-ink-soft">
          No entitlements on this admin email yet. Run a simulated purchase first.
        </p>
      )}
    </PrelaunchShell>
  );
}
