"use client";

import { DURATION, EASE, createScope, gsap, type MotionConfig } from "./motion";

/**
 * One-shot motion for system-object marks.
 * Translate 6–10px, orange-scale analogue via 1.08 max, 560–800ms ease-out,
 * then rest. First and final frames match. No loop.
 */
export function animateSystemObject(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const play = () => {
      if (config.reducedMotion) return;
      const meaning = root.dataset.motionMeaning ?? "reveal";
      const y = meaning === "assemble" ? 10 : meaning === "connect" ? 8 : 6;
      gsap.fromTo(
        root,
        { y, scale: 1.08 },
        {
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: EASE,
          overwrite: true,
        },
      );
    };

    if (config.reducedMotion) {
      gsap.set(root, { y: 0, scale: 1 });
      return;
    }

    const trigger = gsap.fromTo(
      root,
      { y: 8, scale: 1.04 },
      {
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: DURATION.xs,
        ease: EASE,
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          once: true,
        },
      },
    );

    const onEnter = () => play();
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) root.addEventListener("pointerenter", onEnter);

    return () => {
      if (canHover) root.removeEventListener("pointerenter", onEnter);
      trigger.kill();
    };
  });
}
