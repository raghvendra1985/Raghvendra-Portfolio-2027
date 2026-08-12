"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { trackConcierge } from "@/concierge";

type ConciergeContextValue = {
  open: boolean;
  openConcierge: (source?: string) => void;
  closeConcierge: () => void;
  toggleConcierge: () => void;
};

const ConciergeContext = createContext<ConciergeContextValue | null>(null);

export function useConcierge() {
  const value = useContext(ConciergeContext);
  if (!value) {
    throw new Error("useConcierge must be used inside ConciergeProvider");
  }
  return value;
}

export function ConciergeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openConcierge = useCallback((source = "unknown") => {
    setOpen(true);
    trackConcierge("concierge_open", { source });
  }, []);

  const closeConcierge = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleConcierge = useCallback(() => {
    setOpen((current) => {
      const next = !current;
      if (next) trackConcierge("concierge_open", { source: "shortcut" });
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggleConcierge();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleConcierge]);

  const value = useMemo(
    () => ({ open, openConcierge, closeConcierge, toggleConcierge }),
    [open, openConcierge, closeConcierge, toggleConcierge],
  );

  return <ConciergeContext.Provider value={value}>{children}</ConciergeContext.Provider>;
}
