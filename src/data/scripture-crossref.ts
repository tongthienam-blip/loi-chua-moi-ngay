// ============================================================================
// BẢNG LIÊN KẾT KINH THÁNH - GIÁO LÝ - VĂN KIỆN CÔNG GIÁO
// Scripture ↔ CCC ↔ Church Documents Cross-Reference Database
// ============================================================================

export interface ScriptureCrossReferenceEntry {
  id: string;
  bibleReference: string;              // Vd: "Ga 3,16"
  bookId: string;
  chapter: number;
  verse: number;
  verseText: string;
  theme: string;                       // Chủ đề thần học
  cccLinks: {
    paragraphNumber: number;
    title: string;
    summary: string;
  }[];
  churchDocumentLinks: {
    documentId: string;
    documentName: string;
    documentYear: number;
    section: string;
    relevantText: string;
  }[];
  crossReferences: string[];           // Các câu Kinh Thánh liên quan
  catholicTraditionNote: string;       // Nhận định truyền thống Công giáo
}

export const SCRIPTURE_CROSSREF_DATABASE: ScriptureCrossReferenceEntry[] = [
  {
    id: 'xref-ga-3-16',
    bibleReference: 'Ga 3,16',
    bookId: 'john',
    chapter: 3,
    verse: 16,
    verseText: 'Thiên Chúa yêu thế gian đến nỗi đã ban Con Một, để ai tin vào Con của Người thì khỏi phải chết, nhưng được sống muôn đời.',
    theme: 'Tình yêu Thiên Chúa & Ơn Cứu Độ',
    cccLinks: [
      {
        paragraphNumber: 458,
        title: 'Tại sao Ngôi Lời đã làm người?',
        summary: 'Ngôi Lời Thiên Chúa nhập thể "để cứu độ chúng ta" qua sự giao hoà với Thiên Chúa, để hiểu biết tình yêu của Thiên Chúa, để là mẫu gương sự thánh thiện và để cho chúng ta tham dự vào bản tính Thiên Chúa (GLHTCG 457-460).'
      },
      {
        paragraphNumber: 601,
        title: 'Hy lễ cứu chuộc trong kế hoạch Thiên Chúa',
        summary: 'Cái chết cứu chuộc của Đức Kitô là kế hoạch tình thương của Thiên Chúa. Thiên Chúa "đã muốn Con của Người trở thành người và chết vì chúng ta" (Rm 8,32).'
      },
      {
        paragraphNumber: 679,
        title: 'Đức Kitô - Thẩm Phán và Đấng Cứu Độ',
        summary: 'Chính sự từ chối tin tưởng vào tình thương của Thiên Chúa được tỏ bày nơi Đức Kitô mới là án phạt đích thực.'
      }
    ],
    churchDocumentLinks: [
      {
        documentId: 'dei-verbum',
        documentName: 'Dei Verbum - Hiến Chế Tín Lý về Mạc Khải',
        documentYear: 1965,
        section: 'Số 2: Bản chất và đối tượng của Mạc khải',
        relevantText: 'Qua cuộc mạc khải này, Thiên Chúa vô hình trong tình yêu thương vô biên đã ngỏ lời với con người như với bạn hữu và sống giữa họ, để mời gọi và đón nhận họ vào sự thông hiệp với Người.'
      },
      {
        documentId: 'evangelii-gaudium',
        documentName: 'Evangelii Gaudium - Niềm Vui Tin Mừng',
        documentYear: 2013,
        section: 'Số 1: Niềm vui Tin Mừng',
        relevantText: 'Niềm vui Tin Mừng lấp đầy tâm hồn và toàn bộ cuộc sống của những ai gặp gỡ Chúa Giêsu. Những ai chấp nhận lời đề nghị cứu rỗi của Người được giải phóng khỏi tội lỗi, buồn phiền, trống rỗng nội tâm và sự cô đơn.'
      }
    ],
    crossReferences: ['Rm 5,8', 'Ga 10,11', '1 Ga 4,9-10', 'Ga 1,14', 'Rm 8,32'],
    catholicTraditionNote: 'Thánh Augustinô gọi Ga 3,16 là "Tin Mừng trong Tin Mừng". Đây là câu Kinh Thánh được trích dẫn nhiều nhất trong lịch sử Kitô giáo. Giáo lý Công giáo nhấn mạnh: tình yêu Thiên Chúa không phải phản ứng với sự xứng đáng của con người, mà là sáng kiến nhưng không thuần túy.'
  },
  {
    id: 'xref-mt-28-19',
    bibleReference: 'Mt 28,19',
    bookId: 'matt',
    chapter: 28,
    verse: 19,
    verseText: 'Vậy anh em hãy đi và làm cho muôn dân trở thành môn đệ, làm phép rửa cho họ nhân danh Chúa Cha, Chúa Con và Chúa Thánh Thần.',
    theme: 'Sứ Mạng Truyền Giáo & Mầu Nhiệm Ba Ngôi',
    cccLinks: [
      {
        paragraphNumber: 232,
        title: 'Mầu nhiệm Thiên Chúa Ba Ngôi - Trung tâm đức tin',
        summary: 'Mầu nhiệm Chúa Ba Ngôi Chí Thánh là mầu nhiệm trung tâm của đức tin và đời sống Kitô giáo. Chính vì vậy mà tín hữu được rửa tội "nhân danh Chúa Cha, Chúa Con và Chúa Thánh Thần".'
      },
      {
        paragraphNumber: 849,
        title: 'Nguồn gốc và hình thức sứ mạng',
        summary: 'Hội Thánh vốn truyền giáo theo bản chất. Hội Thánh hoàn thành sứ mạng qua đối thoại, chứng tá và rao giảng Tin Mừng.'
      },
      {
        paragraphNumber: 1223,
        title: 'Nguồn gốc bí tích Phép Rửa',
        summary: 'Chúa Giêsu phục sinh trao lệnh cho các Tông đồ: "Hãy đi và làm cho muôn dân trở thành môn đệ, làm phép rửa cho họ..." — thiết lập Bí tích Rửa Tội.'
      }
    ],
    churchDocumentLinks: [
      {
        documentId: 'ad-gentes',
        documentName: 'Ad Gentes - Sắc Lệnh về Hoạt Động Truyền Giáo',
        documentYear: 1965,
        section: 'Số 2: Giáo thuyết về truyền giáo',
        relevantText: 'Hội Thánh lữ hành, tự bản chất là truyền giáo vì chính Hội Thánh phát xuất từ sứ mạng của Chúa Con và Chúa Thánh Thần, theo kế hoạch của Thiên Chúa Cha.'
      },
      {
        documentId: 'evangelii-nuntiandi',
        documentName: 'Evangelii Nuntiandi - Loan Báo Tin Mừng',
        documentYear: 1975,
        section: 'Số 14: Đức Kitô là Tin Mừng đầu tiên',
        relevantText: 'Không có Tin Mừng thực sự nếu thiếu danh thánh, giáo lý, cuộc sống, những lời hứa, Nước Trời và mầu nhiệm của Giêsu thành Nadarét, Con Thiên Chúa.'
      }
    ],
    crossReferences: ['Mc 16,15', 'Lc 24,47', 'Cv 1,8', 'Rm 10,15', 'Mt 28,20'],
    catholicTraditionNote: 'Lệnh truyền cuối cùng của Chúa Phục Sinh (Mandatum Missionis) xác định chiều kích phổ quát và Ba Ngôi của sứ mạng Hội Thánh. Phép Rửa nhân danh Ba Ngôi không phải công thức ma thuật mà là sự tham dự vào đời sống nội tâm của Thiên Chúa.'
  },
  {
    id: 'xref-lc-22-19',
    bibleReference: 'Lc 22,19',
    bookId: 'luke',
    chapter: 22,
    verse: 19,
    verseText: 'Rồi Người cầm lấy bánh, dâng lời tạ ơn, bẻ ra, trao cho môn đệ và nói: "Đây là mình Thầy, hiến trao vì anh em. Anh em hãy làm việc này mà tưởng nhớ đến Thầy."',
    theme: 'Bí Tích Thánh Thể & Hy Tế Vượt Qua',
    cccLinks: [
      {
        paragraphNumber: 1337,
        title: 'Chúa Giêsu lập Bí tích Thánh Thể',
        summary: 'Chúa Giêsu thiết lập Bí tích Thánh Thể như là tưởng niệm Vượt Qua của Người, tức là hiến tế của Người trên Thập Giá sẽ xảy ra một lần dứt khoát.'
      },
      {
        paragraphNumber: 1366,
        title: 'Thánh Thể là Hy Tế',
        summary: 'Vì đây là tưởng niệm cuộc Vượt Qua của Đức Kitô, Thánh Thể cũng là hy lễ. Tính cách hy lễ của Thánh Thể được Chúa Giêsu tỏ lộ ngay trong đêm thiết lập.'
      },
      {
        paragraphNumber: 1382,
        title: 'Bàn Tiệc Thánh Thể',
        summary: 'Thánh Lễ đồng thời và không tách rời là lễ tưởng niệm Hy Tế và Bàn Tiệc Thánh. Thực vậy, mối liên hệ giữa Hy Tế và Bàn Tiệc rõ ràng trong lời Chúa Giêsu trao chính Mình Người.'
      }
    ],
    churchDocumentLinks: [
      {
        documentId: 'sacrosanctum-concilium',
        documentName: 'Sacrosanctum Concilium - Hiến Chế về Phụng Vụ',
        documentYear: 1963,
        section: 'Số 47: Bí tích Thánh Thể',
        relevantText: 'Vào đêm bị nộp, Đấng Cứu Thế của chúng ta đã thiết lập Hy Tế Thánh Thể, Mình và Máu của Người, để duy trì Hy Tế Thập Giá qua các thế kỷ.'
      },
      {
        documentId: 'ecclesia-eucharistia',
        documentName: 'Ecclesia de Eucharistia - Hội Thánh sống từ Thánh Thể',
        documentYear: 2003,
        section: 'Số 11: Thánh Thể và Hội Thánh',
        relevantText: 'Hội Thánh "sống từ" Thánh Thể. Đây không chỉ là biểu thức đức tin có tính kinh nghiệm, mà còn chứa đựng cốt lõi của mầu nhiệm Hội Thánh. Hội Thánh khơi nguồn sự sống và sức mạnh từ sự sung mãn của mầu nhiệm này.'
      }
    ],
    crossReferences: ['Mt 26,26-29', 'Mc 14,22-25', '1 Cr 11,23-26', 'Ga 6,51-58', 'Xh 12,14'],
    catholicTraditionNote: 'Lệnh "Hãy làm việc này mà tưởng nhớ đến Thầy" (Hoc facite in meam commemorationem) là nền tảng thần học của chức Linh Mục và Thánh Lễ. Thánh Gioan Kim Khẩu: "Thánh Lễ chúng ta dâng ngày nay và Thánh Lễ Chúa Giêsu dâng lần đầu tiên là MỘT Hy Tế duy nhất."'
  },
  {
    id: 'xref-st-1-27',
    bibleReference: 'St 1,27',
    bookId: 'gen',
    chapter: 1,
    verse: 27,
    verseText: 'Thiên Chúa sáng tạo con người theo hình ảnh mình, Thiên Chúa sáng tạo con người theo hình ảnh Thiên Chúa, Thiên Chúa sáng tạo con người có nam có nữ.',
    theme: 'Phẩm Giá Con Người & Hôn Nhân',
    cccLinks: [
      {
        paragraphNumber: 355,
        title: 'Con người được tạo dựng theo hình ảnh Thiên Chúa',
        summary: '"Thiên Chúa tạo dựng con người theo hình ảnh Người, theo hình ảnh Thiên Chúa, Người tạo dựng con người có nam có nữ." Con người chiếm chỗ đứng độc nhất vô nhị trong công trình tạo dựng: được tạo dựng theo hình ảnh Thiên Chúa (Imago Dei).'
      },
      {
        paragraphNumber: 369,
        title: 'Người nam và người nữ',
        summary: 'Người nam và người nữ được tạo dựng, nghĩa là được Thiên Chúa muốn: trong sự bình đẳng hoàn hảo như những nhân vị con người, và đồng thời trong nhân tính nam và nhân tính nữ của họ.'
      },
      {
        paragraphNumber: 1601,
        title: 'Hôn Nhân trong kế hoạch Thiên Chúa',
        summary: '"Thiên Chúa tạo dựng con người có nam có nữ... Vì lý do đó, người đàn ông sẽ lìa cha mẹ mà gắn bó với vợ mình." Chính Thiên Chúa là tác giả của hôn nhân.'
      }
    ],
    churchDocumentLinks: [
      {
        documentId: 'gaudium-et-spes',
        documentName: 'Gaudium et Spes - Hiến Chế Mục Vụ',
        documentYear: 1965,
        section: 'Số 12: Con người theo hình ảnh Thiên Chúa',
        relevantText: 'Theo đức tin Kitô giáo, toàn bộ đời sống con người, cá nhân cũng như tập thể, là một cuộc đấu tranh thường xuyên và gay go giữa thiện và ác, giữa ánh sáng và tối tăm.'
      },
      {
        documentId: 'mulieris-dignitatem',
        documentName: 'Mulieris Dignitatem - Phẩm Giá Người Phụ Nữ',
        documentYear: 1988,
        section: 'Số 6: Imago Dei trong nam và nữ',
        relevantText: 'Cả hai, người nam và người nữ, đều là hình ảnh Thiên Chúa, không chỉ riêng lẻ mà là với tư cách là cộng đồng nhân vị.'
      }
    ],
    crossReferences: ['St 2,24', 'Kn 2,23', 'Ep 4,24', 'Cl 3,10', 'Mt 19,4-6'],
    catholicTraditionNote: 'Thánh Gioan Phaolô II phát triển "Thần học Thân xác" (Theology of the Body) dựa trên St 1,27, khẳng định: thân xác con người là "bí tích nguyên thủy" - dấu hiệu hữu hình của tình yêu vô hình của Thiên Chúa.'
  },
  {
    id: 'xref-mc-10-45',
    bibleReference: 'Mc 10,45',
    bookId: 'mark',
    chapter: 10,
    verse: 45,
    verseText: 'Vì Con Người đến không phải để được người ta phục vụ, nhưng là để phục vụ, và hiến dâng mạng sống làm giá chuộc muôn người.',
    theme: 'Tinh Thần Phục Vụ & Thừa Tác Vụ Linh Mục',
    cccLinks: [
      {
        paragraphNumber: 786,
        title: 'Dân Thiên Chúa thông phần chức vụ tư tế, ngôn sứ và vương đế của Đức Kitô',
        summary: 'Đức Kitô, Vua và Chúa chúng ta, trị vì không phải bằng quyền lực áp đặt mà bằng sự phục vụ. Các môn đệ Người được mời gọi thực thi quyền lực theo cùng thể thức ấy.'
      },
      {
        paragraphNumber: 1551,
        title: 'Thừa tác vụ phục vụ',
        summary: 'Chức Linh Mục thừa tác là đặt vào phục vụ chức Linh Mục chung của tín hữu. Nó quy hướng về sự triển nở ân sủng bí tích của tất cả Kitô hữu.'
      }
    ],
    churchDocumentLinks: [
      {
        documentId: 'lumen-gentium',
        documentName: 'Lumen Gentium - Hiến Chế Tín Lý về Hội Thánh',
        documentYear: 1964,
        section: 'Số 29: Phó tế phục vụ',
        relevantText: 'Tăng thêm sức sống cho thừa tác vụ Hội Thánh... Đây là điều tốt lành cho Hội Thánh vì những người chuyên tâm lo công việc phục vụ từ thiện.'
      },
      {
        documentId: 'presbyterorum-ordinis',
        documentName: 'Presbyterorum Ordinis - Sắc Lệnh về Thừa Tác Linh Mục',
        documentYear: 1965,
        section: 'Số 2: Bản chất và sứ mạng linh mục',
        relevantText: 'Các linh mục, nhờ việc thụ phong, được đồng hóa với Đức Kitô Linh Mục, như là thừa tác viên của Đầu để xây dựng và cai quản Thân Thể mình là Hội Thánh.'
      }
    ],
    crossReferences: ['Mt 20,28', 'Ga 13,14', 'Pl 2,5-8', 'Is 53,10-11', 'Lc 22,27'],
    catholicTraditionNote: 'Câu này kết thúc bài dạy về sự phục vụ tại Mc 10,35-45 — phản biện trực tiếp tranh chấp quyền lực trong nhóm Mười Hai. Chúa Giêsu không bác bỏ quyền bính trong Hội Thánh mà định nghĩa lại: quyền bính đích thực là phục vụ từ tình yêu.'
  }
];
