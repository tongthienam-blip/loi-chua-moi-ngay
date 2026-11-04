/**
 * Chuẩn hoá chuỗi tiếng Việt sang dạng Unicode dựng sẵn (NFC)
 * Loại bỏ khoảng trắng dư thừa giữa nguyên âm và dấu thanh hoặc phụ âm
 */
export function normalizeVietnamese(text: string | null | undefined): string {
  if (!text) return '';
  
  // 1. Chuẩn hoá Unicode dựng sẵn (NFC)
  let result = text.normalize('NFC');
  
  // 2. Loại bỏ các dấu cách vô tình chèn vào giữa nguyên âm có dấu và phụ âm cuối
  // Ví dụ: "Tuầ n" -> "Tuần", "hế t" -> "hết", "Thấ y" -> "Thấy", "Thầ y" -> "Thầy", "Điề u" -> "Điều"
  result = result
    .replace(/\b([Tt]u[ầẩấẫậ])\s+n\b/g, '$1n')
    .replace(/\b(h[ếềểễệ])\s+t\b/g, '$1t')
    .replace(/\b([Tt]h[ấầẩẫậ])\s+y\b/g, '$1y')
    .replace(/\b([Đđ]i[ềếểễệ])\s+u\b/g, '$1u')
    .replace(/\b([Qq]uy[ếềểễệ])\s+t\b/g, '$1t')
    .replace(/\b([Bb]i[ếềểễệ])\s+t\b/g, '$1t')
    .replace(/\b([Mm][ộồốổỗ])\s+t\b/g, '$1t');

  return result;
}

/**
 * Áp dụng normalizeVietnamese cho toàn bộ thuộc tính chuỗi trong một object
 */
export function normalizeObject<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') {
    if (typeof obj === 'string') {
      return normalizeVietnamese(obj) as unknown as T;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeObject(item)) as unknown as T;
  }

  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = normalizeVietnamese(value);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = normalizeObject(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}
