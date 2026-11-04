# CẨM NANG TRIỂN KHAI THỰC TẾ (PRODUCTION DEPLOYMENT GUIDE)
## Nền Tảng Kinh Thánh Công Giáo Toàn Diện - LỜI CHÚA MỖI NGÀY (Giai Đoạn 8)

Tài liệu này cung cấp hướng dẫn đầy đủ để đưa ứng dụng lên các môi trường production thực tế: Vercel, Supabase Cloud hoặc máy chủ riêng (VPS/Docker).

---

### 1. KIẾN TRÚC KỸ THUẬT & YÊU CẦU HỆ THỐNG
* **Framework:** Next.js 14+ (App Router), TypeScript 5+, Tailwind CSS 3.4+.
* **Runtime:** Node.js 20 LTS (hoặc Docker Engine 24+).
* **Cơ sở dữ liệu:** PostgreSQL 15+ / Supabase (hỗ trợ pg_trgm & uuid-ossp).
* **Bảo mật:** Row Level Security (RLS), Role-Based Access Control (RBAC), HttpOnly Cookies, Server-Side API Security (không để lộ API key phía client).

---

### 2. PHƯƠNG ÁN 1: TRIỂN KHAI TRÊN VERCEL & SUPABASE (KHUYẾN NGHỊ)

#### Bước 1: Khởi tạo Cơ Sở Dữ Liệu trên Supabase
1. Đăng nhập [Supabase Dashboard](https://supabase.com).
2. Tạo dự án mới: `catholic-bible-platform`.
3. Vào mục **SQL Editor**, mở tệp `supabase/schema.sql` trong dự án và bấm **Run**.
   * Hệ thống sẽ tự động khởi tạo 20+ bảng dữ liệu (73 sách, lịch phụng vụ, bài đọc hằng ngày, GLHTCG, văn kiện, RBAC, audit logs và chính sách RLS).
4. Lấy thông tin kết nối tại **Project Settings** ➔ **API**:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `SUPABASE_SERVICE_ROLE_KEY`

#### Bước 2: Triển khai trên Vercel
1. Đẩy mã nguồn dự án lên GitHub / GitLab.
2. Đăng nhập [Vercel Dashboard](https://vercel.com) ➔ Bấm **Add New** ➔ **Project**.
3. Chọn kho mã nguồn `KINH THANH`.
4. Cấu hình các biến môi trường (Environment Variables) theo tệp `.env.example`:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `SUPABASE_SERVICE_ROLE_KEY`
   * `JWT_SECRET`
   * `GEMINI_API_KEY` (hoặc OpenAI API Key)
5. Bấm **Deploy**. Sau 2-3 phút, hệ thống sẽ online toàn cầu với mạng CDN tốc độ cao.

---

### 3. PHƯƠNG ÁN 2: TRIỂN KHAI TỰ MÁY CHỦ BẰNG DOCKER (SELF-HOSTED VPS)

1. Sao chép toàn bộ dự án lên VPS Ubuntu / Debian:
   ```bash
   git clone <repo-url> /opt/loi-chua-moi-ngay
   cd /opt/loi-chua-moi-ngay
   ```
2. Thiết lập biến môi trường:
   ```bash
   cp .env.example .env
   nano .env
   ```
3. Khởi chạy toàn bộ hệ thống bằng Docker Compose:
   ```bash
   docker compose up -d --build
   ```
4. Kiểm tra trạng thái container:
   ```bash
   docker compose ps
   ```
   * Ứng dụng Web chạy tại: `http://localhost:3000`
   * PostgreSQL chạy tại cổng: `5432`

---

### 4. QUY TRÌNH KIỂM THỬ TỰ ĐỘNG TRƯỚC KHI XUẤT XƯỞNG
Trước khi đưa vào phục vụ cộng đoàn, luôn chạy bộ kịch bản kiểm thử toàn vẹn thần học và bảo mật:
```bash
npx ts-node --transpile-only scripts/verify-integrity.ts
```
Bộ kiểm thử sẽ thẩm định:
* Đầy đủ 73 sách Kinh Thánh (46 Cựu Ước gồm 7 sách Đệ Nhị Quy Điển + 27 Tân Ước).
* Đủ 10 tiêu chí phân tích thần học chuyên sâu cho từng sách.
* Cấu trúc bài đọc phụng vụ và Lời Chúa Tin Mừng.
* Tính hợp lệ của số điều khoản GLHTCG (1 - 2865).
* Cấu trúc chuẩn 8 phần của mọi bài suy niệm.
* Hệ thống ma trận phân quyền RBAC và phòng chống mã độc XSS.
