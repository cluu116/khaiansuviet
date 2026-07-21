/* ============================================================
   KHAI ẤN SỬ VIỆT — Core Product Data
   Shared data layer used across all pages
   (Details like story, SVG, 3D models are lazy loaded from products-detail.json)
   ============================================================ */

/* ── Shared Constants ── */
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyzMrIuKg5TEjod8WYQ9FqOC48dL6xkMhkslC59h6LmtqARGDAp4DLFHKIRfSTAwcd5/exec';

const PRODUCTS = [
  {
    "id": "kasv_4be3b45e347a46169a6fa592bcdfe00d",
    "type": "artifact",
    "dynasty": "Văn Lang",
    "era": "Khoảng thế kỷ VII trước Công nguyên (2524TCN - 258TCN)",
    "artifact": "Trống Đồng Đông Sơn",
    "image": "assets/images/artifacts/Trống đồng Đông Sơn/Trống đồng Đông Sơn.webp",
    "description": "Thời kỳ dựng nước đầu tiên của dân tộc Việt Nam, gắn liền với huyền thoại Vua Hùng, Lạc Long Quân và Âu Cơ. Nền văn minh rực rỡ với Trống đồng Đông Sơn — biểu tượng văn hóa trường tồn."
  },
  {
    "id": "kasv_b7c018a1616c42ac9073368b9e001470",
    "type": "artifact",
    "dynasty": "Âu Lạc",
    "era": "Khoảng thế kỷ III trước Công nguyên (258TCN-208TCN)",
    "artifact": "Nỏ Liên Châu - nỏ thần Cổ Loa",
    "image": "assets/images/artifacts/Nỏ thần An Dương Vương/Nỏ thần An Dương Vương.webp",
    "description": "An Dương Vương thống nhất Âu Việt và Lạc Việt, xây thành Cổ Loa — tòa thành ốc xoắn huyền thoại. Câu chuyện nỏ thần, Mỵ Châu - Trọng Thủy là bài học muôn đời về cảnh giác."
  },
  {
    "id": "kasv_fdd63a242a4d43bd846f1c09eb5b0f6f",
    "type": "artifact",
    "dynasty": "Nhà Ngô",
    "era": "939-965",
    "artifact": "Sa hình thế trận cọc gỗ Bạch Đằng",
    "image": "assets/images/artifacts/Sa hình Cọc gỗ Bạch Đằng/Sa hình Cọc gỗ Bạch Đằng.webp",
    "description": "Ngô Quyền đại phá quân Nam Hán trên sông Bạch Đằng năm 938, chấm dứt hơn 1000 năm Bắc thuộc. Chiến thắng lẫy lừng đặt nền móng cho kỷ nguyên độc lập dân tộc."
  },
  {
    "id": "kasv_542c8726aed941a6ab40ceae371819ee",
    "type": "artifact",
    "dynasty": "Nhà Tiền Lê",
    "era": "Khoảng năm 981",
    "artifact": "Tiền Thái Bình Hưng Bảo",
    "image": "assets/images/artifacts/Tiền Thái Bình Hưng Bảo/Tiền Thái Bình Hưng Bảo.webp",
    "description": "Lê Đại Hành kế thừa sự nghiệp nhà Đinh, anh dũng đánh bại quân Tống xâm lược, bảo vệ nền độc lập non trẻ và mở mang bờ cõi phía Nam."
  },
  {
    "id": "kasv_90ba8e957f584ff99df9209f16a626d4",
    "type": "artifact",
    "dynasty": "Nhà Đinh",
    "era": "Cuối thế kỷ X (khoảng năm 968-980)",
    "artifact": "Gạch \"Đại Việt quốc quân thành chuyên\"",
    "image": "assets/images/artifacts/Gạch Đại Việt quốc quân thành chuyên/Gạch Đại Việt quốc quân thành chuyên.webp",
    "description": "Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước và lên ngôi Hoàng đế, đặt quốc hiệu Đại Cồ Việt — quốc hiệu chính thức đầu tiên của nước ta."
  },
  {
    "id": "kasv_db3e2121d18c44739f0720b0f59310b7",
    "type": "artifact",
    "dynasty": "Nhà Lý",
    "era": "Thế kỷ XI - XIII (1009-1225)",
    "artifact": "Đầu rồng thời Lý",
    "image": "assets/images/artifacts/Đầu rồng thời Lý/Đầu rồng thời Lý.webp",
    "description": "Lý Công Uẩn dời đô về Thăng Long, mở ra kỷ nguyên hoàng kim rực rỡ nhất. Phật giáo hưng thịnh, nghệ thuật gốm sứ, kiến trúc chùa tháp và Rồng thời Lý trở thành biểu tượng bất hủ."
  },
  {
    "id": "kasv_8fc4f5bf04b14e8c8b70f543ca8b6235",
    "type": "artifact",
    "dynasty": "Nhà Trần",
    "era": "Lấy cảm hứng từ hệ thống ấn tín dưới triều Trần, thế kỷ XIII - XIV (1225-1400)",
    "artifact": "Ấn tín nhà Trần",
    "image": "assets/images/artifacts/Ấn tín nhà Trần/Ấn tín nhà Trần.webp",
    "description": "Ba lần đại phá quân Nguyên Mông dưới sự lãnh đạo của Hưng Đạo Đại Vương Trần Quốc Tuấn. Hào khí Đông A vang dội, Hịch tướng sĩ trở thành áng văn bất hủ."
  },
  {
    "id": "kasv_7cdd1a74a27347779c3f3f7bc7b69c35",
    "type": "artifact",
    "dynasty": "Nhà Hồ",
    "era": "Cuối thế kỷ XIV - đầu thế kỷ XV (1400–1407)",
    "artifact": "Thành Nhà Hồ",
    "image": "assets/images/artifacts/Đá Thành Nhà Hồ/Đá Thành Nhà Hồ.webp",
    "description": "Hồ Quý Ly tiến hành cải cách táo bạo: phát hành tiền giấy, cải tổ giáo dục, xây thành Tây Đô bằng đá đồ sộ. Dù ngắn ngủi, nhà Hồ để lại di sản kiến trúc độc nhất vô nhị."
  },
  {
    "id": "kasv_51783bb4502e431a8537bb549b69345d",
    "type": "artifact",
    "dynasty": "Lê Sơ",
    "era": "Năm 1467, dưới thời vua Lê Thánh Tông (1428-1527)",
    "artifact": "Rồng đá thành bậc điện Kính Thiên",
    "image": "assets/images/artifacts/Rồng đá điện kính thiên/Rồng đá điện kính thiên.webp",
    "description": "Lê Lợi lãnh đạo khởi nghĩa Lam Sơn 10 năm gian khổ, giải phóng đất nước khỏi ách đô hộ nhà Minh. Nguyễn Trãi soạn Bình Ngô Đại Cáo — bản Tuyên ngôn Độc lập thứ hai."
  },
  {
    "id": "kasv_2dd2f9fa988a4d85b110f540a85b1dd9",
    "type": "artifact",
    "dynasty": "Nhà Mạc",
    "era": "Thế kỷ XVI",
    "artifact": "Lư hương gốm men nâu - lam xám",
    "image": "assets/images/artifacts/Lư hương gốm men nâu/Lư hương gốm men nâu.webp",
    "description": "Mạc Đăng Dung lập triều Mạc, mở ra thời kỳ Nam - Bắc triều phân tranh. Dù gây tranh cãi, nhà Mạc để lại dấu ấn kiến trúc, gốm sứ và thương mại phồn thịnh."
  },
  {
    "id": "kasv_0722f40301894ab2916cb444b53f6ceb",
    "type": "artifact",
    "dynasty": "Lê Trung Hưng – Trịnh",
    "era": "Khoảng thế kỷ XVI - XVIII, nổi bật từ năm 1533 đến cuối thế kỷ XVIII",
    "artifact": "Súng thần công",
    "image": "assets/images/artifacts/Súng thần công/Súng thần công.webp",
    "description": "Thời kỳ vua Lê - chúa Trịnh cai trị Đàng Ngoài. Quyền lực thực sự nằm trong tay các chúa Trịnh, trong khi vua Lê chỉ giữ vai trò tượng trưng. Công nghệ quân sự phát triển mạnh với súng thần công."
  },
  {
    "id": "kasv_6a8685ed51344e7abea0b5c739c82fef",
    "type": "artifact",
    "dynasty": "Chúa Nguyễn (Đàng Trong)",
    "era": "Khoảng thế kỷ XVI - XVIII, từ năm 1558 đến 1777",
    "artifact": "Thuyền chiến Đàng Trong",
    "image": "assets/images/artifacts/Thuyền chiến Đàng Trong/Thuyền chiến Đàng Trong.webp",
    "description": "Các chúa Nguyễn mở cõi về phương Nam, xây dựng Đàng Trong thành vùng đất trù phú. Hải quân hùng mạnh với thuyền chiến quy mô lớn, giao thương quốc tế phồn thịnh qua cảng Hội An."
  },
  {
    "id": "kasv_0840bd5eb40547659c7993c2d8996449",
    "type": "artifact",
    "dynasty": "Tây Sơn",
    "era": "Cuối thế kỷ XVIII, gắn với phong trào Tây Sơn và chiến thắng Ngọc Hồi - Đống Đa năm 1789.",
    "artifact": "Tượng voi chiến Tây Sơn",
    "image": "assets/images/artifacts/Ấm hình voi bằng đồng/Ấm hình voi bằng đồng.webp",
    "description": "Anh hùng Quang Trung - Nguyễn Huệ thống nhất đất nước, đại phá 29 vạn quân Thanh trong chiến dịch thần tốc mùa Xuân Kỷ Dậu 1789 — một trong những chiến thắng vĩ đại nhất lịch sử."
  },
  {
    "id": "kasv_3efc1d2799544146b60243eb7f23aa64",
    "type": "artifact",
    "dynasty": "Nhà Nguyễn",
    "era": "Năm Minh Mạng thứ 4 (1823).",
    "artifact": "Ấn vàng “Hoàng đế chi bảo”",
    "image": "assets/images/artifacts/Ấn vàng Hoàng đế chi bảo/Ấn vàng Hoàng đế chi bảo.webp",
    "description": "Triều đại phong kiến cuối cùng, Gia Long thống nhất giang sơn và đặt kinh đô tại Huế. Di sản kiến trúc cung đình Huế, ấn vàng, Đại Nội được UNESCO công nhận Di sản Thế giới."
  },
  {
    "id": "box_bdddc48ec18c4fc998ee351dc0eaa98d",
    "type": "blindbox",
    "dynasty": "Khai Ấn Sử Việt",
    "era": "Bộ Sưu Tập 14 Triều Đại",
    "artifact": "ẤN TÍCH VIỆT SỬ - Basic",
    "image": "assets/images/blindbox/BlindBox_Basic.webp",
    "description": "Bao gồm: Tiền Thái Bình Hưng Bảo, Nỏ thần An Dương Vương, Gạch Đại Việt quốc quân thành chuyên.",
    "price": 239000,
    "priceBox": 299000,
    "priceWood": 499000,
    "status": "in-stock"
  },
  {
    "id": "box_575e2155ebbf42ecbc666f32ccc37aab",
    "type": "blindbox",
    "dynasty": "Khai Ấn Sử Việt",
    "era": "Bộ Sưu Tập 14 Triều Đại",
    "artifact": "ẤN TÍCH VIỆT SỬ - Standard",
    "image": "assets/images/blindbox/BlindBox_Standard.webp",
    "description": "Bao gồm: Súng thần công, Thuyền chiến Đàng Trong, Đá Thành Nhà Hồ.",
    "price": 269000,
    "priceBox": 329000,
    "priceWood": 529000,
    "status": "in-stock"
  },
  {
    "id": "box_0234e6d19b374b35ba13cd3fa9f9d18b",
    "type": "blindbox",
    "dynasty": "Khai Ấn Sử Việt",
    "era": "Bộ Sưu Tập 14 Triều Đại",
    "artifact": "ẤN TÍCH VIỆT SỬ - Premium",
    "image": "assets/images/blindbox/BlindBox_Premium.webp",
    "description": "Bao gồm: Rồng đá điện Kính Thiên, Sa hình Cọc gỗ Bạch Đằng, Trống đồng Đông Sơn, Ấm hình voi bằng đồng, Ấn tín nhà Trần, Lư hương gốm men nâu, Đầu rồng thời Lý.",
    "price": 299000,
    "priceBox": 359000,
    "priceWood": 559000,
    "status": "in-stock"
  }
];
