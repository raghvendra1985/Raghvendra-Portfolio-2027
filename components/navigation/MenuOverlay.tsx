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
import CharmPicker from "@/components/delight/CharmPicker";
import ResumeCta from "@/components/cta/ResumeCta";
import { footerLinks, menuNavLinks, site } from "@/lib/site";

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
      className={`fixed inset-0 z-[80] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        data-menu-panel
        className="absolute inset-0 flex flex-col overflow-y-auto bg-navy px-[var(--page-pad)] pb-10 pt-24 text-mist opacity-0 sm:pt-28"
      >
        <h2 id="site-menu-title" className="sr-only">
          Site menu
        </h2>
        <nav aria-label="More pages" className="mx-auto w-full max-w-[1440px] flex-1">
          <ul className="grid gap-1 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-2">
            {menuNavLinks.map((link, index) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href} data-menu-item>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onClose}
                    data-cursor="Open"
                    className="group flex min-h-11 items-baseline gap-3 py-1.5 sm:gap-4 sm:py-2"
                  >
                    <span
                      className={`font-mono-label ${
                        active ? "text-gold" : "text-mist/40 group-hover:text-gold"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-sans text-[clamp(1.35rem,5vw,2.5rem)] font-medium leading-tight tracking-[-0.02em] ${
                          active ? "text-green" : "text-mist group-hover:text-gold"
                        }`}
                      >
                        {link.label}
                      </span>
                      {"hint" in link && link.hint ? (
                        <span className="mt-1 hidden max-w-md text-sm leading-snug text-mist/85 sm:mt-2 sm:block sm:text-base">
                          {link.hint}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          data-menu-item
          className="mx-auto mt-8 flex w-full max-w-[1440px] flex-col gap-6 border-t border-mist/15 pt-6 sm:mt-10 sm:gap-8 sm:pt-8"
        >
          <details className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-mono-label text-mist/80 hover:text-gold [&::-webkit-details-marker]:hidden">
              Charms
              <span aria-hidden="true" className="text-mist/50 group-open:hidden">
                +
              </span>
              <span aria-hidden="true" className="hidden text-mist/50 group-open:inline">
                −
              </span>
            </summary>
            <div className="mt-4">
              <CharmPicker compact onHang={onClose} />
            </div>
          </details>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 font-mono-label text-mist/85">
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
                {site.status}
              </p>
              <ul className="mt-4 flex flex-wrap gap-6">
                {footerLinks.social.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-label={"ariaLabel" in link ? link.ariaLabel : undefined}
                      className="inline-flex min-h-11 items-center font-mono-label text-mist/80 hover:text-gold"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <ResumeCta appearance="text" source="mobile_nav" onNavigate={onClose} />
                </li>
              </ul>
            </div>
            <ConciergeTrigger variant="mobile-menu" />
          </div>
        </div>
      </div>
    </div>
  );
}
