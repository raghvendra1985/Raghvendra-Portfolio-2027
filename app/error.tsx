"use client";

import { useEffect } from "react";
import MagneticButton from "@/components/buttons/MagneticButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-40">
      <p className="font-mono-label text-ink-soft">Error</p>
      <h1 className="mt-6 type-h1 text-navy">
        Something went wrong.
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
        The page failed to load. Try again, or return home.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="font-mono-label border border-navy bg-navy px-5 py-3 text-[11px] text-mist"
        >
          Try again
        </button>
        <MagneticButton href="/">Back home</MagneticButton>
      </div>
    </section>
  );
}
