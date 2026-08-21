"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { animateStudioCard } from "@/animations/studio";
import { useExperience } from "@/components/providers/ExperienceProvider";

export default function StudioHover({
  children,
  className = "",
  lift = true,
  ...props
}: {
  children: ReactNode;
  className?: string;
  lift?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateStudioCard(root, config, { lift });
    return () => ctx.revert();
  }, [config, lift]);

  return (
    <div ref={ref} data-studio-hover className={className} {...props}>
      {children}
    </div>
  );
}
