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
  hangX: 0.62,
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

/** Keep the hang point off the wordmark, Menu toggle, and reading column. */
export function clampHangX(hangX: number, width = typeof window === "undefined" ? 1280 : window.innerWidth) {
  const phone = width < 768;
  const tablet = width >= 768 && width < 1024;
  const minPx = phone ? width * 0.72 : tablet ? width * 0.78 : 200;
  const maxPx = width - (phone ? 56 : tablet ? 64 : 80);
  const px = clampUnit(hangX) * width;
  const clamped = Math.min(Math.max(px, Math.min(minPx, maxPx - 8)), Math.max(maxPx, minPx + 8));
  return clamped / width;
}
