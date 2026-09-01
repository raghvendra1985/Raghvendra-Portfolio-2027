"use client";

import { DURATION, EASE_ENTER, createScope, gsap, type MotionConfig } from "./motion";

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
      return { y: 6, scale: 1.12 };
    default:
      return { y: 8 };
  }
}

/**
 * System-object motion by meaning. Max travel 10px, signal scale ≤1.15.
 * Plays on scroll reveal, hover, focus, or tap. Does not loop.
 */
export function animateSystemObject(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const meaning = root.dataset.motionMeaning ?? "reveal";
    const from = fromVars(meaning);

    if (config.reducedMotion) {
      gsap.set(root, { x: 0, y: 0, scale: 1 });
      return;
    }

    const travel = config.isMobile ? 2 / 3 : 1;
    const scaledFrom: gsap.TweenVars = {
      ...from,
      ...(typeof from.x === "number" ? { x: from.x * travel } : {}),
      ...(typeof from.y === "number" ? { y: from.y * travel } : {}),
    };

    const scrub = gsap.fromTo(root, scaledFrom, {
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
        scaledFrom,
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: DURATION.reveal,
          ease: EASE_ENTER,
          overwrite: "auto",
        },
      );
    };

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) root.addEventListener("pointerenter", play);
    root.addEventListener("focusin", play);
    root.addEventListener("pointerdown", play);

    return () => {
      if (canHover) root.removeEventListener("pointerenter", play);
      root.removeEventListener("focusin", play);
      root.removeEventListener("pointerdown", play);
      scrub.kill();
    };
  });
}
