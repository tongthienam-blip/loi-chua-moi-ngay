// ============================================================================
// KIỂM THỬ TỰ ĐỘNG PHẦN 5: PREMIUM CATHOLIC EDITORIAL DESIGN & UI/UX
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

console.log('\n======================================================');
console.log('KIỂM TRA GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG (PHẦN 5)');
console.log('======================================================\n');

// 1. Kiểm tra Bảng màu thương hiệu & Fonts trong tailwind.config.ts
console.log('1. Bảng màu thương hiệu & Fonts (tailwind.config.ts):');
const tailwindContent = fs.readFileSync(path.join(__dirname, '../tailwind.config.ts'), 'utf8');
assert(tailwindContent.includes('#762F3A'), 'Màu Đỏ rượu vang #762F3A được định nghĩa');
assert(tailwindContent.includes('#B39A70'), 'Màu Vàng đồng cổ #B39A70 được định nghĩa');
assert(tailwindContent.includes('#F7F4EE'), 'Màu Kem ngà #F7F4EE được định nghĩa');
assert(tailwindContent.includes('#403A34'), 'Màu Nâu than #403A34 được định nghĩa');
assert(tailwindContent.includes('#E7E0D5'), 'Màu Đá ấm #E7E0D5 được định nghĩa');
assert(tailwindContent.includes('font-serif') || tailwindContent.includes('var(--font-lora)'), 'Font Lora cho tiêu đề được cấu hình');
assert(tailwindContent.includes('var(--font-be-vietnam-pro)'), 'Font Be Vietnam Pro cho nội dung được cấu hình');

// 2. Kiểm tra globals.css không có rule phá hoại font
console.log('\n2. Kiểm tra CSS toàn cục (globals.css):');
const cssContent = fs.readFileSync(path.join(__dirname, '../src/app/globals.css'), 'utf8');
assert(!cssContent.includes('* { font-family: "Be Vietnam Pro" !important; }'), 'Đã gỡ bỏ rule !important đè font serif trên mọi thẻ');
assert(cssContent.includes('.font-serif') && cssContent.includes('font-family: var(--font-lora)'), 'Lớp .font-serif trỏ chính xác về font Lora');
assert(cssContent.includes('env(safe-area-inset-bottom'), 'Hỗ trợ safe-area-inset-bottom cho thiết bị di động có tai thỏ/home bar');

// 3. Kiểm tra Header Desktop & Mobile (Navbar.tsx)
console.log('\n3. Thanh điều hướng Header (Navbar.tsx):');
const navbarContent = fs.readFileSync(path.join(__dirname, '../src/components/Navbar.tsx'), 'utf8');
assert(navbarContent.includes('LỜI CHÚA MỖI NGÀY'), 'Logo & Tên website hiển thị đầy đủ, không bị cắt');
assert(navbarContent.includes('73 Sách'), 'Có mục 73 Sách trên header');
assert(navbarContent.includes('Phụng Vụ'), 'Có mục Phụng Vụ trên header');
assert(navbarContent.includes('Giáo Lý'), 'Có mục Giáo Lý trên header');
assert(navbarContent.includes('Tác Giả'), 'Có mục Tác Giả trên header');
assert(navbarContent.includes('Khám Phá'), 'Có menu dropdown Khám Phá');
assert(navbarContent.includes('SearchModal') || navbarContent.includes('isSearchOpen'), 'Có tính năng tìm kiếm');
assert(navbarContent.includes('cycleTheme'), 'Có nút chuyển đổi chế độ sáng/sepia/tối');

// 4. Kiểm tra Bottom Navigation trên Di Động (BottomNav.tsx)
console.log('\n4. Thanh điều hướng di động 5 tab (BottomNav.tsx):');
const bottomNavContent = fs.readFileSync(path.join(__dirname, '../src/components/BottomNav.tsx'), 'utf8');
assert(bottomNavContent.includes("'/'") && bottomNavContent.includes('Trang Chủ'), 'Tab 1: Trang Chủ');
assert(bottomNavContent.includes("'/kinh-thanh'") && bottomNavContent.includes('Kinh Thánh'), 'Tab 2: Kinh Thánh');
assert(bottomNavContent.includes("'/phung-vu'") && bottomNavContent.includes('Phụng Vụ'), 'Tab 3: Phụng Vụ');
assert(bottomNavContent.includes("'/tro-ly-ai'") && bottomNavContent.includes('Trợ Lý AI'), 'Tab 4: Trợ Lý AI');
assert(bottomNavContent.includes("'/ca-nhan'") && bottomNavContent.includes('Cá Nhân'), 'Tab 5: Cá Nhân');
assert(bottomNavContent.includes('env(safe-area-inset-bottom)'), 'Safe-area padding cho điện thoại');

