"use client";

import { DURATION, EASE, gsap, motionBlur, type MotionConfig } from "./motion";

export type PageTransitionOptions = {
  duration?: number;
};

/**
 * Route change: fade, scale, blur, then reveal.
 * Shared-image morph is handled by cloning a `[data-shared-image]` node.
 */
export function playPageExit(
  overlay: HTMLElement,
  config: MotionConfig,
  options: PageTransitionOptions = {},
) {
  const duration = options.duration ?? DURATION.md;
  if (config.reducedMotion) {
    gsap.set(overlay, { autoAlpha: 1, scale: 1, filter: "blur(0px)" });
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    gsap.fromTo(
      overlay,
      { autoAlpha: 0, scale: 1.03, filter: motionBlur(16, config) },
      {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        duration,
        ease: EASE,
        onComplete: () => resolve(),
      },
    );
  });
}

export function playPageEnter(
  overlay: HTMLElement,
  page: HTMLElement | null,
  config: MotionConfig,
  options: PageTransitionOptions = {},
) {
  const duration = options.duration ?? DURATION.md;
  if (config.reducedMotion) {
    gsap.set(overlay, { autoAlpha: 0 });
    if (page) gsap.set(page, { autoAlpha: 1, scale: 1, filter: "none" });
    return Promise.resolve();
  }

  const tl = gsap.timeline({ defaults: { ease: EASE } });
  if (page) {
    tl.fromTo(
      page,
      { autoAlpha: 0.4, scale: 1.015, filter: motionBlur(8, config) },
      { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration },
      0,
    );
  }
  tl.to(overlay, { autoAlpha: 0, duration: DURATION.sm }, 0.05);
  return new Promise<void>((resolve) => {
    tl.eventCallback("onComplete", () => resolve());
  });
}

export function morphSharedImage(source: HTMLElement, duration = DURATION.lg) {
  const clone = source.cloneNode(true) as HTMLElement;
  const rect = source.getBoundingClientRect();
  clone.style.position = "fixed";
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.zIndex = "80";
  clone.style.pointerEvents = "none";
  clone.style.margin = "0";
  clone.style.transformOrigin = "top left";
  document.body.appendChild(clone);

  const dest = document.querySelector<HTMLElement>("[data-shared-image-target]");
  const destRect = dest?.getBoundingClientRect();
  const targetLeft = destRect?.left ?? rect.left;
  const targetTop = destRect?.top ?? window.innerHeight * 0.18;
  const targetWidth = destRect?.width ?? Math.min(720, window.innerWidth * 0.5);
  const targetHeight = destRect?.height ?? 420;

  return new Promise<void>((resolve) => {
    gsap.to(clone, {
      x: targetLeft - rect.left,
      y: targetTop - rect.top,
      scaleX: targetWidth / Math.max(rect.width, 1),
      scaleY: targetHeight / Math.max(rect.height, 1),
      duration,
      ease: EASE,
      force3D: true,
      onComplete: () => {
        gsap.to(clone, {
          autoAlpha: 0,
          duration: DURATION.sm,
          onComplete: () => {
            clone.remove();
            resolve();
          },
        });
      },
    });
  });
}
