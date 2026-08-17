import type { Metadata } from "next";
import { Suspense } from "react";
import PurchaseSuccessView from "@/components/commerce/PurchaseSuccessView";

export const metadata: Metadata = {
  title: "Payment received",
  robots: { index: false, follow: false },
};

export default function PurchaseSuccessPage() {
  return (
    <Suspense>
      <PurchaseSuccessView />
    </Suspense>
  );
}
