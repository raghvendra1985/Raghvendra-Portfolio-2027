"use client";

import {
  DURATION,
  EASE,
  createScope,
  gsap,
  ScrollTrigger,
  showImmediately,
  type MotionConfig,
} from "./motion";

export type KnowledgeArticleOptions = {
  onSection?: (id: string) => void;
};

function revealFrom(config: MotionConfig) {
  return config.isMobile
    ? { autoAlpha: 0, y: 20 }
    : { autoAlpha: 0, y: 24, filter: "blur(8px)" };
}

function revealTo(config: MotionConfig) {
  return config.isMobile
    ? { autoAlpha: 1, y: 0 }
    : { autoAlpha: 1, y: 0, filter: "blur(0px)" };
}

/**
 * Knowledge index: featured, rows, frameworks, OS links.
 * Hero line reveal is handled by `animateHero` on the same root.
 */
export function animateKnowledgeIndex(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const items = root.querySelectorAll("[data-knowledge-item]");
    if (config.reducedMotion) {
      showImmediately(items);
      return;
    }

    const from = revealFrom(config);
    const to = revealTo(config);

    items.forEach((item) => {
      gsap.fromTo(item, from, {
        ...to,
        duration: DURATION.lg,
        ease: EASE,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          once: true,
        },
      });
    });
  });
}

/**
 * Lightweight re-show after filter change — no ScrollTrigger rebuild.
 */
export function refreshKnowledgeIndexItems(root: HTMLElement, config: MotionConfig) {
  const items = root.querySelectorAll("[data-knowledge-item]");
  if (config.reducedMotion) {
    showImmediately(items);
    return;
  }
  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 12 },
    {
      autoAlpha: 1,
      y: 0,
      duration: DURATION.sm,
      stagger: 0.03,
      ease: EASE,
      overwrite: "auto",
    },
  );
}

/**
 * Article: block reveals, framework-step stagger, related transition,
 * sticky TOC section tracking. Headline line reveal via `animateHero`.
 */
export function animateKnowledgeArticle(
  root: HTMLElement,
  config: MotionConfig,
  options: KnowledgeArticleOptions = {},
) {
  return createScope(root, () => {
    const blocks = root.querySelectorAll("[data-article-block]");
    const steps = root.querySelectorAll("[data-framework-step]");
    const related = root.querySelectorAll("[data-related-item]");
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-article-section]"));
    const toc = root.querySelector<HTMLElement>("[data-article-toc]");
    const from = revealFrom(config);
    const to = revealTo(config);

    if (config.reducedMotion) {
      showImmediately([...Array.from(blocks), ...Array.from(steps), ...Array.from(related), toc]);
      const first = sections[0]?.id;
      if (first) options.onSection?.(first);
      return;
    }

    if (toc) {
      gsap.fromTo(toc, from, { ...to, duration: DURATION.md, ease: EASE });
    }

    blocks.forEach((item) => {
      gsap.fromTo(item, from, {
        ...to,
        duration: DURATION.lg,
        ease: EASE,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          once: true,
        },
      });
    });

    if (steps.length) {
      const framework = root.querySelector<HTMLElement>("[data-framework]") ?? root;
      gsap.fromTo(steps, from, {
        ...to,
        duration: DURATION.md,
        stagger: 0.08,
        ease: EASE,
        scrollTrigger: {
          trigger: framework,
          start: "top 80%",
          once: true,
        },
      });
    }

    if (related.length) {
      gsap.fromTo(related, from, {
        ...to,
        duration: DURATION.md,
        stagger: 0.07,
        ease: EASE,
        scrollTrigger: {
          trigger: related[0],
          start: "top 88%",
          once: true,
        },
      });
    }

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => options.onSection?.(section.id),
        onEnterBack: () => options.onSection?.(section.id),
      });
    });
  });
}
