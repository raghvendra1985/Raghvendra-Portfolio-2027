import Link from "next/link";
import { amazonProductUrl } from "@/lib/site";
import type { StudioResource } from "@/studio";

export function resourceLinks(item: StudioResource) {
  const amazonHref = item.amazonAsin ? amazonProductUrl(item.amazonAsin) : undefined;
  const buyHref = amazonHref ?? (item.buyLabel ? item.href : undefined);
  const buyLabel = item.buyLabel ?? (amazonHref ? "Buy on Amazon" : undefined);
  return { amazonHref, buyHref, buyLabel };
}

export function ResourceActions({ item }: { item: StudioResource }) {
  const { amazonHref, buyHref, buyLabel } = resourceLinks(item);

  return (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
      {item.href && !item.buyLabel ? (
        item.href.startsWith("http") ? (
          <a
            href={item.href}
            className="inline-flex min-h-11 items-center font-mono-label text-navy"
            data-cursor="Open"
            target="_blank"
            rel="noreferrer"
          >
            Open →
          </a>
        ) : (
          <Link
            href={item.href}
            className="inline-flex min-h-11 items-center font-mono-label text-navy"
            data-cursor="Open"
          >
            Read note →
          </Link>
        )
      ) : null}
      {buyHref ? (
        <a
          href={buyHref}
          className="inline-flex min-h-11 items-center font-mono-label text-navy"
          data-cursor="Open"
          target="_blank"
          rel={amazonHref ? "sponsored noopener noreferrer" : "noreferrer"}
        >
          {buyLabel} →
        </a>
      ) : null}
    </div>
  );
}

export function PaperclipMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="28"
      viewBox="0 0 18 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 12.5v8.2c0 2.4 1.8 4.3 4 4.3s4-1.9 4-4.3V8.2C14 5 11.8 3 9 3S4 5 4 8.2v11.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlayMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 1.2 8.4 5 2 8.8V1.2Z" fill="currentColor" />
    </svg>
  );
}
