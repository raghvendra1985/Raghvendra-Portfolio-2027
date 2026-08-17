import type { ReactNode } from "react";

export default function ProductAppShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32 sm:pt-40">{children}</div>;
}
