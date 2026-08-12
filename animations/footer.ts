"use client";

import {
  DURATION,
  EASE,
  createScope,
  gsap,
  motionBlur,
  showImmediately,
  type MotionConfig,
} from "./motion";

export type FooterOptions = {
  wordmarkDuration?: number;
  linkStagger?: number;
};

/**
 * Footer reveal from the bottom: large wordmark, staggered links, status pulse.
 */
export function animateFooter(
  root: HTMLElement,
  config: MotionConfig,
  options: FooterOptions = {},
) {
  const wordmarkDuration = options.wordmarkDuration ?? DURATION.lg;
  const linkStagger = options.linkStagger ?? 0.05;

  return createScope(root, () => {
    const wordmark = root.querySelector("[data-footer-wordmark]");
    const links = root.querySelectorAll("[data-footer-link]");
    const status = root.querySelector("[data-footer-status]");

    if (config.reducedMotion) {
      showImmediately([wordmark, links, status]);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      scrollTrigger: {
        trigger: root,
        start: "top 88%",
        once: true,
      },
    });

    if (wordmark) {
      tl.fromTo(
        wordmark,
        { yPercent: 28, autoAlpha: 0, filter: motionBlur(12, config) },
        { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: wordmarkDuration },
      );
    }

    if (links.length) {
      tl.fromTo(
        links,
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: DURATION.md, stagger: linkStagger },
        0.15,
      );
    }

    if (status) {
      tl.fromTo(
        status,
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, duration: DURATION.md },
        0.25,
      );
      tl.to(
        status.querySelector("[data-status-dot]"),
        {
          opacity: 0.35,
          duration: DURATION.xl,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        },
        0.4,
      );
    }
  });
}
