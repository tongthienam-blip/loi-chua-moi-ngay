'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Calendar, 
  BookMarked,
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SacredCornerOrnament } from '@/components/SacredIcons';

export interface SlideItem {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  btnText: string;
  btnHref: string;
  imageUrl: string;
  imageAlt: string;
  icon: React.ReactNode;
}

export const HERO_SLIDES: SlideItem[] = [
  // SLIDE 0 - SLIDE MASTER TỔNG HỢP
  {
    id: 0,
    tag: 'NỀN TẢNG KINH THÁNH & PHỤNG VỤ CÔNG GIÁO',
    title: 'LỜI CHÚA MỖI NGÀY',
    subtitle: 'Một không gian đọc, suy niệm và khám phá kho tàng đức tin Công giáo.',
    btnText: 'KHÁM PHÁ KINH THÁNH',
    btnHref: '/kinh-thanh/mat-theu',
    imageUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=85&w=1800&auto=format&fit=crop',
    imageAlt: 'Ánh sáng thiên đình chiếu qua cửa kính màu thánh đường cổ kính',
    icon: <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5BE53]" />
  },
  // SLIDE 1 CHUYÊN BỆT - KHÁM PHÁ KINH THÁNH
  {
    id: 1,
    tag: 'KHÁM PHÁ KINH THÁNH',
    title: 'TRỌN BỘ 73 SÁCH KINH THÁNH',
    subtitle: 'Hệ thống toàn văn Cựu Ước & Tân Ước tiếng Việt chuẩn Công Giáo.',
    btnText: 'ĐỌC KINH THÁNH →',
    btnHref: '/kinh-thanh/mat-theu',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=85&w=1800&auto=format&fit=crop',
    imageAlt: 'Quyển Kinh Thánh mở rộng dưới ánh nến ấm áp và trang nghiêm',
    icon: <BookOpen className="w-4 h-4 text-[#E5BE53]" />
  },
  // SLIDE 2 CHUYÊN BỆT - PHỤNG VỤ HÔM NAY
  {
    id: 2,
    tag: 'PHỤNG VỤ HÔM NAY',
    title: 'LỊCH PHỤNG VỤ & CÁC BÀI ĐỌC',
    subtitle: 'Theo dõi ngày phụng vụ, bài đọc, câu lạy và màu áo lễ theo quy chế AC.',
    btnText: 'XEM PHỤNG VỤ →',
    btnHref: '#phung-vu',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=85&w=1800&auto=format&fit=crop',
    imageAlt: 'Nội thất nhà thờ Công Giáo với ánh nến lung linh huyền diệu',
    icon: <Calendar className="w-4 h-4 text-[#E5BE53]" />
  },
  // SLIDE 3 CHUYÊN BỆT - GIÁO LÝ HỘI THÁNH
  {
    id: 3,
    tag: 'GIÁO LÝ HỘI THÁNH',
    title: 'GIÁO LÝ HỘI THÁNH CÔNG GIÁO',
    subtitle: 'Đào sâu nền tảng đức tin qua 2.865 điều khoản chuẩn mực.',
    btnText: 'KHÁM PHÁ GIÁO LÝ →',
    btnHref: '/giao-ly',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=85&w=1800&auto=format&fit=crop',
    imageAlt: 'Thư viện thần học cổ điển và các cuốn sách thánh uyên bác',
    icon: <BookMarked className="w-4 h-4 text-[#E5BE53]" />
  },
  // SLIDE 4 CHUYÊN BỆT - VĂN KIỆN CÔNG GIÁO
  {
    id: 4,
    tag: 'VĂN KIỆN CÔNG GIÁO',
    title: 'VĂN KIỆN & THÔNG ĐIỆP TÒA THÁNH',
    subtitle: 'Tra cứu các văn kiện Công đồng, Thông điệp và Tông huấn chính thức.',
    btnText: 'TRA CỨU VĂN KIỆN →',
    btnHref: '/van-kien',
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=85&w=1800&auto=format&fit=crop',
    imageAlt: 'Kiến trúc thánh đường Vatican và Roma cổ kính',
    icon: <FileText className="w-4 h-4 text-[#E5BE53]" />
  }
];

