import { NextRequest, NextResponse } from 'next/server';

interface AssistantRequest {
  message: string;
  context?: {
    bookId?: string;
    bookName?: string;
    chapter?: number;
    verse?: number;
  };
}

interface AssistantResponse {
  answer: string;
  citations: {
    scripture?: string[];
    ccc?: number[];
    churchDocs?: string[];
  };
  theologicalTheme: string;
}

// Kho kiến thức thần học Công giáo chính xác và chuẩn mực phục vụ phản hồi
const CATHOLIC_KNOWLEDGE_BASE: {
  keywords: string[];
  theme: string;
  answer: string;
  citations: { scripture: string[]; ccc: number[]; churchDocs: string[] };
}[] = [
  {
    keywords: ['73 sách', 'quy điển', 'deuterocanonical', 'đệ nhị quy điển', '66 sách', 'tin lành'],
    theme: 'Quy Điển Kinh Thánh Công Giáo (Canon of Scripture)',
    answer: `Kinh Thánh Công giáo bao gồm trọn vẹn **73 cuốn sách** (46 sách Cựu Ước và 27 sách Tân Ước). 

1. **Nguồn gốc lịch sử:** Hội Thánh sơ khai kế thừa bản dịch Kinh Thánh Hy Lạp **Septuaginta (Bản Bảy Mươi - LXX)** vốn được cộng đồng Do Thái hải ngoại sử dụng rộng rãi và được chính các Tác giả Tân Ước trích dẫn trên 80% trong các bản văn Tin Mừng và Thư Tín.
2. **7 Sách Đệ Nhị Quy Điển (Deuterocanonical):** Gồm Tôbia, Giuđitha, 1 & 2 Mác-ca-bê, Khôn Ngoan, Huấn Ca (Sirach), Ba-rúc và một số phần của sách Ét-te và Đa-ni-en.
3. **Sự xác chuẩn của Hội Thánh:** Bản danh mục 73 sách được công bố chính thức tại Công đồng Hippo (năm 393), Công đồng Carthage (397, 419), Công đồng Florence (1442) và được định tín bất khả ngộ tại **Công đồng Trentô (1546)** trước phong trào Cải Cách Tin Lành vốn đã loại bỏ 7 cuốn sách này ra khỏi quy điển.
4. **Giáo huấn Hội Thánh:** Hiến chế Tín lý *Dei Verbum* số 11 khẳng định: "Tất cả các sách Cựu Ước cũng như Tân Ước cùng với mọi thành phần của các sách ấy đều được viết dưới sự linh hứng của Chúa Thánh Thần, có Thiên Chúa là tác giả và được lưu truyền cho Hội Thánh."`,
    citations: {
      scripture: ['2 Tm 3,16', '2 Pr 1,20-21'],
      ccc: [120, 121, 138],
      churchDocs: ['Dei Verbum (số 11, 12, 14)']
    }
  },
  {
    keywords: ['thánh thể', 'bánh hằng sống', 'eucharist', 'thịt và máu', 'ga 6', 'bữa tiệc ly'],
    theme: 'Bí Tích Thánh Thể & Hy Tế Vượt Qua',
    answer: `Bí tích Thánh Thể là **"nguồn suối và đỉnh cao của toàn bộ đời sống Kitô giáo"** (Lumen Gentium 11).

1. **Diễn từ Bánh Hằng Sống (Ga 6,51-58):** Chúa Giêsu không nói theo nghĩa biểu tượng thuần túy, mà nhấn mạnh mạnh mẽ: *"Thịt tôi thật là của ăn, và máu tôi thật là của uống. Ai ăn thịt và uống máu tôi, thì ở lại trong tôi và tôi ở lại trong người ấy."* Khi nhiều môn đệ rút lui vì lời giảng quá cứng cỏi, Chúa không cải chính theo nghĩa bóng mà quay sang hỏi Nhóm Mười Hai: *"Cả anh em nữa, anh em cũng muốn bỏ đi sao?"* (Ga 6,67).
2. **Bữa Tiệc Ly (Mt 26,26-28; 1 Cr 11,23-26):** Chúa Giêsu thiết lập Hy tế Giao Ước Mới: *"Này là mình Thầy... Này là máu Thầy"*. Ngài truyền cho các Tông đồ: *"Hãy làm việc này mà nhớ đến Thầy"*.
3. **Thuyết Biến Thể (Transubstantiation):** Theo giáo huấn Công đồng Trentô và GLHTCG, qua lời truyền phép của tư tế và quyền năng Chúa Thánh Thần, trọn vẹn bản thể bánh và rượu biến đổi thành Thịt và Máu thật của Chúa Kitô (Mình, Máu, Linh hồn và Thần tính), dù hình thức bên ngoài (màu sắc, mùi vị) vẫn giữ nguyên.`,
    citations: {
      scripture: ['Ga 6,51-58', '1 Cr 11,23-26', 'Mt 26,26-28', 'Lc 22,19-20'],
      ccc: [1324, 1374, 1376, 1407],
      churchDocs: ['Lumen Gentium (số 11)', 'Sacrosanctum Concilium (số 47)']
    }
  },
  {
    keywords: ['phêrô', 'đá tảng', 'chìa khóa', 'quyền bính', 'giáo hoàng', 'mt 16'],
    theme: 'Địa Vị Thủ Lãnh Của Thánh Phêrô & Thừa Tác Vụ Giáo Hoàng',
    answer: `Trong Tin Mừng Mátthêu (Mt 16,13-19), tại miền Xê-da-rê Phi-líp, sau khi Simon tuyên xưng: *"Thầy là Đấng Kitô, Con Thiên Chúa hằng sống"*, Chúa Giêsu đã thiết lập quyền thủ lãnh của ông trên Hội Thánh:

1. **Đổi tên thành Phêrô (Petros - Đá Tảng):** *"Anh là Phêrô, nghĩa là Tảng Đá, trên tảng đá này, Thầy sẽ xây Hội Thánh của Thầy, và quyền lực tử thần sẽ không thắng nổi."* (Mt 16,18). Trong Kinh Thánh, việc Thiên Chúa đổi tên (như Áp-ram thành Áp-ra-ham) luôn gắn liền với một sứ mạng cứu độ nền tảng.
2. **Quyền Trao Chìa Khóa Nước Trời:** Hình ảnh này liên hệ trực tiếp với Isaia 22,22, trao quyền tể tướng quản lý nhà Đavít. Chìa khóa biểu thị quyền bính cai quản, giảng dạy và dẫn dắt đoàn chiên.
3. **Quyền Cầm Buộc Và Tháo Cởi:** Một thuật ngữ kinh sư biểu thị thẩm quyền công bố chuẩn tắc đức tin, kỷ luật và tha tội nhân danh Chúa Kitô.
4. **Sứ Mạng Chăn Dắt Toàn Thể Đoàn Chiên (Ga 21,15-17):** Sau Phục Sinh, Chúa Giêsu trao phó cụ thể: *"Hãy chăm sóc chiên con của Thầy... Hãy chăn dắt chiên mẹ của Thầy"*.
5. **Kế nhiệm Phêrô:** Giám mục Rôma (Đức Giáo Hoàng) là Đấng kế vị Thánh Phêrô, là nguyên lý và nền tảng hữu hình, vĩnh cửu của sự hiệp nhất đức tin và tình hiệp thông trong toàn Hội Thánh (Lumen Gentium 23).`,
    citations: {
      scripture: ['Mt 16,13-19', 'Ga 21,15-17', 'Lc 22,31-32', 'Is 22,22'],
      ccc: [881, 882, 883, 891],
      churchDocs: ['Lumen Gentium (số 18, 22, 23)', 'Pastor Aeternus (Vatican I)']
    }
  },
  {
    keywords: ['đức mẹ', 'maria', 'vô nhiễm', 'lên trời', 'đồng trinh', 'mẹ thiên chúa'],
    theme: 'Bốn Tín Điều Về Đức Maria Trong Thần Học Công Giáo',
    answer: `Hội Thánh Công giáo định tín **Bốn Tín Điều** cốt lõi về Đức Maria, tất cả đều quy hướng về mầu nhiệm Nhập Thể và Cứu Độ của Chúa Giêsu:

1. **Mẹ Thiên Chúa (Theotokos):** Được Công đồng Ê-phê-sô (431) tuyên tín dựa trên Lc 1,43 (bà Ê-li-sa-bét gọi Mẹ là *"Thân Mẫu Chúa tôi"*). Vì Chúa Giêsu là một Ngôi Vị Thiên Chúa duy nhất với hai bản tính (Thiên Chúa và Con Người), nên Mẹ Maria đích thực là Mẹ Thiên Chúa.
2. **Trọn Đời Đồng Trinh (Aeiparthenos):** Mẹ thụ thai Chúa Giêsu bởi phép Chúa Thánh Thần mà không cần đến sự cộng tác của người nam (Lc 1,34-35; Mt 1,18-25).
3. **Vô Nhiễm Nguyên Tội (Immaculata Conceptio):** Được Đức Chân phước Piô IX tuyên tín năm 1854 (*Ineffabilis Deus*). Nhờ ân sủng tiên triệu phát sinh từ công nghiệp cứu chuộc của Đức Kitô, Mẹ được gìn giữ khỏi mọi tì ố của tội nguyên tổ ngay từ giây phút thụ thai.
4. **Hồn Xác Lên Trời (Assumptio):** Được Đức Piô XII tuyên tín năm 1950 (*Munificentissimus Deus*). Hoàn tất cuộc đời dương thế, Mẹ được đưa cả hồn lẫn xác vào vinh quang thiên quốc, báo trước niềm hy vọng phục sinh của thân xác các tín hữu.`,
    citations: {
      scripture: ['Lc 1,28.43', 'Ga 19,26-27', 'Kh 12,1', 'St 3,15'],
      ccc: [490, 495, 499, 966],
      churchDocs: ['Lumen Gentium (Chương VIII, số 52-69)', 'Ineffabilis Deus (1854)', 'Munificentissimus Deus (1950)']
    }
  },
  {
    keywords: ['ba ngôi', 'thiên chúa ba ngôi', 'chúa cha', 'chúa con', 'chúa thánh thần', 'trinity'],
    theme: 'Mầu Nhiệm Trung Tâm: Thiên Chúa Ba Ngôi Chí Thánh',
    answer: `Mầu nhiệm Thiên Chúa Ba Ngôi là **mầu nhiệm trung tâm của đức tin và đời sống Kitô giáo** (GLHTCG 234).

1. **Một Thiên Chúa duy nhất trong Ba Ngôi Vị:** Chúa Cha, Chúa Con và Chúa Thánh Thần. Ba Ngôi không chia nhau một thần tính duy nhất, nhưng mỗi Ngôi Vị là trọn vẹn Thiên Chúa, đồng bản thể (*homoousios*), có cùng quyền năng và uy linh vĩnh cửu.
2. **Nền tảng Kinh Thánh:**
   - Lệnh truyền Phép Rửa: *"Anh em hãy đi giảng dạy cho muôn dân, làm phép rửa cho họ nhân danh Chúa Cha, và Chúa Con và Chúa Thánh Thần"* (Mt 28,19).
   - Lời chúc phúc của Thánh Phaolô: *"Cầu chúc toàn thể anh em được đầy tràn ân sủng của Chúa Giêsu Kitô, tình yêu của Chúa Cha, và ơn thông hiệp của Chúa Thánh Thần"* (2 Cr 13,13).
   - Biến cố Chúa Giêsu chịu phép rửa bên sông Gio-đan (Mt 3,16-17): Tiếng Chúa Cha từ trời, Chúa Con chịu phép rửa, và Chúa Thánh Thần ngự xuống như chim bồ câu.
3. **Mối hiệp thông tình yêu:** Thiên Chúa tự bản chất không phải là sự cô đơn cô độc, mà là một gia đình thần linh của tình yêu tự hiến vĩnh cửu.`,
    citations: {
      scripture: ['Mt 28,19', '2 Cr 13,13', 'Ga 1,1.14', 'Ga 14,16-17', 'Mt 3,16-17'],
      ccc: [232, 234, 253, 254, 255],
      churchDocs: ['Kinh Tin Kính Nicêa-Constantinôpôli (381)', 'Công đồng Latêranô IV (1215)']
    }
  },
  {
    keywords: ['giải tội', 'hòa giải', 'xưng tội', 'tha tội', 'bí tích hòa giải'],
    theme: 'Bí Tích Hoà Giải & Lòng Thương Xót Chúa',
    answer: `Bí tích Hoà Giải (Giải Tội) là dòng suối chữa lành tâm hồn mà Chúa Kitô đã ủy thác cho các Tông đồ và những người kế vị.

1. **Ủy quyền tha tội tối thượng (Ga 20,21-23):** Vào chiều ngày Phục Sinh, Chúa Giêsu hiện đến, thổi hơi và ban Thần Khí: *"Các con hãy nhận lấy Thánh Thần. Các con tha tội cho ai, thì tội người ấy được tha; các con cầm giữ ai, thì tội người ấy bị cầm giữ."*
2. **Bốn yếu tố cấu thành việc sám hối đích thực:**
   - **Xét mình:** Soi chiếu lương tâm trước Lời Chúa và Mười Điều Răn.
   - **Ăn năn tội:** Đau buồn vì đã làm mất lòng Thiên Chúa chí thiện.
   - **Xưng tội:** Khiêm nhường xưng thú các tội trọng và tội nhẹ với linh mục đại diện Chúa Kitô và Hội Thánh.
   - **Đền tội (Việc đền tạ):** Thực thi việc hy sinh, cầu nguyện hoặc sửa chữa điều bất công để hàn gắn vết thương do tội gây ra.
3. **Lời tha tội của Hội Thánh:** Linh mục không tha tội bằng quyền năng riêng, mà bằng quyền bính của Chúa Giêsu Kitô và Hội Thánh: *"Thiên Chúa là Cha hay thương xót... ban Thánh Thần để tha tội. Xin Người ban ơn tha thứ và bình an cho con..."*`,
    citations: {
      scripture: ['Ga 20,21-23', 'Mt 18,18', '2 Cr 5,18-20', 'Lc 15,11-32'],
      ccc: [1440, 1446, 1451, 1456, 1484],
      churchDocs: ['Reconciliatio et Paenitentia (Thánh Gioan Phaolô II, 1984)']
    }
  }
];

