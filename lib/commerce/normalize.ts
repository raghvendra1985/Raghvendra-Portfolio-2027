export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function firstNameFrom(name: string | null | undefined) {
  const trimmed = name?.trim();
  if (!trimmed) return "there";
  return trimmed.split(/\s+/)[0];
}

export function hashIp(value: string | null) {
  if (!value) return null;
  return value.replace(/\.[0-9]+$/, ".0").replace(/:[0-9a-fA-F]+$/, ":0");
}
