import { NextRequest, NextResponse } from 'next/server';
import { CATECHISM_DATABASE, getCatechismByNumber } from '@/data/catechism-data';
import { CHURCH_DOCUMENTS_DATABASE } from '@/data/church-documents';
import { CATHOLIC_BIBLE_BOOKS } from '@/data/catholic-books';

export type AssistantMode = 
  | 'BIBLE_QA'            // 1. Hỏi đáp Kinh Thánh
  | 'CATECHISM_LOOKUP'     // 2. Tra cứu GLHTCG
  | 'THEOLOGY_STUDY'       // 3. Nghiên cứu thần học
  | 'CHURCH_DOCUMENTS'     // 4. Tra cứu văn kiện Hội Thánh
  | 'MEDITATION'           // 5. Suy niệm Lời Chúa
  | 'EXAM_PREP';           // 6. Hỗ trợ học tập và ôn thi

interface AssistantRequest {
  message: string;
  mode?: AssistantMode;
  context?: {
    bookId?: string;
    chapter?: number;
    verse?: number;
  };
}

interface AssistantResponse {
  answer: string;
  mode: AssistantMode;
  officialTeaching?: string;
  theologicalOpinion?: string;
  aiReflection?: string;
  citations: {
    scripture?: string[];
    ccc?: number[];
    churchDocs?: string[];
  };
  theologicalTheme: string;
  disclaimer: string;
}

