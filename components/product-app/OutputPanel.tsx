import type { ReactNode } from "react";

export default function OutputPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border border-navy bg-navy p-5 text-mist sm:p-8">
      <p className="font-mono-label text-mist/50">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
