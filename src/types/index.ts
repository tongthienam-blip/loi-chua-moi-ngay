// ============================================================================
// HỆ THỐNG ĐỊNH NGHĨA DỮ LIỆU KINH THÁNH & THẦN HỌC CÔNG GIÁO
// Nền tảng "Lời Chúa Mỗi Ngày"
// ============================================================================

export type Testament = 'OLD' | 'NEW';

export type BookCategory = 
  | 'PENTATEUCH'      // Ngũ Thư (5)
  | 'HISTORICAL'      // Lịch Sử (16)
  | 'WISDOM'          // Khôn Ngoan & Giáo Huấn (7)
  | 'PROPHETS'        // Ngôn Sứ (18)
  | 'GOSPELS'         // Phúc Âm / Tin Mừng (4)
  | 'ACTS'            // Tông Đồ Công Vụ (1)
  | 'EPISTLES'        // Các Thư Tín Phaolô & Tông Đồ (21)
  | 'REVELATION';     // Khải Huyền (1)

export interface BookStructureSection {
  section: string;
  chapters: string;
  description: string;
}

export interface KeyVerse {
  reference: string;
  text: string;
}

export interface BibleBook {
  id: string;                         // e.g. 'gen', 'exod', 'matt', 'john'
  code: string;                       // e.g. 'GN', 'EX', 'MT', 'JN'
  name: string;                       // 'Sáng Thế', 'Mátthêu'
  latinName: string;                  // 'Genesis', 'Matthaeus'
  abbreviation: string;               // 'St', 'Mt'
  testament: Testament;
  category: BookCategory;
  categoryName: string;               // 'Ngũ Thư', 'Tin Mừng'
  chaptersCount: number;
  order: number;
  
  // 10 Tiêu chuẩn giới thiệu chuyên sâu theo Thần học & Chú giải Công giáo
  overview: string;                   // 1. Giới thiệu tổng quan
  authorTradition: string;            // 2. Tác giả & truyền thống tác giả
  compositionPeriod: string;          // 3. Thời điểm & bối cảnh hình thành
  historicalContext: string;          // 4. Bối cảnh lịch sử
  mainThemes: string[];               // 5. Chủ đề chính
  purpose: string;                    // 6. Mục đích biên soạn
  structure: BookStructureSection[];  // 7. Cấu trúc tổng quát
  keyFigures: string[];               // 8. Nhân vật quan trọng
  keyVerses: KeyVerse[];              // 9. Câu Kinh Thánh nổi bật
  theologicalSignificance: string;    // 10. Ý nghĩa Thần học Công giáo
}

export interface BibleVerse {
  id: string;                         // 'gen-1-1'
  bookId: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
  contextBeforeAfter?: string;
  commentary?: string;
  theologicalThemes?: string[];
  relatedVerses?: string[];
  cccLinks?: number[];                // Số Giáo Lý Hội Thánh Công Giáo
  churchDocLinks?: {
    docId: string;
    docName: string;
    section: string;
    title: string;
  }[];
  footnotes?: string;
}

export interface BibleChapter {
  bookId: string;
  chapterNumber: number;
  title?: string;
  summary: string;
  content?: string;                    // Toàn văn HTML chuẩn tiếng Việt (augustino.net / kho Kinh Thánh Công Giáo)
  // 12 Mục nghiên cứu chuyên sâu chuẩn học thuật Công giáo
  historicalContext?: string;          // 1. Bối cảnh lịch sử
  geography?: string;
  culturalContext?: string;
  geographyAndCulture?: string;        // 2. Địa lý và văn hóa
  authorAndAudience?: string;          // 3. Tác giả và độc giả
  literaryStructure?: string;          // 4. Cấu trúc văn chương
  characters?: string[];               // 5. Các nhân vật
  keyKeywords?: Array<{ term: string; meaning: string; originalLanguage?: string }>; // 6. Từ ngữ quan trọng
  theologicalMeaning?: string;         // 7. Ý nghĩa thần học
  christologicalMeaning?: string;      // 8. Ý nghĩa Kitô học
  christianMessage?: string;
  otNtConnections?: string[];          // 9. Liên hệ Cựu Ước – Tân Ước
  relatedPassages?: string[];
  cccConnections?: number[];           // 10. Liên hệ GLHTCG
  churchDocConnections?: string[];     // 11. Liên hệ văn kiện Hội Thánh
  meditationAndApplication?: string;   // 12. Gợi ý suy niệm và áp dụng đời sống
  academicSources?: string[];          // Nguồn tài liệu tham khảo học thuật
  canonicalVerseCount?: number;
  isPendingFullText?: boolean;
  keyVerses?: KeyVerse[];
  verses: BibleVerse[];
}

