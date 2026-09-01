"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Motion tokens — the only duration and easing values the engine uses.
 * Animate transform, opacity, and filter only. Never layout properties.
 * Motion organises complexity and returns the interface to calm.
 */
export const DURATION = {
  instant: 0.1,
  fast: 0.18,
  ui: 0.24,
  panel: 0.42,
  reveal: 0.7,
  story: 1.1,
  atmosphere: 14,
  /** @deprecated Use instant */
  xs: 0.1,
  /** @deprecated Use fast */
  sm: 0.18,
  /** @deprecated Use panel */
  md: 0.42,
  /** @deprecated Use reveal */
  lg: 0.7,
  /** @deprecated Use story */
  xl: 1.1,
} as const;

export const EASE_STANDARD = "cubic-bezier(0.4, 0, 0, 1)";
export const EASE_ENTER = "cubic-bezier(0.165, 0.84, 0.44, 1)";
export const EASE_EXIT = "cubic-bezier(0.55, 0.055, 0.675, 0.19)";
export const EASE_MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";
export const EASE_REVEAL = "cubic-bezier(0.19, 1, 0.22, 1)";
export const EASE_DRIFT = "cubic-bezier(0.455, 0.03, 0.515, 0.955)";

/** Default reveal ease. Never bounce, elastic, or spring overshoot. */
export const EASE = EASE_ENTER;
export const EASE_IN = EASE_EXIT;
export const EASE_IN_OUT = EASE_MOVE;
export const EASE_PHYSICAL = EASE_REVEAL;

export type DurationKey = keyof typeof DURATION;

export type MotionConfig = {
  reducedMotion: boolean;
  isMobile: boolean;
  /** 1 on desktop, 0.35 on mobile, 0 when reduced. */
  parallaxScale: number;
};

export type RevealOptions = {
  fade?: boolean;
  mask?: boolean;
  blur?: boolean;
  translate?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
};

const defaults: Required<Omit<RevealOptions, "start">> & { start: string } = {
  fade: true,
  mask: true,
  blur: true,
  translate: 20,
  scale: 0.985,
  duration: DURATION.reveal,
  delay: 0,
  stagger: 0.08,
  ease: EASE_ENTER,
  start: "top 82%",
};

let registered = false;

/** Register GSAP plugins once on the client. */
export function registerMotion() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

export function getMotionConfig(): MotionConfig {
  const reducedMotion = prefersReducedMotion();
  const isMobile = isMobileViewport();
  return {
    reducedMotion,
    isMobile,
    parallaxScale: reducedMotion ? 0 : isMobile ? 0.35 : 1,
  };
}

export function resolveReveal(
  options: RevealOptions = {},
  config?: Pick<MotionConfig, "isMobile" | "reducedMotion">,
): Required<RevealOptions> {
  const resolved = { ...defaults, ...options };
  if (config?.isMobile || config?.reducedMotion) {
    resolved.blur = false;
  }
  if (config?.isMobile && options.translate === undefined) {
    resolved.translate = Math.round(defaults.translate * (2 / 3));
  }
  return resolved;
}

/** CSS filter blur, or "none" on mobile / reduced motion. */
export function motionBlur(
  px: number,
  config?: Pick<MotionConfig, "isMobile" | "reducedMotion">,
) {
  if (config?.isMobile || config?.reducedMotion) return "none";
  return `blur(${px}px)`;
}

/**
 * Instantly show an element when motion is disabled.
 * Reduced-motion presentations show the final useful state.
 */
export function showImmediately(targets: gsap.TweenTarget) {
  gsap.set(targets, {
    autoAlpha: 1,
    y: 0,
    yPercent: 0,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    clearProps: "transform,filter",
  });
}

export function createScope(
  root: Element | undefined | null,
  fn: () => void | (() => void),
) {
  registerMotion();
  return gsap.context(fn, root ?? undefined);
}

export { gsap, ScrollTrigger };
