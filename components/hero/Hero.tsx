"use client";

import { useEffect, useRef } from "react";
import { animateHero } from "@/animations/hero";
import { animateParallax } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";
import MagneticButton from "@/components/buttons/MagneticButton";
import { homeHero } from "@/home/copy";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pageReady) return;
    let cancelled = false;
    let heroCtx: { revert: () => void } | undefined;
    const parallax = animateParallax(root, config);

    animateHero(root, config).then((ctx) => {
      if (cancelled) {
        ctx.revert();
        return;
      }
      heroCtx = ctx;
    });

    return () => {
      cancelled = true;
      heroCtx?.revert();
      parallax.revert();
    };
  }, [config, pageReady]);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden px-[var(--page-pad)] pb-10 pt-24 sm:pb-12 sm:pt-28"
    >
      <div
        data-hero-drift
        data-parallax="0.12"
        className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-gold/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <p data-hero-copy className="type-lead text-navy">
          {homeHero.name}
        </p>

        <h1 data-hero-headline className="mt-6 max-w-4xl type-hero text-navy">
          {homeHero.headline}
        </h1>

        <p data-hero-copy className="mt-6 font-mono-label text-ink-soft">
          {homeHero.kicker}
        </p>

        <p
          data-hero-copy
          className="mt-5 max-w-[42rem] type-lead text-ink"
        >
          {homeHero.lead}
        </p>

        <div data-cta-row className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div data-hero-cta className="w-full sm:w-auto">
            <MagneticButton href={homeHero.primary.href} cursor="View" className="w-full justify-center sm:w-auto">
              {homeHero.primary.label}
            </MagneticButton>
          </div>
          <div data-hero-cta className="w-full sm:w-auto">
            <MagneticButton
              href={homeHero.secondary.href}
              variant="secondary"
              cursor="Open"
              className="w-full justify-center sm:w-auto"
            >
              {homeHero.secondary.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
