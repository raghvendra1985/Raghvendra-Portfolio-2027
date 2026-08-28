import SectionReveal from "@/components/reveal/SectionReveal";
import AboutEvidenceLink from "@/components/about/AboutEvidenceLink";
import { aboutPage } from "@/about";

export default function AboutTimeline() {
  return (
    <SectionReveal
      id="experience"
      className="scroll-mt-[var(--hash-offset)] mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24"
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <h2
          data-reveal-item
          className="type-h2 lg:sticky lg:top-[var(--hash-offset)] lg:self-start"
        >
          Five chapters. One direction.
        </h2>

        <ol className="relative mt-12 list-none pl-0 before:pointer-events-none before:absolute before:top-3 before:bottom-8 before:left-[0.9375rem] before:w-px before:bg-gold/40 before:content-[''] lg:mt-0">
          {aboutPage.timeline.map((era, index) => (
            <li
              key={era.id}
              id={era.id}
              data-reveal-item
              className="relative grid scroll-mt-[var(--hash-offset)] grid-cols-[1.875rem_minmax(0,1fr)] gap-5 pb-12 last:pb-0 sm:gap-8"
            >
              <p className="relative z-[1] flex h-[1.875rem] w-[1.875rem] items-center justify-center bg-mist font-mono-label text-gold">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <p className="font-mono-label text-ink-soft">{era.range}</p>
                <h3 className="mt-3 type-h3">{era.role}</h3>
                <p className="mt-1 text-sm text-green">{era.org}</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  {era.context}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  {era.owned}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy">
                  {era.learned}
                </p>
                {era.evidence ? <AboutEvidenceLink evidence={era.evidence} /> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
