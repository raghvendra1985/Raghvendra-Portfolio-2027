"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Motion tokens — the only duration and easing values the engine uses.
 * Animate transform, opacity, and filter only. Never layout properties.
 */
export const DURATION = {
  xs: 0.15,
  sm: 0.3,
  md: 0.6,
  lg: 1,
  xl: 1.6,
} as const;

export const EASE = "power4.out";
export const EASE_IN = "power4.in";
export const EASE_IN_OUT = "power4.inOut";

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
  translate: 32,
  scale: 0.98,
  duration: DURATION.lg,
  delay: 0,
  stagger: 0.08,
  ease: EASE,
  start: "top 82%",
};

let registered = false;

/** Register GSAP plugins once on the client. */
export function registerMotion() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);
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
  // Mobile: skip CSS filter blur — opacity/transform only (GPU cost).
  if (config?.isMobile || config?.reducedMotion) {
    resolved.blur = false;
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
 * Keeps reduced-motion users from waiting on hidden content.
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
