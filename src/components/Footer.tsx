'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  BookMarked, 
  Compass, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Mail, 
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { SacredCrossIcon, SacredCornerOrnament } from '@/components/SacredIcons';

export function Footer() {
  return (
    <footer 
      aria-label="Chân trang Lời Chúa Mỗi Ngày"
      className="relative bg-gradient-to-b from-[#F7F4EE] via-[#EFEAE0] to-[#E7E0D5] dark:from-[#1A1412] dark:via-[#16100E] dark:to-[#0F0B0A] border-t border-[#E7E0D5] dark:border-[#3E302A] pt-12 pb-24 md:pb-12 text-[#403A34] dark:text-[#F7F4EE] transition-colors"
    >
      <SacredCornerOrnament position="top-left" className="absolute top-3 left-3 text-[#B39A70]/30 hidden sm:block" />
      <SacredCornerOrnament position="top-right" className="absolute top-3 right-3 text-[#B39A70]/30 hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Hàng 1: 4 Cột thông tin chính */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Cột 1: Giới thiệu & Sứ vụ */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#762F3A] text-white flex items-center justify-center font-serif font-bold shadow-xs">
                ☩
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-[#762F3A] dark:text-[#E5BE53]">
                LỜI CHÚA MỖI NGÀY
              </span>
            </div>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] leading-relaxed">
              Nền tảng học hỏi Kinh Thánh, Phụng Vụ và Giáo lý Hội Thánh Công giáo toàn diện. Xây dựng vì tình yêu mến Lời Chúa và thao thức phục vụ cộng đoàn Dân Chúa.
            </p>
            <div className="pt-1 text-[11px] font-serif italic text-[#B39A70] dark:text-[#E5BE53]">
              &ldquo;Lời Chúa là ngọn đèn soi cho con bước, là ánh sáng chỉ đường con đi.&rdquo; (Tv 119,105)
            </div>
          </div>

          {/* Cột 2: Kinh Thánh & Phụng Vụ */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#762F3A] dark:text-[#E5BE53] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kinh Thánh & Phụng Vụ</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#736B63] dark:text-[#D7CCC8]">
              <li>
                <Link href="/kinh-thanh" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition flex items-center gap-1.5">
                  <span>Trọn bộ 73 Sách Thánh</span>
                </Link>
              </li>
              <li>
                <Link href="/kinh-thanh/sang-the" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Cựu Ước (46 Sách)
                </Link>
              </li>
              <li>
                <Link href="/kinh-thanh/mat-theu" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Tân Ước (27 Sách)
                </Link>
              </li>
              <li>
                <Link href="/phung-vu" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Lịch Phụng Vụ &amp; Bài Đọc Hôm Nay
                </Link>
              </li>
              <li>
                <Link href="/suy-niem" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Suy Niệm Lời Chúa Hằng Ngày
                </Link>
              </li>
              <li>
                <Link href="/kinh-nguyen" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Kho Kinh Nguyện Công Giáo
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Giáo Lý & Thần Học */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#762F3A] dark:text-[#E5BE53] flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Giáo Lý &amp; Học Hỏi</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#736B63] dark:text-[#D7CCC8]">
              <li>
                <Link href="/giao-ly" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Sách Giáo Lý Hội Thánh (2.865 Điều)
                </Link>
              </li>
              <li>
                <Link href="/nghien-cuu" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Nghiên Cứu Thần Học Chuyên Sâu
                </Link>
              </li>
              <li>
                <Link href="/tro-ly-ai" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Trợ Lý Học Hỏi Kinh Thánh Công Giáo
                </Link>
              </li>
              <li>
                <Link href="/ke-hoach-doc" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Kế Hoạch Đọc Kinh Thánh 365 Ngày
                </Link>
              </li>
              <li>
                <Link href="/tao-anh" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition">
                  Thiết Kế Ảnh Lời Chúa (1080px)
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Tác Giả & Kết Nối */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#762F3A] dark:text-[#E5BE53] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              <span>Người Sáng Lập &amp; Liên Hệ</span>
            </h3>
            <div className="text-xs text-[#736B63] dark:text-[#D7CCC8] space-y-2">
              <p>
                <strong>Lucas Nguyen</strong> &ndash; Người sáng lập &amp; Phát triển dự án Lời Chúa Mỗi Ngày.
              </p>
              <div className="space-y-1 pt-1">
                <a
                  href="mailto:anhtuan.employ202@gmail.com"
                  className="inline-flex items-center gap-1.5 hover:text-[#762F3A] dark:hover:text-[#E5BE53] transition break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B39A70]" />
                  <span>anhtuan.employ202@gmail.com</span>
                </a>
                <div className="flex items-center gap-1.5 text-[#736B63] dark:text-[#A1887F]">
                  <Phone className="w-3.5 h-3.5 text-[#B39A70]" />
                  <span>0368727316</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/gioi-thieu"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#762F3A] dark:text-[#E5BE53] hover:underline"
                >
                  <span>Xem trang giới thiệu đầy đủ</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Hàng 2: Khung tuyên ngôn Huấn Quyền & Bản quyền minh bạch */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#241C18]/70 border border-[#E7E0D5] dark:border-[#3E302A] text-xs text-[#736B63] dark:text-[#D7CCC8] space-y-2 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-[#762F3A] dark:text-[#E5BE53]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Tôn Trọng Quyền Bính Huấn Quyền &amp; Bản Quyền Tác Giả</span>
          </div>
          <p className="text-[11px]">
            Bản quyền kiến trúc phần mềm và giao diện thuộc về tác giả <strong>Lucas Nguyen</strong>. Bản văn Lời Chúa, Phụng vụ Thánh lễ và Sách Giáo lý Hội Thánh Công giáo thuộc thẩm quyền thiêng liêng của Tòa Thánh Vatican và Hội đồng Giám mục Việt Nam (HĐGMVN), được tôn kính trích dẫn nhằm mục đích phục vụ cộng đoàn Dân Chúa, phi thương mại.
          </p>
        </div>

        {/* Hàng 3: Copyright và Bottom credits */}
        <div className="pt-4 border-t border-[#E7E0D5] dark:border-[#3E302A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8F877F] dark:text-[#A1887F]">
          <div>
            &copy; {new Date().getFullYear()} Lời Chúa Mỗi Ngày. Bản quyền thuộc về Lucas Nguyen.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/gioi-thieu" className="hover:underline">Về Tác Giả</Link>
            <span>&bull;</span>
            <Link href="/ca-nhan" className="hover:underline">Bảo Mật 100% Offline</Link>
            <span>&bull;</span>
            <span className="font-serif italic text-[#B39A70]">Ad Maiorem Dei Gloriam</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
