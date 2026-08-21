import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/reveal/PageHero";
import { getCustomerForUser } from "@/lib/commerce/access";
import { pageMetadataExtras } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
  ...pageMetadataExtras({ title: "Account", description: "Your student product account.", path: "/account" }),
};

export default async function AccountPage() {
  const { user, customer } = await getCustomerForUser();
  return (
    <>
      <PageHero
        index="—"
        label="Account"
        title="Your products live here."
        description={customer ? `Signed in as ${customer.email}.` : `Signed in as ${user?.email ?? ""}.`}
      />
      <div className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
        <ul className="space-y-4 font-mono-label">
          <li>
            <Link href="/account/library" className="inline-flex min-h-11 items-center hover:text-gold">
              My Library →
            </Link>
          </li>
          <li>
            <Link href="/account/orders" className="inline-flex min-h-11 items-center hover:text-gold">
              Orders →
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
