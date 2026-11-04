// ============================================================================
// TỪ ĐIỂN KINH THÁNH CÔNG GIÁO - BIBLE DICTIONARY
// Giải nghĩa từ khoá thần học, chú giải ngôn ngữ gốc (Hebrew/Greek)
// ============================================================================

export interface BibleDictionaryEntry {
  term: string;                     // Thuật ngữ tiếng Việt
  termLatin?: string;               // Tiếng Latinh
  termGreek?: string;               // Tiếng Hy Lạp (Koine)
  termHebrew?: string;              // Tiếng Do Thái
  termEnglish?: string;             // Tiếng Anh
  pronunciation?: string;           // Phiên âm
  category: 'THEOLOGY'              // Thần học giáo lý
    | 'PERSON'                      // Nhân vật
    | 'PLACE'                       // Địa danh
    | 'RITUAL'                      // Nghi lễ phụng vụ
    | 'CONCEPT'                     // Khái niệm
    | 'OBJECT'                      // Đồ vật thánh
    | 'LITERARY';                   // Thể loại văn chương
  shortDefinition: string;          // Định nghĩa ngắn gọn
  fullExplanation: string;          // Giải thích đầy đủ
  biblicalUsage: string;            // Cách dùng trong Kinh Thánh
  keyVerses: string[];              // Câu dẫn chứng
  cccLinks?: number[];              // Số GLHTCG liên quan
  theologicalNote?: string;         // Nhận định thần học Công giáo
  relatedTerms: string[];           // Các thuật ngữ liên quan
}

