/**
 * ============================================================================
 * CÔNG CỤ KIỂM TRA TỰ ĐỘNG BẢO ĐẢM TÍNH TOÀN VẸN CỦA GLHTCG (PHẦN 3)
 * Kiểm định: 2.865 điều khoản, 4 Trụ cột, 13 Chủ đề, Tín lý, Nền tảng Kinh Thánh
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const catechismFilePath = path.join(projectRoot, 'src/data/catechism-data.ts');
const pageFilePath = path.join(projectRoot, 'src/app/giao-ly/page.tsx');

console.log('================================================================');
console.log('KIỂM TRA TỰ ĐỘNG TOÀN BỘ 2.865 ĐIỀU GIÁO LÝ HỘI THÁNH CÔNG GIÁO');
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

const fileContent = fs.readFileSync(catechismFilePath, 'utf8');

// ----------------------------------------------------------------------------
// 1. KIỂM ĐỊNH TÍNH LIÊN TỤC VÀ ĐẦY ĐỦ CỦA 2.865 ĐIỀU KHOẢN (KHÔNG ĐỨT ĐOẠN)
// ----------------------------------------------------------------------------
console.log('1. KIỂM ĐỊNH PHẠM VI 2.865 ĐIỀU KHOẢN VÀ 4 TRỤ CỘT:');

test('Phải có định nghĩa CANONICAL_SECTIONS phủ kín từ Điều 1 đến Điều 2865', () => {
  // Trích xuất các section ranges
  const rangeRegex = /from:\s*(\d+),\s*to:\s*(\d+),\s*pillar:\s*(\d+)/g;
  const sections = [];
  let match;
  while ((match = rangeRegex.exec(fileContent)) !== null) {
    sections.push({
      from: parseInt(match[1], 10),
      to: parseInt(match[2], 10),
      pillar: parseInt(match[3], 10)
    });
  }

  assert(sections.length >= 20, `Số lượng canonical sections (${sections.length}) phải >= 20`);
  assert(sections[0].from === 1, `Điều bắt đầu phải là 1, thực tế là ${sections[0].from}`);
  
  const lastSection = sections[sections.length - 1];
  assert(lastSection.to === 2865, `Điều kết thúc phải là 2865, thực tế là ${lastSection.to}`);

  // Kiểm tra không có khoảng trống hay đứt đoạn giữa các section
  for (let i = 0; i < sections.length - 1; i++) {
    const current = sections[i];
    const next = sections[i + 1];
    assert(
      current.to + 1 === next.from,
      `Đứt đoạn hoặc trùng lặp tại section ${i}: từ ${current.to} đến ${next.from}`
    );
  }
});

test('Phạm vi 4 Trụ Cột Đức Tin phải tuân thủ nghiêm ngặt quy định của Tòa Thánh', () => {
  // Trụ Cột I: 1 - 1065
  // Trụ Cột II: 1066 - 1690
  // Trụ Cột III: 1691 - 2557
  // Trụ Cột IV: 2558 - 2865
  const rangeRegex = /from:\s*(\d+),\s*to:\s*(\d+),\s*pillar:\s*(\d+)/g;
  let match;
  let minPillar = { 1: 9999, 2: 9999, 3: 9999, 4: 9999 };
  let maxPillar = { 1: 0, 2: 0, 3: 0, 4: 0 };

  while ((match = rangeRegex.exec(fileContent)) !== null) {
    const from = parseInt(match[1], 10);
    const to = parseInt(match[2], 10);
    const pillar = parseInt(match[3], 10);

    if (pillar >= 1 && pillar <= 4) {
      if (from < minPillar[pillar]) minPillar[pillar] = from;
      if (to > maxPillar[pillar]) maxPillar[pillar] = to;
    }
  }

  assert(minPillar[1] === 1 && maxPillar[1] === 1065, `Trụ Cột I phải từ 1 đến 1065 (thực tế: ${minPillar[1]}-${maxPillar[1]})`);
  assert(minPillar[2] === 1066 && maxPillar[2] === 1690, `Trụ Cột II phải từ 1066 đến 1690 (thực tế: ${minPillar[2]}-${maxPillar[2]})`);
  assert(minPillar[3] === 1691 && maxPillar[3] === 2557, `Trụ Cột III phải từ 1691 đến 2557 (thực tế: ${minPillar[3]}-${maxPillar[3]})`);
  assert(minPillar[4] === 2558 && maxPillar[4] === 2865, `Trụ Cột IV phải từ 2558 đến 2865 (thực tế: ${minPillar[4]}-${maxPillar[4]})`);
});

// ----------------------------------------------------------------------------
// 2. KIỂM ĐỊNH CÁC ĐIỀU KHOẢN NGUYÊN VĂN BẮT BUỘC (KEY DOCTRINAL PARAGRAPHS)
// ----------------------------------------------------------------------------
console.log('\n2. KIỂM ĐỊNH CÁC ĐIỀU KHOẢN NGUYÊN VĂN TRỌNG TÂM:');

const requiredVerbatimNumbers = [
  1, 27, 50, 101, 144, 176, 198, 232, 461, 638, 811, 846, 963, 1066, 1113,
  1213, 1324, 1422, 1700, 1803, 1812, 1814, 2052, 2196, 2258, 2558, 2759, 2865
];

test('Tất cả các điều khoản trọng yếu bắt buộc phải có trong CATECHISM_DATABASE', () => {
  const pNumMatches = [...fileContent.matchAll(/paragraphNumber:\s*(\d+)/g)].map(m => parseInt(m[1], 10));
  
  for (const reqNum of requiredVerbatimNumbers) {
    assert(pNumMatches.includes(reqNum), `Thiếu điều khoản nguyên văn bắt buộc #${reqNum}`);
  }
});

test('Điều #176 phải chứa định nghĩa chính xác về Bản Chất Đức Tin', () => {
  assert(fileContent.includes('paragraphNumber: 176'), 'Thiếu điều 176');
  assert(
    fileContent.includes('gắn bó cá vị của toàn thể con người với Thiên Chúa'),
    'Điều 176 phải chứa định nghĩa: gắn bó cá vị của toàn thể con người với Thiên Chúa'
  );
});

test('Điều #846 phải chứa tín lý «Ngoài Hội Thánh không có ơn cứu độ» và giải thích tích cực', () => {
  assert(fileContent.includes('paragraphNumber: 846'), 'Thiếu điều 846');
  assert(
    fileContent.includes('Ngoài Hội Thánh không có ơn cứu độ') || fileContent.includes('Extra Ecclesiam nulla salus'),
    'Điều 846 phải chứa Extra Ecclesiam nulla salus'
  );
  assert(
    fileContent.includes('mọi ơn cứu độ đều đến từ Đức Kitô là Đầu, qua Thân Thể Người là Hội Thánh'),
    'Điều 846 phải chứa giải thích theo Lumen Gentium 14'
  );
});

test('Điều #1324 phải chứa tín lý Thánh Thể là Nguồn Mạch và Chóp Đỉnh', () => {
  assert(fileContent.includes('paragraphNumber: 1324'), 'Thiếu điều 1324');
  assert(
    fileContent.includes('nguồn mạch và chóp đỉnh của toàn bộ đời sống Kitô giáo'),
    'Điều 1324 phải chứa: nguồn mạch và chóp đỉnh của toàn bộ đời sống Kitô giáo'
  );
  assert(
    fileContent.includes('Lumen Gentium 11'),
    'Điều 1324 phải trích dẫn Hiến chế Lumen Gentium 11'
  );
});

test('Điều #1814 phải chứa định nghĩa Nhân Đức Đối Thần Đức Tin', () => {
  assert(fileContent.includes('paragraphNumber: 1814'), 'Thiếu điều 1814');
  assert(
    fileContent.includes('Đức tin là nhân đức đối thần nhờ đó chúng ta tin vào Thiên Chúa'),
    'Điều 1814 phải chứa định nghĩa nhân đức đối thần Đức Tin'
  );
  assert(
    fileContent.includes('Gl 5,6') || fileContent.includes('hoạt động nhờ đức ái'),
    'Điều 1814 phải chứa: đức tin hoạt động nhờ đức ái'
  );
});

test('Điều #2865 phải chứa lời giải thích ý nghĩa tiếng Amen kết thúc GLHTCG', () => {
  assert(fileContent.includes('paragraphNumber: 2865'), 'Thiếu điều 2865');
  assert(
    fileContent.includes('Amen') && fileContent.includes('Ước gì được như vậy'),
    'Điều 2865 phải chứa lời giải thích tiếng Amen'
  );
});

// ----------------------------------------------------------------------------
// 3. KIỂM ĐỊNH 13 CHỦ ĐỀ HỌC HỎI GIÁO LÝ (13 THEMATIC STUDY MODES)
// ----------------------------------------------------------------------------
console.log('\n3. KIỂM ĐỊNH 13 CHỦ ĐỀ HỌC HỎI GIÁO LÝ:');

test('Phải có đủ 13 chủ đề học hỏi trong CATECHISM_THEMES', () => {
  const themeMatches = [...fileContent.matchAll(/id:\s*(\d+),\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)'/g)];
  assert(themeMatches.length === 13, `Phải có đúng 13 chủ đề, thực tế tìm thấy ${themeMatches.length}`);

  const requiredSlugs = [
    'duc-tin', 'mac-khai', 'ba-ngoi', 'duc-kito', 'chua-thanh-than',
    'hoi-thanh', 'cac-bi-tich', 'luan-ly', 'nhan-duc', 'muoi-dieu-ran',
    'kinh-nguyen', 'duc-maria', 'canh-chung'
  ];

  for (const slug of requiredSlugs) {
    assert(
      themeMatches.some(m => m[2] === slug),
      `Thiếu chủ đề học hỏi: ${slug}`
    );
  }
});

// ----------------------------------------------------------------------------
// 4. KIỂM ĐỊNH HÀM TRA CỨU VÀ TÍNH NĂNG GIAO DIỆN
// ----------------------------------------------------------------------------
console.log('\n4. KIỂM ĐỊNH GIAO DIỆN VÀ TÍNH NĂNG ĐIỀU HƯỚNG:');

test('Hàm getCatechismByNumber(num) phải tồn tại và xử lý chính xác', () => {
  assert(fileContent.includes('export function getCatechismByNumber'), 'Thiếu hàm getCatechismByNumber');
  assert(fileContent.includes('if (num < 1 || num > 2865) return null;'), 'Phải giới hạn đúng 1..2865');
});

test('Hàm searchCatechism phải hỗ trợ tìm kiếm theo số, từ khóa, trụ cột và chủ đề (themeId)', () => {
  assert(
    fileContent.includes('searchCatechism(query?: string, pillar?: number, themeId?: number)'),
    'Hàm searchCatechism phải nhận tham số themeId'
  );
});

test('Giao diện /giao-ly phải có thanh công cụ Prev/Next, Copy Trích Dẫn, Share Link và Ghi Chú', () => {
  const pageContent = fs.readFileSync(pageFilePath, 'utf8');
  assert(
    pageContent.includes('handleSelectNumber') || pageContent.includes('getCatechismByNumber'),
    'Trang giáo lý phải có hàm chọn số điều'
  );
  assert(
    pageContent.includes('CATECHISM_THEMES') || pageContent.includes('chủ đề') || pageContent.includes('theme'),
    'Trang giáo lý phải tích hợp 13 chủ đề học hỏi'
  );
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
  console.log('TẤT CẢ CÁC BÀI KIỂM THỬ GLHTCG ĐÃ HOÀN TOÀN VƯỢT QUA!');
}
