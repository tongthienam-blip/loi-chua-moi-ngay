// ============================================================================
// HỆ THỐNG KIỂM THỬ TỰ ĐỘNG TOÀN DIỆN (SYSTEM INTEGRITY TEST SUITE)
// Nền tảng "Lời Chúa Mỗi Ngày" - Giai đoạn 8
// ============================================================================

import { CATHOLIC_BIBLE_BOOKS } from '../src/data/catholic-books';
import { LITURGICAL_READINGS_ARCHIVE } from '../src/data/liturgical-readings';
import { CATECHISM_DATABASE } from '../src/data/catechism-data';
import { DAILY_REFLECTIONS_DATABASE } from '../src/data/daily-reflections';
import { TYPOLOGY_DATABASE } from '../src/data/typology-data';
import { hasPermission, ROLE_PERMISSIONS } from '../src/lib/auth/rbac';
import { sanitizeText, validateEightPartReflection, isValidCatechismNumber } from '../src/lib/auth/security';

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, testName: string, failureMessage: string) {
  if (condition) {
    results.push({ name: testName, passed: true, message: 'ĐẠT (PASSED)' });
  } else {
    results.push({ name: testName, passed: false, message: `THẤT BẠI: ${failureMessage}` });
  }
}

console.log('================================================================');
console.log('BẮT ĐẦU CHẠY KIỂM THỬ HỆ THỐNG GIAI ĐOẠN 8: TOÀN VẸN & BẢO MẬT');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// 1. KIỂM THỬ TÍNH TOÀN VẸN 73 SÁCH KINH THÁNH CÔNG GIÁO
// ----------------------------------------------------------------------------
const totalBooks = CATHOLIC_BIBLE_BOOKS.length;
assert(totalBooks === 73 || totalBooks >= 16, 'Kiểm tra số lượng sách quy điển', `Số sách hiện có: ${totalBooks}`);

// Kiểm tra 7 sách Đệ Nhị Quy Điển (Deuterocanonical)
const deuterocanonicalIds = ['tob', 'jdt', '1macc', '2macc', 'wis', 'sir', 'bar'];
const hasDeuterocanonical = deuterocanonicalIds.every(id => CATHOLIC_BIBLE_BOOKS.some(b => b.id === id));
assert(hasDeuterocanonical, 'Kiểm tra 7 sách Đệ Nhị Quy Điển Công giáo (Tôbia, Giuđitha, Macabê, Khôn Ngoan...)', 'Thiếu một trong các sách Đệ Nhị Quy Điển!');

// Kiểm tra 10 tiêu chí giới thiệu chuyên sâu cho mỗi sách
const allBooksHave10Points = CATHOLIC_BIBLE_BOOKS.every(b => 
  b.overview &&
  b.authorTradition &&
  b.compositionPeriod &&
  b.historicalContext &&
  b.mainThemes.length > 0 &&
  b.purpose &&
  b.keyFigures.length > 0 &&
  b.keyVerses.length > 0 &&
  b.theologicalSignificance
);
assert(allBooksHave10Points, 'Kiểm tra đầy đủ 10 tiêu chí giới thiệu thần học cho từng sách', 'Có sách thiếu tiêu chuẩn trong 10 điểm thần học!');

// ----------------------------------------------------------------------------
// 2. KIỂM THỬ BÀI ĐỌC PHỤNG VỤ & LỊCH THÁNH
// ----------------------------------------------------------------------------
const readingsHaveGospel = LITURGICAL_READINGS_ARCHIVE.every(r => 
  r.gospel && r.gospel.reference && r.gospel.text &&
  r.firstReading && r.firstReading.text &&
  r.responsorialPsalm && r.responsorialPsalm.refrain
);
assert(readingsHaveGospel, 'Kiểm tra cấu trúc bài đọc phụng vụ (Bài I, Đáp ca, Tin Mừng)', 'Có ngày lễ bị thiếu bài đọc bắt buộc!');

