"use client";

import { useEffect, useRef } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { animateHero } from "@/animations/hero";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import { homeHeroMedia, leadershipHero } from "@/home/leadership-home";

export default function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();
  const preferStill = config.reducedMotion;

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
      className="relative isolate min-h-[88svh] overflow-hidden bg-mist px-[var(--page-pad)] pb-16 pt-[calc(var(--nav-height)+1.5rem)] sm:pb-24 sm:pt-36 lg:min-h-[92svh] lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <MuxPlayer
          playbackId={homeHeroMedia.muxPlaybackId}
          streamType="on-demand"
          autoPlay={preferStill ? false : "muted"}
          loop={!preferStill}
          muted
          playsInline
          preload="metadata"
          poster={homeHeroMedia.poster}
          className="home-hero-mux absolute inset-0 h-full w-full"
          aria-hidden
        />
        <div className="home-hero-scrim-x absolute inset-0" aria-hidden />
        <div className="home-hero-scrim-y absolute inset-0" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--page-max)]">
        <div className="min-w-0 max-w-[40rem]">
          <p
            data-hero-copy
            className="font-mono-label !font-semibold text-[12px] tracking-[0.08em] text-navy/70 sm:text-[13px]"
          >
            {leadershipHero.roleLine}
          </p>
          <h1
            data-hero-headline
            className="hero-headline mt-5 max-w-[14em] type-hero text-navy sm:mt-6"
          >
            {leadershipHero.headline}
          </h1>
          <p
            data-hero-copy
            className="mt-5 max-w-[42ch] type-lead text-navy/80 sm:mt-6"
          >
            {leadershipHero.supportLine}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
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
                event="nav_clicked"
                payload={{ surface: "home_hero", dest: leadershipHero.secondary.href }}
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
