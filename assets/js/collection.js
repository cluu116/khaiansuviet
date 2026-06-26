/* ============================================================
   KHAI ẤN SỬ VIỆT — Collection Page JavaScript
   NFC Unlock, Card Interaction, Modal, localStorage Persistence
   ============================================================ */

(function () {
  'use strict';

  /* ── State ── */
  const STORAGE_KEY = 'khaiansuviet_unlocked';
  let unlockedCards = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  let unlockCount = unlockedCards.size;

  /* ── DOM ── */
  const cardsGrid = document.getElementById('cardsGrid');
  const scanBtn = document.getElementById('scanBtn');
  const unlockCountEl = document.getElementById('unlockCount');
  const progressFill = document.getElementById('progressFill');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalArBtn = document.getElementById('modalArBtn');
  const nfcOverlay = document.getElementById('nfcOverlay');

  // Modal content
  const modalLabel = document.getElementById('modalLabel');
  const modalName = document.getElementById('modalName');
  const modalEra = document.getElementById('modalEra');
  const modalDesc = document.getElementById('modalDesc');
  const modalArtifactName = document.getElementById('modalArtifactName');
  const modalArtifactDesc = document.getElementById('modalArtifactDesc');

  /* ============================================================
     1. RENDER CARDS GRID
     ============================================================ */
  function renderCardsGrid() {
    if (!cardsGrid || typeof PRODUCTS === 'undefined') return;

    const collectionProducts = PRODUCTS.filter(p => p.id <= 14);

    const ERAS = [
      {
        title: "Kỷ Nguyên Lập Quốc & Bắc Thuộc",
        desc: "Những bước đi đầu tiên của dân tộc và ngàn năm đấu tranh bảo vệ nòi giống",
        ids: [1, 2, 3, 14]
      },
      {
        title: "Buổi Đầu Độc Lập",
        desc: "Giành lại non sông, xưng đế định đô, khẳng định chủ quyền",
        ids: [4, 5, 6]
      },
      {
        title: "Đại Việt Tỏa Sáng",
        desc: "Thời kỳ phát triển rực rỡ nhất về văn hóa, quân sự và chính trị",
        ids: [7, 8, 9]
      },
      {
        title: "Nam Bắc Triều & Cận Đại",
        desc: "Sự phân tranh quyền lực, những cuộc khởi nghĩa lớn và đế nghiệp cuối cùng",
        ids: [10, 11, 12, 13]
      }
    ];

    const isFlatLayout = cardsGrid.getAttribute('data-layout') === 'flat';

    const renderCard = (product) => {
      const isUnlocked = unlockedCards.has(String(product.id));
      const cardNum = String(product.id).padStart(2, '0');

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
                <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                  ${product.silhouetteSvg}
                </svg>
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
                <p style="font-family: var(--font-display); font-size: 0.7rem; font-weight: 700; color: var(--vang-thep); opacity: 0.85; letter-spacing: 1px; text-transform: uppercase; margin: 0;">${product.artifact}</p>
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
          showToast('📱 Vui lòng chạm điện thoại vào thẻ bài thật để mở khóa!');
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
            showToast('📱 Vui lòng chạm điện thoại vào thẻ bài thật để mở khóa!');
          } else {
            window.location.href = 'artifact.html?id=' + dynasty;
          }
        }
      });

      // Tilt effect (desktop only)
      if (window.matchMedia('(hover: hover)').matches) {
        card.addEventListener('mousemove', (e) => {
          if (card.classList.contains('unlocked')) return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * -8;
          const rotateY = (x - centerX) / centerX * 8;
          card.querySelector('.dynasty-card__inner').style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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
      showToast('📱 Vui lòng chạm điện thoại vào thẻ bài thật để quét NFC!');
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
    if (!product) return;

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
     7. MODAL — Open / Close
     ============================================================ */
  function openModal(card) {
    const dynasty = card.getAttribute('data-dynasty');
    const name = card.getAttribute('data-name');
    const era = card.getAttribute('data-era');
    const desc = card.getAttribute('data-desc');
    const artifact = card.getAttribute('data-artifact');
    const artifactDesc = card.getAttribute('data-artifact-desc');

    if (modalLabel) modalLabel.textContent = `Triều đại ${dynasty.padStart(2, '0')}`;
    if (modalName) modalName.textContent = name;
    if (modalEra) modalEra.textContent = era;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalArtifactName) modalArtifactName.textContent = `Hiện vật: ${artifact}`;
    if (modalArtifactDesc) modalArtifactDesc.textContent = artifactDesc;

    // Load 3D model with AR support
    const modelViewer = document.getElementById('modalModelViewer');
    if (modelViewer) {
      const product = getProductById(dynasty);
      if (product && product.model) {
        modelViewer.innerHTML = `
          <model-viewer
            id="arModelViewer"
            src="${encodeURI(product.model)}"
            alt="Mô hình 3D ${artifact}"
            auto-rotate
            camera-controls
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="auto"
            shadow-intensity="1"
            environment-image="neutral"
            style="width:100%;height:100%;background:transparent;"
          >
            <button type="button" slot="ar-button" style="
              position:absolute;bottom:16px;left:50%;transform:translateX(-50%);
              padding:10px 24px;font-family:'Cormorant Garamond',serif;font-size:0.75rem;font-weight:700;
              letter-spacing:2px;text-transform:uppercase;
              color:#1A1108;background:linear-gradient(135deg,#B8860B,#DAA520);
              border:none;border-radius:6px;cursor:pointer;
              box-shadow:0 4px 15px rgba(184,134,11,0.3);
            ">📱 XEM AR</button>
            <div slot="poster" class="modal__model-placeholder">
              <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"/>
                <path d="M40 10 L40 70 M10 25 L70 55 M70 25 L10 55"/>
              </svg>
              <span>Đang tải mô hình...</span>
            </div>
          </model-viewer>
        `;
      } else {
        modelViewer.innerHTML = `
          <div class="modal__model-placeholder">
            <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"/>
              <path d="M40 10 L40 70 M10 25 L70 55 M70 25 L10 55"/>
            </svg>
            <span>MÔ HÌNH 3D</span>
            <span style="font-size:0.65rem;opacity:0.5;">Chưa có file .glb cho triều đại này</span>
          </div>
        `;
      }
    }

    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalArBtn) {
    modalArBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const dynasty = document.querySelector('.dynasty-card.unlocked.active') 
                        ? document.querySelector('.dynasty-card.unlocked.active').getAttribute('data-dynasty')
                        : new URLSearchParams(window.location.search).get('unlock');
      
      // Fallback lấy id từ text nếu cần, nhưng an toàn nhất là lấy thẻ model-viewer's src
      const arViewer = document.getElementById('arModelViewer');
      let modelUrl = arViewer ? arViewer.getAttribute('src') : null;

      if (!modelUrl) {
         if (typeof showToast === 'function') showToast('⚠️ Không tìm thấy file mô hình 3D.');
         return;
      }

      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      if (isAndroid) {
        if (typeof showToast === 'function') showToast('Đang mở AR qua Google Scene Viewer...');
        const absoluteModelUrl = new URL(modelUrl, window.location.href).toString();
        // Giả sử artifact name lấy từ modalArtifactName
        const artifactName = modalArtifactName ? modalArtifactName.textContent : 'Mô hình 3D';
        const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(absoluteModelUrl)}&title=${encodeURIComponent(artifactName)}&mode=ar_only#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;
        
        const a = document.createElement('a');
        a.href = intentUrl;
        a.click();
        return;
      }

      if (isIOS) {
        // Find the product to check if it has a .usdz file
        const productId = new URLSearchParams(window.location.search).get('id') || document.querySelector('.dynasty-card.unlocked.active')?.getAttribute('data-id');
        // Let's extract ID from modelUrl if possible, or use the global PRODUCTS array
        let usdzUrl = null;
        if (typeof PRODUCTS !== 'undefined') {
           const prod = PRODUCTS.find(p => p.model && decodeURI(p.model).includes(decodeURI(modelUrl).split('/').pop()));
           if (prod && prod.usdz) usdzUrl = prod.usdz;
        }

        if (usdzUrl) {
          if (typeof showToast === 'function') showToast('Đang mở AR qua iOS Quick Look...');
          const absoluteUsdzUrl = new URL(usdzUrl, window.location.href).toString();
          const a = document.createElement('a');
          a.href = absoluteUsdzUrl;
          a.rel = "ar";
          a.appendChild(document.createElement('img'));
          a.click();
        } else {
          if (typeof showToast === 'function') showToast('⚠️ Tính năng AR cho cổ vật này trên iPhone/iPad yêu cầu file .usdz.');
        }
        return;
      }

      if (typeof showToast === 'function') showToast('💡 Vui lòng mở trang này trên điện thoại di động để trải nghiệm AR!');
    });
  }

  /* ============================================================
     8. INIT
     ============================================================ */
  renderCardsGrid();
  updateProgress();

  // Check NFC after a short delay to allow DOM to settle
  setTimeout(checkNfcUnlock, 1500);

})();
