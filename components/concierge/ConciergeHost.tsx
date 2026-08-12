"use client";

import { useEffect, useState } from "react";
import ConciergeTrigger from "@/components/concierge/ConciergeTrigger";
import ConciergePanel from "@/components/concierge/ConciergePanel";
import { useConcierge } from "@/components/concierge/ConciergeProvider";

export default function ConciergeHost() {
  const { open } = useConcierge();
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.max(800, window.innerHeight * 0.4);
      setShowSecondary(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ConciergePanel />
      {!open && showSecondary ? (
        <>
          <ConciergeTrigger variant="float" />
          <ConciergeTrigger variant="mobile-bar" />
        </>
      ) : null}
    </>
  );
}
