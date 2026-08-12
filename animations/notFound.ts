"use client";

import {
  DURATION,
  EASE,
  createScope,
  gsap,
  motionBlur,
  prefersReducedMotion,
  showImmediately,
  type MotionConfig,
} from "./motion";
import SplitType from "split-type";

/**
 * Editorial 404 enter: kicker, headline lines, copy, CTA.
 */
export async function animateNotFound(root: HTMLElement, config: MotionConfig) {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  return createScope(root, () => {
    const headline = root.querySelector<HTMLElement>("[data-hero-headline]");
    const copy = root.querySelectorAll("[data-hero-copy]");
    const ctas = root.querySelectorAll("[data-hero-cta]");

    if (config.reducedMotion || prefersReducedMotion()) {
      showImmediately([headline, ...Array.from(copy), ...Array.from(ctas)]);
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

    const tl = gsap.timeline({ defaults: { ease: EASE } });

    if (split?.lines?.length) {
      tl.fromTo(
        split.lines,
        { yPercent: 110, autoAlpha: 1 },
        {
          yPercent: 0,
          duration: DURATION.lg,
          stagger: 0.08,
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
          duration: DURATION.md,
          stagger: 0.06,
        },
        0.2,
      );
    }

    if (ctas.length) {
      tl.fromTo(
        ctas,
        { autoAlpha: 0, y: 12, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: DURATION.md,
        },
        0.36,
      );
    }

    return () => split?.revert();
  });
}
