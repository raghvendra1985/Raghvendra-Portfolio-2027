"use client";

import { suggestedQuestions } from "@/concierge";

export default function SuggestedQuestions({
  onSelect,
  activeIndex = -1,
}: {
  onSelect: (label: string) => void;
  activeIndex?: number;
}) {
  return (
    <div data-concierge-item>
      <p className="font-mono-label text-[11px] text-ink-soft">Suggested</p>
      <ul className="mt-4" role="listbox" aria-label="Suggested questions">
        {suggestedQuestions.map((item, index) => (
          <li key={item.id} role="option" aria-selected={activeIndex === index}>
            <button
              type="button"
              data-concierge-option
              onClick={() => onSelect(item.label)}
              className={`w-full border-t border-line py-4 text-left font-display text-lg leading-snug sm:text-xl ${
                activeIndex === index ? "text-navy" : "text-ink-soft hover:text-navy"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
