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
      data-concierge-trigger="true"
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
        className={`fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-[55] hidden min-h-11 border border-navy/20 bg-mist/95 px-4 py-3 font-mono-label text-navy shadow-sm backdrop-blur lg:inline-flex ${className}`}
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
        className={`fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-[55] inline-flex h-11 w-11 items-center justify-center border border-navy/20 bg-mist/95 font-mono-label text-navy shadow-sm backdrop-blur lg:hidden ${className}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M5 12h.01M12 7a4 4 0 0 1 4 4c0 1.5-.8 2.3-2.2 3.2-.9.6-1.8 1.3-1.8 2.3v.01M12 19h.01"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
