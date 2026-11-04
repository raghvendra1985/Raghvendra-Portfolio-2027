/* Shared navigation and enquiry behavior for the first-release pages. */
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open',open); menu.setAttribute('aria-expanded',String(open)); });
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
const brief = document.querySelector('#project-brief');
if (brief) {
  const params = new URLSearchParams(location.search);
  if ([...brief.elements.interest.options].some(o => o.value === params.get('interest'))) brief.elements.interest.value = params.get('interest');
  const workshopTopic = params.get('topic');
  if (params.get('interest') === 'Team Workshop' &&
      ['AI for Business Teams', 'AI for Designers'].includes(workshopTopic) &&
      brief.elements.challenge && !brief.elements.challenge.value) {
    brief.elements.challenge.value = 'Workshop topic: ' + workshopTopic + '\n\n';
  }
  brief.addEventListener('submit', e => {
    e.preventDefault();
    if (!brief.reportValidity()) return;
    const data = new FormData(brief);
    const body = `Hello Raghvendra,\n\nI'd like to discuss ${data.get('interest')}.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nOrganisation: ${data.get('organisation') || 'Not provided'}\n\nMy challenge:\n${data.get('challenge')}\n\nThank you,\n${data.get('name')}`;
    const href = `mailto:hello@raghvendrasingh.com?subject=${encodeURIComponent('Elevate Thrive — '+data.get('interest'))}&body=${encodeURIComponent(body)}`;
    location.href = href;
    const fallback = document.querySelector('#email-fallback');
    fallback.href = href; fallback.hidden = false;
    document.querySelector('#brief-status').textContent = 'Your email draft is ready to open. Review and send it in your email app. If the app did not open, use the email draft link below.';
  });
}
if (typeof document.createElement === 'function' && document.head && !document.querySelector('script[src*="/intent.js"]')) {
  const intentStyle = document.createElement('link');
  intentStyle.rel = 'stylesheet';
  intentStyle.href = '/intent.css?v=intent-1';
  document.head.appendChild(intentStyle);
  const intentScript = document.createElement('script');
  intentScript.src = '/intent.js?v=intent-1';
  intentScript.dataset.etIntent = '1';
  document.head.appendChild(intentScript);
}
