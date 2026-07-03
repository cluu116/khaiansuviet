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
     INJECT LOADING STYLES (scoped to this module)
     ============================================================ */
  function injectStyles() {
    if (document.getElementById('artifact3dStyles')) return;
    const style = document.createElement('style');
    style.id = 'artifact3dStyles';
    style.textContent = `
      /* ── Loading overlay ── */
      .artifact3d-loading {
        position: absolute; inset: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 1.2rem;
        background: radial-gradient(ellipse at center, rgba(26,17,8,0.95) 0%, rgba(15,10,5,0.98) 100%);
        z-index: 5;
        animation: a3dFadeIn 0.4s ease;
      }

      /* ── Shimmer cube icon ── */
      .artifact3d-loading__icon {
        width: 48px; height: 48px;
        opacity: 0.7;
        animation: a3dPulse 2s ease-in-out infinite;
      }
      .artifact3d-loading__icon svg {
        width: 100%; height: 100%;
        stroke: #B8860B; fill: none; stroke-width: 1.5;
      }

      /* ── Progress bar container ── */
      .artifact3d-progress {
        width: 200px; max-width: 60%;
        height: 4px;
        background: rgba(184,134,11,0.15);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
      }
      .artifact3d-progress__fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #8B6914, #B8860B, #DAA520, #B8860B);
        background-size: 300% 100%;
        border-radius: 4px;
        transition: width 0.3s ease;
        animation: a3dShimmer 2s linear infinite;
      }

      /* ── Text info ── */
      .artifact3d-loading__text {
        font-family: 'Cormorant Garamond', serif;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #B8860B;
        opacity: 0.9;
      }
      .artifact3d-loading__detail {
        font-family: 'Cormorant Garamond', serif;
        font-size: 0.7rem;
        color: rgba(184,134,11,0.55);
        text-align: center;
        line-height: 1.4;
      }

      /* ── Error state ── */
      .artifact3d-error {
        position: absolute; inset: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 0.8rem;
        background: radial-gradient(ellipse at center, rgba(26,17,8,0.95) 0%, rgba(15,10,5,0.98) 100%);
        z-index: 5;
        animation: a3dFadeIn 0.4s ease;
      }
      .artifact3d-error__title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 2px;
        color: #A62C21;
      }
      .artifact3d-error__msg {
        font-family: 'Cormorant Garamond', serif;
        font-size: 0.7rem;
        color: rgba(184,134,11,0.6);
        text-align: center;
        max-width: 260px;
        line-height: 1.5;
      }
      .artifact3d-error__btn {
        margin-top: 0.5rem;
        padding: 10px 28px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #1A1108;
        background: linear-gradient(135deg, #B8860B, #DAA520);
        border: none; border-radius: 6px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(184,134,11,0.3);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .artifact3d-error__btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(184,134,11,0.4);
      }

      /* ── Model viewer fade-in ── */
      .artifact3d-viewer-ready {
        animation: a3dFadeIn 0.6s ease forwards;
      }

      /* ── Keyframes ── */
      @keyframes a3dFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes a3dPulse {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50%      { opacity: 1;   transform: scale(1.08); }
      }
      @keyframes a3dShimmer {
        0%   { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ============================================================
     INITIALIZATION & CLEANUP
     ============================================================ */
  function init() {
    injectStyles();
    getProduct();

    if (!state.product) return;

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
  }

  function populateProductInfo() {
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
      <div style="position:absolute; inset:0; padding:2rem; display:flex; align-items:center; justify-content:center; animation: a3dFadeIn 0.5s ease;">
        <img src="${imgSrc}" alt="${state.product.artifact}" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.5));" />
      </div>
    `;
  }

  function renderPlaceholder() {
    if (!DOM.viewerContainer) return;
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
        <div class="artifact3d-loading__icon">
          <svg viewBox="0 0 80 80">
            <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"/>
            <path d="M40 10 L40 70 M10 25 L70 55 M70 25 L10 55"/>
          </svg>
        </div>
        <div class="artifact3d-progress">
          <div class="artifact3d-progress__fill" id="model3dProgressFill"></div>
        </div>
        <span class="artifact3d-loading__text" id="model3dPercent">ĐANG TẢI 0%</span>
        <span class="artifact3d-loading__detail" id="model3dDetail">Vui lòng đợi trong giây lát...</span>
      </div>
    `;
  }

  /**
   * Update progress UI
   */
  function updateProgress(progressEvent) {
    const fill = document.getElementById('model3dProgressFill');
    const percentEl = document.getElementById('model3dPercent');
    const detailEl = document.getElementById('model3dDetail');

    if (!fill || !percentEl) return;

    // model-viewer progress event: detail.totalProgress is 0-1
    const ratio = progressEvent.detail ? progressEvent.detail.totalProgress : 0;
    const percent = Math.round(ratio * 100);

    fill.style.width = `${percent}%`;
    percentEl.textContent = `ĐANG TẢI ${percent}%`;

    if (detailEl) {
      if (percent < 10) {
        detailEl.textContent = 'Đang kết nối tới máy chủ...';
      } else if (percent < 50) {
        detailEl.textContent = 'Đang tải dữ liệu mô hình 3D...';
      } else if (percent < 90) {
        detailEl.textContent = 'Đang xử lý — sắp hoàn tất...';
      } else {
        detailEl.textContent = 'Đang khởi tạo bộ dựng hình 3D...';
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
        <div class="artifact3d-loading__icon">
          <svg viewBox="0 0 80 80">
            <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"/>
            <path d="M40 10 L40 70 M10 25 L70 55 M70 25 L10 55"/>
          </svg>
        </div>
        <span class="artifact3d-error__title">LỖI TẢI MÔ HÌNH</span>
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
  function load3DModel() {
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
