"use client";

import { useEffect, useRef } from "react";
import { animateHero } from "@/animations/hero";
import { animateParallax } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";
import MagneticButton from "@/components/buttons/MagneticButton";
import ResumeCta from "@/components/cta/ResumeCta";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

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
      className="relative isolate overflow-hidden px-[var(--page-pad)] pb-14 pt-28 sm:pb-16 sm:pt-32"
    >
      <div
        data-hero-drift
        data-parallax="0.18"
        className="pointer-events-none absolute -right-10 top-24 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        data-hero-drift
        data-parallax="0.08"
        className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-green/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px]">
        <p
          data-hero-copy
          className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-navy"
        >
          Raghvendra Singh
        </p>

        <h1
          data-hero-headline
          className="mt-6 max-w-4xl font-display text-[clamp(2.15rem,8vw,5.5rem)] leading-[1.08] text-navy sm:leading-[0.95]"
        >
          I design products, systems,{" "}
          <br className="hidden sm:block" />
          and teams that scale.
        </h1>

        <p data-hero-copy className="mt-6 font-mono-label text-[11px] text-ink-soft">
          Product Design Leader · Systems Thinker · AI Product Builder
        </p>

        <p
          data-hero-copy
          className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          {site.experienceLine}. Product strategy, systems,
          AI products, design operations, and hands-on product building.
        </p>

        <div data-cta-row className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <div data-hero-cta className="w-full sm:w-auto">
            <MagneticButton href="/work" cursor="View" className="w-full justify-center sm:w-auto">
              View Selected Work
            </MagneticButton>
          </div>
          <div data-hero-cta className="w-full sm:w-auto">
            <ResumeCta className="w-full justify-center sm:w-auto" source="home_hero" />
          </div>
          <div data-hero-cta className="w-full sm:w-auto">
            <MagneticButton
              href="/contact"
              variant="secondary"
              cursor="Open"
              onClick={() => track("contact_cta_clicked", { from: "hero" })}
              className="w-full justify-center sm:w-auto"
            >
              Start a Conversation
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
