export const CHARM_IDS = [
  "period",
  "disc",
  "pencil",
  "eye",
  "nazar",
  "hamsa",
  "nimbu",
  "drishti",
  "daruma",
  "neko",
  "horseshoe",
  "scarab",
  "emoji",
] as const;

export type CharmId = (typeof CHARM_IDS)[number];

export type CharmSet = "studio" | "world";

export type Charm = {
  id: CharmId;
  slug: string;
  name: string;
  origin: string;
  story: string;
  ritual: string;
  ritualLabel: string;
  instruction: string;
  set: CharmSet;
};

const INSTRUCTION = "Drag, flick, click to switch, or double-click for a ritual.";

export const CHARMS: Charm[] = [
  {
    id: "period",
    slug: "period",
    name: "Period",
    origin: "Wordmark",
    story:
      "The gold full stop from the wordmark. Hang it when the decision is made and the work can ship.",
    ritual: "Shipped.",
    ritualLabel: "Close it",
    instruction: INSTRUCTION,
    set: "studio",
  },
  {
    id: "disc",
    slug: "disc",
    name: "Disc",
    origin: "Cursor",
    story:
      "The navy cursor. Hang it if you want a design leader who still opens the file.",
    ritual: "In the file.",
    ritualLabel: "Stay in the file",
    instruction: INSTRUCTION,
    set: "studio",
  },
  {
    id: "pencil",
    slug: "pencil",
    name: "Pencil",
    origin: "Craft",
    story:
      "Before the deck, before the system. Hang it for the thinking that happens in the sketch.",
    ritual: "Rough first.",
    ritualLabel: "Start rough",
    instruction: INSTRUCTION,
    set: "studio",
  },
  {
    id: "eye",
    slug: "notice",
    name: "Notice",
    origin: "Critique",
    story:
      "Concentric rings for looking twice. Hang it when the hire should bring judgment, not more screens.",
    ritual: "Look twice.",
    ritualLabel: "Look twice",
    instruction: INSTRUCTION,
    set: "studio",
  },
  {
    id: "nazar",
    slug: "nazar",
    name: "Nazar",
    origin: "Turkey and the Mediterranean",
    story:
      "Worn against the evil eye — and against a portfolio that only looks expensive. Hang it for work that holds in the room.",
    ritual: "It holds.",
    ritualLabel: "Give it a flick",
    instruction: INSTRUCTION,
    set: "world",
  },
  {
    id: "hamsa",
    slug: "hamsa",
    name: "Hamsa",
    origin: "Middle East and North Africa",
    story:
      "An open hand. Hang it when the role should protect the product, not decorate it.",
    ritual: "Protected.",
    ritualLabel: "Give it a flick",
    instruction: INSTRUCTION,
    set: "world",
  },
  {
    id: "nimbu",
    slug: "nimbu-mirchi",
    name: "Nimbu-mirchi",
    origin: "India",
    story:
      "Hung at the threshold to turn noise away. Hang it before a messy engagement — strategy first, theatre outside.",
    ritual: "Threshold clear.",
    ritualLabel: "Hang a fresh garland",
    instruction: INSTRUCTION,
    set: "world",
  },
  {
    id: "drishti",
    slug: "drishti-bommai",
    name: "Drishti bommai",
    origin: "South India",
    story:
      "A guardian for the first glance. Hang it when the work should be honest on contact — then repaint when the problem changes.",
    ritual: "Seen clearly.",
    ritualLabel: "Repaint the guardian",
    instruction: INSTRUCTION,
    set: "world",
  },
  {
    id: "daruma",
    slug: "daruma",
    name: "Daruma",
    origin: "Japan",
    story:
      "Grit, not luck. Hang it for a search that should end in a leader who ships — one eye for the brief, the other for the outcome.",
    ritual: "Goal set.",
    ritualLabel: "Set the goal",
    instruction: INSTRUCTION,
    set: "world",
  },
  {
    id: "neko",
    slug: "maneki-neko",
    name: "Maneki-neko",
    origin: "Japan",
    story:
      "It beckons. Hang it if you are here to start a conversation — hiring, a product, or a workshop.",
    ritual: "Come in.",
    ritualLabel: "Start the conversation",
    instruction: INSTRUCTION,
    set: "world",
  },
  {
    id: "horseshoe",
    slug: "horseshoe",
    name: "Horseshoe",
    origin: "Europe and the Americas",
    story:
      "Points up, so it holds. Hang it for systems that last past launch week — the unglamorous work that still has to run.",
    ritual: "It lasts.",
    ritualLabel: "Give it a flick",
    instruction: INSTRUCTION,
    set: "world",
  },
  {
    id: "scarab",
    slug: "scarab",
    name: "Scarab",
    origin: "Ancient Egypt",
    story:
      "Renewal, not a restyle. Hang it when the practice, the system, or the AI product needs to be rebuilt.",
    ritual: "Begin again.",
    ritualLabel: "Begin again",
    instruction: INSTRUCTION,
    set: "world",
  },
  {
    id: "emoji",
    slug: "custom",
    name: "Emoji",
    origin: "Yours",
    story:
      "Your mark on the visit. Hang whatever the brief needs — then take the work seriously.",
    ritual: "Your mark.",
    ritualLabel: "Pick a mark",
    instruction: INSTRUCTION,
    set: "world",
  },
];

