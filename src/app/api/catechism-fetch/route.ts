import { NextRequest, NextResponse } from 'next/server';
import { getCatechismSlugForNumber } from '@/data/catechism-sections-map';
import { getCatechismByNumber } from '@/data/catechism-data';

// Cache trong bộ nhớ RAM cho các điều đã được bóc tách
const memoryCache = new Map<number, { title?: string; content: string }>();

// Bóc tách toàn bộ các số điều có mặt trong trang HTML
function parseParagraphsFromHtml(html: string): Map<number, string> {
  const result = new Map<number, string>();
  // Match từng đoạn <span id="so-\d+" class="number">\d+</span>
  const regex = /<span id="so-(\d+)"[^>]*>[^<]*<\/span>([\s\S]*?)(?=<span id="so-\d+"|<h[1-6]|<div class="footnotes"|$)/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const num = parseInt(match[1], 10);
    let text = match[2];
    // Gỡ bỏ số chú thích chân trang <a class="sub">...</a>
    text = text.replace(/<a[^>]*class="sub"[^>]*>.*?<\/a>/gi, '');
    // Chuẩn hóa đoạn văn
    text = text.replace(/<\/p>\s*<p>/gi, '\n\n');
    text = text.replace(/<[^>]*>/g, '').trim();
    if (text) {
      result.set(num, text);
    }
  }
  return result;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const numParam = searchParams.get('num');
  const num = parseInt(numParam || '1', 10);

  if (isNaN(num) || num < 1 || num > 2865) {
    return NextResponse.json(
      { success: false, error: 'Số điều khoản không hợp lệ (Phải từ 1 đến 2865).' },
      { status: 400 }
    );
  }

  // 1. Kiểm tra cache bộ nhớ
  if (memoryCache.has(num)) {
    const cached = memoryCache.get(num)!;
    const base = getCatechismByNumber(num);
    return NextResponse.json({
      success: true,
      paragraphNumber: num,
      title: cached.title || base?.title || `Điều #${num}`,
      content: cached.content,
      isFullVerbatimText: true,
      pillar: base?.pillar || 1,
      pillarName: base?.pillarName || '',
      part: base?.part || '',
      section: base?.section || '',
      chapter: base?.chapter || '',
      latinHeading: base?.latinHeading || '',
      theme: base?.theme || '',
      themeId: base?.themeId || 1,
      scripturalFoundations: base?.scripturalFoundations || [],
      keyDoctrines: base?.keyDoctrines || [],
      churchDocuments: base?.churchDocuments || [],
      relatedParagraphs: base?.relatedParagraphs || []
    });
  }

  // 2. Tải trang chứa điều này từ nguồn chính thức augustino.net
  const slug = getCatechismSlugForNumber(num);
  const targetUrl = `https://augustino.net${slug}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi,en;q=0.9',
      },
      next: { revalidate: 86400 } // Cache 24 giờ
    });

    clearTimeout(timeout);

    if (res.ok) {
      const html = await res.text();
      const parsedMap = parseParagraphsFromHtml(html);

      // Lưu tất cả các số trong trang vào memory cache
      parsedMap.forEach((pContent, pNum) => {
        memoryCache.set(pNum, { content: pContent });
      });

      if (parsedMap.has(num)) {
        const text = parsedMap.get(num)!;
        const base = getCatechismByNumber(num);
        return NextResponse.json({
          success: true,
          paragraphNumber: num,
          title: base?.title || `Điều #${num}`,
          content: text,
          isFullVerbatimText: true,
          pillar: base?.pillar || 1,
          pillarName: base?.pillarName || '',
          part: base?.part || '',
          section: base?.section || '',
          chapter: base?.chapter || '',
          latinHeading: base?.latinHeading || '',
          theme: base?.theme || '',
          themeId: base?.themeId || 1,
          scripturalFoundations: base?.scripturalFoundations || [],
          keyDoctrines: base?.keyDoctrines || [],
          churchDocuments: base?.churchDocuments || [],
          relatedParagraphs: base?.relatedParagraphs || []
        });
      }
    }
  } catch (err) {
    console.warn(`[CatechismFetch] Không thể nạp từ nguồn mạng cho Điều #${num}:`, err);
  }

  // 3. Fallback an toàn từ cơ sở dữ liệu nội bộ
  const fallback = getCatechismByNumber(num);
  if (fallback) {
    return NextResponse.json({
      success: true,
      paragraphNumber: num,
      title: fallback.title,
      content: fallback.content,
      isFullVerbatimText: fallback.isFullVerbatimText,
      pillar: fallback.pillar,
      pillarName: fallback.pillarName,
      part: fallback.part,
      section: fallback.section,
      chapter: fallback.chapter,
      latinHeading: fallback.latinHeading,
      theme: fallback.theme,
      themeId: fallback.themeId,
      scripturalFoundations: fallback.scripturalFoundations,
      keyDoctrines: fallback.keyDoctrines,
      churchDocuments: fallback.churchDocuments,
      relatedParagraphs: fallback.relatedParagraphs
    });
  }

  return NextResponse.json(
    { success: false, error: 'Không tìm thấy dữ liệu điều khoản.' },
    { status: 404 }
  );
}
