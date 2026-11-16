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

// Case Study Chapter ScrollSpy
(function() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const nav = document.querySelector(".case-chapters");
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll("a[href^=\"#\"]"));
  if (!links.length) return;

  const targets = links.map(link => {
    const id = link.getAttribute("href").slice(1);
    return document.getElementById(id);
  }).filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  let activeId = "";
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeId = entry.target.id;
      }
    });
    if (activeId) {
      links.forEach(link => {
        if (link.getAttribute("href") === "#" + activeId) {
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      });
    }
  }, {
    rootMargin: "-20% 0px -65% 0px",
    threshold: 0
  });

  targets.forEach(target => observer.observe(target));
})();