export const BIBLE_DICTIONARY: BibleDictionaryEntry[] = [
  {
    term: 'Lời Chúa / Ngôi Lời',
    termLatin: 'Verbum Dei / Logos',
    termGreek: 'Λόγος (Logos)',
    termHebrew: 'דָּבָר (Dabar)',
    termEnglish: 'Word of God / Logos',
    pronunciation: 'Lô-gót / Da-ba',
    category: 'THEOLOGY',
    shortDefinition: 'Mạc khải sống động của Thiên Chúa được thể hiện trọn vẹn nơi Đức Giêsu Kitô - Ngôi Lời Nhập Thể.',
    fullExplanation: `Trong truyền thống Do Thái, "Dabar" (Lời) không chỉ là ngôn từ truyền đạt thông tin, mà là một thực tại sống động, năng động, có quyền năng tạo dựng và biến đổi. Khi Thiên Chúa phán, điều Người nói liền trở thành hiện thực (St 1,3: "Phải có ánh sáng! Liền có ánh sáng").

Trong tiếng Hy Lạp, Logos (Λόγος) không chỉ có nghĩa là "lời nói" mà còn bao hàm: lý trí, trật tự vũ trụ, nguyên lý cội rễ. Khi Thánh sử Gioan viết "Thoạt đầu đã có Ngôi Lời" (Ga 1,1), ngài đồng thời đối thoại với cả truyền thống Do Thái (Sáng thế) lẫn triết học Hy Lạp.

Đỉnh cao mạc khải: Ngôi Lời đã mặc xác phàm (Ga 1,14) - Thiên Chúa vĩnh hằng trở thành con người cụ thể trong lịch sử tại Bêlem. Từ đó, Kinh Thánh và Truyền Thống Tông Truyền đều là "Lời Chúa" dưới các hình thức khác nhau.`,
    biblicalUsage: 'Dabar xuất hiện hơn 1.400 lần trong Cựu Ước. Logos được Gioan dùng làm mở đầu Tin Mừng và 1 Gioan.',
    keyVerses: ['Ga 1,1-3', 'Ga 1,14', 'Dt 4,12', '2 Tm 3,16-17', 'Is 55,10-11'],
    cccLinks: [101, 102, 104, 108, 142],
    theologicalNote: 'Dei Verbum (Hiến chế Tín lý về Lời Chúa của Vatican II) xác định: Kinh Thánh và Truyền Thống Tông Truyền hình thành kho tàng Lời Chúa duy nhất được ủy thác cho Hội Thánh.',
    relatedTerms: ['Mạc Khải', 'Nhập Thể', 'Linh Hứng Kinh Thánh', 'Truyền Thống Tông Truyền']
  },
  {
    term: 'Giao Ước',
    termLatin: 'Foedus / Testamentum',
    termGreek: 'Διαθήκη (Diatheke)',
    termHebrew: 'בְּרִית (Berit)',
    termEnglish: 'Covenant',
    category: 'CONCEPT',
    shortDefinition: 'Mối tương quan ràng buộc thánh thiêng giữa Thiên Chúa và con người, nền tảng của toàn bộ lịch sử cứu độ.',
    fullExplanation: `Berit trong truyền thống Do Thái là hành vi pháp lý thiêng liêng nhất, tạo nên mối liên kết gia đình giữa các bên không phải cùng huyết tộc. Khác với hợp đồng thông thường (trao đổi lợi ích), Giao Ước Thiên Chúa luôn xuất phát từ sáng kiến nhưng không của Người.

Chuỗi Giao Ước trong Kinh Thánh:
1. Giao Ước với Nô-ê (St 9): Dấu hiệu cầu vồng, Thiên Chúa không tiêu diệt nhân loại.
2. Giao Ước với Áp-ra-ham (St 15; 17): Lời hứa đất và miêu duệ đông như sao trời.
3. Giao Ước Xi-nai qua Môsê (Xh 19-24): Mười Điều Răn và Luật Pháp.
4. Giao Ước với Đavít (2Sm 7): Lời hứa vương triều vĩnh cửu.
5. Giao Ước Mới trong Máu Đức Kitô (Lc 22,20; Dt 9,15): Hoàn tất và vượt qua mọi giao ước.

Đức Giêsu thiết lập Giao Ước Mới trong Bữa Tiệc Ly: "Chén này là Giao Ước Mới ký bằng máu Thầy" (Lc 22,20).`,
    biblicalUsage: 'Berit xuất hiện hơn 280 lần trong Cựu Ước, là từ khoá trung tâm của thần học Kinh Thánh.',
    keyVerses: ['St 9,9', 'St 15,18', 'Xh 24,8', 'Gr 31,31-34', 'Lc 22,20', 'Dt 9,15'],
    cccLinks: [56, 71, 72, 1961, 1963],
    theologicalNote: 'Lumen Gentium số 9 diễn tả Hội Thánh là Dân Giao Ước Mới. Toàn bộ Kinh Thánh được chia thành Cựu Ước (Giao Ước Cũ) và Tân Ước (Giao Ước Mới) dựa trên khái niệm cốt lõi này.',
    relatedTerms: ['Luật Môsê', 'Mươi Điều Răn', 'Vượt Qua', 'Bí Tích Thánh Thể', 'Hy Tế']
  },
  {
    term: 'Vượt Qua (Lễ Vượt Qua)',
    termLatin: 'Pascha',
    termGreek: 'Πάσχα (Pascha)',
    termHebrew: 'פֶּסַח (Pesach)',
    termEnglish: 'Passover / Pasch',
    pronunciation: 'Pê-sắc / Pát-cha',
    category: 'RITUAL',
    shortDefinition: 'Lễ trọng đại nhất của Israel kỷ niệm cuộc giải phóng khỏi Ai Cập, và là hình bóng tiên trưng hy tế cứu chuộc của Đức Kitô.',
    fullExplanation: `Lễ Vượt Qua (Pesach) kỷ niệm đêm Thiên Chúa "vượt qua" (tiêu diệt con trưởng Ai Cập) nhưng tha cho những nhà có vết máu chiên trên khung cửa (Xh 12). Chiên Vượt Qua phải hoàn hảo, không tì vết, máu được bôi trên cột và thanh ngang cửa nhà (hình dạng thập giá tiên trưng).

Đức Giêsu là Chiên Vượt Qua đích thực:
- Chết đúng vào giờ sát tế chiên Vượt Qua tại Giêrusalem (Ga 19,14).
- Không một xương nào bị bẻ gãy (Ga 19,33.36; Xh 12,46).
- Thánh Phaolô tuyên bố rõ: "Đức Kitô đã bị hiến tế: chính Người là Chiên Vượt Qua của chúng ta" (1Cr 5,7).
- Thánh Gioan Tẩy Giả công bố: "Đây Chiên Thiên Chúa, đây Đấng xóa tội trần gian" (Ga 1,29).`,
    biblicalUsage: 'Xh 12,1-14 mô tả lần đầu. Deuteronomy 16 quy định về lễ hằng năm. Tin Mừng Gioan đặt toàn bộ Cuộc Khổ Nạn trong bối cảnh thần học Vượt Qua.',
    keyVerses: ['Xh 12,1-14', '1 Cr 5,7', 'Ga 1,29', 'Ga 19,36', 'Kh 5,6'],
    cccLinks: [571, 608, 613, 1340, 1363],
    theologicalNote: 'Hội Thánh cử hành mầu nhiệm Vượt Qua của Đức Kitô mỗi lần dâng Thánh Lễ. Đêm Vọng Phục Sinh được gọi là "Mẹ của tất cả các đêm canh thức" (Augustinô).',
    relatedTerms: ['Chiên Thiên Chúa', 'Xuất Hành', 'Hiến Tế', 'Phục Sinh', 'Bí Tích Thánh Thể']
  },
  {
    term: 'Nước Thiên Chúa',
    termLatin: 'Regnum Dei',
    termGreek: 'Βασιλεία τοῦ Θεοῦ (Basileia tou Theou)',
    termHebrew: 'מַלְכוּת יְהוָה (Malkut YHWH)',
    termEnglish: 'Kingdom of God / Kingdom of Heaven',
    category: 'THEOLOGY',
    shortDefinition: 'Triều đại cai trị yêu thương của Thiên Chúa được Đức Giêsu công bố và khai mở trong lịch sử, hướng về sự hoàn tất viên mãn trong cánh chung.',
    fullExplanation: `"Nước Thiên Chúa" là chủ đề trung tâm của toàn bộ công cuộc rao giảng của Đức Giêsu (Mc 1,15). Đây không phải là một lãnh thổ địa lý hay một cơ cấu chính trị, mà là triều đại tình yêu, công lý và bình an mà Thiên Chúa đang thực hiện trong lịch sử qua Đức Kitô và Thần Khí của Người.

Ba chiều kích của Nước Thiên Chúa:
1. Đã đến (Already): Nước đã có mặt trong Đức Giêsu Kitô - qua các phép lạ chữa bệnh, trừ quỷ, tha tội.
2. Đang đến (Coming): Nước đang triển khai qua Hội Thánh và các bí tích.
3. Chưa đến trọn vẹn (Not yet): Sẽ được hoàn tất viên mãn khi Đức Kitô trở lại trong vinh quang.

Tám Mối Phúc (Mt 5,3-12) là Hiến Pháp của Nước Thiên Chúa, mô tả diện mạo công dân đích thực của Nước ấy.`,
    biblicalUsage: 'Xuất hiện hơn 100 lần trong Tin Mừng Nhất Lãm. Mátthêu dùng "Nước Trời" (Basileia ton ouranon) để tránh dùng danh Thiên Chúa theo tập tục Do Thái.',
    keyVerses: ['Mc 1,15', 'Mt 6,33', 'Lc 17,20-21', 'Mt 13,44-46', 'Ga 18,36'],
    cccLinks: [541, 546, 567, 671, 2816],
    theologicalNote: 'Lumen Gentium số 5 xác định Hội Thánh không đồng nhất với Nước Thiên Chúa, nhưng là "mầm mống và khởi đầu của Nước ấy trên trần gian".',
    relatedTerms: ['Tin Mừng', 'Môn Đệ', 'Eschatology', 'Hội Thánh', 'Bát Phúc']
  },
  {
    term: 'Ân Sủng',
    termLatin: 'Gratia',
    termGreek: 'Χάρις (Charis)',
    termHebrew: 'חֵן (Chen) / חֶסֶד (Hesed)',
    termEnglish: 'Grace',
    category: 'THEOLOGY',
    shortDefinition: 'Sự trợ giúp nhưng không của Thiên Chúa ban cho con người để cứu độ và thánh hóa, hoàn toàn không phải do công trạng.',
    fullExplanation: `Charis trong tiếng Hy Lạp Koine có nghĩa gốc là "vẻ đẹp, sự duyên dáng, món quà". Trong Tân Ước, từ này mang ý nghĩa thần học độc đáo: sự ưu ái hoàn toàn nhưng không và ban phát tự do của Thiên Chúa.

Các loại ân sủng:
1. Ân sủng hiện sủng (Actual Grace): Sự trợ giúp cụ thể, tức thời của Thiên Chúa trong mỗi hành vi cụ thể.
2. Ân sủng thường sủng / ân sủng thánh hóa (Sanctifying Grace): Sự tham dự vào sự sống thần linh của Thiên Chúa, được ban qua Phép Rửa.
3. Ân sủng bí tích: Ân sủng đặc thù qua từng bí tích.
4. Đặc sủng (Charismata): Hồng ân đặc biệt cho sứ vụ trong Hội Thánh.

Thánh Phaolô tuyên bố: "Chính do ân sủng và nhờ lòng tin mà anh em được cứu độ: đây không phải bởi sức anh em, mà là ân huệ của Thiên Chúa" (Ep 2,8).`,
    biblicalUsage: 'Charis xuất hiện 155 lần trong Tân Ước. Phaolô dùng nhiều nhất (100 lần) để diễn tả cốt lõi Tin Mừng.',
    keyVerses: ['Ep 2,8-9', 'Rm 3,24', 'Rm 5,15', 'Ga 1,14', '2 Cr 12,9'],
    cccLinks: [1996, 1997, 1999, 2000, 2024],
    theologicalNote: 'Hội đồng Trentô (1547) định tín: Ân sủng công chính hóa không chỉ là sự tha thứ tội lỗi mà còn là sự đổi mới nội tâm thực sự, tham dự vào bản tính Thiên Chúa (2Pr 1,4).',
    relatedTerms: ['Công Chính Hóa', 'Thánh Hóa', 'Phép Rửa', 'Ơn Cứu Độ', 'Đức Tin']
  },
  {
    term: 'Đấng Mêsia / Kitô',
    termLatin: 'Christus / Messias',
    termGreek: 'Χριστός (Christos)',
    termHebrew: 'מָשִׁיחַ (Mashiach)',
    termEnglish: 'Messiah / Christ',
    pronunciation: 'Ma-si-ắc / Chri-stós',
    category: 'THEOLOGY',
    shortDefinition: 'Người được xức dầu thánh, Đấng Cứu Thế được Thiên Chúa phái đến để giải phóng dân Người và thiết lập Vương Triều Thiên Chúa.',
    fullExplanation: `Mashiach (tiếng Do Thái) và Christos (tiếng Hy Lạp) đều có nghĩa là "Người được xức dầu". Trong Cựu Ước, ba loại nhân vật được xức dầu thánh: vua (1Sm 10,1), tư tế (Xh 29,7), và ngôn sứ (1V 19,16). Đây là ba sứ vụ mà Đức Giêsu Kitô thực hiện trọn vẹn và hoàn hảo.

Lịch sử niềm mong đợi Mêsia:
- Lời hứa đầu tiên (Protoevangelium): St 3,15 - miêu duệ người nữ.
- Lời hứa với Áp-ra-ham (St 12,3): muôn dân được chúc phúc qua miêu duệ ông.
- Lời hứa với Đavít (2Sm 7,12-16): vương triều vĩnh cửu.
- Người Tôi Trung đau khổ (Is 52-53): đau khổ cứu chuộc.
- Con Người trong Đa-ni-en 7,13.

Tuyên xưng đức tin của Phêrô tại Xê-da-rê Phi-líp: "Thầy là Đấng Kitô, Con Thiên Chúa hằng sống" (Mt 16,16) là đỉnh cao của Tin Mừng Nhất Lãm.`,
    biblicalUsage: 'Mashiach xuất hiện 39 lần trong Cựu Ước. Christos xuất hiện 529 lần trong Tân Ước.',
    keyVerses: ['Is 61,1', 'Mt 16,16', 'Lc 4,18', 'Ga 1,41', 'Cv 2,36'],
    cccLinks: [436, 437, 453, 711, 712],
    theologicalNote: 'Giáo lý Công giáo nhấn mạnh: Đức Giêsu là Đấng Mêsia không phải theo kiểu chính trị mà người Do Thái trông đợi, mà là Đấng Mêsia khổ nạn và phục sinh, cứu độ bằng tình yêu tự hiến.',
    relatedTerms: ['Tiên Trưng', 'Người Tôi Trung', 'Nhập Thể', 'Phục Sinh', 'Nước Thiên Chúa']
  },
  {
    term: 'Giáo Hội / Hội Thánh',
    termLatin: 'Ecclesia',
    termGreek: 'Ἐκκλησία (Ekklesia)',
    termHebrew: 'קָהָל (Qahal)',
    termEnglish: 'Church',
    pronunciation: 'Ek-kle-si-a',
    category: 'THEOLOGY',
    shortDefinition: 'Cộng đoàn những người được Thiên Chúa triệu tập nhân danh Đức Kitô, nối dài mầu nhiệm Nhập Thể trong lịch sử.',
    fullExplanation: `Ekklesia (tiếng Hy Lạp) có nghĩa gốc là "hội đồng công dân được triệu tập" - những người được kêu gọi ra khỏi (ek-kalein) cuộc sống tối tăm và tội lỗi. Tương đương với Qahal trong Cựu Ước - đại hội dân Chúa tại Sinai.

Hội Thánh trong mầu nhiệm (theo Lumen Gentium):
1. Dân Thiên Chúa: Dân Giao Ước Mới, kế thừa và vượt qua Israel.
2. Thân Mình Đức Kitô: Đức Kitô là Đầu, tín hữu là chi thể.
3. Đền Thờ Chúa Thánh Thần: Nơi Thần Khí ngự trị và thánh hóa.
4. Hiền Thê của Đức Kitô: Mối tương quan yêu thương hôn nhân thần linh.

Bốn đặc tính cốt lõi (Kinh Tin Kính): Duy Nhất, Thánh Thiện, Công Giáo (Phổ Quát), Tông Truyền.

"Hội Thánh của Đức Kitô tồn tại đầy đủ trong Hội Thánh Công giáo, do Đấng Kế Vị Phêrô và các Giám Mục hiệp thông với ngài điều hành" (Lumen Gentium 8).`,
    biblicalUsage: 'Ekklesia xuất hiện 114 lần trong Tân Ước. Mt 16,18 là lần đầu Chúa Giêsu dùng từ này về cộng đoàn của Người.',
    keyVerses: ['Mt 16,18', '1 Cr 12,27', 'Ep 1,22-23', 'Cl 1,18', 'Kh 19,7'],
    cccLinks: [751, 752, 759, 771, 781],
    theologicalNote: 'Lumen Gentium (1964) là Hiến chế Tín lý nền tảng về Hội Thánh của Công đồng Vatican II. Gaudium et Spes bổ sung chiều kích Hội Thánh trong thế giới hiện đại.',
    relatedTerms: ['Phép Rửa', 'Bí Tích', 'Giám Mục', 'Giáo Hoàng', 'Tông Truyền', 'Hiệp Thông']
  },
  {
    term: 'Đức Tin',
    termLatin: 'Fides',
    termGreek: 'Πίστις (Pistis)',
    termHebrew: 'אֱמוּנָה (Emunah)',
    termEnglish: 'Faith',
    category: 'THEOLOGY',
    shortDefinition: 'Sự đáp trả tự do và trọn vẹn của con người trước Thiên Chúa tự mạc khải - gồm cả trí tuệ, ý chí và hành động.',
    fullExplanation: `Emunah (tiếng Do Thái) có gốc từ "aman" - vững chắc, kiên định, đáng tin. Đức tin không phải chủ yếu là chấp nhận các giáo thuyết trừu tượng, mà là sự tín thác cá nhân toàn vẹn vào Thiên Chúa trung tín.

Pistis (tiếng Hy Lạp) bao gồm:
1. Fides quae (đức tin về nội dung): Những chân lý được tin.
2. Fides qua (đức tin như hành vi): Hành vi tin tưởng bản thân.
3. Fides ex auditu: Đức tin đến từ việc lắng nghe Lời Chúa (Rm 10,17).

Đức tin theo Thánh Phaolô:
- Áp-ra-ham là cha của kẻ tin (Rm 4): đức tin trước Luật Pháp.
- "Người công chính sẽ sống nhờ đức tin" (Rm 1,17; Hb 2,4).
- Bộ ba đức tin - đức cậy - đức mến (1Cr 13,13).

Thánh Giacôbê bổ sung: Đức tin không có hành động thì đức tin ấy chết (Gc 2,17) - không mâu thuẫn Phaolô mà bổ sung: đức tin đích thực sinh hoa trái hành động.`,
    biblicalUsage: 'Pistis xuất hiện 243 lần trong Tân Ước. Thư Hipri chương 11 là "Hành lang của các anh hùng đức tin" liệt kê gương sáng Cựu Ước.',
    keyVerses: ['Dt 11,1', 'Rm 1,17', 'Rm 10,17', 'Gc 2,17', 'Ga 20,29'],
    cccLinks: [142, 150, 153, 162, 1814],
    theologicalNote: 'Hội đồng Vatican I (Dei Filius, 1870) và Vatican II (Dei Verbum, 1965) đều khẳng định: Đức tin là hành vi lý trí và ý chí tự do, không mâu thuẫn với lý trí mà được lý trí chuẩn bị và bổ sung.',
    relatedTerms: ['Đức Cậy', 'Đức Mến', 'Mạc Khải', 'Ơn Cứu Độ', 'Phép Rửa']
  },
  {
    term: 'Ơn Cứu Độ / Cứu Chuộc',
    termLatin: 'Salvatio / Redemptio',
    termGreek: 'Σωτηρία (Soteria)',
    termHebrew: 'יְשׁוּעָה (Yeshuah)',
    termEnglish: 'Salvation / Redemption',
    pronunciation: 'So-te-ri-a / Ye-shu-a',
    category: 'THEOLOGY',
    shortDefinition: 'Hành động Thiên Chúa giải phóng con người khỏi tội lỗi, cái chết và mọi quyền lực xấu, phục hồi tương quan với Người và ban sự sống đời đời.',
    fullExplanation: `Yeshuah (tiếng Do Thái) nghĩa là "giải phóng, cứu thoát" - là gốc của tên "Giêsu" (Yeshua = Thiên Chúa cứu độ). Thiên thần truyền cho Giuse: "Ông phải đặt tên con trẻ là Giêsu, vì chính Người sẽ cứu dân Người khỏi tội lỗi của họ" (Mt 1,21).

Phân biệt các khái niệm:
1. Cứu Độ (Salvation): Khái niệm rộng bao gồm toàn bộ kế hoạch Thiên Chúa phục hồi con người.
2. Cứu Chuộc (Redemption): Nhấn mạnh ý nghĩa "mua lại, giải phóng khỏi nô lệ" - Đức Kitô trả giá bằng Máu (1Pr 1,18-19).
3. Hòa Giải (Reconciliation): Phục hồi mối tương quan bị đứt vỡ do tội (2Cr 5,18-19).
4. Công Chính Hóa (Justification): Được tuyên bố công chính trước Thiên Chúa nhờ ân sủng và đức tin (Rm 3,24).

Đức Giêsu cứu độ bằng toàn bộ mầu nhiệm Nhập Thể, Cuộc Đời, Khổ Nạn, Tử Nạn và Phục Sinh - không chỉ riêng Thập Giá.`,
    biblicalUsage: 'Yeshuah xuất hiện 78 lần trong Cựu Ước. Soteria xuất hiện 46 lần trong Tân Ước.',
    keyVerses: ['Mt 1,21', 'Ga 3,16', 'Rm 5,8', '1 Tm 2,4', 'Cv 4,12'],
    cccLinks: [430, 601, 614, 616, 1026],
    theologicalNote: 'Hội Thánh Công giáo khẳng định: Đức Kitô là Đấng Trung Gian duy nhất (1Tm 2,5), nhưng ơn cứu độ có thể đến với mọi người thiện chí qua Hội Thánh và Mầu Nhiệm Vượt Qua, dù họ không biết Đức Kitô cách tường minh (Lumen Gentium 16).',
    relatedTerms: ['Nhập Thể', 'Khổ Nạn', 'Phục Sinh', 'Ân Sủng', 'Phép Rửa']
  },
  {
    term: 'Thánh Thần / Thần Khí',
    termLatin: 'Spiritus Sanctus',
    termGreek: 'Ἅγιον Πνεῦμα (Hagion Pneuma)',
    termHebrew: 'רוּחַ הַקֹּדֶשׁ (Ruach Ha-Kodesh)',
    termEnglish: 'Holy Spirit',
    category: 'THEOLOGY',
    shortDefinition: 'Ngôi Ba Thiên Chúa, "Chúa và là Đấng ban sự sống", Thầy dạy và Đấng Bảo Trợ của Hội Thánh.',
    fullExplanation: `Ruach (tiếng Do Thái) có nghĩa đa tầng: gió, hơi thở, thần khí, tinh thần. Pneuma (tiếng Hy Lạp) tương tự: hơi thở, gió, linh hồn, thần khí.

Chúa Thánh Thần trong Cựu Ước:
- Thần Khí Thiên Chúa bay lượn trên mặt nước (St 1,2).
- Thần Khí ngự xuống trên các ngôn sứ, quan xét.
- Lời hứa tuôn đổ Thần Khí trên mọi xác thịt (Ge 3,1-2).

Chúa Thánh Thần trong Tân Ước:
- Thụ Thai Chúa Giêsu (Lc 1,35).
- Phép Rửa của Chúa Giêsu (Mt 3,16).
- Lễ Hiện Xuống - ngày sinh nhật Hội Thánh (Cv 2,1-13).
- Thầy dạy và Đấng Nhắc Nhở (Ga 14,26).
- Đấng Bảo Trợ / Đấng An Ủi (Parakletos - Ga 14,16).

Kinh Tin Kính Nicêa-Constantinople (381) tuyên tín: Chúa Thánh Thần là "Chúa và là Đấng ban sự sống, Người bởi Chúa Cha và Chúa Con mà ra, được phụng thờ và tôn vinh cùng với Chúa Cha và Chúa Con".`,
    biblicalUsage: 'Ruach Ha-Kodesh trong Cựu Ước. Hagion Pneuma xuất hiện 90 lần trong Tân Ước, đặc biệt dày đặc trong Gioan 14-16 và Công Vụ Tông Đồ.',
    keyVerses: ['St 1,2', 'Lc 1,35', 'Ga 14,16-17', 'Ga 14,26', 'Cv 2,4', 'Rm 8,26'],
    cccLinks: [687, 703, 729, 742, 1830],
    theologicalNote: 'Giáo lý Công giáo nhấn mạnh Chúa Thánh Thần không chỉ hành động trong Hội Thánh mà còn hoạt động trong toàn thế giới, chuẩn bị và dẫn đưa mọi người về với Đức Kitô.',
    relatedTerms: ['Thiên Chúa Ba Ngôi', 'Phép Rửa', 'Thêm Sức', 'Đặc Sủng', 'Lễ Hiện Xuống']
  }
];

