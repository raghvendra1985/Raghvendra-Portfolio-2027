"use client";

import { DURATION, EASE, createScope, gsap, type MotionConfig } from "./motion";

/**
 * Work card hover: cover scale + slight lift.
 * Rest pose waits until the first hover so enter/reveal tweens are not killed.
 */
export function animateWorkCard(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const cover =
      root.querySelector<HTMLElement>("[data-work-cover] [data-image-media]") ??
      root.querySelector<HTMLElement>("[data-work-cover]");

    gsap.set(root, { y: 0, force3D: true });
    if (config.reducedMotion || config.isMobile) return;

    let armed = false;
    const targets = cover ? [root, cover] : [root];

    const lift = () => {
      armed = true;
      gsap.killTweensOf(targets);
      gsap.to(root, {
        y: -8,
        duration: DURATION.sm,
        ease: EASE,
        overwrite: true,
        force3D: true,
      });
      if (cover) {
        gsap.to(cover, {
          scale: 1.06,
          duration: DURATION.md,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      }
    };

    const rest = () => {
      if (!armed) return;
      gsap.killTweensOf(targets);
      gsap.to(root, {
        y: 0,
        duration: DURATION.md,
        ease: EASE,
        overwrite: true,
        force3D: true,
      });
      if (cover) {
        gsap.to(cover, {
          scale: 1,
          duration: DURATION.md,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      }
    };

    root.addEventListener("mouseenter", lift);
    root.addEventListener("mouseleave", rest);
    root.addEventListener("focusin", lift);
    root.addEventListener("focusout", rest);
  });
}

export function animateWorkTicker(root: HTMLElement, config: MotionConfig) {
  const track = root.querySelector<HTMLElement>("[data-work-ticker-track]");
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
