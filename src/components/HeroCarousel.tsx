'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Calendar, 
  Heart, 
  ArrowRight,
  Sparkles,
  Flame
} from 'lucide-react';
import { 
  SacredCrossIcon, 
  HolySpiritDoveIcon, 
  LiturgicalHaloIcon,
  EucharisticWheatGrapesIcon,
  SacredCornerOrnament
} from '@/components/SacredIcons';

interface SlideItem {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  btnText: string;
  btnHref: string;
  icon: React.ReactNode;
  bgGradient: string;
  decorElement: React.ReactNode;
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    tag: 'KHO TÀNG ĐỨC TIN CÔNG GIÁO',
    title: 'LỜI CHÚA MỖI NGÀY',
    subtitle: 'Khám phá trọn bộ 73 Sách Kinh Thánh Công Giáo (46 Cựu Ước & 27 Tân Ước) với bản dịch chuẩn mực, chú giải thần học và suy niệm chuyên sâu.',
    btnText: 'ĐỌC NGAY →',
    btnHref: '/kinh-thanh/mat-theu',
    icon: <BookOpen className="w-5 h-5" />,
    bgGradient: 'from-[#762F3A] via-[#5C232C] to-[#3D141A]',
    decorElement: (
      <div className="absolute -right-6 -bottom-8 opacity-15 pointer-events-none select-none">
        <SacredCrossIcon size={260} className="text-[#B39A70]" />
      </div>
    )
  },
  {
    id: 2,
    tag: 'NHỊP SỐNG HỘI THÁNH TOÀN CẦU',
    title: 'PHỤNG VỤ & CÁC BÀI ĐỌC',
    subtitle: 'Theo dõi Lịch Phụng Vụ, màu áo lễ và bài đọc hàng ngày. Đồng hành trọn vẹn trong hy tế Thánh Lễ cùng Hội Thánh.',
    btnText: 'XEM PHỤNG VỤ',
    btnHref: '#phung-vu',
    icon: <Calendar className="w-5 h-5" />,
    bgGradient: 'from-[#6E4E23] via-[#523A17] to-[#2E200C]',
    decorElement: (
      <div className="absolute -right-6 -bottom-6 opacity-20 pointer-events-none select-none">
        <EucharisticWheatGrapesIcon size={250} className="text-[#E5BE53]" />
      </div>
    )
  },
  {
    id: 3,
    tag: 'CẦU NGUYỆN & LECTIO DIVINA',
    title: 'SUY NIỆM & LINH ĐẠO',
    subtitle: 'Nuôi dưỡng đời sống tâm linh qua từng câu Kinh Thánh, gợi ý thực hành đức tin và nhật ký thiêng liêng mỗi ngày.',
    btnText: 'KÍNH XEM',
    btnHref: '#suy-niem',
    icon: <Heart className="w-5 h-5" />,
    bgGradient: 'from-[#4D242D] via-[#38161D] to-[#200B10]',
    decorElement: (
      <div className="absolute -right-4 -bottom-6 opacity-20 pointer-events-none select-none">
        <HolySpiritDoveIcon size={250} className="text-[#F7F4EE]" />
      </div>
    )
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay mỗi 5 giây (pause khi hover chuột hoặc touch)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch gesture handler
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-3xl shadow-xl transition-all select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Banner nổi bật Lời Chúa Mỗi Ngày"
    >
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`min-w-full relative overflow-hidden bg-gradient-to-r ${slide.bgGradient} text-white px-6 sm:px-10 md:px-14 py-8 sm:py-12 md:py-14 min-h-[260px] sm:min-h-[290px] md:min-h-[320px] flex flex-col justify-between`}
            aria-hidden={currentSlide !== index}
          >
            {/* Họa tiết hoa văn góc Công giáo */}
            <SacredCornerOrnament position="top-left" className="absolute top-2.5 left-2.5 text-[#B39A70]/30" />
            <SacredCornerOrnament position="bottom-right" className="absolute bottom-2.5 right-2.5 text-[#B39A70]/30" />

            {/* Hào quang nền radial */}
            <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-radial-gradient from-[#B39A70]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

            {/* Hình khối trang trí phía sau (Cross, Dove, Chalice) */}
            {slide.decorElement}

            {/* Nội dung chính của Slide */}
            <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
              {/* Badge thể loại */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-[#B39A70]/25 text-[#F7F4EE] border border-[#B39A70]/40 shadow-xs backdrop-blur-xs">
                <LiturgicalHaloIcon size={12} className="text-[#E5BE53]" />
                <span>{slide.tag}</span>
              </div>

              {/* Tiêu đề chính */}
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F7F4EE] leading-tight drop-shadow-xs">
                {slide.title}
              </h2>

              {/* Phụ đề */}
              <p className="text-xs sm:text-sm md:text-base text-[#F7F4EE]/85 font-light leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-3">
                {slide.subtitle}
              </p>

              {/* Nút hành động CTA */}
              <div className="pt-2 sm:pt-3">
                <Link
                  href={slide.btnHref}
                  onClick={(e) => handleSmoothScroll(e, slide.btnHref)}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#B39A70] to-[#C59B27] hover:from-[#C59B27] hover:to-[#B39A70] text-[#241C18] font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#F7F4EE]/40"
                >
                  <span>{slide.btnText}</span>
                </Link>
              </div>
            </div>

            {/* Footer nhỏ của slide */}
            <div className="relative z-10 pt-2 text-[10px] sm:text-xs text-[#B39A70]/80 font-serif italic">
              Nền tảng Lời Chúa &amp; Huấn Quyền Hội Thánh Công Giáo
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng Trái / Phải */}
      <button
        onClick={prevSlide}
        aria-label="Slide trước"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/55 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 active:scale-95 shadow-md"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide kế tiếp"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/55 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 active:scale-95 shadow-md"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Chấm phân trang (Dots Indicator) */}
      <div 
        className="absolute bottom-3 sm:bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Chọn slide"
      >
        {SLIDES.map((_, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Chuyển tới slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B39A70] ${
                isActive 
                  ? 'w-7 sm:w-8 bg-[#E5BE53] shadow-md' 
                  : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HeroCarousel;
