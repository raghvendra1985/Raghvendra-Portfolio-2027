import type { KnowledgeFramework } from "@/knowledge";

export default function FrameworkBlock({
  framework,
  compact = false,
}: {
  framework: KnowledgeFramework;
  compact?: boolean;
}) {
  return (
    <section
      id="framework"
      data-framework
      aria-labelledby={`framework-${framework.id}`}
      className={`scroll-mt-28 ${compact ? "" : "border-t border-line pt-12"}`}
    >
      <p className="font-mono-label text-gold">Framework</p>
      <h2
        id={`framework-${framework.id}`}
        className={`mt-3 ${compact ? "type-h3" : "type-h2"}`}
      >
        {framework.title}
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">{framework.deck}</p>
      <ol className={compact ? "mt-8 space-y-4" : "mt-10 space-y-6"}>
        {framework.steps.map((step) => (
          <li
            key={step.index}
            data-framework-step
            className="grid gap-3 border-t border-line pt-5 md:grid-cols-[72px_minmax(0,1fr)]"
          >
            <span className="font-mono-label text-gold">{step.index}</span>
            <div>
              <h3 className="type-h3">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
