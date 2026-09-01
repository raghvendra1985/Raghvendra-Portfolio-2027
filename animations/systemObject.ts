"use client";

import { EASE, createScope, gsap, type MotionConfig } from "./motion";

function fromVars(meaning: string): gsap.TweenVars {
  switch (meaning) {
    case "assemble":
      return { y: 10, scale: 1.06 };
    case "connect":
      return { x: -8, y: 4 };
    case "reveal":
      return { y: 8, scale: 0.96 };
    case "align":
      return { x: 8, y: 0 };
    case "resolve":
      return { y: 6, scale: 1.1 };
    default:
      return { y: 8 };
  }
}

/**
 * Scroll-linked motion for system-object marks.
 * Each meaning travels a different axis in parallel with vertical scroll
 * (6–10px / ≤1.10 scale), then rests. Hover replays a 700ms settle.
 * Reduced motion is still.
 */
export function animateSystemObject(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const meaning = root.dataset.motionMeaning ?? "reveal";
    const from = fromVars(meaning);

    if (config.reducedMotion) {
      gsap.set(root, { x: 0, y: 0, scale: 1 });
      return;
    }

    const scrub = gsap.fromTo(root, from, {
      x: 0,
      y: 0,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top 92%",
        end: "top 58%",
        scrub: 0.45,
      },
    });

    const play = () => {
      gsap.fromTo(
        root,
        from,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: EASE,
          overwrite: "auto",
        },
      );
    };

    const onEnter = () => play();
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) root.addEventListener("pointerenter", onEnter);

    return () => {
      if (canHover) root.removeEventListener("pointerenter", onEnter);
      scrub.kill();
    };
  });
}
