const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('path');

function lin(channel) {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function contrast(a, b) {
  const L = hex => {
    const n = parseInt(hex.slice(1), 16);
    return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  };
  const [hi, lo] = [L(a), L(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

test('dark palette text clears WCAG and the footer logo is not a white slab', () => {
  assert.ok(contrast('#A9AEB8', '#111214') >= 4.5);
  assert.ok(contrast('#F5F5F7', '#111214') >= 4.5);
  assert.ok(contrast('#111214', '#ffe100') >= 4.5);
  assert.ok(contrast('#ffe100', '#111214') >= 3);
  const css = fs.readFileSync(path.join(__dirname, 'dark-mode.css'), 'utf8');
  assert.match(css, /html\[data-theme="dark"\] \.teaching-lead/);
  assert.match(css, /logo-footer-transparent\.png/);
  assert.doesNotMatch(css, /brightness\(0\) invert\(0\.95\)/);
});
