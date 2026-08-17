"use client";

import { useEffect, useState } from "react";

export default function SaveState({
  storageKey,
  value,
}: {
  storageKey: string;
  value: unknown;
}) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [storageKey, value]);
  if (!saved) return null;
  return <p className="font-mono-label text-[11px] text-ink-soft">Saved on this device.</p>;
}

export function readSavedState<T>(storageKey: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
