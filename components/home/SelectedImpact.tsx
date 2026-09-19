import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { leadershipImpact } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

export default function SelectedImpact() {
  return (
    <SectionReveal className="border-t border-line bg-paper px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div data-reveal-item>
          <div className="flex items-center gap-4">
            <SystemObjectMark
              src={homeMarks.impact.src}
              motion={homeMarks.impact.motion}
              surface={homeMarks.impact.surface}
            />
            <p className="font-mono-label text-navy/80">
              {leadershipImpact.eyebrow}
            </p>
          </div>
          <h2 className="mt-4 max-w-3xl type-h2">
            {leadershipImpact.title}
          </h2>
        </div>
        <dl
          className="mt-8 grid gap-0 border-t border-line sm:mt-12 md:grid-cols-2 xl:grid-cols-3"
          data-reveal-item
        >
          {leadershipImpact.items.map((item) => (
            <div
              key={item.term}
              className="flex flex-col border-b border-line py-7 md:border-r md:px-6 md:py-8 md:[&:nth-child(odd)]:pl-0 md:[&:nth-child(even)]:border-r-0 md:[&:nth-child(even)]:pr-0 xl:border-b-0 xl:px-8 xl:py-10 xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-child(3n)]:pr-0 xl:[&:nth-child(3n+1)]:pl-0 xl:[&:nth-child(even)]:border-r xl:[&:nth-child(even)]:pr-8"
            >
              <dt className="min-h-[1.35em] font-serif text-[1.5rem] leading-none text-navy sm:text-[1.75rem]">
                {item.term}
              </dt>
              <dd className="mt-3 max-w-[36ch] type-body text-ink-soft sm:mt-4">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionReveal>
  );
}
