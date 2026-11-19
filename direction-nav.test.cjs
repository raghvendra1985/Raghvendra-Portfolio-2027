const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(__dirname + '/direction-nav.js', 'utf8');
const sandbox = {};
vm.runInNewContext(source, sandbox);
const dn = sandbox.DNNav;

function el(tag, opts) {
  opts = opts || {};
  const node = {
    tag: tag,
    hidden: !!opts.hidden,
    id: opts.id || '',
    className: opts.className || '',
    attrs: Object.assign({}, opts.attrs),
    children: [],
    parentElement: null,
    style: { setProperty: function () {}, transformOrigin: '' },
    dataset: Object.assign({}, opts.dataset),
    text: opts.text || '',
    classList: null,
    ownerDocument: null
  };
  const classes = new Set((node.className || '').split(/\s+/).filter(Boolean));
  node.classList = {
    contains: function (c) { return classes.has(c); },
    add: function (c) { classes.add(c); node.className = [...classes].join(' '); },
    remove: function (c) { classes.delete(c); node.className = [...classes].join(' '); },
    toggle: function (c, on) {
      const next = on === undefined ? !classes.has(c) : on;
      if (next) classes.add(c); else classes.delete(c);
      node.className = [...classes].join(' ');
      return next;
    }
  };
  node.setAttribute = function (k, v) { node.attrs[k] = String(v); };
  node.getAttribute = function (k) { return Object.prototype.hasOwnProperty.call(node.attrs, k) ? node.attrs[k] : null; };
  node.removeAttribute = function (k) { delete node.attrs[k]; };
  node.appendChild = function (child) { child.parentElement = node; node.children.push(child); return child; };
  node.querySelector = function (sel) { return node.querySelectorAll(sel)[0] || null; };
  node.querySelectorAll = function (sel) {
    const out = [];
    walk(node, function (n) { if (n !== node && matches(n, sel)) out.push(n); });
    return out;
  };
  node.closest = function (sel) {
    let n = node;
    while (n) { if (matches(n, sel)) return n; n = n.parentElement; }
    return null;
  };
  node.contains = function (other) {
    let n = other;
    while (n) { if (n === node) return true; n = n.parentElement; }
    return false;
  };
  node.getClientRects = function () { return node.hidden ? [] : [1]; };
  node.getBoundingClientRect = function () { return { left: 800, top: 20, right: 880, bottom: 64, width: 80, height: 44 }; };
  node.focus = function () { if (node.ownerDocument) node.ownerDocument.activeElement = node; };
  node.click = function () {};
  return node;
}

function walk(node, fn) {
  fn(node);
  (node.children || []).forEach(function (child) { walk(child, fn); });
}

function matches(node, sel) {
  if (sel === '.dn-grow-panel.is-open') return node.classList.contains('dn-grow-panel') && node.classList.contains('is-open');
  if (sel === '.dn-grow-panel.is-open, .dn-grow-panel.is-closing') return node.classList.contains('dn-grow-panel') && (node.classList.contains('is-open') || node.classList.contains('is-closing'));
  if (sel === '.dn-stagger') return node.classList.contains('dn-stagger');
  if (sel === '[data-dn-close]') return node.attrs && Object.prototype.hasOwnProperty.call(node.attrs, 'data-dn-close');
  if (sel === '.hn-bar') return node.classList.contains('hn-bar');
  if (sel === '.dn-backdrop') return node.classList.contains('dn-backdrop');
  if (sel === 'main') return node.tag === 'main';
  if (sel === '.case-chapters a[href^="#"]') return node.tag === 'a' && node.classList.contains('chapter') && String(node.attrs.href || '').startsWith('#');
  if (sel === 'section[id]') return node.tag === 'section' && !!node.id;
  if (sel === 'h1, h2, h3') return node.tag === 'h2' || node.tag === 'h1' || node.tag === 'h3';
  if (sel === 'section[id]') return node.tag === 'section' && node.id;
  if (sel === '[hidden], [aria-hidden="true"]') return node.hidden || node.getAttribute('aria-hidden') === 'true';
  if (sel === '[aria-hidden="true"]') return node.getAttribute('aria-hidden') === 'true';
  if (sel === '[hidden]') return !!node.hidden;
  if (sel === 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') {
    return node.tag === 'a' || node.tag === 'button';
  }
  return false;
}