// ============================================================================
// KHO KIẾN THỨC NỀN TẢNG THẦN HỌC & GIÁO LÝ CÔNG GIÁO
// ============================================================================
const CATHOLIC_KNOWLEDGE_BASE: {
  keywords: string[];
  theme: string;
  applicableModes: AssistantMode[];
  officialTeaching: string;
  theologicalOpinion: string;
  aiReflection: string;
  citations: { scripture: string[]; ccc: number[]; churchDocs: string[] };
}[] = [
  {
    keywords: ['73 sách', 'quy điển', 'deuterocanonical', 'đệ nhị quy điển', '66 sách', 'tin lành', 'thứ kinh'],
    theme: 'Quy Điển 73 Sách Kinh Thánh Công Giáo (Canon of Scripture)',
    applicableModes: ['BIBLE_QA', 'THEOLOGY_STUDY', 'EXAM_PREP'],
    officialTeaching: `Kinh Thánh Công giáo gồm trọn vẹn 73 cuốn sách (46 Cựu Ước và 27 Tân Ước). Công đồng Trentô (1546) trong sắc lệnh De Canonicis Scripturis đã định tín bất khả ngộ danh mục 73 sách này là Lời Thiên Chúa linh hứng trọn vẹn. 7 sách Đệ Nhị Quy Điển (Tôbia, Giuđitha, 1 & 2 Mác-ca-bê, Khôn Ngoan, Huấn Ca, Ba-rúc) thuộc truyền thống Kinh Thánh Hy Lạp Septuaginta (LXX) mà các Tông đồ và Giáo Hội sơ khai đã sử dụng và trích dẫn.`,
    theologicalOpinion: `Theo Thánh Augustinô và truyền thống Alexandria, các sách Đệ Nhị Quy Điển chứa đựng các chủ đề thần học thiết yếu như cầu nguyện cho người qua đời (2 Mcb 12,43-46), niềm tin vào sự phục sinh của thân xác và sự quan phòng thần linh, vốn đã được hoàn tất trọn vẹn nơi Đức Kitô.`,
    aiReflection: `Khi học hỏi Kinh Thánh, hãy đón nhận trọn bộ 73 cuốn sách như một lịch sử cứu độ duy nhất, nối liền Lời Hứa thời Cựu Ước với Sự Thành Toàn nơi Tân Ước.`,
    citations: {
      scripture: ['2 Tm 3,16', '2 Pr 1,20-21', '2 Mcb 12,43-46'],
      ccc: [120, 121, 138],
      churchDocs: ['Dei Verbum (số 11, 12, 14)', 'Công đồng Trentô (Sắc lệnh De Canonicis Scripturis)']
    }
  },
  {
    keywords: ['thánh thể', 'bánh hằng sống', 'eucharist', 'thịt và máu', 'ga 6', 'bữa tiệc ly', 'biến thể'],
    theme: 'Bí Tích Thánh Thể & Mầu Nhiệm Biến Thể',
    applicableModes: ['BIBLE_QA', 'CATECHISM_LOOKUP', 'THEOLOGY_STUDY', 'MEDITATION'],
    officialTeaching: `Bí tích Thánh Thể là "nguồn suối và đỉnh cao của toàn bộ đời sống Kitô giáo" (Lumen Gentium 11). Nhờ lời truyền phép của linh mục và tác động của Chúa Thánh Thần, trọn vẹn bản thể bánh và rượu biến đổi thành Thịt và Máu thật của Đức Kitô (Transubstantiatio - Biến Thể), dù các hình thể bên ngoài vẫn giữ nguyên (Công đồng Trentô; GLHTCG 1376).`,
    theologicalOpinion: `Thánh Tôma Aquinô (Summa Theologiae III, q. 75) giải thích: Chúa Kitô hiện diện không theo cách cục bộ vật lý, mà theo cách thức bản thể bí tích. Diễn từ Bánh Hằng Sống trong Ga 6 khẳng định tính hiện thực chứ không phải biểu tượng tượng trưng.`,
    aiReflection: `Mỗi lần rước lễ là cuộc kết hợp mật thiết nhất với Chúa Giêsu, mời gọi chúng ta trao hiến đời mình thành tấm bánh bẻ ra cho tha nhân.`,
    citations: {
      scripture: ['Ga 6,51-58', '1 Cr 11,23-26', 'Mt 26,26-28', 'Lc 22,19-20'],
      ccc: [1324, 1374, 1376, 1407],
      churchDocs: ['Lumen Gentium (số 11)', 'Sacrosanctum Concilium (số 47)', 'Ecclesia de Eucharistia (Thánh Gioan Phaolô II)']
    }
  },
  {
    keywords: ['phêrô', 'đá tảng', 'chìa khóa', 'quyền bính', 'giáo hoàng', 'mt 16', 'kế vị tông đồ'],
    theme: 'Quyền Thủ Lãnh Của Thánh Phêrô & Thừa Tác Vụ Giáo Hoàng',
    applicableModes: ['BIBLE_QA', 'THEOLOGY_STUDY', 'CHURCH_DOCUMENTS', 'EXAM_PREP'],
    officialTeaching: `Đức Giêsu đã đặt Thánh Phêrô làm thủ lãnh hữu hình của Nhóm Mười Hai và trao cho ngài quyền chìa khóa Nước Trời cùng quyền cầm buộc và tháo cởi (Mt 16,18-19; Ga 21,15-17). Giám mục Rôma (Đức Giáo Hoàng) là người kế vị Thánh Phêrô, là nguyên lý và nền tảng hữu hình, vĩnh cửu của sự hiệp nhất đức tin và lòng bác ái trong toàn Hội Thánh (Lumen Gentium 23; GLHTCG 882).`,
    theologicalOpinion: `Hình ảnh chiếc chìa khóa gợi nhớ trực tiếp đến Isaia 22,22 về chức quan quản gia hoàng cung nhà Đavít. Thừa tác vụ Phêrô không phải là sự thống trị độc đoán, mà là "tôi tớ của các tôi tớ Thiên Chúa" (Servus Servorum Dei) nhằm bảo vệ kho tàng đức tin tông truyền.`,
    aiReflection: `Cầu nguyện cho Đức Thánh Cha là trách nhiệm hiếu thảo của mọi người con trong Hội Thánh, gìn giữ tình hiệp thông trọn hảo với Tòa Thánh Phêrô.`,
    citations: {
      scripture: ['Mt 16,13-19', 'Ga 21,15-17', 'Lc 22,31-32', 'Is 22,22'],
      ccc: [881, 882, 883, 891],
      churchDocs: ['Lumen Gentium (số 18, 22, 23)', 'Pastor Aeternus (Công đồng Vaticanô I)']
    }
  },
  {
    keywords: ['đức mẹ', 'maria', 'vô nhiễm', 'lên trời', 'đồng trinh', 'mẹ thiên chúa', 'tín điều'],
    theme: 'Bốn Tín Điều Về Đức Trinh Nữ Maria',
    applicableModes: ['BIBLE_QA', 'CATECHISM_LOOKUP', 'THEOLOGY_STUDY', 'EXAM_PREP'],
    officialTeaching: `Hội Thánh Công giáo định tín 4 tín điều về Mẹ Maria: 1. Mẹ Thiên Chúa (Theotokos - Công đồng Êphêsô 431); 2. Trọn Đời Đồng Trinh (Công đồng Latêranô 649); 3. Vô Nhiễm Nguyên Tội (Ineffabilis Deus 1854 của Đức Piô IX); 4. Hồn Xác Lên Trời (Munificentissimus Deus 1950 của Đức Piô XII).`,
    theologicalOpinion: `Tất cả các đặc ân của Mẹ Maria đều xuất phát từ và quy hướng về Đức Giêsu Kitô. Mẹ là hình ảnh nguyên mẫu (Typus) của Hội Thánh: vâng phục trong đức tin và được tôn vinh mai sau trên quê trời.`,
    aiReflection: `Noi gương tiếng "Xin Vâng" (Fiat) của Mẹ giúp chúng ta luôn sẵn lòng để Lời Chúa cư ngụ và sinh hoa trái dồi dào trong cuộc đời.`,
    citations: {
      scripture: ['Lc 1,28.38.43', 'Ga 19,26-27', 'Kh 12,1', 'St 3,15'],
      ccc: [490, 495, 499, 966],
      churchDocs: ['Lumen Gentium (Chương VIII, số 52-69)', 'Ineffabilis Deus (1854)', 'Munificentissimus Deus (1950)']
    }
  },
  {
    keywords: ['ba ngôi', 'thiên chúa ba ngôi', 'chúa cha', 'chúa con', 'chúa thánh thần', 'trinity'],
    theme: 'Mầu Nhiệm Thiên Chúa Ba Ngôi Chí Thánh',
    applicableModes: ['BIBLE_QA', 'THEOLOGY_STUDY', 'EXAM_PREP'],
    officialTeaching: `Mầu nhiệm Thiên Chúa Ba Ngôi là mầu nhiệm trung tâm của đức tin và đời sống Kitô giáo (GLHTCG 234). Một Thiên Chúa duy nhất trong Ba Ngôi Vị: Chúa Cha, Chúa Con và Chúa Thánh Thần. Ba Ngôi Vị đồng bản thể (homoousios), có cùng một thần tính duy nhất và phân biệt nhau theo tương quan nguồn gốc.`,
    theologicalOpinion: `Thánh Augustinô (De Trinitate) dùng hình ảnh tâm trí con người (Ký ức, Tri hiểu, Yêu mến) để giải thích sự hiệp nhất; Thánh Tôma Aquinô diễn giải mầu nhiệm qua hai hành vi nội tại của Thiên Chúa: Tự tri hiểu (sinh ra Ngôi Lời) và Tự yêu mến (nhiệm xuất Chúa Thánh Thần).`,
    aiReflection: `Thiên Chúa chúng ta tôn thờ là Gia Đình Tình Yêu. Đời sống Kitô hữu là lời mời gọi bước vào mối hiệp thông thần linh ấy mỗi khi làm Dấu Thánh Giá.`,
    citations: {
      scripture: ['Mt 28,19', '2 Cr 13,13', 'Mt 3,16-17', 'Ga 14,26'],
      ccc: [234, 253, 254, 255],
      churchDocs: ['Kinh Tin Kính Nicea-Constantinopoli', 'Dei Verbum (số 2)']
    }
  },
  {
    keywords: ['xưng tội', 'hòa giải', 'sám hối', 'tha tội', 'linh mục', 'bí tích hòa giải'],
    theme: 'Bí Tích Hoà Giải & Lòng Thương Xót Tha Tội',
    applicableModes: ['BIBLE_QA', 'CATECHISM_LOOKUP', 'MEDITATION', 'EXAM_PREP'],
    officialTeaching: `Chúa Phục Sinh ban quyền tha tội cho các Tông đồ: "Anh em tha tội cho ai thì người ấy được tha; anh em cầm giữ ai thì người ấy bị cầm giữ" (Ga 20,22-23). Bí tích Hòa Giải tha thứ mọi tội lỗi phạm sau phép Rửa khi tín hữu thật lòng ăn ăn sám hối, xưng thú tội lỗi với linh mục có năng quyền và thực thi việc đền tội (GLHTCG 1440-1449).`,
    theologicalOpinion: `Bí tích không chỉ là phiên tòa tư pháp tha hình phạt, mà trước hết là việc chữa lành tâm linh của vị Lương Y Thần Linh và phục hồi tình cha con như trong Dụ ngôn Người Cha Nhân Hậu (Lc 15).`,
    aiReflection: `Đừng bao giờ sợ hãi khi đến tòa cáo giải, bởi vì lòng thương xót của Thiên Chúa luôn lớn hơn mọi lỗi lầm của nhân loại.`,
    citations: {
      scripture: ['Ga 20,21-23', 'Mt 18,18', 'Gc 5,16', 'Lc 15,11-32'],
      ccc: [1440, 1441, 1446, 1456, 1484],
      churchDocs: ['Reconciliatio et Paenitentia (Thánh Gioan Phaolô II)', 'Misericordiae Vultus (Đức Phanxicô)']
    }
  },
  {
    keywords: ['học thuyết xã hội', 'công bằng', 'lao động', 'người nghèo', 'phẩm giá', 'rerum novarum'],
    theme: 'Học Thuyết Xã Hội Công Giáo & Phẩm Giá Con Người',
    applicableModes: ['THEOLOGY_STUDY', 'CHURCH_DOCUMENTS', 'EXAM_PREP'],
    officialTeaching: `Con người được tạo dựng theo hình ảnh Thiên Chúa (St 1,26), có phẩm giá bất khả xâm phạm từ lúc thụ thai cho đến khi chết tự nhiên. Bốn nguyên tắc nền tảng của Học thuyết Xã hội Công giáo gồm: 1. Phẩm giá con người; 2. Lợi ích chung; 3. Nguyên tắc bổ trợ; 4. Nguyên tắc liên đới (Compendium of the Social Doctrine of the Church; GLHTCG 1928-1942).`,
    theologicalOpinion: `Bắt đầu từ Thông điệp Rerum Novarum (1891) của Đức Lêô XIII, Hội Thánh đã bênh vực quyền lợi người lao động trước chủ nghĩa tư bản hoang dã và cảnh báo nguy cơ chủ nghĩa duy vật, luôn đặt con người làm trung tâm của mọi hoạt động kinh tế.`,
    aiReflection: `Đức tin chân chính không tách rời khỏi bổn phận xã hội, mời gọi chúng ta phục vụ Đức Kitô đang hiện diện nơi những người nghèo khổ nhất.`,
    citations: {
      scripture: ['St 1,26-27', 'Mt 25,31-46', 'Am 5,24', 'Gc 2,14-17'],
      ccc: [1928, 1929, 1939, 2419, 2425],
      churchDocs: ['Rerum Novarum (1891)', 'Gaudium et Spes (số 26, 63-72)', 'Caritas in Veritate (2009)']
    }
  }
];

