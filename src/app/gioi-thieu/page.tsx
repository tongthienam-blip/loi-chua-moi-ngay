'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  ShieldCheck, 
  BookOpen, 
  Code2, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { SacredCrossIcon } from '@/components/SacredIcons';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#1A1412] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 animate-fade-in">
        
        {/* Header Breadcrumb */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#762F3A]/10 text-[#762F3A] dark:text-[#E5BE53] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#B39A70]" />
            Về Nền Tảng & Tác Giả Sáng Lập
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#403A34] dark:text-[#F7F4EE]">
            Lời Chúa Mỗi Ngày
          </h1>
          <p className="text-sm sm:text-base text-[#736B63] dark:text-[#A1887F] max-w-2xl mx-auto leading-relaxed">
            Nền tảng Kinh Thánh Công giáo toàn diện &ndash; Đọc, suy niệm, nghiên cứu thần học và sống Lời Chúa theo truyền thống Tông Truyền của Hội Thánh Công Giáo Rôma.
          </p>
        </div>

        {/* Developer Card - Lucas Nguyen */}
        <div className="bg-white dark:bg-[#241C18] rounded-3xl p-6 sm:p-10 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sacred relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-radial-gradient from-[#B39A70]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#E7E0D5] dark:border-[#3E302A]">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#762F3A] to-[#5E252E] text-white flex items-center justify-center font-serif text-3xl sm:text-4xl font-bold shadow-md shrink-0">
              ☩
            </div>
            
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#403A34] dark:text-[#F7F4EE]">
                  Lucas Nguyen
                </h2>
                <span className="px-3 py-1 rounded-full bg-[#B39A70]/15 text-[#B39A70] dark:text-[#E5BE53] text-xs font-bold">
                  Người sáng lập & Phát triển dự án
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#736B63] dark:text-[#D7CCC8] leading-relaxed break-words text-justify sm:text-left">
                Là người sáng lập và phát triển dự án Lời Chúa Mỗi Ngày, tôi mong muốn xây dựng một không gian học hỏi và khám phá kho tàng đức tin Công giáo, nơi mọi người có thể đến gần hơn với Lời Chúa qua việc đọc, suy niệm và nghiên cứu. Với thao thức phục vụ cộng đoàn Dân Chúa, dự án hướng đến việc kết nối Kinh Thánh, Giáo lý và giáo huấn của Hội Thánh trong một nền tảng thống nhất, dễ tiếp cận, có chiều sâu và trung thành với truyền thống đức tin Công giáo.
              </p>

              {/* Contact Pills */}
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href="mailto:anhtuan.employ202@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7F4EE] hover:bg-[#762F3A] text-[#403A34] hover:text-white dark:bg-[#1A1412] dark:hover:bg-[#762F3A] dark:text-[#F7F4EE] border border-[#E7E0D5] dark:border-[#3E302A] text-xs font-semibold transition"
                >
                  <Mail className="w-4 h-4 text-[#762F3A] dark:text-[#E5BE53]" />
                  <span>anhtuan.employ202@gmail.com</span>
                </a>

                <a
                  href="tel:0368727316"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7F4EE] hover:bg-[#762F3A] text-[#403A34] hover:text-white dark:bg-[#1A1412] dark:hover:bg-[#762F3A] dark:text-[#F7F4EE] border border-[#E7E0D5] dark:border-[#3E302A] text-xs font-semibold transition"
                >
                  <Phone className="w-4 h-4 text-[#B39A70] dark:text-[#E5BE53]" />
                  <span>0368727316</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Tuyên Bố Bản Quyền & Tính Minh Bạch Pháp Lý</span>
            </div>
            
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F4EE] dark:bg-[#1A1412] border border-[#E7E0D5] dark:border-[#3E302A] text-xs text-[#736B63] dark:text-[#D7CCC8] space-y-2 leading-relaxed">
              <div>
                <strong className="text-[#762F3A] dark:text-[#E5BE53] block font-bold mb-1">
                  1. Quyền sở hữu mã nguồn & Thiết kế giao diện:
                </strong>
                Bản quyền kiến trúc phần mềm, giải thuật đối chiếu, công cụ tra cứu và giao diện thuộc về tác giả <strong>Lucas Nguyen</strong>. Mọi hình thức sao chép, đóng gói thương mại hoặc reup nguyên bản đều cần có sự đồng thuận từ tác giả.
              </div>
              <div className="pt-2 border-t border-[#E7E0D5]/70 dark:border-[#3E302A]">
                <strong className="text-[#762F3A] dark:text-[#E5BE53] block font-bold mb-1">
                  2. Thẩm quyền về Bản văn Kinh Thánh, Phụng Vụ & Giáo Lý:
                </strong>
                Website <strong>không tuyên bố quyền sở hữu độc quyền</strong> đối với Lời Chúa, Bản dịch Kinh Thánh, Lời nguyện Phụng vụ hay Bản văn Sách Giáo Lý Hội Thánh Công Giáo. Các bản văn này thuộc thẩm quyền Tòa Thánh Vatican và Hội đồng Giám mục Việt Nam (HĐGMVN), được tôn kính trích dẫn với mục đích mục vụ, học hỏi thần học và phục vụ đời sống cầu nguyện phi thương mại.
              </div>
            </div>
          </div>
        </div>

        {/* 3 Trụ Cột Nền Tảng */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#241C18] p-5 rounded-2xl border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#762F3A]/10 text-[#762F3A] dark:text-[#E5BE53] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#403A34] dark:text-[#F7F4EE]">
              73 Sách Thánh Chuẩn Mực
            </h3>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] leading-relaxed">
              Đầy đủ 46 sách Cựu Ước (gồm 7 sách Đệ Nhị Quy Điển) và 27 sách Tân Ước theo quy chuẩn Giáo Hội Công Giáo toàn cầu.
            </p>
          </div>

          <div className="bg-white dark:bg-[#241C18] p-5 rounded-2xl border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#B39A70]/15 text-[#B39A70] dark:text-[#E5BE53] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#403A34] dark:text-[#F7F4EE]">
              GLHTCG & Huấn Quyền
            </h3>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] leading-relaxed">
              Tích hợp 2.865 điều khoản Giáo lý Hội Thánh và hệ thống văn kiện Vatican II, Dei Verbum, Thông điệp Giáo hoàng.
            </p>
          </div>

          <div className="bg-white dark:bg-[#241C18] p-5 rounded-2xl border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#403A34] dark:text-[#F7F4EE]">
              Công Nghệ Hiện Đại
            </h3>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] leading-relaxed">
              Next.js 14, PWA hoạt động Offline, giọng đọc Audio chuẩn tiếng Việt và công cụ tạo ảnh Lời Chúa độ nét cao.
            </p>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/kinh-thanh"
            className="px-6 py-3 rounded-2xl bg-[#762F3A] hover:bg-[#5E252E] text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            Bắt Đầu Đọc Kinh Thánh
          </Link>
          <Link
            href="/giao-ly"
            className="px-6 py-3 rounded-2xl bg-white dark:bg-[#241C18] hover:bg-stone-50 dark:hover:bg-[#2E2420] border border-[#E7E0D5] dark:border-[#3E302A] text-[#403A34] dark:text-[#F7F4EE] font-bold text-xs sm:text-sm shadow-sm transition"
          >
            Tra Cứu Giáo Lý (GLHTCG)
          </Link>
          <Link
            href="/ca-nhan"
            className="px-6 py-3 rounded-2xl bg-white dark:bg-[#241C18] hover:bg-stone-50 dark:hover:bg-[#2E2420] border border-[#E7E0D5] dark:border-[#3E302A] text-[#403A34] dark:text-[#F7F4EE] font-bold text-xs sm:text-sm shadow-sm transition"
          >
            Góc Cá Nhân & Đồng Bộ
          </Link>
        </div>

      </div>
    </div>
  );
}
