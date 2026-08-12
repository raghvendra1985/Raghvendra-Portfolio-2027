"use client";

import {
  DURATION,
  EASE,
  createScope,
  gsap,
  motionBlur,
  showImmediately,
  type MotionConfig,
} from "./motion";

export function animateConciergePanel(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const panel = root.querySelector<HTMLElement>("[data-concierge-panel]");
    const backdrop = root.querySelector<HTMLElement>("[data-concierge-backdrop]");
    const items = root.querySelectorAll("[data-concierge-item]");

    if (config.reducedMotion) {
      showImmediately([backdrop, panel, ...Array.from(items)]);
      return;
    }

    if (backdrop) {
      gsap.fromTo(
        backdrop,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: DURATION.sm, ease: EASE },
      );
    }

    if (panel) {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 16, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.md,
          ease: EASE,
        },
      );
    }

    if (items.length) {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 12, filter: motionBlur(6, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.md,
          stagger: 0.04,
          delay: 0.08,
          ease: EASE,
        },
      );
    }
  });
}

export function animateConciergeResults(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const evidence = root.querySelectorAll("[data-evidence-card]");
    const blocks = root.querySelectorAll("[data-concierge-result]");

    if (config.reducedMotion) {
      showImmediately([...Array.from(blocks), ...Array.from(evidence)]);
      return;
    }

    if (blocks.length) {
      gsap.fromTo(
        blocks,
        { autoAlpha: 0, y: 14, filter: motionBlur(6, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.md,
          stagger: 0.06,
          ease: EASE,
        },
      );
    }

    if (evidence.length) {
      gsap.fromTo(
        evidence,
        { autoAlpha: 0, y: 10, filter: motionBlur(6, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.sm,
          stagger: 0.05,
          delay: 0.05,
          ease: EASE,
        },
      );
    }
  });
}

export function animateConciergeMode(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const modes = root.querySelectorAll("[data-concierge-mode-btn]");
    if (config.reducedMotion) {
      showImmediately(modes);
      return;
    }

    gsap.fromTo(
      modes,
      { autoAlpha: 0, y: 8 },
      {
        autoAlpha: 1,
        y: 0,
        duration: DURATION.sm,
        stagger: 0.04,
        ease: EASE,
      },
    );
  });
}

/**
 * Float / mobile-bar Ask trigger: soft enter. Hover pull is transform-only.
 */
export function animateConciergeTrigger(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    if (config.reducedMotion) {
      showImmediately(root);
      return;
    }

    gsap.fromTo(
      root,
      { autoAlpha: 0, y: 12, filter: motionBlur(6, config) },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: DURATION.md,
        ease: EASE,
      },
    );

    if (config.isMobile) return;

    const onEnter = () => {
      gsap.to(root, { y: -2, duration: DURATION.xs, ease: EASE, overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(root, { y: 0, duration: DURATION.sm, ease: EASE, overwrite: "auto" });
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
    };
  });
}