// ----------------------------------------------------------------------------
// PHỤNG VỤ THÁNH
// ----------------------------------------------------------------------------

export type LiturgicalSeason = 
  | 'ADVENT'          // Mùa Vọng
  | 'CHRISTMAS'       // Mùa Giáng Sinh
  | 'LENT'            // Mùa Chay
  | 'TRIDUUM'         // Tam Nhật Vượt Qua
  | 'EASTER'          // Mùa Phục Sinh
  | 'ORDINARY_TIME';  // Mùa Thường Niên

export type LiturgicalColor = 'WHITE' | 'RED' | 'PURPLE' | 'GREEN' | 'ROSE' | 'GOLD';

export type FeastRank = 
  | 'SOLEMNITY'       // Lễ Trọng
  | 'FEAST'           // Lễ Kính
  | 'MEMORIAL'        // Lễ Nhớ Bắt Buộc
  | 'OPTIONAL_MEMORIAL' // Lễ Nhớ Tùy Chọn
  | 'WEEKDAY';        // Ngày Trong Tuần / Thứ

export interface LiturgicalReadingSection {
  reference: string;
  passage: string;
  text: string;
  theme?: string;
}

export interface ResponsorialPsalmSection {
  reference: string;
  refrain: string;
  verses: string[];
}

export interface DailyLiturgicalReading {
  id: string;
  date: string;                       // YYYY-MM-DD
  title: string;
  season: LiturgicalSeason;
  seasonName: string;
  color: LiturgicalColor;
  colorName: string;
  rank: FeastRank;
  rankName: string;
  cycle: string;                      // 'Năm B - Năm II'
  liturgicalWeek: string;             // 'Tuần XXXI Thường Niên'
  saintOfTheDay?: string;
  firstReading: LiturgicalReadingSection;
  responsorialPsalm: ResponsorialPsalmSection;
  secondReading?: LiturgicalReadingSection;
  gospelAcclamation?: { verse: string; text: string };
  gospel: LiturgicalReadingSection;
  openingPrayer?: string;
  prayerOfFaithful?: string[];
  closingPrayer?: string;
  communionPrayer?: string;
  sourceNote: string;
}

// ----------------------------------------------------------------------------
// ĐỐI CHIẾU CỰU ƯỚC - TÂN ƯỚC (TYPOLOGY)
// ----------------------------------------------------------------------------

export interface TypologyConnection {
  id: string;
  title: string;
  /** Alias for title — used in research page display */
  theme?: string;
  /** Short description / tagline for the connection */
  description?: string;
  /** Visual symbol emoji for the connection */
  symbol?: string;
  category: string;
  otPassage: {
    reference: string;
    title: string;
    text: string;
    symbolism: string;
  };
  /** Plural alias — array of OT passages (nghien-cuu page uses this) */
  otPassages?: Array<{ reference: string; text: string; symbolism?: string }>;
  ntPassage: {
    reference: string;
    title: string;
    text: string;
    fulfillment: string;
  };
  /** Plural alias — array of NT fulfilments (nghien-cuu page uses this) */
  ntFulfillment?: Array<{ reference: string; text: string; fulfillment?: string }>;
  similarities: string[];
  /** Alias for contrasts */
  differences?: string[];
  contrasts: string[];
  salvationHistorySignificance: string;
  catholicTradition: string;
  churchFatherQuote?: {
    father: string;
    quote: string;
    source: string;
  };
}