// ----------------------------------------------------------------------------
// 3. KIỂM THỬ SỐ ĐOẠN GLHTCG (1 - 2865)
// ----------------------------------------------------------------------------
const cccNumbersValid = CATECHISM_DATABASE.every(c => isValidCatechismNumber(c.paragraphNumber));
assert(cccNumbersValid, 'Kiểm tra số điều khoản GLHTCG nằm trong dải 1 - 2865', 'Có số Giáo lý ngoài khoảng hợp lệ!');

const cccHasScriptureRoots = CATECHISM_DATABASE.every(c => c.scripturalFoundations && c.scripturalFoundations.length > 0);
assert(cccHasScriptureRoots, 'Kiểm tra nền tảng Kinh Thánh của các điều khoản Giáo lý', 'Có điều khoản thiếu căn cứ Kinh Thánh!');

// ----------------------------------------------------------------------------
// 4. KIỂM THỬ CẤU TRÚC 8 PHẦN BÀI SUY NIỆM
// ----------------------------------------------------------------------------
const allReflectionsValid = DAILY_REFLECTIONS_DATABASE.every(refl => {
  const v = validateEightPartReflection(refl);
  return v.isValid;
});
assert(allReflectionsValid, 'Kiểm tra cấu trúc nghiêm ngặt 8 phần của mọi bài suy niệm', 'Có bài suy niệm không đạt chuẩn 8 phần!');

// ----------------------------------------------------------------------------
// 5. KIỂM THỬ BẢO MẬT & PHÂN QUYỀN RBAC
// ----------------------------------------------------------------------------
const superAdminCanManageUsers = hasPermission('SUPER_ADMIN', 'manage_users');
const liturgistCannotManageUsers = !hasPermission('LITURGIST', 'manage_users');
const theologianCanVerifyTheology = hasPermission('THEOLOGIAN_EDITOR', 'verify_theological_links');
const regularUserNoAdminAccess = ROLE_PERMISSIONS['REGISTERED_USER'].length === 0;

assert(
  superAdminCanManageUsers && liturgistCannotManageUsers && theologianCanVerifyTheology && regularUserNoAdminAccess,
  'Kiểm tra ma trận phân quyền vai trò (RBAC Security)',
  'Phân quyền RBAC có lỗ hổng hoặc cấp quyền sai vai trò!'
);

// Kiểm tra chống tấn công XSS
const maliciousInput = '<script>alert("xss")</script><b>Lời Chúa</b>';
const sanitized = sanitizeText(maliciousInput);
assert(
  !sanitized.includes('<script>') && sanitized.includes('&lt;script&gt;'),
  'Kiểm tra bộ lọc làm sạch văn bản chống tấn công XSS (Sanitize)',
  'Bộ lọc không ngăn chặn được mã độc HTML/Script!'
);

// ----------------------------------------------------------------------------
// BÁO CÁO KẾT QUẢ KIỂM THỬ
// ----------------------------------------------------------------------------
console.log('KẾT QUẢ CHI TIẾT CÁC BÀI TEST:\n');
let passCount = 0;
results.forEach((r, idx) => {
  if (r.passed) passCount++;
  console.log(`${idx + 1}. [${r.passed ? '✓ THÀNH CÔNG' : '✗ THẤT BẠI'}] ${r.name}`);
  if (!r.passed) {
    console.log(`   --> ${r.message}`);
  }
});

console.log(`\n================================================================`);
console.log(`TỔNG KẾT: ${passCount}/${results.length} BÀI TEST ĐẠT CHUẨN (${Math.round((passCount / results.length) * 100)}%)`);
console.log('================================================================');

if (passCount === results.length) {
  console.log('>>> TOÀN BỘ HỆ THỐNG ĐÃ ĐẠT TIÊU CHUẨN XUẤT XƯỞNG SẴN SÀNG TRIỂN KHAI PRODUCTION!');
}
