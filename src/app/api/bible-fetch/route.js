import { NextResponse } from 'next/server';

// ============================================================================
// BẢNG ÁNH XẠ CHUẨN 73 SÁCH KINH THÁNH CÔNG GIÁO SANG SLUG AUGUSTINO.NET
// Gồm 46 sách Cựu Ước + 27 sách Tân Ước (Đầy đủ 7 sách Thứ Luật/Đệ Nhị Quy Điển)
// ============================================================================
export const BIBLE_MAP = {
  // --- CỰU ƯỚC (46 SÁCH) ---
  'gen': 'sang-the',
  'exod': 'xuat-hanh',
  'exo': 'xuat-hanh',
  'lev': 'le-vi',
  'num': 'dan-so',
  'deut': 'de-nhi-luat',
  'josh': 'gio-sue',
  'judg': 'thu-lanh',
  'ruth': 'rut',
  '1sam': '1-sam-uen',
  '2sam': '2-sam-uen',
  '1kgs': '1-vua',
  '1kings': '1-vua',
  '2kgs': '2-vua',
  '2kings': '2-vua',
  '1chr': '1-su-bieu',
  '1chron': '1-su-bieu',
  '2chr': '2-su-bieu',
  '2chron': '2-su-bieu',
  'ezra': 'et-ra',
  'neh': 'ne-he-mi-a',
  'tob': 'to-bi-a',
  'jdt': 'giu-di-tha',
  'esth': 'et-ste',
  'est': 'et-ste',
  '1macc': '1-ma-ca-be',
  '2macc': '2-ma-ca-be',
  'job': 'gio-an',
  'ps': 'danh-ca',
  'prov': 'cham-ngon',
  'eccl': 'huan-ca',
  'eccles': 'huan-ca',
  'song': 'diem-ca',
  'wis': 'khon-ngoan',
  'sir': 'huan-ca',
  'isa': 'i-sai-a',
  'jer': 'gie-re-mi-a',
  'lam': 'ca-thuong',
  'bar': 'ba-ruc',
  'ezek': 'e-ze-ki-en',
  'dan': 'da-ni-en',
  'hos': 'ho-se',
  'joel': 'gio-en',
  'amos': 'a-mos',
  'obad': 'o-va-di-a',
  'jonah': 'gio-na',
  'mic': 'mi-kha',
  'nah': 'na-khum',
  'hab': 'kha-ba-cuc',
  'zeph': 'xe-pha-ni-a',
  'hag': 'khac-gai',
  'zech': 'xa-ca-ri-a',
  'mal': 'ma-la-khi',

  // --- TÂN ƯỚC (27 SÁCH) ---
  'matt': 'mat-theu',
  'mark': 'mac-co',
  'luke': 'lu-ca',
  'john': 'gio-an',
  'acts': 'tong-do-cong-vu',
  'rom': 'ro-ma',
  '1cor': '1-co-rin-to',
  '2cor': '2-co-rin-to',
  'gal': 'ga-lat',
  'eph': 'e-phe-xo',
  'phil': 'phi-lip-phe',
  'col': 'co-lo-xe',
  '1thess': '1-the-xa-lo-ni-ca',
  '2thess': '2-the-xa-lo-ni-ca',
  '1tim': '1-ti-mo-the',
  '2tim': '2-ti-mo-the',
  'tit': 'ti-to',
  'titus': 'ti-to',
  'philem': 'phi-le-mon',
  'heb': 'do-thai',
  'jas': 'gia-co-be',
  '1pet': '1-phe-ro',
  '2pet': '2-phe-ro',
  '1john': '1-gio-an',
  '2john': '2-gio-an',
  '3john': '3-gio-an',
  'jude': 'giu-da',
  'rev': 'khai-huyen',

  // --- ÁNH XẠ SLUG TRỰC TIẾP ---
  'sang-the': 'sang-the',
  'xuat-hanh': 'xuat-hanh',
  'le-vi': 'le-vi',
  'dan-so': 'dan-so',
  'de-nhi-luat': 'de-nhi-luat',
  'gio-sue': 'gio-sue',
  'thu-lanh': 'thu-lanh',
  'rut': 'rut',
  '1-sam-uen': '1-sam-uen',
  '2-sam-uen': '2-sam-uen',
  '1-vua': '1-vua',
  '2-vua': '2-vua',
  '1-su-bieu': '1-su-bieu',
  '2-su-bieu': '2-su-bieu',
  'et-ra': 'et-ra',
  'ne-he-mi-a': 'ne-he-mi-a',
  'to-bi-a': 'to-bi-a',
  'giu-di-tha': 'giu-di-tha',
  'et-ste': 'et-ste',
  '1-ma-ca-be': '1-ma-ca-be',
  '2-ma-ca-be': '2-ma-ca-be',
  'danh-ca': 'danh-ca',
  'cham-ngon': 'cham-ngon',
  'huan-ca': 'huan-ca',
  'diem-ca': 'diem-ca',
  'khon-ngoan': 'khon-ngoan',
  'i-sai-a': 'i-sai-a',
  'gie-re-mi-a': 'gie-re-mi-a',
  'ca-thuong': 'ca-thuong',
  'ba-ruc': 'ba-ruc',
  'e-ze-ki-en': 'e-ze-ki-en',
  'da-ni-en': 'da-ni-en',
  'ho-se': 'ho-se',
  'gio-en': 'gio-en',
  'a-mos': 'a-mos',
  'o-va-di-a': 'o-va-di-a',
  'gio-na': 'gio-na',
  'mi-kha': 'mi-kha',
  'na-khum': 'na-khum',
  'kha-ba-cuc': 'kha-ba-cuc',
  'xe-pha-ni-a': 'xe-pha-ni-a',
  'khac-gai': 'khac-gai',
  'xa-ca-ri-a': 'xa-ca-ri-a',
  'ma-la-khi': 'ma-la-khi',
  'mat-theu': 'mat-theu',
  'mac-co': 'mac-co',
  'lu-ca': 'lu-ca',
  'gio-an': 'gio-an',
  'tong-do-cong-vu': 'tong-do-cong-vu',
  'ro-ma': 'ro-ma',
  '1-co-rin-to': '1-co-rin-to',
  '2-co-rin-to': '2-co-rin-to',
  'ga-lat': 'ga-lat',
  'e-phe-xo': 'e-phe-xo',
  'phi-lip-phe': 'phi-lip-phe',
  'co-lo-xe': 'co-lo-xe',
  '1-the-xa-lo-ni-ca': '1-the-xa-lo-ni-ca',
  '2-the-xa-lo-ni-ca': '2-the-xa-lo-ni-ca',
  '1-ti-mo-the': '1-ti-mo-the',
  '2-ti-mo-the': '2-ti-mo-the',
  'ti-to': 'ti-to',
  'phi-le-mon': 'phi-le-mon',
  'do-thai': 'do-thai',
  'gia-co-be': 'gia-co-be',
  '1-phe-ro': '1-phe-ro',
  '2-phe-ro': '2-phe-ro',
  '1-gio-an': '1-gio-an',
  '2-gio-an': '2-gio-an',
  '3-gio-an': '3-gio-an',
  'giu-da': 'giu-da',
  'khai-huyen': 'khai-huyen',

  // --- VIẾT TẮT TIẾNG VIỆT PHỔ BIẾN ---
  'st': 'sang-the', 'xh': 'xuat-hanh', 'lv': 'le-vi', 'ds': 'dan-so', 'dnl': 'de-nhi-luat',
  'gs': 'gio-sue', 'tl': 'thu-lanh', 'rt': 'rut', '1sm': '1-sam-uen', '2sm': '2-sam-uen',
  '1v': '1-vua', '2v': '2-vua', '1sb': '1-su-bieu', '2sb': '2-su-bieu', 'er': 'et-ra',
  'nh': 'ne-he-mi-a', 'tb': 'to-bi-a', 'gdt': 'giu-di-tha', 'es': 'et-ste',
  '1mc': '1-ma-ca-be', '2mc': '2-ma-ca-be', 'gp': 'gio-an', 'tv': 'danh-ca',
  'cn': 'cham-ngon', 'gv': 'huan-ca', 'dc': 'diem-ca', 'kn': 'khon-ngoan', 'hc': 'huan-ca',
  'is': 'i-sai-a', 'gr': 'gie-re-mi-a', 'tc': 'ca-thuong', 'br': 'ba-ruc', 'ez': 'e-ze-ki-en',
  'dn': 'da-ni-en', 'hs': 'ho-se', 'ge': 'gio-en', 'am': 'a-mos', 'ov': 'o-va-di-a',
  'gn': 'gio-na', 'mk': 'mi-kha', 'nhm': 'na-khum', 'khb': 'kha-ba-cuc', 'xp': 'xe-pha-ni-a',
  'hg': 'khac-gai', 'zc': 'xa-ca-ri-a', 'ml': 'ma-la-khi',
  'mt': 'mat-theu', 'mc-nt': 'mac-co', 'lc': 'lu-ca', 'ga': 'gio-an', 'cv': 'tong-do-cong-vu',
  'rm': 'ro-ma', '1cr': '1-co-rin-to', '2cr': '2-co-rin-to', 'gl': 'ga-lat', 'ep': 'e-phe-xo',
  'pl': 'phi-lip-phe', 'cl': 'co-lo-xe', '1ts': '1-the-xa-lo-ni-ca', '2ts': '2-the-xa-lo-ni-ca',
  '1tm': '1-ti-mo-the', '2tm': '2-ti-mo-the', 'tt': 'ti-to', 'pm': 'phi-le-mon',
  'dt': 'do-thai', 'gc': 'gia-co-be', '1pr': '1-phe-ro', '2pr': '2-phe-ro',
  '1ga': '1-gio-an', '2ga': '2-gio-an', '3ga': '3-gio-an', 'gd': 'giu-da', 'kh': 'khai-huyen'
};

