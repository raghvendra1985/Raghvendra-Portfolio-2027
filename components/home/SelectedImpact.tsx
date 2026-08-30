import SectionReveal from "@/components/reveal/SectionReveal";
import { leadershipImpact } from "@/home/leadership-home";

export default function SelectedImpact() {
  return (
    <SectionReveal className="border-t border-line bg-paper px-[var(--page-pad)] py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono-label text-navy/80" data-reveal-item>
          {leadershipImpact.eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl type-h2" data-reveal-item>
          {leadershipImpact.title}
        </h2>
        <dl
          className="mt-12 grid gap-0 border-t border-line sm:grid-cols-2 xl:grid-cols-4"
          data-reveal-item
        >
          {leadershipImpact.items.map((item) => (
            <div
              key={item.term}
              className="border-b border-line py-8 sm:px-6 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0 xl:border-b-0 xl:border-r xl:px-8 xl:py-10 xl:even:pr-8 xl:first:pl-0 xl:last:border-r-0"
            >
              <dt className="font-serif text-[1.35rem] leading-snug text-navy sm:text-[1.5rem]">
                {item.term}
              </dt>
              <dd className="mt-4 max-w-[36ch] type-body text-ink-soft">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionReveal>
  );
}
