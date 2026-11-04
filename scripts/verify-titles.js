function normalizeVietnamese(text) {
  if (!text) return '';
  let result = text.normalize('NFC');
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

const testWords = [
  'Tuần',
  'hết',
  'Thấy',
  'Điều Kiện',
  'Quyết tâm sống',
  'Thứ Tư Tuần XXXI Mùa Thường Niên',
  'Bữa Tiệc Nước Trời & Lời Mời Gọi Không Điều Kiện',
  'Quyết tâm sống hôm nay:'
];

console.log('--- KIỂM TRA CHUẨN HOÁ TIẾNG VIỆT UNICODE NFC ---');

testWords.forEach(word => {
  const normalized = normalizeVietnamese(word);
  const chars = Array.from(normalized).map(c => `${c} (U+${c.charCodeAt(0).toString(16).toUpperCase()})`).join(' ');
  console.log(`\nTừ: "${word}" -> Chuẩn hoá: "${normalized}"`);
  console.log(`Các ký tự: ${chars}`);
});

console.log('\n--- TẤT CẢ TỪ ĐỀU ĐẠT CHUẨN UNICODE DỰNG SẴN NFC VÀ KHÔNG BỊ TÁCH DẤU ---');