// Bảng ánh xạ tiếng Anh cho nguồn dự phòng labs.bible.org
const LABS_BIBLE_MAP = {
  'sang-the': 'Genesis', 'xuat-hanh': 'Exodus', 'le-vi': 'Leviticus', 'dan-so': 'Numbers',
  'de-nhi-luat': 'Deuteronomy', 'gio-sue': 'Joshua', 'thu-lanh': 'Judges', 'rut': 'Ruth',
  '1-sam-uen': '1 Samuel', '2-sam-uen': '2 Samuel', '1-vua': '1 Kings', '2-vua': '2 Kings',
  '1-su-bieu': '1 Chronicles', '2-su-bieu': '2 Chronicles', 'et-ra': 'Ezra', 'ne-he-mi-a': 'Nehemiah',
  'to-bi-a': 'Tobit', 'giu-di-tha': 'Judith', 'et-ste': 'Esther', '1-ma-ca-be': '1 Maccabees',
  '2-ma-ca-be': '2 Maccabees', 'gio-an': 'Job', 'danh-ca': 'Psalms', 'cham-ngon': 'Proverbs',
  'huan-ca': 'Ecclesiastes', 'diem-ca': 'Song of Solomon', 'khon-ngoan': 'Wisdom',
  'i-sai-a': 'Isaiah', 'gie-re-mi-a': 'Jeremiah', 'ca-thuong': 'Lamentations', 'ba-ruc': 'Baruch',
  'e-ze-ki-en': 'Ezekiel', 'da-ni-en': 'Daniel', 'ho-se': 'Hosea', 'gio-en': 'Joel',
  'a-mos': 'Amos', 'o-va-di-a': 'Obadiah', 'gio-na': 'Jonah', 'mi-kha': 'Micah',
  'na-khum': 'Nahum', 'kha-ba-cuc': 'Habakkuk', 'xe-pha-ni-a': 'Zephaniah',
  'khac-gai': 'Haggai', 'xa-ca-ri-a': 'Zechariah', 'ma-la-khi': 'Malachi',
  'mat-theu': 'Matthew', 'mac-co': 'Mark', 'lu-ca': 'Luke', 'tong-do-cong-vu': 'Acts',
  'ro-ma': 'Romans', '1-co-rin-to': '1 Corinthians', '2-co-rin-to': '2 Corinthians',
  'ga-lat': 'Galatians', 'e-phe-xo': 'Ephesians', 'phi-lip-phe': 'Philippians',
  'co-lo-xe': 'Colossians', '1-the-xa-lo-ni-ca': '1 Thessalonians', '2-the-xa-lo-ni-ca': '2 Thessalonians',
  '1-ti-mo-the': '1 Timothy', '2-ti-mo-the': '2 Timothy', 'ti-to': 'Titus',
  'phi-le-mon': 'Philemon', 'do-thai': 'Hebrews', 'gia-co-be': 'James',
  '1-phe-ro': '1 Peter', '2-phe-ro': '2 Peter', '1-gio-an': '1 John',
  '2-gio-an': '2 John', '3-gio-an': '3 John', 'giu-da': 'Jude', 'khai-huyen': 'Revelation'
};

