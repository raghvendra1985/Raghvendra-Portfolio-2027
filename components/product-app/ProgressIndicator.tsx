export default function ProgressIndicator({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label?: string;
}) {
  return (
    <p className="font-mono-label text-[11px] text-ink-soft" aria-live="polite">
      {label ?? "Progress"} {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </p>
  );
}