// ----------------------------------------------------------------------------
// GIÁO LÝ HỘI THÁNH CÔNG GIÁO (GLHTCG / CCC)
// ----------------------------------------------------------------------------

export type CatechismPillar = 1 | 2 | 3 | 4;

export interface CatechismArticle {
  paragraphNumber: number;
  pillar: CatechismPillar;
  pillarName: string;                 // '1. Tuyên xưng đức tin', '2. Cử hành...', etc.
  part: string;
  section: string;
  chapter: string;
  title: string;
  content: string;
  scripturalFoundations: string[];
  keyDoctrines: string[];
  relatedParagraphs: number[];
  theme?: string;
  themeId?: number;
  latinHeading?: string;
  churchDocuments?: string[];
  isFullVerbatimText?: boolean;
}

// ----------------------------------------------------------------------------
// THƯ VIỆN VĂN KIỆN HỘI THÁNH
// ----------------------------------------------------------------------------

export type DocumentCategory = 
  | 'VATICAN_II'               // 1. Công đồng Vaticanô II
  | 'POPE_TEACHINGS'           // 2. Giáo huấn của các Đức Giáo hoàng
  | 'SOCIAL_DOCTRINE'          // 3. Học thuyết Xã hội Công giáo
  | 'LITURGY'                  // 4. Phụng vụ
  | 'DOCTRINE_FAITH'           // 5. Giáo lý và đức tin
  | 'FAMILY_HUMAN_DIGNITY'     // 6. Gia đình và phẩm giá con người
  | 'VOCATION_CONSECRATED'     // 7. Ơn gọi và đời sống thánh hiến
  | 'MISSION_EVANGELIZATION'   // 8. Truyền giáo và loan báo Tin Mừng
  | 'ECOLOGY_ENVIRONMENT'      // 9. Môi trường và sinh thái toàn diện
  | 'ENCYCLICAL'               // Hậu phương tương thích ngược
  | 'APOSTOLIC_EXHORTATION';   // Hậu phương tương thích ngược

export interface DocumentKeySection {
  number: string;
  heading: string;
  excerpt: string;
  biblicalRoot: string[];
  theologicalKey: string;
}

export interface ChurchDocumentItem {
  id: string;
  category: DocumentCategory;
  categoryName: string;
  /** Shorthand alias — same as latinTitle, used in research page */
  title?: string;
  /** Document type label e.g. 'Thông điệp', 'Hiến chế', 'Tông huấn' */
  documentType?: string;
  latinTitle: string;
  vietnameseTitle: string;
  promulgator: string;                // e.g. 'Công đồng Vaticanô II', 'ĐTC Phanxicô', 'ĐTC Lêô XIII'
  /** Alias for promulgator — research page uses this */
  author?: string;
  promulgationDate: string;           // e.g. '18/11/1965'
  /** Year shorthand derived from promulgationDate — research page uses this */
  year?: string;
  historicalContext: string;
  purpose: string;
  mainThemes: string[];
  /** Singular alias for mainThemes[0] — research page uses this */
  mainTheme?: string;
  summary: string;
  /** Cấu trúc tổng thể của văn kiện */
  structure?: string;
  keySections: DocumentKeySection[];
  /** Key memorable quotes from the document */
  keyQuotes?: Array<{ number: string; text: string; note?: string }>;
  scriptureConnections: string[];
  /** Alias for scriptureConnections with richer shape */
  scriptureReferences?: Array<{ reference: string; note?: string }>;
  topics: string[];
  /** Nguồn văn bản chính thức (Vatican.va / HĐGMVN) */
  officialSource?: string;
}

