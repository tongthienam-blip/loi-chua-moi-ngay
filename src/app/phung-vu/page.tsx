'use client';

import React, { useState, useMemo } from 'react';
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
  Palette
} from 'lucide-react';
import { getLiturgicalReadingByDate, LITURGICAL_READINGS_ARCHIVE } from '@/data/liturgical-readings';
import { getArtworkForLiturgicalColor, SacredArtwork } from '@/data/sacred-art';
import { DailyLiturgicalReading } from '@/types';
import { AudioPlayerBar } from '@/components/AudioPlayerBar';
import Link from 'next/link';

type ReaderTheme = 'parchment' | 'sepia' | 'dark';
type ReaderFontSize = 'text-base' | 'text-lg' | 'text-xl';

export default function LiturgicalReadingsPage() {
  const [selectedDate, setSelectedDate] = useState('2026-11-04');
  const [reading, setReading] = useState<DailyLiturgicalReading>(() =>
    getLiturgicalReadingByDate('2026-11-04')
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [theme, setTheme] = useState<ReaderTheme>('parchment');
  const [fontSize, setFontSize] = useState<ReaderFontSize>('text-base');

  const handleDateChange = (newDateStr: string) => {
    setSelectedDate(newDateStr);
    const data = getLiturgicalReadingByDate(newDateStr);
    setReading(data);
  };

  const getFullLiturgicalAudioText = () => {
    let text = `${reading.title}. `;
    text += `Bài Đọc Một: ${reading.firstReading.passage}. ${reading.firstReading.text}. `;
    text += `Đáp ca: ${reading.responsorialPsalm.refrain}. `;
    text += `Phúc Âm: ${reading.gospel.passage}. ${reading.gospel.text}`;
    return text;
  };

  const currentArtwork: SacredArtwork = useMemo(() => {
    return getArtworkForLiturgicalColor(reading.color);
  }, [reading.color]);

  const getColorBg = (color: string) => {
    switch (color) {
      case 'WHITE':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'RED':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'PURPLE':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'GREEN':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-300';
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
          gospelCard: 'bg-[#FAF2E1] border-[#8B1E2D]',
          accentText: 'text-[#8B1E2D]',
          subText: 'text-[#6A5342]'
        };
      case 'dark':
        return {
          wrapper: 'bg-[#1A1412] text-[#F0E6D2]',
          card: 'bg-[#271E1B] border-[#3F312B]',
          altCard: 'bg-[#312622] border-[#4E3D36]',
          gospelCard: 'bg-[#271E1B] border-[#C59B27]',
          accentText: 'text-[#E5B54C]',
          subText: 'text-[#B8A398]'
        };
      case 'parchment':
      default:
        return {
          wrapper: 'bg-[#FAF7F2] text-[#2D1E18]',
          card: 'bg-white border-[#E8DFC8]',
          altCard: 'bg-[#FAF4E8] border-[#E8DFC8]',
          gospelCard: 'bg-white border-2 border-[#8B1E2D]/40',
          accentText: 'text-[#8B1E2D]',
          subText: 'text-[#5D4037]'
        };
    }
  };

  const ts = getThemeStyles();

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${ts.wrapper}`}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        
        {/* 1. Date Switcher & Reader Controls Toolbar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl border shadow-sm ${ts.card}`}>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#8B1E2D]" />
            <span className="font-serif text-sm font-bold">
              Phụng Vụ Lời Chúa Mỗi Ngày
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* Quick date buttons */}
            <button
              onClick={() => handleDateChange('2026-11-03')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                selectedDate === '2026-11-03'
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-black/5 border-transparent hover:bg-black/10'
              }`}
            >
              Hôm Qua
            </button>

            <button
              onClick={() => handleDateChange('2026-11-04')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                selectedDate === '2026-11-04'
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-black/5 border-transparent hover:bg-black/10'
              }`}
            >
              Hôm Nay
            </button>

            <button
              onClick={() => handleDateChange('2026-11-05')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                selectedDate === '2026-11-05'
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-black/5 border-transparent hover:bg-black/10'
              }`}
            >
              Ngày Mai
            </button>

            {/* Date Picker Input */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-black/5 text-xs font-semibold border border-black/10 focus:outline-none"
            />

            {/* Font size control */}
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/5">
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

            {/* Theme selector */}
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/5">
              <button
                onClick={() => setTheme('parchment')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'parchment' ? 'bg-white text-[#8B1E2D] font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Mộc
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'sepia' ? 'bg-[#FAF2E1] text-[#8B1E2D] font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Da
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'dark' ? 'bg-[#1A1412] text-[#E5B54C] font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Đêm
              </button>
            </div>
          </div>
        </div>

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
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold pt-1">
              {reading.title}
            </h1>

            {reading.saintOfTheDay && (
              <p className={`text-xs md:text-sm leading-relaxed ${ts.subText}`}>
                {reading.saintOfTheDay}
              </p>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B1E2D] text-white hover:bg-[#701124] text-xs font-semibold shadow-sm transition"
              >
                <Volume2 className="w-4 h-4" />
                Lắng Nghe Lời Chúa
              </button>
              <Link
                href={`/tao-anh?quote=${encodeURIComponent(reading.gospel.theme || '')}&ref=${encodeURIComponent(reading.gospel.reference)}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-black/20 hover:bg-black/5 text-xs font-semibold border border-black/10 transition"
              >
                <Share2 className="w-4 h-4" />
                Tạo Ảnh Chia Sẻ
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

        {/* 2. BÀI ĐỌC I */}
        <section className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 ${ts.card}`}>
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <div>
              <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] uppercase tracking-wider block">
                Bài Đọc I
              </span>
              <h2 className="font-serif text-base font-bold">
                {reading.firstReading.passage} ({reading.firstReading.reference})
              </h2>
            </div>
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
              Đó là Lời Chúa. - Tạ ơn Chúa.
            </span>
          </div>
        </section>

        {/* 3. THÁNH VỊNH ĐÁP CA */}
        <section className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 ${ts.altCard}`}>
          <div className="border-b border-black/10 pb-3">
            <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
              Thánh Vịnh Đáp Ca
            </span>
            <h2 className="font-serif text-base font-bold">
              {reading.responsorialPsalm.reference}
            </h2>
          </div>

          {/* Refrain Điệp Ca */}
          <div className="p-4 rounded-2xl bg-[#FAF4E8] dark:bg-black/20 border border-[#C59B27]/30 text-center">
            <span className="text-xs font-bold text-[#855D14] dark:text-[#E5B54C] uppercase block mb-1">
              Đáp:
            </span>
            <p className={`font-serif ${fontSize} font-bold italic`}>
              {reading.responsorialPsalm.refrain}
            </p>
          </div>

          {/* Psalm Verses */}
          <div className="space-y-4 pt-2">
            {reading.responsorialPsalm.verses.map((v, idx) => (
              <div key={idx} className={`font-serif ${fontSize} leading-relaxed pl-4 border-l-2 border-[#C59B27]/40`}>
                {v}
              </div>
            ))}
          </div>
        </section>

        {/* 4. TUNG HÔ TIN MỪNG (ALLELUIA) */}
        {reading.gospelAcclamation && (
          <div className={`p-4 rounded-2xl border text-center space-y-1 ${ts.card}`}>
            <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] uppercase tracking-wider block">
              Tung Hô Tin Mừng ({reading.gospelAcclamation.verse})
            </span>
            <p className={`font-serif ${fontSize} italic`}>
              &ldquo;{reading.gospelAcclamation.text}&rdquo;
            </p>
          </div>
        )}

        {/* 5. TIN MỪNG (GOSPEL) - KHU VỰC TRANG TRỌNG NHẤT */}
        <section className={`p-6 md:p-8 rounded-3xl shadow-md space-y-4 relative ${ts.gospelCard}`}>
          <div className="flex items-center justify-between border-b border-rose-100 dark:border-stone-800 pb-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8B1E2D] text-white shadow-sm mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Phúc Âm
              </span>
              <h2 className="font-serif text-lg font-bold">
                {reading.gospel.passage} ({reading.gospel.reference})
              </h2>
            </div>

            <Link
              href={`/tao-anh?quote=${encodeURIComponent(reading.gospel.theme || '')}&ref=${encodeURIComponent(reading.gospel.reference)}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E2D] dark:text-[#E5B54C] hover:underline"
            >
              <Share2 className="w-4 h-4" />
              Tạo Ảnh Trích Dẫn
            </Link>
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
              Đó là Lời Chúa. - Lạy Chúa Kitô, ngợi khen Chúa.
            </span>
          </div>
        </section>

        {/* 6. LỜI NGUYỆN PHỤNG VỤ */}
        {reading.openingPrayer && (
          <section className={`p-6 rounded-3xl border space-y-2 ${ts.altCard}`}>
            <h3 className="font-serif text-sm font-bold text-[#855D14] dark:text-[#E5B54C] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#C59B27]" />
              Lời Nguyện Nhập Lễ
            </h3>
            <p className={`font-serif ${fontSize} italic leading-relaxed`}>
              &ldquo;{reading.openingPrayer}&rdquo;
            </p>
          </section>
        )}

        {/* Source Attribution Note */}
        <div className={`text-center text-xs pt-4 ${ts.subText}`}>
          {reading.sourceNote}
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
