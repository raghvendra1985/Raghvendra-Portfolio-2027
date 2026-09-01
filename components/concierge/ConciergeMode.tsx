"use client";

import type { ConciergeMode } from "@/concierge";
import SegmentedToolbar from "@/components/ui/SegmentedToolbar";

const modes: { id: ConciergeMode; label: string }[] = [
  { id: "hiring", label: "Hiring" },
  { id: "project", label: "Project" },
  { id: "speaking", label: "Speaking / Teaching" },
];

export default function ConciergeMode({
  value,
  onChange,
}: {
  value: ConciergeMode;
  onChange: (mode: ConciergeMode) => void;
}) {
  return (
    <div data-concierge-item>
      <SegmentedToolbar label="Concierge mode">
        {modes.map((mode) => {
          const pressed = value === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              data-concierge-mode-btn
              aria-pressed={pressed}
              onClick={() => onChange(mode.id)}
              className={`relative z-10 min-h-11 border px-3 py-2 font-mono-label ${
                pressed
                  ? "border-navy bg-transparent text-mist"
                  : "border-line text-ink-soft hover:border-navy hover:text-navy"
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </SegmentedToolbar>
    </div>
  );
}
