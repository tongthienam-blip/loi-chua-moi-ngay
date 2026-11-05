// ============================================================================
// KIỂM THỬ TỰ ĐỘNG PHẦN 6: HỆ SINH THÁI HỌC HỎI KINH THÁNH VÀ ĐỨC TIN
// ============================================================================

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    testsPassed++;
  } else {
    console.error(`  ✗ ${message}`);
    testsFailed++;
  }
}

console.log('\n================================================================');
console.log('KIỂM TRA HỆ SINH THÁI HỌC HỎI KINH THÁNH & ĐỨC TIN (PHẦN 6)');
console.log('================================================================\n');

// 1. Kiểm tra Trợ lý AI Công giáo
console.log('1. Trợ Lý Học Hỏi Kinh Thánh Công Giáo (tro-ly-ai/page.tsx & api/assistant/route.ts):');
const assistantPage = fs.readFileSync(path.join(__dirname, '../src/app/tro-ly-ai/page.tsx'), 'utf8');
const assistantRoute = fs.readFileSync(path.join(__dirname, '../src/app/api/assistant/route.ts'), 'utf8');

assert(assistantPage.includes('Trợ Lý Học Hỏi Kinh Thánh Công Giáo'), 'Đã đổi tên gọi chuẩn xác');
assert(!assistantPage.includes('Magisterium AI'), 'Đã gỡ bỏ hoàn toàn cụm từ Magisterium AI');
assert(assistantPage.includes('BIBLE_QA') && assistantPage.includes('CATECHISM_LOOKUP'), 'Chế độ 1 & 2: Hỏi đáp Kinh Thánh & Tra cứu GLHTCG');
assert(assistantPage.includes('THEOLOGY_STUDY') && assistantPage.includes('CHURCH_DOCUMENTS'), 'Chế độ 3 & 4: Nghiên cứu thần học & Văn kiện Hội Thánh');
assert(assistantPage.includes('MEDITATION') && assistantPage.includes('EXAM_PREP'), 'Chế độ 5 & 6: Suy niệm Lời Chúa & Học tập ôn thi');
assert(assistantRoute.includes('officialTeaching') && assistantRoute.includes('theologicalOpinion'), 'Phân biệt giáo huấn chính thức và nhận định thần học');
assert(assistantPage.includes('không phải là Huấn quyền Hội Thánh'), 'Tuyên bố miễn trách nhiệm không mạo nhận Huấn quyền');

// 2. Kiểm tra Thư viện Văn kiện Hội Thánh (9 Phân loại)
console.log('\n2. Thư Viện Văn Kiện Hội Thánh (church-documents.ts & nghien-cuu/page.tsx):');
const churchDocs = fs.readFileSync(path.join(__dirname, '../src/data/church-documents.ts'), 'utf8');
const nghienCuuPage = fs.readFileSync(path.join(__dirname, '../src/app/nghien-cuu/page.tsx'), 'utf8');

assert(churchDocs.includes('VATICAN_II'), 'Nhóm 1: Công đồng Vaticanô II');
assert(churchDocs.includes('POPE_TEACHINGS'), 'Nhóm 2: Giáo huấn của các Đức Giáo hoàng');
assert(churchDocs.includes('SOCIAL_DOCTRINE'), 'Nhóm 3: Học thuyết Xã hội Công giáo');
assert(churchDocs.includes('LITURGY'), 'Nhóm 4: Phụng vụ');
assert(churchDocs.includes('DOCTRINE_FAITH'), 'Nhóm 5: Giáo lý và đức tin');
assert(churchDocs.includes('FAMILY_HUMAN_DIGNITY'), 'Nhóm 6: Gia đình và phẩm giá con người');
assert(churchDocs.includes('VOCATION_CONSECRATED'), 'Nhóm 7: Ơn gọi và đời sống thánh hiến');
assert(churchDocs.includes('MISSION_EVANGELIZATION'), 'Nhóm 8: Truyền giáo và loan báo Tin Mừng');
assert(churchDocs.includes('ECOLOGY_ENVIRONMENT'), 'Nhóm 9: Môi trường và sinh thái toàn diện');
assert(churchDocs.includes('Dei Verbum') && churchDocs.includes('Lumen Gentium') && churchDocs.includes('Gaudium et Spes'), 'Có các Hiến chế nền tảng Vatican II');
assert(churchDocs.includes('Rerum Novarum') && churchDocs.includes('Caritas in Veritate'), 'Có các văn kiện Học thuyết Xã hội');
assert(churchDocs.includes('Laudato Si') && churchDocs.includes('Laudate Deum'), 'Có các văn kiện Môi sinh toàn diện');
assert(nghienCuuPage.includes('docQuery') && nghienCuuPage.includes('selectedCategory'), 'Có chức năng tìm kiếm và lọc theo chủ đề trong tab văn kiện');

