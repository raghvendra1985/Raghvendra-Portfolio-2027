"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animateLibraryEnter, animateLibraryFilter, animateLibraryShelf } from "@/animations/library";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { track } from "@/lib/analytics";
import {
  resourceKey,
  studioTopics,
  type StudioResource,
  type StudioTopic,
} from "@/studio";
import LibraryMobileStack from "./LibraryMobileStack";
import LibraryObject from "./LibraryObject";

function orderResources(resources: StudioResource[]) {
  const books = resources.filter((item) => item.shelf === "Book");
  const articles = resources.filter((item) => item.shelf === "Article");
  const podcasts = resources.filter((item) => item.shelf === "Podcast");
  const tools = resources.filter((item) => item.shelf === "Tool");
  return [...books, ...articles, ...podcasts, ...tools];
}

export default function LibraryShelf({ resources }: { resources: StudioResource[] }) {
  const [filter, setFilter] = useState<StudioTopic>("All");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const shelfRef = useRef<HTMLDivElement>(null);
  const didEnter = useRef(false);
  const { config } = useExperience();
  const { reducedMotion } = config;

  const allOrdered = useMemo(() => orderResources(resources), [resources]);
  const visible = useMemo(
    () => (filter === "All" ? allOrdered : allOrdered.filter((item) => item.topic === filter)),
    [allOrdered, filter],
  );
  const visibleKeys = useMemo(() => new Set(visible.map(resourceKey)), [visible]);

  useEffect(() => {
    const root = shelfRef.current;
    if (!root) return;
    if (!didEnter.current) {
      didEnter.current = true;
      animateLibraryEnter(root, {
        reducedMotion,
        isMobile: config.isMobile,
        parallaxScale: config.parallaxScale,
      });
      return;
    }
    animateLibraryFilter(root, visibleKeys, reducedMotion);
  }, [config.isMobile, config.parallaxScale, filter, reducedMotion, visibleKeys]);

  useEffect(() => {
    const root = shelfRef.current;
    if (!root) return;
    const ctx = animateLibraryShelf(root, {
      hoveredKey,
      selectedKey,
      reducedMotion,
    });
    return () => ctx.revert();
  }, [hoveredKey, reducedMotion, selectedKey]);

  function selectItem(item: StudioResource) {
    const key = resourceKey(item);
    const next = selectedKey === key ? null : key;
    setSelectedKey(next);
    if (next) {
      track("library_item_selected", { shelf: item.shelf, title: item.title, topic: item.topic });
    }
  }

  function focusVisibleAt(index: number) {
    const next = Math.max(0, Math.min(visible.length - 1, index));
    setFocusIndex(next);
    const node = shelfRef.current?.querySelectorAll<HTMLButtonElement>(
      "[data-library-object]:not([data-library-visible='false']) button",
    )[next];
    node?.focus();
  }

  function onShelfKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!visible.length) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusVisibleAt(focusIndex + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusVisibleAt(focusIndex - 1);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setSelectedKey(null);
    }
  }

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="toolbar" aria-label="Filter library by topic">
        {studioTopics.map((topic) => {
          const pressed = filter === topic;
          return (
            <button
              key={topic}
              type="button"
              aria-pressed={pressed}
              onClick={() => {
                setFilter(topic);
                setSelectedKey(null);
                setHoveredKey(null);
                setFocusIndex(0);
              }}
              className={`min-h-11 border px-4 py-2 font-mono-label ${
                pressed
                  ? "border-navy bg-navy text-mist"
                  : "border-line text-ink-soft hover:border-navy hover:text-navy"
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>

      <div className="mt-10 lg:hidden">
        <LibraryMobileStack key={filter} items={visible} />
      </div>

      <div className="mt-12 hidden lg:block">
        <div
          ref={shelfRef}
          className="library-shelf relative min-h-[280px] overflow-visible pt-16 pr-24"
          aria-label="Working shelf"
          onKeyDown={onShelfKeyDown}
          onMouseLeave={() => setHoveredKey(null)}
        >
          {allOrdered.length ? (
            <div className="flex items-end gap-1" role="list">
              {allOrdered.map((item, index) => {
                const key = resourceKey(item);
                const isVisible = visibleKeys.has(key);
                const visibleIndex = visible.findIndex((entry) => resourceKey(entry) === key);
                return (
                  <LibraryObject
                    key={key}
                    item={item}
                    selected={selectedKey === key}
                    hovered={hoveredKey === key}
                    visible={isVisible}
                    tabIndex={isVisible && focusIndex === visibleIndex ? 0 : -1}
                    alignEnd={index > allOrdered.length - 3}
                    onSelect={() => {
                      if (!isVisible) return;
                      if (visibleIndex >= 0) setFocusIndex(visibleIndex);
                      selectItem(item);
                    }}
                    onHover={(value) => setHoveredKey(value ? key : null)}
                  />
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-sm text-ink-soft" role="status">
              Nothing on this shelf yet.
            </p>
          )}
          <div className="library-plank mt-0" aria-hidden="true" />
        </div>
        {visible.length ? null : (
          <p className="mt-4 text-sm text-ink-soft" role="status">
            Nothing on this shelf yet.
          </p>
        )}
      </div>
    </>
  );
}
