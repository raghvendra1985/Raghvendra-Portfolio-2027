import type { KnowledgeSection } from "@/knowledge";

function TocLinks({
  sections,
  activeId,
}: {
  sections: KnowledgeSection[];
  activeId?: string;
}) {
  return (
    <ol className="space-y-3">
      {sections.map((section) => {
        const currentItem = section.id === activeId;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={currentItem ? "true" : undefined}
              className={`block text-sm leading-snug ${
                currentItem ? "text-navy" : "text-ink-soft hover:text-navy"
              }`}
            >
              <span className="font-mono-label text-xs text-gold">{section.kicker}</span>
              <span className="mt-1 block">{section.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function ArticleToc({
  sections,
  activeId,
  variant,
}: {
  sections: KnowledgeSection[];
  activeId?: string;
  variant: "mobile" | "desktop";
}) {
  const current = sections.find((section) => section.id === activeId) ?? sections[0];

  if (variant === "mobile") {
    return (
      <nav
        className="sticky top-[4.5rem] z-20 border-b border-line bg-mist/90 px-[var(--page-pad)] py-3 lg:hidden"
        aria-label="On this page"
      >
        <details>
          <summary className="cursor-pointer font-mono-label text-ink-soft">
            <span className="text-gold">{current?.kicker}</span>
            <span> / {current?.title}</span>
          </summary>
          <div className="pb-3 pt-4">
            <TocLinks sections={sections} activeId={activeId} />
          </div>
        </details>
      </nav>
    );
  }

  return (
    <nav data-article-toc aria-label="On this page" className="sticky top-28">
      <p className="font-mono-label text-ink-soft">Inside</p>
      <div className="mt-4">
        <TocLinks sections={sections} activeId={activeId} />
      </div>
    </nav>
  );
}
