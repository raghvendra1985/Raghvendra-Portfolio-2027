"use client";

import {
  DURATION,
  EASE_ENTER,
  EASE_STANDARD,
  createScope,
  gsap,
  type MotionConfig,
} from "./motion";

export type MagneticButtonOptions = {
  strength?: number;
  hoverScale?: number;
};

/**
 * Interface button: gold fill, 1px hover lift, press scale, arrow 4px.
 * No pointer-chasing pull. Disabled and reduced motion stay static.
 */
export function animateMagneticButton(
  root: HTMLElement,
  config: MotionConfig,
  _options: MagneticButtonOptions = {},
) {
  return createScope(root, () => {
    const fill = root.querySelector<HTMLElement>("[data-button-fill]");
    const arrow = root.querySelector<HTMLElement>("[data-button-arrow]");

    gsap.set(root, { transformOrigin: "center" });
    if (fill) gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });

    if (config.reducedMotion || root.hasAttribute("disabled")) return;

    const reset = () => {
      gsap.to(root, {
        y: 0,
        scale: 1,
        duration: DURATION.fast,
        ease: EASE_STANDARD,
        overwrite: "auto",
      });
      if (fill) gsap.to(fill, { scaleX: 0, duration: DURATION.ui, ease: EASE_STANDARD });
      if (arrow) gsap.to(arrow, { x: 0, duration: DURATION.fast, ease: EASE_STANDARD });
    };

    const onEnter = () => {
      gsap.to(root, {
        y: -1,
        duration: DURATION.fast,
        ease: EASE_ENTER,
        overwrite: "auto",
      });
      if (fill) gsap.to(fill, { scaleX: 1, duration: DURATION.ui, ease: EASE_STANDARD });
      if (arrow) gsap.to(arrow, { x: 4, duration: DURATION.fast, ease: EASE_STANDARD });
    };

    const onDown = () => {
      gsap.to(root, {
        y: 0,
        scale: 0.985,
        duration: DURATION.instant,
        ease: EASE_STANDARD,
        overwrite: "auto",
      });
    };

    const onUp = () => {
      gsap.to(root, {
        y: -1,
        scale: 1,
        duration: DURATION.fast,
        ease: EASE_ENTER,
        overwrite: "auto",
      });
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", reset);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("blur", reset);

    return () => {
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", reset);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("blur", reset);
    };
  });
}

/**
 * Persistent selected-state indicator for segmented toolbars.
 * Moves one thumb to the pressed control — 220–280ms, ease-standard.
 */
export function animateSegmentedIndicator(
  root: HTMLElement,
  config: MotionConfig,
) {
  return createScope(root, () => {
    const thumb = root.querySelector<HTMLElement>("[data-segment-thumb]");
    if (!thumb) return;

    const place = (immediate: boolean) => {
      const pressed = root.querySelector<HTMLElement>("[aria-pressed='true']");
      if (!pressed) return;
      const rootBox = root.getBoundingClientRect();
      const box = pressed.getBoundingClientRect();
      const vars = {
        x: box.left - rootBox.left,
        y: box.top - rootBox.top,
        duration: immediate || config.reducedMotion ? 0 : DURATION.ui,
        ease: EASE_STANDARD,
        overwrite: "auto" as const,
      };
      gsap.set(thumb, { width: box.width, height: box.height });
      gsap.to(thumb, vars);
    };

    gsap.set(thumb, { position: "absolute", top: 0, left: 0 });
    place(true);

    const observer = new MutationObserver(() => place(false));
    observer.observe(root, { attributes: true, subtree: true, attributeFilter: ["aria-pressed"] });

    const onResize = () => place(true);
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  });
}
