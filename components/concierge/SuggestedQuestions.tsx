"use client";

import { openingQuestions, matchSuggestedQuestion } from "@/concierge";

export default function SuggestedQuestions({
  onSelect,
  activeIndex = -1,
  query = "",
}: {
  onSelect: (label: string) => void;
  activeIndex?: number;
  query?: string;
}) {
  const matchedId = query.trim() ? matchSuggestedQuestion(query)?.id : undefined;
  const needle = query.trim().toLowerCase();

  return (
    <div data-concierge-item>
      <p className="mt-8 font-mono-label text-ink-soft">Suggested</p>
      <ul className="mt-4" role="listbox" aria-label="Suggested questions">
        {openingQuestions.map((item, index) => {
          const highlighted =
            matchedId === item.id ||
            (needle.length > 1 &&
              (item.label.toLowerCase().includes(needle) ||
                item.query.toLowerCase().includes(needle)));
          return (
            <li key={item.id} role="option" aria-selected={activeIndex === index}>
              <button
                type="button"
                data-concierge-option
                onClick={() => onSelect(item.label)}
                className={`w-full border-t border-line py-4 text-left type-h3 ${
                  highlighted || activeIndex === index
                    ? "text-navy"
                    : "text-ink-soft hover:text-navy"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
