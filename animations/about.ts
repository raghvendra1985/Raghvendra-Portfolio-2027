"use client";

import {
  DURATION,
  EASE,
  ScrollTrigger,
  createScope,
  gsap,
  type MotionConfig,
} from "./motion";

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return {
    amount: match ? Number(match[1]) : 0,
    suffix: match ? match[2] : "",
  };
}

export function animateAboutPolaroid(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    gsap.set(root, { rotate: -1.6, transformOrigin: "50% 62%", force3D: true });
    if (config.reducedMotion) return;

    const tween = gsap.to(root, {
      rotate: 1.6,
      duration: 4.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      paused: true,
      force3D: true,
    });

    ScrollTrigger.create({
      trigger: root,
      start: "top 92%",
      end: "bottom 8%",
      onEnter: () => tween.play(),
      onEnterBack: () => tween.play(),
      onLeave: () => tween.pause(),
      onLeaveBack: () => tween.pause(),
    });
  });
}

export function animateAboutStat(root: HTMLElement, config: MotionConfig, value: string) {
  const { amount, suffix } = parseStat(value);

  return createScope(root, () => {
    // Keep the real published value in the accessibility tree at all times.
    // Visual count-up runs only on an aria-hidden sibling when present.
    const visual = root.querySelector<HTMLElement>("[data-about-stat-visual]");
    const target = visual ?? root;

    if (config.reducedMotion || !visual) {
      target.textContent = value;
      return;
    }

    const display = { n: 0 };
    target.textContent = `0${suffix}`;

    ScrollTrigger.create({
      trigger: root,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(display, {
          n: amount,
          duration: DURATION.lg,
          ease: EASE,
          onUpdate: () => {
            target.textContent = `${Math.round(display.n)}${suffix}`;
          },
          onComplete: () => {
            target.textContent = value;
          },
        });
      },
    });
  });
}
