"use client";

import {
  DURATION,
  EASE,
  createScope,
  gsap,
  ScrollTrigger,
  motionBlur,
  type MotionConfig,
} from "./motion";

export type PracticeIndexOptions = {
  onIndex?: (index: number) => void;
};

/**
 * Practice index: sticky panel crossfade, row-linked progress.
 * Matches selected work — no invert fills, no offset pills.
 */
export function animatePracticeIndex(
  root: HTMLElement,
  config: MotionConfig,
  options: PracticeIndexOptions = {},
) {
  return createScope(root, () => {
    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-practice-row]"));
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-practice-panel]"));
    const progress = root.querySelector<HTMLElement>("[data-practice-progress]");

    if (!rows.length) return;

    if (config.reducedMotion) {
      gsap.set(panels, { autoAlpha: 0, y: 0, filter: "none" });
      if (panels[0]) gsap.set(panels[0], { autoAlpha: 1 });
    } else {
      gsap.set(panels, {
        autoAlpha: 0,
        y: 12,
        filter: motionBlur(8, config),
      });
      if (panels[0]) {
        gsap.set(panels[0], { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      }
    }

    rows.forEach((row, index) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () =>
          setPracticeIndex(panels, progress, index, rows.length, options.onIndex, config),
        onEnterBack: () =>
          setPracticeIndex(panels, progress, index, rows.length, options.onIndex, config),
      });
    });
  });
}

export function crossfadePracticePanel(
  panels: HTMLElement[],
  index: number,
  config: MotionConfig,
) {
  panels.forEach((panel, i) => {
    const active = i === index;
    if (config.reducedMotion) {
      gsap.set(panel, { autoAlpha: active ? 1 : 0, y: 0, filter: "none" });
      return;
    }
    gsap.to(panel, {
      autoAlpha: active ? 1 : 0,
      y: active ? 0 : 12,
      filter: active ? "blur(0px)" : motionBlur(8, config),
      duration: DURATION.md,
      ease: EASE,
      overwrite: "auto",
      force3D: true,
    });
  });
}

function setPracticeIndex(
  panels: HTMLElement[],
  progress: HTMLElement | null,
  index: number,
  total: number,
  onIndex: ((index: number) => void) | undefined,
  config: MotionConfig,
) {
  crossfadePracticePanel(panels, index, config);
  onIndex?.(index);
  if (progress) {
    gsap.to(progress, {
      scaleX: (index + 1) / total,
      duration: config.reducedMotion ? 0 : DURATION.md,
      ease: EASE,
    });
  }
}
