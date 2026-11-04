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
  Sparkles
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

  useEffect(() => {
    setIsLoading(true);
    const book = CATHOLIC_BIBLE_BOOKS.find((b) => b.id === bookId);
    if (book) {
      setCurrentBook(book);
      setChapterNum(chapterParam);
      const chapterData = getChapterData(book.id, chapterParam);
      setCurrentChapter(chapterData);

      // Track streak and last read location
      BibleStore.recordReadingActivity();
      BibleStore.saveLastReadLocation(book.id, chapterParam);
    }
    setIsLoading(false);
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

  const getFullChapterTextForAudio = () => {
    if (!currentChapter) return '';
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
              {/* Theme Switcher in Focus Mode */}
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
  // STANDARD READER VIEW
  // --------------------------------------------------------------------------
  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${ts.wrapper}`}>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        
        {/* 1. Top Navigation & Book Switcher Bar */}
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
                  {currentBook.categoryName}
                </span>
                <button
                  onClick={() => setShowBookIntro(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8B1E2D] dark:text-[#E5B54C] hover:underline"
                >
                  <Info className="w-3 h-3" />
                  10 Điểm Thần Học
                </button>
              </div>
              <h1 className="font-serif text-2xl font-bold">
                {currentBook.name} &bull; Chương {chapterNum}
              </h1>
            </div>
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

            {/* Listen to Chapter Audio */}
            <button
              onClick={() => setIsPlayingAudio(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B1E2D] text-white text-xs font-semibold shadow-sm hover:bg-[#701124] transition"
              title="Nghe đọc chương này"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Nghe Lời Chúa</span>
            </button>
          </div>
        </div>

        {/* 2. Chapter In-depth Study Header Card with Sacred Art */}
        {currentChapter && (
          <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${ts.altCard}`}>
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#855D14] uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-[#C59B27]" />
                    Nghiên Cứu & Bối Cảnh Chương {chapterNum}
                  </span>
                  <span className="text-xs opacity-60">
                    &bull; {currentChapter.verses.length} câu quy điển
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold">
                  {currentChapter.title}
                </h3>

                <p className={`text-xs md:text-sm leading-relaxed ${ts.subText}`}>
                  {currentChapter.summary}
                </p>

                {currentChapter.theologicalMeaning && (
                  <div className="pt-2 border-t border-black/10 text-xs leading-relaxed">
                    <strong className="text-[#8B1E2D] dark:text-[#E5B54C] font-serif">Ý nghĩa thần học: </strong>
                    {currentChapter.theologicalMeaning}
                  </div>
                )}
              </div>

              {/* Artwork thumbnail */}
              <div className="shrink-0 relative w-full sm:w-44 h-28 rounded-2xl overflow-hidden border border-black/10 shadow-xs">
                <img
                  src={currentArtwork.thumbnailUrl}
                  alt={currentArtwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 text-white">
                  <span className="text-[10px] font-semibold truncate">{currentArtwork.title}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Scripture Verses Reader Area */}
        <div className={`rounded-3xl p-6 md:p-10 border shadow-sm space-y-5 ${ts.card}`}>
          {currentChapter && currentChapter.verses.length > 0 && (
            <div className="space-y-4">
              {currentChapter.verses.map((verse) => (
                <div
                  key={verse.id}
                  onClick={() => setSelectedVerse(verse)}
                  className={`group relative p-3.5 -mx-3 rounded-2xl transition cursor-pointer flex items-start gap-3.5 ${ts.verseHover}`}
                >
                  {/* Verse Number Badge */}
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-black/5 group-hover:bg-[#8B1E2D] group-hover:text-white flex items-center justify-center font-serif text-xs font-bold border border-black/10 transition select-none mt-0.5">
                    {verse.verseNumber}
                  </span>

                  {/* Verse Text */}
                  <div className="flex-1">
                    <p className={`font-serif ${fontSize} group-hover:text-[#8B1E2D] dark:group-hover:text-[#E5B54C] transition leading-relaxed`}>
                      {verse.text}
                    </p>

                    {/* Badges for CCC / Commentary / Actions */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] opacity-75">
                      {verse.commentary && (
                        <span className="text-[#8B1E2D] dark:text-[#E5B54C] font-medium">
                          &bull; Chú giải thần học
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
                      <Link
                        href={`/tao-anh?quote=${encodeURIComponent(verse.text)}&ref=${encodeURIComponent(`${currentBook.name} ${chapterNum},${verse.verseNumber}`)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#8B1E2D] dark:text-[#E5B54C] hover:underline font-semibold inline-flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Tạo ảnh Lời Chúa</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Bottom Pagination */}
        <div className="flex items-center justify-between pt-4 pb-8">
          <button
            onClick={() => handleChapterChange(chapterNum - 1)}
            disabled={chapterNum <= 1}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs ${ts.card}`}
          >
            <ChevronLeft className="w-4 h-4" />
            Chương Trước
          </button>

          <span className="text-xs font-semibold opacity-70 font-serif">
            Chương {chapterNum} / {currentBook.chaptersCount}
          </span>

          <button
            onClick={() => handleChapterChange(chapterNum + 1)}
            disabled={chapterNum >= currentBook.chaptersCount}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs ${ts.card}`}
          >
            Chương Sau
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5. Modals & Audio Player Bar */}
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
