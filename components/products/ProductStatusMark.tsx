import type { ProductStatus } from "@/products";

const labels: Record<ProductStatus, string> = {
  live: "Live",
  "coming-soon": "Coming soon",
  private: "Private",
  hidden: "Hidden",
};

export default function ProductStatusMark({
  status,
  inverted = false,
}: {
  status: ProductStatus;
  inverted?: boolean;
}) {
  if (status === "hidden" || status === "private") return null;

  const live = status === "live";
  return (
    <p
      className={`font-mono-label ${
        live
          ? inverted
            ? "text-gold"
            : "text-green"
          : inverted
            ? "text-mist/55"
            : "text-ink-soft"
      }`}
    >
      {labels[status]}
    </p>
  );
}
