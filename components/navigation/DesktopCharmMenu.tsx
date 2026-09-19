"use client";

import { useEffect, useId, useRef, useState } from "react";
import CharmPicker from "@/components/delight/CharmPicker";

export default function DesktopCharmMenu({
  className = "",
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center font-mono-label !font-semibold tracking-[0.06em] text-ink-soft hover:text-navy"
      >
        Charms
      </button>
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Choose a charm"
          className="absolute right-0 top-full z-[95] mt-3 w-[min(92vw,22rem)] border border-line bg-mist p-4 shadow-[0_12px_40px_rgba(11,24,73,0.12)]"
        >
          <CharmPicker
            compact
            credit={false}
            onHang={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
