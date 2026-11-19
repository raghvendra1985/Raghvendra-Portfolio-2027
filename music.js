/* Shelf for music.json. Placeholder rows until real listening is added. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else if (root.document) api.mount(root.document, root);
})(typeof window !== 'undefined' ? window : globalThis, function () {
  function musicIntro(tracks) {
    const n = (tracks || []).length;
    return n + (n === 1 ? ' song' : ' songs') + ' on rotation, mostly while designing.';
  }
  function musicWhere(url) {
    const value = String(url || '');
    if (/spotify/i.test(value)) return 'Spotify';
    if (/youtu(\.be|be)/i.test(value)) return 'YouTube';
    if (/apple/i.test(value)) return 'Apple Music';
    return 'a new tab';
  }
  function musicLabel(track) {
    return (track.title || 'Track') + ' by ' + (track.artist || 'Artist') + ', opens in ' + musicWhere(track.url);
  }
  function musicFan(top, view) {
    const t = 1 - (Number(top) || 0) / Math.max(1, Number(view) || 1);
    return Math.max(0, Math.min(1, t));
  }
  function mount(doc, win) {
    const host = doc.querySelector('[data-music-shelf]');
    if (!host || host.dataset.musicReady === '1') return;
    host.dataset.musicReady = '1';
    const intro = doc.querySelector('[data-music-intro]');
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
    function paint(tracks) {
      if (intro) intro.textContent = musicIntro(tracks);
      host.replaceChildren();
      tracks.forEach(function (track, index) {
        const link = doc.createElement('a');
        link.className = 'on-repeat-item';
        link.href = track.url || '#';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', musicLabel(track));
        link.style.setProperty('--i', String(index));
        const disc = doc.createElement('span');
        disc.className = 'on-repeat-disc';
        disc.setAttribute('aria-hidden', 'true');
        const img = doc.createElement('img');
        img.src = track.cover;
        img.alt = '';
        img.width = 160;
        img.height = 160;
        img.loading = 'lazy';
        img.decoding = 'async';
        link.append(disc, img);
        host.appendChild(link);
      });
    }
    function place() {
      if (reduced.matches) { host.style.setProperty('--p', '1'); return; }
      const top = host.getBoundingClientRect().top;
      host.style.setProperty('--p', musicFan(top, win.innerHeight).toFixed(3));
    }
    let queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      win.requestAnimationFrame(function () { queued = false; place(); });
    }
    const run = fetch('/music.json').then(function (res) { return res.json(); }).then(function (data) {
      paint((data && data.tracks) || []);
      place();
    }).catch(function () { if (intro) intro.textContent = musicIntro([]); });
    win.addEventListener('scroll', schedule, { passive: true });
    win.addEventListener('resize', schedule, { passive: true });
    if (reduced.addEventListener) reduced.addEventListener('change', place);
    return run;
  }
  return { musicIntro: musicIntro, musicLabel: musicLabel, musicWhere: musicWhere, musicFan: musicFan, mount: mount };
});
