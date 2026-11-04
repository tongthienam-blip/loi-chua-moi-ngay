import { ChurchDocumentItem } from '@/types';

// ============================================================================
// THƯ VIỆN VĂN KIỆN HỘI THÁNH CÔNG GIÁO
// Công đồng Vaticanô II - Thông điệp - Tông huấn - Học thuyết Xã hội Công giáo
// ============================================================================

export const CHURCH_DOCUMENTS_DATABASE: ChurchDocumentItem[] = [
  // --------------------------------------------------------------------------
  // CÔNG ĐỒNG VATICANÔ II
  // --------------------------------------------------------------------------
  {
    id: 'dei-verbum',
    category: 'VATICAN_II',
    categoryName: 'Công đồng Vaticanô II',
    latinTitle: 'Dei Verbum',
    vietnameseTitle: 'Hiến Chế Tín Lý Về Mạc Khải Của Thiên Chúa',
    promulgator: 'Thánh Giáo Hoàng Phaolô VI & Các Nghị phụ Công đồng',
    promulgationDate: '18/11/1965',
    historicalContext: 'Được ban hành trong khóa họp thứ 4 của Công đồng Vaticanô II, tái khẳng định vị trí trung tâm của Lời Chúa trong đời sống Hội Thánh sau nhiều thế kỷ thần học kinh viện.',
    purpose: 'Trình bày giáo lý đích thực về Mạc khải thần linh và việc lưu truyền Lời Chúa, để nhờ lắng nghe sứ điệp cứu độ, toàn thể thế giới tin tưởng, nhờ tin tưởng mà hy vọng, và nhờ hy vọng mà yêu mến.',
    mainThemes: [
      'Bản chất tự mạc khải của Thiên Chúa qua Đức Kitô',
      'Sự liên kết chặt chẽ giữa Thánh Truyền và Thánh Kinh',
      'Huấn quyền là tôi tớ phục vụ Lời Chúa',
      'Đọc Kinh Thánh trong lòng Hội Thánh và dưới sự hướng dẫn của Thánh Thần'
    ],
    summary: 'Hiến chế khẳng định Thánh Kinh là Lời Thiên Chúa được ghi chép lại dưới sự linh hứng của Chúa Thánh Thần. Bản văn Kinh Thánh phải được tôn kính ngang hàng với Mình Thánh Chúa (DV 21). Mọi người tín hữu, đặc biệt là các thừa tác viên, phải siêng năng tiếp xúc với Lời Chúa qua việc đọc Kinh Thánh có cầu nguyện (Lectio Divina).',
    keySections: [
      {
        number: 'Số 2',
        heading: 'Bản chất và đối tượng của Mạc Khải',
        excerpt: 'Thiên Chúa vô hình, trong tình yêu bao la của Người, đã ngỏ lời với loài người như với bạn hữu và chuyện trò với họ, để mời gọi và đón nhận họ vào cuộc sống hiệp thông với Người.',
        biblicalRoot: ['Xh 33,11', 'Ga 15,14-15', '1Tm 6,16'],
        theologicalKey: 'Mạc khải là một cuộc đối thoại yêu thương ngôi vị, không đơn thuần là tập hợp các mệnh đề trừu tượng.'
      },
      {
        number: 'Số 9',
        heading: 'Tương quan giữa Thánh Truyền và Thánh Kinh',
        excerpt: 'Thánh Truyền và Thánh Kinh liên kết và phối hợp chặt chẽ với nhau: bởi vì cả hai đều phát xuất từ cùng một nguồn suối thần linh, kết hợp lại thành một và cùng quy về một mục đích.',
        biblicalRoot: ['2Tx 2,15', '2Tm 1,14'],
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
    scriptureConnections: ['Ga 1,1-18', '2Tm 3,15-17', 'Dt 4,12'],
    topics: ['Mạc khải', 'Kinh Thánh', 'Thánh Truyền', 'Huấn quyền', 'Lectio Divina']
  },
  {
    id: 'lumen-gentium',
    category: 'VATICAN_II',
    categoryName: 'Công đồng Vaticanô II',
    latinTitle: 'Lumen Gentium',
    vietnameseTitle: 'Hiến Chế Tín Lý Về Hội Thánh',
    promulgator: 'Thánh Giáo Hoàng Phaolô VI & Các Nghị phụ Công đồng',
    promulgationDate: '21/11/1964',
    historicalContext: 'Văn kiện nền tảng tái định nghĩa bản chất và sứ mạng của Hội Thánh trong thế giới hiện đại.',
    purpose: 'Làm sáng tỏ bản chất của Hội Thánh là Bí tích cứu độ toàn cầu và là Dân Thiên Chúa lữ hành.',
    mainThemes: [
      'Mầu nhiệm Hội Thánh',
      'Dân Thiên Chúa và Chức tư tế cộng đồng',
      'Giám mục đoàn và tính hiệp hành',
      'Ơn gọi nên thánh phổ quát',
      'Đức Maria trong mầu nhiệm Đức Kitô và Hội Thánh'
    ],
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
        excerpt: 'Mọi người trong Hội Thánh, dù thuộc phẩm trật hay được phẩm trật coi sóc, đều được mời gọi nên thánh theo lời Thánh Tông Đồ: "Ý muốn của Thiên Chúa là anh em phải nên thánh" (1Tx 4,3).',
        biblicalRoot: ['1Tx 4,3', 'Ep 1,4', 'Mt 5,48'],
        theologicalKey: 'Sự thánh thiện không phải là độc quyền của giáo sĩ/tu sĩ mà là ơn gọi của mọi người đã lãnh nhận phép Rửa.'
      }
    ],
    scriptureConnections: ['1Pr 2,9-10', '1Cr 12,12-27'],
    topics: ['Hội Thánh', 'Dân Thiên Chúa', 'Ơn gọi nên thánh', 'Đức Maria', 'Hiệp hành']
  },

  // --------------------------------------------------------------------------
  // TÔNG HUẤN & THÔNG ĐIỆP GIÁO HUẤN
  // --------------------------------------------------------------------------
  {
    id: 'verbum-domini',
    category: 'APOSTOLIC_EXHORTATION',
    categoryName: 'Tông Huấn Hậu Thượng Hội Đồng',
    latinTitle: 'Verbum Domini',
    vietnameseTitle: 'Lời Chúa Trong Đời Sống Và Sứ Mạng Của Hội Thánh',
    promulgator: 'Đức Giáo Hoàng Biển Đức XVI',
    promulgationDate: '30/09/2010',
    historicalContext: 'Đúc kết từ Thượng Hội Đồng Giám Mục thế giới lần thứ XII về Lời Chúa.',
    purpose: 'Tái khám phá Lời Chúa như nguồn mạch của sự canh tân liên lỉ cho Hội Thánh và việc loan báo Tin Mừng.',
    mainThemes: [
      'Thiên Chúa là Đấng nói Lời yêu thương',
      'Mối liên hệ giữa Thánh Thể và Lời Chúa',
      'Đọc Kinh Thánh trong đức tin của Hội Thánh',
      'Lời Chúa và việc đối thoại với các tôn giáo / văn hóa'
    ],
    summary: 'Đức Biển Đức XVI nhấn mạnh Kitô giáo không phải là một "tôn giáo của cuốn sách" mà là tôn giáo của Lời Thiên Chúa Nhập Thể nơi Đức Giêsu Kitô. Tông huấn hướng dẫn chi tiết cách thức thực hành Lectio Divina (Đọc, Suy niệm, Cầu nguyện, Chiêm niệm, Hành động).',
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
        excerpt: 'Lectio Divina mở đầu bằng Lectio (đọc cẩn thận), dẫn tới Meditatio (suy niệm Lời Chúa ngỏ với tôi điều gì), Oratio (cầu nguyện đáp lời Chúa), Contemplatio (chiêm ngắm Tôn Nhan Chúa) và Actio (hành động bác ái trong đời sống).',
        biblicalRoot: ['Lc 2,19.51', 'Gc 1,22'],
        theologicalKey: 'Linh đạo Lời Chúa trong truyền thống đan tu Công giáo.'
      }
    ],
    scriptureConnections: ['Ga 1,14', 'Dt 4,12', 'Lc 24,13-35'],
    topics: ['Lectio Divina', 'Lời Chúa', 'Phụng vụ', 'Truyền giáo', 'Biển Đức XVI']
  },
  {
    id: 'laudato-si',
    category: 'ENCYCLICAL',
    categoryName: 'Thông Điệp Môi Sinh Toàn Diện',
    latinTitle: 'Laudato Si\'',
    vietnameseTitle: 'Về Việc Chăm Sóc Ngôi Nhà Chung',
    promulgator: 'Đức Giáo Hoàng Phanxicô',
    promulgationDate: '24/05/2015',
    historicalContext: 'Cuộc khủng hoảng biến đổi khí hậu toàn cầu và sự suy thoái môi trường đe dọa trực tiếp người nghèo.',
    purpose: 'Kêu gọi toàn thể nhân loại bước vào cuộc hoán cải sinh thái và bảo vệ ngôi nhà chung.',
    mainThemes: [
      'Mọi sự đều liên kết chặt chẽ với nhau',
      'Tiếng kêu của trái đất và tiếng kêu của người nghèo',
      'Phê bình mô hình kỹ trị thống trị mù quáng',
      'Sinh thái toàn diện (Integral Ecology)'
    ],
    summary: 'Lấy cảm hứng từ Bài Ca Vạn Vật của Thánh Phanxicô Assisi, Đức Phanxicô khẳng định việc tàn phá thiên nhiên là một tội lỗi chống lại Đấng Tạo Hóa và chống lại người nghèo. Môi sinh không chỉ là vấn đề khoa học mà là vấn đề đạo đức, công bằng xã hội và linh đạo.',
    keySections: [
      {
        number: 'Số 49',
        heading: 'Lắng nghe tiếng kêu của đất và của người nghèo',
        excerpt: 'Cần có một cách tiếp cận sinh thái đích thực luôn luôn trở thành một cách tiếp cận xã hội... để lắng nghe vừa tiếng kêu của trái đất vừa tiếng kêu của người nghèo.',
        biblicalRoot: ['St 4,10', 'Tv 34,7'],
        theologicalKey: 'Mối liên kết bất khả phân giữa công bằng xã hội và bảo vệ môi trường.'
      }
    ],
    scriptureConnections: ['St 1,28-31', 'Tv 104', 'Cl 1,16'],
    topics: ['Môi sinh toàn diện', 'Ngôi nhà chung', 'Công bằng xã hội', 'Đức Phanxicô']
  }
];

export function getChurchDocumentById(id: string): ChurchDocumentItem | null {
  return CHURCH_DOCUMENTS_DATABASE.find(d => d.id === id) || null;
}
