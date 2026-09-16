import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { homeMarks } from "@/visual-language/marks";

export default function ApproachTeaser() {
  return (
    <SectionReveal
      id="approach"
      className="scroll-mt-[var(--hash-offset)] border-t border-line px-[var(--page-pad)] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div data-reveal-item className="max-w-2xl">
          <div className="flex items-center gap-4">
            <SystemObjectMark
              src={homeMarks.approach.src}
              motion={homeMarks.approach.motion}
              surface={homeMarks.approach.surface}
            />
            <p className="font-mono-label text-navy/80">Approach</p>
          </div>
          <h2 className="mt-4 max-w-[20ch] type-h2">
            Frame → Design → Build → Validate
          </h2>
          <p className="mt-4 max-w-[52ch] type-body text-ink-soft">
            How I operate as a senior product designer — decision-making,
            systems thinking, collaboration, and execution.
          </p>
        </div>
        <Link
          href="/approach"
          data-reveal-item
          className="inline-flex min-h-11 items-center font-mono-label text-navy hover:text-green"
        >
          Read the approach →
        </Link>
      </div>
    </SectionReveal>
  );
}
