import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import { leadershipHero } from "@/home/leadership-home";

export default function HomeHero() {
  return (
    <section className="relative isolate px-[var(--page-pad)] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-36">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono-label text-navy/80">{leadershipHero.roleLine}</p>
        <h1 className="mt-6 max-w-[22ch] text-navy type-hero sm:max-w-[18ch] lg:max-w-[16ch]">
          {leadershipHero.headline}
        </h1>
        <p className="mt-8 max-w-[42rem] type-lead text-ink">{leadershipHero.supporting}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
