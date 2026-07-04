/* ============================================================
   KHAI ẤN SỬ VIỆT — Homepage JavaScript
   Blind Box Grid, Mystery Artifacts, About Tabs, Contact Form
   ============================================================ */

(function () {
  'use strict';

  /* ── Blind Box Data (homepage only) ── */
  const BLIND_BOXES = [
    {
      id: "kasv_c9163e7c",
      name: 'Gói Trải Nghiệm',
      qty: '1 Blind Box',
      desc: 'Mở ra 1 cổ vật bí ẩn từ 14 triều đại lịch sử Việt Nam.',
      price: 199000,
      image: 'assets/images/blindbox/blind_box_1.png'
    },
    {
      id: "kasv_a78d2eec",
      name: 'Gói Sưu Tầm',
      qty: '3 Blind Box',
      desc: 'Combo 3 hộp — tỷ lệ nhận phiên bản đặc biệt cao hơn.',
      price: 549000,
      image: 'assets/images/blindbox/blind_box_3.png'
    },
    {
      id: "kasv_be952029",
      name: 'Gói Hoàng Gia',
      qty: '6 Blind Box',
      desc: 'Combo 6 hộp — chắc chắn có ít nhất 1 phiên bản đặc biệt.',
      price: 990000,
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
     5. PARALLAX + ACTIVE NAV — Gộp chung 1 scroll handler để tối ưu
     ============================================================ */
  const heroPattern = document.querySelector('.hero__bg-pattern');
  const heroModelGlow = document.querySelector('.hero__model-glow');
  const sections = document.querySelectorAll('.section[id]');
  const navLinkItems = document.querySelectorAll('.navbar__link');

  function handleScrollEffects() {
    const scrollY = window.scrollY;

    // Parallax
    const homeSection = document.getElementById('home');
    if (homeSection) {
      const heroHeight = homeSection.offsetHeight;
      if (scrollY < heroHeight) {
        const speed = scrollY * 0.3;
        if (heroPattern) heroPattern.style.transform = `translateY(${speed}px)`;
        if (heroModelGlow) heroModelGlow.style.transform = `scale(${1 + scrollY * 0.0003})`;
      }
    }

    // Active nav link highlight
    const scrollPos = scrollY + 120;
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
     6. AR GUIDE ANIMATION SYNC
     ============================================================ */
  const arGuideCards = document.querySelectorAll('.ar-guide__card');
  const guidePath = document.getElementById('guidePath');
  const guideTraveler = document.getElementById('guideTraveler');

  if (arGuideCards.length > 0 && guidePath && guideTraveler) {
    const totalDuration = 16000; // 16s cycle
    const pathLength = guidePath.getTotalLength();
    
    function updateArGuideHighlight(timestamp) {
      if (!timestamp) timestamp = performance.now();
      
      const currentCycleTime = timestamp % totalDuration;
      const progress = currentCycleTime / totalDuration;
      
      // Get exact point on SVG path
      const point = guidePath.getPointAtLength(progress * pathLength);
      
      // Update HTML Traveler position (using % allows it to perfectly track the stretched SVG)
      guideTraveler.style.left = `${point.x}%`;
      guideTraveler.style.top = `${point.y}%`;
      
      // Find the card whose center is closest to or just passed by the traveler
      // We do this by checking the traveler's vertical position relative to the cards
      const travelerRect = guideTraveler.getBoundingClientRect();
      const travelerCenterY = travelerRect.top + travelerRect.height / 2;
      
      let activeIndex = 0;
      arGuideCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        // If traveler is within or past the top of the card (with a 50px threshold for early activation)
        if (travelerCenterY >= cardRect.top - 50) {
          activeIndex = index;
        }
      });
      
      arGuideCards.forEach((card, index) => {
        if (index === activeIndex) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
      
      requestAnimationFrame(updateArGuideHighlight);
    }
    
    requestAnimationFrame(updateArGuideHighlight);
  }

  /* ============================================================
     INIT
     ============================================================ */
  renderBlindBoxes();

})();