// ============================================================================
// BẢNG ĐỐI CHIẾU ĐA NGÔN NGỮ KINH THÁNH
// ============================================================================

export interface BibleTranslationInfo {
  id: string;
  code: string;
  name: string;
  language: string;
  year?: number;
  authority?: string;
  note: string;
  status: 'official' | 'scholarly' | 'traditional';
}

export const BIBLE_TRANSLATIONS: BibleTranslationInfo[] = [
  {
    id: 'vi-gkpv',
    code: 'GKPV',
    name: 'Kinh Thánh - Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ',
    language: 'Tiếng Việt',
    year: 2011,
    authority: 'Hội Đồng Giám Mục Việt Nam phê duyệt cho phụng vụ',
    note: 'Bản dịch chính thức phụng vụ Hội Thánh Công giáo tại Việt Nam. Dịch từ bản Kinh Thánh phê chuẩn Neo-Vulgate (1979). Đây là bản dùng trong tất cả các Thánh Lễ và phụng vụ.',
    status: 'official'
  },
  {
    id: 'la-vulgate',
    code: 'VUL',
    name: 'Biblia Sacra Vulgata (Neo-Vulgata)',
    language: 'Tiếng Latinh',
    year: 1979,
    authority: 'Thánh Giáo Hoàng Gioan Phaolô II phê chuẩn',
    note: 'Bản dịch chính thức của Hội Thánh Công giáo. Thánh Giêrônimô (347-420) dịch từ nguyên văn tiếng Do Thái và Hy Lạp. Được Công đồng Trentô (1546) tuyên bố là bản dịch chính thức.',
    status: 'official'
  },
  {
    id: 'gr-lxx',
    code: 'LXX',
    name: 'Septuaginta (Bảy Mươi)',
    language: 'Tiếng Hy Lạp',
    year: -250,
    authority: 'Cộng đồng Do Thái Alexandria; được Hội Thánh sơ khai sử dụng',
    note: 'Bản dịch Cựu Ước sang tiếng Hy Lạp, thực hiện tại Alexandria (Ai Cập) vào thế kỷ III-II TCN. Đây là bản mà các tác giả Tân Ước trích dẫn trong hơn 80% các câu dẫn chứng. Bảo tồn 7 sách Đệ Nhị Quy Điển mà người Tin Lành đã loại bỏ.',
    status: 'traditional'
  },
  {
    id: 'hb-masoretic',
    code: 'MT',
    name: 'Masoretic Text (Bản văn Masoretic)',
    language: 'Tiếng Do Thái',
    year: 1000,
    authority: 'Các học giả Do Thái Masorete chuẩn hóa',
    note: 'Bản văn Do Thái tiêu chuẩn được các học giả Masorete biên soạn hoàn chỉnh vào thế kỷ IX-X CN. Nền tảng cho dịch thuật Cựu Ước của hầu hết các bản dịch Tin Lành và học thuật hiện đại.',
    status: 'scholarly'
  },
  {
    id: 'gr-na28',
    code: 'NA28',
    name: 'Novum Testamentum Graece (Nestle-Aland 28)',
    language: 'Tiếng Hy Lạp',
    year: 2012,
    authority: 'Viện Nghiên cứu Kinh Thánh Munich & Deutsche Bibelgesellschaft',
    note: 'Bản văn phê bình tiêu chuẩn Tân Ước tiếng Hy Lạp Koine, được sử dụng rộng rãi trong học thuật Kinh Thánh toàn cầu. Hiệu chỉnh lần thứ 28 kết hợp hơn 5.800 bản chép tay Hy Lạp cổ.',
    status: 'scholarly'
  }
];

