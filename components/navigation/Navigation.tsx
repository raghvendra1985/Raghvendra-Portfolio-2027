"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animateNavigation } from "@/animations/navigation";
import { gsap } from "@/animations/motion";
import { menuOriginFromToggle, type MenuOrigin } from "@/animations/menu";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { getLenis } from "@/hooks/useLenis";
import { primaryNavLinks, site } from "@/lib/site";
import { TrackedLink } from "@/components/analytics/TrackedCta";
import { useConcierge } from "@/components/concierge/ConciergeProvider";
import MenuToggle from "@/components/navigation/MenuToggle";
import MenuOverlay from "@/components/navigation/MenuOverlay";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Navigation() {
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { config, pageReady } = useExperience();
  const { open: conciergeOpen } = useConcierge();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<MenuOrigin>({ x: "100%", y: "0%" });

  const wasOpen = useRef(false);

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
    const lenis = getLenis();
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      gsap.set(rootRef.current, {
        yPercent: 0,
        backdropFilter: "none",
        webkitBackdropFilter: "none",
      });
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const scope = [root, document.getElementById("site-menu")].filter(Boolean) as HTMLElement[];
      const nodes = scope.flatMap((el) =>
        Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (node) => node.getClientRects().length > 0 && !node.closest("[inert]"),
        ),
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    toggleRef.current?.focus();
  }, [open]);

  function toggleMenu() {
    if (!open) setOrigin(menuOriginFromToggle(toggleRef.current));
    setOpen((value) => !value);
  }

  return (
    <>
      <MenuOverlay open={open} origin={origin} onClose={() => setOpen(false)} />
      <header
        ref={rootRef}
        data-nav
        data-compact="false"
        data-menu-open={open ? "true" : "false"}
        className={`group fixed inset-x-0 top-0 z-50 border-b ${
          open
            ? "border-transparent bg-navy"
            : "border-transparent bg-transparent data-[compact=true]:border-line data-[compact=true]:bg-mist/70"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-[var(--page-pad)] py-6 group-data-[compact=true]:py-3">
        <Link
          href="/"
          className={`min-w-0 truncate type-lead ${
            open ? "text-mist" : "text-navy"
          }`}
          data-cursor="Open"
        >
          Raghvendra Singh
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {primaryNavLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <TrackedLink
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                event="nav_clicked"
                payload={{ surface: "primary_nav", dest: link.href }}
                className={`font-mono-label ${
                  open
                    ? active
                      ? "text-gold"
                      : "text-mist/70 hover:text-mist"
                    : active
                      ? "text-green"
                      : "text-ink-soft hover:text-navy"
                }`}
              >
                {link.label}
              </TrackedLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <p
            className={`hidden max-w-[11rem] items-center gap-2 font-mono-label text-[10px] leading-tight lg:flex ${
              open ? "text-mist/70" : "text-ink-soft"
            }`}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
            <span className="uppercase tracking-[0.08em]">{site.status}</span>
          </p>
          <MenuToggle ref={toggleRef} open={open} inverted={open} onClick={toggleMenu} />
        </div>
        </div>
      </header>
    </>
  );
}
