"use client";

import { useEffect, useState } from "react";
import { hasVisited } from "@/animations/loader";

export function useFirstVisit() {
  const [firstVisit, setFirstVisit] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFirstVisit(!hasVisited());
    setReady(true);
  }, []);

  return { firstVisit, ready };
}
