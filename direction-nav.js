/* Direction nav: one grow-panel implementation for the compact menu,
   the section rail, and the Work / Knowledge dropdowns. */
(function (root) {
  var MIN_SECTIONS = 3;
  var SPY_ROOT_MARGIN = '-45% 0px -45% 0px';
  var HOME_LABELS = { work: 'Work', evaluator: 'Systems', teaching: 'Knowledge', about: 'About', contact: 'Contact' };

  var WORK = [
    { href: '/work/', title: 'All selected work' },
    { href: '/work/nye-team/', title: 'Building the NYE design org: nine hires, one design language, three platforms in fourteen months' },
    { href: '/work/crowley/', title: 'Unifying freight quoting across a fragmented supply chain' },
    { href: '/work/gwk-ghostwriter/', title: 'A personal AI LinkedIn studio — memory, voice, and a research-to-post workflow' },
    { href: '/work/2886/', title: 'Craft technique, modern cut' },
    { href: '/work/bolo-buddy/', title: 'Culturally rooted bedtime stories for Indian children' },
    { href: '/work/eqty/', title: 'A modular fintech operating system, from strategy to architecture' },
    { href: '/work/growing-with-kid/', title: 'A parenting community built around one clear job' },
    { href: '/work/hempel/', title: 'Workshop insights into digitized coatings procurement' },
    { href: '/work/nye/', title: 'A shared design language for payments, banking and investments' },
    { href: '/work/obzrv/', title: 'A real-time F&B analytics MVP for the Gulf' },
    { href: '/work/pacific-design-house/', title: 'Ethical garment manufacturing, on the web' },
    { href: '/work/sagacito/', title: 'An AI-driven revenue suite for perishable media inventory' },
    { href: '/work/shuttl/', title: 'An end-to-end design system for urban mobility at scale' },
    { href: '/work/urban-prakriti/', title: 'A health brand for city residents, built as a founder' },
    { href: '/work/verizon/', title: 'Turnkey digital signage across distributed locations' },
    { href: '/work/viralops/', title: 'Dual-product web redesign under ambiguous scope' },
    { href: '/work/strike-money/', title: 'Strike Money — design system and trading product UI' }
  ];

  var KNOWLEDGE = [
    { href: '/resources/', title: 'All resources' },
    { href: '/resources/ai-opportunity-audit/', title: 'AI Opportunity & Workflow Audit' },
    { href: '/resources/product-decision-canvas/', title: 'Product Decision & Experiment Canvas' },
    { href: '/resources/ai-workflow-starter-kit/', title: 'Practical AI Workflow Starter Kit' },
    { href: '/resources/design-thinking-workshop/', title: 'Design Thinking Workshop' },
    { href: '/resources/design-process-workshop/', title: 'Design Process Workshop' },
    { href: '/resources/concept-design-workshop/', title: 'Concept Design Workshop' },
    { href: '/resources/design-elective-workshop/', title: 'Design Elective Workshop' },
    { href: '/resources/portfolio-development-workshop/', title: 'Portfolio Development Workshop' },
    { href: '/resources/ux-ui-design-workshop/', title: 'UX / UI Design Workshop' },
    { href: '/resources/game-design-workshop/', title: 'Game Design Workshop' },
    { href: '/resources/data-visualisation-workshop/', title: 'Data Visualisation Workshop' }
  ];

  function shouldHideNav(state) {
    if (state.scrollY < 80) return false;
    if (state.scrollY < state.previousY) return false;
    var past = state.heroBottom < state.heroHeight * 0.4;
    if (!past) return false;
    if (state.scrollY > state.previousY) return true;
    return !!state.wasHidden;
  }

  function headerHidden(state) {
    if (state.menuOpen) return false;
    return shouldHideNav(state);
  }

  function sectionInBand(entries) {
    var hits = [];
    for (var i = 0; i < entries.length; i++) if (entries[i].isIntersecting) hits.push(entries[i]);
    if (!hits.length) return '';
    hits.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
    return hits[0].id;
  }

  function railEnabled(sections) {
    return !!(sections && sections.length >= MIN_SECTIONS);
  }

  function focusWithoutScroll(el) {
    if (!el || !el.focus) return;
    try { el.focus({ preventScroll: true }); }
    catch (error) { el.focus(); }
  }

  function clean(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function reducedMotion(win, doc) {
    var media = false;
    try { media = win.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (error) { media = false; }
    var toggle = doc && doc.getElementById && doc.getElementById('motion-toggle');
    return media || !!(toggle && toggle.getAttribute('aria-pressed') === 'true');
  }

  function focusable(rootEl) {
    if (!rootEl || !rootEl.querySelectorAll) return [];
    var nodes = rootEl.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    var list = [];
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.hidden || el.getAttribute('aria-hidden') === 'true') continue;
      if (el.closest && el.closest('[hidden]')) continue;
      list.push(el);
    }
    return list;
  }

  function trapTab(event, panel, extra) {
    if (!event || event.key !== 'Tab' || !panel) return false;
    var nodes = [];
    if (extra && (!panel.contains || !panel.contains(extra))) nodes.push(extra);
    var inner = focusable(panel);
    for (var i = 0; i < inner.length; i++) nodes.push(inner[i]);
    if (event.preventDefault) event.preventDefault();
    if (!nodes.length) return true;
    var doc = panel.ownerDocument;
    var active = doc && doc.activeElement;
    var index = nodes.indexOf(active);
    var nextIndex = event.shiftKey
      ? (index <= 0 ? nodes.length - 1 : index - 1)
      : (index === -1 || index >= nodes.length - 1 ? 0 : index + 1);
    focusWithoutScroll(nodes[nextIndex]);
    return true;
  }

  function clipClosed(ox, oy, w, h) {
    var top = oy < h / 2;
    var left = ox < w / 2;
    if (top && left) return '0 100% 100% 0';
    if (top && !left) return '0 0 100% 100%';
    if (!top && left) return '100% 100% 0 0';
    return '100% 0 0 100%';
  }

  function clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  }

  function placePanel(panel, trigger) {
    if (!panel || !trigger || !trigger.getBoundingClientRect) return;
    var view = (panel.ownerDocument && panel.ownerDocument.defaultView) || root;
    var t = trigger.getBoundingClientRect();
    if (panel.dataset && panel.dataset.kind === 'sheet') {
      var sheet = panel.getBoundingClientRect();
      var sox = clamp(t.right - sheet.left, 0, sheet.width || 1);
      var soy = clamp(t.bottom - sheet.top, 0, sheet.height || 1);
      panel.style.transformOrigin = sox + 'px ' + soy + 'px';
      panel.style.setProperty('--dn-clip', clipClosed(sox, soy, sheet.width || 1, sheet.height || 1));
      return;
    }
    panel.style.position = 'fixed';
    var pw = panel.offsetWidth || 320;
    var ph = panel.offsetHeight || 240;
    var left;
    var top;
    if (panel.dataset && panel.dataset.kind === 'rail') {
      left = Math.max(12, t.left - pw - 12);
      top = Math.min(Math.max(12, t.top - 8), (view.innerHeight || 800) - ph - 12);
    } else {
      left = t.left;
      top = Math.max(t.bottom + 8, 80);
      if (left + pw > (view.innerWidth || 1200) - 12) left = (view.innerWidth || 1200) - 12 - pw;
      if (left < 12) left = 12;
      if (top + ph > (view.innerHeight || 800) - 12) top = Math.max(12, t.top - 8 - ph);
    }
    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
    var rect = panel.getBoundingClientRect();
    var corners = [[t.left, t.top], [t.right, t.top], [t.left, t.bottom], [t.right, t.bottom]];
    var best = corners[0];
    var bestD = Infinity;
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    for (var i = 0; i < corners.length; i++) {
      var d = Math.pow(corners[i][0] - cx, 2) + Math.pow(corners[i][1] - cy, 2);
      if (d < bestD) { bestD = d; best = corners[i]; }
    }
    var ox = clamp(best[0] - rect.left, 0, rect.width || pw);
    var oy = clamp(best[1] - rect.top, 0, rect.height || ph);
    panel.style.transformOrigin = ox + 'px ' + oy + 'px';
    panel.style.setProperty('--dn-clip', clipClosed(ox, oy, rect.width || pw, rect.height || ph));
  }

  function stampStagger(panel) {
    var bits = panel.querySelectorAll ? panel.querySelectorAll('.dn-stagger') : [];
    for (var i = 0; i < bits.length; i++) {
      bits[i].style.setProperty('--i', String(i));
      bits[i].style.setProperty('--n', String(bits.length));
    }
    return bits.length;
  }

  function openGrow(panel, trigger) {
    if (!panel || !trigger) return null;
    var doc = panel.ownerDocument || root.document;
    var view = (doc && doc.defaultView) || root;
    if (doc) {
      var open = doc.querySelectorAll ? doc.querySelectorAll('.dn-grow-panel.is-open') : [];
      for (var i = 0; i < open.length; i++) if (open[i] !== panel) closeGrow(open[i]);
    }
    panel.hidden = false;
    placePanel(panel, trigger);
    var count = stampStagger(panel);
    var closeBtn = (panel.querySelector && panel.querySelector('[data-dn-close]')) || trigger;
    panel._dn = { trigger: trigger, closeBtn: closeBtn, count: count };
    trigger.setAttribute('aria-expanded', 'true');
    if (doc && doc.body) doc.body.classList.add('is-menu-open');
    var bar = doc && doc.querySelector && doc.querySelector('.hn-bar');
    if (bar) {
      bar.classList.add('is-menu-open');
      bar.classList.remove('is-away');
    }
    if (panel.dataset && panel.dataset.kind === 'sheet' && doc && doc.documentElement) doc.documentElement.classList.add('dn-lock');
    var backdrop = doc && doc.querySelector && doc.querySelector('.dn-backdrop');
    if (backdrop) {
      backdrop.hidden = false;
      backdrop.classList.add('is-open');
    }
    function show() {
      panel.classList.add('is-open');
      panel.classList.remove('is-closing');
      focusWithoutScroll(closeBtn);
    }
    var raf = view.requestAnimationFrame;
    if (raf) raf(function () { raf(show); });
    else show();
    return closeBtn;
  }

  function finishClose(panel) {
    if (!panel) return;
    var state = panel._dn || {};
    panel.classList.remove('is-closing');
    panel.hidden = true;
    var doc = panel.ownerDocument;
    var still = doc && doc.querySelector && doc.querySelector('.dn-grow-panel.is-open, .dn-grow-panel.is-closing');
    if (!still && doc && doc.body) {
      doc.body.classList.remove('is-menu-open');
      var bar = doc.querySelector('.hn-bar');
      if (bar) bar.classList.remove('is-menu-open');
      if (doc.documentElement) doc.documentElement.classList.remove('dn-lock');
      var backdrop = doc.querySelector('.dn-backdrop');
      if (backdrop) {
        backdrop.classList.remove('is-open');
        backdrop.hidden = true;
      }
      if (state.trigger && doc.activeElement !== state.trigger) focusWithoutScroll(state.trigger);
      var view = doc.defaultView;
      if (view && view.dispatchEvent) view.dispatchEvent(new view.Event('scroll'));
    }
  }

  function closeGrow(panel) {
    if (!panel) return;
    var state = panel._dn || {};
    if (state.trigger) state.trigger.setAttribute('aria-expanded', 'false');
    if (!panel.classList.contains('is-open') && !panel.classList.contains('is-closing')) {
      panel.hidden = true;
      return;
    }
    panel.classList.remove('is-open');
    panel.classList.add('is-closing');
    var doc = panel.ownerDocument;
    var view = (doc && doc.defaultView) || root;
    var reduce = reducedMotion(view, doc);
    var wait = reduce ? 160 : 160 + ((state.count || 0) * 35);
    var timer = view.setTimeout || root.setTimeout;
    if (timer) timer(function () { finishClose(panel); }, wait);
    else finishClose(panel);
  }

  function iconEl(doc, alreadyX) {
    var icon = doc.createElement('span');
    icon.className = 'dn-icon' + (alreadyX ? ' is-x' : '');
    icon.setAttribute('aria-hidden', 'true');
    icon.appendChild(doc.createElement('span'));
    icon.appendChild(doc.createElement('span'));
    return icon;
  }

  function menuButton(doc, className) {
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = className;
    btn.setAttribute('aria-expanded', 'false');
    var swap = doc.createElement('span');
    swap.className = 'dn-swap';
    var open = doc.createElement('span');
    open.className = 'dn-label-menu';
    open.textContent = 'Menu';
    var shut = doc.createElement('span');
    shut.className = 'dn-label-close';
    shut.textContent = 'Close';
    swap.appendChild(open);
    swap.appendChild(shut);
    btn.appendChild(swap);
    btn.appendChild(iconEl(doc, false));
    return btn;
  }

  function linkList(doc, items, className) {
    var list = doc.createElement('div');
    list.className = className || 'dn-grow-list';
    items.forEach(function (item, index) {
      var a = doc.createElement('a');
      a.href = item.href;
      a.textContent = item.title;
      a.className = 'dn-stagger' + (index === 0 ? ' dn-all' : '');
      list.appendChild(a);
    });
    return list;
  }

  function makePanel(doc, kind, label) {
    var panel = doc.createElement('div');
    panel.className = 'dn-grow-panel';
    panel.dataset.kind = kind;
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', label);
    return panel;
  }

  function boot() {
    var doc = root.document;
    if (!doc || !doc.querySelector) return;
    var bar = doc.querySelector('.hn-bar');
    if (!bar || bar.dataset.dnReady === '1') return;
    bar.dataset.dnReady = '1';
    bar.classList.add('dn-bar');
    var view = doc.defaultView || root;

    var backdrop = doc.createElement('div');
    backdrop.className = 'dn-backdrop';
    backdrop.hidden = true;
    doc.body.appendChild(backdrop);
    backdrop.addEventListener('click', function () {
      var open = doc.querySelectorAll('.dn-grow-panel.is-open');
      for (var i = 0; i < open.length; i++) closeGrow(open[i]);
    });

    buildCompact(doc, bar);
    var triggers = buildDropdowns(doc, bar);
    var rail = buildRail(doc);
    doc.addEventListener('keydown', function (event) {
      var open = doc.querySelector('.dn-grow-panel.is-open');
      if (!open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeGrow(open);
        return;
      }
      if (event.key === 'Tab') trapTab(event, open, open._dn && open._dn.trigger);
    });
    doc.addEventListener('click', function (event) {
      var open = doc.querySelector('.dn-grow-panel.is-open');
      if (!open || !open._dn) return;
      if (open.contains(event.target) || (open._dn.trigger && open._dn.trigger.contains(event.target))) return;
      if (event.target.closest && event.target.closest('.dn-glass, .dn-rail-toggle, .dn-rail-mobile, .dn-drop-btn')) return;
      closeGrow(open);
    });

    var previousY = view.scrollY || 0;
    var wasHidden = false;
    function heroBox() {
      var hero = findHero(doc);
      if (hero && hero.getBoundingClientRect) {
        var rect = hero.getBoundingClientRect();
        return { heroBottom: rect.bottom, heroHeight: hero.offsetHeight || rect.height || 1 };
      }
      var height = view.innerHeight || 800;
      return { heroBottom: height - (view.scrollY || 0), heroHeight: height };
    }
    function sync() {
      var box = heroBox();
      var state = {
        scrollY: view.scrollY || 0,
        previousY: previousY,
        heroBottom: box.heroBottom,
        heroHeight: box.heroHeight,
        wasHidden: wasHidden
      };
      wasHidden = shouldHideNav(state);
      previousY = state.scrollY;
      var menuOpen = doc.body.classList.contains('is-menu-open');
      bar.classList.toggle('is-away', wasHidden && !menuOpen);
      doc.body.classList.toggle('dn-nav-away', wasHidden && !!(rail && rail.enabled));
    }
    var box0 = heroBox();
    if ((view.scrollY || 0) >= 80 && box0.heroBottom < box0.heroHeight * 0.4) wasHidden = true;
    sync();
    view.addEventListener('scroll', sync, { passive: true });
    view.addEventListener('resize', function () {
      var wide = view.matchMedia('(min-width: 1100px)').matches;
      var sheet = doc.getElementById('dn-panel-sheet');
      if (wide && sheet && sheet.classList.contains('is-open')) closeGrow(sheet);
      var open = doc.querySelector('.dn-grow-panel.is-open');
      if (open && open._dn) placePanel(open, open._dn.trigger);
      sync();
    });

    triggers.forEach(function (pair) {
      pair.trigger.addEventListener('click', function () {
        if (pair.panel.classList.contains('is-open')) closeGrow(pair.panel);
        else openGrow(pair.panel, pair.trigger);
      });
    });
  }

  function findHero(doc) {
    var list = doc.querySelectorAll('.hx-hero, .inner-hero, .wi-hero, section.hero');
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (el.getAttribute('aria-hidden') === 'true') continue;
      if (el.closest && el.closest('[hidden], [aria-hidden="true"]') && el.closest('[aria-hidden="true"]') !== el && el.getAttribute('aria-hidden') !== 'true') {
        if (el.closest('[aria-hidden="true"]')) continue;
      }
      if (el.closest && el.closest('[aria-hidden="true"]')) continue;
      if ((el.offsetHeight || 0) < 40) continue;
      return el;
    }
    return null;
  }

  function buildCompact(doc, bar) {
    var identity = bar.querySelector('.hn-identity');
    var compact = doc.createElement('div');
    compact.className = 'dn-compact';
    var recruiter = doc.createElement('button');
    recruiter.type = 'button';
    recruiter.className = 'dn-glass dn-30s';
    recruiter.id = 'dn-recruiter-compact';
    recruiter.setAttribute('aria-controls', 'hx-drawer');
    recruiter.setAttribute('aria-expanded', 'false');
    recruiter.setAttribute('aria-label', 'Recruiter View (30s)');
    recruiter.textContent = '30s';
    recruiter.addEventListener('click', function () {
      var sheet = doc.getElementById('dn-panel-sheet');
      if (sheet && sheet.classList.contains('is-open')) closeGrow(sheet);
      var opener = doc.getElementById('open-drawer-btn');
      if (opener) opener.click();
    });
    var mark = doc.createElement('a');
    mark.className = 'dn-mark';
    mark.href = (identity && identity.getAttribute('href')) || '/';
    mark.setAttribute('aria-label', (identity && identity.getAttribute('aria-label')) || 'Home');
    var picture = identity && identity.querySelector('picture');
    if (picture) {
      var clone = picture.cloneNode(true);
      var clonedImg = clone.querySelector('img');
      if (clonedImg) clonedImg.alt = '';
      clone.setAttribute('aria-hidden', 'true');
      mark.appendChild(clone);
    }
    var menu = menuButton(doc, 'dn-glass dn-menu-btn');
    menu.id = 'dn-compact-menu';
    menu.setAttribute('aria-controls', 'dn-panel-sheet');
    menu.setAttribute('aria-label', 'Menu');
    compact.appendChild(recruiter);
    compact.appendChild(mark);
    compact.appendChild(menu);
    bar.appendChild(compact);

    var panel = makePanel(doc, 'sheet', 'Menu');
    panel.id = 'dn-panel-sheet';
    var list = doc.createElement('div');
    list.className = 'dn-sheet-list';
    list.appendChild(accordion(doc, 'Work', 'dn-acc-work', WORK));
    list.appendChild(accordion(doc, 'Knowledge', 'dn-acc-knowledge', KNOWLEDGE));
    list.appendChild(destLink(doc, 'Systems', '/tools/'));
    list.appendChild(destLink(doc, 'About', '/about/'));
    list.appendChild(destLink(doc, 'Contact', '/#contact'));
    var cta = doc.createElement('button');
    cta.type = 'button';
    cta.className = 'dn-recruiter-cta dn-stagger';
    cta.textContent = 'Recruiter View (30s)';
    cta.addEventListener('click', function () {
      closeGrow(panel);
      var opener = doc.getElementById('open-drawer-btn');
      if (opener) viewLater(doc, function () { opener.click(); });
    });
    list.appendChild(cta);
    panel.appendChild(list);
    doc.body.appendChild(panel);
    menu.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) closeGrow(panel);
      else {
        menu.setAttribute('aria-label', 'Close');
        openGrow(panel, menu);
      }
    });
    var originalClose = closeGrow;
    panel.addEventListener('transitionrun', function () {});
    watchCloseLabel(doc, menu, panel);

    var overlay = doc.getElementById('hx-overlay');
    if (overlay && root.MutationObserver) {
      new root.MutationObserver(function () {
        recruiter.setAttribute('aria-expanded', overlay.classList.contains('open') ? 'true' : 'false');
      }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
    }
    void originalClose;
  }

  function watchCloseLabel(doc, menu, panel) {
    if (!root.MutationObserver) return;
    new root.MutationObserver(function () {
      var open = panel.classList.contains('is-open') || panel.classList.contains('is-closing');
      menu.setAttribute('aria-label', open && panel.classList.contains('is-open') ? 'Close' : 'Menu');
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });
  }

  function viewLater(doc, fn) {
    var view = doc.defaultView || root;
    if (view.setTimeout) view.setTimeout(fn, 180);
    else fn();
  }

  function accordion(doc, label, id, items) {
    var wrap = doc.createElement('div');
    wrap.className = 'dn-acc dn-stagger';
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'dn-acc-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', id);
    var name = doc.createElement('span');
    name.textContent = label;
    var chev = doc.createElement('span');
    chev.className = 'dn-chevron';
    chev.setAttribute('aria-hidden', 'true');
    btn.appendChild(name);
    btn.appendChild(chev);
    var panel = doc.createElement('div');
    panel.id = id;
    panel.className = 'dn-acc-panel';
    panel.hidden = true;
    items.forEach(function (item) {
      var a = doc.createElement('a');
      a.href = item.href;
      a.textContent = item.title;
      panel.appendChild(a);
    });
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.hidden = open;
    });
    wrap.appendChild(btn);
    wrap.appendChild(panel);
    return wrap;
  }

  function destLink(doc, label, href) {
    var a = doc.createElement('a');
    a.className = 'dn-row dn-stagger';
    a.href = href;
    a.textContent = label;
    return a;
  }

  function buildDropdowns(doc, bar) {
    var nav = bar.querySelector('.hn-nav');
    var pairs = [];
    if (!nav) return pairs;
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute('href') || '';
      var kind = href === '/work/' ? 'work' : href === '/resources/' ? 'knowledge' : '';
      if (!kind) continue;
      var wrap = doc.createElement('div');
      wrap.className = 'dn-drop';
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'dn-drop-btn' + (link.classList.contains('active') ? ' active' : '');
      btn.textContent = clean(link.textContent);
      var caret = doc.createElement('span');
      caret.className = 'dn-caret';
      caret.setAttribute('aria-hidden', 'true');
      btn.appendChild(caret);
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-haspopup', 'dialog');
      var panel = makePanel(doc, 'drop', kind === 'work' ? 'Work' : 'Knowledge');
      panel.id = kind === 'work' ? 'dn-panel-work' : 'dn-panel-knowledge';
      btn.setAttribute('aria-controls', panel.id);
      var close = doc.createElement('button');
      close.type = 'button';
      close.className = 'dn-close';
      close.dataset.dnClose = 'true';
      close.setAttribute('data-dn-close', '');
      close.setAttribute('aria-label', 'Close');
      close.appendChild(iconEl(doc, true));
      close.addEventListener('click', function (event) {
        closeGrow(event.currentTarget.closest('.dn-grow-panel'));
      });
      var kicker = doc.createElement('p');
      kicker.className = 'dn-kicker';
      kicker.textContent = kind === 'work' ? 'Work' : 'Knowledge';
      panel.appendChild(close);
      panel.appendChild(kicker);
      panel.appendChild(linkList(doc, kind === 'work' ? WORK : KNOWLEDGE));
      doc.body.appendChild(panel);
      wrap.appendChild(btn);
      link.replaceWith(wrap);
      pairs.push({ trigger: btn, panel: panel });
    }
    return pairs;
  }

  function visibleSection(el) {
    if (!el || el.hidden) return false;
    if (el.getAttribute('aria-hidden') === 'true') return false;
    var node = el;
    while (node) {
      if (node.hidden || (node.getAttribute && node.getAttribute('aria-hidden') === 'true')) return false;
      node = node.parentElement;
    }
    if (el.getClientRects && el.getClientRects().length === 0) return false;
    return true;
  }

  function collectSections(doc) {
    var chapters = [];
    var chapterLinks = doc.querySelectorAll('.case-chapters a[href^="#"]');
    for (var i = 0; i < chapterLinks.length; i++) {
      var id = chapterLinks[i].getAttribute('href').slice(1);
      var target = doc.getElementById(id);
      if (!target || !visibleSection(target)) continue;
      chapters.push({ id: id, label: clean(chapterLinks[i].textContent) || id, el: target });
    }
    if (chapters.length >= MIN_SECTIONS) return chapters;

    var main = doc.querySelector('main');
    if (!main) return [];
    var nodes = main.querySelectorAll('section[id]');
    var items = [];
    for (var n = 0; n < nodes.length; n++) {
      var el = nodes[n];
      if (!visibleSection(el)) continue;
      if (el.classList.contains('hx-hero') || el.classList.contains('inner-hero') || el.classList.contains('hero') || el.classList.contains('wi-hero')) continue;
      var heading = el.querySelector('h1, h2, h3');
      if (!heading || (heading.closest && heading.closest('section[id]') !== el)) continue;
      var label = HOME_LABELS[el.id] || shortLabel(el, clean(heading.textContent));
      items.push({ id: el.id, label: label, el: el });
    }
    return items;
  }

  function shortLabel(el, text) {
    if (text.length <= 22) return text;
    var eye = el.querySelector('.eyebrow, .hx-work-pretitle, .hx-section-label');
    if (eye) {
      var value = clean(eye.textContent).replace(/^\d+\.\s*/, '');
      if (value && value.length <= 24) return value;
    }
    return text.slice(0, 22).replace(/\s+\S*$/, '');
  }

  function buildRail(doc) {
    var sections = collectSections(doc);
    if (!railEnabled(sections)) return { enabled: false, sections: sections };
    var desktop = doc.createElement('nav');
    desktop.className = 'dn-rail dn-rail-desktop';
    desktop.setAttribute('aria-label', 'On this page');
    var list = doc.createElement('ol');
    list.className = 'dn-rail-list';
    var toggle = doc.createElement('button');
    toggle.type = 'button';
    toggle.className = 'dn-rail-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open section menu');
    toggle.appendChild(iconEl(doc, false));

    var mobile = doc.createElement('button');
    mobile.type = 'button';
    mobile.className = 'dn-rail dn-rail-mobile';
    mobile.setAttribute('aria-expanded', 'false');
    var mobileText = doc.createElement('span');
    mobileText.className = 'dn-rail-mobile-text';
    mobileText.textContent = pad(1) + ' ' + sections[0].label;
    mobile.appendChild(mobileText);
    mobile.appendChild(iconEl(doc, false));

    var panel = makePanel(doc, 'rail', 'On this page');
    panel.id = 'dn-panel-rail';
    var links = doc.createElement('div');
    links.className = 'dn-grow-list';
    var items = [];
    sections.forEach(function (section, index) {
      var li = doc.createElement('li');
      li.className = 'dn-rail-item';
      var label = doc.createElement('span');
      label.className = 'dn-rail-label';
      label.textContent = section.label;
      var a = doc.createElement('a');
      a.className = 'dn-rail-num';
      a.href = '#' + section.id;
      a.textContent = pad(index + 1);
      a.setAttribute('aria-label', pad(index + 1) + ' ' + section.label);
      li.appendChild(label);
      li.appendChild(a);
      list.appendChild(li);
      var jump = doc.createElement('a');
      jump.className = 'dn-stagger';
      jump.href = '#' + section.id;
      jump.textContent = pad(index + 1) + '  ' + section.label;
      links.appendChild(jump);
      items.push({ id: section.id, label: section.label, li: li, link: a });
      a.addEventListener('click', function (event) {
        event.preventDefault();
        scrollToId(doc, section.id);
      });
    });
    panel.appendChild(links);
    desktop.appendChild(list);
    desktop.appendChild(toggle);
    doc.body.appendChild(desktop);
    doc.body.appendChild(mobile);
    doc.body.appendChild(panel);

    function setCurrent(id) {
      var current = items[0];
      items.forEach(function (item, index) {
        var on = item.id === id;
        item.li.classList.toggle('is-current', on);
        if (on) {
          item.link.setAttribute('aria-current', 'true');
          current = item;
          mobileText.textContent = pad(index + 1) + ' ' + item.label;
        } else item.link.removeAttribute('aria-current');
      });
      mobile.setAttribute('aria-label', (mobileText.textContent) + ', open sections');
      return current;
    }
    setCurrent(sections[0].id);

    if (root.IntersectionObserver) {
      var observer = new root.IntersectionObserver(function (entries) {
        var mapped = [];
        for (var i = 0; i < entries.length; i++) {
          mapped.push({
            isIntersecting: entries[i].isIntersecting,
            intersectionRatio: entries[i].intersectionRatio,
            id: entries[i].target.id
          });
        }
        var id = sectionInBand(mapped);
        if (id) setCurrent(id);
      }, { root: null, rootMargin: SPY_ROOT_MARGIN, threshold: [0, 0.25, 0.5, 1] });
      sections.forEach(function (section) { observer.observe(section.el); });
    }

    function toggleRail(trigger) {
      if (panel.classList.contains('is-open')) closeGrow(panel);
      else openGrow(panel, trigger);
    }
    toggle.addEventListener('click', function () { toggleRail(toggle); });
    mobile.addEventListener('click', function () { toggleRail(mobile); });
    panel.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href^="#"]');
      if (!link) return;
      event.preventDefault();
      var id = link.getAttribute('href').slice(1);
      closeGrow(panel);
      toggle.setAttribute('aria-expanded', 'false');
      mobile.setAttribute('aria-expanded', 'false');
      scrollToId(doc, id);
    });
    if (root.MutationObserver) {
      new root.MutationObserver(function () {
        var open = panel.classList.contains('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobile.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close section menu' : 'Open section menu');
      }).observe(panel, { attributes: true, attributeFilter: ['class'] });
    }
    return { enabled: true, sections: sections };
  }

  function scrollToId(doc, id) {
    var el = doc.getElementById(id);
    if (!el) return;
    var view = doc.defaultView || root;
    var reduce = reducedMotion(view, doc);
    if (el.scrollIntoView) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (view.history && view.history.pushState) view.history.pushState(null, '', '#' + id);
  }

  root.DNNav = {
    MIN_SECTIONS: MIN_SECTIONS,
    SPY_ROOT_MARGIN: SPY_ROOT_MARGIN,
    WORK: WORK,
    KNOWLEDGE: KNOWLEDGE,
    shouldHideNav: shouldHideNav,
    headerHidden: headerHidden,
    sectionInBand: sectionInBand,
    railEnabled: railEnabled,
    collectSections: collectSections,
    openGrow: openGrow,
    closeGrow: closeGrow,
    finishClose: finishClose,
    trapTab: trapTab,
    placePanel: placePanel,
    clipClosed: clipClosed
  };

  if (typeof document !== 'undefined' && document.querySelector) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