export const CHARM_MAP = Object.fromEntries(CHARMS.map((charm) => [charm.id, charm])) as Record<
  CharmId,
  Charm
>;

export type CharmBeadKind = "gold" | "navy" | "mist" | "faience" | "red";

export type CharmArt = {
  src?: string;
  frame: [number, number];
  attach: number;
  hangOffset: number;
  beads: {
    small: CharmBeadKind;
    big: CharmBeadKind;
    raise: number;
    bigSize: number;
  };
};

export const CHARM_ART: Record<CharmId, CharmArt> = {
  period: {
    src: "/assets/charms/period.png",
    frame: [64, 64],
    attach: 0.15,
    hangOffset: 22.4,
    beads: { small: "gold", big: "navy", raise: 0, bigSize: 12 },
  },
  disc: {
    src: "/assets/charms/disc.png",
    frame: [64, 64],
    attach: 0.15,
    hangOffset: 22.4,
    beads: { small: "gold", big: "navy", raise: 0, bigSize: 12 },
  },
  pencil: {
    src: "/assets/charms/pencil.png",
    frame: [64, 84],
    attach: 0.12,
    hangOffset: 32,
    beads: { small: "gold", big: "navy", raise: 0, bigSize: 12 },
  },
  eye: {
    src: "/assets/charms/notice.png",
    frame: [64, 64],
    attach: 0.15,
    hangOffset: 22.4,
    beads: { small: "gold", big: "mist", raise: 0, bigSize: 12 },
  },
  nazar: {
    src: "/assets/charms/nazar.png",
    frame: [64, 64],
    attach: 0.15,
    hangOffset: 22.4,
    beads: { small: "mist", big: "navy", raise: 0, bigSize: 12 },
  },
  hamsa: {
    src: "/assets/charms/hamsa.png",
    frame: [64, 84],
    attach: 0.12,
    hangOffset: 32,
    beads: { small: "gold", big: "navy", raise: 0, bigSize: 12 },
  },
  nimbu: {
    src: "/assets/charms/nimbu.png",
    frame: [64, 84],
    attach: 0.18,
    hangOffset: 28,
    beads: { small: "gold", big: "red", raise: 0, bigSize: 12 },
  },
  drishti: {
    src: "/assets/charms/drishti.png",
    frame: [64, 84],
    attach: 0.13,
    hangOffset: 31.1,
    beads: { small: "gold", big: "red", raise: 4, bigSize: 12 },
  },
  daruma: {
    src: "/assets/charms/daruma.png",
    frame: [64, 64],
    attach: 0.14,
    hangOffset: 23,
    beads: { small: "gold", big: "mist", raise: 0, bigSize: 12 },
  },
  neko: {
    src: "/assets/charms/neko.png",
    frame: [64, 84],
    attach: 0.13,
    hangOffset: 31.1,
    beads: { small: "gold", big: "red", raise: 4, bigSize: 12 },
  },
  horseshoe: {
    src: "/assets/charms/horseshoe.png",
    frame: [64, 84],
    attach: 0.12,
    hangOffset: 31.9,
    beads: { small: "gold", big: "navy", raise: 0, bigSize: 14 },
  },
  scarab: {
    src: "/assets/charms/scarab.png",
    frame: [90, 70],
    attach: 0.22,
    hangOffset: 29.2,
    beads: { small: "gold", big: "faience", raise: 4, bigSize: 12 },
  },
  emoji: {
    frame: [64, 64],
    attach: 0.15,
    hangOffset: 22.4,
    beads: { small: "mist", big: "gold", raise: 0, bigSize: 14 },
  },
};

