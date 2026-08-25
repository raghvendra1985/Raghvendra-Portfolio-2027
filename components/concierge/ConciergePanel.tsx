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

function visibleAskTrigger() {
  const nodes = document.querySelectorAll<HTMLElement>("[data-concierge-trigger]");
  for (const el of nodes) {
    if (el.closest("[inert]")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;
    return el;
  }
  return null;
}

export default function ConciergePanel() {
  const { open, closeConcierge } = useConcierge();
  const { config } = useExperience();
  const pathname = usePathname();
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("hiring");
  const [answer, setAnswer] = useState<ConciergeAnswer | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [fromVoice, setFromVoice] = useState(false);
  const [emptyHint, setEmptyHint] = useState("");

  const { speak, cancel: cancelSpeech, speaking, supported: ttsSupported } = useSpeechSynthesis();

  const runQuery = useCallback(
    (value: string, voice = false) => {
      const trimmed = value.trim();
      if (!trimmed) {
        setEmptyHint("Type a question or pick a suggestion.");
        return;
      }
      setEmptyHint("");
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
    restoreFocusRef.current = visibleAskTrigger() ?? (document.activeElement as HTMLElement | null);
    setQuery("");
    setAnswer(null);
    setActiveIndex(-1);
    setFromVoice(false);
    setEmptyHint("");
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
      const target = visibleAskTrigger() ?? restoreFocusRef.current;
      target?.focus?.();
    };
  }, [open, closeConcierge]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const viewport = window.visualViewport;
    if (!panel) return;

    const update = () => {
      const keyboard = viewport
        ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
        : 0;
      panel.style.setProperty("--concierge-keyboard", `${keyboard}px`);
    };

    update();
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      panel.style.removeProperty("--concierge-keyboard");
    };
  }, [open]);

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
        ref={panelRef}
        data-concierge-panel
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-x-0 bottom-[var(--concierge-keyboard,0px)] top-[10vh] overflow-y-auto border-t border-line bg-mist px-[var(--page-pad)] pb-16 pt-0 sm:inset-x-8 sm:bottom-[max(2rem,var(--concierge-keyboard,0px))] sm:top-[12vh] sm:border sm:border-line md:inset-x-auto md:left-1/2 md:w-full md:max-w-3xl md:-translate-x-1/2"
      >
        <div className="sticky top-0 z-10 bg-mist pb-4 pt-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono-label text-gold">Ask the portfolio</p>
              <h2 id={titleId} className="mt-3 type-h2">
                Ask about Raghvendra’s work
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-navy/80">
                Ask out loud or type — I’ll point you to published work.
              </p>
            </div>
            <button
              type="button"
              onClick={closeConcierge}
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center font-mono-label text-navy hover:text-green"
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
                setEmptyHint("");
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
            <p className="sr-only" aria-live="polite">
              {emptyHint}
            </p>
            {emptyHint ? (
              <p className="mt-3 font-mono-label text-navy" role="status">
                {emptyHint}
              </p>
            ) : null}
          </div>
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
