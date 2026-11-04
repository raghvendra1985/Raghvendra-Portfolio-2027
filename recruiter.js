/* Public 20-minute intro call. Static pages cannot read CALENDLY_URL,
   so this constant is what the Book 20 min controls use. */
window.ET_CALENDLY_URL = 'https://calendly.com/raghvendradesign2012/20-min-intro-call';
(function () {
  var url = window.ET_CALENDLY_URL || '';
  if (!/^https:\/\//.test(url)) return;
  document.querySelectorAll('[data-calendly]').forEach(function (link) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.hidden = false;
  });
})();
