"use client";

import { forwardRef } from "react";

const MenuToggle = forwardRef<
  HTMLButtonElement,
  {
    open: boolean;
    inverted?: boolean;
    onClick: () => void;
  }
>(function MenuToggle({ open, inverted = false, onClick }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls="site-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
      className={`inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 border px-2.5 ${
        inverted
          ? "border-mist/30 text-mist hover:border-mist"
          : "border-navy/20 text-navy hover:border-navy"
      }`}
    >
      <span className="font-mono-label">{open ? "Close" : "Menu"}</span>
      <span className="relative block h-3 w-4" aria-hidden="true">
        <span
          className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
            open ? "top-1.5 rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
            open ? "bottom-1.5 -rotate-45" : "bottom-0"
          }`}
        />
      </span>
    </button>
  );
});

export default MenuToggle;
