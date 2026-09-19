import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { leadershipCapabilities } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

export default function CapabilityModel() {
  return (
    <SectionReveal
      id={leadershipCapabilities.id}
      className="scroll-mt-[var(--hash-offset)] border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div data-reveal-item>
          <div className="flex items-center gap-4">
            <SystemObjectMark
              src={homeMarks.lead.src}
              motion={homeMarks.lead.motion}
              surface={homeMarks.lead.surface}
            />
            <p className="font-mono-label text-navy/80">
              {leadershipCapabilities.eyebrow}
            </p>
          </div>
          <h2 className="mt-4 max-w-3xl type-h2">
            {leadershipCapabilities.title}
          </h2>
          <p className="mt-4 max-w-[58ch] type-body text-ink-soft">
            {leadershipCapabilities.intro}
          </p>
        </div>

        <div
          className="mt-12 grid gap-0 border-t border-line sm:grid-cols-3"
          data-reveal-item
        >
          {leadershipCapabilities.groups.map((group) => (
            <article
              key={group.title}
              className="border-b border-line py-8 sm:border-b-0 sm:border-r sm:px-6 sm:py-10 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <h3 className="font-mono-label text-navy">{group.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="max-w-[28ch] text-sm leading-snug text-navy sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