// 3. Kiểm tra Trung tâm Nghiên cứu Kinh Thánh (12 Mục Chuyên Sâu)
console.log('\n3. Nghiên Cứu Chuyên Sâu 12 Mục (kinh-thanh/[bookId]/page.tsx & sample-verses.ts):');
const bookReaderPage = fs.readFileSync(path.join(__dirname, '../src/app/kinh-thanh/[bookId]/page.tsx'), 'utf8');
const sampleVerses = fs.readFileSync(path.join(__dirname, '../src/data/sample-verses.ts'), 'utf8');

assert(bookReaderPage.includes('1. Bối Cảnh Lịch Sử'), 'Mục 1: Bối cảnh lịch sử');
assert(bookReaderPage.includes('2. Địa Lý & Không Gian Văn Hóa'), 'Mục 2: Địa lý và văn hóa');
assert(bookReaderPage.includes('3. Tác Giả & Đối Tượng Độc Giả'), 'Mục 3: Tác giả và độc giả');
assert(bookReaderPage.includes('4. Cấu Trúc Văn Chương'), 'Mục 4: Cấu trúc văn chương');
assert(bookReaderPage.includes('5. Các Nhân Vật Lịch Sử Cứu Độ'), 'Mục 5: Các nhân vật');
assert(bookReaderPage.includes('6. Phân Tích Từ Ngữ Quan Trọng'), 'Mục 6: Từ ngữ quan trọng');
assert(bookReaderPage.includes('7. Ý Nghĩa Thần Học'), 'Mục 7: Ý nghĩa thần học');
assert(bookReaderPage.includes('8. Ý Nghĩa Kitô Học'), 'Mục 8: Ý nghĩa Kitô học');
assert(bookReaderPage.includes('9. Liên Hệ Cựu Ước – Tân Ước') || bookReaderPage.includes('Liên Hệ Cựu Ước &ndash; Tân Ước'), 'Mục 9: Liên hệ Cựu Ước – Tân Ước');
assert(bookReaderPage.includes('10. Liên Hệ Giáo Lý (GLHTCG)'), 'Mục 10: Liên hệ GLHTCG');
assert(bookReaderPage.includes('11. Liên Hệ Văn Kiện Hội Thánh'), 'Mục 11: Liên hệ văn kiện Hội Thánh');
assert(bookReaderPage.includes('12. Gợi Ý Suy Niệm & Áp Dụng Đời Sống'), 'Mục 12: Gợi ý suy niệm và áp dụng đời sống');
assert(bookReaderPage.includes('Tài Liệu Tham Khảo Nghiên Cứu Chính Thức'), 'Có khối ghi chú nguồn tài liệu tham khảo');

// 4. Kiểm tra Kế hoạch Đọc Kinh Thánh
console.log('\n4. Kế Hoạch Đọc Kinh Thánh (reading-plans.ts & ke-hoach-doc/page.tsx):');
const readingPlans = fs.readFileSync(path.join(__dirname, '../src/data/reading-plans.ts'), 'utf8');
const readingPlanPage = fs.readFileSync(path.join(__dirname, '../src/app/ke-hoach-doc/page.tsx'), 'utf8');

