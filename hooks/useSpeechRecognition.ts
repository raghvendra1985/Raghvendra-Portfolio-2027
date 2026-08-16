"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

const LANGS = ["en-IN", "en-GB", "en-US"];

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function readTranscript(event: SpeechRecognitionEventLike) {
  let interim = "";
  let finalText = "";
  for (let i = event.resultIndex; i < event.results.length; i += 1) {
    const piece = event.results[i][0]?.transcript ?? "";
    if (event.results[i].isFinal) finalText += piece;
    else interim += piece;
  }
  return { interim, finalText };
}

export function useSpeechRecognition({
  onFinal,
}: {
  onFinal: (transcript: string) => void;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const sessionRef = useRef(0);
  const submittedRef = useRef(false);
  const lastTextRef = useRef("");
  const onFinalRef = useRef(onFinal);
  onFinalRef.current = onFinal;

  useEffect(() => {
    setSupported(Boolean(getRecognitionCtor()) && window.isSecureContext);
  }, []);

  const detach = useCallback((recognition: SpeechRecognitionLike | null) => {
    if (!recognition) return;
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    try {
      recognition.abort();
    } catch {
      /* already idle */
    }
  }, []);

  const commit = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || submittedRef.current) return;
    submittedRef.current = true;
    setInterim("");
    onFinalRef.current(trimmed);
  }, []);

  const stop = useCallback(() => {
    commit(lastTextRef.current);
    sessionRef.current += 1;
    const current = recognitionRef.current;
    recognitionRef.current = null;
    setListening(false);
    if (current) {
      current.onend = null;
      current.onresult = null;
      current.onerror = null;
      try {
        current.stop();
      } catch {
        try {
          current.abort();
        } catch {
          /* already idle */
        }
      }
    }
  }, [commit]);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setSupported(false);
      setError("Voice input isn’t available in this browser. Type your question instead.");
      return;
    }
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setError("Voice needs HTTPS. Type your question instead.");
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const session = sessionRef.current + 1;
    sessionRef.current = session;
    submittedRef.current = false;
    lastTextRef.current = "";
    setError(null);
    setInterim("");
    detach(recognitionRef.current);
    recognitionRef.current = null;

    let langIndex = 0;

    const begin = (lang: string) => {
      if (session !== sessionRef.current) return;
      const recognition = new Ctor();
      recognition.lang = lang;
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        if (session !== sessionRef.current) return;
        const { interim: nextInterim, finalText } = readTranscript(event);
        const spoken = (finalText || nextInterim).trim();
        if (spoken) lastTextRef.current = spoken;
        if (nextInterim) setInterim(nextInterim);
        if (finalText.trim()) commit(finalText);
      };

      recognition.onerror = (event) => {
        if (session !== sessionRef.current) return;
        const code = event.error ?? "";
        if (code === "language-not-supported" && langIndex < LANGS.length - 1) {
          langIndex += 1;
          detach(recognition);
          begin(LANGS[langIndex]);
          return;
        }
        if (code === "not-allowed" || code === "service-not-allowed") {
          setError("Microphone permission is needed to ask out loud.");
        } else if (code === "network") {
          setError("Voice needs a network connection in this browser. Try again, or type.");
        } else if (code !== "aborted" && code !== "no-speech") {
          setError("Voice input didn’t catch that. Try again, or type.");
        }
        setListening(false);
      };

      recognition.onend = () => {
        if (session !== sessionRef.current) return;
        if (recognitionRef.current === recognition) {
          recognitionRef.current = null;
        }
        setListening(false);
        commit(lastTextRef.current);
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
        setListening(true);
      } catch {
        setError("Voice input didn’t start. Type your question instead.");
        setListening(false);
        recognitionRef.current = null;
      }
    };

    begin(LANGS[langIndex]);
  }, [commit, detach]);

  useEffect(() => {
    return () => {
      sessionRef.current += 1;
      detach(recognitionRef.current);
    };
  }, [detach]);

  return { supported, listening, interim, error, start, stop };
}
