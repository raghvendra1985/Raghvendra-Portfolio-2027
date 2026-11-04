/* Brand treatment follows scroll position; originals remain in the supplied brand folder. */
(() => {
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero');
  const stage = document.querySelector('.stage');
  const darkSection = document.querySelector('.founder');
  let queued = false;
  function update() {
    queued = false;
    const height = header.getBoundingClientRect().height;
    const range = hero && stage ? Math.max(1, hero.offsetHeight - stage.offsetHeight) : 1;
    const progress = hero ? Math.min(1, Math.max(0, (height - hero.getBoundingClientRect().top) / range)) : 1;
    const animated = hero && document.documentElement.classList.contains('motion-on');
    const blue = animated ? Math.min(1, Math.max(0, (progress - .55) / .3)) : 1;
    header.style.setProperty('--logo-blue', String(blue));
    const dark = darkSection && darkSection.dataset?.headerTheme !== 'light' ? darkSection.getBoundingClientRect() : {top:Infinity,bottom:Infinity};
    header.classList.toggle('is-dark', dark.top <= height / 2 && dark.bottom > height / 2);
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  new MutationObserver(schedule).observe(document.documentElement, {attributes:true, attributeFilter:['class']});
  update();
})();
