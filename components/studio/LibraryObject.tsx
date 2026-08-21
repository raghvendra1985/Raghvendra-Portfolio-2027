"use client";

import Image from "next/image";
import { libraryMetrics, resourceKey, type StudioResource } from "@/studio";
import { PaperclipMark, PlayMark, ResourceActions } from "./libraryShared";

export default function LibraryObject({
  item,
  selected,
  hovered,
  tabIndex,
  alignEnd = false,
  visible = true,
  onSelect,
  onHover,
}: {
  item: StudioResource;
  selected: boolean;
  hovered: boolean;
  tabIndex: number;
  alignEnd?: boolean;
  visible?: boolean;
  onSelect: () => void;
  onHover: (value: boolean) => void;
}) {
  const key = resourceKey(item);
  const metrics = libraryMetrics(item);
  const panelId = `library-note-${key.replace(/\s+/g, "-")}`;
  const isTool = item.shelf === "Tool";

  return (
    <div
      data-library-object={key}
      data-rest-rotate={metrics.rotate}
      data-hovered={hovered ? "true" : "false"}
      className="relative flex shrink-0 items-end"
      role="listitem"
      aria-hidden={!visible}
      style={{ zIndex: selected ? 8 : hovered ? 4 : 1 }}
    >
      <button
        type="button"
        aria-expanded={selected}
        aria-controls={panelId}
        tabIndex={tabIndex}
        data-cursor="Open"
        onClick={onSelect}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onFocus={() => onHover(true)}
        onBlur={() => onHover(false)}
        className="library-cover relative overflow-hidden text-left"
        style={{
          width: metrics.width,
          height: metrics.height,
          backgroundColor: item.spineColor,
          color: item.spineInk,
        }}
      >
        <span className="absolute inset-0">
          {item.shelf === "Book" && item.image ? (
            <span
              className="absolute inset-y-0 left-0 w-[3px] opacity-40"
              style={{ backgroundColor: item.spineInk }}
            />
          ) : null}
          {item.shelf === "Podcast" ? (
            <span className="absolute left-1/2 top-3 -translate-x-1/2 opacity-70">
              <PlayMark />
            </span>
          ) : null}
          <span
            className={`library-spine-label absolute inset-x-0 font-mono-label ${
              isTool ? "top-1/2 px-2 text-center" : "top-8 bottom-8"
            }`}
            style={isTool ? { writingMode: "horizontal-tb", transform: "none" } : undefined}
          >
            {item.spineLabel}
          </span>
        </span>
        <span className="sr-only">
          {item.shelf}. {item.title}. {item.creator}
        </span>
      </button>

      <div
        id={panelId}
        data-library-reveal
        data-open={selected ? "true" : "false"}
        className={`library-reveal absolute bottom-0 z-10 flex w-[min(92vw,420px)] items-end gap-4 ${
          alignEnd ? "right-[calc(100%+12px)] left-auto flex-row-reverse" : "left-[calc(100%+12px)]"
        }`}
      >
        <div
          data-library-face
          className="library-cover relative hidden h-[210px] w-[148px] shrink-0 overflow-hidden bg-navy sm:block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt=""
              fill
              sizes="148px"
              unoptimized
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-3" style={{ backgroundColor: item.spineColor, color: item.spineInk }}>
              <p className="font-mono-label">{item.shelf}</p>
              <p className="type-h3 leading-tight">{item.spineLabel}</p>
            </div>
          )}
        </div>
        <aside
          data-library-note
          className="relative w-[min(100%,260px)] bg-paper px-5 py-5 text-navy shadow-[var(--object-shadow-lift)]"
          style={{ transform: "rotate(1.5deg)" }}
        >
          <PaperclipMark className="absolute -top-3 right-5 text-ink-soft" />
          <p className="font-mono-label text-gold">A note</p>
          <h3 className="mt-3 type-h3">{item.title}</h3>
          <p className="mt-1 text-sm text-green">{item.creator}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.note}</p>
          {item.current ? (
            <p className="mt-2 font-mono-label text-gold">Currently reading</p>
          ) : null}
          <ResourceActions item={item} />
        </aside>
      </div>
    </div>
  );
}
