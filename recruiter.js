/* Booking link for the recruiter strip and founder offers.
   TODO: paste Raghvendra's Calendly URL below. Leave it empty until then.
   Static pages cannot read the CALENDLY_URL env var; this constant is the switch.
   The CV download is /cv.pdf. */
window.ET_CALENDLY_URL = '';
(function () {
  var url = window.ET_CALENDLY_URL || '';
  if (!/^https:\/\//.test(url)) return;
  document.querySelectorAll('[data-calendly]').forEach(function (link) {
    link.href = url;
    link.hidden = false;
  });
  document.querySelectorAll('.role-book-placeholder').forEach(function (note) {
    note.hidden = true;
  });
})();
