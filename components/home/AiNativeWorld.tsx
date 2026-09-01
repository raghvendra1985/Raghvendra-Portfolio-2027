import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { leadershipAi } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

export default function AiNativeWorld() {
  return (
    <SectionReveal
      id={leadershipAi.id}
      className="scroll-mt-[var(--hash-offset)] border-t border-line bg-navy px-[var(--page-pad)] py-14 text-mist sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div data-reveal-item>
            <div className="flex items-center gap-4">
              <SystemObjectMark
                src={homeMarks.approach.src}
                motion={homeMarks.approach.motion}
                surface={homeMarks.approach.surface}
              />
              <p className="font-mono-label text-mist/70">{leadershipAi.eyebrow}</p>
            </div>
            <h2 className="mt-4 max-w-xl type-h1 text-[clamp(1.75rem,6vw,3.5rem)]">{leadershipAi.title}</h2>
            <p className="mt-6 max-w-[42ch] type-lead text-mist/85">{leadershipAi.intro}</p>
          </div>
          <ol className="space-y-0 border-t border-mist/15" data-reveal-item>
            {leadershipAi.shifts.map((shift, index) => (
              <li
                key={shift.title}
                className="grid gap-4 border-b border-mist/15 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8"
              >
                <span className="font-mono-label text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="type-h3 text-mist">{shift.title}</h3>
                  <p className="mt-3 max-w-[58ch] type-body text-mist/85">{shift.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionReveal>
  );
}
