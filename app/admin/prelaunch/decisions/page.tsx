import type { Metadata } from "next";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import { productDecisions } from "@/prelaunch/decisions";

export const metadata: Metadata = {
  title: "Decisions · Pre-Launch",
  robots: { index: false, follow: false },
};

export default function DecisionsPage() {
  return (
    <PrelaunchShell
      title="Product decisions"
      deck="These are open because the current implementation makes them relevant. Do not implement them from this page. Raghvendra makes the call."
    >
      <div className="mt-12 space-y-12">
        {productDecisions.map((item) => (
          <article key={item.id} className="border-t border-line pt-6">
            <p className="font-mono-label text-ink-soft">
              {item.product} · {item.severity}
            </p>
            <h2 className="mt-3 type-h3">{item.decision}</h2>
            <dl className="mt-6 grid gap-5 text-sm leading-relaxed">
              <div>
                <dt className="font-mono-label text-ink-soft">Why it matters</dt>
                <dd className="mt-2 max-w-3xl">{item.why}</dd>
              </div>
              <div>
                <dt className="font-mono-label text-ink-soft">Current behaviour</dt>
                <dd className="mt-2 max-w-3xl">{item.current}</dd>
              </div>
              <div>
                <dt className="font-mono-label text-ink-soft">Option A</dt>
                <dd className="mt-2 max-w-3xl">{item.optionA}</dd>
              </div>
              <div>
                <dt className="font-mono-label text-ink-soft">Option B</dt>
                <dd className="mt-2 max-w-3xl">{item.optionB}</dd>
              </div>
              <div>
                <dt className="font-mono-label text-ink-soft">Recommendation</dt>
                <dd className="mt-2 max-w-3xl">{item.recommendation}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </PrelaunchShell>
  );
}
