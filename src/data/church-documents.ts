import { ChurchDocumentItem, DocumentCategory } from '@/types';

// ============================================================================
// HỆ THỐNG DANH MỤC 9 NHÓM VĂN KIỆN HỘI THÁNH CÔNG GIÁO
// ============================================================================
export const CHURCH_DOCUMENT_CATEGORIES: { id: DocumentCategory; name: string; description: string }[] = [
  { id: 'VATICAN_II', name: 'Công đồng Vaticanô II', description: '4 Hiến chế nền tảng và các Sắc lệnh canh tân đời sống Hội Thánh' },
  { id: 'POPE_TEACHINGS', name: 'Giáo huấn của các Đức Giáo hoàng', description: 'Các Thông điệp, Tông huấn và Tông thư của các vị Kế nhiệm Thánh Phêrô' },
  { id: 'SOCIAL_DOCTRINE', name: 'Học thuyết Xã hội Công giáo', description: 'Phẩm giá con người, lao động, công bằng xã hội và thiện ích chung' },
  { id: 'LITURGY', name: 'Phụng vụ', description: 'Hiến chế Phụng vụ, đào tạo và cử hành các Mầu nhiệm Thánh' },
  { id: 'DOCTRINE_FAITH', name: 'Giáo lý và đức tin', description: 'Tuyên ngôn đức tin, sự hài hòa giữa Đức tin và Lý trí, Mạc khải' },
  { id: 'FAMILY_HUMAN_DIGNITY', name: 'Gia đình và phẩm giá con người', description: 'Hôn nhân Kitô giáo, bảo vệ sự sống và tình yêu gia đình' },
  { id: 'VOCATION_CONSECRATED', name: 'Ơn gọi và đời sống thánh hiến', description: 'Đào tạo linh mục, đời sống tu trì và linh đạo dâng hiến' },
  { id: 'MISSION_EVANGELIZATION', name: 'Truyền giáo và loan báo Tin Mừng', description: 'Sứ mạng đến với muôn dân và tân phúc âm hóa' },
  { id: 'ECOLOGY_ENVIRONMENT', name: 'Môi trường và sinh thái toàn diện', description: 'Chăm sóc Ngôi Nhà Chung, công bằng liên thế hệ và hoán cải sinh thái' }
];