// ----------------------------------------------------------------------------
// SUY NIỆM & ĐỜI SỐNG THIÊNG LIÊNG
// ----------------------------------------------------------------------------

export interface DailyReflectionItem {
  id: string;
  date: string;
  title: string;
  scriptureReference: string;
  scriptureText: string;
  // 8 Phần suy niệm chuẩn mực
  background: string;                 // 1. Bối cảnh
  explanation: string;                // 2. Giải thích
  coreMessage: string;                // 3. Sứ điệp chính
  lifeApplication: string;            // 4. Liên hệ đời sống
  reflectionQuestions: string[];      // 5. Câu hỏi suy gẫm
  practicalResolution: string;        // 6. Quyết tâm thực hành
  prayer: string;                     // 7. Lời nguyện kết
  category: string;                   // 8. Chuyên mục (Đức tin, Thập giá, Tha thứ, Gia đình...)
  author: string;
}

// ----------------------------------------------------------------------------
// NHẬT KÝ THIÊNG LIÊNG
// ----------------------------------------------------------------------------

export interface SpiritualJournalRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  scriptureReference?: string;
  scriptureQuote?: string;
  touchedByWord: string;              // Điều đánh động bản thân
  personalPrayer: string;             // Ý cầu nguyện
  dailyResolution: string;            // Quyết tâm sống
  tags: string[];
}

// ----------------------------------------------------------------------------
// KẾ HOẠCH ĐỌC KINH THÁNH
// ----------------------------------------------------------------------------

export interface ReadingPlanDayPassage {
  bookId: string;
  bookName: string;
  chapters: string;                   // e.g. '1-3'
  label: string;                      // 'St 1-3'
}

export interface ReadingPlanDay {
  dayNumber: number;
  title: string;
  passages: ReadingPlanDayPassage[];
  focusVerse?: string;
  objective?: string;                 // Mục tiêu bài học của ngày
  suggestion?: string;                // Nội dung gợi ý suy niệm & thực hành
}

export interface ReadingPlanItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  durationDays: number;
  category: 'ALL_BIBLE' | 'NEW_TESTAMENT' | 'GOSPELS' | 'PSALMS' | 'THEMATIC_TOPIC' | 'LITURGICAL_SEASON' | 'THEMATIC';
  categoryLabel: string;
  badge: string;
  days: ReadingPlanDay[];
}

// ----------------------------------------------------------------------------
// THIẾT LẬP NGƯỜI DÙNG & TIẾN ĐỘ
// ----------------------------------------------------------------------------

export interface UserPersonalData {
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  readingTheme: 'light' | 'sepia' | 'dark';
  bookmarks: {
    id: string;
    bookId: string;
    chapter: number;
    verse: number;
    text: string;
    bookName: string;
    createdAt: string;
  }[];
  highlights: {
    id: string;
    verseId: string;
    color: 'yellow' | 'green' | 'blue' | 'rose';
  }[];
  personalNotes: {
    id: string;
    verseId: string;
    note: string;
    updatedAt: string;
  }[];
  activePlanId: string | null;
  completedPlanDays: { [planId: string]: number[] }; // planId -> array of completed day numbers
  streakDays: number;
  lastReadDate: string | null;
  lastReadLocation: {
    bookId: string;
    chapterNumber: number;
    verseNumber?: number;
  } | null;
  currentUser?: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    provider: 'google' | 'email';
    role: 'USER' | 'CATECHIST' | 'PRIEST' | 'THEOLOGIAN' | 'ADMIN';
    lastLoginAt: string;
  } | null;
}

// ----------------------------------------------------------------------------
// TIN TỨC GIÁO HỘI & HUẤN QUYỀN HĐGMVN
// ----------------------------------------------------------------------------

export interface CatholicNewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  imageUrl: string;
  source: 'HĐGMVN' | 'Vatican News' | 'Công Giáo Việt Nam';
  category: string;
  publishedAt: string;
}
