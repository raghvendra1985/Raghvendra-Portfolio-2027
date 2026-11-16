document.querySelectorAll('.demo-form button[type=submit]').forEach(button=>button.disabled=false);
document.querySelectorAll('[data-library]').forEach(library=>{
  const subject=library.querySelector('[data-subject-filter]'),access=library.querySelector('[data-access-filter]');
  const search=library.querySelector('[data-search]'),filter=library.querySelector('[data-filter]'),items=[...library.querySelectorAll('[data-item]')];
  function update(){
    let count=0;
    items.forEach(item=>{
      const audience=filter.value==='all'||item.dataset.topic==='both'||item.dataset.topic===filter.value;
      item.hidden=!(audience&&(!subject||subject.value==='all'||item.dataset.subject===subject.value)&&(!access||access.value==='all'||item.dataset.access===access.value)&&item.textContent.toLowerCase().includes(search.value.trim().toLowerCase()));
      if(!item.hidden)count++;
    });
    library.querySelector('[data-count]').textContent=count+' result'+(count===1?'':'s');
  }
  search?.addEventListener('input',update);
  filter?.addEventListener('change',update);
  subject?.addEventListener('change',update);
  access?.addEventListener('change',update);
  update();
});

const nlForm = document.getElementById('newsletter-form');
if (nlForm) {
  nlForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!nlForm.reportValidity()) return;
    const email = document.getElementById('nl-email')?.value;
    const name = document.getElementById('nl-name')?.value || '';
    const interest = document.getElementById('nl-interest')?.value || 'Both';
    const status = document.getElementById('nl-status');
    const btn = document.getElementById('nl-submit-btn');

    if (btn) btn.disabled = true;
    if (status) status.textContent = 'Subscribing you to Practical Progress via Beehiiv...';

    let attrData = {};
    try { attrData = JSON.parse(sessionStorage.getItem('ht_attribution') || '{}'); } catch(err) {}

    // Send to /api/enquiry as reliable lead capture
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: name || email.split('@')[0],
        email: email,
        interest: 'Workflow Automation',
        challenge: 'Newsletter Subscription (Beehiiv): ' + interest + ' track. Referrer: ' + (attrData.source || 'direct'),
        consent: { reply: true, updates: true, whatsapp: false }
      })
    }).catch(() => {});

    // Track event in Vercel & PostHog
    if (window.va) window.va('event', { name: 'newsletter_subscribe', data: { email, interest, source: attrData.source } });
    if (window.posthog) window.posthog.capture('newsletter_subscribed', { email, interest, source: attrData.source });

    setTimeout(() => {
      if (status) {
        status.innerHTML = '🎉 <strong>You’re subscribed!</strong> Welcome to Practical Progress. Check your inbox to confirm your welcome edition.';
        status.style.color = '#0022cb';
      }
      if (btn) btn.disabled = false;
      nlForm.reset();
    }, 600);
  });
}