export function getCharmArt(id: CharmId): CharmArt {
  return CHARM_ART[id];
}

export const DEFAULT_CHARM_ID: CharmId = "period";

export const DEFAULT_EMOJI = "🍀";

export const EMOJI_SET = ["🍀", "🧿", "✨", "🐱", "🎯", "🕯️"] as const;

export function normalizeEmoji(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_EMOJI;
  const trimmed = value.trim().replace(/\s+/g, "");
  if (!trimmed) return DEFAULT_EMOJI;
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const parts = [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(trimmed)];
    return parts.slice(0, 32).map((part) => part.segment).join("");
  }
  return Array.from(trimmed).slice(0, 32).join("");
}

export const DARUMA_LABELS = ["Set the goal", "Shipped", "Begin again"] as const;

export type DarumaState = 0 | 1 | 2;

export function normalizeDaruma(value: unknown): DarumaState {
  if (value === 1 || value === 2) return value;
  return 0;
}

export function nextDaruma(current: DarumaState): DarumaState {
  return ((current + 1) % 3) as DarumaState;
}

export const DRISHTI_COLORS = [
  "#9f1239",
  "#1e3a5f",
  "#124d1c",
  "#c45c12",
  "#3b2a6e",
  "#e4b028",
  "#0b1849",
] as const;

export type DrishtiState = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function normalizeDrishti(value: unknown): DrishtiState {
  if (typeof value === "number" && Number.isInteger(value) && value >= 0 && value < DRISHTI_COLORS.length) {
    return value as DrishtiState;
  }
  return 0;
}

export function nextDrishti(current: DrishtiState): DrishtiState {
  return ((current + 1) % DRISHTI_COLORS.length) as DrishtiState;
}

const DRISHTI_LIGHT = new Set(["#e4b028", "#c45c12"]);

export function drishtiInk(fill: string) {
  return DRISHTI_LIGHT.has(fill) ? "#0b1849" : "#ebede3";
}

export function isCharmId(value: unknown): value is CharmId {
  return typeof value === "string" && (CHARM_IDS as readonly string[]).includes(value);
}

export function charmIdFromSelect(value: string): CharmId | null {
  if (isCharmId(value)) return value;
  const match = CHARMS.find((charm) => charm.slug === value);
  return match?.id ?? null;
}

export const CHARM_RITUAL_EVENT = "rs-charm-ritual";
export const CHARM_FLICK_EVENT = "rs-charm-flick";

export function requestCharmRitual() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CHARM_RITUAL_EVENT));
}

let pendingFlick = false;

export function requestCharmFlick() {
  pendingFlick = true;
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CHARM_FLICK_EVENT));
}

export function consumeCharmFlick() {
  const next = pendingFlick;
  pendingFlick = false;
  return next;
}

export function getCharm(id: CharmId): Charm {
  return CHARM_MAP[id];
}

export function nextCharmId(id: CharmId, step = 1): CharmId {
  const index = CHARM_IDS.indexOf(id);
  const next = (index + step + CHARM_IDS.length) % CHARM_IDS.length;
  return CHARM_IDS[next];
}

export function nextEmoji(current: string): string {
  const index = EMOJI_SET.indexOf(current as (typeof EMOJI_SET)[number]);
  return EMOJI_SET[(index + 1) % EMOJI_SET.length];
}
