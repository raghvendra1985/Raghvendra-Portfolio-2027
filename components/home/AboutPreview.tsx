import AboutPolaroid from "@/components/about/AboutPolaroid";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import SectionReveal from "@/components/reveal/SectionReveal";
import { leadershipAbout } from "@/home/leadership-home";

export default function AboutPreview() {
  return (
    <SectionReveal className="border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <div data-reveal-item className="mx-auto w-full max-w-[min(320px,100%)] lg:mx-0">
          <AboutPolaroid
            src={leadershipAbout.image.src}
            alt={leadershipAbout.image.alt}
            idle
            sizes="320px"
          />
        </div>
        <div data-reveal-item>
          <p className="font-mono-label text-navy/80">{leadershipAbout.eyebrow}</p>
          <h2 className="mt-4 max-w-xl font-serif text-[clamp(2rem,1.5rem+1.6vw,3.15rem)] font-normal leading-[1.15] tracking-[-0.02em]">
            {leadershipAbout.title}
          </h2>
          <p className="mt-6 max-w-[65ch] type-lead text-ink">{leadershipAbout.body}</p>
          <div className="mt-8">
            <TrackedMagneticButton
              href={leadershipAbout.href}
              variant="secondary"
              cursor="Open"
              className="w-full justify-center sm:w-auto"
              event="nav_clicked"
              payload={{ surface: "home_about", dest: "/about" }}
            >
              {leadershipAbout.cta}
            </TrackedMagneticButton>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
