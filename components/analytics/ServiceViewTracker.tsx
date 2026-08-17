"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function ServiceViewTracker() {
  useEffect(() => {
    const node = document.getElementById("practice");
    if (!node) return;
    let sent = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || sent) return;
        sent = true;
        track("service_view");
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return null;
}
