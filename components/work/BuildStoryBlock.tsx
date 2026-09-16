import type { CaseStudyBuildStory } from "@/case-studies";

const fields: { key: keyof CaseStudyBuildStory; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "bet", label: "Bet" },
  { key: "build", label: "Build" },
  { key: "stack", label: "Stack" },
  { key: "ship", label: "Ship" },
  { key: "learn", label: "Learn" },
];

export default function BuildStoryBlock({ story }: { story: CaseStudyBuildStory }) {
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <p className="font-section-label text-navy">Build story</p>
      <dl className="mt-8 grid max-w-3xl gap-8 sm:grid-cols-2" data-case-chapter>
        {fields.map(({ key, label }) => (
          <div key={key} className="border-t border-line pt-4">
            <dt className="font-mono-label text-ink-soft">{label}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-navy sm:text-base">
              {story[key]}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
