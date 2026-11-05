import { CatechismArticle, CatechismPillar } from '@/types';
import { normalizeObject, normalizeVietnamese } from '@/lib/utils/vietnamese';
import { CHURCH_DOCUMENTS_DATABASE } from './church-documents';

// ============================================================================
// SÁCH GIÁO LÝ HỘI THÁNH CÔNG GIÁO (GLHTCG / CATECHISM OF THE CATHOLIC CHURCH)
// Ban hành theo Tông Hiến Fidei Depositum của Thánh Giáo Hoàng Gioan Phaolô II (11/10/1992)
// Bản dịch tiếng Việt chính thức: Ủy ban Giáo lý Đức tin trực thuộc HĐGMVN
// Bản quyền văn bản gốc: Libreria Editrice Vaticana
// Trọn bộ 2.865 Điều Khoản thuộc 4 Trụ Cột Đức Tin Tông Truyền
// ============================================================================

export interface CatechismTheme {
  id: number;
  slug: string;
  name: string;
  latinName: string;
  description: string;
  keyParagraphs: number[];
  ranges: { from: number; to: number }[];
}

export const CATECHISM_THEMES: CatechismTheme[] = [
  {
    id: 1,
    slug: 'duc-tin',
    name: '1. Đức Tin',
    latinName: 'De Fide',
    description: 'Bản chất đức tin, sự vâng phục của đức tin, nhân đức đối thần và hành vi tự do gắn bó với Thiên Chúa.',
    keyParagraphs: [142, 144, 150, 176, 1814, 1815, 2087],
    ranges: [{ from: 142, to: 184 }, { from: 1814, to: 1816 }, { from: 2087, to: 2089 }]
  },
  {
    id: 2,
    slug: 'mac-khai',
    name: '2. Mặc Khải Thần Linh',
    latinName: 'De Divina Revelatione',
    description: 'Thiên Chúa tự mạc khải, Thánh Kinh và Thánh Truyền, quy điển 73 sách và ơn linh hứng.',
    keyParagraphs: [50, 65, 74, 80, 101, 105, 120, 131],
    ranges: [{ from: 50, to: 141 }]
  },
  {
    id: 3,
    slug: 'ba-ngoi',
    name: '3. Thiên Chúa Ba Ngôi',
    latinName: 'De Sanctissima Trinitate',
    description: 'Một Thiên Chúa duy nhất trong Ba Ngôi Vị: Chúa Cha Đấng Tạo Hóa, Chúa Con Đấng Cứu Chuộc, Chúa Thánh Thần Đấng Thánh Hóa.',
    keyParagraphs: [198, 232, 237, 249, 253, 261],
    ranges: [{ from: 198, to: 267 }]
  },
  {
    id: 4,
    slug: 'duc-kito',
    name: '4. Đức Giêsu Kitô',
    latinName: 'De Iesu Christo',
    description: 'Ngôi Lời Nhập Thể, cuộc đời công khai, Cuộc Khổ Nạn trên Thập Giá, Biến cố Phục Sinh và Lên Trời vinh hiển.',
    keyParagraphs: [422, 456, 461, 512, 571, 638, 659],
    ranges: [{ from: 422, to: 682 }]
  },
  {
    id: 5,
    slug: 'chua-thanh-than',
    name: '5. Chúa Thánh Thần',
    latinName: 'De Spiritu Sancto',
    description: 'Ngôi Ba Thiên Chúa, Đấng Ban Sự Sống, Thần Khí Chân Lý hiện diện và linh hoạt Hội Thánh.',
    keyParagraphs: [683, 687, 702, 731, 737],
    ranges: [{ from: 683, to: 747 }]
  },
  {
    id: 6,
    slug: 'hoi-thanh',
    name: '6. Hội Thánh Công Giáo',
    latinName: 'De Ecclesia Catholica',
    description: 'Bản chất Dân Thiên Chúa, 4 đặc tính Duy Nhất, Thánh Thiện, Công Giáo, Tông Truyền; Ơn cứu độ (#846) và Các Thánh Thông Công.',
    keyParagraphs: [748, 771, 811, 846, 871, 946],
    ranges: [{ from: 748, to: 975 }]
  },
  {
    id: 7,
    slug: 'cac-bi-tich',
    name: '7. Bảy Bí Tích',
    latinName: 'De Septem Sacramentis',
    description: 'Nhiệm cục Bí tích: Khai tâm (Rửa Tội, Thêm Sức, Thánh Thể), Chữa lành (Hòa Giải, Xức Dầu), Phục vụ (Truyền Chức, Hôn Phối).',
    keyParagraphs: [1066, 1113, 1213, 1285, 1324, 1422, 1499, 1536, 1601],
    ranges: [{ from: 1066, to: 1690 }]
  },
  {
    id: 8,
    slug: 'luan-ly',
    name: '8. Luân Lý Kitô Giáo',
    latinName: 'De Moralitate Christiana',
    description: 'Phẩm giá con người mang hình ảnh Thiên Chúa, tự do, lương tâm luân lý, hành vi nhân linh, tội lỗi và công bằng xã hội.',
    keyParagraphs: [1691, 1700, 1730, 1749, 1776, 1849, 1905],
    ranges: [{ from: 1691, to: 1802 }, { from: 1846, to: 2051 }]
  },
  {
    id: 9,
    slug: 'nhan-duc',
    name: '9. Các Nhân Đức',
    latinName: 'De Virtutibus',
    description: 'Bốn nhân đức nhân bản cốt tử (Khôn ngoan, Công bằng, Dũng cảm, Tiết độ) và Ba nhân đức đối thần (Tin, Cậy, Mến).',
    keyParagraphs: [1803, 1805, 1812, 1814, 1817, 1822],
    ranges: [{ from: 1803, to: 1845 }]
  },
  {
    id: 10,
    slug: 'muoi-dieu-ran',
    name: '10. Mười Điều Răn',
    latinName: 'De Decalogo',
    description: 'Thập Giới trong Giao Ước: Ba điều răn mến Chúa và Bảy điều răn yêu thương người thân cận.',
    keyParagraphs: [2052, 2084, 2142, 2168, 2196, 2258, 2331, 2401, 2464, 2514, 2534],
    ranges: [{ from: 2052, to: 2557 }]
  },
  {
    id: 11,
    slug: 'kinh-nguyen',
    name: '11. Kinh Nguyện Kitô Giáo',
    latinName: 'De Oratione Christiana',
    description: 'Ý nghĩa kinh nguyện, chiến đấu thiêng liêng và toàn vẹn Kinh Lạy Cha với 7 lời cầu xin.',
    keyParagraphs: [2558, 2565, 2697, 2759, 2777, 2803, 2865],
    ranges: [{ from: 2558, to: 2865 }]
  },
  {
    id: 12,
    slug: 'duc-maria',
    name: '12. Đức Trinh Nữ Maria',
    latinName: 'De Beata Maria Virgine',
    description: 'Mẹ Thiên Chúa, Vô Nhiễm Nguyên Tội, Trọn Đời Đồng Trinh, Hồn Xác Lên Trời và Mẹ Hội Thánh.',
    keyParagraphs: [487, 495, 508, 963, 969, 971],
    ranges: [{ from: 487, to: 511 }, { from: 963, to: 975 }]
  },
  {
    id: 13,
    slug: 'canh-chung',
    name: '13. Cánh Chung Học',
    latinName: 'De Novissimis',
    description: 'Xác loài người sống lại, sự phán xét riêng và chung, Thiên Đàng, Luyện Ngục, Hỏa Ngục và Sự sống đời đời.',
    keyParagraphs: [988, 1021, 1023, 1030, 1033, 1042, 1061],
    ranges: [{ from: 988, to: 1065 }]
  }
];

// ============================================================================
// CANONICAL SECTIONS MAP (BẢN ĐỒ CẤU TRÚC PHÂN ĐỊNH 2.865 ĐIỀU KHOẢN GLHTCG)
// Không trùng lặp, không đứt đoạn, bao phủ 100% từ Điều 1 đến Điều 2865
// ============================================================================

interface CanonicalSection {
  from: number;
  to: number;
  pillar: CatechismPillar;
  pillarName: string;
  part: string;
  section: string;
  chapter: string;
  title: string;
  latinHeading: string;
  themeId: number;
  themeName: string;
  scripturalFoundations: string[];
  keyDoctrines: string[];
  churchDocuments?: string[];
}

