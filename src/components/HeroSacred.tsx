'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Sparkles, ChevronDown } from 'lucide-react';
import { 
  SacredCrossIcon, 
  LiturgicalHaloIcon, 
  SacredCornerOrnament,
  SacredOrnamentDivider,
  FloatingSparks
} from '@/components/SacredIcons';

// Danh sách hình nền Thánh Đường & Nghệ Thuật Công Giáo chất lượng cao (tự động luân chuyển nhẹ)
const SACRED_WALLPAPERS = [
  {
    url: 'https://images.unsplash.com/photo-1548625361-165b4c693a10?q=80&w=2000&auto=format&fit=crop',
    alt: 'Ánh sáng thiên đình chiếu rọi qua vòm kính màu Thánh Đường cổ kính'
  },
  {
    url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop',
    alt: 'Cuốn Kinh Thánh mở rộng dưới ánh nến phục vụ trang nghiêm'
  },
  {
    url: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=2000&auto=format&fit=crop',
    alt: 'Bàn thờ Thánh Thể và kiến trúc thánh đường Roma uy nghi'
  }
];

export function HeroSacred() {
  const [bgIndex, setBgIndex] = useState(0);

  // Tự động luân chuyển hình nền nghệ thuật sau 12 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % SACRED_WALLPAPERS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      aria-label="Lời Chúa Mỗi Ngày - Không Gian Tâm Linh Công Giáo"
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl border border-[#B39A70]/30 min-h-[460px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center text-center p-6 sm:p-10 md:p-16 transition-all"
    >
      {/* 1. LỚP HÌNH NỀN NGHỆ THUẬT CÔNG GIÁO (SLOW ZOOM / PARALLAX EFFECT) */}
      {SACRED_WALLPAPERS.map((wp, i) => (
        <div
          key={wp.url}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
            i === bgIndex 
              ? 'opacity-100 scale-105 motion-safe:animate-ken-burns' 
              : 'opacity-0 scale-100 pointer-events-none'
          }`}
          style={{ backgroundImage: `url('${wp.url}')` }}
          aria-hidden={i !== bgIndex}
        />
      ))}

      {/* 2. OVERLAY GRADIENT TỐI / BURGUNDY / IVORY ĐẢM BẢO CHỮ CỰC KỲ DỄ ĐỌC */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#762F3A]/45 to-[#F7F4EE] dark:to-[#1A1412] mix-blend-multiply" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/85" />

      {/* 3. HIỆU ỨNG HẠT BỤI SÁNG / VỆT SÁNG DỊU DÀNG (SACRED FLOATING SPARKS) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <FloatingSparks />
      </div>

      {/* 4. HOA VĂN GÓC CÔNG GIÁO MẠ VÀNG KIM */}
      <SacredCornerOrnament position="top-left" className="absolute top-4 left-4 text-[#B39A70]/60 scale-125" />
      <SacredCornerOrnament position="top-right" className="absolute top-4 right-4 text-[#B39A70]/60 scale-125" />
      <SacredCornerOrnament position="bottom-left" className="absolute bottom-4 left-4 text-[#B39A70]/60 scale-125" />
      <SacredCornerOrnament position="bottom-right" className="absolute bottom-4 right-4 text-[#B39A70]/60 scale-125" />

      {/* 5. TRỤC NỘI DUNG CĂN GIỮA TOÀN BỘ (CENTER-ALIGNED AXIS) */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-5 sm:space-y-6">
        
        {/* Biểu tượng Thánh Giá & Hào Quang Trung Tâm */}
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#B39A70]/30 to-[#762F3A]/40 backdrop-blur-md border border-[#B39A70]/50 flex items-center justify-center shadow-lg group hover:scale-105 transition-transform">
            <SacredCrossIcon size={32} className="text-[#F7F4EE] filter drop-shadow-md" />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#B39A70]/20 blur-xl animate-pulse pointer-events-none" />
        </div>

        {/* Badge nhỏ: NỀN TẢNG KINH THÁNH & PHỤNG VỤ CÔNG GIÁO */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#B39A70]/60 text-[#E5BE53] text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-md">
          <LiturgicalHaloIcon size={13} className="text-[#E5BE53]" />
          <span>NỀN TẢNG KINH THÁNH &amp; PHỤNG VỤ CÔNG GIÁO</span>
          <LiturgicalHaloIcon size={13} className="text-[#E5BE53]" />
        </div>

        {/* Tiêu đề lớn Serif cổ điển, sang trọng */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F7F4EE] leading-tight drop-shadow-lg">
          LỜI CHÚA MỖI NGÀY
        </h1>

        {/* Họa tiết phân cách Thánh Thiêng */}
        <div className="w-32 sm:w-44 h-px bg-gradient-to-r from-transparent via-[#B39A70] to-transparent my-1" />

        {/* Dòng mô tả căn giữa */}
        <p className="text-sm sm:text-base md:text-lg text-[#F7F4EE]/90 font-light max-w-2xl leading-relaxed tracking-wide drop-shadow-xs px-2">
          Một không gian đọc, suy niệm và khám phá kho tàng đức tin Công giáo. Kết nối Lời Chúa, Phụng Vụ và Giáo lý Hội Thánh trong sự trang nghiêm, trung tín và chiều sâu học thuật.
        </p>

        {/* 2 NÚT HÀNH ĐỘNG CĂN GIỮA (CENTER ACTION BUTTONS) */}
        <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md">
          {/* Nút 1: Khám Phá Kinh Thánh (Burgundy Solid + Gold border) */}
          <Link
            href="/kinh-thanh"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#762F3A] hover:bg-[#5E252E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#B39A70] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#E5BE53]" />
            <span>Khám Phá Kinh Thánh</span>
          </Link>

          {/* Nút 2: Phụng Vụ Hôm Nay (Glassmorphism Outline) */}
          <a
            href="#phung-vu"
            onClick={(e) => handleSmoothScroll(e, 'phung-vu')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-[#F7F4EE] font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/40 hover:border-white/70 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4 text-[#F7F4EE]" />
            <span>Phụng Vụ Hôm Nay</span>
          </a>
        </div>

        {/* Mũi tên gợi ý cuộn nhẹ nhàng */}
        <div className="pt-2 sm:pt-4">
          <a
            href="#phung-vu"
            onClick={(e) => handleSmoothScroll(e, 'phung-vu')}
            aria-label="Cuộn xuống nội dung phụng vụ"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all animate-bounce"
          >
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

export default HeroSacred;
