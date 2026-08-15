"use client";

import { forwardRef } from "react";

const ConciergeSearch = forwardRef<
  HTMLInputElement,
  {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    listening?: boolean;
    speechSupported?: boolean | null;
    speechError?: string | null;
    onToggleListen?: () => void;
  }
>(function ConciergeSearch(
  {
    value,
    onChange,
    onSubmit,
    listening = false,
    speechSupported = null,
    speechError = null,
    onToggleListen,
  },
  ref,
) {
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
      <div className="flex items-end gap-3">
        <input
          ref={ref}
          id="concierge-search"
          type="search"
          role="searchbox"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ask about work, AI, leadership, teaching…"
          autoComplete="off"
          className="min-h-11 w-full bg-transparent font-display text-xl leading-snug text-navy outline-none placeholder:text-ink-soft/50 sm:text-3xl"
          aria-label="Ask the portfolio"
          aria-describedby={speechError ? "concierge-speech-status" : "concierge-listen-status"}
        />
        <button
          type="button"
          onClick={onToggleListen}
          disabled={!speechSupported}
          aria-pressed={listening}
          aria-label={listening ? "Stop listening" : "Ask out loud"}
          title={
            speechSupported
              ? listening
                ? "Stop listening"
                : "Ask out loud"
              : "Voice input isn’t available in this browser"
          }
          className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border font-mono-label ${
            listening
              ? "border-navy bg-navy text-mist"
              : "border-line text-navy hover:border-navy disabled:cursor-not-allowed disabled:opacity-40"
          }`}
        >
          Mic
        </button>
      </div>
      <p id="concierge-listen-status" className="sr-only" aria-live="polite">
        {listening ? "Listening…" : ""}
      </p>
      {speechError ? (
        <p id="concierge-speech-status" className="mt-3 text-base text-ink-soft" role="status">
          {speechError}
        </p>
      ) : speechSupported === false ? (
        <p className="mt-3 font-mono-label text-ink-soft">
          Voice works in Chrome, Edge, and Safari. Type here in this browser.
        </p>
      ) : listening ? (
        <p className="mt-3 font-mono-label text-gold" aria-hidden="true">
          Listening…
        </p>
      ) : null}
    </form>
  );
});

export default ConciergeSearch;
