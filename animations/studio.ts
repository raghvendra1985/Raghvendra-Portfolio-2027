"use client";

import { DURATION, EASE, createScope, gsap, type MotionConfig } from "./motion";

export function animateStudioTicker(root: HTMLElement, config: MotionConfig) {
  const track = root.querySelector<HTMLElement>("[data-studio-ticker-track]");
  if (!track) return createScope(root, () => {});

  return createScope(root, () => {
    gsap.set(track, { x: 0 });
    if (config.reducedMotion) return;

    const tween = gsap.to(track, {
      x: "-50%",
      duration: 32,
      ease: "none",
      repeat: -1,
    });

    let hovered = false;
    let focused = false;
    const sync = () => {
      if (hovered || focused) tween.pause();
      else tween.play();
    };

    root.addEventListener("mouseenter", () => {
      hovered = true;
      sync();
    });
    root.addEventListener("mouseleave", () => {
      hovered = false;
      sync();
    });
    root.addEventListener("focusin", () => {
      focused = true;
      sync();
    });
    root.addEventListener("focusout", () => {
      focused = false;
      sync();
    });
  });
}

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
          y: -8,
          duration: DURATION.sm,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      }
      covers.forEach((cover) => {
        gsap.to(cover, {
          scale: 1.06,
          duration: DURATION.md,
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
          duration: DURATION.md,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      }
      covers.forEach((cover) => {
        gsap.to(cover, {
          scale: 1,
          duration: DURATION.md,
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
