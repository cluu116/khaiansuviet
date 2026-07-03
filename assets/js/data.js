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
  {
    id: 1,
    dynasty: 'Văn Lang',
    era: '2879 - 258 TCN',
    artifact: 'Trống Đồng Đông Sơn',
    description: 'Thời kỳ dựng nước đầu tiên của dân tộc Việt Nam, gắn liền với huyền thoại Vua Hùng, Lạc Long Quân và Âu Cơ. Nền văn minh rực rỡ với Trống đồng Đông Sơn — biểu tượng văn hóa trường tồn.',
    artifactDesc: 'Hiện vật bằng đồng tiêu biểu nhất của nền văn minh Đông Sơn, với hoa văn tinh xảo mô tả đời sống, lễ hội và tín ngưỡng thờ Mặt Trời.',
    image: 'assets/images/trống đồng.png',
    gallery: ['assets/images/trống đồng.png', 'assets/images/trống đồng.png', 'assets/images/trống đồng.png'],
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
  {
    id: 2,
    dynasty: 'Âu Lạc',
    era: '257 - 207 TCN',
    artifact: 'Nỏ Thần Liên Châu',
    description: 'An Dương Vương thống nhất Âu Việt và Lạc Việt, xây thành Cổ Loa — tòa thành ốc xoắn huyền thoại. Câu chuyện nỏ thần, Mỵ Châu - Trọng Thủy là bài học muôn đời về cảnh giác.',
    artifactDesc: 'Vũ khí huyền thoại được thần Kim Quy trao cho An Dương Vương, có khả năng bắn hàng ngàn mũi tên cùng lúc, bảo vệ thành Cổ Loa.',
    image: 'assets/images/nỏ thần.png',
    gallery: ['assets/images/nỏ thần.png'],
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
  {
    id: 3,
    dynasty: 'Nhà Triệu',
    era: '207 - 111 TCN',
    artifact: 'Ấn Vàng Văn Đế',
    description: 'Triệu Đà lập nước Nam Việt sau khi thôn tính Âu Lạc. Một thời kỳ giao thoa văn hóa phức tạp, nơi bản sắc Việt vẫn kiên cường tồn tại giữa ảnh hưởng phương Bắc.',
    artifactDesc: 'Ấn triện bằng vàng của Triệu Văn Đế, biểu tượng quyền lực tối cao, được phát hiện trong lăng mộ tại Quảng Châu.',
    image: 'assets/images/đồng xu.png',
    gallery: ['assets/images/đồng xu.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/%C4%91%E1%BB%93ng%20xu.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng',
      weight: '18g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 500 bộ — Phiên bản đặc biệt'
    },
    story: [
      'Năm 1983, tại Quảng Châu (Trung Quốc), các nhà khảo cổ đã phát hiện lăng mộ của Triệu Văn Đế — cháu nội Triệu Đà, vị vua thứ hai của nước Nam Việt. Trong hàng ngàn hiện vật quý giá, nổi bật nhất là chiếc ấn vàng ròng khắc bốn chữ "Văn Đế Hành Tỷ", xác nhận danh xưng hoàng đế mà các vua Nam Việt tự xưng để ngang hàng với nhà Hán phương Bắc.',
      'Chiếc ấn vàng nặng gần 150 gram, hình vuông, núm rồng cuộn, thể hiện trình độ mỹ thuật và luyện kim tuyệt đỉnh của thời kỳ này. Nước Nam Việt tồn tại gần một thế kỷ (207-111 TCN), dù bị tranh cãi về nguồn gốc Hán hay Việt, nhưng không thể phủ nhận đây là giai đoạn giao thoa văn hóa quan trọng, nơi kỹ thuật đúc đồng, dệt lụa và nông nghiệp của người Việt cổ tiếp tục phát triển song song với ảnh hưởng từ phương Bắc.'
    ],
    silhouetteSvg: '<rect x="20" y="20" width="40" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="28" y="28" width="24" height="24" rx="1" fill="none" stroke="currentColor" stroke-width="0.8"/><text x="40" y="46" text-anchor="middle" font-family="serif" font-size="14" fill="currentColor" opacity="0.5">印</text>',
    backSvg: '<rect x="30" y="20" width="60" height="55" rx="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="38" y="28" width="44" height="39" rx="2" fill="none" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="54" text-anchor="middle" font-family="serif" font-size="22" fill="#B8860B" opacity="0.6">印</text><rect x="45" y="12" width="30" height="12" rx="6" fill="none" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">ẤN VÀNG</text>'
  },
  {
    id: 4,
    dynasty: 'Nhà Ngô',
    era: '939 - 965',
    artifact: 'Cọc Gỗ Bạch Đằng',
    description: 'Ngô Quyền đại phá quân Nam Hán trên sông Bạch Đằng năm 938, chấm dứt hơn 1000 năm Bắc thuộc. Chiến thắng lẫy lừng đặt nền móng cho kỷ nguyên độc lập dân tộc.',
    artifactDesc: 'Hệ thống cọc gỗ được đóng dưới lòng sông Bạch Đằng, lợi dụng thủy triều để phá tan đội thuyền chiến hùng mạnh của quân Nam Hán.',
    image: 'assets/images/trận bạch đằng.png',
    gallery: ['assets/images/trận bạch đằng.png'],
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
  {
    id: 5,
    dynasty: 'Nhà Đinh',
    era: '968 - 980',
    artifact: 'Kiếm Lệnh Đinh Tiên Hoàng',
    description: 'Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước và lên ngôi Hoàng đế, đặt quốc hiệu Đại Cồ Việt — quốc hiệu chính thức đầu tiên của nước ta.',
    artifactDesc: 'Thanh kiếm biểu tượng uy quyền của Đinh Tiên Hoàng — vị Hoàng đế đầu tiên thống nhất giang sơn sau thời loạn lạc.',
    image: 'assets/images/cục đá.png',
    gallery: ['assets/images/cục đá.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/cuc%20da.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Đinh Bộ Lĩnh sinh ra tại Hoa Lư (Ninh Bình), từ nhỏ đã thể hiện khí phách phi thường qua truyền thuyết "cờ lau tập trận" — cậu bé dùng bông lau làm cờ, chỉ huy đám trẻ chăn trâu tập đánh trận. Lớn lên, ông quy tụ hào kiệt bốn phương, lần lượt dẹp tan 12 sứ quân cát cứ, thống nhất đất nước sau thời kỳ hỗn loạn kéo dài gần 30 năm.',
      'Năm 968, Đinh Bộ Lĩnh lên ngôi Hoàng đế, lấy hiệu Đinh Tiên Hoàng, đặt quốc hiệu Đại Cồ Việt — quốc hiệu chính thức đầu tiên của Việt Nam, đóng đô tại Hoa Lư. Ông ban hành luật pháp nghiêm minh, đặt vạc dầu sôi và chuồng hổ trước cung điện để răn đe kẻ phạm tội. Thanh kiếm lệnh của Đinh Tiên Hoàng là biểu tượng cho ý chí sắt đá của vị hoàng đế đã đặt nền móng cho một quốc gia thống nhất và có chủ quyền.'
    ],
    silhouetteSvg: '<path d="M40 10 L40 60" stroke="currentColor" stroke-width="2"/><path d="M35 60 L45 60" stroke="currentColor" stroke-width="2"/><path d="M30 15 L50 15" stroke="currentColor" stroke-width="1.5"/><circle cx="40" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M60 5 L60 75" stroke="#B8860B" stroke-width="2.5"/><path d="M50 75 L70 75" stroke="#B8860B" stroke-width="3"/><path d="M45 12 L75 12" stroke="#B8860B" stroke-width="2"/><circle cx="60" cy="5" r="4" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M55 12 L55 18 M65 12 L65 18" stroke="#B8860B" stroke-width="1"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">KIẾM LỆNH</text>'
  },
  {
    id: 6,
    dynasty: 'Nhà Tiền Lê',
    era: '980 - 1009',
    artifact: 'Giáp Trụ Thời Lê',
    description: 'Lê Đại Hành kế thừa sự nghiệp nhà Đinh, anh dũng đánh bại quân Tống xâm lược, bảo vệ nền độc lập non trẻ và mở mang bờ cõi phía Nam.',
    artifactDesc: 'Bộ giáp trụ chiến binh tiêu biểu cho sức mạnh quân sự thời Tiền Lê, thể hiện tinh thần thượng võ bất khuất.',
    image: 'assets/images/thuyền.png',
    gallery: ['assets/images/thuyền.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/THUY%E1%BB%80N.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Năm 980, trước nguy cơ nhà Tống phát đại quân xâm lược, Lê Hoàn — vị tướng tài của nhà Đinh — được Thái hậu Dương Vân Nga trao áo Long Cổn, lên ngôi Hoàng đế để lãnh đạo kháng chiến. Trận Chi Lăng năm 981 là đòn quyết định: quân Đại Cồ Việt phục kích tiêu diệt tướng giặc Hầu Nhân Bảo, khiến quân Tống đại bại phải rút về nước.',
      'Lê Đại Hành không chỉ là vị vua giỏi đánh giặc mà còn là người mở đường cho sự nghiệp Nam tiến. Ông sai đào kênh Nhà Lê nối liền Thanh Hóa với Nghệ An, vừa phục vụ giao thương vừa phục vụ quân sự. Bộ giáp trụ thời Tiền Lê tượng trưng cho sức mạnh quân sự và tinh thần thượng võ của thời đại — khi một quốc gia non trẻ dám đương đầu và chiến thắng đế chế hùng mạnh nhất phương Đông.'
    ],
    silhouetteSvg: '<path d="M30 30 Q40 15 50 30 L50 55 L30 55 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M25 55 L55 55" stroke="currentColor" stroke-width="1"/><circle cx="40" cy="40" r="5" fill="none" stroke="currentColor" stroke-width="0.8"/>',
    backSvg: '<path d="M40 25 Q60 5 80 25 L80 65 L40 65 Z" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M35 65 L85 65" stroke="#B8860B" stroke-width="1.5"/><circle cx="60" cy="42" r="8" fill="none" stroke="#B8860B" stroke-width="1"/><path d="M52 42 L68 42 M60 34 L60 50" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">GIÁP TRỤ</text>'
  },
  {
    id: 7,
    dynasty: 'Nhà Lý',
    era: '1009 - 1225',
    artifact: 'Rồng Thời Lý',
    description: 'Lý Công Uẩn dời đô về Thăng Long, mở ra kỷ nguyên hoàng kim rực rỡ nhất. Phật giáo hưng thịnh, nghệ thuật gốm sứ, kiến trúc chùa tháp và Rồng thời Lý trở thành biểu tượng bất hủ.',
    artifactDesc: 'Hình tượng Rồng thanh mảnh, uốn lượn hình chữ S đặc trưng — biểu tượng vương quyền và nền văn minh Đại Việt thời Lý.',
    image: 'assets/images/rồng.png',
    gallery: ['assets/images/rồng.png'],
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
    backSvg: '<path d="M15 70 Q30 40 45 55 Q60 70 75 40 Q90 15 105 30" fill="none" stroke="#B8860B" stroke-width="2" stroke-linecap="round"/><circle cx="105" cy="30" r="6" fill="none" stroke="#B8860B" stroke-width="1.5"/><circle cx="107" cy="28" r="1.5" fill="#B8860B"/><path d="M15 70 Q8 82 20 85" fill="none" stroke="#B8860B" stroke-width="1.5" stroke-linecap="round"/><path d="M12 72 Q5 78 15 80" fill="none" stroke="#B8860B" stroke-width="1" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">RỒNG THỜI LÝ</text>'
  },
  {
    id: 8,
    dynasty: 'Nhà Trần',
    era: '1226 - 1400',
    artifact: 'Hịch Tướng Sĩ',
    description: 'Ba lần đại phá quân Nguyên Mông dưới sự lãnh đạo của Hưng Đạo Đại Vương Trần Quốc Tuấn. Hào khí Đông A vang dội, Hịch tướng sĩ trở thành áng văn bất hủ.',
    artifactDesc: 'Bài hịch hùng tráng của Trần Hưng Đạo, khích lệ tướng sĩ quyết tâm đánh giặc Nguyên Mông — biểu tượng lòng yêu nước và ý chí sắt đá.',
    image: 'assets/images/ấn thời trần.png',
    gallery: ['assets/images/ấn thời trần.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/%E1%BA%A5n%20th%E1%BB%9Di%20Tr%E1%BA%A7n.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Đại Việt thời Trần đối mặt với thảm họa lớn nhất thời bấy giờ: Đế chế Mông Cổ — đạo quân đã san phẳng từ Á sang Âu. Dưới sự lãnh đạo của vua Trần Nhân Tông và Quốc công Tiết chế Trần Hưng Đạo, quân dân nhà Trần đã ba lần (1258, 1285, 1288) đập tan kỵ binh Nguyên Mông. Tại Hội nghị Diên Hồng, khi được vua hỏi hòa hay đánh, bô lão cả nước đã đồng thanh hô "Đánh!", thể hiện sự đồng lòng tuyệt đối từ triều đình đến nhân dân.',
      '"Hịch tướng sĩ" do Trần Hưng Đạo viết trước cuộc kháng chiến lần thứ hai là một áng thiên cổ hùng văn. Lời hịch vừa nghiêm khắc phê phán sự bàng quan của tướng sĩ, vừa bộc lộ tấm lòng trung quân ái quốc tha thiết: "Dẫu cho trăm thân này phơi ngoài nội cỏ, nghìn xác này gói trong da ngựa, ta cũng vui lòng". Bài hịch đã khơi dậy mạnh mẽ "hào khí Đông A", khiến binh lính thích hai chữ "Sát Thát" (Giết giặc Thát) lên cánh tay, thề quyết tử bảo vệ non sông.'
    ],
    silhouetteSvg: '<rect x="20" y="10" width="40" height="55" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="28" y1="22" x2="52" y2="22" stroke="currentColor" stroke-width="0.8"/><line x1="28" y1="30" x2="52" y2="30" stroke="currentColor" stroke-width="0.8"/><line x1="28" y1="38" x2="52" y2="38" stroke="currentColor" stroke-width="0.8"/><line x1="28" y1="46" x2="45" y2="46" stroke="currentColor" stroke-width="0.8"/>',
    backSvg: '<rect x="25" y="8" width="70" height="72" rx="3" fill="none" stroke="#B8860B" stroke-width="1.5"/><line x1="35" y1="22" x2="85" y2="22" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="32" x2="85" y2="32" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="42" x2="85" y2="42" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="52" x2="80" y2="52" stroke="#B8860B" stroke-width="0.8"/><line x1="35" y1="62" x2="70" y2="62" stroke="#B8860B" stroke-width="0.8"/><rect x="30" y="12" width="15" height="6" rx="1" fill="#A62C21" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">HỊCH TƯỚNG SĨ</text>'
  },
  {
    id: 9,
    dynasty: 'Nhà Hồ',
    era: '1400 - 1407',
    artifact: 'Thành Nhà Hồ',
    description: 'Hồ Quý Ly tiến hành cải cách táo bạo: phát hành tiền giấy, cải tổ giáo dục, xây thành Tây Đô bằng đá đồ sộ. Dù ngắn ngủi, nhà Hồ để lại di sản kiến trúc độc nhất vô nhị.',
    artifactDesc: 'Tòa thành đá kỳ vĩ tại Thanh Hóa, xây bằng những khối đá hàng chục tấn xếp chồng không cần vữa — Di sản Thế giới UNESCO.',
    image: 'assets/images/thành nhà hồ.png',
    gallery: ['assets/images/thành nhà hồ.png'],
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
    backSvg: '<rect x="15" y="35" width="90" height="40" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M15 35 L60 10 L105 35" fill="none" stroke="#B8860B" stroke-width="1.5"/><rect x="48" y="50" width="24" height="25" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M48 62 L72 62" stroke="#B8860B" stroke-width="0.8"/><line x1="25" y1="45" x2="25" y2="75" stroke="#B8860B" stroke-width="2"/><line x1="95" y1="45" x2="95" y2="75" stroke="#B8860B" stroke-width="2"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">THÀNH NHÀ HỒ</text>'
  },
  {
    id: 10,
    dynasty: 'Nhà Hậu Lê',
    era: '1428 - 1789',
    artifact: 'Gươm Thuận Thiên',
    description: 'Lê Lợi lãnh đạo khởi nghĩa Lam Sơn 10 năm gian khổ, giải phóng đất nước khỏi ách đô hộ nhà Minh. Nguyễn Trãi soạn Bình Ngô Đại Cáo — bản Tuyên ngôn Độc lập thứ hai.',
    artifactDesc: 'Thanh gươm huyền thoại mà Long Quân cho Lê Lợi mượn để đánh đuổi giặc Minh, sau đó trả lại tại Hồ Hoàn Kiếm.',
    image: 'assets/images/rồng đá.png',
    gallery: ['assets/images/rồng đá.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/rongda.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng 24K',
      weight: '20g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 300 bộ — Phiên bản Collector'
    },
    story: [
      'Sau khi nhà Hồ sụp đổ, nước ta rơi vào ách đô hộ tàn bạo của nhà Minh. Tại vùng núi rừng Lam Sơn (Thanh Hóa), Lê Lợi đã phất cờ khởi nghĩa. Truyền thuyết kể rằng, Đức Long Quân đã cho mượn gươm thần "Thuận Thiên" (thuận theo ý trời) — lưỡi gươm vớt được dưới nước, chuôi gươm nhặt được trên rừng — để giúp nghĩa quân có thêm sức mạnh. Gươm thần đã theo Lê Lợi suốt 10 năm "nếm mật nằm gai", từ những ngày gian khổ ở Chí Linh đến đại thắng Xương Giang.',
      'Năm 1428, giặc Minh đại bại phải xin hòa rút về nước. Lê Lợi lên ngôi Hoàng đế, lập ra nhà Hậu Lê, và Nguyễn Trãi đã viết "Bình Ngô Đại Cáo" — bản Tuyên ngôn Độc lập vĩ đại tuyên bố "Non sông bờ cõi đã chia, phong tục Bắc Nam cũng khác". Tương truyền một năm sau khi thái bình, khi vua Lê rạo thuyền trên hồ Tả Vọng, Thần Kim Quy đã nổi lên ngoạm lại gươm thần, từ đó hồ có tên là Hồ Hoàn Kiếm, tượng trưng cho khát vọng hòa bình của dân tộc.'
    ],
    silhouetteSvg: '<path d="M40 10 L44 55 L40 65 L36 55 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M30 55 L50 55" stroke="currentColor" stroke-width="2"/><path d="M37 55 L37 70 M43 55 L43 70" stroke="currentColor" stroke-width="1"/><circle cx="40" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M60 5 L66 62 L60 78 L54 62 Z" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M42 62 L78 62" stroke="#B8860B" stroke-width="2.5"/><path d="M55 62 L55 82 M65 62 L65 82" stroke="#B8860B" stroke-width="1.5"/><circle cx="60" cy="5" r="5" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M57 5 L63 5 M60 2 L60 8" stroke="#B8860B" stroke-width="0.8"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">GƯƠM THUẬN THIÊN</text>'
  },
  {
    id: 11,
    dynasty: 'Nhà Mạc',
    era: '1527 - 1677',
    artifact: 'Gốm Sứ Thời Mạc',
    description: 'Mạc Đăng Dung lập triều Mạc, mở ra thời kỳ Nam - Bắc triều phân tranh. Dù gây tranh cãi, nhà Mạc để lại dấu ấn kiến trúc, gốm sứ và thương mại phồn thịnh.',
    artifactDesc: 'Dòng gốm sứ cao cấp với men lam đặc trưng, hoa văn tinh tế phản ánh thời kỳ thương mại quốc tế phát triển mạnh mẽ.',
    image: 'assets/images/lư hương.png',
    gallery: ['assets/images/lư hương.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/l%C6%B0%20h%C6%B0%C6%A1ng.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ — ĐÃ HẾT HÀNG'
    },
    story: [
      'Năm 1527, Mạc Đăng Dung phế truất vua Lê để lập ra nhà Mạc, khởi đầu cho thời kỳ Nam - Bắc triều phân tranh. Mặc dù thường bị các sử gia phong kiến chỉ trích là "ngụy triều", nhưng thực tế nhà Mạc đã đem lại một giai đoạn ổn định kinh tế, văn hóa khá rực rỡ ở vùng Đồng bằng Bắc Bộ. Giao thương cảng biển được mở rộng, tạo điều kiện cho thủ công nghiệp, đặc biệt là nghệ thuật làm gốm phát triển mạnh mẽ.',
      'Gốm Chu Đậu (Hải Dương) đạt đến đỉnh cao vào thời Mạc. Với kỹ thuật men lam (cobalt) tinh xảo, nét vẽ phóng khoáng mang đậm hồn quê Việt (hình ảnh hoa cúc, chim chích chòe, tôm cá), gốm Chu Đậu không chỉ phục vụ trong nước mà còn vươn ra thị trường quốc tế theo con đường tơ lụa trên biển. Những chiếc bình gốm thời Mạc hiện vẫn được lưu giữ tại các bảo tàng lớn trên thế giới, là minh chứng cho một thời kỳ thương mại huy hoàng.'
    ],
    silhouetteSvg: '<path d="M30 55 Q30 25 40 20 Q50 25 50 55" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="40" cy="55" rx="12" ry="4" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="40" cy="20" rx="5" ry="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<path d="M40 72 Q40 25 60 18 Q80 25 80 72" fill="none" stroke="#B8860B" stroke-width="1.8"/><ellipse cx="60" cy="72" rx="22" ry="6" fill="none" stroke="#B8860B" stroke-width="1.5"/><ellipse cx="60" cy="18" rx="8" ry="3" fill="none" stroke="#B8860B" stroke-width="1.2"/><path d="M48 40 Q60 35 72 40" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><path d="M46 52 Q60 47 74 52" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">GỐM SỨ</text>'
  },
  {
    id: 12,
    dynasty: 'Nhà Tây Sơn',
    era: '1778 - 1802',
    artifact: 'Trống Trận Tây Sơn',
    description: 'Anh hùng Quang Trung - Nguyễn Huệ thống nhất đất nước, đại phá 29 vạn quân Thanh trong chiến dịch thần tốc mùa Xuân Kỷ Dậu 1789 — một trong những chiến thắng vĩ đại nhất lịch sử.',
    artifactDesc: 'Bộ trống trận hùng hậu của nghĩa quân Tây Sơn, vang dội trong chiến dịch giải phóng Thăng Long lịch sử.',
    image: 'assets/images/súng.png',
    gallery: ['assets/images/súng.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/s%C3%BAng.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Cuối thế kỷ 18, đất nước chìm trong nội chiến Trịnh - Nguyễn. Từ vùng Tây Sơn (Bình Định), ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ đã dựng cờ khởi nghĩa, lật đổ cả chúa Nguyễn ở phía Nam lẫn chúa Trịnh ở phía Bắc, bước đầu thống nhất giang sơn. Nguyễn Huệ — vị anh hùng bách chiến bách thắng — đã lập nên những chiến công hiển hách: rạch gầm Xoài Mút phá 5 vạn quân Xiêm, và đỉnh cao là chiến dịch mùa Xuân Kỷ Dậu 1789.',
      'Khi 29 vạn quân Thanh mượn cớ giúp nhà Lê tràn sang chiếm Thăng Long, Nguyễn Huệ lên ngôi Hoàng đế (Quang Trung) và thực hiện cuộc hành quân thần tốc. Trong tiếng trống trận Tây Sơn dồn dập hùng tráng — loại trống được đánh bằng hai tay hai dùi kết hợp cùi chỏ, truyền lửa chiến đấu mãnh liệt — quân ta đã đánh tan quân Thanh chỉ trong 5 ngày tết. Trống trận Tây Sơn ngày nay đã trở thành một di sản văn hóa phi vật thể, biểu tượng của võ thuật và tinh thần bất khuất.'
    ],
    silhouetteSvg: '<ellipse cx="40" cy="30" rx="20" ry="10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M20 30 L20 55 Q40 65 60 55 L60 30" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M60 40 L70 35 M60 45 L68 42" stroke="currentColor" stroke-width="1"/>',
    backSvg: '<ellipse cx="60" cy="28" rx="30" ry="14" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M30 28 L30 65 Q60 78 90 65 L90 28" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M90 42 L105 36 M90 50 L102 46" stroke="#B8860B" stroke-width="1.5"/><path d="M42 28 L42 32 M52 28 L52 32 M68 28 L68 32 M78 28 L78 32" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">TRỐNG TRẬN</text>'
  },
  {
    id: 13,
    dynasty: 'Nhà Nguyễn',
    era: '1802 - 1945',
    artifact: 'Cửu Đỉnh Nhà Nguyễn',
    description: 'Triều đại phong kiến cuối cùng, Gia Long thống nhất giang sơn và đặt kinh đô tại Huế. Di sản kiến trúc cung đình Huế, Cửu đỉnh, Đại Nội được UNESCO công nhận Di sản Thế giới.',
    artifactDesc: 'Chín chiếc đỉnh đồng đồ sộ đặt trước Thế Miếu, chạm khắc hình ảnh non sông đất nước — biểu tượng quyền lực và sự trường tồn.',
    image: 'assets/images/hoàng đế chi bảo.png',
    gallery: ['assets/images/hoàng đế chi bảo.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/HO%C3%80NG%20%C4%90%E1%BA%BE%20CHI%20B%E1%BA%A2O.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc, dập nổi vàng',
      weight: '18g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 500 bộ — Phiên bản đặc biệt'
    },
    story: [
      'Năm 1802, Nguyễn Ánh đánh bại nhà Tây Sơn, lên ngôi Hoàng đế lấy niên hiệu Gia Long, đặt quốc hiệu Việt Nam, đóng đô tại Phú Xuân (Huế). Nhà Nguyễn là vương triều phong kiến cuối cùng, đã để lại một di sản văn hóa, kiến trúc đồ sộ. Dưới thời vua Minh Mạng — thời kỳ quốc gia phát triển cường thịnh với tên gọi Đại Nam — Cửu đỉnh đã được đúc để đặt trước Thế Miếu.',
      'Cửu Đỉnh gồm 9 chiếc đỉnh đồng khổng lồ, mỗi đỉnh mang tên một thụy hiệu của vua (Cao đỉnh, Nhân đỉnh, Chương đỉnh...). Trên bề mặt 9 đỉnh là 162 bức phù điêu chạm nổi tinh xảo, mô tả chân thực các cảnh vật, sản vật, núi sông, biển đảo từ Bắc chí Nam. Cửu Đỉnh không chỉ là biểu tượng cho uy quyền và sự trường tồn của vương triều, mà còn được xem như một bộ "bách khoa toàn thư" bằng đồng về địa lý, tự nhiên Việt Nam thế kỷ 19.'
    ],
    silhouetteSvg: '<path d="M25 55 L30 25 Q40 20 50 25 L55 55" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="40" cy="55" rx="16" ry="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M30 25 L25 18 M50 25 L55 18" stroke="currentColor" stroke-width="1.5"/>',
    backSvg: '<path d="M35 70 L42 25 Q60 18 78 25 L85 70" fill="none" stroke="#B8860B" stroke-width="1.8"/><ellipse cx="60" cy="70" rx="26" ry="7" fill="none" stroke="#B8860B" stroke-width="1.5"/><path d="M42 25 L34 14 M78 25 L86 14" stroke="#B8860B" stroke-width="2"/><path d="M50 40 Q60 36 70 40" fill="none" stroke="#B8860B" stroke-width="0.8" opacity="0.5"/><text x="60" y="95" text-anchor="middle" font-family="\'Cinzel\',serif" font-size="6" fill="#B8860B" opacity="0.7">CỬU ĐỈNH</text>'
  },
  {
    id: 14,
    dynasty: 'Bắc Thuộc & Khởi Nghĩa',
    era: '111 TCN - 938',
    artifact: 'Voi Chiến Hai Bà Trưng',
    description: 'Hơn 1000 năm chống đô hộ phương Bắc, từ Hai Bà Trưng cưỡi voi ra trận, Bà Triệu hiên ngang, đến Lý Bí lập nước Vạn Xuân — ngọn lửa độc lập không bao giờ tắt.',
    artifactDesc: 'Hình tượng Hai Bà Trưng cưỡi voi xung trận đánh đuổi quân Đông Hán — biểu tượng bất khuất của phụ nữ và dân tộc Việt Nam.',
    image: 'assets/images/voi tây sơn.png',
    gallery: ['assets/images/voi tây sơn.png'],
    model: 'https://pub-a711e19329614289a537d0614139f816.r2.dev/Voi%20T%C3%A2y%20S%C6%A1n.glb',
    details: {
      dimensions: '88 × 63mm',
      material: 'Giấy mỹ thuật cao cấp 350gsm, phủ UV chọn lọc',
      weight: '15g',
      nfc: 'NFC chip NXP NTAG215, chống nước IP67',
      edition: 'Giới hạn 1000 bộ'
    },
    story: [
      'Từ năm 111 TCN đến năm 938, dân tộc Việt Nam trải qua hơn một ngàn năm bị các triều đại phong kiến phương Bắc đô hộ. Nhưng xuyên suốt đêm trường ấy, ngọn lửa đấu tranh giành độc lập chưa bao giờ tắt. Khởi nghĩa Hai Bà Trưng (năm 40) là tiếng sấm đầu tiên vang lên. Hai chị em Trưng Trắc, Trưng Nhị cưỡi voi ra trận, đánh đuổi Thái thú Tô Định, giành lại 65 thành trì, xưng vương và lập ra nhà nước độc lập ngắn ngủi nhưng đầy tự hào.',
      'Hình ảnh những nữ tướng cưỡi voi xông pha trận mạc — từ Hai Bà Trưng đến Bà Triệu (năm 248) với câu nói bất hủ "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông" — là biểu tượng độc đáo của tinh thần dân tộc và vai trò vĩ đại của phụ nữ Việt Nam trong lịch sử chống ngoại xâm. Đó là mạch nguồn nuôi dưỡng ý chí quật cường, dẫn tới những cuộc khởi nghĩa Lý Bí, Mai Thúc Loan, Phùng Hưng, và cuối cùng là chiến thắng Bạch Đằng năm 938 vĩnh viễn đánh đuổi quân đô hộ.'
    ],
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
    description: 'Hộp mù (Blind Box) chứa ngẫu nhiên 1 trong 14 cổ vật. Cơ hội khám phá lịch sử qua từng hộp và sưu tầm trọn bộ 14 triều đại.',
    artifactDesc: 'Bao gồm 1 hộp Blind Box bí ẩn.',
    image: 'assets/images/blind_box_1.png',
    gallery: ['assets/images/blind_box_1.png', 'assets/images/blind_box_1_alt1.png', 'assets/images/blind_box_1_alt2.png', 'assets/images/blind_box_1_alt3.png'],
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
    image: 'assets/images/blind_box_3.png',
    gallery: ['assets/images/blind_box_3.png', 'assets/images/blind_box_3_alt1.png', 'assets/images/blind_box_3_alt2.png', 'assets/images/blind_box_3_alt3.png'],
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
    image: 'assets/images/blind_box_6.png',
    gallery: ['assets/images/blind_box_6.png', 'assets/images/blind_box_6_alt1.png', 'assets/images/blind_box_6_alt2.png', 'assets/images/blind_box_6_alt3.png'],
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
