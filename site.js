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
    const status = document.querySelector('#brief-status');
    const reply = brief.elements.consent_reply;
    if (reply && !reply.checked) {
      status.textContent = 'Tick “You may reply to this enquiry” before sending. Updates and WhatsApp stay optional.';
      return;
    }
    const data = new FormData(brief);
    if (data.get('consent_whatsapp') === 'yes' && !String(data.get('phone') || '').trim()) {
      status.textContent = 'Add a phone number for WhatsApp, or leave that box unticked.';
      return;
    }
    fillLeadContext(brief);
    if (typeof fetch !== 'function') { openDraft(new FormData(brief)); return; }
    const button = brief.querySelector && brief.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    sendLead(new FormData(brief)).finally(() => { if (button) button.disabled = false; });
  });
  function fillLeadContext(form) {
    let stored = '';
    try { stored = localStorage.getItem('et-intent') || ''; } catch (error) { stored = ''; }
    const fromQuery = new URLSearchParams(location.search).get('for') || '';
    if (form.elements.intent) form.elements.intent.value = fromQuery || stored;
    if (form.elements.source) {
      const path = location.pathname || '/services/';
      const intent = fromQuery || stored;
      form.elements.source.value = intent ? path + '?for=' + intent : path;
    }
  }
  function openDraft(data) {
    const phone = String(data.get('phone') || '').trim();
    const body = `Hello Raghvendra,\n\nI'd like to discuss ${data.get('interest')}.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\n${phone ? 'Phone: ' + phone + '\n' : ''}Organisation: ${data.get('organisation') || 'Not provided'}\n\nMy challenge:\n${data.get('challenge')}\n\nThank you,\n${data.get('name')}`;
    const href = `mailto:hello@raghvendrasingh.com?subject=${encodeURIComponent('Elevate Thrive — '+data.get('interest'))}&body=${encodeURIComponent(body)}`;
    location.href = href;
    const fallback = document.querySelector('#email-fallback');
    fallback.href = href; fallback.hidden = false;
    document.querySelector('#brief-status').textContent = 'Your email draft is ready to open. Review and send it in your email app. If the app did not open, use the email draft link below.';
  }
  async function sendLead(data) {
    const status = document.querySelector('#brief-status');
    const payload = {
      name: data.get('name') || '',
      email: data.get('email') || '',
      phone: data.get('phone') || '',
      organisation: data.get('organisation') || '',
      interest: data.get('interest') || '',
      challenge: data.get('challenge') || '',
      intent: data.get('intent') || '',
      source: data.get('source') || location.pathname || '/services/',
      consent: {
        reply: data.get('consent_reply') === 'yes',
        updates: data.get('consent_updates') === 'yes',
        whatsapp: data.get('consent_whatsapp') === 'yes'
      }
    };
    try {
      const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.stored) {
        status.textContent = 'Enquiry received. It will be used only for the choices you ticked.';
        if (brief.reset) brief.reset();
        return;
      }
      const blocked = {
        consent_reply_required: 'Tick “You may reply to this enquiry” before sending. Updates and WhatsApp stay optional.',
        whatsapp_needs_phone: 'Add a phone number for WhatsApp, or leave that box unticked.',
        invalid_email: 'Enter an email address we can reply to.',
        rate_limited: 'Too many enquiries from this network just now. Email hello@raghvendrasingh.com instead.'
      };
      if (blocked[result.error]) { status.textContent = blocked[result.error]; return; }
      openDraft(data);
      if (result.delivery === 'unconfigured' || response.status === 404 || response.status === 405) {
        status.textContent = 'The sheet is not connected on this deploy yet. ' + status.textContent;
      }
      return;
    } catch (error) { /* draft below */ }
    openDraft(data);
    status.textContent = 'The sheet is not connected on this deploy yet. ' + status.textContent;
  }
}
if (typeof document.createElement === 'function') {
  const utilities = document.querySelector('.footer-utilities');
  if (utilities && !utilities.querySelector('a[href="/privacy/"]')) {
    const privacy = document.createElement('a');
    privacy.href = '/privacy/';
    privacy.textContent = 'Privacy';
    utilities.prepend(privacy);
  }
  if (document.head && !document.querySelector('script[data-analytics="vercel"]')) {
    const queue = document.createElement('script');
    queue.dataset.analytics = 'vercel';
    queue.textContent = 'window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };';
    const insights = document.createElement('script');
    insights.defer = true;
    insights.src = '/_vercel/insights/script.js';
    document.head.append(queue, insights);
  }
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
