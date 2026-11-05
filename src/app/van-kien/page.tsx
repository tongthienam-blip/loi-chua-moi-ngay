'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Award, 
  Bookmark, 
  FileText, 
  Quote, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  ArrowRight, 
  Layers, 
  Compass,
  ScrollText,
  Church,
  ChevronRight,
  Filter
} from 'lucide-react';
import { 
  CHURCH_DOCUMENTS_DATABASE, 
  CHURCH_DOCUMENT_CATEGORIES 
} from '@/data/church-documents';
import { ChurchDocumentItem } from '@/types';

export default function VanKienPage() {
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocId, setSelectedDocId] = useState<string>('dei-verbum');
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  // Filter documents
  const filteredDocs = useMemo(() => {
    return CHURCH_DOCUMENTS_DATABASE.filter((doc) => {
      const matchCat = selectedCat === 'ALL' || doc.category === selectedCat;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        doc.latinTitle.toLowerCase().includes(q) ||
        doc.vietnameseTitle.toLowerCase().includes(q) ||
        doc.promulgator.toLowerCase().includes(q) ||
        (doc.year && doc.year.includes(q)) ||
        doc.mainThemes.some(t => t.toLowerCase().includes(q)) ||
        doc.summary.toLowerCase().includes(q)
      );
    });
  }, [selectedCat, searchQuery]);

  // Selected document detail
  const currentDoc: ChurchDocumentItem = useMemo(() => {
    return CHURCH_DOCUMENTS_DATABASE.find(d => d.id === selectedDocId) || CHURCH_DOCUMENTS_DATABASE[0];
  }, [selectedDocId]);

  const handleCopyQuote = (text: string, ref: string) => {
    const fullText = `"${text}" — (${ref}, ${currentDoc.latinTitle})`;
    navigator.clipboard.writeText(fullText);
    setCopiedQuote(ref);
    setTimeout(() => setCopiedQuote(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#1A1615] text-[#403A34] dark:text-[#E7E0D5] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Decorative Accent */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1600&auto=format&fit=crop')` }}
      />

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#762F3A]/10 dark:bg-amber-500/10 border border-[#762F3A]/20 dark:border-amber-500/20 text-[#762F3A] dark:text-[#E5B54C] text-xs font-semibold tracking-wider uppercase">
            <ScrollText className="w-4 h-4" />
            <span>KHO TÀNG HUẤN QUYỀN HỘI THÁNH CÔNG GIÁO</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#762F3A] dark:text-[#E5B54C] tracking-tight">
            Văn Kiện & Thông Điệp Huấn Quyền
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
            Hệ thống 4 Hiến chế nền tảng Công đồng Vaticanô II, các Thông điệp Xã hội và Giáo huấn của các Đức Giáo hoàng qua các thời kỳ lịch sử.
          </p>
        </div>

        {/* Quick Highlights: 4 Dogmatic Constitutions of Vatican II */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'dei-verbum', latin: 'Dei Verbum', vi: 'Hiến Chế Mạc Khải', icon: '📖', year: '1965', desc: 'Lời Chúa & Thánh Kinh' },
            { id: 'lumen-gentium', latin: 'Lumen Gentium', vi: 'Hiến Chế Hội Thánh', icon: '⛪', year: '1964', desc: 'Mầu nhiệm Dân Thiên Chúa' },
            { id: 'sacrosanctum-concilium', latin: 'Sacrosanctum Concilium', vi: 'Hiến Chế Phụng Vụ', icon: '🍷', year: '1963', desc: 'Canh tân Phụng vụ Thánh' },
            { id: 'gaudium-et-spes', latin: 'Gaudium et Spes', vi: 'Hội Thánh Giữa Thế Giới', icon: '🌍', year: '1965', desc: 'Vui mừng và Hy vọng' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCat('VATICAN_II');
                setSelectedDocId(item.id);
              }}
              className={`p-4 rounded-2xl border text-left transition duration-200 flex flex-col justify-between ${
                selectedDocId === item.id
                  ? 'bg-white dark:bg-[#272220] border-[#762F3A] dark:border-[#E5B54C] shadow-md ring-2 ring-[#762F3A]/20 dark:ring-[#E5B54C]/20'
                  : 'bg-white/70 dark:bg-[#272220]/60 border-black/5 dark:border-white/5 hover:border-amber-500/40 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#762F3A]/10 dark:bg-amber-500/10 text-[#762F3A] dark:text-[#E5B54C] font-mono font-bold">
                  {item.year}
                </span>
              </div>
              <div className="mt-3">
                <div className="font-serif font-bold text-base text-[#762F3A] dark:text-[#E5B54C]">
                  {item.latin}
                </div>
                <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  {item.vi}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                  {item.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên La-tinh (Dei Verbum, Laudato Si'...), tên tiếng Việt, Đức Giáo hoàng hoặc năm..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#272220] text-sm focus:outline-none focus:ring-2 focus:ring-[#762F3A] dark:focus:ring-[#E5B54C] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  Xóa
                </button>
              )}
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400 self-center">
              Hiển thị <strong>{filteredDocs.length}</strong> / {CHURCH_DOCUMENTS_DATABASE.length} văn kiện
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCat('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCat === 'ALL'
                  ? 'bg-[#762F3A] text-white shadow-sm'
                  : 'bg-white dark:bg-[#272220] border border-black/10 dark:border-white/10 hover:border-black/20'
              }`}
            >
              Tất Cả 9 Nhóm
            </button>
            {CHURCH_DOCUMENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCat === cat.id
                    ? 'bg-[#762F3A] text-white shadow-sm'
                    : 'bg-white dark:bg-[#272220] border border-black/10 dark:border-white/10 hover:border-black/20 text-stone-600 dark:text-stone-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout: Left Document Index, Right Document Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Document List (4 Cols) */}
          <div className="lg:col-span-4 space-y-3 max-h-[780px] overflow-y-auto pr-1">
            {filteredDocs.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-[#272220] rounded-2xl border border-black/5 dark:border-white/5">
                <p className="text-sm text-stone-500">Không tìm thấy văn kiện nào phù hợp.</p>
              </div>
            ) : (
              filteredDocs.map((doc) => {
                const isSelected = doc.id === currentDoc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#272220] border-[#762F3A] dark:border-[#E5B54C] shadow-md ring-1 ring-[#762F3A]/30 dark:ring-[#E5B54C]/30'
                        : 'bg-white/70 dark:bg-[#272220]/60 border-black/5 dark:border-white/5 hover:border-amber-500/40 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#762F3A]/10 dark:bg-amber-500/10 text-[#762F3A] dark:text-[#E5B54C]">
                        {doc.documentType}
                      </span>
                      <span className="text-xs font-mono text-stone-400 font-semibold">
                        {doc.year}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#762F3A] dark:text-[#E5B54C] flex items-center justify-between">
                      <span>{doc.latinTitle}</span>
                      {isSelected && <ChevronRight className="w-4 h-4 text-[#762F3A] dark:text-[#E5B54C]" />}
                    </h3>

                    <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-0.5 line-clamp-1">
                      {doc.vietnameseTitle}
                    </p>

                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {doc.purpose}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-stone-400">
                      <span className="truncate max-w-[180px]">{doc.promulgator}</span>
                      <span>{doc.keySections.length} đoạn then chốt</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT COLUMN: Document Dossier & Verbatim Sections (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#272220] rounded-3xl p-6 sm:p-8 md:p-10 border border-black/5 dark:border-white/5 shadow-sm space-y-8">
            
            {/* Document Header */}
            <div className="space-y-4 border-b border-black/10 dark:border-white/10 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-[#762F3A]/10 dark:bg-amber-500/10 text-[#762F3A] dark:text-[#E5B54C] font-mono">
                  {currentDoc.categoryName} &bull; {currentDoc.documentType}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/tao-anh?quote=${encodeURIComponent((currentDoc.keyQuotes && currentDoc.keyQuotes[0]?.text) || currentDoc.summary)}&ref=${encodeURIComponent(currentDoc.latinTitle)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold hover:border-[#762F3A] transition text-stone-700 dark:text-stone-300"
                  >
                    <Quote className="w-3.5 h-3.5 text-[#762F3A] dark:text-[#E5B54C]" />
                    <span>Tạo Ảnh Trích Dẫn</span>
                  </Link>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: currentDoc.latinTitle,
                          text: `${currentDoc.latinTitle} - ${currentDoc.vietnameseTitle}\n${currentDoc.summary}`,
                          url: window.location.href
                        }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Đã sao chép liên kết văn kiện vào bộ nhớ tạm!');
                      }
                    }}
                    className="p-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#762F3A] transition text-stone-600 dark:text-stone-300"
                    title="Chia sẻ văn kiện"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#762F3A] dark:text-[#E5B54C]">
                  {currentDoc.latinTitle}
                </h2>
                <p className="font-serif text-lg sm:text-xl text-stone-700 dark:text-stone-200 mt-1 font-semibold">
                  {currentDoc.vietnameseTitle}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex items-center gap-2 bg-[#F7F4EE] dark:bg-[#1A1615] p-2.5 rounded-xl">
                  <User className="w-4 h-4 text-[#762F3A] dark:text-[#E5B54C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-bold">Ban hành bởi</div>
                    <div className="font-semibold truncate">{currentDoc.promulgator}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#F7F4EE] dark:bg-[#1A1615] p-2.5 rounded-xl">
                  <Calendar className="w-4 h-4 text-[#762F3A] dark:text-[#E5B54C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-bold">Ngày ban hành</div>
                    <div className="font-semibold">{currentDoc.promulgationDate} (Năm {currentDoc.year})</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#F7F4EE] dark:bg-[#1A1615] p-2.5 rounded-xl">
                  <Church className="w-4 h-4 text-[#762F3A] dark:text-[#E5B54C] shrink-0" />
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-bold">Nguồn chính thức</div>
                    <div className="font-semibold truncate">{currentDoc.officialSource || 'Vatican.va'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purpose & Historical Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F7F4EE]/70 dark:bg-[#1A1615]/70 border border-black/5 dark:border-white/5 space-y-1.5">
                <div className="text-xs font-bold text-[#762F3A] dark:text-[#E5B54C] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mục Đích & Ý Hướng Mục Vụ</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                  {currentDoc.purpose}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F4EE]/70 dark:bg-[#1A1615]/70 border border-black/5 dark:border-white/5 space-y-1.5">
                <div className="text-xs font-bold text-[#762F3A] dark:text-[#E5B54C] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Bối Cảnh Lịch Sử & Thần Học</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                  {currentDoc.historicalContext}
                </p>
              </div>
            </div>

            {/* Structure & Themes */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#762F3A] dark:text-[#E5B54C] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                <Layers className="w-4 h-4" />
                <span>Cấu Trúc & Các Đề Tài Cốt Lõi</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 italic font-serif">
                {currentDoc.structure}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentDoc.mainThemes.map((theme, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#762F3A]/5 dark:bg-amber-500/10 text-stone-700 dark:text-stone-300 border border-black/5 dark:border-white/5"
                  >
                    &bull; {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Verbatim Sections */}
            <div className="space-y-4 pt-2">
              <div className="text-xs font-bold text-[#762F3A] dark:text-[#E5B54C] uppercase tracking-wider flex items-center justify-between font-serif border-b border-black/10 dark:border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Các Đoạn Bản Văn Then Chốt (Bản Dịch Tiếng Việt Chính Thức)</span>
                </div>
                <span className="text-[11px] text-stone-400 lowercase">
                  {currentDoc.keySections.length} đoạn tiêu biểu
                </span>
              </div>

              <div className="space-y-4">
                {currentDoc.keySections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F7F4EE]/50 dark:bg-[#1A1615]/50 border border-black/5 dark:border-white/5 space-y-3 hover:border-amber-500/30 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-serif font-bold text-[#762F3A] dark:text-[#E5B54C] px-2.5 py-0.5 rounded-md bg-[#762F3A]/10 dark:bg-amber-500/10">
                        {sec.number}: {sec.heading}
                      </span>

                      {sec.biblicalRoot && sec.biblicalRoot.length > 0 && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#855D14] dark:text-[#E5B54C] font-mono">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Gốc Thánh Kinh: {sec.biblicalRoot.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    <p className="font-serif text-sm sm:text-base leading-relaxed text-[#2D1E18] dark:text-[#F0E6D2] text-justify pl-3 border-l-2 border-[#762F3A] dark:border-[#E5B54C]">
                      &ldquo;{sec.excerpt}&rdquo;
                    </p>

                    {sec.theologicalKey && (
                      <div className="text-xs text-stone-600 dark:text-stone-300 bg-white/80 dark:bg-[#272220]/80 p-2.5 rounded-xl border border-black/5 dark:border-white/5">
                        <strong className="text-[#762F3A] dark:text-[#E5B54C] font-serif">Chìa Khóa Thần Học:</strong> {sec.theologicalKey}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Quotes */}
            {currentDoc.keyQuotes && currentDoc.keyQuotes.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-[#762F3A] dark:text-[#E5B54C] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                  <Quote className="w-4 h-4" />
                  <span>Trích Dẫn Bất Hủ Của Văn Kiện</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentDoc.keyQuotes.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col justify-between space-y-2"
                    >
                      <p className="font-serif text-sm italic text-stone-800 dark:text-stone-200">
                        &ldquo;{q.text}&rdquo;
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-amber-500/10 text-xs">
                        <span className="font-bold text-[#762F3A] dark:text-[#E5B54C] font-mono">
                          {q.number}
                        </span>
                        <button
                          onClick={() => handleCopyQuote(q.text, q.number)}
                          className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-[#762F3A] transition"
                        >
                          {copiedQuote === q.number ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Chép</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scripture Connections & Explore More */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                Chủ đề liên quan: <strong>{currentDoc.topics?.join(', ')}</strong>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/giao-ly"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#762F3A] dark:text-[#E5B54C] hover:underline"
                >
                  <span>Tra Cứu GLHTCG</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/kinh-thanh"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#762F3A] dark:text-[#E5B54C] hover:underline"
                >
                  <span>Đọc Kinh Thánh</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