function docWith(bodyChildren) {
  const body = el('body');
  const html = el('html');
  const doc = {
    body: body,
    documentElement: html,
    activeElement: null,
    byId: {},
    querySelector: function (sel) { return body.querySelector(sel); },
    querySelectorAll: function (sel) { return body.querySelectorAll(sel); },
    getElementById: function (id) { return doc.byId[id] || null; }
  };
  body.ownerDocument = doc;
  html.ownerDocument = doc;
  bodyChildren.forEach(function (child) {
    body.appendChild(child);
    walk(child, function (n) { n.ownerDocument = doc; if (n.id) doc.byId[n.id] = n; });
  });
  return doc;
}

test('nav hides only after a downward scroll past 40% of the hero, and returns on the way up', function () {
  const hero = { heroBottom: 500, heroHeight: 800 };
  assert.equal(dn.shouldHideNav(Object.assign({}, hero, { scrollY: 40, previousY: 10, wasHidden: false })), false);
  assert.equal(dn.shouldHideNav(Object.assign({}, hero, { scrollY: 200, previousY: 180, wasHidden: false })), false);
  const past = { heroBottom: 200, heroHeight: 800 };
  assert.equal(dn.shouldHideNav(Object.assign({}, past, { scrollY: 400, previousY: 360, wasHidden: false })), true);
  assert.equal(dn.shouldHideNav(Object.assign({}, past, { scrollY: 380, previousY: 400, wasHidden: true })), false);
  assert.equal(dn.shouldHideNav(Object.assign({}, past, { scrollY: 70, previousY: 90, wasHidden: true })), false);
  assert.equal(dn.shouldHideNav(Object.assign({}, past, { scrollY: 400, previousY: 400, wasHidden: true })), true);
  assert.equal(dn.headerHidden(Object.assign({}, past, { scrollY: 400, previousY: 360, wasHidden: false, menuOpen: true })), false);
});

test('scroll spy uses the middle 10% band and picks the section most inside it', function () {
  assert.equal(dn.SPY_ROOT_MARGIN, '-45% 0px -45% 0px');
  assert.equal(dn.sectionInBand([
    { id: 'work', isIntersecting: false, intersectionRatio: 0 },
    { id: 'teaching', isIntersecting: true, intersectionRatio: 0.2 },
    { id: 'about', isIntersecting: true, intersectionRatio: 0.9 }
  ]), 'about');
  assert.equal(dn.sectionInBand([{ id: 'work', isIntersecting: false, intersectionRatio: 0 }]), '');
});

test('rail stays hidden until a page has enough real sections', function () {
  assert.equal(dn.MIN_SECTIONS, 3);
  assert.equal(dn.railEnabled([{ id: 'a' }, { id: 'b' }]), false);
  assert.equal(dn.railEnabled([{ id: 'a' }, { id: 'b' }, { id: 'c' }]), true);
});

