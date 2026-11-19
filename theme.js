/* Header theme, zen, and Start Pilot. Light is the default. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else if (root.document) api.mount(root.document, root);
})(typeof window !== 'undefined' ? window : globalThis, function () {
  const THEME_KEY = 'rs_theme_v1';
  const ZEN_KEY = 'rs_zen_v1';
  const PILOT_HREF = 'https://rzp.io/rzp/O9NhPGpb';
  function themeFromStorage(value) { return value === 'dark' ? 'dark' : 'light'; }
  function themeToggle(current) { return current === 'dark' ? 'light' : 'dark'; }
  function zenToggle(on) { return !on; }
  function zenAfterKey(on, key) { return key === 'Escape' ? false : on; }
  function mount(doc, win) {
    const bar = doc.querySelector('.hn-bar');
    if (!bar || bar.querySelector('.rs-head-tools')) return;
    let theme = doc.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    let zen = false;
    try { zen = win.sessionStorage.getItem(ZEN_KEY) === '1'; } catch (e) { zen = false; }
    const tools = doc.createElement('div');
    tools.className = 'rs-head-tools';
    tools.innerHTML = '<a class="rs-pilot" href="' + PILOT_HREF + '" target="_blank" rel="noopener"><span class="long">Start Pilot</span><span class="short">Pilot</span></a><button type="button" class="rs-zen" aria-pressed="false" aria-label="Turn on zen mode"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M5 19C5 11 11 4 20 4 20 13 13 19 5 19z"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M9 15c2-2 4-5 6-8"/></svg></button><button type="button" class="rs-theme" aria-pressed="false" aria-label="Switch to dark mode"><svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/></svg><svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 3a8 8 0 1 0 7 12 7 7 0 1 1-7-12z"/></svg></button>';
    bar.appendChild(tools);
    const zenBtn = tools.querySelector('.rs-zen');
    const themeBtn = tools.querySelector('.rs-theme');
    function logo(next) {
      const img = doc.querySelector('.hn-logo');
      if (!img) return;
      const narrow = win.matchMedia('(max-width: 600px)').matches;
      img.src = next === 'dark'
        ? (narrow ? '/assets/logo-et-c-mobile-dark.svg' : '/assets/logo-et-c-dark.svg')
        : (narrow ? '/assets/logo-et-c-mobile.svg' : '/assets/logo-et-c-light.svg');
      doc.querySelectorAll('source[media*="prefers-color-scheme: dark"]').forEach(function (node) { node.remove(); });
    }
    function paintTheme(next, store) {
      theme = themeFromStorage(next);
      doc.documentElement.dataset.theme = theme;
      if (store) { try { win.localStorage.setItem(THEME_KEY, theme); } catch (e) {} }
      const dark = theme === 'dark';
      themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      logo(theme);
    }
    function paintZen(on, store) {
      zen = !!on;
      doc.documentElement.classList.toggle('rs-zen', zen);
      if (store) { try { win.sessionStorage.setItem(ZEN_KEY, zen ? '1' : '0'); } catch (e) {} }
      zenBtn.setAttribute('aria-pressed', zen ? 'true' : 'false');
      zenBtn.setAttribute('aria-label', zen ? 'Turn off zen mode' : 'Turn on zen mode');
    }
    themeBtn.addEventListener('click', function () { paintTheme(themeToggle(theme), true); });
    zenBtn.addEventListener('click', function () { paintZen(zenToggle(zen), true); });
    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && zen) paintZen(zenAfterKey(zen, event.key), true);
    });
    paintTheme(theme, false);
    paintZen(zen, false);
  }
  return { themeFromStorage: themeFromStorage, themeToggle: themeToggle, zenToggle: zenToggle, zenAfterKey: zenAfterKey, PILOT_HREF: PILOT_HREF, mount: mount };
});
