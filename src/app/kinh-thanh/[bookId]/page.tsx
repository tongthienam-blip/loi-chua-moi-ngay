'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Volume2, 
  Type, 
  Bookmark, 
  ArrowLeft, 
  BookOpen, 
  Compass, 
  Share2,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  BookMarked,
  Sparkles,
  Copy,
  Check,
  Search,
  Palette,
  Layers,
  FileText,
  CornerDownRight,
  ShieldCheck,
  Upload,
  Heart
} from 'lucide-react';
import { CATHOLIC_BIBLE_BOOKS } from '@/data/catholic-books';
import { getChapterData } from '@/data/sample-verses';
import { getArtworkForBook, SacredArtwork } from '@/data/sacred-art';
import { BibleBook, BibleChapter, BibleVerse } from '@/types';
import { VerseDetailModal } from '@/components/VerseDetailModal';
import { BookIntroModal } from '@/components/BookIntroModal';
import { AudioPlayerBar } from '@/components/AudioPlayerBar';
import { BibleReaderSkeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/EmptyState';
import { BibleStore } from '@/lib/bible-store';
import { parseScriptureAddress } from '@/lib/bible/address-parser';

type ReaderTheme = 'parchment' | 'sepia' | 'dark';
type ReaderFontSize = 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl';

function BibleReaderContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookId = (params?.bookId as string) || 'gen';
  const chapterParam = parseInt(searchParams.get('chapter') || '1', 10);

  const [currentBook, setCurrentBook] = useState<BibleBook | null>(null);
  const [currentChapter, setCurrentChapter] = useState<BibleChapter | null>(null);
  const [chapterNum, setChapterNum] = useState<number>(chapterParam);
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [showBookIntro, setShowBookIntro] = useState(false);
  const [fontSize, setFontSize] = useState<ReaderFontSize>('text-lg');
  const [theme, setTheme] = useState<ReaderTheme>('parchment');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'reading' | 'study'>('reading');

  // Quick Address Jump State
  const [jumpAddress, setJumpAddress] = useState('');
  const [jumpError, setJumpError] = useState('');
  const [copiedVerseId, setCopiedVerseId] = useState<string | null>(null);

  // Book Navigation Index
  const currentBookIndex = useMemo(() => {
    return CATHOLIC_BIBLE_BOOKS.findIndex((b) => b.id === bookId);
  }, [bookId]);

  const prevBook = currentBookIndex > 0 ? CATHOLIC_BIBLE_BOOKS[currentBookIndex - 1] : null;
  const nextBook = currentBookIndex >= 0 && currentBookIndex < CATHOLIC_BIBLE_BOOKS.length - 1 
    ? CATHOLIC_BIBLE_BOOKS[currentBookIndex + 1] 
    : null;

  useEffect(() => {
    async function fetchBibleData() {
      setIsLoading(true);
      const book = CATHOLIC_BIBLE_BOOKS.find((b) => b.id === bookId);
      if (book) {
        setCurrentBook(book);
        setChapterNum(chapterParam);

        try {
          const res = await fetch(`/api/bible-fetch?book=${book.id}&chapter=${chapterParam}`);
          const data = await res.json();
          if (data.success) {
            setCurrentChapter({
              bookId: book.id,
              chapter: chapterParam,
              content: data.html,
              verses: []
            });
          }
        } catch (err) {
          console.error('Lỗi tải dữ liệu augustino:', err);
        }

        BibleStore.recordReadingActivity();
        BibleStore.saveLastReadLocation(book.id, chapterParam);
      }
      setIsLoading(false);
    }
    fetchBibleData();
  }, [bookId, chapterParam]);

  const currentArtwork: SacredArtwork = useMemo(() => {
    return getArtworkForBook(bookId);
  }, [bookId]);

  const getThemeStyles = () => {
    switch (theme) {
      case 'sepia':
        return {
          wrapper: 'bg-[#F4ECD8] text-[#3D2C1E]',
          card: 'bg-[#FAF2E1] border-[#DFD1B5]',
          altCard: 'bg-[#EFE4CC] border-[#DFD1B5]',
          verseHover: 'hover:bg-[#EFE4CC]',
          accentText: 'text-[#8B1E2D]',
          subText: 'text-[#6A5342]'
        };
      case 'dark':
        return {
          wrapper: 'bg-[#1A1412] text-[#F0E6D2]',
          card: 'bg-[#271E1B] border-[#3F312B]',
          altCard: 'bg-[#312622] border-[#4E3D36]',
          verseHover: 'hover:bg-[#312622]',
          accentText: 'text-[#E5B54C]',
          subText: 'text-[#B8A398]'
        };
      case 'parchment':
      default:
        return {
          wrapper: 'bg-[#FAF7F2] text-[#2D1E18]',
          card: 'bg-white border-[#E8DFC8]',
          altCard: 'bg-[#FAF4E8] border-[#E8DFC8]',
          verseHover: 'hover:bg-[#FAF7F2]',
          accentText: 'text-[#8B1E2D]',
          subText: 'text-[#5D4037]'
        };
    }
  };

  const ts = getThemeStyles();

  if (isLoading) {
    return <BibleReaderSkeleton />;
  }

  if (!currentBook) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <EmptyState
          type="reading"
          title="Không tìm thấy sách Kinh Thánh"
          description="Sách Kinh Thánh bạn yêu cầu không tồn tại trong danh mục 73 sách Công giáo."
          actionText="Về Thư Viện 73 Sách"
          onAction={() => router.push('/kinh-thanh')}
        />
      </div>
    );
  }

  const handleChapterChange = (newCh: number) => {
    if (newCh >= 1 && newCh <= currentBook.chaptersCount) {
      router.push(`/kinh-thanh/${currentBook.id}?chapter=${newCh}`);
    }
  };

  const handleQuickJump = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jumpAddress.trim()) return;

    const parsed = parseScriptureAddress(jumpAddress);
    if (!parsed || !parsed.isValid) {
      setJumpError('Địa chỉ chưa nhận diện được. Hãy thử: St 1,1; Ga 3,16; Rm 8,28; Tv 23,1');
      setTimeout(() => setJumpError(''), 4000);
      return;
    }

    setJumpError('');
    setJumpAddress('');
    router.push(`/kinh-thanh/${parsed.bookId}?chapter=${parsed.chapter}${parsed.verse ? `#verse-${parsed.verse}` : ''}`);
  };

  const handleCopyVerse = (verse: BibleVerse, e: React.MouseEvent) => {
    e.stopPropagation();
    const formatted = `"${verse.text}" (${currentBook.name} ${chapterNum},${verse.verseNumber}) — Bản dịch Phụng Vụ Công Giáo`;
    navigator.clipboard.writeText(formatted);
    setCopiedVerseId(verse.id);
    setTimeout(() => setCopiedVerseId(null), 2000);
  };

  const handleShareVerse = async (verse: BibleVerse, e: React.MouseEvent) => {
    e.stopPropagation();
    const formatted = `"${verse.text}" (${currentBook.name} ${chapterNum},${verse.verseNumber})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentBook.name} ${chapterNum},${verse.verseNumber}`,
          text: formatted,
          url: window.location.href
        });
        return;
      } catch (err) {
        // User cancelled or not supported
      }
    }
    navigator.clipboard.writeText(formatted);
    setCopiedVerseId(verse.id);
    setTimeout(() => setCopiedVerseId(null), 2000);
  };

  const getFullChapterTextForAudio = () => {
    if (!currentChapter || currentChapter.verses.length === 0) return '';
    return currentChapter.verses.map((v) => `Câu ${v.verseNumber}: ${v.text}`).join('. ');
  };

  const cycleFontSize = () => {
    const sizes: ReaderFontSize[] = [
      'text-base',
      'text-lg',
      'text-xl',
      'text-2xl',
    ];
    const nextIdx = (sizes.indexOf(fontSize) + 1) % sizes.length;
    setFontSize(sizes[nextIdx]);
  };

  // --------------------------------------------------------------------------
  // FOCUS MODE (Chế độ đọc Chuyên tâm / Tĩnh nguyện)
  // --------------------------------------------------------------------------
  if (isFocusMode && currentChapter) {
    return (
      <div className={`fixed inset-0 z-50 overflow-y-auto px-4 sm:px-8 py-8 transition-colors duration-300 flex flex-col justify-between ${ts.wrapper}`}>
        <div className="max-w-3xl mx-auto w-full space-y-8">
          {/* Top Focus Toolbar */}
          <div className="flex items-center justify-between pb-4 border-b border-black/10">
            <div>
              <span className="text-[11px] font-semibold text-[#855D14] uppercase tracking-wider">
                Chế độ đọc chuyên tâm &bull; {currentBook.categoryName}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#8B1E2D] dark:text-[#E5B54C]">
                {currentBook.name} &bull; Chương {chapterNum}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/5">
                <button
                  onClick={() => setTheme('parchment')}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold ${theme === 'parchment' ? 'bg-white text-[#8B1E2D] font-bold shadow-xs' : 'opacity-70'}`}
                >
                  Mộc
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold ${theme === 'sepia' ? 'bg-[#FAF2E1] text-[#8B1E2D] font-bold shadow-xs' : 'opacity-70'}`}
                >
                  Da
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold ${theme === 'dark' ? 'bg-[#1A1412] text-[#E5B54C] font-bold shadow-xs' : 'opacity-70'}`}
                >
                  Đêm
                </button>
              </div>

              <button
                onClick={cycleFontSize}
                className={`p-2 rounded-xl border text-xs font-semibold shadow-xs ${ts.card}`}
                title="Đổi cỡ chữ"
              >
                <Type className="w-4 h-4 text-[#8B1E2D] dark:text-[#E5B54C]" />
              </button>

              <button
                onClick={() => setIsPlayingAudio(true)}
                className={`p-2 rounded-xl border text-xs font-semibold shadow-xs ${ts.card}`}
                title="Nghe đọc Lời Chúa"
              >
                <Volume2 className="w-4 h-4 text-[#8B1E2D] dark:text-[#E5B54C]" />
              </button>

              <button
                onClick={() => setIsFocusMode(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8B1E2D] text-white text-xs font-semibold shadow-sm hover:bg-[#701124] transition"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Thoát Chuyên Tâm</span>
              </button>
            </div>
          </div>

          {/* Scripture Verses in Focus Mode */}
          <div className="space-y-6 font-serif">
            {currentChapter.verses.map((verse) => (
              <p
                key={verse.id}
                id={`verse-${verse.verseNumber}`}
                onClick={() => setSelectedVerse(verse)}
                className={`${fontSize} leading-relaxed cursor-pointer hover:text-[#8B1E2D] dark:hover:text-[#E5B54C] transition`}
              >
                <sup className="font-sans font-bold text-xs text-[#8B1E2D] dark:text-[#E5B54C] mr-2">
                  {verse.verseNumber}
                </sup>
                {verse.text}
              </p>
            ))}
          </div>

          {/* Navigation Bar in Focus Mode */}
          <div className="flex items-center justify-between pt-8 border-t border-black/10 pb-12">
            <button
              onClick={() => handleChapterChange(chapterNum - 1)}
              disabled={chapterNum <= 1}
              className={`px-4 py-2 rounded-xl border text-xs font-semibold disabled:opacity-40 ${ts.card}`}
            >
              &larr; Chương Trước
            </button>
            <span className="text-xs font-serif font-bold opacity-60">
              {chapterNum} / {currentBook.chaptersCount}
            </span>
            <button
              onClick={() => handleChapterChange(chapterNum + 1)}
              disabled={chapterNum >= currentBook.chaptersCount}
              className={`px-4 py-2 rounded-xl border text-xs font-semibold disabled:opacity-40 ${ts.card}`}
            >
              Chương Sau &rarr;
            </button>
          </div>
        </div>

        {/* Audio Player Bar */}
        {isPlayingAudio && (
          <AudioPlayerBar
            title={`${currentBook.name} • Chương ${chapterNum}`}
            passageText={getFullChapterTextForAudio()}
            onClose={() => setIsPlayingAudio(false)}
          />
        )}

        {/* Verse Detail Modal */}
        {selectedVerse && (
          <VerseDetailModal
            verse={selectedVerse}
            bookName={currentBook.name}
            onClose={() => setSelectedVerse(null)}
          />
        )}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // STANDARD READER & RESEARCH VIEW
  // --------------------------------------------------------------------------
  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 pb-24 md:pb-8 ${ts.wrapper}`}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        
        {/* 1. Header Toolbar & Quick Scripture Address Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10">
          <div className="flex items-center gap-3">
            <Link
              href="/kinh-thanh"
              className={`p-2 rounded-xl border transition ${ts.card} hover:opacity-80`}
              title="Về danh sách 73 sách"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#855D14] uppercase tracking-wider">
                  {currentBook.categoryName} &bull; Sách thứ {currentBook.order}/73
                </span>
                <button
                  onClick={() => setShowBookIntro(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8B1E2D] dark:text-[#E5B54C] hover:underline"
                >
                  <Info className="w-3.5 h-3.5" />
                  12 Điểm Thần Học
                </button>
              </div>
              <h1 className="font-serif text-2xl font-bold flex items-center gap-2">
                <span>{currentBook.name}</span>
                <span className="text-sm font-sans font-normal opacity-60">({currentBook.latinName})</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#8B1E2D]/10 text-[#8B1E2D] dark:text-[#E5B54C] font-sans font-bold">
                  {currentBook.abbreviation}
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Jump Input Form */}
          <form onSubmit={handleQuickJump} className="relative flex items-center">
            <input
              type="text"
              value={jumpAddress}
              onChange={(e) => setJumpAddress(e.target.value)}
              placeholder="Nhảy nhanh: St 1,1; Ga 3,16..."
              className="w-48 sm:w-56 pl-8 pr-12 py-1.5 rounded-xl bg-black/5 text-xs font-semibold border border-black/10 focus:outline-none focus:ring-1 focus:ring-[#8B1E2D]"
            />
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-stone-400 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1 px-2 py-0.5 rounded-lg bg-[#8B1E2D] text-white text-[10px] font-bold"
            >
              Đi
            </button>
          </form>
        </div>

        {jumpError && (
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs">
            {jumpError}
          </div>
        )}

        {/* 2. Sub-Toolbar: Two Mode Switcher (ĐỌC vs NGHIÊN CỨU) & Controls */}
        <div className={`p-3 rounded-2xl border shadow-xs flex flex-wrap items-center justify-between gap-3 ${ts.card}`}>
          {/* Two Distinct Modes: ĐỌC KINH THÁNH vs NGHIÊN CỨU */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5">
            <button
              onClick={() => setActiveTab('reading')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'reading'
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'text-stone-600 hover:text-black dark:text-stone-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Đọc Kinh Thánh
            </button>
            <button
              onClick={() => setActiveTab('study')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'study'
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'text-stone-600 hover:text-black dark:text-stone-300'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Nghiên Cứu Thần Học
            </button>
          </div>

          {/* Reader Controls Toolbar */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Chapter Selector Dropdown */}
            <select
              value={chapterNum}
              onChange={(e) => handleChapterChange(parseInt(e.target.value, 10))}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-xs cursor-pointer focus:outline-none ${ts.card}`}
            >
              {Array.from({ length: currentBook.chaptersCount }, (_, i) => i + 1).map((ch) => (
                <option key={ch} value={ch}>
                  Chương {ch} / {currentBook.chaptersCount}
                </option>
              ))}
            </select>

            {/* Font Size Toggle */}
            <button
              onClick={cycleFontSize}
              className={`p-2 rounded-xl border text-xs font-semibold shadow-xs transition flex items-center gap-1 ${ts.card}`}
              title="Đổi cỡ chữ"
            >
              <Type className="w-4 h-4 text-[#8B1E2D] dark:text-[#E5B54C]" />
            </button>

            {/* Theme Toggle Buttons */}
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/5">
              <button
                onClick={() => setTheme('parchment')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'parchment' ? 'bg-white text-[#8B1E2D] font-bold shadow-xs' : 'opacity-70'
                }`}
                title="Giao diện Mộc bản"
              >
                Mộc
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'sepia' ? 'bg-[#FAF2E1] text-[#8B1E2D] font-bold shadow-xs' : 'opacity-70'
                }`}
                title="Giao diện Da ngà"
              >
                Da
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                  theme === 'dark' ? 'bg-[#1A1412] text-[#E5B54C] font-bold shadow-xs' : 'opacity-70'
                }`}
                title="Giao diện Ban đêm"
              >
                Đêm
              </button>
            </div>

            {/* Focus Mode Toggle */}
            <button
              onClick={() => setIsFocusMode(true)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-xs transition ${ts.card}`}
              title="Chế độ đọc chuyên tâm"
            >
              <Maximize2 className="w-4 h-4 text-[#855D14]" />
              <span className="hidden sm:inline">Chuyên Tâm</span>
            </button>

            {/* Audio Chapter */}
            <button
              onClick={() => setIsPlayingAudio(true)}
              disabled={!currentChapter || currentChapter.verses.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B1E2D] disabled:opacity-40 text-white text-xs font-semibold shadow-sm hover:bg-[#701124] transition"
              title="Nghe đọc chương này"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Nghe Lời Chúa</span>
            </button>
          </div>
        </div>

        {/* 3. Book Switching Quick Bar (Prev Book / Next Book) */}
        <div className="flex items-center justify-between text-xs px-1">
          {prevBook ? (
            <Link
              href={`/kinh-thanh/${prevBook.id}?chapter=1`}
              className="inline-flex items-center gap-1 text-stone-500 hover:text-[#8B1E2D] dark:hover:text-[#E5B54C] font-semibold transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Sách trước: {prevBook.name} ({prevBook.abbreviation})</span>
            </Link>
          ) : <div />}

          {nextBook ? (
            <Link
              href={`/kinh-thanh/${nextBook.id}?chapter=1`}
              className="inline-flex items-center gap-1 text-stone-500 hover:text-[#8B1E2D] dark:hover:text-[#E5B54C] font-semibold transition"
            >
              <span>Sách sau: {nextBook.name} ({nextBook.abbreviation})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : <div />}
        </div>

        {/* 4. CHẾ ĐỘ 1: ĐỌC KINH THÁNH TOÀN VĂN */}
        {activeTab === 'reading' && (
          <div className="space-y-6">
            {/* Notice Card if chapter is pending full translation */}
            {currentChapter?.isPendingFullText && currentChapter.verses.length === 0 && (
              <div className={`p-6 rounded-3xl border border-amber-200 dark:border-amber-900/50 space-y-4 bg-amber-50/70 dark:bg-amber-950/20`}>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#8B1E2D] shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-serif text-base font-bold text-[#8B1E2D] dark:text-[#E5B54C]">
                      Thông Tin Bản Văn & Quy Điển Công Giáo: Chương {chapterNum}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#5D4037] dark:text-stone-300">
                      Chương {chapterNum} của sách <strong>{currentBook.name}</strong> gồm {currentChapter.canonicalVerseCount || 20} câu theo quy chuẩn Công giáo.
                      Để đảm bảo tính thánh thiêng và tuân thủ tuyệt đối quyền sở hữu trí tuệ của Hội Thánh, nền tảng <strong>Lời Chúa Mỗi Ngày</strong> không tự ý sao chép lậu hay tạo dữ liệu giả mạo.
                    </p>
                    <p className="text-xs leading-relaxed text-[#5D4037] dark:text-stone-300 italic">
                      &bull; Quản trị viên và người dùng được ủy quyền có thể sử dụng công cụ nạp tệp USFM / JSON trong trang Quản Trị để tích hợp bản dịch chính thức.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <Link
                        href="/admin/kiem-duyet-nguon"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B1E2D] text-white text-xs font-semibold shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Nạp Bản Dịch Hợp Pháp
                      </Link>
                      <button
                        onClick={() => setActiveTab('study')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 text-[#8B1E2D] dark:text-[#E5B54C] border border-black/10 text-xs font-semibold shadow-xs"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        Xem Khảo Cứu Thần Học Của Chương Này
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scripture Verses Continuous Reader Area */}
            <div className={`rounded-3xl p-6 md:p-10 border shadow-sm space-y-4 ${ts.card}`}>
              <div className="border-b border-black/10 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] uppercase tracking-wider font-serif">
                  {currentBook.name} &bull; Toàn Văn Chương {chapterNum}
                </span>
                <span className="text-xs text-stone-400">
                  {currentChapter?.verses.length || 0} câu hiển thị
                </span>
              </div>

              {currentChapter && currentChapter.verses.length > 0 ? (
                <div className="space-y-3">
                  {currentChapter.verses.map((verse) => (
                    <div
                      key={verse.id}
                      id={`verse-${verse.verseNumber}`}
                      onClick={() => setSelectedVerse(verse)}
                      className={`group relative p-3 rounded-2xl transition cursor-pointer flex items-start gap-3.5 ${ts.verseHover}`}
                    >
                      {/* Verse Number */}
                      <span className="shrink-0 w-7 h-7 rounded-lg bg-black/5 group-hover:bg-[#8B1E2D] group-hover:text-white flex items-center justify-center font-serif text-xs font-bold border border-black/10 transition select-none mt-0.5">
                        {verse.verseNumber}
                      </span>

                      {/* Verse Text */}
                      <div className="flex-1">
                        <p className={`font-serif ${fontSize} group-hover:text-[#8B1E2D] dark:group-hover:text-[#E5B54C] transition leading-relaxed`}>
                          {verse.text}
                        </p>

                        {/* Actions Toolbar on Hover / Focus */}
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] opacity-75">
                          {verse.commentary && (
                            <span className="text-[#8B1E2D] dark:text-[#E5B54C] font-medium flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Chú giải thần học
                            </span>
                          )}

                          {verse.cccLinks && verse.cccLinks.length > 0 && (
                            <Link
                              href={`/giao-ly?num=${verse.cccLinks[0]}`}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline font-medium inline-flex items-center gap-1 text-[#855D14] dark:text-[#E5B54C]"
                            >
                              <BookMarked className="w-3 h-3" />
                              <span>GLHTCG #{verse.cccLinks.join(', ')}</span>
                            </Link>
                          )}

                          <div className="ml-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            {/* Copy button */}
                            <button
                              onClick={(e) => handleCopyVerse(verse, e)}
                              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-[#8B1E2D]"
                              title="Sao chép câu kèm địa chỉ"
                            >
                              {copiedVerseId === verse.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              <span className="text-[10px]">{copiedVerseId === verse.id ? 'Đã sao chép' : 'Chép'}</span>
                            </button>

                            {/* Share button */}
                            <button
                              onClick={(e) => handleShareVerse(verse, e)}
                              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-[#8B1E2D]"
                              title="Chia sẻ Lời Chúa"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span className="text-[10px]">Chia sẻ</span>
                            </button>

                            {/* Create Quote Image */}
                            <Link
                              href={`/tao-anh?quote=${encodeURIComponent(verse.text)}&ref=${encodeURIComponent(`${currentBook.name} ${chapterNum},${verse.verseNumber}`)}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs text-[#8B1E2D] dark:text-[#E5B54C] font-semibold hover:underline"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span className="text-[10px]">Tạo ảnh</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <p className="text-xs text-stone-500 italic">
                    Chương {chapterNum} đang chờ nạp bản văn toàn phần theo quy chuẩn bản quyền. Bạn có thể xem các câu Lời Chúa trọng tâm trong mục <strong>Nghiên Cứu Thần Học</strong>.
                  </p>
                  <button
                    onClick={() => setActiveTab('study')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B1E2D] text-white text-xs font-semibold shadow-xs"
                  >
                    <Compass className="w-4 h-4" />
                    Chuyển Sang Khảo Cứu Thần Học
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. CHẾ ĐỘ 2: NGHIÊN CỨU KINH THÁNH CHUYÊN SÂU (12 MỤC HỌC THUẬT CHUẨN CÔNG GIÁO) */}
        {activeTab === 'study' && currentChapter && (
          <div className="space-y-6">
            {/* Banner Nghiên Cứu & Tác Phẩm Nghệ Thuật */}
            <div className={`p-6 md:p-8 rounded-3xl border shadow-sm space-y-4 ${ts.altCard}`}>
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#762F3A] text-white">
                      Khảo Cứu Thần Học & Chú Giải 12 Mục
                    </span>
                    <span className="text-xs font-semibold opacity-80">
                      {currentBook.name} &bull; Chương {chapterNum}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                    {currentChapter.title}
                  </h2>

                  <p className={`text-xs md:text-sm leading-relaxed ${ts.subText}`}>
                    {currentChapter.summary}
                  </p>
                </div>

                {/* Sacred Art Artwork */}
                <div className="shrink-0 w-full sm:w-52 h-36 rounded-2xl overflow-hidden border border-black/10 shadow-sm relative">
                  <img
                    src={currentArtwork.thumbnailUrl}
                    alt={currentArtwork.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 text-white">
                    <span className="text-[10px] font-semibold truncate">{currentArtwork.title}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LƯỚI 12 MỤC NGHIÊN CỨU CHUYÊN SÂU */}
            <div className="space-y-5">
              
              {/* Mục 1 & 2: Bối Cảnh Lịch Sử • Địa Lý & Văn Hóa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border space-y-2 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider block flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#B39A70]" />
                    1. Bối Cảnh Lịch Sử
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#403A34] dark:text-stone-300">
                    {currentChapter.historicalContext || currentBook.historicalContext}
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#B39A70] dark:text-[#E5BE53] uppercase tracking-wider block flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#B39A70]" />
                    2. Địa Lý & Không Gian Văn Hóa
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#403A34] dark:text-stone-300">
                    {currentChapter.geographyAndCulture || currentChapter.geography || 'Đất Thánh Canaan, Giêrusalem và không gian văn hóa vùng Cận Đông cổ đại.'}
                  </p>
                </div>
              </div>

              {/* Mục 3 & 4: Tác Giả & Độc Giả • Cấu Trúc Văn Chương */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border space-y-2 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider block flex items-center gap-1.5">
                    <BookMarked className="w-4 h-4 text-[#B39A70]" />
                    3. Tác Giả & Đối Tượng Độc Giả
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#403A34] dark:text-stone-300">
                    {currentChapter.authorAndAudience || (currentBook.authorTradition + '. Nhằm nuôi dưỡng đời sống đức tin của Dân Chúa.')}
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#B39A70] dark:text-[#E5BE53] uppercase tracking-wider block flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#B39A70]" />
                    4. Cấu Trúc Văn Chương
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#403A34] dark:text-stone-300">
                    {currentChapter.literaryStructure || 'Bố cục chặt chẽ theo văn phong thần học quy điển.'}
                  </p>
                </div>
              </div>

              {/* Mục 5: Các Nhân Vật Lịch Sử Cứu Độ */}
              <div className={`p-5 rounded-2xl border space-y-3 ${ts.card}`}>
                <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider block">
                  5. Các Nhân Vật Lịch Sử Cứu Độ
                </span>
                <div className="flex flex-wrap gap-2">
                  {(currentChapter.characters || currentBook.keyFigures).map((char, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-semibold border border-black/5"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mục 6: Phân Tích Từ Ngữ Quan Trọng (Nguyên ngữ Hí-ri / Hy Lạp) */}
              {currentChapter.keyKeywords && currentChapter.keyKeywords.length > 0 && (
                <div className={`p-5 rounded-2xl border space-y-3 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#B39A70] dark:text-[#E5BE53] uppercase tracking-wider block flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#B39A70]" />
                    6. Phân Tích Từ Ngữ Quan Trọng (Nguyên Ngữ Gốc)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentChapter.keyKeywords.map((kw, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-black/20 border border-[#E8DFC8]/60 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#762F3A] dark:text-[#E5BE53]">{kw.term}</span>
                          {kw.originalLanguage && (
                            <span className="text-[10px] text-[#8D6E63] font-mono">[{kw.originalLanguage}]</span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#5D4037] dark:text-stone-300 leading-relaxed">{kw.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mục 7 & 8: Ý Nghĩa Thần Học • Ý Nghĩa Kitô Học */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border space-y-2 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider block flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#762F3A]" />
                    7. Ý Nghĩa Thần Học
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#403A34] dark:text-stone-300">
                    {currentChapter.theologicalMeaning || currentBook.theologicalSignificance}
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#B39A70] dark:text-[#E5BE53] uppercase tracking-wider block flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#B39A70]" />
                    8. Ý Nghĩa Kitô Học (Quy Hướng Đức Kitô)
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#403A34] dark:text-stone-300">
                    {currentChapter.christologicalMeaning || currentChapter.christianMessage || 'Mọi lời mạc khải đều tìm thấy sự thành toàn trọn vẹn nơi Đức Giêsu Kitô.'}
                  </p>
                </div>
              </div>

              {/* Mục 9: Liên Hệ Cựu Ước – Tân Ước (Typology) */}
              <div className={`p-5 rounded-2xl border space-y-2 ${ts.card}`}>
                <span className="text-xs font-bold text-[#855D14] dark:text-[#E5BE53] uppercase tracking-wider block">
                  9. Liên Hệ Cựu Ước &ndash; Tân Ước (Tiên Trưng Cứu Độ)
                </span>
                <div className="space-y-1.5">
                  {(currentChapter.otNtConnections || ['Hình bóng thời Cựu Ước hoàn tất trọn vẹn trong Giao Ước Mới nơi Đức Kitô.']).map((conn, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#5D4037] dark:text-stone-300 leading-relaxed">
                      <span className="text-[#762F3A] font-bold mt-0.5">&bull;</span>
                      <span>{conn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mục 10 & 11: Liên Hệ GLHTCG • Liên Hệ Văn Kiện Hội Thánh */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border space-y-3 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider block">
                    10. Liên Hệ Giáo Lý (GLHTCG)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentChapter.cccConnections || [101, 105, 120]).map((num, idx) => (
                      <Link
                        key={idx}
                        href={`/giao-ly?num=${num}`}
                        className="px-2.5 py-1 rounded-lg bg-[#B39A70]/15 hover:bg-[#B39A70]/30 text-[#855D14] dark:text-[#E5BE53] text-xs font-bold border border-[#B39A70]/30 transition"
                      >
                        GLHTCG #{num}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border space-y-3 ${ts.card}`}>
                  <span className="text-xs font-bold text-[#B39A70] dark:text-[#E5BE53] uppercase tracking-wider block">
                    11. Liên Hệ Văn Kiện Hội Thánh
                  </span>
                  <div className="space-y-1.5 text-xs text-[#5D4037] dark:text-stone-300">
                    {(currentChapter.churchDocConnections || ['Hiến chế Dei Verbum (số 11, 21)', 'Tông huấn Verbum Domini (số 7, 87)']).map((doc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#762F3A] shrink-0 mt-0.5" />
                        <Link href="/nghien-cuu?tab=documents" className="hover:underline">
                          {doc}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mục 12: Gợi Ý Suy Niệm & Áp Dụng Đời Sống (Lectio Divina) */}
              <div className={`p-5 rounded-2xl border space-y-2 bg-[#FAF7F2] dark:bg-[#241C18] border-[#E8DFC8] dark:border-[#3E302A]`}>
                <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider block flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#762F3A]" />
                  12. Gợi Ý Suy Niệm & Áp Dụng Đời Sống (Lectio Divina)
                </span>
                <p className="text-xs sm:text-sm text-[#403A34] dark:text-stone-300 leading-relaxed font-serif italic">
                  {currentChapter.meditationAndApplication || 'Lắng nghe Lời Chúa trong thinh lặng, tự vấn lương tâm và đưa ra một quyết tâm cụ thể biến Lời thành việc làm bác ái hôm nay.'}
                </p>
              </div>

              {/* Khối Nguồn Tài Liệu Tham Khảo Học Thuật */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1412] border border-[#E7E0D5] dark:border-[#3E302A] text-xs text-[#736B63] dark:text-[#A1887F] space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#403A34] dark:text-[#F7F4EE] uppercase text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B39A70]" />
                  <span>Tài Liệu Tham Khảo Nghiên Cứu Chính Thức:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 pl-1">
                  {(currentChapter.academicSources || [
                    'Bản dịch Kinh Thánh của Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ (NPD-CGKPV)',
                    'The Jerusalem Bible / La Bible de Jérusalem (École Biblique de Jérusalem)',
                    'The Navarre Bible: Scripture and Commentary',
                    'Sách Giáo Lý Hội Thánh Công Giáo (GLHTCG / CCC 1992)'
                  ]).map((source, idx) => (
                    <li key={idx} className="text-[11px] leading-relaxed">{source}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Các Câu Lời Chúa Trọng Tâm của Sách / Chương */}
            {currentBook.keyVerses && currentBook.keyVerses.length > 0 && (
              <div className={`p-5 rounded-2xl border space-y-3 ${ts.altCard}`}>
                <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider block">
                  Các Câu Lời Chúa Nổi Bật (Key Verses)
                </span>
                <div className="space-y-2">
                  {currentBook.keyVerses.map((kv, idx) => (
                    <blockquote
                      key={idx}
                      className="p-3 rounded-xl bg-white/70 dark:bg-black/20 border-l-4 border-[#762F3A] font-serif text-xs md:text-sm italic"
                    >
                      &ldquo;{kv.text}&rdquo;
                      <span className="block mt-1 font-sans text-[11px] font-bold text-[#762F3A] dark:text-[#E5BE53] not-italic">
                        — {kv.reference}
                      </span>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* Liên kết Cổng Nghiên cứu */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF4E8] to-[#F4EFE6] dark:from-[#271E1B] dark:to-[#1A1412] border border-[#E8DFC8] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-[#762F3A] dark:text-[#E5BE53] block">
                  Khám Phá Sâu Hơn Trong Chuyên Mục Nghiên Cứu
                </span>
                <span className="text-[#736B63] dark:text-[#A1887F]">
                  Tra cứu từ điển Hy Lạp/Hí-ri, Typology Cựu Ước - Tân Ước và các Văn Kiện Huấn Quyền.
                </span>
              </div>
              <Link
                href="/nghien-cuu"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#762F3A] text-white font-semibold shadow-xs"
              >
                <span>Mở Cổng Nghiên Cứu</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* 6. Bottom Chapter Pagination */}
        <div className="flex items-center justify-between pt-4 pb-12 border-t border-black/10">
          <button
            onClick={() => handleChapterChange(chapterNum - 1)}
            disabled={chapterNum <= 1}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs ${ts.card}`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Chương Trước</span>
          </button>

          <span className="text-xs font-semibold opacity-70 font-serif">
            {currentBook.name} • Chương {chapterNum} / {currentBook.chaptersCount}
          </span>

          <button
            onClick={() => handleChapterChange(chapterNum + 1)}
            disabled={chapterNum >= currentBook.chaptersCount}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs ${ts.card}`}
          >
            <span>Chương Sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 7. Modals & Audio Player Bar */}
        {selectedVerse && (
          <VerseDetailModal
            verse={selectedVerse}
            bookName={currentBook.name}
            onClose={() => setSelectedVerse(null)}
          />
        )}

        {showBookIntro && (
          <BookIntroModal
            book={currentBook}
            onClose={() => setShowBookIntro(false)}
          />
        )}

        {isPlayingAudio && (
          <AudioPlayerBar
            title={`${currentBook.name} • Chương ${chapterNum}`}
            passageText={getFullChapterTextForAudio()}
            onClose={() => setIsPlayingAudio(false)}
          />
        )}

        {/* 8. Mobile One-Handed Floating Bottom Reader Bar */}
        <div className="md:hidden fixed bottom-4 inset-x-3 z-40 bg-white/95 dark:bg-[#271E1B]/95 backdrop-blur-md shadow-2xl rounded-2xl border border-stone-200 dark:border-stone-700 p-2 flex items-center justify-between gap-1 text-xs">
          <button
            onClick={() => handleChapterChange(chapterNum - 1)}
            disabled={chapterNum <= 1}
            className="p-2 rounded-xl bg-black/5 disabled:opacity-30 active:scale-95 transition"
            title="Chương trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <select
            value={chapterNum}
            onChange={(e) => handleChapterChange(parseInt(e.target.value, 10))}
            className="px-2 py-1.5 rounded-xl bg-black/5 font-semibold text-xs border-0 focus:ring-1 focus:ring-[#8B1E2D]"
          >
            {Array.from({ length: currentBook.chaptersCount }, (_, i) => i + 1).map((ch) => (
              <option key={ch} value={ch}>
                {currentBook.abbreviation} {ch}/{currentBook.chaptersCount}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleChapterChange(chapterNum + 1)}
            disabled={chapterNum >= currentBook.chaptersCount}
            className="p-2 rounded-xl bg-black/5 disabled:opacity-30 active:scale-95 transition"
            title="Chương sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={cycleFontSize}
            className="p-2 rounded-xl bg-black/5 active:scale-95 transition"
            title="Đổi cỡ chữ"
          >
            <Type className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'parchment' : theme === 'parchment' ? 'sepia' : 'dark')}
            className="p-2 rounded-xl bg-black/5 active:scale-95 transition"
            title="Đổi giao diện"
          >
            <Palette className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'reading' ? 'study' : 'reading')}
            className={`p-2 rounded-xl active:scale-95 transition ${activeTab === 'study' ? 'bg-[#8B1E2D] text-white' : 'bg-black/5'}`}
            title={activeTab === 'reading' ? 'Mở Nghiên Cứu' : 'Về Đọc Toàn Văn'}
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BibleReaderPage() {
  return (
    <Suspense fallback={<BibleReaderSkeleton />}>
      <BibleReaderContent />
    </Suspense>
  );
}
