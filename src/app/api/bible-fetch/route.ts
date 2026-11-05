import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book') || 'matt';
  const chapter = searchParams.get('chapter') || '1';

  try {
    // 1. Thu thap du lieu tu augustino.net
    const targetUrl = `https://augustino.net/phung-vu/kinh-thanh/${book}/${chapter}`;
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
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

    // 2. Dự phòng: Lấy từ API public nếu augustino không phản hồi
    const fallbackUrl = `https://labs.bible.org/api/?passage=${book}%20${chapter}&type=json`;
    const fallbackRes = await fetch(fallbackUrl, { cache: 'no-store' });
    
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (Array.isArray(data) && data.length > 0) {
        const formattedHtml = data.map((v: { verse: string; text: string }) => `<p class="mb-2"><b>${v.verse}.</b> ${v.text}</p>`).join('');
        return NextResponse.json({ success: true, html: formattedHtml });
      }
    }

    return NextResponse.json({ success: false, error: 'Không thể tìm thấy nội dung Kinh Thánh' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Lỗi server khi cào dữ liệu' }, { status: 500 });
  }
}