test('menu open moves focus to close, traps tab, and close returns focus to the trigger', function () {
  const trigger = el('button', { className: 'dn-menu-btn' });
  const close = el('button', { attrs: { 'data-dn-close': '' } });
  const link = el('a', { className: 'dn-stagger', attrs: { href: '/work/' } });
  const panel = el('div', { className: 'dn-grow-panel', dataset: { kind: 'drop' } });
  panel.appendChild(close);
  panel.appendChild(link);
  const bar = el('div', { className: 'hn-bar' });
  const backdrop = el('div', { className: 'dn-backdrop', hidden: true });
  const doc = docWith([bar, backdrop, panel, trigger]);
  let queued = null;
  doc.defaultView = {
    requestAnimationFrame: function (fn) { fn(); },
    setTimeout: function (fn) { queued = fn; return 1; },
    matchMedia: function () { return { matches: false }; },
    scrollY: 0,
    innerWidth: 1280,
    innerHeight: 800
  };
  panel.offsetWidth = 320;
  panel.offsetHeight = 240;
  const focused = dn.openGrow(panel, trigger);
  assert.equal(focused, close);
  assert.equal(doc.activeElement, close);
  assert.equal(trigger.getAttribute('aria-expanded'), 'true');
  assert.equal(doc.body.classList.contains('is-menu-open'), true);
  assert.equal(panel.classList.contains('is-open'), true);
  assert.equal(panel.hidden, false);
  const event = { key: 'Tab', shiftKey: false, preventDefault: function () { event.defaulted = true; } };
  doc.activeElement = link;
  assert.equal(dn.trapTab(event, panel, trigger), true);
  assert.equal(event.defaulted, true);
  assert.equal(doc.activeElement, trigger);
  dn.closeGrow(panel);
  assert.equal(panel.classList.contains('is-open'), false);
  assert.equal(trigger.getAttribute('aria-expanded'), 'false');
  queued();
  assert.equal(panel.hidden, true);
  assert.equal(doc.body.classList.contains('is-menu-open'), false);
  assert.equal(doc.activeElement, trigger);
});

test('work and knowledge menus list real pages and no invented metrics', function () {
  assert.equal(dn.WORK[0].href, '/work/');
  dn.WORK.slice(1).forEach(function (item) {
    assert.equal(fs.existsSync(path.join(__dirname, item.href, 'index.html')), true, item.href);
    assert.equal(/\d+%|\d+M\+/.test(item.title), false, item.title);
  });
  assert.equal(dn.KNOWLEDGE[0].href, '/resources/');
  dn.KNOWLEDGE.slice(1).forEach(function (item) {
    assert.equal(fs.existsSync(path.join(__dirname, item.href, 'index.html')), true, item.href);
  });
  assert.equal(dn.WORK.some(function (item) { return item.href === '/work/growing-with-kid/'; }), true);
  assert.equal(dn.KNOWLEDGE.some(function (item) { return item.href === '/resources/design-thinking-workshop/'; }), true);
});

test('styles keep the approved motion tokens, glass pills, and charcoal dark backdrop', function () {
  const css = fs.readFileSync(__dirname + '/direction-nav.css', 'utf8');
  assert.match(css, /--menu-ease:\s*cubic-bezier\(\.2,\s*\.8,\s*\.2,\s*1\)/);
  assert.match(css, /--menu-dur:\s*160ms/);
  assert.match(css, /--menu-stagger:\s*35ms/);
  assert.match(css, /--menu-backdrop:\s*rgba\(10,\s*26,\s*51,\s*\.36\)/);
  assert.match(css, /--menu-backdrop:\s*rgba\(0,\s*0,\s*0,\s*\.5\)/);
  assert.match(css, /rgba\(10,\s*10,\s*10,\s*\.7\)/);
  assert.match(css, /blur\(7px\)/);
  assert.match(css, /linear-gradient\(150deg/);
  assert.match(css, /#ffe100/);
  assert.match(css, /#111214/);
  assert.doesNotMatch(css, /#0B0F1A/i);
  assert.doesNotMatch(css, /#8FA2FF/i);
  const intent = fs.readFileSync(__dirname + '/intent.css', 'utf8');
  assert.match(intent, /body\.is-menu-open \.et-pill/);
});

test('every shared header loads the direction nav and the logo svgs are untouched', function () {
  function walk(dir, acc) {
    for (const name of fs.readdirSync(dir)) {
      if (name === 'node_modules' || name === 'assets' || name === 'dist' || name.startsWith('.')) continue;
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p, acc);
      else if (name.endsWith('.html')) acc.push(p);
    }
    return acc;
  }
  const pages = walk(__dirname, []).filter(function (file) {
    return fs.readFileSync(file, 'utf8').includes('class="hn-bar"');
  });
  assert.ok(pages.length >= 60);
  pages.forEach(function (file) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /\/direction-nav\.css/);
    assert.match(html, /\/direction-nav\.js/);
    assert.match(html, /logo-et-c-light\.svg/);
  });
});
