"use client";

import SectionReveal from "@/components/reveal/SectionReveal";
import CharmPicker from "@/components/delight/CharmPicker";

export default function CharmGallery() {
  return (
    <SectionReveal className="charm-gallery border-t border-line px-[var(--page-pad)] py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-2xl" data-reveal-item>
          <p className="font-mono-label text-[11px] text-ink-soft">Hang</p>
          <h2 className="charm-title-metal mt-4 text-3xl sm:text-5xl">Choose a charm.</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            A small ritual for the visit. Each charm maps to how the work actually happens —
            decisions, systems, judgment, and shipping. Hang the one that fits why you are here.
          </p>
          <p className="mt-6 font-mono-label text-[11px] text-ink-soft">
            Special thanks to Karthik Mahadevan for the hanging-charm idea.
          </p>
        </div>
        <div className="mt-12" data-reveal-item>
          <CharmPicker tone="mist" credit={false} />
        </div>
      </div>
    </SectionReveal>
  );
}
