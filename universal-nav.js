/**
 * Universal Navigation & Executive Drawer Controller
 */
(function () {
  function initNav() {
    const overlay = document.getElementById('hx-overlay');
    const drawer  = document.getElementById('hx-drawer');
    const openBtns = document.querySelectorAll('#open-drawer-btn, [data-open-drawer], #hero-recruiter-btn, #card-recruiter-btn');
    const closeBtn  = document.getElementById('close-drawer-btn');

    if (!overlay || !drawer) return;

    function openDrawer() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      openBtns.forEach(b => b.setAttribute('aria-expanded', 'true'));
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      openBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
      const trigger = document.getElementById('open-drawer-btn');
      if (trigger) trigger.focus();
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDrawer();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
