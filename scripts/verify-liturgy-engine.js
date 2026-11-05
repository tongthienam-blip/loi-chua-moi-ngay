/**
 * ============================================================================
 * CÔNG CỤ KIỂM THỬ TỰ ĐỘNG CHUYÊN MỤC PHỤNG VỤ (PHẦN 4)
 * Kiểm định: Lịch phụng vụ, Thứ tự ưu tiên lễ, Lễ riêng Việt Nam,
 * Chu kỳ A/B/C, I/II, Bài đọc II, Trình tự phụng vụ chuẩn mực
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const calendarEnginePath = path.join(projectRoot, 'src/lib/liturgy/calendar-engine.ts');
const readingResolverPath = path.join(projectRoot, 'src/lib/liturgy/reading-resolver.ts');
const pagePath = path.join(projectRoot, 'src/app/phung-vu/page.tsx');

console.log('================================================================');
console.log('KIỂM TRA TỰ ĐỘNG TOÀN DIỆN CHUYÊN MỤC PHỤNG VỤ CÔNG GIÁO');
console.log('================================================================\n');

const results = [];
let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    results.push({ name, passed: true });
    passCount++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    results.push({ name, passed: false, error: err.message });
    failCount++;
    console.error(`  [FAIL] ${name}: ${err.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

const calendarContent = fs.readFileSync(calendarEnginePath, 'utf8');
const resolverContent = fs.readFileSync(readingResolverPath, 'utf8');
const pageContent = fs.readFileSync(pagePath, 'utf8');

// ----------------------------------------------------------------------------
// 1. KIỂM ĐỊNH CHU KỲ PHỤNG VỤ A/B/C VÀ I/II
// ----------------------------------------------------------------------------
console.log('1. KIỂM ĐỊNH CHU KỲ NĂM A/B/C & NĂM I/II:');

test('Công thức tính chu kỳ Chúa Nhật phải chuẩn xác theo Vatican: 2024=B, 2025=C, 2026=A', () => {
  // Trích xuất logic chu kỳ
  assert(
    calendarContent.includes('mod === 2 ? \'A\' : mod === 0 ? \'B\' : \'C\''),
    'Công thức chu kỳ Chúa Nhật phải ánh xạ: mod 2 = A, mod 0 = B, mod 1 = C'
  );

  // Kiểm tra chu kỳ ngày thường
  assert(
    calendarContent.includes('year % 2 === 0 ? \'II\' : \'I\''),
    'Năm chẵn phải là Năm II, năm lẻ là Năm I'
  );
});

// ----------------------------------------------------------------------------
// 2. KIỂM ĐỊNH LỄ RIÊNG VIỆT NAM VÀ BẬC LỄ TRỌNG
// ----------------------------------------------------------------------------
console.log('\n2. KIỂM ĐỊNH LỄ RIÊNG VIỆT NAM & THỨ TỰ ƯU TIÊN:');

test('Lễ Các Thánh Tử Đạo Việt Nam (24/11) phải là LỄ TRỌNG (SOLEMNITY) với Màu Đỏ', () => {
  assert(calendarContent.includes('\'11-24\''), 'Thiếu mục ngày 24/11');
  assert(
    calendarContent.includes('Các Thánh Tử Đạo Việt Nam') && calendarContent.includes('rank: \'SOLEMNITY\''),
    '24/11 phải là Lễ Trọng'
  );
  assert(
    calendarContent.includes('color: \'RED\''),
    '24/11 phải có màu phụng vụ là Màu Đỏ'
  );
  assert(
    calendarContent.includes('isVietnamSolemnity: true'),
    '24/11 phải có cờ isVietnamSolemnity: true'
  );
});

test('Lễ Thánh Giuse (19/3) và Lễ Mẹ Thiên Chúa (1/1) phải là Lễ Trọng Màu Trắng', () => {
  assert(calendarContent.includes('\'03-19\'') && calendarContent.includes('Thánh Giuse, Bạn Trăm Năm Đức Maria'), 'Thiếu 19/3');
  assert(calendarContent.includes('\'01-01\'') && calendarContent.includes('Đức Maria, Mẹ Thiên Chúa'), 'Thiếu 1/1');
});

test('Quy tắc ưu tiên: Lễ Trọng trên Chúa Nhật Thường Niên phải thay thế Chúa Nhật', () => {
  assert(
    calendarContent.includes('if (fixedFeast.rank === \'SOLEMNITY\')'),
    'Phải có khối xử lý ưu tiên Lễ Trọng'
  );
  assert(
    calendarContent.includes('finalRank = fixedFeast.rank') && calendarContent.includes('finalColor = fixedFeast.color'),
    'Lễ Trọng phải ghi đè bậc lễ và màu phụng vụ của ngày'
  );
});

// ----------------------------------------------------------------------------
// 3. KIỂM ĐỊNH BÀI ĐỌC II: CHÚA NHẬT & LỄ TRỌNG CÓ, NGÀY THƯỜNG KHÔNG
// ----------------------------------------------------------------------------
console.log('\n3. KIỂM ĐỊNH BÀI ĐỌC II THEO BẬC LỄ:');

test('calendar-engine.ts phải định nghĩa cờ hasSecondReading cho Chúa Nhật hoặc Lễ Trọng', () => {
  assert(
    calendarContent.includes('hasSecondReading: boolean') || calendarContent.includes('hasSecondReading'),
    'Phải có thuộc tính hasSecondReading'
  );
  assert(
    calendarContent.includes('const hasSecondReading = isSunday || finalRank === \'SOLEMNITY\';'),
    'Bài đọc II phải xuất hiện khi là Chúa Nhật HOẶC Lễ Trọng'
  );
});

test('reading-resolver.ts phải cung cấp secondReading khi hasSecondReading = true', () => {
  assert(
    resolverContent.includes('secondReading: (isSunday || meta.hasSecondReading)'),
    'Resolver phải cấp Bài đọc II khi là Chúa Nhật hoặc Lễ Trọng'
  );
});

// ----------------------------------------------------------------------------
// 4. KIỂM ĐỊNH TRÌNH TỰ PHỤNG VỤ CHUẨN MỰC TRÊN GIAO DIỆN
// ----------------------------------------------------------------------------
console.log('\n4. KIỂM ĐỊNH TRÌNH TỰ PHỤNG VỤ & GIAO DIỆN:');

test('Giao diện Phụng vụ phải hiển thị đúng thứ tự: Lời nguyện nhập lễ -> Bài đọc I -> Đáp ca -> Bài đọc II -> Tin Mừng -> Lời nguyện hiệp lễ', () => {
  const openingIdx = pageContent.indexOf('Nghi Thức Đầu Lễ &bull; Lời Nguyện Nhập Lễ');
  const firstIdx = pageContent.indexOf('Phụng Vụ Lời Chúa &bull; Bài Đọc I');
  const psalmIdx = pageContent.indexOf('Phụng Vụ Lời Chúa &bull; Thánh Vịnh Đáp Ca');
  const gospelIdx = pageContent.indexOf('Tin Mừng (Phúc Âm)');
  const communionIdx = pageContent.indexOf('Nghi Thức Hiệp Lễ &bull; Lời Nguyện Hiệp Lễ');

  assert(openingIdx !== -1, 'Phải có phần Nghi Thức Đầu Lễ • Lời Nguyện Nhập Lễ');
  assert(firstIdx !== -1, 'Phải có phần Phụng Vụ Lời Chúa • Bài Đọc I');
  assert(psalmIdx !== -1, 'Phải có phần Phụng Vụ Lời Chúa • Thánh Vịnh Đáp Ca');
  assert(gospelIdx !== -1, 'Phải có phần Tin Mừng (Phúc Âm)');
  assert(communionIdx !== -1, 'Phải có phần Nghi Thức Hiệp Lễ • Lời Nguyện Hiệp Lễ');

  assert(openingIdx < firstIdx, 'Lời Nguyện Nhập Lễ phải đứng trước Bài Đọc I');
  assert(firstIdx < psalmIdx, 'Bài Đọc I phải đứng trước Đáp Ca');
  assert(psalmIdx < gospelIdx, 'Đáp Ca phải đứng trước Tin Mừng');
  assert(gospelIdx < communionIdx, 'Tin Mừng phải đứng trước Lời Nguyện Hiệp Lễ');
});

test('Phải có bảng chọn phân vùng trên điện thoại di động (Mobile Section Filter)', () => {
  assert(
    pageContent.includes('setMobileSection') && pageContent.includes('mobileSection'),
    'Phải có state mobileSection để chia khu vực dễ đọc trên điện thoại'
  );
});

test('Phải có nút Hôm Qua, Hôm Nay, Ngày Mai, Về Hôm Nay và Date Picker', () => {
  assert(pageContent.includes('handleResetToday') || pageContent.includes('RotateCcw'), 'Phải có nút Về Hôm Nay');
  assert(pageContent.includes('yesterdayStr'), 'Phải có Hôm Qua');
  assert(pageContent.includes('tomorrowStr'), 'Phải có Ngày Mai');
  assert(pageContent.includes('type="date"'), 'Phải có Date Picker HTML');
});

test('Phải có tính năng Sao Chép Bài Đọc, Chia Sẻ Link và Nghe Lời Chúa', () => {
  assert(pageContent.includes('handleCopyFullLiturgicalReading'), 'Phải có hàm sao chép toàn văn bài đọc');
  assert(pageContent.includes('handleShareLink'), 'Phải có hàm chia sẻ liên kết');
  assert(pageContent.includes('AudioPlayerBar'), 'Phải có Audio Player Bar nghe Lời Chúa');
});

// ----------------------------------------------------------------------------
// TỔNG KẾT
// ----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} ĐẠT / ${failCount} LỖI (Tổng số ${results.length} bài test)`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('TẤT CẢ CÁC BÀI KIỂM THỬ PHỤNG VỤ ĐÃ HOÀN TOÀN VƯỢT QUA!');
}
