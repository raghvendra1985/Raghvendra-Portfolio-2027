"use client";

import { DURATION, EASE, gsap, showImmediately, type MotionConfig } from "./motion";

export type MenuOrigin = {
  x: string;
  y: string;
};

export function menuOriginFromToggle(toggle: HTMLElement | null): MenuOrigin {
  if (!toggle) return { x: "100%", y: "0%" };
  const rect = toggle.getBoundingClientRect();
  const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
  const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
  return { x: `${x}%`, y: `${y}%` };
}

function panelAndItems(root: HTMLElement) {
  return {
    panel: root.querySelector<HTMLElement>("[data-menu-panel]"),
    items: root.querySelectorAll<HTMLElement>("[data-menu-item]"),
  };
}

export function animateMenuOpen(
  root: HTMLElement,
  config: MotionConfig,
  origin: MenuOrigin,
) {
  const { panel, items } = panelAndItems(root);
  if (!panel) return;

  const hamburgerNav =
    typeof window !== "undefined" && window.matchMedia("(max-width: 959px)").matches;

  if (config.reducedMotion || config.isMobile || hamburgerNav) {
    gsap.killTweensOf([panel, items]);
    gsap.set(panel, { autoAlpha: 1, clipPath: "none", y: 0, clearProps: "clipPath" });
    showImmediately(items);
    return;
  }

  gsap.killTweensOf([panel, items]);

  gsap.fromTo(
    panel,
    { autoAlpha: 1, clipPath: `circle(0% at ${origin.x} ${origin.y})` },
    {
      clipPath: `circle(160% at ${origin.x} ${origin.y})`,
      duration: DURATION.lg,
      ease: EASE,
    },
  );

  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: DURATION.md,
      stagger: 0.04,
      ease: EASE,
      delay: 0.08,
    },
  );
}

export function animateMenuClose(
  root: HTMLElement,
  config: MotionConfig,
  origin: MenuOrigin,
  onComplete?: () => void,
) {
  const { panel, items } = panelAndItems(root);
  if (!panel) {
    onComplete?.();
    return;
  }

  const hamburgerNav =
    typeof window !== "undefined" && window.matchMedia("(max-width: 959px)").matches;

  if (config.reducedMotion || config.isMobile || hamburgerNav) {
    gsap.killTweensOf([panel, items]);
    gsap.set(panel, { autoAlpha: 0, clipPath: "none", y: 0, clearProps: "clipPath" });
    gsap.set(items, { autoAlpha: 0, y: 0 });
    onComplete?.();
    return;
  }

  gsap.killTweensOf([panel, items]);
  gsap.to(items, {
    autoAlpha: 0,
    y: 12,
    duration: DURATION.xs,
    stagger: 0.015,
    ease: EASE,
  });

  if (config.isMobile) {
    gsap.to(panel, {
      autoAlpha: 0,
      y: 12,
      duration: DURATION.sm,
      ease: EASE,
      onComplete,
    });
    return;
  }

  gsap.to(panel, {
    clipPath: `circle(0% at ${origin.x} ${origin.y})`,
    duration: DURATION.md,
    ease: EASE,
    onComplete,
  });
}
