"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animateSection } from "@/animations/sections";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { RevealOptions } from "@/animations/motion";

export default function SectionReveal({
  children,
  className,
  options,
  id,
}: {
  children: ReactNode;
  className?: string;
  options?: RevealOptions;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { config } = useExperience();
  const fade = options?.fade;
  const blur = options?.blur;
  const translate = options?.translate;
  const scale = options?.scale;
  const duration = options?.duration;
  const delay = options?.delay;
  const stagger = options?.stagger;
  const ease = options?.ease;
  const start = options?.start;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateSection(root, config, {
      fade,
      blur,
      translate,
      scale,
      duration,
      delay,
      stagger,
      ease,
      start,
    });
    return () => ctx.revert();
  }, [config, fade, blur, translate, scale, duration, delay, stagger, ease, start]);

  return (
    <section ref={ref} id={id} className={className} data-reveal>
      {children}
    </section>
  );
}
