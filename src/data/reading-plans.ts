// ============================================================================
// HỆ THỐNG KẾ HOẠCH ĐỌC KINH THÁNH CÔNG GIÁO
// Nền tảng "Lời Chúa Mỗi Ngày"
// ============================================================================

import { ReadingPlanItem } from '@/types';

export const READING_PLANS_DATABASE: ReadingPlanItem[] = [
  // --------------------------------------------------------------------------
  // 1. ĐỌC TOÀN BỘ KINH THÁNH TRONG 365 NGÀY (73 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'plan-365',
    slug: 'toan-bo-kinh-thanh-365-ngay',
    title: 'Toàn Bộ Kinh Thánh Trong 365 Ngày',
    subtitle: 'Hành trình trọn vẹn khám phá 73 sách Cựu Ước và Tân Ước trong một năm',
    description: 'Kế hoạch kinh điển giúp người Kitô hữu nuôi dưỡng đời sống thiêng liêng mỗi ngày. Mỗi ngày gồm một đoạn Cựu Ước, một Thánh Vịnh/Khôn Ngoan và một đoạn Tân Ước, kết nối liên tục Lịch sử Cứu độ.',
    durationDays: 365,
    category: 'ALL_BIBLE',
    categoryLabel: 'Toàn Bộ 73 Sách',
    badge: 'Kinh Điển 1 Năm',
    days: [
      {
        dayNumber: 1,
        title: 'Ngày 1: Khởi nguyên công trình Sáng Tạo & Lời Tựa Tin Mừng',
        passages: [
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '1-2', label: 'St 1-2' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '1', label: 'Tv 1' },
          { bookId: 'john', bookName: 'Gioan', chapters: '1', label: 'Ga 1' }
        ],
        objective: 'Nhận biết Thiên Chúa là Đấng Tạo Hóa và Ngôi Lời Nhập Thể là nguồn sự sống.',
        suggestion: 'Dành 5 phút thinh lặng tạ ơn Chúa vì hơi thở và sự sống Người đã ban cho bạn.',
        focusVerse: 'Thoạt đầu đã có Ngôi Lời. Ngôi Lời vẫn hướng về Thiên Chúa, và Ngôi Lời là Thiên Chúa. (Ga 1,1)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Sa ngã, Lời hứa cứu chuộc & Tiếng gọi đầu tiên',
        passages: [
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '3-4', label: 'St 3-4' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '2', label: 'Tv 2' },
          { bookId: 'john', bookName: 'Gioan', chapters: '2', label: 'Ga 2' }
        ],
        objective: 'Ý thức hậu quả của tội và tin tưởng vào Lời Hứa Tiên Tin Mừng (Protoevangelium).',
        suggestion: 'Xin Mẹ Maria dạy ta biết vâng nghe Lời Chúa: "Người bảo gì, các anh cứ việc làm theo".',
        focusVerse: 'Người bảo gì, các anh cứ việc làm theo. (Ga 2,5)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Dòng dõi loài người, Tàu Nô-ê & Tái sinh bởi Thần Khí',
        passages: [
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '5-6', label: 'St 5-6' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '3', label: 'Tv 3' },
          { bookId: 'john', bookName: 'Gioan', chapters: '3', label: 'Ga 3' }
        ],
        objective: 'Chiêm ngắm tình yêu vô biên của Thiên Chúa ban Con Một để cứu chuộc nhân loại.',
        suggestion: 'Cầu nguyện cho những người đang tìm kiếm ánh sáng chân lý và sự tái sinh thiêng liêng.',
        focusVerse: 'Thiên Chúa yêu thế gian đến nỗi đã ban Con Một, để ai tin vào Con của Người thì khỏi phải chết, nhưng được sống muôn đời. (Ga 3,16)'
      },
      {
        dayNumber: 4,
        title: 'Ngày 4: Nạn hồng thủy, Cầu vồng Giao ước & Nước Hằng Sống',
        passages: [
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '7-9', label: 'St 7-9' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '4', label: 'Tv 4' },
          { bookId: 'john', bookName: 'Gioan', chapters: '4', label: 'Ga 4' }
        ],
        objective: 'Khám phá sự trung tín của Giao Ước Thiên Chúa và cơn khát tâm linh được thỏa thuê nơi Đức Kitô.',
        suggestion: 'Mở lòng đón nhận ân sủng Chúa như người phụ nữ Samaria bên bờ giếng Gia-cóp.',
        focusVerse: 'Ai uống nước tôi cho, sẽ không bao giờ khát nữa. (Ga 4,14)'
      },
      {
        dayNumber: 5,
        title: 'Ngày 5: Tháp Ba-ben, Ơn gọi tổ phụ Áp-ra-ham & Chữa lành ngày Sabát',
        passages: [
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '11-12', label: 'St 11-12' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '5', label: 'Tv 5' },
          { bookId: 'john', bookName: 'Gioan', chapters: '5', label: 'Ga 5' }
        ],
        objective: 'Bước đi trong niềm vâng phục đức tin theo mẫu gương Tổ phụ Áp-ra-ham.',
        suggestion: 'Can đảm từ bỏ sự an toàn vị kỷ để dấn thân theo tiếng gọi của Thiên Chúa.',
        focusVerse: 'Hãy rời bỏ xứ sở, họ hàng và nhà cha ngươi, mà đi tới đất Ta sẽ chỉ cho ngươi. (St 12,1)'
      },
      {
        dayNumber: 6,
        title: 'Ngày 6: Giao ước đức tin của Áp-ra-ham & Bánh Hằng Sống',
        passages: [
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '15-17', label: 'St 15-17' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '6', label: 'Tv 6' },
          { bookId: 'john', bookName: 'Gioan', chapters: '6', label: 'Ga 6' }
        ],
        objective: 'Thấu hiểu mầu nhiệm Bánh Hằng Sống nuôi dưỡng linh hồn trên hành trình lữ thứ.',
        suggestion: 'Viếng Thánh Thể hoặc chuẩn bị tâm hồn sốt sắng trước khi tham dự Thánh Lễ.',
        focusVerse: 'Tôi là bánh hằng sống từ trời xuống. Ai ăn bánh này, sẽ được sống muôn đời. (Ga 6,51)'
      },
      {
        dayNumber: 7,
        title: 'Ngày 7: Lời cầu bàu của Áp-ra-ham & Nguồn Nước Hằng Sống',
        passages: [
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '18-19', label: 'St 18-19' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '7', label: 'Tv 7' },
          { bookId: 'john', bookName: 'Gioan', chapters: '7', label: 'Ga 7' }
        ],
        objective: 'Học hỏi tinh thần chuyển cầu kiên trì cho tha nhân trước tôn nhan Thiên Chúa.',
        suggestion: 'Dành một lời nguyện chân thành cầu cho những người đang gặp gian nan thử thách.',
        focusVerse: 'Ai tin vào tôi, từ lòng người ấy sẽ tuôn chảy những dòng nước hằng sống. (Ga 7,38)'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. ĐỌC TÂN ƯỚC TRONG 90 NGÀY (27 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'plan-nt-90',
    slug: '90-ngay-kham-pha-tan-uoc',
    title: '90 Ngày Khám Phá Trọn Vẹn Tân Ước',
    subtitle: 'Đọc tuần tự toàn bộ 27 sách Tân Ước từ Mátthêu đến Khải Huyền',
    description: 'Chỉ với khoảng 3 chương mỗi ngày trong 3 tháng, bạn sẽ đọc hết toàn bộ 260 chương Tân Ước. Lý tưởng cho người bắt đầu hoặc muốn củng cố nền tảng Tin Mừng và giáo huấn các Tông Đồ.',
    durationDays: 90,
    category: 'NEW_TESTAMENT',
    categoryLabel: 'Tân Ước (27 Sách)',
    badge: 'Phổ Biến',
    days: [
      {
        dayNumber: 1,
        title: 'Ngày 1: Gia phả Đấng Cứu Thế & Biến cố Truyền tin cho Thánh Giuse',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '1-2', label: 'Mt 1-2' }
        ],
        objective: 'Nhận ra sự hoàn tất của các lời tiên tri Cựu Ước nơi sự Giáng Sinh của Đức Kitô.',
        suggestion: 'Học nơi Thánh Giuse tinh thần thinh lặng, tín thác và mau mắn thi hành ý Chúa.',
        focusVerse: 'Bà sẽ sinh con trai và ông phải đặt tên cho con trẻ là Giêsu, vì chính Người sẽ cứu dân Người khỏi tội lỗi của họ. (Mt 1,21)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Gioan Tẩy Giả, Phép Rửa & Cám dỗ trong hoang địa',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '3-4', label: 'Mt 3-4' }
        ],
        objective: 'Chiêm ngắm sự khiêm nhường của Chúa Giêsu khi chịu phép rửa và chiến thắng chước cám dỗ bằng Lời Chúa.',
        suggestion: 'Dùng Lời Chúa làm vũ khí thiêng liêng để chiến thắng những cám dỗ thường ngày.',
        focusVerse: 'Người ta sống không chỉ nhờ cơm bánh, nhưng còn nhờ mọi lời miệng Thiên Chúa phán ra. (Mt 4,4)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Bài Giảng Trên Núi - Bát Phúc & Muối Men Tin Mừng',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '5-6', label: 'Mt 5-6' }
        ],
        objective: 'Khắc ghi Hiến Chương Nước Trời và tinh thần khó nghèo trong lòng.',
        suggestion: 'Chọn 1 trong 8 mối phúc thật để thực hành cách cụ thể trong ngày hôm nay.',
        focusVerse: 'Trước hết hãy tìm kiếm Nước Thiên Chúa và đức công chính của Người, còn tất cả những thứ kia, Người sẽ thêm cho. (Mt 6,33)'
      },
      {
        dayNumber: 4,
        title: 'Ngày 4: Lời Cầu Nguyện Cha Chúng Con & Nền Tảng Trên Đá',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '7-8', label: 'Mt 7-8' }
        ],
        objective: 'Xây dựng cuộc đời trên nền đá tảng vững chắc của việc lắng nghe và thực hành Lời Chúa.',
        suggestion: 'Đọc kinh Lạy Cha thật chậm rãi, cảm nghiệm tình Cha yêu thương trìu mến.',
        focusVerse: 'Anh em cứ xin thì sẽ được, cứ tìm thì sẽ thấy, cứ gõ cửa thì sẽ mở ra cho. (Mt 7,7)'
      },
      {
        dayNumber: 5,
        title: 'Ngày 5: Lòng Thương Xót Cho Kẻ Tội Lỗi & Sứ Vụ Tông Đồ',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '9-10', label: 'Mt 9-10' }
        ],
        objective: 'Cảm nghiệm lòng thương xót chữa lành của Chúa và ý thức sứ vụ làm chứng nhân Tin Mừng.',
        suggestion: 'Cầu nguyện cho các linh mục, tu sĩ và những nhà truyền giáo đang dấn thân nơi vùng xa.',
        focusVerse: 'Lúa chín đầy đồng mà thợ gặt lại ít. Vậy anh em hãy xin chủ mùa gặt sai thợ ra gặt lúa về. (Mt 9,37-38)'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. ĐỌC BỐN SÁCH TIN MỪNG TRONG 30 NGÀY
  // --------------------------------------------------------------------------
  {
    id: 'plan-gospels-30',
    slug: '30-ngay-dong-hanh-voi-4-phuc-am',
    title: '30 Ngày Đồng Hành Với 4 Phúc Âm',
    subtitle: 'Chiêm ngắm cuộc đời, phép lạ và giáo huấn của Chúa Giêsu Kitô',
    description: 'Tập trung sâu sắc vào chân dung Đấng Cứu Thế qua 4 góc nhìn của các tác giả Tin Mừng: Mátthêu (Đấng Mêsia), Mác-cô (Đấng Tôi Tớ Uy Quyền), Luca (Đấng Cứu Độ Nhân Hậu) và Gioan (Ngôi Lời Nhập Thể).',
    durationDays: 30,
    category: 'GOSPELS',
    categoryLabel: '4 Sách Tin Mừng',
    badge: 'Trọng Tâm Đức Tin',
    days: [
      {
        dayNumber: 1,
        title: 'Ngày 1: Tin Mừng Khởi Đầu Theo Thánh Mác-cô',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '1-3', label: 'Mc 1-3' }
        ],
        objective: 'Lắng nghe lời hiệu triệu sám hối và tin vào Tin Mừng của Đức Giêsu.',
        suggestion: 'Xét mình vào cuối ngày để nhận ra những điều cần hoán cải đổi mới.',
        focusVerse: 'Thời kỳ đã mãn, và Triều Đại Thiên Chúa đã đến gần. Anh em hãy sám hối và tin vào Tin Mừng. (Mc 1,15)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Dụ Ngôn Hạt Giống & Quyền Năng Dẹp Yên Biển Động',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '4-6', label: 'Mc 4-6' }
        ],
        objective: 'Xua tan mọi lo âu sợ hãi vì có Chúa hiện diện cùng ta trên con thuyền cuộc đời.',
        suggestion: 'Khi gặp bão táp thử thách, hãy thưa thầm: "Lạy Chúa Giêsu, con tín thác vào Ngài".',
        focusVerse: 'Cứ yên tâm, chính Thầy đây, đừng sợ! (Mc 6,50)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Tuyên Xưng Đức Tin Của Phêrô & Biến Hình Trên Núi',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '7-9', label: 'Mc 7-9' }
        ],
        objective: 'Tuyên xưng Đức Giêsu là Đấng Kitô và sẵn sàng vác thập giá hằng ngày bước theo Ngài.',
        suggestion: 'Chiêm ngắm ánh sáng vinh quang của Chúa Biến Hình để có thêm sức mạnh vượt qua gian nan.',
        focusVerse: 'Ai muốn cứu mạng sống mình thì sẽ mất; còn ai liều mất mạng sống mình vì tôi và vì Tin Mừng, thì sẽ cứu được mạng sống ấy. (Mc 8,35)'
      },
      {
        dayNumber: 4,
        title: 'Ngày 4: Hôn Nhân, Trẻ Thơ & Đầy Tớ Phục Vụ',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '10-12', label: 'Mc 10-12' }
        ],
        objective: 'Học lấy trái tim người đầy tớ: lãnh đạo bằng cách phục vụ và trao hiến.',
        suggestion: 'Thực hiện một việc phục vụ âm thầm trong gia đình hoặc cộng đoàn.',
        focusVerse: 'Con Người đến không phải để được người ta phục vụ, nhưng là để phục vụ và hiến dâng mạng sống làm giá chuộc muôn người. (Mc 10,45)'
      },
      {
        dayNumber: 5,
        title: 'Ngày 5: Cuộc Khổ Nạn, Tử Nạn & Phục Sinh Vinh Hiển',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '13-16', label: 'Mc 13-16' }
        ],
        objective: 'Xác tín niềm tin vào mầu nhiệm Phục Sinh chiến thắng sự chết và mang lại sự sống muôn đời.',
        suggestion: 'Tuyên xưng niềm vui Phục Sinh qua nụ cười và tinh thần bác ái với những người xung quanh.',
        focusVerse: 'Người đã sống lại rồi, không còn ở đây nữa! (Mc 16,6)'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. ĐỌC THÁNH VỊNH CẦU NGUYỆN CÙNG HỘI THÁNH
  // --------------------------------------------------------------------------
  {
    id: 'plan-psalms-30',
    slug: '30-ngay-thanh-vinh-cau-nguyen',
    title: '30 Ngày Thánh Vịnh Cầu Nguyện Cùng Hội Thánh',
    subtitle: '150 bài thánh vịnh - Lời cầu nguyện hoàn hảo của Dân Chúa',
    description: 'Thánh vịnh là cuốn sách kinh nguyện chính thức của Phụng Vụ Giờ Kinh. 30 ngày cầu nguyện đưa tâm hồn qua mọi cung bậc: từ ca tụng Thiên Chúa uy linh, cảm tạ hồng ân, đến thống hối tội lỗi và nương náu trong giông bão.',
    durationDays: 30,
    category: 'PSALMS',
    categoryLabel: '150 Thánh Vịnh',
    badge: 'Cầu Nguyện Chiêm Niệm',
    days: [
      {
        dayNumber: 1,
        title: 'Ngày 1: Hai Con Đường & Lời Cầu Trong Đêm Tối',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '1-5', label: 'Tv 1-5' }
        ],
        objective: 'Lựa chọn con đường công chính của người yêu mến Luật Chúa suốt đêm ngày.',
        suggestion: 'Đọc Thánh Vịnh 1 trước khi đi ngủ để tâm hồn được nghỉ ngơi bình an trong tay Chúa.',
        focusVerse: 'Phúc thay người chẳng nghe theo lời bọn ác nhân... nhưng vui thú với luật pháp Chúa, nhẩm đi nhẩm lại suốt đêm ngày. (Tv 1,1-2)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Lời Khẩn Cầu Khi Nguy Nan & Danh Chúa Uy Linh',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '6-10', label: 'Tv 6-10' }
        ],
        objective: 'Ca ngợi uy danh Thiên Chúa rạng ngời trên khắp cõi trời đất.',
        suggestion: 'Ngước nhìn bầu trời đêm và suy niệm Thánh Vịnh 8 về phẩm giá diệu kỳ Chúa ban cho con người.',
        focusVerse: 'Lạy Đức Chúa là Chúa chúng con, lẫy lừng thay danh Chúa trên khắp cả địa cầu! (Tv 8,2)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Nơi Nương Tựa Vững Bền & Phần Gia Nghiệp Duy Nhất',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '11-16', label: 'Tv 11-16' }
        ],
        objective: 'Nhận biết Chúa là gia nghiệp và chén phúc lộc duy nhất thỏa mãn mọi ước vọng của ta.',
        suggestion: 'Phó thác cho Chúa những dự định tương lai và xin Ngài làm hoa tiêu dẫn lối.',
        focusVerse: 'Lạy Đức Chúa, Chúa là phần sản nghiệp con được hưởng, là chén phúc lộc dành cho con; số mạng con, chính Ngài nắm giữ. (Tv 16,5)'
      },
      {
        dayNumber: 4,
        title: 'Ngày 4: Chúa Là Núi Đá Cứu Độ & Vinh Quang Sáng Tạo',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '17-21', label: 'Tv 17-21' }
        ],
        objective: 'Cảm tạ Thiên Chúa đã luôn là khiên che thuẫn đỡ trong những cơn hiểm nghèo.',
        suggestion: 'Cầu nguyện cho những người đang bị áp bức, xin Chúa là núi đá chở che cho họ.',
        focusVerse: 'Trời xanh tường thuật vinh quang Thiên Chúa, không trung loan báo việc tay Người làm. (Tv 19,2)'
      },
      {
        dayNumber: 5,
        title: 'Ngày 5: Người Tôi Tớ Khổ Nạn & Chúa Là Mục Tử Nhân Lành',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '22-25', label: 'Tv 22-25' }
        ],
        objective: 'Tín thác tuyệt đối vào sự chăm sóc của Mục Tử Nhân Lành Giêsu.',
        suggestion: 'Đọc thuộc lòng Thánh Vịnh 23 để luôn cảm nhận sự bình an giữa thung lũng nước mắt.',
        focusVerse: 'Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì. Trong đồng cỏ xanh tươi, Người cho tôi nằm nghỉ. (Tv 23,1-2)'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 5. ĐỌC KINH THÁNH THEO CHỦ ĐỀ: ĐỨC TIN, HY VỌNG & BÁC ÁI
  // --------------------------------------------------------------------------
  {
    id: 'plan-thematic-faith',
    slug: '14-ngay-cung-co-duc-tin-va-hy-vong',
    title: '14 Ngày Củng Cố Đức Tin & Niềm Hy Vọng',
    subtitle: 'Tuyển chọn những đoạn Kinh Thánh nền tảng về ơn cứu độ và tình yêu Thiên Chúa',
    description: 'Kế hoạch học hỏi theo chủ đề giúp thắp sáng niềm tin và cậy trông giữa những thách đố trần thế. Tập trung vào các mẫu gương đức tin (Áp-ra-ham, Mẹ Maria, Thánh Phaolô) và các lời hứa trung tín của Thiên Chúa.',
    durationDays: 14,
    category: 'THEMATIC_TOPIC',
    categoryLabel: 'Chủ Đề Thần Học',
    badge: 'Chuyên Đề',
    days: [
      {
        dayNumber: 1,
        title: 'Ngày 1: Bản Chất Của Đức Tin & Mẫu Gương Tổ Phụ Áp-ra-ham',
        passages: [
          { bookId: 'heb', bookName: 'Do Thái', chapters: '11', label: 'Dt 11' },
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '15', label: 'St 15' }
        ],
        objective: 'Hiểu rằng đức tin là bảo đảm cho những điều ta hy vọng, là bằng chứng cho những thực tại vô hình.',
        suggestion: 'Dâng lên Chúa những hoài nghi trong lòng và xin Người gia tăng lòng tin cho ta.',
        focusVerse: 'Đức tin là bảo đảm cho những điều ta hy vọng, là bằng chứng cho những điều ta không thấy. (Dt 11,1)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Tiếng "Xin Vâng" Của Đức Maria & Bài Ca Magnificat',
        passages: [
          { bookId: 'luke', bookName: 'Luca', chapters: '1', label: 'Lc 1' }
        ],
        objective: 'Học nơi Mẹ Maria thái độ hoàn toàn mở lòng để Lời Chúa được thực hiện nơi mình.',
        suggestion: 'Đọc kinh Truyền Tin vào buổi trưa hoặc tối với trọn lòng tôn kính.',
        focusVerse: 'Vâng, tôi đây là nữ tỳ của Chúa, xin Chúa cứ làm cho tôi như lời sứ thần nói. (Lc 1,38)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Niềm Hy Vọng Không Làm Thất Vọng Vì Tình Yêu Đổ Tràn',
        passages: [
          { bookId: 'rom', bookName: 'Rôma', chapters: '5', label: 'Rm 5' },
          { bookId: 'rom', bookName: 'Rôma', chapters: '8', label: 'Rm 8' }
        ],
        objective: 'Xác tín không điều gì có thể tách ta ra khỏi tình yêu của Thiên Chúa trong Đức Kitô.',
        suggestion: 'Mỗi khi chán nản, hãy nhẩm câu: "Thiên Chúa phù trợ chúng ta, ai có thể chống lại chúng ta?".',
        focusVerse: 'Trông cậy như thế, chúng ta sẽ không phải thất vọng, vì tình yêu Thiên Chúa đã được đổ vào lòng chúng ta nhờ Thánh Thần. (Rm 5,5)'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 6. ĐỌC THEO MÙA PHỤNG VỤ: MÙA CHAY & PHỤC SINH
  // --------------------------------------------------------------------------
  {
    id: 'plan-liturgical-lent',
    slug: '40-ngay-mua-chay-thap-gia-phuc-sinh',
    title: '40 Ngày Mùa Chay - Từ Thập Giá Đến Ánh Sáng Phục Sinh',
    subtitle: 'Hành trình sám hối, thanh luyện tâm hồn và chiêm ngắm Đức Kitô',
    description: 'Đồng hành cùng Đức Kitô trong 40 ngày nơi sa mạc, chiêm ngắm cuộc Khổ Nạn của Đấng Cứu Độ và chuẩn bị tâm hồn xứng đáng đón nhận ân sủng Đêm Vọng Phục Sinh.',
    durationDays: 40,
    category: 'LITURGICAL_SEASON',
    categoryLabel: 'Mùa Phụng Vụ',
    badge: 'Mùa Chay Thánh',
    days: [
      {
        dayNumber: 1,
        title: 'Thứ Tư Lễ Tro: Hãy Xé Lòng, Đừng Xé Áo',
        passages: [
          { bookId: 'joel', bookName: 'Giô-en', chapters: '2', label: 'Ge 2' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '51', label: 'Tv 51' },
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '6', label: 'Mt 6' }
        ],
        objective: 'Bước vào Mùa Chay bằng tinh thần ăn năn sám hối nội tâm đích thực.',
        suggestion: 'Thực thi một việc hãm mình kín đáo (bớt cà phê, mạng xã hội) và dành tiền giúp người nghèo.',
        focusVerse: 'Lạy Thiên Chúa, xin lấy lòng nhân hậu xót thương con, mở lượng hải hà xoá tội con đã phạm. (Tv 51,3)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Chọn Lựa Giữa Sự Sống Và Cái Chết',
        passages: [
          { bookId: 'deut', bookName: 'Đệ Nhị Luật', chapters: '30', label: 'Đnl 30' },
          { bookId: 'luke', bookName: 'Luca', chapters: '9', label: 'Lc 9' }
        ],
        objective: 'Dứt khoát chọn Chúa làm ưu tiên số một trên mọi giá trị trần thế.',
        suggestion: 'Vui lòng đón nhận một sự trái ý trong ngày như một cử chỉ vác thập giá theo chân Chúa.',
        focusVerse: 'Ai muốn theo tôi, phải từ bỏ chính mình, vác thập giá mình hằng ngày mà theo. (Lc 9,23)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Ăn Chay Đẹp Lòng Thiên Chúa',
        passages: [
          { bookId: 'isa', bookName: 'Isaia', chapters: '58', label: 'Is 58' },
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '9', label: 'Mt 9' }
        ],
        objective: 'Liên kết việc ăn chay hãm mình với hành vi công bằng và bác ái cụ thể.',
        suggestion: 'Mỉm cười và nói lời tử tế hòa giải với một người từng làm bạn tổn thương.',
        focusVerse: 'Cách ăn chay mà Ta ưa thích chẳng phải là thế này sao: mở xiềng xích bất công, chia cơm cho người đói rách? (Is 58,6-7)'
      }
    ]
  }
];

export function getReadingPlanById(id: string): ReadingPlanItem | null {
  return READING_PLANS_DATABASE.find(p => p.id === id) || null;
}
