const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(__dirname + '/coach.js', 'utf8');
const context = { URLSearchParams };
vm.runInNewContext(source, context);
const coach = context.RSCoach;

function memory(initial) {
  const store = new Map(initial || []);
  return {
    getItem(key) { return store.has(key) ? store.get(key) : null; },
    setItem(key, value) { store.set(key, value); }
  };
}

function idle(extra) {
  return Object.assign({
    home: true,
    intro: false,
    tour: false,
    delayElapsed: true,
    force: false,
    seen: false,
    scrolled: false,
    clicked: false
  }, extra);
}

test('a first visit is remembered only after finish or skip', () => {
  const store = memory();
  assert.equal(coach.hasSeen(store), false);
  assert.equal(coach.KEY, 'rs_coach_seen_v1');
  assert.equal(coach.completes('next', 0, 4), false);
  assert.equal(coach.completes('next', 1, 3), false);
  assert.equal(coach.hasSeen(store), false);
  assert.equal(coach.completes('next', 3, 4), true);
  coach.markSeen(store);
  assert.equal(store.getItem('rs_coach_seen_v1'), '1');
  assert.equal(coach.hasSeen(store), true);
  assert.equal(coach.completes('skip', 0, 4), true);
  assert.equal(coach.completes('escape', 1, 4), true);
  assert.equal(coach.completes('outside', 2, 3), true);
});

test('once seen, the walkthrough stays hidden unless ?coach=1', () => {
  const store = memory();
  coach.markSeen(store);
  assert.equal(coach.shouldStart(idle({ seen: coach.hasSeen(store) })), false);
  assert.equal(coach.forced(''), false);
  assert.equal(coach.forced('?tour=1'), false);
  assert.equal(coach.forced('?coach=0'), false);
  assert.equal(coach.forced('?x=1&coach=1'), true);
  assert.equal(coach.forced('?coach=1#work'), true);
  assert.equal(coach.shouldStart(idle({ seen: true, force: true })), true);
  assert.equal(coach.shouldStart(idle()), true);
});

test('scroll, click, the intro, and the tour hold the first showing', () => {
  assert.equal(coach.shouldStart(idle({ scrolled: true })), false);
  assert.equal(coach.shouldStart(idle({ clicked: true })), false);
  assert.equal(coach.shouldStart(idle({ intro: true })), false);
  assert.equal(coach.shouldStart(idle({ tour: true })), false);
  assert.equal(coach.shouldStart(idle({ delayElapsed: false })), false);
  assert.equal(coach.shouldStart(idle({ home: false })), false);
  assert.equal(coach.shouldStart(idle({ scrolled: true, force: true })), true);
  assert.equal(coach.shouldStart(idle({ clicked: true, force: true })), true);
  assert.equal(coach.shouldStart(idle({ intro: true, force: true })), false);
  assert.equal(coach.shouldStart(idle({ tour: true, force: true })), false);
  assert.equal(coach.DELAY, 1500);
});

test('reduced motion does not block the walkthrough', () => {
  assert.equal(coach.prefersReduced(true, 'false'), true);
  assert.equal(coach.prefersReduced(false, 'true'), true);
  assert.equal(coach.prefersReduced(false, 'false'), false);
  assert.equal(coach.shouldStart(idle()), true);
});

test('a blocked store does not throw and counts as unseen', () => {
  const blocked = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); }
  };
  assert.equal(coach.hasSeen(blocked), false);
  assert.doesNotThrow(() => coach.markSeen(blocked));
});