// 4 Nút điều hướng chính trên Slide 0 (Slide Master)
const MASTER_NAV_BUTTONS = [
  {
    id: 'bible',
    title: 'KHÁM PHÁ KINH THÁNH',
    href: '/kinh-thanh/mat-theu',
    isPrimary: true,
    icon: <BookOpen className="w-3.5 h-3.5 text-[#E5BE53]" />
  },
  {
    id: 'liturgy',
    title: 'PHỤNG VỤ HÔM NAY',
    href: '#phung-vu',
    isPrimary: false,
    icon: <Calendar className="w-3.5 h-3.5 text-[#E5BE53]" />
  },
  {
    id: 'catechism',
    title: 'GIÁO LÝ HỘI THÁNH',
    href: '/giao-ly',
    isPrimary: false,
    icon: <BookMarked className="w-3.5 h-3.5 text-[#E5BE53]" />
  },
  {
    id: 'documents',
    title: 'VĂN KIỆN CÔNG GIÁO',
    href: '/van-kien',
    isPrimary: false,
    icon: <FileText className="w-3.5 h-3.5 text-[#E5BE53]" />
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  // Preload toàn bộ ảnh để tránh delay hoặc đen khung hình
  useEffect(() => {
    if (typeof window === 'undefined') return;
    HERO_SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.imageUrl;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay mỗi 6 giây, tạm dừng khi hover chuột
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe chuyển slide mượt mà trên Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchEndX.current - touchStartX.current;
    // Ngưỡng vuốt tối thiểu 40px
    if (deltaX > 40) {
      prevSlide();
    } else if (deltaX < -40) {
      nextSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentItem = HERO_SLIDES[currentSlide];

  return (
    <section 
      aria-label="Khám phá Lời Chúa Mỗi Ngày"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-[#B39A70]/30 h-[480px] md:h-[520px] flex items-center justify-center text-center px-3 py-4 sm:px-6 md:p-12 transition-all select-none"
    >
      {/* =========================================================================
          1. LỚP HÌNH NỀN TẤT CẢ 5 SLIDES (PRELOADED & OPTIMIZED OVERLAY)
          ========================================================================= */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
          }`}
          aria-hidden={idx !== currentSlide}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.imageAlt}
            fill
            priority={idx === 0 || idx === 1}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className={`object-cover object-center transform transition-transform duration-10000 ease-out ${
              idx === currentSlide ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Lớp phủ Gradient Overlay chuẩn mực đảm bảo độ tương phản cao, chống lóa */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85" />
          <div className="absolute inset-0 bg-[#762F3A]/25 mix-blend-color-burn" />
        </div>
      ))}

      {/* Hoa văn góc trang trí mạ vàng cổ điển */}
      <SacredCornerOrnament position="top-left" className="absolute top-3 left-3 text-[#B39A70]/50 scale-100 sm:scale-110 z-10" />
      <SacredCornerOrnament position="top-right" className="absolute top-3 right-3 text-[#B39A70]/50 scale-100 sm:scale-110 z-10" />
      <SacredCornerOrnament position="bottom-left" className="absolute bottom-3 left-3 text-[#B39A70]/50 scale-100 sm:scale-110 z-10" />
      <SacredCornerOrnament position="bottom-right" className="absolute bottom-3 right-3 text-[#B39A70]/50 scale-100 sm:scale-110 z-10" />

      {/* =========================================================================
          2. TRỤC NỘI DUNG CHỮ CĂN GIỮA 100% (CENTER-ALIGNED AXIS)
          ========================================================================= */}
      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-2.5 sm:space-y-3.5 md:space-y-4">
        
        {/* Biểu tượng Thánh Giá Cứu Độ Tối Giản, Tuyệt Đối Không Lỗi Ký Tự */}
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-b from-[#B39A70]/30 to-[#762F3A]/40 backdrop-blur-md border border-[#B39A70]/60 flex items-center justify-center shadow-lg group hover:scale-105 transition-transform">
            <svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#F7F4EE" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="drop-shadow-sm"
            >
              <path d="M12 2v20M7 8h10" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#B39A70]/20 blur-md animate-pulse pointer-events-none" />
        </div>

        {/* Badge phân loại Slide */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#B39A70]/60 text-[#E5BE53] text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-md transition-all">
          <Sparkles className="w-3 h-3 text-[#E5BE53] shrink-0" />
          <span className="truncate max-w-[280px] sm:max-w-none">{currentItem.tag}</span>
          <Sparkles className="w-3 h-3 text-[#E5BE53] shrink-0" />
        </div>

        {/* Tiêu đề lớn Serif trang nghiêm */}
        <h1 className="font-serif text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F7F4EE] leading-tight drop-shadow-md max-w-2xl px-2">
          {currentItem.title}
        </h1>

        {/* Họa tiết phân cách Thánh Thiêng */}
        <div className="w-24 sm:w-36 h-px bg-gradient-to-r from-transparent via-[#B39A70] to-transparent my-0.5" />

        {/* Dòng mô tả căn giữa */}
        <p className="text-xs sm:text-sm md:text-base text-[#F7F4EE]/90 font-light max-w-xl leading-relaxed tracking-wide drop-shadow-xs px-2 line-clamp-2 sm:line-clamp-none">
          {currentItem.subtitle}
        </p>

        {/* =========================================================================
            3. HỆ THỐNG NÚT BẤM ĐIỀU HƯỚNG
            - SLIDE 0: ĐẦY ĐỦ 4 NÚT HÀNH ĐỘNG (GRID 2x2 MOBILE / FLEX ROW DESKTOP)
            - SLIDE 1->4: DUY NHẤT 1 NÚT HÀNH ĐỘNG CĂN GIỮA CHÍNH XÁC
            ========================================================================= */}
        {currentItem.id === 0 ? (
          // SLIDE 0 MASTER: 4 NÚT HÀNH ĐỘNG ĐẠI DIỆN 4 CHUYÊN MỤC
          <div className="pt-2 sm:pt-3 w-full max-w-sm sm:max-w-xl md:max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-center gap-2 sm:gap-2.5">
              {MASTER_NAV_BUTTONS.map((btn) => {
                const isAnchor = btn.href.startsWith('#');
                const btnClasses = `w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 ${
                  btn.isPrimary 
                    ? 'bg-[#762F3A] hover:bg-[#5E252E] text-white border border-[#B39A70] hover:shadow-lg' 
                    : 'bg-black/55 hover:bg-black/75 text-[#F7F4EE] border border-[#B39A70]/70 backdrop-blur-md hover:border-[#E5BE53]'
                }`;

                return isAnchor ? (
                  <a
                    key={btn.id}
                    href={btn.href}
                    onClick={(e) => handleSmoothScroll(e, btn.href.replace('#', ''))}
                    className={btnClasses}
                  >
                    {btn.icon}
                    <span className="truncate">{btn.title}</span>
                  </a>
                ) : (
                  <Link
                    key={btn.id}
                    href={btn.href}
                    className={btnClasses}
                  >
                    {btn.icon}
                    <span className="truncate">{btn.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          // SLIDE 1 -> 4 CHUYÊN BỆT: DUY NHẤT 1 NÚT HÀNH ĐỘNG CĂN GIỮA
          <div className="pt-2 sm:pt-3 flex items-center justify-center w-full max-w-md mx-auto">
            {currentItem.btnHref.startsWith('#') ? (
              <a
                href={currentItem.btnHref}
                onClick={(e) => handleSmoothScroll(e, currentItem.btnHref.replace('#', ''))}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-[#762F3A] hover:bg-[#5E252E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#B39A70] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                {currentItem.icon}
                <span>{currentItem.btnText}</span>
              </a>
            ) : (
              <Link
                href={currentItem.btnHref}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-[#762F3A] hover:bg-[#5E252E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#B39A70] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                {currentItem.icon}
                <span>{currentItem.btnText}</span>
              </Link>
            )}
          </div>
        )}

      </div>

      {/* =========================================================================
          4. NÚT ĐIỀU HƯỚNG TRÁI / PHẢI: ẨN TRÊN MOBILE (HIDDEN MD:FLEX), HIỂN THỊ TRÊN DESKTOP
          ========================================================================= */}
      <button
        onClick={prevSlide}
        aria-label="Slide trước đó"
        className="hidden md:flex absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#762F3A] text-white/90 hover:text-white border border-[#B39A70]/40 backdrop-blur-md items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide tiếp theo"
        className="hidden md:flex absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#762F3A] text-white/90 hover:text-white border border-[#B39A70]/40 backdrop-blur-md items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* =========================================================================
          5. THANH ĐIỀU HƯỚNG CHẤM PHÂN TRANG (DOTS INDICATOR)
          ========================================================================= */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Chuyển đến Slide ${slide.id}: ${slide.title}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? 'w-7 sm:w-9 h-1.5 sm:h-2 bg-[#B39A70] shadow-md ring-2 ring-[#B39A70]/40'
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
