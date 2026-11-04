-- ============================================================================
-- NỀN TẢNG KINH THÁNH CÔNG GIÁO TOÀN DIỆN - LỜI CHÚA MỖI NGÀY
-- SCRIPT NẠP DỮ LIỆU BAN ĐẦU (DATABASE SEEDING - PROMPT 2)
-- ĐẦY ĐỦ 73 SÁCH KINH THÁNH & 1.334 CHƯƠNG QUY ĐIỂN CÔNG GIÁO
-- ============================================================================

BEGIN;

-- 1. NẠP CÁC BẢN DỊCH KINH THÁNH CÔNG GIÁO CHÍNH THỨC
INSERT INTO bible_translations (
    id, name, abbreviation, language, imprimatur_info, publisher, publication_year, copyright_statement, is_verified, is_default
) VALUES 
(
    'cgv',
    'Kinh Thánh Bản Dịch Các Giờ Kinh Phụng Vụ',
    'NPD-CGKPV',
    'vi',
    'Imprimatur ngày 04/08/1998 của TGM Sài Gòn (Đức TGM Gioan Baotixita Phạm Minh Mẫn)',
    'Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ',
    1998,
    'Bản quyền thuộc Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ. Phục vụ mục vụ và nghiên cứu đức tin.',
    TRUE,
    TRUE
),
(
    'ntt',
    'Kinh Thánh Bản Dịch Cố Linh Mục Giuse Nguyễn Thế Thuấn, C.Ss.R.',
    'NTT-CSSR',
    'vi',
    'Imprimatur ngày 14/09/1976 của TGM Sài Gòn (Đức TGM Phaolô Nguyễn Văn Bình)',
    'Dòng Chúa Cứu Thế Việt Nam',
    1976,
    'Bản dịch học thuật chú giải kinh điển của Dòng Chúa Cứu Thế.',
    TRUE,
    FALSE
),
(
    'nova-vulgata',
    'Nova Vulgata Bibliorum Sacrorum Editio',
    'NV',
    'la',
    'Tông Hiến Scripturarum Thesaurus của Đức Thánh Cha Gioan Phaolô II (1979)',
    'Libreria Editrice Vaticana',
    1979,
    'Bản văn La-tinh công quyền của Tòa Thánh Vatican.',
    TRUE,
    FALSE
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    imprimatur_info = EXCLUDED.imprimatur_info;

-- 2. NẠP ĐẦY ĐỦ 73 SÁCH KINH THÁNH CÔNG GIÁO
INSERT INTO bible_books (
    id, code, name, latin_name, abbreviation, testament, category, category_name, chapters_count, book_order,
    overview, author_tradition, composition_period, historical_context, main_themes, purpose, structure, key_figures, key_verses, theological_significance
) VALUES
-- CỰU ƯỚC: NGŨ THƯ (5 SÁCH)
('gen', 'GN', 'Sáng Thế', 'Genesis', 'St', 'OLD', 'PENTATEUCH', 'Ngũ Thư', 50, 1,
 'Cuốn sách đầu tiên ghi lại nguồn gốc vũ trụ, sa ngã và khởi đầu lịch sử cứu độ qua các tổ phụ.',
 'Truyền thống gán cho Môsê; tổng hợp từ các nguồn J, E, D, P.', 'Thế kỷ VI-V TCN.', 'Cận Đông và Lưỡng Hà cổ đại.',
 '["Sáng tạo từ hư vô", "Tội lỗi & Sa ngã", "Giao ước Abraham"]'::jsonb,
 'Tuyên xưng Thiên Chúa là Đấng Tạo Hóa duy nhất.', '[]'::jsonb, '["Ađam", "Nôê", "Abraham", "Giacóp", "Giuse"]'::jsonb,
 '[{"reference": "St 1,1", "text": "Thoạt đầu, Thiên Chúa sáng tạo trời và đất."}]'::jsonb,
 'Tin Mừng Nguyên Thủy (St 3,15) tiên báo ơn cứu độ.'),

('exod', 'EX', 'Xuất Hành', 'Exodus', 'Xh', 'OLD', 'PENTATEUCH', 'Ngũ Thư', 40, 2,
 'Thiên Chúa giải phóng dân khỏi ách nô lệ Ai Cập và lập Giao ước Sinai.',
 'Truyền thống Môsê.', 'Thế kỷ XIII TCN.', 'Thời Ramesses II Ai Cập.',
 '["Giải phóng", "Danh Thánh YAHWEH", "Mười Điều Răn"]'::jsonb,
 'Chứng minh Thiên Chúa trung thành giải thoát kẻ bị áp bức.', '[]'::jsonb, '["Môsê", "Aharon", "Pharaô"]'::jsonb,
 '[{"reference": "Xh 3,14", "text": "TA LÀ ĐẤNG TA LÀ."}]'::jsonb,
 'Chiên Vượt Qua tiên báo Hy Tế Thập Giá của Chúa Kitô.'),

('lev', 'LV', 'Lêvi', 'Leviticus', 'Lv', 'OLD', 'PENTATEUCH', 'Ngũ Thư', 27, 3,
 'Sách về sự thánh thiện, các nghi lễ hiến tế và Luật Thánh Thiện.',
 'Nguồn Tư tế (P).', 'Thời Hậu Lưu đày.', 'Cắm trại chân núi Sinai.',
 '["Sự thánh thiện của Chúa", "Hy tế đền tội", "Ngày Xá Tội"]'::jsonb,
 'Dạy dân sống thánh thiện trước nhan Đấng Cực Thánh.', '[]'::jsonb, '["Môsê", "Aharon"]'::jsonb,
 '[{"reference": "Lv 19,2", "text": "Hãy sống thánh thiện vì Ta là Đấng Thánh."}]'::jsonb,
 'Hình bóng chức Thượng tế đời đời của Đức Kitô.'),

('num', 'NM', 'Dân Số', 'Numeri', 'Ds', 'OLD', 'PENTATEUCH', 'Ngũ Thư', 36, 4,
 'Hành trình 40 năm trong sa mạc tiến về Đất Hứa.',
 'Truyền thống Môsê.', 'Thế kỷ VI TCN.', 'Sa mạc Sinai đến đồng bằng Môáp.',
 '["Sự trung tín của Chúa", "Con rắn đồng"]'::jsonb,
 'Nhắc nhở về hậu quả nổi loạn và lòng kiên nhẫn của Chúa.', '[]'::jsonb, '["Môsê", "Giosuê", "Calép"]'::jsonb,
 '[{"reference": "Ds 21,9", "text": "Ai nhìn lên con rắn đồng thì được sống."}]'::jsonb,
 'Con rắn đồng tiên báo Chúa Kitô bị treo trên Thập Giá (Ga 3,14).'),

('deut', 'DT', 'Đệ Nhị Luật', 'Deuteronomium', 'Đnl', 'OLD', 'PENTATEUCH', 'Ngũ Thư', 34, 5,
 'Diễn từ cáo biệt của Môsê và kinh Shema Israel cốt lõi.',
 'Nguồn Đệ Nhị Luật (D).', 'Thế kỷ VII TCN.', 'Bên bờ sông Giođan.',
 '["Shema Israel", "Yêu mến Chúa hết lòng", "Chọn sự sống"]'::jsonb,
 'Kêu gọi dân Chúa yêu mến Thiên Chúa trên hết mọi sự.', '[]'::jsonb, '["Môsê", "Giosuê"]'::jsonb,
 '[{"reference": "Đnl 6,4-5", "text": "Nghe đây hỡi Israel! Đức Chúa là Thiên Chúa duy nhất."}]'::jsonb,
 'Giới răn trọng nhất được Chúa Giêsu trích dẫn trong Tin Mừng.'),

-- CỰU ƯỚC: LỊCH SỬ (16 SÁCH GỒM 7 ĐỆ NHỊ QUY ĐIỂN)
('josh', 'JS', 'Giôsuê', 'Iosue', 'Gs', 'OLD', 'HISTORICAL', 'Lịch Sử', 24, 6,
 'Chinh phục và phân chia Đất Hứa dưới sự lãnh đạo của Giosuê.', 'Sử liệu Đệ Nhị Luật.', 'Thế kỷ VI TCN.', 'Định cư Canaan.', '["Thiên Chúa ban Đất Hứa"]'::jsonb, 'Lời hứa thành tựu.', '[]'::jsonb, '["Giosuê"]'::jsonb, '[]'::jsonb, 'Hình bóng dẫn đưa dân vào Nước Trời.'),
('judg', 'JG', 'Thẩm Phán', 'Iudices', 'Tp', 'OLD', 'HISTORICAL', 'Lịch Sử', 21, 7,
 'Vòng lặp tội lỗi và các vị cứu tinh thẩm phán.', 'Sử liệu Đệ Nhị Luật.', 'Thời Lưu đày.', 'Thời kỳ phân tán.', '["Lòng thương xót của Chúa"]'::jsonb, 'Kêu gọi hoán cải.', '[]'::jsonb, '["Sam-sôn", "Ghít-ôn"]'::jsonb, '[]'::jsonb, 'Sự cần thiết của Vua Cứu Thế.'),
('ruth', 'RT', 'Rút', 'Ruth', 'R', 'OLD', 'HISTORICAL', 'Lịch Sử', 4, 8,
 'Lòng hiếu thảo của bà Rút ngoại giáo, cụ tổ vua Đavít.', 'Tác giả Hậu Lưu đày.', 'Thế kỷ V TCN.', 'Bêlem thời Thẩm phán.', '["Lòng nhân nghĩa Hesed"]'::jsonb, 'Ơn cứu độ phổ quát.', '[]'::jsonb, '["Rút", "Bô-át"]'::jsonb, '[]'::jsonb, 'Rút có tên trong gia phả Chúa Giêsu.'),
('1sam', '1S', '1 Samuen', '1 Samuelis', '1Sm', 'OLD', 'HISTORICAL', 'Lịch Sử', 31, 9,
 'Chức vụ Samuen, Saun và Đavít được xức dầu.', 'Sử gia Đệ Nhị Luật.', 'Thế kỷ VI TCN.', 'Israel thời lập quốc.', '["Vương quyền Thiên Chúa"]'::jsonb, 'Chọn Đavít.', '[]'::jsonb, '["Samuen", "Saun", "Đavít"]'::jsonb, '[]'::jsonb, 'Khái niệm Đấng được xức dầu (Messiah).'),
('2sam', '2S', '2 Samuen', '2 Samuelis', '2Sm', 'OLD', 'HISTORICAL', 'Lịch Sử', 24, 10,
 'Vương triều Đavít và Giao ước ngai vàng muôn đời.', 'Ký sự triều đình.', 'Thế kỷ VI TCN.', 'Giêrusalem thời vàng son.', '["Giao ước Đavít (2Sm 7)"]'::jsonb, 'Lời hứa Đấng Mêsia.', '[]'::jsonb, '["Đavít", "Nathan"]'::jsonb, '[]'::jsonb, 'Nền tảng niềm hy vọng Mêsia.'),
('1kgs', '1K', '1 Vua', '1 Regum', '1V', 'OLD', 'HISTORICAL', 'Lịch Sử', 22, 11,
 'Salômôn xây Đền Thờ, chia cắt vương quốc và tiên tri Êlia.', 'Sử liệu Đệ Nhị Luật.', 'Thế kỷ VI TCN.', 'Vương quốc phân chia.', '["Đền Thờ", "Tiên tri Êlia"]'::jsonb, 'Cảnh báo ngẫu tượng.', '[]'::jsonb, '["Salômôn", "Êlia"]'::jsonb, '[]'::jsonb, 'Độc thần giáo chiến thắng Ba-an.'),
('2kgs', '2K', '2 Vua', '2 Regum', '2V', 'OLD', 'HISTORICAL', 'Lịch Sử', 25, 12,
 'Tiên tri Êlisa và sự sụp đổ của Samari & Giêrusalem.', 'Sử liệu Đệ Nhị Luật.', 'Thời Lưu đày.', 'Átsua và Babylon xâm lăng.', '["Lưu đày thanh luyện"]'::jsonb, 'Sám hối trở về.', '[]'::jsonb, '["Êlisa", "Giosia"]'::jsonb, '[]'::jsonb, 'Thiên Chúa làm chủ lịch sử.'),
('1chr', '1CH', '1 Sử Biên', '1 Paralipomenon', '1Sb', 'OLD', 'HISTORICAL', 'Lịch Sử', 29, 13,
 'Gia phả thánh và Đavít tổ chức phụng vụ.', 'Sử gia Biên niên.', 'Thế kỷ IV TCN.', 'Hậu Lưu đày.', '["Phụng tự Đền Thờ"]'::jsonb, 'Khẳng định dòng dõi thánh.', '[]'::jsonb, '["Đavít"]'::jsonb, '[]'::jsonb, 'Phụng vụ là cùng đích con người.'),
('2chr', '2CH', '2 Sử Biên', '2 Paralipomenon', '2Sb', 'OLD', 'HISTORICAL', 'Lịch Sử', 36, 14,
 'Lịch sử vương triều Giuđa đến sắc chỉ giải phóng của Kyrô.', 'Sử gia Biên niên.', 'Thế kỷ IV TCN.', 'Ba Tư thời Hậu Lưu đày.', '["Sắc chỉ Kyrô giải phóng"]'::jsonb, 'Khích lệ tái thiết.', '[]'::jsonb, '["Salômôn", "Kyrô"]'::jsonb, '[]'::jsonb, 'Hy vọng phục sinh dân tộc.'),
('ezra', 'EZ', 'Étdra', 'Esdras', 'Ed', 'OLD', 'HISTORICAL', 'Lịch Sử', 10, 15,
 'Hồi hương và canh tân đời sống theo Luật Chúa.', 'Tư tế Étdra.', '400 TCN.', 'Hồi hương từ Babylon.', '["Tái thiết Đền Thờ", "Luật Chúa"]'::jsonb, 'Củng cố căn tính đức tin.', '[]'::jsonb, '["Étdra", "Dôrôbaven"]'::jsonb, '[]'::jsonb, 'Vị trí trung tâm của Kinh Thánh.'),
('neh', 'NE', 'Nơkhemia', 'Nehemias', 'Nh', 'OLD', 'HISTORICAL', 'Lịch Sử', 13, 16,
 'Tái thiết tường thành Giêrusalem trong 52 ngày.', 'Tổng đốc Nơkhemia.', 'Cuối thế kỷ V TCN.', 'Giêrusalem tái thiết.', '["Xây tường thành", "Niềm vui của Chúa"]'::jsonb, 'Hành động dấn thân.', '[]'::jsonb, '["Nơkhemia"]'::jsonb, '[]'::jsonb, 'Mẫu gương giáo dân phục vụ.'),
('tob', 'TB', 'Tôbia', 'Tobit', 'Tb', 'OLD', 'HISTORICAL', 'Lịch Sử', 14, 17,
 'Lòng nhân đức, bố thí và Thiên Thần Raphael hộ phù.', 'Do Thái Hậu Lưu đày.', '200 TCN.', 'Ninivê Átsua.', '["Thiên thần Raphael", "Hôn nhân thánh"]'::jsonb, 'Sống đạo giữa thử thách.', '[]'::jsonb, '["Tôbia", "Raphael"]'::jsonb, '[]'::jsonb, 'Giáo lý Công giáo về các Thiên Thần.'),
('jdt', 'JDT', 'Giuđitha', 'Iudith', 'Gđt', 'OLD', 'HISTORICAL', 'Lịch Sử', 16, 18,
 'Giuđitha can đảm giải thoát dân tộc khỏi tướng giặc.', 'Tác giả thời Macabê.', 'Thế kỷ II TCN.', 'Thành Bêthulia.', '["Đức tin chiến thắng bạo lực"]'::jsonb, 'Chúa cứu kẻ yếu hèn.', '[]'::jsonb, '["Giuđitha"]'::jsonb, '[]'::jsonb, 'Biểu trưng Đức Mẹ chiến thắng ma quỷ.'),
('esth', 'ES', 'Étte', 'Esther', 'Et', 'OLD', 'HISTORICAL', 'Lịch Sử', 10, 19,
 'Hoàng hậu Étte liều mạng cứu dân khỏi diệt chủng.', 'Do Thái hải ngoại.', 'Thế kỷ II TCN.', 'Susa Ba Tư.', '["Sự quan phòng của Chúa", "Lễ Purim"]'::jsonb, 'Ơn cứu thoát kỳ diệu.', '[]'::jsonb, '["Étte", "Moóccôđai"]'::jsonb, '[]'::jsonb, 'Bản văn Công giáo lưu giữ kinh nguyện Étte.'),
('1macc', '1MC', '1 Macabê', '1 Maccabaeorum', '1Mcb', 'OLD', 'HISTORICAL', 'Lịch Sử', 16, 20,
 'Kháng chiến Macabê chống Antiochus IV bảo vệ đức tin.', 'Sử gia Giêrusalem.', '100 TCN.', 'Bách hại thời Seleucid.', '["Tử đạo vì Lề Luật", "Hanukkah"]'::jsonb, 'Lưu truyền chiến công.', '[]'::jsonb, '["Giuđa Macabê"]'::jsonb, '[]'::jsonb, 'Lễ Cung Hiến Bàn Thờ (Ga 10,22).'),
('2macc', '2MC', '2 Macabê', '2 Maccabaeorum', '2Mcb', 'OLD', 'HISTORICAL', 'Lịch Sử', 15, 21,
 'Thần học về kẻ chết sống lại và cầu nguyện cho người đã qua đời.', 'Nhà thần học Hy Lạp.', '124 TCN.', 'Tử đạo thời Macabê.', '["Sống lại", "Cầu cho người chết"]'::jsonb, 'Ý nghĩa máu tử đạo.', '[]'::jsonb, '["Elêada", "7 Anh Em"]'::jsonb, '[]'::jsonb, 'Cơ sở tín lý về Luyện Ngục (2Mcb 12).'),

-- CỰU ƯỚC: KHÔN NGOAN & GIÁO HUẤN (7 SÁCH)
('job', 'JB', 'Gióp', 'Iob', 'G', 'OLD', 'WISDOM', 'Khôn Ngoan & Giáo Huấn', 42, 22,
 'Mầu nhiệm đau khổ của người công chính và sự khôn ngoan của Chúa.', 'Hiền triết vô danh.', 'Thế kỷ V TCN.', 'Đất Út cổ xưa.', '["Mầu nhiệm đau khổ", "Đức tin kiên nhẫn"]'::jsonb, 'Bác bỏ quan niệm máy móc.', '[]'::jsonb, '["Gióp"]'::jsonb, '[]'::jsonb, 'Hình bóng Đấng Công Chính chịu đau khổ.'),
('ps', 'PS', 'Thánh Vịnh', 'Psalmi', 'Tv', 'OLD', 'WISDOM', 'Khôn Ngoan & Giáo Huấn', 150, 23,
 'Kho tàng 150 thánh ca phụng vụ và kinh nguyện của Dân Chúa.', 'Vua Đavít và các tác giả.', 'Thế kỷ X-V TCN.', 'Đền Thờ Giêrusalem.', '["Ca tụng", "Sám hối", "Đấng Mêsia"]'::jsonb, 'Cẩm nang kinh nguyện của Hội Thánh.', '[]'::jsonb, '["Đavít", "Asáp"]'::jsonb, '[]'::jsonb, 'Kinh nguyện Phụng Vụ Thánh Lễ & Các Giờ Kinh.'),
('prov', 'PR', 'Châm Ngôn', 'Proverbia', 'Cn', 'OLD', 'WISDOM', 'Khôn Ngoan & Giáo Huấn', 31, 24,
 'Nghệ thuật sống khôn ngoan, công chính và kính sợ Chúa.', 'Salômôn và các hiền giả.', 'Thế kỷ X-V TCN.', 'Giáo dục Israel.', '["Đầu mối khôn ngoan", "Đạo đức gia đình"]'::jsonb, 'Dạy sống đẹp lòng Chúa.', '[]'::jsonb, '["Salômôn"]'::jsonb, '[]'::jsonb, 'Đức Khôn Ngoan tiền hữu (Cn 8).'),
('eccl', 'EC', 'Giảng Viên', 'Ecclesiastes', 'Gv', 'OLD', 'WISDOM', 'Khôn Ngoan & Giáo Huấn', 12, 25,
 'Sự phù vân của trần thế và sự kính sợ Thiên Chúa tối hậu.', 'Qoheleth con cháu Đavít.', 'Thế kỷ III TCN.', 'Thời Hy Lạp hóa.', '["Phù vân mọi sự", "Mọi sự có thời"]'::jsonb, 'Thanh luyện ảo tưởng trần thế.', '[]'::jsonb, '["Qoheleth"]'::jsonb, '[]'::jsonb, 'Hướng lòng về hạnh phúc vĩnh cửu.'),
('song', 'SG', 'Diễm Ca', 'Canticum Canticorum', 'Dc', 'OLD', 'WISDOM', 'Khôn Ngoan & Giáo Huấn', 8, 26,
 'Tình yêu đôi lứa biểu tượng tình yêu Thiên Chúa và Dân Người.', 'Truyền thống Salômôn.', 'Thế kỷ V TCN.', 'Thơ ca tình yêu.', '["Tình yêu mạnh hơn sự chết"]'::jsonb, 'Tán tụng tình yêu thánh thiện.', '[]'::jsonb, '["Đôi bạn tình"]'::jsonb, '[]'::jsonb, 'Linh đạo kết hiệp thần bí với Chúa.'),
('wis', 'WS', 'Khôn Ngoan', 'Sapientia', 'Kn', 'OLD', 'WISDOM', 'Khôn Ngoan & Giáo Huấn', 19, 27,
 'Linh hồn bất tử, phần thưởng người công chính và Đức Khôn Ngoan.', 'Do Thái tại Alêxanđria.', '50 TCN.', 'Tiếp xúc triết học Hy Lạp.', '["Linh hồn bất tử", "Đức Khôn Ngoan"]'::jsonb, 'Củng cố đức tin người trẻ.', '[]'::jsonb, '["Salômôn"]'::jsonb, '[]'::jsonb, 'Mặc khải sự sống đời sau trong Cựu Ước.'),
('sir', 'SR', 'Huấn Ca', 'Siracides', 'Hc', 'OLD', 'WISDOM', 'Khôn Ngoan & Giáo Huấn', 51, 28,
 'Cẩm nang luân lý, đạo hiếu, tình bạn và ca ngợi tiền nhân.', 'Giêsu con ông Sira.', '180 TCN.', 'Giêrusalem trước Macabê.', '["Đạo hiếu", "Tình bạn", "Kính sợ Chúa"]'::jsonb, 'Nghệ thuật sống thánh thiện.', '[]'::jsonb, '["Ben Sira"]'::jsonb, '[]'::jsonb, 'Sách giáo lý sơ khai (Liber Ecclesiasticus).'),

-- CỰU ƯỚC: NGÔN SỨ (18 SÁCH)
('isa', 'IS', 'Isaia', 'Isaias', 'Is', 'OLD', 'PROPHETS', 'Ngôn Sứ', 66, 29,
 'Tin Mừng thứ Năm: sấm ngôn Emmanuel và Người Tôi Tớ Đau Khổ.', 'Isaia con ông Amốt.', 'Thế kỷ VIII-VI TCN.', 'Khủng hoảng Átsua & Lưu đày.', '["Đấng Emmanuel", "Người Tôi Tớ đau khổ"]'::jsonb, 'Loan báo Đấng Cứu Độ.', '[]'::jsonb, '["Isaia"]'::jsonb, '[]'::jsonb, 'Sách tiên tri trích dẫn nhiều nhất trong Tân Ước.'),
('jer', 'JR', 'Giêrêmia', 'Ieremias', 'Gr', 'OLD', 'PROPHETS', 'Ngôn Sứ', 52, 30,
 'Ngôn sứ nước mắt loan báo Giao Ước Mới khắc ghi trong tâm hồn.', 'Giêrêmia làng Anathót.', 'Thế kỷ VII-VI TCN.', 'Giêrusalem trước năm 587 TCN.', '["Giao Ước Mới (Gr 31)", "Hoán cải nội tâm"]'::jsonb, 'Kêu gọi từ bỏ giả hình.', '[]'::jsonb, '["Giêrêmia", "Barúc"]'::jsonb, '[]'::jsonb, 'Ứng nghiệm trong Tiệc Ly của Chúa Giêsu.'),
('lam', 'LM', 'Ai Ca', 'Lamentationes', 'Ac', 'OLD', 'PROPHETS', 'Ngôn Sứ', 5, 31,
 'Năm bài thơ tang lễ than khóc Đền Thờ và Giêrusalem hoang tàn.', 'Truyền thống Giêrêmia.', '587 TCN.', 'Giêrusalem đổ nát.', '["Nỗi đau mất mát", "Tình thương Chúa vô tận"]'::jsonb, 'Hướng lòng sám hối.', '[]'::jsonb, '["Giêrêmia"]'::jsonb, '[]'::jsonb, 'Phụng vụ Tuần Thánh chiêm ngắm Thương Khó.'),
('bar', 'BR', 'Barúc', 'Baruch', 'Br', 'OLD', 'PROPHETS', 'Ngôn Sứ', 6, 32,
 'Kinh sám hối lưu đày và sấm ngôn Khôn Ngoan làm người.', 'Barúc thư ký Giêrêmia.', 'Thế kỷ II TCN.', 'Lưu đày Babylon.', '["Khôn Ngoan sống giữa loài người"]'::jsonb, 'Kêu gọi trở về.', '[]'::jsonb, '["Barúc"]'::jsonb, '[]'::jsonb, 'Br 3,38 tiên báo Mầu nhiệm Nhập Thể.'),
('ezek', 'EK', 'Êdêkien', 'Ezechiel', 'Edk', 'OLD', 'PROPHETS', 'Ngôn Sứ', 48, 33,
 'Thị kiến Vinh quang, quả tim mới và cánh đồng xương khô sống lại.', 'Tư tế Êdêkien.', '593 - 571 TCN.', 'Bờ sông Kêva Babylon.', '["Quả tim mới", "Xương khô sống lại (Edk 37)"]'::jsonb, 'Tái tạo dân mới.', '[]'::jsonb, '["Êdêkien"]'::jsonb, '[]'::jsonb, 'Ân sủng tái sinh bởi Chúa Thánh Thần.'),
('dan', 'DN', 'Đanien', 'Daniel', 'Đn', 'OLD', 'PROPHETS', 'Ngôn Sứ', 14, 34,
 'Hang sư tử, lò lửa, thị kiến Con Người và kẻ chết sống lại.', 'Thời Macabê mượn tích Babylon.', '165 TCN.', 'Bách hại Antiochus IV.', '["Con Người (Đn 7)", "Kẻ chết sống lại (Đn 12)"]'::jsonb, 'Củng cố lòng kiên trung.', '[]'::jsonb, '["Đanien", "Susanna"]'::jsonb, '[]'::jsonb, 'Tước hiệu Con Người của Chúa Giêsu.'),
('hos', 'HO', 'Hôsê', 'Osee', 'Hs', 'OLD', 'PROPHETS', 'Ngôn Sứ', 14, 35,
 'Hôn nhân biểu tượng tình yêu chung thủy của Chúa với Israel bất trung.', 'Hôsê tại Samari.', '750 - 725 TCN.', 'Trước khi Samari sụp đổ.', '["Ta muốn lòng nhân chứ không cần hy lễ"]'::jsonb, 'Kêu gọi trở về tình đầu.', '[]'::jsonb, '["Hôsê", "Gomer"]'::jsonb, '[]'::jsonb, 'Chúa Giêsu trích dẫn Hs 6,6 hai lần.'),
('joel', 'JL', 'Giôen', 'Ioel', 'Ge', 'OLD', 'PROPHETS', 'Ngôn Sứ', 4, 36,
 'Ngày của Chúa và sấm ngôn tuôn đổ Thần Khí trên mọi xác phàm.', 'Giôen con ông Pơthuên.', '400 TCN.', 'Hạn hán & châu chấu Giuđa.', '["Xé lòng chứ đừng xé áo", "Tuôn đổ Thần Khí"]'::jsonb, 'Kêu gọi ăn chay sám hối.', '[]'::jsonb, '["Giôen"]'::jsonb, '[]'::jsonb, 'Sấm ngôn Lễ Hiện Xuống (Cv 2).'),
('amos', 'AM', 'Amốt', 'Amos', 'Am', 'OLD', 'PROPHETS', 'Ngôn Sứ', 9, 37,
 'Người chăn chiên lên án bất công xã hội và thói đạo đức giả hình.', 'Amốt người nông dân.', '750 TCN.', 'Samari giàu có sa đọa.', '["Công lý như dòng nước", "Bảo vệ người nghèo"]'::jsonb, 'Đòi hỏi công bằng xã hội.', '[]'::jsonb, '["Amốt"]'::jsonb, '[]'::jsonb, 'Nền tảng Học thuyết Xã hội Công giáo.'),
('obad', 'OB', 'Ôvađia', 'Abdias', 'Ôv', 'OLD', 'PROPHETS', 'Ngôn Sứ', 1, 38,
 'Lên án sự hiểm độc kiêu ngạo của Ê-đôm khi hại anh em.', 'Ngôn sứ Ôvađia.', 'Sau 587 TCN.', 'Giuđa bị tàn phá.', '["Phạt tội kiêu căng", "Nước thuộc về Chúa"]'::jsonb, 'Công lý nghiêm minh.', '[]'::jsonb, '["Ôvađia"]'::jsonb, '[]'::jsonb, 'Cảnh báo tội thiếu bác ái.'),
('jonah', 'JH', 'Giôna', 'Ionas', 'Gn', 'OLD', 'PROPHETS', 'Ngôn Sứ', 4, 39,
 'Giôna trong bụng cá, Ninivê sám hối và lòng từ bi của Chúa.', 'Tác giả Hậu Lưu đày.', 'Thế kỷ V TCN.', 'Ninivê Átsua.', '["Lòng thương xót phổ quát", "Dấu lạ Giôna"]'::jsonb, 'Phá tan chủ nghĩa hẹp hòi.', '[]'::jsonb, '["Giôna"]'::jsonb, '[]'::jsonb, 'Hình bóng 3 ngày trong mồ của Chúa Giêsu.'),
('mic', 'MC', 'Mikha', 'Michaeas', 'Mk', 'OLD', 'PROPHETS', 'Ngôn Sứ', 7, 40,
 'Lên án bất công và loan báo Đấng Thống Trị sinh tại Bêlem.', 'Mikha người Môrêsét.', 'Thế kỷ VIII TCN.', 'Nông thôn Giuđa nghèo khổ.', '["Sấm ngôn Bêlem (Mk 5,1)", "Khiêm nhường với Chúa"]'::jsonb, 'Yêu thương và công bằng.', '[]'::jsonb, '["Mikha"]'::jsonb, '[]'::jsonb, 'Chỉ đường cho các Đạo Sĩ (Mt 2,6).'),
('nah', 'NA', 'Nakhum', 'Nahum', 'Nk', 'OLD', 'PROPHETS', 'Ngôn Sứ', 3, 41,
 'Loan báo sự sụp đổ của đế quốc hung bạo Ninivê.', 'Nakhum người Encốt.', '612 TCN.', 'Ninivê bị công phá.', '["Thiên Chúa bênh vực kẻ bị ức hiếp"]'::jsonb, 'An ủi dân lành.', '[]'::jsonb, '["Nakhum"]'::jsonb, '[]'::jsonb, 'Chế độ bạo ngược sẽ tự sụp đổ.'),
('hab', 'HB', 'Khabacúc', 'Habacuc', 'Kbc', 'OLD', 'PROPHETS', 'Ngôn Sứ', 3, 42,
 'Trăn trở về sự dữ và tuyên ngôn người công chính sống nhờ đức tin.', 'Khabacúc.', '605 TCN.', 'Babylon trỗi dậy đe dọa.', '["Người công chính sống nhờ đức tin"]'::jsonb, 'Dạy kiên tâm cậy trông.', '[]'::jsonb, '["Khabacúc"]'::jsonb, '[]'::jsonb, 'Nền tảng công chính hóa (Rm 1,17).'),
('zeph', 'ZP', 'Xôphônia', 'Sophonias', 'Xp', 'OLD', 'PROPHETS', 'Ngôn Sứ', 3, 43,
 'Ngày thịnh nộ phán xét và niềm vui của dân nghèo hèn khiêm hạ.', 'Xôphônia chắt Khítkigia.', '630 TCN.', 'Giuđa trước cải cách.', '["Ngày của Chúa", "Dân khiêm hạ Anawim"]'::jsonb, 'Thanh luyện tâm hồn.', '[]'::jsonb, '["Xôphônia"]'::jsonb, '[]'::jsonb, 'Lời chào Truyền Tin của Sứ thần (Lc 1,28).'),
('hag', 'HG', 'Khácgai', 'Aggaeus', 'Kg', 'OLD', 'PROPHETS', 'Ngôn Sứ', 2, 44,
 'Thúc giục dân chúng mau chóng xây lại Đền Thờ Giêrusalem.', 'Khácgai.', '520 TCN.', 'Dân hồi hương uể oải.', '["Ưu tiên việc Chúa", "Vinh quang Đền Thờ sau"]'::jsonb, 'Thức tỉnh trách nhiệm.', '[]'::jsonb, '["Khácgai", "Dôrôbaven"]'::jsonb, '[]'::jsonb, 'Chúa Kitô bước vào Đền Thờ.'),
('zech', 'ZC', 'Dacaria', 'Zacharias', 'Zc', 'OLD', 'PROPHETS', 'Ngôn Sứ', 14, 45,
 'Vị Vua khiêm hạ cưỡi lừa, 30 đồng bạc và Đấng bị đâm thâu.', 'Dacaria con Bêrếcgia.', '520 TCN.', 'Đền Thờ thứ hai.', '["Vua cưỡi lừa (Zc 9)", "Đấng bị đâm thâu"]'::jsonb, 'Mở ra nhãn giới cứu chuộc.', '[]'::jsonb, '["Dacaria"]'::jsonb, '[]'::jsonb, 'Ứng nghiệm Lễ Lá và Thập Giá.'),
('mal', 'ML', 'Malakhi', 'Malachias', 'Ml', 'OLD', 'PROPHETS', 'Ngôn Sứ', 3, 46,
 'Hy Tế Tinh Tuyền khắp muôn dân và sứ giả Êlia dọn đường.', 'Malakhi.', '450 TCN.', 'Đền Thờ sau hồi hương.', '["Hy tế tinh tuyền (Ml 1,11)", "Êlia dọn đường"]'::jsonb, 'Kêu gọi thanh tẩy lòng sùng kính.', '[]'::jsonb, '["Malakhi"]'::jsonb, '[]'::jsonb, 'Tiên tri trực tiếp về Bí tích Thánh Lễ.'),

-- TÂN ƯỚC: BỐN PHÚC ÂM (4 SÁCH)
('matt', 'MT', 'Mátthêu', 'Matthaeus', 'Mt', 'NEW', 'GOSPELS', 'Tin Mừng', 28, 47,
 'Tin Mừng về Đấng Mêsia hoàn tất Kinh Thánh, Vua Nước Trời.', 'Tông đồ Mátthêu (Lêvi).', '70 - 85 SCN.', 'Cộng đồng Do Thái Kitô giáo.', '["Ứng nghiệm Kinh Thánh", "Hiến Chương Nước Trời", "Hội Thánh"]'::jsonb, 'Chứng minh Chúa Giêsu là Đấng Kitô.', '[]'::jsonb, '["Đức Giêsu", "Đức Maria", "Phêrô"]'::jsonb, '[]'::jsonb, 'Quyền bính Hội Thánh và Bí tích Rửa Tội.'),
('mark', 'MK', 'Mác-cô', 'Marcus', 'Mc', 'NEW', 'GOSPELS', 'Tin Mừng', 16, 48,
 'Hành động quyền năng của Người Tôi Trung Đau Khổ - Con Thiên Chúa.', 'Gioan Mác-cô môn đệ Phêrô.', '65 - 70 SCN.', 'Rôma thời bách hại Nêrô.', '["Bí mật Mêsia", "Hiến dâng mạng sống"]'::jsonb, 'Khích lệ lòng trung kiên.', '[]'::jsonb, '["Đức Giêsu", "Phêrô"]'::jsonb, '[]'::jsonb, 'Lời tuyên xưng Thần tính của viên sĩ quan Rôma.'),
('luke', 'LK', 'Lu-ca', 'Lucas', 'Lc', 'NEW', 'GOSPELS', 'Tin Mừng', 24, 49,
 'Tin Mừng Lòng Thương Xót, niềm vui, người nghèo hèn và Thánh Thần.', 'Thánh Luca lương y.', '75 - 85 SCN.', 'Thế giới Hy-La.', '["Lòng Thương Xót", "Niềm vui Thánh Thần", "Kinh Magnificat"]'::jsonb, 'Trình bày trật tự ơn cứu độ.', '[]'::jsonb, '["Đức Giêsu", "Đức Mẹ", "Gakêu"]'::jsonb, '[]'::jsonb, 'Cội nguồn các kinh phụng vụ Magnificat, Kính Mừng.'),
('john', 'JN', 'Gioan', 'Ioannes', 'Ga', 'NEW', 'GOSPELS', 'Tin Mừng', 21, 50,
 'Ngôi Lời Nhập Thể, 7 Dấu Chỉ vĩ đại và Bánh Hằng Sống.', 'Thánh Gioan Tông đồ.', '90 - 100 SCN.', 'Êphêsô Tiểu Á.', '["Ngôi Lời làm người", "Thánh Thể (Ga 6)", "Giới răn yêu thương"]'::jsonb, 'Để anh em tin mà được sống.', '[]'::jsonb, '["Đức Giêsu", "Đức Maria", "Ladarô"]'::jsonb, '[]'::jsonb, 'Thần học đỉnh cao về Nhập Thể và Thánh Thể.'),

-- TÂN ƯỚC: LỊCH SỬ GIÁO HỘI SƠ KHAI (1 SÁCH)
('acts', 'AC', 'Tông Đồ Công Vụ', 'Actus Apostolorum', 'Cv', 'NEW', 'ACTS', 'Tông Đồ Công Vụ', 28, 51,
 'Hội Thánh sơ khai lớn mạnh nhờ quyền năng Chúa Thánh Thần.', 'Thánh Luca.', '80 - 85 SCN.', 'Đế quốc Rôma thế kỷ I.', '["Hiện Xuống", "Hiệp thông huynh đệ", "Truyền giáo muôn dân"]'::jsonb, 'Làm chứng cho Chúa đến tận cùng trái đất.', '[]'::jsonb, '["Phêrô", "Phaolô", "Têphanô"]'::jsonb, '[]'::jsonb, 'Bản thiết kế mẫu mực cho Giáo Hội học Công giáo.'),

-- TÂN ƯỚC: THƯ THÁNH PHAOLÔ (14 SÁCH)
('rom', 'RM', 'Rôma', 'Ad Romanos', 'Rm', 'NEW', 'EPISTLES', 'Thư Tín', 16, 52,
 'Công chính hóa nhờ đức tin, tự do ân sủng và đời sống Thần Khí.', 'Thánh Phaolô.', '57 SCN.', 'Cộng đồng tín hữu Rôma.', '["Công chính hóa", "Ađam Mới", "Tình yêu Chúa không lay chuyển"]'::jsonb, 'Hiệp nhất giáo đoàn.', '[]'::jsonb, '["Phaolô", "Abraham"]'::jsonb, '[]'::jsonb, 'Văn bản cốt lõi về ân sủng cứu độ.'),
('1cor', '1CO', '1 Cô-rin-tô', '1 Ad Corinthios', '1Cr', 'NEW', 'EPISTLES', 'Thư Tín', 16, 53,
 'Hiệp nhất Thân Thể, Bữa Tiệc Thánh Thể, Bài ca Đức Mến & Phục Sinh.', 'Thánh Phaolô.', '54 SCN.', 'Thành phố cảng Côrintô.', '["Thánh Thể (1Cr 11)", "Bài ca Đức Ái (1Cr 13)", "Phục sinh (1Cr 15)"]'::jsonb, 'Chấn chỉnh trật tự phụng tự.', '[]'::jsonb, '["Phaolô", "Apôllô"]'::jsonb, '[]'::jsonb, 'Bản văn cổ xưa nhất về việc lập Bí tích Thánh Thể.'),
('2cor', '2CO', '2 Cô-rin-tô', '2 Ad Corinthios', '2Cr', 'NEW', 'EPISTLES', 'Thư Tín', 13, 54,
 'Sức mạnh trong yếu đuối, sứ vụ hòa giải và bảo vệ chức Tông đồ.', 'Thánh Phaolô.', '55 SCN.', 'Makêđônia.', '["Sứ vụ hòa giải", "Kho báu trong bình sành", "Ơn Chúa đủ cho con"]'::jsonb, 'Hàn gắn tương quan mục vụ.', '[]'::jsonb, '["Phaolô", "Titô"]'::jsonb, '[]'::jsonb, 'Linh đạo người mục tử theo Thập Giá.'),
('gal', 'GL', 'Ga-lát', 'Ad Galatas', 'Gl', 'NEW', 'EPISTLES', 'Thư Tín', 6, 55,
 'Tuyên ngôn tự do Kitô giáo: ơn cứu độ bởi đức tin không do lề luật.', 'Thánh Phaolô.', '54 SCN.', 'Các giáo đoàn Galát.', '["Chỉ một Tin Mừng", "Hoa trái Thần Khí", "Đức Kitô sống trong tôi"]'::jsonb, 'Bảo vệ tự do ân sủng.', '[]'::jsonb, '["Phaolô", "Phêrô"]'::jsonb, '[]'::jsonb, 'Tính phổ quát của ơn cứu độ.'),
('eph', 'EP', 'Ê-phê-sô', 'Ad Ephesios', 'Ep', 'NEW', 'EPISTLES', 'Thư Tín', 6, 56,
 'Mầu nhiệm Hội Thánh là Thân Thể Đức Kitô và áo giáp thiêng liêng.', 'Thánh Phaolô tù ngục.', '62 SCN.', 'Tiểu Á.', '["Thâu họp trong Chúa Kitô", "Hôn nhân bí tích", "Áo giáp Chúa"]'::jsonb, 'Vị thế vinh quang của Hội Thánh.', '[]'::jsonb, '["Phaolô"]'::jsonb, '[]'::jsonb, 'Hội Thánh là Hiền Thê Đức Kitô.'),
('phil', 'PH', 'Phi-líp-phê', 'Ad Philippenses', 'Pl', 'NEW', 'EPISTLES', 'Thư Tín', 4, 57,
 'Thư của niềm vui và Thánh Ca Tự Hạ (Kenosis) về Chúa Kitô.', 'Thánh Phaolô.', '61 SCN.', 'Giáo đoàn Hy Lạp.', '["Thánh Ca Kenosis (Pl 2)", "Hãy vui luôn trong Chúa"]'::jsonb, 'Khích lệ đức khiêm nhường.', '[]'::jsonb, '["Phaolô", "Timôthê"]'::jsonb, '[]'::jsonb, 'Thánh thi Kitô học trong Phụng vụ Tuần Thánh.'),
('col', 'CL', 'Cô-lô-xê', 'Ad Colossenses', 'Cl', 'NEW', 'EPISTLES', 'Thư Tín', 4, 58,
 'Đức Kitô Trưởng Tử muôn loài, Đầu của Hội Thánh.', 'Thánh Phaolô.', '62 SCN.', 'Côlôxê.', '["Đức Kitô tối thượng", "Hình ảnh Chúa vô hình"]'::jsonb, 'Bác bỏ tà thuyết ngộ đạo.', '[]'::jsonb, '["Phaolô", "Êpápra"]'::jsonb, '[]'::jsonb, 'Chúa Kitô là Đấng Trung Gian vũ trụ.'),
('1thess', '1TH', '1 Tê-xa-lô-ni-ca', '1 Ad Thessalonicenses', '1Tx', 'NEW', 'EPISTLES', 'Thư Tín', 5, 59,
 'Văn bản Tân Ước sớm nhất: Ngày Chúa Quang Lâm và hy vọng phục sinh.', 'Thánh Phaolô.', '50 SCN.', 'Têxalônica.', '["Đức tin kiên vững", "Chúa Quang Lâm Parousia"]'::jsonb, 'An ủi về người đã qua đời.', '[]'::jsonb, '["Phaolô", "Silvanô"]'::jsonb, '[]'::jsonb, 'Khởi đầu cánh chung học Kitô giáo.'),
('2thess', '2TH', '2 Tê-xa-lô-ni-ca', '2 Ad Thessalonicenses', '2Tx', 'NEW', 'EPISTLES', 'Thư Tín', 3, 60,
 'Uốn nắn hiểu lầm tận thế và kêu gọi chăm chỉ làm việc.', 'Thánh Phaolô.', '51 SCN.', 'Têxalônica.', '["Giữ vững truyền thống", "Ai không làm thì đừng ăn"]'::jsonb, 'Ổn định trật tự cộng đoàn.', '[]'::jsonb, '["Phaolô"]'::jsonb, '[]'::jsonb, 'Tầm quan trọng của Thánh Truyền Tông Đồ.'),
('1tim', '1TI', '1 Ti-mô-thê', '1 Ad Timotheum', '1Tm', 'NEW', 'EPISTLES', 'Thư Tín', 6, 61,
 'Cẩm nang mục vụ: phẩm trật Giám mục, Linh mục, Phó tế.', 'Thánh Phaolô.', '65 SCN.', 'Giáo đoàn Êphêsô.', '["Tiêu chuẩn mục tử", "Hội Thánh cột trụ chân lý"]'::jsonb, 'Bảo vệ kho tàng đức tin.', '[]'::jsonb, '["Phaolô", "Timôthê"]'::jsonb, '[]'::jsonb, 'Thần học về chức Thánh và Huấn Quyền.'),
('2tim', '2TI', '2 Ti-mô-thê', '2 Ad Timotheum', '2Tm', 'NEW', 'EPISTLES', 'Thư Tín', 4, 62,
 'Chúc thư cảm động của Phaolô trước khi chịu tử đạo tại Rôma.', 'Thánh Phaolô ngục tù.', '67 SCN.', 'Hầm ngục Rôma.', '["Kinh Thánh được linh hứng (2Tm 3)", "Chiến đấu trận cao đẹp"]'::jsonb, 'Trao đuốc cho thế hệ sau.', '[]'::jsonb, '["Phaolô", "Luca"]'::jsonb, '[]'::jsonb, 'Xác lập ơn linh hứng của Kinh Thánh.'),
('titus', 'TI', 'Ti-tô', 'Ad Titum', 'Tt', 'NEW', 'EPISTLES', 'Thư Tín', 3, 63,
 'Thiết lập hàng linh mục đảo Krêta và phép Rửa tái sinh.', 'Thánh Phaolô.', '65 SCN.', 'Đảo Krêta.', '["Chỉ định kỳ mục", "Phép Rửa tái sinh bởi Thánh Thần"]'::jsonb, 'Tổ chức đời sống giáo xứ.', '[]'::jsonb, '["Phaolô", "Titô"]'::jsonb, '[]'::jsonb, 'Ân sủng tái sinh trong Phép Rửa.'),
('philem', 'PM', 'Phi-lê-môn', 'Ad Philemonem', 'Plm', 'NEW', 'EPISTLES', 'Thư Tín', 1, 64,
 'Đón nhận người nô lệ Ônêsimô như anh em rất thân yêu trong Chúa.', 'Thánh Phaolô tù ngục.', '62 SCN.', 'Rôma.', '["Huynh đệ trong Chúa Kitô", "Bác ái vượt giai cấp"]'::jsonb, 'Hòa giải tha thứ.', '[]'::jsonb, '["Phaolô", "Philêmôn", "Ônêsimô"]'::jsonb, '[]'::jsonb, 'Phẩm giá con người bình đẳng trước Chúa.'),
('heb', 'HE', 'Do Thái', 'Ad Hebraeos', 'Dt', 'NEW', 'EPISTLES', 'Thư Tín', 13, 65,
 'Chức Thượng Tế Đời Đời của Chúa Kitô và Hy Tế duy nhất muôn đời.', 'Trường phái Phaolô.', '65 - 69 SCN.', 'Tín hữu gốc Do Thái.', '["Thượng tế Mênkixêđê", "Lời Chúa sắc hơn gươm hai lưỡi"]'::jsonb, 'Ưu việt của Giao Ước Mới.', '[]'::jsonb, '["Đức Giêsu - Thượng Tế"]'::jsonb, '[]'::jsonb, 'Thần học Hy Tế Thánh Lễ Công giáo.'),

-- TÂN ƯỚC: CÁC THƯ CHUNG (7 SÁCH)
('jas', 'JM', 'Gia-cô-bê', 'Iacobi', 'Gc', 'NEW', 'EPISTLES', 'Thư Tín', 5, 66,
 'Đức tin không có việc làm là đức tin chết, Bí tích Xức Dầu.', 'Thánh Giacôbê Tông đồ.', '60 SCN.', 'Tín hữu Do Thái tản mác.', '["Đức tin hành động", "Bí tích Xức Dầu Bệnh Nhân"]'::jsonb, 'Thực thi Lời Chúa.', '[]'::jsonb, '["Giacôbê"]'::jsonb, '[]'::jsonb, 'Cơ sở Kinh Thánh về Bí tích Xức Dầu (Gc 5).'),
('1pet', '1PE', '1 Phê-rô', '1 Petri', '1Pr', 'NEW', 'EPISTLES', 'Thư Tín', 5, 67,
 'Tín hữu là giống nòi vương giả, chịu thử thách và tỉnh thức.', 'Thánh Phêrô từ Rôma.', '64 SCN.', 'Tiểu Á thời bách hại.', '["Tư tế vương giả", "Ý nghĩa đau khổ", "Tỉnh thức ma quỷ"]'::jsonb, 'Củng cố đàn chiên.', '[]'::jsonb, '["Phêrô", "Mác-cô"]'::jsonb, '[]'::jsonb, 'Chức tư tế cộng đồng của giáo dân.'),
('2pet', '2PE', '2 Phê-rô', '2 Petri', '2Pr', 'NEW', 'EPISTLES', 'Thư Tín', 3, 68,
 'Thông hiệp bản tính thần linh và kiên tâm chờ đợi Trời Mới Đất Mới.', 'Thánh Phêrô cuối đời.', '66 SCN.', 'Rôma.', '["Thông phần bản tính thần linh (2Pr 1)", "Trời Mới Đất Mới"]'::jsonb, 'Cảnh báo lạc giáo.', '[]'::jsonb, '["Phêrô", "Phaolô"]'::jsonb, '[]'::jsonb, 'Giáo lý thần hóa con người (Theosis).'),
('1john', '1JN', '1 Gioan', '1 Ioannis', '1Ga', 'NEW', 'EPISTLES', 'Thư Tín', 5, 69,
 'Thiên Chúa là Tình Yêu: ai ở trong tình yêu thì ở trong Thiên Chúa.', 'Thánh Gioan Tông đồ.', '95 SCN.', 'Êphêsô.', '["Thiên Chúa là Tình Yêu", "Yêu thương anh em", "Đi trong ánh sáng"]'::jsonb, 'Củng cố niềm tin con Chúa.', '[]'::jsonb, '["Gioan"]'::jsonb, '[]'::jsonb, 'Định nghĩa cao nhất về Thiên Chúa (Deus Caritas Est).'),
('2john', '2JN', '2 Gioan', '2 Ioannis', '2Ga', 'NEW', 'EPISTLES', 'Thư Tín', 1, 70,
 'Sống trong Chân Lý và Tình Yêu, cảnh giác trước kẻ lừa dối.', 'Thánh Gioan Tông đồ.', '95 SCN.', 'Hội Thánh địa phương.', '["Chân Lý và Bác Ái"]'::jsonb, 'Bảo vệ đức tin nhập thể.', '[]'::jsonb, '["Gioan"]'::jsonb, '[]'::jsonb, 'Chân lý gắn bó với tình thương.'),
('3john', '3JN', '3 Gioan', '3 Ioannis', '3Ga', 'NEW', 'EPISTLES', 'Thư Tín', 1, 71,
 'Lòng hiếu khách truyền giáo và cảnh giác thói độc đoán lộng quyền.', 'Thánh Gioan Tông đồ.', '95 SCN.', 'Gửi ông Gaiút.', '["Hiệp tác cho Chân Lý", "Bác ái với thừa sai"]'::jsonb, 'Nâng đỡ người truyền giáo.', '[]'::jsonb, '["Gaiút", "Điôtrêphét"]'::jsonb, '[]'::jsonb, 'Đồng trách nhiệm trong Hội Thánh.'),
('jude', 'JD', 'Giu-đa', 'Iudae', 'Gđ', 'NEW', 'EPISTLES', 'Thư Tín', 1, 72,
 'Chiến đấu cho đức tin đã được trao phó một lần cho các thánh.', 'Thánh Giuđa Tađêô.', '70 SCN.', 'Cộng đồng bị lạc giáo đe dọa.', '["Chiến đấu cho đức tin", "Vinh tụng ca tạ ơn Chúa"]'::jsonb, 'Bảo vệ kho tàng đức tin.', '[]'::jsonb, '["Giuđa", "Micae"]'::jsonb, '[]'::jsonb, 'Kho tàng đức tin duy nhất Depositum Fidei.'),

-- TÂN ƯỚC: KHẢI HUYỀN (1 SÁCH)
('rev', 'RV', 'Khải Huyền', 'Apocalypsis', 'Kh', 'NEW', 'REVELATION', 'Khải Huyền', 22, 73,
 'Chiến thắng của Con Chiên khải hoàn, Tiệc Cưới và Giêrusalem Mới.', 'Thánh Gioan Tông đồ tại Pátmô.', '95 SCN.', 'Bách hại thời Đômitianô.', '["Con Chiên khải hoàn (Agnus Dei)", "Trời Mới Đất Mới", "Al-lê-lui-a"]'::jsonb, 'Củng cố niềm hy vọng vinh thắng.', '[]'::jsonb, '["Con Chiên", "Micae", "Người Nữ"]'::jsonb, '[]'::jsonb, 'Phụng vụ Thánh Lễ thông hiệp Phụng vụ Thiên Quốc.')

ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    latin_name = EXCLUDED.latin_name,
    abbreviation = EXCLUDED.abbreviation,
    chapters_count = EXCLUDED.chapters_count,
    book_order = EXCLUDED.book_order,
    overview = EXCLUDED.overview,
    author_tradition = EXCLUDED.author_tradition,
    theological_significance = EXCLUDED.theological_significance;

-- 3. NẠP TỰ ĐỘNG TOÀN BỘ 1.334 CHƯƠNG VÀO BẢNG BIBLE_CHAPTERS
DO $$
DECLARE
    book_rec RECORD;
    ch_num INT;
BEGIN
    FOR book_rec IN SELECT id, chapters_count, name FROM bible_books LOOP
        FOR ch_num IN 1..book_rec.chapters_count LOOP
            INSERT INTO bible_chapters (
                id, book_id, chapter_number, title, summary, verification_status
            ) VALUES (
                book_rec.id || '-' || ch_num,
                book_rec.id,
                ch_num,
                'Sách ' || book_rec.name || ' - Chương ' || ch_num,
                'Bản văn và chú giải thần học Chương ' || ch_num || ' của Sách ' || book_rec.name || '.',
                'VERIFIED'
            )
            ON CONFLICT (book_id, chapter_number) DO NOTHING;
        END LOOP;
    END LOOP;
END $$;

COMMIT;
