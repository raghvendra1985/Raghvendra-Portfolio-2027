/* Intent gate, per-path CTAs, and the on-demand 60-sec tour.
   Opening the tour (pill or an existing ?tour=1 deep link) autoplays every
   step. Pause, Back, Skip, Next, and Close stay available. No beat copy changes.
   No chat agent. Get access stays hidden until a real flag exists:
   <body data-get-access="live"> and/or data-get-access-url="/kit/">.
   The published CV is /cv.pdf. Book 20 min uses ET_CALENDLY_URL. */
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
      { id: 'case', path: '/services/', selector: '#services-evidence', title: 'Relevant work', body: 'Every published case study is listed here. Open one when it matches your problem.' },
      { id: 'process', path: '/services/', selector: '.services-process', title: 'Process', body: 'Discover, diagnose, design, deliver. Timing is set in a proposal, not here.' },
      { id: 'pricing', path: '/services/', selector: '.faqs', title: 'Pricing', body: 'No public starting price. Scope and fees are proposed after a conversation.' },
      { id: 'enquiry', path: '/services/', hash: '#enquiry', selector: '#enquiry', title: 'Start', body: 'Start in this form, or email hello@raghvendrasingh.com.' }
    ],
    student: [
      { id: 'teaching', path: '/', hash: '#teaching', selector: '#teaching', title: 'Teaching', body: 'Courses and studios for learners, plus curriculum work for faculty and teams.' },
      { id: 'tool', path: '/tools/', selector: '[data-tool-card]', title: 'A free tool', body: 'Pick one free studio tool and open it. No account and no purchase.' },
      { id: 'whatsapp', path: '/tools/', selector: '#tools-library-title', title: 'After one use', body: 'After you use a tool, an optional WhatsApp invite may appear. Dismiss it if you want.' },
      { id: 'resources', path: '/resources/', selector: '[data-library]', title: 'Worksheets', body: 'Four worksheets are free. Paid ones offer India and international checkout. Files are emailed after payment.' },
      { id: 'learning', path: '/learning/', selector: '#course-outlines', title: 'Workshops', body: 'Course outlines for practice. Team workshops are arranged by enquiry.' },
      { id: 'access', gated: true, path: '/resources/', selector: '[data-library]', title: 'Get access', body: 'Paid worksheets are ₹399 in India (list ₹499) or $4.99 international. Files are emailed after payment. International checkout is in test mode.' }
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

  var TOUR_TARGET_MS = 60000;
  var MIN_BEAT_MS = 7000;

  function beatLength(beat) {
    return (((beat && beat.title) || '') + ' ' + ((beat && beat.body) || '')).trim().length;
  }

  function beatDurations(beats) {
    var list = Array.isArray(beats) ? beats : [];
    if (!list.length) return [];
    var explicit = list.map(function (beat) {
      var value = beat && Number(beat.duration);
      return value > 0 && isFinite(value) ? Math.round(value) : 0;
    });
    var dynamicIdx = [];
    explicit.forEach(function (ms, index) { if (!ms) dynamicIdx.push(index); });
    var result = explicit.slice();
    if (!dynamicIdx.length) return result;
    var weights = dynamicIdx.map(function (index) { return Math.max(beatLength(list[index]), 1); });
    var weightSum = weights.reduce(function (sum, weight) { return sum + weight; }, 0);
    var fixedSum = explicit.reduce(function (sum, ms) { return sum + ms; }, 0);
    var budget = Math.max(TOUR_TARGET_MS - fixedSum, dynamicIdx.length * MIN_BEAT_MS);
    var shares = weights.map(function (weight) { return budget * weight / weightSum; });
    if (budget >= dynamicIdx.length * MIN_BEAT_MS) {
      var guard = 0;
      while (shares.some(function (ms) { return ms < MIN_BEAT_MS - 0.5; }) && guard < 8) {
        guard += 1;
        var deficit = 0;
        var flex = 0;
        shares.forEach(function (ms) {
          if (ms < MIN_BEAT_MS) deficit += MIN_BEAT_MS - ms;
          else flex += ms - MIN_BEAT_MS;
        });
        if (flex <= 0) break;
        shares = shares.map(function (ms) {
          if (ms < MIN_BEAT_MS) return MIN_BEAT_MS;
          return ms - (ms - MIN_BEAT_MS) * (deficit / flex);
        });
      }
    }
    if (!fixedSum) {
      var shareSum = shares.reduce(function (sum, ms) { return sum + ms; }, 0);
      if (shareSum > 0) shares = shares.map(function (ms) { return ms * (budget / shareSum); });
    }
    var rounded = shares.map(function (ms) { return Math.round(ms); });
    if (!fixedSum) {
      var drift = budget - rounded.reduce(function (sum, ms) { return sum + ms; }, 0);
      var longest = 0;
      rounded.forEach(function (ms, index) { if (ms > rounded[longest]) longest = index; });
      rounded[longest] += drift;
    }
    dynamicIdx.forEach(function (beatIndex, index) { result[beatIndex] = rounded[index]; });
    return result;
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
    beatDurations: beatDurations,
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
    const head = document.createElement('div');
    head.className = 'et-head';
    const stepEl = document.createElement('p');
    stepEl.className = 'et-step';
    stepEl.id = 'et-tour-step';
    const statusEl = document.createElement('p');
    statusEl.className = 'et-status';
    statusEl.id = 'et-tour-status';
    statusEl.setAttribute('aria-hidden', 'true');
    const close = button('Close', 'et-text et-close');
    close.id = 'et-tour-close';
    close.setAttribute('aria-label', 'Close the tour');
    head.append(stepEl, statusEl, close);
    const progress = document.createElement('div');
    progress.className = 'et-progress';
    progress.id = 'et-tour-progress';
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', '1');
    progress.setAttribute('aria-valuemax', '1');
    progress.setAttribute('aria-valuenow', '1');
    progress.setAttribute('aria-labelledby', 'et-tour-step');
    const fill = document.createElement('span');
    fill.className = 'et-progress-fill';
    progress.appendChild(fill);
    const titleEl = document.createElement('h2');
    titleEl.id = 'et-tour-title';
    titleEl.tabIndex = -1;
    const bodyEl = document.createElement('p');
    bodyEl.id = 'et-tour-body';
    const live = document.createElement('div');
    live.id = 'et-tour-live';
    live.className = 'et-sr';
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    const actions = document.createElement('div');
    actions.className = 'et-actions';
    const pause = button('Pause', 'et-pause');
    pause.id = 'et-tour-pause';
    pause.setAttribute('aria-pressed', 'false');
    pause.setAttribute('aria-label', 'Pause the tour');
    const back = button('Back', 'et-text');
    const skip = button('Skip', 'et-text');
    skip.setAttribute('aria-label', 'Skip the tour');
    const next = button('Next', 'et-next');
    actions.append(pause, back, skip, next);
    card.append(head, progress, titleEl, bodyEl, live, actions);
    document.body.append(pill, card);
    return {
      pill: pill, card: card, stepEl: stepEl, statusEl: statusEl, titleEl: titleEl, bodyEl: bodyEl,
      live: live, progress: progress, fill: fill, pause: pause, close: close, back: back, skip: skip, next: next,
      highlighted: null, state: null, holds: new Set(), suppressTransient: false,
      clock: { timer: 0, frame: 0, remaining: 0, deadline: 0, token: 0 }
    };
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
    ui.close.addEventListener('click', function () { closeTour(ui); });
    ui.pause.addEventListener('click', function () {
      if (ui.pause.getAttribute('aria-pressed') === 'true') userPlay(ui);
      else userPause(ui);
    });
    ui.card.addEventListener('pointermove', function () {
      if (ui.suppressTransient || ui.card.hidden) return;
      hold(ui, 'hover');
    });
    ui.card.addEventListener('pointerleave', function () {
      ui.suppressTransient = false;
      release(ui, 'hover');
    });
    ui.card.addEventListener('focusin', function (event) {
      if (ui.card.hidden) return;
      const onPause = event.target.closest && event.target.closest('#et-tour-pause');
      if (onPause && ui.suppressTransient) return;
      if (!onPause) ui.suppressTransient = false;
      hold(ui, 'focus');
    });
    ui.card.addEventListener('focusout', function (event) {
      if (ui.card.contains(event.relatedTarget)) return;
      release(ui, 'focus');
    });
    ui.card.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') { event.preventDefault(); onNext(ui); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); onBack(ui); }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || ui.card.hidden) return;
      event.preventDefault();
      closeTour(ui);
    });
    document.addEventListener('visibilitychange', function () {
      if (ui.card.hidden || !ui.state) return;
      if (document.hidden) hold(ui, 'hidden');
      else release(ui, 'hidden');
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
    const wasHidden = ui.card.hidden;
    ui.card.hidden = false;
    ui.pill.setAttribute('aria-expanded', 'true');
    if (wasHidden) ui.suppressTransient = false;
    startClock(ui);
    announceStep(ui, step, beats, beat);
  }

  function onNext(ui) {
    const state = ui.state;
    if (!state) return;
    const beat = state.beats[state.step];
    const last = state.step >= state.beats.length - 1;
    if (beat.external && last && samePlace(beat)) {
      stopClock(ui);
      location.assign(beat.external);
      return;
    }
    if (!samePlace(beat)) { depart(ui, beat, state.intent, state.step); return; }
    if (last) { closeTour(ui); return; }
    const nextBeat = state.beats[state.step + 1];
    if (!samePlace(nextBeat)) { depart(ui, nextBeat, state.intent, state.step + 1); return; }
    renderStep(ui, state.step + 1, state.beats, state.intent);
  }

  function onBack(ui) {
    const state = ui.state;
    if (!state || state.step === 0) return;
    const prev = state.beats[state.step - 1];
    if (!samePlace(prev)) { depart(ui, prev, state.intent, state.step - 1); return; }
    renderStep(ui, state.step - 1, state.beats, state.intent);
  }

  function closeTour(ui) {
    stopClock(ui);
    clearHighlight(ui);
    ui.card.hidden = true;
    ui.state = null;
    ui.live.textContent = '';
    ui.pill.setAttribute('aria-expanded', 'false');
    clearTourSession();
    stripTourParam();
    ui.pill.focus();
  }

  function depart(ui, beat, tour, step) {
    stopClock(ui);
    go(beat, tour, step);
  }

  function clockNow() {
    return window.performance && performance.now ? performance.now() : Date.now();
  }

  function reducedNow() {
    const toggle = document.getElementById('motion-toggle');
    return motionReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches, toggle && toggle.getAttribute('aria-pressed'));
  }

  function hold(ui, reason) {
    if (ui.holds.has(reason)) return;
    ui.holds.add(reason);
    freezeClock(ui);
    syncPause(ui);
  }

  function release(ui, reason) {
    if (!ui.holds.has(reason)) return;
    ui.holds.delete(reason);
    syncPause(ui);
    if (!ui.holds.size) armClock(ui);
  }

  function userPause(ui) {
    ui.suppressTransient = false;
    hold(ui, 'user');
  }

  function userPlay(ui) {
    ui.holds.delete('user');
    ui.holds.delete('hover');
    ui.holds.delete('focus');
    ui.suppressTransient = true;
    syncPause(ui);
    armClock(ui);
  }

  function syncPause(ui) {
    const userPaused = ui.holds.has('user');
    const paused = ui.holds.size > 0;
    ui.pause.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
    ui.pause.textContent = userPaused ? 'Play' : 'Pause';
    ui.pause.setAttribute('aria-label', userPaused ? 'Play the tour' : 'Pause the tour');
    ui.card.dataset.playback = paused ? 'paused' : 'playing';
    ui.statusEl.textContent = paused ? 'Paused' : '';
    if (ui.state) paintProgress(ui);
  }

  function clearTimers(ui) {
    const clock = ui.clock;
    if (clock.timer) clearTimeout(clock.timer);
    if (clock.frame) cancelAnimationFrame(clock.frame);
    clock.timer = 0;
    clock.frame = 0;
  }

  function freezeClock(ui) {
    const clock = ui.clock;
    if (clock.deadline) clock.remaining = Math.max(0, clock.deadline - clockNow());
    clock.deadline = 0;
    clearTimers(ui);
    paintProgress(ui);
  }

  function stopClock(ui) {
    ui.clock.token += 1;
    ui.holds.clear();
    ui.suppressTransient = false;
    ui.clock.deadline = 0;
    ui.clock.remaining = 0;
    clearTimers(ui);
    syncPause(ui);
  }

  function startClock(ui) {
    const clock = ui.clock;
    clock.token += 1;
    clock.deadline = 0;
    clearTimers(ui);
    const durs = beatDurations(ui.state.beats);
    clock.remaining = durs[ui.state.step] || MIN_BEAT_MS;
    syncPause(ui);
    armClock(ui);
  }

  function armClock(ui) {
    const clock = ui.clock;
    if (!ui.state || ui.card.hidden || ui.holds.size || clock.timer) {
      paintProgress(ui);
      return;
    }
    const token = clock.token;
    clock.deadline = clockNow() + clock.remaining;
    clock.timer = setTimeout(function () {
      clock.timer = 0;
      clock.deadline = 0;
      clock.remaining = 0;
      if (token !== ui.clock.token || !ui.state || ui.card.hidden) return;
      onNext(ui);
    }, Math.max(0, clock.remaining));
    // Reduced motion still advances. The bar jumps by step instead of easing.
    if (reducedNow()) paintProgress(ui);
    else tickClock(ui);
  }

  function tickClock(ui) {
    paintProgress(ui);
    if (!ui.clock.timer || reducedNow()) return;
    ui.clock.frame = requestAnimationFrame(function () { tickClock(ui); });
  }

  function remainingMs(ui) {
    const clock = ui.clock;
    if (clock.deadline) return Math.max(0, clock.deadline - clockNow());
    return clock.remaining;
  }

  function paintProgress(ui) {
    const state = ui.state;
    if (!state || !ui.progress) return;
    const count = state.beats.length || 1;
    const step = state.step;
    const durs = beatDurations(state.beats);
    const total = durs.reduce(function (sum, ms) { return sum + ms; }, 0) || 1;
    let ratio;
    if (reducedNow()) ratio = (step + 1) / count;
    else {
      const done = durs.slice(0, step).reduce(function (sum, ms) { return sum + ms; }, 0);
      const into = Math.min(durs[step] || 0, Math.max(0, (durs[step] || 0) - remainingMs(ui)));
      ratio = Math.min(1, (done + into) / total);
    }
    ui.fill.style.width = (Math.max(0, ratio) * 100).toFixed(2) + '%';
    ui.progress.setAttribute('aria-valuemax', String(count));
    ui.progress.setAttribute('aria-valuenow', String(step + 1));
    const paused = ui.holds.size > 0 ? ', paused' : '';
    ui.progress.setAttribute('aria-valuetext', 'Step ' + (step + 1) + ' of ' + count + paused);
  }

  function announceStep(ui, step, beats, beat) {
    const message = 'Step ' + (step + 1) + ' of ' + beats.length + '. ' + beat.title + '. ' + beat.body;
    ui.live.textContent = '';
    const token = ui.clock.token;
    setTimeout(function () {
      if (token !== ui.clock.token || !ui.state || ui.state.step !== step) return;
      ui.live.textContent = message;
    }, 60);
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
