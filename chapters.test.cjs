const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('path');
const zlib = require('zlib');
const {chapterFrame} = require('./chapters.js');

test('reduced motion keeps chapter cards static and the home page renders them', () => {
  const still = chapterFrame(1, true);
  assert.equal(still.scale, 1);
  assert.equal(still.radius, 0);
  assert.equal(still.tilt, 0);
  const end = chapterFrame(1, false);
  assert.ok(end.scale < 0.5);
  assert.ok(end.radius >= 24);
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  ['01 · The work', '02 · Teaching', '03 · Say hi', '04 · On repeat'].forEach(label => assert.match(html, new RegExp(label)));
  const css = fs.readFileSync(path.join(__dirname, 'chapters.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, 'chapters.js'), 'utf8');
  assert.match(css, /overflow:\s*clip/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /rs-zen/);
  assert.match(js, /requestAnimationFrame/);
  const gz = zlib.gzipSync(Buffer.concat([Buffer.from(js), Buffer.from(css)])).length;
  assert.ok(gz < 3072, 'gzip ' + gz);
});
