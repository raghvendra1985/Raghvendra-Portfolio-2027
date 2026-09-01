import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { leadershipLead } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

export default function HowILead() {
  return (
    <SectionReveal className="border-t border-line bg-paper px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-start gap-4" data-reveal-item>
          <SystemObjectMark
            src={homeMarks.lead.src}
            motion={homeMarks.lead.motion}
            surface={homeMarks.lead.surface}
          />
          <div className="max-w-3xl">
            <p className="font-mono-label text-navy/80">{leadershipLead.eyebrow}</p>
            <h2 className="mt-4 type-h2">{leadershipLead.title}</h2>
            <p className="mt-6 max-w-[62ch] type-lead text-ink">{leadershipLead.intro}</p>
          </div>
        </div>
        <ol className="mt-10 space-y-0 border-t border-line sm:mt-14" data-reveal-item>
          {leadershipLead.stages.map((stage, index) => (
            <li
              key={stage.title}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-line py-7 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-8 lg:grid-cols-[6rem_10rem_minmax(0,1fr)] lg:items-baseline"
            >
              <span className="font-mono-label text-navy/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[1.5rem] leading-tight text-navy sm:text-[1.75rem] sm:leading-none">
                {stage.title}
              </h3>
              <p className="col-span-2 max-w-[58ch] type-body text-ink-soft sm:col-span-1 sm:col-start-2 lg:col-start-auto lg:justify-self-end">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
