import type { CaseStudy, CaseStudyDecision } from "@/case-studies";

function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-base leading-relaxed text-ink-soft sm:text-lg ${className}`}>
      {children}
    </p>
  );
}

function ChapterLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-section-label text-navy">{children}</p>;
}

export function DecisionBlockContent({ decision }: { decision: CaseStudyDecision }) {
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
              <p className="text-base font-medium text-navy sm:text-lg">{option.name}</p>
              {option.rejectedBecause ? (
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {option.rejectedBecause}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
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
    </div>
  );
}

export default function DecisionBlock({ study }: { study: CaseStudy }) {
  if (!("decision" in study) || !study.decision) return null;
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <ChapterLabel>Critical decision</ChapterLabel>
      <DecisionBlockContent decision={study.decision} />
    </section>
  );
}
