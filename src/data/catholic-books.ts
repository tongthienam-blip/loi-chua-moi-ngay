import { BibleBook } from '@/types';

// ============================================================================
// DANH MỤC ĐẦY ĐỦ 73 SÁCH KINH THÁNH CÔNG GIÁO CHUẨN MỰC
// 46 Sách Cựu Ước (gồm 7 sách Đệ Nhị Quy Điển) + 27 Sách Tân Ước
// Quy chuẩn Giáo luật & Công đồng Trentô, Vaticanô II
// ============================================================================

export const CATHOLIC_BIBLE_BOOKS: BibleBook[] = [
  // --------------------------------------------------------------------------
  // CỰU ƯỚC: I. KHỐI NGŨ THƯ (PENTATEUCH - 5 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'gen',
    code: 'GN',
    name: 'Sáng Thế',
    latinName: 'Genesis',
    abbreviation: 'St',
    testament: 'OLD',
    category: 'PENTATEUCH',
    categoryName: 'Ngũ Thư',
    chaptersCount: 50,
    order: 1,
    overview: 'Cuốn sách đầu tiên của Kinh Thánh ghi lại nguồn gốc vũ trụ, nhân loại, sa ngã và khởi đầu lịch sử cứu độ qua các tổ phụ Do Thái.',
    authorTradition: 'Truyền thống gán cho Môsê; nghiên cứu phê bình ghi nhận tổng hợp từ các nguồn tư liệu J, E, D, P.',
    compositionPeriod: 'Được đúc kết thành văn hoàn chỉnh vào thời kỳ Lưu đày và Hậu Lưu đày (thế kỷ VI-V TCN).',
    historicalContext: 'Bối cảnh thế giới Lưỡng Hà và Cận Đông Cổ đại, từ sự khởi đầu nhân loại đến cuộc định cư của gia tộc Giacóp tại Ai Cập.',
    mainThemes: ['Thiên Chúa Sáng Tạo tốt đẹp', 'Tội lỗi và sự tha hóa', 'Giao ước cứu độ', 'Lời hứa về miền Đất và Miêu duệ'],
    purpose: 'Tuyên xưng Thiên Chúa là Đấng Tạo Hóa duy nhất và khởi xướng kế hoạch cứu chuộc nhân loại qua dân được tuyển chọn.',
    structure: [
      { section: 'Lịch sử nguyên thủy', chapters: '1-11', description: 'Công trình sáng tạo, sự sa ngã, lụt hồng thủy, tháp Ba-ben' },
      { section: 'Lịch sử các Tổ phụ', chapters: '12-50', description: 'Abraham, Isaac, Giacóp và Giuse tại Ai Cập' }
    ],
    keyFigures: ['Ađam', 'Eva', 'Nôê', 'Abraham', 'Sara', 'Isaac', 'Giacóp', 'Giuse'],
    keyVerses: [
      { reference: 'St 1,1', text: 'Thoạt đầu, Thiên Chúa sáng tạo trời và đất.' },
      { reference: 'St 3,15', text: 'Ta sẽ gây mối thù giữa mi và người đàn bà, giữa dòng giống mi và dòng giống nàng.' },
      { reference: 'St 12,2-3', text: 'Ta sẽ làm cho ngươi thành một dân lớn, sẽ chúc phúc cho ngươi.' }
    ],
    theologicalSignificance: 'Chứa đựng Tin Mừng Nguyên Thủy (Protoevangelium - St 3,15), nền tảng của nhân chủng học Kitô giáo và mầu nhiệm Sáng tạo.'
  },
  {
    id: 'exod',
    code: 'EX',
    name: 'Xuất Hành',
    latinName: 'Exodus',
    abbreviation: 'Xh',
    testament: 'OLD',
    category: 'PENTATEUCH',
    categoryName: 'Ngũ Thư',
    chaptersCount: 40,
    order: 2,
    overview: 'Trọng tâm của Cựu Ước: Thiên Chúa giải phóng dân Israel khỏi ách nô lệ Ai Cập và thiết lập Giao ước Sinai.',
    authorTradition: 'Truyền thống Môsê; trung tâm của ký ức lập quốc của Israel.',
    compositionPeriod: 'Thế kỷ XIII TCN (sự kiện) và được biên tập chính thức qua các thế kỷ sau.',
    historicalContext: 'Thời kỳ đế chế Ai Cập Tân Vương quốc (thời vua Ramesses II).',
    mainThemes: ['Sự giải phóng', 'Danh Thiên Chúa (YAHWEH)', 'Giao ước Sinai', 'Mười Điều Răn', 'Thiên Chúa ngự giữa dân'],
    purpose: 'Mặc khải Danh Thánh Thiên Chúa và chứng minh Ngài luôn trung thành với giao ước, đứng về phía kẻ bị áp bức.',
    structure: [
      { section: 'Giải thoát khỏi Ai Cập', chapters: '1-18', description: 'Môsê được gọi, 10 tai ương, lễ Vượt Qua, vượt Biển Đỏ' },
      { section: 'Giao ước Sinai & Lề Luật', chapters: '19-24', description: 'Tuyên bố Thập Điều và phụng tự giao ước' },
      { section: 'Nhà Tạm & Phụng tự', chapters: '25-40', description: 'Chỉ thị xây Nhà Tạm và vinh quang Gia-vê hiện diện' }
    ],
    keyFigures: ['Môsê', 'Aharon', 'Miryam', 'Pharaô'],
    keyVerses: [
      { reference: 'Xh 3,14', text: 'Thiên Chúa phán với ông Môsê: TA LÀ ĐẤNG TA LÀ.' },
      { reference: 'Xh 12,13', text: 'Khi thấy máu, Ta sẽ vượt qua.' },
      { reference: 'Xh 20,2', text: 'Ta là Đức Chúa, Thiên Chúa của ngươi, Đấng đã đưa ngươi ra khỏi đất Ai Cập.' }
    ],
    theologicalSignificance: 'Hình ảnh báo trước cuộc Vượt Qua tối hậu của Đức Giêsu Kitô: giải phóng khỏi nô lệ tội lỗi bằng chính Máu Con Chiên Vượt Qua.'
  },
  {
    id: 'lev',
    code: 'LV',
    name: 'Lêvi',
    latinName: 'Leviticus',
    abbreviation: 'Lv',
    testament: 'OLD',
    category: 'PENTATEUCH',
    categoryName: 'Ngũ Thư',
    chaptersCount: 27,
    order: 3,
    overview: 'Cuốn sách về sự thánh thiện, các nghi lễ hiến tế, trách nhiệm tư tế và Luật Thánh Thiện.',
    authorTradition: 'Nguồn Tư tế (P) dưới truyền thống pháp luật của Môsê.',
    compositionPeriod: 'Được hệ thống hóa sâu rộng trong thời kỳ Hậu Lưu đày.',
    historicalContext: 'Thời kỳ dân Israel cắm trại dưới chân núi Sinai chuẩn bị sống như dân thánh.',
    mainThemes: ['Sự thánh thiện của Thiên Chúa', 'Hy tế đền tội', 'Thanh sạch và ô uế', 'Ngày Xá Tội (Yom Kippur)'],
    purpose: 'Dạy dân Chúa cách thức bước vào tương quan phụng tự với Đấng Cực Thánh.',
    structure: [
      { section: 'Luật về các lễ tế', chapters: '1-7', description: 'Lễ toàn thiêu, lễ phẩm, lễ kỳ an, lễ tạ tội' },
      { section: 'Thiết lập hàng tư tế', chapters: '8-10', description: 'Tấn phong Aharon và các con' },
      { section: 'Luật thanh sạch & Ngày Xá Tội', chapters: '11-16', description: 'Sự thanh sạch và nghi thức Yom Kippur' },
      { section: 'Luật Thánh Thiện', chapters: '17-27', description: 'Hãy sống thánh thiện vì Ta là Đấng Thánh' }
    ],
    keyFigures: ['Môsê', 'Aharon', 'Nadáp', 'Aviu'],
    keyVerses: [
      { reference: 'Lv 19,2', text: 'Hãy sống thánh thiện, vì Ta, Đức Chúa, Thiên Chúa của các ngươi, Ta là Đấng Thánh.' },
      { reference: 'Lv 19,18', text: 'Ngươi phải yêu đồng loại như chính mình. Ta là Đức Chúa.' }
    ],
    theologicalSignificance: 'Nền tảng thần học về hy tế và chức tư tế, được hoàn tất viên mãn nơi Hy tế Thập giá và chức Thượng tế đời đời của Đức Kitô.'
  },
  {
    id: 'num',
    code: 'NM',
    name: 'Dân Số',
    latinName: 'Numeri',
    abbreviation: 'Ds',
    testament: 'OLD',
    category: 'PENTATEUCH',
    categoryName: 'Ngũ Thư',
    chaptersCount: 36,
    order: 4,
    overview: 'Hành trình 40 năm trong sa mạc từ Sinai đến bờ sông Giođan, với các cuộc kiểm tra dân số và những thử thách đức tin.',
    authorTradition: 'Truyền thống Môsê phối hợp các nguồn P và ký ức lịch sử.',
    compositionPeriod: 'Biên soạn từ các nguồn cổ, định hình thế kỷ VI TCN.',
    historicalContext: 'Cuộc thanh luyện 40 năm lang thang sa mạc Sinai và miền Môáp.',
    mainThemes: ['Sự trung tín của Thiên Chúa', 'Kỷ luật sa mạc', 'Con rắn đồng'],
    purpose: 'Nhắc nhở thế hệ mới về hậu quả của sự phản loạn và quyền năng gìn giữ của Thiên Chúa.',
    structure: [
      { section: 'Chuẩn bị rời Sinai', chapters: '1-10', description: 'Kiểm tra dân số và trật tự hành quân' },
      { section: 'Từ Sinai đến Káđê', chapters: '11-20', description: 'Dân kêu trách, do thám Đất Hứa' },
      { section: 'Đến đồng bằng Môáp', chapters: '21-36', description: 'Con rắn đồng, tiên tri Balaam' }
    ],
    keyFigures: ['Môsê', 'Aharon', 'Giosuê', 'Calép', 'Balaam'],
    keyVerses: [
      { reference: 'Ds 6,24-26', text: 'Nguyện Đức Chúa chúc lành và gìn giữ anh em!' },
      { reference: 'Ds 21,9', text: 'Hễ ai bị rắn cắn mà nhìn lên con rắn đồng thì được sống.' }
    ],
    theologicalSignificance: 'Con rắn đồng giương cao trong sa mạc là hình bóng tiên báo Đức Kitô bị treo trên Thập giá (Ga 3,14-15).'
  },
  {
    id: 'deut',
    code: 'DT',
    name: 'Đệ Nhị Luật',
    latinName: 'Deuteronomium',
    abbreviation: 'Đnl',
    testament: 'OLD',
    category: 'PENTATEUCH',
    categoryName: 'Ngũ Thư',
    chaptersCount: 34,
    order: 5,
    overview: 'Các bài diễn từ cáo biệt của Môsê tại đồng bằng Môáp, tái khẳng định Giao ước trước khi dân tiến vào Đất Hứa.',
    authorTradition: 'Nguồn Đệ Nhị Luật (D), gắn liền cuộc cải cách của vua Giosia (622 TCN).',
    compositionPeriod: 'Thế kỷ VII-VI TCN.',
    historicalContext: 'Dân Israel đứng bên bờ sông Giođan chuẩn bị vượt sông.',
    mainThemes: ['Shema Israel (Đức Chúa duy nhất)', 'Tình yêu và sự vâng phục', 'Lựa chọn sự sống'],
    purpose: 'Kêu gọi dân Chúa yêu mến Thiên Chúa hết lòng, hết linh hồn và hết sức lực.',
    structure: [
      { section: 'Ôn lại lịch sử', chapters: '1-4', description: 'Chúa đã dẫn dắt dân vượt sa mạc' },
      { section: 'Cốt lõi Giao ước', chapters: '5-26', description: 'Shema, Thập Điều và các huấn lệnh' },
      { section: 'Chúc phúc & Nguyền rủa', chapters: '27-30', description: 'Chọn sự sống hay sự chết' },
      { section: 'Cuối đời Môsê', chapters: '31-34', description: 'Chỉ định Giosuê và cái chết của Môsê' }
    ],
    keyFigures: ['Môsê', 'Giosuê'],
    keyVerses: [
      { reference: 'Đnl 6,4-5', text: 'Nghe đây, hỡi Israel! Đức Chúa, Thiên Chúa chúng ta, là Đức Chúa duy nhất.' },
      { reference: 'Đnl 30,19', text: 'Hãy chọn sự sống để anh em và dòng giống anh em được sống.' }
    ],
    theologicalSignificance: 'Kinh Shema được Chúa Giêsu trích dẫn như giới răn thứ nhất và trọng nhất.'
  },

  // --------------------------------------------------------------------------
  // CỰU ƯỚC: II. KHỐI LỊCH SỬ (HISTORICAL - 16 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'josh',
    code: 'JS',
    name: 'Giôsuê',
    latinName: 'Iosue',
    abbreviation: 'Gs',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 24,
    order: 6,
    overview: 'Cuộc chinh phục và phân chia Đất Hứa Canaan dưới sự lãnh đạo kiên cường của Giosuê.',
    authorTradition: 'Trường phái sử ký Đệ Nhị Luật.',
    compositionPeriod: 'Thế kỷ VI TCN.',
    historicalContext: 'Israel tiến vào định cư tại Canaan khoảng thế kỷ XII TCN.',
    mainThemes: ['Thiên Chúa trung thành ban Đất Hứa', 'Đức tin chiến thắng', 'Tái cam kết Sikhem'],
    purpose: 'Chứng minh lời hứa với các Tổ phụ đã được thực hiện trọn vẹn.',
    structure: [
      { section: 'Tiến vào Đất Hứa', chapters: '1-5', description: 'Vượt sông Giođan' },
      { section: 'Chiếm đóng lãnh thổ', chapters: '6-12', description: 'Chiến dịch quân sự' },
      { section: 'Phân chia đất đai', chapters: '13-24', description: 'Chia cho 12 chi tộc' }
    ],
    keyFigures: ['Giosuê', 'Kakháp', 'Calép'],
    keyVerses: [
      { reference: 'Gs 1,9', text: 'Hãy mạnh bạo và can trường lên! Đừng sợ hãi, vì Đức Chúa sẽ ở với ngươi.' },
      { reference: 'Gs 24,15', text: 'Về phần tôi và gia đình tôi, chúng tôi sẽ phụng sự Đức Chúa.' }
    ],
    theologicalSignificance: 'Giosuê (cùng tên nguồn cội Yeshua) là hình bóng dẫn đưa dân vào Đất Hứa đích thực.'
  },
  {
    id: 'judg',
    code: 'JG',
    name: 'Thẩm Phán',
    latinName: 'Iudices',
    abbreviation: 'Tp',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 21,
    order: 7,
    overview: 'Thời kỳ chuyển tiếp hỗn loạn với vòng lặp: Tội lỗi - Bị áp bức - Kêu cầu - Được cứu.',
    authorTradition: 'Sử liệu Đệ Nhị Luật.',
    compositionPeriod: 'Thời Lưu đày.',
    historicalContext: 'Các chi tộc sống phân tán, bị đe dọa (1200 - 1020 TCN).',
    mainThemes: ['Vòng luẩn quẩn bất trung', 'Lòng thương xót giải cứu'],
    purpose: 'Làm nổi bật lòng nhân từ vô biên của Thiên Chúa khi dân hoán cải.',
    structure: [
      { section: 'Mở đầu thần học', chapters: '1-3', description: 'Vòng lặp phản trắc' },
      { section: 'Các vị Thẩm phán', chapters: '3-16', description: 'Đêvôra, Ghít-ôn, Sam-sôn' },
      { section: 'Tình trạng suy đồi', chapters: '17-21', description: 'Hỗn loạn vô chính phủ' }
    ],
    keyFigures: ['Đêvôra', 'Ghít-ôn', 'Sam-sôn'],
    keyVerses: [
      { reference: 'Tp 2,18', text: 'Đức Chúa ở với vị thủ lãnh đó và giải thoát họ.' }
    ],
    theologicalSignificance: 'Chỉ ra sự bế tắc của con người và nhu cầu về Đấng Cứu Độ duy nhất.'
  },
  {
    id: 'ruth',
    code: 'RT',
    name: 'Rút',
    latinName: 'Ruth',
    abbreviation: 'R',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 4,
    order: 8,
    overview: 'Câu chuyện cảm động về lòng hiếu thảo của người phụ nữ ngoại giáo Rút, trở thành cụ tổ vua Đavít.',
    authorTradition: 'Tác giả Do Thái thời Hậu Lưu đày.',
    compositionPeriod: 'Thế kỷ V TCN.',
    historicalContext: 'Thời các Thẩm phán tại Bêlem xứ Giuđa.',
    mainThemes: ['Lòng nhân nghĩa (Hesed)', 'Quyền chuộc sản nghiệp', 'Tình yêu phổ quát'],
    purpose: 'Mở rộng ơn cứu độ cho người ngoại bang và giải thích cội nguồn Đavít.',
    structure: [
      { section: 'Lưu lạc và trở về', chapters: '1', description: 'Naomi và Rút về Bêlem' },
      { section: 'Mót lúa & Bô-át', chapters: '2-3', description: 'Gặp gỡ định mệnh' },
      { section: 'Hôn nhân & Gia phả', chapters: '4', description: 'Sinh Ô-vết, ông nội vua Đavít' }
    ],
    keyFigures: ['Rút', 'Naomi', 'Bô-át'],
    keyVerses: [
      { reference: 'R 1,16', text: 'Dân của bà là dân của con, Thiên Chúa của bà là Thiên Chúa của con.' }
    ],
    theologicalSignificance: 'Rút được ghi danh trong gia phả Chúa Giêsu (Mt 1,5), minh chứng ơn cứu độ phổ quát.'
  },
  {
    id: '1sam',
    code: '1S',
    name: '1 Samuen',
    latinName: '1 Samuelis',
    abbreviation: '1Sm',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 31,
    order: 9,
    overview: 'Thiết lập chế độ vương quyền tại Israel qua ba nhân vật: Samuen, vua Saun và Đavít lúc trẻ.',
    authorTradition: 'Sử gia Đệ Nhị Luật.',
    compositionPeriod: 'Thế kỷ VI TCN.',
    historicalContext: 'Khoảng 1050 - 1010 TCN trước sự đe dọa của người Phi-li-tinh.',
    mainThemes: ['Vương quyền Thiên Chúa', 'Hậu quả bất tuân', 'Đavít người Chúa chọn'],
    purpose: 'Trình bày cách Thiên Chúa chọn Đavít từ chốn khiêm hạ.',
    structure: [
      { section: 'Chức vụ Samuen', chapters: '1-7', description: 'Tiếng Chúa gọi Samuen' },
      { section: 'Vương triều Saun', chapters: '8-15', description: 'Saun bị phế truất' },
      { section: 'Đavít trỗi dậy', chapters: '16-31', description: 'Hạ Gôliát, Saun tử trận' }
    ],
    keyFigures: ['Samuen', 'Anna', 'Saun', 'Đavít', 'Gôliát'],
    keyVerses: [
      { reference: '1Sm 16,7', text: 'Người phàm chỉ thấy điều mắt thấy, còn Đức Chúa nhìn thấy tận đáy lòng.' }
    ],
    theologicalSignificance: 'Hình thành khái niệm Đấng được xức dầu (Messiah) tiền báo Chúa Kitô.'
  },
  {
    id: '2sam',
    code: '2S',
    name: '2 Samuen',
    latinName: '2 Samuelis',
    abbreviation: '2Sm',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 24,
    order: 10,
    overview: 'Toàn bộ vương triều Đavít: thống nhất đất nước, chọn Giêrusalem và Giao ước Đavít (2Sm 7).',
    authorTradition: 'Ký sự triều đình cổ kết hợp Đệ Nhị Luật.',
    compositionPeriod: 'Thế kỷ VI TCN.',
    historicalContext: 'Giai đoạn vàng son của Israel (khoảng 1010 - 970 TCN).',
    mainThemes: ['Giao ước vĩnh cửu với Đavít', 'Sám hối và tha thứ', 'Thành thánh Giêrusalem'],
    purpose: 'Mặc khải lời hứa ngai vàng muôn đời cho dòng dõi Đavít.',
    structure: [
      { section: 'Vinh quang của Đavít', chapters: '1-10', description: 'Giao ước 2Sm 7' },
      { section: 'Tội lỗi & Bi kịch', chapters: '11-20', description: 'Vụ Bát-sê-va, Áp-sa-lôm' },
      { section: 'Phụ lục kết thúc', chapters: '21-24', description: 'Bài ca tạ ơn' }
    ],
    keyFigures: ['Đavít', 'Nathan', 'Bát-sê-va'],
    keyVerses: [
      { reference: '2Sm 7,16', text: 'Nhà của ngươi và vương quyền của ngươi sẽ vững bền mãi mãi.' }
    ],
    theologicalSignificance: 'Sấm ngôn Nathan (2Sm 7) là nền tảng niềm hy vọng Đấng Mêsia trong Tân Ước.'
  },
  {
    id: '1kgs',
    code: '1K',
    name: '1 Vua',
    latinName: '1 Regum',
    abbreviation: '1V',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 22,
    order: 11,
    overview: 'Vương triều Salômôn, việc xây cất Đền Thờ Giêrusalem, cuộc chia cắt vương quốc và sứ vụ tiên tri Êlia.',
    authorTradition: 'Sử liệu Đệ Nhị Luật.',
    compositionPeriod: 'Thế kỷ VI TCN.',
    historicalContext: 'Từ thời Salômôn (970 TCN) đến thời chia đôi vương quốc Bắc - Nam (931 TCN).',
    mainThemes: ['Sự khôn ngoan của Salômôn', 'Đền Thờ Chúa ngự', 'Phân chia vương quốc', 'Ngôn sứ Êlia'],
    purpose: 'Cảnh báo về tội thờ ngẫu tượng dẫn đến chia rẽ dân tộc.',
    structure: [
      { section: 'Vương triều Salômôn', chapters: '1-11', description: 'Xây Đền Thờ' },
      { section: 'Vương quốc phân chia', chapters: '12-16', description: 'Gia-ráp-am và Rô-vác-am' },
      { section: 'Ngôn sứ Êlia', chapters: '17-22', description: 'Thách thức trên núi Cát-minh' }
    ],
    keyFigures: ['Salômôn', 'Gia-ráp-am', 'Êlia', 'Akháp', 'Idêven'],
    keyVerses: [
      { reference: '1V 8,27', text: 'Trời cao thăm thẳm còn không chứa nổi Ngài, phương chi ngôi nhà con xây!' }
    ],
    theologicalSignificance: 'Cuộc chiến bảo vệ độc thần giáo trước thần Ba-an; Êlia là hình bóng Gioan Tẩy Giả.'
  },
  {
    id: '2kgs',
    code: '2K',
    name: '2 Vua',
    latinName: '2 Regum',
    abbreviation: '2V',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 25,
    order: 12,
    overview: 'Lịch sử suy tàn của hai vương quốc: Samari sụp đổ năm 722 TCN và Giêrusalem thất thủ lưu đày Babylon năm 587 TCN.',
    authorTradition: 'Sử liệu Đệ Nhị Luật.',
    compositionPeriod: 'Thời Lưu đày Babylon.',
    historicalContext: 'Các đế quốc Átsua và Babylon bành trướng xâm lược.',
    mainThemes: ['Ngôn sứ Êlisa kế vị', 'Cải cách vua Khít-ki-gia và Giosia', 'Sự sụp đổ vì tội lỗi'],
    purpose: 'Giải thích biến cố lưu đày như một cuộc thanh luyện thiêng liêng.',
    structure: [
      { section: 'Sứ vụ Êlisa', chapters: '1-13', description: 'Chữa tướng Naaman' },
      { section: 'Vương quốc phía Bắc sụp đổ', chapters: '14-17', description: 'Năm 722 TCN bị Átsua tiêu diệt' },
      { section: 'Giuđa & Biến cố Lưu đày', chapters: '18-25', description: 'Năm 587 TCN Đền Thờ bị thiêu rụi' }
    ],
    keyFigures: ['Êlisa', 'Khít-ki-gia', 'Giosia', 'Nô-bu-cát-nê-xa'],
    keyVerses: [
      { reference: '2V 17,13', text: 'Đức Chúa đã dùng mọi ngôn sứ cảnh cáo: Hãy từ bỏ các con đường gian ác!' }
    ],
    theologicalSignificance: 'Thiên Chúa điều khiển dòng lịch sử thế giới; sự trung tín với Giao ước quyết định số phận dân tộc.'
  },
  {
    id: '1chr',
    code: '1CH',
    name: '1 Sử Biên',
    latinName: '1 Paralipomenon',
    abbreviation: '1Sb',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 29,
    order: 13,
    overview: 'Gia phả từ Ađam đến Hậu Lưu đày và chân dung thánh thiện của vua Đavít dưới lăng kính phụng tự.',
    authorTradition: 'Sử gia Biên niên (Thầy Lêvi).',
    compositionPeriod: 'Thế kỷ IV TCN.',
    historicalContext: 'Cộng đồng Do Thái tái thiết sau lưu đày Babylon.',
    mainThemes: ['Gia phả thánh', 'Đavít nhà tổ chức phụng vụ', 'Hòm Bia Giao Ước'],
    purpose: 'Khẳng định tính liên tục của dân Chúa và vị trí trung tâm của phụng vụ Đền Thờ.',
    structure: [
      { section: 'Các gia phả thánh', chapters: '1-9', description: 'Từ Ađam đến 12 chi tộc' },
      { section: 'Vương triều Đavít & Phụng tự', chapters: '10-29', description: 'Tổ chức các ca đoàn Lêvi' }
    ],
    keyFigures: ['Ađam', 'Đavít', 'A-sáp'],
    keyVerses: [
      { reference: '1Sb 16,34', text: 'Hãy tạ ơn Đức Chúa vì Người nhân hậu, muôn ngàn đời Chúa vẫn trọn tình thương!' }
    ],
    theologicalSignificance: 'Phụng vụ ca ngợi Thiên Chúa là mục đích cao quý nhất của đời sống cộng đoàn tín hữu.'
  },
  {
    id: '2chr',
    code: '2CH',
    name: '2 Sử Biên',
    latinName: '2 Paralipomenon',
    abbreviation: '2Sb',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 36,
    order: 14,
    overview: 'Lịch sử vương quốc Giuđa từ thời Salômôn xây Đền Thờ đến sắc chỉ giải phóng của vua Kyrô Ba Tư.',
    authorTradition: 'Sử gia Biên niên.',
    compositionPeriod: 'Thế kỷ IV TCN.',
    historicalContext: 'Thời Hậu Lưu đày dưới đế chế Ba Tư.',
    mainThemes: ['Đền Thờ nơi Chúa ngự', 'Lòng đạo đức đem lại phúc lành', 'Sắc chỉ giải phóng của Kyrô'],
    purpose: 'Khích lệ dân Chúa xây dựng lại Đền Thờ và trung tín phụng thờ Gia-vê.',
    structure: [
      { section: 'Salômôn & Đền Thờ', chapters: '1-9', description: 'Cung hiến Đền Thờ' },
      { section: 'Các vua Giuđa', chapters: '10-36,21', description: 'Các cuộc phục hưng phụng tự' },
      { section: 'Sắc chỉ Kyrô', chapters: '36,22-23', description: 'Hồi hương tái thiết' }
    ],
    keyFigures: ['Salômôn', 'Giosaphát', 'Êdêkia', 'Kyrô'],
    keyVerses: [
      { reference: '2Sb 7,14', text: 'Nếu dân Ta biết hạ mình cầu nguyện và từ bỏ nẻo đường xấu xa, Ta sẽ tha thứ tội lỗi họ.' }
    ],
    theologicalSignificance: 'Sắc chỉ Kyrô khép lại cuốn sách mở ra niềm hy vọng phục sinh của dân tộc.'
  },
  {
    id: 'ezra',
    code: 'EZ',
    name: 'Étdra',
    latinName: 'Esdras',
    abbreviation: 'Ed',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 10,
    order: 15,
    overview: 'Công cuộc hồi hương từ Babylon, xây lại Đền Thờ thứ hai và cuộc cải cách tôn giáo của tư tế Étdra.',
    authorTradition: 'Tư tế và kinh sư Étdra.',
    compositionPeriod: 'Khoảng 400 TCN.',
    historicalContext: 'Đế quốc Ba Tư thời Đariô và Át-ta-sát-ta.',
    mainThemes: ['Hồi hương', 'Tái thiết Đền Thờ', 'Thanh tẩy Lề Luật'],
    purpose: 'Củng cố căn tính Do Thái giáo đặt trên nền tảng Lề Luật Thiên Chúa.',
    structure: [
      { section: 'Đợt hồi hương I & Xây Đền Thờ', chapters: '1-6', description: 'Dưới sự lãnh đạo của Dô-rô-ba-ven' },
      { section: 'Étdra hồi hương & Canh tân', chapters: '7-10', description: 'Giảng dạy Luật Môsê' }
    ],
    keyFigures: ['Étdra', 'Dô-rô-ba-ven', 'Kyrô'],
    keyVerses: [
      { reference: 'Ed 7,10', text: 'Ông Étdra đã hết lòng nghiên cứu Luật Chúa, đem ra thực hành và giảng dạy.' }
    ],
    theologicalSignificance: 'Khởi đầu vai trò trung tâm của Lời Chúa và việc học hỏi Kinh Thánh trong đời sống cộng đoàn.'
  },
  {
    id: 'neh',
    code: 'NE',
    name: 'Nơkhemia',
    latinName: 'Nehemias',
    abbreviation: 'Nh',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 13,
    order: 16,
    overview: 'Cuộc tái thiết tường thành Giêrusalem trong 52 ngày và sự phục hưng đời sống giao ước.',
    authorTradition: 'Hồi ký của quan tổng đốc Nơkhemia.',
    compositionPeriod: 'Cuối thế kỷ V TCN.',
    historicalContext: 'Giêrusalem nghèo nàn bị các dân tộc lân cận quấy phá.',
    mainThemes: ['Tái thiết thành lũy', 'Can đảm lãnh đạo', 'Niềm vui của Chúa là sức mạnh'],
    purpose: 'Ghi lại bài học về sự kết hợp giữa lời cầu nguyện liên lỉ và hành động kiên quyết.',
    structure: [
      { section: 'Xây lại tường thành', chapters: '1-7', description: 'Vừa làm vừa cầm vũ khí' },
      { section: 'Đọc Sách Luật & Tái lập Giao ước', chapters: '8-10', description: 'Đại lễ Lều' },
      { section: 'Cải cách xã hội & Phụng tự', chapters: '11-13', description: 'Thực thi công bằng' }
    ],
    keyFigures: ['Nơkhemia', 'Étdra', 'San-van-lát'],
    keyVerses: [
      { reference: 'Nh 8,10', text: 'Đừng buồn sầu, vì niềm vui của Đức Chúa là thành trì bảo vệ anh em!' }
    ],
    theologicalSignificance: 'Mẫu gương người giáo dân lãnh đạo dấn thân phục vụ cộng đoàn trong đức tin.'
  },
  {
    id: 'tob',
    code: 'TB',
    name: 'Tôbia',
    latinName: 'Tobit',
    abbreviation: 'Tb',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 14,
    order: 17,
    overview: 'Lòng nhân đức, việc chôn cất kẻ chết, bố thí và sự phù hộ của Tổng Lãnh Thiên Thần Raphael.',
    authorTradition: 'Tác giả Do Thái sùng đạo thời Hậu Lưu đày.',
    compositionPeriod: 'Khoảng 200 TCN.',
    historicalContext: 'Cảnh lưu đày tại Ninivê (Átsua).',
    mainThemes: ['Sự quan phòng của Chúa', 'Hôn nhân thánh thiện', 'Thiên thần Raphael', 'Bố thí'],
    purpose: 'Khích lệ người tín hữu giữ vững lòng nhân đức giữa cảnh ngộ khó khăn.',
    structure: [
      { section: 'Gian truân Tôbia cha & Sara', chapters: '1-3', description: 'Thử thách đức tin' },
      { section: 'Hành trình cùng Raphael', chapters: '4-9', description: 'Bắt cá, cưới Sara' },
      { section: 'Chữa lành & Tạ ơn', chapters: '10-14', description: 'Raphael lộ diện' }
    ],
    keyFigures: ['Tôbia cha', 'Tôbia con', 'Sara', 'Thiên thần Raphael'],
    keyVerses: [
      { reference: 'Tb 4,7', text: 'Đừng ngoảnh mặt làm ngơ trước kẻ nghèo, thì Chúa chẳng ngoảnh mặt trước con.' },
      { reference: 'Tb 12,15', text: 'Tôi là Raphael, một trong bảy thiên sứ luôn hầu cận trước nhan Chúa.' }
    ],
    theologicalSignificance: 'Sách Đệ Nhị Quy Điển Công giáo về thần học các Thiên Thần và linh đạo gia đình.'
  },
  {
    id: 'jdt',
    code: 'JDT',
    name: 'Giuđitha',
    latinName: 'Iudith',
    abbreviation: 'Gđt',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 16,
    order: 18,
    overview: 'Bà góa thánh thiện Giuđitha dùng đức tin và lòng can đảm cứu thoát dân tộc khỏi tướng giặc Hôlôphécnê.',
    authorTradition: 'Tác giả Do Thái thời Macabê.',
    compositionPeriod: 'Thế kỷ II TCN.',
    historicalContext: 'Thành Bêthulia bị vây hãm ngặt nghèo.',
    mainThemes: ['Đức tin chiến thắng sức mạnh quân sự', 'Lời cầu nguyện của kẻ hèn mọn'],
    purpose: 'Khẳng định Thiên Chúa dùng khí cụ yếu hèn để bẻ gãy quyền lực kiêu ngạo.',
    structure: [
      { section: 'Nguy cơ diệt vong', chapters: '1-7', description: 'Hôlôphécnê vây hãm' },
      { section: 'Giuđitha hành động', chapters: '8-13', description: 'Tiến vào trại giặc' },
      { section: 'Chiến thắng & Tán tụng', chapters: '14-16', description: 'Bài ca khải hoàn' }
    ],
    keyFigures: ['Giuđitha', 'Hôlôphécnê'],
    keyVerses: [
      { reference: 'Gđt 13,18', text: 'Con được Thiên Chúa ban phúc lành nhiều hơn mọi phụ nữ trên trần gian!' }
    ],
    theologicalSignificance: 'Phụng vụ Công giáo áp dụng hình ảnh Giuđitha cho Đức Mẹ chiến thắng ma quỷ.'
  },
  {
    id: 'esth',
    code: 'ES',
    name: 'Étte',
    latinName: 'Esther',
    abbreviation: 'Et',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 10,
    order: 19,
    overview: 'Hoàng hậu Étte liều mạng cứu dân Do Thái thoát khỏi âm mưu diệt chủng của Haman, cội rễ Lễ Purim.',
    authorTradition: 'Tác giả Do Thái tại hải ngoại Ba Tư.',
    compositionPeriod: 'Thế kỷ II TCN (bản Công giáo có đầy đủ các đoạn Hy Lạp giàu đức tin).',
    historicalContext: 'Kinh thành Susa thời vua Ahasuerus (Xerxes I).',
    mainThemes: ['Sự quan phòng âm thầm', 'Lòng yêu nước can đảm', 'Nguồn gốc lễ Purim'],
    purpose: 'Ghi nhớ ơn cứu thoát kỳ diệu của Thiên Chúa cho dân bị áp bức.',
    structure: [
      { section: 'Âm mưu của Haman', chapters: '1-3', description: 'Lệnh tàn sát người Do Thái' },
      { section: 'Étte can thiệp', chapters: '4-8', description: 'Ăn chay cầu nguyện' },
      { section: 'Giải thoát & Lễ Purim', chapters: '9-10', description: 'Chiến thắng vinh quang' }
    ],
    keyFigures: ['Étte', 'Moóc-đô-khai', 'Haman'],
    keyVerses: [
      { reference: 'Et 4,14', text: 'Biết đâu chính vì một thời điểm như thế này mà bà đã được lên làm hoàng hậu?' }
    ],
    theologicalSignificance: 'Bản văn Công giáo lưu giữ các lời cầu nguyện xúc động của Étte và Moóc-đô-khai.'
  },
  {
    id: '1macc',
    code: '1MC',
    name: '1 Macabê',
    latinName: '1 Maccabaeorum',
    abbreviation: '1Mcb',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 16,
    order: 20,
    overview: 'Ký sự lịch sử hào hùng về cuộc kháng chiến của anh em Macabê chống bạo chúa Antiochus IV bảo vệ đức tin.',
    authorTradition: 'Sử gia Do Thái trung kiên tại Giêrusalem.',
    compositionPeriod: 'Khoảng 100 TCN.',
    historicalContext: 'Cuộc bách hại khốc liệt của vương triều Hy Lạp Seleucid.',
    mainThemes: ['Tử đạo vì Lề Luật', 'Thanh tẩy Đền Thờ (Hanukkah)', 'Đức tin kiên cường'],
    purpose: 'Lưu truyền chiến công của các anh hùng đức tin.',
    structure: [
      { section: 'Bách hại bùng nổ', chapters: '1-2', description: 'Matátgia dấy binh' },
      { section: 'Giuđa Macabê', chapters: '3-9', description: 'Thanh tẩy Đền Thờ' },
      { section: 'Gionathan & Simôn', chapters: '10-16', description: 'Củng cố độc lập' }
    ],
    keyFigures: ['Matátgia', 'Giuđa Macabê', 'Antiochus IV'],
    keyVerses: [
      { reference: '1Mcb 2,21', text: 'Không đời nào chúng tôi lìa bỏ Lề Luật của cha ông!' }
    ],
    theologicalSignificance: 'Nguồn gốc Lễ Cung Hiến Bàn Thờ mà chính Chúa Giêsu đã tham dự (Ga 10,22).'
  },
  {
    id: '2macc',
    code: '2MC',
    name: '2 Macabê',
    latinName: '2 Maccabaeorum',
    abbreviation: '2Mcb',
    testament: 'OLD',
    category: 'HISTORICAL',
    categoryName: 'Lịch Sử',
    chaptersCount: 15,
    order: 21,
    overview: 'Tác phẩm thần học sâu sắc về kẻ chết sống lại, sáng tạo từ hư vô và việc cầu nguyện cho người đã qua đời.',
    authorTradition: 'Nhà thần học Do Thái ngữ tộc Hy Lạp.',
    compositionPeriod: 'Khoảng 124 TCN.',
    historicalContext: 'Cuộc bách hại thời Macabê với các gương tử đạo kiên cường.',
    mainThemes: ['Kẻ chết sống lại', 'Cầu nguyện cho người đã chết', 'Các vị tử đạo'],
    purpose: 'Soi sáng ý nghĩa thiêng liêng đằng sau máu các vị tử đạo.',
    structure: [
      { section: 'Biến cố Đền Thờ', chapters: '1-5', description: 'Phép lạ bảo vệ của Chúa' },
      { section: 'Các anh hùng tử đạo', chapters: '6-7', description: 'Elêada và 7 anh em' },
      { section: 'Chiến thắng của Giuđa', chapters: '8-15', description: 'Cầu nguyện cho tử sĩ' }
    ],
    keyFigures: ['Elêada', 'Người mẹ và 7 người con', 'Giuđa Macabê'],
    keyVerses: [
      { reference: '2Mcb 7,9', text: 'Vua cõi trời sẽ cho chúng tôi được sống lại để hưởng sự sống đời đời.' },
      { reference: '2Mcb 12,46', text: 'Đó là ý nghĩ đạo đức: cầu nguyện cho người chết để họ được tha tội.' }
    ],
    theologicalSignificance: 'Cơ sở Kinh Thánh của Hội Thánh Công giáo về Luyện Ngục và cầu nguyện cho các linh hồn.'
  },

  // --------------------------------------------------------------------------
  // CỰU ƯỚC: III. KHỐI KHÔN NGOAN & GIÁO HUẤN (WISDOM - 7 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'job',
    code: 'JB',
    name: 'Gióp',
    latinName: 'Iob',
    abbreviation: 'G',
    testament: 'OLD',
    category: 'WISDOM',
    categoryName: 'Khôn Ngoan & Giáo Huấn',
    chaptersCount: 42,
    order: 22,
    overview: 'Kiệt tác văn chương tôn giáo bàn về mầu nhiệm đau khổ của người công chính và sự khôn ngoan siêu việt của Chúa.',
    authorTradition: 'Một nhà tư tưởng hiền triết vô danh Do Thái.',
    compositionPeriod: 'Thế kỷ V TCN.',
    historicalContext: 'Đất Út thời cổ; tranh biện thần học về quan niệm nhân quả công đức.',
    mainThemes: ['Mầu nhiệm đau khổ', 'Đức tin kiên nhẫn', 'Sự cao cả của Thiên Chúa'],
    purpose: 'Bác bỏ quan niệm máy móc cho rằng đau khổ luôn luôn là hình phạt của tội lỗi.',
    structure: [
      { section: 'Gióp gặp thử thách', chapters: '1-2', description: 'Mất của cải, con cái, bệnh tật' },
      { section: 'Đối thoại với 3 bạn', chapters: '3-31', description: 'Tranh luận về sự công bình' },
      { section: 'Thiên Chúa phán & Phục hồi', chapters: '38-42', description: 'Thiên Chúa tỏ bày uy quyền' }
    ],
    keyFigures: ['Gióp', 'Êliphát', 'Binđát', 'Xôpha'],
    keyVerses: [
      { reference: 'G 1,21', text: 'Đức Chúa đã ban cho, Đức Chúa lại lấy đi: xin chúc tụng danh Đức Chúa!' },
      { reference: 'G 19,25', text: 'Tôi biết rằng Đấng bênh vực tôi vẫn hằng sống.' }
    ],
    theologicalSignificance: 'Chuẩn bị cho mầu nhiệm Thập Giá của Chúa Kitô, Đấng Công Chính vô tội chịu đau khổ vì nhân loại.'
  },
  {
    id: 'ps',
    code: 'PS',
    name: 'Thánh Vịnh',
    latinName: 'Psalmi',
    abbreviation: 'Tv',
    testament: 'OLD',
    category: 'WISDOM',
    categoryName: 'Khôn Ngoan & Giáo Huấn',
    chaptersCount: 150,
    order: 23,
    overview: 'Kho tàng 150 bài thánh ca cầu nguyện của Dân Chúa: ca ngợi, tạ ơn, than van, sám hối và hy vọng Mêsia.',
    authorTradition: 'Nhiều tác giả; vua Đavít là tác giả của phần lớn các bài thánh vịnh.',
    compositionPeriod: 'Được sáng tác và đúc kết qua nhiều thế kỷ từ thời Đavít (thế kỷ X TCN) đến Hậu Lưu đày.',
    historicalContext: 'Phụng tự Đền Thờ Giêrusalem và đời sống cầu nguyện cá nhân của Israel.',
    mainThemes: ['Ca tụng Đấng Tạo Hóa', 'Kêu cầu giữa cơn gian truân', 'Đấng Mêsia vương giả (Tv 2, 22, 110)'],
    purpose: 'Cung cấp cẩm nang kinh nguyện chính thức cho Phụng Vụ của Hội Thánh.',
    structure: [
      { section: 'Quyển I (Tv 1-41)', chapters: '1-41', description: 'Phần lớn là thánh vịnh Đavít' },
      { section: 'Quyển II (Tv 42-72)', chapters: '42-72', description: 'Thánh vịnh con cái Côrê & Đavít' },
      { section: 'Quyển III (Tv 73-89)', chapters: '73-89', description: 'Thánh vịnh Asáp' },
      { section: 'Quyển IV (Tv 90-106)', chapters: '90-106', description: 'Ca ngợi vương quyền Thiên Chúa' },
      { section: 'Quyển V (Tv 107-150)', chapters: '107-150', description: 'Thánh vịnh Halen và hành hương' }
    ],
    keyFigures: ['Đavít', 'Asáp', 'Con cái Côrê'],
    keyVerses: [
      { reference: 'Tv 23,1', text: 'Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì.' },
      { reference: 'Tv 51,12', text: 'Lạy Chúa Trời, xin tạo cho con một tấm lòng trong sạch.' },
      { reference: 'Tv 150,6', text: 'Tất cả hơi thở, hãy ca ngợi Đức Chúa! Al-lê-lui-a!' }
    ],
    theologicalSignificance: 'Kinh nguyện mẫu mực mà chính Chúa Giêsu và Đức Mẹ đã cầu nguyện; cốt lõi của Các Giờ Kinh Phụng Vụ Công giáo.'
  },
  {
    id: 'prov',
    code: 'PR',
    name: 'Châm Ngôn',
    latinName: 'Proverbia',
    abbreviation: 'Cn',
    testament: 'OLD',
    category: 'WISDOM',
    categoryName: 'Khôn Ngoan & Giáo Huấn',
    chaptersCount: 31,
    order: 24,
    overview: 'Tuyển tập các châm ngôn thực hành chỉ dạy nghệ thuật sống khôn ngoan, công chính và kính sợ Chúa.',
    authorTradition: 'Vua Salômôn và các hiền triết Israel.',
    compositionPeriod: 'Thế kỷ X đến V TCN.',
    historicalContext: 'Môi trường giáo dục gia đình và triều đình cổ Israel.',
    mainThemes: ['Kính sợ Chúa là đầu mối khôn ngoan', 'Công chính và gian ác', 'Người phụ nữ đảm đang (Cn 31)'],
    purpose: 'Dạy người trẻ cách thức ứng xử luân lý thánh thiện và thành đạt đẹp lòng Chúa.',
    structure: [
      { section: 'Ca ngợi Đức Khôn Ngoan', chapters: '1-9', description: 'Lời mời gọi của Khôn Ngoan' },
      { section: 'Các châm ngôn Salômôn', chapters: '10-22', description: 'Lời khuyên đạo đức' },
      { section: 'Người phụ nữ lý tưởng', chapters: '31', description: 'Bài ca người vợ đảm đang' }
    ],
    keyFigures: ['Salômôn', 'A-gua', 'Lơ-mu-ên'],
    keyVerses: [
      { reference: 'Cn 9,10', text: 'Đầu mối khôn ngoan là kính sợ Đức Chúa.' }
    ],
    theologicalSignificance: 'Đức Khôn Ngoan đồng hiện hữu với Chúa từ trước muôn đời (Cn 8) chuẩn bị cho mầu nhiệm Ngôi Lời.'
  },
  {
    id: 'eccl',
    code: 'EC',
    name: 'Giảng Viên',
    latinName: 'Ecclesiastes',
    abbreviation: 'Gv',
    testament: 'OLD',
    category: 'WISDOM',
    categoryName: 'Khôn Ngoan & Giáo Huấn',
    chaptersCount: 12,
    order: 25,
    overview: 'Suy tư hiện sinh sâu sắc về sự phù vân của trần thế và lời khuyên sống trọn vẹn từng ngày trong sự kính sợ Chúa.',
    authorTradition: 'Hiền triết Qoheleth (người giảng thảo) dưới danh nghĩa con cháu Đavít.',
    compositionPeriod: 'Khoảng thế kỷ III TCN.',
    historicalContext: 'Thời kỳ Hy Lạp hóa với nhiều khủng hoảng ý nghĩa cuộc sống.',
    mainThemes: ['Phù vân của mọi phù vân', 'Mọi sự đều có kỳ hạn', 'Kính sợ Thiên Chúa'],
    purpose: 'Thanh luyện con người khỏi ảo tưởng tìm kiếm hạnh phúc tuyệt đối nơi thụ tạo chóng qua.',
    structure: [
      { section: 'Sự hư ảo trần gian', chapters: '1-2', description: 'Khoái lạc và của cải đều phù vân' },
      { section: 'Thời gian trong tay Chúa', chapters: '3-6', description: 'Có thời để khóc, có thời để cười' },
      { section: 'Kết luận tối hậu', chapters: '11-12', description: 'Hãy nhớ Đấng Tạo Hóa thời tuổi trẻ' }
    ],
    keyFigures: ['Qoheleth (Giảng Viên)'],
    keyVerses: [
      { reference: 'Gv 3,1', text: 'Ở dưới bầu trời này, mọi sự đều có lúc, mọi việc đều có thời.' },
      { reference: 'Gv 12,13', text: 'Điều cốt yếu của mọi sự là: Hãy kính sợ Thiên Chúa và tuân giữ các điều răn Người.' }
    ],
    theologicalSignificance: 'Chỉ ra sự trống rỗng của trần gian khi không có Thiên Chúa, mở đường đón nhận ơn mặc khải sự sống đời đời.'
  },
  {
    id: 'song',
    code: 'SG',
    name: 'Diễm Ca',
    latinName: 'Canticum Canticorum',
    abbreviation: 'Dc',
    testament: 'OLD',
    category: 'WISDOM',
    categoryName: 'Khôn Ngoan & Giáo Huấn',
    chaptersCount: 8,
    order: 26,
    overview: 'Bài ca tuyệt mỹ về tình yêu đôi lứa, biểu tượng của tình yêu giao ước nồng nàn giữa Thiên Chúa và Dân Người (Đức Kitô và Hội Thánh).',
    authorTradition: 'Truyền thống Salômôn.',
    compositionPeriod: 'Thế kỷ V-IV TCN.',
    historicalContext: 'Thơ ca tình yêu hôn nhân Israel.',
    mainThemes: ['Tình yêu hôn nhân thánh thiện', 'Tình yêu mạnh hơn sự chết', 'Tìm kiếm và gặp gỡ'],
    purpose: 'Tán tụng vẻ đẹp của tình yêu trao hiến và biểu trưng tình yêu thần linh.',
    structure: [
      { section: 'Khát khao người yêu', chapters: '1-2', description: 'Tôi là hoa đồng cỏ nội' },
      { section: 'Lễ cưới & Tán tụng', chapters: '3-5', description: 'Đẹp thay người bạn tình' },
      { section: 'Tình yêu bất diệt', chapters: '6-8', description: 'Mạnh mẽ như hỏa hào' }
    ],
    keyFigures: ['Chàng thi sĩ', 'Nàng Su-lam-mít'],
    keyVerses: [
      { reference: 'Dc 8,6', text: 'Hãy đặt em như chiếc ấn trên trái tim anh... vì tình yêu mạnh mẽ như tử thần!' }
    ],
    theologicalSignificance: 'Đỉnh cao của thần học thần bí Công giáo (Thánh Gioan Thánh Giá, Thánh Têrêsa Avila): linh hồn kết hiệp với Chúa như Hiền thê với Phu quân.'
  },
  {
    id: 'wis',
    code: 'WS',
    name: 'Khôn Ngoan',
    latinName: 'Sapientia',
    abbreviation: 'Kn',
    testament: 'OLD',
    category: 'WISDOM',
    categoryName: 'Khôn Ngoan & Giáo Huấn',
    chaptersCount: 19,
    order: 27,
    overview: 'Đỉnh cao của văn chương Khôn ngoan Cựu Ước về sự bất tử của linh hồn, phần thưởng người công chính và Đức Khôn Ngoan đồng sáng tạo.',
    authorTradition: 'Người Do Thái sùng đạo tại Alêxanđria.',
    compositionPeriod: 'Khoảng 50 - 30 TCN.',
    historicalContext: 'Cộng đồng Do Thái đối diện với triết học Hy Lạp.',
    mainThemes: ['Linh hồn bất tử', 'Đức Khôn Ngoan nhân cách hóa', 'Số phận người lành kẻ ác'],
    purpose: 'Củng cố đức tin của người trẻ trước triết thuyết ngoại giáo.',
    structure: [
      { section: 'Khôn ngoan & Số phận', chapters: '1-5', description: 'Linh hồn người công chính trong tay Chúa' },
      { section: 'Bản chất Đức Khôn Ngoan', chapters: '6-9', description: 'Salômôn cầu xin khôn ngoan' },
      { section: 'Khôn ngoan trong lịch sử', chapters: '10-19', description: 'Dẫn dắt cuộc Xuất Hành' }
    ],
    keyFigures: ['Salômôn', 'Đức Khôn Ngoan'],
    keyVerses: [
      { reference: 'Kn 3,1', text: 'Linh hồn những người công chính ở trong tay Thiên Chúa, và chẳng cực hình nào chạm tới được họ.' }
    ],
    theologicalSignificance: 'Mặc khải minh nhiên nhất về sự sống đời sau trong Cựu Ước, tiên báo Ngôi Lời Nhập Thể.'
  },
  {
    id: 'sir',
    code: 'SR',
    name: 'Huấn Ca',
    latinName: 'Siracides',
    abbreviation: 'Hc',
    testament: 'OLD',
    category: 'WISDOM',
    categoryName: 'Khôn Ngoan & Giáo Huấn',
    chaptersCount: 51,
    order: 28,
    overview: 'Kho tàng luân lý, đạo hiếu, tình bạn, phụng tự và ca ngợi các bậc tiền nhân của hiền giả Giêsu con ông Sira.',
    authorTradition: 'Ông Giêsu con ông Sira (Yeshua ben Sira).',
    compositionPeriod: 'Bản gốc Hip-ri 180 TCN, bản dịch Hy Lạp 132 TCN.',
    historicalContext: 'Giêrusalem trước cuộc bách hại của Macabê.',
    mainThemes: ['Kính sợ Chúa', 'Chữ hiếu gia đình', 'Tình bạn chân thật', 'Ca ngợi tiền nhân'],
    purpose: 'Chỉ dạy nghệ thuật sống thánh thiện theo Luật Chúa.',
    structure: [
      { section: 'Các lời khuyên luân lý', chapters: '1-42', description: 'Gia đình, bạn bè, khiêm nhường' },
      { section: 'Vinh quang Chúa trong thiên nhiên', chapters: '42-43', description: 'Kỳ công tạo dựng' },
      { section: 'Ca ngợi các bậc tiền bối', chapters: '44-50', description: 'Từ Enóc đến Simôn' }
    ],
    keyFigures: ['Giêsu ben Sira', 'Thượng tế Simôn'],
    keyVerses: [
      { reference: 'Hc 3,3', text: 'Ai yêu mến cha mình thì đền bù được tội lỗi; ai tôn kính mẹ mình thì như người thu được kho tàng.' }
    ],
    theologicalSignificance: 'Sách giáo lý gối đầu giường của các Kitô hữu tiên khởi (Liber Ecclesiasticus).'
  },

  // --------------------------------------------------------------------------
  // CỰU ƯỚC: IV. KHỐI NGÔN SỨ (PROPHETS - 18 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'isa',
    code: 'IS',
    name: 'Isaia',
    latinName: 'Isaias',
    abbreviation: 'Is',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 66,
    order: 29,
    overview: 'Được mệnh danh là "Tin Mừng thứ Năm": loan báo Đấng Emmanuel sinh bởi Trinh Nữ, Người Tôi Trung Đau Khổ và Trời Mới Đất Mới.',
    authorTradition: 'Ngôn sứ Isaia con ông Amốt (Đệ Nhất Isaia 1-39) và các môn đệ thời lưu đày (Đệ Nhị 40-55, Đệ Tam 56-66).',
    compositionPeriod: 'Thế kỷ VIII đến VI TCN.',
    historicalContext: 'Biến cố xâm lược của Átsua và cuộc lưu đày Babylon.',
    mainThemes: ['Đấng Thánh của Israel', 'Sấm ngôn Emmanuel (Is 7)', 'Người Tôi Tớ Đau Khổ (Is 53)', 'Trời Mới Đất Mới'],
    purpose: 'Kêu gọi tin tưởng vào Thiên Chúa duy nhất và loan báo ơn cứu rỗi toàn cầu.',
    structure: [
      { section: 'Đệ Nhất Isaia', chapters: '1-39', description: 'Sứ vụ trước nguy cơ Átsua, Emmanuel' },
      { section: 'Đệ Nhị Isaia (Sách An Ủi)', chapters: '40-55', description: 'Bốn bài ca Người Tôi Tớ' },
      { section: 'Đệ Tam Isaia', chapters: '56-66', description: 'Hồi hương và vinh quang Giêrusalem' }
    ],
    keyFigures: ['Isaia', 'A-khát', 'Khít-ki-gia', 'Người Tôi Tớ'],
    keyVerses: [
      { reference: 'Is 7,14', text: 'Này đây người trinh nữ sẽ mang thai, sinh hạ con trai, và sẽ gọi tên con là Emmanuel.' },
      { reference: 'Is 53,5', text: 'Chính Người đã bị đâm vì chúng ta phạm tội... Nhờ vết thương của Người mà chúng ta được chữa lành.' }
    ],
    theologicalSignificance: 'Sách tiên tri được trích dẫn nhiều nhất trong Tân Ước về Mầu nhiệm Nhập Thể và Khổ Nạn của Chúa Kitô.'
  },
  {
    id: 'jer',
    code: 'JR',
    name: 'Giêrêmia',
    latinName: 'Ieremias',
    abbreviation: 'Gr',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 52,
    order: 30,
    overview: 'Ngôn sứ của nước mắt và đau khổ: cảnh báo thảm họa Babylon và loan báo Giao Ước Mới khắc ghi trong lòng.',
    authorTradition: 'Ngôn sứ Giêrêmia người làng Anathót cùng thư ký Barúc.',
    compositionPeriod: 'Cuối thế kỷ VII và đầu thế kỷ VI TCN.',
    historicalContext: 'Những năm cuối cùng bi thảm của Giêrusalem trước khi bị phá hủy năm 587 TCN.',
    mainThemes: ['Ơn gọi từ lòng mẹ', 'Thói giả hình phụng tự', 'Giao Ước Mới nội tâm (Gr 31)'],
    purpose: 'Kêu gọi dân hoán cải nội tâm đích thực và nâng đỡ niềm hy vọng tương lai.',
    structure: [
      { section: 'Sấm ngôn cảnh cáo', chapters: '1-25', description: 'Bài giảng tại cửa Đền Thờ' },
      { section: 'Sách An Ủi & Giao Ước Mới', chapters: '26-35', description: 'Giao ước khắc trong tâm hồn' },
      { section: 'Khổ nạn của Giêrêmia & Lưu đày', chapters: '36-52', description: 'Giêrusalem sụp đổ' }
    ],
    keyFigures: ['Giêrêmia', 'Barúc', 'Vua Xê-đéc-kia'],
    keyVerses: [
      { reference: 'Gr 1,5', text: 'Trước khi tạo thành ngươi trong lòng mẹ, Ta đã biết ngươi; trước khi ngươi lọt lòng mẹ, Ta đã thánh hiến ngươi.' },
      { reference: 'Gr 31,33', text: 'Ta sẽ ghi khắc Lề Luật vào lòng dạ chúng; Ta sẽ là Chúa của chúng và chúng sẽ là dân Ta.' }
    ],
    theologicalSignificance: 'Sấm ngôn Giao Ước Mới (Gr 31,31-34) được ứng nghiệm trọn vẹn trong Bữa Tiệc Ly của Chúa Giêsu.'
  },
  {
    id: 'lam',
    code: 'LM',
    name: 'Ai Ca',
    latinName: 'Lamentationes',
    abbreviation: 'Ac',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 5,
    order: 31,
    overview: 'Năm bài thơ tang lễ bi thương than khóc thành thánh Giêrusalem và Đền Thờ bị san bằng năm 587 TCN.',
    authorTradition: 'Truyền thống gán cho tiên tri Giêrêmia.',
    compositionPeriod: 'Ngay sau năm 587 TCN.',
    historicalContext: 'Cảnh tượng tan hoang đổ nát của Sion sau cuộc công phá của quân Babylon.',
    mainThemes: ['Nỗi đau khôn cùng', 'Nhận thức tội lỗi', 'Lòng thương xót vô biên của Chúa'],
    purpose: 'Bày tỏ nỗi đau thương tột cùng và hướng lòng về Chúa trong sự sám hối.',
    structure: [
      { section: 'Bốn bài thơ chữ cái luân phiên', chapters: '1-4', description: 'Mỗi câu bắt đầu bằng một chữ cái Hip-ri' },
      { section: 'Lời nguyện xin tha thứ', chapters: '5', description: 'Xin đem chúng con trở về với Ngài' }
    ],
    keyFigures: ['Thiếu nữ Sion'],
    keyVerses: [
      { reference: 'Ac 3,22-23', text: 'Tình thương của Chúa không bao giờ vơi cạn, lòng từ bi của Người mới mẻ mỗi sáng mai!' }
    ],
    theologicalSignificance: 'Được đọc trong Phụng vụ Tuần Thánh (Giờ Kinh Đêm) chiêm ngắm nỗi thống khổ của Chúa Kitô.'
  },
  {
    id: 'bar',
    code: 'BR',
    name: 'Barúc',
    latinName: 'Baruch',
    abbreviation: 'Br',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 6,
    order: 32,
    overview: 'Lời kinh thống hối ăn năn của cộng đồng lưu đày Babylon qua thư ký Barúc và sấm ngôn Khôn Ngoan xuất hiện giữa loài người.',
    authorTradition: 'Ông Barúc, thư ký của tiên tri Giêrêmia.',
    compositionPeriod: 'Thế kỷ II-I TCN.',
    historicalContext: 'Cộng đồng Do Thái lưu đày tại Babylon.',
    mainThemes: ['Thú tội tập thể', 'Đức Khôn Ngoan làm người (Br 3,38)', 'Lên án ngẫu tượng'],
    purpose: 'Dẫn đưa lòng dân trở về với Chúa để đón nhận ơn phục hưng.',
    structure: [
      { section: 'Lời tựa & Kinh sám hối', chapters: '1-3', description: 'Thú tội chân thành' },
      { section: 'Đức Khôn Ngoan hiện diện', chapters: '3-4', description: 'Đức Khôn Ngoan sống giữa loài người' },
      { section: 'Thư của Giêrêmia', chapters: '6', description: 'Vạch trần ngẫu tượng vô tri' }
    ],
    keyFigures: ['Barúc', 'Giêrêmia'],
    keyVerses: [
      { reference: 'Br 3,38', text: 'Sau đó, Đức Khôn Ngoan đã xuất hiện trên mặt đất và đã sống giữa loài người.' }
    ],
    theologicalSignificance: 'Br 3,38 là sấm ngôn tiên báo sâu sắc về mầu nhiệm Ngôi Lời Nhập Thể.'
  },
  {
    id: 'ezek',
    code: 'EK',
    name: 'Êdêkien',
    latinName: 'Ezechiel',
    abbreviation: 'Edk',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 48,
    order: 33,
    overview: 'Thị kiến kỳ vĩ về Vinh quang Thiên Chúa, trái tim bằng thịt thay cho trái tim bằng đá, cánh đồng xương khô sống lại và Đền Thờ Mới.',
    authorTradition: 'Ngôn sứ kiêm tư tế Êdêkien.',
    compositionPeriod: 'Khoảng 593 - 571 TCN tại bờ sông Kê-va (Babylon).',
    historicalContext: 'Cộng đồng lưu đày Babylon đợt đầu tiên (597 TCN).',
    mainThemes: ['Trách nhiệm cá nhân', 'Trái tim mới & Thần Khí mới', 'Xương khô hồi sinh (Edk 37)', 'Dòng nước Đền Thờ (Edk 47)'],
    purpose: 'Củng cố niềm hy vọng rằng Thiên Chúa sẽ tái tạo dân Người từ cõi chết thiêng liêng.',
    structure: [
      { section: 'Thị kiến Vinh quang & Phán xét', chapters: '1-24', description: 'Vinh quang Chúa rời Đền Thờ' },
      { section: 'Sấm ngôn nghịch dân ngoại', chapters: '25-32', description: 'Ti-rô và Ai Cập' },
      { section: 'Phục hưng & Đền Thờ Mới', chapters: '33-48', description: 'Xương khô sống lại, Đền Thờ lý tưởng' }
    ],
    keyFigures: ['Êdêkien'],
    keyVerses: [
      { reference: 'Edk 36,26', text: 'Ta sẽ ban cho các ngươi một quả tim mới, đặt một thần khí mới vào lòng các ngươi; Ta sẽ cất khỏi các ngươi quả tim bằng đá và ban tặng quả tim bằng thịt.' },
      { reference: 'Edk 37,5', text: 'Này Ta sẽ cho thần khí nhập vào các ngươi, và các ngươi sẽ được sống.' }
    ],
    theologicalSignificance: 'Thần học về ân sủng tái sinh qua Chúa Thánh Thần trong Bí tích Thánh Tẩy.'
  },
  {
    id: 'dan',
    code: 'DN',
    name: 'Đanien',
    latinName: 'Daniel',
    abbreviation: 'Đn',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 14,
    order: 34,
    overview: 'Văn chương Khải huyền: Đanien trong hang sư tử, 3 bạn trong lò lửa, thị kiến Con Người ngự đến trên mây trời và kẻ chết sống lại.',
    authorTradition: 'Tác giả Do Thái sùng đạo thời Macabê mượn bối cảnh triều đình Babylon.',
    compositionPeriod: 'Khoảng 165 TCN (bản Công giáo có đầy đủ chương 13 về Susanna và chương 14 về Bel và Con Rồng).',
    historicalContext: 'Cuộc bách hại của Antiochus IV Epiphanes.',
    mainThemes: ['Vương quyền Thiên Chúa trên mọi đế quốc', 'Con Người (Đn 7,13)', 'Kẻ chết sống lại (Đn 12,2)'],
    purpose: 'Khích lệ người tín hữu kiên trung vì Nước Thiên Chúa sẽ chiến thắng muôn đời.',
    structure: [
      { section: 'Chuyện kể cung đình', chapters: '1-6', description: 'Lò lửa, chữ viết trên tường, hang sư tử' },
      { section: 'Các thị kiến khải huyền', chapters: '7-12', description: 'Bốn con thú, Con Người, 70 tuần lễ' },
      { section: 'Phần bổ sung Hy Lạp', chapters: '13-14', description: 'Bà Susanna, Đanien hạ rồng thần' }
    ],
    keyFigures: ['Đanien', 'Sa-đơ-rác', 'Mê-sác', 'A-bết Nơ-gô', 'Susanna'],
    keyVerses: [
      { reference: 'Đn 7,13-14', text: 'Kìa trên mây trời có ai như một Con Người ngự đến... Người được trao quyền thống trị, vinh quang và vương quốc muôn đời.' },
      { reference: 'Đn 12,2', text: 'Nhiều người trong số những kẻ an nghỉ trong bụi đất sẽ trỗi dậy: người thì để hưởng sự sống đời đời.' }
    ],
    theologicalSignificance: 'Danh hiệu "Con Người" Chúa Giêsu hay dùng tự xưng xuất phát từ Đn 7; nền tảng tín lý về kẻ chết sống lại.'
  },
  {
    id: 'hos',
    code: 'HO',
    name: 'Hôsê',
    latinName: 'Osee',
    abbreviation: 'Hs',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 14,
    order: 35,
    overview: 'Cuộc hôn nhân đầy đau khổ của Hôsê với người vợ ngoại tình trở thành biểu tượng cho tình yêu trung tín của Chúa đối với Israel bất trung.',
    authorTradition: 'Ngôn sứ Hôsê tại vương quốc phía Bắc (Samari).',
    compositionPeriod: 'Thế kỷ VIII TCN (750 - 725 TCN).',
    historicalContext: 'Trước khi vương quốc Bắc sụp đổ dưới tay đế quốc Átsua năm 722 TCN.',
    mainThemes: ['Thiên Chúa là Người Chồng thủy chung', 'Lòng nhân ái hơn của lễ hiến tế', 'Sự tha thứ vô điều kiện'],
    purpose: 'Kêu gọi dân Chúa từ bỏ ngẫu tượng Ba-an để trở về với mối tình đầu giao ước.',
    structure: [
      { section: 'Hôn nhân biểu tượng của Hôsê', chapters: '1-3', description: 'Gomer ngoại tình và được chuộc lại' },
      { section: 'Tố cáo tội lỗi của Samari', chapters: '4-13', description: 'Tội bất trung và phán xét' },
      { section: 'Lời kêu gọi sám hối & Lời hứa', chapters: '14', description: 'Ta sẽ chữa lành lòng bất trung của chúng' }
    ],
    keyFigures: ['Hôsê', 'Gomer'],
    keyVerses: [
      { reference: 'Hs 6,6', text: 'Ta muốn lòng nhân chứ không cần hy lễ, thích hiểu biết Thiên Chúa hơn của lễ toàn thiêu.' },
      { reference: 'Hs 11,8', text: 'Trái tim Ta thổn thức, ruột gan Ta bồi hồi... Ta đâu nỡ tiêu diệt ngươi!' }
    ],
    theologicalSignificance: 'Chúa Giêsu hai lần trích dẫn Hs 6,6 (Mt 9,13; 12,7) để khẳng định bản chất Tin Mừng của lòng xót thương.'
  },
  {
    id: 'joel',
    code: 'JL',
    name: 'Giôen',
    latinName: 'Ioel',
    abbreviation: 'Ge',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 4,
    order: 36,
    overview: 'Nạn châu chấu tàn phá báo hiệu Ngày của Đức Chúa và sấm ngôn vĩ đại về việc Chúa tuôn đổ Thần Khí trên mọi xác phàm.',
    authorTradition: 'Ngôn sứ Giôen con ông Pơ-thu-ên.',
    compositionPeriod: 'Khoảng 400 TCN (thời Hậu Lưu đày).',
    historicalContext: 'Nạn hạn hán và châu chấu hoành hành tại Giuđa.',
    mainThemes: ['Ngày của Đức Chúa', 'Xé lòng chứ đừng xé áo', 'Tuôn đổ Thánh Thần'],
    purpose: 'Kêu gọi toàn dân ăn chay sám hối để đón nhận ơn canh tân Thần Khí.',
    structure: [
      { section: 'Nạn châu chấu & Lời kêu gọi sám hối', chapters: '1-2,17', description: 'Hãy khóc lóc kêu xin Chúa' },
      { section: 'Tuôn đổ Thần Khí & Cứu rỗi', chapters: '2,18-3', description: 'Sấm ngôn Hiện Xuống' },
      { section: 'Phán xét các dân tộc', chapters: '4', description: 'Thung lũng Giô-sa-phát' }
    ],
    keyFigures: ['Giôen'],
    keyVerses: [
      { reference: 'Ge 2,13', text: 'Hãy xé lòng chứ đừng xé áo, hãy trở về cùng Đức Chúa vì Người từ bi và nhân hậu.' },
      { reference: 'Ge 3,1', text: 'Ta sẽ tuôn đổ Thần Khí Ta trên mọi xác phàm; con trai con gái các ngươi sẽ tuyên sấm.' }
    ],
    theologicalSignificance: 'Thánh Phêrô trích dẫn Ge 3,1-5 trong ngày Lễ Hiện Xuống (Cv 2,17-21) để giải thích ơn Chúa Thánh Thần.'
  },
  {
    id: 'amos',
    code: 'AM',
    name: 'Amốt',
    latinName: 'Amos',
    abbreviation: 'Am',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 9,
    order: 37,
    overview: 'Người chăn chiên xứ Tơ-cô-a cất tiếng sấm sét lên án bất công xã hội, áp bức người nghèo và thói phụng tự hình thức.',
    authorTradition: 'Ngôn sứ Amốt, người nông dân chăn chiên và tỉa cây vả.',
    compositionPeriod: 'Khoảng 760 - 750 TCN.',
    historicalContext: 'Thời vua Gia-ráp-am II giàu có xa hoa nhưng suy đồi đạo đức nghiêm trọng.',
    mainThemes: ['Công bằng xã hội', 'Bảo vệ người nghèo', 'Ngày của Đức Chúa là ánh sáng hay bóng tối'],
    purpose: 'Cảnh cáo rằng phụng tự thiếu công bằng xã hội là sự ghê tởm trước mặt Chúa.',
    structure: [
      { section: 'Sấm ngôn nghịch các dân', chapters: '1-2', description: 'Tội ác và hình phạt' },
      { section: 'Lên án giới quý tộc Samari', chapters: '3-6', description: 'Những kẻ nằm trên giường ngà voi' },
      { section: 'Năm thị kiến & Lời hứa phục hưng', chapters: '7-9', description: 'Dây dọi, lẵng quả mùa hè' }
    ],
    keyFigures: ['Amốt', 'A-mát-gia (tư tế Bê-ten)'],
    keyVerses: [
      { reference: 'Am 5,24', text: 'Hãy làm cho công lý chảy tràn như dòng nước, và đức công chính như dòng suối không bao giờ cạn!' }
    ],
    theologicalSignificance: 'Nền tảng thần học của Học thuyết Xã hội Công giáo về quyền của người nghèo và công bằng luân lý.'
  },
  {
    id: 'obad',
    code: 'OB',
    name: 'Ôvađia',
    latinName: 'Abdias',
    abbreviation: 'Ôv',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 1,
    order: 38,
    overview: 'Cuốn sách ngắn nhất Cựu Ước (chỉ 21 câu) lên án lòng dạ hiểm độc kiêu căng của dân Ê-đôm khi hả hê trước sự sụp đổ của Giêrusalem.',
    authorTradition: 'Ngôn sứ Ôvađia.',
    compositionPeriod: 'Sau năm 587 TCN.',
    historicalContext: 'Người Ê-đôm (dòng dõi Ê-sau) đã cướp phá khi anh em mình là Giuđa bị lưu đày.',
    mainThemes: ['Phạt tội kiêu ngạo', 'Bảo vệ dân bị áp bức', 'Vương quyền thuộc về Đức Chúa'],
    purpose: 'Tuyên cáo sự công bằng nghiêm minh của Chúa đối với kẻ hãm hại anh em.',
    structure: [
      { section: 'Sự sụp đổ của Ê-đôm', chapters: '1,1-16', description: 'Vì ngươi đã đứng nhìn anh em sa cơ' },
      { section: 'Chiến thắng của Israel trên núi Sion', chapters: '1,17-21', description: 'Nước thuộc về Đức Chúa' }
    ],
    keyFigures: ['Ôvađia', 'Ê-đôm'],
    keyVerses: [
      { reference: 'Ôv 1,21', text: 'Vương quyền sẽ thuộc về Đức Chúa!' }
    ],
    theologicalSignificance: 'Cảnh báo về tội thiếu bác ái và đồng lõa với sự dữ chống lại đồng loại.'
  },
  {
    id: 'jonah',
    code: 'JH',
    name: 'Giôna',
    latinName: 'Ionas',
    abbreviation: 'Gn',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 4,
    order: 39,
    overview: 'Chuyện ngụ ngôn châm biếm sâu sắc: Giôna trốn chạy trong bụng cá lớn, giảng cho dân ngoại Ninivê sám hối và bài học về lòng từ bi phổ quát của Chúa.',
    authorTradition: 'Tác giả vô danh thời Hậu Lưu đày.',
    compositionPeriod: 'Thế kỷ V TCN.',
    historicalContext: 'Ninivê thủ đô khét tiếng tàn bạo của đế quốc Átsua.',
    mainThemes: ['Ơn cứu độ phổ quát', 'Lòng thương xót của Chúa vượt ngoài biên giới tôn giáo', 'Dấu lạ Giôna'],
    purpose: 'Phê phán chủ nghĩa biệt lập hẹp hòi của người Do Thái sau lưu đày.',
    structure: [
      { section: 'Giôna trốn chạy & Bụng cá lớn', chapters: '1-2', description: 'Bão tố và kinh tạ ơn trong bụng cá' },
      { section: 'Ninivê sám hối', chapters: '3', description: 'Từ vua đến súc vật đều ăn chay' },
      { section: 'Cơn giận của Giôna & Cây thầu dầu', chapters: '4', description: 'Bài học lòng thương xót của Chúa' }
    ],
    keyFigures: ['Giôna', 'Vua Ninivê'],
    keyVerses: [
      { reference: 'Gn 4,11', text: 'Chẳng lẽ Ta lại không đoái thương Ninivê, thành phố lớn có hơn một trăm hai mươi ngàn người hay sao?' }
    ],
    theologicalSignificance: '"Dấu lạ Giôna" trong bụng cá 3 ngày đêm là dấu chỉ tiên trưng Chúa Giêsu trong lòng đất 3 ngày rồi sống lại (Mt 12,39-40).'
  },
  {
    id: 'mic',
    code: 'MC',
    name: 'Mikha',
    latinName: 'Michaeas',
    abbreviation: 'Mk',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 7,
    order: 40,
    overview: 'Cùng thời với Isaia: lên án bất công và loan báo sấm ngôn bất hủ về Đấng Thống Trị sinh ra tại Bêlem Épphratha.',
    authorTradition: 'Ngôn sứ Mikha người Môrêsét.',
    compositionPeriod: 'Thế kỷ VIII TCN (735 - 700 TCN).',
    historicalContext: 'Nông dân nghèo bị giới bóc lột tại Giuđa chèn ép.',
    mainThemes: ['Thực thi công bình và yêu thương', 'Sấm ngôn Đấng Mêsia tại Bêlem (Mk 5,1)'],
    purpose: 'Dạy rằng điều Chúa đòi hỏi nơi con người chính là sống công bằng, yêu mến lòng nhân từ và khiêm nhường bước đi với Chúa.',
    structure: [
      { section: 'Phán xét tội ác xã hội', chapters: '1-3', description: 'Các thủ lãnh áp bức' },
      { section: 'Ơn cứu rỗi & Sấm ngôn Bêlem', chapters: '4-5', description: 'Bêlem Épphratha nhỏ bé' },
      { section: 'Vụ kiện của Chúa & Hy vọng', chapters: '6-7', description: 'Thiên Chúa ném tội lỗi xuống đáy biển' }
    ],
    keyFigures: ['Mikha'],
    keyVerses: [
      { reference: 'Mk 5,1', text: 'Phần ngươi, hỡi Bêlem Épphratha... từ nơi ngươi, Ta sẽ làm xuất hiện một Đấng thống trị Israel.' },
      { reference: 'Mk 6,8', text: 'Điều Đức Chúa đòi hỏi ngươi là: hãy thực thi công lý, quý trọng lòng nhân ái và khiêm nhường bước đi với Thiên Chúa.' }
    ],
    theologicalSignificance: 'Mk 5,1 được các thượng tế trích dẫn để chỉ đường cho các Đạo Sĩ tìm đến Bêlem nơi Chúa Giêsu sinh hạ (Mt 2,6).'
  },
  {
    id: 'nah',
    code: 'NA',
    name: 'Nakhum',
    latinName: 'Nahum',
    abbreviation: 'Nk',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 3,
    order: 41,
    overview: 'Bài ca thi ca hùng tráng loan báo sự sụp đổ tất yếu của đế quốc tàn bạo Átsua (Ninivê sụp đổ năm 612 TCN).',
    authorTradition: 'Ngôn sứ Nakhum người Encốt.',
    compositionPeriod: 'Khoảng 663 - 612 TCN.',
    historicalContext: 'Đế quốc Átsua từng đè bẹp Trung Đông chuẩn bị diệt vong.',
    mainThemes: ['Thiên Chúa bênh vực kẻ bị áp bức', 'Sự sụp đổ của đế quốc hung bạo', 'Tin Mừng bình an'],
    purpose: 'Đem lại niềm an ủi cho dân Chúa rằng ách bạo tàn sẽ phải chấm dứt.',
    structure: [
      { section: 'Uy quyền Thiên Chúa phán xét', chapters: '1', description: 'Chúa là thành trì kiên cố' },
      { section: 'Ninivê bị công phá', chapters: '2', description: 'Chiến xa rầm rộ xông vào thành' },
      { section: 'Thành phố đổ máu nhận án', chapters: '3', description: 'Sự nhục nhã của kẻ gieo rắc bạo lực' }
    ],
    keyFigures: ['Nakhum'],
    keyVerses: [
      { reference: 'Nk 2,1', text: 'Kìa trên núi có bước chân của người mang Tin Mừng, loan báo bình an!' }
    ],
    theologicalSignificance: 'Khẳng định quy luật luân lý lịch sử: mọi chế độ bạo ngược xây trên máu và áp bức sẽ tự sụp đổ trước công lý Thiên Chúa.'
  },
  {
    id: 'hab',
    code: 'HB',
    name: 'Khabacúc',
    latinName: 'Habacuc',
    abbreviation: 'Kbc',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 3,
    order: 42,
    overview: 'Cuộc đối thoại trăn trở đầy đức tin giữa ngôn sứ và Thiên Chúa về lý do kẻ dữ thịnh vượng, và tuyên ngôn: "Người công chính sẽ sống nhờ đức tin".',
    authorTradition: 'Ngôn sứ Khabacúc.',
    compositionPeriod: 'Khoảng 605 TCN (thời Babylon trỗi dậy).',
    historicalContext: 'Đế quốc Canđê (Babylon) đe dọa nuốt chửng Giuđa.',
    mainThemes: ['Thao thức về sự dữ', 'Sống nhờ đức tin', 'Bài ca tôn vinh Chúa'],
    purpose: 'Dạy người tín hữu kiên tâm cậy trông dẫu xung quanh dường như toàn là bất công.',
    structure: [
      { section: 'Tiếng kêu than & Lời Chúa đáp', chapters: '1-2,4', description: 'Cho đến bao giờ, lạy Chúa?' },
      { section: 'Năm lời nguyền rủa kẻ bóc lột', chapters: '2,5-20', description: 'Họa cho kẻ xây thành bằng máu' },
      { section: 'Kinh nguyện tạ ơn & Ca vịnh', chapters: '3', description: 'Dù cây vả không đơm hoa, tôi vẫn vui trong Chúa' }
    ],
    keyFigures: ['Khabacúc'],
    keyVerses: [
      { reference: 'Kbc 2,4', text: 'Người công chính sẽ sống nhờ đức tin của mình.' },
      { reference: 'Kbc 3,17-18', text: 'Dầu cây vả không còn đơm bông... tôi vẫn nhảy mừng trong Đức Chúa, hân hoan trong Thiên Chúa cứu độ tôi!' }
    ],
    theologicalSignificance: 'Kbc 2,4 là câu then chốt được Thánh Phaolô trích dẫn làm nền tảng cho thần học Công chính hóa nhờ đức tin (Rm 1,17; Gl 3,11).'
  },
  {
    id: 'zeph',
    code: 'ZP',
    name: 'Xôphônia',
    latinName: 'Sophonias',
    abbreviation: 'Xp',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 3,
    order: 43,
    overview: 'Loan báo Ngày Đức Chúa phán xét và niềm vui cứu độ dành cho "đoàn dân nghèo hèn khiêm hạ" (Anawim).',
    authorTradition: 'Ngôn sứ Xôphônia, chắt của vua Khít-ki-gia.',
    compositionPeriod: 'Khoảng 630 TCN (thời vua Giosia lúc trẻ).',
    historicalContext: 'Giuđa ngập tràn các tập tục ngoại giáo của vua Mơnase trước cuộc cải cách.',
    mainThemes: ['Ngày thịnh nộ (Dies Irae)', 'Dân nghèo khó khiêm nhường (Anawim)', 'Niềm vui của Thiếu nữ Sion'],
    purpose: 'Thanh luyện dân Chúa hướng đến một cộng đoàn nghèo khó và khiêm hạ.',
    structure: [
      { section: 'Ngày phán xét toàn cầu', chapters: '1-2,3', description: 'Ngày của Đức Chúa đang đến gần' },
      { section: 'Sấm ngôn nghịch dân ngoại', chapters: '2,4-15', description: 'Phi-li-tinh, Môáp, Átsua' },
      { section: 'Niềm vui của Thiếu nữ Sion', chapters: '3', description: 'Chúa đang ngự giữa ngươi' }
    ],
    keyFigures: ['Xôphônia'],
    keyVerses: [
      { reference: 'Xp 3,12', text: 'Ta sẽ để sót lại nơi ngươi một dân nghèo hèn và khiêm hạ; họ sẽ ẩn náu nơi danh Đức Chúa.' },
      { reference: 'Xp 3,14', text: 'Reo vui lên, hỡi thiếu nữ Sion! Hãy hân hoan hết lòng, hỡi thiếu nữ Giêrusalem!' }
    ],
    theologicalSignificance: 'Xp 3,14 được Sứ thần Gabriel lặp lại khi truyền tin cho Đức Mẹ: "Mừng vui lên, hỡi Đấng đầy ân sủng!" (Lc 1,28).'
  },
  {
    id: 'hag',
    code: 'HG',
    name: 'Khácgai',
    latinName: 'Aggaeus',
    abbreviation: 'Kg',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 2,
    order: 44,
    overview: 'Thúc đẩy cộng đồng hồi hương chấm dứt chểnh mảng để mau chóng xây dựng lại Đền Thờ Giêrusalem.',
    authorTradition: 'Ngôn sứ Khácgai.',
    compositionPeriod: 'Năm 520 TCN (tháng 8 đến tháng 12 năm thứ hai vua Đariô).',
    historicalContext: 'Dân hồi hương chỉ lo xây nhà riêng sang trọng trong khi Đền Thờ Chúa còn trơ trụi hoang tàn.',
    mainThemes: ['Ưu tiên việc Chúa trước việc riêng', 'Vinh quang Đền Thờ tương lai'],
    purpose: 'Thức tỉnh lương tâm cộng đồng đặt việc phụng thờ Chúa lên hàng đầu.',
    structure: [
      { section: 'Lời quở trách & Tái khởi công', chapters: '1', description: 'Có phải lúc sống trong nhà gỗ quý trong khi Nhà này hoang phế?' },
      { section: 'Vinh quang Đền Thờ thứ hai', chapters: '2', description: 'Vinh quang Đền Thờ sau sẽ lớn hơn trước' }
    ],
    keyFigures: ['Khácgai', 'Dô-rô-ba-ven', 'Giosuê (Thượng tế)'],
    keyVerses: [
      { reference: 'Kg 2,9', text: 'Vinh quang của ngôi Đền Thờ này lúc sau sẽ lớn hơn lúc trước, và tại nơi đây Ta sẽ ban bình an!' }
    ],
    theologicalSignificance: 'Vinh quang Đền Thờ lúc sau được viên mãn khi chính Chúa Giêsu, Con Thiên Chúa bước vào thánh điện.'
  },
  {
    id: 'zech',
    code: 'ZC',
    name: 'Dacaria',
    latinName: 'Zacharias',
    abbreviation: 'Zc',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 14,
    order: 45,
    overview: 'Các thị kiến ban đêm và sấm ngôn Mêsia: Vị Vua khiêm hạ cưỡi lừa con, 30 đồng bạc giá chuộc và Đấng bị đâm thâu.',
    authorTradition: 'Ngôn sứ Dacaria con ông Bê-rếc-gia.',
    compositionPeriod: '520 - 518 TCN (chương 1-8) và các thế kỷ sau (chương 9-14).',
    historicalContext: 'Cùng thời với Khácgai thúc đẩy xây Đền Thờ thứ hai.',
    mainThemes: ['Tái thiết Đền Thờ', 'Vị Vua khiêm nhu (Zc 9,9)', 'Ba mươi đồng bạc', 'Đấng bị đâm thâu (Zc 12,10)'],
    purpose: 'Mở ra nhãn giới cứu độ toàn cầu chung cuộc của Nước Thiên Chúa.',
    structure: [
      { section: 'Tám thị kiến ban đêm', chapters: '1-8', description: 'Bốn con ngựa, chân đèn vàng, hai nhánh ô-liu' },
      { section: 'Sấm ngôn Mêsia cánh chung', chapters: '9-14', description: 'Vua cưỡi lừa vào Giêrusalem, Đấng bị đâm thâu' }
    ],
    keyFigures: ['Dacaria', 'Dô-rô-ba-ven', 'Giosuê'],
    keyVerses: [
      { reference: 'Zc 9,9', text: 'Kìa Vua ngươi đang đến với ngươi: Người công chính và khiêm hạ, cỡi trên lưng lừa, trên lưng một con lừa con.' },
      { reference: 'Zc 12,10', text: 'Chúng sẽ nhìn lên Đấng chúng đã đâm thâu, và sẽ than khóc Người như khóc con một.' }
    ],
    theologicalSignificance: 'Được trích dẫn trực tiếp trong cuộc Thương Khó của Chúa Giêsu: Chúa vào thành ngày Lễ Lá (Mt 21,5) và trên Thập Giá (Ga 19,37).'
  },
  {
    id: 'mal',
    code: 'ML',
    name: 'Malakhi',
    latinName: 'Malachias',
    abbreviation: 'Ml',
    testament: 'OLD',
    category: 'PROPHETS',
    categoryName: 'Ngôn Sứ',
    chaptersCount: 3,
    order: 46,
    overview: 'Cuốn sách khép lại Cựu Ước: lên án thói nguội lạnh phụng tự, loan báo Hy Tế Tinh Tuyền giữa muôn dân và sự xuất hiện của Êlia dọn đường.',
    authorTradition: 'Ngôn sứ Malakhi (nghĩa là "Sứ giả của Ta").',
    compositionPeriod: 'Khoảng 450 TCN (thời Nơkhemia).',
    historicalContext: 'Cộng đồng Do Thái sau khi xây xong Đền Thờ rơi vào tình trạng uể oải, dâng của tế tì vết.',
    mainThemes: ['Thiên Chúa yêu thương Giacóp', 'Hy lễ tinh tuyền khắp cõi trần gian (Ml 1,11)', 'Sứ giả Êlia dọn đường'],
    purpose: 'Kêu gọi các tư tế và dân chúng thanh tẩy lòng trung thành trước Ngày Chúa đến.',
    structure: [
      { section: 'Tố cáo các tư tế chểnh mảng', chapters: '1-2', description: 'Dâng con vật mù què làm lễ tế' },
      { section: 'Chúa bất ngờ đến Đền Thờ', chapters: '3,1-5', description: 'Luyện lọc con cái Lêvi' },
      { section: 'Sứ giả Êlia & Ngày của Chúa', chapters: '3,6-24', description: 'Dọn đường đón Chúa' }
    ],
    keyFigures: ['Malakhi'],
    keyVerses: [
      { reference: 'Ml 1,11', text: 'Từ đông sang tây, Danh Ta thật cao cả giữa chư dân; khắp mọi nơi, người ta dâng lên Danh Ta một hy tế tinh tuyền.' },
      { reference: 'Ml 3,23-24', text: 'Này Ta sai ngôn sứ Êlia đến với các ngươi trước khi Ngày trọng đại của Chúa đến.' }
    ],
    theologicalSignificance: 'Ml 1,11 được Hội Thánh Công giáo tuyên bố là lời tiên tri trực tiếp về Bí tích Thánh Lễ khắp hoàn cầu; Ml 3 báo trước Gioan Tẩy Giả.'
  },

  // --------------------------------------------------------------------------
  // TÂN ƯỚC: I. PHÚC ÂM (GOSPELS - 4 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'matt',
    code: 'MT',
    name: 'Mátthêu',
    latinName: 'Matthaeus',
    abbreviation: 'Mt',
    testament: 'NEW',
    category: 'GOSPELS',
    categoryName: 'Tin Mừng',
    chaptersCount: 28,
    order: 47,
    overview: 'Tin Mừng về Đức Giêsu là Đấng Mêsia hoàn tất mọi lời tiên tri Cựu Ước, Vua Nước Trời và Đấng ban Luật Mới.',
    authorTradition: 'Tông đồ Mátthêu (Lêvi), người thu thuế.',
    compositionPeriod: 'Khoảng 70 - 85 SCN.',
    historicalContext: 'Cộng đồng Kitô hữu gốc Do Thái đối diện với các hội đường chính thống.',
    mainThemes: ['Ứng nghiệm Kinh Thánh', 'Nước Trời (5 bài giảng)', 'Hội Thánh & Quyền Phêrô'],
    purpose: 'Chứng minh Đức Giêsu Nadarét chính là Đấng Kitô được mong đợi.',
    structure: [
      { section: 'Thời thơ ấu & Chuẩn bị', chapters: '1-4', description: 'Gia phả, sinh tại Bêlem, cám dỗ' },
      { section: 'Bài giảng trên núi', chapters: '5-7', description: 'Hiến Chương Nước Trời' },
      { section: 'Phép lạ & Sai đi', chapters: '8-10', description: 'Sứ vụ Galilê' },
      { section: 'Dụ ngôn Nước Trời', chapters: '11-13', description: 'Hạt giống, kho báu' },
      { section: 'Hội Thánh & Phêrô', chapters: '14-18', description: 'Tuyên xưng đức tin' },
      { section: 'Khổ nạn & Phục sinh', chapters: '19-28', description: 'Lệnh truyền giáo toàn cầu' }
    ],
    keyFigures: ['Đức Giêsu', 'Đức Maria', 'Thánh Giuse', 'Phêrô'],
    keyVerses: [
      { reference: 'Mt 5,3', text: 'Phúc thay ai có tâm hồn nghèo khó, vì Nước Trời là của họ.' },
      { reference: 'Mt 16,18', text: 'Anh là Phêrô, nghĩa là Tảng Đá, trên tảng đá này, Thầy sẽ xây Hội Thánh của Thầy.' },
      { reference: 'Mt 28,19-20', text: 'Anh em hãy đi và làm cho muôn dân trở thành môn đệ... Thầy ở cùng anh em mọi ngày cho đến tận thế.' }
    ],
    theologicalSignificance: 'Nền tảng thần học về Hội Thánh Công giáo, quyền bính tông truyền và bí tích Rửa Tội.'
  },
  {
    id: 'mark',
    code: 'MK',
    name: 'Mác-cô',
    latinName: 'Marcus',
    abbreviation: 'Mc',
    testament: 'NEW',
    category: 'GOSPELS',
    categoryName: 'Tin Mừng',
    chaptersCount: 16,
    order: 48,
    overview: 'Bản Tin Mừng ngắn nhất, cổ nhất, ghi lại hành động đầy quyền năng của Người Tôi Trung Đau Khổ - Con Thiên Chúa.',
    authorTradition: 'Gioan Mác-cô, môn đệ của Thánh Phêrô tại Rôma.',
    compositionPeriod: 'Khoảng 65 - 70 SCN.',
    historicalContext: 'Cộng đồng Kitô hữu tại Rôma chịu bách hại thời hoàng đế Nêrô.',
    mainThemes: ['Bí mật Mêsia', 'Đấng hiến dâng mạng sống', 'Bước theo Thập giá'],
    purpose: 'Khích lệ tín hữu can đảm chịu đau khổ vì danh Chúa Kitô.',
    structure: [
      { section: 'Sứ vụ tại Galilê', chapters: '1-8', description: 'Chữa lành, trừ quỷ' },
      { section: 'Trên đường lên Giêrusalem', chapters: '8-10', description: 'Tiên báo cuộc Thương Khó' },
      { section: 'Thương Khó & Phục Sinh', chapters: '11-16', description: 'Thập giá và Mộ trống' }
    ],
    keyFigures: ['Đức Giêsu', 'Phêrô', 'Viên đại đội trưởng Rôma'],
    keyVerses: [
      { reference: 'Mc 1,15', text: 'Thời kỳ đã mãn, Triều Đại Thiên Chúa đã đến gần. Hãy sám hối và tin vào Tin Mừng.' },
      { reference: 'Mc 10,45', text: 'Con Người đến để phục vụ và hiến dâng mạng sống làm giá chuộc muôn người.' }
    ],
    theologicalSignificance: 'Mặc khải Thần tính của Đức Kitô đạt đỉnh cao nơi Thập giá qua lời tuyên xưng của viên sĩ quan lương dân.'
  },
  {
    id: 'luke',
    code: 'LK',
    name: 'Lu-ca',
    latinName: 'Lucas',
    abbreviation: 'Lc',
    testament: 'NEW',
    category: 'GOSPELS',
    categoryName: 'Tin Mừng',
    chaptersCount: 24,
    order: 49,
    overview: 'Tin Mừng của Lòng Thương Xót, niềm vui cứu độ, người nghèo hèn, phụ nữ và quyền năng Chúa Thánh Thần.',
    authorTradition: 'Thánh Luca, vị thầy thuốc người Hy Lạp, bạn đồng hành của Thánh Phaolô.',
    compositionPeriod: 'Khoảng 75 - 85 SCN.',
    historicalContext: 'Viết cho các Kitô hữu gốc dân ngoại trong thế giới Hy-La.',
    mainThemes: ['Lòng Thương Xót (Người Cha Nhân Hậu)', 'Cầu nguyện liên lỉ', 'Niềm vui Thánh Thần'],
    purpose: 'Khơi dậy niềm tin vững chắc vào ơn tha thứ nhưng không của Thiên Chúa.',
    structure: [
      { section: 'Thời thơ ấu của Chúa', chapters: '1-2', description: 'Truyền tin, Magnificat, Giáng sinh' },
      { section: 'Sứ vụ Galilê', chapters: '3-9', description: 'Hội đường Nadarét' },
      { section: 'Hành trình lên Giêrusalem', chapters: '9-19', description: 'Dụ ngôn Người Cha Nhân Hậu' },
      { section: 'Khổ nạn & Emmau', chapters: '19-24', description: 'Bẻ bánh tại Emmau' }
    ],
    keyFigures: ['Đức Giêsu', 'Đức Maria', 'Giacaria', 'Êlisabét', 'Gakêu'],
    keyVerses: [
      { reference: 'Lc 1,46-47', text: 'Linh hồn tôi ngợi khen Đức Chúa, thần trí tôi hớn hở vui mừng vì Thiên Chúa cứu độ tôi.' },
      { reference: 'Lc 15,20', text: 'Khi anh ta còn ở đàng xa, người cha trông thấy đã chạnh lòng thương, chạy ra ôm cổ và hôn lấy hôn để.' }
    ],
    theologicalSignificance: 'Nguồn gốc các kinh nguyện phụng vụ tuyệt mỹ: Kinh Kính Mừng, Magnificat, Benedictus, Nunc Dimittis.'
  },
  {
    id: 'john',
    code: 'JN',
    name: 'Gioan',
    latinName: 'Ioannes',
    abbreviation: 'Ga',
    testament: 'NEW',
    category: 'GOSPELS',
    categoryName: 'Tin Mừng',
    chaptersCount: 21,
    order: 50,
    overview: 'Tin Mừng Thần học sâu sắc nhất: Ngôi Lời Nhập Thể, 7 Dấu Chỉ vĩ đại, Diễn từ Bánh Hằng Sống và sự hiệp thông Ba Ngôi.',
    authorTradition: 'Thánh Gioan Tông đồ, người môn đệ được Chúa yêu.',
    compositionPeriod: 'Khoảng 90 - 100 SCN tại Êphêsô.',
    historicalContext: 'Cộng đồng Kitô hữu đối diện với các lạc giáo thời sơ khai.',
    mainThemes: ['Ngôi Lời (Logos) hằng hữu', 'Bí tích Thánh Thể (Ga 6)', 'Giới răn yêu thương', 'Đức Maria dưới chân Thập giá'],
    purpose: 'Để anh em tin rằng Đức Giêsu là Con Thiên Chúa, và nhờ tin mà được sống đời đời.',
    structure: [
      { section: 'Lời tựa Thần học', chapters: '1,1-18', description: 'Ngôi Lời làm người' },
      { section: 'Sách Các Dấu Chỉ', chapters: '1-12', description: '7 phép lạ Cana, Ladarô' },
      { section: 'Sách Vinh Hiển', chapters: '13-20', description: 'Tiệc Ly, Thập giá, Phục sinh' },
      { section: 'Phụ lục biển hồ Tibêria', chapters: '21', description: 'Trao quyền chăn dắt cho Phêrô' }
    ],
    keyFigures: ['Đức Giêsu', 'Đức Maria', 'Gioan', 'Nicôđêmô', 'Ladarô', 'Tôma'],
    keyVerses: [
      { reference: 'Ga 1,14', text: 'Ngôi Lời đã trở nên người phàm và cư ngụ giữa chúng ta.' },
      { reference: 'Ga 3,16', text: 'Thiên Chúa yêu thế gian đến nỗi đã ban Con Một để ai tin thì được sống muôn đời.' },
      { reference: 'Ga 6,54', text: 'Ai ăn thịt và uống máu Tôi thì được sống muôn đời, và Tôi sẽ cho người ấy sống lại ngày sau hết.' }
    ],
    theologicalSignificance: 'Nền tảng thần học về Nhập Thể, Thánh Thể và chức Tư tế Thừa tác của Hội Thánh.'
  },

  // --------------------------------------------------------------------------
  // TÂN ƯỚC: II. LỊCH SỬ GIÁO HỘI SƠ KHAI (1 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'acts',
    code: 'AC',
    name: 'Tông Đồ Công Vụ',
    latinName: 'Actus Apostolorum',
    abbreviation: 'Cv',
    testament: 'NEW',
    category: 'ACTS',
    categoryName: 'Tông Đồ',
    chaptersCount: 28,
    order: 51,
    overview: 'Lịch sử khai sinh và lớn mạnh kỳ diệu của Hội Thánh sơ khai nhờ quyền năng Chúa Thánh Thần, từ Giêrusalem đến Rôma.',
    authorTradition: 'Thánh Luca (tập 2 sau Tin Mừng Luca).',
    compositionPeriod: 'Khoảng 80 - 85 SCN.',
    historicalContext: 'Đế quốc Rôma thế kỷ I thời các Tông đồ mở rộng truyền giáo.',
    mainThemes: ['Hiện Xuống và Chúa Thánh Thần', 'Đời sống hiệp thông huynh đệ', 'Công đồng Giêrusalem (Cv 15)', 'Sứ vụ Phaolô'],
    purpose: 'Chứng minh Lời Chúa không bị bất kỳ xiềng xích nào ngăn cản được.',
    structure: [
      { section: 'Hội Thánh Giêrusalem', chapters: '1-7', description: 'Hiện Xuống, Têphanô tử đạo' },
      { section: 'Lan tỏa sang lương dân', chapters: '8-12', description: 'Phaolô trở lại, Cornêliô' },
      { section: 'Hành trình Phaolô & Rôma', chapters: '13-28', description: 'Ba chuyến truyền giáo và đến Rôma' }
    ],
    keyFigures: ['Phêrô', 'Phaolô', 'Têphanô', 'Barnaba'],
    keyVerses: [
      { reference: 'Cv 1,8', text: 'Anh em sẽ nhận được sức mạnh của Thánh Thần và sẽ là chứng nhân của Thầy cho đến tận cùng trái đất.' },
      { reference: 'Cv 2,42', text: 'Các tín hữu chuyên cần lắng nghe các Tông Đồ, hiệp thông huynh đệ, siêng năng bẻ bánh và cầu nguyện.' }
    ],
    theologicalSignificance: 'Bản thiết kế mẫu mực cho Giáo Hội học Công giáo: Duy nhất, Thánh thiện, Công giáo và Tông truyền.'
  },

  // --------------------------------------------------------------------------
  // TÂN ƯỚC: III. THƯ THÁNH PHAOLÔ (EPISTLES - 14 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'rom',
    code: 'RM',
    name: 'Rôma',
    latinName: 'Ad Romanos',
    abbreviation: 'Rm',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 16,
    order: 52,
    overview: 'Đại tác phẩm thần học của Thánh Phaolô về ơn công chính hóa nhờ đức tin, sự tự do của ân sủng và kế hoạch cứu độ cho muôn dân.',
    authorTradition: 'Thánh Tông đồ Phaolô.',
    compositionPeriod: 'Khoảng 57 SCN từ Côrintô.',
    historicalContext: 'Cộng đồng tín hữu tại Rôma gồm cả Do Thái và lương dân.',
    mainThemes: ['Công chính hóa bởi ân sủng', 'Ađam cũ và Đức Kitô - Ađam Mới', 'Đời sống trong Thánh Thần (Rm 8)'],
    purpose: 'Chuẩn bị chuyến viếng thăm Rôma và hiệp nhất cộng đoàn trong đức tin.',
    structure: [
      { section: 'Mọi người đều phạm tội', chapters: '1-3', description: 'Cần ơn cứu độ của Chúa' },
      { section: 'Công chính nhờ đức tin', chapters: '4-5', description: 'Đức tin của Abraham' },
      { section: 'Đời sống Thánh Thần', chapters: '6-8', description: 'Không gì tách ta khỏi tình yêu Chúa' },
      { section: 'Israel & Muôn dân', chapters: '9-11', description: 'Kế hoạch cứu chuộc nhiệm mầu' },
      { section: 'Luân lý đời sống', chapters: '12-16', description: 'Hiến thân làm lễ dâng sống động' }
    ],
    keyFigures: ['Phaolô', 'Abraham', 'Ađam', 'Đức Kitô'],
    keyVerses: [
      { reference: 'Rm 1,16', text: 'Tin Mừng là sức mạnh của Thiên Chúa để cứu độ bất cứ ai có đức tin.' },
      { reference: 'Rm 8,38-39', text: 'Không có gì tách được chúng ta ra khỏi tình yêu của Thiên Chúa thể hiện nơi Đức Kitô Giêsu!' }
    ],
    theologicalSignificance: 'Văn bản trung tâm của thần học ân sủng và công chính hóa trong đức tin Kitô giáo.'
  },
  {
    id: '1cor',
    code: '1CO',
    name: '1 Cô-rin-tô',
    latinName: '1 Ad Corinthios',
    abbreviation: '1Cr',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 16,
    order: 53,
    overview: 'Giải quyết các chia rẽ cộng đoàn, luân lý hôn nhân, đặc sủng Thánh Thần, bài ca Đức Mến (1Cr 13) và kẻ chết sống lại (1Cr 15).',
    authorTradition: 'Thánh Phaolô.',
    compositionPeriod: 'Khoảng 54 SCN từ Êphêsô.',
    historicalContext: 'Thành phố cảng Côrintô sầm uất nhưng nhiều tệ nạn xã hội.',
    mainThemes: ['Hiệp nhất trong Thân Thể Chúa', 'Bí tích Thánh Thể (1Cr 11)', 'Bài ca Đức Ái (1Cr 13)', 'Đức Kitô Phục Sinh'],
    purpose: 'Chấn chỉnh sự phân rẽ bè phái và hướng dẫn phụng tự nghiêm trang.',
    structure: [
      { section: 'Chống chia rẽ bè phái', chapters: '1-4', description: 'Sự điên rồ của Thập Giá' },
      { section: 'Luân lý & Hôn nhân', chapters: '5-7', description: 'Thân xác là đền thờ Thánh Thần' },
      { section: 'Thánh Thể & Đặc sủng', chapters: '8-14', description: 'Bữa Tiệc Chúa và Bài ca Đức Mến' },
      { section: 'Mầu nhiệm Phục Sinh', chapters: '15-16', description: 'Nếu Đức Kitô không sống lại thì đức tin vô ích' }
    ],
    keyFigures: ['Phaolô', 'Apôllô', 'Kêpha'],
    keyVerses: [
      { reference: '1Cr 11,24-25', text: 'Đây là Mình Thầy hiến dâng vì anh em; hãy làm việc này mà tưởng nhớ đến Thầy.' },
      { reference: '1Cr 13,13', text: 'Hiện nay còn lại ba điều: đức tin, đức cậy và đức mến; nhưng lớn nhất là đức mến.' }
    ],
    theologicalSignificance: 'Bản văn tường thuật việc thiết lập Bí tích Thánh Thể cổ xưa nhất trong Kinh Thánh (1Cr 11,23-26).'
  },
  {
    id: '2cor',
    code: '2CO',
    name: '2 Cô-rin-tô',
    latinName: '2 Ad Corinthios',
    abbreviation: '2Cr',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 13,
    order: 54,
    overview: 'Bức thư tâm tình và xúc động nhất của Phaolô: bảo vệ tư cách tông đồ, sức mạnh trong yếu đuối và sứ vụ hòa giải.',
    authorTradition: 'Thánh Phaolô.',
    compositionPeriod: 'Khoảng 55 SCN từ Makêđônia.',
    historicalContext: 'Một số "siêu tông đồ" giả danh vu khống và phá hoại uy tín của Phaolô.',
    mainThemes: ['Ơn an ủi giữa gian truân', 'Kho tàng trong bình sành', 'Sứ vụ hòa giải', 'Sức mạnh trong yếu đuối'],
    purpose: 'Hàn gắn tương quan với giáo đoàn Côrintô và khẳng định thẩm quyền tông đồ đích thực.',
    structure: [
      { section: 'Sứ vụ Giao Ước Mới', chapters: '1-7', description: 'Chức vụ rạng rỡ của Thần Khí' },
      { section: 'Quyên góp bác ái', chapters: '8-9', description: 'Giúp đỡ Hội Thánh Giêrusalem' },
      { section: 'Tự biện hộ chức Tông đồ', chapters: '10-13', description: 'Cái dằm trong thịt và ơn Chúa đủ cho con' }
    ],
    keyFigures: ['Phaolô', 'Titô'],
    keyVerses: [
      { reference: '2Cr 5,20', text: 'Chúng tôi là sứ giả của Đức Kitô: Xin anh em hãy làm hòa với Thiên Chúa!' },
      { reference: '2Cr 12,9', text: 'Ơn của Thầy đã đủ cho anh, vì sức mạnh của Thầy được biểu lộ trọn vẹn trong sự yếu đuối.' }
    ],
    theologicalSignificance: 'Linh đạo về người mục tử thánh giá: Thiên Chúa hành động qua sự khiêm hạ và yếu hèn của con người.'
  },
  {
    id: 'gal',
    code: 'GL',
    name: 'Ga-lát',
    latinName: 'Ad Galatas',
    abbreviation: 'Gl',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 6,
    order: 55,
    overview: 'Tuyên ngôn về sự tự do Kitô giáo: ơn cứu độ đến nhờ đức tin vào Đức Kitô chứ không do việc tuân giữ luật cắt bì hình thức.',
    authorTradition: 'Thánh Phaolô.',
    compositionPeriod: 'Khoảng 54 - 55 SCN.',
    historicalContext: 'Những người Do Thái Kitô giáo đòi hỏi các tín hữu gốc dân ngoại phải chịu cắt bì mới được cứu.',
    mainThemes: ['Chỉ có một Tin Mừng duy nhất', 'Được công chính hóa nhờ đức tin', 'Tự do của con cái Thiên Chúa', 'Hoa trái Thánh Thần'],
    purpose: 'Bảo vệ Tin Mừng ân sủng tự do khỏi rơi vào chủ nghĩa câu nệ lề luật.',
    structure: [
      { section: 'Thẩm quyền Tông đồ', chapters: '1-2', description: 'Tin Mừng nhận trực tiếp từ Chúa' },
      { section: 'Biện chứng đức tin & Lề luật', chapters: '3-4', description: 'Người công chính nhờ đức tin' },
      { section: 'Sống tự do trong Thánh Thần', chapters: '5-6', description: 'Hoa trái Thần Khí: bác ái, hoan lạc, bình an' }
    ],
    keyFigures: ['Phaolô', 'Phêrô', 'Barnaba'],
    keyVerses: [
      { reference: 'Gl 2,20', text: 'Tôi sống, nhưng không còn phải là tôi, mà là Đức Kitô sống trong tôi.' },
      { reference: 'Gl 5,22-23', text: 'Hoa trái của Thần Khí là: bác ái, hoan lạc, bình an, nhẫn nhục, nhân hậu, từ tâm, trung tín, hiền hòa, tiết độ.' }
    ],
    theologicalSignificance: 'Khẳng định tính phổ quát tuyệt đối của ơn cứu độ không bị giới hạn bởi tập tục văn hóa Do Thái.'
  },
  {
    id: 'eph',
    code: 'EP',
    name: 'Ê-phê-sô',
    latinName: 'Ad Ephesios',
    abbreviation: 'Ep',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 6,
    order: 56,
    overview: 'Thư giam cầm tuyệt mỹ về kế hoạch cứu độ muôn đời của Chúa Cha, mầu nhiệm Hội Thánh là Thân Thể Đức Kitô và áo giáp thiêng liêng.',
    authorTradition: 'Thánh Phaolô (từ chốn lao tù).',
    compositionPeriod: 'Khoảng 61 - 63 SCN tại Rôma.',
    historicalContext: 'Cộng đồng các giáo đoàn vùng Tiểu Á.',
    mainThemes: ['Thâu họp vạn vật trong Đức Kitô', 'Hiệp nhất Hội Thánh', 'Hôn nhân biểu tượng Đức Kitô và Hội Thánh', 'Binh giáp Thiên Chúa'],
    purpose: 'Mở rộng tầm nhìn thiêng liêng của tín hữu về vị thế vinh quang của Hội Thánh trong kế hoạch vũ trụ.',
    structure: [
      { section: 'Mầu nhiệm ân sủng của Thiên Chúa', chapters: '1-3', description: 'Khúc tráng ca chúc tụng Thiên Chúa' },
      { section: 'Hiệp nhất đời sống Kitô giáo', chapters: '4-6', description: 'Một Chúa, một đức tin, một phép rửa' }
    ],
    keyFigures: ['Phaolô'],
    keyVerses: [
      { reference: 'Ep 2,8', text: 'Chính do ân sủng mà anh em được cứu độ nhờ đức tin; đây không phải do công đức anh em, nhưng là hồng ân Thiên Chúa.' },
      { reference: 'Ep 5,25', text: 'Người làm chồng, hãy yêu thương vợ mình như Đức Kitô yêu thương Hội Thánh và hiến thân vì Hội Thánh.' }
    ],
    theologicalSignificance: 'Đỉnh cao của Giáo Hội học bí tích: Hội Thánh là Hiền Thê tinh tuyền và là Thân Thể mầu nhiệm của Chúa Kitô.'
  },
  {
    id: 'phil',
    code: 'PH',
    name: 'Phi-líp-phê',
    latinName: 'Ad Philippenses',
    abbreviation: 'Pl',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 4,
    order: 57,
    overview: 'Bức thư của niềm vui trong xiềng xích và Thánh Ca Tự Hạ (Kenosis) tuyệt trần về Đức Kitô trút bỏ vinh quang để vâng lời cho đến chết.',
    authorTradition: 'Thánh Phaolô.',
    compositionPeriod: 'Khoảng 61 - 62 SCN từ ngục tù Rôma.',
    historicalContext: 'Giáo đoàn đầu tiên do Phaolô thiết lập trên đất châu Âu (Hy Lạp).',
    mainThemes: ['Thánh Ca Tự Hạ (Pl 2,5-11)', 'Niềm vui trong Chúa', 'Sống là Đức Kitô và chết là một mối lợi'],
    purpose: 'Cảm ơn sự trợ giúp của giáo đoàn và khích lệ họ sống hiệp nhất trong khiêm nhường.',
    structure: [
      { section: 'Xiềng xích làm Tin Mừng lan rộng', chapters: '1', description: 'Sống là Đức Kitô' },
      { section: 'Thánh Ca Kenosis & Khiêm nhường', chapters: '2', description: 'Đức Kitô tự hạ và được siêu tôn' },
      { section: 'Nhắm đích mà chạy', chapters: '3-4', description: 'Hãy vui luôn trong Chúa' }
    ],
    keyFigures: ['Phaolô', 'Ti-mô-thê', 'Ê-páp-rô-đi-tô'],
    keyVerses: [
      { reference: 'Pl 2,6-7', text: 'Đức Giêsu Kitô vốn dĩ là Thiên Chúa... nhưng đã hoàn toàn trút bỏ vinh quang, mặc lấy thân nô lệ.' },
      { reference: 'Pl 4,4', text: 'Anh em hãy vui mừng luôn mãi trong Chúa! Tôi nhắc lại: Hãy vui mừng lên!' },
      { reference: 'Pl 4,13', text: 'Tôi có thể làm được mọi sự trong Đấng ban sức mạnh cho tôi.' }
    ],
    theologicalSignificance: 'Thánh thi Kitô học cổ xưa nhất (Pl 2,5-11) được cử hành trung tâm trong Phụng vụ Lễ Lá và Tuần Thánh.'
  },
  {
    id: 'col',
    code: 'CL',
    name: 'Cô-lô-xê',
    latinName: 'Ad Colossenses',
    abbreviation: 'Cl',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 4,
    order: 58,
    overview: 'Tuyên xưng Đức Kitô là Trưởng Tử muôn loài thụ tạo, Đầu của Hội Thánh, Đấng thâu họp toàn thể vạn vật.',
    authorTradition: 'Thánh Phaolô.',
    compositionPeriod: 'Khoảng 61 - 63 SCN.',
    historicalContext: 'Cộng đồng Côlôxê bị đe dọa bởi các tư tưởng huyền bí pha tạp sùng bái các quyền lực tinh tú.',
    mainThemes: ['Địa vị tối thượng tuyệt đối của Đức Kitô', 'Đầu của Thân Thể Hội Thánh', 'Mặc lấy con người mới'],
    purpose: 'Bác bỏ mọi triết thuyết sai lạc bằng cách khẳng định sự viên mãn thần linh nơi Đức Kitô.',
    structure: [
      { section: 'Thánh thi Kitô học & Mầu nhiệm', chapters: '1-2', description: 'Đức Kitô là hình ảnh Thiên Chúa vô hình' },
      { section: 'Đời sống mới trong Chúa Kitô', chapters: '3-4', description: 'Tìm kiếm những sự trên trời' }
    ],
    keyFigures: ['Phaolô', 'Ê-páp-ra'],
    keyVerses: [
      { reference: 'Cl 1,15', text: 'Người là hình ảnh Thiên Chúa vô hình, là trưởng tử sinh ra trước mọi loài thụ tạo.' },
      { reference: 'Cl 3,1', text: 'Nếu anh em đã sống lại với Đức Kitô, hãy tìm kiếm những sự trên trời.' }
    ],
    theologicalSignificance: 'Khẳng định Chúa Kitô là Đấng Trung Gian duy nhất của công trình Sáng Tạo và Cứu Chuộc.'
  },
  {
    id: '1thess',
    code: '1TH',
    name: '1 Tê-xa-lô-ni-ca',
    latinName: '1 Ad Thessalonicenses',
    abbreviation: '1Tx',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 5,
    order: 59,
    overview: 'Tác phẩm văn văn sớm nhất của Tân Ước (khoảng năm 50-51 SCN): khích lệ đức tin kiên vững và sự quang lâm (Parousia) của Chúa.',
    authorTradition: 'Thánh Phaolô.',
    compositionPeriod: 'Khoảng năm 50 hoặc 51 SCN tại Côrintô (văn bản Tân Ước được viết sớm nhất).',
    historicalContext: 'Giáo đoàn Têxalônica non trẻ bị bách hại và lo lắng cho số phận những người đã qua đời.',
    mainThemes: ['Đức tin, đức cậy, đức mến', 'Ngày Chúa Quang Lâm (Parousia)', 'Niềm hy vọng kẻ chết sống lại'],
    purpose: 'An ủi tín hữu về số phận người đã khuất và nhắc nhở sống thánh thiện tỉnh thức.',
    structure: [
      { section: 'Tạ ơn & Khen ngợi giáo đoàn', chapters: '1-3', description: 'Gương sáng đức tin của anh em' },
      { section: 'Lời khuyên luân lý & Chúa quang lâm', chapters: '4-5', description: 'Người chết trong Chúa sẽ sống lại trước hết' }
    ],
    keyFigures: ['Phaolô', 'Silvanô', 'Ti-mô-thê'],
    keyVerses: [
      { reference: '1Tx 4,14', text: 'Nếu chúng ta tin rằng Đức Giêsu đã chết và đã sống lại, thì Thiên Chúa cũng sẽ đưa những người đã an giấc trong Người đến cùng Đức Giêsu.' },
      { reference: '1Tx 5,16-18', text: 'Hãy vui mừng luôn mãi, cầu nguyện không ngừng, hãy tạ ơn trong mọi hoàn cảnh.' }
    ],
    theologicalSignificance: 'Mầm mống cánh chung học Kitô giáo: sự sống lại và cuộc hạnh ngộ muôn đời với Chúa.'
  },
  {
    id: '2thess',
    code: '2TH',
    name: '2 Tê-xa-lô-ni-ca',
    latinName: '2 Ad Thessalonicenses',
    abbreviation: '2Tx',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 3,
    order: 60,
    overview: 'Uốn nắn những hiểu lầm cuồng tín về ngày tận thế, vạch trần con người gian ác và kêu gọi chăm chỉ làm việc.',
    authorTradition: 'Thánh Phaolô.',
    compositionPeriod: 'Khoảng năm 51 - 52 SCN.',
    historicalContext: 'Một số tín hữu tưởng ngày tận thế đã đến nên lười biếng bỏ việc, sống ăn bám.',
    mainThemes: ['Các dấu chỉ trước ngày tận thế', 'Kẻ gian ác chống Chúa', 'Ai không làm việc thì đừng ăn'],
    purpose: 'Ổn định trật tự cộng đoàn và cảnh báo trước các trò lừa dối cánh chung.',
    structure: [
      { section: 'Khích lệ chịu thử thách', chapters: '1', description: 'Chúa sẽ phán xét công minh' },
      { section: 'Dấu chỉ con người gian ác', chapters: '2', description: 'Sự bội giáo trước ngày Chúa đến' },
      { section: 'Chăm chỉ làm việc', chapters: '3', description: 'Ai không chịu làm thì đừng ăn' }
    ],
    keyFigures: ['Phaolô'],
    keyVerses: [
      { reference: '2Tx 2,15', text: 'Anh em hãy đứng vững và nắm giữ các truyền thống chúng tôi đã dạy anh em.' },
      { reference: '2Tx 3,10', text: 'Ai không chịu làm việc thì cũng đừng ăn!' }
    ],
    theologicalSignificance: 'Tầm quan trọng của Thánh Truyền tông truyền và đạo đức lao động Kitô giáo.'
  },
  {
    id: '1tim',
    code: '1TI',
    name: '1 Ti-mô-thê',
    latinName: '1 Ad Timotheum',
    abbreviation: '1Tm',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 6,
    order: 61,
    overview: 'Thư Mục Vụ hướng dẫn cách thức coi sóc giáo đoàn Êphêsô, tiêu chuẩn Giám mục, Linh mục, Phó tế và phụng tự thánh.',
    authorTradition: 'Thánh Phaolô gửi người con thiêng liêng Ti-mô-thê.',
    compositionPeriod: 'Khoảng năm 65 SCN.',
    historicalContext: 'Giáo đoàn Êphêsô đối diện nguy cơ lạc giáo và cần thiết lập cơ cấu phẩm trật vững chắc.',
    mainThemes: ['Bảo vệ kho tàng giáo lý tinh tuyền', 'Quy chuẩn hàng giáo phẩm (Giám mục, Phó tế)', 'Cầu nguyện cho mọi người'],
    purpose: 'Cung cấp cẩm nang mục vụ tổ chức đời sống giáo xứ và Hội Thánh.',
    structure: [
      { section: 'Chống giáo lý sai lạc', chapters: '1', description: 'Đức Kitô đến cứu người tội lỗi' },
      { section: 'Cầu nguyện & Phụng vụ', chapters: '2', description: 'Một Thiên Chúa, một Đấng Trung Gian' },
      { section: 'Phẩm trật Hội Thánh', chapters: '3', description: 'Tiêu chuẩn giám sát viên và thừa tác viên' },
      { section: 'Lời khuyên mục tử', chapters: '4-6', description: 'Đừng để ai khinh con vì con trẻ tuổi' }
    ],
    keyFigures: ['Phaolô', 'Ti-mô-thê'],
    keyVerses: [
      { reference: '1Tm 2,5', text: 'Chỉ có một Thiên Chúa, chỉ có một Đấng trung gian giữa Thiên Chúa và loài người: đó là một con người, Đức Kitô Giêsu.' },
      { reference: '1Tm 3,15', text: 'Hội Thánh của Thiên Chúa hằng sống là cột trụ và điểm tựa của chân lý.' }
    ],
    theologicalSignificance: 'Nền tảng thần học về chức Thánh và vai trò bảo vệ Chân Lý của Huấn Quyền Hội Thánh.'
  },
  {
    id: '2tim',
    code: '2TI',
    name: '2 Ti-mô-thê',
    latinName: '2 Ad Timotheum',
    abbreviation: '2Tm',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 4,
    order: 62,
    overview: 'Chúc thư cáo biệt cảm động của Thánh Phaolô trong ngục tù Rôma trước ngày chịu tử đạo: "Tôi đã chiến đấu trong trận chiến cao đẹp, đã chạy hết chặng đường".',
    authorTradition: 'Thánh Phaolô trong lần giam cầm thứ hai.',
    compositionPeriod: 'Khoảng năm 67 SCN tại Rôma (bức thư cuối cùng trước khi bị trảm quyết).',
    historicalContext: 'Phaolô cô đơn trong hầm ngục Mamertine, biết mình sắp hiến tế mạng sống.',
    mainThemes: ['Trung tín đến cùng', 'Linh ứng của Thánh Kinh (2Tm 3,16)', 'Khơi dậy ơn Chúa qua việc đặt tay'],
    purpose: 'Trao lại ngọn đuốc Tin Mừng cho thế hệ mục tử kế tiếp.',
    structure: [
      { section: 'Can đảm làm chứng tá', chapters: '1', description: 'Thiên Chúa không ban thần khí nhút nhát' },
      { section: 'Người lính giỏi của Đức Kitô', chapters: '2', description: 'Chịu gian khổ như người lính dũng cảm' },
      { section: 'Giá trị linh hứng của Kinh Thánh', chapters: '3', description: 'Kinh Thánh hữu ích để dạy dỗ' },
      { section: 'Lời trăn trối của Phaolô', chapters: '4', description: 'Triều thiên công chính đang đợi tôi' }
    ],
    keyFigures: ['Phaolô', 'Ti-mô-thê', 'Luca (người duy nhất còn ở lại)'],
    keyVerses: [
      { reference: '2Tm 3,16-17', text: 'Tất cả những gì viết trong Sách Thánh đều do Thiên Chúa linh hứng, và có ích cho việc giảng dạy, sửa trị và huấn luyện.' },
      { reference: '2Tm 4,7-8', text: 'Tôi đã chiến đấu trong trận chiến cao đẹp, đã chạy hết chặng đường, đã giữ vững đức tin. Giờ đây triều thiên công chính đang chờ đợi tôi.' }
    ],
    theologicalSignificance: 'Văn bản kinh điển khẳng định ơn linh hứng thần linh của toàn bộ Kinh Thánh Công giáo.'
  },
  {
    id: 'titus',
    code: 'TI',
    name: 'Ti-tô',
    latinName: 'Ad Titum',
    abbreviation: 'Tt',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 3,
    order: 63,
    overview: 'Hướng dẫn việc thiết lập hàng linh mục tại đảo Krêta, bổn phận luân lý của các giới trong gia đình và ơn cứu độ giải thoát.',
    authorTradition: 'Thánh Phaolô.',
    compositionPeriod: 'Khoảng năm 65 SCN.',
    historicalContext: 'Giáo đoàn đảo Krêta nổi tiếng buông thả và hỗn tạp.',
    mainThemes: ['Đặt các trưởng lão (Linh mục)', 'Lối sống mẫu mực', 'Ơn cứu độ xuất hiện'],
    purpose: 'Xây dựng nếp sống đức tin gương mẫu giữa môi trường thế tục.',
    structure: [
      { section: 'Chỉ định trưởng lão', chapters: '1', description: 'Tiêu chuẩn người chăn dắt' },
      { section: 'Dạy dỗ các lứa tuổi', chapters: '2', description: 'Người già, thanh niên, người làm công' },
      { section: 'Sống tốt giữa xã hội', chapters: '3', description: 'Nhờ phép Rửa tái sinh bởi Thánh Thần' }
    ],
    keyFigures: ['Phaolô', 'Titô'],
    keyVerses: [
      { reference: 'Tt 2,11', text: 'Ân sủng của Thiên Chúa đã biểu lộ, đem lại ơn cứu độ cho mọi người.' },
      { reference: 'Tt 3,5', text: 'Người cứu chúng ta không phải vì việc công chính chúng ta đã làm, nhưng vì lòng thương xót của Người, nhờ phép Rửa tái sinh.' }
    ],
    theologicalSignificance: 'Mặc khải về Bí tích Rửa Tội như phương thế tái sinh thần linh bởi lòng xót thương của Chúa.'
  },
  {
    id: 'philem',
    code: 'PM',
    name: 'Phi-lê-môn',
    latinName: 'Ad Philemonem',
    abbreviation: 'Plm',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 1,
    order: 64,
    overview: 'Bức thư riêng ngắn gọn chỉ 25 câu: Phaolô xin Philêmôn đón nhận lại người nô lệ trốn chạy Ônêsimô như một người anh em rất yêu quý trong Chúa.',
    authorTradition: 'Thánh Phaolô từ chốn lao tù.',
    compositionPeriod: 'Khoảng năm 61 - 63 SCN.',
    historicalContext: 'Chế độ chiếm hữu nô lệ nghiệt ngã của đế quốc Rôma.',
    mainThemes: ['Huynh đệ trong Chúa Kitô', 'Bác ái vượt lên đẳng cấp xã hội', 'Sự tha thứ'],
    purpose: 'Biến đổi tương quan xã hội từ gốc rễ qua tình yêu bác ái Kitô giáo.',
    structure: [
      { section: 'Lời chào & Khen ngợi', chapters: '1,1-7', description: 'Đức tin và lòng mến của Philêmôn' },
      { section: 'Phaolô cầu xin cho Ônêsimô', chapters: '1,8-21', description: 'Hãy đón nhận anh ấy như chính tôi' },
      { section: 'Lời chào kết', chapters: '1,22-25', description: 'Hy vọng sớm gặp lại' }
    ],
    keyFigures: ['Phaolô', 'Philêmôn', 'Ônêsimô'],
    keyVerses: [
      { reference: 'Plm 1,16', text: 'Đón nhận anh ấy không còn như một người nô lệ, nhưng hơn một người nô lệ: như một người anh em rất thân yêu.' }
    ],
    theologicalSignificance: 'Đặt nền móng phá bỏ chế độ nô lệ từ bên trong qua việc công nhận phẩm giá con người bình đẳng trước Thiên Chúa.'
  },
  {
    id: 'heb',
    code: 'HE',
    name: 'Do Thái',
    latinName: 'Ad Hebraeos',
    abbreviation: 'Dt',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 13,
    order: 65,
    overview: 'Đại tác phẩm phụng vụ thần học về Chức Thượng Tế Đời Đời của Đức Kitô theo phẩm trật Mên-ki-xê-đê, Hy Tế Thập Giá duy nhất và Giao Ước Mới.',
    authorTradition: 'Trường phái Phaolô; văn phong Hy Lạp cổ điển tuyệt hảo.',
    compositionPeriod: 'Khoảng năm 65 - 69 SCN (trước khi Đền Thờ Giêrusalem bị phá hủy).',
    historicalContext: 'Các tín hữu Do Thái bị cám dỗ quay lại với các nghi lễ tế tự hình thức của Cựu Ước.',
    mainThemes: ['Đức Kitô cao trọng hơn các Thiên thần và Môsê', 'Thượng tế đời đời theo phẩm trật Mên-ki-xê-đê', 'Hy lễ một lần dâng là đủ muôn đời', 'Gương mẫu các anh hùng đức tin (Dt 11)'],
    purpose: 'Khẳng định sự ưu việt tuyệt đối và tính chung cuộc của Hy Tế Đức Kitô.',
    structure: [
      { section: 'Đức Kitô trổi vượt hơn các thiên thần & Môsê', chapters: '1-4', description: 'Người Con qua Người Thiên Chúa phán dạy' },
      { section: 'Chức Thượng Tế & Giao Ước Mới', chapters: '5-10', description: 'Máu Đức Kitô thanh tẩy lương tâm' },
      { section: 'Đức tin kiên trì & Mẫu gương các tiền nhân', chapters: '11-13', description: 'Đức tin là bảo đảm cho những điều hy vọng' }
    ],
    keyFigures: ['Đức Giêsu - Thượng Tế', 'Mên-ki-xê-đê', 'Môsê', 'Abraham'],
    keyVerses: [
      { reference: 'Dt 1,1-2', text: 'Thuở xưa, nhiều lần nhiều cách, Thiên Chúa đã phán dạy cha ông chúng ta qua các ngôn sứ; nhưng vào những ngày sau hết này, Người đã phán dạy chúng ta qua Người Con.' },
      { reference: 'Dt 4,12', text: 'Lời Thiên Chúa là lời sống động, hữu hiệu và sắc bén hơn cả gươm hai lưỡi.' },
      { reference: 'Dt 13,8', text: 'Đức Giêsu Kitô vẫn là một, ngày hôm qua, ngày hôm nay và mãi muôn đời.' }
    ],
    theologicalSignificance: 'Nền tảng thần học cốt lõi của Hội Thánh Công giáo về chức Tư Tế và Hy Tế Thánh Lễ.'
  },

  // --------------------------------------------------------------------------
  // TÂN ƯỚC: IV. CÁC THƯ CHUNG (CATHOLIC EPISTLES - 7 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'jas',
    code: 'JM',
    name: 'Gia-cô-bê',
    latinName: 'Iacobi',
    abbreviation: 'Gc',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 5,
    order: 66,
    overview: 'Thư thực hành luân lý: "Đức tin không có hành động là đức tin chết", giữ gìn miệng lưỡi, chăm sóc kẻ mồ côi góa bụa và Bí tích Xức Dầu Bệnh Nhân.',
    authorTradition: 'Thánh Giacôbê Tông đồ, người đứng đầu Hội Thánh Giêrusalem.',
    compositionPeriod: 'Khoảng năm 60 SCN.',
    historicalContext: 'Các tín hữu Do Thái sống tản mác khắp nơi chịu nghèo đói áp bức.',
    mainThemes: ['Đức tin thể hiện qua việc làm', 'Kiểm soát lưỡi', 'Lên án kẻ giàu bóc lột', 'Bí tích Xức Dầu'],
    purpose: 'Nhắc nhở người Kitô hữu rằng đức tin phải được minh chứng bằng đời sống bác ái cụ thể.',
    structure: [
      { section: 'Thử thách & Hành động theo Lời', chapters: '1', description: 'Hãy đem Lời Chúa ra thực hành' },
      { section: 'Đức tin & Việc làm', chapters: '2', description: 'Đức tin không việc làm là đức tin chết' },
      { section: 'Miệng lưỡi & Sự khôn ngoan', chapters: '3-4', description: 'Ngọn lửa nhỏ thiêu rụi rừng lớn' },
      { section: 'Kiên nhẫn & Cầu nguyện cho bệnh nhân', chapters: '5', description: 'Lời kinh của người công chính có sức mạnh' }
    ],
    keyFigures: ['Giacôbê', 'Abraham', 'Kakháp', 'Êlia'],
    keyVerses: [
      { reference: 'Gc 2,26', text: 'Xác không hồn là xác chết thế nào, thì đức tin không có việc làm cũng chết như vậy.' },
      { reference: 'Gc 5,14-15', text: 'Ai trong anh em đau yếu? Hãy mời các kỳ mục Hội Thánh đến; họ sẽ cầu nguyện và xức dầu cho người ấy nhân danh Chúa.' }
    ],
    theologicalSignificance: 'Cơ sở Kinh Thánh trực tiếp của Hội Thánh Công giáo về Bí Tích Xức Dầu Bệnh Nhân (Gc 5,14-15).'
  },
  {
    id: '1pet',
    code: '1PE',
    name: '1 Phê-rô',
    latinName: '1 Petri',
    abbreviation: '1Pr',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 5,
    order: 67,
    overview: 'Bức thư của niềm hy vọng sống động: người tín hữu là dân thánh, chức tư tế cộng đồng, chịu đau khổ vì danh Đức Kitô và tỉnh thức trước ma quỷ.',
    authorTradition: 'Thánh Phêrô Tông đồ từ Rôma (Babylon).',
    compositionPeriod: 'Khoảng năm 63 - 64 SCN.',
    historicalContext: 'Các Kitô hữu Tiểu Á bắt đầu nếm trải làn sóng bách hại và vu khống từ chính quyền Rôma.',
    mainThemes: ['Niềm hy vọng phục sinh', 'Chức tư tế vương giả (1Pr 2,9)', 'Ý nghĩa thánh thiện của đau khổ', 'Ma quỷ như sư tử gầm thét'],
    purpose: 'Củng cố đức tin của đàn chiên đang đối diện với bách hại đẫm máu.',
    structure: [
      { section: 'Niềm hy vọng cứu độ vĩ đại', chapters: '1', description: 'Tái sinh nhờ sự phục sinh của Đức Kitô' },
      { section: 'Dân Thiên Chúa & Chức tư tế', chapters: '2-3', description: 'Viên đá góc tường và chức tư tế thánh' },
      { section: 'Đồng chịu đau khổ với Chúa Kitô', chapters: '4-5', description: 'Hãy tỉnh thức vì ma quỷ lùng bắt' }
    ],
    keyFigures: ['Phêrô', 'Silvanô', 'Mác-cô'],
    keyVerses: [
      { reference: '1Pr 2,9', text: 'Anh em là giống nòi được tuyển chọn, là hàng tư tế vương giả, là dân thánh, dân thuộc trọn về Chúa.' },
      { reference: '1Pr 5,8', text: 'Hãy tiết độ và tỉnh thức, vì ma quỷ, thù địch của anh em, như sư tử gầm thét rảo quanh tìm mồi cắn xé!' }
    ],
    theologicalSignificance: 'Nền tảng thần học về Bí tích Rửa Tội và chức Tư tế Phổ quát của toàn thể giáo dân Công giáo.'
  },
  {
    id: '2pet',
    code: '2PE',
    name: '2 Phê-rô',
    latinName: '2 Petri',
    abbreviation: '2Pr',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 3,
    order: 68,
    overview: 'Lời nhắn nhủ cuối đời của vị thủ lãnh Tông đồ: cảnh giác các ngôn sứ giả, mầu nhiệm Biến Hình và kiên tâm chờ đợi Trời Mới Đất Mới.',
    authorTradition: 'Thánh Tông đồ Phêrô.',
    compositionPeriod: 'Khoảng năm 65 - 67 SCN trước khi tử đạo.',
    historicalContext: 'Các tà thuyết buông thả chế nhạo niềm tin Chúa tái lâm.',
    mainThemes: ['Thông hiệp bản tính thần linh (2Pr 1,4)', 'Chứng nhân mắt thấy sự Biến Hình', 'Trời Mới Đất Mới'],
    purpose: 'Cảnh báo chống lạc giáo và kêu gọi tăng trưởng trong ân sủng.',
    structure: [
      { section: 'Ơn gọi nên thánh & Biến hình', chapters: '1', description: 'Chúng tôi đã tận mắt thấy vinh quang Người' },
      { section: 'Vạch trần thầy dạy giả hiệu', chapters: '2', description: 'Hình phạt dành cho kẻ dụ dỗ' },
      { section: 'Ngày Chúa đến & Đất mới trời mới', chapters: '3', description: 'Một ngày đối với Chúa như ngàn năm' }
    ],
    keyFigures: ['Phêrô', 'Phaolô (được nhắc đến như người anh em quý mến)'],
    keyVerses: [
      { reference: '2Pr 1,4', text: 'Nhờ đó, Người đã ban cho chúng ta những ơn lành vô giá, để anh em được thông phần bản tính thần linh.' },
      { reference: '2Pr 3,9', text: 'Chúa không chậm trễ thực hiện lời hứa... nhưng Người kiên nhẫn đối với anh em, vì không muốn ai phải diệt vong.' }
    ],
    theologicalSignificance: 'Giáo lý thần hóa (Theosis / Divinisatio): con người nhờ ân sủng được thông phần vào bản tính Thiên Chúa.'
  },
  {
    id: '1john',
    code: '1JN',
    name: '1 Gioan',
    latinName: '1 Ioannis',
    abbreviation: '1Ga',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 5,
    order: 69,
    overview: 'Bức thư tuyệt trần về Tình Yêu: "Thiên Chúa là Tình Yêu", dấu chỉ người con của Chúa là yêu thương anh em và giữ các điều răn.',
    authorTradition: 'Thánh Gioan Tông đồ.',
    compositionPeriod: 'Khoảng năm 90 - 100 SCN tại Êphêsô.',
    historicalContext: 'Những kẻ Ngộ đạo (Docetism) phủ nhận Chúa Giêsu mang thân xác thật.',
    mainThemes: ['Thiên Chúa là Ánh Sáng và Tình Yêu', 'Đức bác ái huynh đệ', 'Nhận ra Ngụy Kitô'],
    purpose: 'Củng cố niềm xác tín rằng ai yêu thương thì đã được sinh ra bởi Thiên Chúa.',
    structure: [
      { section: 'Lời sự sống & Đi trong ánh sáng', chapters: '1-2', description: 'Máu Chúa Giêsu thanh tẩy tội lỗi' },
      { section: 'Con cái Thiên Chúa & Tình yêu', chapters: '3', description: 'Đừng yêu nơi đầu môi chót lưỡi' },
      { section: 'Thiên Chúa là Tình Yêu & Đức tin chiến thắng', chapters: '4-5', description: 'Ai ở trong tình yêu thì ở trong Thiên Chúa' }
    ],
    keyFigures: ['Gioan'],
    keyVerses: [
      { reference: '1Ga 4,8', text: 'Ai không yêu thương thì không nhận biết Thiên Chúa, vì Thiên Chúa là Tình Yêu.' },
      { reference: '1Ga 4,19', text: 'Chúng ta hãy yêu thương, vì chính Người đã yêu thương chúng ta trước.' }
    ],
    theologicalSignificance: 'Định nghĩa thần học cao nhất của mạc khải Kitô giáo: "Deus Caritas Est" (Thiên Chúa là Tình Yêu).'
  },
  {
    id: '2john',
    code: '2JN',
    name: '2 Gioan',
    latinName: '2 Ioannis',
    abbreviation: '2Ga',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 1,
    order: 70,
    overview: 'Lá thư ngắn (13 câu) gửi "Bà được tuyển chọn": sống trong Chân Lý và Tình Yêu, cảnh giác trước những kẻ lừa dối từ chối Đức Kitô nhập thể.',
    authorTradition: 'Thánh Gioan ("Vị Niên Trưởng").',
    compositionPeriod: 'Khoảng năm 95 SCN.',
    historicalContext: 'Các thầy dạy tà thuyết đi rảo khắp các cộng đoàn.',
    mainThemes: ['Chân Lý và Tình Thương', 'Cảnh giác kẻ lừa dối'],
    purpose: 'Bảo vệ cộng đoàn khỏi sự xâm nhập của giáo thuyết ngộ đạo.',
    structure: [
      { section: 'Lời mở & Sống trong Chân lý', chapters: '1,1-6', description: 'Yêu thương theo điều răn' },
      { section: 'Cảnh giác kẻ phản Kitô', chapters: '1,7-13', description: 'Kẻ chối Chúa Giêsu đến trong xác phàm' }
    ],
    keyFigures: ['Gioan ("Trưởng lão")', 'Bà được tuyển chọn (Hội Thánh địa phương)'],
    keyVerses: [
      { reference: '2Ga 1,6', text: 'Tình yêu là sống theo các điều răn của Người.' }
    ],
    theologicalSignificance: 'Sự gắn kết bất khả phân giữa Chân Lý đức tin và Tình Bác Ái thực thi.'
  },
  {
    id: '3john',
    code: '3JN',
    name: '3 Gioan',
    latinName: '3 Ioannis',
    abbreviation: '3Ga',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 1,
    order: 71,
    overview: 'Khen ngợi lòng hiếu khách tiếp đón các thừa sai truyền giáo của ông Gai-út và lên án thói độc đoán của Đi-ô-trê-phét.',
    authorTradition: 'Thánh Gioan Tông đồ.',
    compositionPeriod: 'Khoảng năm 95 SCN.',
    historicalContext: 'Mạng lưới các nhà truyền giáo lưu động thời Giáo Hội sơ khai.',
    mainThemes: ['Lòng hiếu khách truyền giáo', 'Hiệp tác cho Chân Lý', 'Tránh thói kiêu ngạo lộng quyền'],
    purpose: 'Khuyến khích tín hữu cộng tác và nâng đỡ các thừa sai Tin Mừng.',
    structure: [
      { section: 'Khen ngợi ông Gai-út', chapters: '1,1-8', description: 'Tiếp đón anh em truyền giáo' },
      { section: 'Khiển trách Đi-ô-trê-phét & Khen Đê-mê-tri-ô', chapters: '1,9-15', description: 'Ai làm điều thiện thì thuộc về Chúa' }
    ],
    keyFigures: ['Gioan', 'Gai-út', 'Đi-ô-trê-phét', 'Đê-mê-tri-ô'],
    keyVerses: [
      { reference: '3Ga 1,8', text: 'Chúng ta có bổn phận đón tiếp những người như thế, để cùng hiệp tác cho Chân Lý.' }
    ],
    theologicalSignificance: 'Bài học mục vụ về tinh thần đồng trách nhiệm truyền giáo và cảnh giác thói độc đoán giáo quyền.'
  },
  {
    id: 'jude',
    code: 'JD',
    name: 'Giu-đa',
    latinName: 'Iudae',
    abbreviation: 'Gđ',
    testament: 'NEW',
    category: 'EPISTLES',
    categoryName: 'Thư Tín',
    chaptersCount: 1,
    order: 72,
    overview: 'Chiến đấu vì đức tin đã được trao phó một lần cho các thánh, vạch mặt kẻ vô đạo biến ân sủng thành trò trụy lạc và kinh tụng kết thúc vinh quang.',
    authorTradition: 'Thánh Giuđa Tông đồ (Giuđa Tađêô), anh em của Giacôbê.',
    compositionPeriod: 'Khoảng năm 65 - 75 SCN.',
    historicalContext: 'Tà thuyết phóng túng xâm nhập gây băng hoại đời sống luân lý tín hữu.',
    mainThemes: ['Chiến đấu bảo vệ đức tin duy nhất', 'Hình phạt những kẻ nổi loạn', 'Kinh tụng ngợi khen Chúa'],
    purpose: 'Báo động nguy cơ lạc giáo phá hủy nền tảng Hội Thánh từ bên trong.',
    structure: [
      { section: 'Cảnh báo lạc giáo phóng túng', chapters: '1,1-16', description: 'Số phận của các thiên thần sa ngã và Xơ-đôm' },
      { section: 'Khuyên nhủ tín hữu kiên trì', chapters: '1,17-25', description: 'Kinh tán tụng Đấng gìn giữ khỏi vấp ngã' }
    ],
    keyFigures: ['Giuđa Tông đồ', 'Tổng lãnh thiên thần Micae'],
    keyVerses: [
      { reference: 'Gđ 1,3', text: 'Hãy chiến đấu cho đức tin đã được trao phó cho các thánh một lần là đủ muôn đời.' },
      { reference: 'Gđ 1,24-25', text: 'Kính dâng Đấng có quyền năng gìn giữ anh em khỏi vấp ngã... vinh quang và uy quyền muôn đời!' }
    ],
    theologicalSignificance: 'Tín lý về Kho tàng Đức Tin duy nhất (Depositum Fidei) được trao ban bất di bất dịch cho Hội Thánh.'
  },

  // --------------------------------------------------------------------------
  // TÂN ƯỚC: V. KHẢI HUYỀN (1 SÁCH)
  // --------------------------------------------------------------------------
  {
    id: 'rev',
    code: 'RV',
    name: 'Khải Huyền',
    latinName: 'Apocalypsis',
    abbreviation: 'Kh',
    testament: 'NEW',
    category: 'REVELATION',
    categoryName: 'Khải Huyền',
    chaptersCount: 22,
    order: 73,
    overview: 'Cuốn sách khép lại bộ Kinh Thánh ngập tràn thị kiến biểu tượng: chiến thắng tất yếu của Con Chiên Vượt Qua, Tiệc Cưới Con Chiên và Trời Mới Đất Mới.',
    authorTradition: 'Thánh Gioan Tông đồ tại đảo Pátmô.',
    compositionPeriod: 'Khoảng năm 95 SCN thời hoàng đế Đômitianô bách hại.',
    historicalContext: 'Bảy Hội Thánh Tiểu Á đối diện nguy cơ tử đạo và bách hại khốc liệt.',
    mainThemes: ['Con Chiên khải hoàn (Agnus Dei)', 'Phụng vụ Thiên Quốc', 'Sự sụp đổ của Babylon tội lỗi', 'Giêrusalem Mới từ trời xuống'],
    purpose: 'Củng cố niềm hy vọng kiên vững của Hội Thánh tử đạo: Chúa Giêsu sẽ sớm chiến thắng trong vinh quang.',
    structure: [
      { section: 'Thị kiến khai mạc & Thư gửi 7 Hội Thánh', chapters: '1-3', description: 'Đấng Phục Sinh ngự giữa 7 chân đèn' },
      { section: 'Phụng vụ Thiên quốc & Cuộn sách 7 ấn', chapters: '4-7', description: 'Con Chiên mở sách, 144.000 người' },
      { section: 'Bảy tiếng loa & Chiến trận vũ trụ', chapters: '8-14', description: 'Người Phụ Nữ mặc mặt trời và Con Rồng đỏ' },
      { section: 'Bát tai ương & Babylon sụp đổ', chapters: '15-18', description: 'Sự phán xét công minh' },
      { section: 'Tiệc Cưới Con Chiên & Trời Mới Đất Mới', chapters: '19-22', description: 'Al-lê-lui-a, Giêrusalem Mới, Xin Chúa ngự đến!' }
    ],
    keyFigures: ['Con Chiên', 'Người Phụ Nữ mặc áo mặt trời', 'Tổng Lãnh Thiên Thần Micae', 'Gioan'],
    keyVerses: [
      { reference: 'Kh 5,12', text: 'Con Chiên đã bị giết nay xứng đáng lãnh nhận quyền năng và phú quý, vinh quang và lời chúc tụng!' },
      { reference: 'Kh 21,4', text: 'Thiên Chúa sẽ lau sạch nước mắt họ. Sẽ không còn sự chết, tang tóc hay đau khổ nữa.' },
      { reference: 'Kh 22,20', text: 'Amen! Lạy Chúa Giêsu, xin ngự đến!' }
    ],
    theologicalSignificance: 'Mẫu mực tuyệt đỉnh của Phụng vụ Thánh Lễ trên trần gian thông hiệp với Phụng vụ Thiên Quốc muôn đời.'
  }
];

export const CATHOLIC_BOOK_CATEGORIES = [
  { id: 'ALL', name: 'Tất cả 73 Sách' },
  { id: 'OLD', name: 'Cựu Ước (46 Sách)' },
  { id: 'NEW', name: 'Tân Ước (27 Sách)' },
  { id: 'PENTATEUCH', name: 'Ngũ Thư (5)' },
  { id: 'HISTORICAL', name: 'Lịch Sử (16)' },
  { id: 'WISDOM', name: 'Khôn Ngoan (7)' },
  { id: 'PROPHETS', name: 'Ngôn Sứ (18)' },
  { id: 'GOSPELS', name: 'Tin Mừng (4)' },
  { id: 'ACTS', name: 'Tông Đồ Công Vụ (1)' },
  { id: 'EPISTLES', name: 'Thư Tín (21)' },
  { id: 'REVELATION', name: 'Khải Huyền (1)' },
];

export const CATHOLIC_BOOKS = CATHOLIC_BIBLE_BOOKS;
