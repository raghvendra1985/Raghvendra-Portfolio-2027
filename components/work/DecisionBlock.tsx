import type { CaseStudy, CaseStudyDecision } from "@/case-studies";
import { InsightBlock } from "@/components/work/storytelling";

function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`type-lead leading-relaxed text-ink-soft ${className}`}>
      {children}
    </p>
  );
}

function ChapterLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono-label text-navy">{children}</p>;
}

export function DecisionBlockContent({
  decision,
  compact = false,
}: {
  decision: CaseStudyDecision;
  /** When true: Observation→Insight→Response triad + Result; skip duplicated Evidence/Tradeoff/Choice. */
  compact?: boolean;
}) {
  return (
    <div className="mt-8 max-w-3xl space-y-8" data-case-chapter>
      <div>
        <p className="font-mono-label text-ink-soft">Situation</p>
        <Prose className="mt-2">{decision.situation}</Prose>
      </div>
      <div>
        <p className="font-mono-label text-ink-soft">Options considered</p>
        <ul className="mt-3 space-y-4">
          {decision.options.map((option) => (
            <li key={option.name} className="border-t border-line pt-4">
              <p className="type-body font-medium text-navy">{option.name}</p>
              {option.rejectedBecause ? (
                <p className="mt-2 type-body leading-relaxed text-ink-soft">
                  {option.rejectedBecause}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      {compact ? (
        <>
          <InsightBlock
            observation={decision.evidence}
            insight={decision.tradeoff}
            response={decision.choice}
          />
          <div>
            <p className="font-mono-label text-ink-soft">Result</p>
            <Prose className="mt-2">{decision.result}</Prose>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="font-mono-label text-ink-soft">Evidence</p>
            <Prose className="mt-2">{decision.evidence}</Prose>
          </div>
          <div>
            <p className="font-mono-label text-ink-soft">Tradeoff</p>
            <Prose className="mt-2">{decision.tradeoff}</Prose>
          </div>
          <div>
            <p className="font-mono-label text-ink-soft">Final choice</p>
            <Prose className="mt-2">{decision.choice}</Prose>
          </div>
          <div>
            <p className="font-mono-label text-ink-soft">Result</p>
            <Prose className="mt-2">{decision.result}</Prose>
          </div>
        </>
      )}
    </div>
  );
}

export default function DecisionBlock({ study }: { study: CaseStudy }) {
  if (!("decision" in study) || !study.decision) return null;
  const useTriad =
    study.narrativeDepth === "deep" || study.narrativeDepth === "supporting";
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <ChapterLabel>Critical decision</ChapterLabel>
      <DecisionBlockContent decision={study.decision} compact={useTriad} />
    </section>
  );
}
