"use client";

import SplitType from "split-type";
import {
  DURATION,
  EASE_DRIFT,
  EASE_ENTER,
  EASE_REVEAL,
  createScope,
  gsap,
  motionBlur,
  prefersReducedMotion,
  type MotionConfig,
} from "./motion";

export type HeroOptions = {
  /** Delay after loader hands off. */
  delay?: number;
  lineStagger?: number;
  copyDuration?: number;
  ctaStagger?: number;
  mouseStrength?: number;
  /** Secondary page heroes skip mouse drift. */
  drift?: boolean;
};

const defaults: Required<HeroOptions> = {
  delay: 0,
  lineStagger: 0.08,
  copyDuration: 0.76,
  ctaStagger: 0.08,
  mouseStrength: 14,
  drift: true,
};

/**
 * Hero sequence: copy rises, CTA follows 100ms later, system-object last,
 * then low-amplitude atmosphere drift. Reduced motion shows the final state.
 */
export async function animateHero(
  root: HTMLElement,
  config: MotionConfig,
  options: HeroOptions = {},
) {
  const opts = { ...defaults, ...options };

  if (typeof document !== "undefined" && document.fonts?.ready) {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => window.setTimeout(resolve, 600)),
    ]);
  }

  return createScope(root, () => {
    const headline = root.querySelector<HTMLElement>("[data-hero-headline]");
    const copy = root.querySelectorAll("[data-hero-copy]");
    const ctas = root.querySelectorAll("[data-hero-cta]");
    const visual = root.querySelectorAll("[data-hero-visual]");
    const drift = root.querySelectorAll("[data-hero-drift]");

    if (config.reducedMotion || prefersReducedMotion()) {
      gsap.set([headline, copy, ctas, visual, drift], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
        filter: "none",
      });
      return;
    }

    let split: SplitType | null = null;
    if (headline) {
      split = new SplitType(headline, { types: "lines", lineClass: "split-line" });
      split.lines?.forEach((line) => {
        const mask = document.createElement("span");
        mask.className = "line-mask";
        line.parentNode?.insertBefore(mask, line);
        mask.appendChild(line);
      });
    }

    const revealNow = () => {
      if (split?.lines?.length) {
        gsap.set(split.lines, { yPercent: 0, y: 0, autoAlpha: 1 });
      }
      if (copy.length) gsap.set(copy, { autoAlpha: 1, y: 0, filter: "none" });
      if (ctas.length) gsap.set(ctas, { autoAlpha: 1, y: 0, scale: 1 });
      if (visual.length) gsap.set(visual, { autoAlpha: 1, y: 0, scale: 1 });
    };

    const failsafe = window.setTimeout(revealNow, 1600);
    const tl = gsap.timeline({ delay: opts.delay, defaults: { ease: EASE_ENTER } });

    if (split?.lines?.length) {
      tl.fromTo(
        split.lines,
        { yPercent: 110, autoAlpha: 1 },
        {
          yPercent: 0,
          duration: DURATION.reveal,
          stagger: opts.lineStagger,
          force3D: true,
        },
        0,
      );
    }

    if (copy.length) {
      tl.fromTo(
        copy,
        { autoAlpha: 0, y: 16, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: opts.copyDuration,
          stagger: 0.06,
        },
        0.12,
      );
    }

    if (ctas.length) {
      tl.fromTo(
        ctas,
        { autoAlpha: 0, y: 12, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: DURATION.panel,
          stagger: opts.ctaStagger,
        },
        0.22,
      );
    }

    if (visual.length) {
      tl.fromTo(
        visual,
        { autoAlpha: 0, y: 24, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: EASE_REVEAL,
        },
        0.36,
      );
    }

    if (opts.drift && !config.isMobile && drift.length) {
      const strength = Math.min(16, opts.mouseStrength * config.parallaxScale);
      const onMove = (event: MouseEvent) => {
        const rect = root.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(drift, {
          x: nx * strength,
          y: ny * strength,
          duration: DURATION.atmosphere,
          ease: EASE_DRIFT,
          overwrite: "auto",
        });
      };
      root.addEventListener("mousemove", onMove);
      return () => {
        window.clearTimeout(failsafe);
        root.removeEventListener("mousemove", onMove);
        split?.revert();
      };
    }

    return () => {
      window.clearTimeout(failsafe);
      split?.revert();
    };
  });
}
