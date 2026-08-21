export default function Takeaway({ children }: { children: string }) {
  return (
    <section className="border-t border-line pt-12">
      <h2 className="font-mono-label text-green">Takeaway</h2>
      <p className="mt-4 max-w-2xl type-h3">{children}</p>
    </section>
  );
}
