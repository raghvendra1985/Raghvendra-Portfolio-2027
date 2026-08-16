"use client";

import { DURATION, EASE, gsap, ScrollTrigger, type MotionConfig } from "./motion";

export type NavigationOptions = {
  hideAfter?: number;
  compactAfter?: number;
};

/**
 * Navigation states from scroll:
 * transparent → blur → compress → hide (down) → reveal (up).
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
      gsap.set(root, { backdropFilter: "blur(0px)" });
      return;
    }

    const shouldCompact = y > compactAfter;
    if (shouldCompact !== compact) {
      compact = shouldCompact;
      root.dataset.compact = compact ? "true" : "false";
      gsap.to(root, {
        backdropFilter: compact ? "blur(16px)" : "blur(0px)",
        duration: DURATION.md,
        ease: EASE,
      });
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
