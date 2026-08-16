"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { animateNavigation } from "@/animations/navigation";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { navLinks, site } from "@/lib/site";
import MagneticButton from "@/components/buttons/MagneticButton";
import ConciergeTrigger from "@/components/concierge/ConciergeTrigger";
import { useConcierge } from "@/components/concierge/ConciergeProvider";

export default function Navigation() {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();
  const { open: conciergeOpen } = useConcierge();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pageReady) return;
    const ctx = animateNavigation(root, config);
    return () => ctx?.();
  }, [config, pageReady]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (conciergeOpen) setOpen(false);
  }, [conciergeOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      ref={rootRef}
      data-nav
      data-compact="false"
      className="group fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent data-[compact=true]:border-line data-[compact=true]:bg-mist/70"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-[var(--page-pad)] py-6 group-data-[compact=true]:py-3">
        <Link
          href="/"
          className="min-w-0 truncate font-display text-base text-navy sm:text-lg"
          data-cursor="Open"
        >
          Raghvendra Singh
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-mono-label text-[11px] ${
                  active ? "text-green" : "text-ink-soft hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <p className="hidden items-center gap-2 font-mono-label text-[10px] text-ink-soft lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
            {site.status}
          </p>
          <ConciergeTrigger variant="nav" />
          <div className="hidden lg:block">
            <MagneticButton href="/contact" size="sm">
              Start a conversation
            </MagneticButton>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-navy/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className={`h-px w-4 bg-navy ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-navy ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-line bg-mist px-[var(--page-pad)] py-6 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="inline-flex min-h-11 items-center font-display text-2xl"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <ConciergeTrigger
                  variant="mobile-menu"
                  className="w-full"
                />
              </li>
              <li>
                <Link href="/contact" className="inline-flex min-h-11 items-center font-mono-label text-green">
                  Start a conversation →
                </Link>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
