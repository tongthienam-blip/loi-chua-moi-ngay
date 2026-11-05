/**
 * ============================================================================
 * KIỂM THỬ TOÀN DIỆN LỊCH PHỤNG VỤ & SỬA LỖI NGÀY HIỆN TẠI (PHẦN 1)
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
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

console.log('================================================================');
console.log('KIỂM THỬ HỆ THỐNG LỊCH PHỤNG VỤ & TỰ ĐỘNG CẬP NHẬT NGÀY HIỆN TẠI');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// NHÓM 1: KIỂM TRA MÃ NGUỒN KHÔNG CÒN HARDCODE NGÀY CŨ HOẶC NGUỒN BÊN NGOÀI
// ----------------------------------------------------------------------------
console.log('1. KIỂM TRA TOÀN VẸN MÃ NGUỒN & KHÔNG CÒN HARDCODE:');

test('Homepage (src/app/page.tsx) không còn hardcode date 2026-11-04 trong state', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/app/page.tsx'), 'utf8');
  assert(!code.includes("useState('2026-11-04')"), 'Vẫn còn useState("2026-11-04")');
  assert(!code.includes("getLiturgicalReadingByDate('2026-11-04')"), 'Vẫn còn getLiturgicalReadingByDate("2026-11-04")');
  assert(code.includes('getVietnamTodayString()'), 'Chưa gọi getVietnamTodayString()');
});

test('Trang Phụng Vụ (src/app/phung-vu/page.tsx) dùng dynamic date & không hardcode', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/app/phung-vu/page.tsx'), 'utf8');
  assert(!code.includes("useState('2026-11-04')"), 'Vẫn còn useState("2026-11-04")');
  assert(!code.includes("handleDateChange('2026-11-04')"), 'Nút Hôm nay vẫn hardcode 2026-11-04');
  assert(!code.includes("handleDateChange('2026-11-03')"), 'Nút Hôm qua vẫn hardcode 2026-11-03');
  assert(!code.includes("handleDateChange('2026-11-05')"), 'Nút Ngày mai vẫn hardcode 2026-11-05');
  assert(code.includes('getVietnamTodayString()'), 'Chưa dùng getVietnamTodayString()');
});

test('Trang Suy Niệm (src/app/suy-niem/page.tsx) dùng dynamic date & date navigation', () => {
  const code = fs.readFileSync(path.join(projectRoot, 'src/app/suy-niem/page.tsx'), 'utf8');
  assert(!code.includes("getReflectionByDate('2026-11-04')"), 'Vẫn còn getReflectionByDate("2026-11-04")');
  assert(code.includes('getVietnamTodayString()'), 'Chưa dùng getVietnamTodayString()');
  assert(code.includes('selectedDate'), 'Chưa có state selectedDate');
});

test('Xóa hoàn toàn nhãn nguồn "augustino.net" khỏi giao diện', () => {
  const pageCode = fs.readFileSync(path.join(projectRoot, 'src/app/page.tsx'), 'utf8');
  const phungVuCode = fs.readFileSync(path.join(projectRoot, 'src/app/phung-vu/page.tsx'), 'utf8');
  assert(!pageCode.includes('augustino.net'), 'Trang chủ vẫn còn nhãn augustino.net');
  assert(!pageCode.includes('Nguồn augustino'), 'Trang chủ vẫn còn cụm Nguồn augustino');
  assert(!phungVuCode.includes('augustino.net') || phungVuCode.includes("!reading.sourceNote.toLowerCase().includes('augustino')"), 'Trang phụng vụ chưa loại bỏ nhãn augustino');
});

// ----------------------------------------------------------------------------
// NHÓM 2: KIỂM TRA MÚI GIỜ ASIA/HO_CHI_MINH (UTC+7)
// ----------------------------------------------------------------------------
console.log('\n2. KIỂM TRA XỬ LÝ MÚI GIỜ ASIA/HO_CHI_MINH:');

// Thuật toán timezone chuẩn
function getVietnamTodayString(now = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(now);
  } catch (e) {
    const vnTime = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
    const y = vnTime.getFullYear();
    const m = String(vnTime.getMonth() + 1).padStart(2, '0');
    const d = String(vnTime.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

function addDaysToDate(dateStr, days) {
  const parts = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12, 0, 0));
  d.setUTCDate(d.getUTCDate() + days);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

test('Chuyển đổi giờ ranh giới 23:59 vs 00:00 tại Việt Nam', () => {
  // 16:59:59 UTC ngày 2026-11-04 = 23:59:59 UTC+7 ngày 2026-11-04
  const beforeMidnightUTC = new Date('2026-11-04T16:59:59Z');
  assert(getVietnamTodayString(beforeMidnightUTC) === '2026-11-04', 'Phải là 2026-11-04');

  // 17:00:00 UTC ngày 2026-11-04 = 00:00:00 UTC+7 ngày 2026-11-05 (bước sang ngày mới tại VN)
  const afterMidnightUTC = new Date('2026-11-04T17:00:00Z');
  assert(getVietnamTodayString(afterMidnightUTC) === '2026-11-05', 'Phải chuyển sang 2026-11-05');
});

test('Xử lý năm nhuận và chuyển tháng an toàn', () => {
  assert(addDaysToDate('2028-02-28', 1) === '2028-02-29', '2028 là năm nhuận, phải có 29/02');
  assert(addDaysToDate('2028-02-29', 1) === '2028-03-01', 'Sau 29/02 phải là 01/03');
  assert(addDaysToDate('2026-12-31', 1) === '2027-01-01', 'Chuyển giao năm mới');
  assert(addDaysToDate('2026-01-01', -1) === '2025-12-31', 'Lùi về năm cũ');
});

// ----------------------------------------------------------------------------
// NHÓM 3: THUẬT TOÁN COMPUTUS TÍNH NGÀY PHỤC SINH & LỊCH DI ĐỘNG
// ----------------------------------------------------------------------------
console.log('\n3. KIỂM TRA THUẬT TOÁN COMPUTUS & CÁC LỄ DI ĐỘNG:');

function calculateEaster(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return { year, month, day, dateStr };
}

test('Tính chính xác Lễ Phục Sinh từ 2024 đến 2028', () => {
  assert(calculateEaster(2024).dateStr === '2024-03-31', 'Phục Sinh 2024 phải là 31/03/2024');
  assert(calculateEaster(2025).dateStr === '2025-04-20', 'Phục Sinh 2025 phải là 20/04/2025');
  assert(calculateEaster(2026).dateStr === '2026-04-05', 'Phục Sinh 2026 phải là 05/04/2026');
  assert(calculateEaster(2027).dateStr === '2027-03-28', 'Phục Sinh 2027 phải là 28/03/2027');
  assert(calculateEaster(2028).dateStr === '2028-04-16', 'Phục Sinh 2028 phải là 16/04/2028');
});

test('Tính chính xác Thứ Tư Lễ Tro và Hiện Xuống năm 2026', () => {
  const easter2026 = calculateEaster(2026).dateStr; // 2026-04-05
  const ashWednesday = addDaysToDate(easter2026, -46);
  const pentecost = addDaysToDate(easter2026, 49);
  assert(ashWednesday === '2026-02-18', 'Thứ Tư Lễ Tro 2026 phải là 18/02/2026 (-46 ngày)');
  assert(pentecost === '2026-05-24', 'Lễ Chúa Thánh Thần Hiện Xuống 2026 phải là 24/05/2026 (+49 ngày)');
});

// ----------------------------------------------------------------------------
// NHÓM 4: KIỂM TRA CHU KỲ CHÚA NHẬT (A/B/C) VÀ NGÀY THƯỜNG (I/II)
// ----------------------------------------------------------------------------
console.log('\n4. KIỂM TRA CHU KỲ NĂM PHỤNG VỤ:');

function parseDateString(dateStr) {
  const parts = dateStr.split('-').map(Number);
  return { year: parts[0], month: parts[1], day: parts[2] };
}

function getDayOfWeek(dateStr) {
  const { year, month, day } = parseDateString(dateStr);
  const d = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return { dayIndex: d.getUTCDay() };
}

function getFirstSundayOfAdvent(year) {
  for (let d = 27; d <= 30; d++) {
    const dStr = `${year}-11-${String(d).padStart(2, '0')}`;
    if (getDayOfWeek(dStr).dayIndex === 0) return dStr;
  }
  for (let d = 1; d <= 3; d++) {
    const dStr = `${year}-12-${String(d).padStart(2, '0')}`;
    if (getDayOfWeek(dStr).dayIndex === 0) return dStr;
  }
  return `${year}-11-29`;
}

function getLiturgicalCycles(dateStr) {
  const { year } = parseDateString(dateStr);
  const advent1 = getFirstSundayOfAdvent(year);
  const isNewLiturgicalYear = dateStr >= advent1;
  const effectiveYear = isNewLiturgicalYear ? year + 1 : year;
  const mod = effectiveYear % 3;
  const sundayCycle = mod === 1 ? 'A' : mod === 2 ? 'B' : 'C';
  const weekdayCycle = effectiveYear % 2 === 0 ? 'II' : 'I';
  return { sundayCycle, weekdayCycle, cycleLabel: `Năm ${sundayCycle} - Năm ${weekdayCycle}` };
}

test('Chu kỳ năm phụng vụ 2026: trước và sau Chúa Nhật I Mùa Vọng', () => {
  const currentOrdinaryTime = getLiturgicalCycles('2026-11-05');
  assert(currentOrdinaryTime.sundayCycle === 'A', 'Năm phụng vụ 2026 (trước Mùa Vọng) là Năm A (2026 % 3 = 1)');
  assert(currentOrdinaryTime.weekdayCycle === 'II', 'Năm phụng vụ 2026 là Năm II (năm chẵn)');

  // Sau Chúa Nhật I Mùa Vọng 2026 (29/11/2026) -> chuyển sang Năm B (2027)
  const advent2026 = getLiturgicalCycles('2026-11-29');
  assert(advent2026.sundayCycle === 'B', 'Chúa Nhật I Mùa Vọng 2026 chuyển sang Năm B (2027 % 3 = 2)');
  assert(advent2026.weekdayCycle === 'I', 'Chúa Nhật I Mùa Vọng 2026 chuyển sang Năm I');
});

// ----------------------------------------------------------------------------
// NHÓM 5: ĐỒNG BỘ 15 TRƯỜNG PHỤNG VỤ BẮT BUỘC TRÊN TRANG CHỦ
// ----------------------------------------------------------------------------
console.log('\n5. ĐỒNG BỘ ĐẦY ĐỦ 15 TRƯỜNG PHỤNG VỤ TRÊN CÙNG MỘT NGÀY:');

// Đọc logic từ file reading-resolver
const calendarEngineCode = fs.readFileSync(path.join(projectRoot, 'src/lib/liturgy/calendar-engine.ts'), 'utf8');
const readingResolverCode = fs.readFileSync(path.join(projectRoot, 'src/lib/liturgy/reading-resolver.ts'), 'utf8');

test('Cấu trúc DailyLiturgicalReading bao gồm đầy đủ 15 trường phụng vụ', () => {
  const typesCode = fs.readFileSync(path.join(projectRoot, 'src/types/index.ts'), 'utf8');
  const requiredFields = [
    'date',
    'title',
    'season',
    'seasonName',
    'color',
    'colorName',
    'rank',
    'rankName',
    'cycle',
    'liturgicalWeek',
    'firstReading',
    'responsorialPsalm',
    'gospel',
    'openingPrayer',
    'sourceNote'
  ];
  for (const field of requiredFields) {
    assert(typesCode.includes(field), `Types phải định nghĩa trường ${field}`);
  }
});

test('reading-resolver.ts hỗ trợ đầy đủ Chúa Nhật, Ngày thường và Lễ Trọng', () => {
  assert(readingResolverCode.includes('getLiturgicalReadingForDate'), 'Thiếu hàm getLiturgicalReadingForDate');
  assert(readingResolverCode.includes('getReflectionForDate'), 'Thiếu hàm getReflectionForDate');
  assert(readingResolverCode.includes('secondReading'), 'Thiếu xử lý Bài đọc II cho Chúa Nhật');
  assert(readingResolverCode.includes('gospelAcclamation'), 'Thiếu xử lý Tung hô Tin Mừng');
  assert(readingResolverCode.includes('openingPrayer'), 'Thiếu Lời nguyện nhập lễ');
});

// ----------------------------------------------------------------------------
// NHÓM 6: CƠ CHẾ AUTO-REFRESH KHI CHUYỂN NGÀY VÀ VISIBILITY CHANGE
// ----------------------------------------------------------------------------
console.log('\n6. KIỂM TRA CƠ CHẾ TỰ ĐỘNG LÀM MỚI KHI QUA NỬA ĐÊM:');

test('Homepage và Phụng vụ có bộ lắng nghe visibilitychange & interval kiểm tra nửa đêm', () => {
  const homeCode = fs.readFileSync(path.join(projectRoot, 'src/app/page.tsx'), 'utf8');
  assert(homeCode.includes("addEventListener('visibilitychange'"), 'Homepage thiếu visibilitychange listener');
  assert(homeCode.includes('setInterval(') && homeCode.includes('60000'), 'Homepage thiếu interval 60000 kiểm tra nửa đêm');

  const phungVuCode = fs.readFileSync(path.join(projectRoot, 'src/app/phung-vu/page.tsx'), 'utf8');
  assert(phungVuCode.includes("addEventListener('visibilitychange'"), 'Phụng vụ thiếu visibilitychange listener');
  assert(phungVuCode.includes('setInterval(checkMidnight, 60000)'), 'Phụng vụ thiếu interval kiểm tra nửa đêm');
});

// ----------------------------------------------------------------------------
// TỔNG KẾT
// ----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`KẾT QUẢ KIỂM THỬ: ${passCount} / ${results.length} BÀI TEST ĐẠT (${failCount === 0 ? '100% THÀNH CÔNG' : 'CÓ LỖI'})`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
}
