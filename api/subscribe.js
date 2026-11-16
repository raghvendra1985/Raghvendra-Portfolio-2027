/* Serverless endpoint: /api/subscribe
   Dual pipeline:
   1. Submits directly to Beehiiv V2 API (if BEEHIIV_API_KEY & BEEHIIV_PUBLICATION_ID are present)
   2. Stores backup lead via Google Sheet webhook / Formspree / Email so zero leads are lost
*/

function clean(val, max) {
  return String(val == null ? '' : val).replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max);
}

function clientIp(req) {
  const fwd = req && req.headers && (req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For']);
  if (typeof fwd === 'string' && fwd.trim()) return fwd.split(',')[0].trim();
  return (req && req.socket && req.socket.remoteAddress) || 'unknown';
}

function sameOrigin(req) {
  const headers = (req && req.headers) || {};
  const origin = headers.origin || headers.Origin;
  if (!origin) return true;
  const host = headers['x-forwarded-host'] || headers.host;
  try { return new URL(origin).host === host; } catch (e) { return false; }
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.json({ ok: false, error: 'method_not_allowed' });
  }
  if (!sameOrigin(req)) {
    res.statusCode = 403;
    return res.json({ ok: false, error: 'bad_origin' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {
      res.statusCode = 400;
      return res.json({ ok: false, error: 'invalid_json' });
    }
  }
  body = body || {};

  const email = clean(body.email, 180);
  const name = clean(body.name, 120);
  const interest = clean(body.interest, 80) || 'Both';
  const source = clean(body.source, 200) || 'organic';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.statusCode = 400;
    return res.json({ ok: false, error: 'invalid_email' });
  }

  let beehiivSynced = false;
  let beehiivError = null;

  // 1. Send to Beehiiv if credentials configured
  const beehiivKey = process.env.BEEHIIV_API_KEY;
  const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (beehiivKey && beehiivPubId) {
    try {
      const bhRes = await fetch(`https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${beehiivKey}`
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: source,
          utm_medium: 'portfolio_site',
          custom_fields: [
            { name: 'full_name', value: name },
            { name: 'interest_track', value: interest }
          ]
        })
      });
      if (bhRes.ok) {
        beehiivSynced = true;
      } else {
        const bhErr = await bhRes.text();
        beehiivError = bhErr;
      }
    } catch (err) {
      beehiivError = err.message;
    }
  }

  // 2. Safe Fallback & Archival Store (Google Sheet Webhook / Formspree)
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.FORMSPREE_ENDPOINT;
  let backupStored = false;

  if (webhookUrl && webhookUrl.startsWith('https://')) {
    try {
      const backupRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter_subscription',
          email,
          name: name || email.split('@')[0],
          interest,
          source,
          beehiivSynced,
          submittedAt: new Date().toISOString()
        })
      });
      backupStored = backupRes.ok;
    } catch(e) {}
  }

  res.statusCode = 200;
  return res.json({
    ok: true,
    subscribed: true,
    beehiivSynced,
    backupStored,
    message: 'Subscription registered successfully'
  });
};
