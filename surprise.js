/* Gift-box charm. One line per visit, then it tucks away. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else if (root.document) api.mount(root.document, root);
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const KEY = 'rs_surprise_seen_v1';
  const LINES = [
    ['You scrolled this far.', 'far', "That's basically a handshake."],
    ['Thanks for visiting.', 'visiting', "Thrive says hi (he's shy)."],
    ['A small confession.', 'confession', 'Fun fact: this box was the hardest part to design.'],
    ['Hello, curious one.', 'curious', 'The yellow arrow has been watching. In a friendly way.'],
    ['You found the box.', 'box', 'Most people walk past. You opened it.'],
    ['A note, not a pitch.', 'note', 'No metrics in here. Just a hello.']
  ];
  function surpriseGate(s) {
    if (s.force) return true;
    if (s.seen || s.coach) return false;
    return (s.progress || 0) >= 0.4 || (s.elapsed || 0) >= 20000;
  }
  function surpriseLine(index) {
    const row = LINES[((index % LINES.length) + LINES.length) % LINES.length];
    const word = row[1];
    const html = row[0].replace(word, '<mark>' + word + '</mark>');
    return { title: html, body: row[2] };
  }
  function surpriseOnKey(open, key) { return open && key === 'Escape' ? 'close' : ''; }
  function mount(doc, win) {
    if (doc.getElementById('rs-surprise')) return;
    const params = new URLSearchParams(win.location.search);
    const force = params.get('surprise') === '1';
    let seen = false;
    try { seen = win.sessionStorage.getItem(KEY) === '1'; } catch (e) { seen = false; }
    if (seen && !force) return;
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = doc.createElement('div');
    root.id = 'rs-surprise';
    root.hidden = true;
    const line = surpriseLine(Math.floor(Math.random() * LINES.length));
    root.innerHTML = '<button type="button" class="rs-charm" aria-label="Psst, open me"><svg viewBox="0 0 64 64" aria-hidden="true"><rect class="rs-lid" x="8" y="14" width="48" height="14" rx="2" fill="#ffe100" stroke="#111214" stroke-width="2"/><rect x="10" y="28" width="44" height="26" rx="2" fill="#ffe100" stroke="#111214" stroke-width="2"/><path d="M32 14v40M8 32h48" fill="none" stroke="#c9b000" stroke-width="3"/></svg><span>Psst, open me</span></button><div class="rs-stage" hidden><button type="button" class="rs-dim" aria-label="Close the note"></button><div class="rs-spark" aria-hidden="true"></div><div class="rs-rib rs-rib-y" aria-hidden="true"></div><div class="rs-rib rs-rib-x" aria-hidden="true"></div><div class="rs-card" role="dialog" aria-modal="false" aria-labelledby="rs-surprise-title"><p class="rs-tag">To: you, the curious one<br>From: Raghvendra</p><button type="button" class="rs-x" aria-label="Close">×</button><div class="rs-bow" aria-hidden="true"></div><h2 id="rs-surprise-title">' + line.title + '</h2><p>' + line.body + '</p><p class="rs-live" aria-live="polite"></p><div class="rs-actions"><a class="rs-hi" href="mailto:hello@raghvendrasingh.com">Say hi</a><button type="button" class="rs-tour">Take the 60-second tour</button></div></div></div>';
    doc.body.appendChild(root);
    const charm = root.querySelector('.rs-charm');
    const stage = root.querySelector('.rs-stage');
    const card = root.querySelector('.rs-card');
    const live = root.querySelector('.rs-live');
    let open = false;
    let opened = false;
    function coach() {
      const nodes = doc.querySelectorAll('.coach-mark,[data-coach],[data-coach-mark],.et-coach');
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.hidden) continue;
        const style = win.getComputedStyle(node);
        if (style.display !== 'none' && style.visibility !== 'hidden') return true;
      }
      return false;
    }
    function progress() {
      const range = doc.documentElement.scrollHeight - win.innerHeight;
      return range > 0 ? win.scrollY / range : 1;
    }
    const started = Date.now();
    function maybeShow() {
      if (!root.hidden) return;
      const ready = surpriseGate({ force: force, seen: false, coach: coach(), progress: progress(), elapsed: Date.now() - started });
      if (ready) root.hidden = false;
    }
    function focusables() {
      return [...card.querySelectorAll('button, a')];
    }
    function showCard() {
      open = true;
      opened = true;
      stage.hidden = false;
      if (!reduced) charm.classList.add('is-pop');
      live.textContent = card.querySelector('h2').textContent + ' ' + card.querySelector('h2').nextElementSibling.textContent;
      focusables()[0].focus();
    }
    function close() {
      open = false;
      stage.hidden = true;
      charm.classList.remove('is-pop');
      if (opened) {
        try { win.sessionStorage.setItem(KEY, '1'); } catch (e) {}
        root.hidden = true;
      }
      charm.focus();
    }
    charm.addEventListener('click', showCard);
    root.querySelector('.rs-x').addEventListener('click', close);
    root.querySelector('.rs-dim').addEventListener('click', close);
    root.querySelector('.rs-tour').addEventListener('click', function () {
      const pill = doc.getElementById('et-tour-pill');
      close();
      if (pill) pill.click();
    });
    doc.addEventListener('keydown', function (event) {
      if (!open) return;
      if (surpriseOnKey(open, event.key) === 'close') { event.preventDefault(); close(); return; }
      if (event.key !== 'Tab') return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    if (force) root.hidden = false;
    else {
      win.addEventListener('scroll', maybeShow, { passive: true });
      win.setTimeout(maybeShow, 20000);
      maybeShow();
    }
  }
  return { surpriseGate: surpriseGate, surpriseLine: surpriseLine, surpriseOnKey: surpriseOnKey, LINES: LINES, KEY: KEY, mount: mount };
});
