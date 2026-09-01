import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const MIST = { r: 235, g: 237, b: 227 };
const NAVY = { r: 11, g: 24, b: 73 };

const jobs = [
  ["page-about.png", "public/assets/system-objects/page-about.png", MIST],
  ["page-products.png", "public/assets/system-objects/page-products.png", MIST],
  ["page-contact.png", "public/assets/system-objects/page-contact.png", MIST],
  ["page-notes.png", "public/assets/system-objects/page-notes.png", MIST],
  ["home-about.png", "public/assets/system-objects/home-about.png", MIST],
  ["home-approach.png", "public/assets/system-objects/home-approach.png", NAVY],
  ["home-close.png", "public/assets/system-objects/home-close.png", NAVY],
  ["system-focus.png", "public/assets/system-objects/system-focus.png", MIST],
  ["system-products.png", "public/assets/system-objects/system-products.png", MIST],
  ["system-principles.png", "public/assets/system-objects/system-principles.png", MIST],
  ["system-knowledge.png", "public/assets/system-objects/system-knowledge.png", MIST],
  ["system-teaching.png", "public/assets/system-objects/system-teaching.png", MIST],
  ["system-roadmap.png", "public/assets/system-objects/system-roadmap.png", MIST],
  ["system-archive.png", "public/assets/system-objects/system-archive.png", MIST],
  ["home-hero.png", "public/assets/system-objects/home-hero.png", MIST],
  ["page-system.png", "public/assets/system-objects/page-system.png", MIST],
]

function dist(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function floodBackground(data, width, height, target, threshold = 42) {
  const seeds = [
    0,
    (width - 1) * 4,
    (height - 1) * width * 4,
    ((height - 1) * width + (width - 1)) * 4,
  ];
  const visited = new Uint8Array(width * height);
  const queue = [];

  for (const offset of seeds) {
    queue.push(offset / 4);
    visited[offset / 4] = 1;
  }

  const seedColor = { r: data[0], g: data[1], b: data[2] };

  while (queue.length) {
    const i = queue.pop();
    const o = i * 4;
    const color = { r: data[o], g: data[o + 1], b: data[o + 2] };
    if (dist(color, seedColor) > threshold) continue;

    data[o] = target.r;
    data[o + 1] = target.g;
    data[o + 2] = target.b;
    data[o + 3] = 255;

    const x = i % width;
    const y = (i / width) | 0;
    const neighbors = [];
    if (x > 0) neighbors.push(i - 1);
    if (x < width - 1) neighbors.push(i + 1);
    if (y > 0) neighbors.push(i - width);
    if (y < height - 1) neighbors.push(i + width);
    for (const n of neighbors) {
      if (!visited[n]) {
        visited[n] = 1;
        queue.push(n);
      }
    }
  }
}

const srcDir = "/opt/cursor/artifacts/assets";

for (const [file, dest, target] of jobs) {
  const src = join(srcDir, file);
  const { data, info } = await sharp(src)
    .resize(640, 640)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);
  floodBackground(pixels, info.width, info.height, target);
  mkdirSync(dirname(join("/workspace", dest)), { recursive: true });
  await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(join("/workspace", dest));
  console.log(dest);
}
