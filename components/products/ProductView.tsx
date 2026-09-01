import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ProductCta from "@/components/products/ProductCta";
import ProductStatusMark from "@/components/products/ProductStatusMark";
import ProductViewTracker from "@/components/products/ProductViewTracker";
import DesignIqDemo from "@/components/products/DesignIqDemo";
import ScreeningPreview from "@/components/products/stories/ScreeningPreview";
import DraftingPreview from "@/components/products/stories/DraftingPreview";
import BriefingPreview from "@/components/products/stories/BriefingPreview";
import SectionReveal from "@/components/reveal/SectionReveal";
import { TrackedLink } from "@/components/analytics/TrackedCta";
import { isPurchasable } from "@/products/commerce";
import { formatCategories, formatInr, getAdjacentProducts, productsVisitorTitle, type Product } from "@/products";
import { getProductCopy } from "@/products/copy";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { pageMarks } from "@/visual-language/marks";

export default function ProductView({ product }: { product: Product }) {
  const copy = getProductCopy(product.slug);
  const { prev, next } = getAdjacentProducts(product.slug);

  return (
    <article>
      <ProductViewTracker slug={product.slug} productId={product.id} />
      <header className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-12 pt-32 sm:pt-40">
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center font-mono-label text-ink-soft hover:text-navy"
        >
          ← All products
        </Link>
        <div className="mt-8 flex items-center gap-4">
          <SystemObjectMark
            src={pageMarks.products.src}
            motion={pageMarks.products.motion}
            surface={pageMarks.products.surface}
            size="sm"
          />
          <p className="font-mono-label text-ink-soft">
            {product.number} / {productsVisitorTitle}
          </p>
        </div>
        <div className="mt-4">
          <ProductStatusMark status={product.status} />
        </div>
        <h1 className="mt-6 max-w-4xl type-h1 text-navy">
          {product.hook}
        </h1>
        <p className="mt-4 type-h3 text-navy">{product.name}</p>
        {product.description ? (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {product.description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-end gap-6">
          <p className="font-mono-label text-navy">{formatInr(product.price)}</p>
          <p className="font-mono-label text-ink-soft">{formatCategories(product)}</p>
        </div>
        <div className="mt-8 scroll-mt-28" id="buy">
          <ProductCta product={product} variant={isPurchasable(product) ? "primary" : "secondary"} />
        </div>
      </header>

      <SectionReveal className="border-t border-line bg-navy px-[var(--page-pad)] py-16 text-mist sm:py-20">
        <div className="mx-auto max-w-[1440px]" data-reveal-item>
          <p className="font-mono-label text-mist/50">Preview</p>
          <div className="mt-6">
            {product.slug === "design-iq" ? (
              <Suspense fallback={<p className="font-mono-label text-mist/50">Loading preview</p>}>
                <DesignIqDemo previewLimit={2} />
              </Suspense>
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
                <p className="font-mono-label text-ink-soft">Problem</p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy">{copy.problem}</p>
              </div>
              <div data-reveal-item>
                <p className="font-mono-label text-ink-soft">What this tool does</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                  {product.description ?? product.hook}
                </p>
                <p className="mt-6 font-mono-label text-ink-soft">Who it is for</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                  {copy.whoFor ??
                    `Design students working on ${formatCategories(product).toLowerCase()}. Buy once. Use when you need it.`}
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="border-t border-line px-[var(--page-pad)] py-20">
            <div className="mx-auto max-w-[1440px]" data-reveal-item>
              <p className="font-mono-label text-ink-soft">How it works</p>
              <ol className="mt-4 max-w-2xl space-y-4">
                {copy.howItWorks.map((step, index) => (
                  <li key={step} className="flex gap-4 text-base leading-relaxed text-ink-soft">
                    <span className="font-mono-label text-green">
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
                <p className="font-mono-label text-ink-soft">Example output</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                  {copy.exampleOutput}
                </p>
              </div>
              <div data-reveal-item>
                <p className="font-mono-label text-ink-soft">What you get</p>
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
            <p className="font-mono-label text-mist/50">One-time price</p>
            <p className="mt-4 type-h2">{formatInr(product.price)}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mist/70">
              Buy once. Use when you need it. No subscription. No bundle.
            </p>
            <p className="mt-6 font-mono-label text-mist/45">{product.attribution}</p>
          </div>
          <ProductCta product={product} variant="gold" />
        </div>
      </SectionReveal>

      {prev || next ? (
        <SectionReveal className="border-t border-line px-[var(--page-pad)] py-16 sm:py-20">
          <div
            className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between"
            data-reveal-item
          >
            {prev ? (
              <TrackedLink
                href={`/products/${prev.slug}`}
                event="product_card_clicked"
                payload={{ slug: prev.slug, from: "prev" }}
                data-cursor="Open"
                className="flex min-h-11 flex-1 flex-col justify-center border border-line px-5 py-4 hover:border-navy"
              >
                <span className="font-mono-label text-ink-soft">← Previous</span>
                <span className="mt-2 type-h3">{prev.name}</span>
              </TrackedLink>
            ) : (
              <span className="hidden flex-1 sm:block" />
            )}
            {next ? (
              <TrackedLink
                href={`/products/${next.slug}`}
                event="product_card_clicked"
                payload={{ slug: next.slug, from: "next" }}
                data-cursor="Next"
                className="flex min-h-11 flex-1 flex-col justify-center border border-line px-5 py-4 text-left hover:border-navy sm:text-right"
              >
                <span className="font-mono-label text-ink-soft">Next →</span>
                <span className="mt-2 type-h3">{next.name}</span>
              </TrackedLink>
            ) : null}
          </div>
          <div className="mx-auto mt-6 max-w-[1440px]" data-reveal-item>
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center font-mono-label text-ink-soft hover:text-navy"
            >
              ← All products
            </Link>
          </div>
        </SectionReveal>
      ) : null}
    </article>
  );
}

function ProductDemoSlot({ product, note }: { product: Product; note?: string }) {
  const story =
    product.slug === "jury-me" ? (
      <ScreeningPreview variant="jury" />
    ) : product.slug === "portfolio-roast" ? (
      <ScreeningPreview variant="roast" />
    ) : product.slug === "brief-me" ? (
      <div className="space-y-10">
        <DraftingPreview />
        <BriefingPreview />
      </div>
    ) : null;

  if (story) {
    return (
      <figure>
        {story}
        {note ? (
          <figcaption className="mt-4 max-w-xl text-sm leading-relaxed text-mist/60">{note}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure>
      {product.cover ? (
        <div className="relative aspect-[4/5] min-h-[240px] w-full overflow-hidden bg-navy md:aspect-[16/10]">
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
            <p className="font-mono-label text-gold">{product.number}</p>
            <p className="mt-4 type-h2">{product.name}</p>
          </div>
        </div>
      )}
      {note ? (
        <figcaption className="mt-4 max-w-xl text-sm leading-relaxed text-mist/60">{note}</figcaption>
      ) : null}
    </figure>
  );
}
