import type { FounderOs } from "@/founder-os";

function Column({
  label,
  items,
}: {
  label: string;
  items: FounderOs["roadmap"]["now"];
}) {
  return (
    <div data-os-item>
      <p className="font-mono-label text-gold">{label}</p>
      <ul className="mt-6 space-y-8">
        {items.map((item) => (
          <li key={item.title} className="border-t border-line pt-4">
            <h3 className="type-h3">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Roadmap({ roadmap }: { roadmap: FounderOs["roadmap"] }) {
  return (
    <div className="grid gap-12 lg:grid-cols-3">
      <Column label="Now" items={roadmap.now} />
      <Column label="Next" items={roadmap.next} />
      <Column label="Later" items={roadmap.later} />
    </div>
  );
}
