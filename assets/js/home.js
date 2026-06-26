/* ============================================================
   KHAI ẤN SỬ VIỆT — Homepage JavaScript
   Blind Box Grid, Mystery Artifacts, About Tabs, Contact Form
   ============================================================ */

(function () {
  'use strict';

  /* ── Blind Box Data (homepage only) ── */
  const BLIND_BOXES = [
    {
      id: 101,
      name: 'Gói Trải Nghiệm',
      qty: '1 Blind Box',
      desc: 'Mở ra 1 cổ vật bí ẩn từ 14 triều đại lịch sử Việt Nam.',
      price: 199000,
      image: 'assets/images/blind_box_1.png'
    },
    {
      id: 102,
      name: 'Gói Sưu Tầm',
      qty: '3 Blind Box',
      desc: 'Combo 3 hộp — tỷ lệ nhận phiên bản đặc biệt cao hơn.',
      price: 549000,
      image: 'assets/images/blind_box_3.png'
    },
    {
      id: 103,
      name: 'Gói Hoàng Gia',
      qty: '6 Blind Box',
      desc: 'Combo 6 hộp — chắc chắn có ít nhất 1 phiên bản đặc biệt.',
      price: 990000,
      image: 'assets/images/blind_box_6.png'
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
          <img src="${box.image}" alt="${box.name}">
        </div>
        <span class="blind-box__qty">${box.qty}</span>
        <h3 class="blind-box__name">${box.name}</h3>
        <p class="blind-box__desc">${box.desc}</p>
        <p class="blind-box__price">${formatPrice(box.price)}</p>
        <span class="blind-box__btn">MUA NGAY</span>
      </a>
    `).join('');
  }

  /* ============================================================
     2. RENDER MYSTERY ARTIFACTS GRID (14 items, all locked)
     ============================================================ */
  // The mystery grid is now rendered by collection.js using cardsGrid

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
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      showToast(`Cảm ơn ${name}! Chúng tôi sẽ liên hệ lại sớm nhất.`);
      contactForm.reset();
    });
  }

  /* ============================================================
     5. PARALLAX EFFECT
     ============================================================ */
  const heroPattern = document.querySelector('.hero__bg-pattern');
  const heroModelGlow = document.querySelector('.hero__model-glow');

  function handleParallax() {
    const scrollY = window.scrollY;
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    const heroHeight = homeSection.offsetHeight;

    if (scrollY < heroHeight) {
      const speed = scrollY * 0.3;
      if (heroPattern) heroPattern.style.transform = `translateY(${speed}px)`;
      if (heroModelGlow) heroModelGlow.style.transform = `scale(${1 + scrollY * 0.0003})`;
    }
  }

  window.addEventListener('scroll', () => requestAnimationFrame(handleParallax));

  /* ============================================================
     6. ACTIVE NAV LINK ON SCROLL
     ============================================================ */
  const sections = document.querySelectorAll('.section[id]');
  const navLinkItems = document.querySelectorAll('.navbar__link');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinkItems.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => requestAnimationFrame(updateActiveNavLink));

  /* ============================================================
     INIT
     ============================================================ */
  renderBlindBoxes();

})();
