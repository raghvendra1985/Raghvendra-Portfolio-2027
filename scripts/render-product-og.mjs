import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "products/index.ts"), "utf8");

const WIDTH = 1200;
const HEIGHT = 630;

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapWords(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function parseProducts(text) {
  const products = [];
  const re =
    /slug:\s*"([^"]+)"[\s\S]*?number:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?hook:\s*"([^"]+)"/g;
  for (const match of text.matchAll(re)) {
    products.push({
      slug: match[1],
      number: match[2],
      name: match[3],
      hook: match[4],
    });
  }
  return products;
}

function gridLines() {
  const lines = [];
  for (let x = 0; x <= WIDTH; x += 80) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}"/>`);
  }
  for (let y = 0; y <= HEIGHT; y += 80) {
    lines.push(`<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}"/>`);
  }
  return lines.join("");
}

function ogSvg({ number, name, hook }) {
  const nameLines = wrapWords(name, 22);
  const hookLines = wrapWords(hook, 42);
  const nameStart = 268;
  const hookStart = nameStart + 88 + (nameLines.length - 1) * 72;

  const nameMarkup = nameLines
    .map(
      (line, index) =>
        `<text x="80" y="${nameStart + index * 72}" font-family="Georgia, serif" font-size="64" fill="#EBEDE3">${escapeXml(line)}</text>`,
    )
    .join("");

  const hookMarkup = hookLines
    .map(
      (line, index) =>
        `<text x="80" y="${hookStart + index * 36}" font-family="ui-monospace, Menlo, monospace" font-size="24" fill="#EBEDE3" fill-opacity="0.7">${escapeXml(line)}</text>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0B1849"/>
  <g stroke="#EBEDE3" stroke-opacity="0.08" fill="none">${gridLines()}</g>
  <rect x="80" y="64" width="64" height="6" fill="#E4B028"/>
  <text x="80" y="140" font-family="ui-monospace, Menlo, monospace" font-size="22" letter-spacing="8" fill="#E4B028">${escapeXml(number)}</text>
  <text x="80" y="176" font-family="ui-monospace, Menlo, monospace" font-size="14" letter-spacing="6" fill="#EBEDE3" fill-opacity="0.45">SECRET PRODUCTS</text>
  ${nameMarkup}
  ${hookMarkup}
  <text x="80" y="574" font-family="ui-monospace, Menlo, monospace" font-size="14" letter-spacing="3" fill="#EBEDE3" fill-opacity="0.4">BY RAGHVENDRA SINGH</text>
</svg>`;
}

const products = parseProducts(source);
if (products.length !== 13) {
  console.error(`Expected 13 products, parsed ${products.length}`);
  process.exit(1);
}

for (const product of products) {
  const dir = join(root, "public/assets/products", product.slug);
  mkdirSync(dir, { recursive: true });
  const pngPath = join(dir, "og.png");
  const svg = ogSvg(product);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(pngPath);
  console.log(`Wrote ${product.slug}/og.png`);
}

console.log(`Rendered ${products.length} product OG images at ${WIDTH}×${HEIGHT}.`);
