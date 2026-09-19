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
  const visible = fields.filter(({ key }) => {
    const value = story[key];
    return (
      Boolean(value) &&
      !value.startsWith("[CONTENT REQUIRED]") &&
      !value.startsWith("TODO:")
    );
  });
  if (!visible.length) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <p className="font-mono-label text-navy">Build story</p>
      <dl className="mt-8 grid max-w-3xl gap-8 sm:grid-cols-2" data-case-chapter>
        {visible.map(({ key, label }) => (
          <div key={key} className="border-t border-line pt-4">
            <dt className="font-mono-label text-ink-soft">{label}</dt>
            <dd className="mt-2 type-body leading-relaxed text-navy">
              {story[key]}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
