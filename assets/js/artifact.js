/**
 * Artifact Detail Page Logic
 * Refactored for Production Readiness & Heavy 3D Model Optimization
 */

(function () {
  'use strict';

  /* ============================================================
     STATE MANAGEMENT
     ============================================================ */
  const state = {
    product: null,
    isModelLoaded: false,
    isLoading: false,
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
    viewerContainer: document.getElementById('artifactModelViewer')
  };

  /* ============================================================
     INITIALIZATION & CLEANUP
     ============================================================ */
  function init() {
    getProduct();

    if (!state.product) return;

    populateProductInfo();
    renderPlaceholder();

    // Đăng ký cleanup nếu là SPA (giả định dùng pushState hoặc custom event unmount)
    // Ở đây ta lắng nghe beforeunload để cleanup bộ nhớ.
    window.addEventListener('beforeunload', cleanup);
  }

  function cleanup() {
    // Nếu có model-viewer, xóa các listener và gỡ khỏi DOM để giải phóng bộ nhớ
    const modelViewer = document.getElementById('arModelViewer');
    if (modelViewer) {
      // model-viewer không có destroy() rõ ràng nhưng gỡ node là bắt buộc để GC thu gom
      modelViewer.remove();
    }
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

    // Đặt lại state 3D
    state.isModelLoaded = false;
    state.isLoading = false;

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
      <div style="position:absolute; inset:0; padding:2rem; display:flex; align-items:center; justify-content:center; animation: visualFadeIn 0.5s ease;">
        <img src="${imgSrc}" alt="${state.product.artifact}" style="max-width:100%; max-height:100%; object-fit:contain; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.5));" />
      </div>
    `;
  }

  function renderPlaceholder() {
    if (!DOM.viewerContainer) return;
    // Mặc định hiển thị ảnh đầu tiên trong gallery
    changeVisualToImage(0);
  }

  function load3DModel() {
    if (!DOM.viewerContainer || !state.product.model || state.isLoading || state.isModelLoaded) return;

    state.isLoading = true;

    // Cập nhật hiệu ứng active cho nút 3D và bỏ ở ảnh
    document.querySelectorAll('.artifact__gallery-img').forEach(img => img.classList.remove('active'));
    const btn3d = document.getElementById('btnAction3D');
    if (btn3d) btn3d.classList.add('active');

    DOM.viewerContainer.innerHTML = `
      <div class="artifact__model-placeholder">
        <div class="preloader__ring" style="width: 40px; height: 40px; border-width: 3px; margin-bottom: 1.5rem; position: relative;"></div>
        <span>ĐANG TẢI MÔ HÌNH 3D...</span>
        <span style="font-size:0.75rem;opacity:0.6; margin-top:0.5rem; text-align:center;">Vui lòng đợi trong giây lát.</span>
      </div>
    `;

    const modelViewer = document.createElement('model-viewer');
    modelViewer.id = "arModelViewer";
    modelViewer.alt = `Mô hình 3D ${state.product.artifact}`;

    // KHÔNG set attribute 'auto-rotate' lúc đầu vì nếu tồn tại attribute là nó bật luôn
    modelViewer.setAttribute('camera-controls', '');
    modelViewer.setAttribute('shadow-intensity', '1');
    modelViewer.setAttribute('environment-image', 'neutral');
    modelViewer.style.width = '100%';
    modelViewer.style.height = '100%';
    modelViewer.style.background = 'transparent';

    const onLoad = () => {
      state.isModelLoaded = true;
      state.isLoading = false;
      // Chỉ bật auto-rotate khi đã tải xong
      modelViewer.autoRotate = true;
    };

    const onError = (error) => {
      state.isLoading = false;
      state.isModelLoaded = false;
      console.error("Lỗi khi tải mô hình 3D:", error);

      DOM.viewerContainer.innerHTML = `
        <div class="artifact__model-placeholder">
          <span style="color: #A62C21; font-weight: bold;">LỖI TẢI MÔ HÌNH</span>
          <span style="font-size:0.75rem;opacity:0.7; margin: 0.5rem 0;">Crash bộ nhớ hoặc lỗi mạng.</span>
          <button type="button" id="retry3DBtn" style="
            padding:10px 20px; font-family:'Cormorant Garamond',serif; font-size:0.75rem;
            font-weight:700; color:#1A1108; background:linear-gradient(135deg,#B8860B,#DAA520);
            border:none; border-radius:4px; cursor:pointer; margin-top:0.5rem;
          ">THỬ LẠI</button>
        </div>
      `;

      const retryBtn = document.getElementById('retry3DBtn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          // Reset đúng state trước khi load lại
          state.isLoading = false;
          state.isModelLoaded = false;
          load3DModel();
        });
      }
    };

    modelViewer.addEventListener('load', onLoad);
    modelViewer.addEventListener('error', onError);

    // Bắt đầu tải file 120MB (đường dẫn CDN đã được mã hóa sẵn từ data.js)
    modelViewer.src = state.product.model;

    DOM.viewerContainer.innerHTML = '';
    DOM.viewerContainer.appendChild(modelViewer);
  }

  /**
   * Kích hoạt AR MỘT CÁCH TRỰC TIẾP (Native Intents)
   * Không đi qua WebGL browser để tránh crash với file 120MB.
   */
  function handleAR(e) {
    if (e) e.preventDefault();

    if (!state.product || !state.product.model) {
      if (typeof showToast === 'function') showToast('Cổ vật này chưa có mô hình 3D.');
      return;
    }

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      if (typeof showToast === 'function') showToast('Đang mở AR qua Google Scene Viewer...');

      // Tạo URL tuyệt đối cho Android Intent
      const absoluteModelUrl = new URL(state.product.model, window.location.href).toString();

      // Xây dựng chuỗi Intent chuẩn của Google Scene Viewer
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(absoluteModelUrl)}&title=${encodeURIComponent(state.product.artifact)}&mode=ar_only#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;

      const a = document.createElement('a');
      a.href = intentUrl;
      a.click();
      return;
    }

    if (isIOS) {
      // iOS Quick Look YÊU CẦU định dạng .usdz
      if (state.product.usdz) {
        if (typeof showToast === 'function') showToast('Đang mở AR qua iOS Quick Look...');
        const absoluteUsdzUrl = new URL(state.product.usdz, window.location.href).toString();
        const a = document.createElement('a');
        a.href = absoluteUsdzUrl;
        a.rel = "ar";
        a.appendChild(document.createElement('img')); // Quick Look yêu cầu có node con
        a.click();
      } else {
        if (typeof showToast === 'function') {
          showToast('⚠️ Tính năng AR trên iPhone/iPad yêu cầu file .usdz (hiện tại web chỉ có .glb).');
        }
      }
      return;
    }

    // Fallback Desktop
    if (typeof showToast === 'function') {
      showToast('💡 Vui lòng mở trang web này trên thiết bị di động (Android/iOS) để dùng tính năng AR!');
    }
  }

  /* ============================================================
     BOOTSTRAP
     ============================================================ */
  document.addEventListener('DOMContentLoaded', init);

})();
