"use client";

import { useEffect, useRef } from "react";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import HomeHeroVisual from "@/components/home/HomeHeroVisual";
import { leadershipHero } from "@/home/leadership-home";

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
      <div className="mx-auto grid max-w-[1440px] items-end gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="min-w-0">
          <p data-hero-copy className="font-mono-label text-navy/80">
            {leadershipHero.roleLine}
          </p>
          <h1
            data-hero-headline
            className="mt-4 max-w-[16em] font-display text-[clamp(1.85rem,1.35rem+2.8vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.03em] text-navy sm:mt-5 lg:mt-6"
          >
            {leadershipHero.headline}
          </h1>
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
        <HomeHeroVisual />
      </div>
    </section>
  );
}
