'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  BookMarked, 
  Search, 
  BookOpen, 
  Cross, 
  Sparkles, 
  Heart, 
  Sun, 
  Layers, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Shield,
  HelpCircle,
  Copy,
  Check,
  Share2,
  Bookmark,
  BookmarkCheck,
  Edit3,
  FileText,
  Compass,
  Info,
  CheckCircle2
} from 'lucide-react';
import { 
  CATECHISM_DATABASE, 
  CATECHISM_THEMES,
  searchCatechism, 
  getCatechismByNumber,
  searchCatechismAndDocuments,
  CatechismTheme
} from '@/data/catechism-data';
import { getArtworkForPillar, SacredArtwork } from '@/data/sacred-art';
import { CatechismArticle } from '@/types';

type ReaderTheme = 'parchment' | 'sepia' | 'dark';
type ReaderFontSize = 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';

function CatechismContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialNum = searchParams.get('num') ? parseInt(searchParams.get('num')!, 10) : null;
  const initialQuery = searchParams.get('q') || '';
  const initialTheme = searchParams.get('theme') ? parseInt(searchParams.get('theme')!, 10) : 0;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [quickJumpNum, setQuickJumpNum] = useState<string>('');
  const [selectedPillar, setSelectedPillar] = useState<number>(0);
  const [selectedThemeId, setSelectedThemeId] = useState<number>(initialTheme);
  const [viewTab, setViewTab] = useState<'catechism' | 'documents'>('catechism');
  const [theme, setTheme] = useState<ReaderTheme>('parchment');
  const [fontSize, setFontSize] = useState<ReaderFontSize>('text-base');

  // Bookmark & Note local states
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>('');
  const [showNoteEditor, setShowNoteEditor] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  const [selectedArticle, setSelectedArticle] = useState<CatechismArticle>(() => {
    if (initialNum && initialNum >= 1 && initialNum <= 2865) {
      const found = getCatechismByNumber(initialNum);
      if (found) return found;
    }
    return CATECHISM_DATABASE[0];
  });

  // Sync bookmark and note from localStorage on article change
  useEffect(() => {
    if (!selectedArticle) return;
    try {
      const savedBookmarks = JSON.parse(localStorage.getItem('ccc_bookmarks') || '[]');
      setIsBookmarked(savedBookmarks.includes(selectedArticle.paragraphNumber));
      
      const savedNote = localStorage.getItem(`ccc_note_${selectedArticle.paragraphNumber}`) || '';
      setUserNote(savedNote);
    } catch {
      // LocalStorage fallback
    }
  }, [selectedArticle]);

  // Nạp nguyên văn chính thức từ API /api/catechism-fetch khi chọn điều khoản
  useEffect(() => {
    if (!selectedArticle) return;
    const num = selectedArticle.paragraphNumber;
    let isCancelled = false;

    async function loadFullVerbatimText() {
      try {
        const res = await fetch(`/api/catechism-fetch?num=${num}`);
        const data = await res.json();
        if (!isCancelled && data.success && data.content) {
          setSelectedArticle(prev => {
            if (prev && prev.paragraphNumber === num) {
              return {
                ...prev,
                title: data.title || prev.title,
                content: data.content,
                isFullVerbatimText: true
              };
            }
            return prev;
          });
        }
      } catch {
        // LocalStorage fallback
      }
    }

    loadFullVerbatimText();

    return () => {
      isCancelled = true;
    };
  }, [selectedArticle.paragraphNumber]);

  // URL sync handler
  const handleSelectNumber = (num: number) => {
    if (num < 1 || num > 2865) return;
    const art = getCatechismByNumber(num);
    if (art) {
      setSelectedArticle(art);
      setViewTab('catechism');
      setQuickJumpNum('');
      // Smooth URL push without full reload
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('num', num.toString());
        window.history.pushState(null, '', url.toString());
      }
    }
  };

  const handleQuickJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(quickJumpNum.trim(), 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 2865) {
      handleSelectNumber(parsed);
    }
  };

  const handleCopyCitation = () => {
    if (!selectedArticle) return;
    const citation = `«${selectedArticle.content}»\n\n— Giáo Lý Hội Thánh Công Giáo, Điều #${selectedArticle.paragraphNumber}\n(${selectedArticle.pillarName} • ${selectedArticle.section})\nBản dịch chính thức của Ủy ban Giáo lý Đức tin trực thuộc Hội đồng Giám mục Việt Nam (HĐGMVN).`;
    navigator.clipboard.writeText(citation).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleShareLink = () => {
    if (typeof window === 'undefined' || !selectedArticle) return;
    const shareUrl = `${window.location.origin}/giao-ly?num=${selectedArticle.paragraphNumber}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    });
  };

  const handleToggleBookmark = () => {
    if (!selectedArticle) return;
    try {
      const savedBookmarks: number[] = JSON.parse(localStorage.getItem('ccc_bookmarks') || '[]');
      const num = selectedArticle.paragraphNumber;
      let updated: number[];
      if (savedBookmarks.includes(num)) {
        updated = savedBookmarks.filter(n => n !== num);
        setIsBookmarked(false);
      } else {
        updated = [...savedBookmarks, num];
        setIsBookmarked(true);
      }
      localStorage.setItem('ccc_bookmarks', JSON.stringify(updated));
    } catch {
      // LocalStorage fallback
    }
  };

  const handleSaveNote = () => {
    if (!selectedArticle) return;
    try {
      localStorage.setItem(`ccc_note_${selectedArticle.paragraphNumber}`, userNote);
      setShowNoteEditor(false);
    } catch {
      // LocalStorage fallback
    }
  };

  const filteredArticles = useMemo(() => {
    return searchCatechism(
      searchQuery,
      selectedPillar === 0 ? undefined : selectedPillar,
      selectedThemeId === 0 ? undefined : selectedThemeId
    );
  }, [searchQuery, selectedPillar, selectedThemeId]);

  const documentResults = useMemo(() => {
    if (viewTab !== 'documents') return [];
    return searchCatechismAndDocuments(
      searchQuery,
      selectedPillar === 0 ? undefined : selectedPillar,
      selectedThemeId === 0 ? undefined : selectedThemeId
    ).filter(r => r.type === 'DOCUMENT');
  }, [searchQuery, selectedPillar, selectedThemeId, viewTab]);

  const currentArtwork: SacredArtwork = useMemo(() => {
    const pillarId = selectedPillar !== 0 ? selectedPillar : (selectedArticle?.pillar || 1);
    return getArtworkForPillar(pillarId);
  }, [selectedPillar, selectedArticle]);

  const pillars = [
    { id: 0, name: 'Tất Cả 4 Trụ Cột', icon: Layers, desc: 'Toàn bộ 2.865 điều khoản' },
    { id: 1, name: 'Trụ Cột I: Tuyên Xưng Đức Tin', icon: Cross, desc: 'Kinh Tin Kính (1-1065)' },
    { id: 2, name: 'Trụ Cột II: Cử Hành Bí Tích', icon: Sun, desc: 'Phụng Vụ & 7 Bí Tích (1066-1690)' },
    { id: 3, name: 'Trụ Cột III: Đời Sống Luân Lý', icon: Heart, desc: 'Mười Điều Răn (1691-2557)' },
    { id: 4, name: 'Trụ Cột IV: Kinh Nguyện', icon: Sparkles, desc: 'Kinh Lạy Cha (2558-2865)' },
  ];

  // Theme styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'sepia':
        return {
          wrapper: 'bg-[#F4ECD8] text-[#3D2C1E]',
          card: 'bg-[#FAF2E1] border-[#DFD1B5]',
          altCard: 'bg-[#EFE4CC] border-[#DFD1B5]',
          accentText: 'text-[#8B1E2D]',
          subText: 'text-[#6A5342]'
        };
      case 'dark':
        return {
          wrapper: 'bg-[#1A1412] text-[#F0E6D2]',
          card: 'bg-[#271E1B] border-[#3F312B]',
          altCard: 'bg-[#312622] border-[#4E3D36]',
          accentText: 'text-[#E5B54C]',
          subText: 'text-[#B8A398]'
        };
      case 'parchment':
      default:
        return {
          wrapper: 'bg-[#FAF7F2] text-[#2D1E18]',
          card: 'bg-white border-[#E8DFC8]',
          altCard: 'bg-[#FAF4E8] border-[#E8DFC8]',
          accentText: 'text-[#8B1E2D]',
          subText: 'text-[#5D4037]'
        };
    }
  };

  const ts = getThemeStyles();

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${ts.wrapper}`}>
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header Breadcrumb & Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8DFC8]/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#855D14] mb-1">
              <Link href="/" className="hover:underline">Trang chủ</Link>
              <span>/</span>
              <span>Giáo Lý Hội Thánh Công Giáo</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Giáo Lý Hội Thánh Công Giáo (GLHTCG)
            </h1>
            <p className={`text-sm mt-1 max-w-3xl leading-relaxed ${ts.subText}`}>
              Kho tàng đức tin tông truyền trọn bộ <strong>2.865 điều khoản</strong> (Điều 1 &ndash; 2865) theo Tông Hiến <em className="font-serif">Fidei Depositum</em> của Thánh Giáo Hoàng Gioan Phaolô II. Nguồn dịch chính thức từ Ủy ban Giáo lý Đức tin trực thuộc Hội đồng Giám mục Việt Nam (HĐGMVN).
            </p>
          </div>

          {/* Reader Customizer Toolbar: Font Size & Theme */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Font size control */}
            <div className={`flex items-center gap-1 p-1 rounded-2xl border ${ts.card} shadow-sm`}>
              {(['text-sm', 'text-base', 'text-lg', 'text-xl'] as ReaderFontSize[]).map((size, idx) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`w-7 h-7 rounded-xl font-serif text-xs font-bold transition flex items-center justify-center ${
                    fontSize === size
                      ? 'bg-[#8B1E2D] text-white shadow-xs'
                      : `${ts.subText} hover:bg-stone-200/40`
                  }`}
                  title={`Cỡ chữ mức ${idx + 1}`}
                >
                  {idx === 0 ? 'A-' : idx === 3 ? 'A+' : 'A'}
                </button>
              ))}
            </div>

            {/* Theme switcher */}
            <div className={`flex items-center gap-1 p-1 rounded-2xl border ${ts.card} shadow-sm`}>
              <button
                onClick={() => setTheme('parchment')}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition ${
                  theme === 'parchment'
                    ? 'bg-[#FAF7F2] text-[#8B1E2D] font-bold border border-[#E8DFC8] shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Giao diện Mộc bản (Parchment)"
              >
                Mộc Bản
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition ${
                  theme === 'sepia'
                    ? 'bg-[#FAF2E1] text-[#8B1E2D] font-bold border border-[#DFD1B5] shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Giao diện Da ngà (Sepia)"
              >
                Da Cừu
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition ${
                  theme === 'dark'
                    ? 'bg-[#1A1412] text-[#E5B54C] font-bold border border-[#3F312B] shadow-xs'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
                title="Giao diện Ban đêm (Dark)"
              >
                Đêm Tối
              </button>
            </div>

            <Link
              href="/nghien-cuu"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-semibold ${ts.card} ${ts.accentText} hover:opacity-90 shadow-sm transition`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Nghiên Cứu</span>
            </Link>
          </div>
        </div>

        {/* Sacred Art Banner for Selected Pillar / Article */}
        <div className={`relative overflow-hidden rounded-3xl border shadow-sacred p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${ts.altCard}`}>
          <div className="space-y-2 max-w-2xl z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8B1E2D] text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Nghệ Thuật Thánh &bull; {currentArtwork.title}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              {selectedPillar === 0 ? 'Khám Phá Toàn Diện 4 Trụ Cột Đức Tin' : pillars[selectedPillar]?.name}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${ts.subText}`}>
              &ldquo;{currentArtwork.description}&rdquo; &mdash; <em>{currentArtwork.artist} ({currentArtwork.year}), {currentArtwork.location}.</em>
            </p>
          </div>

          <div className="shrink-0 relative w-full md:w-56 h-36 rounded-2xl overflow-hidden border border-black/10 shadow-md">
            <img
              src={currentArtwork.thumbnailUrl}
              alt={currentArtwork.title}
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[10px] text-white font-medium drop-shadow-sm">
                {currentArtwork.artist}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => {
                  setSelectedPillar(pillar.id);
                  if (pillar.id !== 0) {
                    const firstInPillar = CATECHISM_DATABASE.find(a => a.pillar === pillar.id);
                    if (firstInPillar) setSelectedArticle(firstInPillar);
                  }
                }}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-md scale-[1.02]'
                    : `${ts.card} hover:border-[#8B1E2D]/50`
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F2E1A9]' : 'text-[#8B1E2D]'}`} />
                  <span className="font-bold text-xs uppercase tracking-wider">
                    {pillar.id === 0 ? 'Tất Cả' : `Trụ Cột ${pillar.id}`}
                  </span>
                </div>
                <div className={`font-serif text-sm font-bold truncate ${isSelected ? 'text-white' : ''}`}>
                  {pillar.name.split(':')[1]?.trim() || pillar.name}
                </div>
                <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-white/80' : ts.subText}`}>
                  {pillar.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* 13 Thematic Study Modes Bar (Chế Độ Học Theo 13 Chủ Đề) */}
        <div className={`p-4 rounded-3xl border shadow-sm space-y-3 ${ts.card}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#855D14]">
              <Compass className="w-4 h-4 text-[#C59B27]" />
              <span>Chế Độ Học Hỏi Theo 13 Chủ Đề Thần Học Trọng Tâm</span>
            </div>
            {selectedThemeId !== 0 && (
              <button
                onClick={() => setSelectedThemeId(0)}
                className="text-xs text-[#8B1E2D] dark:text-[#E5B54C] hover:underline font-semibold"
              >
                Xóa lọc chủ đề
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedThemeId(0)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedThemeId === 0
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              Tất Cả Chủ Đề
            </button>
            {CATECHISM_THEMES.map((th) => {
              const isThSelected = selectedThemeId === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => {
                    setSelectedThemeId(th.id);
                    // Nhảy đến điều khoản trọng tâm đầu tiên của chủ đề
                    if (th.keyParagraphs.length > 0) {
                      handleSelectNumber(th.keyParagraphs[0]);
                    }
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                    isThSelected
                      ? 'bg-[#8B1E2D] text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#8B1E2D]/10 hover:text-[#8B1E2D]'
                  }`}
                  title={`${th.name}: ${th.description}`}
                >
                  <span>{th.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isThSelected ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10'}`}>
                    {th.keyParagraphs.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Tabs, Quick Jump & Search Input Bar */}
        <div className={`rounded-3xl p-4 sm:p-5 border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between ${ts.card}`}>
          {/* Tab Selector */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => setViewTab('catechism')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewTab === 'catechism'
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              <span>GLHTCG (2.865 Điều)</span>
            </button>
            <button
              onClick={() => setViewTab('documents')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewTab === 'documents'
                  ? 'bg-[#8B1E2D] text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Văn Kiện Huấn Quyền</span>
            </button>
          </div>

          {/* Quick Number Jump Form */}
          <form onSubmit={handleQuickJumpSubmit} className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-44">
              <input
                type="number"
                min="1"
                max="2865"
                value={quickJumpNum}
                onChange={(e) => setQuickJumpNum(e.target.value)}
                placeholder="Nhập số: 176, 846..."
                className={`w-full px-3 py-2 text-xs rounded-xl border transition focus:outline-none focus:border-[#8B1E2D] ${
                  theme === 'dark' ? 'bg-[#1F1715] border-[#3F312B] text-white' : 'bg-[#FAF7F2] border-[#E8DFC8] text-[#2D1E18]'
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-3 py-2 bg-[#8B1E2D] hover:bg-[#6e1724] text-white text-xs font-bold rounded-xl transition shadow-xs whitespace-nowrap"
            >
              Đi tới số
            </button>
          </form>

          {/* General Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo từ khóa (Đức tin, Bí tích, Thánh Thể, Luân lý, Kinh nguyện)..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm transition focus:outline-none focus:border-[#8B1E2D] ${
                theme === 'dark' ? 'bg-[#1F1715] border-[#3F312B] text-white' : 'bg-[#FAF7F2] border-[#E8DFC8] text-[#2D1E18]'
              }`}
            />
          </div>
        </div>

        {/* Main Content Layout: Left List + Right Article Detail */}
        {viewTab === 'catechism' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Article List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#855D14]">
                  {selectedThemeId !== 0 
                    ? `Chủ Đề: ${CATECHISM_THEMES.find(t => t.id === selectedThemeId)?.name}`
                    : 'Danh Sách Điều Khoản'}
                </span>
                <span className={`text-[11px] ${ts.subText}`}>
                  Tìm thấy {filteredArticles.length} điều
                </span>
              </div>

              <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article: CatechismArticle) => {
                    const isSelected = selectedArticle?.paragraphNumber === article.paragraphNumber;
                    return (
                      <button
                        key={article.paragraphNumber}
                        onClick={() => handleSelectNumber(article.paragraphNumber)}
                        className={`w-full text-left p-4 rounded-2xl border transition ${
                          isSelected
                            ? 'bg-[#FAF4E8] dark:bg-[#312622] border-[#8B1E2D] shadow-sm ring-1 ring-[#8B1E2D]'
                            : `${ts.card} hover:border-[#8B1E2D]/50`
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] dark:text-[#E5B54C] font-bold text-xs">
                            GLHTCG #{article.paragraphNumber}
                          </span>
                          <span className="text-[10px] font-semibold text-[#855D14]">
                            {article.pillarName.split(':')[0]}
                          </span>
                        </div>

                        <div className="font-serif font-bold text-sm mt-1.5 leading-snug">
                          {article.title}
                        </div>

                        <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${ts.subText}`}>
                          {article.content}
                        </p>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5 text-[10px] opacity-75">
                          <span>{article.scripturalFoundations.length} đoạn Kinh Thánh</span>
                          {article.isFullVerbatimText && (
                            <span className="text-[#8B1E2D] dark:text-[#E5B54C] font-semibold">
                              ● Nguyên văn chuẩn xác
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className={`rounded-2xl p-8 text-center border space-y-2 ${ts.card}`}>
                    <HelpCircle className="w-8 h-8 text-stone-300 mx-auto" />
                    <p className="text-sm font-semibold">Không tìm thấy điều khoản phù hợp</p>
                    <p className={`text-xs ${ts.subText}`}>Thử nhập trực tiếp số điều từ 1 đến 2865 ở ô trên.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Detailed Reader View */}
            <div className="lg:col-span-7">
              {selectedArticle ? (
                <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6 ${ts.card}`}>
                  
                  {/* Article Top Navigation Toolbar (Prev / Next & Actions) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10">
                    {/* Prev / Next Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSelectNumber(selectedArticle.paragraphNumber - 1)}
                        disabled={selectedArticle.paragraphNumber <= 1}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold bg-stone-100 dark:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8B1E2D] hover:text-white transition"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Điều #{selectedArticle.paragraphNumber - 1}</span>
                      </button>

                      <button
                        onClick={() => handleSelectNumber(selectedArticle.paragraphNumber + 1)}
                        disabled={selectedArticle.paragraphNumber >= 2865}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold bg-stone-100 dark:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8B1E2D] hover:text-white transition"
                      >
                        <span>Điều #{selectedArticle.paragraphNumber + 1}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Action Tools: Copy citation, Share link, Bookmark, Note */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleCopyCitation}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                          copySuccess ? 'bg-green-600 text-white border-green-600' : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200'
                        }`}
                        title="Sao chép trích dẫn chuẩn Công giáo kèm nguồn"
                      >
                        {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copySuccess ? 'Đã chép' : 'Sao chép'}</span>
                      </button>

                      <button
                        onClick={handleShareLink}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                          shareSuccess ? 'bg-green-600 text-white border-green-600' : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200'
                        }`}
                        title="Chia sẻ liên kết số điều này"
                      >
                        {shareSuccess ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                        <span>{shareSuccess ? 'Đã lấy link' : 'Chia sẻ'}</span>
                      </button>

                      <button
                        onClick={handleToggleBookmark}
                        className={`p-1.5 rounded-xl border text-xs font-semibold transition ${
                          isBookmarked ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]' : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200'
                        }`}
                        title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu điều khoản này'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setShowNoteEditor(!showNoteEditor)}
                        className={`p-1.5 rounded-xl border text-xs font-semibold transition ${
                          userNote ? 'bg-[#C59B27] text-white border-[#C59B27]' : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200'
                        }`}
                        title="Ghi chú cá nhân"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Personal Note Editor (if open) */}
                  {showNoteEditor && (
                    <div className={`p-4 rounded-2xl border space-y-2.5 ${ts.altCard}`}>
                      <div className="flex items-center justify-between text-xs font-bold text-[#855D14]">
                        <span>Ghi Chú Cá Nhân Cho Điều #{selectedArticle.paragraphNumber}</span>
                        <span className="text-[10px] text-stone-400">Lưu tự động trên trình duyệt</span>
                      </div>
                      <textarea
                        value={userNote}
                        onChange={(e) => setUserNote(e.target.value)}
                        placeholder="Nhập suy niệm hoặc ghi chú cá nhân của bạn..."
                        rows={3}
                        className={`w-full p-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#8B1E2D] ${
                          theme === 'dark' ? 'bg-[#1F1715] border-[#3F312B] text-white' : 'bg-white border-[#E8DFC8]'
                        }`}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowNoteEditor(false)}
                          className="px-3 py-1 text-xs rounded-lg border text-stone-500 hover:bg-stone-100"
                        >
                          Đóng
                        </button>
                        <button
                          onClick={handleSaveNote}
                          className="px-3 py-1 bg-[#8B1E2D] text-white text-xs font-bold rounded-lg hover:bg-[#6e1724]"
                        >
                          Lưu Ghi Chú
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Article Header */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3.5 py-1 rounded-full bg-[#8B1E2D] text-white font-bold text-xs shadow-sm">
                          GLHTCG Điều #{selectedArticle.paragraphNumber}
                        </span>
                        {selectedArticle.isFullVerbatimText ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 border border-green-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Nguyên văn chuẩn xác
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                            Định danh quy điển
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-semibold text-[#855D14]">
                        {selectedArticle.pillarName}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold pt-1">
                      {selectedArticle.title}
                    </h2>

                    {selectedArticle.latinHeading && (
                      <div className="text-xs italic font-serif text-[#855D14]">
                        {selectedArticle.latinHeading}
                      </div>
                    )}

                    <div className={`text-xs flex flex-wrap gap-x-2 pt-1 ${ts.subText}`}>
                      <span>{selectedArticle.part}</span>
                      <span>&bull;</span>
                      <span>{selectedArticle.section}</span>
                      <span>&bull;</span>
                      <span>{selectedArticle.chapter}</span>
                    </div>
                  </div>

                  {/* Article Content / Text */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#855D14] uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#8B1E2D]" />
                      <span>Văn Bản Chính Thức GLHTCG</span>
                    </div>
                    <div className={`p-5 sm:p-6 rounded-2xl border font-serif ${fontSize} leading-relaxed italic ${ts.altCard}`}>
                      &ldquo;{selectedArticle.content}&rdquo;
                    </div>
                  </div>

                  {/* Scriptural Foundations */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] uppercase tracking-wider">
                      <BookOpen className="w-4 h-4" />
                      <span>Nền Tảng Kinh Thánh Liên Quan</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.scripturalFoundations.map((ref, idx) => (
                        <Link
                          key={idx}
                          href={`/kinh-thanh?q=${encodeURIComponent(ref)}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1412] hover:bg-[#FAF4E8] text-[#8B1E2D] dark:text-[#E5B54C] font-bold text-xs border border-[#8B1E2D]/20 shadow-xs transition group"
                          title={`Tra cứu đoạn Kinh Thánh ${ref} trong 73 Sách`}
                        >
                          <span>{ref}</span>
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Key Doctrines */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#855D14] uppercase tracking-wider">
                      <Shield className="w-4 h-4 text-[#C59B27]" />
                      <span>Giáo Huấn & Tín Lý Trọng Tâm</span>
                    </div>
                    <div className="space-y-2">
                      {selectedArticle.keyDoctrines.map((doctrine, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs sm:text-sm ${ts.altCard}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-[#8B1E2D] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{doctrine}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Church Documents Reference */}
                  {selectedArticle.churchDocuments && selectedArticle.churchDocuments.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#855D14] uppercase tracking-wider">
                        <FileText className="w-4 h-4 text-[#8B1E2D]" />
                        <span>Văn Kiện Hội Thánh & Huấn Quyền Liên Quan</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.churchDocuments.map((doc, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium border border-black/5"
                          >
                            <Bookmark className="w-3 h-3 text-[#C59B27]" />
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Paragraphs */}
                  {selectedArticle.relatedParagraphs && selectedArticle.relatedParagraphs.length > 0 && (
                    <div className="pt-4 border-t border-black/10 space-y-2">
                      <div className={`text-xs font-bold uppercase tracking-wider ${ts.subText}`}>
                        Các Điều Khoản Giáo Lý Liên Quan
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.relatedParagraphs.map((num) => (
                          <button
                            key={num}
                            onClick={() => handleSelectNumber(num)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#8B1E2D] text-stone-700 dark:text-stone-300 hover:text-white text-xs font-semibold transition"
                          >
                            <span>Điều #{num}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legal & Copyright Attribution */}
                  <div className="pt-4 border-t border-black/10 text-[11px] text-stone-400 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      Bản dịch tiếng Việt chính thức của <strong>Ủy ban Giáo lý Đức tin trực thuộc Hội đồng Giám mục Việt Nam (HĐGMVN)</strong>. Bản quyền nguyên tác tiếng Latin thuộc <strong>Libreria Editrice Vaticana</strong>. Website phục vụ mục đích học hỏi đức tin và nghiên cứu mục vụ phi thương mại.
                    </div>
                  </div>

                </div>
              ) : (
                <div className={`rounded-3xl p-12 text-center border ${ts.card}`}>
                  <p className="text-stone-400">Chọn một điều khoản bên trái để xem nội dung.</p>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* View Tab: Church Documents */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold">
                Thư Viện Văn Kiện Hội Thánh & Huấn Quyền
              </h2>
              <span className={`text-xs ${ts.subText}`}>
                Công đồng Vaticanô II, Thông điệp, Tông huấn & Tông sắc
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentResults.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-6 rounded-3xl border shadow-sm space-y-3 ${ts.card} hover:border-[#8B1E2D] transition`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#8B1E2D]/10 text-[#8B1E2D] dark:text-[#E5B54C]">
                      {doc.pillarOrCategory}
                    </span>
                    <span className={`text-[11px] ${ts.subText}`}>
                      {doc.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold">
                    {doc.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${ts.subText}`}>
                    {doc.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={doc.refLink}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E2D] dark:text-[#E5B54C] hover:underline"
                    >
                      <span>Đọc & Tra cứu toàn văn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CatechismPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] p-8 flex items-center justify-center">
        <div className="text-sm font-semibold text-[#8B1E2D] animate-pulse">
          Đang tải Giáo lý Hội Thánh Công Giáo...
        </div>
      </div>
    }>
      <CatechismContent />
    </Suspense>
  );
}
