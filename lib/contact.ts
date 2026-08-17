export const contactIntents = [
  { id: "hiring", label: "Hiring for a senior product design role" },
  { id: "ai-product", label: "AI product / product strategy" },
  { id: "designops", label: "DesignOps / design systems" },
  { id: "workshop", label: "Workshop / teaching / speaking" },
  { id: "student-product", label: "Student product" },
  { id: "other", label: "Something else" },
] as const;

export type ContactIntent = (typeof contactIntents)[number]["id"];

const intentAliases: Record<string, ContactIntent> = {
  ai: "ai-product",
  strategy: "ai-product",
  product: "student-product",
  general: "other",
};

export function resolveContactIntent(value: string | null): ContactIntent {
  if (!value) return "other";
  if (contactIntents.some((intent) => intent.id === value)) {
    return value as ContactIntent;
  }
  return intentAliases[value] ?? "other";
}
