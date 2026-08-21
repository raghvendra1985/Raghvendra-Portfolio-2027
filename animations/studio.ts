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

export function animateStudioCard(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    gsap.set(root, { y: 0, force3D: true });
    if (config.reducedMotion || config.isMobile) return;

    const lift = () => {
      gsap.killTweensOf(root);
      gsap.to(root, { y: -8, duration: DURATION.sm, ease: EASE, overwrite: true, force3D: true });
    };
    const rest = () => {
      gsap.killTweensOf(root);
      gsap.to(root, { y: 0, duration: DURATION.md, ease: EASE, overwrite: true, force3D: true });
    };

    root.addEventListener("mouseenter", lift);
    root.addEventListener("mouseleave", rest);
    root.addEventListener("focusin", lift);
    root.addEventListener("focusout", rest);
  });
}
