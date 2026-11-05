import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book') || 'matt';
  const chapter = searchParams.get('chapter') || '1';

  try {
    const targetUrl = `https://augustino.net/phung-vu/kinh-thanh/${book}/${chapter}`;
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
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

    return NextResponse.json({ success: false, error: 'Khong tim thay noi dung' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Loi server' }, { status: 500 });
  }
}