// ============================================================================
// CÁC CÂU KINH THÁNH ĐỐI CHIẾU ĐA NGÔN NGỮ
// ============================================================================

export interface ParallelVerseEntry {
  reference: string;
  bookId: string;
  chapter: number;
  verse: number;
  translations: {
    translationId: string;
    text: string;
    language: string;
  }[];
  keyWords: {
    term: string;
    language: string;
    transliteration: string;
    meaning: string;
  }[];
  cccLinks: number[];
  exegeticalNote: string;
}

export const PARALLEL_VERSES_DATABASE: ParallelVerseEntry[] = [
  {
    reference: 'Ga 1,1',
    bookId: 'john',
    chapter: 1,
    verse: 1,
    translations: [
      { translationId: 'vi-gkpv', text: 'Thoạt đầu đã có Ngôi Lời. Ngôi Lời vẫn hướng về Thiên Chúa, và Ngôi Lời là Thiên Chúa.', language: 'Tiếng Việt (GKPV)' },
      { translationId: 'la-vulgate', text: 'In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum.', language: 'Latinh (Vulgata)' },
      { translationId: 'gr-na28', text: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.', language: 'Hy Lạp (NA28)' },
    ],
    keyWords: [
      { term: 'ἐν ἀρχῇ', language: 'Hy Lạp', transliteration: 'en arche', meaning: 'Thoạt đầu / Trong nguyên lý / Trong khởi nguyên — phản chiếu St 1,1 tiếng Do Thái "Bereshit"' },
      { term: 'λόγος', language: 'Hy Lạp', transliteration: 'Logos', meaning: 'Lời / Ngôi Lời / Lý trí vũ trụ — vừa đối thoại với triết học Hy Lạp vừa là Dabar tiếng Do Thái' },
      { term: 'ἦν πρὸς', language: 'Hy Lạp', transliteration: 'en pros', meaning: 'Hướng về / Ở cùng — pros không chỉ là "bên cạnh" mà là "mặt đối mặt, tương quan mật thiết"' },
    ],
    cccLinks: [241, 242, 291],
    exegeticalNote: 'Ba câu ngắn với cấu trúc leo thang (chiasmus): Logos tồn tại trước sáng tạo → hiệp thông với Thiên Chúa → đồng bản tính với Thiên Chúa. Ba tuyên bố này làm nền tảng cho Học thuyết Thiên Chúa Ba Ngôi.'
  },
  {
    reference: 'Mt 16,18',
    bookId: 'matt',
    chapter: 16,
    verse: 18,
    translations: [
      { translationId: 'vi-gkpv', text: 'Còn Thầy, Thầy bảo cho anh biết: anh là Phêrô, nghĩa là Tảng Đá, trên tảng đá này, Thầy sẽ xây Hội Thánh của Thầy, và quyền lực tử thần sẽ không thắng nổi.', language: 'Tiếng Việt (GKPV)' },
      { translationId: 'la-vulgate', text: 'Et ego dico tibi quia tu es Petrus et super hanc petram aedificabo ecclesiam meam et portae inferi non praevalebunt adversum eam.', language: 'Latinh (Vulgata)' },
      { translationId: 'gr-na28', text: 'κἀγὼ δέ σοι λέγω ὅτι σὺ εἶ Πέτρος, καὶ ἐπὶ ταύτῃ τῇ πέτρᾳ οἰκοδομήσω μου τὴν ἐκκλησίαν, καὶ πύλαι ᾅδου οὐ κατισχύσουσιν αὐτῆς.', language: 'Hy Lạp (NA28)' },
    ],
    keyWords: [
      { term: 'Πέτρος / πέτρᾳ', language: 'Hy Lạp', transliteration: 'Petros / petra', meaning: 'Phêrô (tên riêng nam) / Tảng Đá (nền tảng vĩ đại). Trong tiếng Aram mà Chúa Giêsu dùng: Kepha = tảng đá, không phân biệt. Gioan 1,42 xác nhận: "Anh sẽ được gọi là Kêpha"' },
      { term: 'ἐκκλησίαν', language: 'Hy Lạp', transliteration: 'ekklesian', meaning: 'Hội Thánh — cộng đoàn được triệu tập. Đây là lần đầu tiên Chúa Giêsu dùng từ này về cộng đoàn của Người' },
      { term: 'πύλαι ᾅδου', language: 'Hy Lạp', transliteration: 'pylai hadou', meaning: 'Cửa địa ngục / Cổng âm phủ — không phải ác thần tấn công, mà là sức mạnh cái chết không thể tiêu diệt Hội Thánh' },
    ],
    cccLinks: [552, 553, 881, 882],
    exegeticalNote: 'Chúa Giêsu đổi tên Simon thành Phêrô — hành động mang tầm thiêng liêng (như Abraham, Israel). Trao quyền Chìa Khóa (Is 22,22) đặt Phêrô vào vai trò Tể Tướng Nhà Vua Đavít, nền tảng lịch sử của chức Giáo Hoàng.'
  },
  {
    reference: 'Rm 8,38-39',
    bookId: 'rom',
    chapter: 8,
    verse: 38,
    translations: [
      { translationId: 'vi-gkpv', text: 'Vì tôi thâm tín rằng sự chết hay sự sống, dù thiên thần hay thiên phủ, dù hiện tại hay tương lai, dù quyền năng, dù chiều cao hay chiều sâu, hay bất cứ tạo vật nào khác, không có gì tách được chúng ta ra khỏi tình yêu của Thiên Chúa thể hiện nơi Đức Kitô Giêsu, Chúa chúng ta.', language: 'Tiếng Việt (GKPV)' },
      { translationId: 'la-vulgate', text: 'Certus sum enim quia neque mors neque vita neque angeli neque principatus neque praesentia neque futura neque virtutes neque altitudo neque profundum neque creatura alia aliqua poterit nos separare a caritate Dei, quae est in Christo Iesu Domino nostro.', language: 'Latinh (Vulgata)' },
      { translationId: 'gr-na28', text: 'πέπεισμαι γὰρ ὅτι οὔτε θάνατος οὔτε ζωή... οὔτε τις κτίσις ἑτέρα δυνήσεται ἡμᾶς χωρίσαι ἀπὸ τῆς ἀγάπης τοῦ θεοῦ τῆς ἐν Χριστῷ Ἰησοῦ τῷ κυρίῳ ἡμῶν.', language: 'Hy Lạp (NA28)' },
    ],
    keyWords: [
      { term: 'ἀγάπης', language: 'Hy Lạp', transliteration: 'agapes', meaning: 'Tình yêu (Agape) — tình yêu vô điều kiện, tự hiến, không phải eros (tình luyến ái) hay philia (tình bạn). Từ Kitô giáo đặc thù cho tình yêu Thiên Chúa.' },
      { term: 'χωρίσαι', language: 'Hy Lạp', transliteration: 'chorisai', meaning: 'Tách ra / Ly cách — không một thực tại nào trong vũ trụ có đủ quyền năng ngăn cách tín hữu khỏi tình yêu Thiên Chúa trong Đức Kitô.' },
    ],
    cccLinks: [308, 1821, 1994],
    exegeticalNote: 'Đây là đỉnh cao của Thư Rôma chương 8 — thánh ca tình yêu của Phaolô. Liệt kê 10 thực tại vũ trụ không thể phá vỡ giao ước Thiên Chúa-con người trong Đức Kitô. Cấu trúc văn chương đối ngẫu (antithesis) cực kỳ tinh tế.'
  },
  {
    reference: 'St 1,1',
    bookId: 'gen',
    chapter: 1,
    verse: 1,
    translations: [
      { translationId: 'vi-gkpv', text: 'Thoạt đầu, Thiên Chúa sáng tạo trời và đất.', language: 'Tiếng Việt (GKPV)' },
      { translationId: 'la-vulgate', text: 'In principio creavit Deus caelum et terram.', language: 'Latinh (Vulgata)' },
      { translationId: 'hb-masoretic', text: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', language: 'Do Thái (MT)' },
      { translationId: 'gr-lxx', text: 'Ἐν ἀρχῇ ἐποίησεν ὁ θεὸς τὸν οὐρανὸν καὶ τὴν γῆν.', language: 'Hy Lạp (LXX)' },
    ],
    keyWords: [
      { term: 'בְּרֵאשִׁית', language: 'Do Thái', transliteration: 'Bereshit', meaning: 'Thoạt đầu / Trong nguyên lý — không chỉ là điểm thời gian mà là bản thể luận: Thiên Chúa là nguyên lý cội rễ của tất cả' },
      { term: 'בָּרָא', language: 'Do Thái', transliteration: 'Bara', meaning: 'Sáng tạo — động từ độc quyền dành cho Thiên Chúa. Không bao giờ có vật liệu làm tân ngữ → Creatio ex nihilo (sáng tạo từ hư vô)' },
      { term: 'אֱלֹהִים', language: 'Do Thái', transliteration: 'Elohim', meaning: 'Thiên Chúa (số nhiều trang nghiêm) — số nhiều nhưng động từ số ít, thể hiện phẩm giá và sự sung mãn thần linh. Các Giáo phụ thấy dấu hiệu Ba Ngôi' },
    ],
    cccLinks: [279, 280, 290, 296],
    exegeticalNote: 'Câu ngắn nhưng là tuyên ngôn thần học cách mạng: bác bỏ mọi dạng nhị nguyên thần (thần thiện/thần ác), đa thần (nhiều thần sáng tạo) và phiếm thần (vũ trụ chính là Thiên Chúa). Chỉ có MỘT Thiên Chúa, Đấng sáng tạo TẤT CẢ từ HƯ VÔ.'
  },
  {
    reference: 'Lc 1,28',
    bookId: 'luke',
    chapter: 1,
    verse: 28,
    translations: [
      { translationId: 'vi-gkpv', text: 'Bà được đầy ân sủng, Đức Chúa Trời ở cùng bà.', language: 'Tiếng Việt (GKPV)' },
      { translationId: 'la-vulgate', text: 'Ave, gratia plena, Dominus tecum, benedicta tu in mulieribus.', language: 'Latinh (Vulgata)' },
      { translationId: 'gr-na28', text: 'χαῖρε, κεχαριτωμένη, ὁ κύριος μετά σου.', language: 'Hy Lạp (NA28)' },
    ],
    keyWords: [
      { term: 'κεχαριτωμένη', language: 'Hy Lạp', transliteration: 'kecharitomene', meaning: 'Đã được ân sủng trọn vẹn — thể hoàn thành thụ động (perfect passive participle): ân sủng hoàn tất từ trước, dấu hiệu của tín điều Vô Nhiễm Nguyên Tội' },
      { term: 'χαῖρε', language: 'Hy Lạp', transliteration: 'chaire', meaning: 'Vui lên / Kính chào — không phải chỉ "xin chào" thông thường mà là lời loan báo vui mừng cứu độ, như các ngôn sứ Zacaria 9,9 và Giô-en 2,21' },
    ],
    cccLinks: [490, 491, 492, 722],
    exegeticalNote: 'Tên thiên thần dùng thay cho tên riêng Maria: "Kecharitomene" = "Người được ân sủng trọn vẹn". Hội Thánh dựa vào từ này (thể hoàn thành Hy Lạp) để xác nhận Đức Maria đã được thánh hóa và gìn giữ khỏi tội từ trước khi thụ thai — nền tảng ngôn ngữ của tín điều Vô Nhiễm Nguyên Tội (1854).'
  }
];
