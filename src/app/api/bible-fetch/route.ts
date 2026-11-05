import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');

  if (!book || !chapter) {
    return NextResponse.json({ error: 'Thieu thong tin book hoac chapter' }, { status: 400 });
  }

  try {
    const targetUrl = `https://augustino.net/phung-vu/kinh-thanh/${book}/${chapter}`;
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 86400 }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Khong the truy cap nguon Kinh Thanh' }, { status: 500 });
    }

    const htmlText = await res.text();
    return NextResponse.json({ success: true, html: htmlText });
  } catch (error) {
    return NextResponse.json({ error: 'Loi ket noi den server nguon' }, { status: 500 });
  }
}