"use client";

import type { ConciergeMode } from "@/concierge";

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
    <div
      className="flex flex-wrap gap-2"
      role="toolbar"
      aria-label="Concierge mode"
      data-concierge-item
    >
      {modes.map((mode) => {
        const pressed = value === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            data-concierge-mode-btn
            aria-pressed={pressed}
            onClick={() => onChange(mode.id)}
            className={`border px-3 py-2 font-mono-label text-[11px] ${
              pressed
                ? "border-navy bg-navy text-mist"
                : "border-line text-ink-soft hover:border-navy hover:text-navy"
            }`}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
