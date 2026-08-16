"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  animateMenuClose,
  animateMenuOpen,
  type MenuOrigin,
} from "@/animations/menu";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ConciergeTrigger from "@/components/concierge/ConciergeTrigger";
import { footerLinks, navLinks, site } from "@/lib/site";

export default function MenuOverlay({
  open,
  origin,
  onClose,
}: {
  open: boolean;
  origin: MenuOrigin;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const originRef = useRef(origin);
  const { config } = useExperience();
  const pathname = usePathname();

  if (open) originRef.current = origin;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (open) {
      visibleRef.current = true;
      animateMenuOpen(root, config, originRef.current);
      return;
    }

    if (!visibleRef.current) return;
    animateMenuClose(root, config, originRef.current, () => {
      visibleRef.current = false;
    });
  }, [open, config]);

  return (
    <div
      ref={rootRef}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-menu-title"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-0 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        data-menu-panel
        className="absolute inset-0 flex flex-col bg-navy px-[var(--page-pad)] pb-10 pt-28 text-mist opacity-0"
      >
        <h2 id="site-menu-title" className="sr-only">
          Site menu
        </h2>
        <nav aria-label="All pages" className="mx-auto w-full max-w-[1440px] flex-1">
          <ul className="grid gap-2 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-3">
            {navLinks.map((link, index) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href} data-menu-item>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                    data-cursor="Open"
                    className="group flex min-h-11 items-baseline gap-4 py-2"
                  >
                    <span
                      className={`font-mono-label text-[11px] ${
                        active ? "text-gold" : "text-mist/40 group-hover:text-gold"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-3xl leading-[1.08] sm:text-5xl ${
                        active ? "text-green" : "text-mist group-hover:text-gold"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          data-menu-item
          className="mx-auto mt-10 flex w-full max-w-[1440px] flex-col gap-8 border-t border-mist/15 pt-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="flex items-center gap-2 font-mono-label text-[11px] text-mist/70">
              <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
              {site.status}
            </p>
            <ul className="mt-4 flex flex-wrap gap-6">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-mist/80 hover:text-gold"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ConciergeTrigger variant="mobile-menu" />
        </div>
      </div>
    </div>
  );
}
