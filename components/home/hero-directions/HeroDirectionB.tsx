import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import {
  DirectionSection,
  WireCtas,
  heroDirectionCopy,
} from "@/components/home/hero-directions/shared";
import { homeMarks } from "@/visual-language/marks";

export default function HeroDirectionB() {
  const copy = heroDirectionCopy.B;

  return (
    <DirectionSection
      id="direction-b"
      title="Direction B — Typographic door"
      subtitle="Type carries the hero; small mark beside eyebrow; hairline grid motif."
      notes={[
        "Fastest recruiter scan — ultra-short headline, no large illustration.",
        "Faint registration grid at 4% opacity; mark at sm scale only.",
        "Risk: less immediate wow; strongest for clarity over spectacle.",
      ]}
    >
      <div className="relative px-[var(--page-pad)] pb-14 pt-[calc(var(--nav-height)+1rem)] sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--navy) 1px, transparent 1px), linear-gradient(to bottom, var(--navy) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-[56rem]">
          <div className="flex items-center gap-4">
            <SystemObjectMark
              src={homeMarks.hero.src}
              motion={homeMarks.hero.motion}
              surface={homeMarks.hero.surface}
              size="sm"
            />
            <p className="font-mono-label text-navy/80">{heroDirectionCopy.roleLine}</p>
          </div>
          <h2 className="mt-6 max-w-[12ch] type-hero text-navy">{copy.headline}</h2>
          <div className="mt-10 max-w-md border border-dashed border-line bg-surface-dim/40 px-4 py-3 font-mono-label text-ink-soft">
            Grid motif — editorial registration only
          </div>
          <div className="mt-10">
            <WireCtas />
          </div>
        </div>
      </div>
    </DirectionSection>
  );
}
