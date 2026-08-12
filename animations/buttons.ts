"use client";

import { DURATION, EASE, createScope, gsap, type MotionConfig } from "./motion";

export type MagneticButtonOptions = {
  strength?: number;
  hoverScale?: number;
};

/**
 * Magnetic button: pointer attraction, arrow slide, fill via scaleX, hover scale.
 * Fill uses transform so layout never animates.
 */
export function animateMagneticButton(
  root: HTMLElement,
  config: MotionConfig,
  options: MagneticButtonOptions = {},
) {
  const strength = options.strength ?? 0.32;
  const hoverScale = options.hoverScale ?? 1.03;

  return createScope(root, () => {
    const fill = root.querySelector<HTMLElement>("[data-button-fill]");
    const arrow = root.querySelector<HTMLElement>("[data-button-arrow]");

    gsap.set(root, { transformOrigin: "center" });
    if (fill) gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });

    if (config.reducedMotion) return;

    const reset = () => {
      gsap.to(root, { x: 0, y: 0, scale: 1, duration: DURATION.md, ease: EASE });
      if (fill) gsap.to(fill, { scaleX: 0, duration: DURATION.md, ease: EASE });
      if (arrow) gsap.to(arrow, { x: 0, duration: DURATION.md, ease: EASE });
    };

    const onEnter = () => {
      gsap.to(root, { scale: hoverScale, duration: DURATION.sm, ease: EASE });
      if (fill) gsap.to(fill, { scaleX: 1, duration: DURATION.md, ease: EASE });
      if (arrow) gsap.to(arrow, { x: 6, duration: DURATION.md, ease: EASE });
    };

    const onMove = (event: MouseEvent) => {
      if (config.isMobile) return;
      const rect = root.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      gsap.to(root, {
        x: x * strength,
        y: y * strength,
        duration: DURATION.sm,
        ease: EASE,
        overwrite: "auto",
      });
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", reset);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("blur", reset);

    return () => {
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", reset);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("blur", reset);
    };
  });
}
