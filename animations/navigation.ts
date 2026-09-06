"use client";

import { DURATION, EASE, gsap, ScrollTrigger, type MotionConfig } from "./motion";

export type NavigationOptions = {
  hideAfter?: number;
  compactAfter?: number;
};

/**
 * Navigation scroll behavior: compact after threshold, hide on scroll down, reveal on scroll up.
 * Background plate is owned by CSS (solid mist) — do not clear it with GSAP blur.
 */
export function animateNavigation(
  root: HTMLElement,
  config: MotionConfig,
  options: NavigationOptions = {},
) {
  const hideAfter = options.hideAfter ?? 120;
  const compactAfter = options.compactAfter ?? 24;
  let lastY = 0;
  let hidden = false;
  let compact = false;

  const apply = (y: number) => {
    const goingDown = y > lastY + 2;
    const goingUp = y < lastY - 2;
    lastY = y;

    if (root.dataset.menuOpen === "true") {
      if (hidden) {
        hidden = false;
        gsap.set(root, { yPercent: 0 });
      }
      return;
    }

    const shouldCompact = y > compactAfter;
    if (shouldCompact !== compact) {
      compact = shouldCompact;
      root.dataset.compact = compact ? "true" : "false";
    }

    if (config.reducedMotion) return;

    if (goingDown && y > hideAfter && !hidden) {
      hidden = true;
      gsap.to(root, { yPercent: -110, duration: DURATION.md, ease: EASE });
    } else if ((goingUp || y < hideAfter) && hidden) {
      hidden = false;
      gsap.to(root, { yPercent: 0, duration: DURATION.md, ease: EASE });
    }
  };

  const trigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => apply(self.scroll()),
  });

  apply(window.scrollY);

  return () => trigger.kill();
}
