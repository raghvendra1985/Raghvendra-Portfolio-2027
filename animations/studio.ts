"use client";

import { DURATION, EASE, createScope, gsap, type MotionConfig } from "./motion";

export type StudioCardOptions = {
  /** Vertical lift on hover. Full-bleed media should pass false. */
  lift?: boolean;
};

/**
 * Studio hover: optional y lift + cover scale.
 * Rest waits until the first hover so section reveals are not killed.
 */
export function animateStudioCard(
  root: HTMLElement,
  config: MotionConfig,
  options: StudioCardOptions = {},
) {
  const liftEnabled = options.lift ?? true;

  return createScope(root, () => {
    const covers = Array.from(root.querySelectorAll<HTMLElement>("[data-studio-cover]")).map(
      (el) => el.querySelector<HTMLElement>("[data-image-media]") ?? el,
    );
    if (config.reducedMotion || config.isMobile) return;

    let armed = false;
    const targets = liftEnabled ? [root, ...covers] : covers;

    const lift = () => {
      armed = true;
      gsap.killTweensOf(targets);
      if (liftEnabled) {
        gsap.to(root, {
          y: -3,
          duration: DURATION.panel,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      }
      covers.forEach((cover) => {
        gsap.to(cover, {
          scale: 1.04,
          duration: DURATION.panel,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      });
    };

    const rest = () => {
      if (!armed) return;
      gsap.killTweensOf(targets);
      if (liftEnabled) {
        gsap.to(root, {
          y: 0,
          duration: DURATION.panel,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      }
      covers.forEach((cover) => {
        gsap.to(cover, {
          scale: 1,
          duration: DURATION.panel,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      });
    };

    root.addEventListener("mouseenter", lift);
    root.addEventListener("mouseleave", rest);
    root.addEventListener("focusin", lift);
    root.addEventListener("focusout", rest);
  });
}
