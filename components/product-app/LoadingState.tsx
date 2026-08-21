export default function LoadingState({ label = "Loading" }: { label?: string }) {
  return <p className="font-mono-label text-ink-soft">{label}…</p>;
}
