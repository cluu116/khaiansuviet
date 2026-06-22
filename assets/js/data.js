/* ============================================================
   KHAI ẤN SỬ VIỆT — Product & Dynasty Data
   Shared data layer used across all pages
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    dynasty: 'Văn Lang',
    era: '2879 - 258 TCN',
    artifact: 'Trống Đồng Đông Sơn',
    price: 199000,
    status: 'in-stock',
    description: 'Thời kỳ dựng nước đầu tiên của dân tộc Việt Nam, gắn liền với huyền thoại Vua Hùng, Lạc Long Quân và Âu Cơ. Nền văn minh rực rỡ với Trống đồng Đông Sơn — biểu tượng văn hóa trường tồn.',
    artifactDesc: 'Hiện vật bằng đồng tiêu biểu nhất của nền văn minh Đông Sơn, với hoa văn tinh xảo mô tả đời sống, lễ hội và tín ngưỡng thờ Mặt Trời.',
    image: 'assets/images/product-01.png',
    gallery: ['assets/images/product-01.png', 'assets/images/closeup-01a.png', 'assets/images/closeup-01b.png', 'assets/images/closeup-01c.png'],
    model: 'assets/models/01_trong_dong.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<circle cx="40" cy="35" r="25" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="40,15 47,30 60,30 50,40 54,55 40,47 26,55 30,40 20,30 33,30" fill="none" stroke="currentColor" stroke-width="0.8"/><rect x="25" y="55" width="30" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<circle cx="60" cy="45" r="35" fill="none" stroke="#B8860B" stroke-width="1.5"/><polygon points="60,15 67,32 85,32 71,43 76,60 60,50 44,60 49,43 35,32 53,32" fill="none" stroke="#B8860B" stroke-width="1.2"/><circle cx="60" cy="45" r="12" fill="none" stroke="#B8860B" stroke-width="0.8"/><circle cx="60" cy="45" r="4" fill="#B8860B" opacity="0.6"/><rect x="35" y="78" width="50" height="10" rx="3" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">TRỐNG ĐỒNG</text>'
  },
  {
    id: 2,
    dynasty: 'Âu Lạc',
    era: '257 - 207 TCN',
    artifact: 'Nỏ Thần Liên Châu',
    price: 199000,
    status: 'in-stock',
    description: 'An Dương Vương thống nhất Âu Việt và Lạc Việt, xây thành Cổ Loa — tòa thành ốc xoắn huyền thoại. Câu chuyện nỏ thần, Mỵ Châu - Trọng Thủy là bài học muôn đời về cảnh giác.',
    artifactDesc: 'Vũ khí huyền thoại được thần Kim Quy trao cho An Dương Vương, có khả năng bắn hàng ngàn mũi tên cùng lúc, bảo vệ thành Cổ Loa.',
    image: 'assets/images/product-02.png',
    gallery: ['assets/images/product-02.png', 'assets/images/closeup-02a.png', 'assets/images/closeup-02b.png', 'assets/images/closeup-02c.png'],
    model: 'assets/models/02_no_than.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<path d="M20 60 L40 15 L60 60" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 50 L55 50" stroke="currentColor" stroke-width="1"/><circle cx="40" cy="35" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M40 20 L40 10 M35 14 L45 14" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M30 80 L60 20 L90 80" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M38 65 L82 65" stroke="#B8860B" stroke-width="1"/><path d="M60 25 L60 10" stroke="#B8860B" stroke-width="1.2"/><polygon points="55,12 60,2 65,12" fill="#B8860B" opacity="0.6"/><circle cx="60" cy="45" r="8" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">NỎ THẦN</text>'
  },
  {
    id: 3,
    dynasty: 'Nhà Triệu',
    era: '207 - 111 TCN',
    artifact: 'Ấn Vàng Văn Đế',
    price: 249000,
    status: 'in-stock',
    description: 'Triệu Đà lập nước Nam Việt sau khi thôn tính Âu Lạc. Một thời kỳ giao thoa văn hóa phức tạp, nơi bản sắc Việt vẫn kiên cường tồn tại giữa ảnh hưởng phương Bắc.',
    artifactDesc: 'Ấn triện bằng vàng của Triệu Văn Đế, biểu tượng quyền lực tối cao, được phát hiện trong lăng mộ tại Quảng Châu.',
    image: 'assets/images/product-03.png',
    gallery: ['assets/images/product-03.png', 'assets/images/closeup-03a.png', 'assets/images/closeup-03b.png', 'assets/images/closeup-03c.png'],
    model: 'assets/models/03_an_vang.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng',
      weight: '18g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 500 bộ — Phiên bản đặc biệt'
    },
    silhouetteSvg: '<rect x="20" y="20" width="40" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="28" y="28" width="24" height="24" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/><text x="40" y="46" text-anchor="middle" font-family="serif" font-size="14" fill="currentColor" opacity="0.5">印</text>',
    backSvg: '<rect x="30" y="20" width="60" height="55" rx="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="38" y="28" width="44" height="39" rx="2" fill="none" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="54" text-anchor="middle" font-family="serif" font-size="22" fill="#B8860B" opacity="0.6">印</text><rect x="45" y="12" width="30" height="12" rx="6" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">ẤN VÀNG</text>'
  },
  {
    id: 4,
    dynasty: 'Nhà Ngô',
    era: '939 - 965',
    artifact: 'Cọc Gỗ Bạch Đằng',
    price: 199000,
    status: 'in-stock',
    description: 'Ngô Quyền đại phá quân Nam Hán trên sông Bạch Đằng năm 938, chấm dứt hơn 1000 năm Bắc thuộc. Chiến thắng lẫy lừng đặt nền móng cho kỷ nguyên độc lập dân tộc.',
    artifactDesc: 'Hệ thống cọc gỗ được đóng dưới lòng sông Bạch Đằng, lợi dụng thủy triều để phá tan đội thuyền chiến hùng mạnh của quân Nam Hán.',
    image: 'assets/images/product-04.png',
    gallery: ['assets/images/product-04.png', 'assets/images/closeup-04a.png', 'assets/images/closeup-04b.png', 'assets/images/closeup-04c.png'],
    model: 'assets/models/04_coc_bach_dang.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<line x1="25" y1="15" x2="25" y2="65" stroke="currentColor" stroke-width="2"/><line x1="40" y1="20" x2="40" y2="60" stroke="currentColor" stroke-width="2"/><line x1="55" y1="10" x2="55" y2="65" stroke="currentColor" stroke-width="2"/><path d="M15 65 Q40 55 65 65" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<line x1="35" y1="10" x2="35" y2="70" stroke="#B8860B" stroke-width="2.5"/><line x1="55" y1="15" x2="55" y2="65" stroke="#B8860B" stroke-width="2.5"/><line x1="75" y1="8" x2="75" y2="72" stroke="#B8860B" stroke-width="2.5"/><path d="M20 70 Q55 55 100 72" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M20 78 Q55 68 100 80" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">CỌC BẠCH ĐẰNG</text>'
  },
  {
    id: 5,
    dynasty: 'Nhà Đinh',
    era: '968 - 980',
    artifact: 'Kiếm Lệnh Đinh Tiên Hoàng',
    price: 199000,
    status: 'in-stock',
    description: 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước và lên ngôi Hoàng đế, đặt quốc hiệu Đại Cồ Việt — quốc hiệu chính thức đầu tiên của nước ta.',
    artifactDesc: 'Thanh kiếm biểu tượng uy quyền của Đinh Tiên Hoàng — vị Hoàng đế đầu tiên thống nhất giang sơn sau thời loạn lạc.',
    image: 'assets/images/product-05.png',
    gallery: ['assets/images/product-05.png', 'assets/images/closeup-05a.png', 'assets/images/closeup-05b.png', 'assets/images/closeup-05c.png'],
    model: 'assets/models/05_kiem_lenh.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<path d="M40 10 L40 60" stroke="currentColor" stroke-width="2"/><path d="M35 60 L45 60" stroke="currentColor" stroke-width="2"/><path d="M30 15 L50 15" stroke="currentColor" stroke-width="1.5"/><circle cx="40" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M60 5 L60 75" stroke="#B8860B" stroke-width="2.5"/><path d="M50 75 L70 75" stroke="#B8860B" stroke-width="3"/><path d="M45 12 L75 12" stroke="#B8860B" stroke-width="2"/><circle cx="60" cy="5" r="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M55 12 L55 18 M65 12 L65 18" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">KIẾM LỆNH</text>'
  },
  {
    id: 6,
    dynasty: 'Nhà Tiền Lê',
    era: '980 - 1009',
    artifact: 'Giáp Trụ Thời Lê',
    price: 199000,
    status: 'in-stock',
    description: 'Lê Đại Hành kế thừa sự nghiệp nhà Đinh, anh dũng đánh bại quân Tống xâm lược, bảo vệ nền độc lập non trẻ và mở mang bờ cõi phía Nam.',
    artifactDesc: 'Bộ giáp trụ chiến binh tiêu biểu cho sức mạnh quân sự thời Tiền Lê, thể hiện tinh thần thượng võ bất khuất.',
    image: 'assets/images/product-06.png',
    gallery: ['assets/images/product-06.png', 'assets/images/closeup-06a.png', 'assets/images/closeup-06b.png', 'assets/images/closeup-06c.png'],
    model: 'assets/models/06_giap_tru.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<path d="M30 30 Q40 15 50 30 L50 55 L30 55 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 55 L55 55" stroke="currentColor" stroke-width="1"/><circle cx="40" cy="40" r="5" fill="none" stroke="currentColor" stroke-width="0.8"/>',
    backSvg: '<path d="M40 25 Q60 5 80 25 L80 65 L40 65 Z" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M35 65 L85 65" stroke="#B8860B" stroke-width="1.5"/><circle cx="60" cy="42" r="8" fill="none" stroke="#B8860B" stroke-width="1"/><path d="M52 42 L68 42 M60 34 L60 50" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">GIÁP TRỤ</text>'
  },
  {
    id: 7,
    dynasty: 'Nhà Lý',
    era: '1009 - 1225',
    artifact: 'Rồng Thời Lý',
    price: 249000,
    status: 'in-stock',
    description: 'Lý Công Uẩn dời đô về Thăng Long, mở ra kỷ nguyên hoàng kim rực rỡ nhất. Phật giáo hưng thịnh, nghệ thuật gốm sứ, kiến trúc chùa tháp và Rồng thời Lý trở thành biểu tượng bất hủ.',
    artifactDesc: 'Hình tượng Rồng thanh mảnh, uốn lượn hình chữ S đặc trưng — biểu tượng vương quyền và nền văn minh Đại Việt thời Lý.',
    image: 'assets/images/product-07.png',
    gallery: ['assets/images/product-07.png', 'assets/images/closeup-07a.png', 'assets/images/closeup-07b.png', 'assets/images/closeup-07c.png'],
    model: 'assets/models/07_rong_ly.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng',
      weight: '18g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 500 bộ — Phiên bản đặc biệt'
    },
    silhouetteSvg: '<path d="M15 50 Q25 30 35 40 Q45 50 55 30 Q65 15 75 25" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="75" cy="25" r="4" fill="none" stroke="currentColor" stroke-width="1"/><path d="M15 50 Q10 60 20 65" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M15 70 Q30 40 45 55 Q60 70 75 40 Q90 15 105 30" fill="none" stroke="#B8860B" stroke-width="2" stroke-linecap="round"/><circle cx="105" cy="30" r="6" fill="none" stroke="#B8860B" stroke-width="1.5"/><circle cx="107" cy="28" r="1.5" fill="#B8860B"/><path d="M15 70 Q8 82 20 85" fill="none" stroke="#B8860B" stroke-width="1.5" stroke-linecap="round"/><path d="M12 72 Q5 78 15 80" fill="none" stroke="#B8860B" stroke-width="1" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">RỒNG THỜI LÝ</text>'
  },
  {
    id: 8,
    dynasty: 'Nhà Trần',
    era: '1226 - 1400',
    artifact: 'Hịch Tướng Sĩ',
    price: 199000,
    status: 'in-stock',
    description: 'Ba lần đại phá quân Nguyên Mông dưới sự lãnh đạo của Hưng Đạo Đại Vương Trần Quốc Tuấn. Hào khí Đông A vang dội, Hịch tướng sĩ trở thành áng văn bất hủ.',
    artifactDesc: 'Bài hịch hùng tráng của Trần Hưng Đạo, khích lệ tướng sĩ quyết tâm đánh giặc Nguyên Mông — biểu tượng lòng yêu nước và ý chí sắt đá.',
    image: 'assets/images/product-08.png',
    gallery: ['assets/images/product-08.png', 'assets/images/closeup-08a.png', 'assets/images/closeup-08b.png', 'assets/images/closeup-08c.png'],
    model: 'assets/models/08_hich_tuong_si.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<rect x="20" y="10" width="40" height="55" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="28" y1="22" x2="52" y2="22" stroke="currentColor" stroke-width="0.8"/><line x1="28" y1="30" x2="52" y2="30" stroke="currentColor" stroke-width="0.8"/><line x1="28" y1="38" x2="52" y2="38" stroke="currentColor" stroke-width="0.8"/><line x1="28" y1="46" x2="45" y2="46" stroke="currentColor" stroke-width="0.8"/>',
    backSvg: '<rect x="25" y="8" width="70" height="72" rx="3" fill="none" stroke="#B8860B" stroke-width="1.5"/><line x1="35" y1="22" x2="85" y2="22" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="32" x2="85" y2="32" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="42" x2="85" y2="42" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="52" x2="80" y2="52" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="62" x2="70" y2="62" stroke="#B8860B" stroke-width="0.8"/><rect x="30" y="12" width="15" height="6" rx="1" fill="#A62C21" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">HỊCH TƯỚNG SĨ</text>'
  },
  {
    id: 9,
    dynasty: 'Nhà Hồ',
    era: '1400 - 1407',
    artifact: 'Thành Nhà Hồ',
    price: 199000,
    status: 'pre-order',
    description: 'Hồ Quý Ly tiến hành cải cách táo bạo: phát hành tiền giấy, cải tổ giáo dục, xây thành Tây Đô bằng đá đồ sộ. Dù ngắn ngủi, nhà Hồ để lại di sản kiến trúc độc nhất vô nhị.',
    artifactDesc: 'Tòa thành đá kỳ vĩ tại Thanh Hóa, xây bằng những khối đá hàng chục tấn xếp chồng không cần vữa — Di sản Thế giới UNESCO.',
    image: 'assets/images/product-09.png',
    gallery: ['assets/images/product-09.png', 'assets/images/closeup-09a.png', 'assets/images/closeup-09b.png', 'assets/images/closeup-09c.png'],
    model: 'assets/models/09_thanh_nha_ho.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<rect x="15" y="30" width="50" height="35" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 30 L40 15 L65 30" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="33" y="45" width="14" height="20" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<rect x="15" y="35" width="90" height="40" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M15 35 L60 10 L105 35" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="48" y="50" width="24" height="25" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M48 62 L72 62" stroke="#B8860B" stroke-width="0.8"/><line x1="25" y1="45" x2="25" y2="75" stroke="#B8860B" stroke-width="2"/><line x1="95" y1="45" x2="95" y2="75" stroke="#B8860B" stroke-width="2"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">THÀNH NHÀ HỒ</text>'
  },
  {
    id: 10,
    dynasty: 'Nhà Hậu Lê',
    era: '1428 - 1789',
    artifact: 'Gươm Thuận Thiên',
    price: 299000,
    status: 'in-stock',
    description: 'Lê Lợi lãnh đạo khởi nghĩa Lam Sơn 10 năm gian khổ, giải phóng đất nước khỏi ách đô hộ nhà Minh. Nguyễn Trãi soạn Bình Ngô Đại Cáo — bản Tuyên ngôn Độc lập thứ hai.',
    artifactDesc: 'Thanh gươm huyền thoại mà Long Quân cho Lê Lợi mượn để đánh đuổi giặc Minh, sau đó trả lại tại Hồ Hoàn Kiếm.',
    image: 'assets/images/product-10.png',
    gallery: ['assets/images/product-10.png', 'assets/images/closeup-10a.png', 'assets/images/closeup-10b.png', 'assets/images/closeup-10c.png'],
    model: 'assets/models/10_guom_thuan_thien.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng 24K',
      weight: '20g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 300 bộ — Phiên bản Collector'
    },
    silhouetteSvg: '<path d="M40 10 L44 55 L40 65 L36 55 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30 55 L50 55" stroke="currentColor" stroke-width="2"/><path d="M37 55 L37 70 M43 55 L43 70" stroke="currentColor" stroke-width="1"/><circle cx="40" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M60 5 L66 62 L60 78 L54 62 Z" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M42 62 L78 62" stroke="#B8860B" stroke-width="2.5"/><path d="M55 62 L55 82 M65 62 L65 82" stroke="#B8860B" stroke-width="1.5"/><circle cx="60" cy="5" r="5" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M57 5 L63 5 M60 2 L60 8" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">GƯƠM THUẬN THIÊN</text>'
  },
  {
    id: 11,
    dynasty: 'Nhà Mạc',
    era: '1527 - 1677',
    artifact: 'Gốm Sứ Thời Mạc',
    price: 199000,
    status: 'sold-out',
    description: 'Mạc Đăng Dung lập triều Mạc, mở ra thời kỳ Nam - Bắc triều phân tranh. Dù gây tranh cãi, nhà Mạc để lại dấu ấn kiến trúc, gốm sứ và thương mại phồn thịnh.',
    artifactDesc: 'Dòng gốm sứ cao cấp với men lam đặc trưng, hoa văn tinh tế phản ánh thời kỳ thương mại quốc tế phát triển mạnh mẽ.',
    image: 'assets/images/product-11.png',
    gallery: ['assets/images/product-11.png', 'assets/images/closeup-11a.png', 'assets/images/closeup-11b.png', 'assets/images/closeup-11c.png'],
    model: 'assets/models/01_trong_dong.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ — ĐÃ HẾT HÀNG'
    },
    silhouetteSvg: '<path d="M30 55 Q30 25 40 20 Q50 25 50 55" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="40" cy="55" rx="12" ry="4" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="40" cy="20" rx="5" ry="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M40 72 Q40 25 60 18 Q80 25 80 72" fill="none" stroke="#B8860B" stroke-width="1.8"/><ellipse cx="60" cy="72" rx="22" ry="6" fill="none" stroke="#B8860B" stroke-width="1.5"/><ellipse cx="60" cy="18" rx="8" ry="3" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M48 40 Q60 35 72 40" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><path d="M46 52 Q60 47 74 52" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">GỐM SỨ</text>'
  },
  {
    id: 12,
    dynasty: 'Nhà Tây Sơn',
    era: '1778 - 1802',
    artifact: 'Trống Trận Tây Sơn',
    price: 199000,
    status: 'in-stock',
    description: 'Anh hùng Quang Trung - Nguyễn Huệ thống nhất đất nước, đại phá 29 vạn quân Thanh trong chiến dịch thần tốc mùa Xuân Kỷ Dậu 1789 — một trong những chiến thắng vĩ đại nhất lịch sử.',
    artifactDesc: 'Bộ trống trận hùng hậu của nghĩa quân Tây Sơn, vang dội trong chiến dịch giải phóng Thăng Long lịch sử.',
    image: 'assets/images/product-12.png',
    gallery: ['assets/images/product-12.png', 'assets/images/closeup-12a.png', 'assets/images/closeup-12b.png', 'assets/images/closeup-12c.png'],
    model: 'assets/models/01_trong_dong.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<ellipse cx="40" cy="30" rx="20" ry="10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M20 30 L20 55 Q40 65 60 55 L60 30" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M60 40 L70 35 M60 45 L68 42" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<ellipse cx="60" cy="28" rx="30" ry="14" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M30 28 L30 65 Q60 78 90 65 L90 28" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M90 42 L105 36 M90 50 L102 46" stroke="#B8860B" stroke-width="1.5"/><path d="M42 28 L42 32 M52 28 L52 32 M68 28 L68 32 M78 28 L78 32" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">TRỐNG TRẬN</text>'
  },
  {
    id: 13,
    dynasty: 'Nhà Nguyễn',
    era: '1802 - 1945',
    artifact: 'Cửu Đỉnh Nhà Nguyễn',
    price: 249000,
    status: 'in-stock',
    description: 'Triều đại phong kiến cuối cùng, Gia Long thống nhất giang sơn và đặt kinh đô tại Huế. Di sản kiến trúc cung đình Huế, Cửu đỉnh, Đại Nội được UNESCO công nhận Di sản Thế giới.',
    artifactDesc: 'Chín chiếc đỉnh đồng đồ sộ đặt trước Thế Miếu, chạm khắc hình ảnh non sông đất nước — biểu tượng quyền lực và sự trường tồn.',
    image: 'assets/images/product-13.png',
    gallery: ['assets/images/product-13.png', 'assets/images/closeup-13a.png', 'assets/images/closeup-13b.png', 'assets/images/closeup-13c.png'],
    model: 'assets/models/03_an_vang.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng',
      weight: '18g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 500 bộ — Phiên bản đặc biệt'
    },
    silhouetteSvg: '<path d="M25 55 L30 25 Q40 20 50 25 L55 55" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="40" cy="55" rx="16" ry="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M30 25 L25 18 M50 25 L55 18" stroke="currentColor" stroke-width="1.5"/>',
    backSvg: '<path d="M35 70 L42 25 Q60 18 78 25 L85 70" fill="none" stroke="#B8860B" stroke-width="1.8"/><ellipse cx="60" cy="70" rx="26" ry="7" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M42 25 L34 14 M78 25 L86 14" stroke="#B8860B" stroke-width="2"/><path d="M50 40 Q60 36 70 40" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">CỬU ĐỈNH</text>'
  },
  {
    id: 14,
    dynasty: 'Bắc Thuộc & Khởi Nghĩa',
    era: '111 TCN - 938',
    artifact: 'Voi Chiến Hai Bà Trưng',
    price: 199000,
    status: 'in-stock',
    description: 'Hơn 1000 năm chống đô hộ phương Bắc, từ Hai Bà Trưng cưỡi voi ra trận, Bà Triệu hiên ngang, đến Lý Bí lập nước Vạn Xuân — ngọn lửa độc lập không bao giờ tắt.',
    artifactDesc: 'Hình tượng Hai Bà Trưng cưỡi voi xung trận đánh đuổi quân Đông Hán — biểu tượng bất khuất của phụ nữ và dân tộc Việt Nam.',
    image: 'assets/images/product-14.png',
    gallery: ['assets/images/product-14.png', 'assets/images/closeup-14a.png', 'assets/images/closeup-14b.png', 'assets/images/closeup-14c.png'],
    model: 'assets/models/06_giap_tru.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    silhouetteSvg: '<path d="M25 55 Q30 35 40 30 Q50 35 55 55" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M35 30 L30 18 Q40 10 50 18 L45 30" fill="none" stroke="currentColor" stroke-width="1"/><path d="M40 25 L40 15" stroke="currentColor" stroke-width="1.5"/><circle cx="40" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="0.8"/>',
    backSvg: '<path d="M30 70 Q38 35 60 28 Q82 35 90 70" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M50 28 L44 12 Q60 2 76 12 L70 28" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M60 22 L60 8" stroke="#B8860B" stroke-width="1.8"/><circle cx="60" cy="6" r="4" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M35 65 L30 75 M85 65 L90 75" stroke="#B8860B" stroke-width="1.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">VOI CHIẾN</text>'
  },
  {
    id: 101,
    dynasty: 'Khai Ấn Sử Việt',
    era: 'Bộ Sưu Tập 14 Triều Đại',
    artifact: 'Gói Trải Nghiệm (1 Blind Box)',
    price: 199000,
    status: 'in-stock',
    description: 'Hộp mù (Blind Box) chứa ngẫu nhiên 1 trong 14 thẻ bài cổ vật. Cơ hội khám phá lịch sử qua từng hộp và sưu tầm trọn bộ 14 triều đại.',
    artifactDesc: 'Bao gồm 1 hộp Blind Box bí ẩn.',
    image: 'assets/images/product-01.png',
    gallery: ['assets/images/product-01.png'],
    model: null,
    details: {
      dimensions: '100 × 75 × 20mm',
      material: 'Hộp giấy cao cấp, ép nhũ kim',
      weight: '50g',
      nfc: 'Tích hợp chip NFC',
      edition: 'Không giới hạn'
    },
    silhouetteSvg: '<rect x="25" y="30" width="30" height="30" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 40 L55 40 M40 30 L40 60" stroke="currentColor" stroke-width="1.5"/><path d="M40 30 C30 20 20 30 40 30 C60 30 50 20 40 30" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    backSvg: '<rect x="35" y="40" width="50" height="40" rx="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M35 50 L85 50 M60 40 L60 80" stroke="#B8860B" stroke-width="1.5"/><path d="M60 40 C40 25 30 40 60 40 C90 40 80 25 60 40" fill="none" stroke="#B8860B" stroke-width="1.5"/>'
  },
  {
    id: 102,
    dynasty: 'Khai Ấn Sử Việt',
    era: 'Bộ Sưu Tập 14 Triều Đại',
    artifact: 'Gói Sưu Tầm (3 Blind Box)',
    price: 549000,
    status: 'in-stock',
    description: 'Combo 3 hộp mù (Blind Box) giúp bạn nhanh chóng hoàn thành bộ sưu tập. Tỷ lệ xuất hiện phiên bản thẻ đặc biệt cao hơn.',
    artifactDesc: 'Bao gồm 3 hộp Blind Box bí ẩn.',
    image: 'assets/images/product-01.png',
    gallery: ['assets/images/product-01.png'],
    model: null,
    details: {
      dimensions: '100 × 225 × 20mm',
      material: 'Hộp giấy cao cấp, ép nhũ kim',
      weight: '150g',
      nfc: 'Tích hợp chip NFC',
      edition: 'Không giới hạn'
    },
    silhouetteSvg: '<rect x="25" y="30" width="30" height="30" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 40 L55 40 M40 30 L40 60" stroke="currentColor" stroke-width="1.5"/><path d="M40 30 C30 20 20 30 40 30 C60 30 50 20 40 30" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    backSvg: '<rect x="35" y="40" width="50" height="40" rx="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M35 50 L85 50 M60 40 L60 80" stroke="#B8860B" stroke-width="1.5"/><path d="M60 40 C40 25 30 40 60 40 C90 40 80 25 60 40" fill="none" stroke="#B8860B" stroke-width="1.5"/>'
  },
  {
    id: 103,
    dynasty: 'Khai Ấn Sử Việt',
    era: 'Bộ Sưu Tập 14 Triều Đại',
    artifact: 'Gói Hoàng Gia (6 Blind Box)',
    price: 990000,
    status: 'in-stock',
    description: 'Combo 6 hộp mù (Blind Box) cao cấp nhất. Chắc chắn nhận được ít nhất 1 phiên bản thẻ đặc biệt có hiệu ứng AR độc quyền.',
    artifactDesc: 'Bao gồm 6 hộp Blind Box bí ẩn.',
    image: 'assets/images/product-01.png',
    gallery: ['assets/images/product-01.png'],
    model: null,
    details: {
      dimensions: '200 × 225 × 20mm',
      material: 'Hộp cứng cao cấp, in nhũ vàng hoàng gia',
      weight: '350g',
      nfc: 'Tích hợp chip NFC',
      edition: 'Không giới hạn'
    },
    silhouetteSvg: '<rect x="25" y="30" width="30" height="30" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 40 L55 40 M40 30 L40 60" stroke="currentColor" stroke-width="1.5"/><path d="M40 30 C30 20 20 30 40 30 C60 30 50 20 40 30" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    backSvg: '<rect x="35" y="40" width="50" height="40" rx="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M35 50 L85 50 M60 40 L60 80" stroke="#B8860B" stroke-width="1.5"/><path d="M60 40 C40 25 30 40 60 40 C90 40 80 25 60 40" fill="none" stroke="#B8860B" stroke-width="1.5"/>'
  }
];

/* ── Helper Functions ── */

function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function getRelatedProducts(currentId, count = 3) {
  return PRODUCTS
    .filter(p => p.id >= 101 && p.id !== parseInt(currentId))
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

function getStatusLabel(status) {
  switch (status) {
    case 'in-stock': return 'Còn hàng';
    case 'sold-out': return 'Hết hàng';
    case 'pre-order': return 'Đặt trước';
    default: return status;
  }
}

function getStatusClass(status) {
  switch (status) {
    case 'in-stock': return 'badge--in-stock';
    case 'sold-out': return 'badge--sold-out';
    case 'pre-order': return 'badge--pre-order';
    default: return '';
  }
}