assert(readingPlans.includes('toan-bo-kinh-thanh-365-ngay'), 'Kế hoạch 1: 365 ngày toàn bộ Kinh Thánh');
assert(readingPlans.includes('90-ngay-kham-pha-tan-uoc'), 'Kế hoạch 2: 90 ngày Tân Ước');
assert(readingPlans.includes('30-ngay-dong-hanh-voi-4-phuc-am'), 'Kế hoạch 3: 30 ngày 4 Phúc Âm');
assert(readingPlans.includes('30-ngay-thanh-vinh-cau-nguyen'), 'Kế hoạch 4: 30 ngày Thánh Vịnh');
assert(readingPlans.includes('14-ngay-cung-co-duc-tin-va-hy-vong'), 'Kế hoạch 5: Theo chủ đề Đức Tin');
assert(readingPlans.includes('40-ngay-mua-chay-thap-gia-phuc-sinh'), 'Kế hoạch 6: Theo Mùa Phụng Vụ (Mùa Chay)');
assert(readingPlanPage.includes('objective') && readingPlanPage.includes('suggestion'), 'Hiển thị Mục tiêu và Gợi ý thực hành mỗi ngày');
assert(readingPlanPage.includes('handleToggleDay'), 'Có tính năng đánh dấu hoàn thành');
assert(readingPlanPage.includes('percentCompleted'), 'Hiển thị tiến độ hoàn thành');
assert(readingPlanPage.includes('Vị trí đọc tiếp theo') || readingPlanPage.includes('Tiếp tục Ngày'), 'Có nút tiếp tục từ vị trí đã đọc');

// 5. Kiểm tra Nhật ký thiêng liêng
console.log('\n5. Nhật Ký Thiêng Liêng (ca-nhan/page.tsx):');
const personalPage = fs.readFileSync(path.join(__dirname, '../src/app/ca-nhan/page.tsx'), 'utf8');

assert(personalPage.includes('jr.scriptureQuote'), 'Lưu câu Lời Chúa tâm đắc');
assert(personalPage.includes('jr.touchedByWord'), 'Lưu điều đánh động tâm hồn');
assert(personalPage.includes('jr.dailyResolution'), 'Lưu quyết tâm sống');
assert(personalPage.includes('jr.personalPrayer'), 'Lưu lời cầu nguyện');
assert(personalPage.includes('Bảo Mật Quyền Riêng Tư Tuyệt Đối'), 'Cam kết bảo mật 100% offline, không gửi cho AI huấn luyện');

// 6. Kiểm tra Công cụ thiết kế ảnh câu Lời Chúa
console.log('\n6. Công Cụ Thiết Kế Ảnh Lời Chúa (tao-anh/page.tsx):');
const imageMakerPage = fs.readFileSync(path.join(__dirname, '../src/app/tao-anh/page.tsx'), 'utf8');

assert(imageMakerPage.includes('canvas.width = width') && imageMakerPage.includes('1080'), 'Xuất ảnh chất lượng cao 1080px');
assert(imageMakerPage.includes('square') && imageMakerPage.includes('portrait'), 'Hỗ trợ cả tỷ lệ Vuông 1:1 và Dọc 9:16');
assert(imageMakerPage.includes('referenceText') && imageMakerPage.includes('quoteText'), 'Hiển thị đầy đủ câu Lời Chúa và địa chỉ Kinh Thánh');

// 7. Kiểm tra Tìm kiếm toàn website
console.log('\n7. Hệ Thống Tìm Kiếm Toàn Diện Đa Nguồn (SearchModal.tsx):');
const searchModal = fs.readFileSync(path.join(__dirname, '../src/components/SearchModal.tsx'), 'utf8');

assert(searchModal.includes('CATHOLIC_BIBLE_BOOKS'), 'Tìm kiếm 73 Sách Kinh Thánh');
assert(searchModal.includes('CATECHISM_DATABASE'), 'Tìm kiếm 2.865 Điều khoản GLHTCG');
assert(searchModal.includes('CHURCH_DOCUMENTS_DATABASE'), 'Tìm kiếm Văn Kiện Hội Thánh');
assert(searchModal.includes('BIBLE_DICTIONARY'), 'Tìm kiếm Từ Điển Thần Học');
assert(searchModal.includes('DAILY_REFLECTIONS_DATABASE'), 'Tìm kiếm Bài Suy Niệm Phụng Vụ');
assert(searchModal.includes('SearchCategoryFilter') || searchModal.includes('activeFilter'), 'Có tabs lọc kết quả theo loại');

console.log('\n================================================================');
console.log(`KẾT QUẢ KIỂM THỬ: ${testsPassed} ĐẠT, ${testsFailed} THẤT BẠI`);
console.log('================================================================\n');

if (testsFailed > 0) {
  process.exit(1);
}
