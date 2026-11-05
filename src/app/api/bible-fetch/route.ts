import { NextResponse } from 'next/server';

// Danh sách các nguồn API / Web Kinh Thánh công khai
const BIBLE_SOURCES = [
  // Nguồn 1: API Kinh Thánh Công Giáo tiếng Việt (JSON)
  async (book: string, chapter: string) => {
    const url = `https://labs.bible.org/api/?passage=${book}%20${chapter}&type=json`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const htmlContent = data.map((v: any) => `<p><b>${v.verse}.</b> ${v.text}</p>`).join('');
      return htmlContent;
    }
    return null;
  },
  
  // Nguồn 2: Cào dữ liệu trực tiếp từ augustino.net
  async (book: string, chapter: string) => {
    const targetUrl = `https://augustino.net/phung-vu/kinh-thanh/${book}/${chapter}`;
    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const htmlText = await res.text();
    const match = htmlText.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i) ||
                  htmlText.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i) ||
                  htmlText.match(/<div class="entry-content"[\s\S]*?>([\s\S]*?)<\/div>/i);
    return match ? match[1] : null;
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book') || 'matt';
  const chapter = searchParams.get('chapter') || '1';

  // Thử từng nguồn một đến khi có văn bản
  for (const fetchSource of BIBLE_SOURCES) {
    try {
      const htmlContent = await fetchSource(book, chapter);
      if (htmlContent && htmlContent.trim().length > 50) {
        return NextResponse.json({ success: true, html: htmlContent });
      }
    } catch (e) {
      // Nếu nguồn này lỗi thì tự nhảy sang nguồn tiếp theo
      continue;
    }
  }

  return NextResponse.json({ 
    success: false, 
    error: 'Không tìm thấy văn bản Kinh Thánh từ các nguồn trên mạng.' 
  }, { status: 404 });
}