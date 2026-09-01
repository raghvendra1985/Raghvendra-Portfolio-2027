"use client";

import { DURATION, EASE_DRIFT, createScope, gsap, type MotionConfig } from "./motion";

export type ParallaxOptions = {
  /** Base travel in px at speed 1. */
  distance?: number;
};

/**
 * Scroll-linked parallax via transform only.
 * Reads `data-parallax` as a speed multiplier (e.g. 0.2).
 */
export function animateParallax(
  root: HTMLElement,
  config: MotionConfig,
  options: ParallaxOptions = {},
) {
  const distance = options.distance ?? 80;

  return createScope(root, () => {
    if (config.reducedMotion || config.parallaxScale === 0) return;

    const layers = root.querySelectorAll<HTMLElement>("[data-parallax]");
    layers.forEach((layer) => {
      const speed = Number(layer.dataset.parallax ?? 0.2);
      const travel = distance * speed * config.parallaxScale;
      gsap.fromTo(
        layer,
        { y: -travel },
        {
          y: travel,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  });
}

/**
 * Ambient motion: floating light, breathing plane. Very low amplitude.
 */
export function animateAmbient(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    if (config.reducedMotion || config.isMobile) return;
    const lights = root.querySelectorAll("[data-ambient-light]");
    const breath = root.querySelectorAll("[data-ambient-breath]");
    const tweens: gsap.core.Tween[] = [];

    lights.forEach((light, i) => {
      tweens.push(
        gsap.to(light, {
          y: (i % 2 === 0 ? 12 : -8) * config.parallaxScale,
          x: (i % 2 === 0 ? -10 : 12) * config.parallaxScale,
          opacity: 0.18,
          duration: DURATION.atmosphere + i * 0.8,
          yoyo: true,
          repeat: -1,
          ease: EASE_DRIFT,
        }),
      );
    });

    breath.forEach((node) => {
      tweens.push(
        gsap.to(node, {
          scale: 1.03,
          opacity: 0.7,
          duration: DURATION.atmosphere,
          yoyo: true,
          repeat: -1,
          ease: EASE_DRIFT,
        }),
      );
    });

    const sync = () => {
      if (document.hidden) tweens.forEach((tween) => tween.pause());
      else tweens.forEach((tween) => tween.play());
    };
    document.addEventListener("visibilitychange", sync);

    return () => document.removeEventListener("visibilitychange", sync);
  });
}

/**
 * Site / article / case-study / knowledge progress via scaleX.
 */
export function animateProgress(
  bar: HTMLElement,
  config: MotionConfig,
  trigger?: Element,
) {
  return createScope(bar, () => {
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: trigger ?? document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: config.reducedMotion ? 0 : 0.3,
      },
    });
  });
}
