"use client";

import {
  DURATION,
  EASE_ENTER,
  EASE_MOVE,
  EASE_STANDARD,
  createScope,
  gsap,
  showImmediately,
  type MotionConfig,
} from "./motion";

function travel(px: number, config: MotionConfig) {
  return config.isMobile ? Math.round(px * (2 / 3)) : px;
}

/**
 * Screening: staggered incoming cards, one stays primary, others stack, status node resolves.
 */
export function animateScreening(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const cards = root.querySelectorAll<HTMLElement>("[data-story-card]");
    const primary = root.querySelector<HTMLElement>("[data-story-primary]");
    const stack = root.querySelectorAll<HTMLElement>("[data-story-stack]");
    const node = root.querySelector<HTMLElement>("[data-story-node]");

    if (config.reducedMotion) {
      showImmediately([root, ...Array.from(cards), primary, ...Array.from(stack), node]);
      gsap.set(stack, { x: 0, y: 0, scale: 0.96 });
      gsap.set(node, { scale: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: EASE_MOVE } });
    const yIn = travel(22, config);

    gsap.set(cards, { autoAlpha: 0, y: yIn });
    gsap.set(node, { scale: 0.7, autoAlpha: 0 });

    tl.to(cards, {
      autoAlpha: 1,
      y: 0,
      duration: DURATION.story,
      stagger: 0.075,
      ease: EASE_ENTER,
    });

    tl.to(
      stack,
      {
        x: travel(18, config),
        y: travel(10, config),
        scale: 0.96,
        duration: DURATION.panel,
        stagger: 0.06,
        ease: EASE_MOVE,
      },
      ">-0.2",
    );

    if (primary) {
      tl.to(primary, { x: 0, y: 0, scale: 1, duration: DURATION.panel, ease: EASE_ENTER }, "<");
    }

    tl.to(node, { autoAlpha: 1, scale: 1.12, duration: DURATION.reveal, ease: EASE_ENTER });
    tl.to(node, { scale: 1, duration: DURATION.ui, ease: EASE_STANDARD });
  });
}

/**
 * Drafting: source activates, composer enters, draft reveals by block, review-ready.
 * Send control is never animated.
 */
export function animateDrafting(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const source = root.querySelectorAll<HTMLElement>("[data-story-source]");
    const composer = root.querySelector<HTMLElement>("[data-story-composer]");
    const blocks = root.querySelectorAll<HTMLElement>("[data-story-block]");
    const review = root.querySelector<HTMLElement>("[data-story-review]");
    const send = root.querySelector<HTMLElement>("[data-story-send]");

    gsap.set(send, { clearProps: "transform,opacity" });

    if (config.reducedMotion) {
      showImmediately([root, ...Array.from(source), composer, ...Array.from(blocks), review]);
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: EASE_ENTER } });
    gsap.set(source, { autoAlpha: 0.45 });
    gsap.set(composer, { autoAlpha: 0, y: travel(22, config) });
    gsap.set(blocks, { autoAlpha: 0, y: travel(12, config) });
    gsap.set(review, { autoAlpha: 0 });

    tl.to(source, { autoAlpha: 1, duration: DURATION.ui, stagger: 0.07, ease: EASE_STANDARD });
    tl.to(composer, { autoAlpha: 1, y: 0, duration: DURATION.panel, ease: EASE_MOVE }, ">-0.05");
    tl.to(blocks, {
      autoAlpha: 1,
      y: 0,
      duration: DURATION.reveal,
      stagger: 0.09,
      ease: EASE_ENTER,
    });
    tl.to(review, { autoAlpha: 1, duration: DURATION.ui, ease: EASE_STANDARD });
  });
}

/**
 * Briefing: scattered cards consolidate, resolve into a reader, AM/PM crossfade, tab indicator.
 */
export function animateBriefing(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const cards = root.querySelectorAll<HTMLElement>("[data-story-brief-card]");
    const reader = root.querySelector<HTMLElement>("[data-story-reader]");
    const morning = root.querySelector<HTMLElement>("[data-story-morning]");
    const afternoon = root.querySelector<HTMLElement>("[data-story-afternoon]");
    const thumb = root.querySelector<HTMLElement>("[data-story-tab-thumb]");
    const tabs = root.querySelectorAll<HTMLElement>("[data-story-tab]");

    if (config.reducedMotion) {
      showImmediately([root, ...Array.from(cards), reader, morning, afternoon, thumb, ...Array.from(tabs)]);
      gsap.set(cards, { autoAlpha: 0 });
      gsap.set(afternoon, { autoAlpha: 0, x: 0 });
      gsap.set(morning, { autoAlpha: 1, x: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: EASE_MOVE } });
    const scatter = [travel(-28, config), travel(24, config), travel(-16, config)];

    cards.forEach((card, i) => {
      gsap.set(card, { autoAlpha: 1, x: scatter[i % scatter.length], y: travel(i % 2 === 0 ? 18 : -12, config) });
    });
    gsap.set(reader, { autoAlpha: 0, y: travel(16, config) });
    gsap.set(afternoon, { autoAlpha: 0, x: travel(8, config) });
    gsap.set(morning, { autoAlpha: 1, x: 0 });

    tl.to(cards, {
      x: 0,
      y: 0,
      duration: DURATION.story,
      stagger: 0.07,
      ease: EASE_MOVE,
    });
    tl.to(cards, { autoAlpha: 0, duration: DURATION.ui, ease: EASE_STANDARD }, ">-0.1");
    tl.to(reader, { autoAlpha: 1, y: 0, duration: DURATION.panel, ease: EASE_ENTER }, "<");
    tl.to(morning, { autoAlpha: 0, x: travel(-6, config), duration: DURATION.ui, ease: EASE_STANDARD }, "+=0.35");
    tl.to(afternoon, { autoAlpha: 1, x: 0, duration: DURATION.ui, ease: EASE_STANDARD }, "<");

    if (thumb && tabs[1]) {
      const bar = root.querySelector<HTMLElement>("[data-story-tabs]") ?? root;
      const barBox = bar.getBoundingClientRect();
      const box = tabs[1].getBoundingClientRect();
      tl.to(
        thumb,
        {
          x: box.left - barBox.left,
          duration: DURATION.ui,
          ease: EASE_STANDARD,
        },
        "<",
      );
    }
  });
}
