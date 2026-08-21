export default function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-line px-5 py-8">
      <p className="type-h3">{title}</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
