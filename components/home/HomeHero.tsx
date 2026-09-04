"use client";

import { useEffect, useRef } from "react";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import HomeHeroVisual from "@/components/home/HomeHeroVisual";
import { leadershipHero, leadershipImpact } from "@/home/leadership-home";

/** Hybrid: D split layout + A short headline/proof + C evidence strip (terms only). */
const hybridHeadline = "Intelligent products that hold.";
const hybridProof = "20 years · 500+ designers taught";

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
    <section ref={rootRef} className="relative isolate pb-10 sm:pb-16 lg:pb-28">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col justify-end px-[var(--page-pad)] pb-10 pt-[calc(var(--nav-height)+0.75rem)] sm:pt-32 lg:pb-16 lg:pr-10 lg:pt-36">
          <p data-hero-copy className="font-mono-label text-navy/80">
            {leadershipHero.roleLine}
          </p>
          <h1
            data-hero-headline
            className="mt-4 max-w-[14em] type-hero text-navy sm:mt-5 lg:mt-6"
          >
            {hybridHeadline}
          </h1>
          <p data-hero-copy className="mt-4 font-mono-label text-gold">
            {hybridProof}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <div data-hero-cta className="w-full sm:w-auto">
              <TrackedMagneticButton
                href={leadershipHero.primary.href}
                cursor="View"
                className="w-full justify-center sm:w-auto"
                event="hero_work_click"
                payload={{ source: "home_hero", dest: leadershipHero.primary.href }}
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
                event="contact_cta_click"
                payload={{ source: "home_hero", channel: "cta" }}
              >
                {leadershipHero.secondary.label}
              </TrackedMagneticButton>
            </div>
          </div>

          <div data-hero-copy className="mt-12 border border-line bg-paper">
            <ul className="grid sm:grid-cols-2">
              {leadershipImpact.items.map((item, index) => (
                <li
                  key={item.term}
                  className={`px-4 py-4 font-serif text-base text-navy sm:py-5 sm:text-lg ${
                    index > 0 ? "border-t border-line" : ""
                  } ${index % 2 === 1 ? "sm:border-t-0 sm:border-l sm:border-line" : ""} ${
                    index >= 2 ? "sm:border-t sm:border-line" : ""
                  }`}
                >
                  {item.term}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative border-t border-line bg-paper px-[var(--page-pad)] py-10 lg:border-l lg:border-t-0 lg:py-16 lg:pl-10 lg:-mr-[var(--page-pad)] lg:pr-[var(--page-pad)]">
          <div className="mx-auto flex w-full max-w-[26rem] items-center justify-center lg:max-w-none lg:scale-110 lg:origin-center [&_[data-hero-visual]]:bg-transparent">
            <HomeHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
