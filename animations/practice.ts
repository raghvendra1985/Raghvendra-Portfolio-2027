"use client";

import { DURATION, EASE, createScope, gsap, type MotionConfig } from "./motion";

export type InvertLaneOptions = {
  /** Offset enter from the left/right. Hover-only when false. */
  enter?: boolean;
};

/**
 * Mondragon-style lanes: optional offset enter, navy fill scaleX on hover,
 * siblings dim. Transform/opacity only — text color stays CSS group-hover.
 */
export function animateInvertLanes(
  root: HTMLElement,
  config: MotionConfig,
  options: InvertLaneOptions = {},
) {
  const enter = options.enter ?? false;

  return createScope(root, () => {
    const lanes = Array.from(root.querySelectorAll<HTMLElement>("[data-invert-lane]"));
    if (!lanes.length) return;

    lanes.forEach((lane) => {
      const fill = lane.querySelector<HTMLElement>("[data-invert-fill]");
      const side = lane.dataset.invertSide === "end" ? 1 : -1;

      if (fill) gsap.set(fill, { scaleX: 0, transformOrigin: "left center", force3D: true });

      if (config.reducedMotion) {
        gsap.set(lane, { autoAlpha: 1, x: 0, y: 0 });
        return;
      }

      if (enter && !config.isMobile) {
        gsap.fromTo(
          lane,
          { autoAlpha: 0, x: 40 * side, y: 16 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: DURATION.lg,
            ease: EASE,
            force3D: true,
            scrollTrigger: {
              trigger: lane,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      if (config.isMobile) return;

      let armed = false;
      const restFill = () => {
        if (!fill) return;
        gsap.to(fill, {
          scaleX: 0,
          duration: DURATION.md,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
      };

      const lift = () => {
        armed = true;
        gsap.killTweensOf([lane, fill, ...lanes].filter(Boolean));
        gsap.to(lane, {
          y: -6,
          duration: DURATION.sm,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
        if (fill) {
          gsap.to(fill, {
            scaleX: 1,
            duration: DURATION.sm,
            ease: EASE,
            overwrite: true,
            force3D: true,
          });
        }
        lanes.forEach((other) => {
          if (other === lane) return;
          gsap.to(other, {
            autoAlpha: 0.45,
            duration: DURATION.sm,
            ease: EASE,
            overwrite: true,
          });
        });
      };

      const rest = () => {
        if (!armed) return;
        gsap.killTweensOf([lane, fill, ...lanes].filter(Boolean));
        gsap.to(lane, {
          y: 0,
          duration: DURATION.md,
          ease: EASE,
          overwrite: true,
          force3D: true,
        });
        restFill();
        lanes.forEach((other) => {
          gsap.to(other, {
            autoAlpha: 1,
            duration: DURATION.md,
            ease: EASE,
            overwrite: true,
          });
        });
      };

      lane.addEventListener("mouseenter", lift);
      lane.addEventListener("mouseleave", rest);
      lane.addEventListener("focusin", lift);
      lane.addEventListener("focusout", (event) => {
        if (!lane.contains(event.relatedTarget as Node | null)) rest();
      });
    });
  });
}
