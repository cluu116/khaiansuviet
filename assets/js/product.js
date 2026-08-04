/* ============================================================
   KHAI ẤN SỬ VIỆT — Product Detail Page JavaScript
   Gallery, Order Form, Accordion, Related Products
   ============================================================ */

(async function () {
  'use strict';

  /* ── Get Product ID from URL ── */
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId || typeof PRODUCTS === 'undefined') {
    return;
  }

  // Define update function for UI elements
  function updateProductUI(product, lang) {
    const t = typeof window.getI18nText === 'function' ? window.getI18nText : (k => k);
    
    // Page title & basic text
    document.title = `${product.artifact} — ${product.dynasty} | ${t('hero.title_main')}`;
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
      let mainImgEl = document.getElementById('mainImageElement');
      if (!mainImgEl) {
        mainImage.innerHTML = `
          <img id="mainImageElement" src="${product.image}" alt="${product.artifact}" width="1024" height="1024" decoding="async" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));" />
        `;
      } else {
        mainImgEl.alt = product.artifact;
      }
    }
    
    const elName = document.getElementById('productName');
    if (elName) elName.textContent = product.artifact;
    
    const elDynasty = document.getElementById('productDynasty');
    if (elDynasty) elDynasty.textContent = `${product.dynasty} • ${product.era}`;
    
    const elPrice = document.getElementById('productPrice');
    if (elPrice) {
      if (product.type === 'blindbox' && product.priceBox) {
        elPrice.innerHTML = `
          <div class="product-price__options">
            <div class="price-option">
              <span class="price-option__label">${lang === 'vi' ? 'Không Hộp' : 'No Box'}</span>
              <span class="price-option__val">${formatPrice(product.price)}</span>
            </div>
            <div class="price-option highlight">
              <span class="price-option__label">${lang === 'vi' ? 'Có Hộp' : 'With Box'}</span>
              <span class="price-option__val">${formatPrice(product.priceBox)}</span>
            </div>
          </div>
        `;
      } else {
        elPrice.textContent = formatPrice(product.price);
      }
    }

    const elStatus = document.getElementById('productStatus');
    if (elStatus) {
      elStatus.className = `badge ${product.status === 'sold-out' ? 'badge--sold-out' : 'badge--in-stock'}`;
      elStatus.textContent = product.status === 'sold-out' ? t('product.status_soldout') : t('product.status_instock');
    }

    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
      if (product.status === 'sold-out') {
        buyNowBtn.disabled = true;
        buyNowBtn.innerHTML = t('product.status_soldout');
      } else {
        buyNowBtn.disabled = false;
        buyNowBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
          </svg>
          <span data-i18n="product.buy_now">${t('product.buy_now')}</span>
        `;
      }
    }

    // Specs content
    const specsContent = document.getElementById('productSpecsContent');
    if (specsContent) {
      const artifactName = product.artifact || product.dynasty;
      let artifactsListHtml = '';
      if (product.type === 'blindbox' && product.description && product.description.includes(lang === 'vi' ? 'Bao gồm:' : 'Includes:')) {
        const replaceStr = lang === 'vi' ? 'Bao gồm:' : 'Includes:';
        const itemsString = product.description.replace(replaceStr, '').trim();
        const items = itemsString.replace(/\.$/, '').split(',').map(s => s.trim());
        artifactsListHtml = `
          <ul class="artifacts-checklist">
            ${items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        `;
      } else {
        artifactsListHtml = `
          <ul class="artifacts-checklist">
            <li>${artifactName}</li>
          </ul>
        `;
      }

      specsContent.innerHTML = `
        <ul class="specs-list">
          <li><span class="spec-label">${lang === 'vi' ? 'Tên sản phẩm:' : 'Product Name:'}</span> ${artifactName}</li>
          <li><span class="spec-label">${lang === 'vi' ? 'Chất liệu:' : 'Material:'}</span>
            <ul>
              <li>${lang === 'vi' ? 'Thạch cao bọc ngoài cổ vật màu vàng đất.' : 'Terracotta-colored plaster casing.'}</li>
              <li>${lang === 'vi' ? 'Cổ vật bên trong được chế tác từ nhựa in 3D, hoàn thiện bằng phương pháp sơn thủ công nhằm tái hiện màu sắc và đặc trưng của từng hiện vật lịch sử.' : 'Internal artifacts made of 3D-printed plastic, hand-painted to replicate historical colors and features.'}</li>
            </ul>
          </li>
          <li><span class="spec-label">${lang === 'vi' ? 'Kích thước:' : 'Dimensions:'}</span> ${lang === 'vi' ? '20 × 10 × 10 cm (Cao × Dài × Rộng).' : '20 × 10 × 10 cm (H × L × W).'}</li>
          <li><span class="spec-label">${lang === 'vi' ? 'Vỏ blind box:' : 'Blind box casing:'}</span> ${lang === 'vi' ? 'Carton sóng 3 lớp cán mờ.' : '3-layer matte corrugated carton.'}</li>
          <li>
            <span class="spec-label" style="display:block; margin-bottom: 6px;">${lang === 'vi' ? 'Cổ vật bên trong:' : 'Internal Artifacts:'}</span> 
            ${artifactsListHtml}
          </li>
          <li><span class="spec-label">${lang === 'vi' ? 'Trọng lượng:' : 'Weight:'}</span> ${lang === 'vi' ? 'Khoảng 3 kg/sản phẩm.' : 'Approx. 3 kg/item.'}</li>
        </ul>
      `;
    }

    // Order Variant
    const orderVariant = document.getElementById('orderVariant');
    if (orderVariant && product.type === 'blindbox' && product.priceBox) {
      orderVariant.innerHTML = `
        <option value="${product.price}" data-name="${lang === 'vi' ? 'Không hộp' : 'No box'}">${lang === 'vi' ? 'Không hộp' : 'No box'} (${formatPrice(product.price)})</option>
        <option value="${product.priceBox}" data-name="${lang === 'vi' ? 'Có hộp' : 'With box'}">${lang === 'vi' ? 'Có hộp' : 'With box'} (${formatPrice(product.priceBox)})</option>
      `;
    }
  }

  // SYNCHRONOUSLY add event listener to avoid race conditions
  window.addEventListener('languageChanged', async (e) => {
    const lang = e.detail ? e.detail.lang : 'vi';
    const product = getProductById(productId);
    if (!product) return;
    
    // Object.assign(product, getProductById(productId)); // Useless since it's the same ref
    
    try {
      const allDetails = await getProductDetails(lang);
      const detail = allDetails[product.id];
      if (detail) Object.assign(product, detail);
    } catch (err) {
      console.error('Không thể tải lại chi tiết:', err);
    }
    
    updateProductUI(product, lang);
    
    const relatedGrid = document.getElementById('relatedGrid');
    if (relatedGrid) {
      const related = getRelatedProducts(productId, 4);
      const t = window.getI18nText || (k => k);
      relatedGrid.innerHTML = related.map(p => {
        let qty = "";
        let priceHtml = "";
        if (p.type === 'blindbox' && p.priceBox) {
          if (p.artifact.includes('Basic')) qty = t('product.basic');
          else if (p.artifact.includes('Standard') || p.artifact.includes('Tiêu Chuẩn')) qty = t('product.standard');
          else if (p.artifact.includes('Premium') || p.artifact.includes('Cao Cấp')) qty = t('product.premium');

          priceHtml = `
            <div class="blind-box__prices">
              <div class="price-row">
                <span class="price-label">${t('product.no_box')}</span>
                <span class="price-val">${formatPrice(p.price)}</span>
              </div>
              <div class="price-row">
                <span class="price-label">${t('product.with_box')}</span>
                <span class="price-val">${formatPrice(p.priceBox)}</span>
              </div>
            </div>
          `;
        } else {
          qty = p.era || p.dynasty || '';
          priceHtml = `<p class="blind-box__price" style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--trang-nga); margin-bottom: 20px;">${formatPrice(p.price)}</p>`;
        }

        return `
          <a href="product.html?id=${p.id}" class="blind-box__card" id="related-${p.id}">
            <div class="blind-box__image">
              <img src="${p.image}" alt="${p.artifact}" width="1024" height="1024" loading="lazy" decoding="async">
            </div>
            <div class="blind-box__qty">${qty}</div>
            <h3 class="blind-box__name">${p.artifact}</h3>
            <p class="blind-box__desc">${p.description}</p>
            ${priceHtml}
            <span class="blind-box__btn">${t('product.buy_now')}</span>
          </a>
        `;
      }).join('');
    }
  });

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

  let currentLang = 'vi';
  try {
    currentLang = typeof getCurrentLang === 'function' ? getCurrentLang() : 'vi';
    const allDetails = await getProductDetails(currentLang);
    const detail = allDetails[product.id];
    if (detail) {
      Object.assign(product, detail);
    }
  } catch (e) {
    console.error('Không thể tải chi tiết sản phẩm:', e);
  }

  /* ============================================================
     1. POPULATE PAGE CONTENT
     ============================================================ */
  updateProductUI(product, currentLang);


  // Thumbnails & Gallery Navigation
  let currentGalleryIndex = 0;
  const thumbContainer = document.getElementById('productThumbs');
  const mainImageContainer = document.getElementById('mainProductImage');

  function renderThumbnails() {
    if (!thumbContainer || !product.gallery || product.gallery.length === 0) {
      if (thumbContainer) {
        thumbContainer.innerHTML = `
          <div class="product-hero__thumb active" data-src="${product.image}" data-index="0">
            <img src="${product.image}" alt="${product.artifact}" width="1024" height="1024" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; border-radius: 4px;" />
          </div>
        `;
      }
      return;
    }

    if (product.gallery.length === 1) {
      thumbContainer.innerHTML = `
        <div class="product-hero__thumb active" data-index="0">
          <img src="${product.gallery[0]}" alt="${product.artifact}" width="1024" height="1024" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; border-radius: 4px;" />
        </div>
      `;
      return;
    }

    const maxThumbs = 4;
    const N = product.gallery.length;
    let start = currentGalleryIndex;
    
    if (N <= maxThumbs) {
      start = 0;
    } else if (start > N - maxThumbs) {
      start = N - maxThumbs;
    }

    // 1. Initialize DOM structure ONCE to prevent stutter/jank
    if (!document.getElementById('galleryInnerThumbs')) {
      let html = ``;
      if (N > maxThumbs) {
        html += `<button class="gallery-nav gallery-prev" id="galleryPrevBtn" aria-label="Previous image">❮</button>`;
      }
      html += `<div id="galleryInnerThumbs" class="gallery-inner-thumbs">`;
      const numThumbs = Math.min(N, maxThumbs);
      for (let i = 0; i < numThumbs; i++) {
        html += `<div class="product-hero__thumb"></div>`;
      }
      html += `</div>`;
      if (N > maxThumbs) {
        html += `<button class="gallery-nav gallery-next" id="galleryNextBtn" aria-label="Next image">❯</button>`;
      }
      thumbContainer.innerHTML = html;

      // Attach button events ONCE
      const prevBtn = document.getElementById('galleryPrevBtn');
      const nextBtn = document.getElementById('galleryNextBtn');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          let prevIdx = currentGalleryIndex - 1;
          if (prevIdx < 0) prevIdx = product.gallery.length - 1;
          updateMainImage(prevIdx);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          let nextIdx = currentGalleryIndex + 1;
          if (nextIdx >= product.gallery.length) nextIdx = 0;
          updateMainImage(nextIdx);
        });
      }

      // Attach thumb events ONCE
      const innerThumbsInit = document.getElementById('galleryInnerThumbs');
      Array.from(innerThumbsInit.children).forEach(thumb => {
        thumb.addEventListener('click', function () {
          const idx = parseInt(this.getAttribute('data-index'));
          updateMainImage(idx);
        });
      });
    }

    // 2. Update existing DOM (no destruction) to ensure smoothness
    const innerThumbs = document.getElementById('galleryInnerThumbs');
    const numThumbs = Math.min(N, maxThumbs);
    for (let i = 0; i < numThumbs; i++) {
      const child = innerThumbs.children[i];
      let imgIndex = start + i;
      child.setAttribute('data-index', imgIndex);
      
      if (i === 3 && imgIndex < N - 1) {
        const remaining = N - imgIndex;
        child.className = 'product-hero__thumb-more';
        child.innerHTML = `+${remaining}`;
        child.title = "Xem thêm ảnh";
      } else {
        child.className = `product-hero__thumb ${imgIndex === currentGalleryIndex ? 'active' : ''}`;
        child.title = "";
        
        // Re-use or create img tag
        let existingImg = child.querySelector('img');
        if (!existingImg) {
          child.innerHTML = `<img src="${product.gallery[imgIndex]}" alt="${product.artifact}" width="1024" height="1024" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; border-radius: 4px;" />`;
        } else {
          // Update src directly to prevent layout thrashing
          const newSrc = product.gallery[imgIndex];
          if (!existingImg.src.endsWith(newSrc.replace(/^\//, ''))) {
            existingImg.setAttribute('src', newSrc);
          }
        }
      }
    }
  }

  function updateMainImage(index) {
    const mainImgEl = document.getElementById('mainImageElement');
    if (mainImgEl && product.gallery && product.gallery[index]) {
      const newSrc = product.gallery[index];
      if (!mainImgEl.src.endsWith(newSrc.replace(/^\//, ''))) {
        mainImgEl.setAttribute('src', newSrc);
      }
      currentGalleryIndex = index;
      renderThumbnails();
    }
  }

  renderThumbnails();

  // Close-up gallery
  const closeupGallery = document.getElementById('closeupGallery');
  if (closeupGallery) {
    if (product.gallery && product.gallery.length > 0) {
      closeupGallery.innerHTML = product.gallery.map(imgSrc =>
        `<div class="closeup__item">
          <img src="${imgSrc}" alt="Close up" width="1024" height="1024" loading="lazy" decoding="async" />
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
      <img src="${product.image}" alt="${product.artifact}" width="1024" height="1024" loading="lazy" decoding="async" />
    `;
  }

  // Product Specs were updated by updateProductUI

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

  const orderVariantField = document.getElementById('orderVariantField');
  const orderVariant = document.getElementById('orderVariant');

  // Order variant fields were updated by updateProductUI
  if (product.type === 'blindbox' && product.priceBox) {
    if (orderVariantField) orderVariantField.style.display = 'block';
    if (orderVariant) {
      if (orderProductPrice) orderProductPrice.textContent = formatPrice(product.price);
      orderVariant.addEventListener('change', (e) => {
        if (orderProductPrice) orderProductPrice.textContent = formatPrice(parseInt(e.target.value));
      });
    }
  } else {
    if (orderProductPrice) orderProductPrice.textContent = formatPrice(product.price);
  }

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

      if (!name || !phone || !email) {
        showToast(window.getI18nText ? window.getI18nText('toast.form_incomplete') : '⚠️ Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email.');
        return;
      }

      const submitBtn = orderForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<style>@keyframes kasv-spin { 100% { transform: rotate(360deg); } }</style><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px; animation: kasv-spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> <span style="vertical-align: middle;">' + (window.getI18nText ? window.getI18nText('order.submitting') : "ĐANG XỬ LÝ...") + '</span>';
      submitBtn.disabled = true;

      let finalPrice = product.price;
      let variantName = "";
      if (product.type === 'blindbox' && product.priceBox) {
        const orderVariant = document.getElementById('orderVariant');
        if (orderVariant) {
          finalPrice = parseInt(orderVariant.value);
          variantName = " - " + orderVariant.options[orderVariant.selectedIndex].getAttribute('data-name');
        }
      }

      const orderData = {
        type: "order",
        name: name,
        email: email || "Không có",
        phone: phone,
        address: note || "Không có",
        product: product.artifact + variantName,
        quantity: qty,
        total: finalPrice * parseInt(qty),
        totalUsd: typeof window.getUsdPrice === 'function' ? window.getUsdPrice(finalPrice * parseInt(qty)) : 0,
        lang: typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'vi'
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
          showToast(window.getI18nText ? window.getI18nText('toast.order_success').replace('{name}', name) : `✅ Đặt hàng thành công! Cảm ơn ${name}, chúng tôi sẽ liên hệ bạn sớm nhất.`);
        } else {
          showToast((window.getI18nText ? window.getI18nText('toast.server_error') : "Có lỗi xảy ra: ") + result.message);
        }
      } catch (error) {
        console.error("Lỗi gửi form đặt hàng:", error);
        showToast(window.getI18nText ? window.getI18nText('toast.network_error') : "Đã xảy ra lỗi mạng. Vui lòng thử lại!");
      } finally {
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
      }
    });
  }


  /* ============================================================
     4. ESCAPE KEY HANDLER (for all modals)
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (orderModal && orderModal.classList.contains('active')) {
        closeOrderModal();
      }
    }
  });

  /* ============================================================
     5. RELATED PRODUCTS
     ============================================================ */
  const relatedGrid = document.getElementById('relatedGrid');

  if (relatedGrid) {
    const t = window.getI18nText || (k => k);
    const related = getRelatedProducts(productId, 4);
    relatedGrid.innerHTML = related.map(p => {
      let qty = "";
      let priceHtml = "";

      if (p.type === 'blindbox' && p.priceBox) {
        if (p.artifact.includes('Basic')) qty = t('product.basic');
        else if (p.artifact.includes('Standard') || p.artifact.includes('Tiêu Chuẩn')) qty = t('product.standard');
        else if (p.artifact.includes('Premium') || p.artifact.includes('Cao Cấp')) qty = t('product.premium');

        priceHtml = `
          <div class="blind-box__prices">
            <div class="price-row">
              <span class="price-label">${t('product.no_box')}</span>
              <span class="price-val">${formatPrice(p.price)}</span>
            </div>
            <div class="price-row">
              <span class="price-label">${t('product.with_box')}</span>
              <span class="price-val">${formatPrice(p.priceBox)}</span>
            </div>
            </div>
          </div>
        `;
      } else {
        qty = p.era || p.dynasty || '';
        priceHtml = `<p class="blind-box__price" style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--trang-nga); margin-bottom: 20px;">${formatPrice(p.price)}</p>`;
      }

      return `
        <a href="product.html?id=${p.id}" class="blind-box__card" id="related-${p.id}">
          <div class="blind-box__image">
            <img src="${p.image}" alt="${p.artifact}" width="1024" height="1024" loading="lazy" decoding="async">
          </div>
          <div class="blind-box__qty">${qty}</div>
          <h3 class="blind-box__name">${p.artifact}</h3>
          <p class="blind-box__desc">${p.description}</p>
          ${priceHtml}
          <span class="blind-box__btn">${t('product.buy_now')}</span>
        </a>
      `;
    }).join('');
  }


})();