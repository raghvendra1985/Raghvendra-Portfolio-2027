/* First-visit home coach marks. Once: localStorage rs_coach_seen_v1. ?coach=1 forces it.
   Anchors the menu pill, the existing 60-sec tour, Recruiter View, and Work. Skips missing ones. */
(function (root) {
  var KEY = 'rs_coach_seen_v1', DELAY = 1500, ORDER = ['menu', 'tour', 'recruiter', 'work'];
  var COPY = {
    menu: ['Menu', 'Open the compact menu to move between Work, Knowledge, Systems, and About.', 'below', 'pill', ['[data-coach-anchor="menu"]', '[data-menu-pill]', '#menu-pill', '.hn-menu', '.menu-pill', '.section-rail .menu', 'button.menu', '[aria-controls="navigation"]']],
    tour: ['60-second tour', 'This pill starts the tour already on the site. It walks the path you picked.', 'above', 'pill', ['#et-tour-pill']],
    recruiter: ['Recruiter View', 'A 30-second briefing: the short track record, the CV, and how to get in touch.', 'below', 'pill', ['[data-coach-anchor="recruiter"]', '#open-drawer-btn', '[data-open-drawer]', '#hero-recruiter-btn']],
    work: ['Work', 'Selected work lives in this section: the decision, the scope, and the outcome.', 'below', 'card', ['[data-coach-anchor="work"]', '#work .hx-work-header', '#work-title', '#work']]
  };

  function hasSeen(storage) { try { return storage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function markSeen(storage) { try { storage.setItem(KEY, '1'); } catch (e) {} }
  function forced(search) {
    var q = String(search || ''), h = q.indexOf('#'), m = q.indexOf('?');
    if (h >= 0) q = q.slice(0, h);
    return new URLSearchParams(m >= 0 ? q.slice(m + 1) : q).get('coach') === '1';
  }
  function prefersReduced(media, pressed) { return !!(media || pressed === 'true' || pressed === true); }
  function shouldStart(s) {
    if (!s || !s.home || s.intro || s.tour || !s.delayElapsed) return false;
    return s.force ? true : !(s.seen || s.scrolled || s.clicked);
  }
  function completes(action, index, count) {
    return action === 'skip' || action === 'escape' || action === 'outside' || (action === 'next' && index === count - 1);
  }
  function pickSteps(ids) {
    var set = {};
    (ids || []).forEach(function (id) { set[id] = 1; });
    return ORDER.filter(function (id) { return set[id]; });
  }
  function place(anchor, bubble, view) {
    var margin = view.margin == null ? 12 : view.margin, width = Math.min(bubble.width, view.width - margin * 2), height = bubble.height;
    var left = anchor.width > width + 48 ? anchor.left + anchor.width - width : anchor.left + anchor.width / 2 - width / 2;
    if (left < margin) left = margin;
    if (left + width > view.width - margin) left = Math.max(margin, view.width - margin - width);
    var below = anchor.top + anchor.height + 12, above = anchor.top - 12 - height, top = anchor.prefer === 'above' ? above : below;
    function fits(y) { return y >= margin && y + height <= view.height - margin; }
    if (!fits(top)) { var flip = top === below ? above : below; if (fits(flip)) top = flip; }
    if (top < margin) top = margin;
    if (top + height > view.height - margin) top = Math.max(margin, view.height - margin - height);
    return { top: Math.round(top), left: Math.round(left), width: Math.round(width) };
  }
  function shown(el) {
    if (!el || el.hidden) return false;
    if (el.getAttribute && el.getAttribute('aria-hidden') === 'true') return false;
    return !(el.closest && el.closest('[hidden], [aria-hidden="true"]'));
  }
  function firstMatch(doc, selectors, see) {
    for (var i = 0; i < selectors.length; i++) {
      var all = doc.querySelectorAll(selectors[i]);
      for (var j = 0; j < all.length; j++) if (see(all[j])) return all[j];
    }
    return null;
  }
  function resolveSteps(doc, see) {
    var visible = see || shown;
    return ORDER.reduce(function (list, id) {
      var spec = COPY[id], el = firstMatch(doc, spec[4], visible);
      if (!el && id === 'menu') {
        var nodes = doc.querySelectorAll('button, a');
        for (var i = 0; i < nodes.length; i++) {
          if (/^menu\b/i.test(String(nodes[i].textContent || '').replace(/\s+/g, ' ').trim()) && visible(nodes[i])) { el = nodes[i]; break; }
        }
      }
      if (el) list.push({ id: id, title: spec[0], body: spec[1], prefer: spec[2], shape: spec[3], el: el });
      return list;
    }, []);
  }

  root.RSCoach = {
    KEY: KEY, DELAY: DELAY, hasSeen: hasSeen, markSeen: markSeen, forced: forced,
    prefersReduced: prefersReduced, shouldStart: shouldStart, completes: completes,
    pickSteps: pickSteps, place: place, resolveSteps: resolveSteps
  };
  if (typeof document === 'undefined') return;

  function onScreen(el) {
    if (!shown(el)) return false;
    if (typeof getComputedStyle === 'function') {
      var css = getComputedStyle(el);
      if (css.display === 'none' || css.visibility === 'hidden' || Number(css.opacity) === 0) return false;
    }
    return !(el.getClientRects && !el.getClientRects().length);
  }
  function boot() {
    var body = document.body, path = location.pathname || '/';
    if (!(body && body.classList && body.classList.contains('home-page')) && path !== '/' && path !== '/index.html') return;
    var force = forced(location.search);
    if (hasSeen(localStorage) && !force) return;
    var engaged = { scrolled: !force && (scrollY > 8 || !!location.hash), clicked: false }, t0 = performance.now(), timer = 0;
    function onScroll() { if (scrollY > 8) engaged.scrolled = true; }
    function onDown(event) { if (!(event.target && event.target.closest && event.target.closest('#rs-coach'))) engaged.clicked = true; }
    addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerdown', onDown, true);
    function stop() { clearTimeout(timer); removeEventListener('scroll', onScroll); document.removeEventListener('pointerdown', onDown, true); }
    function tick() {
      var elapsed = performance.now() - t0;
      var state = { home: true, intro: document.documentElement.classList.contains('hero-loading') || !!document.querySelector('.hero-loader'), tour: (function () { var card = document.getElementById('et-tour'); return !!(card && !card.hidden); })(), delayElapsed: elapsed >= DELAY, force: force, seen: hasSeen(localStorage), scrolled: engaged.scrolled, clicked: engaged.clicked };
      if (!shouldStart(state)) {
        if (!force && (state.scrolled || state.clicked) || elapsed > 20000) return stop();
        timer = setTimeout(tick, 120);
        return;
      }
      if (!document.getElementById('et-tour-pill') && elapsed < 2500) { timer = setTimeout(tick, 120); return; }
      stop();
      var steps = resolveSteps(document, onScreen);
      if (steps.length) show(steps);
    }
    timer = setTimeout(tick, DELAY);
  }
  function show(steps) {
    var index = 0, prev = document.activeElement, toggle = document.getElementById('motion-toggle');
    var reduced = prefersReduced(matchMedia('(prefers-reduced-motion: reduce)').matches, toggle && toggle.getAttribute('aria-pressed'));
    var bubble = el('div', 'rs-coach' + (reduced ? ' is-static' : ''), 'rs-coach');
    bubble.setAttribute('role', 'dialog');
    bubble.setAttribute('aria-modal', 'false');
    bubble.setAttribute('aria-labelledby', 'rs-coach-title');
    bubble.setAttribute('aria-describedby', 'rs-coach-body');
    var countEl = el('p', 'rs-coach-count', 'rs-coach-count');
    var titleEl = el('h2', '', 'rs-coach-title');
    var bodyEl = el('p', '', 'rs-coach-body');
    var live = el('div', 'rs-coach-live', 'rs-coach-live');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    var actions = el('div', 'rs-coach-actions');
    var skip = button('Skip', 'rs-coach-skip'), next = button('Next', 'rs-coach-next');
    actions.append(skip, next);
    bubble.append(countEl, titleEl, bodyEl, live, actions);
    var ring = el('div', 'rs-coach-ring' + (reduced ? ' is-static' : ''));
    ring.setAttribute('aria-hidden', 'true');
    document.body.append(ring, bubble);
    function position() {
      var step = steps[index], rect = step.el.getBoundingClientRect();
      if (!rect.width && !rect.height) return;
      ring.style.cssText = 'top:' + (rect.top - 6) + 'px;left:' + (rect.left - 6) + 'px;width:' + (rect.width + 12) + 'px;height:' + (rect.height + 12) + 'px;border-radius:' + (step.shape === 'pill' ? '999px' : '18px');
      var pos = place({ top: rect.top, left: rect.left, width: rect.width, height: rect.height, prefer: step.prefer }, { width: bubble.offsetWidth || 320, height: bubble.offsetHeight || 150 }, { width: innerWidth, height: innerHeight, margin: 12 });
      bubble.style.top = pos.top + 'px';
      bubble.style.left = pos.left + 'px';
    }
    function render() {
      var step = steps[index], rect = step.el.getBoundingClientRect();
      countEl.textContent = (index + 1) + '/' + steps.length;
      titleEl.textContent = step.title;
      bodyEl.textContent = step.body;
      next.setAttribute('aria-label', index === steps.length - 1 ? 'Finish the walkthrough' : 'Next tip');
      if (rect.width && rect.height && (rect.top < 8 || rect.bottom > innerHeight - 8)) {
        scrollTo({ top: Math.max(0, scrollY + rect.top - Math.min(120, innerHeight * 0.28)), behavior: reduced ? 'auto' : 'smooth' });
      }
      position();
      var message = 'Step ' + (index + 1) + ' of ' + steps.length + '. ' + step.title + '. ' + step.body, token = step;
      live.textContent = '';
      setTimeout(function () { if (steps[index] === token) live.textContent = message; }, 40);
    }
    function close(action) {
      if (completes(action, index, steps.length)) markSeen(localStorage);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onOut, true);
      removeEventListener('resize', position);
      removeEventListener('scroll', position);
      bubble.remove();
      ring.remove();
      if (prev && prev.focus && document.contains(prev)) { try { prev.focus(); } catch (e) {} }
    }
    function onKey(event) {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close('escape'); return; }
      if (event.key !== 'Tab') return;
      var edge = event.shiftKey ? skip : next;
      if (document.activeElement === edge) { event.preventDefault(); (event.shiftKey ? next : skip).focus(); }
    }
    function onOut(event) {
      if (bubble.contains(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
      close('outside');
    }
    skip.addEventListener('click', function () { close('skip'); });
    next.addEventListener('click', function () {
      if (completes('next', index, steps.length)) return close('next');
      index += 1;
      render();
    });
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onOut, true);
    addEventListener('resize', position);
    addEventListener('scroll', position, { passive: true });
    render();
    if (reduced) { bubble.classList.add('is-on'); ring.classList.add('is-on'); }
    else requestAnimationFrame(function () { bubble.classList.add('is-on'); ring.classList.add('is-on'); });
    next.focus();
  }
  function el(tag, className, id) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (id) node.id = id;
    return node;
  }
  function button(label, className) {
    var node = el('button', className);
    node.type = 'button';
    node.textContent = label;
    return node;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(typeof globalThis !== 'undefined' ? globalThis : this);
