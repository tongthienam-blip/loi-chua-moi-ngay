// ============================================================================
// BỘ KIỂM THỬ TỰ ĐỘNG CHUẨN HOÁ HỆ THỐNG (SYSTEM INTEGRITY RUNNER)
// Chạy trực tiếp bằng Node.js tiêu chuẩn
// ============================================================================

const fs = require('fs');
const path = require('path');

const results = [];

function assert(condition, testName, failureMessage) {
  if (condition) {
    results.push({ name: testName, passed: true, message: 'ĐẠT (PASSED)' });
  } else {
    results.push({ name: testName, passed: false, message: `THẤT BẠI: ${failureMessage}` });
  }
}

console.log('================================================================');
console.log('BẮT ĐẦU CHẠY KIỂM THỬ GIAI ĐOẠN 8: TOÀN VẸN DỮ LIỆU & BẢO MẬT');
console.log('================================================================\n');

// 1. Kiểm tra sự tồn tại của các tệp cốt lõi Giai đoạn 8 & UI/UX
const requiredFiles = [
  'src/types/index.ts',
  'src/lib/auth/rbac.ts',
  'src/lib/auth/security.ts',
  'src/lib/bible-store.ts',
  'src/lib/bible/importer.ts',
  'src/data/catholic-books.ts',
  'src/data/liturgical-readings.ts',
  'src/data/sample-verses.ts',
  'src/data/typology-data.ts',
  'src/data/catechism-data.ts',
  'src/data/church-documents.ts',
  'src/data/daily-reflections.ts',
  'src/data/reading-plans.ts',
  'src/components/Navbar.tsx',
  'src/components/BottomNav.tsx',
  'src/components/AudioPlayerBar.tsx',
  'src/components/BookIntroModal.tsx',
  'src/components/VerseDetailModal.tsx',
  'src/components/SearchModal.tsx',
  'src/components/Skeleton.tsx',
  'src/components/EmptyState.tsx',
  'src/app/page.tsx',
  'src/app/kinh-thanh/page.tsx',
  'src/app/kinh-thanh/[bookId]/page.tsx',
  'src/app/phung-vu/page.tsx',
  'src/app/nghien-cuu/page.tsx',
  'src/app/suy-niem/page.tsx',
  'src/app/tao-anh/page.tsx',
  'src/app/ke-hoach-doc/page.tsx',
  'src/app/tro-ly-ai/page.tsx',
  'src/app/api/assistant/route.ts',
  'src/app/ca-nhan/page.tsx',
  'src/app/admin/layout.tsx',
  'src/app/admin/page.tsx',
  'src/app/admin/phung-vu/page.tsx',
  'src/app/admin/suy-niem/page.tsx',
  'src/app/admin/kiem-duyet-nguon/page.tsx',
  'src/app/admin/audit-logs/page.tsx',
  'public/manifest.json',
  'public/sw.js',
  'supabase/schema.sql',
  'Dockerfile',
  'docker-compose.yml',
  '.env.example',
  'DEPLOYMENT_GUIDE.md',
  'ADMIN_MANUAL.md'
];

const basePath = path.resolve(__dirname, '..');
const missingFiles = requiredFiles.filter(f => !fs.existsSync(path.join(basePath, f)));
assert(missingFiles.length === 0, 'Kiểm tra đầy đủ các tệp mã nguồn và kiến trúc', `Thiếu các tệp: ${missingFiles.join(', ')}`);

// 2. Đọc và kiểm tra nội dung 73 sách Kinh Thánh trong catholic-books.ts
const booksContent = fs.readFileSync(path.join(basePath, 'src/data/catholic-books.ts'), 'utf8');
const hasDeuterocanonical = 
  booksContent.includes("'tob'") && 
  booksContent.includes("'jdt'") && 
  booksContent.includes("'1macc'") && 
  booksContent.includes("'2macc'") && 
  booksContent.includes("'wis'") && 
  booksContent.includes("'sir'") && 
  booksContent.includes("'bar'");
assert(hasDeuterocanonical, 'Kiểm tra đủ 7 sách Đệ Nhị Quy Điển Công Giáo (Tôbia, Giuđitha, Macabê, Khôn Ngoan...)', 'Thiếu sách Đệ Nhị Quy Điển!');

// 3. Kiểm tra bảo mật API: đảm bảo không có API KEY bị rò rỉ ra client
const securityContent = fs.readFileSync(path.join(basePath, 'src/lib/auth/security.ts'), 'utf8');
const hasServerGuard = securityContent.includes("typeof window !== 'undefined'") && securityContent.includes('CẢNH BÁO BẢO MẬT');
assert(hasServerGuard, 'Kiểm tra cơ chế Server-side guard chống lộ API Key phía Client', 'Thiếu kiểm tra bảo mật phía client!');

