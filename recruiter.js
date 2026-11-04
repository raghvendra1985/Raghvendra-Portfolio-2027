/* Booking link for the recruiter strip and founder offers.
   Paste Raghvendra's real 20-minute URL below. Leave it empty until then.
   Static pages cannot read the CALENDLY_URL env var; this constant is the switch.
   CV: there is no /cv.pdf in the repo. The Request CV control is a mailto.
   When a real PDF is added at /cv.pdf, point that control at /cv.pdf. */
window.ET_CALENDLY_URL = '';
(function () {
  var url = window.ET_CALENDLY_URL || '';
  if (!/^https:\/\//.test(url)) return;
  document.querySelectorAll('[data-calendly]').forEach(function (link) {
    link.href = url;
    link.hidden = false;
  });
})();
