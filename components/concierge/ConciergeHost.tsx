"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ConciergeTrigger from "@/components/concierge/ConciergeTrigger";
import ConciergePanel from "@/components/concierge/ConciergePanel";
import { useConcierge } from "@/components/concierge/ConciergeProvider";

export default function ConciergeHost() {
  const { open } = useConcierge();
  const pathname = usePathname();
  const [revealed, setRevealed] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") {
      setRevealed(true);
      return;
    }

    let cancelled = false;
    let frame = 0;

    const attach = () => {
      if (cancelled) return;
      const work = document.getElementById("work");
      const hero = document.querySelector<HTMLElement>("[data-hero-headline]");
      if (!work || !hero) {
        frame = window.requestAnimationFrame(attach);
        return;
      }

      const update = () => {
        setRevealed(hero.getBoundingClientRect().bottom < 72);
      };

      update();
      window.addEventListener("scroll", update, { passive: true });
      const observer = new IntersectionObserver(update, { threshold: [0, 0.1, 0.4] });
      observer.observe(work);
      observer.observe(hero);
      cleanup = () => {
        window.removeEventListener("scroll", update);
        observer.disconnect();
      };
    };

    let cleanup = () => {};
    attach();
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      cleanup();
    };
  }, [pathname]);

  return (
    <>
      <ConciergePanel />
      {!open && revealed ? (
        <>
          <ConciergeTrigger variant="float" />
          <ConciergeTrigger variant="mobile-bar" />
        </>
      ) : null}
    </>
  );
}
