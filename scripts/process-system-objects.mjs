import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const MIST = { r: 235, g: 237, b: 227 };
const PAPER = { r: 245, g: 244, b: 240 };

const jobs = [
  ["work-product-direction.png", "public/assets/work/groups/product-direction.png", MIST],
  ["work-complex-systems.png", "public/assets/work/groups/complex-systems.png", MIST],
  ["work-ai-founder.png", "public/assets/work/groups/ai-founder.png", MIST],
  ["work-enterprise-leadership.png", "public/assets/work/groups/enterprise-leadership.png", MIST],
  ["home-impact.png", "public/assets/system-objects/home-impact.png", PAPER],
  ["home-work.png", "public/assets/system-objects/home-work.png", MIST],
  ["home-principles.png", "public/assets/system-objects/home-principles.png", MIST],
  ["home-lead.png", "public/assets/system-objects/home-lead.png", PAPER],
  ["system-dashboard.png", "public/assets/system-objects/system-dashboard.png", MIST],
  ["system-practice.png", "public/assets/system-objects/system-practice.png", MIST],
  ["system-decisions.png", "public/assets/system-objects/system-decisions.png", MIST],
  ["system-experiments.png", "public/assets/system-objects/system-experiments.png", MIST],
  ["notes-field-note.png", "public/assets/system-objects/notes-field-note.png", MIST],
  ["notes-framework.png", "public/assets/system-objects/notes-framework.png", MIST],
  ["notes-essay.png", "public/assets/system-objects/notes-essay.png", MIST],
  ["studio.png", "public/assets/system-objects/studio.png", MIST],
];

function dist(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function floodBackground(data, width, height, target, threshold = 38) {
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

  const seedColor = {
    r: data[0],
    g: data[1],
    b: data[2],
  };

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