export async function POST(req: NextRequest) {
  try {
    const body: AssistantRequest = await req.json();
    const { message, mode = 'BIBLE_QA' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Nội dung tin nhắn không hợp lệ' }, { status: 400 });
    }

    const q = message.toLowerCase().trim();

    // 1. Kiểm tra tra cứu số GLHTCG trực tiếp (ví dụ: "GLHTCG 1324" hoặc "số 490")
    const cccNumMatch = q.match(/(?:glhtcg|giáo lý|số)\s*#?\s*(\d{1,4})/i);
    if (cccNumMatch || mode === 'CATECHISM_LOOKUP') {
      const num = cccNumMatch ? parseInt(cccNumMatch[1], 10) : null;
      if (num && num >= 1 && num <= 2865) {
        const article = getCatechismByNumber(num);
        if (article) {
          const resp: AssistantResponse = {
            theologicalTheme: `Giáo Lý Hội Thánh Công Giáo • Điều #${article.paragraphNumber}`,
            mode: 'CATECHISM_LOOKUP',
            officialTeaching: article.content,
            theologicalOpinion: `Điều ${article.paragraphNumber} thuộc ${article.pillarName}, chủ đề "${article.theme || article.title}". Đoạn văn trình bày chân lý đức tin được Hội Thánh gìn giữ và giảng dạy dựa trên Thánh Kinh và Thánh Truyền.`,
            aiReflection: `Hãy suy ngẫm số Giáo lý này để đào sâu hiểu biết về đức tin và sống gắn kết hơn với Chúa Kitô.`,
            citations: {
              ccc: [article.paragraphNumber],
              scripture: article.scripturalFoundations || [],
              churchDocs: article.relatedParagraphs?.map((r: number) => `GLHTCG #${r}`) || []
            },
            disclaimer: 'Trợ lý AI là công cụ hỗ trợ học hỏi, không phải là Huấn quyền Hội Thánh và không thay thế sự hướng dẫn mục vụ.',
            answer: `### Giáo Lý Hội Thánh Công Giáo • Điều #${article.paragraphNumber}\n\n**1. [Giáo huấn chính thức của Hội Thánh]:**\n${article.content}\n\n**2. [Chú giải & Bối cảnh Thần học]:**\nThuộc phần: **${article.pillarName}** &bull; **${article.theme || article.title}**\n\n**3. [Trích dẫn nguồn]:**\n- GLHTCG: Số ${article.paragraphNumber}\n- Kinh Thánh liên hệ: ${article.scripturalFoundations?.join(', ') || 'Không có'}`
          };
          return NextResponse.json(resp);
        }
      }
    }

    // 2. Tìm kiếm trong cơ sở kiến thức phù hợp theo từ khóa và chế độ
    const matched = CATHOLIC_KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((k) => q.includes(k.toLowerCase()))
    );

    if (matched) {
      let formattedAnswer = `### ${matched.theme}\n\n`;
      formattedAnswer += `**1. [Giáo huấn chính thức của Hội Thánh]:**\n${matched.officialTeaching}\n\n`;
      formattedAnswer += `**2. [Nhận định Thần học & Chú giải học thuật]:**\n${matched.theologicalOpinion}\n\n`;
      formattedAnswer += `**3. [Gợi ý Suy niệm & Ứng dụng đời sống]:**\n${matched.aiReflection}\n\n`;
      formattedAnswer += `**4. [Nguồn trích dẫn cụ thể]:**\n`;
      if (matched.citations.scripture?.length) {
        formattedAnswer += `- **Kinh Thánh:** ${matched.citations.scripture.join(', ')}\n`;
      }
      if (matched.citations.ccc?.length) {
        formattedAnswer += `- **Sách Giáo Lý (GLHTCG):** Số ${matched.citations.ccc.join(', ')}\n`;
      }
      if (matched.citations.churchDocs?.length) {
        formattedAnswer += `- **Văn kiện Huấn Quyền:** ${matched.citations.churchDocs.join('; ')}\n`;
      }

      const resp: AssistantResponse = {
        answer: formattedAnswer,
        mode,
        theologicalTheme: matched.theme,
        officialTeaching: matched.officialTeaching,
        theologicalOpinion: matched.theologicalOpinion,
        aiReflection: matched.aiReflection,
        citations: matched.citations,
        disclaimer: 'Trợ lý AI là công cụ hỗ trợ học hỏi Kinh Thánh & Thần học, không phải là Huấn quyền Hội Thánh và không thay thế sự hướng dẫn mục vụ của các Chủ Chăn.'
      };

      return NextResponse.json(resp);
    }

    // 3. Phản hồi chung có kiểm soát và phân định nguồn minh bạch
    let generalTheme = 'Học Hỏi Giáo Huấn & Kinh Thánh Công Giáo';
    let generalAnswer = `Về thắc mắc: **"${message.trim()}"**\n\n`;

    if (mode === 'EXAM_PREP') {
      generalAnswer += `**[Hỗ trợ Ôn Tập Giáo Lý & Kinh Thánh]:**\n`;
      generalAnswer += `1. **Khái niệm trọng tâm:** Hãy đối chiếu câu hỏi của bạn với 4 Trụ Cột của GLHTCG (Tuyên Xưng Đức Tin, Cử Hành Bí Tích, Đời Sống Luân Lý, Kinh Nguyện).\n`;
      generalAnswer += `2. **Gợi ý tra cứu:** Sử dụng thanh tìm kiếm toàn trang để tra các số Giáo lý liên quan hoặc câu Kinh Thánh chủ chốt.\n`;
      generalAnswer += `3. **Lưu ý khảo thí:** Trong các kỳ thi giáo lý, luôn trích dẫn kèm sách/chương/câu Kinh Thánh hoặc số Giáo lý cụ thể để đạt điểm trọn vẹn.\n\n`;
    } else if (mode === 'MEDITATION') {
      generalAnswer += `**[Gợi ý Suy Niệm Lời Chúa (Lectio Divina)]:**\n`;
      generalAnswer += `1. **Lectio (Đọc):** Lắng nghe Lời Chúa với tâm hồn thanh tịnh và cởi mở.\n`;
      generalAnswer += `2. **Meditatio (Suy niệm):** Chúa muốn nói gì với tôi qua thắc mắc này?\n`;
      generalAnswer += `3. **Oratio (Cầu nguyện):** Thưa chuyện cùng Chúa tâm tình chân thành nhất.\n`;
      generalAnswer += `4. **Actio (Hành động):** Đưa Lời Chúa vào thực tế đời sống bác ái hôm nay.\n\n`;
    } else {
      generalAnswer += `**1. [Giáo huấn Hội Thánh liên quan]:**\n`;
      generalAnswer += `Mọi vấn đề đức tin và luân lý trong Hội Thánh Công giáo đều được soi chiếu qua hai nguồn mạch duy nhất là Thánh Kinh và Thánh Truyền, dưới sự giải thích có thẩm quyền của Huấn Quyền (Dei Verbum 10).\n\n`;
      generalAnswer += `**2. [Gợi ý tra cứu chính xác]:**\n`;
      generalAnswer += `- Để tìm hiểu chi tiết, bạn có thể tra cứu trực tiếp trong mục **Giáo Lý (GLHTCG)** với 2.865 điều khoản hoặc chuyên mục **Nghiên Cứu Thần Học**.\n`;
      generalAnswer += `- Bạn có thể gõ rõ hơn từ khóa (ví dụ: *"73 sách Kinh Thánh"*, *"Bí tích Thánh Thể"*, *"Thánh Phêrô"*, *"Đức Mẹ Maria"*, *"Số Giáo lý 1324"*).\n\n`;
    }

    generalAnswer += `*Lưu ý: Nếu nội dung này chưa xác minh được trích dẫn Huấn quyền cụ thể, vui lòng tham khảo trực tiếp ý kiến của Linh mục quản xứ hoặc người đồng hành thiêng liêng.*`;

    return NextResponse.json({
      answer: generalAnswer,
      mode,
      theologicalTheme: generalTheme,
      citations: {
        scripture: ['Dt 4,12', '2 Tm 3,16'],
        ccc: [84, 85, 100],
        churchDocs: ['Dei Verbum (số 9, 10)']
      },
      disclaimer: 'Trợ lý AI là công cụ hỗ trợ học hỏi Kinh Thánh & Thần học, không phải là Huấn quyền Hội Thánh và không thay thế sự hướng dẫn mục vụ của các Chủ Chăn.'
    });

  } catch (error: any) {
    console.error('[Assistant API Error]:', error);
    return NextResponse.json({ error: 'Đã xảy ra sự cố xử lý câu hỏi.' }, { status: 500 });
  }
}
