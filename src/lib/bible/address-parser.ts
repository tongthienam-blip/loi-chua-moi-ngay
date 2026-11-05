/**
 * ============================================================================
 * TIỆN ÍCH PHÂN TÍCH ĐỊA CHỈ KINH THÁNH (SCRIPTURE ADDRESS PARSER)
 * Hỗ trợ các cú pháp Công giáo Việt Nam và quốc tế: St 1,1; Ga 3,16; Rm 8,28; Mt 5,3
 * ============================================================================
 */

import { CATHOLIC_BIBLE_BOOKS } from '@/data/catholic-books';

export interface ParsedScriptureAddress {
  bookId: string;
  bookName: string;
  bookAbbreviation: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
  isValid: boolean;
  canonicalRef: string;
}

// Bảng ánh xạ viết tắt tiếng Việt & quốc tế chuẩn xác sang bookId
const ABBREVIATION_MAP: Record<string, string> = {
  // Cựu Ước
  'st': 'gen', 'sang the': 'gen', 'sáng thế': 'gen', 'gen': 'gen', 'genesis': 'gen',
  'xh': 'exod', 'xuat hanh': 'exod', 'xuất hành': 'exod', 'ex': 'exod', 'exod': 'exod', 'exodus': 'exod',
  'lv': 'lev', 'levi': 'lev', 'lêvi': 'lev', 'lev': 'lev', 'leviticus': 'lev',
  'ds': 'num', 'dan so': 'num', 'dân số': 'num', 'nm': 'num', 'num': 'num', 'numeri': 'num',
  'dnl': 'deut', 'đnl': 'deut', 'de nhi luat': 'deut', 'đệ nhị luật': 'deut', 'deut': 'deut',
  'gs': 'josh', 'giosue': 'josh', 'giôsuê': 'josh', 'js': 'josh', 'josh': 'josh',
  'tl': 'judg', 'thu lanh': 'judg', 'thủ lãnh': 'judg', 'jg': 'judg', 'judg': 'judg',
  'rt': 'ruth', 'rut': 'ruth', 'rút': 'ruth', 'ruth': 'ruth',
  '1sm': '1sam', '1 samuel': '1sam', '1s': '1sam', '1sam': '1sam',
  '2sm': '2sam', '2 samuel': '2sam', '2s': '2sam', '2sam': '2sam',
  '1v': '1kgs', '1 cac vua': '1kgs', '1 các vua': '1kgs', '1k': '1kgs', '1kgs': '1kgs',
  '2v': '2kgs', '2 cac vua': '2kgs', '2 các vua': '2kgs', '2k': '2kgs', '2kgs': '2kgs',
  '1sb': '1chr', '1 su bien': '1chr', '1 sử biên': '1chr', '1ch': '1chr', '1chr': '1chr',
  '2sb': '2chr', '2 su bien': '2chr', '2 sử biên': '2chr', '2ch': '2chr', '2chr': '2chr',
  'er': 'ezra', 'etra': 'ezra', 'ezr': 'ezra', 'ezra': 'ezra',
  'nkm': 'neh', 'nekhemia': 'neh', 'nêkhemia': 'neh', 'neh': 'neh',
  'tb': 'tob', 'tobia': 'tob', 'tôbia': 'tob', 'tob': 'tob',
  'gdt': 'jdt', 'gđt': 'jdt', 'giuditha': 'jdt', 'giuđitha': 'jdt', 'jdt': 'jdt',
  'et': 'esth', 'ette': 'esth', 'étte': 'esth', 'ester': 'esth', 'esth': 'esth', 'esther': 'esth',
  '1mcb': '1macc', '1 macabe': '1macc', '1 macabê': '1macc', '1macc': '1macc',
  '2mcb': '2macc', '2 macabe': '2macc', '2 macabê': '2macc', '2macc': '2macc',
  'g': 'job', 'giop': 'job', 'gióp': 'job', 'job': 'job',
  'tv': 'ps', 'thanh vinh': 'ps', 'thánh vịnh': 'ps', 'ps': 'ps', 'psalm': 'ps', 'psalms': 'ps',
  'chm': 'prov', 'cham ngon': 'prov', 'châm ngôn': 'prov', 'pr': 'prov', 'prov': 'prov',
  'gv': 'eccl', 'giang vien': 'eccl', 'giảng viên': 'eccl', 'ec': 'eccl', 'eccl': 'eccl',
  'dcr': 'song', 'diem ca': 'song', 'diễm ca': 'song', 'ct': 'song', 'song': 'song',
  'kn': 'wis', 'khon ngoan': 'wis', 'khôn ngoan': 'wis', 'ws': 'wis', 'wis': 'wis',
  'hc': 'sir', 'huan ca': 'sir', 'huấn ca': 'sir', 'si': 'sir', 'sir': 'sir',
  'is': 'isa', 'isaia': 'isa', 'isa': 'isa',
  'gr': 'jer', 'gieremia': 'jer', 'giêrêmia': 'jer', 'jer': 'jer',
  'ac': 'lam', 'ai ca': 'lam', 'lm': 'lam', 'lam': 'lam',
  'br': 'bar', 'baruc': 'bar', 'barúc': 'bar', 'bar': 'bar',
  'ez': 'ezek', 'edekiel': 'ezek', 'êdêkiel': 'ezek', 'ezek': 'ezek',
  'dn': 'dan', 'đn': 'dan', 'danien': 'dan', 'đanien': 'dan', 'dan': 'dan',
  'hs': 'hos', 'hose': 'hos', 'hôsê': 'hos', 'hos': 'hos',
  'ge': 'joel', 'gioen': 'joel', 'giôen': 'joel', 'jl': 'joel', 'joel': 'joel',
  'am': 'amos', 'amot': 'amos', 'amốt': 'amos', 'amos': 'amos',
  'ov': 'obad', 'ôv': 'obad', 'ovadia': 'obad', 'ôvađia': 'obad', 'ob': 'obad', 'obad': 'obad',
  'gna': 'jonah', 'giona': 'jonah', 'giôna': 'jonah', 'jon': 'jonah', 'jonah': 'jonah',
  'mk': 'mic', 'mika': 'mic', 'mic': 'mic',
  'nak': 'nah', 'nakhum': 'nah', 'nah': 'nah', 'na': 'nah',
  'hbk': 'hab', 'khabacuc': 'hab', 'khabacúc': 'hab', 'hab': 'hab',
  'xp': 'zeph', 'xophonia': 'zeph', 'xôphônia': 'zeph', 'zp': 'zeph', 'zeph': 'zeph',
  'hgg': 'hag', 'khaigai': 'hag', 'hg': 'hag', 'hag': 'hag',
  'zcr': 'zech', 'dakarria': 'zech', 'zc': 'zech', 'zech': 'zech',
  'ml': 'mal', 'malaikhi': 'mal', 'mal': 'mal',

  // Tân Ước
  'mt': 'matt', 'mattheu': 'matt', 'mátthêu': 'matt', 'matt': 'matt', 'matthew': 'matt',
  'mc': 'mark', 'macco': 'mark', 'máccô': 'mark', 'mr': 'mark', 'mark': 'mark',
  'lc': 'luke', 'luca': 'luke', 'lk': 'luke', 'luke': 'luke',
  'ga': 'john', 'gioan': 'john', 'jn': 'john', 'john': 'john',
  'cv': 'acts', 'tong do cong vu': 'acts', 'tông đồ công vụ': 'acts', 'cong vu': 'acts', 'công vụ': 'acts', 'act': 'acts', 'acts': 'acts',
  'rm': 'rom', 'roma': 'rom', 'rôma': 'rom', 'ro': 'rom', 'rom': 'rom', 'romans': 'rom',
  '1cr': '1cor', '1 corinto': '1cor', '1 côrintô': '1cor', '1co': '1cor', '1cor': '1cor',
  '2cr': '2cor', '2 corinto': '2cor', '2 côrintô': '2cor', '2co': '2cor', '2cor': '2cor',
  'gl': 'gal', 'galat': 'gal', 'galát': 'gal', 'ga-lat': 'gal', 'gal': 'gal', 'galatians': 'gal',
  'ep': 'eph', 'epheso': 'eph', 'êphêsô': 'eph', 'eph': 'eph', 'ephesians': 'eph',
  'pl': 'phil', 'philipphe': 'phil', 'philípphê': 'phil', 'php': 'phil', 'phil': 'phil',
  'cl': 'col', 'colose': 'col', 'côlôsê': 'col', 'col': 'col', 'colossians': 'col',
  '1ts': '1thess', '1 thexalonica': '1thess', '1 thêxalônica': '1thess', '1th': '1thess', '1thess': '1thess',
  '2ts': '2thess', '2 thexalonica': '2thess', '2 thêxalônica': '2thess', '2th': '2thess', '2thess': '2thess',
  '1tm': '1tim', '1 timothe': '1tim', '1 timôthê': '1tim', '1ti': '1tim', '1tim': '1tim',
  '2tm': '2tim', '2 timothe': '2tim', '2 timôthê': '2tim', '2ti': '2tim', '2tim': '2tim',
  'tt': 'titus', 'tito': 'titus', 'titô': 'titus', 'tit': 'titus', 'titus': 'titus',
  'phm': 'phlm', 'philemon': 'phlm', 'philêmôn': 'phlm', 'phlm': 'phlm',
  'dt': 'heb', 'do thai': 'heb', 'do thái': 'heb', 'he': 'heb', 'heb': 'heb', 'hebrews': 'heb',
  'gc': 'jas', 'giacobe': 'jas', 'giacôbê': 'jas', 'jm': 'jas', 'jas': 'jas', 'james': 'jas',
  '1pr': '1pet', '1 phero': '1pet', '1 phêrô': '1pet', '1p': '1pet', '1pet': '1pet', '1peter': '1pet',
  '2pr': '2pet', '2 phero': '2pet', '2 phêrô': '2pet', '2p': '2pet', '2pet': '2pet', '2peter': '2pet',
  '1ga': '1john', '1 gioan': '1john', '1j': '1john', '1jn': '1john', '1john': '1john',
  '2ga': '2john', '2 gioan': '2john', '2j': '2john', '2jn': '2john', '2john': '2john',
  '3ga': '3john', '3 gioan': '3john', '3j': '3john', '3jn': '3john', '3john': '3john',
  'gd': 'jude', 'gđ': 'jude', 'giuda': 'jude', 'giuđa': 'jude', 'jd': 'jude', 'jude': 'jude',
  'kh': 'rev', 'khai huyen': 'rev', 'khải huyền': 'rev', 'rv': 'rev', 'rev': 'rev', 'revelation': 'rev'
};

