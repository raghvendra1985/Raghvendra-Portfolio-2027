const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const STORAGE_KEY = "rs-utm";

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function readStorage(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UtmParams;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getStoredUtm(): Record<string, string> {
  const stored = readStorage();
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = stored[key];
    if (value) out[key] = value;
  }
  return out;
}

/** Capture UTM params from the current URL into sessionStorage. First landing wins per key. */
export function captureUtmFromLocation() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const incoming: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) incoming[key] = value;
  }
  if (!Object.keys(incoming).length) return;

  const current = readStorage();
  const next: UtmParams = { ...incoming, ...current };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* private mode */
  }
}
