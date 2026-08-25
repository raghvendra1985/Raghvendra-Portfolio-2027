"use client";

import { useEffect, useRef } from "react";
import { animateAmbient } from "@/animations/parallax";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function AmbientLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateAmbient(root, config);
    return () => ctx.revert();
  }, [config]);

  return (
    <div
      ref={ref}
      data-ambient
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${
        config.isMobile || config.reducedMotion ? "hidden" : ""
      }`}
    >
      <div
        data-ambient-light
        className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-gold opacity-[0.04] blur-3xl"
      />
      <div
        data-ambient-light
        className="absolute -right-16 top-[40%] h-80 w-80 rounded-full bg-green opacity-[0.035] blur-3xl"
      />
      <div
        data-ambient-breath
        className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-navy opacity-[0.025] blur-3xl"
      />
      <svg className="grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <filter id="rs-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#rs-grain)" />
      </svg>
    </div>
  );
}
