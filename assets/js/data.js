/* ============================================================
   KHAI ẤN SỬ VIỆT — Product & Dynasty Data
   Shared data layer used across all pages

   Schema (id 1-14: Cổ vật triều đại):
     id, dynasty, era, artifact, description, artifactDesc,
     image, gallery[], model, usdz?, details{}, story[],
     silhouetteSvg, backSvg

   Schema (id 101+: Blind Box sản phẩm):
     id, dynasty, era, artifact, price, status, description,
     artifactDesc, image, gallery[], model, details{},
     silhouetteSvg, backSvg
   ============================================================ */

/* ── Shared Constants ── */
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyzMrIuKg5TEjod8WYQ9FqOC48dL6xkMhkslC59h6LmtqARGDAp4DLFHKIRfSTAwcd5/exec';

const PRODUCTS = [
  /* ────────────────────────────────────────────────────────────
     1 — VĂN LANG (~2879 – 258 TCN)
     Trống Đồng Đông Sơn
     ──────────────────────────────────────────────────────────── */
  {
    id: 1,
    dynasty: 'Văn Lang',
    era: '~2879 – 258 TCN',
    artifact: 'Trống Đồng Đông Sơn',
    description: 'Thời kỳ dựng nước đầu tiên của dân tộc Việt Nam, gắn liền với huyền thoại Vua Hùng, Lạc Long Quân và Âu Cơ. Nền văn minh rực rỡ với Trống đồng Đông Sơn — biểu tượng văn hóa trường tồn.',
    artifactDesc: 'Hiện vật bằng đồng tiêu biểu nhất của nền văn minh Đông Sơn, với hoa văn tinh xảo mô tả đời sống, lễ hội và tín ngưỡng thờ Mặt Trời.',
    image: 'assets/images/artifacts/Trống đồng Đông Sơn.png',
    gallery: ['assets/images/artifacts/Trống đồng Đông Sơn.png', 'assets/images/artifacts/Trống đồng Đông Sơn.png', 'assets/images/artifacts/Trống đồng Đông Sơn.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/trongdong.glb',
    usdz: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/trongdong.usdz',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Trống đồng Đông Sơn không chỉ là một nhạc khí quan trọng trong các dịp lễ hội mà còn là biểu tượng quyền lực tối cao của các thủ lĩnh Lạc Việt thời bấy giờ. Âm thanh vang dội của nó được tin là có thể thấu đến thần linh, cầu mong mưa thuận gió hòa và mùa màng bội thu.',
      'Sự tinh xảo trong kỹ thuật đúc đồng, cùng những họa tiết hình học, hình người, hình chim và mặt trời nhiều tia ở chính giữa mặt trống đã chứng minh sự phát triển rực rỡ của nền văn minh lúa nước sông Hồng. Trống đồng là bản sắc, là niềm tự hào và là tinh hoa của người Việt cổ.'
    ],
    silhouetteSvg: '<circle cx="40" cy="35" r="25" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="40,15 47,30 60,30 50,40 54,55 40,47 26,55 30,40 20,30 33,30" fill="none" stroke="currentColor" stroke-width="0.8"/><rect x="25" y="55" width="30" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<circle cx="60" cy="45" r="35" fill="none" stroke="#B8860B" stroke-width="1.5"/><polygon points="60,15 67,32 85,32 71,43 76,60 60,50 44,60 49,43 35,32 53,32" fill="none" stroke="#B8860B" stroke-width="1.2"/><circle cx="60" cy="45" r="12" fill="none" stroke="#B8860B" stroke-width="0.8"/><circle cx="60" cy="45" r="4" fill="#B8860B" opacity="0.6"/><rect x="35" y="78" width="50" height="10" rx="3" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">TRỐNG ĐỒNG</text>'
  },

  /* ────────────────────────────────────────────────────────────
     2 — ÂU LẠC (257 – 179 TCN)
     Nỏ Thần An Dương Vương
     ──────────────────────────────────────────────────────────── */
  {
    id: 2,
    dynasty: 'Âu Lạc',
    era: '257 – 179 TCN',
    artifact: 'Nỏ Thần An Dương Vương',
    description: 'An Dương Vương thống nhất Âu Việt và Lạc Việt, xây thành Cổ Loa — tòa thành ốc xoắn huyền thoại. Câu chuyện nỏ thần, Mỵ Châu - Trọng Thủy là bài học muôn đời về cảnh giác.',
    artifactDesc: 'Vũ khí huyền thoại được thần Kim Quy trao cho An Dương Vương, có khả năng bắn hàng ngàn mũi tên cùng lúc, bảo vệ thành Cổ Loa.',
    image: 'assets/images/artifacts/Nỏ thần An Dương Vương.png',
    gallery: ['assets/images/artifacts/Nỏ thần An Dương Vương.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/n%E1%BB%8F%20th%E1%BA%A7n.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Theo truyền thuyết, thần Kim Quy hiện lên trao cho An Dương Vương một chiếc móng rùa thần để làm lẫy nỏ. Nỏ thần liên châu có khả năng bắn một phát ra hàng ngàn mũi tên đồng, khiến quân giặc bạt vía kinh hồn. Nhờ nỏ thần và thành Cổ Loa — tòa thành xoắn ốc 9 vòng kiên cố, Âu Lạc đã nhiều lần đánh bại quân xâm lược Triệu Đà.',
      'Bi kịch bắt đầu khi Trọng Thủy — con trai Triệu Đà — sang làm rể, đánh tráo lẫy nỏ thần. Mất đi vũ khí bảo vệ, thành Cổ Loa thất thủ. Câu chuyện Mỵ Châu rắc lông ngỗng dọc đường chạy trốn, rồi bị cha chém đầu bên bờ biển, máu hòa vào nước biến thành ngọc trai — mãi là bài học đau thương về cảnh giác quốc phòng và sự ngây thơ trước mưu mô của giặc.'
    ],
    silhouetteSvg: '<path d="M20 60 L40 15 L60 60" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 50 L55 50" stroke="currentColor" stroke-width="1"/><circle cx="40" cy="35" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M40 20 L40 10 M35 14 L45 14" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M30 80 L60 20 L90 80" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M38 65 L82 65" stroke="#B8860B" stroke-width="1"/><path d="M60 25 L60 10" stroke="#B8860B" stroke-width="1.2"/><polygon points="55,12 60,2 65,12" fill="#B8860B" opacity="0.6"/><circle cx="60" cy="45" r="8" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">NỎ THẦN</text>'
  },

  /* ────────────────────────────────────────────────────────────
     3 — NHÀ NGÔ (939 – 965)
     Sa Hình Cọc Gỗ Bạch Đằng
     ──────────────────────────────────────────────────────────── */
  {
    id: 3,
    dynasty: 'Nhà Ngô',
    era: '939 – 965',
    artifact: 'Sa Hình Cọc Gỗ Bạch Đằng',
    description: 'Ngô Quyền đại phá quân Nam Hán trên sông Bạch Đằng năm 938, chấm dứt hơn 1000 năm Bắc thuộc. Chiến thắng lẫy lừng đặt nền móng cho kỷ nguyên độc lập dân tộc.',
    artifactDesc: 'Hệ thống cọc gỗ được đóng dưới lòng sông Bạch Đằng, lợi dụng thủy triều để phá tan đội thuyền chiến hùng mạnh của quân Nam Hán.',
    image: 'assets/images/artifacts/Sa hình Cọc gỗ Bạch Đằng.png',
    gallery: ['assets/images/artifacts/Sa hình Cọc gỗ Bạch Đằng.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/tr%E1%BA%ADn%20b%E1%BA%A1ch%20%C4%91%E1%BA%B1ng.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Mùa đông năm 938, Ngô Quyền — vị tướng tài ba người Đường Lâm — đã bày ra trận địa cọc gỗ lịch sử trên sông Bạch Đằng. Ông cho quân đóng hàng ngàn cọc gỗ lim bịt sắt nhọn xuống lòng sông, đầu cọc nằm ngầm dưới mặt nước khi triều lên. Khi quân Nam Hán do Hoằng Tháo chỉ huy kéo thuyền chiến tiến vào, Ngô Quyền giả thua dụ địch ngược dòng. Đợi thủy triều rút, toàn bộ đội thuyền giặc mắc cạn trên bãi cọc, bị đâm thủng và nghiêng đổ.',
      'Chiến thắng Bạch Đằng năm 938 là mốc son chói lọi nhất trong lịch sử dân tộc, chấm dứt hơn 1000 năm Bắc thuộc (từ 179 TCN đến 938), mở ra kỷ nguyên độc lập tự chủ lâu dài. Những cọc gỗ Bạch Đằng đã được khai quật tại vùng cửa sông thuộc Quảng Ninh, chứng minh sự thật lịch sử huy hoàng này. Sông Bạch Đằng sau đó còn chứng kiến thêm hai trận đại thắng nữa vào năm 981 (Lê Hoàn phá Tống) và 1288 (Trần Hưng Đạo phá Nguyên).'
    ],
    silhouetteSvg: '<line x1="25" y1="15" x2="25" y2="65" stroke="currentColor" stroke-width="2"/><line x1="40" y1="20" x2="40" y2="60" stroke="currentColor" stroke-width="2"/><line x1="55" y1="10" x2="55" y2="65" stroke="currentColor" stroke-width="2"/><path d="M15 65 Q40 55 65 65" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<line x1="35" y1="10" x2="35" y2="70" stroke="#B8860B" stroke-width="2.5"/><line x1="55" y1="15" x2="55" y2="65" stroke="#B8860B" stroke-width="2.5"/><line x1="75" y1="8" x2="75" y2="72" stroke="#B8860B" stroke-width="2.5"/><path d="M20 70 Q55 55 100 72" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M20 78 Q55 68 100 80" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">CỌC BẠCH ĐẰNG</text>'
  },

  /* ────────────────────────────────────────────────────────────
     4 — NHÀ ĐINH (968 – 980)
     Tiền Thái Bình Hưng Bảo
     ──────────────────────────────────────────────────────────── */
  {
    id: 4,
    dynasty: 'Nhà Đinh',
    era: '968 – 980',
    artifact: 'Tiền Thái Bình Hưng Bảo',
    description: 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước và lên ngôi Hoàng đế, đặt quốc hiệu Đại Cồ Việt — quốc hiệu chính thức đầu tiên của nước ta.',
    artifactDesc: 'Đồng tiền đầu tiên do nhà nước Đại Cồ Việt tự đúc, đánh dấu chủ quyền tiền tệ và nền độc lập vững chắc của dân tộc.',
    image: 'assets/images/artifacts/Tiền Thái Bình Hưng Bảo.png',
    gallery: ['assets/images/artifacts/Tiền Thái Bình Hưng Bảo.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/%C4%91%E1%BB%93ng%20xu.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng',
      weight: '18g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 500 bộ — Phiên bản đặc biệt'
    },
    story: [
      'Sau khi dẹp loạn 12 sứ quân, thống nhất giang sơn năm 968, Đinh Tiên Hoàng không chỉ đặt quốc hiệu Đại Cồ Việt mà còn cho đúc đồng tiền riêng mang tên "Thái Bình Hưng Bảo" — đồng tiền đầu tiên do một nhà nước Việt Nam độc lập phát hành. Mặt trước khắc bốn chữ Hán "Thái Bình Hưng Bảo", hình tròn lỗ vuông theo triết lý "trời tròn đất vuông", thể hiện ý chí tự chủ tuyệt đối.',
      'Việc đúc tiền riêng có ý nghĩa vô cùng to lớn: nó khẳng định Đại Cồ Việt là một quốc gia có chủ quyền hoàn toàn, không còn phụ thuộc vào tiền tệ phương Bắc. Đồng Thái Bình Hưng Bảo nhỏ bé nhưng mang sức nặng của cả một nền độc lập, là bằng chứng vật chất cho thấy ông cha ta đã có ý thức xây dựng một nền kinh tế tự chủ ngay từ buổi đầu lập quốc.'
    ],
    silhouetteSvg: '<circle cx="40" cy="38" r="22" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="34" y="32" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="40" cy="38" r="16" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.5"/>',
    backSvg: '<circle cx="60" cy="45" r="32" fill="none" stroke="#B8860B" stroke-width="1.8"/><rect x="50" y="35" width="20" height="20" fill="none" stroke="#B8860B" stroke-width="1.2"/><circle cx="60" cy="45" r="25" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><circle cx="60" cy="45" r="38" fill="none" stroke="#B8860B" stroke-width="0.5" opacity="0.3"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">THÁI BÌNH HƯNG BẢO</text>'
  },

  /* ────────────────────────────────────────────────────────────
     5 — TIỀN LÊ (980 – 1009)
     Gạch Đại Việt Quốc Quân Thành Chuyên
     ──────────────────────────────────────────────────────────── */
  {
    id: 5,
    dynasty: 'Tiền Lê',
    era: '980 – 1009',
    artifact: 'Gạch Đại Việt Quốc Quân Thành Chuyên',
    description: 'Lê Đại Hành kế thừa sự nghiệp nhà Đinh, anh dũng đánh bại quân Tống xâm lược, bảo vệ nền độc lập non trẻ và mở mang bờ cõi phía Nam.',
    artifactDesc: 'Viên gạch khắc chữ "Đại Việt quốc quân thành chuyên" — bằng chứng vật chất về việc xây dựng kinh thành của nhà nước Đại Cồ Việt thời Tiền Lê.',
    image: 'assets/images/artifacts/Gạch Đại Việt quốc quân thành chuyên.png',
    gallery: ['assets/images/artifacts/Gạch Đại Việt quốc quân thành chuyên.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/cuc%20da.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Lê Đại Hành sau khi đánh bại quân Tống xâm lược năm 981, đã tiến hành xây dựng và củng cố kinh đô Hoa Lư. Trong quá trình khai quật khảo cổ, các nhà nghiên cứu đã phát hiện những viên gạch cổ khắc dòng chữ "Đại Việt quốc quân thành chuyên" — nghĩa là "gạch xây thành quân đội nước Đại Việt". Đây là hiện vật quý giá chứng minh quy mô xây dựng kinh thành dưới thời Tiền Lê.',
      'Những viên gạch này không chỉ là vật liệu xây dựng thông thường mà còn mang ý nghĩa chính trị sâu sắc — chúng khẳng định danh xưng "Đại Việt" và sự tồn tại của một quân đội quốc gia có tổ chức. Kỹ thuật nung gạch đạt trình độ cao, viên gạch vuông vức, chữ khắc sắc nét, thể hiện trình độ thủ công nghiệp phát triển của một quốc gia non trẻ nhưng đầy khát vọng tự cường.'
    ],
    silhouetteSvg: '<rect x="18" y="25" width="44" height="28" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="25" y1="34" x2="55" y2="34" stroke="currentColor" stroke-width="0.8"/><line x1="25" y1="40" x2="50" y2="40" stroke="currentColor" stroke-width="0.8"/><line x1="25" y1="46" x2="45" y2="46" stroke="currentColor" stroke-width="0.8"/>',
    backSvg: '<rect x="25" y="22" width="70" height="45" rx="3" fill="none" stroke="#B8860B" stroke-width="1.8"/><line x1="35" y1="34" x2="85" y2="34" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="42" x2="80" y2="42" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="50" x2="70" y2="50" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="58" x2="60" y2="58" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">GẠCH THÀNH CHUYÊN</text>'
  },

  /* ────────────────────────────────────────────────────────────
     6 — NHÀ LÝ (1009 – 1225)
     Đầu Rồng Thời Lý
     ──────────────────────────────────────────────────────────── */
  {
    id: 6,
    dynasty: 'Nhà Lý',
    era: '1009 – 1225',
    artifact: 'Đầu Rồng Thời Lý',
    description: 'Lý Công Uẩn dời đô về Thăng Long, mở ra kỷ nguyên hoàng kim rực rỡ nhất. Phật giáo hưng thịnh, nghệ thuật gốm sứ, kiến trúc chùa tháp và Rồng thời Lý trở thành biểu tượng bất hủ.',
    artifactDesc: 'Hình tượng đầu Rồng thanh mảnh, uốn lượn hình chữ S đặc trưng — biểu tượng vương quyền và nền văn minh Đại Việt thời Lý.',
    image: 'assets/images/artifacts/Đầu rồng thời Lý.png',
    gallery: ['assets/images/artifacts/Đầu rồng thời Lý.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/rongg.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng',
      weight: '18g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 500 bộ — Phiên bản đặc biệt'
    },
    story: [
      'Mùa thu năm 1010, Lý Công Uẩn ban Chiếu dời đô từ Hoa Lư ra Đại La. Truyền thuyết kể rằng khi thuyền rồng cập bến, một con rồng vàng hiện lên bay lượn trên trời — từ đó kinh đô mới được đặt tên Thăng Long, nghĩa là "Rồng Bay". Suốt hơn 200 năm, nhà Lý đã xây dựng nên một vương triều thịnh trị với Phật giáo là quốc giáo, nền giáo dục phát triển với Văn Miếu — Quốc Tử Giám (1070) và khoa thi đầu tiên (1075).',
      'Rồng thời Lý có hình dáng đặc trưng không thể nhầm lẫn: thân mảnh, uốn lượn mềm mại theo hình chữ S, không có sừng, không có chân — khác hẳn rồng Trung Hoa hung dữ. Nó tượng trưng cho sự thanh tao, nhu hòa nhưng đầy uy quyền, phản ánh tinh thần Phật giáo từ bi và bản sắc nghệ thuật thuần Việt. Hình tượng rồng Lý xuất hiện trên gốm sứ, kiến trúc chùa tháp, và đã được công nhận là Biểu tượng Thăng Long — Hà Nội ngày nay.'
    ],
    silhouetteSvg: '<path d="M15 50 Q25 30 35 40 Q45 50 55 30 Q65 15 75 25" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="75" cy="25" r="4" fill="none" stroke="currentColor" stroke-width="1"/><path d="M15 50 Q10 60 20 65" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M15 70 Q30 40 45 55 Q60 70 75 40 Q90 15 105 30" fill="none" stroke="#B8860B" stroke-width="2" stroke-linecap="round"/><circle cx="105" cy="30" r="6" fill="none" stroke="#B8860B" stroke-width="1.5"/><circle cx="107" cy="28" r="1.5" fill="#B8860B"/><path d="M15 70 Q8 82 20 85" fill="none" stroke="#B8860B" stroke-width="1.5" stroke-linecap="round"/><path d="M12 72 Q5 78 15 80" fill="none" stroke="#B8860B" stroke-width="1" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">ĐẦU RỒNG THỜI LÝ</text>'
  },

  /* ────────────────────────────────────────────────────────────
     7 — NHÀ TRẦN (1225 – 1400)
     Ấn Tín Nhà Trần
     ──────────────────────────────────────────────────────────── */
  {
    id: 7,
    dynasty: 'Nhà Trần',
    era: '1225 – 1400',
    artifact: 'Ấn Tín Nhà Trần',
    description: 'Ba lần đại phá quân Nguyên Mông dưới sự lãnh đạo của Hưng Đạo Đại Vương Trần Quốc Tuấn. Hào khí Đông A vang dội, Hịch tướng sĩ trở thành áng văn bất hủ.',
    artifactDesc: 'Ấn triện chính thức của triều Trần, biểu tượng quyền lực nhà nước và hệ thống hành chính chặt chẽ trong thời kỳ ba lần đại phá quân Nguyên Mông.',
    image: 'assets/images/artifacts/Ấn tín nhà Trần.png',
    gallery: ['assets/images/artifacts/Ấn tín nhà Trần.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/%E1%BA%A5n%20th%E1%BB%9Di%20Tr%E1%BA%A7n.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Nhà Trần không chỉ nổi tiếng với những chiến thắng lẫy lừng trước quân Nguyên Mông mà còn xây dựng được một hệ thống hành chính quy củ với các ấn tín triều đình. Ấn tín nhà Trần được đúc bằng đồng, khắc chữ triện vuông vức, là biểu tượng quyền lực tối cao dùng để đóng dấu lên các chiếu chỉ, sắc phong và văn bản ngoại giao.',
      'Dưới sự lãnh đạo của các vua Trần — đặc biệt là Trần Nhân Tông và Quốc công Tiết chế Trần Hưng Đạo — ấn tín triều đình đã đóng dấu lên những quyết sách lịch sử: từ Hội nghị Diên Hồng với tiếng hô "Đánh!" vang dội, đến Hịch tướng sĩ khích lệ ba quân thích chữ "Sát Thát" lên tay. Ấn tín nhà Trần là hiện vật gắn liền với hào khí Đông A — thời đại mà cả dân tộc đồng lòng đánh bại đế chế hùng mạnh nhất thế giới.'
    ],
    silhouetteSvg: '<rect x="20" y="20" width="40" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="28" y="28" width="24" height="24" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/><text x="40" y="46" text-anchor="middle" font-family="serif" font-size="14" fill="currentColor" opacity="0.5">印</text>',
    backSvg: '<rect x="30" y="20" width="60" height="55" rx="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="38" y="28" width="44" height="39" rx="2" fill="none" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="54" text-anchor="middle" font-family="serif" font-size="22" fill="#B8860B" opacity="0.6">印</text><rect x="45" y="12" width="30" height="12" rx="6" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">ẤN TÍN NHÀ TRẦN</text>'
  },

  /* ────────────────────────────────────────────────────────────
     8 — NHÀ HỒ (1400 – 1407)
     Đá Thành Nhà Hồ
     ──────────────────────────────────────────────────────────── */
  {
    id: 8,
    dynasty: 'Nhà Hồ',
    era: '1400 – 1407',
    artifact: 'Đá Thành Nhà Hồ',
    description: 'Hồ Quý Ly tiến hành cải cách táo bạo: phát hành tiền giấy, cải tổ giáo dục, xây thành Tây Đô bằng đá đồ sộ. Dù ngắn ngủi, nhà Hồ để lại di sản kiến trúc độc nhất vô nhị.',
    artifactDesc: 'Khối đá kỳ vĩ từ thành Tây Đô tại Thanh Hóa, xây bằng những khối đá hàng chục tấn xếp chồng không cần vữa — Di sản Thế giới UNESCO.',
    image: 'assets/images/artifacts/Đá Thành Nhà Hồ.png',
    gallery: ['assets/images/artifacts/Đá Thành Nhà Hồ.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/thanh%20nha%20ho.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Năm 1400, Hồ Quý Ly truất ngôi vua Trần, lập ra nhà Hồ. Ông là một nhà cải cách táo bạo với những chính sách vượt thời đại: phát hành "Thông bảo hội sao" (tiền giấy đầu tiên của Việt Nam), hạn chế ruộng đất của quý tộc (Hạn điền), và cải cách giáo dục bằng cách đưa toán học vào thi cử. Để phòng thủ chống quân Minh, ông đã cho xây dựng kinh đô mới ở Thanh Hóa, gọi là Tây Đô.',
      'Thành nhà Hồ (Tây Đô) là một kiệt tác kiến trúc quân sự độc nhất vô nhị. Chỉ trong vòng 3 tháng, một khối lượng khổng lồ những tảng đá vôi (nhiều tảng nặng từ 10 đến 20 tấn) đã được đục đẽo vuông vức, xếp chồng lên nhau vừa khít mà không cần bất kỳ chất kết dính nào. Dù vương triều nhà Hồ chỉ tồn tại 7 năm (1400-1407), nhưng bức tường thành đá sừng sững ấy vẫn đứng vững qua hơn 6 thế kỷ, được UNESCO công nhận là Di sản Văn hóa Thế giới năm 2011.'
    ],
    silhouetteSvg: '<rect x="15" y="30" width="50" height="35" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 30 L40 15 L65 30" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="33" y="45" width="14" height="20" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<rect x="15" y="35" width="90" height="40" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M15 35 L60 10 L105 35" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="48" y="50" width="24" height="25" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M48 62 L72 62" stroke="#B8860B" stroke-width="0.8"/><line x1="25" y1="45" x2="25" y2="75" stroke="#B8860B" stroke-width="2"/><line x1="95" y1="45" x2="95" y2="75" stroke="#B8860B" stroke-width="2"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">ĐÁ THÀNH NHÀ HỒ</text>'
  },

  /* ────────────────────────────────────────────────────────────
     9 — LÊ SƠ (1428 – 1527)
     Rồng Đá Điện Kính Thiên
     ──────────────────────────────────────────────────────────── */
  {
    id: 9,
    dynasty: 'Lê Sơ',
    era: '1428 – 1527',
    artifact: 'Rồng Đá Điện Kính Thiên',
    description: 'Lê Lợi lãnh đạo khởi nghĩa Lam Sơn 10 năm gian khổ, giải phóng đất nước khỏi ách đô hộ nhà Minh. Nguyễn Trãi soạn Bình Ngô Đại Cáo — bản Tuyên ngôn Độc lập thứ hai.',
    artifactDesc: 'Đôi rồng đá chạm khắc tinh xảo tại thềm điện Kính Thiên — biểu tượng vương quyền và kiệt tác điêu khắc thời Lê Sơ.',
    image: 'assets/images/artifacts/Rồng đá điện kính thiên.png',
    gallery: ['assets/images/artifacts/Rồng đá điện kính thiên.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/rongda.glb',
    usdz: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/rongda-v2.usdz',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng 24K',
      weight: '20g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 300 bộ — Phiên bản Collector'
    },
    story: [
      'Sau 10 năm kháng chiến gian khổ chống quân Minh (1418-1428), Lê Lợi lên ngôi Hoàng đế, lập ra nhà Lê. Dưới thời Lê Thánh Tông — vị vua anh minh nhất của vương triều, điện Kính Thiên được xây dựng tại Hoàng thành Thăng Long như trung tâm quyền lực tối cao. Thềm rồng đá trước điện là kiệt tác điêu khắc: đôi rồng đá uốn lượn mạnh mẽ, vảy rồng chi tiết, đầu rồng ngẩng cao uy nghi.',
      'Rồng đá điện Kính Thiên khác biệt hoàn toàn với rồng thời Lý mảnh mai thanh tao: rồng thời Lê có thân hình mạnh mẽ, vạm vỡ, với năm móng vuốt sắc nhọn — biểu tượng của hoàng đế. Đây là một trong những hiện vật đá quý giá nhất còn sót lại tại khu di tích Hoàng thành Thăng Long, được UNESCO công nhận là Di sản Văn hóa Thế giới. Rồng đá chứng kiến một thời kỳ Đại Việt cường thịnh nhất với lãnh thổ mở rộng, luật pháp hoàn chỉnh (Bộ luật Hồng Đức) và nền giáo dục phát triển.'
    ],
    silhouetteSvg: '<path d="M15 55 Q25 35 35 45 Q45 55 55 35 Q60 25 65 28" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="65" cy="28" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M15 55 Q12 62 18 65" fill="none" stroke="currentColor" stroke-width="1"/><rect x="20" y="58" width="45" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/>',
    backSvg: '<path d="M20 68 Q35 40 50 52 Q65 65 80 38 Q88 22 95 28" fill="none" stroke="#B8860B" stroke-width="2" stroke-linecap="round"/><circle cx="95" cy="28" r="7" fill="none" stroke="#B8860B" stroke-width="1.5"/><circle cx="97" cy="26" r="2" fill="#B8860B"/><path d="M20 68 Q15 78 22 80" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="25" y="75" width="70" height="10" rx="2" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">RỒNG ĐÁ KÍNH THIÊN</text>'
  },

  /* ────────────────────────────────────────────────────────────
     10 — NHÀ MẠC (1527 – 1592)
     Lư Hương Gốm Men Nâu
     ──────────────────────────────────────────────────────────── */
  {
    id: 10,
    dynasty: 'Nhà Mạc',
    era: '1527 – 1592',
    artifact: 'Lư Hương Gốm Men Nâu',
    description: 'Mạc Đăng Dung lập triều Mạc, mở ra thời kỳ Nam - Bắc triều phân tranh. Dù gây tranh cãi, nhà Mạc để lại dấu ấn kiến trúc, gốm sứ và thương mại phồn thịnh.',
    artifactDesc: 'Lư hương gốm men nâu cao cấp với hoa văn tinh tế — hiện vật tiêu biểu phản ánh thời kỳ gốm sứ và thương mại quốc tế phát triển mạnh mẽ.',
    image: 'assets/images/artifacts/Lư hương gốm men nâu.png',
    gallery: ['assets/images/artifacts/Lư hương gốm men nâu.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/l%C6%B0%20h%C6%B0%C6%A1ng.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Năm 1527, Mạc Đăng Dung phế truất vua Lê để lập ra nhà Mạc, khởi đầu cho thời kỳ Nam - Bắc triều phân tranh. Mặc dù thường bị các sử gia phong kiến chỉ trích là "ngụy triều", nhưng thực tế nhà Mạc đã đem lại một giai đoạn ổn định kinh tế, văn hóa khá rực rỡ ở vùng Đồng bằng Bắc Bộ. Giao thương cảng biển được mở rộng, tạo điều kiện cho thủ công nghiệp, đặc biệt là nghệ thuật làm gốm phát triển mạnh mẽ.',
      'Gốm Chu Đậu (Hải Dương) đạt đến đỉnh cao vào thời Mạc. Lư hương gốm men nâu là hiện vật tiêu biểu với kỹ thuật tráng men tinh xảo, hoa văn chạm khắc tỉ mỉ mang đậm hồn quê Việt. Với nét vẽ phóng khoáng trên gốm — hình ảnh hoa cúc, chim chích chòe, tôm cá — gốm Chu Đậu không chỉ phục vụ trong nước mà còn vươn ra thị trường quốc tế theo con đường tơ lụa trên biển. Những hiện vật gốm thời Mạc hiện vẫn được lưu giữ tại các bảo tàng lớn trên thế giới.'
    ],
    silhouetteSvg: '<path d="M30 55 Q30 25 40 20 Q50 25 50 55" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="40" cy="55" rx="12" ry="4" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="40" cy="20" rx="5" ry="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M40 72 Q40 25 60 18 Q80 25 80 72" fill="none" stroke="#B8860B" stroke-width="1.8"/><ellipse cx="60" cy="72" rx="22" ry="6" fill="none" stroke="#B8860B" stroke-width="1.5"/><ellipse cx="60" cy="18" rx="8" ry="3" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M48 40 Q60 35 72 40" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><path d="M46 52 Q60 47 74 52" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">LƯ HƯƠNG GỐM</text>'
  },

  /* ────────────────────────────────────────────────────────────
     11 — LÊ TRUNG HƯNG – TRỊNH (1533 – 1789)
     Súng Thần Công
     ──────────────────────────────────────────────────────────── */
  {
    id: 11,
    dynasty: 'Lê Trung Hưng – Trịnh',
    era: '1533 – 1789',
    artifact: 'Súng Thần Công',
    description: 'Thời kỳ vua Lê - chúa Trịnh cai trị Đàng Ngoài. Quyền lực thực sự nằm trong tay các chúa Trịnh, trong khi vua Lê chỉ giữ vai trò tượng trưng. Công nghệ quân sự phát triển mạnh với súng thần công.',
    artifactDesc: 'Khẩu súng thần công bằng đồng — vũ khí hạng nặng tiêu biểu của thời kỳ Lê Trung Hưng, thể hiện trình độ luyện kim và kỹ thuật quân sự tiên tiến.',
    image: 'assets/images/artifacts/Súng thần công.png',
    gallery: ['assets/images/artifacts/Súng thần công.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/s%C3%BAng.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Sau khi Lê Trang Tông được lập lên ngôi vua năm 1533, quyền bính thực sự rơi vào tay dòng họ Trịnh. Suốt hơn 200 năm, các chúa Trịnh nắm giữ quân đội, triều chính, tài chính — vua Lê chỉ là bù nhìn ngồi trên ngai vàng. Đây là thời kỳ "vua Lê chúa Trịnh" độc đáo trong lịch sử Việt Nam, khi đất nước bị chia cắt thành Đàng Ngoài (chúa Trịnh) và Đàng Trong (chúa Nguyễn).',
      'Để đối phó với Đàng Trong và bảo vệ quyền lực, phủ chúa Trịnh đã phát triển mạnh công nghệ quân sự, đặc biệt là đúc súng thần công. Những khẩu súng đồng nặng hàng tấn, chạm khắc hoa văn rồng phượng, được bố trí tại các thành lũy trọng yếu. Kỹ thuật đúc súng Đàng Ngoài kết hợp giữa truyền thống luyện kim Việt Nam và công nghệ phương Tây do các thương nhân Bồ Đào Nha, Hà Lan truyền vào, tạo nên những vũ khí có sức công phá mạnh mẽ.'
    ],
    silhouetteSvg: '<path d="M15 45 L55 40 L60 38 L65 40 L65 45 L55 47 L15 50 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="60" cy="42" r="3" fill="none" stroke="currentColor" stroke-width="1"/><path d="M20 50 L20 60 M35 50 L35 58" stroke="currentColor" stroke-width="1.5"/><ellipse cx="15" cy="47" rx="3" ry="5" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M15 52 L80 45 L88 42 L95 45 L95 52 L80 55 L15 60 Z" fill="none" stroke="#B8860B" stroke-width="1.8"/><circle cx="88" cy="48" r="4" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M25 60 L25 75 M50 58 L50 72" stroke="#B8860B" stroke-width="2"/><ellipse cx="15" cy="56" rx="4" ry="7" fill="none" stroke="#B8860B" stroke-width="1.2"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">SÚNG THẦN CÔNG</text>'
  },

  /* ────────────────────────────────────────────────────────────
     12 — CHÚA NGUYỄN – ĐÀNG TRONG (1558 – 1777)
     Thuyền Chiến Đàng Trong
     ──────────────────────────────────────────────────────────── */
  {
    id: 12,
    dynasty: 'Chúa Nguyễn (Đàng Trong)',
    era: '1558 – 1777',
    artifact: 'Thuyền Chiến Đàng Trong',
    description: 'Các chúa Nguyễn mở cõi về phương Nam, xây dựng Đàng Trong thành vùng đất trù phú. Hải quân hùng mạnh với thuyền chiến quy mô lớn, giao thương quốc tế phồn thịnh qua cảng Hội An.',
    artifactDesc: 'Thuyền chiến của hải quân Đàng Trong — lực lượng thủy quân hùng mạnh giúp các chúa Nguyễn bảo vệ bờ biển và mở rộng lãnh thổ phía Nam.',
    image: 'assets/images/artifacts/Thuyền chiến Đàng Trong.png',
    gallery: ['assets/images/artifacts/Thuyền chiến Đàng Trong.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/THUY%E1%BB%80N.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Năm 1558, Nguyễn Hoàng vào trấn thủ Thuận Hóa, mở đầu cho sự nghiệp gây dựng Đàng Trong kéo dài hơn 200 năm. Các chúa Nguyễn liên tục mở rộng lãnh thổ về phía Nam, từ Quảng Nam đến tận mũi Cà Mau và vùng đồng bằng sông Cửu Long. Để bảo vệ vùng biển rộng lớn và đối phó với quân Trịnh ở phía Bắc, các chúa Nguyễn đã xây dựng một lực lượng hải quân hùng mạnh với những chiến thuyền quy mô lớn.',
      'Thuyền chiến Đàng Trong được đóng bằng gỗ lim chắc chắn, trang bị đại bác và có thể chở hàng trăm quân. Cảng thị Hội An trở thành trung tâm giao thương quốc tế sầm uất, nơi thương nhân Nhật Bản, Trung Quốc, Bồ Đào Nha, Hà Lan tấp nập ra vào. Sức mạnh hải quân kết hợp với kinh tế thương mại đã giúp Đàng Trong phát triển thịnh vượng, để lại di sản văn hóa phong phú pha trộn Đông - Tây đặc sắc.'
    ],
    silhouetteSvg: '<path d="M10 50 Q20 35 40 33 Q60 35 70 50" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 50 L70 50" stroke="currentColor" stroke-width="1.5"/><path d="M40 33 L40 18" stroke="currentColor" stroke-width="1.5"/><path d="M40 18 L55 25 L40 30" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M10 62 Q25 42 60 38 Q95 42 110 62" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M10 62 L110 62" stroke="#B8860B" stroke-width="1.8"/><path d="M60 38 L60 15" stroke="#B8860B" stroke-width="1.8"/><path d="M60 15 L82 25 L60 33" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M40 38 L40 22" stroke="#B8860B" stroke-width="1.2"/><path d="M40 22 L55 28 L40 33" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.6"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">THUYỀN CHIẾN</text>'
  },

  /* ────────────────────────────────────────────────────────────
     13 — TÂY SƠN (1771 – 1802)
     Ấm Hình Voi Bằng Đồng
     ──────────────────────────────────────────────────────────── */
  {
    id: 13,
    dynasty: 'Tây Sơn',
    era: '1771 – 1802',
    artifact: 'Ấm Hình Voi Bằng Đồng',
    description: 'Anh hùng Quang Trung - Nguyễn Huệ thống nhất đất nước, đại phá 29 vạn quân Thanh trong chiến dịch thần tốc mùa Xuân Kỷ Dậu 1789 — một trong những chiến thắng vĩ đại nhất lịch sử.',
    artifactDesc: 'Ấm đồng tạo hình voi chiến — hiện vật nghệ thuật độc đáo thể hiện vai trò quan trọng của voi trong quân đội và văn hóa thời Tây Sơn.',
    image: 'assets/images/artifacts/Ấm hình voi bằng đồng.png',
    gallery: ['assets/images/artifacts/Ấm hình voi bằng đồng.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/Voi%20T%C3%A2y%20S%C6%A1n.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Phong trào Tây Sơn (1771-1802) do ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ lãnh đạo đã lật đổ cả chúa Nguyễn ở phương Nam lẫn chúa Trịnh ở phương Bắc, thống nhất đất nước. Quang Trung — Nguyễn Huệ là vị anh hùng quân sự kiệt xuất với chiến thắng Rạch Gầm — Xoài Mút phá 5 vạn quân Xiêm và đại phá 29 vạn quân Thanh trong chiến dịch thần tốc mùa Xuân 1789.',
      'Ấm hình voi bằng đồng là hiện vật nghệ thuật đặc sắc thời Tây Sơn, phản ánh vai trò quan trọng của voi chiến trong quân đội. Voi là lực lượng xung kích chủ lực, mang theo lính chiến và vũ khí hạng nặng, tạo sức công phá ghê gớm trên chiến trường. Ấm được đúc bằng đồng tinh xảo, tái hiện chân thực hình dáng voi chiến với đầy đủ yên cương trang trí, vừa là vật dụng sinh hoạt vừa là tác phẩm nghệ thuật thể hiện bản sắc văn hóa Tây Sơn.'
    ],
    silhouetteSvg: '<path d="M25 55 Q30 35 40 30 Q50 35 55 55" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M35 30 L30 18 Q40 10 50 18 L45 30" fill="none" stroke="currentColor" stroke-width="1"/><path d="M40 25 L40 15" stroke="currentColor" stroke-width="1.5"/><circle cx="40" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="0.8"/>',
    backSvg: '<path d="M30 70 Q38 35 60 28 Q82 35 90 70" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M50 28 L44 12 Q60 2 76 12 L70 28" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M60 22 L60 8" stroke="#B8860B" stroke-width="1.8"/><circle cx="60" cy="6" r="4" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M35 65 L30 75 M85 65 L90 75" stroke="#B8860B" stroke-width="1.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">ẤM VOI ĐỒNG</text>'
  },

  /* ────────────────────────────────────────────────────────────
     14 — NHÀ NGUYỄN (1802 – 1945)
     Ấn Vàng Hoàng Đế Chi Bảo
     ──────────────────────────────────────────────────────────── */
  {
    id: 14,
    dynasty: 'Nhà Nguyễn',
    era: '1802 – 1945',
    artifact: 'Ấn Vàng Hoàng Đế Chi Bảo',
    description: 'Triều đại phong kiến cuối cùng, Gia Long thống nhất giang sơn và đặt kinh đô tại Huế. Di sản kiến trúc cung đình Huế, ấn vàng, Đại Nội được UNESCO công nhận Di sản Thế giới.',
    artifactDesc: 'Ấn vàng ròng "Hoàng đế chi bảo" nặng 10,78 kg — bảo vật quốc gia quý giá nhất, biểu tượng quyền lực tối cao của triều Nguyễn.',
    image: 'assets/images/artifacts/Ấn vàng Hoàng đế chi bảo.png',
    gallery: ['assets/images/artifacts/Ấn vàng Hoàng đế chi bảo.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/HO%C3%80NG%20%C4%90%E1%BA%BE%20CHI%20B%E1%BA%A2O.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng',
      weight: '18g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 500 bộ — Phiên bản đặc biệt'
    },
    story: [
      'Năm 1802, Nguyễn Ánh đánh bại nhà Tây Sơn, lên ngôi Hoàng đế lấy niên hiệu Gia Long, đặt quốc hiệu Việt Nam, đóng đô tại Phú Xuân (Huế). Ấn vàng "Hoàng đế chi bảo" được đúc năm 1823 dưới thời vua Minh Mạng, nặng 10,78 kg vàng ròng, là chiếc ấn quý giá nhất trong hệ thống ấn triện triều Nguyễn.',
      'Ấn có hình vuông, núm rồng cuộn tinh xảo, mặt dưới khắc bốn chữ triện "Hoàng đế chi bảo" (Báu vật của Hoàng đế). Chiếc ấn này được sử dụng để đóng trên các văn bản ngoại giao quan trọng nhất và các chiếu chỉ lớn của triều đình. Năm 2023, Việt Nam đã đấu giá thành công để đưa ấn vàng từ Pháp trở về, trở thành bảo vật quốc gia. Ấn "Hoàng đế chi bảo" là hiện vật tiêu biểu nhất cho nghệ thuật đúc vàng và quyền lực vương triều phong kiến cuối cùng của Việt Nam.'
    ],
    silhouetteSvg: '<rect x="20" y="20" width="40" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="28" y="28" width="24" height="24" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/><text x="40" y="46" text-anchor="middle" font-family="serif" font-size="14" fill="currentColor" opacity="0.5">寶</text>',
    backSvg: '<rect x="30" y="20" width="60" height="55" rx="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="38" y="28" width="44" height="39" rx="2" fill="none" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="54" text-anchor="middle" font-family="serif" font-size="22" fill="#B8860B" opacity="0.6">寶</text><path d="M55 12 Q60 5 65 12" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="48" y="12" width="24" height="10" rx="5" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">HOÀNG ĐẾ CHI BẢO</text>'
  },

  /* ════════════════════════════════════════════════════════════
     BLIND BOX PRODUCTS (id 101+)
     ════════════════════════════════════════════════════════════ */
  {
    id: 101,
    dynasty: 'Khai Ấn Sử Việt',
    era: 'Bộ Sưu Tập 14 Triều Đại',
    artifact: 'Gói Trải Nghiệm (1 Blind Box)',
    price: 199000,
    status: 'in-stock',
    description: 'Hộp mù (Blind Box) chứa ngẫu nhiên 1 trong 14 cổ vật. Cơ hội khám phá lịch sử qua từng hộp và sưu tầm trọn bộ 14 triều đại.',
    artifactDesc: 'Bao gồm 1 hộp Blind Box bí ẩn.',
    image: 'assets/images/blindbox/blind_box_1.png',
    gallery: ['assets/images/blindbox/blind_box_1.png', 'assets/images/blindbox/blind_box_1_alt1.png', 'assets/images/blindbox/blind_box_1_alt2.png', 'assets/images/blindbox/blind_box_1_alt3.png'],
    model: null,
    details: {
      dimensions: '100 × 75 × 20mm',
      material: 'Hộp giấy mỹ thuật cao cấp, cán mờ, ép kim nhũ vàng',
      weight: '50g',
      nfc: 'Tích hợp chip NFC (Quét để kích hoạt AR)',
      edition: 'Không giới hạn',
      feature: 'Gói trải nghiệm cơ bản chứa ngẫu nhiên 1 trong 14 cổ vật thuộc các triều đại lịch sử Việt Nam. Cổ vật được làm từ chất liệu PVC cao cấp, có viền mạ vàng tinh xảo và tích hợp công nghệ NFC ẩn bên trong.',
      guide: '1. Xé lớp seal bảo vệ và mở hộp từ phía trên.<br>2. Nhận cổ vật bí ẩn và khám phá triều đại bạn vừa bốc được.<br>3. Bật NFC trên điện thoại và chạm vào mặt sau của cổ vật.<br>4. Trải nghiệm mô hình cổ vật 3D chân thực và công nghệ AR ngay trên màn hình.'
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
    description: 'Combo 3 hộp mù (Blind Box) giúp bạn nhanh chóng hoàn thành bộ sưu tập. Tỷ lệ xuất hiện phiên bản đặc biệt cao hơn.',
    artifactDesc: 'Bao gồm 3 hộp Blind Box bí ẩn.',
    image: 'assets/images/blindbox/blind_box_3.png',
    gallery: ['assets/images/blindbox/blind_box_3.png', 'assets/images/blindbox/blind_box_3_alt1.png', 'assets/images/blindbox/blind_box_3_alt2.png', 'assets/images/blindbox/blind_box_3_alt3.png'],
    model: null,
    details: {
      dimensions: '100 × 225 × 20mm',
      material: 'Hộp giấy mỹ thuật cao cấp, cán mờ, ép kim nhũ vàng',
      weight: '150g',
      nfc: 'Tích hợp chip NFC trên mỗi thẻ',
      edition: 'Không giới hạn',
      feature: 'Combo 3 hộp mù giúp tăng tỷ lệ sưu tầm các cổ vật Hiếm (Rare) và Siêu Hiếm (Super Rare). Đặc biệt cam kết không có cổ vật trùng lặp trong cùng một set 3 hộp. Khám phá 3 câu chuyện lịch sử khác nhau cùng lúc.',
      guide: '1. Xé dải băng niêm phong trên vỏ hộp lớn để lấy 3 hộp nhỏ.<br>2. Mở từng hộp để tận hưởng cảm giác hồi hộp qua mỗi lần bốc.<br>3. Quét NFC trên từng cổ vật bằng điện thoại để xem mô hình 3D/AR.<br>4. Thu thập cổ vật để hoàn thành toàn bộ 14 triều đại.'
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
    description: 'Combo 6 hộp mù (Blind Box) cao cấp nhất. Chắc chắn nhận được ít nhất 1 phiên bản đặc biệt có hiệu ứng AR độc quyền.',
    artifactDesc: 'Bao gồm 6 hộp Blind Box bí ẩn.',
    image: 'assets/images/blindbox/blind_box_6.png',
    gallery: ['assets/images/blindbox/blind_box_6.png', 'assets/images/blindbox/blind_box_6_alt1.png', 'assets/images/blindbox/blind_box_6_alt2.png', 'assets/images/blindbox/blind_box_6_alt3.png'],
    model: null,
    details: {
      dimensions: '200 × 225 × 20mm',
      material: 'Hộp bìa cứng cao cấp, lót nhung, in nhũ vàng hoàng gia',
      weight: '350g',
      nfc: 'Tích hợp chip NFC trên mỗi thẻ',
      edition: 'Không giới hạn',
      feature: 'Set 6 hộp mù cao cấp nhất dành cho nhà sưu tầm thực thụ. Đảm bảo 100% mở ra ít nhất 1 cổ vật Siêu Hiếm (Super Rare) với hiệu ứng AR độc quyền. Hộp thiết kế sang trọng, có khay lót nhung mềm, vô cùng thích hợp để trưng bày hoặc làm quà tặng.',
      guide: '1. Mở khóa nắp hộp hoàng gia để lộ diện 6 hộp mù bên trong.<br>2. Trải nghiệm bốc từng hộp hoặc dùng làm phần thưởng, quà tặng ý nghĩa.<br>3. Chạm điện thoại vào cổ vật để kích hoạt công nghệ AR tương tác không gian thực.<br>4. Sử dụng mã code đi kèm thẻ Siêu Hiếm để nhận thêm quyền lợi tại các triển lãm.'
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
