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

export type SystemOptions = {
  onIndex?: (index: number) => void;
};

/**
 * Founder OS: chapter reveals and a sticky typographic index.
 * Transform / opacity / filter only. No pin on reduced motion.
 */
export function animateSystem(
  root: HTMLElement,
  config: MotionConfig,
  options: SystemOptions = {},
) {
  return createScope(root, () => {
    const modules = Array.from(root.querySelectorAll<HTMLElement>("[data-os-module]"));
    const items = root.querySelectorAll("[data-os-item]");
    const indexEl = root.querySelector<HTMLElement>("[data-os-index]");

    if (config.reducedMotion) {
      showImmediately([indexEl, ...modules, ...Array.from(items)]);
      return;
    }

    if (indexEl) {
      gsap.fromTo(
        indexEl,
        { autoAlpha: 0, y: 12, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.md,
          ease: EASE,
        },
      );
    }

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 24, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.lg,
          ease: EASE,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    modules.forEach((module, index) => {
      ScrollTrigger.create({
        trigger: module,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => options.onIndex?.(index),
        onEnterBack: () => options.onIndex?.(index),
      });
    });
  });
}
