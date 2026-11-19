const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {thriveProgress, thriveTilt, thriveOverlaps, thriveFrame} = require('./mascot.js');

const root = __dirname;
const js = fs.readFileSync(path.join(root, 'mascot.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'mascot.css'), 'utf8');
const delights = fs.readFileSync(path.join(root, 'delights.css'), 'utf8');

test('scroll progress climbs from the top of the page to the bottom', () => {
  assert.equal(thriveProgress(0, 2000, 800), 0);
  assert.equal(thriveProgress(600, 2000, 800), 0.5);
  assert.equal(thriveProgress(5000, 2000, 800), 1);
  assert.equal(thriveProgress(-20, 900, 900), 0);
});

test('?mascot=0 leaves Thrive off and a real scroll still poses the character', () => {
  assert.equal(thriveFrame({ mascot: '0', scrollY: 100, scrollHeight: 2000, innerHeight: 800 }).off, true);
  const mid = thriveFrame({
    mascot: '1', scrollY: 400, scrollHeight: 2000, innerHeight: 800,
    velocity: 20, idleMs: 0, reduced: false, mobile: false
  });
  assert.equal(mid.off, false);
  assert.equal(mid.progress, thriveProgress(400, 2000, 800));
  assert.ok(mid.classes.includes('is-awake'));
  assert.equal(mid.classes.includes('is-sleep'), false);
  assert.ok(mid.tilt > 0 && mid.tilt <= 14);
});

test('idle sleeps on desktop, peeks on a phone, and the bottom of the page waves', () => {
  const asleep = thriveFrame({
    scrollY: 100, scrollHeight: 4000, innerHeight: 800, idleMs: 8000, mobile: false
  });
  assert.ok(asleep.classes.includes('is-sleep'));
  assert.equal(asleep.tilt, 11);
  const peek = thriveFrame({
    scrollY: 40, scrollHeight: 4000, innerHeight: 800, idleMs: 8200, mobile: true
  });
  assert.ok(peek.classes.includes('is-awake'));
  assert.ok(peek.classes.includes('is-peek'));
  const done = thriveFrame({
    scrollY: 3200, scrollHeight: 4000, innerHeight: 800, idleMs: 9000, mobile: false
  });
  assert.ok(done.classes.includes('is-done'));
  assert.equal(done.classes.includes('is-sleep'), false);
});

test('reduced motion, a closed menu, and an overlapping control keep Thrive still or hidden', () => {
  const still = thriveFrame({
    scrollY: 500, scrollHeight: 2000, innerHeight: 800, velocity: 40,
    idleMs: 9000, reduced: true, cheer: true, mobile: false
  });
  assert.equal(still.tilt, 0);
  assert.ok(still.classes.includes('is-static'));
  assert.equal(still.classes.includes('is-cheer'), false);
  assert.equal(still.classes.includes('is-sleep'), false);
  const menu = thriveFrame({ scrollY: 20, scrollHeight: 2000, innerHeight: 800, menuOpen: true, mobile: true });
  assert.ok(menu.classes.includes('is-hidden'));
  const phone = thriveFrame({ scrollY: 0, scrollHeight: 2000, innerHeight: 800, mobile: true });
  assert.ok(phone.classes.includes('is-hidden'));
  assert.equal(thriveOverlaps({ left: 0, top: 0, right: 40, bottom: 40 }, { left: 20, top: 20, right: 60, bottom: 60 }), true);
  assert.equal(thriveOverlaps({ left: 0, top: 0, right: 20, bottom: 20 }, { left: 30, top: 30, right: 50, bottom: 50 }), false);
  assert.equal(thriveTilt(0), 0);
  assert.equal(thriveTilt(1000), 14);
});

test('mascot files stay self-contained, accessible, and under 10KB', () => {
  const bytes = Buffer.byteLength(js) + Buffer.byteLength(css) + Buffer.byteLength(delights);
  assert.ok(bytes < 10240, 'combined size ' + bytes);
  assert.match(js, /aria-label="Back to top"/);
  assert.match(js, /aria-hidden="true"/);
  assert.match(js, /requestAnimationFrame/);
  assert.match(js, /passive:\s*true/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /get\(["']mascot["']\)/);
  assert.match(js, /dataset\.mascot\s*=\s*["']off["']/);
  assert.match(css, /left:\s*6px|left:\s*8px/);
  assert.match(css, /28px/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /#ffe100/);
  assert.match(css, /is-menu-open|#navigation\.open|\.hx-overlay\.open/);
  assert.match(delights, /\(hover:\s*hover\) and \(pointer:\s*fine\)/);
  assert.match(delights, /prefers-reduced-motion:\s*reduce/);
  assert.match(delights, /scaleX\(0\)/);
  assert.match(delights, /delight-pop/);
  assert.equal(delights.includes('@import'), false);
  assert.equal(js.includes('from \''), false);
});
