"use client";

import { useEffect, useRef } from "react";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { leadershipHero } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

export default function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pageReady) return;
    let cancelled = false;
    let heroCtx: { revert: () => void } | undefined;

    animateHero(root, config, { drift: false }).then((ctx) => {
      if (cancelled) {
        ctx.revert();
        return;
      }
      heroCtx = ctx;
    });

    return () => {
      cancelled = true;
      heroCtx?.revert();
    };
  }, [config, pageReady]);

  return (
    <section
      ref={rootRef}
      className="relative isolate px-[var(--page-pad)] pb-10 pt-[calc(var(--nav-height)+0.75rem)] sm:pb-16 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center gap-4">
          <span data-hero-visual>
            <SystemObjectMark
              src={homeMarks.hero.src}
              motion={homeMarks.hero.motion}
              surface={homeMarks.hero.surface}
            />
          </span>
          <p data-hero-copy className="max-w-[22rem] font-mono-label text-navy/80 sm:max-w-none">
            {leadershipHero.roleLine}
          </p>
        </div>
        <h1
          data-hero-headline
          className="mt-4 max-w-[18em] font-display text-[clamp(1.7rem,1.2rem+3.2vw,4rem)] font-normal leading-[1.1] tracking-[-0.03em] text-navy sm:mt-5 lg:mt-6 lg:max-w-[14em]"
        >
          {leadershipHero.headline}
        </h1>
        <p data-hero-copy className="mt-4 max-w-[42rem] type-lead text-ink sm:mt-8">
          {leadershipHero.supporting}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
          <div data-hero-cta className="w-full sm:w-auto">
            <TrackedMagneticButton
              href={leadershipHero.primary.href}
              cursor="View"
              className="w-full justify-center sm:w-auto"
              event="project_clicked"
              payload={{ from: "home_hero", slug: "selected" }}
            >
              {leadershipHero.primary.label}
            </TrackedMagneticButton>
          </div>
          <div data-hero-cta className="w-full sm:w-auto">
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
      </div>
    </section>
  );
}
