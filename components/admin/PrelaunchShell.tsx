import type { ReactNode } from "react";
import Link from "next/link";
import PrelaunchNav from "@/components/admin/PrelaunchNav";

export default function PrelaunchShell({
  title,
  deck,
  children,
}: {
  title: string;
  deck?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-32">
      <Link href="/admin" className="font-mono-label text-ink-soft">
        ← Admin
      </Link>
      <PrelaunchNav />
      <h1 className="mt-8 type-h2">{title}</h1>
      {deck ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">{deck}</p> : null}
      {children}
    </section>
  );
}
