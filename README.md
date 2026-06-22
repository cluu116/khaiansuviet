# 🏛️ Khai Ấn Sử Việt — Landing Page 3D/AR

> **Phá La Đồ Thời Gian, Tìm Vàng Di Sản**

Website Landing Page giới thiệu bộ sản phẩm thẻ bài bí ẩn 14 triều đại lịch sử Việt Nam, tích hợp hiển thị mô hình 3D tương tác và trải nghiệm AR (Thực tế tăng cường).

---

## 📁 Cấu Trúc Dự Án

```
khaiansuviet/
├── index.html                  # Trang Landing Page chính
├── README.md                   # Tài liệu này
└── assets/
    ├── css/
    │   └── style.css           # Toàn bộ CSS: design system, animations, responsive
    ├── js/
    │   └── script.js           # Logic: scroll, modal, card interaction, 3D/AR
    ├── images/                 # (Tạo khi có hình ảnh thực tế)
    │   ├── ui-elements/        # Icons, viền trang trí
    │   └── cards/              # Ảnh 14 thẻ bài triều đại
    ├── models/                 # (Tạo khi có mô hình 3D)
    │   ├── *.glb               # Mô hình 3D cổ vật (Trống đồng, Ấn vàng, ...)
    │   └── poster.webp         # Ảnh poster trước khi load 3D
    └── fonts/                  # (Tạo khi có font custom)
```

## 🚀 Khởi Chạy

### Cách 1: Mở trực tiếp
Mở file `index.html` trong trình duyệt (Chrome, Firefox, Edge, Safari).

### Cách 2: Live Server (khuyến nghị)
```bash
# Nếu dùng VS Code, cài extension "Live Server" và nhấn "Go Live"
# Hoặc dùng http-server:
npx http-server -p 8080
```

Truy cập: `http://localhost:8080`

## 🎨 Hệ Màu Sắc

| Tên | Mã Màu | Ý Nghĩa |
|-----|--------|----------|
| Đỏ Chu Sa | `#A62C21` | Sớ tấu, dấu triện hoàng đế |
| Vàng Thếp | `#B8860B` | Hoành phi, câu đối cổ |
| Xám Gạch Nung | `#5E5E5E` | Gạch cổ Hoàng thành |
| Nâu Đất Đỏ | `#8B4513` | Ngói mũi sen, khảo cổ |
| Xanh Men Ngọc | `#ACE1AF` | Gốm sứ Lý-Trần |
| Trắng Ngà | `#F5F5DC` | Trang sách da cổ |

## 🎭 Tính Năng

- **Preloader** — Màn hình chờ vàng kim với biểu tượng triện ấn xoay
- **Navigation Glassmorphism** — Thanh điều hướng mờ đục cổ kính
- **Hero 3D** — Vùng hiển thị mô hình 3D tương tác (model-viewer)
- **14 Thẻ Bài Bí Ẩn** — Grid thẻ bài silhouette, click để mở khóa với hiệu ứng vàng kim
- **Modal 3D/AR** — Chi tiết triều đại + model-viewer với nút kích hoạt AR
- **Tab About Us** — 5 tab thông tin thương hiệu
- **Timeline Hướng Dẫn** — 3 bước trải nghiệm AR
- **Contact Form** — Form liên hệ tối giản
- **Scroll Animations** — Hiệu ứng fade-in khi cuộn trang
- **Parallax** — Nền chuyển động nhẹ khi cuộn
- **Card Tilt Effect** — Thẻ bài nghiêng theo chuột (desktop)
- **Responsive** — Desktop, Tablet, Mobile

## 📱 Tích Hợp 3D/AR

Website sử dụng [Google Model Viewer](https://modelviewer.dev/) (CDN) để hiển thị mô hình 3D và kích hoạt AR.

### Thêm mô hình 3D:

1. Chuẩn bị file `.glb` / `.gltf` (nén, dung lượng nhỏ)
2. Đặt vào thư mục `assets/models/`
3. Trong `index.html`, thay thế placeholder bằng:

```html
<model-viewer
  src="assets/models/ten-mo-hinh.glb"
  poster="assets/models/poster.webp"
  camera-controls
  auto-rotate
  ar
  ar-modes="webxr scene-viewer quick-look"
  alt="Mô tả cổ vật"
  style="width: 100%; height: 100%;"
>
  <button slot="ar-button" class="modal__ar-btn">
    Xem AR Trong Không Gian Thực
  </button>
</model-viewer>
```

### Yêu cầu AR:
- **Android**: Chrome 79+ (WebXR / Scene Viewer)
- **iOS**: Safari 12+ (Quick Look với file `.usdz`)
- Cần truy cập qua **HTTPS** để kích hoạt camera

## 🛠️ Công Nghệ

- **HTML5** — Cấu trúc ngữ nghĩa
- **CSS3** — Custom Properties, Grid, Flexbox, Animations, Glassmorphism
- **JavaScript ES6+** — Intersection Observer, Event Delegation
- **Google Model Viewer 3.5** — 3D rendering + WebXR AR
- **Google Fonts** — Cinzel, Playfair Display, Merriweather

## 📋 14 Triều Đại

1. Văn Lang (2879-258 TCN) — Trống Đồng Đông Sơn
2. Âu Lạc (257-207 TCN) — Nỏ Thần Liên Châu
3. Nhà Triệu (207-111 TCN) — Ấn Vàng Văn Đế
4. Nhà Ngô (939-965) — Cọc Gỗ Bạch Đằng
5. Nhà Đinh (968-980) — Kiếm Lệnh Đinh Tiên Hoàng
6. Nhà Tiền Lê (980-1009) — Giáp Trụ Thời Lê
7. Nhà Lý (1009-1225) — Rồng Thời Lý
8. Nhà Trần (1226-1400) — Hịch Tướng Sĩ
9. Nhà Hồ (1400-1407) — Thành Nhà Hồ
10. Nhà Hậu Lê (1428-1789) — Gươm Thuận Thiên
11. Nhà Mạc (1527-1677) — Gốm Sứ Thời Mạc
12. Nhà Tây Sơn (1778-1802) — Trống Trận Tây Sơn
13. Nhà Nguyễn (1802-1945) — Cửu Đỉnh Nhà Nguyễn
14. Bắc Thuộc & Khởi Nghĩa (111 TCN-938) — Voi Chiến Hai Bà Trưng

---

© 2024 Khai Ấn Sử Việt. Tân Xã, Hòa Lạc, Hà Nội.
