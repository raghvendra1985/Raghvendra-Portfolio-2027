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

/**
 * Contact form: label + field stagger on enter.
 * Focus rings stay CSS. Submit uses MagneticButton elsewhere.
 */
export function animateContactForm(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const items = root.querySelectorAll("[data-form-item]");
    if (config.reducedMotion) {
      showImmediately(items);
      return;
    }

    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 18, filter: motionBlur(8, config) },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: DURATION.md,
        stagger: 0.07,
        ease: EASE,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
        },
      },
    );
  });
}
