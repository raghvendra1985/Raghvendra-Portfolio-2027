import type { ReactNode } from "react";

export default function InputPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border border-line p-5 sm:p-8">
      <p className="font-mono-label text-[11px] text-ink-soft">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
