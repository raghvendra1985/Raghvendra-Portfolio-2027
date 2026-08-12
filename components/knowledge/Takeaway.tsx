export default function Takeaway({ children }: { children: string }) {
  return (
    <section className="border-t border-line pt-12">
      <h2 className="font-mono-label text-[11px] text-green">Takeaway</h2>
      <p className="mt-4 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">{children}</p>
    </section>
  );
}
