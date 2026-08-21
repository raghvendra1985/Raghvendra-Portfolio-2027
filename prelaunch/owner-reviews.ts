import { requireAdminClient } from "@/lib/supabase/admin";
import { upsertCatalogProduct } from "@/lib/commerce/fulfill";
import { getProductById, products } from "@/products";

export type OwnerReview = {
  productId: string;
  reviewed: boolean;
  approvedForSale: boolean;
  reviewedAt: string | null;
  approvedAt: string | null;
  reviewerEmail: string | null;
};

function emptyReview(productId: string): OwnerReview {
  return {
    productId,
    reviewed: false,
    approvedForSale: false,
    reviewedAt: null,
    approvedAt: null,
    reviewerEmail: null,
  };
}

export async function loadOwnerReviews(): Promise<Map<string, OwnerReview>> {
  const map = new Map(products.map((product) => [product.id, emptyReview(product.id)]));
  try {
    const admin = requireAdminClient();
    const { data, error } = await admin
      .from("product_owner_reviews")
      .select("product_id, reviewed, approved_for_sale, reviewed_at, approved_at, reviewer_email");
    if (error || !data) return map;
    for (const row of data) {
      map.set(row.product_id, {
        productId: row.product_id,
        reviewed: Boolean(row.reviewed),
        approvedForSale: Boolean(row.approved_for_sale),
        reviewedAt: row.reviewed_at,
        approvedAt: row.approved_at,
        reviewerEmail: row.reviewer_email,
      });
    }
  } catch {
    return map;
  }
  return map;
}

export async function upsertOwnerReview(input: {
  productId: string;
  reviewed?: boolean;
  approvedForSale?: boolean;
  reviewerEmail: string;
}) {
  const product = getProductById(input.productId);
  if (!product) throw new Error("Unknown product");
  const admin = requireAdminClient();
  await upsertCatalogProduct(admin, product);

  const current = (await loadOwnerReviews()).get(product.id) ?? emptyReview(product.id);
  const reviewed = input.reviewed ?? current.reviewed;
  const approvedForSale = input.approvedForSale ?? current.approvedForSale;
  const now = new Date().toISOString();

  const next = {
    product_id: product.id,
    reviewed: approvedForSale ? true : reviewed,
    approved_for_sale: approvedForSale,
    reviewed_at: approvedForSale || reviewed ? (current.reviewedAt ?? now) : null,
    approved_at: approvedForSale ? now : null,
    reviewer_email: input.reviewerEmail,
    updated_at: now,
  };

  const { error } = await admin.from("product_owner_reviews").upsert(next, { onConflict: "product_id" });
  if (error) throw error;
  return next;
}