export async function POST(req: NextRequest) {
  try {
    const body: AssistantRequest = await req.json();
    const query = (body.message || '').trim().toLowerCase();

    if (!query) {
      return NextResponse.json(
        { error: 'Vui lòng nhập câu hỏi cần học hỏi.' },
        { status: 400 }
      );
    }

    // 1. Kiểm tra đối sánh với kho tri thức thần học nền tảng Công giáo
    for (const kb of CATHOLIC_KNOWLEDGE_BASE) {
      const isMatch = kb.keywords.some(k => query.includes(k));
      if (isMatch) {
        return NextResponse.json({
          answer: kb.answer,
          citations: kb.citations,
          theologicalTheme: kb.theme
        });
      }
    }

    // 2. Nếu có GEMINI_API_KEY trong môi trường, gọi mô hình AI với Catholic theological system prompt
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const systemInstruction = `Bạn là Trợ Lý Thần Học & Kinh Thánh Công Giáo cho nền tảng "Lời Chúa Mỗi Ngày".
Nhiệm vụ: Giải thích Kinh Thánh, thần học, giáo lý và phụng vụ hoàn toàn trung thành với Huấn quyền Hội Thánh Công giáo (Magisterium).
Ngôn ngữ: Tiếng Việt trang trọng, chuẩn mực, giàu tính mục vụ.
Quy tắc bất khả xâm phạm:
1. Luôn trích dẫn chính xác sách Kinh Thánh, chương, câu (vd: Ga 3,16; Mt 16,18). Tuyệt đối không bịa đặt trích dẫn.
2. Trích dẫn số Sách Giáo Lý Hội Thánh Công Giáo (GLHTCG) từ 1 đến 2865 khi liên quan.
3. Nêu rõ các văn kiện Công đồng Vatican II (Dei Verbum, Lumen Gentium, Sacrosanctum Concilium, Gaudium et Spes) hoặc Thông điệp Giáo hoàng khi thích hợp.
4. Phân định rõ ràng: (a) Lời Chúa nguyên văn; (b) Nhận định học giả; (c) Giáo huấn chính thức; (d) Gợi ý suy niệm mục vụ.
5. Nếu câu hỏi chưa có định tín rõ ràng hoặc thuộc về ý kiến thần học đa dạng, phải nêu rõ để người đọc tham khảo thêm linh hướng.`;

        const userPrompt = `Câu hỏi của tín hữu: "${body.message}"
${body.context ? `Bối cảnh liên quan: Sách ${body.context.bookName || body.context.bookId}, Chương ${body.context.chapter || ''}, Câu ${body.context.verse || ''}` : ''}
Hãy phân tích và trả lời theo cấu trúc thần học Công giáo chuẩn xác.`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1200
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              answer: generatedText,
              citations: {
                scripture: ['Kinh Thánh Công Giáo (Bản dịch chuẩn Phụng Vụ / Các Giờ Kinh Phụng Vụ)'],
                ccc: [1, 101, 131],
                churchDocs: ['Hiến chế Dei Verbum']
              },
              theologicalTheme: 'Nghiên cứu & Học hỏi Kinh Thánh Công giáo'
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Lỗi gọi Gemini API, chuyển sang chế độ phân tích thần học mặc định:', geminiErr);
      }
    }

    // 3. Phản hồi thần học tổng quát có cấu trúc chuẩn mực khi không khớp từ khoá và chưa cấu hình API bên ngoài
    const fallbackAnswer = `Cảm ơn bạn đã đặt câu hỏi học hỏi về: **"${body.message}"**.

1. **Nguyên tắc nền tảng trong Truyền thống Công giáo:**
   Theo Hiến chế Tín lý *Dei Verbum* số 12 của Công đồng Vaticanô II, để hiểu đúng ý định của các tác giả thánh và điều Thiên Chúa muốn truyền dạy qua Kinh Thánh, chúng ta cần:
   - Đọc và chú giải Kinh Thánh trong cùng một Thần Khí đã linh hứng để viết ra Kinh Thánh.
   - Chú ý đến nội dung và sự hiệp nhất của toàn bộ Kinh Thánh (Cựu Ước chuẩn bị cho Tân Ước, Tân Ước hoàn tất Cựu Ước).
   - Đặt bản văn trong Truyền thống sống động của toàn thể Hội Thánh và sự tương hợp của đức tin (*analogia fidei*).

2. **Ánh sáng từ Lời Chúa & Giáo Lý:**
   - Mọi thắc mắc và thao thức của người Kitô hữu đều tìm thấy câu trả lời trọn vẹn nơi Đức Giêsu Kitô - Ngôi Lời Nhập Thể, Đấng là *"Con Đường, Sự Thật và Sự Sống"* (Ga 14,6).
   - Sách Giáo Lý Hội Thánh Công Giáo (GLHTCG số 101-141) nhắc nhở chúng ta rằng Thiên Chúa không ngừng hạ mình đối thoại với con người bằng ngôn ngữ loài người, như một người Cha yêu thương nói với con cái mình.

3. **Gợi ý thực hành & cầu nguyện:**
   - Hãy mang thao thức này vào giờ cầu nguyện Lectio Divina (Đọc - Suy niệm - Cầu nguyện - Chiêm niệm).
   - Tra cứu thêm các mục liên quan trong chuyên mục **Nghiên Cứu & Đối Chiếu** và **Thư Viện Văn Kiện** trên ứng dụng Lời Chúa Mỗi Ngày.`;

    return NextResponse.json({
      answer: fallbackAnswer,
      citations: {
        scripture: ['Ga 14,6', '2 Tm 3,16-17', 'Dt 4,12'],
        ccc: [101, 112, 113, 114],
        churchDocs: ['Dei Verbum (Hiến chế về Mạc khải của Thiên Chúa, số 12)']
      },
      theologicalTheme: 'Thần Học Kinh Thánh & Đức Tin Công Giáo'
    });

  } catch (error: any) {
    console.error('Lỗi API Assistant:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi trong quá trình xử lý câu hỏi thần học.' },
      { status: 500 }
    );
  }
}
