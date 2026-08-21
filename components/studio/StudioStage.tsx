import type { ReactNode } from "react";

export default function StudioStage({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="studio-stage relative w-full bg-navy">
      {label ? (
        <p className="pointer-events-none absolute left-[var(--page-pad)] top-6 z-10 font-mono-label text-gold">
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}
