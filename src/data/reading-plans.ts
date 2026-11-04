// ============================================================================
// HỆ THỐNG KẾ HOẠCH ĐỌC KINH THÁNH CÔNG GIÁO
// Nền tảng "Lời Chúa Mỗi Ngày"
// ============================================================================

import { ReadingPlanItem } from '@/types';

export const READING_PLANS_DATABASE: ReadingPlanItem[] = [
  {
    id: 'plan-365',
    slug: 'toan-bo-kinh-thanh-365-ngay',
    title: 'Toàn Bộ Kinh Thánh Trong 365 Ngày',
    subtitle: 'Hành trình trọn vẹn khám phá 73 sách Cựu Ước và Tân Ước trong một năm',
    description: 'Kế hoạch kinh điển giúp người Kitô hữu nuôi dưỡng đời sống thiêng liêng mỗi ngày. Mỗi ngày gồm một đoạn Cựu Ước, một Thánh Vịnh/Khôn Ngoan và một đoạn Tân Ước, kết nối liên tục Lịch sử Cứu độ.',
    durationDays: 365,
    category: 'ALL_BIBLE',
    categoryLabel: 'Toàn Bộ 73 Sách',
    badge: 'Kinh Điển',
    days: [
      {
        dayNumber: 1,
        title: 'Ngày 1: Khởi nguyên công trình Sáng Tạo & Lời Tựa Tin Mừng',
        passages: [
          { bookId: 'gen', bookName: 'Sáng Thế', chapters: '1-2', label: 'St 1-2' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '1', label: 'Tv 1' },
          { bookId: 'john', bookName: 'Gioan', chapters: '1', label: 'Ga 1' }
        ],
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
        focusVerse: 'Ai tin vào tôi, từ lòng người ấy sẽ tuôn chảy những dòng nước hằng sống. (Ga 7,38)'
      }
    ]
  },
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
        focusVerse: 'Bà sẽ sinh con trai và ông phải đặt tên cho con trẻ là Giêsu, vì chính Người sẽ cứu dân Người khỏi tội lỗi của họ. (Mt 1,21)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Gioan Tẩy Giả, Phép Rửa & Cám dỗ trong hoang địa',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '3-4', label: 'Mt 3-4' }
        ],
        focusVerse: 'Người ta sống không chỉ nhờ cơm bánh, nhưng còn nhờ mọi lời miệng Thiên Chúa phán ra. (Mt 4,4)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Bài Giảng Trên Núi - Bát Phúc & Muối Men Tin Mừng',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '5-6', label: 'Mt 5-6' }
        ],
        focusVerse: 'Trước hết hãy tìm kiếm Nước Thiên Chúa và đức công chính của Người, còn tất cả những thứ kia, Người sẽ thêm cho. (Mt 6,33)'
      },
      {
        dayNumber: 4,
        title: 'Ngày 4: Lời Cầu Nguyện Cha Chúng Con & Nền Tảng Trên Đá',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '7-8', label: 'Mt 7-8' }
        ],
        focusVerse: 'Anh em cứ xin thì sẽ được, cứ tìm thì sẽ thấy, cứ gõ cửa thì sẽ mở ra cho. (Mt 7,7)'
      },
      {
        dayNumber: 5,
        title: 'Ngày 5: Lòng Thương Xót Cho Kẻ Tội Lỗi & Sứ Vụ Tông Đồ',
        passages: [
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '9-10', label: 'Mt 9-10' }
        ],
        focusVerse: 'Lúa chín đầy đồng mà thợ gặt lại ít. Vậy anh em hãy xin chủ mùa gặt sai thợ ra gặt lúa về. (Mt 9,37-38)'
      }
    ]
  },
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
        focusVerse: 'Thời kỳ đã mãn, và Triều Đại Thiên Chúa đã đến gần. Anh em hãy sám hối và tin vào Tin Mừng. (Mc 1,15)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Dụ Ngôn Hạt Giống & Quyền Năng Dẹp Yên Biển Động',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '4-6', label: 'Mc 4-6' }
        ],
        focusVerse: 'Cứ yên tâm, chính Thầy đây, đừng sợ! (Mc 6,50)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Tuyên Xưng Đức Tin Của Phêrô & Biến Hình Trên Núi',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '7-9', label: 'Mc 7-9' }
        ],
        focusVerse: 'Ai muốn cứu mạng sống mình thì sẽ mất; còn ai liều mất mạng sống mình vì tôi và vì Tin Mừng, thì sẽ cứu được mạng sống ấy. (Mc 8,35)'
      },
      {
        dayNumber: 4,
        title: 'Ngày 4: Hôn Nhân, Trẻ Thơ & Đầy Tớ Phục Vụ',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '10-12', label: 'Mc 10-12' }
        ],
        focusVerse: 'Con Người đến không phải để được người ta phục vụ, nhưng là để phục vụ và hiến dâng mạng sống làm giá chuộc muôn người. (Mc 10,45)'
      },
      {
        dayNumber: 5,
        title: 'Ngày 5: Cuộc Khổ Nạn, Tử Nạn & Phục Sinh Vinh Hiển',
        passages: [
          { bookId: 'mark', bookName: 'Mác-cô', chapters: '13-16', label: 'Mc 13-16' }
        ],
        focusVerse: 'Người đã sống lại rồi, không còn ở đây nữa! (Mc 16,6)'
      }
    ]
  },
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
        focusVerse: 'Phúc thay người chẳng nghe theo lời bọn ác nhân... nhưng vui thú với luật pháp Chúa, nhẩm đi nhẩm lại suốt đêm ngày. (Tv 1,1-2)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Lời Khẩn Cầu Khi Nguy Nan & Danh Chúa Uy Linh',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '6-10', label: 'Tv 6-10' }
        ],
        focusVerse: 'Lạy Đức Chúa là Chúa chúng con, lẫy lừng thay danh Chúa trên khắp cả địa cầu! (Tv 8,2)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Nơi Nương Tựa Vững Bền & Phần Gia Nghiệp Duy Nhất',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '11-16', label: 'Tv 11-16' }
        ],
        focusVerse: 'Lạy Đức Chúa, Chúa là phần sản nghiệp con được hưởng, là chén phúc lộc dành cho con; số mạng con, chính Ngài nắm giữ. (Tv 16,5)'
      },
      {
        dayNumber: 4,
        title: 'Ngày 4: Chúa Là Núi Đá Cứu Độ & Vinh Quang Sáng Tạo',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '17-21', label: 'Tv 17-21' }
        ],
        focusVerse: 'Trời xanh tường thuật vinh quang Thiên Chúa, không trung loan báo việc tay Người làm. (Tv 19,2)'
      },
      {
        dayNumber: 5,
        title: 'Ngày 5: Người Tôi Tớ Khổ Nạn & Chúa Là Mục Tử Nhân Lành',
        passages: [
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '22-25', label: 'Tv 22-25' }
        ],
        focusVerse: 'Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì. Trong đồng cỏ xanh tươi, Người cho tôi nằm nghỉ. (Tv 23,1-2)'
      }
    ]
  },
  {
    id: 'plan-lent-40',
    slug: '40-ngay-mua-chay-thap-gia-phuc-sinh',
    title: '40 Ngày Mùa Chay - Từ Thập Giá Đến Ánh Sáng Phục Sinh',
    subtitle: 'Hành trình sám hối, thanh luyện tâm hồn và chiêm ngắm Đức Kitô',
    description: 'Đồng hành cùng Đức Kitô trong 40 ngày nơi sa mạc, chiêm ngắm cuộc Khổ Nạn của Đấng Cứu Độ và chuẩn bị tâm hồn xứng đáng đón nhận ân sủng Đêm Vọng Phục Sinh.',
    durationDays: 40,
    category: 'THEMATIC',
    categoryLabel: 'Mùa Chay & Phục Sinh',
    badge: 'Mùa Phụng Vụ',
    days: [
      {
        dayNumber: 1,
        title: 'Thứ Tư Lễ Tro: Hãy Xé Lòng, Đừng Xé Áo',
        passages: [
          { bookId: 'joel', bookName: 'Giô-en', chapters: '2', label: 'Ge 2' },
          { bookId: 'ps', bookName: 'Thánh Vịnh', chapters: '51', label: 'Tv 51' },
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '6', label: 'Mt 6' }
        ],
        focusVerse: 'Lạy Thiên Chúa, xin lấy lòng nhân hậu xót thương con, mở lượng hải hà xoá tội con đã phạm. (Tv 51,3)'
      },
      {
        dayNumber: 2,
        title: 'Ngày 2: Chọn Lựa Giữa Sự Sống Và Cái Chết',
        passages: [
          { bookId: 'deut', bookName: 'Đệ Nhị Luật', chapters: '30', label: 'Đnl 30' },
          { bookId: 'luke', bookName: 'Luca', chapters: '9', label: 'Lc 9' }
        ],
        focusVerse: 'Ai muốn theo tôi, phải từ bỏ chính mình, vác thập giá mình hằng ngày mà theo. (Lc 9,23)'
      },
      {
        dayNumber: 3,
        title: 'Ngày 3: Ăn Chay Đẹp Lòng Thiên Chúa',
        passages: [
          { bookId: 'isa', bookName: 'Isaia', chapters: '58', label: 'Is 58' },
          { bookId: 'matt', bookName: 'Mátthêu', chapters: '9', label: 'Mt 9' }
        ],
        focusVerse: 'Cách ăn chay mà Ta ưa thích chẳng phải là thế này sao: mở xiềng xích bất công, chia cơm cho người đói rách? (Is 58,6-7)'
      }
    ]
  }
];
