import assert from "node:assert/strict";
import test from "node:test";
import { createHmac, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function verifyCheckout(orderId, paymentId, signature, secret) {
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

function verifyWebhook(body, signature, secret) {
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

test("catalog has 13 products with delivery types", () => {
  const source = readFileSync(join(root, "products/index.ts"), "utf8");
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(slugs.length, 13);
  assert.match(source, /deliveryBySlug/);
});

test("implementation matrix covers all 13 catalog slugs", () => {
  const catalog = readFileSync(join(root, "products/index.ts"), "utf8");
  const matrix = readFileSync(join(root, "products/matrix.ts"), "utf8");
  const catalogSlugs = [...catalog.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]).sort();
  const matrixSlugs = [...matrix.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]).sort();
  assert.equal(matrixSlugs.length, 13);
  assert.deepEqual(matrixSlugs, catalogSlugs);
  assert.match(matrix, /canSwitchToLive/);
});

test("100 design prompts", () => {
  const source = readFileSync(join(root, "products/runtime/prompts.ts"), "utf8");
  const prompts = [...source.matchAll(/^\s+"[^"]+",$/gm)];
  assert.equal(prompts.length, 100);
});

test("checkout signature rejects tampering", () => {
  const signature = createHmac("sha256", "test_secret").update("order_1|pay_1").digest("hex");
  assert.equal(verifyCheckout("order_1", "pay_1", signature, "test_secret"), true);
  assert.equal(verifyCheckout("order_1", "pay_1", "aa", "test_secret"), false);
});

test("webhook signature", () => {
  const body = '{"event":"payment.captured"}';
  const signature = createHmac("sha256", "whsec").update(body).digest("hex");
  assert.equal(verifyWebhook(body, signature, "whsec"), true);
  assert.equal(verifyWebhook(body, "nope", "whsec"), false);
});
