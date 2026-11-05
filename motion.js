/* Original decorative consulting diagrams; no reference-site imagery is reused. */
const diagrams = [
`<svg viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg"><rect width="340" height="210" fill="#0a1a33"/><g stroke="#30629c" stroke-width="1" opacity=".5"><path d="M0 42H340M0 84H340M0 126H340M0 168H340M68 0V210M136 0V210M204 0V210M272 0V210"/></g><text x="24" y="34" fill="#c8ddf6" font-size="10" font-family="sans-serif" letter-spacing="2">OPPORTUNITY → IMPACT</text><path d="M44 164L110 126L181 144L241 82L298 60" stroke="#6ab6ff" stroke-width="3" fill="none"/><path d="M44 164L110 126L181 144L241 82L298 60V190H44Z" fill="#0071e3" opacity=".16"/><g fill="#abd4ff" stroke="#0a1a33" stroke-width="5"><circle cx="44" cy="164" r="7"/><circle cx="110" cy="126" r="7"/><circle cx="181" cy="144" r="7"/><circle cx="241" cy="82" r="7"/><circle cx="298" cy="60" r="7"/></g></svg>`,
`<svg viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg"><rect width="340" height="210" fill="#e8f1ff"/><rect x="38" y="27" width="174" height="158" rx="12" fill="white" stroke="#b3ccee"/><rect x="52" y="42" width="52" height="7" rx="3" fill="#0a1a33"/><rect x="52" y="62" width="144" height="54" rx="6" fill="#0071e3"/><path d="M66 103L90 85L114 93L145 73L180 78" fill="none" stroke="white" stroke-width="2"/><rect x="52" y="130" width="66" height="39" rx="5" fill="#edf3fb"/><rect x="130" y="130" width="66" height="39" rx="5" fill="#edf3fb"/><rect x="222" y="57" width="79" height="137" rx="12" fill="#0a1a33"/><rect x="229" y="70" width="65" height="112" rx="7" fill="white"/><rect x="237" y="81" width="48" height="35" rx="4" fill="#0071e3"/><path d="M238 132H285M238 142H273M238 152H280" stroke="#ccd8e8" stroke-width="4"/><circle cx="261" cy="173" r="3" fill="#0071e3"/></svg>`,
`<svg viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg"><rect width="340" height="210" fill="#0d2580"/><g stroke="#6da6ff" fill="none" stroke-width="2"><path d="M66 106H138M195 106H272M169 78V46H271V79M169 133V170H66V133"/></g><g fill="#fff"><rect x="33" y="78" width="64" height="56" rx="12"/><rect x="137" y="78" width="64" height="56" rx="12"/><rect x="241" y="78" width="64" height="56" rx="12"/></g><g fill="#0071e3"><circle cx="65" cy="106" r="12"/><path d="M169 91L181 106L169 121L157 106Z"/><rect x="261" y="96" width="24" height="20" rx="4"/></g><text x="170" y="195" text-anchor="middle" font-family="sans-serif" font-size="9" letter-spacing="2" fill="#c4dcff">CONNECT · REVIEW · DELIVER</text></svg>`
];
const titles = ['Strategy / Opportunity map', 'Product / Experience design', 'Systems / Connected workflows'];
const lane = document.querySelector('#panels');
const isHome = !!(document.body && document.body.classList && document.body.classList.contains('home-page'));
if (!(isHome && lane.children.length)) {
for (let i = 0; i < 10; i++) {
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = `<div class="window-bar"><i></i><i></i><i></i><span>elevate thrive / ${titles[i % 3]}</span></div>${diagrams[i % 3]}`;
  lane.append(panel);
}
}
document.querySelectorAll('[data-art]').forEach(el => { el.innerHTML = diagrams[Number(el.dataset.art)]; });
const hero = document.querySelector('.hero');
const stage = document.querySelector('.stage');
const panels = [...lane.children];
const floor = document.querySelector('.floor');
const glow = document.querySelector('.glow');
const hint = document.querySelector('.scroll-hint');
const toggle = document.querySelector('#motion-toggle');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let manualReduced = false;
let scheduled = false;
const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
function render() {
  scheduled = false;
  if (document.body && document.body.classList && document.body.classList.contains('home-page')) return;
  if (!document.documentElement.classList.contains('motion-on')) return;
  // A single scroll-derived timeline: no elapsed-time animation or accumulated deltas.
  const distance = hero.offsetHeight - stage.offsetHeight;
  const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header'));
  const p = clamp((header - hero.getBoundingClientRect().top) / distance);
  const mobile = innerWidth <= 700;
  const width = mobile ? 220 : 340;
  panels.forEach((panel, i) => {
    const depth = -1850 - i * 440 + p * 8000;
    const z = clamp(depth, -3000, 700);
    const direction = i % 2 ? 1 : -1;
    const x = direction * ([120, 175, 230, 285][i % 4]) * (mobile ? .64 : 1);
    const y = [-70, 65, -22, 120, 15][i % 5];
    const entering = clamp((depth + 3000) / 360);
    const leaving = 1 - clamp((depth - 330) / 370);
    panel.style.transform = `translate3d(calc(-50% + ${x}px),${y}px,${z}px) rotateY(${direction * -14}deg)`;
    panel.style.opacity = entering * leaving;
  });
  floor.style.opacity = 1 - clamp((p - .65) / .3);
  glow.style.opacity = .3 - p * .15;
  glow.style.transform = `translateY(${-p * 36}px) scale(${.8 + p * .35})`;
  hint.style.opacity = 1 - clamp((p - .1) / .2);
}
function requestRender() { if (!scheduled) { scheduled = true; requestAnimationFrame(render); } }
function configure() {
  const disabled = reduced.matches || manualReduced;
  document.documentElement.classList.toggle('motion-on', !disabled);
  toggle.setAttribute('aria-pressed', String(disabled));
  toggle.textContent = disabled ? (reduced.matches ? 'Reduced motion on' : 'Enable motion') : 'Reduce motion';
  toggle.disabled = reduced.matches;
  if (disabled) {
    hint.style.opacity = '0';
  } else { render(); }
}
toggle.addEventListener('click', () => { manualReduced = !manualReduced; configure(); });
reduced.addEventListener('change', configure);
addEventListener('scroll', requestRender, {passive:true});
addEventListener('resize', requestRender, {passive:true});
configure();
