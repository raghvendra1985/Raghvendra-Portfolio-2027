import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { leadershipImpact } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

export default function SelectedImpact() {
  return (
    <SectionReveal className="border-t border-line bg-paper px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center gap-4" data-reveal-item>
          <SystemObjectMark
            src={homeMarks.impact.src}
            motion={homeMarks.impact.motion}
            surface={homeMarks.impact.surface}
          />
          <div>
            <p className="font-mono-label text-navy/80">
              {leadershipImpact.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl type-h2">
              {leadershipImpact.title}
            </h2>
          </div>
        </div>
        <dl
          className="mt-8 grid gap-0 border-t border-line sm:mt-12 md:grid-cols-2 xl:grid-cols-4"
          data-reveal-item
        >
          {leadershipImpact.items.map((item) => (
            <div
              key={item.term}
              className="border-b border-line py-7 md:px-6 md:odd:border-r md:odd:pl-0 md:even:pr-0 xl:border-b-0 xl:border-r xl:px-8 xl:py-10 xl:even:pr-8 xl:first:pl-0 xl:last:border-r-0"
            >
              <dt className="font-serif text-[1.25rem] leading-snug text-navy sm:text-[1.5rem]">
                {item.term}
              </dt>
              <dd className="mt-3 max-w-[36ch] type-body text-ink-soft sm:mt-4">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionReveal>
  );
}
