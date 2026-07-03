/* ============================================================
   KHAI ẤN SỬ VIỆT — Product Detail Page JavaScript
   Gallery, Order Form, Accordion, 3D Modal, AR, Related Products
   ============================================================ */

(function () {
  'use strict';

  /* ── Get Product ID from URL ── */
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId || typeof PRODUCTS === 'undefined') {
    return;
  }

  const product = getProductById(productId);
  if (!product) {
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:serif;color:#B8860B;text-align:center;flex-direction:column;gap:1rem;">
        <h1 style="font-size:3rem;">404</h1>
        <p>Sản phẩm không tồn tại</p>
        <a href="index.html" style="color:#B8860B;text-decoration:underline;">← Về Trang Chủ</a>
      </div>
    `;
    return;
  }

  /* ============================================================
     1. POPULATE PAGE CONTENT
     ============================================================ */
  // Page title
  document.title = `${product.artifact} — ${product.dynasty} | Khai Ấn Sử Việt`;

  // Breadcrumb
  const breadcrumbName = document.getElementById('breadcrumbName');
  if (breadcrumbName) breadcrumbName.textContent = product.artifact;

  // Hero background (blurred)
  const bgImage = document.querySelector('.product-hero__bg-image');
  if (bgImage) {
    bgImage.style.background = `
      radial-gradient(ellipse at 30% 50%, rgba(166, 44, 33, 0.2) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 50%, rgba(184, 134, 11, 0.12) 0%, transparent 50%),
      var(--den-son-mai)
    `;
  }

  // Main image SVG
  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    mainImage.innerHTML = `
      <img id="mainImageElement" src="${product.image}" alt="${product.artifact}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));" />
    `;
  }

  // Product info
  const elName = document.getElementById('productName');
  const elDynasty = document.getElementById('productDynasty');
  const elPrice = document.getElementById('productPrice');
  const elStatus = document.getElementById('productStatus');

  if (elName) elName.textContent = product.artifact;
  if (elDynasty) elDynasty.textContent = `${product.dynasty} • ${product.era}`;
  if (elPrice) elPrice.textContent = formatPrice(product.price);
  if (elStatus) {
    elStatus.className = `badge ${getStatusClass(product.status)}`;
    elStatus.textContent = getStatusLabel(product.status);
  }

  // Disable buy button for sold-out
  const buyNowBtn = document.getElementById('buyNowBtn');
  if (buyNowBtn && product.status === 'sold-out') {
    buyNowBtn.disabled = true;
    buyNowBtn.innerHTML = 'HẾT HÀNG';
  }

  // Thumbnails
  const thumbContainer = document.getElementById('productThumbs');
  if (thumbContainer) {
    if (product.gallery && product.gallery.length > 0) {
      thumbContainer.innerHTML = product.gallery.map((imgSrc, index) => `
        <div class="product-hero__thumb ${index === 0 ? 'active' : ''}" data-src="${imgSrc}">
          <img src="${imgSrc}" alt="${product.artifact}" style="width:100%; height:100%; object-fit:cover; border-radius: 4px;" />
        </div>
      `).join('');

      const thumbs = thumbContainer.querySelectorAll('.product-hero__thumb');
      const mainImgEl = document.getElementById('mainImageElement');

      thumbs.forEach(thumb => {
        thumb.addEventListener('click', function () {
          thumbs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          if (mainImgEl) {
            mainImgEl.src = this.getAttribute('data-src');
          }
        });
      });
    } else {
      thumbContainer.innerHTML = `
        <div class="product-hero__thumb active" data-src="${product.image}">
          <img src="${product.image}" alt="${product.artifact}" style="width:100%; height:100%; object-fit:cover; border-radius: 4px;" />
        </div>
      `;
    }
  }

  // Close-up gallery
  const closeupGallery = document.getElementById('closeupGallery');
  if (closeupGallery) {
    if (product.gallery && product.gallery.length > 0) {
      closeupGallery.innerHTML = product.gallery.map(imgSrc =>
        `<div class="closeup__item">
          <img src="${imgSrc}" alt="Close up" />
        </div>`
      ).join('');
    } else {
      const views = [
        { svg: product.backSvg, viewBox: '0 0 120 100' },
        { svg: product.silhouetteSvg, viewBox: '0 0 80 80' },
        { svg: product.backSvg, viewBox: '0 0 120 100' },
        { svg: product.silhouetteSvg, viewBox: '0 0 80 80' }
      ];
      closeupGallery.innerHTML = views.map(v =>
        `<div class="closeup__item">
          <svg viewBox="${v.viewBox}" xmlns="http://www.w3.org/2000/svg">${v.svg}</svg>
        </div>`
      ).join('');
    }
  }

  // Product details image
  const detailsImage = document.getElementById('productDetailsImage');
  if (detailsImage) {
    detailsImage.innerHTML = `
      <img src="${product.image}" alt="${product.artifact}" />
    `;
  }

  // Accordion content
  const descContent = document.getElementById('accordionDesc');
  const dimsContent = document.getElementById('accordionDims');
  const nfcContent = document.getElementById('accordionNfc');
  const editionContent = document.getElementById('accordionEdition');

  if (descContent) {
    descContent.innerHTML = `<div class="accordion-body__content">${product.description}</div>`;
  }
  if (dimsContent) {
    dimsContent.innerHTML = `
      <div class="accordion-body__specs">
        <span class="accordion-body__spec-label">Kích thước</span>
        <span class="accordion-body__spec-value">${product.details.dimensions}</span>
        <span class="accordion-body__spec-label">Chất liệu</span>
        <span class="accordion-body__spec-value">${product.details.material}</span>
        <span class="accordion-body__spec-label">Trọng lượng</span>
        <span class="accordion-body__spec-value">${product.details.weight}</span>
      </div>
    `;
  }
  if (nfcContent) {
    const featureText = product.details.feature || `Mỗi cổ vật tích hợp chip NFC đặc biệt. Sau khi mua, bạn chỉ cần chạm điện thoại vào cổ vật để mở khóa triều đại <strong>${product.dynasty}</strong> trong bộ sưu tập số của mình. Trải nghiệm mô hình 3D và AR của cổ vật <strong>${product.artifact}</strong> ngay trên điện thoại!`;
    nfcContent.innerHTML = `
      <div class="accordion-body__content">
        <strong>Chip NFC tích hợp:</strong> ${product.details.nfc}<br><br>
        ${featureText}
      </div>
    `;
  }
  if (editionContent) {
    const guideText = product.details.guide || product.details.edition;
    editionContent.innerHTML = `
      <div class="accordion-body__content">${guideText}</div>
    `;
  }

  /* ============================================================
     2. ORDER FORM MODAL (replaces old add-to-cart)
     ============================================================ */
  const orderModal = document.getElementById('orderModal');
  const closeOrderBtn = document.getElementById('closeOrderModal');
  const orderForm = document.getElementById('orderForm');
  const orderProductName = document.getElementById('orderProductName');
  const orderProductPrice = document.getElementById('orderProductPrice');

  // Populate order form with product info
  if (orderProductName) orderProductName.textContent = product.artifact;
  if (orderProductPrice) orderProductPrice.textContent = formatPrice(product.price);

  // Open order modal
  if (buyNowBtn && orderModal && product.status !== 'sold-out') {
    buyNowBtn.addEventListener('click', () => {
      orderModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Focus first field
      setTimeout(() => {
        const nameInput = document.getElementById('orderName');
        if (nameInput) nameInput.focus();
      }, 400);
    });
  }

  // Close order modal
  function closeOrderModal() {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeOrderBtn) closeOrderBtn.addEventListener('click', closeOrderModal);

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  // Submit order
  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('orderName').value.trim();
      const phone = document.getElementById('orderPhone').value.trim();
      const email = document.getElementById('orderEmail').value.trim();
      const qty = document.getElementById('orderQty').value;
      const note = document.getElementById('orderNote').value.trim();

      if (!name || !phone) {
        showToast('⚠️ Vui lòng điền đầy đủ Họ tên và Số điện thoại.');
        return;
      }

      const submitBtn = orderForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "ĐANG XỬ LÝ...";
      submitBtn.disabled = true;

      const orderData = {
        type: "order",
        name: name,
        email: email || "Không có",
        phone: phone,
        address: note || "Không có",
        product: product.artifact,
        quantity: qty,
        total: product.price * parseInt(qty)
      };

      try {
        const response = await fetch(GAS_API_URL, {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(orderData)
        });

        const result = await response.json();
        if (result.status === "success") {
          closeOrderModal();
          orderForm.reset();
          document.getElementById('orderQty').value = '1';
          showToast(`✅ Đặt hàng thành công! Cảm ơn ${name}, chúng tôi sẽ liên hệ bạn sớm nhất.`);
        } else {
          showToast("Có lỗi xảy ra: " + result.message);
        }
      } catch (error) {
        console.error("Lỗi gửi form đặt hàng:", error);
        showToast("Đã xảy ra lỗi mạng. Vui lòng thử lại!");
      } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ============================================================
     3. ACCORDION
     ============================================================ */
  document.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ============================================================
     4. 3D MODEL MODAL
     ============================================================ */
  const modelModal = document.getElementById('modelModal');
  const openModelBtn = document.getElementById('open360Btn');
  const closeModelBtn = document.getElementById('closeModelModal');

  if (openModelBtn && modelModal) {
    openModelBtn.addEventListener('click', () => {
      modelModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Load model-viewer with AR support
      const viewerContainer = document.getElementById('modelViewerContainer');
      if (viewerContainer && product.model) {
        viewerContainer.innerHTML = `
          <model-viewer
            src="${product.model}"
            alt="Mô hình 3D ${product.artifact}"
            auto-rotate
            camera-controls
            ar
            ar-modes="webxr scene-viewer quick-look"
            ar-scale="auto"
            shadow-intensity="1"
            environment-image="neutral"
            style="width:100%;height:100%;background:transparent;"
          >
            <button slot="ar-button" style="
              position:absolute;bottom:16px;left:50%;transform:translateX(-50%);
              padding:10px 24px;font-family:'Cormorant Garamond',serif;font-size:0.75rem;font-weight:700;
              letter-spacing:2px;text-transform:uppercase;
              color:#1A1108;background:linear-gradient(135deg,#B8860B,#DAA520);
              border:none;border-radius:6px;cursor:pointer;
              box-shadow:0 4px 15px rgba(184,134,11,0.3);
            ">📱 XEM AR</button>
            <div slot="poster" class="model-modal__placeholder">
              <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"/>
                <path d="M40 10 L40 70 M10 25 L70 55 M70 25 L10 55"/>
              </svg>
              <span>Đang tải mô hình 3D...</span>
            </div>
          </model-viewer>
        `;
      } else if (viewerContainer && !product.model) {
        viewerContainer.innerHTML = `
          <div class="model-modal__placeholder">
            <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"/>
              <path d="M40 10 L40 70 M10 25 L70 55 M70 25 L10 55"/>
            </svg>
            <span>MÔ HÌNH 3D</span>
            <span style="font-size:0.7rem;opacity:0.5;">Chưa có file .glb cho sản phẩm này</span>
          </div>
        `;
      }
    });
  }

  if (closeModelBtn && modelModal) {
    closeModelBtn.addEventListener('click', () => {
      modelModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modelModal.addEventListener('click', (e) => {
      if (e.target === modelModal) {
        modelModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============================================================
     5. AR DIRECT BUTTON (opens AR directly on mobile)
     ============================================================ */
  const openArBtn = document.getElementById('openArBtn');

  if (openArBtn) {
    openArBtn.addEventListener('click', () => {
      if (!product.model) {
        showToast('📱 Chưa có mô hình 3D (.glb) cho sản phẩm này. Vui lòng thêm file vào assets/models/');
        return;
      }

      // Check if on mobile with AR support
      const isAndroid = /android/i.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isAndroid) {
        // Use Scene Viewer (Android)
        const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(window.location.origin + '/' + product.model)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`;
        window.location = intentUrl;
      } else if (isIOS) {
        // Use Quick Look (iOS) - needs .usdz file
        showToast('📱 AR trên iOS yêu cầu file .usdz. Sử dụng nút "Xem 360°" để xem mô hình 3D.');
      } else {
        // Desktop fallback - open 3D modal instead
        if (openModelBtn) openModelBtn.click();
        showToast('💡 Mở trang này trên điện thoại di động để trải nghiệm AR!');
      }
    });
  }

  /* ============================================================
     6. ESCAPE KEY HANDLER (for all modals)
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (orderModal && orderModal.classList.contains('active')) {
        closeOrderModal();
      } else if (modelModal && modelModal.classList.contains('active')) {
        modelModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  /* ============================================================
     7. RELATED PRODUCTS
     ============================================================ */
  const relatedGrid = document.getElementById('relatedGrid');

  if (relatedGrid) {
    const related = getRelatedProducts(productId, 4);
    relatedGrid.innerHTML = related.map(p => {
      const parts = p.artifact.split('(');
      const name = parts[0].trim();
      const qty = parts.length > 1 ? parts[1].replace(')', '').trim() : '';

      return `
        <a href="product.html?id=${p.id}" class="blind-box__card" id="related-${p.id}">
          <div class="blind-box__image">
            <img src="${p.image}" alt="${name}">
          </div>
          <span class="blind-box__qty">${qty}</span>
          <h3 class="blind-box__name">${name}</h3>
          <p class="blind-box__desc">${p.description}</p>
          <p class="blind-box__price">${formatPrice(p.price)}</p>
          <span class="blind-box__btn">MUA NGAY</span>
        </a>
      `;
    }).join('');
  }

})();
