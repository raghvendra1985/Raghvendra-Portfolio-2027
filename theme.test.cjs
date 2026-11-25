const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {themeFromStorage, themeToggle, zenToggle, zenAfterKey, PILOT_HREF} = require('./theme.js');

const css = fs.readFileSync(path.join(__dirname, 'theme.css'), 'utf8');
const boot = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

test('first visit is light and a stored choice wins', () => {
  assert.equal(themeFromStorage(null), 'light');
  assert.equal(themeFromStorage(''), 'light');
  assert.equal(themeFromStorage('nope'), 'light');
  assert.equal(themeFromStorage('dark'), 'dark');
  assert.equal(themeToggle('light'), 'dark');
  assert.equal(themeToggle('dark'), 'light');
  assert.match(boot, /rs_theme_v1/);
  assert.match(boot, /dataset\.theme/);
});

test('zen toggles, Escape exits, and the pilot link is the Razorpay URL', () => {
  assert.equal(zenToggle(false), true);
  assert.equal(zenToggle(true), false);
  assert.equal(zenAfterKey(true, 'Escape'), false);
  assert.equal(zenAfterKey(true, 'Enter'), true);
  assert.equal(PILOT_HREF, 'https://rzp.io/rzp/O9NhPGpb');
  assert.match(css, /aria-pressed|rs-zen/);
  assert.match(css, /html\.rs-zen \.rs-zen\{opacity:1;pointer-events:auto\}/);
  assert.match(css, /max-width:760px/);
  assert.match(css, /\.short\{display:inline\}/);
});
