"use client";

import {
  createScope,
  gsap,
  resolveReveal,
  showImmediately,
  type MotionConfig,
  type RevealOptions,
} from "./motion";

/**
 * Section reveal — fade, mask, blur, translate, scale.
 * Every section on the site should enter through this function.
 * Mobile: blur disabled via resolveReveal(config).
 */
export function animateSection(
  root: HTMLElement,
  config: MotionConfig,
  options: RevealOptions = {},
) {
  const opts = resolveReveal(options, config);
  const targets = root.querySelectorAll<HTMLElement>("[data-reveal-item]");
  const nodes = targets.length ? targets : [root];

  return createScope(root, () => {
    if (config.reducedMotion) {
      showImmediately(nodes);
      return;
    }

    const from: gsap.TweenVars = {
      autoAlpha: opts.fade ? 0 : 1,
      y: opts.translate,
      scale: opts.scale,
    };
    if (opts.blur) from.filter = "blur(10px)";

    gsap.fromTo(nodes, from, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      ...(opts.blur ? { filter: "blur(0px)" } : {}),
      duration: opts.duration,
      delay: opts.delay,
      stagger: opts.stagger,
      ease: opts.ease,
      force3D: true,
      scrollTrigger: {
        trigger: root,
        start: opts.start,
        once: true,
      },
    });
  });
}

/**
 * Image reveal: blur → scale → sharp on desktop; opacity/scale on mobile.
 */
export function animateImageReveal(
  root: HTMLElement,
  config: MotionConfig,
  options: RevealOptions = {},
) {
  const opts = resolveReveal(options, config);
  const media = root.querySelector<HTMLElement>("[data-image-media]") ?? root;
  const useBlur = opts.blur && !config.isMobile;

  return createScope(root, () => {
    if (config.reducedMotion) {
      showImmediately(media);
      return;
    }

    gsap.fromTo(
      media,
      {
        autoAlpha: 0,
        scale: 1.08,
        ...(useBlur ? { filter: "blur(18px)" } : {}),
      },
      {
        autoAlpha: 1,
        scale: 1,
        ...(useBlur ? { filter: "blur(0px)" } : {}),
        duration: opts.duration,
        delay: opts.delay,
        ease: opts.ease,
        force3D: true,
        scrollTrigger: {
          trigger: root,
          start: opts.start,
          once: true,
        },
      },
    );

    const failsafe = window.setTimeout(() => {
      gsap.set(media, { autoAlpha: 1, scale: 1, filter: "none" });
    }, 1400);

    return () => window.clearTimeout(failsafe);
  });
}
