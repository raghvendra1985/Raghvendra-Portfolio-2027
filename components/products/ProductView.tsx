"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MagneticButton from "@/components/buttons/MagneticButton";
import ProductStatusMark from "@/components/products/ProductStatusMark";
import DesignIqDemo from "@/components/products/DesignIqDemo";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { createCheckoutIntent, isPurchasable, notifyMailto } from "@/products/commerce";
import { formatCategories, formatInr, type Product } from "@/products";
import { getProductCopy } from "@/products/copy";

export default function ProductView({ product }: { product: Product }) {
  const copy = getProductCopy(product.slug);
  const purchasable = isPurchasable(product);
  const [note, setNote] = useState(false);

  useEffect(() => {
    track("product_page_viewed", { slug: product.slug, status: product.status });
  }, [product.slug, product.status]);

  function buy() {
    track("buy_cta_clicked", { slug: product.slug, price: product.price });
    if (purchasable) {
      createCheckoutIntent(product);
      setNote(true);
    }
  }

  const notifyHref = notifyMailto(product, site.email);

  return (
    <article className={purchasable ? "pb-28 lg:pb-0" : undefined}>
      <header className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-12 pt-32 sm:pt-40">
        <p className="font-mono-label text-[11px] text-ink-soft">
          {product.number} / Secret Products
        </p>
        <div className="mt-4">
          <ProductStatusMark status={product.status} />
        </div>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2rem,7vw,3.75rem)] leading-[1.12] text-navy lg:text-6xl lg:leading-[1.05]">
          {product.hook}
        </h1>
        <p className="mt-4 font-display text-2xl text-navy sm:text-3xl">{product.name}</p>
        {product.description ? (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {product.description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-end gap-6">
          <p className="font-mono-label text-[11px] text-navy">{formatInr(product.price)}</p>
          <p className="font-mono-label text-[11px] text-ink-soft">{formatCategories(product)}</p>
        </div>
        <div className="mt-8 scroll-mt-28" id="buy">
          {purchasable ? (
            <MagneticButton variant="primary" cursor="Buy" onClick={buy}>
              Buy Now
            </MagneticButton>
          ) : (
            <MagneticButton href={notifyHref} variant="secondary" cursor="Open">
              Notify me
            </MagneticButton>
          )}
          {note ? (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft" role="status">
              One-time purchase. Payments open shortly — UPI and cards, once. No subscription.
            </p>
          ) : null}
        </div>
      </header>

      <SectionReveal className="border-t border-line bg-navy px-[var(--page-pad)] py-16 text-mist sm:py-20">
        <div className="mx-auto max-w-[1440px]" data-reveal-item>
          <p className="font-mono-label text-[11px] text-mist/50">Preview</p>
          <div className="mt-6">
            {product.slug === "design-iq" ? (
              <DesignIqDemo />
            ) : (
              <ProductDemoSlot product={product} note={copy?.demoNote} />
            )}
          </div>
        </div>
      </SectionReveal>

      {copy ? (
        <>
          <SectionReveal className="border-t border-line px-[var(--page-pad)] py-20">
            <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2">
              <div data-reveal-item>
                <p className="font-mono-label text-[11px] text-ink-soft">Problem</p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy">{copy.problem}</p>
              </div>
              <div data-reveal-item>
                <p className="font-mono-label text-[11px] text-ink-soft">What this tool does</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                  {product.description ?? product.hook}
                </p>
                <p className="mt-6 font-mono-label text-[11px] text-ink-soft">Who it is for</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                  {copy.whoFor ??
                    `Design students working on ${formatCategories(product).toLowerCase()}. Buy once. Use when you need it.`}
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="border-t border-line px-[var(--page-pad)] py-20">
            <div className="mx-auto max-w-[1440px]" data-reveal-item>
              <p className="font-mono-label text-[11px] text-ink-soft">How it works</p>
              <ol className="mt-4 max-w-2xl space-y-4">
                {copy.howItWorks.map((step, index) => (
                  <li key={step} className="flex gap-4 text-base leading-relaxed text-ink-soft">
                    <span className="font-mono-label text-[11px] text-green">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </SectionReveal>

          <SectionReveal className="border-t border-line px-[var(--page-pad)] py-20">
            <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2">
              <div data-reveal-item>
                <p className="font-mono-label text-[11px] text-ink-soft">Example output</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                  {copy.exampleOutput}
                </p>
              </div>
              <div data-reveal-item>
                <p className="font-mono-label text-[11px] text-ink-soft">What you get</p>
                <ul className="mt-4 space-y-3">
                  {copy.whatYouGet.map((item) => (
                    <li key={item} className="max-w-xl text-base leading-relaxed text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionReveal>
        </>
      ) : null}

      <SectionReveal className="border-t border-navy bg-navy px-[var(--page-pad)] py-20 text-mist">
        <div
          className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end"
          data-reveal-item
        >
          <div>
            <p className="font-mono-label text-[11px] text-mist/50">One-time price</p>
            <p className="mt-4 font-display text-4xl sm:text-5xl">{formatInr(product.price)}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mist/70">
              Buy once. Use when you need it. No subscription. No bundle.
            </p>
            <p className="mt-6 font-mono-label text-[11px] text-mist/45">{product.attribution}</p>
          </div>
          {purchasable ? (
            <MagneticButton variant="gold" cursor="Buy" onClick={buy}>
              Buy Now
            </MagneticButton>
          ) : (
            <MagneticButton href={notifyHref} variant="gold" cursor="Open">
              Notify me
            </MagneticButton>
          )}
        </div>
      </SectionReveal>

      {purchasable ? (
        <div className="fixed inset-x-0 bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] z-30 border-t border-line bg-mist/95 px-[var(--page-pad)] py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono-label text-[11px] text-navy">{formatInr(product.price)}</p>
            <button
              type="button"
              onClick={() => {
                buy();
                document.getElementById("buy")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-green"
            >
              Buy Now →
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function ProductDemoSlot({ product, note }: { product: Product; note?: string }) {
  return (
    <figure>
      {product.cover ? (
        <div className="relative aspect-[4/5] max-h-[640px] w-full max-w-md overflow-hidden bg-navy sm:aspect-[16/10] sm:max-h-none sm:max-w-none">
          <Image
            src={product.cover}
            alt={`${product.name} preview`}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            unoptimized={product.cover.endsWith(".svg")}
            className="object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-end bg-navy p-8">
          <div>
            <p className="font-mono-label text-[11px] text-gold">{product.number}</p>
            <p className="mt-4 font-display text-3xl">{product.name}</p>
          </div>
        </div>
      )}
      {note ? (
        <figcaption className="mt-4 max-w-xl text-sm leading-relaxed text-mist/60">{note}</figcaption>
      ) : null}
    </figure>
  );
}
