"use client";

import {
  DURATION,
  EASE,
  EASE_IN_OUT,
  createScope,
  gsap,
  ScrollTrigger,
  motionBlur,
  showImmediately,
  type MotionConfig,
} from "./motion";

/**
 * Case study page: hero image blur→sharp, chapter reveals, next-project cue.
 */
export function animateCaseStudy(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const hero = root.querySelector("[data-case-hero]");
    const chapters = root.querySelectorAll("[data-case-chapter]");
    const steps = root.querySelectorAll("[data-case-step]");
    const gallery = root.querySelectorAll("[data-case-gallery]");
    const system = root.querySelector("[data-case-system]");
    const next = root.querySelector("[data-case-next]");

    if (config.reducedMotion) {
      showImmediately([hero, chapters, steps, gallery, system, next]);
      return;
    }

    if (hero) {
      // Fade/blur the hero frame; scale only inner media so the grid cell
      // width never grows past the Situation column during entrance.
      const heroMedia =
        hero.querySelector("[data-image-media]") ??
        hero.querySelector("[data-image-reveal]") ??
        hero;
      gsap.fromTo(
        hero,
        { autoAlpha: 0, filter: motionBlur(18, config) },
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: DURATION.xl,
          ease: EASE,
        },
      );
      if (heroMedia !== hero) {
        gsap.fromTo(
          heroMedia,
          { scale: 1.06 },
          {
            scale: 1,
            duration: DURATION.xl,
            ease: EASE,
          },
        );
      }
    }

    chapters.forEach((chapter) => {
      gsap.fromTo(
        chapter,
        { autoAlpha: 0, y: 28, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.lg,
          ease: EASE,
          scrollTrigger: {
            trigger: chapter,
            start: "top 82%",
            once: true,
          },
        },
      );
    });

    if (steps.length) {
      gsap.fromTo(
        steps,
        { autoAlpha: 0, y: 20, filter: motionBlur(6, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.lg,
          stagger: 0.08,
          ease: EASE,
          scrollTrigger: {
            trigger: steps[0],
            start: "top 82%",
            once: true,
          },
        },
      );
    }

    gallery.forEach((frame) => {
      gsap.fromTo(
        frame,
        { autoAlpha: 0, y: 16, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.lg,
          ease: EASE,
          scrollTrigger: {
            trigger: frame,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    if (system) {
      gsap.fromTo(
        system,
        { autoAlpha: 0, y: 20, filter: motionBlur(8, config) },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: DURATION.lg,
          ease: EASE,
          scrollTrigger: {
            trigger: system,
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    if (next) {
      gsap.fromTo(
        next,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: DURATION.lg,
          ease: EASE,
          scrollTrigger: {
            trigger: next,
            start: "top 90%",
            once: true,
          },
        },
      );
    }
  });
}

export type SelectedWorkOptions = {
  onIndex?: (index: number) => void;
  isPaused?: () => boolean;
};

/**
 * Selected work: sticky visual, image crossfade, row-linked progress.
 * Keyboard updates are applied by calling `crossfadeWorkVisual` from the component.
 */
export function animateSelectedWork(
  root: HTMLElement,
  config: MotionConfig,
  options: SelectedWorkOptions = {},
) {
  return createScope(root, () => {
    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-work-row]"));
    const visuals = Array.from(root.querySelectorAll<HTMLElement>("[data-work-visual]"));
    const clipVisuals = Array.from(root.querySelectorAll<HTMLElement>("[data-work-clip-visual]"));
    const progress = root.querySelector<HTMLElement>("[data-work-progress]");

    if (!rows.length) return;

    const groups = [visuals, clipVisuals].filter((group) => group.length);

    if (config.reducedMotion) {
      groups.forEach((group) => {
        gsap.set(group, { autoAlpha: 0, scale: 1, filter: "none" });
        if (group[0]) gsap.set(group[0], { autoAlpha: 1 });
      });
    } else {
      groups.forEach((group) => {
        gsap.set(group, {
          autoAlpha: 0,
          scale: 1.04,
          filter: motionBlur(8, config),
        });
        if (group[0]) {
          gsap.set(group[0], { autoAlpha: 1, scale: 1, filter: "blur(0px)" });
        }
      });
    }

    setupWorkClip(root, config);

    rows.forEach((row, index) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => {
          if (options.isPaused?.()) return;
          setWorkIndex(groups, progress, index, rows.length, options.onIndex, config);
        },
        onEnterBack: () => {
          if (options.isPaused?.()) return;
          setWorkIndex(groups, progress, index, rows.length, options.onIndex, config);
        },
      });
    });
  });
}

/** Survives Selected Work remounts so the overlay cannot cover the list again. */
let selectedWorkClipPlayed = false;

/**
 * Fullscreen clip: cover starts as the stage, then insets into the sticky frame
 * while sibling covers assemble. Structure from the clip-path reference; our covers,
 * sharp corners, token durations. Desktop + motion-ok only.
 */
function setupWorkClip(root: HTMLElement, config: MotionConfig) {
  const stage = root.querySelector<HTMLElement>("[data-work-clip-root]");
  const clip = root.querySelector<HTMLElement>("[data-work-clip]");
  const clipImage = root.querySelector<HTMLElement>("[data-work-clip-img]");
  const target = root.querySelector<HTMLElement>("[data-work-clip-target]");
  const slidesParent = root.querySelector<HTMLElement>("[data-work-slides]");
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-work-slide]")).filter(
    (slide) => slide.dataset.workSlide !== "current",
  );
  const desktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  if (!stage || !clip || !clipImage || !target) return;

  if (config.reducedMotion || config.isMobile || !desktop) {
    gsap.set(clip, { autoAlpha: 0, clipPath: "none" });
    gsap.set(slides, { autoAlpha: 0 });
    return;
  }

  if (selectedWorkClipPlayed) {
    gsap.set(clip, { autoAlpha: 0, clipPath: "none" });
    gsap.set(slides, { autoAlpha: 0 });
    return;
  }

  const insetForTarget = () => {
    const stageBox = stage.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    if (stageBox.width < 8 || stageBox.height < 8 || targetBox.width < 8) {
      return "inset(0% 0% 0% 0%)";
    }
    const top = Math.max(0, ((targetBox.top - stageBox.top) / stageBox.height) * 100);
    const left = Math.max(0, ((targetBox.left - stageBox.left) / stageBox.width) * 100);
    const bottom = Math.max(0, ((stageBox.bottom - targetBox.bottom) / stageBox.height) * 100);
    const right = Math.max(0, ((stageBox.right - targetBox.right) / stageBox.width) * 100);
    return `inset(${top}% ${right}% ${bottom}% ${left}%)`;
  };

  gsap.set(clip, {
    autoAlpha: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    willChange: "clip-path",
  });
  gsap.set(clipImage, { scale: 1.12, transformOrigin: "50% 50%", force3D: true });
  if (slidesParent) gsap.set(slidesParent, { perspective: 1000, transformStyle: "preserve-3d" });
  gsap.set(slides, { autoAlpha: 0, z: 280, force3D: true });

  ScrollTrigger.create({
    trigger: stage,
    start: "top 78%",
    once: true,
    onEnter: () => {
      const endInset = insetForTarget();
      const stageBox = stage.getBoundingClientRect();
      const targetBox = target.getBoundingClientRect();
      if (targetBox.top < 0 || stageBox.bottom < 80) {
        selectedWorkClipPlayed = true;
        gsap.set(clip, { autoAlpha: 0, clipPath: "none" });
        gsap.set(slides, { autoAlpha: 0 });
        return;
      }
      selectedWorkClipPlayed = true;
      gsap.set(clip, { autoAlpha: 1, willChange: "clip-path" });
      gsap
        .timeline({
          defaults: { duration: DURATION.lg, ease: EASE_IN_OUT },
          onComplete: () => {
            gsap.set(clip, { willChange: "auto" });
          },
        })
        .addLabel("start", 0)
        .to(clip, { clipPath: endInset }, "start")
        .to(clipImage, { scale: 0.85, force3D: true }, "start")
        .to(
          slides,
          {
            autoAlpha: 1,
            z: 0,
            duration: DURATION.xl,
            stagger: { amount: 0.15, from: "center" },
          },
          "start",
        )
        .addLabel("land", "start+=0.85")
        .to(clipImage, { scale: 1, duration: DURATION.md, ease: EASE }, "land")
        .to([clip, slidesParent].filter(Boolean), {
          autoAlpha: 0,
          duration: DURATION.md,
          ease: EASE,
        }, "land");
    },
  });
}

export function crossfadeWorkVisual(
  visuals: HTMLElement[],
  index: number,
  config: MotionConfig,
) {
  visuals.forEach((visual, i) => {
    const active = i === index;
    if (config.reducedMotion) {
      gsap.set(visual, {
        autoAlpha: active ? 1 : 0,
        scale: 1,
        filter: "none",
      });
      return;
    }
    gsap.to(visual, {
      autoAlpha: active ? 1 : 0,
      scale: active ? 1 : 1.04,
      filter: active ? "blur(0px)" : motionBlur(8, config),
      duration: DURATION.md,
      ease: EASE,
      overwrite: "auto",
      force3D: true,
    });
  });
}

function setWorkIndex(
  groups: HTMLElement[][],
  progress: HTMLElement | null,
  index: number,
  total: number,
  onIndex: ((index: number) => void) | undefined,
  config: MotionConfig,
) {
  groups.forEach((visuals) => crossfadeWorkVisual(visuals, index, config));
  onIndex?.(index);
  if (progress) {
    gsap.to(progress, {
      scaleX: (index + 1) / total,
      duration: config.reducedMotion ? 0 : DURATION.md,
      ease: EASE,
    });
  }
}