/**
 * Phân tích chuỗi tìm kiếm tọa độ Kinh Thánh
 * @param input Chuỗi nhập ví dụ: 'St 1,1' hoặc 'Ga 3,16' hoặc 'Rm 8,28-30'
 */
export function parseScriptureAddress(input: string): ParsedScriptureAddress | null {
  if (!input || !input.trim()) return null;

  const clean = input.trim();

  // Pattern: [Tên/Viết tắt sách] [Số chương] ([,] [Số câu] (- [Số câu cuối])?)?
  // Hỗ trợ dấu phẩy (phổ biến ở VN: Ga 3,16) hoặc dấu hai chấm (Ga 3:16)
  const regex = /^([0-9]?[A-Za-zÀ-ỹ\s]+?)\s*(\d+)(?:[\s,.:]+(\d+)(?:-(\d+))?)?$/;
  const match = clean.match(regex);

  if (!match) return null;

  const rawBook = match[1].trim().toLowerCase().normalize('NFC');
  const chapter = parseInt(match[2], 10);
  const verse = match[3] ? parseInt(match[3], 10) : undefined;
  const endVerse = match[4] ? parseInt(match[4], 10) : undefined;

  // Tra cứu bookId
  let bookId = ABBREVIATION_MAP[rawBook];

  // Nếu chưa thấy, tìm trực tiếp trong danh sách 73 sách
  if (!bookId) {
    const found = CATHOLIC_BIBLE_BOOKS.find(b => 
      b.id.toLowerCase() === rawBook ||
      b.code.toLowerCase() === rawBook ||
      b.abbreviation.toLowerCase().normalize('NFC') === rawBook ||
      b.name.toLowerCase().normalize('NFC') === rawBook ||
      b.latinName.toLowerCase() === rawBook
    );
    if (found) bookId = found.id;
  }

  if (!bookId) return null;

  const book = CATHOLIC_BIBLE_BOOKS.find(b => b.id === bookId);
  if (!book) return null;

  // Kiểm tra giới hạn chương
  if (chapter < 1 || chapter > book.chaptersCount) {
    return {
      bookId,
      bookName: book.name,
      bookAbbreviation: book.abbreviation,
      chapter,
      verse,
      isValid: false,
      canonicalRef: `${book.abbreviation} ${chapter}${verse ? `,${verse}` : ''}`
    };
  }

  const canonicalRef = `${book.abbreviation} ${chapter}${verse ? `,${verse}${endVerse ? `-${endVerse}` : ''}` : ''}`;

  return {
    bookId,
    bookName: book.name,
    bookAbbreviation: book.abbreviation,
    chapter,
    verse,
    endVerse,
    isValid: true,
    canonicalRef
  };
}
