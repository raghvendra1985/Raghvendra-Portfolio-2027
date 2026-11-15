import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist', import.meta.url));

// Directories that contain non-navigational HTML (print worksheets, backups)
// These are excluded from IA landmark / anchor checking
const SKIP_DIRS = ['/downloads', '/assets/_backup'];

async function getHtmlFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    const relFull = full.replace(root, '');
    if (entry.isDirectory()) {
      // Skip non-navigational directories
      if (SKIP_DIRS.some(d => relFull.startsWith(d))) continue;
      files.push(...await getHtmlFiles(full));
    } else if (entry.isFile() && extname(entry.name) === '.html') {
      files.push(full);
    }
  }
  return files;
}

async function runIATest() {
  console.log('Testing IA integrity across compiled dist directory...');
  const htmlFiles = await getHtmlFiles(root);
  console.log(`Found ${htmlFiles.length} HTML pages to audit.`);

  const pageIds = new Map();
  const allLinks = [];
  const issues = [];
  let navCount = 0;

  // Pass 1: Parse IDs and Links from each page
  for (const file of htmlFiles) {
    const relPath = file.replace(root, '');
    const html = await readFile(file, 'utf8');

    // Collect IDs
    const ids = new Set();
    const idMatches = html.matchAll(/\sid="([^"]+)"/g);
    for (const m of idMatches) ids.add(m[1]);
    pageIds.set(relPath, ids);

    // Check Landmarks
    const hasHeader = html.includes('<header');
    const hasNav = html.includes('<nav');
    const hasMain = html.includes('<main');
    const hasFooter = html.includes('<footer');
    const h1Count = (html.match(/<h1[\s>]/g) || []).length;

    if (!hasMain) issues.push({ file: relPath, type: 'missing-landmark', msg: 'Missing <main> landmark' });
    if (h1Count === 0) issues.push({ file: relPath, type: 'h1', msg: 'Missing <h1> tag' });
    if (h1Count > 1) issues.push({ file: relPath, type: 'h1', msg: `Multiple <h1> tags (${h1Count})` });

    // Collect internal <a href> navigation links only (not <link> stylesheet hrefs)
    // Match only <a href="..."> to avoid picking up CSS/font link elements
    const linkMatches = html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g);
    for (const m of linkMatches) {
      const href = m[1];
      // Skip external, mailto, tel, javascript, and query-string-only (JS-handled) URLs
      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('javascript:') ||
        href.includes('?') // query-string routes are JS-handled, not static files
      ) {
        continue;
      }
      allLinks.push({ source: relPath, href });
    }
  }

  // Pass 2: Verify link targets and anchor fragments
  let checkedLinks = 0;
  for (const { source, href } of allLinks) {
    checkedLinks++;
    const [pathPart, hashPart] = href.split('#');

    let targetFile;
    if (!pathPart || pathPart === '') {
      // Same-page anchor
      targetFile = source;
    } else if (pathPart.startsWith('/')) {
      const cleanPath = pathPart.replace(/\/$/, '');
      if (cleanPath === '') {
        targetFile = '/index.html';
      } else {
        targetFile = cleanPath.endsWith('.html') ? cleanPath : `${cleanPath}/index.html`;
      }
    } else {
      // Relative path
      const currentDir = source.substring(0, source.lastIndexOf('/'));
      const resolved = resolve(currentDir, pathPart).replace(resolve(root, '..'), '');
      targetFile = resolved.endsWith('.html') ? resolved : `${resolved}/index.html`;
    }

    // Check if target file exists
    const idsOnTarget = pageIds.get(targetFile);
    if (!idsOnTarget) {
      // Check if it's an asset or download
      try {
        await stat(join(root, pathPart));
      } catch (e) {
        issues.push({ source, href, type: 'broken-link', msg: `Destination file not found: ${targetFile}` });
      }
      continue;
    }

    // Check anchor if present
    if (hashPart && !idsOnTarget.has(hashPart)) {
      issues.push({ source, href, type: 'broken-anchor', msg: `Anchor #${hashPart} not found in ${targetFile}` });
    }
  }

  console.log(`Audited ${checkedLinks} internal links across ${htmlFiles.length} pages.`);

  if (issues.length > 0) {
    console.error(`\nFound ${issues.length} IA issues:`);
    issues.forEach(i => console.error(`  - [${i.type}] in ${i.source || i.file}: ${i.msg} (${i.href || ''})`));
    process.exit(1);
  } else {
    console.log(`\n✔ All ${htmlFiles.length} pages have valid landmarks and exactly 1 H1.`);
    console.log(`✔ All ${checkedLinks} internal links and anchor hashes resolve with 100% integrity.`);
    console.log(`✔ Zero broken routes or dangling anchors detected.`);
  }
}

runIATest();
