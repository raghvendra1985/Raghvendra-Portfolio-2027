export const contactIntents = [
  { id: "hiring", label: "Product leadership role" },
  { id: "advisory", label: "Advisory or product engagement" },
  { id: "workshop", label: "Workshop or mentoring" },
  { id: "other", label: "Something else" },
] as const;

export type ContactIntent = (typeof contactIntents)[number]["id"];

export const contactTimelines = [
  { id: "soon", label: "Soon" },
  { id: "this-quarter", label: "This quarter" },
  { id: "exploring", label: "Exploring" },
  { id: "unsure", label: "Unsure" },
] as const;

export type ContactTimeline = (typeof contactTimelines)[number]["id"];

const intentAliases: Record<string, ContactIntent> = {
  hiring: "hiring",
  advisory: "advisory",
  workshop: "workshop",
  other: "other",
  "ai-product": "advisory",
  designops: "advisory",
  strategy: "advisory",
  ai: "advisory",
  general: "other",
  "student-product": "other",
  product: "other",
};

export function resolveContactIntent(value: string | null): ContactIntent {
  if (!value) return "other";
  return intentAliases[value] ?? "other";
}

export function contactIntentFromQuery(value: string | null): ContactIntent | null {
  if (!value) return null;
  return resolveContactIntent(value);
}

export function contactIntentLabel(id: ContactIntent) {
  return contactIntents.find((item) => item.id === id)?.label ?? id;
}

export function contactTimelineLabel(id: string) {
  return contactTimelines.find((item) => item.id === id)?.label ?? id;
}
