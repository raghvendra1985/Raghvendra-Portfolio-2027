"use client";

import { useState } from "react";
import Image from "next/image";
import { resourceKey, type StudioResource } from "@/studio";
import { PaperclipMark, ResourceActions } from "./libraryShared";

export default function LibraryMobileStack({ items }: { items: StudioResource[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  if (!items.length) {
    return (
      <p className="border-t border-line py-8 text-sm text-ink-soft" role="status">
        Nothing on this shelf yet.
      </p>
    );
  }

  return (
    <ul className="mt-10 space-y-6">
      {items.map((item) => {
        const key = resourceKey(item);
        const open = openKey === key;
        return (
          <li key={key}>
            <button
              type="button"
              aria-expanded={open}
              data-library-object={key}
              data-cursor="Open"
              onClick={() => setOpenKey(open ? null : key)}
              className="w-full text-left"
            >
              <div className="relative mx-auto max-w-[280px]">
                <div
                  data-library-note
                  aria-hidden={!open}
                  className="absolute inset-x-3 top-6 bg-paper px-4 py-4 text-navy shadow-[var(--object-shadow)] transition-transform duration-[400ms] ease-[var(--ease-physical)]"
                  style={{
                    transform: open ? "translateY(0) rotate(1deg)" : "translateY(18px) rotate(2deg)",
                    opacity: open ? 1 : 0,
                    visibility: open ? "visible" : "hidden",
                    pointerEvents: open ? "auto" : "none",
                  }}
                >
                  <PaperclipMark className="absolute -top-3 right-4 text-ink-soft" />
                  <p className="font-mono-label text-gold">A note</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.note}</p>
                </div>
                <div
                  className="library-cover relative z-[1] aspect-[3/4] overflow-hidden bg-navy transition-transform duration-[400ms] ease-[var(--ease-physical)]"
                  style={{
                    transform: open ? "translateY(-16px)" : "translateY(0)",
                    backgroundColor: item.spineColor,
                  }}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="280px"
                      unoptimized
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full flex-col justify-between p-5" style={{ color: item.spineInk }}>
                      <p className="font-mono-label">{item.shelf}</p>
                      <p className="type-h3">{item.title}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <p className="font-mono-label text-gold">
                  {item.shelf} · {item.topic}
                  {item.current ? " · Currently reading" : ""}
                </p>
                <h3 className="mt-2 type-h3">{item.title}</h3>
                <p className="mt-1 text-sm text-green">{item.creator}</p>
              </div>
            </button>
            {open ? <ResourceActions item={item} /> : null}
          </li>
        );
      })}
    </ul>
  );
}
