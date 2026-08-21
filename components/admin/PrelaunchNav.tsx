"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { prelaunchNav } from "@/prelaunch/nav";

export default function PrelaunchNav() {
  const pathname = usePathname();
  return (
    <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono-label">
      {prelaunchNav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "text-navy underline decoration-gold underline-offset-4" : "text-ink-soft hover:text-navy"}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