// ============================================================================
// THƯ VIỆN VĂN KIỆN HỘI THÁNH CÔNG GIÁO CHUẨN MỰC
// ============================================================================
export const CHURCH_DOCUMENTS_DATABASE: ChurchDocumentItem[] = [
  // --------------------------------------------------------------------------
  // 1. CÔNG ĐỒNG VATICANÔ II
  // --------------------------------------------------------------------------
  {
    id: 'dei-verbum',
    category: 'VATICAN_II',
    categoryName: 'Công đồng Vaticanô II',
    title: 'Dei Verbum',
    latinTitle: 'Dei Verbum',
    vietnameseTitle: 'Hiến Chế Tín Lý Về Mạc Khải Của Thiên Chúa',
    documentType: 'Hiến Chế Tín Lý',
    promulgator: 'Thánh Giáo Hoàng Phaolô VI & Các Nghị phụ Công đồng',
    author: 'Công đồng Vaticanô II',
    promulgationDate: '18/11/1965',
    year: '1965',
    historicalContext: 'Được ban hành trong khóa họp thứ 4 của Công đồng Vaticanô II, tái khẳng định vị trí trung tâm của Lời Chúa trong đời sống Hội Thánh sau nhiều thế kỷ thần học kinh viện.',
    purpose: 'Trình bày giáo lý đích thực về Mạc khải thần linh và việc lưu truyền Lời Chúa, để nhờ lắng nghe sứ điệp cứu độ, toàn thể thế giới tin tưởng, hy vọng và yêu mến.',
    mainThemes: [
      'Bản chất tự mạc khải của Thiên Chúa qua Đức Kitô',
      'Sự liên kết chặt chẽ giữa Thánh Truyền và Thánh Kinh',
      'Huấn quyền là tôi tớ phục vụ Lời Chúa',
      'Đọc Kinh Thánh trong lòng Hội Thánh và dưới sự hướng dẫn của Thánh Thần'
    ],
    mainTheme: 'Mạc khải thần linh và Lời Chúa trong đời sống Hội Thánh',
    structure: 'Gồm Lời mở đầu và 6 chương: I. Chính Mạc Khải; II. Việc lưu truyền Mạc Khải; III. Sự linh hứng và giải thích Thánh Kinh; IV. Cựu Ước; V. Tân Ước; VI. Thánh Kinh trong đời sống Hội Thánh.',
    summary: 'Hiến chế khẳng định Thánh Kinh là Lời Thiên Chúa được ghi chép lại dưới sự linh hứng của Chúa Thánh Thần. Bản văn Kinh Thánh phải được tôn kính ngang hàng với Mình Thánh Chúa (DV 21). Mọi người tín hữu, đặc biệt là các thừa tác viên, phải siêng năng tiếp xúc với Lời Chúa qua việc đọc Kinh Thánh có cầu nguyện (Lectio Divina).',
    keySections: [
      {
        number: 'Số 2',
        heading: 'Bản chất và đối tượng của Mạc Khải',
        excerpt: 'Thiên Chúa vô hình, trong tình yêu bao la của Người, đã ngỏ lời với loài người như với bạn hữu và chuyện trò với họ, để mời gọi và đón nhận họ vào cuộc sống hiệp thông với Người.',
        biblicalRoot: ['Xh 33,11', 'Ga 15,14-15', '1 Tm 6,16'],
        theologicalKey: 'Mạc khải là một cuộc đối thoại yêu thương ngôi vị, không đơn thuần là tập hợp các mệnh đề trừu tượng.'
      },
      {
        number: 'Số 9',
        heading: 'Tương quan giữa Thánh Truyền và Thánh Kinh',
        excerpt: 'Thánh Truyền và Thánh Kinh liên kết và phối hợp chặt chẽ với nhau: bởi vì cả hai đều phát xuất từ cùng một nguồn suối thần linh, kết hợp lại thành một và cùng quy về một mục đích.',
        biblicalRoot: ['2 Tx 2,15', '2 Tm 1,14'],
        theologicalKey: 'Kho tàng đức tin duy nhất (Depositum Fidei) được gìn giữ trong cả Thánh Truyền và Thánh Kinh.'
      },
      {
        number: 'Số 21',
        heading: 'Hội Thánh tôn kính Thánh Kinh',
        excerpt: 'Hội Thánh luôn luôn tôn kính Thánh Kinh như chính Thân Thể Chúa, nhất là trong Phụng vụ thánh, Hội Thánh không ngừng lấy bánh ban sự sống từ bàn tiệc Lời Chúa cũng như từ bàn tiệc Mình Chúa Kitô để trao ban cho các tín hữu.',
        biblicalRoot: ['Ga 6,51', 'Mt 4,4'],
        theologicalKey: 'Bàn tiệc Lời Chúa và Bàn tiệc Thánh Thể là hai nguồn nuôi dưỡng linh hồn người Kitô hữu.'
      }
    ],
    keyQuotes: [
      { number: 'DV 21', text: 'Hội Thánh luôn luôn tôn kính Thánh Kinh như chính Thân Thể Chúa.' },
      { number: 'DV 25', text: 'Không biết Thánh Kinh là không biết Chúa Kitô (Thánh Giêrônimô).' }
    ],
    scriptureConnections: ['Ga 1,1-18', '2 Tm 3,15-17', 'Dt 4,12'],
    topics: ['Mạc khải', 'Kinh Thánh', 'Thánh Truyền', 'Huấn quyền', 'Lectio Divina'],
    officialSource: 'Vatican.va (Constitutio Dogmatica Dei Verbum)'
  },
  {
    id: 'lumen-gentium',
    category: 'VATICAN_II',
    categoryName: 'Công đồng Vaticanô II',
    title: 'Lumen Gentium',
    latinTitle: 'Lumen Gentium',
    vietnameseTitle: 'Hiến Chế Tín Lý Về Hội Thánh',
    documentType: 'Hiến Chế Tín Lý',
    promulgator: 'Thánh Giáo Hoàng Phaolô VI & Các Nghị phụ Công đồng',
    author: 'Công đồng Vaticanô II',
    promulgationDate: '21/11/1964',
    year: '1964',
    historicalContext: 'Văn kiện nền tảng tái định nghĩa bản chất và sứ mạng của Hội Thánh trong thế giới hiện đại.',
    purpose: 'Làm sáng tỏ bản chất của Hội Thánh là Bí tích cứu độ toàn cầu và là Dân Thiên Chúa lữ hành.',
    mainThemes: [
      'Mầu nhiệm Hội Thánh',
      'Dân Thiên Chúa và Chức tư tế cộng đồng',
      'Giám mục đoàn và tính hiệp hành',
      'Ơn gọi nên thánh phổ quát',
      'Đức Maria trong mầu nhiệm Đức Kitô và Hội Thánh'
    ],
    mainTheme: 'Bản chất Bí tích và Ơn gọi nên thánh của Dân Thiên Chúa',
    structure: 'Gồm 8 chương: I. Mầu nhiệm Hội Thánh; II. Dân Thiên Chúa; III. Cơ cấu phẩm trật; IV. Giáo dân; V. Ơn gọi nên thánh phổ quát; VI. Tu sĩ; VII. Đặc tính cánh chung của Hội Thánh lữ hành; VIII. Đức Trinh Nữ Maria.',
    summary: 'Đức Kitô là Ánh Sáng Muôn Dân (Lumen Gentium). Hội Thánh trong Đức Kitô như một bí tích, nghĩa là dấu chỉ và khí cụ kết hợp mật thiết với Thiên Chúa và hiệp nhất toàn thể nhân loại. Tất cả mọi Kitô hữu đều được kêu gọi nên thánh trọn lành trong bậc sống của mình.',
    keySections: [
      {
        number: 'Số 1',
        heading: 'Hội Thánh là Bí tích phổ quát',
        excerpt: 'Đức Kitô là Ánh Sáng muôn dân... Hội Thánh như một bí tích hay dấu chỉ và khí cụ kết hợp mật thiết với Thiên Chúa và hiệp nhất toàn thể nhân loại.',
        biblicalRoot: ['Lc 2,32', 'Ep 1,9-10'],
        theologicalKey: 'Giáo Hội học bí tích.'
      },
      {
        number: 'Số 39',
        heading: 'Ơn gọi nên thánh phổ quát',
        excerpt: 'Mọi người trong Hội Thánh, dù thuộc phẩm trật hay được phẩm trật coi sóc, đều được mời gọi nên thánh theo lời Thánh Tông Đồ: "Ý muốn của Thiên Chúa là anh em phải nên thánh" (1 Tx 4,3).',
        biblicalRoot: ['1 Tx 4,3', 'Ep 1,4', 'Mt 5,48'],
        theologicalKey: 'Sự thánh thiện là ơn gọi của mọi người đã lãnh nhận phép Rửa.'
      }
    ],
    keyQuotes: [
      { number: 'LG 1', text: 'Hội Thánh là bí tích hay dấu chỉ và khí cụ kết hợp mật thiết với Thiên Chúa.' },
      { number: 'LG 39', text: 'Mọi tín hữu ở bất cứ bậc sống nào đều được kêu gọi đạt tới sự thánh thiện trọn lành.' }
    ],
    scriptureConnections: ['1 Pr 2,9-10', '1 Cr 12,12-27'],
    topics: ['Hội Thánh', 'Dân Thiên Chúa', 'Ơn gọi nên thánh', 'Đức Maria', 'Hiệp hành'],
    officialSource: 'Vatican.va (Constitutio Dogmatica Lumen Gentium)'
  },
  {
    id: 'gaudium-et-spes',
    category: 'VATICAN_II',
    categoryName: 'Công đồng Vaticanô II',
    title: 'Gaudium et Spes',
    latinTitle: 'Gaudium et Spes',
    vietnameseTitle: 'Hiến Chế Mục Vụ Về Hội Thánh Trong Thế Giới Ngày Nay',
    documentType: 'Hiến Chế Mục Vụ',
    promulgator: 'Thánh Giáo Hoàng Phaolô VI & Các Nghị phụ Công đồng',
    author: 'Công đồng Vaticanô II',
    promulgationDate: '07/12/1965',
    year: '1965',
    historicalContext: 'Được ban hành trong những ngày bế mạc Công đồng, mở ra kỷ nguyên đối thoại chân thành giữa Hội Thánh và thế giới hiện đại.',
    purpose: 'Chia sẻ niềm vui và hy vọng, ưu sầu và lo âu của con người ngày nay, đặc biệt là người nghèo khó.',
    mainThemes: [
      'Phẩm giá con người được tạo dựng theo hình ảnh Thiên Chúa',
      'Cộng đồng nhân loại và tinh thần liên đới',
      'Ý nghĩa hoạt động trần thế của con người',
      'Hòa bình thế giới và công bằng kinh tế xã hội'
    ],
    mainTheme: 'Sứ mạng đồng hành và đối thoại của Hội Thánh giữa lòng thế giới',
    structure: 'Gồm Lời dẫn và 2 phần: Phần I: Hội Thánh và ơn gọi con người; Phần II: Một số vấn đề khẩn thiết (Hôn nhân gia đình, Văn hóa, Kinh tế xã hội, Chính trị, Hòa bình quốc tế).',
    summary: 'Niềm vui và hy vọng, ưu sầu và âu lo của con người ngày nay, nhất là của người nghèo hay đau khổ, cũng chính là niềm vui và hy vọng, ưu sầu và âu lo của các môn đệ Chúa Kitô (GS 1). Mầu nhiệm con người chỉ thực sự được sáng tỏ trong mầu nhiệm Ngôi Lời Nhập Thể (GS 22).',
    keySections: [
      {
        number: 'Số 1',
        heading: 'Sự liên đới thâm sâu với nhân loại',
        excerpt: 'Vui mừng và hy vọng, ưu sầu và lo âu của con người ngày nay, nhất là của người nghèo và những ai đau khổ, cũng là vui mừng và hy vọng, ưu sầu và lo âu của các môn đệ Chúa Kitô.',
        biblicalRoot: ['Rm 12,15', 'Lc 4,18-19'],
        theologicalKey: 'Hội Thánh nhập thể giữa lòng lịch sử nhân loại.'
      },
      {
        number: 'Số 22',
        heading: 'Đức Kitô mạc khải trọn vẹn con người cho chính con người',
        excerpt: 'Trong thực tế, mầu nhiệm về con người chỉ thực sự được sáng tỏ trong mầu nhiệm của Ngôi Lời nhập thể... Đức Kitô, Adong mới, trong khi mạc khải mầu nhiệm Chúa Cha và tình yêu của Người, đã biểu lộ trọn vẹn con người cho chính con người.',
        biblicalRoot: ['Cl 1,15', '1 Cr 15,45'],
        theologicalKey: 'Kitô học là chìa khóa giải thích nhân học Kitô giáo.'
      }
    ],
    scriptureConnections: ['St 1,26-27', 'Mt 25,31-46', 'Rm 8,19-23'],
    topics: ['Phẩm giá con người', 'Hòa bình', 'Văn hóa', 'Kinh tế', 'Gia đình'],
    officialSource: 'Vatican.va (Constitutio Pastoralis Gaudium et Spes)'
  },

  // --------------------------------------------------------------------------
  // 2. GIÁO HUẤN CỦA CÁC ĐỨC GIÁO HOÀNG
  // --------------------------------------------------------------------------
  {
    id: 'verbum-domini',
    category: 'POPE_TEACHINGS',
    categoryName: 'Giáo huấn của các Đức Giáo hoàng',
    title: 'Verbum Domini',
    latinTitle: 'Verbum Domini',
    vietnameseTitle: 'Tông Huấn Lời Chúa Trong Đời Sống Và Sứ Mạng Của Hội Thánh',
    documentType: 'Tông Huấn Hậu Thượng Hội Đồng',
    promulgator: 'Đức Giáo Hoàng Biển Đức XVI',
    author: 'Đức Biển Đức XVI',
    promulgationDate: '30/09/2010',
    year: '2010',
    historicalContext: 'Đúc kết từ Thượng Hội Đồng Giám Mục thế giới lần thứ XII (2008) về Lời Chúa.',
    purpose: 'Tái khám phá Lời Chúa như nguồn mạch của sự canh tân liên lỉ cho Hội Thánh và việc loan báo Tin Mừng.',
    mainThemes: [
      'Thiên Chúa là Đấng ngỏ Lời yêu thương',
      'Mối liên hệ giữa Thánh Thể và Lời Chúa',
      'Đọc Kinh Thánh trong đức tin của Hội Thánh',
      'Phương pháp thực hành Lectio Divina'
    ],
    mainTheme: 'Ngôi Lời Nhập Thể và linh đạo tiếp cận Thánh Kinh',
    structure: 'Gồm 3 phần: Phần I: Lời Thiên Chúa (Verbum Dei); Phần II: Lời trong Hội Thánh (Verbum in Ecclesia); Phần III: Lời cho thế giới (Verbum Mundo).',
    summary: 'Đức Biển Đức XVI nhấn mạnh Kitô giáo không phải là một "tôn giáo của cuốn sách" mà là tôn giáo của Lời Thiên Chúa Nhập Thể nơi Đức Giêsu Kitô. Tông huấn hướng dẫn chi tiết các bước Lectio Divina (Đọc, Suy niệm, Cầu nguyện, Chiêm niệm, Hành động).',
    keySections: [
      {
        number: 'Số 7',
        heading: 'Thiên Chúa ngỏ Lời với con người',
        excerpt: 'Kitô giáo không phải là một tôn giáo của một cuốn sách: Kitô giáo là tôn giáo của Lời Thiên Chúa, không phải của một lời được viết ra và câm nín, nhưng của Ngôi Lời nhập thể và hằng sống.',
        biblicalRoot: ['Ga 1,14', 'Dt 1,1-2'],
        theologicalKey: 'Tính sống động của Lời Chúa trong phụng vụ và đức tin.'
      },
      {
        number: 'Số 87',
        heading: 'Các bước thực hành Lectio Divina',
        excerpt: 'Lectio Divina mở đầu bằng Lectio (đọc cẩn thận), dẫn tới Meditatio (suy niệm), Oratio (cầu nguyện), Contemplatio (chiêm ngắm) và Actio (hành động bác ái trong đời sống).',
        biblicalRoot: ['Lc 2,19.51', 'Gc 1,22'],
        theologicalKey: 'Linh đạo Lời Chúa trong truyền thống đan tu Công giáo.'
      }
    ],
    scriptureConnections: ['Ga 1,14', 'Dt 4,12', 'Lc 24,13-35'],
    topics: ['Lectio Divina', 'Lời Chúa', 'Phụng vụ', 'Truyền giáo', 'Biển Đức XVI'],
    officialSource: 'Vatican.va (Adhortatio Apostolica Verbum Domini)'
  },
  {
    id: 'evangelii-gaudium',
    category: 'POPE_TEACHINGS',
    categoryName: 'Giáo huấn của các Đức Giáo hoàng',
    title: 'Evangelii Gaudium',
    latinTitle: 'Evangelii Gaudium',
    vietnameseTitle: 'Tông Huấn Niềm Vui Tin Mừng',
    documentType: 'Tông Huấn',
    promulgator: 'Đức Giáo Hoàng Phanxicô',
    author: 'Đức Phanxicô',
    promulgationDate: '24/11/2013',
    year: '2013',
    historicalContext: 'Văn kiện định hướng toàn bộ triều đại giáo hoàng của Đức Phanxicô về một "Hội Thánh đi ra ngoài".',
    purpose: 'Mời gọi toàn thể tín hữu bước vào giai đoạn loan báo Tin Mừng mới tràn đầy niềm vui và nhiệt huyết.',
    mainThemes: [
      'Sự biến đổi truyền giáo của Hội Thánh',
      'Hội Thánh như bệnh viện dã chiến',
      'Vị trí ưu tiên của người nghèo trong Nước Trời',
      'Bài giảng lễ và việc chuẩn bị phụng vụ Lời Chúa'
    ],
    mainTheme: 'Canh tân tinh thần truyền giáo với niềm vui Tin Mừng',
    structure: 'Gồm 5 chương: I. Sự biến đổi truyền giáo của Hội Thánh; II. Giữa cơn khủng hoảng của sự dấn thân cộng đoàn; III. Việc loan báo Tin Mừng; IV. Chiều kích xã hội của việc truyền giáo; V. Những người loan báo Tin Mừng đầy Thần Khí.',
    summary: 'Niềm vui Tin Mừng lấp đầy trái tim và cuộc sống của tất cả những ai gặp gỡ Chúa Giêsu. Đức Phanxicô mơ ước một Hội Thánh "bị bầm dập, mang thương tích và nhơ nhuốc vì đi ra ngoài đường kính", hơn là một Hội Thánh ốm yếu vì giam mình trong vỏ ốc an toàn.',
    keySections: [
      {
        number: 'Số 1',
        heading: 'Niềm vui của người gặp gỡ Đức Kitô',
        excerpt: 'Niềm vui của Tin Mừng đổ đầy trái tim và cuộc sống của tất cả những ai gặp gỡ Chúa Giêsu. Những ai để cho Người cứu độ thì được giải thoát khỏi tội lỗi, buồn phiền, trống rỗng nội tâm và sự cô đơn.',
        biblicalRoot: ['Lc 1,47', 'Ga 15,11'],
        theologicalKey: 'Niềm vui Kitô giáo bắt nguồn từ kinh nghiệm phục sinh.'
      },
      {
        number: 'Số 49',
        heading: 'Một Hội Thánh đi ra vùng ngoại biên',
        excerpt: 'Tôi thà có một Hội Thánh bị bầm dập, mang thương tích và nhơ nhuốc vì đi ra ngoài đường phố, hơn là một Hội Thánh ốm yếu vì bị giam hãm và bám víu vào sự an toàn của mình.',
        biblicalRoot: ['Mc 16,15', 'Lc 14,21-23'],
        theologicalKey: 'Giáo hội học mục vụ truyền giáo.'
      }
    ],
    scriptureConnections: ['Lc 4,18-19', 'Is 61,1-3', 'Cv 1,8'],
    topics: ['Truyền giáo', 'Niềm vui', 'Người nghèo', 'Ngoại biên', 'Đức Phanxicô'],
    officialSource: 'Vatican.va (Adhortatio Apostolica Evangelii Gaudium)'
  },

  // --------------------------------------------------------------------------
  // 3. HỌC THUYẾT XÃ HỘI CÔNG GIÁO
  // --------------------------------------------------------------------------
  {
    id: 'rerum-novarum',
    category: 'SOCIAL_DOCTRINE',
    categoryName: 'Học thuyết Xã hội Công giáo',
    title: 'Rerum Novarum',
    latinTitle: 'Rerum Novarum',
    vietnameseTitle: 'Thông Điệp Tân Sự (Về Tình Cảnh Giai Cấp Công Nhân)',
    documentType: 'Thông Điệp Xã Hội',
    promulgator: 'Đức Giáo Hoàng Lêô XIII',
    author: 'Đức Lêô XIII',
    promulgationDate: '15/05/1891',
    year: '1891',
    historicalContext: 'Cuộc Cách mạng Công nghiệp thế kỷ 19 tạo ra sự bóc lột cùng cực đối với giai cấp công nhân và sự trỗi dậy của các phong trào xã hội cực đoan.',
    purpose: 'Khẳng định giáo huấn xã hội của Tin Mừng nhằm bảo vệ phẩm giá người lao động, công lý tiền lương và hòa bình xã hội.',
    mainThemes: [
      'Phẩm giá bất khả xâm phạm của người lao động',
      'Quyền tư hữu đi liền với trách nhiệm xã hội',
      'Mức lương công bằng đủ nuôi sống gia đình',
      'Bác bỏ đấu tranh giai cấp bạo lực, cổ võ sự hòa hợp'
    ],
    mainTheme: 'Hiến chương nền tảng của Học thuyết Xã hội Công giáo',
    structure: 'Gồm 2 phần chính: Phần I: Phê bình chủ nghĩa xã hội duy vật; Phần II: Giải pháp Kitô giáo (Bổn phận của người sử dụng lao động, người lao động và vai trò của Nhà nước).',
    summary: 'Rerum Novarum là viên đá góc tường của Học Thuyết Xã Hội Công Giáo. Đức Lêô XIII can đảm lên tiếng bảo vệ công nhân trước sự tham lam vô độ của chủ nghĩa tư bản phóng túng, đồng thời bác bỏ giải pháp cộng sản duy vật xóa bỏ tư hữu, nhấn mạnh lao động không phải là món hàng hóa mà là sự cộng tác vào công trình sáng tạo của Thiên Chúa.',
    keySections: [
      {
        number: 'Số 20',
        heading: 'Phẩm giá của lao động',
        excerpt: 'Thật đáng xấu hổ và vô nhân đạo khi đối xử với con người như những món đồ thuần túy để kiếm lời, hoặc chỉ ước lượng họ theo mức độ sức lực cơ bắp mà họ sở hữu.',
        biblicalRoot: ['Gc 5,4', 'Đnl 24,14-15'],
        theologicalKey: 'Lao động gắn liền với phẩm giá nhân vị.'
      }
    ],
    scriptureConnections: ['St 2,15', '1 Tm 5,18', 'Gc 5,1-6'],
    topics: ['Lao động', 'Công bằng', 'Tiền lương', 'Tư hữu', 'Lêô XIII'],
    officialSource: 'Vatican.va (Litterae Encyclicae Rerum Novarum)'
  },
  {
    id: 'caritas-in-veritate',
    category: 'SOCIAL_DOCTRINE',
    categoryName: 'Học thuyết Xã hội Công giáo',
    title: 'Caritas in Veritate',
    latinTitle: 'Caritas in Veritate',
    vietnameseTitle: 'Thông Điệp Bác Ái Trong Chân Lý',
    documentType: 'Thông Điệp Xã Hội',
    promulgator: 'Đức Giáo Hoàng Biển Đức XVI',
    author: 'Đức Biển Đức XVI',
    promulgationDate: '29/06/2009',
    year: '2009',
    historicalContext: 'Cuộc khủng hoảng tài chính toàn cầu 2008 làm lộ rõ những lỗ hổng đạo đức trong nền kinh tế thị trường thiếu kiểm soát.',
    purpose: 'Định hướng sự phát triển toàn diện của con người trong bối cảnh toàn cầu hóa dựa trên nền tảng Bác ái và Chân lý.',
    mainThemes: [
      'Bác ái trong chân lý là động lực chính của sự phát triển',
      'Kinh tế cần có nguyên tắc nhưng không và tình huynh đệ',
      'Đạo đức sinh học và đạo đức xã hội là một khối duy nhất',
      'Trách nhiệm bảo vệ môi trường và công bằng liên thế hệ'
    ],
    mainTheme: 'Sự phát triển toàn diện của con người và nền kinh tế huynh đệ',
    structure: 'Gồm 6 chương: I. Thông điệp Populorum Progressio của Đức Phaolô VI; II. Sự phát triển con người trong thời đại chúng ta; III. Tình huynh đệ, phát triển kinh tế và xã hội dân sự; IV. Sự phát triển của các dân tộc, quyền và bổn phận; V. Sự hợp tác của gia đình nhân loại; VI. Phát triển các dân tộc và công nghệ.',
    summary: 'Đức Biển Đức XVI khẳng định tình yêu mà không có chân lý sẽ rơi vào tình cảm ủy mị, còn chân lý không có bác ái sẽ trở nên khắc nghiệt. Thị trường không thể tự điều tiết nếu thiếu lòng tin tưởng và nguyên tắc nhưng không (gratuitousness).',
    keySections: [
      {
        number: 'Số 1',
        heading: 'Bác ái trong chân lý',
        excerpt: 'Bác ái trong chân lý... là động lực chính cho sự phát triển đích thực của mỗi con người và của toàn thể nhân loại.',
        biblicalRoot: ['Ep 4,15', '1 Ga 3,18'],
        theologicalKey: 'Sự kết hợp bất khả phân giữa Tình yêu và Sự thật.'
      }
    ],
    scriptureConnections: ['1 Cr 13,1-13', 'Ep 4,15', 'Mt 25,31-46'],
    topics: ['Bác ái', 'Chân lý', 'Toàn cầu hóa', 'Kinh tế', 'Biển Đức XVI'],
    officialSource: 'Vatican.va (Litterae Encyclicae Caritas in Veritate)'
  },

  // --------------------------------------------------------------------------
  // 4. PHỤNG VỤ
  // --------------------------------------------------------------------------
  {
    id: 'sacrosanctum-concilium',
    category: 'LITURGY',
    categoryName: 'Phụng vụ',
    title: 'Sacrosanctum Concilium',
    latinTitle: 'Sacrosanctum Concilium',
    vietnameseTitle: 'Hiến Chế Về Phụng Vụ Thánh',
    documentType: 'Hiến Chế',
    promulgator: 'Thánh Giáo Hoàng Phaolô VI & Các Nghị phụ Công đồng',
    author: 'Công đồng Vaticanô II',
    promulgationDate: '04/12/1963',
    year: '1963',
    historicalContext: 'Văn kiện đầu tiên được Công đồng Vaticanô II biểu quyết thông qua, mở ra cuộc canh tân phụng vụ lịch sử.',
    purpose: 'Làm cho phụng vụ trở nên sống động, giúp mọi tín hữu tham dự cách ý thức, tích cực và trọn vẹn.',
    mainThemes: [
      'Bản chất Phụng vụ là tột đỉnh và nguồn mạch đời sống Hội Thánh',
      'Sự tham dự tích cực (participatio actuosa) của cộng đoàn dân Chúa',
      'Tái lập bàn tiệc Lời Chúa phong phú trong Thánh Lễ',
      'Hội nhập văn hóa và việc sử dụng tiếng bản xứ'
    ],
    mainTheme: 'Nguồn mạch và tột đỉnh của đời sống Kitô hữu',
    structure: 'Gồm 7 chương: I. Các nguyên tắc tổng quát; II. Mầu nhiệm Thánh Thể; III. Các bí tích khác và á bí tích; IV. Kinh Phụng Vụ; V. Năm Phụng Vụ; VI. Thánh nhạc; VII. Nghệ thuật thánh.',
    summary: 'Phụng vụ là việc thực thi chức vụ tư tế của chính Chúa Giêsu Kitô. Trong phụng vụ, qua các dấu chỉ hữu hình, việc thánh hóa con người được biểu thị và thực hiện. Phụng vụ là tột đỉnh (culmen) mà mọi hoạt động của Hội Thánh quy hướng về, đồng thời là nguồn mạch (fons) tuôn trào mọi năng lực thần linh.',
    keySections: [
      {
        number: 'Số 10',
        heading: 'Nguồn mạch và tột đỉnh',
        excerpt: 'Phụng vụ là tột đỉnh mà mọi hoạt động của Hội Thánh đều quy hướng về, đồng thời là nguồn mạch phát sinh mọi năng lực của Hội Thánh.',
        biblicalRoot: ['Cv 2,42', '1 Cr 11,26'],
        theologicalKey: 'Vị trí ưu việt tuyệt đối của Phụng vụ trong đời sống Kitô hữu.'
      },
      {
        number: 'Số 14',
        heading: 'Sự tham dự tích cực của toàn thể Dân Chúa',
        excerpt: 'Mẹ Hội Thánh tha thiết ước mong toàn thể các tín hữu được hướng dẫn để tham dự các cuộc cử hành Phụng vụ cách trọn vẹn, ý thức và tích cực.',
        biblicalRoot: ['1 Pr 2,9', 'Rm 12,1'],
        theologicalKey: 'Quyền và bổn phận phát sinh từ Bí tích Thánh Tẩy.'
      }
    ],
    scriptureConnections: ['Cv 2,42-47', '1 Cr 11,23-26', 'Dt 9,11-14'],
    topics: ['Phụng vụ', 'Thánh Thể', 'Thánh Nhạc', 'Năm Phụng Vụ', 'Vatican II'],
    officialSource: 'Vatican.va (Constitutio Sacrosanctum Concilium)'
  },
  {
    id: 'desiderio-desideravi',
    category: 'LITURGY',
    categoryName: 'Phụng vụ',
    title: 'Desiderio Desideravi',
    latinTitle: 'Desiderio Desideravi',
    vietnameseTitle: 'Tông Thư Về Việc Đào Tạo Phụng Vụ Của Dân Thiên Chúa',
    documentType: 'Tông Thư',
    promulgator: 'Đức Giáo Hoàng Phanxicô',
    author: 'Đức Phanxicô',
    promulgationDate: '29/06/2022',
    year: '2022',
    historicalContext: 'Nhắc nhớ vẻ đẹp đích thực của Phụng vụ sau 60 năm ban hành Sacrosanctum Concilium.',
    purpose: 'Mời gọi toàn thể Hội Thánh tái khám phá chiều sâu chiêm niệm và sự kỳ diệu trước mầu nhiệm Thánh Thể.',
    mainThemes: [
      'Nỗi khao khát vô bờ của Đức Kitô được ăn Lễ Vượt Qua với chúng ta',
      'Vẻ đẹp và sự trang nghiêm không giả tạo của Phụng vụ',
      'Đào tạo phụng vụ cho cả giáo sĩ lẫn giáo dân',
      'Vượt qua các tranh cãi hình thức để hiệp nhất nơi Bàn Tiệc Thánh'
    ],
    mainTheme: 'Tái khám phá vẻ đẹp kỳ diệu của Phụng vụ Thánh Thể',
    structure: 'Gồm 65 số suy tư chiêm niệm về mầu nhiệm Vượt Qua và nghệ thuật cử hành phụng vụ (Ars celebrandi).',
    summary: 'Đức Phanxicô mượn lời Chúa Giêsu: "Thầy những khát khao ăn Lễ Vượt Qua này với anh em trước khi chịu khổ hình" (Lc 22,15). Phụng vụ trước hết là việc chúng ta đáp lại nỗi khát khao của Chúa được trao ban chính Mình Ngài cho chúng ta.',
    keySections: [
      {
        number: 'Số 16',
        heading: 'Sự ngỡ ngàng trước Mầu Nhiệm Vượt Qua',
        excerpt: 'Nếu chúng ta đánh mất sự ngỡ ngàng trước mầu nhiệm Vượt Qua được hiện tại hóa trong cử hành phụng vụ, chúng ta sẽ không thể chạm đến vẻ đẹp đích thực của Thiên Chúa.',
        biblicalRoot: ['Lc 22,15', 'Ga 13,1'],
        theologicalKey: 'Tâm tình tôn kính và ngỡ ngàng linh thánh.'
      }
    ],
    scriptureConnections: ['Lc 22,14-20', '1 Cr 10,16-17', 'Kh 19,9'],
    topics: ['Phụng vụ', 'Thánh Thể', 'Đào tạo', 'Hiệp nhất', 'Đức Phanxicô'],
    officialSource: 'Vatican.va (Epistula Apostolica Desiderio Desideravi)'
  },

  // --------------------------------------------------------------------------
  // 5. GIÁO LÝ VÀ ĐỨC TIN
  // --------------------------------------------------------------------------
  {
    id: 'fides-et-ratio',
    category: 'DOCTRINE_FAITH',
    categoryName: 'Giáo lý và đức tin',
    title: 'Fides et Ratio',
    latinTitle: 'Fides et Ratio',
    vietnameseTitle: 'Thông Điệp Đức Tin Và Lý Trí',
    documentType: 'Thông Điệp Tín Lý',
    promulgator: 'Thánh Giáo Hoàng Gioan Phaolô II',
    author: 'Thánh Gioan Phaolô II',
    promulgationDate: '14/09/1998',
    year: '1998',
    historicalContext: 'Thế giới đương đại rơi vào chủ nghĩa hư vô, hoài nghi tương đối và sự chia rẽ giữa khoa học và tôn giáo.',
    purpose: 'Bảo vệ khả năng nhận biết chân lý tối hậu của lý trí con người và khẳng định đức tin cần lý trí cũng như lý trí cần đức tin.',
    mainThemes: [
      'Đức tin và lý trí như hai cánh đưa tâm hồn bay lên chiêm ngắm chân lý',
      'Mạc khải không hủy hoại nhưng nâng đỡ và hoàn thiện lý trí',
      'Mối nguy của chủ nghĩa tương đối và chủ nghĩa duy khoa học thực nghiệm',
      'Thần học cần triết học và triết học cần ánh sáng đức tin'
    ],
    mainTheme: 'Mối tương quan hòa hợp giữa Đức tin Kitô giáo và Lý trí con người',
    structure: 'Gồm Lời mở đầu và 7 chương: I. Mạc khải sự khôn ngoan của Thiên Chúa; II. Credo ut intellegam (Tin để hiểu); III. Intellego ut credam (Hiểu để tin); IV. Mối tương quan lịch sử đức tin - lý trí; V. Sự can thiệp của Huấn quyền; VI. Thần học và triết học; VII. Các đòi hỏi hiện nay.',
    summary: 'Đức tin và Lý trí (Fides et Ratio) giống như hai cánh của một cánh chim, giúp tâm trí con người bay lên chiêm ngắm Chân Lý. Con người có khát vọng bẩm sinh muốn tìm kiếm chân lý, và chân lý đó tìm thấy sự viên mãn nơi Đức Giêsu Kitô - Đấng là Đường, là Sự Thật và là Sự Sống.',
    keySections: [
      {
        number: 'Lời mở đầu',
        heading: 'Hai cánh đưa tới chân lý',
        excerpt: 'Đức tin và lý trí giống như đôi cánh giúp tâm trí con người vươn lên chiêm ngưỡng chân lý. Chính Thiên Chúa đã đặt vào tâm hồn con người niềm khao khát nhận biết chân lý.',
        biblicalRoot: ['Cn 25,2', 'Rm 1,19-20'],
        theologicalKey: 'Sự hiệp nhất nội tại giữa Lý trí và Mạc Khải.'
      }
    ],
    scriptureConnections: ['Cn 1,7', '1 Cr 1,18-25', 'Ga 14,6'],
    topics: ['Đức tin', 'Lý trí', 'Chân lý', 'Triết học', 'Gioan Phaolô II'],
    officialSource: 'Vatican.va (Litterae Encyclicae Fides et Ratio)'
  },
  {
    id: 'dominus-iesus',
    category: 'DOCTRINE_FAITH',
    categoryName: 'Giáo lý và đức tin',
    title: 'Dominus Iesus',
    latinTitle: 'Dominus Iesus',
    vietnameseTitle: 'Tuyên Ngôn Về Tính Duy Nhất Và Phổ Quát Cứu Độ Của Chúa Giêsu Kitô Và Hội Thánh',
    documentType: 'Tuyên Ngôn Tín Lý',
    promulgator: 'Bộ Giáo Lý Đức Tin (Đức Hồng Y Joseph Ratzinger - ĐTC Biển Đức XVI)',
    author: 'Bộ Giáo Lý Đức Tin',
    promulgationDate: '06/08/2000',
    year: '2000',
    historicalContext: 'Sự lan rộng của thuyết đa nguyên tôn giáo coi nhẹ tính duy nhất của Đức Kitô như Đấng Cứu Độ duy nhất.',
    purpose: 'Tái khẳng định niềm tin tông truyền của Hội Thánh rằng Đức Giêsu Kitô là Đấng Trung Gian Cứu Độ duy nhất cho toàn thể nhân loại.',
    mainThemes: [
      'Tính trọn vẹn và tối hậu của Mạc Khải nơi Đức Giêsu Kitô',
      'Đức Kitô là Đấng Cứu Độ duy nhất và phổ quát',
      'Tính duy nhất của Hội Thánh Công giáo mà Đức Kitô đã thiết lập',
      'Đối thoại liên tôn trong sự tôn trọng và trung thành với chân lý'
    ],
    mainTheme: 'Chúa Giêsu Kitô là Đấng Cứu Độ duy nhất của muôn dân',
    structure: 'Gồm 6 phần: I. Tính trọn vẹn của Mạc Khải; II. Chúa Thánh Thần và Chúa Giêsu trong mầu nhiệm cứu độ; III. Tính phổ quát của ơn cứu độ nơi Đức Kitô; IV. Tính duy nhất của Hội Thánh; V. Hội Thánh và các tôn giáo; VI. Hội Thánh và Nước Thiên Chúa.',
    summary: 'Tuyên ngôn nhấn mạnh rằng không thể chia cắt Đức Kitô lịch sử khỏi Ngôi Lời Thiên Chúa. Dù nhận ra những hạt mầm chân lý nơi các truyền thống tôn giáo khác, Hội Thánh có bổn phận loan báo rằng ơn cứu độ duy nhất đến từ Đức Kitô qua Hội Thánh của Người.',
    keySections: [
      {
        number: 'Số 5',
        heading: 'Mạc khải trọn vẹn nơi Đức Kitô',
        excerpt: 'Cần phải tin vững chắc rằng nơi mầu nhiệm của Chúa Giêsu Kitô, Con Thiên Chúa nhập thể, Đấng là "đường, là sự thật và là sự sống" (Ga 14,6), sự trọn vẹn của mạc khải thần linh đã được trao ban.',
        biblicalRoot: ['Ga 14,6', 'Cv 4,12', '1 Tm 2,5'],
        theologicalKey: 'Kitô học cứu độ duy nhất.'
      }
    ],
    scriptureConnections: ['Cv 4,12', '1 Tm 2,5-6', 'Cl 1,15-20'],
    topics: ['Ơn cứu độ', 'Đức Kitô', 'Hội Thánh', 'Đối thoại liên tôn', 'Ratzinger'],
    officialSource: 'Vatican.va (Declaratio Dominus Iesus)'
  },

  // --------------------------------------------------------------------------
  // 6. GIA ĐÌNH VÀ PHẨM GIÁ CON NGƯỜI
  // --------------------------------------------------------------------------
  {
    id: 'humanae-vitae',
    category: 'FAMILY_HUMAN_DIGNITY',
    categoryName: 'Gia đình và phẩm giá con người',
    title: 'Humanae Vitae',
    latinTitle: 'Humanae Vitae',
    vietnameseTitle: 'Thông Điệp Về Sự Truyền Sinh Và Sự Sống Con Người',
    documentType: 'Thông Điệp Luân Lý',
    promulgator: 'Thánh Giáo Hoàng Phaolô VI',
    author: 'Thánh Phaolô VI',
    promulgationDate: '25/07/1968',
    year: '1968',
    historicalContext: 'Phong trào giải phóng tình dục và sự xuất hiện của thuốc ngừa thai nhân tạo trong thập niên 1960 đe dọa nền tảng hôn nhân gia đình.',
    purpose: 'Tái khẳng định vẻ đẹp thánh thiêng của hôn nhân và mối dây liên kết bất khả phân ly giữa hai ý nghĩa kết hợp và truyền sinh.',
    mainThemes: [
      'Ý nghĩa kết hợp và truyền sinh trong hành vi vợ chồng',
      'Tôn trọng luật tự nhiên và chương trình của Đấng Tạo Hóa',
      'Phương pháp điều hòa sinh sản tự nhiên theo lương tâm Kitô giáo',
      'Hậu quả luân lý và xã hội của việc lạm dụng ngừa thai nhân tạo'
    ],
    mainTheme: 'Bảo vệ sự thánh thiêng của sự sống và hôn nhân Công giáo',
    structure: 'Gồm 3 phần: I. Các khía cạnh mới của vấn đề; II. Các nguyên tắc tín lý và luân lý; III. Những chỉ dẫn mục vụ.',
    summary: 'Thánh Phaolô VI dũng cảm khẳng định mỗi hành vi hôn nhân phải luôn rộng mở cho việc truyền sinh. Không ai có quyền phân cắt ý nghĩa kết hợp tình yêu khỏi ý nghĩa trao ban sự sống mà Thiên Chúa đã khắc ghi vào bản tính con người.',
    keySections: [
      {
        number: 'Số 12',
        heading: 'Sự liên kết bất khả phân ly',
        excerpt: 'Giáo lý này... đặt nền trên sự liên kết bất khả phân ly mà Thiên Chúa đã an bài giữa hai ý nghĩa của hành vi hôn nhân: ý nghĩa kết hợp và ý nghĩa truyền sinh.',
        biblicalRoot: ['St 1,28', 'Mt 19,6'],
        theologicalKey: 'Luân lý tính dục và thần học thân xác.'
      }
    ],
    scriptureConnections: ['St 1,27-28', 'Tv 127', 'Ep 5,25-32'],
    topics: ['Hôn nhân', 'Sự sống', 'Truyền sinh', 'Gia đình', 'Phaolô VI'],
    officialSource: 'Vatican.va (Litterae Encyclicae Humanae Vitae)'
  },
  {
    id: 'amoris-laetitia',
    category: 'FAMILY_HUMAN_DIGNITY',
    categoryName: 'Gia đình và phẩm giá con người',
    title: 'Amoris Laetitia',
    latinTitle: 'Amoris Laetitia',
    vietnameseTitle: 'Tông Huấn Niềm Vui Của Tình Yêu',
    documentType: 'Tông Huấn Hậu Thượng Hội Đồng',
    promulgator: 'Đức Giáo Hoàng Phanxicô',
    author: 'Đức Phanxicô',
    promulgationDate: '19/03/2016',
    year: '2016',
    historicalContext: 'Đúc kết từ hai Thượng Hội Đồng Giám Mục (2014 & 2015) về Gia đình trong bối cảnh nhiều thách đố hiện đại.',
    purpose: 'Củng cố các gia đình, đồng hành với những người bị tổn thương và khơi dậy niềm vui của tình yêu hôn nhân.',
    mainThemes: [
      'Bài ca đức ái (1 Cr 13) áp dụng vào đời sống vợ chồng',
      'Đồng hành, phân định và hội nhập các hoàn cảnh mong manh',
      'Giáo dục con cái trong đức tin và nhân bản',
      'Linh đạo hôn nhân và gia đình'
    ],
    mainTheme: 'Tình yêu trong gia đình như một hành trình kiên nhẫn và ân sủng',
    structure: 'Gồm 9 chương: I. Dưới ánh sáng Lời Chúa; II. Thực tại và thách đố của gia đình; III. Ơn gọi gia đình; IV. Tình yêu trong hôn nhân; V. Tình yêu sinh hoa trái; VI. Một số triển vọng mục vụ; VII. Hướng đến việc giáo dục con cái tốt hơn; VIII. Đồng hành và phân định; IX. Linh đạo hôn nhân.',
    summary: 'Đức Phanxicô mời gọi Hội Thánh trở thành dấu chỉ lòng thương xót của Chúa, không kết án nhưng kiên nhẫn đồng hành với mọi gia đình, nhất là những người đang gặp khủng hoảng hay đổ vỡ, giúp họ từng bước lớn lên trong ân sủng.',
    keySections: [
      {
        number: 'Số 1',
        heading: 'Niềm vui của tình yêu',
        excerpt: 'Niềm vui của tình yêu được sống trong các gia đình cũng là niềm vui của Hội Thánh... Bất chấp mọi dấu hiệu khủng hoảng, khao khát một gia đình vẫn luôn sống động.',
        biblicalRoot: ['Tv 128', 'Ep 5,21-33'],
        theologicalKey: 'Mục vụ gia đình đầy lòng thương xót.'
      }
    ],
    scriptureConnections: ['1 Cr 13,4-7', 'Col 3,12-17', 'Mt 19,3-9'],
    topics: ['Gia đình', 'Tình yêu', 'Đồng hành', 'Thương xót', 'Đức Phanxicô'],
    officialSource: 'Vatican.va (Adhortatio Apostolica Amoris Laetitia)'
  },

  // --------------------------------------------------------------------------
  // 7. ƠN GỌI VÀ ĐỜI SỐNG THÁNH HIẾN
  // --------------------------------------------------------------------------
  {
    id: 'vita-consecrata',
    category: 'VOCATION_CONSECRATED',
    categoryName: 'Ơn gọi và đời sống thánh hiến',
    title: 'Vita Consecrata',
    latinTitle: 'Vita Consecrata',
    vietnameseTitle: 'Tông Huấn Về Đời Sống Thánh Hiến',
    documentType: 'Tông Huấn',
    promulgator: 'Thánh Giáo Hoàng Gioan Phaolô II',
    author: 'Thánh Gioan Phaolô II',
    promulgationDate: '25/03/1996',
    year: '1996',
    historicalContext: 'Đúc kết từ Thượng Hội Đồng Giám Mục lần thứ IX (1994) về Đời Sống Thánh Hiến trong Hội Thánh.',
    purpose: 'Làm sáng tỏ vẻ đẹp và vai trò tiên tri của đời sống thánh hiến đối với toàn thể Dân Chúa.',
    mainThemes: [
      'Chiêm ngắm biến cố Đức Kitô Biến Hình trên núi Tabor',
      'Ba lời khuyên Phúc Âm: Khiết tịnh, Khó nghèo và Vâng phục',
      'Đời sống thánh hiến là dấu chỉ ngôn sứ báo trước Nước Trời',
      'Sự hiện diện của tu sĩ giữa người nghèo và vùng truyền giáo'
    ],
    mainTheme: 'Lời tuyên khấn Phúc Âm và sự biến đổi trong tình yêu Đức Kitô',
    structure: 'Gồm Lời mở đầu và 3 chương: I. Confessio Trinitatis (Tuyên xưng Ba Ngôi); II. Signum Fraternitatis (Dấu chỉ huynh đệ); III. Servitium Caritatis (Phục vụ bác ái).',
    summary: 'Đời sống thánh hiến không phải là một bậc sống trung gian giữa giáo sĩ và giáo dân, mà là sự họa lại lối sống khiết tịnh, nghèo khó và vâng phục của chính Chúa Giêsu. Tu sĩ làm chứng cho thế giới về những giá trị vĩnh cửu của Nước Trời mai sau.',
    keySections: [
      {
        number: 'Số 1',
        heading: 'Họa lại lối sống của Đức Kitô',
        excerpt: 'Đời sống thánh hiến bắt nguồn sâu xa từ gương mẫu và giáo huấn của Chúa Kitô... là quà tặng vô giá mà Chúa Cha đã ban cho Hội Thánh của Người.',
        biblicalRoot: ['Mt 19,12.21', 'Lc 9,28-36'],
        theologicalKey: 'Chiều kích cánh chung của đời tu trì.'
      }
    ],
    scriptureConnections: ['Mt 19,10-12', '1 Cr 7,32-35', 'Phil 2,5-11'],
    topics: ['Thánh hiến', 'Tu sĩ', 'Ba lời khấn', 'Tabor', 'Gioan Phaolô II'],
    officialSource: 'Vatican.va (Adhortatio Apostolica Vita Consecrata)'
  },

  // --------------------------------------------------------------------------
  // 8. TRUYỀN GIÁO VÀ LOAN BÁO TIN MỪNG
  // --------------------------------------------------------------------------
  {
    id: 'evangelii-nuntiandi',
    category: 'MISSION_EVANGELIZATION',
    categoryName: 'Truyền giáo và loan báo Tin Mừng',
    title: 'Evangelii Nuntiandi',
    latinTitle: 'Evangelii Nuntiandi',
    vietnameseTitle: 'Tông Huấn Loan Báo Tin Mừng Trong Thế Giới Ngày Nay',
    documentType: 'Tông Huấn',
    promulgator: 'Thánh Giáo Hoàng Phaolô VI',
    author: 'Thánh Phaolô VI',
    promulgationDate: '08/12/1975',
    year: '1975',
    historicalContext: 'Kỷ niệm 10 năm bế mạc Công đồng Vaticanô II và đúc kết Thượng Hội Đồng Giám Mục 1974 về Loan báo Tin Mừng.',
    purpose: 'Xác định rõ bản chất, nội dung và phương thế của sứ mạng truyền giáo trong thời đại thế tục hóa.',
    mainThemes: [
      'Bản chất sâu xa của Hội Thánh là loan báo Tin Mừng',
      'Chứng tá đời sống đi trước lời giảng thuyết',
      'Phúc âm hóa văn hóa và giải phóng toàn diện con người',
      'Vai trò của Chúa Thánh Thần như tác nhân chính của việc truyền giáo'
    ],
    mainTheme: 'Hội Thánh hiện hữu là để loan báo Tin Mừng',
    structure: 'Gồm 7 chương: I. Từ Đức Kitô Người Loan Báo đến Hội Thánh loan báo; II. Loan báo Tin Mừng là gì?; III. Nội dung loan báo; IV. Các phương thế; V. Những người thụ hưởng; VI. Các công nhân; VII. Thần khí loan báo Tin Mừng.',
    summary: 'Thánh Phaolô VI khẳng định câu nói thời danh: "Người thời nay thích nghe các nhân chứng hơn là các thầy dạy, và nếu họ có nghe các thầy dạy thì bởi vì các thầy dạy ấy trước hết là những nhân chứng" (EN 41). Loan báo Tin Mừng là ơn gọi và sứ mạng cốt tử của Hội Thánh.',
    keySections: [
      {
        number: 'Số 14',
        heading: 'Bản chất của Hội Thánh',
        excerpt: 'Loan báo Tin Mừng là ơn huệ và ơn gọi riêng của Hội Thánh, là căn tính sâu xa nhất của Hội Thánh. Hội Thánh hiện hữu là để loan báo Tin Mừng.',
        biblicalRoot: ['Mt 28,19-20', 'Mc 16,15'],
        theologicalKey: 'Căn tính truyền giáo của Hội Thánh.'
      },
      {
        number: 'Số 41',
        heading: 'Sức mạnh của chứng tá đời sống',
        excerpt: 'Người thời nay tin vào các chứng nhân hơn là các thầy dạy... Chứng tá của đời sống Kitô hữu đích thực là phương thế đầu tiên và hiệu nghiệm nhất.',
        biblicalRoot: ['1 Pr 3,15-16', 'Mt 5,16'],
        theologicalKey: 'Phương pháp truyền giáo bằng chứng tá bác ái.'
      }
    ],
    scriptureConnections: ['Mt 28,18-20', 'Cv 1,8', '1 Cr 9,16'],
    topics: ['Truyền giáo', 'Chứng tá', 'Văn hóa', 'Thánh Thần', 'Phaolô VI'],
    officialSource: 'Vatican.va (Adhortatio Apostolica Evangelii Nuntiandi)'
  },
  {
    id: 'redemptoris-missio',
    category: 'MISSION_EVANGELIZATION',
    categoryName: 'Truyền giáo và loan báo Tin Mừng',
    title: 'Redemptoris Missio',
    latinTitle: 'Redemptoris Missio',
    vietnameseTitle: 'Thông Điệp Sứ Vụ Đấng Cứu Độ (Về Tính Hiệu Lực Vĩnh Viễn Của Lệnh Truyền Giáo)',
    documentType: 'Thông Điệp Truyền Giáo',
    promulgator: 'Thánh Giáo Hoàng Gioan Phaolô II',
    author: 'Thánh Gioan Phaolô II',
    promulgationDate: '07/12/1990',
    year: '1990',
    historicalContext: 'Kỷ niệm 25 năm Sắc lệnh Ad Gentes của Vatican II, trước xu hướng nguội lạnh và suy giảm nhiệt huyết truyền giáo.',
    purpose: 'Khẳng định lại tính khẩn thiết và giá trị trường cửu của việc truyền giáo cho các dân tộc (Missio ad Gentes).',
    mainThemes: [
      'Đức Giêsu Kitô là Đấng Cứu Độ duy nhất cho muôn loài',
      'Truyền giáo cho các dân tộc (Ad Gentes) vẫn còn ở buổi bình minh',
      'Các nghị trường Areopagus mới của thế giới truyền thông hiện đại',
      'Đức tin được củng cố khi được trao ban cho người khác'
    ],
    mainTheme: 'Tính cấp bách của sứ mạng truyền giáo muôn dân',
    structure: 'Gồm 8 chương: I. Đức Giêsu Kitô Đấng Cứu Độ duy nhất; II. Nước Thiên Chúa; III. Chúa Thánh Thần là nhân tố chính; IV. Chân trời bao la của Ad Gentes; V. Những con đường truyền giáo; VI. Các nhà lãnh đạo và tác viên; VII. Sự cộng tác; VIII. Linh đạo truyền giáo.',
    summary: 'Thánh Gioan Phaolô II tha thiết nhắc nhở: "Đức tin được tăng cường khi được trao ban!" Sứ mạng truyền giáo cho muôn dân vẫn còn rộng mở mênh mông, và Hội Thánh phải hăng say chèo ra chỗ nước sâu để thả lưới bắt người cho Nước Trời.',
    keySections: [
      {
        number: 'Số 2',
        heading: 'Đức tin được lớn lên khi trao ban',
        excerpt: 'Sứ mạng của Đức Kitô Đấng Cứu Thế được giao phó cho Hội Thánh vẫn còn lâu mới hoàn tất... Đức tin được củng cố khi được trao ban!',
        biblicalRoot: ['Lc 5,4', 'Cv 13,47'],
        theologicalKey: 'Linh đạo truyền giáo năng động.'
      }
    ],
    scriptureConnections: ['Mt 28,19', 'Rm 10,14-15', '1 Cr 9,16-23'],
    topics: ['Ad Gentes', 'Truyền giáo', 'Areopagus', 'Linh đạo', 'Gioan Phaolô II'],
    officialSource: 'Vatican.va (Litterae Encyclicae Redemptoris Missio)'
  },

  // --------------------------------------------------------------------------
  // 9. MÔI TRƯỜNG VÀ SINH THÁI TOÀN DIỆN
  // --------------------------------------------------------------------------
  {
    id: 'laudato-si',
    category: 'ECOLOGY_ENVIRONMENT',
    categoryName: 'Môi trường và sinh thái toàn diện',
    title: 'Laudato Si\'',
    latinTitle: 'Laudato Si\'',
    vietnameseTitle: 'Thông Điệp Về Việc Chăm Sóc Ngôi Nhà Chung',
    documentType: 'Thông Điệp Môi Sinh',
    promulgator: 'Đức Giáo Hoàng Phanxicô',
    author: 'Đức Phanxicô',
    promulgationDate: '24/05/2015',
    year: '2015',
    historicalContext: 'Cuộc khủng hoảng biến đổi khí hậu toàn cầu và sự suy thoái môi trường đe dọa trực tiếp người nghèo.',
    purpose: 'Kêu gọi toàn thể nhân loại bước vào cuộc hoán cải sinh thái và bảo vệ ngôi nhà chung.',
    mainThemes: [
      'Mọi sự đều liên kết chặt chẽ với nhau',
      'Tiếng kêu của trái đất và tiếng kêu của người nghèo là một',
      'Phê bình mô hình kỹ trị thống trị mù quáng',
      'Sinh thái toàn diện (Integral Ecology)'
    ],
    mainTheme: 'Chăm sóc thụ tạo và hoán cải sinh thái toàn diện',
    structure: 'Gồm 6 chương: I. Những gì đang xảy ra cho ngôi nhà chung; II. Tin Mừng về thụ tạo; III. Nguồn gốc con người của cuộc khủng hoảng sinh thái; IV. Sinh thái toàn diện; V. Một số đường hướng hành động; VI. Giáo dục và linh đạo sinh thái.',
    summary: 'Lấy cảm hứng từ Bài Ca Vạn Vật của Thánh Phanxicô Assisi, Đức Phanxicô khẳng định việc tàn phá thiên nhiên là một tội lỗi chống lại Đấng Tạo Hóa và chống lại người nghèo. Môi sinh không chỉ là vấn đề khoa học mà là vấn đề đạo đức, công bằng xã hội và linh đạo.',
    keySections: [
      {
        number: 'Số 49',
        heading: 'Lắng nghe tiếng kêu của đất và của người nghèo',
        excerpt: 'Cần có một cách tiếp cận sinh thái đích thực luôn luôn trở thành một cách tiếp cận xã hội... để lắng nghe vừa tiếng kêu của trái đất vừa tiếng kêu của người nghèo.',
        biblicalRoot: ['St 4,10', 'Tv 34,7'],
        theologicalKey: 'Mối liên kết bất khả phân giữa công bằng xã hội và bảo vệ môi trường.'
      },
      {
        number: 'Số 217',
        heading: 'Hoán cải sinh thái',
        excerpt: 'Cuộc khủng hoảng sinh thái là lời mời gọi bước vào một cuộc hoán cải sâu xa nội tâm... Sống ơn gọi làm người bảo vệ công trình của Thiên Chúa là điều cốt yếu cho một đời sống đức hạnh.',
        biblicalRoot: ['St 2,15', 'Rm 8,22'],
        theologicalKey: 'Linh đạo sinh thái Kitô giáo.'
      }
    ],
    scriptureConnections: ['St 1,28-31', 'Tv 104', 'Cl 1,16', 'Rm 8,19-22'],
    topics: ['Môi sinh toàn diện', 'Ngôi nhà chung', 'Công bằng xã hội', 'Đức Phanxicô'],
    officialSource: 'Vatican.va (Litterae Encyclicae Laudato Si\')'
  },
  {
    id: 'laudate-deum',
    category: 'ECOLOGY_ENVIRONMENT',
    categoryName: 'Môi trường và sinh thái toàn diện',
    title: 'Laudate Deum',
    latinTitle: 'Laudate Deum',
    vietnameseTitle: 'Tông Huấn Hãy Ca Tụng Thiên Chúa (Gửi Mọi Người Có Thiện Chí Về Cuộc Khủng Hoảng Khí Hậu)',
    documentType: 'Tông Huấn Khí Hậu',
    promulgator: 'Đức Giáo Hoàng Phanxicô',
    author: 'Đức Phanxicô',
    promulgationDate: '04/10/2023',
    year: '2023',
    historicalContext: 'Ban hành vào ngày lễ Thánh Phanxicô Assisi năm 2023, 8 năm sau Laudato Si\', trước thềm Hội nghị COP28 tại Dubai khi các phản ứng quốc tế còn chậm chạp.',
    purpose: 'Cảnh báo tính cấp bách khôn xiết của khủng hoảng khí hậu và hối thúc hành động cụ thể có tính ràng buộc pháp lý.',
    mainThemes: [
      'Cuộc khủng hoảng khí hậu toàn cầu là không thể chối cãi',
      'Nguồn gốc con người của sự nóng lên toàn cầu',
      'Sự bất lực của các chính sách quốc tế thiếu ràng buộc',
      'Động lực đức tin và trách nhiệm luân lý của người Kitô hữu'
    ],
    mainTheme: 'Hành động khẩn cấp ngăn chặn thảm họa biến đổi khí hậu',
    structure: 'Gồm 6 phần: I. Cuộc khủng hoảng khí hậu toàn cầu; II. Mẫu hình kỹ trị tăng trưởng mù quáng; III. Sự yếu kém của chính trị quốc tế; IV. Các hội nghị về khí hậu; V. Những gì được mong đợi tại COP28; VI. Động lực tâm linh.',
    summary: 'Đức Phanxicô khẳng định thế giới đang tiến gần đến điểm không thể đảo ngược (tipping point). Ngài kêu gọi từ bỏ thái độ chế giễu hoặc thờ ơ trước hiện tượng biến đổi khí hậu, nhấn mạnh khi con người tự coi mình là thượng đế thì chỉ trở thành hiểm họa cho chính mình và muôn loài.',
    keySections: [
      {
        number: 'Số 73',
        heading: 'Hãy ca tụng Thiên Chúa, đừng tự coi mình là Chúa',
        excerpt: 'Hãy ca tụng Thiên Chúa là tên gọi của bức thư này. Bởi vì một con người tự cho mình có thể thay thế Thiên Chúa sẽ trở thành mối nguy hiểm tồi tệ nhất cho chính mình.',
        biblicalRoot: ['Tv 148', 'Giop 38,4-11'],
        theologicalKey: 'Khiêm nhường đón nhận thân phận thụ tạo trước Thiên Chúa.'
      }
    ],
    scriptureConnections: ['Tv 148', 'Gióp 38', 'Kh 11,18'],
    topics: ['Khí hậu', 'COP28', 'Sinh thái', 'Trách nhiệm', 'Đức Phanxicô'],
    officialSource: 'Vatican.va (Adhortatio Apostolica Laudate Deum)'
  }
];

export function getChurchDocumentById(id: string): ChurchDocumentItem | null {
  return CHURCH_DOCUMENTS_DATABASE.find(d => d.id === id) || null;
}

export function getChurchDocumentsByCategory(cat: DocumentCategory): ChurchDocumentItem[] {
  return CHURCH_DOCUMENTS_DATABASE.filter(d => d.category === cat);
}
