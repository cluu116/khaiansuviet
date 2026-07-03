# 📜 Khai Ấn Sử Việt — Hành trình đánh thức di sản

> **Phá La Đồ Thời Gian, Tìm Vàng Di Sản**

Khai Ấn Sử Việt là một dự án công nghệ kết hợp văn hóa, nhằm phục dựng và lưu giữ các hiện vật lịch sử Việt Nam qua lăng kính công nghệ 3D và AR (Thực tế tăng cường). Website mang đến trải nghiệm tương tác với 14 cổ vật đại diện cho 14 triều đại lịch sử hào hùng, kết hợp cơ chế mở khóa (Blind Box) thông qua cổ vật vật lý tích hợp NFC.

---

## 🌟 Key Features

- **Trải nghiệm 3D Tương Tác**: Xoay, thu phóng và khám phá chi tiết các cổ vật lịch sử ngay trên trình duyệt nhờ sức mạnh của WebGL.
- **Thực Tế Tăng Cường (AR)**: Đặt các mô hình cổ vật kích thước thật vào không gian thực của bạn thông qua WebXR (Android) và Quick Look (iOS).
- **Bộ Sưu Tập 14 Triều Đại**: Hành trình xuyên suốt lịch sử Việt Nam, từ thời Văn Lang đến nhà Nguyễn, với dữ liệu lịch sử chân thực và sâu sắc.
- **Cơ chế Thẻ Bài NFC**: Kết nối thế giới thực và ảo. Người dùng có thể quét thẻ bài vật lý để mở khóa và xem cổ vật tương ứng trên website.
- **Thiết Kế UI/UX Đậm Chất Văn Hóa**: Giao diện Glassmorphism kết hợp hệ màu sắc cổ điển (Đỏ Chu Sa, Vàng Thếp), hiệu ứng Parallax mượt mà và hạt bụi vàng rơi (Particle Effects).

## 🛠️ Tech Stack

Dự án được xây dựng hoàn toàn bằng các công nghệ web thuần túy (Vanilla) để tối ưu hiệu năng và khả năng tương thích:

- **Frontend**: HTML5, CSS3 (Custom Properties, Grid, Flexbox), Vanilla JavaScript (ES6+).
- **3D & AR Rendering**: `<model-viewer>` (do Google phát triển).
- **Phông Chữ**: Google Fonts (Cinzel, Playfair Display, Merriweather).
- **Backend/Data Collection**: Google Apps Script (GAS) tích hợp Google Sheets làm database lưu trữ thông tin đăng ký nhận tin.

## 🚀 Getting Started

Làm theo các bước sau để chạy dự án trên máy tính cá nhân của bạn.

### Yêu cầu hệ thống
- Bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari).
- Để trải nghiệm tính năng AR, cần thiết bị di động hỗ trợ WebXR (Android) hoặc ARKit (iOS) và **trang web phải được phục vụ qua HTTPS**.

### Cài đặt và Chạy cục bộ

1. **Clone repository này:**
   ```bash
   git clone https://github.com/cluu116/khaiansuviet.git
   cd khaiansuviet
   ```

2. **Khởi chạy Local Server:**
   Vì dự án sử dụng các file module và tải mô hình 3D, bạn cần chạy qua một local server (không mở trực tiếp file `file://` để tránh lỗi CORS).

   *Cách 1: Sử dụng Extension "Live Server" trong VS Code.* (Khuyến nghị)
   - Mở thư mục dự án trong VS Code.
   - Nhấp vào nút "Go Live" ở thanh trạng thái dưới cùng.

   *Cách 2: Sử dụng `http-server` (Node.js).*
   ```bash
   npx http-server -p 8080
   ```
   Sau đó truy cập `http://localhost:8080` trên trình duyệt.

## 📁 Project Structure

```text
khaiansuviet/
├── index.html                  # Landing Page (Giới thiệu, Hero 3D, Mystery Grid, About, Contact)
├── artifact.html               # Trang hiển thị chi tiết 1 Cổ vật (3D/AR, Thông tin lịch sử)
├── collection.html             # Trang Bộ Sưu Tập (Quản lý mở khóa bằng thẻ NFC)
├── product.html                # Trang chi tiết sản phẩm Blind Box
├── README.md                   # Tài liệu dự án
└── assets/
    ├── css/
    │   ├── style.css           # Global design system (màu sắc, typography, utilities)
    │   ├── home.css            # Style riêng cho Landing Page
    │   ├── artifact.css        # Style riêng cho trang Artifact Detail
    │   └── collection.css      # Style riêng cho trang Collection
    ├── js/
    │   ├── data.js             # Dữ liệu trung tâm (14 cổ vật, cấu hình API)
    │   ├── common.js           # Chức năng dùng chung (Navigation, Reveal Animation)
    │   ├── effects.js          # Particle Engine (Hiệu ứng hạt bụi vàng)
    │   ├── home.js             # Logic Landing Page (Parallax, Scroll, Form Submit)
    │   ├── artifact.js         # Logic 3D/AR Loader, Exponential Backoff retry
    │   ├── collection.js       # Logic render Grid, xử lý NFC Mockup
    │   └── product.js          # Logic trang sản phẩm Blind Box
    ├── images/                 # Ảnh UI, Texture, Mockup sản phẩm
    └── models/                 # Chứa các file .glb và .usdz (Được lưu trữ trên CDN/R2)
```

## 📋 14 Cổ Vật Triều Đại

Hệ thống dữ liệu bao phủ 4 kỷ nguyên lịch sử lớn:

| Kỷ Nguyên | Triều Đại | Cổ Vật Tiêu Biểu |
| :--- | :--- | :--- |
| **Kỷ Nguyên Lập Quốc & Bắc Thuộc** | Văn Lang | Trống Đồng Đông Sơn |
| | Âu Lạc | Nỏ Thần Liên Châu |
| | Nhà Triệu | Ấn Vàng Văn Đế |
| | Bắc Thuộc | Voi Chiến Hai Bà Trưng |
| **Kỷ Nguyên Độc Lập Sơ Kỳ** | Nhà Ngô | Cọc Gỗ Bạch Đằng |
| | Nhà Đinh | Kiếm Lệnh Đinh Tiên Hoàng |
| | Nhà Tiền Lê | Giáp Trụ Thời Lê |
| **Kỷ Nguyên Đại Việt Hoàng Kim** | Nhà Lý | Rồng Thời Lý |
| | Nhà Trần | Hịch Tướng Sĩ |
| | Nhà Hồ | Thành Nhà Hồ |
| | Nhà Hậu Lê | Gươm Thuận Thiên |
| **Kỷ Nguyên Nam-Bắc Triều & Thống Nhất**| Nhà Mạc | Gốm Sứ Thời Mạc |
| | Nhà Tây Sơn | Trống Trận Tây Sơn |
| | Nhà Nguyễn | Cửu Đỉnh Nhà Nguyễn |

---

<p align="center">
  <i>© 2026 Khai Ấn Sử Việt. Tân Xã, Hòa Lạc, Hà Nội. Phục dựng lịch sử bằng công nghệ của tương lai.</i>
</p>
