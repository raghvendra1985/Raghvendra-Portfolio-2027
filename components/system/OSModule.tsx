import type { ReactNode } from "react";

export default function OSModule({
  id,
  index,
  title,
  children,
  current,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  current?: boolean;
}) {
  return (
    <section
      id={id}
      data-os-module
      aria-labelledby={`os-${id}-heading`}
      aria-current={current ? "true" : undefined}
      className="scroll-mt-28 border-t border-line py-20 sm:py-28"
    >
      <p className="font-mono-label text-[11px] text-gold" data-os-item>
        {index}
      </p>
      <h2
        id={`os-${id}-heading`}
        className="mt-4 max-w-3xl font-display text-3xl leading-[1.05] text-navy sm:text-5xl"
        data-os-item
      >
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
