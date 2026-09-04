"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { noteAnalyticsPath } from "@/lib/analytics";

/** Records SPA entry/previous paths for funnel event context. */
export default function AnalyticsPathTracker() {
  const pathname = usePathname();

  useEffect(() => {
    noteAnalyticsPath(pathname);
  }, [pathname]);

  return null;
}
