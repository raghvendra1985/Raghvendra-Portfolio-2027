/** Pixels of sticky-nav clearance for hash targets. Matches `--hash-offset`. */
export function hashScrollOffsetPx() {
  if (typeof window === "undefined") return 100;
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const compact = nav?.dataset.compact === "true";
  const prop = compact ? "--nav-height-compact" : "--nav-height";
  const raw = getComputedStyle(document.documentElement).getPropertyValue(prop);
  const height = Number.parseFloat(raw);
  return (Number.isFinite(height) ? height : compact ? 64 : 88) + 12;
}
