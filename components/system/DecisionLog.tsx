import type { DecisionEntry } from "@/founder-os";

export default function DecisionLog({ entries }: { entries: DecisionEntry[] }) {
  return (
    <ol className="space-y-0">
      {entries.map((entry, index) => (
        <li key={entry.id} data-os-item className="border-t border-line">
          <details className="group py-8">
            <summary className="cursor-pointer list-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy [&::-webkit-details-marker]:hidden">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="font-mono-label text-[11px] text-gold">
                  {String(index + 1).padStart(2, "0")} / {entry.date}
                </p>
                <p className="font-mono-label text-[11px] text-ink-soft">
                  <span className="group-open:hidden">Read entry</span>
                  <span className="hidden group-open:inline">Close</span>
                </p>
              </div>
              <h3 className="mt-4 max-w-3xl font-display text-2xl sm:text-3xl">{entry.decision}</h3>
            </summary>
            <dl className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono-label text-[11px] text-ink-soft">Context</dt>
                <dd className="mt-2 text-sm leading-relaxed">{entry.context}</dd>
              </div>
              <div>
                <dt className="font-mono-label text-[11px] text-ink-soft">Trade-off</dt>
                <dd className="mt-2 text-sm leading-relaxed">{entry.tradeOff}</dd>
              </div>
              <div>
                <dt className="font-mono-label text-[11px] text-ink-soft">Outcome</dt>
                <dd className="mt-2 text-sm leading-relaxed">{entry.outcome}</dd>
              </div>
              <div>
                <dt className="font-mono-label text-[11px] text-ink-soft">Lesson</dt>
                <dd className="mt-2 text-sm leading-relaxed">{entry.lesson}</dd>
              </div>
            </dl>
          </details>
        </li>
      ))}
    </ol>
  );
}
