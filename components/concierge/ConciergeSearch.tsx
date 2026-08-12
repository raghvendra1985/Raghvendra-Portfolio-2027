"use client";

import { forwardRef } from "react";

const ConciergeSearch = forwardRef<
  HTMLInputElement,
  {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
  }
>(function ConciergeSearch({ value, onChange, onSubmit }, ref) {
  return (
    <form
      data-concierge-item
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="border-b border-line pb-4"
    >
      <label htmlFor="concierge-search" className="sr-only">
        Search portfolio evidence
      </label>
      <input
        ref={ref}
        id="concierge-search"
        type="search"
        role="searchbox"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask about work, AI, leadership, teaching…"
        autoComplete="off"
        className="w-full bg-transparent font-display text-2xl text-navy outline-none placeholder:text-ink-soft/50 sm:text-3xl"
        aria-label="Ask Raghvendra"
      />
    </form>
  );
});

export default ConciergeSearch;
