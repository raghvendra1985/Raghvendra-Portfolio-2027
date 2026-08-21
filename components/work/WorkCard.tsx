"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { animateWorkCard } from "@/animations/work";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function WorkCard({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateWorkCard(root, config);
    return () => ctx.revert();
  }, [config]);

  return (
    <div ref={ref} data-work-card className={className} {...props}>
      {children}
    </div>
  );
}
