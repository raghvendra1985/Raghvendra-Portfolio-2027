"use client";

import { DURATION, EASE, gsap, type MotionConfig } from "./motion";

export const LOADER_DURATION_MS = 900;
const VISIT_KEY = "rs-v8-visited";

export function hasVisited() {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(VISIT_KEY) === "1";
  } catch {
    return true;
  }
}

export function markVisited() {
  try {
    sessionStorage.setItem(VISIT_KEY, "1");
  } catch {
    /* private mode */
  }
}

export type LoaderPhase = "wordmark" | "navigation" | "hero" | "ready";

export type LoaderOptions = {
  /** Total sequence length in seconds. Spec default: 0.9. */
  duration?: number;
  navigation?: HTMLElement | null;
  onPhase?: (phase: LoaderPhase) => void;
};

/**
 * First-visit loader — 900ms sequence:
 * background fade → wordmark → navigation → hero handoff → page ready.
 *
 * Timeline (seconds):
 * 0.00  overlay already covering (background)
 * 0.08  wordmark fade + unblur
 * 0.38  navigation fade in
 * 0.62  overlay begins exit; hero may start
 * 0.90  page ready
 */
export function animateLoader(
  root: HTMLElement,
  config: MotionConfig,
  options: LoaderOptions = {},
) {
  const duration = options.duration ?? LOADER_DURATION_MS / 1000;
  const wordmark = root.querySelector("[data-loader-wordmark]");
  const rule = root.querySelector("[data-loader-rule]");
  const navigation = options.navigation ?? document.querySelector<HTMLElement>("[data-nav]");
  const onPhase = options.onPhase;

  if (config.reducedMotion) {
    gsap.set(root, { autoAlpha: 0 });
    gsap.set(navigation, { autoAlpha: 1, y: 0 });
    markVisited();
    onPhase?.("ready");
    return null;
  }

  gsap.set(navigation, { autoAlpha: 0, y: -12 });

  const tl = gsap.timeline({ defaults: { ease: EASE } });

  // 1. Background is already covering via the overlay.
  // 2. Wordmark.
  tl.add(() => onPhase?.("wordmark"), 0);
  tl.fromTo(
    wordmark,
    { autoAlpha: 0, y: 18, filter: config.isMobile ? "none" : "blur(10px)" },
    {
      autoAlpha: 1,
      y: 0,
      filter: "none",
      duration: DURATION.sm,
    },
    0.08,
  );
  tl.fromTo(
    rule,
    { scaleX: 0 },
    { scaleX: 1, duration: DURATION.sm, transformOrigin: "left center" },
    0.22,
  );

  // 3. Navigation.
  tl.add(() => onPhase?.("navigation"), 0.38);
  if (navigation) {
    tl.to(
      navigation,
      { autoAlpha: 1, y: 0, duration: DURATION.sm },
      0.38,
    );
  }

  // 4. Hero handoff — overlay exits, page content may animate in.
  tl.add(() => onPhase?.("hero"), 0.62);
  tl.to(
    [wordmark, rule],
    { autoAlpha: 0, y: -12, duration: DURATION.sm },
    0.62,
  );
  tl.to(root, { autoAlpha: 0, duration: DURATION.sm }, 0.68);

  // 5. Page ready.
  tl.add(() => {
    markVisited();
    onPhase?.("ready");
  }, duration);

  return tl;
}
