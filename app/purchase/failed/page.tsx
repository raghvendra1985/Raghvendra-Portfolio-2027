import type { Metadata } from "next";
import MagneticButton from "@/components/buttons/MagneticButton";

export const metadata: Metadata = {
  title: "Payment not completed",
  robots: { index: false, follow: false },
};

export default function PurchaseFailedPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32 sm:pt-40">
      <p className="font-mono-label text-[11px] text-ink-soft">Purchase</p>
      <h1 className="mt-6 max-w-3xl font-display text-[clamp(2rem,7vw,3.75rem)] leading-[1.12] text-navy">
        Payment did not complete.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        Nothing was granted. You can try checkout again, or message on WhatsApp if the window closed.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <MagneticButton href="/products">Back to products</MagneticButton>
        <MagneticButton href="/account/library" variant="secondary">
          Check My Library
        </MagneticButton>
      </div>
    </section>
  );
}
