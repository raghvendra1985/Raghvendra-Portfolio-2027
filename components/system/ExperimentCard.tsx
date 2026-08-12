import type { ExperimentItem } from "@/founder-os";

export default function ExperimentCard({ item }: { item: ExperimentItem }) {
  return (
    <article data-os-item className="border-t border-line py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="max-w-2xl font-display text-xl sm:text-2xl">{item.hypothesis}</p>
        <p className="font-mono-label text-[11px] text-green">{item.status}</p>
      </div>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="font-mono-label text-[11px] text-ink-soft">What is being tested</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.testing}</dd>
        </div>
        <div>
          <dt className="font-mono-label text-[11px] text-ink-soft">Learning</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.learning}</dd>
        </div>
      </dl>
    </article>
  );
}
