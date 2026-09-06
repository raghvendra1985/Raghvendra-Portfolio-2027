"use client";

import { useEffect, useRef } from "react";
import { SylvaLivingWorldScene } from "@designcodeio/threeui/components/SylvaLivingWorldScene";
import "@designcodeio/threeui/style.css";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import { leadershipHero } from "@/home/leadership-home";

export default function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();
  const allowMotion = pageReady && !config.reducedMotion;

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
      data-charm-stage
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#4a4d44] px-[var(--page-pad)] pb-10 pt-[calc(var(--nav-height)+0.75rem)] sm:pb-16 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      {allowMotion ? (
        <div
          className="shader-frame pointer-events-auto absolute inset-0 -z-10 h-full w-full"
          aria-hidden
        >
          <SylvaLivingWorldScene variant="living-green" />
        </div>
      ) : null}

      {/* Opaque left reading band — text column stays AA+ over the living world */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--mist) 0%, color-mix(in srgb, var(--mist) 96%, transparent) 34%, color-mix(in srgb, var(--mist) 72%, transparent) 48%, color-mix(in srgb, var(--mist) 28%, transparent) 62%, transparent 78%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="min-w-0 max-w-[42rem]">
          <p data-hero-copy className="font-mono-label !font-semibold text-[13px] tracking-[0.08em] text-navy sm:text-sm">
            {leadershipHero.roleLine}
          </p>
          <h1
            data-hero-headline
            className="hero-headline mt-4 max-w-[16em] font-display text-[clamp(1.85rem,1.35rem+2.8vw,3.75rem)] font-normal leading-[1.35] tracking-[-0.02em] text-navy sm:mt-5 lg:mt-6"
          >
            {leadershipHero.headline}
          </h1>
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
                className="w-full justify-center !border-navy/60 !bg-mist/95 sm:w-auto"
                event="contact_cta_click"
                payload={{ source: "home_hero", channel: "cta" }}
              >
                {leadershipHero.secondary.label}
              </TrackedMagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
