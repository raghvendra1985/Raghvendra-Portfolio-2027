"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { animateStudioCard } from "@/animations/studio";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function AboutCard({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateStudioCard(root, config);
    return () => ctx.revert();
  }, [config]);

  return (
    <article
      ref={ref}
      data-about-card
      className={`about-card border border-line bg-paper p-6 sm:p-8 ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
