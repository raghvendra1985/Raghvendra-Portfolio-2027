import { DURATION, EASE, createScope, gsap, showImmediately, type MotionConfig } from "./motion";

function skipScrollHide(config: MotionConfig) {
  if (config.reducedMotion || config.isMobile) return true;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1023px)").matches;
}

export function animateProductCards(root: HTMLElement, config: MotionConfig) {
  return createScope(root, () => {
    const items = root.querySelectorAll("[data-product-card]");
    if (skipScrollHide(config)) {
      showImmediately(items);
      return;
    }

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: DURATION.md,
          ease: EASE,
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
        },
      );
    });
  });
}

export function refreshProductCards(root: HTMLElement, config: MotionConfig) {
  const items = root.querySelectorAll("[data-product-card]");
  if (skipScrollHide(config)) {
    showImmediately(items);
    return;
  }
  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 10 },
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
