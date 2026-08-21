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
      aria-label="Ask the portfolio"
      data-cursor={cursor ? "Ask" : undefined}
    >
      {children}
    </button>
  );
}

export default function ConciergeTrigger({
  variant = "nav",
  className = "",
  inverted = false,
}: {
  variant?: "nav" | "float" | "mobile-menu" | "mobile-bar";
  className?: string;
  inverted?: boolean;
}) {
  if (variant === "float") {
    return (
      <TriggerButton
        variant="float"
        source="float"
        cursor
        className={`fixed bottom-8 right-6 z-[55] hidden min-h-11 border border-navy/20 bg-mist/95 px-4 py-3 font-mono-label text-navy shadow-sm backdrop-blur lg:inline-flex ${className}`}
      >
        Ask the portfolio
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
        className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-[55] min-h-11 border border-navy/20 bg-mist/95 px-4 py-3 font-mono-label text-navy shadow-sm backdrop-blur lg:hidden ${className}`}
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
        className={`inline-flex min-h-11 items-center font-mono-label text-gold hover:text-mist ${className}`}
      >
        Ask the portfolio →
      </TriggerButton>
    );
  }

  return (
    <TriggerButton
      variant="nav"
      source="nav"
      cursor
      className={`hidden min-h-11 items-center gap-2 font-mono-label lg:inline-flex ${
        inverted ? "text-mist/70 hover:text-mist" : "text-ink-soft hover:text-navy"
      } ${className}`}
    >
      Ask
      <kbd
        className={`border px-1.5 py-0.5 text-[10px] ${
          inverted ? "border-mist/30 text-mist/70" : "border-line text-ink-soft"
        }`}
      >
        ⌘K
      </kbd>
    </TriggerButton>
  );
}
