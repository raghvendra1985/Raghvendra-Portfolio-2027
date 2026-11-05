const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const institutions = ['NIFT Delhi', 'NID Gandhinagar', 'NID Kurukshetra', 'Chitkara University', 'Delhi Technological University (Department of Design)', 'Ambedkar University', 'UID', 'World University of Design (WUD)', 'Maharishi University of Information Technology (MUIT)', 'Lexicon University', 'Jain University'];

function section(html) {
  const start = html.indexOf('id="teaching"');
  assert.equal(start > 0, true);
  return html.slice(start, start + 2800);
}

test('homepage and about teaching blocks use the supplied copy', () => {
  for (const page of ['index.html', 'about/index.html']) {
    const block = section(fs.readFileSync(__dirname + '/' + page, 'utf8'));
    assert.match(block, /Teach what you practice\./);
    assert.match(block, /Mentor who will ship\./);
    assert.match(block, /Guest faculty across design schools and universities/);
    assert.match(block, /Associate Professor, Communication Design at the Indian Institute of Art &amp; Design \(IIAD\)/);
    for (const name of institutions) assert.match(block, new RegExp(name.replace(/[()]/g, '\\$&')));
    assert.match(block, /Design craft/);
    assert.match(block, /Product &amp; AI/);
    assert.match(block, /For faculty &amp; teams/);
    assert.match(block, /Same practice, three rooms/);
    assert.match(block, /href="\/learning\/"/);
    assert.match(block, /href="\/resources\/"/);
    assert.match(block, /href="\/tools\/"/);
    assert.match(block, /href="https:\/\/calendly\.com\/raghvendradesign2012\/20-min-intro-call"/);
    assert.match(block, /href="mailto:hello@raghvendrasingh.com"/);
    assert.equal(/500\+|1,000|1000 students/.test(block), false);
  }
});

test('the learning intent opens the teaching block, then tools and resources', () => {
  const home = fs.readFileSync(__dirname + '/index.html', 'utf8');
  assert.match(home, /href="\/\?for=student#teaching"/);
  const intent = fs.readFileSync(__dirname + '/intent.js', 'utf8');
  assert.match(intent, /id: 'teaching', path: '\/', hash: '#teaching'/);
});