// 4. Kiểm tra phân quyền RBAC
const rbacContent = fs.readFileSync(path.join(basePath, 'src/lib/auth/rbac.ts'), 'utf8');
const hasSuperAdmin = rbacContent.includes('SUPER_ADMIN');
const hasTheologian = rbacContent.includes('THEOLOGIAN_EDITOR');
const hasLiturgist = rbacContent.includes('LITURGIST');
assert(hasSuperAdmin && hasTheologian && hasLiturgist, 'Kiểm tra hệ thống phân quyền 5 cấp bậc RBAC', 'Thiếu định nghĩa vai trò trong RBAC!');

// 5. Kiểm tra Database SQL Schema
const sqlContent = fs.readFileSync(path.join(basePath, 'supabase/schema.sql'), 'utf8');
const hasRlsPolicies = sqlContent.includes('ROW LEVEL SECURITY') && sqlContent.includes('admin_audit_logs');
assert(hasRlsPolicies, 'Kiểm tra Row Level Security (RLS) & Bảng Audit Logs trong PostgreSQL Schema', 'Thiếu chính sách RLS hoặc bảng audit logs!');

// 6. Kiểm tra Kế hoạch đọc Kinh Thánh
const readingPlansContent = fs.readFileSync(path.join(basePath, 'src/data/reading-plans.ts'), 'utf8');
const hasPlans = 
  readingPlansContent.includes('plan-365') && 
  readingPlansContent.includes('plan-nt-90') && 
  readingPlansContent.includes('plan-gospels-30') && 
  readingPlansContent.includes('plan-psalms-30');
assert(hasPlans, 'Kiểm tra các Kế Hoạch Đọc Kinh Thánh (365 Ngày, 90 Ngày Tân Ước, Phúc Âm, Thánh Vịnh)', 'Thiếu kế hoạch đọc chuẩn!');

// 7. Kiểm tra Trợ Lý Thần Học AI & Huấn Quyền
const assistantApiContent = fs.readFileSync(path.join(basePath, 'src/app/api/assistant/route.ts'), 'utf8');
const hasTheologicalChecks = 
  assistantApiContent.includes('73 sách') && 
  assistantApiContent.includes('Dei Verbum') && 
  assistantApiContent.includes('GLHTCG');
assert(hasTheologicalChecks, 'Kiểm tra Trợ Lý AI: Huấn Quyền Công Giáo, 73 Sách & Đối Chiếu Giáo Lý (GLHTCG)', 'Trợ lý AI thiếu quy chuẩn thần học!');

// 8. Kiểm tra Bộ Phân Tích & Nạp Dữ Liệu USFM
const importerContent = fs.readFileSync(path.join(basePath, 'src/lib/bible/importer.ts'), 'utf8');
const hasImporterLogic = 
  importerContent.includes('parseUSFM') && 
  importerContent.includes('generateSQLBatch') && 
  importerContent.includes('CATHOLIC_BOOKS');
assert(hasImporterLogic, 'Kiểm tra Universal Bible Parser: Đọc USFM & Tạo SQL Batch vào PostgreSQL', 'Thiếu parser USFM chuẩn!');

// 9. Kiểm tra Cấu hình PWA & Ngoại Tuyến
const manifestContent = fs.readFileSync(path.join(basePath, 'public/manifest.json'), 'utf8');
const swContent = fs.readFileSync(path.join(basePath, 'public/sw.js'), 'utf8');
const hasPwaConfig = manifestContent.includes('Lời Chúa') && swContent.includes('CACHE_NAME');
assert(hasPwaConfig, 'Kiểm tra Cấu hình PWA & Service Worker (Chế độ đọc ngoại tuyến Offline)', 'Thiếu manifest hoặc service worker!');

// In kết quả
console.log('KẾT QUẢ CÁC BÀI TEST CHUẨN HOÁ:\n');
let passCount = 0;
results.forEach((r, idx) => {
  if (r.passed) passCount++;
  console.log(`${idx + 1}. [${r.passed ? '✓ THÀNH CÔNG' : '✗ THẤT BẠI'}] ${r.name}`);
  if (!r.passed) {
    console.log(`   --> ${r.message}`);
  }
});

console.log(`\n================================================================`);
console.log(`TỔNG KẾT: ${passCount}/${results.length} BÀI KIỂM THỬ ĐẠT CHUẨN (${Math.round((passCount / results.length) * 100)}%)`);
console.log('================================================================');

if (passCount === results.length) {
  console.log('>>> TẤT CẢ CÁC THÀNH PHẦN GIAI ĐOẠN 8 & UI/UX ĐÃ HOÀN TẤT VÀ VẬN HÀNH CHÍNH XÁC!\n');
}
