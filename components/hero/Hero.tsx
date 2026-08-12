"use client";

import { useEffect, useRef } from "react";
import { animateHero } from "@/animations/hero";
import { animateParallax } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";
import MagneticButton from "@/components/buttons/MagneticButton";

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
      className="relative isolate overflow-hidden px-[var(--page-pad)] pb-24 pt-36 sm:pt-44"
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
        <p data-hero-copy className="font-mono-label text-[11px] text-ink-soft">
          Product Design Leader | Systems Thinker | AI Product Builder
        </p>

        <h1
          data-hero-headline
          className="mt-8 max-w-5xl font-display text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.92] text-navy"
        >
          Product design for systems that have to last.
        </h1>

        <p
          data-hero-copy
          className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          Current work: EQTY, Growing With Kid, Bolo Buddy, and 2886. Career
          depth behind that — enterprise systems for Verizon, Crowley, Hempel,
          and the organisations that came before.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <div data-hero-cta>
            <MagneticButton href="/work" cursor="View">
              View selected work
            </MagneticButton>
          </div>
          <div data-hero-cta>
            <MagneticButton href="/contact" variant="secondary">
              Start a conversation
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
