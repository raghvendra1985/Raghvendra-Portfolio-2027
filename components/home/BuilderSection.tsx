import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { leadershipBuilder } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

export default function BuilderSection() {
  return (
    <SectionReveal
      id={leadershipBuilder.id}
      className="scroll-mt-[var(--hash-offset)] border-t border-line bg-paper px-[var(--page-pad)] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div data-reveal-item>
            <div className="flex items-center gap-4">
              <SystemObjectMark
                src={homeMarks.approach.src}
                motion={homeMarks.approach.motion}
                surface="paper"
              />
              <p className="font-mono-label text-navy/80">
                {leadershipBuilder.eyebrow}
              </p>
            </div>
            <h2 className="mt-4 max-w-[18ch] type-h1 text-navy">
              {leadershipBuilder.title}
            </h2>
            <p className="mt-5 max-w-[58ch] type-lead text-ink-soft">
              {leadershipBuilder.body}
            </p>
          </div>

          <div data-reveal-item className="min-w-0">
            <p className="font-mono-label text-navy/70">Workflow</p>
            <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3 sm:gap-x-3">
              {leadershipBuilder.workflow.map((step, index) => (
                <li key={step} className="flex items-center gap-2 sm:gap-3">
                  <span className="font-serif text-[1.35rem] leading-none text-navy sm:text-[1.6rem]">
                    {step}
                  </span>
                  {index < leadershipBuilder.workflow.length - 1 ? (
                    <span
                      className="font-mono-label text-navy/40"
                      aria-hidden
                    >
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-8 font-mono-label text-[11px] tracking-[0.08em] text-navy/50">
              {leadershipBuilder.toolsLabel}
            </p>
            <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-ink-soft">
              {leadershipBuilder.tools.join(" · ")}
            </p>
            {"cta" in leadershipBuilder && leadershipBuilder.cta ? (
              <a
                href={leadershipBuilder.cta.href}
                className="mt-8 inline-flex min-h-11 items-center font-mono-label text-navy hover:underline"
              >
                {leadershipBuilder.cta.label} →
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
