/* ============================================================
   KHAI ẤN SỬ VIỆT — Product Detail Page JavaScript
   Gallery, Order Form, Accordion, Related Products
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

  const MODEL_VIEWER_SRC = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
  let modelViewerPromise = null;

  function ensureModelViewerLoaded() {
    if (customElements.get('model-viewer')) return Promise.resolve();
    if (modelViewerPromise) return modelViewerPromise;

    modelViewerPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${MODEL_VIEWER_SRC}"]`);
      if (existingScript) {
        // If the script is already fully loaded or the custom element is defined, resolve immediately
        if (customElements.get('model-viewer') || existingScript.readyState === 'complete' || existingScript.readyState === 'loaded') {
          resolve();
        } else {
          existingScript.addEventListener('load', resolve, { once: true });
          existingScript.addEventListener('error', reject, { once: true });
        }
        return;
      }

      const script = document.createElement('script');
      script.type = 'module';
      script.src = MODEL_VIEWER_SRC;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return modelViewerPromise;
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
      <img id="mainImageElement" src="${product.image}" alt="${product.artifact}" width="1024" height="1024" decoding="async" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));" />
    `;
  }

  // Product info
  const elName = document.getElementById('productName');
  const elDynasty = document.getElementById('productDynasty');
  const elPrice = document.getElementById('productPrice');
  const elStatus = document.getElementById('productStatus');

  if (elName) {
    elName.textContent = product.artifact;
    if (product.type === 'blindbox') {
      if (product.id === 'box_bdddc48ec18c4fc998ee351dc0eaa98d') elName.classList.add('product-hero__name--basic');
      else if (product.id === 'box_575e2155ebbf42ecbc666f32ccc37aab') elName.classList.add('product-hero__name--standard');
      else if (product.id === 'box_0234e6d19b374b35ba13cd3fa9f9d18b') elName.classList.add('product-hero__name--premium');
    }
  }
  if (elDynasty) elDynasty.textContent = `${product.dynasty} • ${product.era}`;
  if (elPrice) {
    if (product.type === 'blindbox' && product.priceBox) {
      elPrice.innerHTML = `
        <div class="product-price__options">
          <div class="price-option">
            <span class="price-option__label">Không Hộp</span>
            <span class="price-option__val">${formatPrice(product.price)}</span>
          </div>
          <div class="price-option highlight">
            <span class="price-option__label">Có Hộp</span>
            <span class="price-option__val">${formatPrice(product.priceBox)}</span>
          </div>
          <div class="price-option premium">
            <span class="price-option__label">Hộp Gỗ</span>
            <span class="price-option__val">${formatPrice(product.priceWood)}</span>
          </div>
        </div>
      `;
    } else {
      elPrice.textContent = formatPrice(product.price);
    }
  }
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
          <img src="${imgSrc}" alt="${product.artifact}" width="1024" height="1024" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; border-radius: 4px;" />
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
          <img src="${product.image}" alt="${product.artifact}" width="1024" height="1024" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; border-radius: 4px;" />
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

  // Specs content
  const specsContent = document.getElementById('productSpecsContent');
  if (specsContent) {
    const artifactName = product.artifact || product.dynasty;

    // Create checkmarked artifacts list
    let artifactsListHtml = '';
    if (product.type === 'blindbox' && product.description && product.description.includes('Bao gồm:')) {
      const itemsString = product.description.replace('Bao gồm:', '').trim();
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
        <li><span class="spec-label">Tên sản phẩm:</span> ${artifactName}</li>
        <li><span class="spec-label">Chất liệu:</span>
          <ul>
            <li>Thạch cao bọc ngoài cổ vật màu vàng đất.</li>
            <li>Cổ vật bên trong được chế tác từ nhựa in 3D, hoàn thiện bằng phương pháp sơn thủ công nhằm tái hiện màu sắc và đặc trưng của từng hiện vật lịch sử.</li>
          </ul>
        </li>
        <li><span class="spec-label">Kích thước:</span> 20 × 10 × 10 cm (Cao × Dài × Rộng).</li>
        <li><span class="spec-label">Vỏ blind box:</span> Carton sóng 3 lớp cán mờ.</li>
        <li>
          <span class="spec-label" style="display:block; margin-bottom: 6px;">Cổ vật bên trong:</span> 
          ${artifactsListHtml}
        </li>
        <li><span class="spec-label">Trọng lượng:</span> Khoảng 3 kg/sản phẩm.</li>
      </ul>
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

  const orderVariantField = document.getElementById('orderVariantField');
  const orderVariant = document.getElementById('orderVariant');

  if (product.type === 'blindbox' && product.priceBox) {
    if (orderVariantField) orderVariantField.style.display = 'block';
    if (orderVariant) {
      orderVariant.innerHTML = `
        <option value="${product.price}" data-name="Không hộp">Không hộp (${formatPrice(product.price)})</option>
        <option value="${product.priceBox}" data-name="Có hộp">Có hộp (${formatPrice(product.priceBox)})</option>
        <option value="${product.priceWood}" data-name="Hộp gỗ">Hộp gỗ (${formatPrice(product.priceWood)})</option>
      `;
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
        showToast('⚠️ Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email.');
        return;
      }

      const submitBtn = orderForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "ĐANG XỬ LÝ...";
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
        total: finalPrice * parseInt(qty)
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
     4. ESCAPE KEY HANDLER (for all modals)
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
     5. RELATED PRODUCTS
     ============================================================ */
  const relatedGrid = document.getElementById('relatedGrid');

  if (relatedGrid) {
    const related = getRelatedProducts(productId, 4);
    relatedGrid.innerHTML = related.map(p => {
      let qty = "";
      let priceHtml = "";

      if (p.type === 'blindbox' && p.priceBox) {
        if (p.artifact.includes('Basic')) qty = 'Dòng Cơ Bản';
        else if (p.artifact.includes('Standard')) qty = 'Dòng Tiêu Chuẩn';
        else if (p.artifact.includes('Premium')) qty = 'Dòng Cao Cấp';

        priceHtml = `
          <div class="blind-box__prices">
            <div class="price-row">
              <span class="price-label">Không hộp:</span>
              <span class="price-val">${formatPrice(p.price)}</span>
            </div>
            <div class="price-row">
              <span class="price-label">Có hộp:</span>
              <span class="price-val">${formatPrice(p.priceBox)}</span>
            </div>
            <div class="price-row">
              <span class="price-label">Hộp gỗ:</span>
              <span class="price-val highlight">${formatPrice(p.priceWood)}</span>
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
          <span class="blind-box__btn">MUA NGAY</span>
        </a>
      `;
    }).join('');
  }

})();