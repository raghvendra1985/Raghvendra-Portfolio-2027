"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function ProductViewTracker({
  slug,
  productId,
}: {
  slug: string;
  productId: string;
}) {
  useEffect(() => {
    track("product_view", { slug, productId });
  }, [slug, productId]);
  return null;
}
