/**
 * Horizontal working shelf for Studio Library.
 * Cover + title always visible; resource note on hover and keyboard focus.
 */
"use client";

import Image from "next/image";
import { track } from "@/lib/analytics";
import type { StudioResource } from "@/studio";

function amazonHref(asin: string) {
  return `https://www.amazon.in/dp/${asin}?tag=raghvendra0e-21`;
}

function orderResources(resources: StudioResource[]) {
  const books = resources.filter((item) => item.shelf === "Book");
  const articles = resources.filter((item) => item.shelf === "Article");
  const podcasts = resources.filter((item) => item.shelf === "Podcast");
  const tools = resources.filter((item) => item.shelf === "Tool");
  return [...books, ...articles, ...podcasts, ...tools];
}

function kindLabel(item: StudioResource) {
  if (item.current) return `${item.shelf} · reading now`;
  return item.shelf;
}

export default function LibraryLane({ resources }: { resources: StudioResource[] }) {
  const items = orderResources(resources);

  return (
    <ul className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:thin]">
      {items.map((item) => {
        const href = item.amazonAsin ? amazonHref(item.amazonAsin) : item.href;
        const cover = (
          <div className="group relative aspect-[2/3] overflow-hidden border border-line bg-paper">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.imageAlt ?? item.title}
                fill
                sizes="148px"
                className="object-cover"
                unoptimized={item.image.endsWith(".svg") || item.image.endsWith(".png")}
              />
            ) : (
              <div
                className="flex h-full items-end p-3"
                style={{ background: item.spineColor, color: item.spineInk }}
              >
                <span className="text-sm font-semibold leading-snug">
                  {item.spineLabel || item.title}
                </span>
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
              aria-hidden="true"
            />
            <p
              className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 translate-y-1 text-sm leading-snug text-mist opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
              aria-hidden="true"
            >
              {item.note}
            </p>
          </div>
        );

        const meta = (
          <>
            <p className="mt-2.5 text-sm font-semibold leading-snug text-navy">{item.title}</p>
            <p className="mt-0.5 text-sm text-ink-soft">{item.creator}</p>
            <span className="mt-1 block font-mono-label text-gold">{kindLabel(item)}</span>
            <p className="sr-only">{item.note}</p>
          </>
        );

        return (
          <li key={`${item.shelf}-${item.title}`} className="w-[148px] shrink-0">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel={item.amazonAsin ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                data-cursor="Open"
                className="block outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                onClick={() =>
                  track("library_item_selected", {
                    shelf: item.shelf,
                    title: item.title,
                    topic: item.topic,
                  })
                }
              >
                {cover}
                {meta}
              </a>
            ) : (
              <div
                tabIndex={0}
                className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {cover}
                {meta}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
