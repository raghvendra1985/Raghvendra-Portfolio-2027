"use client";

import { DURATION, EASE, gsap, type MotionConfig } from "./motion";

export type CursorLabel = "View" | "Open" | "Next" | "Play" | "Live" | "Ask" | "";

export type CursorOptions = {
  lerp?: number;
  magnetic?: number;
};

/**
 * Custom cursor: lerp follow, magnetic pull, context labels.
 * Disabled on touch and reduced motion.
 */
export function animateCursor(
  cursor: HTMLElement,
  config: MotionConfig,
  options: CursorOptions = {},
) {
  if (config.reducedMotion || config.isMobile) {
    gsap.set(cursor, { autoAlpha: 0 });
    return () => undefined;
  }

  const lerp = options.lerp ?? 0.22;
  const magnetic = options.magnetic ?? 0.28;
  const labelEl = cursor.querySelector<HTMLElement>("[data-cursor-label]");
  const pos = { x: 0, y: 0 };
  const mouse = { x: 0, y: 0 };
  const magnet = { x: 0, y: 0 };
  let visible = false;

  gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
  if (labelEl) gsap.set(labelEl, { autoAlpha: 0 });

  const onMove = (event: MouseEvent) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    if (!visible) {
      visible = true;
      gsap.to(cursor, { autoAlpha: 1, duration: DURATION.sm, ease: EASE });
    }
  };

  const onOver = (event: MouseEvent) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      "[data-cursor]",
    );
    const label = (target?.dataset.cursor ?? "") as CursorLabel | string;
    cursor.dataset.state = label ? "active" : "idle";
    if (labelEl) {
      labelEl.textContent = label;
      gsap.to(labelEl, {
        autoAlpha: label ? 1 : 0,
        duration: DURATION.xs,
        ease: EASE,
      });
    }
    gsap.to(cursor, {
      scale: label ? 1.8 : 1,
      duration: DURATION.sm,
      ease: EASE,
    });
  };

  const onLeave = () => {
    visible = false;
    gsap.to(cursor, { autoAlpha: 0, duration: DURATION.sm, ease: EASE });
  };

  const tick = () => {
    const active = document
      .elementFromPoint(mouse.x, mouse.y)
      ?.closest<HTMLElement>("[data-cursor]");
    if (active) {
      const rect = active.getBoundingClientRect();
      magnet.x = (rect.left + rect.width / 2 - mouse.x) * magnetic;
      magnet.y = (rect.top + rect.height / 2 - mouse.y) * magnetic;
    } else {
      magnet.x = 0;
      magnet.y = 0;
    }
    pos.x += (mouse.x + magnet.x - pos.x) * lerp;
    pos.y += (mouse.y + magnet.y - pos.y) * lerp;
    gsap.set(cursor, { x: pos.x, y: pos.y });
  };

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseover", onOver);
  document.documentElement.addEventListener("mouseleave", onLeave);
  gsap.ticker.add(tick);

  return () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseover", onOver);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    gsap.ticker.remove(tick);
  };
}
