import SectionReveal from "@/components/reveal/SectionReveal";
import { leadershipLead } from "@/home/leadership-home";

export default function HowILead() {
  return (
    <SectionReveal className="border-t border-line bg-paper px-[var(--page-pad)] py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl" data-reveal-item>
          <p className="font-mono-label text-navy/80">{leadershipLead.eyebrow}</p>
          <h2 className="mt-4 type-h2">{leadershipLead.title}</h2>
          <p className="mt-6 max-w-[62ch] type-lead text-ink">{leadershipLead.intro}</p>
        </div>
        <ol className="mt-14 space-y-0 border-t border-line" data-reveal-item>
          {leadershipLead.stages.map((stage, index) => (
            <li
              key={stage.title}
              className="grid gap-4 border-b border-line py-8 sm:grid-cols-[minmax(0,8rem)_minmax(0,1fr)] sm:items-baseline lg:grid-cols-[minmax(0,10rem)_minmax(0,12rem)_minmax(0,1fr)]"
            >
              <span className="font-mono-label text-navy/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[1.75rem] leading-none text-navy">{stage.title}</h3>
              <p className="max-w-[58ch] type-body text-ink-soft lg:justify-self-end">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