test('missing anchors are dropped and the rest stay in order', () => {
  assert.equal(coach.pickSteps(['work', 'menu', 'tour']).join(','), 'menu,tour,work');
  assert.equal(coach.pickSteps(['tour', 'recruiter', 'work']).join(','), 'tour,recruiter,work');
  const hiddenMenu = {
    hidden: false,
    textContent: 'Menu',
    getAttribute(name) { return name === 'aria-hidden' ? null : null; },
    closest(sel) { return sel.indexOf('aria-hidden') >= 0 ? { hidden: true } : null; }
  };
  const tour = { hidden: false, textContent: '60-sec tour', getAttribute() { return null; }, closest() { return null; } };
  const recruiter = { hidden: false, textContent: 'Recruiter View (30s)', getAttribute() { return null; }, closest() { return null; } };
  const work = { hidden: false, textContent: 'Selected Work', getAttribute() { return null; }, closest() { return null; } };
  const found = {
    'button.menu': [hiddenMenu],
    '[aria-controls="navigation"]': [hiddenMenu],
    '#et-tour-pill': [tour],
    '#open-drawer-btn': [recruiter],
    '#work .hx-work-header': [work]
  };
  const doc = { querySelectorAll(sel) { return found[sel] || []; } };
  const steps = coach.resolveSteps(doc);
  assert.equal(steps.map((step) => step.id).join(','), 'tour,recruiter,work');
  const visibleMenu = {
    hidden: false,
    textContent: 'Menu',
    getAttribute() { return null; },
    closest() { return null; }
  };
  found['.hn-menu'] = [visibleMenu];
  assert.equal(coach.resolveSteps(doc).map((step) => step.id).join(','), 'menu,tour,recruiter,work');
});

test('bubbles stay inside a 390px and a 1280px viewport', () => {
  const phone = coach.place(
    { top: 780, left: 250, width: 124, height: 44, prefer: 'above' },
    { width: 320, height: 168 },
    { width: 390, height: 844, margin: 12 }
  );
  assert.ok(phone.left >= 12);
  assert.ok(phone.left + phone.width <= 378);
  assert.ok(phone.top >= 12);
  assert.ok(phone.top + 168 <= 780);

  const desk = coach.place(
    { top: 18, left: 1000, width: 180, height: 40, prefer: 'below' },
    { width: 320, height: 160 },
    { width: 1280, height: 800, margin: 12 }
  );
  assert.equal(desk.top, 70);
  assert.ok(desk.left >= 12);
  assert.ok(desk.left + desk.width <= 1268);

  const wide = coach.place(
    { top: 200, left: 32, width: 1216, height: 120, prefer: 'below' },
    { width: 320, height: 160 },
    { width: 1280, height: 800, margin: 12 }
  );
  assert.equal(wide.top, 332);
  assert.ok(wide.left >= 800, 'wide sections keep the bubble off the heading');
  assert.ok(wide.left + wide.width <= 1268);

  const tight = coach.place(
    { top: 20, left: 20, width: 80, height: 36, prefer: 'above' },
    { width: 320, height: 180 },
    { width: 390, height: 700, margin: 12 }
  );
  assert.ok(tight.top >= 12);
  assert.ok(tight.top + 180 <= 688);
  assert.ok(tight.left >= 12);
  assert.ok(tight.left + tight.width <= 378);
});

test('the home page includes the coach files and nothing else owns the storage key', () => {
  const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
  assert.match(html, /href="\/coach\.css"/);
  assert.match(html, /src="\/coach\.js"/);
  assert.match(html, /src="\/direction-nav\.js"/);
  const nav = fs.readFileSync(__dirname + '/direction-nav.js', 'utf8');
  assert.match(nav, /setAttribute\('data-coach-anchor', 'menu'\)/);
  const css = fs.readFileSync(__dirname + '/coach.css', 'utf8');
  assert.match(css, /#1B1D22/);
  assert.match(css, /#111214/);
  assert.match(css, /#F5F5F7/);
  assert.match(css, /#A9AEB8/);
  assert.match(css, /#ffe100/);
  assert.match(css, /160ms ease/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  const zlib = require('node:zlib');
  const raw = Buffer.byteLength(source) + Buffer.byteLength(css);
  const gzip = zlib.gzipSync(Buffer.concat([Buffer.from(source), Buffer.from(css)])).length;
  assert.ok(gzip < 6144, 'gzipped coach.js + coach.css are ' + gzip + ' bytes (raw ' + raw + ')');
});
