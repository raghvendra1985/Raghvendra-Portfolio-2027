export default function HonestNote({ children }: { children: string }) {
  return (
    <aside
      role="note"
      className="mt-8 border-l-2 border-green bg-surface-dim px-6 py-5"
    >
      <p className="font-mono-label text-green">Honest note</p>
      <p className="mt-3 text-sm leading-relaxed text-navy/85 sm:text-base">{children}</p>
    </aside>
  );
}
