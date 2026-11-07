import { NextRequest, NextResponse } from 'next/server';

// Bộ nhớ đệm RAM cho các đoạn audio đã tạo
const ttsCache = new Map<string, Buffer>();

/**
 * Làm sạch văn bản trước khi đưa vào bộ phát âm AI
 * Loại bỏ thẻ HTML, số câu [1], [2], ghi chú trong ngoặc đơn, ký tự đặc biệt
 */
function cleanTextForSpeech(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/<[^>]+>/g, ' ')          // Xóa thẻ HTML
    .replace(/\[\d+\]/g, ' ')          // Xóa số câu dạng [1], [2]
    .replace(/\[.*?\]/g, ' ')          // Xóa chú thích ngoặc vuông
    .replace(/\(.*?\)/g, ' ')          // Xóa trích dẫn ngoặc tròn
    .replace(/[*#_~`>]/g, ' ')         // Xóa cú pháp Markdown
    .replace(/Đ\.\s*/g, 'Đáp. ')       // Đọc câu đáp ca trang trọng
    .replace(/\s+/g, ' ')              // Chuẩn hóa khoảng trắng
    .replace(/([.!?])\s*/g, '$1 ')
    .trim();
}

/**
 * Chia văn bản dài thành các đoạn nhỏ tự nhiên theo dấu câu (tối đa 170 ký tự/đoạn)
 */
function chunkText(text: string, maxLen = 170): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks: string[] = [];
  let current = '';

  for (const s of sentences) {
    const trimmed = s.trim();
    if (!trimmed) continue;

    if ((current + ' ' + trimmed).trim().length <= maxLen) {
      current = (current ? current + ' ' : '') + trimmed;
    } else {
      if (current) chunks.push(current);
      if (trimmed.length > maxLen) {
        // Tách tiếp theo dấu phẩy nếu câu quá dài
        const parts = trimmed.split(/,\s*/);
        let sub = '';
        for (const p of parts) {
          if ((sub + ', ' + p).trim().length <= maxLen) {
            sub = (sub ? sub + ', ' : '') + p;
          } else {
            if (sub) chunks.push(sub);
            sub = p;
          }
        }
        if (sub) current = sub;
        else current = '';
      } else {
        current = trimmed;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawText = searchParams.get('text') || '';

  if (!rawText.trim()) {
    return NextResponse.json({ error: 'Vui lòng cung cấp nội dung text cần phát âm' }, { status: 400 });
  }

  return handleTTS(rawText);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawText = body.text || '';

    if (!rawText.trim()) {
      return NextResponse.json({ error: 'Vui lòng cung cấp nội dung text cần phát âm' }, { status: 400 });
    }

    return handleTTS(rawText);
  } catch (e) {
    return NextResponse.json({ error: 'Dữ liệu JSON không hợp lệ' }, { status: 400 });
  }
}

async function handleTTS(rawText: string) {
  const clean = cleanTextForSpeech(rawText);
  if (!clean) {
    return NextResponse.json({ error: 'Văn bản rỗng sau khi làm sạch' }, { status: 400 });
  }

  const cacheKey = clean.slice(0, 150) + '-' + clean.length;
  if (ttsCache.has(cacheKey)) {
    const cachedBuffer = ttsCache.get(cacheKey)!;
    return new Response(new Uint8Array(cachedBuffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'Content-Length': String(cachedBuffer.length)
      }
    });
  }

  const chunks = chunkText(clean);
  const audioBuffers: Buffer[] = [];

  for (const chunk of chunks) {
    if (!chunk.trim()) continue;
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/'
        }
      });

      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        audioBuffers.push(Buffer.from(arrayBuf));
      }
    } catch (err) {
      console.warn('[TTS API] Lỗi tải đoạn audio:', err);
    }
  }

  if (audioBuffers.length === 0) {
    return NextResponse.json({ error: 'Không thể khởi tạo âm thanh tiếng Việt từ máy chủ TTS' }, { status: 500 });
  }

  const combinedAudio = Buffer.concat(audioBuffers);
  // Lưu vào cache
  ttsCache.set(cacheKey, combinedAudio);

  return new Response(new Uint8Array(combinedAudio), {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400',
      'Content-Length': String(combinedAudio.length)
    }
  });
}
