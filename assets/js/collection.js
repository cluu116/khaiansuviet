/* ============================================================
   KHAI ẤN SỬ VIỆT — Collection Page JavaScript
   NFC Unlock, Card Interaction, localStorage Persistence
   ============================================================ */

(function () {
  'use strict';

  /* ── State ── */
  const STORAGE_KEY = 'khaiansuviet_unlocked';
  let rawStorage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  // Lọc bỏ các ID cũ/không hợp lệ để đảm bảo thanh tiến độ đếm chính xác
  if (typeof PRODUCTS !== 'undefined') {
    const validArtifactIds = new Set(PRODUCTS.filter(p => p.type === 'artifact').map(p => String(p.id)));
    rawStorage = rawStorage.filter(id => validArtifactIds.has(String(id)));
  }

  let unlockedCards = new Set(rawStorage);

  // --- TEST MODE: Tự động mở khóa toàn bộ 14 cổ vật ---
  // if (typeof PRODUCTS !== 'undefined') {
  //   PRODUCTS.filter(p => p.type === 'artifact').forEach(p => unlockedCards.add(String(p.id)));
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(unlockedCards)));
  // }
  // ----------------------------------------------------

  let unlockCount = unlockedCards.size;

  /* ── DOM ── */
  const cardsGrid = document.getElementById('cardsGrid');
  const scanBtn = document.getElementById('scanBtn');
  const unlockCountEl = document.getElementById('unlockCount');
  const progressFill = document.getElementById('progressFill');
  const nfcOverlay = document.getElementById('nfcOverlay');

  /* ============================================================
     1. RENDER CARDS GRID
     ============================================================ */
  function renderCardsGrid() {
    if (!cardsGrid || typeof PRODUCTS === 'undefined') return;

    const collectionProducts = PRODUCTS.filter(p => p.type === 'artifact');

    // Phân nhóm 14 triều đại thành 4 kỷ nguyên lịch sử theo trình tự thời gian
    // Mỗi nhóm có tiêu đề và mô tả riêng, tạo hệ thống phân cấp trực quan
    const ERAS = [
      {
        title: "CHƯƠNG I: DẤU XƯA KHAI MỞ",
        desc: "Dấu tích nhỏ bé mở ra cánh cửa đầu tiên dẫn lối về dòng chảy Việt sử.",
        ids: ["kasv_7a7f947d", "kasv_8caaa67e", "kasv_2db5bf83"]
      },
      {
        title: "CHƯƠNG II: HÀO KHÍ GIANG SƠN",
        desc: "Khí phách dựng nước, giữ nước qua những tháng năm hào hùng",
        ids: ["kasv_09b93159", "kasv_5dcebea7", "kasv_62ba131f"]
      },
      {
        title: "CHƯƠNG III: TINH HOA VƯƠNG TRIỀU",
        desc: "Tôn vinh vẻ đẹp, quyền uy và chiều sâu văn hóa của các vương triều Việt Nam.",
        ids: ["kasv_3b6696e6", "kasv_9104dbd9", "kasv_335f5f38", "kasv_b2ddf02e", "kasv_f2c8ede5", "kasv_92e2d582", "kasv_1990acd8", "kasv_6b8c2b5f"]
      }
    ];

    const isFlatLayout = cardsGrid.getAttribute('data-layout') === 'flat';

    const renderCard = (product) => {
      const isUnlocked = unlockedCards.has(String(product.id));
      const index = collectionProducts.findIndex(p => p.id === product.id);
      const cardNum = String(index + 1).padStart(2, '0');

      return `
        <div class="dynasty-card ${isUnlocked ? 'unlocked' : ''}"
             data-dynasty="${product.id}"
             data-name="${product.dynasty}"
             data-era="${product.era}"
             data-desc="${product.description}"
             data-artifact="${product.artifact}"
             data-artifact-desc="${product.artifactDesc}"
             tabindex="0"
             role="button"
             aria-label="Thẻ bài ${product.dynasty}">
          <div class="dynasty-card__inner" ${isUnlocked ? 'style="transform:rotateY(180deg)"' : ''}>
            <!-- FRONT -->
            <div class="dynasty-card__front">
              <div class="dynasty-card__silhouette">
                <img src="${product.image}" alt="Phác thảo cổ vật" style="max-width: 100%; max-height: 100%; object-fit: contain; filter: brightness(0.15) contrast(1.5) drop-shadow(0 0 12px rgba(184,134,11,0.8)); opacity: 0.85;" />
              </div>
              <p class="dynasty-card__number">Triều đại ${cardNum}</p>
              <h3 class="dynasty-card__front-name">???</h3>
              <p class="dynasty-card__era-text">Cổ vật bí ẩn</p>
              <div class="dynasty-card__lock">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Chưa mở khóa
              </div>
            </div>
            <!-- BACK -->
            <div class="dynasty-card__back">
              <div class="dynasty-card__back-art">
                <img src="${product.image}" alt="${product.artifact}" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 4px 10px rgba(184,134,11,0.4));" />
              </div>
              <div class="dynasty-card__back-info">
                <h3 class="dynasty-card__back-name">${product.dynasty}</h3>
                <p class="dynasty-card__back-era" style="margin-bottom: 4px;">${product.era}</p>
                <p style="font-family: var(--font-heading); font-size: 0.7rem; font-weight: 700; color: var(--vang-thep); opacity: 0.85; letter-spacing: 1px; text-transform: uppercase; margin: 0;">${product.artifact}</p>
              </div>
              <div class="dynasty-card__overlay">
                <button class="dynasty-card__action" data-dynasty="${product.id}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Khám Phá
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    };

    if (isFlatLayout) {
      cardsGrid.innerHTML = collectionProducts.map(renderCard).join('');
    } else {
      let html = '';

      ERAS.forEach(era => {
        const eraProducts = era.ids.map(id => collectionProducts.find(p => p.id === id)).filter(Boolean);
        if (eraProducts.length === 0) return;

        html += `
          <div class="collection__era-section">
            <div class="collection__era-header">
              <h2 class="collection__era-title">${era.title}</h2>
              <p class="collection__era-desc">${era.desc}</p>
            </div>
            <div class="collection__grid">
        `;

        html += eraProducts.map(renderCard).join('');

        html += `
            </div>
          </div>
        `;
      });

      cardsGrid.innerHTML = html;
    }

    // Rebind events after render
    bindCardEvents();
  }

  /* ============================================================
     2. CARD EVENTS
     ============================================================ */
  function bindCardEvents() {
    const dynastyCards = document.querySelectorAll('.dynasty-card');

    dynastyCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        const dynasty = card.getAttribute('data-dynasty');

        if (!unlockedCards.has(dynasty)) {
          showToast('📱 Vui lòng chạm điện thoại vào NFC để mở khóa!');
          return;
        }

        window.location.href = 'artifact.html?id=' + dynasty;
      });

      // Keyboard accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const dynasty = card.getAttribute('data-dynasty');
          if (!unlockedCards.has(dynasty)) {
            showToast('📱 Vui lòng chạm điện thoại vào NFC để mở khóa!');
          } else {
            window.location.href = 'artifact.html?id=' + dynasty;
          }
        }
      });

      // Tilt effect (desktop only)
      if (window.matchMedia('(hover: hover)').matches) {
        let ticking = false;
        card.addEventListener('mousemove', (e) => {
          if (card.classList.contains('unlocked')) return;
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / centerY * -8;
              const rotateY = (x - centerX) / centerX * 8;
              card.querySelector('.dynasty-card__inner').style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              ticking = false;
            });
            ticking = true;
          }
        });

        card.addEventListener('mouseleave', () => {
          if (card.classList.contains('unlocked')) {
            card.querySelector('.dynasty-card__inner').style.transform = 'rotateY(180deg)';
          } else {
            card.querySelector('.dynasty-card__inner').style.transform = 'rotateX(0) rotateY(0)';
          }
        });
      }
    });
  }

  /* ============================================================
     3. UNLOCK CARD
     ============================================================ */
  function unlockCard(card) {
    const dynasty = card.getAttribute('data-dynasty');
    const name = card.getAttribute('data-name');

    if (unlockedCards.has(dynasty)) return;

    card.classList.add('unlocking');

    setTimeout(() => {
      card.classList.add('unlocked');
      card.classList.remove('unlocking');
      unlockedCards.add(dynasty);
      unlockCount = unlockedCards.size;

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedCards]));

      updateProgress();
      showToast(`✦ Đã mở khóa: ${name}! (${unlockCount}/14)`);
    }, 500);
  }

  /* ============================================================
     4. UPDATE PROGRESS
     ============================================================ */
  function updateProgress() {
    if (unlockCountEl) {
      unlockCountEl.textContent = unlockCount;
    }
    if (progressFill) {
      progressFill.style.width = `${(unlockCount / 14) * 100}%`;
    }
  }

  /* ============================================================
     5. SCAN BUTTON — REMOVED (Only NFC allowed)
     ============================================================ */
  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      showToast('📱 Vui lòng chạm điện thoại vào cổ vật để quét NFC!');
    });
  }

  /* ============================================================
     6. NFC URL AUTO-UNLOCK
     ============================================================ */
  function checkNfcUnlock() {
    const params = new URLSearchParams(window.location.search);
    const unlockId = params.get('unlock');

    if (!unlockId) return;

    const product = getProductById(unlockId);
    if (!product) {
      showToast('❌ Thẻ NFC không hợp lệ hoặc không có trong hệ thống!');
      window.history.replaceState({}, '', 'collection.html');
      return;
    }

    // Show NFC unlock animation
    if (nfcOverlay) {
      const nfcName = nfcOverlay.querySelector('.nfc-unlock__name');
      if (nfcName) nfcName.textContent = product.dynasty;

      nfcOverlay.classList.add('active');

      setTimeout(() => {
        nfcOverlay.classList.remove('active');

        // Find and unlock the card
        const card = document.querySelector(`.dynasty-card[data-dynasty="${unlockId}"]`);
        if (card && !unlockedCards.has(unlockId)) {
          // Scroll to card
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });

          setTimeout(() => {
            unlockCard(card);
          }, 500);
        } else if (unlockedCards.has(unlockId)) {
          showToast(`Triều đại ${product.dynasty} đã được mở khóa trước đó!`);
        }

        // Clean URL
        window.history.replaceState({}, '', 'collection.html');
      }, 2500);
    }
  }

  /* ============================================================
     7. INIT
     ============================================================ */
  renderCardsGrid();
  updateProgress();



  // Check NFC after a short delay to allow DOM to settle
  setTimeout(checkNfcUnlock, 800);

})();