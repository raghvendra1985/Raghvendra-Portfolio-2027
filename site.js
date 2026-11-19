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
      let attrTag = '';
      try {
        const attr = JSON.parse(sessionStorage.getItem('ht_attribution') || '{}');
        if (attr.source && attr.source !== 'direct') {
          attrTag = ' [' + attr.source + (attr.campaign && attr.campaign !== 'organic' ? '/' + attr.campaign : '') + ']';
        }
      } catch (e) {}
      form.elements.source.value = (intent ? path + '?for=' + intent : path) + attrTag;
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

  // PostHog Analytics & B2B Visitor Intelligence
  if (document.head && !document.querySelector('script[data-analytics="posthog"]')) {
    (function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]));
    const posthogKey = window.POSTHOG_API_KEY || 'phc_pYF9xQZ8uT5vK2mL3rS4nW7aD1eC6oX';
    const posthogHost = window.POSTHOG_HOST || 'https://us.i.posthog.com';
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      session_recording: {
        maskAllInputs: false,
        maskInputOptions: { password: true }
      }
    });
    const phScript = document.createElement('script');
    phScript.dataset.analytics = 'posthog';
    document.head.appendChild(phScript);
  }

  // Universal Attribution Tracking (Referrers & UTMs)
  try {
    const params = new URLSearchParams(window.location.search);
    const rawRef = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : 'direct';
    let detectedSource = 'direct';
    if (rawRef.includes('linkedin')) detectedSource = 'linkedin';
    else if (rawRef.includes('instagram')) detectedSource = 'instagram';
    else if (rawRef.includes('google')) detectedSource = 'google_search';
    else if (rawRef.includes('twitter') || rawRef.includes('t.co') || rawRef.includes('x.com')) detectedSource = 'twitter';
    else if (rawRef.includes('substack')) detectedSource = 'substack';
    else if (rawRef !== 'direct' && !rawRef.includes(window.location.hostname)) detectedSource = rawRef;

    const source = params.get('utm_source') || detectedSource;
    const medium = params.get('utm_medium') || (source === 'direct' ? 'direct' : 'referral');
    const campaign = params.get('utm_campaign') || 'organic';

    if (!sessionStorage.getItem('ht_attribution') || params.get('utm_source')) {
      const attributionData = {
        source,
        medium,
        campaign,
        landingPage: window.location.pathname,
        referrerHost: rawRef,
        timestamp: new Date().toISOString()
      };
      sessionStorage.setItem('ht_attribution', JSON.stringify(attributionData));
      if (window.va) {
        window.va('event', { name: 'visitor_attribution', data: attributionData });
      }
      if (window.posthog && typeof window.posthog.capture === 'function') {
        window.posthog.register({
          initial_source: source,
          initial_medium: medium,
          initial_campaign: campaign,
          landing_page: window.location.pathname
        });
        window.posthog.capture('visitor_attribution', attributionData);
      }
    }
  } catch (err) {}
}
if (typeof document.createElement === 'function' && document.head && !document.querySelector('script[src*="/intent.js"]')) {
  const intentStyle = document.createElement('link');
  intentStyle.rel = 'stylesheet';
  intentStyle.href = '/intent.css?v=tour-autoplay';
  document.head.appendChild(intentStyle);
  const intentScript = document.createElement('script');
  intentScript.src = '/intent.js?v=tour-autoplay';
  intentScript.dataset.etIntent = '1';
  document.head.appendChild(intentScript);
}
