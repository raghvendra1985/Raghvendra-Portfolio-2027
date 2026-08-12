"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animateConciergeTrigger } from "@/animations/concierge";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useConcierge } from "@/components/concierge/ConciergeProvider";

function TriggerButton({
  variant,
  className,
  children,
  source,
  cursor,
}: {
  variant: "nav" | "float" | "mobile-menu" | "mobile-bar";
  className: string;
  children: ReactNode;
  source: string;
  cursor?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { openConcierge } = useConcierge();
  const { config } = useExperience();
  const animated = variant === "float" || variant === "mobile-bar";

  useEffect(() => {
    const root = ref.current;
    if (!root || !animated) return;
    const ctx = animateConciergeTrigger(root, config);
    return () => ctx.revert();
  }, [config, animated]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => openConcierge(source)}
      className={className}
      aria-label="Ask Raghvendra"
      data-cursor={cursor ? "Ask" : undefined}
    >
      {children}
    </button>
  );
}

export default function ConciergeTrigger({
  variant = "nav",
  className = "",
}: {
  variant?: "nav" | "float" | "mobile-menu" | "mobile-bar";
  className?: string;
}) {
  if (variant === "float") {
    return (
      <TriggerButton
        variant="float"
        source="float"
        cursor
        className={`fixed bottom-8 right-6 z-[55] hidden border border-navy/20 bg-mist/95 px-4 py-3 font-mono-label text-[11px] text-navy shadow-sm backdrop-blur md:inline-flex ${className}`}
      >
        Ask
        <span className="ml-3 text-ink-soft" aria-hidden="true">
          ⌘K
        </span>
      </TriggerButton>
    );
  }

  if (variant === "mobile-bar") {
    return (
      <TriggerButton
        variant="mobile-bar"
        source="mobile-bar"
        className={`fixed bottom-5 right-4 z-[55] border border-navy/20 bg-mist/95 px-3 py-2.5 font-mono-label text-[11px] text-navy shadow-sm backdrop-blur md:hidden ${className}`}
      >
        Ask
      </TriggerButton>
    );
  }

  if (variant === "mobile-menu") {
    return (
      <TriggerButton
        variant="mobile-menu"
        source="mobile-menu"
        className={`font-display text-2xl text-left ${className}`}
      >
        Ask Raghvendra
      </TriggerButton>
    );
  }

  return (
    <TriggerButton
      variant="nav"
      source="nav"
      cursor
      className={`hidden items-center gap-2 font-mono-label text-[11px] text-ink-soft hover:text-navy md:inline-flex ${className}`}
    >
      Ask
      <kbd className="border border-line px-1.5 py-0.5 text-[10px] text-ink-soft">⌘K</kbd>
    </TriggerButton>
  );
}
