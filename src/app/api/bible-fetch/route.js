import { NextResponse } from 'next/server';

// Bảng ánh xạ đầy đủ 73 sách Kinh Thánh Công Giáo
const BIBLE_MAP = {
  // --- CỰU ƯỚC (46 SÁCH) ---
  gen: 'sang-the', exo: 'xuat-hanh', lev: 'le-vi', num: 'dan-so', deut: 'de-nhi-luat',
  josh: 'gio-sue', judg: 'thu-lanh', ruth: 'rut', '1sam': '1-sam-uen', '2sam': '2-sam-uen',
  '1kings': '1-vua', '2kings': '2-vua', '1chron': '1-su-bieu', '2chron': '2-su-bieu',
  ezra: 'et-ra', neh: 'ne-he-mi-a', tob: 'to-bi-a', jdt: 'giu-di-tha', est: 'et-ste',
  '1macc': '1-ma-ca-be', '2macc': '2-ma-ca-be', job: 'gio-an', ps: 'danh-ca',
  prov: 'cham-ngon', eccles: 'huan-ca', song: 'diem-ca', wis: 'khon-ngoan', sir: 'huan-ca',
  isa: 'i-sai-a', jer: 'gie-re-mi-a', lam: 'ca-thuong', bar: 'ba-ruc', ezek: 'e-ze-ki-en',
  dan: 'da-ni-en', hos: 'ho-se', joel: 'gio-en', amos: 'a-mos', obad: 'o-va-di-a',
  jonah: 'gio-na', mic: 'mi-kha', nah: 'na-khum', hab: 'kha-ba-cuc', zeph: 'xe-pha-ni-a',
  hag: 'khac-gai', zech: 'xa-ca-ri-a', mal: 'ma-la-khi',

  // --- TÂN ƯỚC (27 SÁCH) ---
  matt: 'mat-theu', mark: 'mac-co', luke: 'lu-ca', john: 'gio-an',
  acts: 'tong-do-cong-vu', rom: 'ro-ma', '1cor': '1-co-rin-to', '2cor': '2-co-rin-to',
  gal: 'ga-lat', eph: 'e-phe-xo', phil: 'phi-lip-phe', col: 'co-lo-xe',
  '1thess': '1-the-xa-lo-ni-ca', '2thess': '2-the-xa-lo-ni-ca',
  '1tim': '1-ti-mo-the', '2tim': '2-ti-mo-the', tit: 'ti-to', philem: 'phi-le-mon',
  heb: 'do-thai', jas: 'gia-co-be', '1pet': '1-phe-ro', '2pet': '2-phe-ro',
  '1john': '1-gio-an', '2john': '2-gio-an', '3john': '3-gio-an', jude: 'giu-da',
  rev: 'khai-huyen'
};

function normalizeSlug(str) {
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
  const rawBook = searchParams.get('book') || 'matt';
  const chapter = searchParams.get('chapter') || '1';

  const cleanBook = rawBook.toLowerCase().trim();
  const bookSlug = BIBLE_MAP[cleanBook] || normalizeSlug(rawBook);

  try {
    // 1. Cào từ augustino.net theo slug chính xác
    const targetUrl = `https://augustino.net/phung-vu/kinh-thanh/${bookSlug}/${chapter}`;
    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      cache: 'no-store'
    });

    if (res.ok) {
      const htmlText = await res.text();
      const match = htmlText.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i) ||
                    htmlText.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i) ||
                    htmlText.match(/<div class="entry-content"[\s\S]*?>([\s\S]*?)<\/div>/i);

      if (match && match[1]) {
        return NextResponse.json({ success: true, html: match[1] });
      }
    }

    // 2. Nguồn dự phòng API public
    const fallbackUrl = `https://labs.bible.org/api/?passage=${rawBook}%20${chapter}&type=json`;
    const fallbackRes = await fetch(fallbackUrl, { cache: 'no-store' });
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (Array.isArray(data) && data.length > 0) {
        const formattedHtml = data.map(v => `<p class="mb-2"><b>${v.verse}.</b> ${v.text}</p>`).join('');
        return NextResponse.json({ success: true, html: formattedHtml });
      }
    }

    return NextResponse.json({ success: false, error: 'Chưa có nội dung cho chương này' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Lỗi máy chủ' }, { status: 500 });
  }
}