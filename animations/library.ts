"use client";

import {
  DURATION,
  EASE_PHYSICAL,
  createScope,
  gsap,
  showImmediately,
  type MotionConfig,
} from "./motion";

export function animateLibraryEnter(root: HTMLElement, config: MotionConfig) {
  const items = root.querySelectorAll<HTMLElement>("[data-library-object]");
  items.forEach((item) => {
    item.dataset.libraryVisible = "true";
  });
  if (config.reducedMotion) {
    showImmediately(items);
    return;
  }

  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      duration: DURATION.md,
      stagger: 0.02,
      ease: EASE_PHYSICAL,
      overwrite: "auto",
    },
  );
}

let filterToken = 0;

export function animateLibraryFilter(
  root: HTMLElement,
  nextVisible: Set<string>,
  reducedMotion: boolean,
) {
  const items = Array.from(root.querySelectorAll<HTMLElement>("[data-library-object]"));
  if (!items.length) return;
  const token = ++filterToken;
  gsap.killTweensOf(items);

  const outgoing = items.filter(
    (el) => el.dataset.libraryVisible !== "false" && !nextVisible.has(el.dataset.libraryObject ?? ""),
  );
  const incoming = items.filter(
    (el) => el.dataset.libraryVisible === "false" && nextVisible.has(el.dataset.libraryObject ?? ""),
  );
  const remaining = items.filter(
    (el) => el.dataset.libraryVisible !== "false" && nextVisible.has(el.dataset.libraryObject ?? ""),
  );

  outgoing.forEach((el) => {
    el.dataset.libraryExiting = "true";
  });

  if (reducedMotion) {
    items.forEach((el) => {
      const show = nextVisible.has(el.dataset.libraryObject ?? "");
      el.dataset.libraryVisible = show ? "true" : "false";
      delete el.dataset.libraryExiting;
      gsap.set(el, { autoAlpha: show ? 1 : 0, x: 0, y: 0, rotate: 0, scale: 1 });
    });
    return;
  }

  const firstRemaining = remaining.map((el) => el.getBoundingClientRect());
  let applied = false;

  const applyLayoutAndFlip = () => {
    if (token !== filterToken || applied) return;
    applied = true;
    outgoing.forEach((el) => {
      el.dataset.libraryVisible = "false";
      delete el.dataset.libraryExiting;
      gsap.set(el, { y: 0, x: 0 });
    });
    incoming.forEach((el) => {
      el.dataset.libraryVisible = "true";
      gsap.set(el, { autoAlpha: 0, y: 28 });
    });

    remaining.forEach((el, index) => {
      const last = el.getBoundingClientRect();
      const dx = firstRemaining[index].left - last.left;
      if (Math.abs(dx) < 0.5) {
        gsap.set(el, { x: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { x: dx },
        { x: 0, duration: DURATION.md, ease: EASE_PHYSICAL, overwrite: "auto" },
      );
    });

    if (incoming.length) {
      gsap.fromTo(
        incoming,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: DURATION.md,
          stagger: 0.02,
          ease: EASE_PHYSICAL,
          overwrite: "auto",
        },
      );
    }
  };

  if (outgoing.length) {
    gsap.to(outgoing, {
      y: 40,
      autoAlpha: 0,
      duration: DURATION.md,
      stagger: 0.02,
      ease: EASE_PHYSICAL,
      overwrite: "auto",
      onComplete: applyLayoutAndFlip,
      onInterrupt: applyLayoutAndFlip,
    });
    return;
  }

  applyLayoutAndFlip();
}

export function animateLibraryShelf(
  root: HTMLElement,
  options: {
    hoveredKey: string | null;
    selectedKey: string | null;
    reducedMotion: boolean;
  },
) {
  return createScope(root, () => {
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-library-object]")).filter(
      (item) => item.dataset.libraryVisible !== "false" && item.dataset.libraryExiting !== "true",
    );
    const selectedIndex = items.findIndex((item) => item.dataset.libraryObject === options.selectedKey);
    const hoveredIndex = items.findIndex((item) => item.dataset.libraryObject === options.hoveredKey);
    const activeIndex = selectedIndex >= 0 ? selectedIndex : hoveredIndex;

    items.forEach((item, index) => {
      const face = item.querySelector<HTMLElement>("[data-library-face]");
      const reveal = item.querySelector<HTMLElement>("[data-library-reveal]");
      const note = item.querySelector<HTMLElement>("[data-library-note]");
      const restRotate = Number(item.dataset.restRotate ?? 0);
      const isSelected = index === selectedIndex;
      const isHovered = selectedIndex < 0 && index === hoveredIndex;
      const spread =
        activeIndex >= 0 && index !== activeIndex
          ? Math.sign(index - activeIndex) * (selectedIndex >= 0 ? 16 : 6)
          : 0;

      if (options.reducedMotion) {
        gsap.set(item, { x: spread, y: 0, rotate: 0, scale: 1 });
        if (face) gsap.set(face, { rotateY: 0 });
        if (reveal) gsap.set(reveal, { autoAlpha: isSelected ? 1 : 0, y: 0, scale: 1 });
        if (note) gsap.set(note, { autoAlpha: isSelected ? 1 : 0, y: 0 });
        return;
      }

      gsap.to(item, {
        x: spread,
        y: isSelected ? -40 : isHovered ? -28 : 0,
        rotate: isSelected ? 0 : isHovered ? -1 : restRotate,
        scale: isSelected ? 1.04 : isHovered ? 1.06 : 1,
        duration: isSelected ? 0.52 : 0.36,
        ease: EASE_PHYSICAL,
        transformOrigin: "50% 100%",
        overwrite: "auto",
      });

      if (face) {
        gsap.to(face, {
          rotateY: isSelected ? -8 : 0,
          duration: isSelected ? 0.42 : 0.32,
          ease: EASE_PHYSICAL,
          overwrite: "auto",
        });
      }

      if (reveal) {
        gsap.to(reveal, {
          autoAlpha: isSelected ? 1 : 0,
          y: isSelected ? 0 : 12,
          scale: isSelected ? 1 : 0.94,
          duration: 0.4,
          ease: EASE_PHYSICAL,
          overwrite: "auto",
        });
      }

      if (note) {
        gsap.to(note, {
          autoAlpha: isSelected ? 1 : 0,
          y: isSelected ? 0 : 16,
          duration: 0.32,
          delay: isSelected ? 0.18 : 0,
          ease: EASE_PHYSICAL,
          overwrite: "auto",
        });
      }
    });
  });
}