// 5. Kiểm tra 12 Khối Chức Năng Trang Chủ (page.tsx)
console.log('\n5. Thứ tự chuẩn 12 khối chức năng trên Trang Chủ (page.tsx):');
const homeContent = fs.readFileSync(path.join(__dirname, '../src/app/page.tsx'), 'utf8');

const s1 = homeContent.indexOf('Lời Chúa và Phụng vụ hôm nay');
const s2 = homeContent.indexOf('Câu Lời Chúa hôm nay');
const s3 = homeContent.indexOf('3. Suy Niệm Tin Mừng');
const s4 = homeContent.indexOf('4. Linh Đạo & Quyết Tâm Sống');
const s5 = homeContent.indexOf('5. Tiếp Tục Đọc Kinh Thánh');
const s6 = homeContent.indexOf('6. Khám Phá Thư Viện 73 Sách');
const s7 = homeContent.indexOf('7. Học Giáo Lý Hội Thánh Công Giáo');
const s8 = homeContent.indexOf('8. Học Hỏi & Nghiên Cứu Thần Học');
const s9 = homeContent.indexOf('9. Văn Kiện Hội Thánh');
const s10 = homeContent.indexOf('10. Kế Hoạch Đọc Lời Chúa');
const s11 = homeContent.indexOf('11. Trợ Lý Học Hỏi Công Giáo');
const s12 = homeContent.indexOf('Chân trang và Bản quyền');

assert(s1 !== -1, 'Khối 1: Lời Chúa và Phụng vụ hôm nay hiện diện');
assert(s2 !== -1 && s2 > s1, 'Khối 2: Câu Lời Chúa hôm nay sau Khối 1');
assert(s3 !== -1 && s3 > s2, 'Khối 3: Suy niệm Tin Mừng sau Khối 2');
assert(s4 !== -1 && s4 > s3, 'Khối 4: Linh đạo và thực hành sau Khối 3');
assert(s5 !== -1 && s5 > s4, 'Khối 5: Tiếp tục đọc Kinh Thánh sau Khối 4');
assert(s6 !== -1 && s6 > s5, 'Khối 6: Khám phá 73 sách sau Khối 5');
assert(s7 !== -1 && s7 > s6, 'Khối 7: Học Giáo lý Hội Thánh sau Khối 6');
assert(s8 !== -1 && s8 > s7, 'Khối 8: Học hỏi và nghiên cứu thần học sau Khối 7');
assert(s9 !== -1 && s9 > s8, 'Khối 9: Văn kiện Hội Thánh sau Khối 8');
assert(s10 !== -1 && s10 > s9, 'Khối 10: Kế hoạch đọc Kinh Thánh sau Khối 9');
assert(s11 !== -1 && s11 > s10, 'Khối 11: Trợ lý học hỏi Kinh Thánh sau Khối 10');
assert(s12 !== -1 && s12 > s11, 'Khối 12: Footer sau Khối 11');

// 6. Kiểm tra Tuyên bố Bản Quyền và Tác Giả
console.log('\n6. Minh bạch bản quyền & Tôn trọng thẩm quyền Hội Thánh:');
assert(homeContent.includes('Lucas Nguyen'), 'Tên tác giả Lucas Nguyen được ghi nhận');
assert(homeContent.includes('anhtuan.employ202@gmail.com'), 'Email tác giả minh bạch');
assert(homeContent.includes('0368727316'), 'Số điện thoại tác giả minh bạch');
assert(homeContent.includes('Tòa Thánh Vatican') && homeContent.includes('HĐGMVN'), 'Phân định bản quyền Lời Chúa/GLHTCG thuộc Tòa Thánh và HĐGMVN');

const aboutContent = fs.readFileSync(path.join(__dirname, '../src/app/gioi-thieu/page.tsx'), 'utf8');
assert(aboutContent.includes('không tuyên bố quyền sở hữu độc quyền') || aboutContent.includes('Bản quyền mã nguồn và giao diện'), 'Trang giới thiệu phân định rõ ràng giữa bản quyền code vs bản văn Kinh Thánh');

console.log('\n======================================================');
console.log(`KẾT QUẢ KIỂM THỬ: ${testsPassed} ĐẠT, ${testsFailed} THẤT BẠI`);
console.log('======================================================\n');

if (testsFailed > 0) {
  process.exit(1);
}
