"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  animateConciergeMode,
  animateConciergePanel,
  animateConciergeResults,
} from "@/animations/concierge";
import {
  composeResponse,
  suggestedQuestions,
  trackConcierge,
  type ConciergeAnswer,
  type ConciergeMode as Mode,
} from "@/concierge";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { useConcierge } from "@/components/concierge/ConciergeProvider";
import ConciergeMode from "@/components/concierge/ConciergeMode";
import ConciergeSearch from "@/components/concierge/ConciergeSearch";
import SuggestedQuestions from "@/components/concierge/SuggestedQuestions";
import ConciergeResponse from "@/components/concierge/ConciergeResponse";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

function getFocusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
}

export default function ConciergePanel() {
  const { open, closeConcierge } = useConcierge();
  const { config } = useExperience();
  const pathname = usePathname();
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("hiring");
  const [answer, setAnswer] = useState<ConciergeAnswer | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [fromVoice, setFromVoice] = useState(false);

  const { speak, cancel: cancelSpeech, speaking, supported: ttsSupported } = useSpeechSynthesis();

  const runQuery = useCallback(
    (value: string, voice = false) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      cancelSpeech();
      setQuery(trimmed);
      setFromVoice(voice);
      const result = composeResponse(trimmed, mode);
      setAnswer(result);
      setActiveIndex(-1);
      trackConcierge("concierge_query", {
        query: trimmed,
        mode,
        results: result.evidence.length,
        voice,
      });
      if (result.noResult) {
        trackConcierge("concierge_no_result", { query: trimmed, mode });
      }
    },
    [mode, cancelSpeech],
  );

  const {
    supported: speechSupported,
    listening,
    interim,
    error: speechError,
    start: startListening,
    stop: stopListening,
  } = useSpeechRecognition({
    onFinal: (transcript) => {
      trackConcierge("concierge_voice_result", { query: transcript });
      runQuery(transcript, true);
    },
  });

  const optionCount = useMemo(() => {
    if (!answer) return suggestedQuestions.length;
    return answer.evidence.length + answer.related.length + answer.nextQuestions.length;
  }, [answer]);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setAnswer(null);
    setActiveIndex(-1);
    setFromVoice(false);
    cancelSpeech();
    stopListening();
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, cancelSpeech, stopListening]);

  useEffect(() => {
    if (!open) {
      cancelSpeech();
      stopListening();
    }
  }, [open, cancelSpeech, stopListening]);

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    if (!root) return;
    const panelCtx = animateConciergePanel(root, config);
    const modeCtx = animateConciergeMode(root, config);
    return () => {
      panelCtx.revert();
      modeCtx.revert();
    };
  }, [open, config]);

  useEffect(() => {
    if (!open || !answer) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateConciergeResults(root, config);
    return () => ctx.revert();
  }, [open, answer, config]);

  useEffect(() => {
    if (!open || !answer || !fromVoice || config.reducedMotion || !ttsSupported) return;
    speak(answer.answer);
    trackConcierge("concierge_speak", { auto: true });
  }, [answer?.answer, fromVoice, open, config.reducedMotion, speak, ttsSupported, answer]);

  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      closeConcierge();
    }
  }, [pathname, closeConcierge]);

  useEffect(() => {
    if (!open) return;

    const chrome = [
      document.querySelector("[data-nav]"),
      document.querySelector(".site-content"),
      document.querySelector("[data-ambient]"),
    ].filter(Boolean) as HTMLElement[];

    chrome.forEach((el) => {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeConcierge();
        return;
      }

      const root = rootRef.current;
      if (!root) return;

      if (event.key === "Tab") {
        const focusable = getFocusable(root);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const options = root.querySelectorAll<HTMLElement>("[data-concierge-option]");
        if (!options.length) return;
        event.preventDefault();
        setActiveIndex((current) => {
          const next =
            event.key === "ArrowDown"
              ? (current + 1) % options.length
              : (current - 1 + options.length) % options.length;
          options[next]?.focus();
          return next;
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      chrome.forEach((el) => {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      });
      restoreFocusRef.current?.focus?.();
    };
  }, [open, closeConcierge]);

  if (!open) return null;

  const displayQuery = listening && interim ? interim : query;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[80]">
      <button
        type="button"
        data-concierge-backdrop
        className="absolute inset-0 bg-navy/35"
        aria-label="Close Ask the portfolio"
        onClick={closeConcierge}
      />

      <div
        data-concierge-panel
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-x-0 bottom-0 top-[10vh] overflow-y-auto border-t border-line bg-mist px-[var(--page-pad)] pb-16 pt-8 sm:inset-x-8 sm:bottom-8 sm:top-[12vh] sm:border sm:border-line md:inset-x-auto md:left-1/2 md:w-full md:max-w-3xl md:-translate-x-1/2"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono-label text-gold">Ask the portfolio</p>
            <h2 id={titleId} className="mt-3 type-h2">
              Ask about Raghvendra’s work
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
              Ask out loud or type — I’ll point you to published work.
            </p>
          </div>
          <button
            type="button"
            onClick={closeConcierge}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center font-mono-label text-ink-soft hover:text-navy"
          >
            Close
          </button>
        </div>

        <div className="mt-8">
          <ConciergeSearch
            ref={inputRef}
            value={displayQuery}
            onChange={(value) => {
              setQuery(value);
              setFromVoice(false);
              if (!value.trim()) setAnswer(null);
            }}
            onSubmit={() => runQuery(query)}
            listening={listening}
            speechSupported={speechSupported}
            speechError={speechError}
            onToggleListen={() => {
              if (listening) {
                stopListening();
                return;
              }
              trackConcierge("concierge_voice_start");
              startListening();
            }}
          />
        </div>

        <details className="mt-6" data-concierge-item>
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-mono-label text-ink-soft hover:text-navy">
            I’m here because
          </summary>
          <div className="mt-3">
            <ConciergeMode value={mode} onChange={setMode} />
          </div>
        </details>

        <div className="mt-10">
          {answer ? (
            <ConciergeResponse
              answer={answer}
              activeIndex={activeIndex}
              onNextQuestion={(question) => runQuery(question)}
              speaking={speaking}
              onSpeak={
                ttsSupported
                  ? () => {
                      if (speaking) {
                        cancelSpeech();
                        return;
                      }
                      speak(answer.answer);
                      trackConcierge("concierge_speak", { auto: false });
                    }
                  : undefined
              }
            />
          ) : (
            <SuggestedQuestions
              query={query}
              activeIndex={activeIndex}
              onSelect={(label) => runQuery(label)}
            />
          )}
        </div>

        <p className="mt-10 font-mono-label text-ink-soft" aria-hidden={optionCount < 0}>
          Answers come only from published portfolio evidence.
        </p>
      </div>
    </div>
  );
}
