import Link from "next/link";

export default function UpgradeNotice({ slug }: { slug: string }) {
  return (
    <p className="max-w-md text-sm leading-relaxed text-ink-soft">
      This sitting is included in your purchase. For another product,{" "}
      <Link href={`/products/${slug}`} className="underline decoration-gold underline-offset-4">
        return to the product page
      </Link>
      .
    </p>
  );
}
