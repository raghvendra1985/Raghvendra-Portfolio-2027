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
import ResumeCta from "@/components/cta/ResumeCta";
import { useConcierge } from "@/components/concierge/ConciergeProvider";
import MenuToggle from "@/components/navigation/MenuToggle";
import MenuOverlay from "@/components/navigation/MenuOverlay";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isNavActive(pathname: string, href: string, hash: string) {
  if (href === "/#approach") {
    return pathname === "/" && hash === "#approach";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navigation() {
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { config, pageReady } = useExperience();
  const { open: conciergeOpen } = useConcierge();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<MenuOrigin>({ x: "100%", y: "0%" });
  const [hash, setHash] = useState("");

  const wasOpen = useRef(false);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

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

  const linkClass = (active: boolean) =>
    `inline-flex min-h-11 items-center font-mono-label ${
      open
        ? active
          ? "text-gold"
          : "text-mist/70 hover:text-mist"
        : active
          ? "text-green"
          : "text-ink-soft hover:text-navy"
    }`;

  return (
    <>
      <MenuOverlay open={open} origin={origin} onClose={() => setOpen(false)} />
      <header
        ref={rootRef}
        data-nav
        data-compact="false"
        data-menu-open={open ? "true" : "false"}
        className={`group fixed inset-x-0 top-0 z-[90] border-b ${
          open
            ? "border-transparent bg-navy"
            : "border-transparent bg-transparent data-[compact=true]:border-line data-[compact=true]:bg-mist/70"
        }`}
      >
        <div
          data-nav-bar
          className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-[var(--page-pad)] py-6 group-data-[compact=true]:py-3"
        >
          <Link
            href="/"
            aria-label={`${site.name}, home`}
            className={`min-w-0 truncate type-lead ${open ? "text-mist" : "text-navy"}`}
            data-cursor="Open"
          >
            Raghvendra
          </Link>

          <nav
            aria-label="Primary"
            className="hidden min-[960px]:flex min-[960px]:flex-wrap min-[960px]:items-center min-[960px]:justify-end min-[960px]:gap-x-4 min-[960px]:gap-y-1 xl:gap-x-7"
          >
            {primaryNavLinks.map((link) => {
              const active = isNavActive(pathname, link.href, hash);
              return (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  event="nav_clicked"
                  payload={{ surface: "primary_nav", dest: link.href }}
                  className={linkClass(active)}
                >
                  {link.label}
                </TrackedLink>
              );
            })}
            <ResumeCta
              appearance="text"
              source="primary_nav"
              label="Résumé"
              className={linkClass(false)}
            />
            <TrackedLink
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              event="nav_clicked"
              payload={{ surface: "primary_nav", dest: "/contact" }}
              className={linkClass(pathname === "/contact")}
            >
              Start a conversation
            </TrackedLink>
          </nav>

          <div className="flex items-center gap-3 min-[960px]:hidden">
            <MenuToggle ref={toggleRef} open={open} inverted={open} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
}
