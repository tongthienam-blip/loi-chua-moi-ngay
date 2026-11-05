import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');

  if (!book || !chapter) {
    return NextResponse.json({ error: 'Thiếu thông tin book hoặc chapter' }, { status: 400 });
  }

  try {
    // 1. Tự động gọi sang augustino.net
    const targetUrl = `https://augustino.net/phung-vu/kinh-thanh/${book}/${chapter}`;
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 86400 } // Cache 24h để đọc siêu mượt
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Không thể lấy dữ liệu từ nguồn augustino' }, { status: 500 });
    }

    const htmlText = await res.text();

    // 2. Tự động cắt lọc lấy đúng phần văn bản Kinh Thánh
    let extractedContent = htmlText;
    const mainContentMatch = htmlText.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i) || 
                               htmlText.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i) ||
                               htmlText.match(/<div class="entry-content"[\s\S]*?>([\s\S]*?)<\/div>/i);

    if (mainContentMatch && mainContentMatch[1]) {
      extractedContent = mainContentMatch[1];
    }

    return NextResponse.json({ success: true, html: extractedContent });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi kết nối máy chủ' }, { status: 500 });
  }
}