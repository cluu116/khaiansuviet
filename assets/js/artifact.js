/**
 * Artifact Detail Page — 3D/AR Engine
 * Optimized for heavy models (100MB+), smooth loading UX, robust AR launch
 */

(function () {
  'use strict';

  /* ============================================================
     CONSTANTS
     ============================================================ */
  const MAX_RETRIES = 3;
  const RETRY_BASE_DELAY = 2000; // ms, exponential backoff base

  /* ============================================================
     STATE MANAGEMENT
     ============================================================ */
  const state = {
    product: null,
    isModelLoaded: false,
    isLoading: false,
    retryCount: 0,
    activeModelViewer: null, // keep reference for cleanup
  };

  /* ============================================================
     DOM ELEMENTS
     ============================================================ */
  const DOM = {
    dynasty: document.getElementById('artifactDynasty'),
    era: document.getElementById('artifactEra'),
    name: document.getElementById('artifactName'),
    desc: document.getElementById('artifactDesc'),
    dynastyDesc: document.getElementById('dynastyDesc'),
    viewerContainer: document.getElementById('artifactModelViewer'),
  };

  /* ============================================================
     INITIALIZATION & CLEANUP
     ============================================================ */
  async function init() {
    getProduct();

    if (!state.product) return;

    try {
      const res = await fetch('assets/data/products-detail.json');
      const allDetails = await res.json();
      const detail = allDetails[state.product.id];
      if (detail) {
        Object.assign(state.product, detail);
      }
    } catch (e) {
      console.error('Không thể tải chi tiết sản phẩm:', e);
    }

    populateProductInfo();
    renderPlaceholder();

    // Cleanup khi chuyển trang — giải phóng WebGL context và bộ nhớ
    window.addEventListener('beforeunload', cleanup);
  }

  function cleanup() {
    if (state.activeModelViewer) {
      try {
        // Gỡ event listeners và DOM node
        state.activeModelViewer.removeAttribute('src');
        state.activeModelViewer.remove();
      } catch (_) { /* silent */ }
      state.activeModelViewer = null;
    }
    state.isModelLoaded = false;
    state.isLoading = false;
  }

  /* ============================================================
     CORE FUNCTIONS
     ============================================================ */

  function getProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
      window.location.href = 'collection.html';
      return;
    }

    state.product = PRODUCTS.find(p => p.id == id);
    if (!state.product) {
      window.location.href = 'collection.html';
      return;
    }

    const STORAGE_KEY = 'khaiansuviet_unlocked';
    const rawStorage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    state.isUnlocked = rawStorage.includes(String(id));
  }

  function populateProductInfo() {
    if (!state.isUnlocked) {
      if (DOM.dynasty) DOM.dynasty.textContent = '???';
      if (DOM.era) DOM.era.textContent = '???';
      if (DOM.name) DOM.name.textContent = 'Cổ Vật Bí Ẩn';

      if (DOM.desc) {
        DOM.desc.innerHTML = 'Dữ liệu lịch sử đang bị phong ấn.<br>Hãy thu thập thẻ bài vật lý hoặc mở hộp mù để giải mã!';
        DOM.desc.style.color = '#A62C21';
        DOM.desc.style.fontWeight = '700';
      }

      if (DOM.dynastyDesc) {
        DOM.dynastyDesc.textContent = '████ █████ ██████ ███ ████████ ███ ██████ ███ ████████ ██████ ███. Lịch sử đang chờ bạn khám phá...';
        DOM.dynastyDesc.style.filter = 'blur(4px)';
        DOM.dynastyDesc.style.userSelect = 'none';
        DOM.dynastyDesc.style.opacity = '0.5';
      }

      document.title = `Cổ Vật Bí Ẩn — Khai Ấn Sử Việt`;

      const galleryContainer = document.getElementById('artifactGallery');
      const actionsContainer = document.getElementById('artifactActions');
      if (galleryContainer) galleryContainer.style.display = 'none';
      if (actionsContainer) actionsContainer.style.display = 'none';

      const specsList = document.getElementById('artifactSpecsList');
      if (specsList) specsList.innerHTML = '<li><span class="artifact__specs-label">TRẠNG THÁI</span><span class="artifact__specs-value" style="color:#A62C21; font-weight: bold;">Chưa giải mã</span></li>';

      const artifactStory = document.getElementById('artifactStory');
      if (artifactStory) {
        artifactStory.innerHTML = '<p>Lịch sử đang chờ bạn khám phá...</p>';
        artifactStory.style.filter = 'blur(6px)';
        artifactStory.style.userSelect = 'none';
      }

      return;
    }

    if (DOM.dynasty) DOM.dynasty.textContent = state.product.dynasty;
    if (DOM.era) DOM.era.textContent = state.product.era;
    if (DOM.name) DOM.name.textContent = state.product.artifact;
    if (DOM.desc) DOM.desc.textContent = state.product.artifactDesc;
    if (DOM.dynastyDesc) DOM.dynastyDesc.textContent = state.product.description;

    document.title = `${state.product.artifact} — Khai Ấn Sử Việt`;

    // Render Gallery
    const galleryContainer = document.getElementById('artifactGallery');
    const actionsContainer = document.getElementById('artifactActions');

    if (galleryContainer) {
      const gallery = state.product.gallery || [state.product.image];
      galleryContainer.innerHTML = '';

      gallery.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'artifact__gallery-img';
        img.title = 'Xem ảnh';
        img.dataset.index = index;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 1122;
        img.height = 1448;
        img.addEventListener('click', () => changeVisualToImage(index));
        galleryContainer.appendChild(img);
      });
    }

    if (actionsContainer && state.product.model) {
      actionsContainer.innerHTML = '';

      // Nút 3D
      const btn3d = document.createElement('button');
      btn3d.className = 'artifact__btn-action btn-3d';
      btn3d.id = 'btnAction3D';
      btn3d.title = 'Xem 3D';
      btn3d.innerHTML = `
        <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"/>
          <path d="M40 10 L40 70 M10 25 L70 55 M70 25 L10 55"/>
        </svg>
        <span>XEM 3D</span>
      `;
      btn3d.addEventListener('click', load3DModel);
      actionsContainer.appendChild(btn3d);

      // Nút AR
      const btnAr = document.createElement('button');
      btnAr.className = 'artifact__btn-action btn-ar';
      btnAr.title = 'Xem AR';
      btnAr.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
        <span>MỞ AR</span>
      `;
      btnAr.addEventListener('click', handleAR);
      actionsContainer.appendChild(btnAr);
    }

    // Render Extended Lore and Specs
    const artifactStory = document.getElementById('artifactStory');
    if (artifactStory && state.product.story) {
      if (Array.isArray(state.product.story)) {
        artifactStory.innerHTML = state.product.story.map(p => `<p>${p}</p>`).join('');
      } else {
        artifactStory.innerHTML = `<p>${state.product.story}</p>`;
      }
    }

    const specsList = document.getElementById('artifactSpecsList');
    if (specsList && state.product.details) {
      const labels = {
        dimensions: 'KÍCH THƯỚC',
        material: 'CHẤT LIỆU',
        weight: 'TRỌNG LƯỢNG',
        nfc: 'CÔNG NGHỆ',
        edition: 'PHIÊN BẢN'
      };

      const html = [];
      for (const [key, value] of Object.entries(state.product.details)) {
        if (value) {
          html.push(`
            <li>
              <span class="artifact__specs-label">${labels[key] || key}</span>
              <span class="artifact__specs-value">${value}</span>
            </li>
          `);
        }
      }
      specsList.innerHTML = html.join('');
    }

    // Render Audio
    const audioContainer = document.getElementById('artifactAudio');
    const audioPlayer = document.getElementById('artifactAudioPlayer');
    if (audioContainer && audioPlayer) {
      if (state.product.audio) {
        audioContainer.style.display = 'flex';
        audioPlayer.src = state.product.audio;
        initAudioPlayer();
      } else {
        audioContainer.style.display = 'none';
        audioPlayer.pause();
        audioPlayer.src = '';
      }
    }
  }

  function initAudioPlayer() {
    const audio = document.getElementById('artifactAudioPlayer');
    const btn = document.getElementById('audioToggleBtn');
    
    if (!audio || !btn) return;
    
    // Remove old listeners by replacing the button clone
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    const playIcon = newBtn.querySelector('.play-icon');
    const pauseIcon = newBtn.querySelector('.pause-icon');
    const progressBar = document.getElementById('audioProgressBar');
    const progressContainer = document.getElementById('audioProgressContainer');
    const timeDisplay = document.getElementById('audioTime');

    // Reset UI
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    progressBar.style.width = '0%';
    timeDisplay.textContent = '00:00 / 00:00';

    const formatTime = (time) => {
      if (isNaN(time) || !isFinite(time)) return '00:00';
      const mins = Math.floor(time / 60);
      const secs = Math.floor(time % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    audio.onloadedmetadata = () => {
      timeDisplay.textContent = `00:00 / ${formatTime(audio.duration)}`;
    };

    audio.ontimeupdate = () => {
      const current = audio.currentTime;
      const duration = audio.duration;
      if (duration) {
        const progress = (current / duration) * 100;
        progressBar.style.width = `${progress}%`;
        timeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
      }
    };

    audio.onended = () => {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      progressBar.style.width = '0%';
      audio.currentTime = 0;
    };

    const toggleAudio = () => {
      if (audio.paused) {
        audio.play().then(() => {
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
        }).catch(err => console.error("Error playing audio", err));
      } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    };

    newBtn.addEventListener('click', toggleAudio);

    progressContainer.onclick = (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * audio.duration;
      audio.currentTime = newTime;
    };
  }

  function changeVisualToImage(index) {
    if (!DOM.viewerContainer) return;

    // Cleanup model nếu đang hiển thị
    cleanup();

    // Cập nhật hiệu ứng select trên các ảnh
    document.querySelectorAll('.artifact__gallery-img').forEach((img, i) => {
      if (i === index) img.classList.add('active');
      else img.classList.remove('active');
    });

    // Bỏ active trên nút 3D nếu có
    const btn3d = document.getElementById('btnAction3D');
    if (btn3d) btn3d.classList.remove('active');

    const gallery = state.product.gallery || [state.product.image];
    const imgSrc = gallery[index];

    DOM.viewerContainer.innerHTML = `
      <div style="position:absolute; inset:0; padding:1rem; display:flex; align-items:center; justify-content:center; animation: a3dFadeIn 0.5s ease;">
        <img src="${imgSrc}" alt="${state.product.artifact}" width="1122" height="1448" decoding="async" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.5));" />
      </div>
    `;
  }

  function renderPlaceholder() {
    if (!DOM.viewerContainer) return;

    if (!state.isUnlocked) {
      DOM.viewerContainer.innerHTML = `
        <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; animation: a3dFadeIn 0.5s ease; background: radial-gradient(circle, rgba(15,10,5,0.7) 0%, rgba(5,3,1,0.9) 100%);">
          <svg viewBox="0 0 80 80" style="width: 120px; height: 120px; color: rgba(218,165,32,0.3); margin-bottom: 1.5rem; filter: drop-shadow(0 0 10px rgba(218,165,32,0.2));">
            ${state.product.silhouetteSvg}
          </svg>
          <p style="font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: #DAA520; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem; text-shadow: 0 0 10px rgba(218,165,32,0.5);">Chưa giải mã</p>
          <a href="index.html#products" style="margin-top: 1.5rem; padding: 12px 30px; font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; font-weight: 700; color: #1A1108; background: linear-gradient(135deg, #B8860B, #DAA520); border-radius: 6px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 4px 15px rgba(184,134,11,0.3); transition: all 0.3s ease;">Sưu tầm cổ vật ngay</a>
        </div>
      `;
      return;
    }

    // Mặc định hiển thị ảnh đầu tiên trong gallery
    changeVisualToImage(0);
  }

  /* ============================================================
     3D MODEL LOADING — with Progress Bar & Retry
     ============================================================ */

  /**
   * Format bytes thành chuỗi dễ đọc
   */
  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const val = (bytes / Math.pow(1024, i)).toFixed(i >= 2 ? 1 : 0);
    return `${val} ${units[i]}`;
  }

  /**
   * Render loading overlay with progress bar
   */
  function renderLoadingUI() {
    return `
      <div class="artifact3d-loading" id="model3dLoading">
        <div class="time-compass">
          <div class="time-compass__ring time-compass__ring--outer"></div>
          <div class="time-compass__ring time-compass__ring--middle"></div>
          <div class="time-compass__ring time-compass__ring--inner"></div>
          <div class="time-compass__center">
            <div class="time-compass__glow"></div>
            <img src="assets/images/logo.jpg" alt="Logo" class="time-compass__logo" />
          </div>
        </div>
        <div class="artifact3d-progress">
          <div class="artifact3d-progress__fill" id="model3dProgressFill"></div>
          <div class="artifact3d-progress__glow" id="model3dProgressGlow"></div>
        </div>
        <span class="artifact3d-loading__text" id="model3dPercent">ĐANG TẢI 0%</span>
        <span class="artifact3d-loading__detail" id="model3dDetail">Khởi tạo La Đồ Thời Gian...</span>
      </div>
    `;
  }

  let progressContainerWidth = 0;

  /**
   * Update progress UI
   */
  function updateProgress(progressEvent) {
    const fill = document.getElementById('model3dProgressFill');
    const glow = document.getElementById('model3dProgressGlow');
    const percentEl = document.getElementById('model3dPercent');
    const detailEl = document.getElementById('model3dDetail');

    if (!fill || !percentEl) return;

    // model-viewer progress event: detail.totalProgress is 0-1
    const ratio = progressEvent.detail ? progressEvent.detail.totalProgress : 0;
    const percent = Math.round(ratio * 100);

    fill.style.transform = `scaleX(${ratio})`;
    if (glow) {
      glow.style.left = `${percent}%`;
    }
    percentEl.textContent = `ĐANG TẢI ${percent}%`;

    if (detailEl) {
      if (percent < 10) {
        detailEl.textContent = 'Khởi tạo La Đồ Thời Gian...';
      } else if (percent < 40) {
        detailEl.textContent = 'Đang giải mã không gian & thời gian...';
      } else if (percent < 70) {
        detailEl.textContent = 'Đang phục dựng hình ảnh cổ vật...';
      } else if (percent < 90) {
        detailEl.textContent = 'Đang đồng bộ hạt ánh sáng...';
      } else {
        detailEl.textContent = 'Hoàn tất — Chuẩn bị hiển thị...';
      }
    }
  }

  /**
   * Render error state
   */
  function renderErrorUI(errorMsg, canRetry) {
    const retryBtnHtml = canRetry
      ? `<button type="button" class="artifact3d-error__btn" id="retry3DBtn">THỬ LẠI (${state.retryCount}/${MAX_RETRIES})</button>`
      : `<span class="artifact3d-loading__detail">Đã thử ${MAX_RETRIES} lần. Hãy kiểm tra kết nối mạng và tải lại trang.</span>`;

    DOM.viewerContainer.innerHTML = `
      <div class="artifact3d-error">
        <div class="artifact3d-error__icon">
          <svg viewBox="0 0 80 80" stroke="#A62C21" fill="none" stroke-width="3">
            <circle cx="40" cy="40" r="30" stroke-dasharray="4 4"/>
            <path d="M40 25 L40 45 M40 55 L40 60" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="artifact3d-error__title">LỖI LA ĐỒ THỜI GIAN</span>
        <span class="artifact3d-error__msg">${errorMsg}</span>
        ${retryBtnHtml}
      </div>
    `;

    if (canRetry) {
      const retryBtn = document.getElementById('retry3DBtn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          state.isLoading = false;
          state.isModelLoaded = false;
          load3DModel();
        });
      }
    }
  }

  /**
   * Load 3D model with full progress tracking
   */
  async function load3DModel() {
    if (!DOM.viewerContainer || !state.product.model || state.isLoading || state.isModelLoaded) return;

    state.isLoading = true;

    // Cập nhật hiệu ứng active cho nút 3D và bỏ ở ảnh
    document.querySelectorAll('.artifact__gallery-img').forEach(img => img.classList.remove('active'));
    const btn3d = document.getElementById('btnAction3D');
    if (btn3d) btn3d.classList.add('active');

    // Cleanup previous model nếu có
    if (state.activeModelViewer) {
      try {
        state.activeModelViewer.removeAttribute('src');
        state.activeModelViewer.remove();
      } catch (_) { /* silent */ }
      state.activeModelViewer = null;
    }

    // Render loading UI
    DOM.viewerContainer.innerHTML = renderLoadingUI();

    try {
      await ensureModelViewerLoaded();
    } catch (error) {
      state.isLoading = false;
      console.error('Không thể tải model-viewer:', error);
      renderErrorUI('Không thể tải trình xem 3D. Vui lòng kiểm tra kết nối mạng và thử lại.', true);
      return;
    }

    // Create model-viewer element
    const modelViewer = document.createElement('model-viewer');
    modelViewer.id = 'arModelViewer';
    modelViewer.alt = `Mô hình 3D ${state.product.artifact}`;

    // Performance attributes cho file lớn
    modelViewer.setAttribute('camera-controls', '');
    modelViewer.setAttribute('shadow-intensity', '1');
    modelViewer.setAttribute('environment-image', 'neutral');
    modelViewer.setAttribute('loading', 'eager');      // start downloading immediately
    modelViewer.setAttribute('reveal', 'auto');         // render when ready

    // Style: hidden initially, fade-in khi load xong
    modelViewer.style.cssText = 'width:100%;height:100%;background:transparent;opacity:0;position:absolute;inset:0;';

    // Store reference cho cleanup
    state.activeModelViewer = modelViewer;

    // ── Progress event ──
    const onProgress = (e) => {
      updateProgress(e);
    };

    // ── Load success ──
    const onLoad = () => {
      state.isModelLoaded = true;
      state.isLoading = false;
      state.retryCount = 0; // reset on success

      // Remove loading overlay
      const loadingEl = document.getElementById('model3dLoading');
      if (loadingEl) loadingEl.remove();

      // Fade-in model
      modelViewer.style.opacity = '1';
      modelViewer.classList.add('artifact3d-viewer-ready');

      // Enable auto-rotate chỉ khi đã tải xong
      modelViewer.autoRotate = true;

      // Cleanup listeners
      modelViewer.removeEventListener('progress', onProgress);
      modelViewer.removeEventListener('load', onLoad);
      modelViewer.removeEventListener('error', onError);
    };

    // ── Load error ──
    const onError = (error) => {
      state.isLoading = false;
      state.isModelLoaded = false;
      state.activeModelViewer = null;
      console.error('Lỗi khi tải mô hình 3D:', error);

      // Cleanup listeners
      modelViewer.removeEventListener('progress', onProgress);
      modelViewer.removeEventListener('load', onLoad);
      modelViewer.removeEventListener('error', onError);

      // Remove failed model node
      try { modelViewer.remove(); } catch (_) { /* silent */ }

      state.retryCount++;
      const canRetry = state.retryCount < MAX_RETRIES;

      // Phân biệt lỗi
      let errorMsg = 'Không thể tải mô hình 3D.';
      if (!navigator.onLine) {
        errorMsg = 'Không có kết nối mạng. Hãy kiểm tra WiFi/3G và thử lại.';
      } else if (error && error.type === 'error') {
        errorMsg = 'Lỗi tải file mô hình. File có thể quá lớn hoặc đường dẫn không đúng.';
      }

      if (canRetry) {
        errorMsg += ` Tự động thử lại sau ${Math.round(RETRY_BASE_DELAY * Math.pow(2, state.retryCount - 1) / 1000)}s...`;

        // Auto-retry with exponential backoff
        setTimeout(() => {
          state.isLoading = false;
          state.isModelLoaded = false;
          load3DModel();
        }, RETRY_BASE_DELAY * Math.pow(2, state.retryCount - 1));
      }

      renderErrorUI(errorMsg, canRetry);
    };

    modelViewer.addEventListener('progress', onProgress);
    modelViewer.addEventListener('load', onLoad);
    modelViewer.addEventListener('error', onError);

    modelViewer.src = state.product.model;

    // Append vào container (behind loading overlay)
    DOM.viewerContainer.appendChild(modelViewer);
  }

  /* ============================================================
     AR HANDLER — Native Intent (bypass WebGL for heavy files)
     ============================================================ */

  /**
   * Detect AR capability
   */
  function getDeviceInfo() {
    const ua = navigator.userAgent;
    return {
      isAndroid: /Android/i.test(ua),
      isIOS: /iPhone|iPad|iPod/i.test(ua),
      isMobile: /Android|iPhone|iPad|iPod/i.test(ua),
    };
  }

  /**
   * Kích hoạt AR qua Native Intents
   */
  function handleAR(e) {
    if (e) e.preventDefault();

    if (!state.product || !state.product.model) {
      showToast('Cổ vật này chưa có mô hình 3D.');
      return;
    }

    const device = getDeviceInfo();

    // ── Android: Google Scene Viewer ──
    if (device.isAndroid) {
      showToast('Đang mở AR...');

      const absoluteModelUrl = new URL(state.product.model, window.location.href).toString();
      const title = encodeURIComponent(state.product.artifact);
      const file = encodeURIComponent(absoluteModelUrl);

      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${file}&title=${title}&mode=ar_only#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;

      const a = document.createElement('a');
      a.href = intentUrl;
      document.body.appendChild(a);
      a.click();
      // Clean up — defer to next tick so click completes
      setTimeout(() => a.remove(), 100);
      return;
    }

    // ── iOS: Quick Look (.usdz) ──
    if (device.isIOS) {
      if (state.product.usdz) {
        showToast('Đang mở AR...');

        const absoluteUsdzUrl = new URL(state.product.usdz, window.location.href).toString();
        const a = document.createElement('a');
        a.href = absoluteUsdzUrl;
        a.rel = 'ar';
        // iOS Quick Look yêu cầu link phải có child node và được append vào DOM
        const img = document.createElement('img');
        a.appendChild(img);
        document.body.appendChild(a);
        a.click();
        setTimeout(() => a.remove(), 100);
      } else {
        showToast('⚠️ AR trên iPhone/iPad yêu cầu file .usdz. Cổ vật này hiện chỉ có file .glb.');
      }
      return;
    }

    // ── Desktop fallback ──
    showToast('💡 Vui lòng mở trang này trên điện thoại để trải nghiệm AR!');
  }

  /* ============================================================
     BOOTSTRAP
     ============================================================ */
  document.addEventListener('DOMContentLoaded', init);

})();