# CẨM NANG VẬN HÀNH DÀNH CHO QUẢN TRỊ VIÊN & BIÊN TẬP VIÊN
## Nền Tảng Kinh Thánh Công Giáo - LỜI CHÚA MỖI NGÀY

Tài liệu hướng dẫn nghiệp vụ dành cho Tổng Quản Trị (Super Admin), Chuyên gia Thần học (Theologian Editor), Phụng vụ viên (Liturgist) và Kiểm duyệt viên (Content Moderator).

---

### I. NGUYÊN TẮC BẤT DI BẤT DỊCH
1. **Tuyệt đối không suy đoán bản văn:** Mọi bài đọc phụng vụ phải đối chiếu nguyên văn với bản dịch chính thức của Ủy Ban Phụng Tự trực thuộc Hội Đồng Giám Mục Việt Nam.
2. **Không tự bịa số Giáo Lý Hội Thánh:** Mọi trích dẫn GLHTCG phải được kiểm chứng trong khoảng số chuẩn từ 1 đến 2865.
3. **Tuân thủ cấu trúc 8 phần của bài suy niệm:** Hệ thống sẽ tự động khóa nút lưu nếu bài suy niệm bị thiếu dù chỉ một phần trong 8 phần linh đạo Công giáo.
4. **Mọi thao tác quản trị đều được lưu vết:** Bảng `admin_audit_logs` tự động ghi nhận danh tính, địa chỉ, thời gian và chi tiết sửa đổi để đảm bảo tính minh bạch và an toàn dữ liệu.

---

### II. HƯỚNG DẪN CÁC PHÂN HỆ QUẢN TRỊ

#### 1. Quản Lý Bài Đọc Phụng Vụ (`/admin/phung-vu`)
* Chọn ngày cần nhập hoặc chỉnh sửa trên lịch.
* Thiết lập Mùa Phụng Vụ, Bậc Lễ (Lễ Trọng, Lễ Kính, Lễ Nhớ, Ngày trong tuần), Màu Áo Lễ (Trắng, Đỏ, Tím, Xanh, Hồng) và Chu Kỳ (Năm A/B/C, Năm I/II).
* Nhập chính xác:
  * **Bài Đọc I:** Tọa độ câu, tên sách, chủ đề và toàn văn.
  * **Thánh Vịnh Đáp Ca:** Câu điệp ca đáp lại và các khổ thơ.
  * **Bài Đọc II:** (áp dụng cho các ngày Chúa Nhật và Lễ Trọng).
  * **Phúc Âm:** Tọa độ Tin Mừng, chủ đề và toàn văn Lời Chúa.
* Bấm **Lưu & Xuất Bản Bài Đọc**.

#### 2. Quản Lý Bài Suy Niệm 8 Phần (`/admin/suy-niem`)
Mỗi bài suy niệm phải bao gồm đầy đủ 8 mục:
1. **Lời Chúa:** Câu Kinh Thánh tâm điểm.
2. **Bối cảnh:** Không gian, nhân vật, bối cảnh lịch sử và phụng vụ.
3. **Giải thích:** Ý nghĩa bản văn theo truyền thống đức tin Hội Thánh.
4. **Sứ điệp chính:** Thông điệp cứu độ trung tâm mà Chúa muốn gửi gắm.
5. **Liên hệ đời sống:** Thực tế đời sống người Kitô hữu hôm nay.
6. **Câu hỏi suy gẫm:** Các câu hỏi gợi ý để người đọc tự vấn lương tâm.
7. **Quyết tâm thực hành:** Một hành động sống đức tin cụ thể trong ngày.
8. **Lời nguyện:** Tâm tình cầu xin tha thiết dâng lên Chúa.

#### 3. Bảng Điều Khiển Thẩm Định Nguồn (`/admin/kiem-duyet-nguon`)
* Dành cho Chuyên gia Thần học kiểm tra tính hợp lệ của các số điều khoản Giáo Lý và các tọa độ câu Kinh Thánh trước khi duyệt công khai.
* Bấm **Ký Duyệt Xuất Bản & Lưu Vết** để hoàn tất thẩm định.

#### 4. Xem Nhật Ký Lịch Sử Audit Trail (`/admin/audit-logs`)
* Cho phép Super Admin tra cứu dòng thời gian mọi hành vi thay đổi dữ liệu của các biên tập viên.
