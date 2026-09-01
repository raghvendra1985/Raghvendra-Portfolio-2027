import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { leadershipPrinciples } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

export default function IntelligentPrinciples() {
  return (
    <SectionReveal className="border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center gap-4" data-reveal-item>
          <SystemObjectMark
            src={homeMarks.principles.src}
            motion={homeMarks.principles.motion}
            surface={homeMarks.principles.surface}
          />
          <div>
            <p className="font-mono-label text-navy/80">
              {leadershipPrinciples.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl type-h2">
              {leadershipPrinciples.title}
            </h2>
          </div>
        </div>
        <ol
          className="mt-12 grid gap-0 border-t border-line md:grid-cols-2"
          data-reveal-item
        >
          {leadershipPrinciples.items.map((item, index) => (
            <li
              key={item}
              className="flex gap-5 border-b border-line py-8 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0"
            >
              <span className="font-mono-label text-green">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[40ch] font-serif text-[1.35rem] leading-snug text-navy sm:text-[1.5rem]">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
