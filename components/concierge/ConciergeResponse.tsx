"use client";

import EvidenceCard from "@/components/concierge/EvidenceCard";
import type { ConciergeAnswer } from "@/concierge";

export default function ConciergeResponse({
  answer,
  onNextQuestion,
  optionOffset = 0,
  activeIndex = -1,
  onSpeak,
  speaking = false,
}: {
  answer: ConciergeAnswer;
  onNextQuestion: (question: string) => void;
  optionOffset?: number;
  activeIndex?: number;
  onSpeak?: () => void;
  speaking?: boolean;
}) {
  let optionIndex = optionOffset;

  return (
    <div className="space-y-10" aria-live="polite">
      <section data-concierge-result>
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono-label text-gold">Answer</p>
          {onSpeak ? (
            <button
              type="button"
              onClick={onSpeak}
              aria-pressed={speaking}
              className="inline-flex min-h-11 items-center font-mono-label text-ink-soft hover:text-navy"
            >
              {speaking ? "Stop" : "Listen"}
            </button>
          ) : null}
        </div>
        <p className="mt-3 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">
          {answer.answer}
        </p>
      </section>

      {answer.evidence.length ? (
        <section data-concierge-result>
          <p className="font-mono-label text-[11px] text-ink-soft">Evidence</p>
          <div className="mt-2">
            {answer.evidence.map((item) => {
              const index = optionIndex++;
              return (
                <EvidenceCard
                  key={`${item.url}-${item.title}`}
                  item={item}
                  active={activeIndex === index}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      {answer.related.length ? (
        <section data-concierge-result>
          <p className="font-mono-label text-[11px] text-ink-soft">Related</p>
          <div className="mt-2">
            {answer.related.map((item) => {
              const index = optionIndex++;
              return (
                <EvidenceCard
                  key={`related-${item.url}-${item.title}`}
                  item={item}
                  active={activeIndex === index}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      {answer.nextQuestions.length ? (
        <section data-concierge-result>
          <p className="font-mono-label text-[11px] text-ink-soft">Next question</p>
          <ul className="mt-4">
            {answer.nextQuestions.map((question) => {
              const index = optionIndex++;
              return (
                <li key={question}>
                  <button
                    type="button"
                    data-concierge-option
                    onClick={() => onNextQuestion(question)}
                    className={`w-full border-t border-line py-4 text-left font-display text-lg ${
                      activeIndex === index ? "text-navy" : "text-ink-soft hover:text-navy"
                    }`}
                  >
                    {question}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
