/* Enquiry validation and delivery. No secrets live here.
   Set GOOGLE_SHEET_WEBHOOK_URL or FORMSPREE_ENDPOINT on the host. */
const INTERESTS = ['Not sure yet', 'AI Strategy', 'Product Design', 'Workflow Automation', 'Team Workshop'];
const INTENTS = ['', 'recruiter', 'client', 'student', 'browsing'];
const LIMIT = 8;
const WINDOW_MS = 10 * 60 * 1000;
/* Per warm instance only. This is not a global limit on Vercel. */
const hits = new Map();

function clean(value, max) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max);
}

function digits(value) {
  return (value.match(/\d/g) || []).length;
}

function validateLead(input) {
  const name = clean(input && input.name, 120);
  const email = clean(input && input.email, 180);
  const phone = clean(input && input.phone, 40);
  const organisation = clean(input && input.organisation, 180);
  const interest = clean(input && input.interest, 80);
  const challenge = clean(input && input.challenge, 1800);
  const intent = clean(input && input.intent, 20).toLowerCase();
  const source = clean(input && input.source, 200);
  const consentIn = input && input.consent && typeof input.consent === 'object' ? input.consent : {};
  const consent = {
    reply: consentIn.reply === true,
    updates: consentIn.updates === true,
    whatsapp: consentIn.whatsapp === true
  };
  if (name.length < 1) return { ok: false, error: 'invalid_name' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'invalid_email' };
  if (phone && (digits(phone) < 7 || !/^[0-9+().\-\s]+$/.test(phone))) return { ok: false, error: 'invalid_phone' };
  if (!INTERESTS.includes(interest)) return { ok: false, error: 'invalid_interest' };
  if (challenge.length < 1) return { ok: false, error: 'invalid_challenge' };
  if (!INTENTS.includes(intent)) return { ok: false, error: 'invalid_intent' };
  if (!source.startsWith('/') || source.includes('//') || source.includes('..')) return { ok: false, error: 'invalid_source' };
  if (!consent.reply) return { ok: false, error: 'consent_reply_required' };
  if (consent.whatsapp && !phone) return { ok: false, error: 'whatsapp_needs_phone' };
  return {
    ok: true,
    lead: {
      name, email, phone, organisation, interest, challenge, intent, source, consent,
      submittedAt: new Date().toISOString()
    }
  };
}

function resetEnquiryLimits() { hits.clear(); }

function limited(ip, now) {
  const key = ip || 'unknown';
  const stamp = now || Date.now();
  const recent = (hits.get(key) || []).filter((time) => stamp - time < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(stamp);
  hits.set(key, recent);
  return false;
}

function endpoint(env) {
  const sheet = String((env && env.GOOGLE_SHEET_WEBHOOK_URL) || '').trim();
  const formspree = String((env && env.FORMSPREE_ENDPOINT) || '').trim();
  if (sheet) return { url: sheet, delivery: 'sheet' };
  if (formspree) return { url: formspree, delivery: 'formspree' };
  return null;
}

async function deliverLead(lead, env, fetchImpl) {
  const target = endpoint(env);
  if (!target) return { ok: false, stored: false, delivery: 'unconfigured', status: 503 };
  let parsed;
  try { parsed = new URL(target.url); } catch (error) { return { ok: false, stored: false, delivery: 'misconfigured', status: 500 }; }
  if (parsed.protocol !== 'https:') return { ok: false, stored: false, delivery: 'misconfigured', status: 500 };
  const response = await fetchImpl(target.url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(Object.assign({ to: (env && env.ENQUIRY_TO) || 'hello@raghvendrasingh.com' }, lead))
  });
  if (!response || !response.ok) return { ok: false, stored: false, delivery: 'upstream', status: 502 };
  return { ok: true, stored: true, delivery: target.delivery, status: 200 };
}

function clientIp(req) {
  const forwarded = req && req.headers && (req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For']);
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  return (req && req.socket && req.socket.remoteAddress) || 'unknown';
}

function sameOrigin(req) {
  const headers = (req && req.headers) || {};
  const origin = headers.origin || headers.Origin;
  if (!origin) return true;
  const host = headers['x-forwarded-host'] || headers.host;
  try { return new URL(origin).host === host; } catch (error) { return false; }
}

function readJson(req) {
  if (req && req.body && typeof req.body === 'object') return req.body;
  if (typeof (req && req.body) === 'string') {
    if (req.body.length > 20000) return { error: 'too_large' };
    return JSON.parse(req.body);
  }
  return {};
}

async function enquiryHandler(req, res, deps) {
  const env = (deps && deps.env) || process.env;
  const fetchImpl = (deps && deps.fetchImpl) || fetch;
  const method = (req && req.method) || 'GET';
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (method !== 'POST') {
    send(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }
  if (!sameOrigin(req)) {
    send(res, 403, { ok: false, error: 'bad_origin' });
    return;
  }
  if (limited(clientIp(req), deps && deps.now)) {
    send(res, 429, { ok: false, error: 'rate_limited' });
    return;
  }
  let input;
  try { input = readJson(req); } catch (error) {
    send(res, 400, { ok: false, error: 'invalid_json' });
    return;
  }
  if (input && input.error === 'too_large') {
    send(res, 413, { ok: false, error: 'too_large' });
    return;
  }
  const checked = validateLead(input);
  if (!checked.ok) {
    send(res, 400, { ok: false, error: checked.error });
    return;
  }
  try {
    const result = await deliverLead(checked.lead, env, fetchImpl);
    send(res, result.status, { ok: result.ok, stored: result.stored, delivery: result.delivery });
  } catch (error) {
    send(res, 502, { ok: false, stored: false, delivery: 'upstream' });
  }
}

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.statusCode = status;
  if (res.setHeader) res.setHeader('content-type', 'application/json; charset=utf-8');
  if (res.setHeader) res.setHeader('cache-control', 'no-store');
  res.end(payload);
}

module.exports = {
  validateLead,
  deliverLead,
  enquiryHandler,
  resetEnquiryLimits,
  INTERESTS,
  INTENTS
};
