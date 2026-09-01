"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/animations/motion";
import {
  morphSharedImage,
  playPageEnter,
  playPageExit,
} from "@/animations/pageTransition";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { scrollToHash } from "@/hooks/useLenis";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { config } = useExperience();
  const first = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const page = document.querySelector<HTMLElement>("[data-page-root]");
    playPageEnter(overlay, page, config);
  }, [pathname, config]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
        return;
      }
      if (target.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const path = href.split(/[?#]/, 1)[0] || "/";
      const hashIndex = href.indexOf("#");
      const hash = hashIndex >= 0 ? href.slice(hashIndex).split("?")[0] : "";

      // Same-route hash (e.g. Home → /#approach) must not play a page exit:
      // pathname does not change, so playPageEnter never runs and the overlay
      // stays covering the page.
      if (path === pathname) {
        gsap.set(overlay, { autoAlpha: 0 });
        if (!hash) return;
        event.preventDefault();
        event.stopPropagation();
        if (window.location.hash !== hash) {
          window.history.pushState(null, "", `${path}${hash}`);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
        scrollToHash(hash);
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const shared =
        target.querySelector<HTMLElement>("[data-shared-image]") ??
        target.closest("[data-work-row]")?.querySelector<HTMLElement>("[data-shared-image]");

      playPageExit(overlay, config).then(() => {
        if (shared && !config.reducedMotion) {
          void morphSharedImage(shared);
        }
        router.push(href);
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [config, pathname, router]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[85] bg-mist opacity-0"
      aria-hidden="true"
    />
  );
}
