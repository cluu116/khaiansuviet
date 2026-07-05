/* ============================================================
   KHAI ẤN SỬ VIỆT — Common JavaScript
   Shared logic: Preloader, Navbar, Scroll, Toast
   Used across all pages
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM Elements ── */
  const preloader = document.getElementById('preloader');
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const toast = document.getElementById('toast');

  /* ============================================================
     1. PRELOADER
     ============================================================ */
  function hidePreloader() {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }, 250);
  }

  window.addEventListener('load', hidePreloader);

  // Fallback: hide after 5s
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 5000);

  // Prevent body scroll during preloader
  document.body.style.overflow = 'hidden';

  /* ============================================================
     2. NAVBAR SCROLL BEHAVIOR
     ============================================================ */
  const SCROLL_THRESHOLD = 50;

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Export for home.js to call from merged scroll handler (avoids duplicate rAF)
  window._handleNavbarScroll = handleNavbarScroll;

  // Standalone scroll listener only if home.js is NOT loaded (non-homepage pages)
  window.addEventListener('load', () => {
    if (!window._homeScrollActive) {
      let scrollTicking = false;
      window.addEventListener('scroll', () => {
        if (!scrollTicking) {
          requestAnimationFrame(() => {
            handleNavbarScroll();
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      });
    }
  });

  /* ============================================================
     3. HAMBURGER MENU
     ============================================================ */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  // Close menu on nav link click
  document.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', () => {
      if (hamburger && navLinks) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  });

  /* ============================================================
     4. SMOOTH SCROLL (for anchor links on same page)
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').substring(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPos = targetEl.offsetTop - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
      }
    });
  });

  /* ============================================================
     5. INTERSECTION OBSERVER — Scroll Animations
     ============================================================ */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
    revealObserver.observe(el);
  });

  /* ============================================================
     6. TOAST NOTIFICATION (Global)
     ============================================================ */
  let toastTimeout;

  window.showToast = function (message) {
    if (!toast) return;
    clearTimeout(toastTimeout);

    toast.innerHTML = `<div class="toast__text">${message}</div>`;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

})();
