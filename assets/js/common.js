/* ============================================================
   KHAI ẤN SỬ VIỆT — Common JavaScript
   Shared logic: Preloader, Navbar, Scroll, Toast, Scroll-to-Top
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
            handleScrollTopVisibility();
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      });
    }
  });

  /* ============================================================
     3. HAMBURGER MENU + OVERLAY BACKDROP
     ============================================================ */

  // Create overlay element dynamically
  let navOverlay = document.getElementById('navOverlay');
  if (!navOverlay && hamburger) {
    navOverlay = document.createElement('div');
    navOverlay.id = 'navOverlay';
    navOverlay.className = 'navbar__overlay';
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(navOverlay, document.body.firstChild);
  }

  function openMenu() {
    if (!hamburger || !navLinks) return;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    if (navOverlay) navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!hamburger || !navLinks) return;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && navLinks) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'navLinks');

    hamburger.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when overlay is clicked
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  // Close menu on nav link click
  document.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
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
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

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
     6. TOAST NOTIFICATION (Global) — XSS Safe
     ============================================================ */
  let toastTimeout;

  window.showToast = function (message) {
    if (!toast) return;
    clearTimeout(toastTimeout);

    // XSS-safe: use textContent instead of innerHTML
    toast.textContent = '';
    const textDiv = document.createElement('div');
    textDiv.className = 'toast__text';
    textDiv.textContent = message;
    toast.appendChild(textDiv);

    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  /* ============================================================
     7. SCROLL-TO-TOP BUTTON
     ============================================================ */
  let scrollTopBtn = document.getElementById('scrollTopBtn');

  // Create button if it doesn't exist in HTML
  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.setAttribute('aria-label', 'Về đầu trang');
    scrollTopBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function handleScrollTopVisibility() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  /* ============================================================
     8. SHARED UTILITIES
     ============================================================ */
  window.formatPrice = function(price) {
    if (!price) return 'Liên hệ';
    return price.toLocaleString('vi-VN') + '₫';
  };

  window.getProductById = function(id) {
    if (typeof PRODUCTS === 'undefined') return null;
    return PRODUCTS.find(p => p.id === id);
  };

  window.getStatusClass = function(status) {
    if (status === 'in-stock') return 'badge--instock';
    if (status === 'pre-order') return 'badge--preorder';
    if (status === 'sold-out') return 'badge--soldout';
    return '';
  };

  window.getStatusLabel = function(status) {
    if (status === 'in-stock') return 'Còn hàng';
    if (status === 'pre-order') return 'Đặt trước';
    if (status === 'sold-out') return 'Hết hàng';
    return '';
  };

  window.getRelatedProducts = function(currentId, limit = 4) {
    if (typeof PRODUCTS === 'undefined') return [];
    const current = getProductById(currentId);
    if (!current) return [];
    
    let related = PRODUCTS.filter(p => p.id !== currentId && p.type === current.type);
    if (related.length === 0) {
      related = PRODUCTS.filter(p => p.id !== currentId);
    }
    return related.slice(0, limit);
  };

  let modelViewerPromise = null;
  window.ensureModelViewerLoaded = function () {
    if (customElements.get('model-viewer')) return Promise.resolve();
    if (modelViewerPromise) return modelViewerPromise;

    modelViewerPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src*="model-viewer.min.js"]');
      if (existingScript) {
        if (customElements.get('model-viewer') || existingScript.readyState === 'complete' || existingScript.readyState === 'loaded') {
          resolve();
        } else {
          existingScript.addEventListener('load', resolve, { once: true });
          existingScript.addEventListener('error', reject, { once: true });
        }
        return;
      }

      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
      console.log('Lazy loaded model-viewer script');
    });

    return modelViewerPromise;
  };

  /* ============================================================
     9. SERVICE WORKER REGISTRATION
     ============================================================ */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registered with scope:', registration.scope);
        })
        .catch(err => {
          console.error('ServiceWorker registration failed:', err);
        });
    });
  }

})();
