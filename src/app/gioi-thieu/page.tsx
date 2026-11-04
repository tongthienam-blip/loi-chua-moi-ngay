'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Heart, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Send,
  ExternalLink,
  Code2,
  Calendar,
  Layers
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
        
        {/* Header Breadcrumb */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Về Dự Án & Tác Giả Sáng Lập
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1E18]">
            Lời Chúa Mỗi Ngày
          </h1>
          <p className="text-sm sm:text-base text-[#6D5D55] max-w-2xl mx-auto leading-relaxed">
            Nền tảng Kinh Thánh Công giáo toàn diện &ndash; Đọc, suy niệm, nghiên cứu thần học và sống Lời Chúa theo truyền thống Tông Truyền của Hội Thánh Công Giáo.
          </p>
        </div>

        {/* Developer Card - Lucas Nguyen */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFC8] shadow-sacred-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#8B1E2D]/10 to-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#E8DFC8]">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#8B1E2D] to-[#701124] text-white flex items-center justify-center font-serif text-4xl font-bold shadow-lg shrink-0">
              ☩
            </div>
            
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1E18]">
                  Lucas Nguyen
                </h2>
                <span className="px-3 py-1 rounded-full bg-[#855D14]/10 text-[#855D14] text-xs font-bold">
                  Tác Giả & Nhà Phát Triển
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
                Kỹ sư kiến trúc phần mềm, nhà nghiên cứu thần học Công giáo. Dự án được ấp ủ và phát triển với tâm tình phụng sự cộng đoàn Dân Chúa, mang Lời Chúa đến gần gũi với mọi Kitô hữu và người tìm hiểu đức tin.
              </p>

              {/* Contact Pills */}
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href="mailto:anhtuan.employ202@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#8B1E2D] text-[#5D4037] hover:text-white border border-[#E8DFC8] text-xs font-semibold transition"
                >
                  <Mail className="w-4 h-4 text-[#8B1E2D] group-hover:text-white" />
                  <span>anhtuan.employ202@gmail.com</span>
                </a>

                <a
                  href="tel:0368727316"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#8B1E2D] text-[#5D4037] hover:text-white border border-[#E8DFC8] text-xs font-semibold transition"
                >
                  <Phone className="w-4 h-4 text-[#855D14]" />
                  <span>0368727316</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Tuyên Bố Bản Quyền & Điều Khoản Sử Dụng</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#8B1E2D]/5 border border-[#8B1E2D]/20 text-xs sm:text-sm text-[#3E2723] leading-relaxed">
              <strong className="text-[#8B1E2D]">Bản quyền thuộc về Lucas Nguyen - Vui lòng không reup dưới mọi hình thức.</strong>
              <p className="mt-1 text-xs text-[#6D5D55]">
                Toàn bộ mã nguồn, cấu trúc dữ liệu chú giải, giải thuật đối chiếu và giao diện ứng dụng được phát triển độc quyền bởi tác giả. Ứng dụng hoan nghênh chia sẻ phi thương mại nhằm mục đích loan báo Tin Mừng, học hỏi Kinh Thánh và cầu nguyện.
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars of the Platform */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2D1E18]">
              73 Sách Thánh Chuẩn Mực
            </h3>
            <p className="text-xs text-[#5D4037] leading-relaxed">
              Đầy đủ 46 sách Cựu Ước (gồm 7 sách Thứ Kinh) và 27 sách Tân Ước theo quy chuẩn Giáo Hội Công Giáo toàn cầu.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#C59B27]/10 text-[#855D14] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2D1E18]">
              GLHTCG & Văn Kiện
            </h3>
            <p className="text-xs text-[#5D4037] leading-relaxed">
              Tích hợp 2.865 điều khoản Giáo lý Hội Thánh và hệ thống văn kiện Vatican II, Dei Verbum, Thông điệp Giáo hoàng.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#2D1E18]">
              Công Nghệ Hiện Đại
            </h3>
            <p className="text-xs text-[#5D4037] leading-relaxed">
              Next.js 14, PWA hoạt động Offline, giọng đọc Audio chuẩn tiếng Việt và công cụ tạo ảnh Lời Chúa độ nét cao.
            </p>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/kinh-thanh"
            className="px-6 py-3 rounded-2xl bg-[#8B1E2D] hover:bg-[#701124] text-white font-bold text-sm shadow-md transition"
          >
            Bắt Đầu Đọc Kinh Thánh
          </Link>
          <Link
            href="/giao-ly"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-[#E8DFC8] text-[#2D1E18] font-bold text-sm shadow-sm transition"
          >
            Tra Cứu Giáo Lý (GLHTCG)
          </Link>
          <Link
            href="/ca-nhan"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-[#E8DFC8] text-[#2D1E18] font-bold text-sm shadow-sm transition"
          >
            Góc Cá Nhân & Đồng Bộ
          </Link>
        </div>

      </div>
    </div>
  );
}
