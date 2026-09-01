import type { ReactNode } from "react";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import type { SystemObjectMark as MarkSpec } from "@/visual-language/marks";

export default function OSModule({
  id,
  index,
  title,
  children,
  current,
  mark,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  current?: boolean;
  mark?: MarkSpec;
}) {
  return (
    <section
      id={id}
      data-os-module
      aria-labelledby={`os-${id}-heading`}
      aria-current={current ? "true" : undefined}
      className="scroll-mt-28 border-t border-line py-20 sm:py-28"
    >
      <div className="flex items-center gap-4">
        {mark ? (
          <SystemObjectMark src={mark.src} motion={mark.motion} surface={mark.surface} />
        ) : null}
        <div>
          <p className="font-mono-label text-gold" data-os-item>
            {index}
          </p>
          <h2
            id={`os-${id}-heading`}
            className="mt-4 max-w-3xl type-h2 text-navy"
            data-os-item
          >
            {title}
          </h2>
        </div>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
