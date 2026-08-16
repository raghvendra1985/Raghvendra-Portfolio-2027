"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import {
  designIqQuestions,
  designIqResults,
  isDesignIqType,
  scoreDesignIq,
  type DesignIqTypeId,
} from "@/products/design-iq";

export default function DesignIqDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shared = searchParams.get("result");
  const sharedResult = isDesignIqType(shared) ? designIqResults[shared] : null;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DesignIqTypeId[]>([]);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (sharedResult) return sharedResult;
    if (answers.length === designIqQuestions.length) return scoreDesignIq(answers);
    return null;
  }, [answers, sharedResult]);

  useEffect(() => {
    if (sharedResult) setStarted(true);
  }, [sharedResult]);

  function start() {
    if (!started) {
      track("product_demo_started", { slug: "design-iq" });
      setStarted(true);
    }
  }

  function choose(type: DesignIqTypeId) {
    start();
    const next = [...answers, type];
    setAnswers(next);
    setStep((current) => current + 1);
    if (next.length === designIqQuestions.length) {
      const scored = scoreDesignIq(next);
      const params = new URLSearchParams(searchParams.toString());
      params.set("result", scored.id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }

  function reset() {
    setAnswers([]);
    setStep(0);
    setCopied(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("result");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  async function share() {
    if (!result) return;
    const url = `${window.location.origin}/products/design-iq?result=${result.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const question = designIqQuestions[step];

  return (
    <div className="border border-mist/15 bg-navy p-6 text-mist sm:p-8">
      {!started && !result ? (
        <div>
          <p className="font-mono-label text-[11px] text-gold">005 · Preview</p>
          <h3 className="mt-4 font-display text-2xl leading-[1.08] sm:text-3xl">
            Eight choices. One name for how you work.
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist/70">
            Not a personality brand. A short diagnostic you can finish now.
          </p>
          <button
            type="button"
            onClick={start}
            data-cursor="Open"
            className="mt-8 inline-flex min-h-11 items-center font-mono-label text-[11px] text-gold"
          >
            Begin →
          </button>
        </div>
      ) : result ? (
        <div>
          <p className="font-mono-label text-[11px] text-gold">Your design brain</p>
          <h3 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">{result.name}</h3>
          <p className="mt-3 font-mono-label text-[11px] text-mist/55">{result.kicker}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist/80">{result.body}</p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-mist/70">{result.practice}</p>
          <div className="mt-8 flex flex-wrap gap-6">
            <button
              type="button"
              onClick={share}
              className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-gold"
            >
              {copied ? "Link copied" : "Copy share link →"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-mist/60 hover:text-mist"
            >
              Take it again
            </button>
          </div>
        </div>
      ) : question ? (
        <div>
          <p className="font-mono-label text-[11px] text-mist/50">
            {String(step + 1).padStart(2, "0")} / {String(designIqQuestions.length).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-2xl leading-[1.08] sm:text-3xl">{question.prompt}</h3>
          <ul className="mt-8 space-y-2">
            {question.options.map((option) => (
              <li key={option.label}>
                <button
                  type="button"
                  onClick={() => choose(option.type)}
                  className="flex min-h-11 w-full items-center border border-mist/15 px-4 py-3 text-left text-sm leading-relaxed text-mist/85 hover:border-gold hover:text-mist"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
