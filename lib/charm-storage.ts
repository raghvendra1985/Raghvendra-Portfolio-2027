import {
  DEFAULT_CHARM_ID,
  DEFAULT_EMOJI,
  charmIdFromSelect,
  isCharmId,
  normalizeDaruma,
  normalizeDrishti,
  normalizeEmoji,
  type CharmId,
  type DarumaState,
  type DrishtiState,
} from "./charms";

const STORAGE_KEY = "rs-charm";
const CHANGE_EVENT = "rs-charm-change";

export type CharmState = {
  id: CharmId;
  hangX: number;
  hidden: boolean;
  emoji: string;
  daruma: DarumaState;
  drishti: DrishtiState;
};

export const DEFAULT_CHARM_STATE: CharmState = {
  id: DEFAULT_CHARM_ID,
  hangX: 0.78,
  hidden: false,
  emoji: DEFAULT_EMOJI,
  daruma: 0,
  drishti: 0,
};

function resolveId(value: unknown): CharmId {
  if (isCharmId(value)) return value;
  if (typeof value === "string") return charmIdFromSelect(value) ?? DEFAULT_CHARM_STATE.id;
  return DEFAULT_CHARM_STATE.id;
}

function clampUnit(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_CHARM_STATE.hangX;
  return Math.min(Math.max(value, 0.08), 0.92);
}

function normalize(value: unknown): CharmState {
  if (!value || typeof value !== "object") return { ...DEFAULT_CHARM_STATE };
  const raw = value as Partial<CharmState>;
  return {
    id: resolveId(raw.id),
    hangX: typeof raw.hangX === "number" ? clampUnit(raw.hangX) : DEFAULT_CHARM_STATE.hangX,
    hidden: Boolean(raw.hidden),
    emoji: normalizeEmoji(raw.emoji),
    daruma: normalizeDaruma(raw.daruma),
    drishti: normalizeDrishti(raw.drishti),
  };
}

export function readCharmState(): CharmState {
  if (typeof window === "undefined") return { ...DEFAULT_CHARM_STATE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CHARM_STATE };
    return normalize(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_CHARM_STATE };
  }
}

export function writeCharmState(partial: Partial<CharmState>): CharmState {
  const next = normalize({ ...readCharmState(), ...partial });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* private mode */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<CharmState>(CHANGE_EVENT, { detail: next }));
  }
  return next;
}

export function subscribeCharmState(callback: (state: CharmState) => void) {
  if (typeof window === "undefined") return () => undefined;

  const onChange = (event: Event) => {
    const detail = (event as CustomEvent<CharmState>).detail;
    callback(detail ? normalize(detail) : readCharmState());
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback(readCharmState());
  };

  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Width of the dedicated right-hand charm stage (over hero / scene). */
export function corridorWidth(width = typeof window === "undefined" ? 1280 : window.innerWidth) {
  return Math.min(360, Math.max(240, width * 0.26));
}

/** Pixel bounds for the desktop charm stage along the viewport X axis. */
export function charmStageBounds(width = typeof window === "undefined" ? 1280 : window.innerWidth) {
  const corridor = corridorWidth(width);
  const edge = Math.max(48, width * 0.035);
  const minPx = width - corridor;
  const maxPx = width - edge;
  return {
    minPx,
    maxPx,
    centerPx: (minPx + maxPx) / 2,
  };
}

/**
 * Keep the hang point inside the dedicated right stage so the charm
 * overlays the hero scene rather than sitting in an empty outer gutter.
 */
export function clampHangX(hangX: number, width = typeof window === "undefined" ? 1280 : window.innerWidth) {
  if (width < 1024) {
    const minPx = width * 0.78;
    const maxPx = width - 56;
    const px = clampUnit(hangX) * width;
    const clamped = Math.min(Math.max(px, Math.min(minPx, maxPx - 8)), Math.max(maxPx, minPx + 8));
    return clamped / width;
  }
  const { minPx, maxPx, centerPx } = charmStageBounds(width);
  const px = clampUnit(hangX) * width;
  // Old installs stored a far-right gutter hang (~0.9+); snap those into stage center.
  if (px > maxPx + 8) return centerPx / width;
  return Math.min(Math.max(px, minPx), maxPx) / width;
}
