const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {validateLead, deliverLead, enquiryHandler, resetEnquiryLimits} = require('./lib/enquiry.cjs');

const lead = {
  name: 'Asha Rao',
  email: 'asha@example.com',
  phone: '',
  organisation: 'Northwind',
  interest: 'Product Design',
  challenge: 'The quoting step is too long.',
  intent: 'client',
  source: '/services/?for=client',
  consent: { reply: true, updates: false, whatsapp: false }
};

function response() {
  return { statusCode: 0, headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(body) { this.body = body; } };
}

test('a valid enquiry keeps the three consents and does not invent a phone', () => {
  const result = validateLead(lead);
  assert.equal(result.ok, true);
  assert.equal(result.lead.phone, '');
  assert.deepEqual(result.lead.consent, { reply: true, updates: false, whatsapp: false });
  assert.equal(result.lead.intent, 'client');
  assert.equal(result.lead.source, '/services/?for=client');
});

test('reply consent is required and WhatsApp needs a phone', () => {
  assert.equal(validateLead(Object.assign({}, lead, { consent: { reply: false, updates: true, whatsapp: false } })).error, 'consent_reply_required');
  assert.equal(validateLead(Object.assign({}, lead, { consent: { reply: true, updates: false, whatsapp: true } })).error, 'whatsapp_needs_phone');
  assert.equal(validateLead(Object.assign({}, lead, { phone: '98', consent: { reply: true, updates: false, whatsapp: true } })).error, 'invalid_phone');
});

test('source and webhook URLs cannot leave the site by trickery', () => {
  assert.equal(validateLead(Object.assign({}, lead, { source: 'https://evil.example' })).error, 'invalid_source');
  assert.equal(validateLead(Object.assign({}, lead, { source: '//evil.example' })).error, 'invalid_source');
});

test('without a sheet URL nothing is fetched or echoed', async () => {
  let called = false;
  const result = await deliverLead(lead, {}, () => { called = true; });
  assert.equal(called, false);
  assert.equal(result.stored, false);
  assert.equal(result.delivery, 'unconfigured');
  const res = response();
  resetEnquiryLimits();
  await enquiryHandler({ method: 'POST', headers: { host: 'www.raghvendrasingh.com', origin: 'https://www.raghvendrasingh.com', 'x-forwarded-for': '203.0.113.10' }, body: lead }, res, { env: {}, fetchImpl() { throw new Error('no'); } });
  assert.equal(res.statusCode, 503);
  assert.equal(res.body.includes('asha@example.com'), false);
  assert.equal(JSON.parse(res.body).stored, false);
});

test('a https sheet webhook receives the lead and an http URL is refused', async () => {
  let sent;
  const res = response();
  resetEnquiryLimits();
  await enquiryHandler({ method: 'POST', headers: { host: 'preview.vercel.app', origin: 'https://preview.vercel.app', 'x-forwarded-for': '203.0.113.11' }, body: lead }, res, {
    env: { GOOGLE_SHEET_WEBHOOK_URL: 'https://script.google.com/macros/s/abc/exec', ENQUIRY_TO: 'hello@raghvendrasingh.com' },
    fetchImpl: async (url, init) => { sent = { url, body: JSON.parse(init.body) }; return { ok: true }; }
  });
  assert.equal(res.statusCode, 200);
  assert.equal(sent.url, 'https://script.google.com/macros/s/abc/exec');
  assert.equal(sent.body.email, 'asha@example.com');
  assert.equal(sent.body.to, 'hello@raghvendrasingh.com');
  assert.equal(sent.body.consent.updates, false);
  const blocked = await deliverLead(lead, { GOOGLE_SHEET_WEBHOOK_URL: 'http://sheet.example/hook' }, () => { throw new Error('fetched'); });
  assert.equal(blocked.delivery, 'misconfigured');
});

test('another site cannot post an enquiry', async () => {
  const res = response();
  resetEnquiryLimits();
  await enquiryHandler({ method: 'POST', headers: { host: 'www.raghvendrasingh.com', origin: 'https://evil.example', 'x-forwarded-for': '203.0.113.12' }, body: lead }, res, { env: {} });
  assert.equal(res.statusCode, 403);
});

test('the services form has an optional phone, three unticked consents, and a privacy link', () => {
  const html = fs.readFileSync(__dirname + '/services/index.html', 'utf8');
  assert.match(html, /id="phone"[^>]*name="phone"/);
  assert.equal(html.includes('id="phone" required'), false);
  for (const name of ['consent_reply', 'consent_updates', 'consent_whatsapp']) {
    const field = html.match(new RegExp(`<input[^>]*name="${name}"[^>]*>`))[0];
    assert.equal(field.includes('checked'), false, name);
  }
  assert.match(html, /href="\/privacy\/"/);
});

test('privacy, robots, sitemap, and llms.txt are public drafts without invented claims', () => {
  const privacy = fs.readFileSync(__dirname + '/privacy/index.html', 'utf8');
  assert.match(privacy, /not legal advice/i);
  assert.match(privacy, /Digital Personal Data Protection Act, 2023/);
  assert.match(privacy, /Draft/);
  const robots = fs.readFileSync(__dirname + '/robots.txt', 'utf8');
  assert.match(robots, /Sitemap: https:\/\/www\.raghvendrasingh\.com\/sitemap\.xml/);
  const sitemap = fs.readFileSync(__dirname + '/sitemap.xml', 'utf8');
  for (const path of ['/', '/work/', '/services/', '/about/', '/learning/', '/newsletter/', '/resources/', '/tools/', '/privacy/']) {
    assert.match(sitemap, new RegExp('https://www\\.raghvendrasingh\\.com' + path.replace(/[/?]/g, '\\$&')));
  }
  const llms = fs.readFileSync(__dirname + '/llms.txt', 'utf8');
  assert.match(llms, /hello@raghvendrasingh\.com/);
  assert.match(llms, /not published/i);
  assert.match(llms, /Privacy/);
  const site = fs.readFileSync(__dirname + '/site.js', 'utf8');
  assert.match(site, /\/_vercel\/insights\/script\.js/);
  assert.equal(site.includes('googletagmanager'), false);
});
