"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { animateStudioCard } from "@/animations/studio";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function StudioCard({
  children,
  className = "",
  offset = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  offset?: boolean;
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
      data-studio-card
      className={`studio-card border border-line bg-paper p-6 sm:p-8 ${offset ? "md:ml-16 md:-mt-10" : ""} ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