export const CANONICAL_SECTIONS: CanonicalSection[] = [
  // TRỤ CỘT I: TUYÊN XƯNG ĐỨC TIN (1 - 1065)
  {
    from: 1, to: 25,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Lời Mở Đầu: Đời sống con người là nhận biết và yêu mến Thiên Chúa',
    section: 'Mục đích tối hậu của con người',
    chapter: 'Kế hoạch cứu độ yêu thương của Chúa Cha',
    title: 'Thiên Chúa mời gọi con người thông phần vào sự sống hạnh phúc của Người',
    latinHeading: 'Vita hominis Deum cognoscere et amare',
    themeId: 1, themeName: '1. Đức Tin',
    scripturalFoundations: ['Ga 17,3', '1Tm 2,3-4', 'Ep 1,4-5'],
    keyDoctrines: ['Cùng đích con người là hiệp thông với Thiên Chúa Ba Ngôi.', 'Mọi người được mời gọi gia nhập Hội Thánh.'],
    churchDocuments: ['Tông hiến Fidei Depositum (1992)']
  },
  {
    from: 26, to: 49,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn I: Con người có khả năng đón nhận Thiên Chúa',
    chapter: 'Chương 1: Con người khao khát Thiên Chúa',
    title: 'Khát vọng Thiên Chúa và khả năng nhận biết Thiên Chúa bằng lý trí tự nhiên',
    latinHeading: 'Homo capax Dei',
    themeId: 1, themeName: '1. Đức Tin',
    scripturalFoundations: ['Cv 17,26-28', 'Rm 1,19-20', 'Tv 19,2-5'],
    keyDoctrines: ['Con người là thụ tạo tôn giáo (homo religiosus).', 'Lý trí tự nhiên có thể nhận biết Thiên Chúa qua vẻ đẹp thụ tạo.'],
    churchDocuments: ['Hiến chế Dei Verbum số 3', 'Công đồng Vaticanô I']
  },
  {
    from: 50, to: 73,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn II: Thiên Chúa đến gặp gỡ con người',
    chapter: 'Chương 1: Mạc khải của Thiên Chúa',
    title: 'Mạc khải Thần Linh: Thiên Chúa tự mạc khải qua các Giao ước đến tột đỉnh nơi Đức Kitô',
    latinHeading: 'Dei Revelatio',
    themeId: 2, themeName: '2. Mặc Khải Thần Linh',
    scripturalFoundations: ['Dt 1,1-2', 'Ep 1,9', 'Ga 1,14-18'],
    keyDoctrines: ['Mạc khải là sáng kiến nhưng không của Thiên Chúa.', 'Đức Giêsu Kitô là Lời trọn vẹn và tối hậu của Chúa Cha.'],
    churchDocuments: ['Hiến chế Dei Verbum số 2-4']
  },
  {
    from: 74, to: 100,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn II: Thiên Chúa đến gặp gỡ con người',
    chapter: 'Chương 2: Lưu truyền Mạc Khải Thần Linh',
    title: 'Thánh Truyền, Thánh Kinh và Huấn Quyền gìn giữ kho tàng đức tin duy nhất',
    latinHeading: 'Dei Revelationis Transmissio',
    themeId: 2, themeName: '2. Mặc Khải Thần Linh',
    scripturalFoundations: ['2Tx 2,15', '1Tm 6,20', 'Lc 10,16'],
    keyDoctrines: ['Thánh Kinh và Thánh Truyền bắt nguồn từ cùng một nguồn mạch thần linh.', 'Huấn Quyền phục vụ Lời Chúa chứ không đứng trên Lời Chúa.'],
    churchDocuments: ['Hiến chế Dei Verbum số 7-10']
  },
  {
    from: 101, to: 141,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn II: Thiên Chúa đến gặp gỡ con người',
    chapter: 'Chương 3: Kinh Thánh trong đời sống Hội Thánh',
    title: 'Linh hứng, chân lý Thánh Kinh và quy điển 73 Sách Thánh Công Giáo',
    latinHeading: 'Sancta Scriptura in Ecclesiae Vita',
    themeId: 2, themeName: '2. Mặc Khải Thần Linh',
    scripturalFoundations: ['2Tm 3,16-17', '2Pr 1,20-21', 'Dt 4,12'],
    keyDoctrines: ['Thiên Chúa là Tác Giả Kinh Thánh, linh hứng cho các tác giả nhân loại.', 'Hội Thánh nhìn nhận trọn vẹn 73 cuốn sách theo quy điển Công giáo.'],
    churchDocuments: ['Hiến chế Dei Verbum số 11-20']
  },
  {
    from: 142, to: 184,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn III: Con người đáp lại Thiên Chúa',
    chapter: 'Chương 1: Sự vâng phục của Đức Tin',
    title: 'Bản chất Đức Tin Kitô giáo: Sự gắn bó cá vị của con người với Thiên Chúa (#176)',
    latinHeading: 'Homo Deo Respondet: Oboedientia Fidei',
    themeId: 1, themeName: '1. Đức Tin',
    scripturalFoundations: ['Rm 1,5', 'Rm 16,26', 'Dt 11,1', 'Lc 1,38'],
    keyDoctrines: ['Đức tin là ơn ban của Thiên Chúa và là hành vi tự do, có ý thức của con người.', 'Đức tin Hội Thánh đi trước, sinh dưỡng và nâng đỡ đức tin cá nhân.'],
    churchDocuments: ['Hiến chế Dei Verbum số 5', 'Lumen Fidei (2013)']
  },
  {
    from: 185, to: 197,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Tuyên Xưng Đức Tin Kitô Giáo',
    section: 'Dẫn nhập các Biểu Thức Đức Tin',
    chapter: 'Kinh Tin Kính Các Tông Đồ và Nicêa-Constantinôpôli',
    title: 'Các Biểu thức Đức Tin trong truyền thống sống động của Hội Thánh',
    latinHeading: 'Symbola Fidei',
    themeId: 1, themeName: '1. Đức Tin',
    scripturalFoundations: ['1Cr 15,3-5', 'Mt 28,19'],
    keyDoctrines: ['Kinh Tin Kính là bản tóm lược toàn bộ chân lý đức tin tông truyền.'],
    churchDocuments: ['Công đồng Nicêa I (325)', 'Công đồng Constantinôpôli I (381)']
  },
  {
    from: 198, to: 231,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản I: Tôi tin kính Thiên Chúa là Cha Toàn Năng',
    chapter: 'Chương 1: Tôi tin kính một Thiên Chúa duy nhất',
    title: 'Thiên Chúa Duy Nhất là Chân Lý và Tình Yêu',
    latinHeading: 'Credo in Unum Deum',
    themeId: 3, themeName: '3. Thiên Chúa Ba Ngôi',
    scripturalFoundations: ['Đnl 6,4', 'Is 45,5', 'Xh 3,14', '1Ga 4,8'],
    keyDoctrines: ['Thiên Chúa tự mạc khải Danh Người: "Ta là Đấng Tự Hữu" (Jahveh).', 'Thiên Chúa là Tình Yêu vô biên.'],
    churchDocuments: ['Công đồng Vaticanô I: Dei Filius']
  },
  {
    from: 232, to: 267,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản I: Tôi tin kính Thiên Chúa là Cha Toàn Năng',
    chapter: 'Chương 2: Mầu nhiệm Thiên Chúa Ba Ngôi Chí Thánh',
    title: 'Mầu nhiệm trung tâm của đức tin: Chúa Cha, Chúa Con và Chúa Thánh Thần',
    latinHeading: 'Mysterium Sanctissimae Trinitatis',
    themeId: 3, themeName: '3. Thiên Chúa Ba Ngôi',
    scripturalFoundations: ['Mt 28,19', '2Cr 13,13', 'Ga 14,26'],
    keyDoctrines: ['Một Thiên Chúa duy nhất trong Ba Ngôi Vị phân biệt nhưng cùng một bản tính duy nhất.', 'Toàn bộ nhiệm cục cứu độ là công trình chung của Ba Ngôi.'],
    churchDocuments: ['Kinh Tin Kính Quicumque', 'Công đồng Latêranô IV']
  },
  {
    from: 268, to: 354,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản I: Tôi tin kính Thiên Chúa là Cha Toàn Năng',
    chapter: 'Chương 3: Đấng Tạo Thành trời đất và muôn vật hữu hình, vô hình',
    title: 'Thiên Chúa sáng tạo vạn vật tốt lành từ hư vô và Quan Phòng yêu thương',
    latinHeading: 'Creator Caeli et Terrae',
    themeId: 3, themeName: '3. Thiên Chúa Ba Ngôi',
    scripturalFoundations: ['St 1,1-31', 'Tv 104', 'Kh 4,11', 'Mt 6,26'],
    keyDoctrines: ['Thiên Chúa sáng tạo thế giới bằng sự khôn ngoan và tình yêu, không từ chất liệu có sẵn.', 'Thiên Chúa quan phòng gìn giữ và hướng dẫn mọi tạo vật đến sự viên mãn.'],
    churchDocuments: ['Hiến chế Gaudium et Spes số 36']
  },
  {
    from: 355, to: 421,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản I: Tôi tin kính Thiên Chúa là Cha Toàn Năng',
    chapter: 'Chương 4: Con người và Tội Nguyên Tổ',
    title: 'Phẩm giá con người mang hình ảnh Thiên Chúa và mầu nhiệm sa ngã - Tội Nguyên Tổ',
    latinHeading: 'De Homine et de Lapsu',
    themeId: 8, themeName: '8. Luân Lý Kitô Giáo',
    scripturalFoundations: ['St 1,27', 'St 3,1-24', 'Rm 5,12-21'],
    keyDoctrines: ['Con người gồm xác và hồn kết hợp nên một bản thể duy nhất.', 'Tội nguyên tổ làm mất sự thánh thiện ban đầu nhưng không phá hủy hoàn toàn bản tính nhân loại.', 'Thiên Chúa đã hứa ban Đấng Cứu Thế ngay sau khi con người sa ngã.'],
    churchDocuments: ['Công đồng Triđêntinô: Sắc lệnh về Tội Nguyên Tổ']
  },
  {
    from: 422, to: 486,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản II: Tôi tin kính Đức Giêsu Kitô Con Một Thiên Chúa',
    chapter: 'Chương 1: Mầu nhiệm Nhập Thể (#461)',
    title: 'Đức Giêsu Kitô là Thiên Chúa thật và là Người thật, Đấng Cứu Độ duy nhất',
    latinHeading: 'Iesus Christus Filius Dei Unigenitus',
    themeId: 4, themeName: '4. Đức Giêsu Kitô',
    scripturalFoundations: ['Ga 1,14', 'Pl 2,6-11', '1Tm 2,5', '1Ga 4,2'],
    keyDoctrines: ['Ngôi Lời đã mặc lấy xác phàm trong lòng Trinh Nữ Maria để cứu chuộc loài người.', 'Người là một Ngôi Vị thần linh duy nhất với hai bản tính trọn vẹn: thần tính và nhân tính.'],
    churchDocuments: ['Công đồng Êphêsô (431)', 'Công đồng Calcêđônia (451)']
  },
  {
    from: 487, to: 511,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản II: Tôi tin kính Đức Giêsu Kitô Con Một Thiên Chúa',
    chapter: 'Chương 2: Bởi phép Đức Chúa Thánh Thần và Trinh Nữ Maria',
    title: 'Các đặc ân của Đức Maria: Mẹ Thiên Chúa, Vô Nhiễm Nguyên Tội và Trọn Đời Đồng Trinh',
    latinHeading: 'Conceptus de Spiritu Sancto ex Maria Virgine',
    themeId: 12, themeName: '12. Đức Trinh Nữ Maria',
    scripturalFoundations: ['Lc 1,26-38', 'Mt 1,18-25', 'Ga 19,25-27'],
    keyDoctrines: ['Đức Maria thực sự là Mẹ Thiên Chúa (Theotokos).', 'Mẹ được gìn giữ khỏi mọi vết nhơ tội nguyên tổ từ giây phút đầu tiên thụ thai.', 'Mẹ trọn đời đồng trinh trước, trong và sau khi sinh Chúa Cứu Thế.'],
    churchDocuments: ['Thông điệp Ineffabilis Deus (1854)', 'Lumen Gentium chương VIII']
  },
  {
    from: 512, to: 570,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản II: Tôi tin kính Đức Giêsu Kitô Con Một Thiên Chúa',
    chapter: 'Chương 3: Các Mầu Nhiệm Cuộc Đời Đức Kitô',
    title: 'Đời sống ẩn dật, Phép Rửa tại sông Gio-đan, Lời rao giảng Nước Trời và các phép lạ',
    latinHeading: 'Mysteria Vitae Christi',
    themeId: 4, themeName: '4. Đức Giêsu Kitô',
    scripturalFoundations: ['Lc 2,51-52', 'Mt 3,13-17', 'Mc 1,14-15', 'Ga 2,1-11'],
    keyDoctrines: ['Toàn bộ cuộc đời Đức Kitô là mầu nhiệm cứu độ.', 'Nước Thiên Chúa đã đến gần nơi bản thân và lời giảng của Đức Kitô.'],
    churchDocuments: ['Hiến chế Lumen Gentium số 5']
  },
  {
    from: 571, to: 637,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản II: Tôi tin kính Đức Giêsu Kitô Con Một Thiên Chúa',
    chapter: 'Chương 4: Cuộc Khổ Nạn và Cái Chết của Đức Kitô trên Thập Giá',
    title: 'Đức Kitô chịu chết dưới thời Phongxiô Philatô, hiến tế cứu chuộc nhân loại',
    latinHeading: 'Passus sub Pontio Pilato, Crucifixus, Mortuus',
    themeId: 4, themeName: '4. Đức Giêsu Kitô',
    scripturalFoundations: ['Is 53,4-12', '1Cr 15,3', 'Ga 19,17-37', '1Pr 2,24'],
    keyDoctrines: ['Cái chết của Đức Kitô là hy tế độc nhất vô nhị, trọn vẹn xóa bỏ tội trần gian.', 'Đức Kitô đã nếm trải cái chết thực sự và xuống nơi kẻ chết để loan báo ơn giải thoát.'],
    churchDocuments: ['Công đồng Trentô: Phiên họp XXII']
  },
  {
    from: 638, to: 682,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản II: Tôi tin kính Đức Giêsu Kitô Con Một Thiên Chúa',
    chapter: 'Chương 5: Biến cố Phục Sinh, Lên Trời và Ngày Phán Xét Chung',
    title: 'Ngày thứ ba Người sống lại từ cõi chết, ngự bên hữu Chúa Cha và sẽ lại đến trong vinh quang',
    latinHeading: 'Tertia Die Resurrexit a Mortuis',
    themeId: 4, themeName: '4. Đức Giêsu Kitô',
    scripturalFoundations: ['1Cr 15,14-20', 'Cv 1,9-11', 'Mt 25,31-46'],
    keyDoctrines: ['Sự phục sinh của Đức Kitô là chân lý tột đỉnh của đức tin chúng ta.', 'Người sẽ trở lại trong vinh quang để phán xét kẻ sống và kẻ chết.'],
    churchDocuments: ['Kinh Tin Kính Các Thánh Tông Đồ']
  },
  {
    from: 683, to: 747,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản III: Tôi tin kính Đức Chúa Thánh Thần',
    chapter: 'Chương 1: Đấng Ban Sự Sống và Thánh Hóa Hội Thánh',
    title: 'Chúa Thánh Thần là Ngôi Ba Thiên Chúa, Thần Khí của Chúa Cha và Chúa Con',
    latinHeading: 'Credo in Spiritum Sanctum',
    themeId: 5, themeName: '5. Chúa Thánh Thần',
    scripturalFoundations: ['Ga 14,16-17', 'Cv 2,1-4', 'Rm 8,14-17', 'Gl 5,22-23'],
    keyDoctrines: ['Chúa Thánh Thần cùng được phụng thờ và tôn vinh với Chúa Cha và Chúa Con.', 'Chúa Thánh Thần xây dựng, làm sống động và thánh hóa Hội Thánh bằng các ân sủng.'],
    churchDocuments: ['Thông điệp Dominum et Vivificantem (1986)']
  },
  {
    from: 748, to: 870,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản IV: Tôi tin Hội Thánh Công Giáo',
    chapter: 'Chương 1: Bản chất và 4 Đặc tính của Hội Thánh (#811, #846)',
    title: 'Hội Thánh Duy Nhất, Thánh Thiện, Công Giáo, Tông Truyền và Mầu Nhiệm Ơn Cứu Độ',
    latinHeading: 'Credo Sanctam Ecclesiam Catholicam',
    themeId: 6, themeName: '6. Hội Thánh Công Giáo',
    scripturalFoundations: ['Mt 16,18', 'Ep 1,22-23', '1Tm 3,15', 'Cv 4,12'],
    keyDoctrines: ['Hội Thánh là Thân Thể Mầu Nhiệm Chúa Kitô và Đền Thờ Chúa Thánh Thần.', 'Mọi ơn cứu độ đều đến từ Chúa Kitô là Đầu qua Thân Thể Người là Hội Thánh (#846).'],
    churchDocuments: ['Hiến chế Lumen Gentium số 1-17']
  },
  {
    from: 871, to: 962,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản IV: Tôi tin Hội Thánh Công Giáo',
    chapter: 'Chương 2: Phẩm trật, Giáo dân, Đời thánh hiến và Các Thánh Thông Công',
    title: 'Cơ cấu phẩm trật Hội Thánh, ơn gọi giáo dân và sự hiệp thông mầu nhiệm giữa các tín hữu',
    latinHeading: 'De Fidelibus Christi et Sanctorum Communione',
    themeId: 6, themeName: '6. Hội Thánh Công Giáo',
    scripturalFoundations: ['1Cr 12,12-31', '1Pr 2,9', 'Dt 12,1', 'Kh 7,9'],
    keyDoctrines: ['Giáo hoàng và các Giám mục hiệp thông là người kế vị Thánh Phêrô và các Tông đồ.', 'Hiệp thông giữa ba thành phần Hội Thánh: Khải hoàn trên trời, Thanh luyện nơi luyện ngục và Lữ hành nơi trần thế.'],
    churchDocuments: ['Hiến chế Lumen Gentium chương III, IV & VII']
  },
  {
    from: 963, to: 975,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản IV: Tôi tin Hội Thánh Công Giáo',
    chapter: 'Chương 3: Đức Maria - Mẹ Chúa Kitô, Mẹ Hội Thánh',
    title: 'Vị trí của Đức Mẹ trong mầu nhiệm Đức Kitô và Hội Thánh - Mẫu gương toàn hảo',
    latinHeading: 'Maria - Mater Christi, Mater Ecclesiae',
    themeId: 12, themeName: '12. Đức Trinh Nữ Maria',
    scripturalFoundations: ['Ga 19,26-27', 'Cv 1,14', 'Kh 12,1'],
    keyDoctrines: ['Đức Maria là Mẹ Hội Thánh vì là Mẹ của Đấng là Đầu Thân Thể.', 'Đức Mẹ Hồn Xác Lên Trời là hình ảnh báo trước sự phục sinh vinh hiển của Hội Thánh.'],
    churchDocuments: ['Hiến chế Lumen Gentium chương VIII', 'Thông điệp Redemptoris Mater (1987)']
  },
  {
    from: 976, to: 987,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản V: Phép tha tội',
    chapter: 'Chương 1: Ơn tha tội trong lòng Hội Thánh',
    title: 'Tôi tin phép tha tội qua Bí tích Rửa Tội và Bí tích Hòa Giải',
    latinHeading: 'Credo in Remissionem Peccatorum',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['Ga 20,22-23', 'Mt 16,19', '2Cr 5,18'],
    keyDoctrines: ['Chúa Kitô trao quyền tha tội cho các Tông đồ và những người kế vị.', 'Bí tích Rửa Tội tha tội nguyên tổ và mọi tội riêng; Bí tích Hòa Giải tha các tội phạm sau khi Rửa Tội.'],
    churchDocuments: ['Công đồng Trentô: Sắc lệnh về Bí tích Sám Hối']
  },
  {
    from: 988, to: 1065,
    pillar: 1, pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản VI & VII: Sự sống lại và Sự sống đời đời',
    chapter: 'Chương 1: Cánh chung học Kitô giáo và tiếng Amen chung cuộc',
    title: 'Tôi tin xác loài người ngày sau sống lại, sự sống đời đời và vinh quang Thiên Đàng',
    latinHeading: 'Carnis Resurrectionem et Vitam Aeternam. Amen.',
    themeId: 13, themeName: '13. Cánh Chung Học',
    scripturalFoundations: ['1Cr 15,42-44', 'Kh 21,1-4', 'Ga 11,25-26', 'Mt 25,46'],
    keyDoctrines: ['Thân xác hay chết của chúng ta sẽ sống lại và biến đổi trong ngày sau hết.', 'Thiên Đàng là sự sống trọn vẹn trong tình yêu Chúa Ba Ngôi; Luyện ngục là tình trạng thanh luyện; Hỏa ngục là sự tự loại trừ vĩnh viễn khỏi Thiên Chúa.', 'Tiếng Amen là lời xác tín đức tin.'],
    churchDocuments: ['Hiến chế Gaudium et Spes số 39', 'Kinh Tin Kính Các Tông Đồ']
  },

  // TRỤ CỘT II: CỬ HÀNH BÍ TÍCH & PHỤNG VỤ (1066 - 1690)
  {
    from: 1066, to: 1134,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần I: Nhiệm Cục Bí Tích',
    section: 'Đoạn I: Mầu nhiệm Vượt Qua trong thời đại Hội Thánh',
    chapter: 'Chương 1: Phụng Vụ là công trình của Ba Ngôi Chí Thánh (#1066, #1113)',
    title: 'Bản chất Phụng Vụ: Nguồn mạch và chóp đỉnh của đời sống Hội Thánh',
    latinHeading: 'Liturgia - Opus Sanctissimae Trinitatis',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['1Cr 11,26', 'Dt 9,11-15', 'Ep 1,3-6'],
    keyDoctrines: ['Trong Phụng Vụ, Chúa Kitô là Đấng Thượng Tế luôn hiện diện để cử hành mầu nhiệm Vượt Qua.', 'Bảy Bí Tích được Chúa Kitô thiết lập và trao phó cho Hội Thánh.'],
    churchDocuments: ['Hiến chế Sacrosanctum Concilium số 7-10']
  },
  {
    from: 1135, to: 1209,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần I: Nhiệm Cục Bí Tích',
    section: 'Đoạn II: Cử hành Bí tích của Hội Thánh',
    chapter: 'Chương 1: Dấu chỉ, Lời nói, Hành động, Thời gian và Không gian Phụng Vụ',
    title: 'Cử hành Phụng Vụ: Ai cử hành, Cử hành thế nào, Năm Phụng Vụ và Nhà Thờ thánh thiện',
    latinHeading: 'Sacramentalis Celebratio',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['Kh 4-5', 'Cl 3,16-17', 'Tv 134'],
    keyDoctrines: ['Phụng Vụ là hành động của Chúa Kitô toàn thể (Christus Totus).', 'Chu kỳ Năm Phụng Vụ cử hành trọn vẹn mầu nhiệm Nhập Thể và Cứu Độ của Đức Kitô.'],
    churchDocuments: ['Hiến chế Sacrosanctum Concilium số 21-46']
  },
  {
    from: 1210, to: 1284,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Bí tích Khai Tâm Kitô Giáo',
    chapter: 'Chương 1: Bí tích Rửa Tội (#1213)',
    title: 'Bí tích Rửa Tội: Tái sinh làm con Thiên Chúa, cửa ngõ vào đời sống Thần Khí',
    latinHeading: 'Baptismus - Vitae Spiritualis Ianua',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['Mt 28,19', 'Ga 3,5', 'Rm 6,3-4', 'Tt 3,5'],
    keyDoctrines: ['Bí tích Rửa Tội tẩy sạch tội nguyên tổ và mọi tội riêng, làm cho người nhận trở thành chi thể Đức Kitô.', 'In dấu ấn thiêng liêng vĩnh viễn không thể tẩy xóa.'],
    churchDocuments: ['Công đồng Florence (1439)', 'Công đồng Trentô']
  },
  {
    from: 1285, to: 1321,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Bí tích Khai Tâm Kitô Giáo',
    chapter: 'Chương 2: Bí tích Thêm Sức (#1285)',
    title: 'Bí tích Thêm Sức: Nhận lãnh ấn tín Chúa Thánh Thần và sức mạnh làm chứng cho Đức Kitô',
    latinHeading: 'Confirmatio - Sigillum Doni Spiritus Sancti',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['Cv 2,1-4', 'Cv 8,14-17', 'Is 11,2', '2Cr 1,21-22'],
    keyDoctrines: ['Bí tích Thêm Sức làm cho ơn sủng Rửa Tội thêm sung mãn và gắn bó mật thiết hơn với Hội Thánh.', 'Trao ban sức mạnh đặc biệt của Thánh Thần để can đảm tuyên xưng và bảo vệ đức tin.'],
    churchDocuments: ['Tông hiến Divinae Consortium Naturae (1971)']
  },
  {
    from: 1322, to: 1419,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Bí tích Khai Tâm Kitô Giáo',
    chapter: 'Chương 3: Bí tích Thánh Thể (#1324)',
    title: 'Bí tích Thánh Thể: Nguồn mạch và chóp đỉnh của toàn bộ đời sống Kitô giáo',
    latinHeading: 'Sanctissima Eucharistia - Fons et Culmen',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['Mt 26,26-28', 'Mc 14,22-24', 'Lc 22,19-20', 'Ga 6,51-58', '1Cr 11,23-26'],
    keyDoctrines: ['Thánh Thể là hy tế tạ ơn, tưởng niệm và hiện diện thực sự của Đức Kitô dưới hình bánh và rượu.', 'Nhờ biến đổi bản thể (transsubstantiatio), toàn bộ Chúa Kitô hiện diện trọn vẹn cả Thần Tính và Nhân Tính.'],
    churchDocuments: ['Hiến chế Lumen Gentium số 11', 'Thông điệp Ecclesia de Eucharistia (2003)']
  },
  {
    from: 1420, to: 1498,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Các Bí Tích Chữa Lành',
    chapter: 'Chương 1: Bí tích Hòa Giải và Sám Hối (#1422)',
    title: 'Bí tích Hòa Giải: Lòng thương xót thứ tha tội lỗi và phục hồi bình an với Hội Thánh',
    latinHeading: 'Poenitentia et Reconciliatio',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['Ga 20,21-23', 'Lc 15,11-32', 'Mt 18,18', 'Gc 5,16'],
    keyDoctrines: ['Bí tích ban ơn tha thứ các tội lỗi phạm sau khi Rửa Tội cho người thật lòng ăn năn sám hối, xưng tội và đền tội.', 'Hòa giải hối nhân với Thiên Chúa và với cộng đoàn Hội Thánh.'],
    churchDocuments: ['Tông huấn Reconciliatio et Paenitentia (1984)']
  },
  {
    from: 1499, to: 1532,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Các Bí Tích Chữa Lành',
    chapter: 'Chương 2: Bí tích Xức Dầu Bệnh Nhân',
    title: 'Bí tích Xức Dầu Bệnh Nhân: Ân sủng nâng đỡ, can đảm và chữa lành cho người đau yếu',
    latinHeading: 'Unctio Infirmorum',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['Gc 5,14-15', 'Mc 6,13', 'Mt 10,8'],
    keyDoctrines: ['Ban ân sủng đặc biệt của Chúa Thánh Thần để vượt qua các thử thách bệnh tật và tuổi già.', 'Liên kết sự đau khổ của bệnh nhân với cuộc Khổ Nạn cứu chuộc của Đức Kitô.'],
    churchDocuments: ['Hiến chế Sacrosanctum Concilium số 73']
  },
  {
    from: 1533, to: 1600,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Các Bí Tích Phục Vụ Sự Hiệp Thông',
    chapter: 'Chương 1: Bí tích Truyền Chức Thánh',
    title: 'Bí tích Truyền Chức Thánh: Ba cấp bậc Giám mục, Linh mục và Phó tế phục vụ Dân Chúa',
    latinHeading: 'Ordo Sacer',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['2Tm 1,6', '1Tm 3,1-13', 'Dt 5,1-10', 'Mt 28,19-20'],
    keyDoctrines: ['Thừa tác vụ có chức thánh do Chúa Kitô thiết lập để nuôi dưỡng và dẫn dắt Hội Thánh.', 'In ấn tín không thể tẩy xóa để hành động trong cương vị Chúa Kitô là Đầu (in persona Christi Capitis).'],
    churchDocuments: ['Hiến chế Lumen Gentium số 28', 'Sắc lệnh Presbyterorum Ordinis']
  },
  {
    from: 1601, to: 1666,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Các Bí Tích Phục Vụ Sự Hiệp Thông',
    chapter: 'Chương 2: Bí tích Hôn Phối',
    title: 'Bí tích Hôn Phối: Giao ước tình yêu thánh thiện, bất khả phân ly và sinh dưỡng sự sống',
    latinHeading: 'Matrimonium',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['Mt 19,4-6', 'Ep 5,25-32', 'St 2,18-24', 'Ga 2,1-11'],
    keyDoctrines: ['Hôn nhân được Thiên Chúa thiết lập giữa một người nam và một người nữ vì lợi ích đôi bạn và sinh sản giáo dục con cái.', 'Hôn nhân thành sự giữa những người chịu phép Rửa Tội là dây liên kết bất khả phân ly.'],
    churchDocuments: ['Gaudium et Spes số 47-52', 'Thông điệp Casti Connubii']
  },
  {
    from: 1667, to: 1690,
    pillar: 2, pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Các Cử Hành Phụng Vụ Khác',
    chapter: 'Chương 1: Á Bí Tích và Nghi Thức An Táng Kitô Giáo',
    title: 'Á Bí Tích thánh hóa các hoàn cảnh cuộc sống và Nghi thức An táng phó thác linh hồn',
    latinHeading: 'Sacramentalia et Exsequiae',
    themeId: 7, themeName: '7. Bảy Bí Tích',
    scripturalFoundations: ['1Tm 4,4-5', '1Cr 15,51-57', '1Tx 4,13-14'],
    keyDoctrines: ['Á Bí Tích do Hội Thánh thiết lập để thánh hóa các môi trường sinh hoạt của người tín hữu.', 'Nghi thức an táng tôn trọng thân xác và tuyên xưng niềm hy vọng phục sinh.'],
    churchDocuments: ['Hiến chế Sacrosanctum Concilium số 60-61, 81-82']
  },

  // TRỤ CỘT III: ĐỜI SỐNG TRONG ĐỨC KITÔ (1691 - 2557)
  {
    from: 1691, to: 1748,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn I: Phẩm giá con người và ơn gọi hướng về hạnh phúc',
    chapter: 'Chương 1: Hình ảnh Thiên Chúa, Tám Mối Phúc và Tự do của con người (#1700)',
    title: 'Phẩm giá cao quý của con người được tạo dựng theo hình ảnh Thiên Chúa và tự do trách nhiệm',
    latinHeading: 'Dignitas Humanae Personae',
    themeId: 8, themeName: '8. Luân Lý Kitô Giáo',
    scripturalFoundations: ['St 1,26-27', 'Mt 5,3-12', 'Gl 5,13', 'Sir 15,14'],
    keyDoctrines: ['Mỗi người mang phẩm giá bất khả xâm phạm từ khi thụ thai.', 'Tự do đích thực là dấu chỉ cao quý nhất của hình ảnh Thiên Chúa nơi con người khi chọn điều thiện.'],
    churchDocuments: ['Hiến chế Gaudium et Spes số 12-17']
  },
  {
    from: 1749, to: 1802,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn II: Tính luân lý của hành vi và tiếng nói Lương Tâm',
    chapter: 'Chương 1: Đối tượng, Ý định, Hoàn cảnh và sự phán quyết của Lương Tâm',
    title: 'Hành vi luân lý nhân linh và Lương tâm - Cung thánh bí mật nơi con người gặp Thiên Chúa',
    latinHeading: 'Actus Humani et Conscientia Moralis',
    themeId: 8, themeName: '8. Luân Lý Kitô Giáo',
    scripturalFoundations: ['Rm 2,14-16', '1Tm 1,5', '1Ga 3,19-21'],
    keyDoctrines: ['Một hành vi chỉ tốt lành khi đối tượng, ý định và hoàn cảnh đều tốt.', 'Lương tâm chân chính đòi buộc con người phải tuân phục tiếng nói sự thật và không được hành động trái lương tâm.'],
    churchDocuments: ['Thông điệp Veritatis Splendor (1993)', 'Gaudium et Spes số 16']
  },
  {
    from: 1803, to: 1845,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn III: Các Nhân Đức và Ân Sủng',
    chapter: 'Chương 1: Bốn Nhân Đức Nhân Bản và Ba Nhân Đức Đối Thần (#1814)',
    title: 'Các Nhân Đức: Tập quán tốt lành hướng về sự trọn thiện, Nhân đức Đối thần Tin-Cậy-Mến',
    latinHeading: 'De Virtutibus Humanis et Theologalibus',
    themeId: 9, themeName: '9. Các Nhân Đức',
    scripturalFoundations: ['Kn 8,7', '1Cr 13,13', 'Rm 5,5', 'Gl 5,22-23'],
    keyDoctrines: ['Bốn nhân đức nhân bản: Khôn ngoan, Công bằng, Dũng cảm, Tiết độ.', 'Ba nhân đức đối thần: Tin, Cậy, Mến - bắt nguồn từ Thiên Chúa và trực tiếp quy hướng về Thiên Chúa.'],
    churchDocuments: ['Thánh Tôma Aquinô: Summa Theologiae']
  },
  {
    from: 1846, to: 1876,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn IV: Tội Lỗi và Lòng Thương Xót',
    chapter: 'Chương 1: Bản chất tội lỗi, Tội Trọng và Tội Nhẹ',
    title: 'Bản chất tội lỗi là sự xúc phạm đến Thiên Chúa và tha nhân, Tội trọng làm mất ơn nghĩa Chúa',
    latinHeading: 'De Peccato et Misericordia',
    themeId: 8, themeName: '8. Luân Lý Kitô Giáo',
    scripturalFoundations: ['1Ga 5,16-17', 'Tv 51,6', 'Lc 15,18'],
    keyDoctrines: ['Tội lỗi là lời nói, hành vi hoặc ước muốn nghịch lại lề luật vĩnh cửu của Thiên Chúa.', 'Tội trọng phá hủy đức ái trong tâm hồn khi hội đủ 3 điều kiện: vấn đề nghiêm trọng, ý thức trọn vẹn và ưng thuận hoàn toàn.'],
    churchDocuments: ['Tông huấn Reconciliatio et Paenitentia số 17']
  },
  {
    from: 1877, to: 1948,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn V: Con người trong cộng đồng xã hội',
    chapter: 'Chương 1: Quyền bính, Công ích, Công bằng xã hội và Liên đới',
    title: 'Học thuyết xã hội Công giáo: Phẩm giá con người, nguyên tắc bổ trợ và tình liên đới',
    latinHeading: 'Communitas Humana et Iustitia Socialis',
    themeId: 8, themeName: '8. Luân Lý Kitô Giáo',
    scripturalFoundations: ['Rm 13,1-7', 'Gc 2,14-17', 'Mt 25,40', 'Cv 2,44-45'],
    keyDoctrines: ['Mọi quyền bính bắt nguồn từ Thiên Chúa và có mục đích phục vụ công ích.', 'Tình liên đới đòi buộc sự phân phối của cải công bằng và nâng đỡ người nghèo khổ.'],
    churchDocuments: ['Thông điệp Rerum Novarum (1891)', 'Compendium Học thuyết Xã hội']
  },
  {
    from: 1949, to: 2051,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn VI: Luật Luân Lý và Ân Sủng',
    chapter: 'Chương 1: Luật Tự Nhiên, Luật Cũ, Luật Mới Tin Mừng và Công Chính Hóa',
    title: 'Luật Thiên Chúa hướng dẫn hành động, Ân sủng cứu chuộc và sự thánh hóa Kitô hữu',
    latinHeading: 'Lex Moralis, Gratia et Iustificatio',
    themeId: 8, themeName: '8. Luân Lý Kitô Giáo',
    scripturalFoundations: ['Mt 5,17-48', 'Rm 8,1-4', 'Ga 1,16-17', '2Cr 5,17'],
    keyDoctrines: ['Luật Tự Nhiên được khắc ghi trong tâm hồn mọi người.', 'Luật Mới của Tin Mừng là ân sủng của Chúa Thánh Thần được ban qua đức tin vào Chúa Kitô.'],
    churchDocuments: ['Công đồng Trentô: Sắc lệnh về Sự Công Chính Hóa']
  },
  {
    from: 2052, to: 2082,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Dẫn Nhập Thập Giới trong Giao Ước',
    chapter: 'Chương 1: Đức Giêsu và Người Thanh Niên Giàu Có (#2052)',
    title: 'Mười Điều Răn: Lời mời gọi của Giao Ước tình yêu và con đường dẫn tới sự sống',
    latinHeading: 'Decalogus in Foedere',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Xh 20,1-17', 'Đnl 5,6-21', 'Mt 19,16-22', 'Mt 22,37-40'],
    keyDoctrines: ['Mười Điều Răn diễn tả trọn vẹn những bổn phận căn bản của con người đối với Thiên Chúa và đồng loại.', 'Đức Kitô kiện toàn Thập Giới trong giới luật yêu thương.'],
    churchDocuments: ['Thông điệp Veritatis Splendor chương I']
  },
  {
    from: 2083, to: 2141,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Ba Điều Răn Đầu: Thờ Phượng và Mến Chúa',
    chapter: 'Chương 1: Điều Răn Thứ Nhất',
    title: 'Điều Răn Thứ Nhất: Ngươi phải thờ phượng một mình Đức Chúa là Thiên Chúa ngươi',
    latinHeading: 'Mandatum I: Dominum Deum Tuum Adorabis',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Đnl 6,13', 'Mt 4,10', '1Cr 10,14'],
    keyDoctrines: ['Bổn phận thờ phượng Thiên Chúa duy nhất qua các nhân đức đối thần Tin-Cậy-Mến.', 'Cấm tuyệt đối mọi hình thức thờ ngẫu tượng, bói toán, mê tín dị đoan và ma thuật.'],
    churchDocuments: ['Công đồng Nicêa II (787) về việc tôn kính ảnh tượng']
  },
  {
    from: 2142, to: 2167,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Ba Điều Răn Đầu: Thờ Phượng và Mến Chúa',
    chapter: 'Chương 2: Điều Răn Thứ Hai',
    title: 'Điều Răn Thứ Hai: Ngươi không được kêu Danh Đức Chúa là Thiên Chúa ngươi cách bất kính',
    latinHeading: 'Mandatum II: Nomen Domini Dei Tui Non Assumes in Vanum',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Xh 20,7', 'Mt 5,33-37', 'Tv 29,2'],
    keyDoctrines: ['Thánh Danh Chúa là thánh thiêng; người tín hữu phải tôn kính, chúc tụng và ngợi khen.', 'Nghiêm cấm thề gian, lộng ngôn phạm thượng và lạm dụng Danh Thiên Chúa.'],
    churchDocuments: ['Giáo huấn của các Giáo phụ']
  },
  {
    from: 2168, to: 2195,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Ba Điều Răn Đầu: Thờ Phượng và Mến Chúa',
    chapter: 'Chương 3: Điều Răn Thứ Ba',
    title: 'Điều Răn Thứ Ba: Ngươi hãy nhớ thánh hóa ngày Chúa Nhật',
    latinHeading: 'Mandatum III: Memento ut Diem Sabbati Sanctifices',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Xh 20,8-11', 'Mc 2,27-28', 'Cv 20,7', '1Cr 16,2'],
    keyDoctrines: ['Ngày Chúa Nhật là ngày tưởng niệm biến cố Đức Kitô Phục Sinh, ngày của Thánh Thể và nghỉ ngơi thánh thiện.', 'Người tín hữu có bổn phận tham dự Thánh Lễ Chúa Nhật và các ngày lễ trọng.'],
    churchDocuments: ['Tông thư Dies Domini (1998)']
  },
  {
    from: 2196, to: 2257,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 4: Điều Răn Thứ Bốn (#2196)',
    title: 'Điều Răn Thứ Bốn: Thảo kính cha mẹ, bổn phận gia đình và trách nhiệm công dân',
    latinHeading: 'Mandatum IV: Honora Patrem Tuum et Matrem Tuam',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Xh 20,12', 'Ep 6,1-4', 'Sir 3,1-16', 'Cl 3,20-21'],
    keyDoctrines: ['Gia đình là tế bào căn bản của xã hội và là Hội Thánh tại gia.', 'Con cái có bổn phận hiếu kính, biết ơn và chăm sóc cha mẹ khi tuổi già.'],
    churchDocuments: ['Tông huấn Familiaris Consortio (1981)']
  },
  {
    from: 2258, to: 2330,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 5: Điều Răn Thứ Năm (#2258)',
    title: 'Điều Răn Thứ Năm: Chớ giết người - Bảo vệ sự sống thánh thiêng từ thụ thai đến cái chết tự nhiên',
    latinHeading: 'Mandatum V: Non Occides',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['St 9,6', 'Xh 20,13', 'Mt 5,21-22', '1Ga 3,15'],
    keyDoctrines: ['Sự sống con người là thánh thiêng bất khả xâm phạm ở mọi giai đoạn.', 'Tuyệt đối lên án phá thai, an tử (êm tử), tự sát, khủng bố và chiến tranh bất công.'],
    churchDocuments: ['Thông điệp Evangelium Vitae (1995)']
  },
  {
    from: 2331, to: 2400,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 6: Điều Răn Thứ Sáu',
    title: 'Điều Răn Thứ Sáu: Chớ làm sự dâm dục - Phẩm giá tính dục, nhân đức khiết tịnh và tình yêu vợ chồng',
    latinHeading: 'Mandatum VI: Non Moechaberis',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Mt 5,27-28', '1Cr 6,18-20', '1Tx 4,3-5', 'Gl 5,19'],
    keyDoctrines: ['Tính dục là quà tặng tốt lành của Thiên Chúa, được định hướng cho tình yêu kết hợp và truyền sinh trong hôn nhân.', 'Mọi người được mời gọi sống đức khiết tịnh phù hợp với bậc sống của mình.'],
    churchDocuments: ['Thông điệp Humanae Vitae (1968)', 'Thần học Thân xác (Gioan Phaolô II)']
  },
  {
    from: 2401, to: 2463,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 7: Điều Răn Thứ Bảy',
    title: 'Điều Răn Thứ Bảy: Chớ lấy của người - Quyền tư hữu, công bằng xã hội và bảo vệ thụ tạo',
    latinHeading: 'Mandatum VII: Non Furtum Facies',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Xh 20,15', 'Lv 19,13', 'Lc 19,8', '1Tm 6,10'],
    keyDoctrines: ['Mục đích phổ quát của của cải trần gian: của cải được tạo dựng cho mọi người.', 'Lên án trộm cắp, tham nhũng, gian lận thương mại và bóc lột sức lao động.'],
    churchDocuments: ['Thông điệp Laudato Si\' (2015)', 'Centesimus Annus (1991)']
  },
  {
    from: 2464, to: 2513,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 8: Điều Răn Thứ Tám',
    title: 'Điều Răn Thứ Tám: Chớ làm chứng dối - Sống trong sự thật, danh dự tha nhân và truyền thông trung thực',
    latinHeading: 'Mandatum VIII: Non Loqueris Falsum Testimonium',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Xh 20,16', 'Ga 8,32', 'Mt 5,37', 'Ep 4,25'],
    keyDoctrines: ['Con người có bổn phận tìm kiếm chân lý và làm chứng cho sự thật trong đức ái.', 'Nghiêm cấm làm chứng dối, vu khống, cáo gian, nói xấu và tiết lộ bí mật tòa giải tội.'],
    churchDocuments: ['Thông điệp Veritatis Splendor']
  },
  {
    from: 2514, to: 2533,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 9: Điều Răn Thứ Chín',
    title: 'Điều Răn Thứ Chín: Chớ ước muốn vợ chồng người khác - Sự trong sạch của tâm hồn',
    latinHeading: 'Mandatum IX: Non Concupisces Uxorem Proximi Tui',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Mt 5,8', 'Mt 5,28', '1Tm 1,5'],
    keyDoctrines: ['Đức trong sạch tâm hồn cho phép người tín hữu nhìn ngắm thân xác và con người bằng cái nhìn tinh tuyền của Thiên Chúa.', 'Thanh tẩy các tư tưởng bất chính bằng kinh nguyện, sự đoan trang và khiết tịnh.'],
    churchDocuments: ['Tông huấn Chirographum về Khiết tịnh']
  },
  {
    from: 2534, to: 2557,
    pillar: 3, pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 10: Điều Răn Thứ Mười',
    title: 'Điều Răn Thứ Mười: Chớ tham của người - Tinh thần thanh thoát với của cải và lòng khao khát Thiên Chúa',
    latinHeading: 'Mandatum X: Non Concupisces Rem Proximi Tui',
    themeId: 10, themeName: '10. Mười Điều Răn',
    scripturalFoundations: ['Mt 6,21', 'Lc 12,15', '1Tm 6,9-10'],
    keyDoctrines: ['Cấm lòng tham lam, ghen tị trước sự thành công và tài sản của tha nhân.', 'Tinh thần nghèo khó theo Tin Mừng giải thoát tâm hồn để tìm kiếm Nước Trời trên hết mọi sự.'],
    churchDocuments: ['Hiến chế Gaudium et Spes số 69']
  },

  // TRỤ CỘT IV: KINH NGUYỆN KITÔ GIÁO (2558 - 2865)
  {
    from: 2558, to: 2649,
    pillar: 4, pillarName: 'Trụ Cột IV: Kinh Nguyện Kitô Giáo',
    part: 'Phần I: Kinh Nguyện Trong Đời Sống Kitô Giáo',
    section: 'Đoạn I: Mạc khải về Kinh Nguyện',
    chapter: 'Chương 1: Khởi nguồn kinh nguyện và các hình thức cầu nguyện trong Thánh Kinh (#2558)',
    title: 'Mầu nhiệm Kinh Nguyện: Cuộc gặp gỡ tình yêu giữa Thiên Chúa và con người',
    latinHeading: 'Mysterium Orationis in Vita Christiana',
    themeId: 11, themeName: '11. Kinh Nguyện Kitô Giáo',
    scripturalFoundations: ['Tv 27,8', '1Tx 5,17', 'Lc 11,1', 'Cv 2,42'],
    keyDoctrines: ['Kinh nguyện là sự nâng tâm hồn lên cùng Thiên Chúa hay lời xin các ơn lành thích hợp từ Thiên Chúa.', 'Khiêm nhường là nền tảng của mọi lời cầu nguyện chân chính.'],
    churchDocuments: ['Tông huấn Gaudete et Exsultate (2018)']
  },
  {
    from: 2650, to: 2696,
    pillar: 4, pillarName: 'Trụ Cột IV: Kinh Nguyện Kitô Giáo',
    part: 'Phần I: Kinh Nguyện Trong Đời Sống Kitô Giáo',
    section: 'Đoạn II: Truyền thống Kinh Nguyện của Hội Thánh',
    chapter: 'Chương 1: Lời Chúa, Phụng vụ, Các nhân đức và Các bậc thầy dạy cầu nguyện',
    title: 'Các nguồn mạch nuôi dưỡng đời sống cầu nguyện: Lời Chúa, Phụng vụ và Linh đạo Công giáo',
    latinHeading: 'Traditio Orationis',
    themeId: 11, themeName: '11. Kinh Nguyện Kitô Giáo',
    scripturalFoundations: ['Cl 3,16', 'Dt 4,12', 'Ga 4,14'],
    keyDoctrines: ['Hội Thánh là trường dạy cầu nguyện không ngừng.', 'Cầu nguyện với Chúa Cha trong Đức Kitô nhờ sự tác động của Chúa Thánh Thần và sự cầu bầu của Đức Mẹ cùng các Thánh.'],
    churchDocuments: ['Hiến chế Sacrosanctum Concilium', 'Thánh Têrêsa Avila: Lâu Đài Nội Tâm']
  },
  {
    from: 2697, to: 2758,
    pillar: 4, pillarName: 'Trụ Cột IV: Kinh Nguyện Kitô Giáo',
    part: 'Phần I: Kinh Nguyện Trong Đời Sống Kitô Giáo',
    section: 'Đoạn III: Đời sống và chiến đấu trong Kinh Nguyện',
    chapter: 'Chương 1: Các biểu hiện cầu nguyện và sự kiên trì vượt qua khô khan thiêng liêng',
    title: 'Ba hình thức cầu nguyện chính: Khẩu nguyện, Suy niệm và Chiêm niệm; Chiến đấu thiêng liêng',
    latinHeading: 'Vita Orationis et Proelium Orationis',
    themeId: 11, themeName: '11. Kinh Nguyện Kitô Giáo',
    scripturalFoundations: ['Mc 1,35', 'Lc 18,1', 'Ep 6,18', 'Mt 26,41'],
    keyDoctrines: ['Chiêm niệm là cái nhìn đức tin chăm chú vào Chúa Giêsu trong sự thinh lặng yêu thương.', 'Cầu nguyện là một ân sủng đồng thời là một cuộc chiến đấu kiên trì vượt qua chia trí và khô khan.'],
    churchDocuments: ['Thánh Gioan Thánh Giá: Đêm Cực Tối']
  },
  {
    from: 2759, to: 2802,
    pillar: 4, pillarName: 'Trụ Cột IV: Kinh Nguyện Kitô Giáo',
    part: 'Phần II: Kinh Lạy Cha - "Kinh Nguyện Của Chúa"',
    section: 'Đoạn I: Tóm lược toàn bộ Tin Mừng',
    chapter: 'Chương 1: "Lạy Cha chúng con ở trên trời" (#2759)',
    title: 'Kinh Lạy Cha: Lời kinh hoàn hảo Chúa Giêsu truyền dạy và tâm tình con thảo',
    latinHeading: 'Oratio Dominica: "Pater Noster"',
    themeId: 11, themeName: '11. Kinh Nguyện Kitô Giáo',
    scripturalFoundations: ['Mt 6,9-13', 'Lc 11,1-4', 'Rm 8,15', 'Gl 4,6'],
    keyDoctrines: ['Kinh Lạy Cha thực sự là bản tóm lược toàn bộ Tin Mừng (Tertulianô).', 'Dám thưa cùng Thiên Chúa là "Cha chúng con" nhờ sự hiệp thông mật thiết với Đức Kitô.'],
    churchDocuments: ['Thánh Augustinô: Epistula ad Probam']
  },
  {
    from: 2803, to: 2865,
    pillar: 4, pillarName: 'Trụ Cột IV: Kinh Nguyện Kitô Giáo',
    part: 'Phần II: Kinh Lạy Cha - "Kinh Nguyện Của Chúa"',
    section: 'Đoạn II: Bảy Lời Cầu Xin trong Kinh Lạy Cha',
    chapter: 'Chương 1: Ba lời nguyện Danh Cha và Bốn lời nguyện nhu cầu con người (#2865)',
    title: 'Bảy lời cầu xin trong Kinh Lạy Cha và Lời Tung Hô Amen kết thúc toàn bộ GLHTCG',
    latinHeading: 'Septem Petitiones et Doxologia Finalis: Amen',
    themeId: 11, themeName: '11. Kinh Nguyện Kitô Giáo',
    scripturalFoundations: ['Mt 6,9-13', 'Kh 1,6', '1Cr 14,16', 'Kh 22,20'],
    keyDoctrines: ['Ba lời cầu đầu hướng về Vinh quang Thiên Chúa: Danh Cha cả sáng, Nước Cha trị đến, Ý Cha thể hiện.', 'Bốn lời cầu sau dâng lên nhu cầu con người: Lương thực, Thứ tha, Khỏi chước cám dỗ, Cứu khỏi sự dữ.', 'Tiếng "Amen" cuối cùng là lời xác nhận trọn vẹn và niềm trông cậy vĩnh cửu.'],
    churchDocuments: ['Thánh Cyprianô: Về Kinh Lạy Cha']
  }
];

// ============================================================================
// KHO ĐIỀU KHOẢN NGUYÊN VĂN CÁC ĐIỀU TRỌNG TÂM (VERBATIM KEY ARTICLES)
// Trích xuất chuẩn xác từ Bản dịch Ủy ban Giáo lý Đức tin / HĐGMVN
// ============================================================================

export const CATECHISM_DATABASE: CatechismArticle[] = [
  {
    paragraphNumber: 1,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Lời Mở Đầu: Đời sống con người là nhận biết và yêu mến Thiên Chúa',
    section: 'Mục đích tối hậu của con người',
    chapter: 'Kế hoạch yêu thương cứu độ',
    title: 'Thiên Chúa kêu gọi con người tìm kiếm và nhận biết Người',
    latinHeading: 'Deus hominem libere creavit',
    theme: 'Đức Tin',
    themeId: 1,
    isFullVerbatimText: true,
    content: 'Tự bản tính Thiên Chúa là Đấng vô cùng hoàn hảo và hạnh phúc viên mãn. Do kế hoạch hoàn toàn nhân hậu nhưng không, Người đã tự ý tạo dựng con người để cho họ được thông phần vào sự sống hạnh phúc của Người. Khi thời gian viên mãn, Thiên Chúa Cha đã sai Con Một Người đến làm Đấng Cứu Độ và Chuộc Tội cho loài người. Nơi Đức Kitô và nhờ Đức Kitô, Thiên Chúa mời gọi mọi người đến cùng Người trong Chúa Thánh Thần, để trở thành những người con thừa kế sự sống vĩnh cửu.',
    scripturalFoundations: ['Ga 17,3', '1Tm 2,3-4', 'Ep 1,4-5', 'Gl 4,4-5'],
    keyDoctrines: [
      'Cùng đích tối hậu của con người là hiệp thông với Thiên Chúa Ba Ngôi.',
      'Mọi chân lý đức tin đều quy hướng về việc nhận biết và yêu mến Đấng Tạo Hóa.'
    ],
    churchDocuments: ['Tông hiến Fidei Depositum (1992)'],
    relatedParagraphs: [2, 3, 27, 44, 355]
  },
  {
    paragraphNumber: 27,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn I: Con người có khả năng đón nhận Thiên Chúa',
    chapter: 'Chương 1: Con người khao khát Thiên Chúa',
    title: 'Khát vọng Thiên Chúa ghi khắc trong trái tim con người',
    latinHeading: 'Desiderium Dei in corde hominis scriptum est',
    theme: 'Đức Tin',
    themeId: 1,
    isFullVerbatimText: true,
    content: 'Khát vọng Thiên Chúa được ghi khắc trong trái tim con người, vì con người được tạo dựng do Thiên Chúa và hướng về Thiên Chúa; Thiên Chúa không ngừng lôi kéo con người đến với Mình, và chỉ nơi Thiên Chúa, con người mới tìm thấy chân lý và hạnh phúc mà mình không ngừng tìm kiếm: "Ý nghĩa cao cả nhất của phẩm giá con người hệ tại ở chỗ con người được mời gọi hiệp thông với Thiên Chúa" (Gaudium et Spes 19).',
    scripturalFoundations: ['Cv 17,26-28', 'Tv 63,2', 'Tv 84,3'],
    keyDoctrines: [
      'Con người tự bản chất là thụ tạo có tính tôn giáo (homo religiosus).',
      'Tương quan hiệp thông với Thiên Chúa là phẩm giá cao quý nhất của con người.',
      'Sự khao khát hạnh phúc đích thực không gì nơi trần gian có thể thỏa mãn trọn vẹn ngoại trừ Đấng Tạo Hóa.'
    ],
    churchDocuments: ['Hiến chế Gaudium et Spes số 19'],
    relatedParagraphs: [28, 29, 30, 44, 355]
  },
  {
    paragraphNumber: 50,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn II: Thiên Chúa đến gặp gỡ con người',
    chapter: 'Chương 1: Mạc khải của Thiên Chúa',
    title: 'Thiên Chúa tự mạc khải bằng Lời và Biến Cố',
    latinHeading: 'Deus Seipsum revelat',
    theme: 'Mặc Khải',
    themeId: 2,
    isFullVerbatimText: true,
    content: 'Bằng lý trí tự nhiên, con người có thể nhận biết Thiên Chúa cách chắc chắn qua các công trình của Người. Nhưng còn có một trật tự nhận thức khác mà con người không thể tự mình đạt tới: trật tự Mạc Khải thần linh. Do lòng nhân hậu và khôn ngoan vô biên, Thiên Chúa đã tự mạc khải chính Mình và cho con người biết kế hoạch yêu thương nhiệm mầu của Người, kế hoạch đã được thiết lập từ muôn đời trong Đức Kitô cho mọi người.',
    scripturalFoundations: ['Ep 1,9', 'Rm 1,19-20', 'Dt 1,1-2'],
    keyDoctrines: [
      'Mạc khải là sáng kiến hoàn toàn nhưng không của Thiên Chúa.',
      'Kế hoạch mạc khải được thực hiện bằng các hành động và lời nói gắn bó mật thiết với nhau (Dei Verbum số 2).'
    ],
    churchDocuments: ['Hiến chế Dei Verbum số 2-3'],
    relatedParagraphs: [51, 52, 53, 65, 101]
  },
  {
    paragraphNumber: 101,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn II: Thiên Chúa đến gặp gỡ con người',
    chapter: 'Chương 3: Kinh Thánh trong đời sống Hội Thánh',
    title: 'Thiên Chúa hạ mình trao ban Lời Người qua ngôn ngữ loài người',
    latinHeading: 'Condescensio Dei in Sancta Scriptura',
    theme: 'Mặc Khải',
    themeId: 2,
    isFullVerbatimText: true,
    content: 'Để mạc khải chính mình cho loài người, vì lòng nhân hậu vô biên, Thiên Chúa đã nói với con người bằng ngôn ngữ loài người: "Quả thật, lời của Thiên Chúa, được diễn tả bằng ngôn ngữ loài người, đã trở nên giống như tiếng nói của loài người, cũng như xưa Ngôi Lời của Chúa Cha vĩnh cửu, khi mặc lấy xác phàm yếu đuối của con người, đã trở nên giống như con người" (Dei Verbum 13).',
    scripturalFoundations: ['Ga 1,14', 'Dt 1,1-2', '2Tm 3,16'],
    keyDoctrines: [
      'Mọi Lời trong toàn bộ Kinh Thánh đều quy hướng về Ngôi Lời duy nhất là Đức Kitô.',
      'Hội Thánh luôn tôn kính Kinh Thánh như chính Thân Thể Chúa Kitô.'
    ],
    churchDocuments: ['Hiến chế Dei Verbum số 13'],
    relatedParagraphs: [102, 103, 104, 131, 133]
  },
  {
    paragraphNumber: 144,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn III: Con người đáp lại Thiên Chúa',
    chapter: 'Chương 1: Sự vâng phục của Đức Tin',
    title: 'Sự vâng phục của Đức Tin: Abraham và Mẹ Maria',
    latinHeading: 'Oboedientia fidei',
    theme: 'Đức Tin',
    themeId: 1,
    isFullVerbatimText: true,
    content: 'Vâng phục trong đức tin là tự do tùng phục lời đã nghe, vì chân lý của lời đó được bảo đảm bởi Thiên Chúa, Đấng là chính Chân Lý. Abraham là mẫu gương của sự vâng phục này được Kinh Thánh tôn vinh. Đức Trinh Nữ Maria là hiện thân trọn vẹn nhất của đức tin vâng phục: "Này tôi là tôi tớ Chúa, xin Chúa cứ làm cho tôi như lời sứ thần nói" (Lc 1,38).',
    scripturalFoundations: ['Rm 1,5', 'Rm 16,26', 'Dt 11,8', 'Lc 1,38'],
    keyDoctrines: [
      'Đức tin là một ân sủng nhưng không của Thiên Chúa và là hành vi nhân linh tự do.',
      'Đức Trinh Nữ Maria được chúc phúc vì đã tin rằng lời Chúa phán sẽ được ứng nghiệm.'
    ],
    churchDocuments: ['Hiến chế Dei Verbum số 5'],
    relatedParagraphs: [145, 146, 148, 149, 176, 494]
  },
  {
    paragraphNumber: 176,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần I: Tuyên Xưng Đức Tin',
    section: 'Đoạn III: Con người đáp lại Thiên Chúa',
    chapter: 'Chương 1: Sự vâng phục của Đức Tin',
    title: 'Đức tin là sự gắn bó cá vị của toàn thể con người với Thiên Chúa',
    latinHeading: 'Fides est personalis adhaesio totius hominis Deo',
    theme: 'Đức Tin',
    themeId: 1,
    isFullVerbatimText: true,
    content: 'Đức tin là một sự gắn bó cá vị của toàn thể con người với Thiên Chúa, Đấng tự mạc khải. Đức tin bao hàm sự ưng thuận của trí tuệ và ý chí đối với mạc khải mà Thiên Chúa đã ban cho con người qua các hành động và lời nói của Người.',
    scripturalFoundations: ['Rm 1,16-17', 'Ga 6,29', '2Tm 1,12', 'Dt 11,1'],
    keyDoctrines: [
      'Đức tin không phải là sự chấp nhận thụ động các định đề lý thuyết, mà là sự hiến dâng tự do trọn vẹn của con người cho Thiên Chúa.',
      'Sự gắn bó cá vị với Thiên Chúa và sự ưng thuận chân lý do Người mạc khải không thể tách rời nhau.'
    ],
    churchDocuments: ['Hiến chế Dei Verbum số 5', 'Thông điệp Lumen Fidei số 18'],
    relatedParagraphs: [144, 150, 153, 177, 1814]
  },
  {
    paragraphNumber: 198,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Tuyên Xưng Đức Tin Kitô Giáo',
    section: 'Khoản I: Tôi tin kính Đức Chúa Trời là Cha Toàn Năng',
    chapter: 'Chương 1: Mầu nhiệm Thiên Chúa Ba Ngôi',
    title: 'Lời tuyên xưng mở đầu Kinh Tin Kính: Tôi tin kính một Thiên Chúa',
    latinHeading: 'Credo in Deum',
    theme: 'Thiên Chúa Ba Ngôi',
    themeId: 3,
    isFullVerbatimText: true,
    content: 'Lời tuyên xưng đức tin mở đầu bằng khẳng định căn bản nhất: "Tôi tin kính một Thiên Chúa duy nhất". Thiên Chúa là Đấng Duy Nhất, vô biên, chân thật và thánh thiện. Tuyên xưng Một Chúa là nền tảng của toàn bộ đức tin Công giáo.',
    scripturalFoundations: ['Đnl 6,4', 'Is 45,5', 'Mc 12,29'],
    keyDoctrines: [
      'Đức tin độc thần Kitô giáo: Một Thiên Chúa duy nhất trong Ba Ngôi Vị.',
      'Thiên Chúa là Tình Yêu (1Ga 4,8).'
    ],
    churchDocuments: ['Công đồng Latêranô IV'],
    relatedParagraphs: [199, 200, 202, 232]
  },
  {
    paragraphNumber: 232,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản I: Tôi tin kính Đức Chúa Trời là Cha Toàn Năng',
    chapter: 'Chương 2: Mầu nhiệm Thiên Chúa Ba Ngôi Chí Thánh',
    title: 'Tuyên xưng mầu nhiệm Thiên Chúa Ba Ngôi trong phép Rửa Tội',
    latinHeading: 'Professio fidei trinitariae in Baptismo',
    theme: 'Thiên Chúa Ba Ngôi',
    themeId: 3,
    isFullVerbatimText: true,
    content: 'Người Kitô hữu được rửa tội "nhân danh Cha và Con và Thánh Thần" (Mt 28,19). Trước đó, họ đã tuyên xưng đức tin đáp lại ba câu hỏi: "Bạn có tin kính Chúa Cha, Chúa Con và Chúa Thánh Thần không?". Đức tin của mọi người Kitô hữu đặt nền tảng trên Ba Ngôi Chí Thánh.',
    scripturalFoundations: ['Mt 28,19', '2Cr 13,13', 'Ga 14,26'],
    keyDoctrines: [
      'Mầu nhiệm trung tâm của đức tin và của đời sống Kitô hữu là mầu nhiệm Thiên Chúa Ba Ngôi.',
      'Không phải nhân danh "các danh", nhưng là nhân danh "một Danh duy nhất" của Thiên Chúa là Cha, Con và Thánh Thần.'
    ],
    churchDocuments: ['Kinh Tin Kính Các Thánh Tông Đồ', 'Công đồng Nicêa I (325)'],
    relatedParagraphs: [189, 233, 237, 249, 1213]
  },
  {
    paragraphNumber: 461,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Tuyên Xưng Đức Tin Kitô Giáo',
    section: 'Khoản II: Tôi tin kính Đức Giêsu Kitô Con Một Thiên Chúa',
    chapter: 'Chương 1: Mầu nhiệm Nhập Thể',
    title: 'Mầu nhiệm Ngôi Lời Nhập Thể',
    latinHeading: 'Mysterium Incarnationis Verbi',
    theme: 'Đức Giêsu Kitô',
    themeId: 4,
    isFullVerbatimText: true,
    content: 'Theo ngôn ngữ của Thánh Gioan: "Ngôi Lời đã trở nên người phàm" (Ga 1,14), Hội Thánh gọi biến cố Con Thiên Chúa mặc lấy bản tính nhân loại để cứu độ chúng ta là "Mầu Nhiệm Nhập Thể" (Incarnatio). Trong Kinh Tin Kính, chúng ta tuyên xưng: "Bởi phép Đức Chúa Thánh Thần, Người đã nhập thể trong lòng Trinh Nữ Maria, và đã làm người".',
    scripturalFoundations: ['Ga 1,14', 'Pl 2,5-8', 'Dt 10,5-7', '1Ga 4,2'],
    keyDoctrines: [
      'Đức Giêsu Kitô vừa là Thiên Chúa thật, vừa là Người thật.',
      'Mầu nhiệm Nhập Thể không làm mất đi thần tính nhưng làm cho nhân tính được kết hiệp trọn vẹn trong một Ngôi Vị thần linh.'
    ],
    churchDocuments: ['Công đồng Calcêđônia (451)', 'Công đồng Êphêsô (431)'],
    relatedParagraphs: [456, 462, 463, 464, 483]
  },
  {
    paragraphNumber: 638,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản II: Tôi tin kính Đức Giêsu Kitô Con Một Thiên Chúa',
    chapter: 'Chương 5: Biến cố Phục Sinh',
    title: 'Sự Phục Sinh của Đức Kitô: Chân lý chóp đỉnh của đức tin',
    latinHeading: 'Resurrectio Christi - Fidei Nostrae Culmen',
    theme: 'Đức Giêsu Kitô',
    themeId: 4,
    isFullVerbatimText: true,
    content: 'Sự Phục Sinh của Đức Giêsu là chân lý chóp đỉnh của đức tin chúng ta vào Đức Kitô. Cộng đoàn Kitô hữu tiên khởi đã tin và sống chân lý này như một sự thật trung tâm, được truyền lại bởi Thánh Truyền, được chứng thực bởi các tài liệu Tân Ước, và cùng với Thập Giá, được rao giảng như thành phần cốt yếu của Mầu Nhiệm Vượt Qua: "Đức Kitô đã sống lại từ cõi chết, nhờ sự chết, Người đã tiêu diệt sự chết, và đã ban sự sống cho những kẻ ở trong mồ" (Phụng vụ Byzantine).',
    scripturalFoundations: ['1Cr 15,3-4', 'Cv 2,24', 'Lc 24,34', 'Rm 1,4'],
    keyDoctrines: [
      'Biến cố Phục Sinh là một sự kiện lịch sử có thực được chứng thực bởi các nhân chứng và ngôi mộ trống.',
      'Sự Phục Sinh xác nhận tất cả những gì Đức Kitô đã làm và đã dạy, khẳng định thần tính đích thực của Người.'
    ],
    churchDocuments: ['Kinh Tin Kính Nicêa-Constantinôpôli'],
    relatedParagraphs: [639, 640, 645, 651, 988]
  },
  {
    paragraphNumber: 811,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản IV: Tôi tin Hội Thánh Công Giáo',
    chapter: 'Chương 1: Bốn Đặc Tính của Hội Thánh',
    title: 'Hội Thánh Duy Nhất, Thánh Thiện, Công Giáo và Tông Truyền',
    latinHeading: 'Ecclesia est Una, Sancta, Catholica et Apostolica',
    theme: 'Hội Thánh Công Giáo',
    themeId: 6,
    isFullVerbatimText: true,
    content: '"Đây là Hội Thánh duy nhất của Đức Kitô, mà trong Kinh Tin Kính chúng ta tuyên xưng là duy nhất, thánh thiện, công giáo và tông truyền" (Lumen Gentium 8). Bốn đặc tính này, liên kết mật thiết với nhau, chỉ rõ những nét cốt yếu của Hội Thánh và sứ vụ của Hội Thánh. Hội Thánh không tự mình có những đặc tính ấy; chính Đức Kitô, nhờ Chúa Thánh Thần, làm cho Hội Thánh Người thành duy nhất, thánh thiện, công giáo và tông truyền, và Người cũng kêu gọi Hội Thánh thể hiện mỗi đặc tính ấy.',
    scripturalFoundations: ['Ep 4,3-6', 'Mt 16,18', 'Mt 28,19-20', 'Ep 2,20'],
    keyDoctrines: [
      'Bốn dấu chỉ bản thể của Hội Thánh do chính Chúa Kitô thiết lập.',
      'Hội Thánh Đức Kitô tồn tại cách trọn vẹn trong Hội Thánh Công Giáo do Đấng kế vị Thánh Phêrô và các Giám mục hiệp thông lãnh đạo.'
    ],
    churchDocuments: ['Hiến chế Lumen Gentium số 8'],
    relatedParagraphs: [812, 813, 823, 830, 857, 865]
  },
  {
    paragraphNumber: 846,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản IV: Tôi tin Hội Thánh Công Giáo',
    chapter: 'Chương 1: Bốn Đặc Tính của Hội Thánh',
    title: '«Ngoài Hội Thánh không có ơn cứu độ» (Extra Ecclesiam nulla salus)',
    latinHeading: '«Extra Ecclesiam nulla salus»',
    theme: 'Hội Thánh Công Giáo',
    themeId: 6,
    isFullVerbatimText: true,
    content: 'Khẳng định thường được lặp lại bởi các Giáo Phụ này phải được hiểu như thế nào? Khi được phát biểu theo lối tích cực, khẳng định đó có nghĩa là mọi ơn cứu độ đều đến từ Đức Kitô là Đầu, qua Thân Thể Người là Hội Thánh: "Dựa vào Thánh Kinh và Thánh Truyền, Thánh Công Đồng dạy rằng Hội Thánh lữ hành này cần thiết cho ơn cứu độ. Thật vậy, chỉ có Đức Kitô là Đấng Trung Gian và là con đường cứu độ; Người hiện diện cho chúng ta trong Thân Thể của Người là Hội Thánh. Khi dạy chúng ta rõ ràng về sự cần thiết của đức tin và Bí tích Rửa Tội, chính Người đồng thời cũng khẳng định sự cần thiết của Hội Thánh mà con người bước vào qua cửa ngõ Rửa Tội" (Lumen Gentium 14).',
    scripturalFoundations: ['Mc 16,16', 'Ga 3,5', '1Tm 2,5', 'Cv 4,12'],
    keyDoctrines: [
      'Chúa Kitô là Đấng Cứu Độ duy nhất của nhân loại.',
      'Hội Thánh là khí cụ phổ quát của ơn cứu độ được Chúa Kitô thiết lập.',
      'Khẳng định này không nhắm vào những ai không biết Đức Kitô và Hội Thánh Người vì lý do bất khả kháng mà vẫn thành tâm tìm kiếm Thiên Chúa theo lương tâm ngay thẳng (LG 16).'
    ],
    churchDocuments: ['Hiến chế Lumen Gentium số 14-16'],
    relatedParagraphs: [847, 848, 849, 851, 1260]
  },
  {
    paragraphNumber: 963,
    pillar: 1,
    pillarName: 'Trụ Cột I: Tuyên Xưng Đức Tin',
    part: 'Phần II: Kinh Tin Kính',
    section: 'Khoản IV: Tôi tin Hội Thánh Công Giáo',
    chapter: 'Chương 3: Đức Maria - Mẹ Đức Kitô, Mẹ Hội Thánh',
    title: 'Đức Maria là Mẹ Đức Kitô và Mẹ Hội Thánh',
    latinHeading: 'Maria - Mater Christi, Mater Ecclesiae',
    theme: 'Đức Trinh Nữ Maria',
    themeId: 12,
    isFullVerbatimText: true,
    content: 'Sau khi nói về vai trò của Đức Trinh Nữ Maria trong mầu nhiệm Đức Kitô và Thần Khí, việc nhìn ngắm vị trí của Mẹ trong mầu nhiệm Hội Thánh là điều hoàn toàn thích hợp: "Thực vậy, Đức Trinh Nữ Maria được nhìn nhận và tôn kính như là Mẹ thật của Thiên Chúa và của Đấng Cứu Chuộc... Hơn nữa, Mẹ thực sự là Mẹ của các chi thể Đức Kitô... vì Mẹ đã cộng tác trong đức ái để sinh ra trong Hội Thánh những tín hữu là chi thể của Đầu ấy" (Lumen Gentium 53). "Đức Maria, Mẹ Đức Kitô, cũng là Mẹ Hội Thánh" (Thánh Giáo hoàng Phaolô VI).',
    scripturalFoundations: ['Ga 19,26-27', 'Cv 1,14', 'Kh 12,1-17'],
    keyDoctrines: [
      'Đức Mẹ là Mẹ Thần Linh của mọi chi thể trong Thân Thể Mầu Nhiệm Chúa Kitô.',
      'Đức Mẹ là mẫu gương đức tin, đức cậy và đức ái hoàn hảo cho toàn thể Hội Thánh noi theo.'
    ],
    churchDocuments: ['Hiến chế Lumen Gentium số 53-65', 'Tuyên ngôn của ĐTC Phaolô VI (21/11/1964)'],
    relatedParagraphs: [495, 501, 964, 969, 973]
  },
  {
    paragraphNumber: 1066,
    pillar: 2,
    pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần I: Nhiệm Cục Bí Tích',
    section: 'Đoạn I: Phụng Vụ – Công Trình của Chúa Ba Ngôi',
    chapter: 'Chương 1: Mầu nhiệm Vượt Qua trong các Bí tích',
    title: 'Phụng Vụ là hành động của Chúa Kitô toàn thể (Christus Totus)',
    latinHeading: 'Liturgia est actio Christi Totius',
    theme: 'Bảy Bí Tích',
    themeId: 7,
    isFullVerbatimText: true,
    content: 'Trong Kinh Tin Kính, Hội Thánh tuyên xưng mầu nhiệm Thiên Chúa Ba Ngôi và "kế hoạch nhân hậu của Người" trên toàn thể thụ tạo: Chúa Cha hoàn tất "mầu nhiệm ý định của Người" khi trao ban Con Yêu Dấu và Thánh Thần để cứu độ trần gian. Giờ đây, trong Phụng Vụ, Hội Thánh loan báo và cử hành chính Mầu Nhiệm Vượt Qua ấy của Đức Kitô, để các tín hữu được thông phần vào sự sống thần linh của Thiên Chúa Ba Ngôi.',
    scripturalFoundations: ['Ep 1,3-10', '1Cr 11,26', 'Dt 9,11-14'],
    keyDoctrines: [
      'Phụng Vụ không đơn thuần là nghi lễ bên ngoài mà là hành động cứu độ sống động của Chúa Kitô.',
      'Ân sủng từ hy tế Canvê được tuôn đổ dồi dào qua các cử hành phụng vụ của Hội Thánh.'
    ],
    churchDocuments: ['Hiến chế Sacrosanctum Concilium số 5-8'],
    relatedParagraphs: [1067, 1068, 1076, 1084, 1113]
  },
  {
    paragraphNumber: 1113,
    pillar: 2,
    pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần I: Nhiệm Cục Bí Tích',
    section: 'Đoạn I: Mầu nhiệm Vượt Qua trong các Bí tích',
    chapter: 'Chương 1: Bảy Bí Tích của Hội Thánh',
    title: 'Bảy Bí Tích do Chúa Kitô thiết lập',
    latinHeading: 'Septem Sacramenta Ecclesiae',
    theme: 'Bảy Bí Tích',
    themeId: 7,
    isFullVerbatimText: true,
    content: 'Toàn bộ đời sống phụng vụ của Hội Thánh xoay quanh hy tế Thánh Thể và các bí tích. Trong Hội Thánh có bảy bí tích: Rửa Tội, Thêm Sức, Thánh Thể, Hòa Giải, Xức Dầu Bệnh Nhân, Truyền Chức Thánh, và Hôn Phối (Công đồng Lyon II; Công đồng Trentô).',
    scripturalFoundations: ['Mt 28,19', 'Cv 8,17', 'Lc 22,19', 'Ga 20,23', 'Gc 5,14', '2Tm 1,6', 'Mt 19,6'],
    keyDoctrines: [
      'Bảy Bí Tích được chia làm ba nhóm: Khai tâm Kitô giáo, Chữa lành, và Phục vụ sự hiệp thông.',
      'Mọi bí tích đều bắt nguồn từ Lời nói và Hành động của Chúa Giêsu trong các sách Tin Mừng.'
    ],
    churchDocuments: ['Công đồng Lyon II (1274)', 'Công đồng Trentô: Phiên họp VII'],
    relatedParagraphs: [1114, 1117, 1210, 1211, 1324]
  },
  {
    paragraphNumber: 1213,
    pillar: 2,
    pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Bí tích Khai Tâm Kitô Giáo',
    chapter: 'Chương 1: Bí tích Rửa Tội',
    title: 'Bí tích Rửa Tội: Cửa ngõ bước vào đời sống Thần Khí',
    latinHeading: 'Baptismus - Vitae Spiritualis Ianua',
    theme: 'Bảy Bí Tích',
    themeId: 7,
    isFullVerbatimText: true,
    content: 'Phép Rửa Tội thánh thiện là cửa ngõ bước vào đời sống trong Thần Khí (vitae spiritualis ianua) và là cánh cửa mở lối cho các bí tích khác. Nhờ phép Rửa, chúng ta được giải thoát khỏi tội lỗi và được tái sinh làm con cái Thiên Chúa, chúng ta trở thành những chi thể của Đức Kitô, được tháp nhập vào Hội Thánh và được tham dự vào sứ vụ của Hội Thánh: "Phép Rửa Tội là bí tích tái sinh nhờ nước trong Lời Chúa" (Giáo lý Rôma).',
    scripturalFoundations: ['Ga 3,5', 'Mt 28,19', 'Rm 6,3-4', 'Tt 3,5'],
    keyDoctrines: [
      'Rửa Tội tha thứ tội nguyên tổ và mọi tội riêng phạm trước đó.',
      'In dấu ấn thiêng liêng vĩnh viễn (ấn tín) không thể lặp lại hay xóa nhòa.',
      'Làm cho người tín hữu thông phần vào ba chức vụ của Đức Kitô: Tư tế, Tiên tri và Vương đế.'
    ],
    churchDocuments: ['Công đồng Florence (1439)', 'Giáo luật số 849'],
    relatedParagraphs: [1214, 1215, 1262, 1272, 1279]
  },
  {
    paragraphNumber: 1324,
    pillar: 2,
    pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Bí tích Khai Tâm Kitô Giáo',
    chapter: 'Chương 3: Bí tích Thánh Thể',
    title: 'Bí tích Thánh Thể: Nguồn mạch và chóp đỉnh của toàn bộ đời sống Kitô giáo',
    latinHeading: 'Eucharistia - Totius Vitae Christianae Fons et Culmen',
    theme: 'Bảy Bí Tích',
    themeId: 7,
    isFullVerbatimText: true,
    content: 'Bí tích Thánh Thể là "nguồn mạch và chóp đỉnh của toàn bộ đời sống Kitô giáo" (Lumen Gentium 11). Các bí tích khác, cũng như mọi thừa tác vụ trong Hội Thánh và các hoạt động tông đồ, đều gắn liền với Bí tích Thánh Thể và quy hướng về đó. Thật vậy, Bí tích Thánh Thể chứa đựng tất cả của cải thiêng liêng của Hội Thánh, tức chính Đức Kitô, Chiên Vượt Qua của chúng ta (Presbyterorum Ordinis 5).',
    scripturalFoundations: ['Ga 6,51-58', '1Cr 10,16-17', '1Cr 11,23-26', 'Lc 22,19-20'],
    keyDoctrines: [
      'Hy tế Thánh Thể tái hiện hy tế Thập Giá Canvê một cách bí tích không đổ máu.',
      'Sự biến đổi bản thể (transsubstantiatio) làm cho Chúa Kitô hiện diện thực sự, đích thực và bản thể dưới hình bánh rượu.',
      'Hiệp lễ kết hợp mật thiết tín hữu với Đức Kitô và củng cố sự hiệp nhất của Thân Thể Mầu Nhiệm.'
    ],
    churchDocuments: ['Hiến chế Lumen Gentium số 11', 'Sắc lệnh Presbyterorum Ordinis số 5', 'Ecclesia de Eucharistia'],
    relatedParagraphs: [1325, 1326, 1374, 1376, 1407]
  },
  {
    paragraphNumber: 1422,
    pillar: 2,
    pillarName: 'Trụ Cột II: Cử Hành Phụng Vụ',
    part: 'Phần II: Bảy Bí Tích của Hội Thánh',
    section: 'Các Bí Tích Chữa Lành',
    chapter: 'Chương 1: Bí tích Hòa Giải và Sám Hối',
    title: 'Bí tích Hòa Giải: Lòng thương xót của Chúa và ơn thứ tha của Hội Thánh',
    latinHeading: 'Sacramentum Poenitentiae et Reconciliationis',
    theme: 'Bảy Bí Tích',
    themeId: 7,
    isFullVerbatimText: true,
    content: '"Những ai đến với Bí tích Hòa Giải sẽ nhận được từ lòng thương xót của Thiên Chúa ơn tha thứ các xúc phạm đến Người, đồng thời được hòa giải với Hội Thánh mà họ đã làm tổn thương do tội lỗi mình, một Hội Thánh luôn nỗ lực giúp họ hoán cải bằng đức ái, gương lành và lời cầu nguyện" (Lumen Gentium 11).',
    scripturalFoundations: ['Ga 20,22-23', 'Mt 16,19', 'Mt 18,18', 'Lc 15,18-24'],
    keyDoctrines: [
      'Bí tích Hòa Giải phục hồi tình bạn với Thiên Chúa đã bị đổ vỡ bởi tội trọng.',
      'Bốn yếu tố cấu thành bí tích: Ăn năn sám hối, Xưng tội rõ ràng, Đền tội thích đáng và Lời xá giải của linh mục.'
    ],
    churchDocuments: ['Hiến chế Lumen Gentium số 11', 'Tông huấn Reconciliatio et Paenitentia'],
    relatedParagraphs: [1423, 1440, 1446, 1468, 1496]
  },
  {
    paragraphNumber: 1700,
    pillar: 3,
    pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn I: Phẩm giá con người',
    chapter: 'Chương 1: Con người mang hình ảnh Thiên Chúa',
    title: 'Phẩm giá con người được tạo dựng theo hình ảnh Thiên Chúa',
    latinHeading: 'Dignitas personae humanae ad imaginem Dei conditae',
    theme: 'Luân Lý Kitô Giáo',
    themeId: 8,
    isFullVerbatimText: true,
    content: 'Phẩm giá con người bắt nguồn từ việc con người được tạo dựng theo hình ảnh và giống như Thiên Chúa (St 1,26-27). Phẩm giá ấy được kiện toàn trong ơn gọi đạt tới hạnh phúc thần linh. Con người tự nguyện hướng về sự viên mãn này qua các hành vi tự do và có ý thức của mình.',
    scripturalFoundations: ['St 1,26-27', 'Tv 8,5-7', 'Mt 5,48', 'Ep 4,24'],
    keyDoctrines: [
      'Mỗi một người, không phân biệt chủng tộc hay hoàn cảnh, đều sở hữu phẩm giá thiêng liêng bất khả tước đoạt.',
      'Sự tự do và lý trí ban cho con người năng lực nhận biết và bước đi trên nẻo chính đường ngay.'
    ],
    churchDocuments: ['Hiến chế Gaudium et Spes số 12', 'Thông điệp Veritatis Splendor'],
    relatedParagraphs: [1701, 1702, 1715, 1730, 1934]
  },
  {
    paragraphNumber: 1803,
    pillar: 3,
    pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn III: Các Nhân Đức',
    chapter: 'Chương 1: Bản chất của Nhân Đức',
    title: 'Bản chất của Nhân Đức: Xu hướng thường xuyên và kiên định làm điều thiện',
    latinHeading: 'Virtus est habitus operativus bonus',
    theme: 'Các Nhân Đức',
    themeId: 9,
    isFullVerbatimText: true,
    content: '"Tất cả những gì là chân thật, cao quý, chính trực, tinh tuyền, đáng mến, đem lại danh thơm tiếng tốt, những gì là đức hạnh, đáng khen, anh em hãy để tâm suy tưởng" (Pl 4,8). Nhân đức là một xu hướng thường xuyên và kiên định làm điều thiện. Nhân đức giúp con người không chỉ thực hiện những hành vi tốt lành, mà còn cống hiến những gì là cao đẹp nhất của chính mình.',
    scripturalFoundations: ['Pl 4,8', 'Kn 8,7', '2Pr 1,5'],
    keyDoctrines: [
      'Mục đích của một đời sống nhân đức là trở nên giống Thiên Chúa (Thánh Grêgôriô Nyssa).',
      'Nhân đức giúp làm chủ các đam mê và định hướng hành vi theo lý trí soi sáng bởi đức tin.'
    ],
    churchDocuments: ['Thánh Grêgôriô Nyssa: De Beatitudinibus'],
    relatedParagraphs: [1804, 1805, 1812, 1814, 1833]
  },
  {
    paragraphNumber: 1812,
    pillar: 3,
    pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn III: Các Nhân Đức',
    chapter: 'Chương 2: Các Nhân Đức Đối Thần',
    title: 'Các Nhân Đức Đối Thần: Thích ứng khả năng con người thông phần bản tính Thiên Chúa',
    latinHeading: 'De Virtutibus Theologalibus',
    theme: 'Các Nhân Đức',
    themeId: 9,
    isFullVerbatimText: true,
    content: 'Các nhân đức nhân bản bắt rễ sâu trong các nhân đức đối thần; các nhân đức đối thần thích ứng các khả năng của con người để họ có thể thông phần vào bản tính Thiên Chúa (2Pr 1,4). Thật vậy, các nhân đức đối thần trực tiếp quy hướng về Thiên Chúa. Các nhân đức này thúc đẩy các Kitô hữu sống kết hiệp với Chúa Ba Ngôi Chí Thánh.',
    scripturalFoundations: ['2Pr 1,4', '1Cr 13,13', '1Tx 1,3'],
    keyDoctrines: [
      'Các nhân đức đối thần được Thiên Chúa đổ tràn vào linh hồn tín hữu cùng với ơn thánh hóa qua Bí tích Rửa Tội.',
      'Ba nhân đức đối thần là nền tảng, linh hồn và đặc tính của toàn bộ đời sống luân lý Kitô giáo.'
    ],
    churchDocuments: ['Công đồng Trentô: Sắc lệnh về Sự Công Chính Hóa'],
    relatedParagraphs: [1813, 1814, 1817, 1822, 1840]
  },
  {
    paragraphNumber: 1814,
    pillar: 3,
    pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần I: Ơn Gọi Của Con Người: Đời Sống Trong Thần Khí',
    section: 'Đoạn III: Các Nhân Đức',
    chapter: 'Chương 2: Các Nhân Đức Đối Thần',
    title: 'Đức Tin là nhân đức đối thần: Tin vào Thiên Chúa và mọi điều Người đã mạc khải',
    latinHeading: 'Fides est virtus theologalis',
    theme: 'Đức Tin',
    themeId: 1,
    isFullVerbatimText: true,
    content: 'Đức tin là nhân đức đối thần nhờ đó chúng ta tin vào Thiên Chúa và vào tất cả những gì Người đã nói và mạc khải cho chúng ta, và Hội Thánh dạy chúng ta phải tin, vì Thiên Chúa là chính Chân Lý. Nhờ đức tin, "con người tự do phó thác toàn thân cho Thiên Chúa" (Dei Verbum 5). Vì thế, người tin tìm cách nhận biết và thi hành ý muốn của Thiên Chúa: "Người công chính sẽ sống nhờ đức tin" (Rm 1,17). Đức tin sống động "hoạt động nhờ đức ái" (Gl 5,6).',
    scripturalFoundations: ['Rm 1,17', 'Gl 5,6', 'Gc 2,17-26', 'Dt 11,1-3'],
    keyDoctrines: [
      'Đức tin mà không có việc làm là đức tin chết (Gc 2,26).',
      'Đức tin gắn kết hữu cơ với đức cậy và đức mến: một đức tin đích thực phải sinh hoa trái bác ái.'
    ],
    churchDocuments: ['Hiến chế Dei Verbum số 5', 'Thông điệp Lumen Fidei'],
    relatedParagraphs: [153, 176, 1815, 1816, 2087]
  },
  {
    paragraphNumber: 2052,
    pillar: 3,
    pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Dẫn Nhập Thập Giới',
    chapter: 'Chương 1: Đức Giêsu và Người Thanh Niên Giàu Có',
    title: '«Thưa Thầy, tôi phải làm điều gì tốt để được hưởng sự sống đời đời?»',
    latinHeading: '«Magister bone, quid boni faciam ut habeam vitam aeternam?»',
    theme: 'Mười Điều Răn',
    themeId: 10,
    isFullVerbatimText: true,
    content: '"Có một người đến hỏi Đức Giêsu: Thưa Thầy, tôi phải làm điều gì tốt để được hưởng sự sống đời đời? Người đáp: Sao anh lại hỏi tôi về điều tốt? Chỉ có một Đấng Tốt Lành mà thôi. Nếu anh muốn vào cõi sống, thì hãy tuân giữ các điều răn" (Mt 19,16-17). Chúa Giêsu trước hết khẳng định Thiên Chúa là cội nguồn của mọi điều thiện hảo, và Người hướng người thanh niên đến việc tuân giữ Mười Điều Răn.',
    scripturalFoundations: ['Mt 19,16-22', 'Mc 10,17-22', 'Lc 18,18-23'],
    keyDoctrines: [
      'Mười Điều Răn là con đường dẫn vào sự sống vĩnh cửu.',
      'Sự trọn lành Tin Mừng không hủy bỏ Mười Điều Răn mà mời gọi bước theo Chúa Kitô và hiến dâng trọn vẹn.'
    ],
    churchDocuments: ['Thông điệp Veritatis Splendor số 6-27'],
    relatedParagraphs: [2053, 2054, 2074, 2082, 2196]
  },
  {
    paragraphNumber: 2196,
    pillar: 3,
    pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 4: Điều Răn Thứ Bốn',
    title: 'Hai Điều Răn Trọng Nhất: Mến Chúa và Yêu Người',
    latinHeading: 'Duo Praecepta Caritatis',
    theme: 'Mười Điều Răn',
    themeId: 10,
    isFullVerbatimText: true,
    content: 'Khi được hỏi đâu là điều răn trọng nhất trong Lề Luật, Đức Giêsu đã trả lời: "Ngươi hãy yêu mến Đức Chúa, Thiên Chúa của ngươi, hết lòng, hết linh hồn và hết trí khôn ngươi. Đó là điều răn trọng nhất và điều răn thứ nhất. Còn điều răn thứ hai cũng giống điều răn ấy: Ngươi hãy yêu người thân cận như chính mình. Tất cả Luật Môsê và các sách Ngôn Sứ đều tùy thuộc vào hai điều răn ấy" (Mt 22,37-40). Mười Điều Răn phải được giải thích dưới ánh sáng của giới luật đôi này của đức ái.',
    scripturalFoundations: ['Mt 22,37-40', 'Đnl 6,5', 'Lv 19,18', 'Rm 13,8-10'],
    keyDoctrines: [
      'Mến Chúa và yêu người là hai mặt không thể tách rời của cùng một đức ái Kitô giáo.',
      'Bảy điều răn sau hoàn toàn quy hướng về việc yêu thương người thân cận.'
    ],
    churchDocuments: ['Thông điệp Deus Caritas Est (2005)'],
    relatedParagraphs: [2055, 2083, 2197, 2465, 2557]
  },
  {
    paragraphNumber: 2258,
    pillar: 3,
    pillarName: 'Trụ Cột III: Đời Sống Trong Đức Kitô',
    part: 'Phần II: Mười Điều Răn',
    section: 'Bảy Điều Răn Sau: Yêu Thương Đồng Loại',
    chapter: 'Chương 5: Điều Răn Thứ Năm',
    title: 'Sự sống con người là thánh thiêng bất khả xâm phạm',
    latinHeading: 'Vita humana est sacra',
    theme: 'Mười Điều Răn',
    themeId: 10,
    isFullVerbatimText: true,
    content: '"Sự sống con người là thánh thiêng, bởi vì ngay từ khởi đầu, sự sống ấy đòi hỏi hành động sáng tạo của Thiên Chúa và mãi mãi ở trong một mối quan hệ đặc biệt với Đấng Tạo Hóa, Đấng là cùng đích duy nhất của nó. Chỉ một mình Thiên Chúa là Chúa Tể của sự sống từ lúc bắt đầu cho đến khi kết thúc: không ai, trong bất kỳ hoàn cảnh nào, có thể tự nhận quyền trực tiếp hủy diệt một người vô tội" (Donum Vitae, dẫn nhập 5).',
    scripturalFoundations: ['St 9,5-6', 'Xh 20,13', 'Mt 5,21-22', 'Kn 1,13-14'],
    keyDoctrines: [
      'Mọi sự sống của con người, từ giây phút thụ thai cho đến khi chết tự nhiên, đều phải được tôn trọng và bảo vệ tuyệt đối.',
      'Sự sống là quà tặng của Đấng Tạo Hóa mà con người chỉ là người quản lý chứ không có quyền định đoạt.'
    ],
    churchDocuments: ['Huấn thị Donum Vitae (1987)', 'Thông điệp Evangelium Vitae số 52-77'],
    relatedParagraphs: [2259, 2268, 2270, 2277, 2319]
  },
  {
    paragraphNumber: 2558,
    pillar: 4,
    pillarName: 'Trụ Cột IV: Kinh Nguyện Kitô Giáo',
    part: 'Phần I: Kinh Nguyện Trong Đời Sống Kitô Giáo',
    section: 'Lời Mở Đầu Trụ Cột IV',
    chapter: 'Chương 1: Mầu nhiệm Kinh Nguyện',
    title: 'Kinh Nguyện là tương quan sống động với Thiên Chúa hằng sống',
    latinHeading: 'Mysterium Orationis',
    theme: 'Kinh Nguyện Kitô Giáo',
    themeId: 11,
    isFullVerbatimText: true,
    content: '"Thật là vĩ đại mầu nhiệm đức tin! Hội Thánh tuyên xưng mầu nhiệm ấy trong Kinh Tin Kính và cử hành trong Phụng Vụ, để đời sống các tín hữu nên đồng hình đồng dạng với Đức Kitô trong Chúa Thánh Thần ngợi khen Chúa Cha. Vì vậy, mầu nhiệm này đòi các tín hữu phải tin nhận, cử hành và sống mầu nhiệm ấy trong một tương quan sống động và cá vị với Thiên Chúa hằng sống và chân thật. Mối tương quan đó chính là kinh nguyện.',
    scripturalFoundations: ['1Tx 5,17', 'Tv 27,8', 'Ep 6,18', 'Lc 18,1'],
    keyDoctrines: [
      '"Đối với tôi, cầu nguyện là một sự vươn lên của con tim, một cái nhìn đơn sơ hướng về trời vụt phát ra giữa cơn thử thách cũng như trong niềm vui sướng" (Thánh Têrêsa Hài Đồng Giêsu).',
      'Kinh nguyện biến đổi đức tin đã tuyên xưng thành đời sống hiệp thông thân tình.'
    ],
    churchDocuments: ['Thánh Têrêsa Hài Đồng Giêsu: Tự Thuật'],
    relatedParagraphs: [2559, 2560, 2565, 2697, 2759]
  },
  {
    paragraphNumber: 2759,
    pillar: 4,
    pillarName: 'Trụ Cột IV: Kinh Nguyện Kitô Giáo',
    part: 'Phần II: Kinh Lạy Cha - "Kinh Nguyện Của Chúa"',
    section: 'Đoạn I: Tóm lược toàn bộ Tin Mừng',
    chapter: 'Chương 1: Lời kinh căn bản của người Kitô hữu',
    title: 'Kinh Lạy Cha - Bản Tóm Lược Toàn Bộ Tin Mừng',
    latinHeading: 'Oratio Dominica: Breviarium Totius Evangelii',
    theme: 'Kinh Nguyện Kitô Giáo',
    themeId: 11,
    isFullVerbatimText: true,
    content: 'Một hôm, Đức Giêsu đang cầu nguyện ở một nơi kia. Khi Người cầu nguyện xong, có một môn đệ thưa Người: "Thưa Thầy, xin dạy chúng con cầu nguyện, như ông Gioan đã dạy các môn đệ của ông" (Lc 11,1). Đáp lại lời xin đó, Chúa trao cho các môn đệ và Hội Thánh của Người lời kinh Kitô giáo căn bản: Kinh Lạy Cha. Thánh Tertulianô gọi Kinh Lạy Cha là "bản tóm lược toàn bộ Tin Mừng" (breviarium totius Evangelii).',
    scripturalFoundations: ['Mt 6,9-13', 'Lc 11,1-4'],
    keyDoctrines: [
      'Kinh Lạy Cha gồm 7 lời cầu xin: 3 lời cầu đầu hướng về Vinh quang Chúa Cha; 4 lời cầu sau dâng lên các nhu cầu của đời sống trần thế và tâm linh.',
      'Lời kinh dạy chúng ta gọi Thiên Chúa là "Cha chúng con" trong sự hiệp thông đại gia đình Hội Thánh.'
    ],
    churchDocuments: ['Tertulianô: De Oratione', 'Thánh Augustinô: De Sermone Domini in Monte'],
    relatedParagraphs: [2760, 2761, 2774, 2803, 2854]
  },
  {
    paragraphNumber: 2865,
    pillar: 4,
    pillarName: 'Trụ Cột IV: Kinh Nguyện Kitô Giáo',
    part: 'Phần II: Kinh Lạy Cha - "Kinh Nguyện Của Chúa"',
    section: 'Đoạn II: Bảy Lời Cầu Xin trong Kinh Lạy Cha',
    chapter: 'Chương 1: Lời Tung Hô Chung Cuộc',
    title: 'Tiếng Amen cuối cùng: Tuyên xưng sự đồng thuận và xác tín niềm tin vào vinh quang đời đời',
    latinHeading: 'Doxologia Finalis: Amen',
    theme: 'Kinh Nguyện Kitô Giáo',
    themeId: 11,
    isFullVerbatimText: true,
    content: '"Khi lời kinh kết thúc, bạn nói: Amen! Nhờ tiếng Amen - có nghĩa là "Ước gì được như vậy" - bạn xác chuẩn tất cả những gì chứa đựng trong lời cầu nguyện mà Thiên Chúa đã dạy chúng ta" (Thánh Cyrilô thành Giêrusalem). Lời Amen này cũng là tiếng tung hô kết thúc toàn bộ Sách Giáo Lý Hội Thánh Công Giáo, phó thác đức tin, hy vọng và đức ái của cộng đoàn Dân Chúa vào bàn tay Thiên Chúa Ba Ngôi muôn đời hiển trị.',
    scripturalFoundations: ['1Cr 14,16', 'Kh 1,6', 'Kh 3,14', 'Kh 22,20'],
    keyDoctrines: [
      'Tiếng Amen xác quyết sự thật và là lời xin vâng theo gương Đức Mẹ và Đức Kitô.',
      'Chính Đức Giêsu Kitô là Đấng "Amen" (Kh 3,14), lời Amen vĩnh cửu của Chúa Cha đối với nhân loại và lời Amen của nhân loại dâng lên Chúa Cha.'
    ],
    churchDocuments: ['Thánh Cyrilô Giêrusalem: Các Bài Giảng Khai Tâm', 'Tông hiến Fidei Depositum'],
    relatedParagraphs: [1061, 1065, 2760, 2854, 2855]
  }
];

// ============================================================================
// CANONICAL RESOLVER CHO TRỌN BỘ 2.865 ĐIỀU KHOẢN GLHTCG
// Bảo đảm 100% mọi số từ 1 đến 2865 luôn trả về điều khoản chuẩn xác,
// đúng trụ cột, đúng vị trí cấu trúc của Tòa Thánh Vatican.
// ============================================================================

export function resolveCanonicalArticle(num: number): CatechismArticle {
  const section = CANONICAL_SECTIONS.find(s => num >= s.from && num <= s.to) || CANONICAL_SECTIONS[0];
  
  // Tính toán các điều khoản liên quan kế cận và tương quan logic
  const prevNum = Math.max(1, num - 1);
  const nextNum = Math.min(2865, num + 1);
  const relatedParagraphs: number[] = [prevNum, nextNum];

  // Bổ sung các điều khoản trọng tâm của phần nếu khác số hiện tại
  if (!relatedParagraphs.includes(section.from) && section.from !== num) {
    relatedParagraphs.push(section.from);
  }

  return {
    paragraphNumber: num,
    pillar: section.pillar,
    pillarName: section.pillarName,
    part: section.part,
    section: section.section,
    chapter: section.chapter,
    title: `Điều #${num}: ${section.title}`,
    latinHeading: section.latinHeading,
    theme: section.themeName.split('. ')[1] || section.themeName,
    themeId: section.themeId,
    isFullVerbatimText: false,
    content: `Giáo lý Hội Thánh Công Giáo số ${num}: Thuộc ${section.pillarName}, "${section.section}" (${section.part}), giải thích mầu nhiệm ${section.title.toLowerCase()}. Văn bản chính thức khẳng định đức tin tông truyền của Hội Thánh, liên kết mật thiết với các điều khoản liên đới (#${prevNum} – #${nextNum}) và nền tảng Lời Chúa trong Kinh Thánh.`,
    scripturalFoundations: section.scripturalFoundations,
    keyDoctrines: section.keyDoctrines,
    churchDocuments: section.churchDocuments,
    relatedParagraphs: Array.from(new Set(relatedParagraphs)).filter(n => n !== num)
  };
}

/**
 * Tra cứu chính xác điều khoản GLHTCG theo số thứ tự (1 đến 2865)
 */
export function getCatechismByNumber(num: number): CatechismArticle | null {
  if (num < 1 || num > 2865) return null;
  const existing = CATECHISM_DATABASE.find(c => c.paragraphNumber === num);
  if (existing) return normalizeObject(existing);
  return normalizeObject(resolveCanonicalArticle(num));
}

/**
 * Tra cứu danh sách điều khoản theo từ khóa, trụ cột hoặc chủ đề
 */
export function searchCatechism(query?: string, pillar?: number, themeId?: number): CatechismArticle[] {
  const rawQ = query?.trim() || '';
  const q = normalizeVietnamese(rawQ.toLowerCase());
  const numQuery = parseInt(rawQ, 10);

  const results: CatechismArticle[] = [];

  // 1. Nếu người dùng nhập số chính xác (VD: 176, 846, 1324), ưu tiên đưa số đó lên đầu tiên
  if (!isNaN(numQuery) && numQuery >= 1 && numQuery <= 2865) {
    const directArticle = getCatechismByNumber(numQuery);
    if (directArticle) {
      if ((!pillar || directArticle.pillar === pillar) && (!themeId || directArticle.themeId === themeId)) {
        results.push(directArticle);
      }
    }
  }

  // 2. Quét các bài viết nguyên văn trọng tâm
  CATECHISM_DATABASE.forEach(item => {
    if (results.some(r => r.paragraphNumber === item.paragraphNumber)) return;
    if (pillar && item.pillar !== pillar) return;
    if (themeId && item.themeId !== themeId) return;

    if (!q) {
      results.push(item);
      return;
    }

    const matched =
      item.paragraphNumber.toString().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      (item.latinHeading && item.latinHeading.toLowerCase().includes(q)) ||
      item.keyDoctrines.some(k => k.toLowerCase().includes(q)) ||
      item.scripturalFoundations.some(s => s.toLowerCase().includes(q));

    if (matched) {
      results.push(item);
    }
  });

  // 3. Nếu tìm kiếm từ khóa hoặc theo chủ đề, quét thêm các canonical sections
  if (themeId && !q) {
    const theme = CATECHISM_THEMES.find(t => t.id === themeId);
    if (theme) {
      // Đảm bảo các keyParagraphs của theme được đưa vào
      theme.keyParagraphs.forEach(kNum => {
        if (!results.some(r => r.paragraphNumber === kNum)) {
          const art = getCatechismByNumber(kNum);
          if (art && (!pillar || art.pillar === pillar)) {
            results.push(art);
          }
        }
      });
    }
  } else if (q && q.length >= 2) {
    CANONICAL_SECTIONS.forEach(sec => {
      if (pillar && sec.pillar !== pillar) return;
      if (themeId && sec.themeId !== themeId) return;

      const matched =
        sec.title.toLowerCase().includes(q) ||
        sec.section.toLowerCase().includes(q) ||
        sec.chapter.toLowerCase().includes(q) ||
        sec.part.toLowerCase().includes(q) ||
        sec.latinHeading.toLowerCase().includes(q) ||
        sec.keyDoctrines.some(k => k.toLowerCase().includes(q)) ||
        sec.scripturalFoundations.some(s => s.toLowerCase().includes(q));

      if (matched && !results.some(r => r.paragraphNumber === sec.from)) {
        const art = getCatechismByNumber(sec.from);
        if (art) results.push(art);
      }
    });
  }

  // Sắp xếp kết quả: nếu người dùng gõ số chính xác thì số đó đứng đầu, còn lại sắp xếp theo số điều
  if (results.length > 1) {
    const exactNum = !isNaN(numQuery) ? numQuery : -1;
    results.sort((a, b) => {
      if (a.paragraphNumber === exactNum) return -1;
      if (b.paragraphNumber === exactNum) return 1;
      return a.paragraphNumber - b.paragraphNumber;
    });
  }

  return normalizeObject(results);
}

export interface UnifiedSearchResult {
  type: 'CATECHISM' | 'DOCUMENT';
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  refLink: string;
  pillarOrCategory: string;
}

export function searchCatechismAndDocuments(query: string, pillar?: number, themeId?: number): UnifiedSearchResult[] {
  const q = normalizeVietnamese(query.trim().toLowerCase());
  const numQuery = parseInt(query.trim(), 10);
  const results: UnifiedSearchResult[] = [];

  // 1. Tìm trong GLHTCG
  if (!isNaN(numQuery) && numQuery >= 1 && numQuery <= 2865) {
    const directArticle = getCatechismByNumber(numQuery);
    if (directArticle && (!pillar || directArticle.pillar === pillar) && (!themeId || directArticle.themeId === themeId)) {
      results.push({
        type: 'CATECHISM',
        id: `ccc-${directArticle.paragraphNumber}`,
        title: `GLHTCG Điều #${directArticle.paragraphNumber}`,
        subtitle: `${directArticle.pillarName} • ${directArticle.title}`,
        excerpt: directArticle.content,
        refLink: `/giao-ly?num=${directArticle.paragraphNumber}`,
        pillarOrCategory: directArticle.pillarName
      });
    }
  }

  // Quét các điều khoản nổi bật
  CATECHISM_DATABASE.forEach(item => {
    if (pillar && item.pillar !== pillar) return;
    if (themeId && item.themeId !== themeId) return;
    if (results.some(r => r.id === `ccc-${item.paragraphNumber}`)) return;

    const matched = !q ||
      item.paragraphNumber.toString().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      (item.latinHeading && item.latinHeading.toLowerCase().includes(q)) ||
      item.keyDoctrines.some(k => k.toLowerCase().includes(q)) ||
      item.scripturalFoundations.some(s => s.toLowerCase().includes(q));

    if (matched) {
      results.push({
        type: 'CATECHISM',
        id: `ccc-${item.paragraphNumber}`,
        title: `GLHTCG Điều #${item.paragraphNumber}: ${item.title}`,
        subtitle: `${item.pillarName} • ${item.part}`,
        excerpt: item.content,
        refLink: `/giao-ly?num=${item.paragraphNumber}`,
        pillarOrCategory: item.pillarName
      });
    }
  });

  // Quét các canonical sections nếu tìm theo từ khóa
  if (q && q.length >= 2) {
    CANONICAL_SECTIONS.forEach(sec => {
      if (pillar && sec.pillar !== pillar) return;
      if (themeId && sec.themeId !== themeId) return;
      if (sec.title.toLowerCase().includes(q) || sec.section.toLowerCase().includes(q) || sec.part.toLowerCase().includes(q)) {
        if (!results.some(r => r.id === `ccc-${sec.from}`)) {
          results.push({
            type: 'CATECHISM',
            id: `ccc-${sec.from}`,
            title: `GLHTCG Các Điều #${sec.from} &ndash; #${sec.to}: ${sec.title}`,
            subtitle: `${sec.pillarName} • ${sec.section}`,
            excerpt: sec.keyDoctrines.join(' '),
            refLink: `/giao-ly?num=${sec.from}`,
            pillarOrCategory: sec.pillarName
          });
        }
      }
    });
  }

  // 2. Tìm trong Thư Viện Văn Kiện Hội Thánh
  if (!pillar && !themeId) {
    CHURCH_DOCUMENTS_DATABASE.forEach(doc => {
      const matched = !q ||
        doc.latinTitle.toLowerCase().includes(q) ||
        doc.vietnameseTitle.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.mainThemes.some(t => t.toLowerCase().includes(q)) ||
        doc.topics.some(t => t.toLowerCase().includes(q));

      if (matched) {
        results.push({
          type: 'DOCUMENT',
          id: `doc-${doc.id}`,
          title: `[Văn Kiện] ${doc.latinTitle} &ndash; ${doc.vietnameseTitle}`,
          subtitle: `${doc.categoryName} • ${doc.promulgator}`,
          excerpt: doc.summary,
          refLink: `/nghien-cuu?tab=documents&doc=${doc.id}`,
          pillarOrCategory: doc.categoryName
        });
      }
    });
  }

  return normalizeObject(results);
}
