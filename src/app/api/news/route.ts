import { NextResponse } from 'next/server';
import { CatholicNewsItem } from '@/types';

// Bộ nhớ đệm trong RAM
let cachedNews: CatholicNewsItem[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 giây

// Dữ liệu thời sự Công Giáo dự phòng chuẩn xác (Authentic Fallback)
const FALLBACK_CATHOLIC_NEWS: CatholicNewsItem[] = [
  {
    id: 'hdgm-fb-1',
    title: 'Sứ điệp của Hội đồng Giám mục Việt Nam: Đồng hành cùng Dân Chúa trên hành trình Đức Tin',
    summary: 'Hội đồng Giám mục Việt Nam kêu gọi toàn thể Dân Chúa tại các giáo phận tích cực sống tinh thần hiệp hành, nuôi dưỡng đời sống cầu nguyện và chăm sóc người nghèo khó.',
    link: 'https://hdgmvietnam.com',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
    source: 'HĐGMVN',
    category: 'Huấn Quyền HĐGMVN',
    publishedAt: 'Mới cập nhật'
  },
  {
    id: 'hdgm-fb-2',
    title: 'Đức Thánh Cha gửi thông điệp cổ võ tình huynh đệ và hòa bình cho nhân loại',
    summary: 'Trong các buổi tiếp kiến và kinh Truyền Tin tại Vatican, Đức Thánh Cha tiếp tục nhấn mạnh sứ mạng của Hội Thánh là men muối yêu thương giữa một thế giới đầy thách đố.',
    link: 'https://www.vaticannews.va/vi.html',
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop',
    source: 'Vatican News',
    category: 'Thời Sự Tòa Thánh',
    publishedAt: 'Hôm nay'
  },
  {
    id: 'hdgm-fb-3',
    title: 'Ban Giáo Lý Đức Tin HĐGMVN: Đào sâu vẻ đẹp Lời Chúa và Giáo Lý trong gia đình Kitô hữu',
    summary: 'Ủy ban Giáo lý Đức Tin trực thuộc HĐGMVN hướng dẫn các giáo xứ thúc đẩy phong trào đọc Lời Chúa mỗi ngày và suy niệm Giáo Lý Hội Thánh Công Giáo.',
    link: 'https://hdgmvietnam.com',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop',
    source: 'HĐGMVN',
    category: 'Giáo Lý & Đức Tin',
    publishedAt: '06/11/2026'
  },
  {
    id: 'hdgm-fb-4',
    title: 'Chương trình Phụng vụ và Lời Chúa: Nuôi dưỡng tâm hồn qua từng ngày sống',
    summary: 'Giáo hội mời gọi các tín hữu trung thành đón nhận bàn tiệc Lời Chúa và Thánh Thể, biểu lộ đức tin qua các hành động bác ái và đời sống chứng nhân yêu thương.',
    link: 'https://hdgmvietnam.com',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop',
    source: 'Công Giáo Việt Nam',
    category: 'Phụng Vụ & Đời Sống',
    publishedAt: '05/11/2026'
  }
];

export async function GET() {
  const now = Date.now();

  // 1. Kiểm tra cache RAM hợp lệ (dưới 60 giây)
  if (cachedNews && (now - lastFetchTime < CACHE_TTL_MS)) {
    return NextResponse.json({
      success: true,
      count: cachedNews.length,
      data: cachedNews,
      cached: true,
      updatedAt: new Date(lastFetchTime).toISOString()
    });
  }

  const newsList: CatholicNewsItem[] = [];

  // 2. TỰ ĐỘNG NẠP TIN TỨC TỪ VATICAN NEWS TIẾNG VIỆT (RSS FEED 24/7)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const vaticanRes = await fetch('https://www.vaticannews.va/vi.rss.xml', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 60 }
    });

    clearTimeout(timeout);

    if (vaticanRes.ok) {
      const xml = await vaticanRes.text();
      const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g));

      for (const item of items.slice(0, 8)) {
        const str = item[1];
        const titleMatch = str.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || str.match(/<title>(.*?)<\/title>/);
        const linkMatch = str.match(/<link>(.*?)<\/link>/);
        const dateMatch = str.match(/<pubDate>(.*?)<\/pubDate>/);
        const descMatch = str.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || str.match(/<description>(.*?)<\/description>/);
        const enclosureMatch = str.match(/url=["'](.*?)["']/);

        const rawDesc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';
        const title = titleMatch ? titleMatch[1].trim() : '';
        const link = linkMatch ? linkMatch[1].trim() : '';
        const image = enclosureMatch ? enclosureMatch[1] : 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop';

        if (title) {
          let formattedDate = 'Hôm nay';
          if (dateMatch) {
            try {
              const d = new Date(dateMatch[1]);
              formattedDate = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
            } catch (e) {
              formattedDate = 'Mới nhất';
            }
          }

          newsList.push({
            id: 'vn-' + Buffer.from(link).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 12),
            title,
            summary: rawDesc.slice(0, 190) + (rawDesc.length > 190 ? '...' : ''),
            link,
            imageUrl: image,
            source: 'Vatican News',
            category: 'Thời Sự Tòa Thánh',
            publishedAt: formattedDate
          });
        }
      }
    }
  } catch (err) {
    console.warn('[NewsAPI] Lỗi kết nối Vatican News RSS:', err);
  }

  // 3. TỰ ĐỘNG NẠP BÀI MỚI NHẤT TỪ HĐGMVN (HDGMVIETNAM.COM)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const hdgmRes = await fetch('https://hdgmvietnam.com', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      next: { revalidate: 60 }
    });

    clearTimeout(timeout);

    if (hdgmRes.ok) {
      const html = await hdgmRes.text();
      const linkRegex = /href=["'](\/chi-tiet\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let m;
      let count = 0;
      while ((m = linkRegex.exec(html)) !== null && count < 6) {
        const link = 'https://hdgmvietnam.com' + m[1];
        const inner = m[2];
        const titleMatch = inner.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        if (titleMatch) {
          const rawTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();
          if (rawTitle.length > 20 && !newsList.some(n => n.title.includes(rawTitle.slice(0, 30)))) {
            newsList.unshift({
              id: 'hdgm-' + count + '-' + Date.now(),
              title: rawTitle,
              summary: 'Thông tri, sứ điệp và giáo huấn chính thức phát xuất từ Hội đồng Giám mục Việt Nam (HĐGMVN).',
              link,
              imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop',
              source: 'HĐGMVN',
              category: 'Huấn Quyền HĐGMVN',
              publishedAt: 'Mới đăng'
            });
            count++;
          }
        }
      }
    }
  } catch (err) {
    console.warn('[NewsAPI] Lỗi kết nối HĐGMVN:', err);
  }

  // 4. Nếu có bài mới từ nguồn mạng, cập nhật cache RAM
  if (newsList.length > 0) {
    cachedNews = newsList;
    lastFetchTime = now;
    return NextResponse.json({
      success: true,
      count: newsList.length,
      data: newsList,
      cached: false,
      updatedAt: new Date(now).toISOString()
    });
  }

  // 5. Nếu mạng gián đoạn, trả về dữ liệu chuẩn mực dự phòng
  return NextResponse.json({
    success: true,
    count: FALLBACK_CATHOLIC_NEWS.length,
    data: FALLBACK_CATHOLIC_NEWS,
    cached: true,
    isFallback: true,
    updatedAt: new Date(now).toISOString()
  });
}
