/* Measured reference behavior: view-entry reveal and 60%-viewport timeline activation. */
(() => {
  const root = document.documentElement;
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('#motion-toggle');
  const timelines = [...document.querySelectorAll('.timeline')];
  const reveals = [...document.querySelectorAll('.service,.workshop-card,.editorial-grid article,.offering,.faqs details,#project-brief,.inner-intro')];
  reveals.forEach(el => el.classList.add('scroll-reveal'));
  const progress = document.createElement('div'); progress.id = 'reading-progress'; progress.setAttribute('aria-hidden','true'); document.body.append(progress);
  let queued = false;
  let disabled = false;
  function render() {
    queued = false;
    const height = innerHeight;
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - height);
    root.style.setProperty('--page-progress', String(Math.max(0, Math.min(1, scrollY / scrollRange))));
    for (const list of timelines) {
      const rect = list.getBoundingClientRect();
      const fill = disabled ? 1 : Math.max(0, Math.min(1, (height * .6 - rect.top) / Math.max(1, rect.height)));
      list.style.setProperty('--timeline-progress', String(fill));
      [...list.children].forEach(item => item.classList.toggle('is-active', disabled || item.getBoundingClientRect().top <= height * .6));
    }
    for (const el of reveals) {
      const rect = el.getBoundingClientRect();
      const entry = disabled ? 1 : Math.max(0, Math.min(1, (height - rect.top) / Math.max(1, Math.min(rect.height, height) * .6)));
      el.style.setProperty('--reveal-opacity', String(.3 + .7 * entry));
      el.style.setProperty('--reveal-y', `${24 * (1 - entry)}px`);
    }
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(render); } }
  function sync() {
    disabled = media.matches || toggle?.getAttribute('aria-pressed') === 'true';
    root.classList.toggle('reference-motion', !disabled);
    progress.hidden = disabled;
    if (toggle && !document.querySelector('.hero')) { toggle.disabled = media.matches; toggle.textContent = media.matches ? 'Reduced motion on' : disabled ? 'Enable motion' : 'Reduce motion'; }
    render();
  }
  if (toggle) {
    if (!document.querySelector('.hero')) toggle.addEventListener('click', () => { toggle.setAttribute('aria-pressed', String(toggle.getAttribute('aria-pressed') !== 'true')); });
    new MutationObserver(sync).observe(toggle, {attributes:true, attributeFilter:['aria-pressed']});
  }
  media.addEventListener('change', sync);
  addEventListener('scroll', schedule, {passive:true}); addEventListener('resize', schedule, {passive:true});
  sync();
})();
