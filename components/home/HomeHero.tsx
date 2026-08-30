import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import { leadershipHero } from "@/home/leadership-home";

export default function HomeHero() {
  return (
    <section className="relative isolate px-[var(--page-pad)] pb-12 pt-24 sm:pb-16 sm:pt-32 lg:pb-28 lg:pt-36">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono-label text-navy/80">{leadershipHero.roleLine}</p>
        <h1 className="mt-5 max-w-[18em] font-display text-[clamp(1.85rem,1.35rem+2.6vw,4rem)] font-normal leading-[1.08] tracking-[-0.035em] text-navy lg:mt-6 lg:max-w-[14em]">
          {leadershipHero.headline}
        </h1>
        <p className="mt-5 max-w-[42rem] type-lead text-ink sm:mt-8">{leadershipHero.supporting}</p>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
          <TrackedMagneticButton
            href={leadershipHero.primary.href}
            cursor="View"
            className="w-full justify-center sm:w-auto"
            event="project_clicked"
            payload={{ from: "home_hero", slug: "selected" }}
          >
            {leadershipHero.primary.label}
          </TrackedMagneticButton>
          <TrackedMagneticButton
            href={leadershipHero.secondary.href}
            variant="secondary"
            cursor="Open"
            className="w-full justify-center sm:w-auto"
            event="contact_cta_clicked"
            payload={{ from: "home_hero" }}
          >
            {leadershipHero.secondary.label}
          </TrackedMagneticButton>
        </div>
      </div>
    </section>
  );
}
