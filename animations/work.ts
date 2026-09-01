"use client";

import {
  DURATION,
  EASE_ENTER,
  EASE_STANDARD,
  createScope,
  gsap,
  type MotionConfig,
} from "./motion";

/**
 * Work card hover: cover scale + lift under 4px.
 * Rest pose waits until the first hover so enter/reveal tweens are not killed.
 */
export function animateWorkCard(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const cover =
      root.querySelector<HTMLElement>("[data-work-cover] [data-image-media]") ??
      root.querySelector<HTMLElement>("[data-work-cover]");

    gsap.set(root, { y: 0, force3D: true });
    if (config.reducedMotion || config.isMobile) return;

    let armed = false;
    const targets = cover ? [root, cover] : [root];

    const lift = () => {
      armed = true;
      gsap.killTweensOf(targets);
      gsap.to(root, {
        y: -3,
        duration: DURATION.panel,
        ease: EASE_ENTER,
        overwrite: true,
        force3D: true,
      });
      if (cover) {
        gsap.to(cover, {
          scale: 1.04,
          duration: DURATION.panel,
          ease: EASE_ENTER,
          overwrite: true,
          force3D: true,
        });
      }
    };

    const rest = () => {
      if (!armed) return;
      gsap.killTweensOf(targets);
      gsap.to(root, {
        y: 0,
        duration: DURATION.panel,
        ease: EASE_STANDARD,
        overwrite: true,
        force3D: true,
      });
      if (cover) {
        gsap.to(cover, {
          scale: 1,
          duration: DURATION.panel,
          ease: EASE_STANDARD,
          overwrite: true,
          force3D: true,
        });
      }
    };

    root.addEventListener("mouseenter", lift);
    root.addEventListener("mouseleave", rest);
    root.addEventListener("focusin", lift);
    root.addEventListener("focusout", rest);
  });
}

/** Constant linear marquee at 30–45px/s. Pauses on hover/focus and when offscreen. */
export function animateWorkTicker(root: HTMLElement, config: MotionConfig) {
  const track = root.querySelector<HTMLElement>("[data-work-ticker-track]");
  if (!track) return createScope(root, () => {});

  return createScope(root, () => {
    gsap.set(track, { x: 0 });
    if (config.reducedMotion) return;

    const PX_PER_SEC = 38;
    const tween = gsap.to(track, {
      x: "-50%",
      duration: 48,
      ease: "none",
      repeat: -1,
    });

    const syncDuration = () => {
      const half = track.scrollWidth / 2;
      if (half > 0) tween.duration(half / PX_PER_SEC);
    };
    syncDuration();

    let hovered = false;
    let focused = false;
    let onscreen = true;
    const sync = () => {
      if (hovered || focused || !onscreen || document.hidden) tween.pause();
      else tween.play();
    };

    const io = new IntersectionObserver((entries) => {
      onscreen = entries.some((entry) => entry.isIntersecting);
      sync();
    });
    io.observe(root);

    const onVis = () => sync();
    document.addEventListener("visibilitychange", onVis);

    root.addEventListener("mouseenter", () => {
      hovered = true;
      sync();
    });
    root.addEventListener("mouseleave", () => {
      hovered = false;
      sync();
    });
    root.addEventListener("focusin", () => {
      focused = true;
      sync();
    });
    root.addEventListener("focusout", () => {
      focused = false;
      sync();
    });

    const ro = new ResizeObserver(syncDuration);
    ro.observe(track);

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  });
}
