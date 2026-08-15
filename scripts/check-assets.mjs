import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skip = new Set(["node_modules", ".next", ".git"]);
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) files.push(full);
  }
}

walk(root);
const re = /["'`](\/assets\/[^"'`]+)["'`]/g;
const seen = new Set();
const missing = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(re)) {
    const asset = match[1];
    if (seen.has(asset)) continue;
    seen.add(asset);
    if (!existsSync(join(root, "public", asset))) {
      missing.push(`${asset}  (${relative(root, file)})`);
    }
  }
}

console.log(`Referenced /assets/ paths: ${seen.size}`);
if (missing.length) {
  console.error(`Missing on disk:\n${missing.join("\n")}`);
  process.exit(1);
}
console.log("All referenced /assets/ files exist.");
