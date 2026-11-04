'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  Compass, 
  Volume2, 
  ArrowRight, 
  Bookmark, 
  Sparkles, 
  Cross, 
  Shield, 
  Image as ImageIcon, 
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { getLiturgicalReadingByDate } from '@/data/liturgical-readings';
import { getReflectionByDate } from '@/data/daily-reflections';
import { CATHOLIC_BIBLE_BOOKS } from '@/data/catholic-books';
import { AudioPlayerBar } from '@/components/AudioPlayerBar';
import { 
  SacredCrossIcon, 
  HolySpiritDoveIcon, 
  EucharisticWheatGrapesIcon, 
  LiturgicalHaloIcon,
  SacredOrnamentDivider,
  SacredCornerOrnament,
  FloatingSparks 
} from '@/components/SacredIcons';
import { BibleStore } from '@/lib/bible-store';
import { UserPersonalData } from '@/types';

export default function HomePage() {
  const [todayReading] = useState(() => getLiturgicalReadingByDate('2026-11-04'));
  const [todayReflection] = useState(() => getReflectionByDate('2026-11-04'));
  const [activeAudioText, setActiveAudioText] = useState<{ title: string; text: string } | null>(null);
  const [userData, setUserData] = useState<UserPersonalData | null>(null);

  useEffect(() => {
    setUserData(BibleStore.getUserData());
  }, []);

  const handleListenGospel = () => {
    setActiveAudioText({
      title: `Tin Mừng: ${todayReading.gospel.reference}`,
      text: `${todayReading.gospel.passage}. ${todayReading.gospel.text}`
    });
  };

  const handleListenReflection = () => {
    setActiveAudioText({
      title: `Suy niệm: ${todayReflection.title}`,
      text: `${todayReflection.coreMessage}. ${todayReflection.lifeApplication}. Lời nguyện: ${todayReflection.prayer}`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 animate-fade-in relative">
      
      {/* 1. Daily Liturgical Banner with Sacred Dove & Liturgical Halo */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAF4E8] via-[#F4EFE6] to-[#EADBCE] border border-[#E8DFC8] p-6 md:p-8 shadow-sacred sacred-gold-hover cascade-1">
        {/* Corner Ornaments */}
        <SacredCornerOrnament position="top-left" className="absolute top-2 left-2 text-[#C59B27]/40" />
        <SacredCornerOrnament position="bottom-right" className="absolute bottom-2 right-2 text-[#C59B27]/40" />

        {/* Ambient Sacred Glow & Radial Pulsing Halo Background */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-72 h-72 rounded-full bg-radial-gradient from-[#C59B27]/25 via-[#FAF4E8]/20 to-transparent blur-3xl pointer-events-none animate-sacred-radiance" />
        <div className="absolute bottom-0 left-1/4 -mb-10 w-52 h-52 rounded-full bg-[#8B1E2D]/12 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Sacred Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#8B1E2D] text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Phụng Vụ Hôm Nay
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#855D14] border border-[#C59B27]/30 shadow-xs">
                <LiturgicalHaloIcon size={14} className="text-[#C59B27]" />
                {todayReading.colorName} &bull; {todayReading.cycle}
              </span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2D1E18] leading-tight">
              {todayReading.title}
            </h1>

            {todayReading.saintOfTheDay && (
              <p className="text-xs md:text-sm text-[#5D4037] leading-relaxed">
                {todayReading.saintOfTheDay}
              </p>
            )}
          </div>

          {/* Right Action Area with Floating Dove Icon */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="hidden lg:block mr-2 animate-sacred-float">
              <HolySpiritDoveIcon size={48} className="text-[#8B1E2D] drop-shadow-md" />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleListenGospel}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-50 text-[#8B1E2D] border border-[#8B1E2D]/20 text-xs font-semibold shadow-sm transition hover:shadow-md"
              >
                <Volume2 className="w-4 h-4" />
                Nghe Tin Mừng
              </button>
              <Link
                href="/phung-vu"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition hover:shadow-md hover:scale-[1.02]"
              >
                Xem Đầy Đủ Bài Đọc
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Grid: Câu Lời Chúa Nổi Bật & Suy Niệm Hôm Nay */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Câu Lời Chúa Hôm Nay (7 Cols) with Sacred Radiance Behind Scripture & Floating Sparks */}
        <section className="lg:col-span-7 relative overflow-hidden bg-white rounded-3xl p-6 md:p-8 border border-[#E8DFC8] shadow-sm flex flex-col justify-between sacred-gold-hover cascade-2 group">
          {/* Corner Ornaments */}
          <SacredCornerOrnament position="top-right" className="absolute top-2 right-2 text-[#C59B27]/40" />
          <SacredCornerOrnament position="bottom-left" className="absolute bottom-2 left-2 text-[#C59B27]/40" />

          {/* Floating Twinkling Sparks around Scripture */}
          <FloatingSparks />

          {/* Lớp nền hào quang lấp lánh nhẹ tỏa sáng sau Lời Chúa */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF4E8]/70 via-transparent to-[#FBF4E2]/50 opacity-80 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-[#C59B27]/15 via-[#FAF4E8]/20 to-[#8B1E2D]/10 blur-3xl pointer-events-none animate-sacred-radiance" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C59B27] animate-pulse" />
                <span>Câu Lời Chúa Hôm Nay</span>
              </div>
              <div className="flex items-center gap-2">
                <EucharisticWheatGrapesIcon size={20} className="text-[#8B1E2D]" />
                <span className="text-xs font-semibold text-[#855D14] bg-[#FAF4E8] px-3 py-1 rounded-full border border-[#C59B27]/30 shadow-xs">
                  {todayReading.gospel.reference}
                </span>
              </div>
            </div>

            <blockquote className="font-serif text-lg md:text-xl text-[#2D1E18] leading-relaxed italic border-l-4 border-[#8B1E2D] pl-4 my-4 group-hover:text-[#8B1E2D] transition-colors relative">
              &ldquo;{todayReading.gospel.theme}&rdquo;
            </blockquote>

            <p className="text-sm text-[#5D4037] leading-relaxed line-clamp-3 pl-1">
              {todayReading.gospel.text}
            </p>

            {/* Sacred Arabesque Divider */}
            <SacredOrnamentDivider className="my-5" />
          </div>

          <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
            <Link
              href={`/tao-anh?quote=${encodeURIComponent(todayReading.gospel.theme || '')}&ref=${encodeURIComponent(todayReading.gospel.reference)}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B1E2D] hover:text-[#701124] transition group/btn"
            >
              <ImageIcon className="w-4 h-4 text-[#C59B27] group-hover/btn:scale-110 transition-transform" />
              <span>Tạo Ảnh Chia Sẻ Đẹp Mắt</span>
            </Link>
            <Link
              href="/phung-vu"
              className="text-xs font-semibold text-[#855D14] hover:underline inline-flex items-center gap-1 group/link"
            >
              <span>Đọc trọn bài Tin Mừng</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Suy Niệm Hôm Nay (5 Cols) */}
        <section className="lg:col-span-5 bg-gradient-to-br from-[#FAF7F2] to-[#F4EFE6] rounded-3xl p-6 md:p-8 border border-[#E8DFC8] shadow-sm flex flex-col justify-between sacred-gold-hover cascade-2 relative overflow-hidden">
          {/* Corner Ornaments */}
          <SacredCornerOrnament position="top-left" className="absolute top-2 left-2 text-[#C59B27]/40" />
          <SacredCornerOrnament position="bottom-right" className="absolute bottom-2 right-2 text-[#C59B27]/40" />

          <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
            <SacredCrossIcon size={96} className="text-[#8B1E2D]" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider flex items-center gap-1.5">
                <LiturgicalHaloIcon size={16} className="text-[#C59B27]" />
                Linh Đạo 8 Phần
              </span>
              <button
                onClick={handleListenReflection}
                className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-[#8B1E2D] transition shadow-xs hover:scale-105"
                title="Nghe bài suy niệm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-serif text-lg font-bold text-[#2D1E18] mb-2 leading-snug">
              {todayReflection.title}
            </h3>

            <p className="text-xs text-[#5D4037] leading-relaxed line-clamp-3 mb-4">
              {todayReflection.coreMessage}
            </p>

            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#E8DFC8] text-xs text-[#3E2723] space-y-1 shadow-xs">
              <strong className="text-[#8B1E2D] block font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                Quyết tâm sống hôm nay:
              </strong>
              <p className="italic text-stone-600">
                &ldquo;{todayReflection.practicalResolution}&rdquo;
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-[#E8DFC8]/60 flex items-center justify-between">
            <span className="text-[11px] text-[#8D6E63] truncate">
              {todayReflection.author}
            </span>
            <Link
              href="/suy-niem"
              className="text-xs font-semibold text-[#8B1E2D] hover:underline inline-flex items-center gap-1 group/link"
            >
              <span>Đọc 8 phần chi tiết</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

      </div>

      {/* 3. Lối Tắt Nhanh Đến 73 Sách Kinh Thánh */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8DFC8] shadow-sm space-y-6 sacred-gold-hover cascade-3 relative overflow-hidden">
        {/* Corner Ornaments */}
        <SacredCornerOrnament position="top-right" className="absolute top-2 right-2 text-[#C59B27]/40" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <SacredCrossIcon size={24} className="text-[#8B1E2D]" />
              <h2 className="font-serif text-xl font-bold text-[#2D1E18]">
                Thư Viện 73 Sách Kinh Thánh Công Giáo
              </h2>
            </div>
            <p className="text-xs text-[#5D4037] mt-1">
              Trọn bộ 46 sách Cựu Ước (gồm 7 sách Đệ Nhị Quy Điển) và 27 sách Tân Ước chuẩn mực &bull; <strong>100% Bản văn Kinh Thánh trọn vẹn</strong>.
            </p>
          </div>

          <Link
            href="/kinh-thanh"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#FAF7F2] hover:bg-[#FAF4E8] border border-[#E8DFC8] text-xs font-bold text-[#8B1E2D] shadow-xs transition hover:scale-105 shrink-0"
          >
            <span>Khám phá trọn bộ 73 sách</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Key Books Grid with Sacred Hover Effects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATHOLIC_BIBLE_BOOKS.slice(0, 6).map((book) => (
            <Link
              key={book.id}
              href={`/kinh-thanh/${book.id}?chapter=1`}
              className="group p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#FAF4E8] border border-[#E8DFC8] hover:border-[#8B1E2D]/50 transition-all text-center flex flex-col items-center justify-between min-h-[125px] shadow-xs hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-2xl bg-white group-hover:bg-[#8B1E2D] text-[#8B1E2D] group-hover:text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs transition duration-300">
                {book.abbreviation}
              </div>
              <div className="mt-2">
                <div className="font-serif text-xs font-bold text-[#2D1E18] group-hover:text-[#8B1E2D] transition">
                  {book.name}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  {book.chaptersCount} Chương
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Banner Nghiên Cứu, Trợ Lý AI & Giáo Lý (GLHTCG) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 cascade-4">
        
        {/* Đối Chiếu & Tiên Trưng */}
        <Link
          href="/nghien-cuu?tab=typology"
          className="p-5 rounded-3xl bg-white border border-[#E8DFC8] hover:border-[#C59B27] transition group shadow-sm flex flex-col justify-between sacred-gold-hover"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#C59B27]/10 text-[#855D14] flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#2D1E18] group-hover:text-[#8B1E2D] transition">
              Đối Chiếu & Tiên Trưng
            </h3>
            <p className="text-xs text-[#5D4037] mt-1 leading-relaxed">
              Sơ đồ tiên trưng Cựu Ước - Tân Ước và các mẫu gương đức tin hoàn tất nơi Đức Kitô.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#8B1E2D] group-hover:translate-x-1 transition-transform">
            <span>Khám phá sơ đồ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Giáo Lý Hội Thánh (GLHTCG) */}
        <Link
          href="/giao-ly"
          className="p-5 rounded-3xl bg-white border border-[#E8DFC8] hover:border-[#8B1E2D] transition group shadow-sm flex flex-col justify-between sacred-gold-hover"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center mb-3">
              <SacredCrossIcon size={20} className="text-[#8B1E2D]" />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#2D1E18] group-hover:text-[#8B1E2D] transition">
              Giáo Lý Hội Thánh (GLHTCG)
            </h3>
            <p className="text-xs text-[#5D4037] mt-1 leading-relaxed">
              Trọn bộ 2.865 điều khoản Giáo lý với 4 trụ cột, liên kết trực tiếp với từng câu Kinh Thánh.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#8B1E2D] group-hover:translate-x-1 transition-transform">
            <span>Tra cứu 2.865 điều</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Kế Hoạch Đọc Lời Chúa */}
        <Link
          href="/ke-hoach-doc"
          className="p-5 rounded-3xl bg-white border border-[#E8DFC8] hover:border-[#C59B27] transition group shadow-sm flex flex-col justify-between sacred-gold-hover"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-3">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#2D1E18] group-hover:text-[#8B1E2D] transition">
              Kế Hoạch Đọc Lời Chúa
            </h3>
            <p className="text-xs text-[#5D4037] mt-1 leading-relaxed">
              Lộ trình 365 ngày toàn bộ Kinh Thánh, 90 ngày Tân Ước, 30 ngày Tin Mừng & Thánh Vịnh.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#8B1E2D] group-hover:translate-x-1 transition-transform">
            <span>Theo dõi chuỗi đọc</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Góc Cá Nhân & Nhật Ký */}
        <Link
          href="/ca-nhan"
          className="p-5 rounded-3xl bg-white border border-[#E8DFC8] hover:border-[#8B1E2D] transition group shadow-sm flex flex-col justify-between sacred-gold-hover"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#8B1E2D] flex items-center justify-center mb-3">
              <Bookmark className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#2D1E18] group-hover:text-[#8B1E2D] transition">
              Góc Cá Nhân & Nhật Ký
            </h3>
            <p className="text-xs text-[#5D4037] mt-1 leading-relaxed">
              Lưu trữ câu yêu thích, nhật ký thiêng liêng và đồng bộ an toàn qua tài khoản cá nhân.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#8B1E2D] group-hover:translate-x-1 transition-transform">
            <span>Vào góc riêng</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

      </section>

      {/* 5. Author & Catholic Platform Footer */}
      <footer className="pt-8 pb-12 border-t border-[#E8DFC8] space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 select-none">
          <SacredCrossIcon size={18} className="text-[#8B1E2D]" />
          <span className="font-serif text-sm font-bold text-[#2D1E18]">LỜI CHÚA MỖI NGÀY</span>
          <span className="text-xs text-[#855D14] font-semibold">&bull; Nền Tảng Kinh Thánh Công Giáo Toàn Diện</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] max-w-2xl mx-auto space-y-1 text-xs text-[#5D4037] shadow-xs">
          <div className="font-bold text-[#8B1E2D]">
            Tác giả: Lucas Nguyen &bull; Gmail: anhtuan.employ202@gmail.com &bull; SĐT: 0368727316
          </div>
          <div className="text-[11px] text-[#8D6E63] italic">
            Bản quyền thuộc về Lucas Nguyen - Vui lòng không reup dưới mọi hình thức.
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#855D14]">
          <Link href="/gioi-thieu" className="hover:underline">Giới Thiệu Tác Giả</Link>
          <span>&bull;</span>
          <Link href="/kinh-thanh" className="hover:underline">73 Sách Thánh</Link>
          <span>&bull;</span>
          <Link href="/giao-ly" className="hover:underline">Giáo Lý (GLHTCG)</Link>
          <span>&bull;</span>
          <Link href="/nghien-cuu" className="hover:underline">Nghiên Cứu</Link>
          <span>&bull;</span>
          <Link href="/ca-nhan" className="hover:underline">Tài Khoản Cá Nhân</Link>
        </div>
      </footer>

      {/* Sticky Audio Player */}
      {activeAudioText && (
        <AudioPlayerBar
          title={activeAudioText.title}
          passageText={activeAudioText.text}
          onClose={() => setActiveAudioText(null)}
        />
      )}

    </div>
  );
}