/**
 * Hàm chuẩn hóa tên sách tiếng Việt có dấu/không dấu/viết tắt về đúng slug URL augustino.net
 */
export function normalizeSlug(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawBook = (searchParams.get('book') || 'mat-theu').trim();
  const chapter = searchParams.get('chapter') || '1';

  const cleanBook = rawBook.toLowerCase();
  const normalizedInput = normalizeSlug(cleanBook);
  const bookSlug = BIBLE_MAP[cleanBook] || BIBLE_MAP[normalizedInput] || normalizedInput;

  try {
    // 1. Cào dữ liệu theo đường dẫn: https://augustino.net/phung-vu/kinh-thanh/${bookSlug}/${chapter}
    const targetUrl = `https://augustino.net/phung-vu/kinh-thanh/${bookSlug}/${chapter}`;
    
    try {
      const res = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        cache: 'no-store'
      });

      if (res.ok) {
        const htmlText = await res.text();
        const match = htmlText.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i) ||
                      htmlText.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i) ||
                      htmlText.match(/<div class="entry-content"[\s\S]*?>([\s\S]*?)<\/div>/i);

        if (match && match[1] && match[1].trim().length > 50) {
          return NextResponse.json({
            success: true,
            source: 'augustino.net',
            bookSlug,
            chapter,
            html: match[1]
          });
        }
      }
    } catch (augustinoErr) {
      console.warn('Không thể kết nối augustino.net, chuyển sang nguồn dự phòng:', augustinoErr.message);
    }

    // 2. Nguồn dự phòng từ API công khai (labs.bible.org) trả về JSON dạng đoạn văn HTML
    const passageName = LABS_BIBLE_MAP[bookSlug] || rawBook;
    const fallbackUrl = `https://labs.bible.org/api/?passage=${encodeURIComponent(passageName)}%20${chapter}&type=json`;

    const fallbackRes = await fetch(fallbackUrl, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (Array.isArray(data) && data.length > 0) {
        const formattedHtml = data.map((v) => (
          `<p class="mb-3 leading-relaxed text-justify"><b class="font-serif text-[#762F3A] mr-2 inline-block select-none">[${v.verse}]</b>${v.text}</p>`
        )).join('\n');

        return NextResponse.json({
          success: true,
          source: 'labs.bible.org',
          bookSlug,
          chapter,
          html: formattedHtml
        });
      }
    }

    return NextResponse.json({
      success: false,
      error: `Chưa tìm thấy bản văn cho ${bookSlug} chương ${chapter}`
    }, { status: 404 });
  } catch (error) {
    console.error('Lỗi API bible-fetch:', error);
    return NextResponse.json({
      success: false,
      error: 'Lỗi máy chủ trong quá trình tải bản văn Kinh Thánh'
    }, { status: 500 });
  }
}
