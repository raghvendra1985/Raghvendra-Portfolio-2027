import type { Metadata } from "next";
import Link from "next/link";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import { products } from "@/products";
import { studentPath } from "@/prelaunch/funnels";

export const metadata: Metadata = {
  title: "Student funnel · Pre-Launch",
  robots: { index: false, follow: false },
};

export default function StudentPrelaunchPage() {
  const first = products[0];
  return (
    <PrelaunchShell
      title="Student Funnel"
      deck="Walk homepage → products → category → detail → demo → simulated purchase → access. Do not use live Razorpay."
    >
      <ol className="mt-10 space-y-3 text-sm">
        <li>
          1. <Link href="/" className="underline decoration-gold underline-offset-4">Homepage</Link>
        </li>
        <li>
          2. <Link href="/products" className="underline decoration-gold underline-offset-4">Products</Link>
        </li>
        <li>
          3. Product category shelves on /products (Featured, Quick Tools, Practice, Coming Soon)
        </li>
        <li>
          4. Product detail — start with{" "}
          <Link href={`/products/${first.slug}`} className="underline decoration-gold underline-offset-4">
            {first.name}
          </Link>
        </li>
        <li>
          5. Product demo — sales-page preview, then{" "}
          <Link href="/admin/prelaunch/products" className="underline decoration-gold underline-offset-4">
            Product Lab Open Demo
          </Link>
        </li>
        <li>
          6.{" "}
          <Link href="/admin/prelaunch/commerce" className="underline decoration-gold underline-offset-4">
            Purchase simulation
          </Link>{" "}
          (no real payment)
        </li>
        <li>
          7.{" "}
          <Link href="/admin/prelaunch/library" className="underline decoration-gold underline-offset-4">
            Product access / library
          </Link>
        </li>
      </ol>

      <h2 className="mt-16 type-h3">Evidence</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {studentPath.map((item) => (
          <li key={item.id} className="py-5">
            <p className="font-mono-label">{item.verdict}</p>
            <p className="mt-2 type-h3">{item.label}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">{item.evidence}</p>
            {item.missing ? <p className="mt-2 max-w-3xl text-sm text-green">{item.missing}</p> : null}
          </li>
        ))}
      </ul>
    </PrelaunchShell>
  );
}
