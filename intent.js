/* Intent gate, per-path CTAs, and the on-demand 60-sec tour.
   No chat agent. Get access stays hidden until a real flag exists:
   <body data-get-access="live"> and/or data-get-access-url="/kit/">.
   The published CV is /cv.pdf. Booking stays off until ET_CALENDLY_URL is set. */
(function (root) {
  const EMAIL = 'hello@raghvendrasingh.com';
  const LINKEDIN = 'https://www.linkedin.com/in/raghvendrasingh23/';
  const MAILTO = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Hiring enquiry');
  const INTENT_KEY = 'et-intent';
  const TOUR_KEY = 'et-tour';
  const AUDIENCES = ['recruiter', 'client', 'student'];

  const TOURS = {
    recruiter: [
      { id: 'who', path: '/about/', selector: '.about-bio', title: 'Who', body: 'Product design, teaching, and applied AI — the short version of the practice.' },
      { id: 'case', path: '/work/nye-team/', selector: '#top-case', title: 'The work', body: 'NYE leads. The role here is Senior Manager UX, building the design function.' },
      { id: 'decision', path: '/work/nye-team/', selector: '#decision', title: 'A decision', body: 'The decision: structure before more screens. The trade-off is time before visible UI.' },
      { id: 'outcome', path: '/work/nye-team/', selector: '#outcome', title: 'Outcome', body: 'Published outcome only: the team hired, the shared system, and the platforms shipped.' },
      { id: 'teams', path: '/about/', selector: '.about-working', title: 'With teams', body: 'Strategy and execution, with review points and human judgement left in the work.' },
      { id: 'contact', path: '/work/', selector: '[data-recruiter-contact]', title: 'Contact', body: 'Download the CV at /cv.pdf, or email hello@raghvendrasingh.com.' }
    ],
    client: [
      { id: 'hero', path: '/services/', selector: '.inner-hero', title: 'What I do', body: 'AI strategy, product design, and automation for a practical next step.' },
      { id: 'offers', path: '/services/', selector: '#opportunity', title: 'Offers', body: 'Three shapes: AI strategy, product design, and workflow automation.' },
      { id: 'case', path: '/services/', selector: '#services-evidence', title: 'Relevant work', body: 'Selected practice. Open a case study when it matches your problem.' },
      { id: 'process', path: '/services/', selector: '.services-process', title: 'Process', body: 'Discover, diagnose, design, deliver. Timing is set in a proposal, not here.' },
      { id: 'pricing', path: '/services/', selector: '.faqs', title: 'Pricing', body: 'No public starting price. Scope and fees are proposed after a conversation.' },
      { id: 'enquiry', path: '/services/', hash: '#enquiry', selector: '#enquiry', title: 'Start', body: 'Start in this form, or email hello@raghvendrasingh.com.' }
    ],
    student: [
      { id: 'tool', path: '/tools/', selector: '[data-tool-card]', title: 'A free tool', body: 'Pick one free studio tool and open it. No account and no purchase.' },
      { id: 'whatsapp', path: '/tools/', selector: '#tools-library-title', title: 'After one use', body: 'After you use a tool, an optional WhatsApp invite may appear. Dismiss it if you want.' },
      { id: 'resources', path: '/resources/', selector: '[data-library]', title: 'Worksheets', body: 'Four worksheets are free. Paid ones are labelled. Checkout is not live.' },
      { id: 'learning', path: '/learning/', selector: '#course-outlines', title: 'Workshops', body: 'Course outlines for practice. Team workshops are arranged by enquiry.' },
      { id: 'access', gated: true, path: '/resources/', selector: '[data-library]', title: 'Get access', body: 'Paid worksheets are listed at ₹399 (list ₹499). Open only the published link.' }
    ]
  };

  function isAudience(value) { return AUDIENCES.indexOf(value) !== -1; }
  function isIntent(value) { return isAudience(value) || value === 'browsing'; }

  function normalizePath(path) {
    const bare = String(path || '/').split('?')[0].split('#')[0];
    const withRoot = bare.charAt(0) === '/' ? bare : '/' + bare;
    if (withRoot.length > 1 && withRoot.charAt(withRoot.length - 1) !== '/') return withRoot + '/';
    return withRoot || '/';
  }

  function pageKey(path) {
    const value = normalizePath(path);
    if (value === '/work/') return 'work';
    if (value === '/services/') return 'services';
    if (value === '/tools/') return 'tools';
    return '';
  }

  function readFor(search) {
    const params = new URLSearchParams(String(search || '').replace(/^\?/, ''));
    const value = (params.get('for') || '').toLowerCase();
    return isIntent(value) ? value : '';
  }

  function recall(storage) {
    try {
      const value = storage.getItem(INTENT_KEY);
      return isIntent(value) ? value : '';
    } catch (error) { return ''; }
  }

  function remember(storage, intent) {
    if (!isIntent(intent)) return;
    try { storage.setItem(INTENT_KEY, intent); } catch (error) { /* private mode */ }
  }

  function activeIntent(search, stored) {
    return readFor(search) || (isIntent(stored) ? stored : '');
  }

  function ctaFor(intent, path) {
    const page = pageKey(path);
    if (!page || !isAudience(intent)) return null;
    if (intent === 'recruiter') {
      return { label: 'Download CV', href: '/cv.pdf', hero: 'Open to remote Staff/Principal Product Designer roles.' };
    }
    if (intent === 'client') {
      return {
        label: 'Start a project',
        href: page === 'services' ? '#enquiry' : '/services/#enquiry',
        hero: 'See the offers and process, then start a project. Fees follow a conversation.'
      };
    }
    return {
      label: 'Explore tools',
      href: page === 'tools' ? '#tools-library-title' : '/tools/#tools-library-title',
      hero: 'Start with a free studio tool. Worksheets and workshops come next.'
    };
  }

  function readAccess(source) {
    if (!source) return { on: false, url: '' };
    const url = source.url == null ? '' : String(source.url).trim();
    const flagged = source.flag === 'live' || source.on === true;
    return { on: flagged || Boolean(url), url: url };
  }

  function accessFromDocument(doc) {
    const body = doc && doc.body;
    if (!body || !body.getAttribute) return readAccess({});
    return readAccess({ flag: body.getAttribute('data-get-access'), url: body.getAttribute('data-get-access-url') });
  }

  function visibleBeats(intent, access) {
    const source = TOURS[intent] || [];
    const gate = readAccess(access);
    return source.reduce(function (list, beat) {
      if (!beat.gated) return list.concat([beat]);
      if (!gate.on) return list;
      return list.concat([gatedBeat(beat, gate.url)]);
    }, []);
  }

  function gatedBeat(beat, url) {
    if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
      return Object.assign({}, beat, { external: url });
    }
    if (url.charAt(0) === '/' && url.charAt(1) !== '/') {
      const hashAt = url.indexOf('#');
      const path = hashAt >= 0 ? url.slice(0, hashAt) : url;
      const hash = hashAt >= 0 ? url.slice(hashAt) : '';
      return Object.assign({}, beat, { path: normalizePath(path), hash: hash, selector: hash || beat.selector });
    }
    return Object.assign({}, beat);
  }

  function inferredTour(intent, path) {
    if (isAudience(intent)) return intent;
    if (intent === 'browsing') return '';
    const value = normalizePath(path);
    if (value.indexOf('/work/') === 0) return 'recruiter';
    if (value.indexOf('/services/') === 0) return 'client';
    if (value.indexOf('/tools/') === 0 || value.indexOf('/resources/') === 0 || value.indexOf('/learning/') === 0) return 'student';
    return '';
  }

  function motionReduced(mediaMatches, ariaPressed) {
    return Boolean(mediaMatches || ariaPressed === 'true' || ariaPressed === true);
  }

  function beatUrl(beat, intent) {
    const params = new URLSearchParams();
    params.set('for', intent);
    params.set('tour', '1');
    return normalizePath(beat.path) + '?' + params.toString() + (beat.hash || '');
  }

  root.ETIntent = {
    EMAIL: EMAIL,
    LINKEDIN: LINKEDIN,
    MAILTO: MAILTO,
    isAudience: isAudience,
    isIntent: isIntent,
    normalizePath: normalizePath,
    pageKey: pageKey,
    readFor: readFor,
    recall: recall,
    remember: remember,
    activeIntent: activeIntent,
    ctaFor: ctaFor,
    readAccess: readAccess,
    visibleBeats: visibleBeats,
    inferredTour: inferredTour,
    motionReduced: motionReduced,
    beatUrl: beatUrl
  };

  if (typeof document === 'undefined' || !document.body) return;
  if (document.documentElement.dataset.etBoot === '1') return;
  document.documentElement.dataset.etBoot = '1';

  const params = new URLSearchParams(location.search);
  const queryIntent = readFor(location.search);
  const intent = activeIntent(location.search, recall(localStorage));
  if (queryIntent) remember(localStorage, queryIntent);
  if (intent) document.documentElement.dataset.intent = intent;

  markIntent(intent);
  mountChange(intent);
  setTimeout(function () { mountChange(document.documentElement.dataset.intent || ''); }, 0);
  applyCta(document, intent, location.pathname);
  syncDuplicateHeroButton();
  window.addEventListener('resize', syncDuplicateHeroButton);
  const tourUi = buildTour();
  bindTour(tourUi);
  resumeTour(tourUi);

  document.addEventListener('click', function (event) {
    const trigger = event.target.closest && event.target.closest('[data-intent]');
    if (!trigger) return;
    const value = trigger.getAttribute('data-intent');
    if (!isIntent(value)) return;
    remember(localStorage, value);
    if (value !== 'browsing') return;
    event.preventDefault();
    document.documentElement.dataset.intent = value;
    markIntent(value);
    mountChange(value);
  });

  function markIntent(value) {
    document.querySelectorAll('[data-intent]').forEach(function (el) {
      if (el.getAttribute('data-intent') === value) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
    const status = document.getElementById('intent-status');
    if (!status) return;
    const messages = {
      recruiter: 'You’re on the hiring path.',
      client: 'You’re on the partner path.',
      student: 'You’re on the learning path.',
      browsing: 'Just browsing. Stay here, or pick a path above.'
    };
    status.textContent = messages[value] || '';
  }

  function mountChange(value) {
    document.querySelectorAll('[data-intent-change]').forEach(function (node) { node.remove(); });
    if (!value) return;
    const names = { recruiter: 'hiring', client: 'finding a partner', student: 'learning', browsing: 'just browsing' };
    [document.querySelector('#navigation'), document.querySelector('.inline-navigation')].forEach(function (nav) {
      if (!nav) return;
      const link = document.createElement('a');
      link.href = '/#what-brings-you';
      link.className = 'intent-change';
      link.setAttribute('data-intent-change', '');
      link.textContent = 'Change';
      link.setAttribute('aria-label', 'Change what brings you here (now ' + names[value] + ')');
      nav.appendChild(link);
    });
  }

  function applyCta(doc, value, path) {
    const cta = ctaFor(value, path);
    if (!cta) return;
    const headerBtn = doc.querySelector('.header > a.button');
    if (headerBtn) setAnchor(headerBtn, cta.label, cta.href);
    const host = heroHost(doc, path);
    if (!host) return;
    upsertLine(doc, host, cta.hero);
    ensureHeroButton(doc, host, cta.label, cta.href);
    if (value === 'recruiter') upsertRecruiterNote(doc, host);
  }

  function heroHost(doc, path) {
    const page = pageKey(path);
    if (page === 'work') return doc.querySelector('.wi-hero');
    if (page === 'services' || page === 'tools') return doc.querySelector('.inner-hero');
    return null;
  }

  function upsertLine(doc, host, text) {
    let line = doc.getElementById('intent-hero-line');
    if (!line) {
      line = doc.createElement('p');
      line.id = 'intent-hero-line';
      line.className = 'intent-line';
      const lede = host.querySelector('.wi-lede, .inner-intro');
      if (lede) lede.after(line); else host.appendChild(line);
    }
    line.textContent = text;
  }

  function ensureHeroButton(doc, host, label, href) {
    const existing = host.querySelector('a.button');
    if (existing) { setAnchor(existing, label, href); return; }
    let actions = doc.getElementById('intent-hero-actions');
    if (!actions) {
      actions = doc.createElement('div');
      actions.id = 'intent-hero-actions';
      actions.className = 'intent-actions';
      const line = doc.getElementById('intent-hero-line');
      if (line) line.after(actions); else host.appendChild(actions);
    }
    let link = actions.querySelector('a.button');
    if (!link) {
      link = doc.createElement('a');
      link.className = 'button';
      actions.prepend(link);
    }
    setAnchor(link, label, href);
  }

  function upsertRecruiterNote(doc, host) {
    if (doc.querySelector('[data-recruiter-contact]')) return;
    const note = recruiterNote(doc);
    const actions = doc.getElementById('intent-hero-actions');
    if (actions) actions.appendChild(note);
    else {
      const line = doc.getElementById('intent-hero-line');
      if (line) line.after(note); else host.appendChild(note);
    }
  }

  function recruiterNote(doc) {
    const note = doc.createElement('p');
    note.className = 'intent-cv-note';
    note.setAttribute('data-recruiter-contact', '');
    const cv = doc.createElement('a');
    cv.href = '/cv.pdf';
    cv.textContent = 'Download CV';
    const mail = doc.createElement('a');
    mail.href = 'mailto:' + EMAIL;
    mail.textContent = EMAIL;
    const linkedin = doc.createElement('a');
    linkedin.href = LINKEDIN;
    linkedin.target = '_blank';
    linkedin.rel = 'noopener noreferrer';
    linkedin.textContent = 'LinkedIn';
    note.append(cv, '. Email ', mail, '. ', linkedin, '.');
    return note;
  }

  function syncDuplicateHeroButton() {
    const extra = document.querySelector('#intent-hero-actions > a.button');
    if (!extra) return;
    if (window.matchMedia('(min-width: 640px)').matches) extra.setAttribute('hidden', '');
    else extra.removeAttribute('hidden');
  }

  function setAnchor(anchor, label, href) {
    anchor.href = href;
    const icon = anchor.ownerDocument.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '↗';
    anchor.replaceChildren(label + ' ', icon);
  }

  function buildTour() {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'et-pill';
    pill.id = 'et-tour-pill';
    pill.textContent = '60-sec tour';
    pill.setAttribute('aria-expanded', 'false');
    pill.setAttribute('aria-controls', 'et-tour');
    const card = document.createElement('div');
    card.id = 'et-tour';
    card.className = 'et-card';
    card.hidden = true;
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'false');
    card.setAttribute('aria-labelledby', 'et-tour-title');
    card.setAttribute('aria-describedby', 'et-tour-body');
    card.tabIndex = -1;
    const stepEl = document.createElement('p');
    stepEl.className = 'et-step';
    stepEl.id = 'et-tour-step';
    const titleEl = document.createElement('h2');
    titleEl.id = 'et-tour-title';
    titleEl.tabIndex = -1;
    const bodyEl = document.createElement('p');
    bodyEl.id = 'et-tour-body';
    const actions = document.createElement('div');
    actions.className = 'et-actions';
    const back = button('Back', 'et-text');
    const skip = button('Skip', 'et-text');
    skip.setAttribute('aria-label', 'Skip the tour');
    const next = button('Next', 'et-next');
    actions.append(back, skip, next);
    card.append(stepEl, titleEl, bodyEl, actions);
    document.body.append(pill, card);
    return { pill: pill, card: card, stepEl: stepEl, titleEl: titleEl, bodyEl: bodyEl, back: back, skip: skip, next: next, highlighted: null, state: null };
  }

  function button(label, className) {
    const node = document.createElement('button');
    node.type = 'button';
    node.className = className;
    node.textContent = label;
    return node;
  }

  function bindTour(ui) {
    ui.pill.addEventListener('click', function () {
      if (!ui.card.hidden) { closeTour(ui); return; }
      const tour = inferredTour(document.documentElement.dataset.intent || '', location.pathname);
      if (!tour) { sendToChooser(); return; }
      begin(ui, tour);
    });
    ui.next.addEventListener('click', function () { onNext(ui); });
    ui.back.addEventListener('click', function () { onBack(ui); });
    ui.skip.addEventListener('click', function () { closeTour(ui); });
    ui.card.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') { event.preventDefault(); onNext(ui); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); onBack(ui); }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || ui.card.hidden) return;
      event.preventDefault();
      closeTour(ui);
    });
  }

  function begin(ui, tour) {
    const beats = visibleBeats(tour, accessFromDocument(document));
    if (!beats.length) { sendToChooser(); return; }
    if (!samePlace(beats[0])) { go(beats[0], tour, 0); return; }
    renderStep(ui, 0, beats, tour);
  }

  function resumeTour(ui) {
    const saved = readTourSession();
    const continuing = saved && params.get('tour') === '1';
    if (!continuing) {
      clearTourSession();
      if (params.get('tour') === '1') stripTourParam();
      return;
    }
    stripTourParam();
    const beats = visibleBeats(saved.intent, accessFromDocument(document));
    if (!beats.length) { clearTourSession(); return; }
    const step = Math.min(saved.step, beats.length - 1);
    if (!samePlace(beats[step])) { clearTourSession(); return; }
    renderStep(ui, step, beats, saved.intent);
  }

  function renderStep(ui, step, beats, tour) {
    const beat = beats[step];
    if (beat.id === 'contact') upsertRecruiterNote(document, heroHost(document, location.pathname) || document.querySelector('main') || document.body);
    clearHighlight(ui);
    const target = samePlace(beat) ? targetFor(beat) : null;
    if (target) highlight(ui, target);
    const here = samePlace(beat);
    const last = step === beats.length - 1;
    ui.stepEl.textContent = (step + 1) + ' of ' + beats.length;
    ui.titleEl.textContent = beat.title;
    ui.bodyEl.textContent = beat.body;
    ui.back.hidden = step === 0;
    ui.next.textContent = !here ? 'Go to this stop' : beat.external && last ? 'Open Get access' : last ? 'Done' : 'Next';
    ui.state = { intent: tour, step: step, beats: beats };
    ui.card.hidden = false;
    ui.pill.setAttribute('aria-expanded', 'true');
    ui.card.focus();
  }

  function onNext(ui) {
    const state = ui.state;
    if (!state) return;
    const beat = state.beats[state.step];
    if (beat.external && state.step === state.beats.length - 1 && samePlace(beat)) {
      location.assign(beat.external);
      return;
    }
    if (!samePlace(beat)) { go(beat, state.intent, state.step); return; }
    if (state.step >= state.beats.length - 1) { closeTour(ui); return; }
    renderStep(ui, state.step + 1, state.beats, state.intent);
  }

  function onBack(ui) {
    const state = ui.state;
    if (!state || state.step === 0) return;
    const prev = state.beats[state.step - 1];
    if (!samePlace(prev)) { go(prev, state.intent, state.step - 1); return; }
    renderStep(ui, state.step - 1, state.beats, state.intent);
  }

  function closeTour(ui) {
    clearHighlight(ui);
    ui.card.hidden = true;
    ui.state = null;
    ui.pill.setAttribute('aria-expanded', 'false');
    clearTourSession();
    stripTourParam();
    ui.pill.focus();
  }

  function samePlace(beat) {
    return normalizePath(location.pathname) === normalizePath(beat.path);
  }

  function targetFor(beat) {
    if (beat.id === 'pricing') return pricingTarget(document);
    if (!beat.selector) return null;
    if (beat.selector.charAt(0) === '#' && beat.selector.indexOf(' ') === -1) return document.getElementById(beat.selector.slice(1));
    return document.querySelector(beat.selector);
  }

  function pricingTarget(doc) {
    const details = doc.querySelectorAll('.faqs details');
    for (let i = 0; i < details.length; i++) {
      const summary = details[i].querySelector('summary');
      if (summary && /pricing/i.test(summary.textContent || '')) return details[i];
    }
    return doc.querySelector('.faqs');
  }

  function highlight(ui, el) {
    ui.highlighted = el;
    el.classList.add('et-tour-target');
    const toggle = document.getElementById('motion-toggle');
    const reduced = motionReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches, toggle && toggle.getAttribute('aria-pressed'));
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start', inline: 'nearest' });
  }

  function clearHighlight(ui) {
    if (!ui.highlighted) return;
    ui.highlighted.classList.remove('et-tour-target');
    ui.highlighted = null;
  }

  function go(beat, tour, step) {
    try { sessionStorage.setItem(TOUR_KEY, JSON.stringify({ on: true, intent: tour, step: step })); } catch (error) { /* ignore */ }
    location.assign(beatUrl(beat, tour));
  }

  function readTourSession() {
    try {
      const data = JSON.parse(sessionStorage.getItem(TOUR_KEY) || 'null');
      if (!data || data.on !== true || !isAudience(data.intent)) return null;
      if (!Number.isInteger(data.step) || data.step < 0) return null;
      return data;
    } catch (error) { return null; }
  }

  function clearTourSession() {
    try { sessionStorage.removeItem(TOUR_KEY); } catch (error) { /* ignore */ }
  }

  function stripTourParam() {
    if (!params.has('tour') || !history.replaceState) return;
    params.delete('tour');
    const next = location.pathname + (params.toString() ? '?' + params.toString() : '') + location.hash;
    history.replaceState(null, '', next);
  }

  function sendToChooser() {
    const chooser = document.getElementById('what-brings-you');
    if (!chooser) { location.assign('/#what-brings-you'); return; }
    const toggle = document.getElementById('motion-toggle');
    const reduced = motionReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches, toggle && toggle.getAttribute('aria-pressed'));
    chooser.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    const title = document.getElementById('home-start-title');
    if (!title) return;
    title.setAttribute('tabindex', '-1');
    title.focus();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
