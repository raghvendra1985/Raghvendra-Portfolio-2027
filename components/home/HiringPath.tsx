"use client";

import MagneticButton from "@/components/buttons/MagneticButton";
import ResumeCta from "@/components/cta/ResumeCta";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";
import { homeHiring } from "@/home/copy";

export default function HiringPath() {
  return (
    <SectionReveal
      id="hire"
      charmRest
      className="scroll-mt-[var(--hash-offset)] border-t border-line px-[var(--page-pad)] py-20"
    >
      <div data-reveal-item className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl border border-line bg-paper p-6 sm:p-10">
          <p className="font-mono-label text-navy/80">{homeHiring.eyebrow}</p>
          <h2 className="mt-3 max-w-xl type-h2">{homeHiring.title}</h2>
          <p className="mt-4 max-w-[65ch] type-body text-ink">{homeHiring.body}</p>
          <div data-cta-row className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <MagneticButton
              href={homeHiring.primary.href}
              cursor="Open"
              onClick={() =>
                track("hiring_path_clicked", { surface: "home_hiring", dest: "experience" })
              }
              className="w-full justify-center sm:w-auto"
            >
              {homeHiring.primary.label}
            </MagneticButton>
            <ResumeCta className="w-full justify-center sm:w-auto" source="home_recruiter" />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
