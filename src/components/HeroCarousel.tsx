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
import { 
  SacredCrossIcon, 
  LiturgicalHaloIcon,
  SacredCornerOrnament,
  FloatingSparks 
} from '@/components/SacredIcons';

export interface SlideItem {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  primaryBtnText: string;
  primaryBtnHref: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
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
    primaryBtnText: 'Khám Phá Kinh Thánh',
    primaryBtnHref: '/kinh-thanh',
    secondaryBtnText: 'Phụng Vụ Hôm Nay',
    secondaryBtnHref: '#phung-vu',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-165b4c693a10?q=85&w=2000&auto=format&fit=crop',
    imageAlt: 'Ánh sáng thiên đình chiếu qua cửa kính màu thánh đường cổ kính',
    icon: <BookOpen className="w-4 h-4 text-[#E5BE53]" />
  },
  // SLIDE 1 CHUYÊN BỆT - KHÁM PHÁ KINH THÁNH
  {
    id: 1,
    tag: 'KHÁM PHÁ KINH THÁNH',
    title: 'TRỌN BỘ 73 SÁCH KINH THÁNH',
    subtitle: 'Hệ thống toàn văn Cựu Ước & Tân Ước tiếng Việt chuẩn Công Giáo.',
    primaryBtnText: 'ĐỌC KINH THÁNH →',
    primaryBtnHref: '/kinh-thanh/mat-theu',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=85&w=2000&auto=format&fit=crop',
    imageAlt: 'Quyển Kinh Thánh mở rộng dưới ánh nến ấm áp và trang nghiêm',
    icon: <BookOpen className="w-4 h-4 text-[#E5BE53]" />
  },
  // SLIDE 2 CHUYÊN BỆT - PHỤNG VỤ HÔM NAY
  {
    id: 2,
    tag: 'PHỤNG VỤ HÔM NAY',
    title: 'LỊCH PHỤNG VỤ & CÁC BÀI ĐỌC',
    subtitle: 'Theo dõi ngày phụng vụ, bài đọc, câu lạy và màu áo lễ theo quy chế AC.',
    primaryBtnText: 'XEM LỊCH PHỤNG VỤ →',
    primaryBtnHref: '#phung-vu',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=85&w=2000&auto=format&fit=crop',
    imageAlt: 'Nội thất nhà thờ Công Giáo với ánh nến lung linh huyền diệu',
    icon: <Calendar className="w-4 h-4 text-[#E5BE53]" />
  },
  // SLIDE 3 CHUYÊN BỆT - GIÁO LÝ HỘI THÁNH
  {
    id: 3,
    tag: 'GIÁO LÝ HỘI THÁNH',
    title: 'GIÁO LÝ HỘI THÁNH CÔNG GIÁO',
    subtitle: 'Đào sâu nền tảng đức tin qua 2.865 điều khoản chuẩn mực.',
    primaryBtnText: 'KHÁM PHÁ GIÁO LÝ →',
    primaryBtnHref: '/giao-ly',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=85&w=2000&auto=format&fit=crop',
    imageAlt: 'Thư viện thần học cổ điển và các cuốn sách thánh uyên bác',
    icon: <BookMarked className="w-4 h-4 text-[#E5BE53]" />
  },
  // SLIDE 4 CHUYÊN BỆT - VĂN KIỆN CÔNG GIÁO
  {
    id: 4,
    tag: 'VĂN KIỆN CÔNG GIÁO',
    title: 'VĂN KIỆN & THÔNG ĐIỆP TÒA THÁNH',
    subtitle: 'Tra cứu các văn kiện Công đồng, Thông điệp và Tông huấn chính thức.',
    primaryBtnText: 'TRA CỨU VĂN KIỆN →',
    primaryBtnHref: '/van-kien',
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=85&w=2000&auto=format&fit=crop',
    imageAlt: 'Kiến trúc thánh đường Vatican và Roma cổ kính',
    icon: <FileText className="w-4 h-4 text-[#E5BE53]" />
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  // Hàm preloadImages: tải trước cả 5 ảnh ngay khi vừa load trang để chuyển slide mượt 100%
  useEffect(() => {
    if (typeof window === 'undefined') return;
    HERO_SLIDES.forEach((slide) => {
      const preloadImg = new window.Image();
      preloadImg.src = slide.imageUrl;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay mỗi 6 giây (tự tạm dừng khi người dùng hover chuột hoặc chạm)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Xử lý vuốt màn hình (Swipe gesture) trên di động
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      prevSlide();
    } else if (deltaX < -45) {
      nextSlide();
    }
    touchStartX.current = null;
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
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl border border-[#B39A70]/30 min-h-[460px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center text-center p-6 sm:p-10 md:p-16 transition-all select-none"
    >
      {/* =========================================================================
          1. LỚP HÌNH NỀN TẤT CẢ 5 SLIDES (PRELOADED & NEXT/IMAGE PRIORITY)
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
            priority={true}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className={`object-cover object-center transform transition-transform duration-10000 ease-out ${
              idx === currentSlide ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Lớp phủ Gradient Overlay chuẩn mực đảm bảo độ tương phản chữ */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/35 to-black/85" />
          <div className="absolute inset-0 bg-[#762F3A]/25 mix-blend-color-burn" />
        </div>
      ))}

      {/* =========================================================================
          2. HẠT BỤI SÁNG THÁNH THIÊNG & HOA VĂN MẠ VÀNG 4 GÓC
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-10">
        <FloatingSparks />
      </div>

      <SacredCornerOrnament position="top-left" className="absolute top-4 left-4 text-[#B39A70]/60 scale-125 z-10" />
      <SacredCornerOrnament position="top-right" className="absolute top-4 right-4 text-[#B39A70]/60 scale-125 z-10" />
      <SacredCornerOrnament position="bottom-left" className="absolute bottom-4 left-4 text-[#B39A70]/60 scale-125 z-10" />
      <SacredCornerOrnament position="bottom-right" className="absolute bottom-4 right-4 text-[#B39A70]/60 scale-125 z-10" />

      {/* =========================================================================
          3. TRỤC NỘI DUNG CHỮ CĂN GIỮA 100% (CENTER-ALIGNED AXIS)
          ========================================================================= */}
      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
        
        {/* Biểu tượng Thánh Giá & Hào Quang Trung Tâm */}
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#B39A70]/30 to-[#762F3A]/40 backdrop-blur-md border border-[#B39A70]/50 flex items-center justify-center shadow-lg group hover:scale-105 transition-transform">
            <SacredCrossIcon size={32} className="text-[#F7F4EE] filter drop-shadow-md" />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#B39A70]/20 blur-xl animate-pulse pointer-events-none" />
        </div>

        {/* Badge nhỏ phân loại Slide */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#B39A70]/60 text-[#E5BE53] text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-md transition-all">
          <LiturgicalHaloIcon size={13} className="text-[#E5BE53]" />
          <span>{currentItem.tag}</span>
          <LiturgicalHaloIcon size={13} className="text-[#E5BE53]" />
        </div>

        {/* Tiêu đề lớn Serif cổ điển, sang trọng */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F7F4EE] leading-tight drop-shadow-lg max-w-2xl">
          {currentItem.title}
        </h1>

        {/* Họa tiết phân cách Thánh Thiêng */}
        <div className="w-32 sm:w-44 h-px bg-gradient-to-r from-transparent via-[#B39A70] to-transparent my-1" />

        {/* Dòng mô tả căn giữa */}
        <p className="text-sm sm:text-base md:text-lg text-[#F7F4EE]/90 font-light max-w-2xl leading-relaxed tracking-wide drop-shadow-xs px-2">
          {currentItem.subtitle}
        </p>

        {/* Nút hành động trung tâm */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md">
          {/* Nút chính */}
          {currentItem.primaryBtnHref.startsWith('#') ? (
            <a
              href={currentItem.primaryBtnHref}
              onClick={(e) => handleSmoothScroll(e, currentItem.primaryBtnHref.replace('#', ''))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#762F3A] hover:bg-[#5E252E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#B39A70] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              {currentItem.icon}
              <span>{currentItem.primaryBtnText}</span>
            </a>
          ) : (
            <Link
              href={currentItem.primaryBtnHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#762F3A] hover:bg-[#5E252E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#B39A70] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              {currentItem.icon}
              <span>{currentItem.primaryBtnText}</span>
            </Link>
          )}

          {/* Nút phụ (Chỉ hiển thị riêng trên Slide 0 Master) */}
          {currentItem.secondaryBtnText && currentItem.secondaryBtnHref && (
            <a
              href={currentItem.secondaryBtnHref}
              onClick={(e) => handleSmoothScroll(e, currentItem.secondaryBtnHref!.replace('#', ''))}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-[#F7F4EE] font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/40 hover:border-white/70 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#F7F4EE]" />
              <span>{currentItem.secondaryBtnText}</span>
            </a>
          )}
        </div>

      </div>

      {/* =========================================================================
          4. NÚT ĐIỀU HƯỚNG TRÁI / PHẢI (PREV / NEXT CHEVRONS)
          ========================================================================= */}
      <button
        onClick={prevSlide}
        aria-label="Slide trước đó"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#762F3A] text-white/90 hover:text-white border border-[#B39A70]/40 backdrop-blur-md flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide tiếp theo"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#762F3A] text-white/90 hover:text-white border border-[#B39A70]/40 backdrop-blur-md flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* =========================================================================
          5. THANH ĐIỀU HƯỚNG CHẤM PHÂN TRANG (DOTS INDICATOR & PROGRESS)
          ========================================================================= */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20 flex items-center justify-center gap-2.5">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Chuyển đến Slide ${slide.id}: ${slide.title}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-[#B39A70] shadow-md ring-2 ring-[#B39A70]/40'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;
