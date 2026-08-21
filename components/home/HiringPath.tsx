"use client";

import MagneticButton from "@/components/buttons/MagneticButton";
import ResumeCta from "@/components/cta/ResumeCta";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";

const capabilities = [
  "Product strategy",
  "Complex systems",
  "AI products",
  "DesignOps",
  "Design systems",
  "Hands-on execution",
];

export default function HiringPath() {
  return (
    <SectionReveal
      id="hire"
      className="scroll-mt-28 border-t border-line px-[var(--page-pad)] py-20"
    >
      <div data-reveal-item className="mx-auto max-w-[1440px]">
        <div className="grid overflow-hidden border border-line bg-paper lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-between border-b border-line p-6 sm:p-10 lg:border-b-0 lg:border-r">
            <div>
              <p className="font-mono-label text-gold">Hiring</p>
              <h2 className="mt-3 max-w-xl type-h2">
                Hiring for Product Design Leadership?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                Product strategy, complex systems, AI products, DesignOps, design systems, and
                hands-on product execution.
              </p>
            </div>
            <div data-cta-row className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
          <ul className="grid sm:grid-cols-2">
            {capabilities.map((item) => (
              <li
                key={item}
                className="flex min-h-[4.75rem] items-center border-b border-line px-6 py-5 last:border-b-0 sm:border-r sm:odd:border-r sm:even:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <span className="type-h3 text-[1.15rem] leading-snug sm:text-[1.25rem]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionReveal>
  );
}
