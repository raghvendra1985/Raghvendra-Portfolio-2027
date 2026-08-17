export default function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-line px-5 py-8" role="alert">
      <p className="font-display text-2xl">{title}</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
