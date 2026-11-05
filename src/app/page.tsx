'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  Compass, 
  Volume2, 
  ArrowRight, 
  Bookmark, 
  Sparkles, 
  ImageIcon, 
  AlertCircle,
  RefreshCw,
  Layers,
  Bot,
  FileText,
  Clock,
  CheckCircle2,
  Quote,
  Flame,
  ArrowUpRight,
  BookMarked
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
import { getVietnamTodayString, formatVietnamDateFull } from '@/lib/liturgy/timezone';
import { BibleStore } from '@/lib/bible-store';
import { DailyLiturgicalReading, DailyReflectionItem, UserPersonalData } from '@/types';

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState<string>(() => getVietnamTodayString());
  const [todayReading, setTodayReading] = useState<DailyLiturgicalReading | null>(() => {
    try {
      return getLiturgicalReadingByDate(getVietnamTodayString());
    } catch (e) {
      console.error('[HomePage] Lỗi khởi tạo bài đọc:', e);
      return null;
    }
  });
  const [todayReflection, setTodayReflection] = useState<DailyReflectionItem | null>(() => {
    try {
      const todayStr = getVietnamTodayString();
      return getReflectionByDate(todayStr);
    } catch (e) {
      console.error('[HomePage] Lỗi khởi tạo suy niệm:', e);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeAudioText, setActiveAudioText] = useState<{ title: string; text: string } | null>(null);
  const [userData, setUserData] = useState<UserPersonalData | null>(null);

  // Nạp dữ liệu phụng vụ cho ngày hiện tại theo giờ Việt Nam
  const loadLiturgicalData = useCallback((dateStr: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const reading = getLiturgicalReadingByDate(dateStr);
      if (!reading || !reading.gospel) {
        throw new Error('Dữ liệu bài đọc phụng vụ của ngày không hợp lệ hoặc bị gián đoạn.');
      }
      const reflection = getReflectionByDate(dateStr);
      setTodayReading(reading);
      setTodayReflection(reflection);
      setCurrentDate(dateStr);
    } catch (err: any) {
      console.error(`[HomePage] Lỗi nạp phụng vụ ngày ${dateStr}:`, err);
      setErrorMsg(err?.message || 'Không thể tải dữ liệu phụng vụ cho ngày hôm nay.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Đồng bộ thời gian thực theo múi giờ Việt Nam (UTC+7)
  useEffect(() => {
    setUserData(BibleStore.getUserData());

    const today = getVietnamTodayString();
    if (today !== currentDate || !todayReading) {
      loadLiturgicalData(today);
    }

    const interval = setInterval(() => {
      const nowVn = getVietnamTodayString();
      if (nowVn !== currentDate) {
        console.log(`[HomePage] Phát hiện chuyển sang ngày mới tại Việt Nam: ${nowVn}`);
        loadLiturgicalData(nowVn);
      }
    }, 60000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const nowVn = getVietnamTodayString();
        if (nowVn !== currentDate) {
          loadLiturgicalData(nowVn);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentDate, loadLiturgicalData, todayReading]);

  const handleListenGospel = () => {
    if (!todayReading) return;
    setActiveAudioText({
      title: `Tin Mừng: ${todayReading.gospel.reference}`,
      text: `${todayReading.gospel.passage}. ${todayReading.gospel.text}`
    });
  };

  const handleListenReflection = () => {
    if (!todayReflection) return;
    setActiveAudioText({
      title: `Suy niệm: ${todayReflection.title}`,
      text: `${todayReflection.coreMessage}. ${todayReflection.lifeApplication}. Lời nguyện: ${todayReflection.prayer}`
    });
  };

  // Xác định thông tin vị trí đọc gần nhất
  const lastReadBookId = userData?.lastReadLocation?.bookId || 'matt';
  const lastReadChapter = userData?.lastReadLocation?.chapterNumber || 5;
  const lastReadVerse = userData?.lastReadLocation?.verseNumber || 1;
  const lastReadBook = CATHOLIC_BIBLE_BOOKS.find(b => b.id === lastReadBookId) || CATHOLIC_BIBLE_BOOKS[46];

  // Màn hình xử lý lỗi an toàn
  if (errorMsg || !todayReading || !todayReflection) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-[#762F3A] flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-[#403A34]">
            Không Thể Tải Dữ Liệu Phụng Vụ
          </h2>
          <p className="text-sm text-[#736B63] max-w-md mx-auto leading-relaxed">
            {errorMsg || 'Đã xảy ra sự cố trong quá trình xác định ngày phụng vụ tại Việt Nam. Vui lòng bấm thử lại bên dưới.'}
          </p>
        </div>
        <div>
          <button
            onClick={() => loadLiturgicalData(getVietnamTodayString())}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#762F3A] hover:bg-[#5E252E] text-white text-xs font-bold shadow-md transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Đang tải lại...' : 'Thử Tải Lại Dữ Liệu'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8 sm:space-y-12 animate-fade-in relative pb-24 md:pb-12">
      
      {/* =========================================================================
          1. LỜI CHÚA VÀ PHỤNG VỤ HÔM NAY (COMPACT BANNER - MOBILE FRIENDLY)
          ========================================================================= */}
      <section 
        aria-label="Lời Chúa và Phụng vụ hôm nay"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F7F4EE] via-[#F4EFE6] to-[#E7E0D5] border border-[#E7E0D5] dark:border-[#3E302A] p-4 sm:p-6 md:p-8 shadow-sacred transition-all"
      >
        {/* Họa tiết góc trang nghiêm */}
        <SacredCornerOrnament position="top-left" className="absolute top-2 left-2 text-[#B39A70]/30" />
        <SacredCornerOrnament position="bottom-right" className="absolute bottom-2 right-2 text-[#B39A70]/30" />

        {/* Hào quang phụng vụ nền */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 rounded-full bg-radial-gradient from-[#B39A70]/20 via-[#F7F4EE]/10 to-transparent blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            {/* Huy hiệu Phụng vụ & Múi giờ Việt Nam */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#762F3A] text-white shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Phụng Vụ Hôm Nay
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/90 text-[#B39A70] dark:bg-[#2A201C] dark:text-[#E5BE53] border border-[#B39A70]/30 shadow-xs">
                <LiturgicalHaloIcon size={13} className="text-[#B39A70]" />
                {todayReading.colorName} &bull; {todayReading.cycle}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-[#736B63] dark:text-[#A1887F]">
                {formatVietnamDateFull(todayReading.date)}
              </span>
            </div>

            {/* Tiêu đề Thánh Lễ / Ngày Lễ */}
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#403A34] dark:text-[#F7F4EE] leading-tight tracking-tight">
              {todayReading.title}
            </h1>

            {todayReading.saintOfTheDay && (
              <p className="text-xs sm:text-sm text-[#736B63] dark:text-[#D7CCC8] line-clamp-2 leading-relaxed">
                {todayReading.saintOfTheDay}
              </p>
            )}
          </div>

          {/* Lối tắt hành động */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-1 sm:pt-0">
            <button
              onClick={handleListenGospel}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 dark:bg-[#2A201C] dark:hover:bg-[#342823] text-[#762F3A] dark:text-[#E5BE53] border border-[#762F3A]/20 dark:border-[#B39A70]/30 text-xs font-semibold shadow-xs transition hover:shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              Nghe Tin Mừng
            </button>
            <Link
              href="/phung-vu"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#762F3A] hover:bg-[#5E252E] text-white text-xs font-semibold shadow-xs transition hover:shadow-md"
            >
              Xem Trọn Bài Đọc
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2 & 3 & 4. CÂU LỜI CHÚA HÔM NAY • SUY NIỆM TIN MỪNG • LINH ĐẠO THỰC HÀNH
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* 2. CÂU LỜI CHÚA HÔM NAY (7 Cols) */}
        <section 
          aria-label="Câu Lời Chúa hôm nay"
          className="lg:col-span-7 relative overflow-hidden bg-white dark:bg-[#241C18] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm flex flex-col justify-between group transition-all"
        >
          <SacredCornerOrnament position="top-right" className="absolute top-2 right-2 text-[#B39A70]/30" />
          <SacredCornerOrnament position="bottom-left" className="absolute bottom-2 left-2 text-[#B39A70]/30" />
          <FloatingSparks />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#B39A70]" />
                <span>Câu Lời Chúa Hôm Nay</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B39A70] dark:text-[#E5BE53] bg-[#F7F4EE] dark:bg-[#1A1412] px-3 py-1 rounded-full border border-[#B39A70]/30 shadow-xs">
                <EucharisticWheatGrapesIcon size={16} className="text-[#762F3A] dark:text-[#E5BE53]" />
                <span>{todayReading.gospel.reference}</span>
              </div>
            </div>

            <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-[#403A34] dark:text-[#F7F4EE] leading-relaxed italic border-l-4 border-[#762F3A] pl-4 my-4 group-hover:text-[#762F3A] dark:group-hover:text-[#E5BE53] transition-colors">
              &ldquo;{todayReading.gospel.theme}&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm text-[#736B63] dark:text-[#D7CCC8] leading-relaxed line-clamp-3 pl-1">
              {todayReading.gospel.text}
            </p>

            <SacredOrnamentDivider className="my-5" />
          </div>

          <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E7E0D5]/50 dark:border-[#3E302A]">
            <Link
              href={`/tao-anh?quote=${encodeURIComponent(todayReading.gospel.theme || '')}&ref=${encodeURIComponent(todayReading.gospel.reference)}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#762F3A] dark:text-[#E5BE53] hover:underline transition"
            >
              <ImageIcon className="w-4 h-4 text-[#B39A70]" />
              <span>Tạo Ảnh Câu Lời Chúa</span>
            </Link>
            <Link
              href="/phung-vu"
              className="text-xs font-semibold text-[#B39A70] dark:text-[#E5BE53] hover:underline inline-flex items-center gap-1"
            >
              <span>Đọc trọn bài Tin Mừng</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 3 & 4. SUY NIỆM TIN MỪNG & LINH ĐẠO THỰC HÀNH (5 Cols) */}
        <section 
          aria-label="Suy niệm Tin Mừng và Linh đạo thực hành"
          className="lg:col-span-5 bg-gradient-to-br from-[#F7F4EE] to-[#E7E0D5]/40 dark:from-[#241C18] dark:to-[#1A1412] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <SacredCrossIcon size={80} className="text-[#762F3A]" />
          </div>

          <div className="relative z-10 space-y-4">
            {/* Header Suy niệm */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B39A70] dark:text-[#E5BE53] uppercase tracking-wider flex items-center gap-1.5">
                <LiturgicalHaloIcon size={15} className="text-[#B39A70]" />
                3. Suy Niệm Tin Mừng
              </span>
              <button
                onClick={handleListenReflection}
                className="p-1.5 rounded-xl bg-white/90 dark:bg-[#342823] text-[#762F3A] dark:text-[#E5BE53] transition shadow-xs hover:scale-105"
                title="Nghe bài suy niệm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#403A34] dark:text-[#F7F4EE] leading-snug">
                {todayReflection.title}
              </h3>
              <p className="text-xs text-[#736B63] dark:text-[#A1887F] mt-1.5 line-clamp-3 leading-relaxed">
                {todayReflection.coreMessage}
              </p>
            </div>

            {/* 4. LINH ĐẠO VÀ THỰC HÀNH SỐNG LỜI CHÚA */}
            <div className="p-4 rounded-2xl bg-white/95 dark:bg-[#2A201C] border border-[#E7E0D5] dark:border-[#3E302A] space-y-2 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#B39A70]" />
                <span>4. Linh Đạo & Quyết Tâm Sống</span>
              </div>
              <p className="italic text-xs sm:text-sm text-[#403A34] dark:text-[#D7CCC8] leading-relaxed">
                &ldquo;{todayReflection.practicalResolution}&rdquo;
              </p>
              {todayReflection.prayer && (
                <div className="pt-2 border-t border-[#E7E0D5]/60 dark:border-[#3E302A] text-[11px] text-[#736B63] dark:text-[#A1887F] italic line-clamp-2">
                  <span className="font-bold not-italic text-[#B39A70]">Lời nguyện: </span>
                  {todayReflection.prayer}
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-[#E7E0D5]/70 dark:border-[#3E302A] flex items-center justify-between">
            <span className="text-[11px] text-[#8F877F] dark:text-[#A1887F] truncate">
              {todayReflection.author}
            </span>
            <Link
              href="/suy-niem"
              className="text-xs font-semibold text-[#762F3A] dark:text-[#E5BE53] hover:underline inline-flex items-center gap-1"
            >
              <span>Đọc trọn bài suy niệm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </div>

      {/* =========================================================================
          5. TIẾP TỤC ĐỌC KINH THÁNH (LAST READ RESUME TRACKER)
          ========================================================================= */}
      <section 
        aria-label="Tiếp tục đọc Kinh Thánh"
        className="rounded-3xl bg-white dark:bg-[#241C18] border border-[#E7E0D5] dark:border-[#3E302A] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#762F3A]/10 dark:bg-[#E5BE53]/15 text-[#762F3A] dark:text-[#E5BE53] flex items-center justify-center shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider">
                5. Tiếp Tục Đọc Kinh Thánh
              </span>
              {userData?.streakDays ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/50">
                  <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                  Chuỗi {userData.streakDays} ngày
                </span>
              ) : null}
            </div>
            <div className="font-serif text-base sm:text-lg font-bold text-[#403A34] dark:text-[#F7F4EE]">
              {lastReadBook.name} &bull; Chương {lastReadChapter}, Câu {lastReadVerse}
            </div>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F]">
              Đọc lần cuối: {userData?.lastReadDate || 'Hôm nay'} &bull; Giữ vững thói quen lắng nghe Lời Chúa mỗi ngày.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
          <Link
            href={`/kinh-thanh/${lastReadBookId}?chapter=${lastReadChapter}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#762F3A] hover:bg-[#5E252E] text-white text-xs font-semibold shadow-xs transition hover:shadow-md"
          >
            <span>Tiếp Tục Đọc Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          6. KHÁM PHÁ 73 SÁCH KINH THÁNH CÔNG GIÁO
          ========================================================================= */}
      <section 
        aria-label="Khám phá 73 sách Kinh Thánh"
        className="bg-white dark:bg-[#241C18] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E0D5] dark:border-[#3E302A] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <SacredCrossIcon size={22} className="text-[#762F3A] dark:text-[#E5BE53]" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#403A34] dark:text-[#F7F4EE]">
                6. Khám Phá Thư Viện 73 Sách Kinh Thánh
              </h2>
            </div>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] mt-1">
              Trọn bộ 46 sách Cựu Ước (gồm 7 sách Đệ Nhị Quy Điển) và 27 sách Tân Ước chuẩn mực Công giáo.
            </p>
          </div>

          <Link
            href="/kinh-thanh"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F7F4EE] hover:bg-[#E7E0D5]/50 dark:bg-[#1A1412] dark:hover:bg-[#2A201C] border border-[#E7E0D5] dark:border-[#3E302A] text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] shadow-xs transition shrink-0"
          >
            <span>Xem trọn bộ 73 sách</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Sách đại diện tiêu biểu Cựu Ước & Tân Ước */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { id: 'gen', name: 'Sáng Thế', abbr: 'St', chapters: 50, testament: 'Cựu Ước' },
            { id: 'exod', name: 'Xuất Hành', abbr: 'Xh', chapters: 40, testament: 'Cựu Ước' },
            { id: 'ps', name: 'Thánh Vịnh', abbr: 'Tv', chapters: 150, testament: 'Thơ Ca' },
            { id: 'isa', name: 'Isaia', abbr: 'Is', chapters: 66, testament: 'Ngôn Sứ' },
            { id: 'matt', name: 'Mátthêu', abbr: 'Mt', chapters: 28, testament: 'Tin Mừng' },
            { id: 'john', name: 'Gioan', abbr: 'Ga', chapters: 21, testament: 'Tin Mừng' },
          ].map((book) => (
            <Link
              key={book.id}
              href={`/kinh-thanh/${book.id}?chapter=1`}
              className="p-4 rounded-2xl bg-[#F7F4EE] hover:bg-[#E7E0D5]/60 dark:bg-[#1A1412] dark:hover:bg-[#2A201C] border border-[#E7E0D5] dark:border-[#3E302A] hover:border-[#762F3A]/40 transition text-center flex flex-col items-center justify-between min-h-[120px] shadow-xs hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#241C18] text-[#762F3A] dark:text-[#E5BE53] group-hover:bg-[#762F3A] group-hover:text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs transition">
                {book.abbr}
              </div>
              <div className="mt-2">
                <div className="font-serif text-xs font-bold text-[#403A34] dark:text-[#F7F4EE] group-hover:text-[#762F3A] dark:group-hover:text-[#E5BE53] transition">
                  {book.name}
                </div>
                <div className="text-[10px] text-[#8F877F] dark:text-[#A1887F] mt-0.5">
                  {book.chapters} Chương &bull; {book.testament}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7 & 8. HỌC GIÁO LÝ HỘI THÁNH CÔNG GIÁO & NGHIÊN CỨU THẦN HỌC
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* 7. HỌC GIÁO LÝ HỘI THÁNH CÔNG GIÁO (GLHTCG) */}
        <section 
          aria-label="Học Giáo lý Hội Thánh Công giáo"
          className="bg-white dark:bg-[#241C18] rounded-3xl p-5 sm:p-7 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#762F3A]/10 text-[#762F3A] dark:text-[#E5BE53] flex items-center justify-center">
                <BookMarked className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#403A34] dark:text-[#F7F4EE]">
                  7. Học Giáo Lý Hội Thánh Công Giáo
                </h3>
                <p className="text-xs text-[#736B63] dark:text-[#A1887F]">
                  Trọn bộ 2.865 điều khoản với 4 Trụ Cột & 13 Chủ Đề chuẩn mực.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1412] border border-[#E7E0D5] dark:border-[#3E302A]">
                <div className="font-bold text-[#762F3A] dark:text-[#E5BE53]">Trụ Cột I & II</div>
                <div className="text-[11px] text-[#736B63] dark:text-[#A1887F] mt-0.5">Tuyên Xưng & Phụng Vụ Thánh Thể</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1412] border border-[#E7E0D5] dark:border-[#3E302A]">
                <div className="font-bold text-[#762F3A] dark:text-[#E5BE53]">Trụ Cột III & IV</div>
                <div className="text-[11px] text-[#736B63] dark:text-[#A1887F] mt-0.5">Đời Sống Luân Lý & Kinh Nguyện</div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-[#E7E0D5] dark:border-[#3E302A] flex items-center justify-between">
            <span className="text-xs text-[#8F877F] dark:text-[#A1887F]">Tra cứu nhanh số điều 1 – 2865</span>
            <Link
              href="/giao-ly"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#762F3A] dark:text-[#E5BE53] hover:underline"
            >
              <span>Vào Chuyên Mục Giáo Lý</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 8. HỌC HỎI VÀ NGHIÊN CỨU THẦN HỌC */}
        <section 
          aria-label="Học hỏi và nghiên cứu thần học"
          className="bg-white dark:bg-[#241C18] rounded-3xl p-5 sm:p-7 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#B39A70]/15 text-[#B39A70] dark:text-[#E5BE53] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#403A34] dark:text-[#F7F4EE]">
                  8. Học Hỏi & Nghiên Cứu Thần Học
                </h3>
                <p className="text-xs text-[#736B63] dark:text-[#A1887F]">
                  Sơ đồ Tiên trưng (Typology), Chú giải đa ngữ & Từ điển học thuật.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1412] border border-[#E7E0D5] dark:border-[#3E302A]">
                <div className="font-bold text-[#B39A70] dark:text-[#E5BE53]">Sơ Đồ Tiên Trưng</div>
                <div className="text-[11px] text-[#736B63] dark:text-[#A1887F] mt-0.5">Hình bóng Cựu Ước trọn vẹn nơi Đức Kitô</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1412] border border-[#E7E0D5] dark:border-[#3E302A]">
                <div className="font-bold text-[#B39A70] dark:text-[#E5BE53]">Đối Chiếu Đa Ngữ</div>
                <div className="text-[11px] text-[#736B63] dark:text-[#A1887F] mt-0.5">Do Thái, Hy Lạp, Latin Vulgata & Việt ngữ</div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-[#E7E0D5] dark:border-[#3E302A] flex items-center justify-between">
            <span className="text-xs text-[#8F877F] dark:text-[#A1887F]">Công cụ nghiên cứu sâu rộng</span>
            <Link
              href="/nghien-cuu"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#762F3A] dark:text-[#E5BE53] hover:underline"
            >
              <span>Mở Phòng Nghiên Cứu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>

      {/* =========================================================================
          9 & 10 & 11. VĂN KIỆN HỘI THÁNH • KẾ HOẠCH ĐỌC • TRỢ LÝ AI
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* 9. VĂN KIỆN HỘI THÁNH */}
        <section 
          aria-label="Văn kiện Hội Thánh"
          className="bg-white dark:bg-[#241C18] rounded-3xl p-5 sm:p-6 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#403A34] dark:text-[#F7F4EE]">
              9. Văn Kiện Hội Thánh
            </h3>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] leading-relaxed">
              4 Hiến chế nền tảng Công Đồng Vatican II (Dei Verbum, Lumen Gentium...) và các Thông Điệp Huấn Quyền trọng yếu.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E7E0D5] dark:border-[#3E302A]">
            <Link
              href="/nghien-cuu?tab=documents"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#762F3A] dark:text-[#E5BE53] hover:underline"
            >
              <span>Xem Thư Viện Văn Kiện</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 10. KẾ HOẠCH ĐỌC KINH THÁNH */}
        <section 
          aria-label="Kế hoạch đọc Kinh Thánh"
          className="bg-white dark:bg-[#241C18] rounded-3xl p-5 sm:p-6 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#762F3A]/10 text-[#762F3A] dark:text-[#E5BE53] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#403A34] dark:text-[#F7F4EE]">
              10. Kế Hoạch Đọc Lời Chúa
            </h3>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] leading-relaxed">
              Lộ trình 365 ngày trọn bộ Kinh Thánh, 90 ngày Tân Ước và 30 ngày suy niệm Tin Mừng & Thánh Vịnh.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E7E0D5] dark:border-[#3E302A]">
            <Link
              href="/ke-hoach-doc"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#762F3A] dark:text-[#E5BE53] hover:underline"
            >
              <span>Chọn Lộ Trình Đọc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 11. TRỢ LÝ HỌC HỎI KINH THÁNH CÔNG GIÁO */}
        <section 
          aria-label="Trợ lý học hỏi Kinh Thánh Công giáo"
          className="bg-white dark:bg-[#241C18] rounded-3xl p-5 sm:p-6 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B39A70]/15 text-[#B39A70] dark:text-[#E5BE53] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#403A34] dark:text-[#F7F4EE]">
              11. Trợ Lý Học Hỏi Công Giáo
            </h3>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] leading-relaxed">
              Hỏi đáp thắc mắc Kinh Thánh, tra cứu liên hệ Giáo lý và đào sâu ý nghĩa thần học dựa trên Huấn Quyền.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E7E0D5] dark:border-[#3E302A]">
            <Link
              href="/tro-ly-ai"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#762F3A] dark:text-[#E5BE53] hover:underline"
            >
              <span>Hỏi Đáp Cùng Trợ Lý AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </div>

      {/* =========================================================================
          12. FOOTER — MINH BẠCH BẢN QUYỀN & TÔN TRỌNG HUẤN QUYỀN HỘI THÁNH
          ========================================================================= */}
      <footer 
        aria-label="Chân trang và Bản quyền"
        className="pt-8 pb-8 border-t border-[#E7E0D5] dark:border-[#3E302A] space-y-6 text-center"
      >
        <div className="flex items-center justify-center gap-2 select-none">
          <SacredCrossIcon size={18} className="text-[#762F3A] dark:text-[#E5BE53]" />
          <span className="font-serif text-sm font-bold text-[#403A34] dark:text-[#F7F4EE]">
            LỜI CHÚA MỖI NGÀY
          </span>
          <span className="text-xs text-[#B39A70] dark:text-[#E5BE53] font-semibold">
            &bull; Nền Tảng Kinh Thánh Công Giáo Toàn Diện
          </span>
        </div>

        {/* Thông tin tác giả & Phân định pháp lý bản quyền */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#241C18] border border-[#E7E0D5] dark:border-[#3E302A] max-w-3xl mx-auto space-y-2.5 text-xs text-[#736B63] dark:text-[#D7CCC8] shadow-xs text-left sm:text-center leading-relaxed">
          <div className="font-bold text-[#762F3A] dark:text-[#E5BE53]">
            Người sáng lập & Phát triển dự án: Lucas Nguyen &bull; Email: anhtuan.employ202@gmail.com &bull; SĐT: 0368727316
          </div>
          <div className="text-[11px] text-[#8F877F] dark:text-[#A1887F] border-t border-[#E7E0D5]/50 dark:border-[#3E302A] pt-2">
            Bản quyền mã nguồn và giao diện thuộc về tác giả. 
            Bản văn Lời Chúa, Các Bài đọc Phụng vụ và Giáo lý Hội Thánh Công giáo thuộc thẩm quyền Tòa Thánh Vatican và Hội đồng Giám mục Việt Nam (HĐGMVN), được tôn kính trích dẫn nhằm phục vụ mục vụ và cộng đồng đức tin, phi thương mại.
          </div>
        </div>

        {/* Liên kết điều hướng chân trang */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-[#B39A70] dark:text-[#E5BE53]">
          <Link href="/gioi-thieu" className="hover:underline">Giới Thiệu Tác Giả</Link>
          <span>&bull;</span>
          <Link href="/kinh-thanh" className="hover:underline">73 Sách Thánh</Link>
          <span>&bull;</span>
          <Link href="/phung-vu" className="hover:underline">Phụng Vụ</Link>
          <span>&bull;</span>
          <Link href="/giao-ly" className="hover:underline">Giáo Lý (GLHTCG)</Link>
          <span>&bull;</span>
          <Link href="/nghien-cuu" className="hover:underline">Nghiên Cứu</Link>
          <span>&bull;</span>
          <Link href="/ca-nhan" className="hover:underline">Tài Khoản Cá Nhân</Link>
        </div>
      </footer>

      {/* Trình phát Audio Lời Chúa ghim dưới màn hình */}
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
