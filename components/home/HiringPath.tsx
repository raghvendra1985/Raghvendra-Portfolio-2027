"use client";

import MagneticButton from "@/components/buttons/MagneticButton";
import ResumeCta from "@/components/cta/ResumeCta";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";

export default function HiringPath() {
  return (
    <SectionReveal
      id="hire"
      className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-20"
    >
      <div
        data-reveal-item
        className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 border-t-2 border-navy pt-8 lg:flex-row lg:items-end"
      >
        <div className="max-w-2xl">
          <p className="font-mono-label text-ink-soft">Hiring</p>
          <h2 className="mt-3 type-h2">
            Hiring for Product Design Leadership?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            Product strategy, complex systems, AI products, DesignOps, design systems, and
            hands-on product execution.
          </p>
        </div>
        <div data-cta-row className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <MagneticButton
            href="/about#experience"
            cursor="Open"
            onClick={() => track("hiring_path_clicked", { to: "experience" })}
            className="w-full justify-center sm:w-auto"
          >
            View Experience
          </MagneticButton>
          <ResumeCta className="w-full justify-center sm:w-auto" source="home_recruiter" />
        </div>
      </div>
    </SectionReveal>
  );
}
