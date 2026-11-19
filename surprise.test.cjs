const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('zlib');
const {surpriseGate, surpriseLine, surpriseOnKey, LINES, KEY} = require('./surprise.js');

test('the box waits, shows once, and a review param forces it', () => {
  assert.equal(KEY, 'rs_surprise_seen_v1');
  assert.equal(surpriseGate({progress: 0, elapsed: 0}), false);
  assert.equal(surpriseGate({progress: 0.4, elapsed: 0}), true);
  assert.equal(surpriseGate({progress: 0, elapsed: 20000}), true);
  assert.equal(surpriseGate({progress: 0.8, coach: true}), false);
  assert.equal(surpriseGate({progress: 0.8, seen: true}), false);
  assert.equal(surpriseGate({seen: true, coach: true, force: true}), true);
  assert.ok(LINES.length >= 4 && LINES.length <= 6);
  assert.match(surpriseLine(0).title, /<mark>far<\/mark>/);
});

test('Escape closes and motion can fade instead of slide', () => {
  assert.equal(surpriseOnKey(true, 'Escape'), 'close');
  assert.equal(surpriseOnKey(true, 'Tab'), '');
  assert.equal(surpriseOnKey(false, 'Escape'), '');
  const css = fs.readFileSync(path.join(__dirname, 'surprise.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, 'surprise.js'), 'utf8');
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(js, /coach-mark/);
  assert.match(js, /et-tour-pill/);
  const gz = zlib.gzipSync(Buffer.concat([Buffer.from(js), Buffer.from(css)])).length;
  assert.ok(gz < 4096, 'gzip ' + gz);
});
