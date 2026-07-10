/* ============================================================
   KHAI ẤN SỬ VIỆT — Homepage JavaScript
   Blind Box Grid, Mystery Artifacts, About Tabs, Contact Form
   ============================================================ */

(function () {
  'use strict';

  // Signal to common.js that this page has its own merged scroll handler
  window._homeScrollActive = true;

  /* ── Blind Box Data (homepage only) ── */
  const BLIND_BOXES = [
    {
      id: "kasv_c9163e7c",
      name: 'ẤN TÍCH VIỆT SỬ - Basic',
      qty: 'Dòng Cơ Bản',
      desc: 'Bao gồm: Tiền Thái Bình Hưng Bảo, Nỏ thần An Dương Vương, Gạch Đại Việt quốc quân thành chuyên.',
      priceBase: 239000,
      priceBox: 299000,
      priceWood: 499000,
      image: 'assets/images/blindbox/blind_box_1.png'
    },
    {
      id: "kasv_a78d2eec",
      name: 'ẤN TÍCH VIỆT SỬ - Standard',
      qty: 'Dòng Tiêu Chuẩn',
      desc: 'Bao gồm: Súng thần công, Thuyền chiến Đàng Trong, Đá Thành Nhà Hồ.',
      priceBase: 269000,
      priceBox: 329000,
      priceWood: 529000,
      image: 'assets/images/blindbox/blind_box_3.png'
    },
    {
      id: "kasv_be952029",
      name: 'ẤN TÍCH VIỆT SỬ - Premium',
      qty: 'Dòng Cao Cấp',
      desc: 'Bao gồm: Rồng đá điện Kính Thiên, Sa hình Cọc gỗ Bạch Đằng, Trống đồng Đông Sơn, Ấm hình voi bằng đồng, Ấn tín nhà Trần, Lư hương gốm men nâu, Đầu rồng thời Lý.',
      priceBase: 299000,
      priceBox: 359000,
      priceWood: 559000,
      image: 'assets/images/blindbox/blind_box_6.png'
    }
  ];

  /* ============================================================
     1. RENDER BLIND BOX GRID
     ============================================================ */
  const blindBoxGrid = document.getElementById('blindBoxGrid');

  function renderBlindBoxes() {
    if (!blindBoxGrid) return;

    blindBoxGrid.innerHTML = BLIND_BOXES.map(box => `
      <a href="product.html?id=${box.id}" class="blind-box__card">
        <div class="blind-box__image">
          <img src="${box.image}" alt="${box.name}" width="1024" height="1024" loading="lazy" decoding="async">
        </div>
        <div class="blind-box__qty">${box.qty}</div>
        <h3 class="blind-box__name">${box.name}</h3>
        <p class="blind-box__desc">${box.desc}</p>
        <div class="blind-box__prices">
          <div class="price-row">
            <span class="price-label">Không hộp:</span>
            <span class="price-val">${formatPrice(box.priceBase)}</span>
          </div>
          <div class="price-row">
            <span class="price-label">Có hộp:</span>
            <span class="price-val">${formatPrice(box.priceBox)}</span>
          </div>
          <div class="price-row">
            <span class="price-label">Hộp gỗ:</span>
            <span class="price-val highlight">${formatPrice(box.priceWood)}</span>
          </div>
        </div>
        <span class="blind-box__btn">MUA NGAY</span>
      </a>
    `).join('');
  }


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
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Đang gửi...";
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
        message: message
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
          showToast(`Cảm ơn ${name}! Chúng tôi đã nhận được liên hệ.`);
          contactForm.reset();
        } else {
          showToast("Có lỗi xảy ra từ server: " + result.message);
        }
      } catch (error) {
        console.error("Lỗi gửi form liên hệ:", error);
        showToast("Đã xảy ra lỗi mạng. Vui lòng thử lại!");
      } finally {
        submitBtn.innerText = originalBtnText;
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

  function handleScrollEffects() {
    const scrollY = window.scrollY;

    // Navbar scroll behavior (merged from common.js)
    if (window._handleNavbarScroll) {
      window._handleNavbarScroll();
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
  /* ============================================================
     INIT
     ============================================================ */
  renderBlindBoxes();

})();
