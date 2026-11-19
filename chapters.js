/* Sticky chapter cards scrub into stickers. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else if (root.document) api.mount(root.document, root);
})(typeof window !== 'undefined' ? window : globalThis, function () {
  function chapterFrame(progress, reduced) {
    if (reduced) return { scale: 1, radius: 0, tilt: 0, shift: 0, shadow: 0 };
    const t = Math.max(0, Math.min(1, Number(progress) || 0));
    return { scale: 1 - t * 0.62, radius: t * 36, tilt: t * -7, shift: t * 28, shadow: t * 8 };
  }
  function mount(doc, win) {
    const runs = doc.querySelectorAll('[data-ch]');
    if (!runs.length) return;
    const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
    function paint() {
      const still = reduced.matches;
      runs.forEach(function (run) {
        const card = run.querySelector('.ch-card');
        const pin = run.querySelector('.ch-pin');
        if (!card || !pin) return;
        const rect = pin.getBoundingClientRect();
        const span = Math.max(1, run.offsetHeight - pin.offsetHeight);
        const passed = Math.min(span, Math.max(0, -rect.top));
        const frame = chapterFrame(passed / span, still);
        card.style.transform = 'translateY(' + frame.shift + '%) scale(' + frame.scale + ') rotate(' + frame.tilt + 'deg)';
        card.style.borderRadius = frame.radius + 'px';
        card.style.boxShadow = frame.shadow + 'px ' + frame.shadow + 'px 0 #111214';
      });
    }
    let queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      win.requestAnimationFrame(function () { queued = false; paint(); });
    }
    win.addEventListener('scroll', schedule, { passive: true });
    win.addEventListener('resize', schedule, { passive: true });
    if (reduced.addEventListener) reduced.addEventListener('change', paint);
    paint();
  }
  return { chapterFrame: chapterFrame, mount: mount };
});
