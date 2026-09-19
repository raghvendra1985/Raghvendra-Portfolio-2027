import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import { leadershipTeachPreview } from "@/home/leadership-home";

export default function TeachPreview() {
  return (
    <SectionReveal
      id={leadershipTeachPreview.id}
      className="scroll-mt-[var(--hash-offset)] border-t border-line px-[var(--page-pad)] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div data-reveal-item className="max-w-2xl">
          <p className="font-mono-label text-ink-soft">
            {leadershipTeachPreview.eyebrow}
          </p>
          <h2 className="mt-4 max-w-[18ch] type-h2 text-navy">
            {leadershipTeachPreview.title}
          </h2>
          <p className="mt-4 max-w-[52ch] type-body text-ink-soft">
            {leadershipTeachPreview.body}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {leadershipTeachPreview.venues.map((venue) => (
              <li
                key={venue}
                className="font-mono-label text-[12px] text-ink-soft"
              >
                {venue}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={leadershipTeachPreview.cta.href}
          data-reveal-item
          className="inline-flex min-h-11 items-center font-mono-label text-navy hover:underline"
        >
          {leadershipTeachPreview.cta.label} →
        </Link>
      </div>
    </SectionReveal>
  );
}
