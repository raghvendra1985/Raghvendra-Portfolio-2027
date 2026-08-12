"use client";

import {
  DURATION,
  EASE,
  createScope,
  gsap,
  ScrollTrigger,
  motionBlur,
  showImmediately,
  type MotionConfig,
} from "./motion";

/**
 * Case study page: hero image blur→sharp, chapter reveals, next-project cue.
 */
export function animateCaseStudy(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const hero = root.querySelector("[data-case-hero]");
    const chapters = root.querySelectorAll("[data-case-chapter]");
    const steps = root.querySelectorAll("[data-case-step]");
    const gallery = root.querySelectorAll("[data-case-gallery]");
    const next = root.querySelector("[data-case-next]");

    if (config.reducedMotion) {
      showImmediately([hero, chapters, steps, gallery, next]);
      return;
    }

    if (hero) {
      gsap.fromTo(
        hero,
        { autoAlpha: 0, scale: 1.06, filter: motionBlur(18, config) },
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: DURATION.xl,
          ease: EASE,
        },
      );
    }

    chapters.forEach((chapter) => {
      gsap.fromTo(
        chapter,
        { autoAlpha: 0, y: 28, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.lg,
          ease: EASE,
          scrollTrigger: {
            trigger: chapter,
            start: "top 82%",
            once: true,
          },
        },
      );
    });

    if (steps.length) {
      gsap.fromTo(
        steps,
        { autoAlpha: 0, y: 20, filter: motionBlur(6, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.lg,
          stagger: 0.08,
          ease: EASE,
          scrollTrigger: {
            trigger: steps[0],
            start: "top 82%",
            once: true,
          },
        },
      );
    }

    if (gallery.length) {
      gsap.fromTo(
        gallery,
        { autoAlpha: 0, y: 16, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.lg,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: {
            trigger: gallery[0],
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    if (next) {
      gsap.fromTo(
        next,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: DURATION.lg,
          ease: EASE,
          scrollTrigger: {
            trigger: next,
            start: "top 90%",
            once: true,
          },
        },
      );
    }
  });
}

export type SelectedWorkOptions = {
  onIndex?: (index: number) => void;
};

/**
 * Selected work: sticky visual, image crossfade, row-linked progress.
 * Keyboard updates are applied by calling `crossfadeWorkVisual` from the component.
 */
export function animateSelectedWork(
  root: HTMLElement,
  config: MotionConfig,
  options: SelectedWorkOptions = {},
) {
  return createScope(root, () => {
    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-work-row]"));
    const visuals = Array.from(root.querySelectorAll<HTMLElement>("[data-work-visual]"));
    const progress = root.querySelector<HTMLElement>("[data-work-progress]");

    if (!rows.length) return;

    gsap.set(visuals, { autoAlpha: 0 });
    if (visuals[0]) gsap.set(visuals[0], { autoAlpha: 1 });

    rows.forEach((row, index) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setWorkIndex(visuals, progress, index, rows.length, options.onIndex, config),
        onEnterBack: () => setWorkIndex(visuals, progress, index, rows.length, options.onIndex, config),
      });
    });
  });
}

export function crossfadeWorkVisual(
  visuals: HTMLElement[],
  index: number,
  config: MotionConfig,
) {
  visuals.forEach((visual, i) => {
    const active = i === index;
    if (config.reducedMotion) {
      gsap.set(visual, { autoAlpha: active ? 1 : 0 });
      return;
    }
    gsap.to(visual, {
      autoAlpha: active ? 1 : 0,
      scale: active ? 1 : 1.04,
      filter: active ? "blur(0px)" : motionBlur(8, config),
      duration: DURATION.md,
      ease: EASE,
      overwrite: "auto",
    });
  });
}

function setWorkIndex(
  visuals: HTMLElement[],
  progress: HTMLElement | null,
  index: number,
  total: number,
  onIndex: ((index: number) => void) | undefined,
  config: MotionConfig,
) {
  crossfadeWorkVisual(visuals, index, config);
  onIndex?.(index);
  if (progress) {
    gsap.to(progress, {
      scaleX: (index + 1) / total,
      duration: config.reducedMotion ? 0 : DURATION.md,
      ease: EASE,
    });
  }
}
