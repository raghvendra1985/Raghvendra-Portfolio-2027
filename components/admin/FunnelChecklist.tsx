"use client";

import { useEffect, useState } from "react";

export default function FunnelChecklist({
  storageKey,
  items,
}: {
  storageKey: string;
  items: Array<{ id: string; label: string }>;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      setChecked({});
    }
  }, [storageKey]);

  function toggle(id: string) {
    setChecked((current) => {
      const next = { ...current, [id]: !current[id] };
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  return (
    <ul className="mt-6 divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.id} className="py-3">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              className="mt-1"
              checked={Boolean(checked[item.id])}
              onChange={() => toggle(item.id)}
            />
            <span>{item.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
