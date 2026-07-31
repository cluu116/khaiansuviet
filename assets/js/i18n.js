// assets/js/i18n.js
(async function() {
  'use strict';

  const defaultLang = 'vi';
  let currentLang = localStorage.getItem('appLang') || defaultLang;
  let translations = {};

  async function loadTranslations(lang) {
    try {
      const response = await fetch(`assets/data/lang/${lang}.json`);
      if (!response.ok) throw new Error('Network response was not ok');
      translations = await response.json();
      return translations;
    } catch (error) {
      console.error('Could not load translations:', error);
      return {};
    }
  }

  function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translations[key];
          } else if (el.hasAttribute('data-label')) {
            el.setAttribute('data-label', translations[key]);
          } else if (translations[key].includes('<')) {
              el.innerHTML = translations[key];
          } else {
              el.textContent = translations[key];
          }
        }
    });
    
    // Update active state of language switcher items
    document.querySelectorAll('.lang-switcher__item').forEach(btn => {
      if (btn.dataset.lang === currentLang) {
        btn.classList.add('active');
        // Update main toggle button
        const toggleIcon = document.getElementById('langIcon');
        const toggleText = document.getElementById('langText');
        if (toggleIcon && toggleText) {
           toggleIcon.src = currentLang === 'vi' ? 'https://flagcdn.com/w20/vn.png' : 'https://flagcdn.com/w20/gb.png';
             toggleIcon.srcset = currentLang === 'vi' ? 'https://flagcdn.com/w40/vn.png 2x' : 'https://flagcdn.com/w40/gb.png 2x';
           toggleText.textContent = currentLang === 'vi' ? 'VI' : 'EN';
        }
      } else {
        btn.classList.remove('active');
      }
    });
  }

  let products_vi = null;
  let products_en = null;

  async function loadProductsData(lang) {
    // Backup original Vietnamese products
    if (!products_vi && typeof PRODUCTS !== 'undefined') {
      products_vi = JSON.parse(JSON.stringify(PRODUCTS));
    }

    if (lang === 'en') {
      if (!products_en) {
        try {
          const res = await fetch('assets/data/data-en.json');
          if (res.ok) {
            products_en = await res.json();
          }
        } catch (e) {
          console.error('Failed to load EN products data', e);
        }
      }
      if (products_en && typeof PRODUCTS !== 'undefined') {
        PRODUCTS.forEach(p => {
          const enData = products_en[p.id];
          if (enData) {
            p.dynasty = enData.dynasty || p.dynasty;
            p.era = enData.era || p.era;
            p.artifact = enData.artifact || p.artifact;
            p.description = enData.description || p.description;
          }
        });
      }
    } else {
      // Restore Vietnamese products
      if (products_vi && typeof PRODUCTS !== 'undefined') {
        PRODUCTS.forEach((p, idx) => {
          const viData = products_vi[idx];
          if (viData && p.id === viData.id) {
            p.dynasty = viData.dynasty;
            p.era = viData.era;
            p.artifact = viData.artifact;
            p.description = viData.description;
          }
        });
      }
    }
  }

  window.getCurrentLang = function() {
    return currentLang;
  };

  window.changeLanguage = async function(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('appLang', currentLang);
    document.documentElement.lang = currentLang;
    
    // Clear product details cache in common.js
    if (typeof resetProductDetailsCache === 'function') {
      resetProductDetailsCache();
    }
    
    await Promise.all([
      loadTranslations(currentLang),
      loadProductsData(currentLang)
    ]);
    
    updateContent();
    
    // Dispatch event so other pages (like artifact.js) can re-render
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
  };

  // Initialization
  document.addEventListener('DOMContentLoaded', async () => {
    document.documentElement.lang = currentLang;
    await Promise.all([
      loadTranslations(currentLang),
      loadProductsData(currentLang)
    ]);
    updateContent();
    
    // Dispatch event so other pages can re-render with the correct language on initial load
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
    
    // Dropdown toggle logic
    const langSwitcher = document.getElementById('langDropdown');
    const langToggle = document.getElementById('langToggle');

    if (langToggle && langSwitcher) {
      // Mobile positioning logic
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          if (langSwitcher.parentElement !== document.body) {
            document.body.appendChild(langSwitcher);
            langSwitcher.classList.add('lang-switcher--mobile');
          }
        } else {
          const navLinks = document.getElementById('navLinks');
          if (navLinks && langSwitcher.parentElement !== navLinks) {
            navLinks.appendChild(langSwitcher);
            langSwitcher.classList.remove('lang-switcher--mobile');
          }
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        langSwitcher.classList.toggle('open');
        langToggle.setAttribute('aria-expanded', langSwitcher.classList.contains('open'));
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!langSwitcher.contains(e.target)) {
          langSwitcher.classList.remove('open');
          langToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Bind click events to language switcher items
    document.querySelectorAll('.lang-switcher__item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        changeLanguage(btn.dataset.lang);
        if (langSwitcher && langToggle) {
          langSwitcher.classList.remove('open');
          langToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  // Export for dynamic elements (like JS rendered cards)
  window.getI18nText = function(key) {
    return translations[key] || key;
  };
})();
