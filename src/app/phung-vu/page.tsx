'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Share2, 
  Sparkles, 
  BookOpen, 
  HeartHandshake,
  Type,
  Palette,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Flame,
  Cross,
  Sun,
  Shield,
  FileText,
  Compass,
  CheckCircle2,
  Info
} from 'lucide-react';
import { getLiturgicalReadingByDate } from '@/data/liturgical-readings';
import { getArtworkForLiturgicalColor, SacredArtwork } from '@/data/sacred-art';
import { DailyLiturgicalReading } from '@/types';
import { AudioPlayerBar } from '@/components/AudioPlayerBar';
import { getVietnamTodayString, addDaysToDate, formatVietnamDateFull } from '@/lib/liturgy/timezone';
import { calculateEaster, getFirstSundayOfAdvent } from '@/lib/liturgy/calendar-engine';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type ReaderTheme = 'parchment' | 'sepia' | 'dark';
type ReaderFontSize = 'text-base' | 'text-lg' | 'text-xl';
type MobileSectionFilter = 'all' | 'opening' | 'first' | 'psalm' | 'second' | 'gospel' | 'communion';

function LiturgicalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlDate = searchParams.get('date');

  const todayStr = useMemo(() => getVietnamTodayString(), []);
  const initialDate = urlDate && /^\d{4}-\d{2}-\d{2}$/.test(urlDate) ? urlDate : todayStr;

  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [reading, setReading] = useState<DailyLiturgicalReading>(() =>
    getLiturgicalReadingByDate(initialDate)
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [theme, setTheme] = useState<ReaderTheme>('parchment');
  const [fontSize, setFontSize] = useState<ReaderFontSize>('text-base');
  const [mobileSection, setMobileSection] = useState<MobileSectionFilter>('all');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [showFeastSelector, setShowFeastSelector] = useState<boolean>(false);

  const yesterdayStr = useMemo(() => addDaysToDate(selectedDate, -1), [selectedDate]);
  const tomorrowStr = useMemo(() => addDaysToDate(selectedDate, 1), [selectedDate]);

  // Sync date change and push state
  const handleDateChange = (newDateStr: string) => {
    if (!newDateStr || !/^\d{4}-\d{2}-\d{2}$/.test(newDateStr)) return;
    setSelectedDate(newDateStr);
    const data = getLiturgicalReadingByDate(newDateStr);
    setReading(data);
    setMobileSection('all');

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('date', newDateStr);
      window.history.pushState(null, '', url.toString());
    }
  };

  // Reset to today
  const handleResetToday = () => {
    handleDateChange(todayStr);
  };

  // Listen to midnight boundary crossing
  useEffect(() => {
    const checkMidnight = () => {
      const currentToday = getVietnamTodayString();
      if (selectedDate === todayStr && currentToday !== todayStr) {
        handleDateChange(currentToday);
      }
    };

    const interval = setInterval(checkMidnight, 60000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') checkMidnight();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [selectedDate, todayStr]);

  // Copy full liturgical text with official citation
  const handleCopyFullLiturgicalReading = () => {
    let fullText = `${reading.title} (${formatVietnamDateFull(reading.date)})\n`;
    fullText += `Bậc lễ: ${reading.rankName} • Màu phụng vụ: ${reading.colorName} • ${reading.cycle}\n\n`;

    if (reading.openingPrayer) {
      fullText += `[LỜI NGUYỆN NHẬP LỄ]\n${reading.openingPrayer}\n\n`;
    }

    fullText += `[BÀI ĐỌC I: ${reading.firstReading.passage} (${reading.firstReading.reference})]\n`;
    if (reading.firstReading.theme) fullText += `«${reading.firstReading.theme}»\n`;
    fullText += `${reading.firstReading.text}\n\n`;

    fullText += `[THÁNH VỊNH ĐÁP CA: ${reading.responsorialPsalm.reference}]\n`;
    fullText += `Đáp: ${reading.responsorialPsalm.refrain}\n`;
    reading.responsorialPsalm.verses.forEach(v => { fullText += `${v}\n`; });
    fullText += `\n`;

    if (reading.secondReading) {
      fullText += `[BÀI ĐỌC II: ${reading.secondReading.passage} (${reading.secondReading.reference})]\n`;
      if (reading.secondReading.theme) fullText += `«${reading.secondReading.theme}»\n`;
      fullText += `${reading.secondReading.text}\n\n`;
    }

    if (reading.gospelAcclamation) {
      fullText += `[TUNG HÔ TIN MỪNG (${reading.gospelAcclamation.verse})]\n${reading.gospelAcclamation.text}\n\n`;
    }

    fullText += `[TIN MỪNG: ${reading.gospel.passage} (${reading.gospel.reference})]\n`;
    if (reading.gospel.theme) fullText += `«${reading.gospel.theme}»\n`;
    fullText += `${reading.gospel.text}\n\n`;

    if (reading.communionPrayer) {
      fullText += `[LỜI NGUYỆN HIỆP LỄ]\n${reading.communionPrayer}\n\n`;
    }

    fullText += `— Nguồn: Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma, Ủy ban Phụng tự trực thuộc Hội đồng Giám mục Việt Nam.`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleShareLink = () => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/phung-vu?date=${selectedDate}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    });
  };

  const getFullLiturgicalAudioText = () => {
    let text = `${reading.title}. `;
    if (reading.openingPrayer) {
      text += `Lời nguyện nhập lễ: ${reading.openingPrayer}. `;
    }
    text += `Bài Đọc Một: ${reading.firstReading.passage}. ${reading.firstReading.text}. `;
    text += `Thánh Vịnh Đáp ca: ${reading.responsorialPsalm.refrain}. `;
    if (reading.secondReading) {
      text += `Bài Đọc Hai: ${reading.secondReading.passage}. ${reading.secondReading.text}. `;
    }
    if (reading.gospelAcclamation) {
      text += `Tung hô Tin Mừng: ${reading.gospelAcclamation.text}. `;
    }
    text += `Phúc Âm: ${reading.gospel.passage}. ${reading.gospel.text}. `;
    if (reading.communionPrayer) {
      text += `Lời nguyện hiệp lễ: ${reading.communionPrayer}.`;
    }
    return text;
  };

  const currentArtwork: SacredArtwork = useMemo(() => {
    return getArtworkForLiturgicalColor(reading.color);
  }, [reading.color]);

  const getColorBg = (color: string) => {
    switch (color) {
      case 'WHITE':
        return 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/50';
      case 'RED':
        return 'bg-rose-100 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700/50';
      case 'PURPLE':
        return 'bg-purple-100 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700/50';
      case 'GREEN':
        return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/50';
      case 'ROSE':
        return 'bg-pink-100 dark:bg-pink-950/40 text-pink-900 dark:text-pink-200 border-pink-300 dark:border-pink-700/50';
      default:
        return 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-200 border-stone-300';
    }
  };

  // Theme styling helpers
  const getThemeStyles = () => {
    switch (theme) {
      case 'sepia':
        return {
          wrapper: 'bg-[#F4ECD8] text-[#3D2C1E]',
          card: 'bg-[#FAF2E1] border-[#DFD1B5]',
          altCard: 'bg-[#EFE4CC] border-[#DFD1B5]',
          gospelCard: 'bg-[#FAF2E1] border-2 border-[#8B1E2D]',
          accentText: 'text-[#8B1E2D]',
          subText: 'text-[#6A5342]'
        };
      case 'dark':
        return {
          wrapper: 'bg-[#1A1412] text-[#F0E6D2]',
          card: 'bg-[#271E1B] border-[#3F312B]',
          altCard: 'bg-[#312622] border-[#4E3D36]',
          gospelCard: 'bg-[#271E1B] border-2 border-[#C59B27]',
          accentText: 'text-[#E5B54C]',
          subText: 'text-[#B8A398]'
        };
      case 'parchment':
      default:
        return {
          wrapper: 'bg-[#FAF7F2] text-[#2D1E18]',
          card: 'bg-white border-[#E8DFC8]',
          altCard: 'bg-[#FAF4E8] border-[#E8DFC8]',
          gospelCard: 'bg-white border-2 border-[#8B1E2D]/50 shadow-md',
          accentText: 'text-[#8B1E2D]',
          subText: 'text-[#5D4037]'
        };
    }
  };

  const ts = getThemeStyles();

  // Danh sách các ngày lễ trọng lớn trong năm để chọn nhanh
  const selectedYear = parseInt(selectedDate.substring(0, 4), 10);
  const easterDate = calculateEaster(selectedYear).dateStr;
  const adventStartDate = getFirstSundayOfAdvent(selectedYear);

  const majorSolemnities = [
    { name: 'Đại Lễ Chúa Giáng Sinh', date: `${selectedYear}-12-25` },
    { name: 'Đức Maria, Mẹ Thiên Chúa', date: `${selectedYear}-01-01` },
    { name: 'Thứ Tư Lễ Tro (Mùa Chay)', date: addDaysToDate(easterDate, -46) },
    { name: 'Chúa Nhật Lễ Lá', date: addDaysToDate(easterDate, -7) },
    { name: 'Đại Lễ Phục Sinh', date: easterDate },
    { name: 'Chúa Thánh Thần Hiện Xuống', date: addDaysToDate(easterDate, 49) },
    { name: 'Chúa Nhật Chúa Ba Ngôi', date: addDaysToDate(easterDate, 56) },
    { name: 'Mình Máu Thánh Chúa Kitô', date: addDaysToDate(easterDate, 63) },
    { name: 'Đức Mẹ Hồn Xác Lên Trời (La Vang)', date: `${selectedYear}-08-15` },
    { name: 'Lễ Các Thánh Nam Nữ', date: `${selectedYear}-11-01` },
    { name: 'Lễ Cầu Cho Các Tín Hữu Đã Qua Đời', date: `${selectedYear}-11-02` },
    { name: 'Các Thánh Tử Đạo Việt Nam (Lễ Trọng)', date: `${selectedYear}-11-24` },
    { name: 'Chúa Nhật I Mùa Vọng', date: adventStartDate }
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${ts.wrapper}`}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        
        {/* 1. Date Navigation & Reader Controls Toolbar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl border shadow-sm ${ts.card}`}>
          {/* Brand & Date Title */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#8B1E2D] dark:text-[#E5B54C]" />
            <div>
              <span className="font-serif text-sm font-bold block">
                Phụng Vụ Lời Chúa & Thánh Lễ
              </span>
              <span className={`text-[11px] ${ts.subText}`}>
                {formatVietnamDateFull(selectedDate)}
              </span>
            </div>
          </div>

          {/* Quick Date Switchers & Date Picker */}
          <div className="flex items-center flex-wrap gap-1.5">
            {/* Prev Day */}
            <button
              onClick={() => handleDateChange(yesterdayStr)}
              className="p-1.5 rounded-xl border border-black/10 hover:bg-black/5 text-xs font-semibold transition"
              title="Ngày hôm qua"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Quick date buttons */}
            <button
              onClick={() => handleDateChange(yesterdayStr)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                selectedDate === yesterdayStr
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-black/5 border-transparent hover:bg-black/10'
              }`}
            >
              Hôm Qua
            </button>

            <button
              onClick={() => handleDateChange(todayStr)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border flex items-center gap-1 ${
                selectedDate === todayStr
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-xs'
                  : 'bg-black/5 border-transparent hover:bg-black/10'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Hôm Nay</span>
            </button>

            <button
              onClick={() => handleDateChange(tomorrowStr)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                selectedDate === tomorrowStr
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-black/5 border-transparent hover:bg-black/10'
              }`}
            >
              Ngày Mai
            </button>

            {/* Next Day */}
            <button
              onClick={() => handleDateChange(tomorrowStr)}
              className="p-1.5 rounded-xl border border-black/10 hover:bg-black/5 text-xs font-semibold transition"
              title="Ngày mai"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Date Picker Input */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition focus:outline-none focus:border-[#8B1E2D] ${
                theme === 'dark' ? 'bg-[#1F1715] border-[#3F312B] text-white' : 'bg-black/5 border-black/10'
              }`}
              title="Chọn ngày bất kỳ bằng lịch"
            />

            {/* Button Lễ Trọng trong năm */}
            <button
              onClick={() => setShowFeastSelector(!showFeastSelector)}
              className="px-2.5 py-1.5 rounded-xl bg-[#C59B27]/10 text-[#855D14] dark:text-[#E5B54C] border border-[#C59B27]/30 text-xs font-semibold hover:bg-[#C59B27]/20 transition flex items-center gap-1"
              title="Chọn các ngày Đại Lễ trong Năm Phụng Vụ"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Lễ Trọng</span>
            </button>
          </div>

          {/* Reader Customizer Controls */}
          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-black/10 pt-2 sm:pt-0 sm:pl-3 w-full sm:w-auto justify-end">
            {/* Font size control */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-black/5">
              {(['text-base', 'text-lg', 'text-xl'] as ReaderFontSize[]).map((size, idx) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`w-6 h-6 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                    fontSize === size ? 'bg-[#8B1E2D] text-white shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  title={`Cỡ chữ mức ${idx + 1}`}
                >
                  {idx === 0 ? 'A-' : idx === 2 ? 'A+' : 'A'}
                </button>
              ))}
            </div>

            {/* Theme switcher */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-black/5">
              <button
                onClick={() => setTheme('parchment')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'parchment' ? 'bg-white text-[#8B1E2D] font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                title="Giao diện Mộc Bản"
              >
                Mộc
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'sepia' ? 'bg-[#FAF2E1] text-[#8B1E2D] font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                title="Giao diện Da Cừu"
              >
                Da
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'dark' ? 'bg-[#1A1412] text-[#E5B54C] font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                title="Giao diện Đêm Tối"
              >
                Đêm
              </button>
            </div>
          </div>
        </div>

        {/* Modal / Panel Chọn Lễ Trọng Trong Năm */}
        {showFeastSelector && (
          <div className={`p-4 rounded-3xl border shadow-sm space-y-3 animate-fade-in ${ts.altCard}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#855D14] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#C59B27]" />
                <span>Các Ngày Đại Lễ Trọng Trong Năm {selectedYear}</span>
              </span>
              <button
                onClick={() => setShowFeastSelector(false)}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Đóng
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {majorSolemnities.map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleDateChange(f.date);
                    setShowFeastSelector(false);
                  }}
                  className={`text-left p-2.5 rounded-xl border text-xs transition ${
                    selectedDate === f.date
                      ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] font-bold shadow-xs'
                      : 'bg-white dark:bg-[#1A1412] hover:border-[#8B1E2D]/50 border-black/10'
                  }`}
                >
                  <div className="font-semibold line-clamp-1">{f.name}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{f.date}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sacred Art Banner for the Liturgical Day */}
        <div className={`relative overflow-hidden rounded-3xl border shadow-sacred p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${ts.altCard}`}>
          <div className="space-y-3 max-w-xl z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getColorBg(reading.color)}`}>
                {reading.colorName}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-black/30 border border-black/10">
                {reading.rankName}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-black/30 border border-black/10">
                {reading.cycle}
              </span>
              {reading.secondReading && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  Có Bài Đọc II
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold pt-1 leading-tight">
              {reading.title}
            </h1>

            {reading.saintOfTheDay && (
              <p className={`text-xs md:text-sm leading-relaxed ${ts.subText}`}>
                {reading.saintOfTheDay}
              </p>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsPlayingAudio(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B1E2D] text-white hover:bg-[#701124] text-xs font-semibold shadow-sm transition"
              >
                <Volume2 className="w-4 h-4" />
                Lắng Nghe Lời Chúa
              </button>

              <button
                onClick={handleCopyFullLiturgicalReading}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  copySuccess ? 'bg-green-600 text-white border-green-600' : 'bg-white dark:bg-black/20 hover:bg-black/5 border-black/10'
                }`}
                title="Sao chép toàn văn bài đọc Thánh lễ kèm nguồn"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copySuccess ? 'Đã sao chép' : 'Sao chép bài đọc'}</span>
              </button>

              <button
                onClick={handleShareLink}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  shareSuccess ? 'bg-green-600 text-white border-green-600' : 'bg-white dark:bg-black/20 hover:bg-black/5 border-black/10'
                }`}
                title="Chia sẻ liên kết ngày phụng vụ này"
              >
                {shareSuccess ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{shareSuccess ? 'Đã lấy link' : 'Chia sẻ'}</span>
              </button>

              <Link
                href={`/suy-niem?date=${selectedDate}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#C59B27] text-white hover:bg-[#a6821e] text-xs font-semibold shadow-xs transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Xem Bài Suy Niệm</span>
              </Link>
            </div>
          </div>

          <div className="shrink-0 relative w-full md:w-56 h-40 rounded-2xl overflow-hidden border border-black/10 shadow-md">
            <img
              src={currentArtwork.thumbnailUrl}
              alt={currentArtwork.title}
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
              <span className="text-[11px] font-bold line-clamp-1">{currentArtwork.title}</span>
              <span className="text-[9px] opacity-80">{currentArtwork.artist}</span>
            </div>
          </div>
        </div>

        {/* Mobile Section Filter Pills (Dành cho điện thoại để không bị cuộn dài) */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setMobileSection('all')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mobileSection === 'all'
                ? 'bg-[#8B1E2D] text-white shadow-xs'
                : 'bg-black/5 text-stone-600 hover:bg-black/10'
            }`}
          >
            Tất Cả
          </button>
          {reading.openingPrayer && (
            <button
              onClick={() => setMobileSection('opening')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                mobileSection === 'opening'
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'bg-black/5 text-stone-600 hover:bg-black/10'
              }`}
            >
              Lời Nguyện Nhập Lễ
            </button>
          )}
          <button
            onClick={() => setMobileSection('first')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mobileSection === 'first'
                ? 'bg-[#8B1E2D] text-white shadow-xs'
                : 'bg-black/5 text-stone-600 hover:bg-black/10'
            }`}
          >
            Bài Đọc I
          </button>
          <button
            onClick={() => setMobileSection('psalm')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mobileSection === 'psalm'
                ? 'bg-[#8B1E2D] text-white shadow-xs'
                : 'bg-black/5 text-stone-600 hover:bg-black/10'
            }`}
          >
            Đáp Ca
          </button>
          {reading.secondReading && (
            <button
              onClick={() => setMobileSection('second')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                mobileSection === 'second'
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'bg-black/5 text-stone-600 hover:bg-black/10'
              }`}
            >
              Bài Đọc II
            </button>
          )}
          <button
            onClick={() => setMobileSection('gospel')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              mobileSection === 'gospel'
                ? 'bg-[#8B1E2D] text-white shadow-xs'
                : 'bg-black/5 text-stone-600 hover:bg-black/10'
            }`}
          >
            Phúc Âm
          </button>
          {reading.communionPrayer && (
            <button
              onClick={() => setMobileSection('communion')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                mobileSection === 'communion'
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'bg-black/5 text-stone-600 hover:bg-black/10'
              }`}
            >
              Hiệp Lễ
            </button>
          )}
        </div>

        {/* Liturgy Structure Notice Banner */}
        <div className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 ${ts.card}`}>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#C59B27] shrink-0" />
            <span className={ts.subText}>
              Trình tự chuẩn Thánh lễ: <strong>1. Lời nguyện nhập lễ</strong> &bull; <strong>2. Phụng vụ Lời Chúa</strong> &bull; <strong>3. Lời nguyện hiệp lễ</strong>.
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-[#855D14] font-semibold shrink-0">
            Ủy Ban Phụng Tự / HĐGMVN
          </span>
        </div>

        {/* ================================================================== */}
        {/* THỨ TỰ I: LỜI NGUYỆN NHẬP LỄ (COLLECT - TRÍCH SÁCH LỄ RÔMA)        */}
        {/* ================================================================== */}
        {reading.openingPrayer && (mobileSection === 'all' || mobileSection === 'opening') && (
          <section className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-3 ${ts.altCard}`}>
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <span className="text-xs font-bold text-[#855D14] dark:text-[#E5B54C] uppercase tracking-wider flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#C59B27]" />
                <span>Nghi Thức Đầu Lễ &bull; Lời Nguyện Nhập Lễ</span>
              </span>
              <span className="text-[10px] text-stone-400 font-semibold">
                Sách Lễ Rôma
              </span>
            </div>

            <div className={`font-serif ${fontSize} italic leading-relaxed pt-1`}>
              &ldquo;{reading.openingPrayer}&rdquo;
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* THỨ TỰ II: PHỤNG VỤ LỜI CHÚA (SÁCH BÀI ĐỌC THÁNH LỄ)               */}
        {/* ================================================================== */}
        
        {/* II.A: BÀI ĐỌC I */}
        {(mobileSection === 'all' || mobileSection === 'first') && (
          <section className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 ${ts.card}`}>
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div>
                <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] uppercase tracking-wider block">
                  Phụng Vụ Lời Chúa &bull; Bài Đọc I
                </span>
                <h2 className="font-serif text-base md:text-lg font-bold">
                  {reading.firstReading.passage} ({reading.firstReading.reference})
                </h2>
              </div>

              <Link
                href={`/kinh-thanh?q=${encodeURIComponent(reading.firstReading.reference)}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#8B1E2D] text-stone-700 dark:text-stone-300 hover:text-white text-xs font-semibold transition"
                title="Mở toàn văn đoạn Kinh Thánh này"
              >
                <span>Toàn văn</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {reading.firstReading.theme && (
              <p className="text-xs font-semibold text-[#855D14] dark:text-[#E5B54C] italic">
                &ldquo;{reading.firstReading.theme}&rdquo;
              </p>
            )}

            <div className={`font-serif ${fontSize} leading-relaxed whitespace-pre-line`}>
              {reading.firstReading.text}
            </div>

            <div className="pt-2 text-right">
              <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] font-serif">
                Đó là Lời Chúa. &mdash; Tạ ơn Chúa.
              </span>
            </div>
          </section>
        )}

        {/* II.B: THÁNH VỊNH ĐÁP CA */}
        {(mobileSection === 'all' || mobileSection === 'psalm') && (
          <section className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 ${ts.altCard}`}>
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div>
                <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
                  Phụng Vụ Lời Chúa &bull; Thánh Vịnh Đáp Ca
                </span>
                <h2 className="font-serif text-base md:text-lg font-bold">
                  {reading.responsorialPsalm.reference}
                </h2>
              </div>

              <Link
                href={`/kinh-thanh?q=${encodeURIComponent(reading.responsorialPsalm.reference.split('(')[0].trim())}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#C59B27] text-stone-700 dark:text-stone-300 hover:text-white text-xs font-semibold transition"
                title="Đọc toàn bộ Thánh vịnh trong Kinh Thánh"
              >
                <span>Thánh vịnh</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Refrain Điệp Ca */}
            <div className="p-4 rounded-2xl bg-white dark:bg-black/30 border border-[#C59B27]/40 text-center shadow-xs">
              <span className="text-xs font-bold text-[#855D14] dark:text-[#E5B54C] uppercase block mb-1">
                Đáp:
              </span>
              <p className={`font-serif ${fontSize} font-bold italic text-[#8B1E2D] dark:text-[#E5B54C]`}>
                &ldquo;{reading.responsorialPsalm.refrain}&rdquo;
              </p>
            </div>

            {/* Psalm Verses */}
            <div className="space-y-4 pt-1">
              {reading.responsorialPsalm.verses.map((v, idx) => (
                <div key={idx} className={`font-serif ${fontSize} leading-relaxed pl-4 border-l-2 border-[#C59B27]/50`}>
                  {v}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* II.C: BÀI ĐỌC II (NẾU CÓ - CHÚA NHẬT HOẶC ĐẠI LỄ TRỌNG) */}
        {reading.secondReading && (mobileSection === 'all' || mobileSection === 'second') && (
          <section className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 ${ts.card}`}>
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div>
                <span className="text-xs font-bold text-[#855D14] dark:text-[#E5B54C] uppercase tracking-wider block">
                  Phụng Vụ Lời Chúa &bull; Bài Đọc II
                </span>
                <h2 className="font-serif text-base md:text-lg font-bold">
                  {reading.secondReading.passage} ({reading.secondReading.reference})
                </h2>
              </div>

              <Link
                href={`/kinh-thanh?q=${encodeURIComponent(reading.secondReading.reference)}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#8B1E2D] text-stone-700 dark:text-stone-300 hover:text-white text-xs font-semibold transition"
                title="Mở toàn văn đoạn Kinh Thánh này"
              >
                <span>Toàn văn</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {reading.secondReading.theme && (
              <p className="text-xs font-semibold text-[#855D14] dark:text-[#E5B54C] italic">
                &ldquo;{reading.secondReading.theme}&rdquo;
              </p>
            )}

            <div className={`font-serif ${fontSize} leading-relaxed whitespace-pre-line`}>
              {reading.secondReading.text}
            </div>

            <div className="pt-2 text-right">
              <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] font-serif">
                Đó là Lời Chúa. &mdash; Tạ ơn Chúa.
              </span>
            </div>
          </section>
        )}

        {/* II.D: TUNG HÔ TIN MỪNG (ALLELUIA) */}
        {reading.gospelAcclamation && (mobileSection === 'all' || mobileSection === 'gospel') && (
          <div className={`p-4 rounded-2xl border text-center space-y-1 ${ts.card}`}>
            <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] uppercase tracking-wider block">
              Tung Hô Tin Mừng ({reading.gospelAcclamation.verse})
            </span>
            <p className={`font-serif ${fontSize} italic`}>
              &ldquo;{reading.gospelAcclamation.text}&rdquo;
            </p>
          </div>
        )}

        {/* II.E: TIN MỪNG (GOSPEL) - KHU VỰC TRỌNG THỂ NHẤT */}
        {(mobileSection === 'all' || mobileSection === 'gospel') && (
          <section className={`p-6 md:p-8 rounded-3xl shadow-md space-y-4 relative ${ts.gospelCard}`}>
            <div className="flex items-center justify-between border-b border-rose-100 dark:border-stone-800 pb-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8B1E2D] text-white shadow-sm mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tin Mừng (Phúc Âm)
                </span>
                <h2 className="font-serif text-lg md:text-xl font-bold">
                  {reading.gospel.passage} ({reading.gospel.reference})
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/kinh-thanh?q=${encodeURIComponent(reading.gospel.reference)}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/5 hover:bg-black/10 text-xs font-semibold transition"
                  title="Đọc toàn bộ chương Tin Mừng"
                >
                  <span>Chương</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <Link
                  href={`/tao-anh?quote=${encodeURIComponent(reading.gospel.theme || '')}&ref=${encodeURIComponent(reading.gospel.reference)}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E2D] dark:text-[#E5B54C] hover:underline"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Tạo Ảnh Lời Chúa</span>
                </Link>
              </div>
            </div>

            {reading.gospel.theme && (
              <p className="text-sm font-semibold text-[#8B1E2D] dark:text-[#E5B54C] italic">
                &ldquo;{reading.gospel.theme}&rdquo;
              </p>
            )}

            <div className={`font-serif ${fontSize} leading-relaxed whitespace-pre-line pl-2`}>
              {reading.gospel.text}
            </div>

            <div className="pt-2 text-right">
              <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] font-serif">
                Đó là Lời Chúa. &mdash; Lạy Chúa Kitô, ngợi khen Chúa.
              </span>
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* THỨ TỰ III: LỜI NGUYỆN HIỆP LỄ & LỜI NGUYỆN TÍN HỮU               */}
        {/* ================================================================== */}
        
        {/* III.A: Lời Nguyện Tín Hữu (nếu có) */}
        {reading.prayerOfFaithful && reading.prayerOfFaithful.length > 0 && (mobileSection === 'all' || mobileSection === 'communion') && (
          <section className={`p-6 rounded-3xl border space-y-3 ${ts.card}`}>
            <h3 className="font-serif text-sm font-bold text-[#855D14] dark:text-[#E5B54C] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C59B27]" />
              <span>Lời Nguyện Tín Hữu (Lời Nguyện Chung)</span>
            </h3>
            <div className="space-y-2">
              {reading.prayerOfFaithful.map((prayer, idx) => (
                <div key={idx} className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${ts.altCard}`}>
                  <span className="w-5 h-5 rounded-full bg-[#8B1E2D] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{prayer}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* III.B: Lời Nguyện Hiệp Lễ (Trích Sách Lễ Rôma) */}
        {reading.communionPrayer && (mobileSection === 'all' || mobileSection === 'communion') && (
          <section className={`p-6 rounded-3xl border space-y-2 ${ts.altCard}`}>
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <h3 className="font-serif text-sm font-bold text-[#855D14] dark:text-[#E5B54C] flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#C59B27]" />
                <span>Nghi Thức Hiệp Lễ &bull; Lời Nguyện Hiệp Lễ</span>
              </h3>
              <span className="text-[10px] text-stone-400 font-semibold">
                Sách Lễ Rôma
              </span>
            </div>
            <p className={`font-serif ${fontSize} italic leading-relaxed pt-1`}>
              &ldquo;{reading.communionPrayer}&rdquo;
            </p>
          </section>
        )}

        {/* III.C: Gợi ý Giáo lý Hội Thánh Công Giáo liên quan */}
        <div className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${ts.card}`}>
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] uppercase tracking-wider block">
              Giáo Lý Hội Thánh Công Giáo Liên Quan
            </span>
            <p className={`text-xs ${ts.subText}`}>
              Học hỏi thêm nền tảng đức tin về phụng vụ, bí tích và thánh hóa đời sống.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/giao-ly?num=1066"
              className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#8B1E2D] text-stone-700 dark:text-stone-300 hover:text-white text-xs font-semibold transition"
            >
              GLHTCG #1066 (Phụng Vụ)
            </Link>
            <Link
              href="/giao-ly?num=1324"
              className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#8B1E2D] text-stone-700 dark:text-stone-300 hover:text-white text-xs font-semibold transition"
            >
              GLHTCG #1324 (Thánh Thể)
            </Link>
          </div>
        </div>

        {/* Source and Copyright Attribution */}
        <div className="pt-4 border-t border-black/10 text-[11px] text-stone-400 leading-relaxed space-y-1">
          <div>
            <strong>Nguồn văn bản Phụng vụ:</strong> Bản văn Bài đọc trích từ <em>Sách Bài Đọc Thánh Lễ</em>; Lời nguyện nhập lễ và hiệp lễ trích từ <em>Sách Lễ Rôma (Missale Romanum)</em> &mdash; Ủy ban Phụng tự trực thuộc Hội đồng Giám mục Việt Nam (HĐGMVN).
          </div>
          <div>
            Website phục vụ việc cầu nguyện, suy niệm Lời Chúa cá nhân và gia đình. Không thay thế sách phụng vụ chính thức dùng trên bàn thánh.
          </div>
        </div>

        {/* Sticky Audio Player */}
        {isPlayingAudio && (
          <AudioPlayerBar
            title={`Phụng Vụ: ${reading.title}`}
            passageText={getFullLiturgicalAudioText()}
            onClose={() => setIsPlayingAudio(false)}
          />
        )}
      </div>
    </div>
  );
}

export default function LiturgicalReadingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] p-8 flex items-center justify-center">
        <div className="text-sm font-semibold text-[#8B1E2D] animate-pulse">
          Đang tải bài đọc phụng vụ...
        </div>
      </div>
    }>
      <LiturgicalContent />
    </Suspense>
  );
}
