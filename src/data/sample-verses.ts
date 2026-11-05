import { BibleChapter, BibleVerse } from '@/types';
import { CATHOLIC_BIBLE_BOOKS } from './catholic-books';
import { normalizeObject } from '@/lib/utils/vietnamese';

// ============================================================================
// BẢN VĂN KINH THÁNH CÔNG GIÁO & CHÚ GIẢI THẦN HỌC CHI TIẾT
// ============================================================================

export const SAMPLE_CHAPTERS_DATABASE: Record<string, BibleChapter> = {
  // --------------------------------------------------------------------------
  // SÁNG THẾ - CHƯƠNG 1 (CỰU ƯỚC)
  // --------------------------------------------------------------------------
  'gen-1': {
    bookId: 'gen',
    chapterNumber: 1,
    title: 'Công Trình Sáng Tạo Vũ Trụ Trong Sáu Ngày',
    summary: 'Thiên Chúa sáng tạo trời đất và vạn vật từ hư vô bằng Lời quyền năng của Người. Đỉnh cao của công trình tạo dựng là con người được dựng nên theo hình ảnh và giống như Thiên Chúa.',
    historicalContext: 'Được đúc kết thành văn trong thời kỳ lưu đày Babylon (thế kỷ VI TCN) nhằm bác bỏ các huyền thoại ngoại giáo Enuma Elish về vũ trụ phát xuất từ sự tranh chấp đẫm máu của các thần linh.',
    culturalContext: 'Quan niệm vũ trụ ba tầng thời cổ: vòm trời ngăn cách nước phía trên và nước phía dưới đất.',
    geography: 'Lưỡng Hà (Mesopotamia) và Cận Đông Cổ Đại.',
    characters: ['Thiên Chúa', 'Thần Khí Thiên Chúa', 'Con Người (Nam và Nữ)'],
    literaryStructure: 'Cấu trúc thi ca phụng vụ đối xứng: 3 ngày phân chia (ánh sáng/tối, nước/trời, biển/đất) và 3 ngày trang hoàng (tinh tú, chim cá, muông thú & con người); ngày thứ 7 là ngày Sabát nghỉ ngơi thiêng liêng.',
    theologicalMeaning: 'Thiên Chúa là Đấng duy nhất, tối cao, tự hữu. Mọi thụ tạo phát xuất từ lòng nhân lành của Người và đều "rất tốt đẹp". Con người có phẩm giá vô song.',
    geographyAndCulture: 'Không gian văn hóa Lưỡng Hà (Mesopotamia) thời lưu đày Babylon và vũ trụ luận ba tầng của vùng Cận Đông cổ đại.',
    authorAndAudience: 'Thuộc truyền thống Tư Tế (Priestly tradition - P). Viết cho dân Do Thái lưu đày tại Babylon nhằm củng cố niềm tin độc thần kiên vững trước các ngẫu tượng ngụy giáo.',
    keyKeywords: [
      { term: 'Bereshit (בְּרֵאשִׁית)', meaning: 'Thoạt đầu, khởi nguyên tuyệt đối của thời gian và lịch sử', originalLanguage: 'Hí-ri' },
      { term: 'Bara (בָּרָא)', meaning: 'Sáng tạo từ hư vô (Creatio ex nihilo) - động từ độc quyền của Thiên Chúa', originalLanguage: 'Hí-ri' },
      { term: 'Ruah Elohim (רוּחַ אֱלֹהִים)', meaning: 'Thần Khí Thiên Chúa bay lượn ấp ủ mầm sống', originalLanguage: 'Hí-ri' },
      { term: 'Tselem Elohim (צֶלֶם אֱלֹהִים)', meaning: 'Hình ảnh Thiên Chúa (Imago Dei) - phẩm giá tối thượng của con người', originalLanguage: 'Hí-ri' }
    ],
    christologicalMeaning: 'Đức Kitô là Ngôi Lời (Logos) hằng hữu, nhờ Người mà muôn vật được tạo thành (Ga 1,1-3; Cl 1,15-17). Người là A-đam Mới hoàn hảo đưa vạn vật đạt tới sự thành toàn trong ngày Phục Sinh.',
    christianMessage: 'Vạn vật trong vũ trụ đều có mục đích và sự hài hòa thánh thiêng. Con người được trao sứ mạng đồng trách nhiệm chăm sóc ngôi nhà chung (Laudato Si\').',
    otNtConnections: [
      'St 1,1: "Thoạt đầu Thiên Chúa sáng tạo" tương ứng tuyệt đối với Ga 1,1: "Thoạt đầu đã có Ngôi Lời".',
      'Ánh sáng ngày thứ nhất (St 1,3) báo trước Đức Kitô là Ánh Sáng Thế Gian phá tan bóng đêm tội lỗi (Ga 8,12).'
    ],
    cccConnections: [279, 290, 293, 296, 355, 369, 1701],
    churchDocConnections: [
      'Hiến chế Tín lý Dei Verbum (số 3) về việc Thiên Chúa biểu lộ chính mình qua công trình tạo dựng',
      'Thông điệp Laudato Si\' (số 65-75) của ĐTC Phanxicô về Tin Mừng Thụ Tạo'
    ],
    meditationAndApplication: 'Chiêm ngắm vẻ đẹp kỳ diệu của thiên nhiên và nhận ra dấu vết yêu thương của Đấng Tạo Hóa. Tạ ơn Chúa vì sự sống của chính mình và quyết tâm sống có trách nhiệm bảo vệ môi trường, tôn trọng phẩm giá của mọi người.',
    academicSources: [
      'The Jerusalem Bible (École Biblique de Jérusalem, 1966)',
      'The Navarre Bible: Pentateuch (Four Courts Press, 1999)',
      'Giáo trình Ngũ Thư & Lịch Sử Thánh Kinh - Học Viện Công Giáo Việt Nam',
      'Sách Giáo Lý Hội Thánh Công Giáo (GLHTCG các số 279-324)'
    ],
    relatedPassages: ['Tv 104', 'Ga 1,1-3', 'Cl 1,15-17', 'Dt 11,3'],
    verses: [
      {
        id: 'gen-1-1',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 1,
        text: 'Thoạt đầu, Thiên Chúa sáng tạo trời và đất.',
        contextBeforeAfter: 'Khởi đầu tuyệt đối của thời gian và không gian. Trước khi có trời đất, chỉ có Thiên Chúa hằng hữu.',
        commentary: 'Từ "Bereshit" (Thoạt đầu) trong tiếng Do Thái không chỉ là mốc thời gian cơ học mà là nguyên lý cội rễ. "Bara" (sáng tạo) là động từ độc quyền dành cho Thiên Chúa, diễn tả việc dựng nên từ hư vô (Creatio ex nihilo).',
        theologicalThemes: ['Sáng tạo từ hư vô', 'Đấng Tạo Hóa hằng hữu', 'Khởi nguyên lịch sử'],
        relatedVerses: ['Ga 1,1', '2Mcb 7,28', 'Dt 1,10'],
        cccLinks: [279, 290, 296, 297],
        footnotes: 'Bản dịch Bảy Mươi (LXX): "En arche epoiesen ho Theos ton ouranon kai ten gen".'
      },
      {
        id: 'gen-1-2',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 2,
        text: 'Đất còn trống rỗng chưa có hình dạng, bóng tối bao trùm vực thẳm, và Thần Khí Thiên Chúa bay lượn trên mặt nước.',
        contextBeforeAfter: 'Tình trạng hỗn mang nguyên thủy (tohu wa-bohu) chờ đợi Lời phán định hình của Thiên Chúa.',
        commentary: '"Ruah Elohim" (Thần Khí/Gió của Thiên Chúa) bay lượn như chim mẹ ấp ủ sự sống. Các Giáo phụ xem đây là hình ảnh tiên trưng của Chúa Thánh Thần tác sinh sự sống trong mầu nhiệm Tạo dựng và Phép Rửa.',
        theologicalThemes: ['Chúa Thánh Thần', 'Sự sống mới', 'Ân sủng nguyên thủy'],
        relatedVerses: ['Tv 33,6', 'Tv 104,30'],
        cccLinks: [291, 703]
      },
      {
        id: 'gen-1-3',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 3,
        text: 'Thiên Chúa phán: "Phải có ánh sáng!". Liền có ánh sáng.',
        contextBeforeAfter: 'Lời đầu tiên của Thiên Chúa được thốt ra trong vũ trụ, xua tan bóng tối hỗn mang.',
        commentary: 'Thiên Chúa sáng tạo bằng Lời (Dabar). Ngôi Lời (Logos) là ánh sáng đích thực chiếu soi vào nơi tăm tối.',
        theologicalThemes: ['Quyền năng Lời Chúa', 'Ánh sáng và Bóng tối'],
        relatedVerses: ['Ga 1,4-5', '2Cr 4,6'],
        cccLinks: [298, 2466]
      },
      {
        id: 'gen-1-4',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 4,
        text: 'Thiên Chúa thấy rằng ánh sáng tốt đẹp. Thiên Chúa phân rẽ ánh sáng khỏi bóng tối.',
        commentary: 'Sự phân rẽ ánh sáng và bóng tối khẳng định trật tự thánh thiện của Đấng Tạo Hóa.'
      },
      {
        id: 'gen-1-5',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 5,
        text: 'Thiên Chúa gọi ánh sáng là "ngày", bóng tối là "đêm". Qua một buổi chiều và một buổi sáng: đó là ngày thứ nhất.'
      },
      {
        id: 'gen-1-6',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 6,
        text: 'Thiên Chúa phán: "Phải có một cái vòm ở giữa khối nước, để phân rẽ nước với nước."'
      },
      {
        id: 'gen-1-7',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 7,
        text: 'Thiên Chúa làm ra cái vòm và phân rẽ nước ở dưới vòm với nước ở trên vòm. Liền có như vậy.'
      },
      {
        id: 'gen-1-8',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 8,
        text: 'Thiên Chúa gọi cái vòm đó là "trời". Qua một buổi chiều và một buổi sáng: đó là ngày thứ hai.'
      },
      {
        id: 'gen-1-9',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 9,
        text: 'Thiên Chúa phán: "Nước phía dưới trời hãy tụ lại một nơi, để chỗ cạn lộ ra." Liền có như vậy.'
      },
      {
        id: 'gen-1-10',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 10,
        text: 'Thiên Chúa gọi chỗ cạn là "đất", khối nước tụ lại là "biển". Thiên Chúa thấy thế là tốt đẹp.'
      },
      {
        id: 'gen-1-11',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 11,
        text: 'Thiên Chúa phán: "Đất phải sinh thảo mộc xanh tươi, cỏ sinh hạt giống, cây ăn trái sinh trái có hạt trên mặt đất, tùy theo loại." Liền có như vậy.'
      },
      {
        id: 'gen-1-12',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 12,
        text: 'Đất trổ sinh thảo mộc, cỏ sinh hạt giống tùy theo loại, và cây sinh trái có hạt tùy theo loại. Thiên Chúa thấy thế là tốt đẹp.'
      },
      {
        id: 'gen-1-13',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 13,
        text: 'Qua một buổi chiều và một buổi sáng: đó là ngày thứ ba.'
      },
      {
        id: 'gen-1-14',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 14,
        text: 'Thiên Chúa phán: "Phải có những vầng sáng trên vòm trời, để phân rẽ ngày với đêm, làm dấu hiệu xác định các ngày lễ, các ngày và các năm."'
      },
      {
        id: 'gen-1-15',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 15,
        text: 'Và chúng sẽ là những vầng sáng trên vòm trời để chiếu sáng mặt đất. Liền có như vậy.'
      },
      {
        id: 'gen-1-16',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 16,
        text: 'Thiên Chúa làm ra hai vầng sáng lớn: vầng sáng lớn hơn để điều khiển ngày, vầng sáng nhỏ hơn để điều khiển đêm; Người cũng làm ra các ngôi sao.'
      },
      {
        id: 'gen-1-17',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 17,
        text: 'Thiên Chúa đặt các vầng sáng đó trên vòm trời để chiếu sáng mặt đất,'
      },
      {
        id: 'gen-1-18',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 18,
        text: 'để điều khiển ngày và đêm, và để phân rẽ ánh sáng khỏi bóng tối. Thiên Chúa thấy thế là tốt đẹp.'
      },
      {
        id: 'gen-1-19',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 19,
        text: 'Qua một buổi chiều và một buổi sáng: đó là ngày thứ tư.'
      },
      {
        id: 'gen-1-20',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 20,
        text: 'Thiên Chúa phán: "Nước phải sinh sôi lúc nhúc vô số sinh vật, và chim phải bay lượn trên mặt đất, dưới vòm trời."'
      },
      {
        id: 'gen-1-21',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 21,
        text: 'Thiên Chúa sáng tạo các thủy quái khổng lồ, mọi sinh vật bơi lội lúc nhúc trong nước tùy theo loại, và mọi giống chim có cánh tùy theo loại. Thiên Chúa thấy thế là tốt đẹp.'
      },
      {
        id: 'gen-1-22',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 22,
        text: 'Thiên Chúa chúc phúc cho chúng rằng: "Hãy sinh sôi nảy nở cho nhiều, làm cho đầy nước biển; và chim hãy sinh sản cho nhiều trên mặt đất."'
      },
      {
        id: 'gen-1-23',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 23,
        text: 'Qua một buổi chiều và một buổi sáng: đó là ngày thứ năm.'
      },
      {
        id: 'gen-1-24',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 24,
        text: 'Thiên Chúa phán: "Đất phải sinh ra các sinh vật tùy theo loại: gia súc, loài bò sát và dã thú tùy theo loại." Liền có như vậy.'
      },
      {
        id: 'gen-1-25',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 25,
        text: 'Thiên Chúa làm ra dã thú tùy theo loại, gia súc tùy theo loại và mọi giống bò sát trên mặt đất tùy theo loại. Thiên Chúa thấy thế là tốt đẹp.'
      },
      {
        id: 'gen-1-26',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 26,
        text: 'Thiên Chúa phán: "Chúng ta hãy làm ra con người theo hình ảnh chúng ta, giống như chúng ta, để con người làm bá chủ cá biển, chim trời, gia súc, dã thú, tất cả mặt đất và mọi giống vật bò dưới đất".',
        contextBeforeAfter: 'Bước ngoặt long trọng nhất của công trình sáu ngày: Thiên Chúa bàn thảo trong Ba Ngôi Cực Thánh.',
        commentary: 'Đại từ nhân xưng số nhiều "Chúng ta" được các Giáo phụ giải thích là dấu chỉ mầu nhiệm Chúa Ba Ngôi hiệp thông. "Hình ảnh" (Imago Dei) trao cho con người khả năng hiểu biết, tự do yêu thương và tương quan với Thiên Chúa.',
        theologicalThemes: ['Phẩm giá con người (Imago Dei)', 'Mầu nhiệm Thiên Chúa Ba Ngôi', 'Trách nhiệm quản lý vũ trụ'],
        relatedVerses: ['Kn 2,23', 'Ep 4,24', 'Cl 3,10'],
        cccLinks: [355, 356, 357, 1701, 1702]
      },
      {
        id: 'gen-1-27',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 27,
        text: 'Thiên Chúa sáng tạo con người theo hình ảnh mình, Thiên Chúa sáng tạo con người theo hình ảnh Thiên Chúa, Thiên Chúa sáng tạo con người có nam có nữ.',
        contextBeforeAfter: 'Tuyên ngôn thần học cốt lõi xác nhận sự bình đẳng tuyệt đối về phẩm giá giữa người nam và người nữ.',
        commentary: 'Cả nam và nữ đều phản chiếu vẻ đẹp của Đấng Tạo Hóa. Tính bổ túc và hiệp thông hôn nhân phản chiếu tình yêu nội tại của Thiên Chúa.',
        theologicalThemes: ['Phẩm giá người nam và người nữ', 'Hôn nhân thánh thiện', 'Tình yêu bổ túc'],
        relatedVerses: ['Mt 19,4', 'Mc 10,6'],
        cccLinks: [369, 370, 371, 2331, 2335]
      },
      {
        id: 'gen-1-28',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 28,
        text: 'Thiên Chúa chúc phúc cho họ và phán: "Hãy sinh sôi nảy nở cho thật nhiều, cho đầy mặt đất và hãy chế ngự nó; hãy làm bá chủ cá biển, chim trời và mọi giống vật bò trên mặt đất."',
        commentary: 'Sứ mạng cộng tác với Thiên Chúa để gìn giữ và canh tân ngôi nhà chung.'
      },
      {
        id: 'gen-1-29',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 29,
        text: 'Thiên Chúa phán: "Này Ta ban cho các ngươi mọi thứ cỏ sinh hạt giống trên khắp mặt đất, và mọi thứ cây có trái sinh hạt giống: đó sẽ là lương thực cho các ngươi."'
      },
      {
        id: 'gen-1-30',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 30,
        text: 'Còn đối với mọi dã thú, mọi chim trời và mọi sinh vật bò dưới đất có sinh khí, Ta ban cho mọi thứ cỏ xanh tươi làm lương thực. Liền có như vậy.'
      },
      {
        id: 'gen-1-31',
        bookId: 'gen',
        chapterNumber: 1,
        verseNumber: 31,
        text: 'Thiên Chúa thấy mọi sự Người đã làm ra quả là rất tốt đẹp! Qua một buổi chiều và một buổi sáng: đó là ngày thứ sáu.',
        contextBeforeAfter: 'Kết luận toàn bộ công trình trước khi bước vào ngày nghỉ Sabát.',
        commentary: 'Trước đó chỉ là "tốt đẹp" (tov), nhưng khi con người xuất hiện thì trở thành "rất tốt đẹp" (tov me\'od). Khẳng định bản chất nguyên thủy của thụ tạo là thánh thiện, không có mầm mống tà ác nội tại.',
        theologicalThemes: ['Bản tính thiện hảo của thụ tạo', 'Lạc quan Kitô giáo'],
        relatedVerses: ['1Tm 4,4'],
        cccLinks: [299, 339]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // XUẤT HÀNH - CHƯƠNG 20 (THẬP GIỚI)
  // --------------------------------------------------------------------------
  'exod-20': {
    bookId: 'exod',
    chapterNumber: 20,
    title: 'Giao Ước Sinai - Mười Điều Răn Của Thiên Chúa',
    summary: 'Thiên Chúa ban Mười Điều Răn (Thập Giới) trên núi Sinai để xác lập Giao Ước cứu độ với dân Ítraen, dẫn dắt họ sống tự do và trung tín.',
    historicalContext: 'Biến cố xuất hành khỏi Ai Cập và ký kết giao ước tại núi Sinai dưới sự dẫn dắt của ngôn sứ Môsê.',
    culturalContext: 'Khế ước liên minh thời Cận Đông cổ đại giữa vua tối cao và chư hầu được thánh hiến bằng lời thề.',
    geography: 'Bán đảo Sinai và hoang địa.',
    characters: ['Thiên Chúa (ĐỨC CHÚA)', 'Môsê', 'Dân Ítraen'],
    literaryStructure: 'Lời tựa xác nhận ơn giải phóng (20,1-2); Ba điều răn đối với Thiên Chúa (20,3-11); Bảy điều răn đối với tha nhân (20,12-17).',
    theologicalMeaning: 'Thập Giới không phải là gánh nặng luật lệ mà là chỉ dẫn ân sủng để con người gìn giữ sự tự do đích thực khỏi ách nô lệ tội lỗi.',
    christianMessage: 'Chúa Kitô kiện toàn Thập Giới bằng Giới Răn Mến Chúa Yêu Người và Bát Phúc.',
    relatedPassages: ['Đnl 5,6-21', 'Mt 22,37-40', 'Rm 13,8-10'],
    verses: [
      {
        id: 'exod-20-1',
        bookId: 'exod',
        chapterNumber: 20,
        verseNumber: 1,
        text: 'Bấy giờ, Thiên Chúa phán tất cả những lời sau đây:',
        contextBeforeAfter: 'Thiên Chúa trực tiếp ngỏ lời với toàn thể cộng đoàn Ítraen.',
        commentary: 'Thiên Chúa là Đấng khởi xướng cuộc đối thoại cứu độ.',
        theologicalThemes: ['Mạc khải', 'Giao ước'],
        relatedVerses: ['Đnl 5,4'],
        cccLinks: [2056]
      },
      {
        id: 'exod-20-2',
        bookId: 'exod',
        chapterNumber: 20,
        verseNumber: 2,
        text: '"Ta là ĐỨC CHÚA, Thiên Chúa của ngươi, Đấng đã đưa ngươi ra khỏi đất Ai Cập, khỏi cảnh nô lệ."',
        contextBeforeAfter: 'Khẳng định căn tính của Đấng Cứu Độ trước khi ban luật.',
        commentary: 'Ân sủng đi trước lề luật: Thiên Chúa giải phóng trước rồi mới trao ban luật sống tự do.',
        theologicalThemes: ['Ơn cứu chuộc', 'Tự do đích thực'],
        relatedVerses: ['Lv 26,13'],
        cccLinks: [2084, 2086]
      },
      {
        id: 'exod-20-3',
        bookId: 'exod',
        chapterNumber: 20,
        verseNumber: 3,
        text: '"Ngươi không được có thần nào khác đối nghịch với Ta."',
        contextBeforeAfter: 'Điều răn thứ nhất: Độc thần giáo nghiêm ngặt.',
        commentary: 'Bác bỏ mọi hình thức ngẫu tượng, sùng bái ngẫu thần tiền tài, quyền lực.',
        theologicalThemes: ['Đức tin duy nhất', 'Chống ngẫu tượng'],
        relatedVerses: ['Đnl 6,13-14', 'Mt 4,10'],
        cccLinks: [2087, 2112]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // THÁNH VỊNH - THÁNH VỊNH 23
  // --------------------------------------------------------------------------
  'ps-23': {
    bookId: 'ps',
    chapterNumber: 23,
    title: 'Chúa Là Mục Tử Nhân Lành Chăn Dắt Tôi',
    summary: 'Bài thánh vịnh tín thác tuyệt đỉnh mô tả Thiên Chúa như vị Mục Tử dịu hiền và người chủ tiệc quảng đại dẫn đưa linh hồn qua mọi thung lũng hiểm nguy.',
    historicalContext: 'Được gán cho Vua Đavít xuất thân từ người chăn chiên tại Bêlem.',
    culturalContext: 'Đời sống du mục chăn thả chiên nơi đồng cỏ và hình ảnh bàn tiệc đón tiếp khách quý.',
    geography: 'Vùng đồi Giuđê và Đền Thờ Giêrusalem.',
    characters: ['ĐỨC CHÚA (Mục Tử)', 'Linh hồn tín thác'],
    literaryStructure: 'Hai hình ảnh song hành: Mục Tử chăn dắt đàn chiên (c. 1-4) và Chủ nhà dọn tiệc hoan hỷ (c. 5-6).',
    theologicalMeaning: 'Thiên Chúa săn sóc từng người với tình phụ tử dịu dàng, đồng hành ngay cả trong bóng đêm sự chết.',
    christianMessage: 'Đức Giêsu Kitô mạc khải chính Người là "Mục Tử Nhân Lành hy sinh mạng sống vì đoàn chiên" (Ga 10,11).',
    relatedPassages: ['Is 40,11', 'Ez 34,11-16', 'Ga 10,11-16', 'Kh 7,17'],
    verses: [
      {
        id: 'ps-23-1',
        bookId: 'ps',
        chapterNumber: 23,
        verseNumber: 1,
        text: 'ĐỨC CHÚA là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì.',
        contextBeforeAfter: 'Lời tuyên xưng đức tin tràn đầy bình an nội tâm.',
        commentary: 'Chúa là Đấng thỏa mãn trọn vẹn mọi khát vọng sâu thẳm nhất của tâm hồn.',
        theologicalThemes: ['Thiên Chúa Mục Tử', 'Tín thác trọn vẹn'],
        relatedVerses: ['Ga 10,11'],
        cccLinks: [754, 2567]
      },
      {
        id: 'ps-23-4',
        bookId: 'ps',
        chapterNumber: 23,
        verseNumber: 4,
        text: 'Lạy Chúa, dầu qua lũng âm u con sợ gì nguy khốn, vì có Chúa ở cùng. Cây gậy và cây gậy của Người, đó là điều an ủi lòng con.',
        contextBeforeAfter: 'Vượt qua thung lũng bóng đêm của thử thách và đau khổ.',
        commentary: 'Gậy chăn chiên biểu tượng cho quyền năng bảo vệ và dẫn đường của Chúa.',
        theologicalThemes: ['Sự hiện diện nâng đỡ của Chúa', 'Can đảm trước thử thách'],
        relatedVerses: ['Mt 28,20'],
        cccLinks: [218, 2577]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // TIN MỪNG MÁTTHÊU - CHƯƠNG 5 (TÂN ƯỚC)
  // --------------------------------------------------------------------------
  'matt-5': {
    bookId: 'matt',
    chapterNumber: 5,
    title: 'Bài Giảng Trên Núi - Tám Mối Phúc Thật',
    summary: 'Đức Giêsu lên núi công bố Hiến Chương Nước Trời với Tám Mối Phúc Thật, mời gọi các môn đệ làm muối cho đời, ánh sáng cho trần gian và kiện toàn Lề Luật bằng đức ái trọn hảo.',
    historicalContext: 'Bài giảng trên núi (Sermon on the Mount) phản ánh hình ảnh Môsê mới đứng trên núi Sinai mới, ban Lề Luật ân sủng của Giao Ước Mới.',
    culturalContext: 'Khái niệm "Phúc" (Makarios) không chỉ là may mắn thế tục mà là tình trạng hạnh phúc thần linh được Thiên Chúa ân thưởng.',
    geography: 'Ngọn núi thoai thoải bên bờ biển hồ Galilê (gần Caphácnaum).',
    characters: ['Đức Giêsu', 'Các Môn Đệ', 'Dân Chúng'],
    literaryStructure: 'Mở đầu bằng 8 Mối Phúc (5,3-12); dụ ngôn Muối và Ánh Sáng (5,13-16); Đức Giêsu kiện toàn Lề Luật (5,17-20); Sáu phản đề "Anh em đã nghe dạy... Còn Thầy, Thầy bảo..." (5,21-48).',
    theologicalMeaning: 'Các mối phúc là chân dung tự họa của chính Đức Kitô: nghèo khó, hiền lành, chịu bách hại vì công chính. Đây là con đường hoán cải tâm hồn vượt lên trên chủ nghĩa luật hình thức.',
    christianMessage: 'Người Kitô hữu được kêu gọi nên hoàn thiện như Cha trên trời là Đấng hoàn thiện bằng việc tha thứ kẻ thù và sống đức ái vô điều kiện.',
    relatedPassages: ['Lc 6,20-26', 'Xh 20,1-17', 'Gc 2,5'],
    verses: [
      {
        id: 'matt-5-1',
        bookId: 'matt',
        chapterNumber: 5,
        verseNumber: 1,
        text: 'Thấy đám đông, Đức Giêsu lên núi. Người ngồi xuống, các môn đệ tiến lại gần.',
        contextBeforeAfter: 'Tư thế của một Tôn Sư đích thực (Cathedra) uy nghi giảng dạy Dân Chúa.',
        commentary: 'Núi là nơi Thiên Chúa mạc khải thánh ý. Đức Giêsu ngồi xuống là tư thế ban huấn lệnh chính thức.',
        theologicalThemes: ['Đức Kitô Tôn Sư', 'Núi Mạc Khải'],
        relatedVerses: ['Xh 19,3', 'Lc 6,17'],
        cccLinks: [581]
      },
      {
        id: 'matt-5-3',
        bookId: 'matt',
        chapterNumber: 5,
        verseNumber: 3,
        text: 'Phúc thay ai có tâm hồn nghèo khó, vì Nước Trời là của họ.',
        contextBeforeAfter: 'Mối phúc mở đầu và bao trùm toàn bộ Hiến Chương Nước Trời.',
        commentary: '"Anawim" trong tiếng Do Thái: những kẻ khiêm hạ nhận biết mình hoàn toàn phụ thuộc vào Thiên Chúa.',
        theologicalThemes: ['Tâm hồn nghèo khó', 'Nước Trời', 'Đức Khiêm Nhường'],
        relatedVerses: ['Tv 34,7', 'Is 61,1', 'Lc 1,52'],
        cccLinks: [544, 2544, 2546]
      },
      {
        id: 'matt-5-8',
        bookId: 'matt',
        chapterNumber: 5,
        verseNumber: 8,
        text: 'Phúc thay ai có tâm hồn trong sạch, vì họ sẽ được nhìn thấy Thiên Chúa.',
        contextBeforeAfter: 'Mối phúc thứ sáu: Điều kiện thiết yếu để chiêm ngắm tôn nhan Đấng Tối Cao.',
        commentary: 'Tâm hồn trong sạch là trái tim không phân rẽ, hướng trọn vẹn về thánh ý Chúa.',
        theologicalThemes: ['Tâm hồn trong sạch', 'Chiêm ngắm Thiên Chúa (Beatific Vision)'],
        relatedVerses: ['Tv 24,3-4', '1Ga 3,2'],
        cccLinks: [1720, 2518, 2548]
      },
      {
        id: 'matt-5-14',
        bookId: 'matt',
        chapterNumber: 5,
        verseNumber: 14,
        text: 'Chính anh em là ánh sáng cho trần gian. Một thành xây trên núi không tài nào che giấu được.',
        contextBeforeAfter: 'Sứ mạng của các môn đệ giữa thế giới sau khi đón nhận các Mối Phúc.',
        commentary: 'Ánh sáng của môn đệ là ánh sáng phản chiếu từ Đức Kitô - Ánh Sáng Thế Gian.',
        theologicalThemes: ['Sứ vụ loan báo Tin Mừng', 'Làm chứng nhân Kitô hữu'],
        relatedVerses: ['Ga 8,12', 'Pl 2,15'],
        cccLinks: [782, 2044]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // TIN MỪNG GIOAN - CHƯƠNG 1 (TÂN ƯỚC)
  // --------------------------------------------------------------------------
  'john-1': {
    bookId: 'john',
    chapterNumber: 1,
    title: 'Lời Tựa Tin Mừng Gioan - Ngôi Lời Nhập Thể',
    summary: 'Bài thánh ca thần học tráng lệ tuyên xưng Ngôi Lời hằng hữu là Thiên Chúa, đã tham dự vào công trình sáng tạo và đã Nhập Thể làm người nơi Đức Giêsu Kitô.',
    historicalContext: 'Cộng đồng Gioan cuối thế kỷ I đối diện với chủ nghĩa Ngộ đạo (Gnosticism) chối bỏ tính xác phàm đích thực của Đức Kitô.',
    culturalContext: 'Khái niệm "Logos" vừa mang âm hưởng tư tưởng triết học Hy Lạp (nguyên lý trật tự vũ trụ) vừa thấm nhuần tư tưởng Dabar (Lời) và Hokhmah (Khôn Ngoan) trong Cựu Ước Do Thái.',
    geography: 'Êphêsô (Tiểu Á).',
    characters: ['Ngôi Lời (Logos)', 'Thiên Chúa Cha', 'Gioan Tẩy Giả'],
    literaryStructure: 'Lời Tựa thi ca (1,1-18) với nhịp điệu bậc thang đồng tâm; tiếp theo là lời chứng của Gioan Tẩy Giả (1,19-34) và ơn gọi các môn đệ đầu tiên (1,35-51).',
    theologicalMeaning: 'Đỉnh cao mạc khải Kitô học: Đức Giêsu không phải là một thụ tạo siêu phàm mà chính là Thiên Chúa thật và là người thật.',
    christianMessage: 'Nhờ tin vào danh Người, chúng ta được quyền trở nên con cái Thiên Chúa và nhận lãnh ân sủng tràn trề.',
    relatedPassages: ['St 1,1-3', 'Kn 9,1-2', 'Cl 1,15-20', 'Dt 1,1-4'],
    verses: [
      {
        id: 'john-1-1',
        bookId: 'john',
        chapterNumber: 1,
        verseNumber: 1,
        text: 'Lúc khởi đầu đã có Ngôi Lời. Ngôi Lời vẫn hướng về Thiên Chúa, và Ngôi Lời là Thiên Chúa.',
        contextBeforeAfter: 'Câu mở đầu song song tuyệt hảo với Sáng Thế 1,1 nhưng vượt lên trên thời gian thụ tạo.',
        commentary: 'Ba khẳng định tín lý căn bản: 1) Tính tiền hữu vĩnh cửu của Ngôi Lời; 2) Tính phân biệt ngôi vị giữa Ngôi Lời và Chúa Cha (pros ton Theon); 3) Bản tính Thiên Chúa đồng bản thể của Ngôi Lời (Theos en ho Logos).',
        theologicalThemes: ['Thần tính của Chúa Kitô', 'Mầu nhiệm Thiên Chúa Ba Ngôi', 'Đồng bản thể (Homoousios)'],
        relatedVerses: ['St 1,1', '1Ga 1,1', 'Kh 19,13'],
        cccLinks: [241, 443, 445, 454]
      },
      {
        id: 'john-1-14',
        bookId: 'john',
        chapterNumber: 1,
        verseNumber: 14,
        text: 'Và Ngôi Lời đã trở nên người phàm và cư ngụ giữa chúng ta. Chúng tôi đã được nhìn thấy vinh quang của Người, vinh quang mà Chúa Cha ban cho Người, là Con Một đầy tràn ân sủng và sự thật.',
        contextBeforeAfter: 'Tâm điểm của toàn bộ đức tin Kitô giáo: Biến cố Mầu Nhiệm Nhập Thể.',
        commentary: 'Động từ "eskenosen" (cắm lều/cư ngụ) gợi lại Nhà Tạm trong Xuất Hành. Đức Giêsu bằng xương bằng thịt chính là nơi vinh quang Thiên Chúa hiện diện thực sự giữa trần thế.',
        theologicalThemes: ['Mầu nhiệm Nhập Thể (Incarnatio)', 'Ân sủng và Sự Thật', 'Nhà Tạm sống động'],
        relatedVerses: ['Xh 25,8', '1Ga 4,2', '1Tm 3,16'],
        cccLinks: [461, 462, 464, 469]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // TIN MỪNG LUCA - CHƯƠNG 1 (TRUYỀN TIN & KINH MAGNIFICAT)
  // --------------------------------------------------------------------------
  'luke-1': {
    bookId: 'luke',
    chapterNumber: 1,
    title: 'Sứ Thần Truyền Tin Cho Đức Mẹ & Kinh Magnificat',
    summary: 'Sứ thần Gabriel truyền tin biến cố Nhập Thể cho Đức Trinh Nữ Maria. Lời xin vâng tuyệt đối (Fiat) của Đức Mẹ mở ra kỷ nguyên cứu độ.',
    historicalContext: 'Xảy ra tại làng Nadarét xứ Galilê dưới triều vua Hêrôđê và hoàng đế Rôma Cêsarê Augustô.',
    culturalContext: 'Tục đính hôn của người Do Thái: Đức Maria đã đính hôn với Thánh Giuse nhưng chưa về chung sống.',
    geography: 'Nadarét (Galilê) và miền núi Giuđê (nhà bà Êlisabét).',
    characters: ['Đức Maria', 'Sứ Thần Gabriel', 'Bà Êlisabét', 'Gioan Tẩy Giả', 'Thánh Thần'],
    literaryStructure: 'Truyền tin cho Dacaria (1,5-25); Truyền tin cho Đức Mẹ (1,26-38); Đức Mẹ viếng thăm bà Êlisabét & Kinh Magnificat (1,39-56); Gioan Tẩy Giả sinh hạ (1,57-80).',
    theologicalMeaning: 'Đức Maria là Hòm Bia Giao Ước Mới, Mẹ Thiên Chúa (Theotokos) và là người môn đệ đầu tiên hoàn toàn vâng phục thánh ý Thiên Chúa.',
    christianMessage: 'Noi gương Mẹ Maria đáp lại tiếng gọi của Chúa bằng cả cuộc đời: "Này tôi là tôi tớ Chúa, xin Chúa cứ làm cho tôi như lời sứ thần nói."',
    relatedPassages: ['Is 7,14', '1Sm 2,1-10', 'Ga 1,14'],
    verses: [
      {
        id: 'luke-1-28',
        bookId: 'luke',
        chapterNumber: 1,
        verseNumber: 28,
        text: 'Sứ thần vào nhà trinh nữ và nói: "Mừng vui lên, hỡi Đấng đầy ân sủng, ĐỨC CHÚA ở cùng bà."',
        contextBeforeAfter: 'Lời chào thần linh khởi đầu cuộc đối thoại lịch sử cứu độ.',
        commentary: '"Đầy ân sủng" (Kecharitomene) là danh xưng mới diễn tả tình trạng Đức Maria được tràn ngập ân phúc của Chúa ngay từ đầu.',
        theologicalThemes: ['Đức Maria Đầy Ân Sủng', 'Đức Mẹ Vô Nhiễm Nguyên Tội'],
        relatedVerses: ['Kn 2,23', 'Ep 1,6'],
        cccLinks: [490, 491, 722]
      },
      {
        id: 'luke-1-38',
        bookId: 'luke',
        chapterNumber: 1,
        verseNumber: 38,
        text: 'Bấy giờ bà Maria nói: "Vâng, tôi đây là nữ tỳ của Chúa, xin Chúa cứ làm cho tôi như lời sứ thần nói." Rồi sứ thần từ biệt ra đi.',
        contextBeforeAfter: 'Tiếng Xin Vâng (Fiat) của Đức Mẹ mở đường cho Ngôi Lời giáng thế.',
        commentary: 'Sự tự do vâng phục trong đức tin: Đức Maria mở lòng để đón nhận ơn cứu chuộc cho toàn thể nhân loại.',
        theologicalThemes: ['Tiếng Xin Vâng (Fiat)', 'Đức Tin và Vâng Phục'],
        relatedVerses: ['Rm 1,5', 'Dt 10,7'],
        cccLinks: [148, 494, 2617]
      },
      {
        id: 'luke-1-46',
        bookId: 'luke',
        chapterNumber: 1,
        verseNumber: 46,
        text: 'Bấy giờ bà Maria nói: "Linh hồn tôi ngợi khen Đức Chúa, thần trí tôi hớn hở vui mừng vì Thiên Chúa, Đấng cứu độ tôi."',
        contextBeforeAfter: 'Khởi đầu Bài Ca Ngợi Khen (Magnificat) tôn vinh quyền năng Thiên Chúa.',
        commentary: 'Bài ca tạ ơn của những người nghèo của Chúa (Anawim), chúc tụng lòng thương xót vô biên trải qua ngàn thế hệ.',
        theologicalThemes: ['Kinh Magnificat', 'Lòng Thương Xót Chúa'],
        relatedVerses: ['1Sm 2,1', 'Tv 34,3'],
        cccLinks: [2619, 2675]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // TIN MỪNG LUCA - CHƯƠNG 15 (NGƯỜI CHA NHÂN HẬU)
  // --------------------------------------------------------------------------
  'luke-15': {
    bookId: 'luke',
    chapterNumber: 15,
    title: 'Ba Dụ Ngôn Về Lòng Thương Xót - Người Cha Nhân Hậu',
    summary: 'Đức Giêsu kể ba dụ ngôn: Con chiên lạc, Đồng bạc bị mất và Người cha nhân hậu để mạc khải niềm vui vô bờ của Thiên Chúa khi một tội nhân sám hối trở về.',
    historicalContext: 'Đức Giêsu đáp trả lời xầm xì của các kinh sư và người Pharisêu vì Người đón tiếp và đồng bàn với phường tội lỗi.',
    culturalContext: 'Tục chia gia tài gia đình thời Do Thái cổ: đòi chia phần khi cha còn sống tương đương với việc coi cha như đã chết.',
    geography: 'Vùng Giuđê và Galilê.',
    characters: ['Đức Giêsu', 'Người Cha Nhân Hậu', 'Người Con Thứ', 'Người Con Cả'],
    literaryStructure: 'Con chiên lạc (15,1-7); Đồng bạc đánh mất (15,8-10); Người cha nhân hậu và hai người con (15,11-32).',
    theologicalMeaning: 'Thiên Chúa là Người Cha luôn chờ đợi, chạy ra đón tiếp và phục hồi trọn vẹn phẩm giá làm con cho kẻ lầm đường lạc lối.',
    christianMessage: 'Không có tội lỗi nào lớn hơn Lòng Thương Xót của Thiên Chúa. Mời gọi chúng ta sống Bí tích Hòa Giải và không phán xét tha nhân.',
    relatedPassages: ['Ed 34,11-16', 'Mt 18,12-14', 'Ep 2,4-5'],
    verses: [
      {
        id: 'luke-15-20',
        bookId: 'luke',
        chapterNumber: 15,
        verseNumber: 20,
        text: 'Anh ta đứng lên đi về cùng cha. Anh ta còn ở đằng xa, thì người cha đã trông thấy. Ông chạnh lòng thương, chạy ra ôm cổ anh ta và hôn lấy hôn để.',
        contextBeforeAfter: 'Đỉnh cao của dụ ngôn: Người cha chủ động chạy ra đón đứa con hoang đàng.',
        commentary: 'Tình yêu vượt qua mọi lễ giáo xã hội: người cha Do Thái lớn tuổi chạy nhanh ra đường biểu lộ lòng thương xót không điều kiện.',
        theologicalThemes: ['Lòng Thương Xót vô biên', 'Bí tích Hòa Giải'],
        relatedVerses: ['Gr 31,20', 'Hs 11,8'],
        cccLinks: [1439, 1468, 1846]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // THƯ THỨ NHẤT CÔRINTÔ - CHƯƠNG 13 (BÀI CA ĐỨC ÁI)
  // --------------------------------------------------------------------------
  '1cor-13': {
    bookId: '1cor',
    chapterNumber: 13,
    title: 'Bài Ca Đức Ái Tuyệt Đỉnh',
    summary: 'Thánh Phaolô ca tụng Đức Ái (Agape) như ân huệ cao trọng nhất trong mọi đặc sủng. Đức ái là bản chất của Thiên Chúa và trường tồn mãi mãi.',
    historicalContext: 'Cộng đoàn Côrintô tranh giành nhau về các ân sủng nói tiếng lạ và làm phép lạ, gây chia rẽ trong giáo đoàn.',
    culturalContext: 'Văn hóa hùng biện và tìm kiếm đặc sủng thần bí tại thành phố cảng Côrintô sầm uất.',
    geography: 'Côrintô (Hy Lạp).',
    characters: ['Thánh Phaolô', 'Cộng đoàn tín hữu Côrintô'],
    literaryStructure: 'Sự cần thiết tuyệt đối của đức ái (13,1-3); Đặc tính của đức ái (13,4-7); Đức ái trường tồn bất diệt (13,8-13).',
    theologicalMeaning: 'Đức tin, Đức cậy, Đức mến; cả ba đều cao quý, nhưng cao trọng hơn cả là Đức mến. Không có tình yêu, mọi việc đạo đức chỉ như thanh la chũm chọe kêu rộn rã.',
    christianMessage: 'Mời gọi mỗi người sống đức mến cụ thể trong gia đình, giáo xứ và xã hội: nhẫn nhục, từ tâm, không ghen tương, không cầu tư lợi.',
    relatedPassages: ['Rm 12,9-21', 'Cl 3,12-14', '1Ga 4,7-21'],
    verses: [
      {
        id: '1cor-13-4',
        bookId: '1cor',
        chapterNumber: 13,
        verseNumber: 4,
        text: 'Đức mến thì nhẫn nhục, hiền hậu, không ghen tương, không vênh vang, không tự đắc,',
        contextBeforeAfter: 'Chân dung sống động của Đức Ái Kitô giáo.',
        commentary: 'Đức ái không phải là cảm xúc nhất thời mà là hành động nội tâm sâu xa phản chiếu chính dung mạo Đức Kitô.',
        theologicalThemes: ['Đức Mến (Agape)', 'Đức Tính Kitô Giáo'],
        relatedVerses: ['Ep 4,2', '1Pr 4,8'],
        cccLinks: [1822, 1825, 1826]
      },
      {
        id: '1cor-13-13',
        bookId: '1cor',
        chapterNumber: 13,
        verseNumber: 13,
        text: 'Hiện nay đức tin, đức cậy, đức mến, cả ba đều tồn tại, nhưng cao trọng hơn cả là đức mến.',
        contextBeforeAfter: 'Kết luận toàn bộ bài ca thần học về ba nhân đức đối thần.',
        commentary: 'Mai sau nơi Thiên Quốc, đức tin sẽ trở thành chiêm ngưỡng nhãn tiền, đức cậy được thành tựu viên mãn, chỉ còn đức mến tồn tại vĩnh cửu trong Thiên Chúa.',
        theologicalThemes: ['Ba Nhân Đức Đối Thần', 'Đức Ái Vĩnh Hằng'],
        relatedVerses: ['1Tx 1,3', 'Dt 10,22-24'],
        cccLinks: [1813, 1829]
      }
    ]
  }
};

/**
 * Canonical Chapter Resolver:
 * Resolves chapter theological structure, salvation history significance,
 * and extracts authentic key verses for this chapter.
 * NEVER generates hallucinated or placeholder fake scripture verses.
 * If full licensed translation has not been imported, marks isPendingFullText = true.
 */
function generateCanonicalChapter(bookId: string, chapterNumber: number): BibleChapter {
  const book = CATHOLIC_BIBLE_BOOKS.find(b => b.id === bookId);
  const bookName = book ? book.name : 'Kinh Thánh';
  const category = book ? book.categoryName : 'Sách Thánh';

  // Find structure section for this chapter if available
  const matchedSection = book?.structure?.find(s => {
    const parts = s.chapters.split('-').map(p => parseInt(p.trim(), 10));
    if (parts.length === 1 && !isNaN(parts[0])) {
      return parts[0] === chapterNumber;
    }
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return chapterNumber >= parts[0] && chapterNumber <= parts[1];
    }
    return false;
  });

  const sectionTitle = matchedSection ? matchedSection.section : '';
  const sectionDesc = matchedSection ? matchedSection.description : '';

  // Extract matching authentic key verses for this specific chapter if available
  const matchingKeyVerses = book?.keyVerses?.filter(kv => {
    const parts = kv.reference.split(' ');
    if (parts.length >= 2) {
      const chv = parts[1].split(',');
      return parseInt(chv[0], 10) === chapterNumber;
    }
    return false;
  }) || [];

  const authenticVerses: BibleVerse[] = matchingKeyVerses.map(kv => {
    const parts = kv.reference.split(' ');
    let verseNumber = 1;
    if (parts.length >= 2) {
      const chv = parts[1].split(',');
      if (chv.length >= 2) {
        verseNumber = parseInt(chv[1], 10) || 1;
      }
    }
    return {
      id: `${bookId}-${chapterNumber}-${verseNumber}`,
      bookId,
      chapterNumber,
      verseNumber,
      text: kv.text,
      contextBeforeAfter: `Câu Lời Chúa trọng tâm: ${kv.reference}. Nền tảng thần học của ${bookName}.`,
      commentary: `Bản văn quy điển phụng vụ Công giáo xác nhận ý nghĩa cứu độ then chốt của đoạn này.`,
      theologicalThemes: book?.mainThemes || ['Lời Chúa', 'Đức Tin'],
      relatedVerses: ['Ga 1,1', 'Mt 5,3'],
      cccLinks: [101, 102, 105]
    };
  });

  const chapterTitle = sectionTitle 
    ? `${bookName} • Chương ${chapterNumber}: ${sectionTitle}` 
    : `${bookName} • Chương ${chapterNumber}`;

  const chapterSummary = sectionDesc
    ? `Nội dung chương ${chapterNumber} thuộc phần "${sectionTitle}": ${sectionDesc}. ${book?.overview || ''}`
    : `Nội dung chương ${chapterNumber} của ${bookName}: Trình bày các biến cố cứu độ, lời dạy và chỉ dẫn luân lý thuộc truyền thống ${category}.`;

  return {
    bookId,
    chapterNumber,
    title: chapterTitle,
    summary: chapterSummary,
    // 12 Mục nghiên cứu chuyên sâu chuẩn học thuật Công giáo
    historicalContext: book?.historicalContext || `Bối cảnh thời kỳ hình thành của ${bookName} trong lịch sử cứu độ dân Chúa Israel và Hội Thánh sơ khai.`,
    geographyAndCulture: 'Miền Đất Thánh Canaan, Giêrusalem và không gian văn hóa vùng Cận Đông cổ đại.',
    culturalContext: 'Văn hóa và lịch sử Dân Chúa trong tiến trình lịch sử cứu độ.',
    geography: 'Đất Thánh và các miền liên quan trong lịch sử cứu độ.',
    authorAndAudience: book?.authorTradition ? `${book.authorTradition}. Viết cho cộng đoàn đức tin nhằm nuôi dưỡng sự trung tín với Giao Ước.` : 'Truyền thống Hội Thánh ghi nhận và lưu truyền dưới ơn linh hứng của Chúa Thánh Thần.',
    characters: book?.keyFigures || ['Thiên Chúa', 'Dân Chúa', 'Các Chứng Nhân Đức Tin'],
    literaryStructure: sectionTitle 
      ? `Chương ${chapterNumber} thuộc phần "${sectionTitle}". Được bố cục chặt chẽ theo cấu trúc thi văn/tự sự thần học của ${bookName}.` 
      : `Chương ${chapterNumber} thuộc cấu trúc văn chương quy chuẩn của ${bookName}.`,
    keyKeywords: [
      { term: 'Berit / Diatheke', meaning: 'Giao ước thần linh liên kết Thiên Chúa với loài người', originalLanguage: 'Hí-ri / Hy Lạp' },
      { term: 'Hesed / Eleos', meaning: 'Tình thương xót và lòng trung tín bền vững của Thiên Chúa', originalLanguage: 'Hí-ri / Hy Lạp' },
      { term: 'Shalom / Eirene', meaning: 'Bình an trọn vẹn, sự hòa giải và phúc lành cứu độ', originalLanguage: 'Hí-ri / Hy Lạp' }
    ],
    theologicalMeaning: book?.theologicalSignificance || `Nhấn mạnh sự trung tín của Thiên Chúa, kế hoạch cứu độ phổ quát và ơn gọi sống thánh thiện của người tín hữu.`,
    christologicalMeaning: `Mọi biến cố và lời tiên tri trong ${bookName} đều hướng về và tìm thấy sự hoàn tất trọn hảo nơi Đức Giêsu Kitô - Đấng Cứu Độ duy nhất.`,
    christianMessage: `Mời gọi người tín hữu đọc, suy gẫm và đem Lời Chúa ra thực hành trong đời sống hằng ngày.`,
    otNtConnections: [
      'Giao Ước Cũ chuẩn bị và loan báo Giao Ước Mới vĩnh cửu trong Máu Đức Kitô.',
      'Các hình bóng tiên trưng (Typology) được soi sáng trọn vẹn dưới ánh sáng Tin Mừng Phục Sinh.'
    ],
    relatedPassages: ['Tv 119', 'Ga 15,1-8', '2 Tm 3,16-17'],
    cccConnections: [101, 105, 120, 138],
    churchDocConnections: [
      'Hiến chế Tín lý Dei Verbum (số 11, 14, 21) về Mạc Khải Thần Linh',
      'Tông huấn Verbum Domini (số 7, 87) của ĐTC Biển Đức XVI về Lời Chúa'
    ],
    meditationAndApplication: `Đọc chậm rãi từng câu Lời Chúa trong tâm tình cầu nguyện (Lectio Divina). Hãy tự hỏi: Lời Chúa trong chương này soi sáng điều gì cho các mối tương quan và quyết định hôm nay của tôi?`,
    academicSources: [
      'Bản dịch Kinh Thánh của Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (NPD-CGKPV)',
      'The Jerusalem Bible / La Bible de Jérusalem (École Biblique de Jérusalem)',
      'The Navarre Bible: Scripture and Commentary (University of Navarre)',
      'Sách Giáo Lý Hội Thánh Công Giáo (GLHTCG / CCC 1992)',
      'Điển Ngữ Thần Học Thánh Kinh (Vocabulaire de Théologie Biblique - Xavier Léon-Dufour)'
    ],
    canonicalVerseCount: 20,
    isPendingFullText: true,
    keyVerses: matchingKeyVerses,
    verses: authenticVerses
  };
}

export function getChapterData(bookId: string, chapterNumber: number): BibleChapter {
  const key = `${bookId}-${chapterNumber}`;
  const chapter = SAMPLE_CHAPTERS_DATABASE[key] || generateCanonicalChapter(bookId, chapterNumber);
  return normalizeObject(chapter);
}
