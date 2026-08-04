/* ============================================================
   KHAI ẤN SỬ VIỆT — Homepage JavaScript
   Blind Box Grid, Mystery Artifacts, About Tabs, Contact Form
   ============================================================ */

(function () {
  'use strict';

  // Signal to common.js that this page has its own merged scroll handler
  window._homeScrollActive = true;

  /* ============================================================
     1. RENDER BLIND BOX GRID
     ============================================================ */
  const blindBoxGrid = document.getElementById('blindBoxGrid');

  function renderBlindBoxes() {
    if (!blindBoxGrid) return;

    const t = window.getI18nText || (k => k);

    /* ── Blind Box Data (derived from PRODUCTS in data.js) ── */
    const BLIND_BOXES = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : [])
      .filter(p => p.type === 'blindbox')
      .map(p => ({
        id: p.id,
        name: p.artifact,
        qty: p.artifact.includes('Basic') ? t('product.basic')
           : p.artifact.includes('Standard') ? t('product.standard')
           : p.artifact.includes('Premium') ? t('product.premium')
           : p.artifact.includes('Tiêu Chuẩn') ? t('product.standard')
           : p.artifact.includes('Cao Cấp') ? t('product.premium')
           : t('product.basic'),
        desc: p.description,
        priceBase: p.price,
        priceBox: p.priceBox,
        priceWood: p.priceWood,
        image: p.image
      }));

    blindBoxGrid.innerHTML = BLIND_BOXES.map(box => {
      let tierClass = '';
      if (box.id === 'box_bdddc48ec18c4fc998ee351dc0eaa98d') tierClass = 'blind-box__card--basic';
      else if (box.id === 'box_575e2155ebbf42ecbc666f32ccc37aab') tierClass = 'blind-box__card--standard';
      else if (box.id === 'box_0234e6d19b374b35ba13cd3fa9f9d18b') tierClass = 'blind-box__card--premium';

      return `
      <a href="product.html?id=${box.id}" class="blind-box__card ${tierClass}" ${tierClass === 'blind-box__card--premium' ? `data-badge="★ ${t('product.most_popular')}"` : ''}>
        <div class="blind-box__image">
          <img src="${box.image}" alt="${box.name}" width="1024" height="1024" loading="lazy" decoding="async">
        </div>
        <div class="blind-box__qty">${box.qty}</div>
        <h3 class="blind-box__name">${box.name}</h3>
        <p class="blind-box__desc">${box.desc}</p>
        <div class="blind-box__prices">
          <div class="price-row">
            <span class="price-label">${t('product.no_box')}</span>
            <span class="price-val">${formatPrice(box.priceBase)}</span>
          </div>
          <div class="price-row">
            <span class="price-label">${t('product.with_box')}</span>
            <span class="price-val">${formatPrice(box.priceBox)}</span>
          </div>
          </div>
        </div>
        <span class="blind-box__btn">${t('product.buy_now')}</span>
      </a>
      `;
    }).join('');
  }

  // Lắng nghe sự kiện chuyển đổi ngôn ngữ
  window.addEventListener('languageChanged', () => {
    renderBlindBoxes();
  });


  /* ============================================================
     3. ABOUT US — Tab Switching
     ============================================================ */
  const aboutTabs = document.querySelectorAll('.about__tab');
  const aboutPanels = document.querySelectorAll('.about__panel');

  aboutTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      aboutTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      aboutPanels.forEach((panel) => {
        panel.classList.remove('active');
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  /* ============================================================
     4. CONTACT FORM
     ============================================================ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<style>@keyframes kasv-spin { 100% { transform: rotate(360deg); } }</style><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; animation: kasv-spin 1s linear infinite; vertical-align: middle;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> <span style="vertical-align: middle;">' + (window.getI18nText ? window.getI18nText('contact.submitting') : "ĐANG GỬI...") + '</span>';
      submitBtn.disabled = true;

      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const phone = document.getElementById('contactPhone').value;
      const message = document.getElementById('contactMessage').value;

      const contactData = {
        type: "contact",
        name: name,
        email: email,
        phone: phone,
        message: message,
        lang: typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'vi'
      };

      try {
        const response = await fetch(GAS_API_URL, {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(contactData)
        });

        const result = await response.json();
        if (result.status === "success") {
          showToast(window.getI18nText ? window.getI18nText('toast.contact_success').replace('{name}', name) : `Cảm ơn ${name}! Chúng tôi đã nhận được liên hệ.`);
          contactForm.reset();
        } else {
          showToast((window.getI18nText ? window.getI18nText('toast.server_error') : "Có lỗi xảy ra từ server: ") + result.message);
        }
      } catch (error) {
        console.error("Lỗi gửi form liên hệ:", error);
        showToast(window.getI18nText ? window.getI18nText('toast.network_error') : "Đã xảy ra lỗi mạng. Vui lòng thử lại!");
      } finally {
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
      }
    });
  }

  /* ============================================================
     5. MERGED SCROLL HANDLER — Navbar + Parallax + Active Nav
     Single rAF loop for all scroll-dependent effects
     ============================================================ */
  const heroPattern = document.querySelector('.hero__bg-pattern');
  const heroModelGlow = document.querySelector('.hero__model-glow');
  const sections = document.querySelectorAll('.section[id]');
  const navLinkItems = document.querySelectorAll('.navbar__link');

  // Cache layout values
  let homeHeight = 0;
  let sectionLayouts = [];

  function cacheLayout() {
    const homeSection = document.getElementById('home');
    homeHeight = homeSection ? homeSection.offsetHeight : 0;

    sectionLayouts = Array.from(sections).map(section => ({
      id: section.getAttribute('id'),
      top: section.offsetTop,
      height: section.offsetHeight
    }));
  }

  // Initial cache and update on resize
  setTimeout(cacheLayout, 100);
  window.addEventListener('resize', () => {
    // debounce optional, simplified here
    setTimeout(cacheLayout, 150);
  });

  // Cache scroll-to-top reference (avoid getElementById every frame)
  let _scrollTopBtn = null;

  function handleScrollEffects() {
    const scrollY = window.scrollY;

    // Navbar scroll behavior (merged from common.js)
    if (window._handleNavbarScroll) {
      window._handleNavbarScroll();
    }

    // Scroll-to-top button visibility
    if (!_scrollTopBtn) _scrollTopBtn = document.getElementById('scrollTopBtn');
    if (_scrollTopBtn) {
      if (scrollY > 400) {
        _scrollTopBtn.classList.add('visible');
      } else {
        _scrollTopBtn.classList.remove('visible');
      }
    }

    // Parallax
    if (homeHeight > 0 && scrollY < homeHeight) {
      const speed = scrollY * 0.3;
      if (heroPattern) heroPattern.style.transform = `translateY(${speed}px)`;
      if (heroModelGlow) heroModelGlow.style.transform = `scale(${1 + scrollY * 0.0003})`;
    }

    // Active nav link highlight
    const scrollPos = scrollY + 120;
    sectionLayouts.forEach((layout) => {
      if (scrollPos >= layout.top && scrollPos < layout.top + layout.height) {
        navLinkItems.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === layout.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  let scrollEffectsTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollEffectsTicking) {
      requestAnimationFrame(() => {
        handleScrollEffects();
        scrollEffectsTicking = false;
      });
      scrollEffectsTicking = true;
    }
  });


  /* ============================================================
     INIT
     ============================================================ */
  renderBlindBoxes();

})();