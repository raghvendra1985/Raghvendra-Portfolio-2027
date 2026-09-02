import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import {
  DirectionSection,
  WireCtas,
  heroDirectionCopy,
  impactTerms,
} from "@/components/home/hero-directions/shared";
import { homeMarks } from "@/visual-language/marks";

export default function HeroDirectionC() {
  const copy = heroDirectionCopy.C;

  return (
    <DirectionSection
      id="direction-c"
      title="Direction C — Evidence strip"
      subtitle="Minimal illustration; impact terms pulled into the hero fold."
      notes={[
        "Visual weight from data — terms only, details stay in Selected Impact below.",
        "Tiny system-object mark; one proof line under headline.",
        "Risk: can read résumé-header if headline scale is too small.",
      ]}
    >
      <div className="px-[var(--page-pad)] pb-14 pt-[calc(var(--nav-height)+1rem)] sm:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-4">
            <SystemObjectMark
              src={homeMarks.hero.src}
              motion={homeMarks.hero.motion}
              surface={homeMarks.hero.surface}
              size="sm"
            />
            <p className="font-mono-label text-navy/80">{heroDirectionCopy.roleLine}</p>
          </div>
          <h2 className="mt-6 max-w-[16em] type-hero text-navy">{copy.headline}</h2>
          <p className="mt-4 max-w-xl type-lead text-ink-soft">{copy.proof}</p>
          <div className="mt-10">
            <WireCtas />
          </div>
          <div className="mt-12 border border-dashed border-line bg-paper">
            <p className="border-b border-line px-4 py-2 font-mono-label text-ink-soft">
              Evidence strip (terms only)
            </p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
              {impactTerms.map((term, index) => (
                <li
                  key={term}
                  className={`border-line px-4 py-5 font-serif text-lg text-navy ${
                    index > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
                  }`}
                >
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DirectionSection>
  );
}
