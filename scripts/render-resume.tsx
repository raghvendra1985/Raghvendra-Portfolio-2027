import { mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToFile } from "@react-pdf/renderer";
import { PDFParse } from "pdf-parse";
import { ResumeDocument } from "../resume/ResumeDocument";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public");
const outFile = join(outDir, "raghvendra-singh-resume.pdf");

const required = [
  "Raghvendra Singh",
  "Product Design Leader",
  "Nagarro Technology",
  "Rapipay Fintech",
  "Verizon",
  "Crowley Maritime",
  "Sagacito",
  "National Institute of Design",
  "Pearl Academy",
  "hello@raghvendrasingh.com",
  "Delhi NCR",
  "Figma",
  "2023",
  "2019",
];

mkdirSync(outDir, { recursive: true });

async function main() {
  await renderToFile(createElement(ResumeDocument), outFile);

  const data = readFileSync(outFile);
  const parser = new PDFParse({ data });
  const info = await parser.getInfo();
  const extracted = await parser.getText();
  await parser.destroy();

  const pages = info.total;
  const text = extracted.text.replace(/\s+/g, " ");
  const missing = required.filter((token) => !text.includes(token));
  const sizeKb = Math.round(statSync(outFile).size / 1024);

  if (pages !== 2) {
    throw new Error(`Resume must be exactly 2 pages, got ${pages}`);
  }
  if (missing.length) {
    throw new Error(`Resume text extraction missing: ${missing.join(", ")}`);
  }

  console.log(`Wrote ${outFile}`);
  console.log(`QA: ${pages} pages · ${sizeKb} KB · selectable text OK`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
