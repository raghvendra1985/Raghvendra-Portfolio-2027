import Link from "next/link";
import type { FocusItem } from "@/founder-os";

export default function FocusCard({ item }: { item: FocusItem }) {
  const body = (
    <>
      <p className="font-mono-label text-ink-soft">{item.role}</p>
      <h3 className="mt-3 type-h3">{item.name}</h3>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">{item.status}</p>
      {item.href ? (
        <p className="mt-6 font-mono-label text-green">Open published evidence →</p>
      ) : null}
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        data-os-item
        data-cursor="View"
        className="block border-t border-line py-10"
      >
        {body}
      </Link>
    );
  }

  return (
    <article data-os-item className="border-t border-line py-10">
      {body}
    </article>
  );
}
