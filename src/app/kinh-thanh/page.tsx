'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Info, Search, Filter, Compass, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { CATHOLIC_BIBLE_BOOKS, CATHOLIC_BOOK_CATEGORIES } from '@/data/catholic-books';
import { BibleBook } from '@/types';
import { BookIntroModal } from '@/components/BookIntroModal';
import { parseScriptureAddress } from '@/lib/bible/address-parser';

export default function BibleBooksIndexPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [jumpAddress, setJumpAddress] = useState('');
  const [jumpError, setJumpError] = useState('');
  const [introBook, setIntroBook] = useState<BibleBook | null>(null);

  const handleQuickJump = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jumpAddress.trim()) return;

    const parsed = parseScriptureAddress(jumpAddress);
    if (!parsed || !parsed.isValid) {
      setJumpError('Địa chỉ chưa đúng định dạng. Hãy thử: St 1,1; Ga 3,16; Rm 8,28; Tv 23,1');
      setTimeout(() => setJumpError(''), 4000);
      return;
    }

    setJumpError('');
    setJumpAddress('');
    router.push(`/kinh-thanh/${parsed.bookId}?chapter=${parsed.chapter}${parsed.verse ? `#verse-${parsed.verse}` : ''}`);
  };

  const filteredBooks = CATHOLIC_BIBLE_BOOKS.filter((book) => {
    // Filter by Category
    if (selectedCategory === 'OLD' && book.testament !== 'OLD') return false;
    if (selectedCategory === 'NEW' && book.testament !== 'NEW') return false;
    if (
      selectedCategory !== 'ALL' &&
      selectedCategory !== 'OLD' &&
      selectedCategory !== 'NEW' &&
      book.category !== selectedCategory
    ) {
      return false;
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        book.name.toLowerCase().includes(q) ||
        book.latinName.toLowerCase().includes(q) ||
        book.abbreviation.toLowerCase().includes(q) ||
        book.categoryName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* 1. Page Title & Quick Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8DFC8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Thư Viện Kinh Thánh Công Giáo
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2D1E18] mt-1">
            73 Sách Quy Điển Công Giáo
          </h1>
          <p className="text-xs text-[#5D4037] mt-1">
            46 Sách Cựu Ước (gồm 7 sách Đệ Nhị Quy Điển) &bull; 27 Sách Tân Ước &bull; 1.334 Chương chuẩn Công đồng Trentô & Giáo Hội Công Giáo.
          </p>
        </div>

        {/* Quick Address Jump Box */}
        <form onSubmit={handleQuickJump} className="relative w-full md:w-80">
          <input
            type="text"
            value={jumpAddress}
            onChange={(e) => setJumpAddress(e.target.value)}
            placeholder="Nhảy nhanh địa chỉ: St 1,1; Ga 3,16..."
            className="w-full pl-9 pr-14 py-2 bg-white rounded-xl text-xs text-[#2D1E18] border border-[#E8DFC8] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 shadow-sm"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#8B1E2D] text-white text-[11px] font-bold shadow-xs hover:bg-[#701124] transition"
          >
            Đến
          </button>
        </form>
      </div>

      {jumpError && (
        <div className="p-3 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 text-xs">
          {jumpError}
        </div>
      )}

      {/* 2. Banner: Hai Khu Vực Riêng Biệt (ĐỌC KINH THÁNH vs NGHIÊN CỨU) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Khu vực 1: Đọc Kinh Thánh */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-white border border-[#E8DFC8] shadow-xs flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#8B1E2D] text-white shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-sm font-bold text-[#8B1E2D]">
              Khu Vực 1: Đọc Toàn Văn 73 Sách
            </h3>
            <p className="text-xs text-[#5D4037] leading-relaxed">
              Đọc bản văn Lời Chúa theo thứ tự sách &bull; chương &bull; câu nguyên vẹn, không bị phân tâm, hỗ trợ lật chương một tay trên điện thoại.
            </p>
          </div>
        </div>

        {/* Khu vực 2: Nghiên Cứu Kinh Thánh */}
        <Link 
          href="/nghien-cuu"
          className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF4E8] to-[#F4EFE6] border border-[#C59B27]/40 shadow-xs flex items-start gap-3.5 hover:shadow-md transition group"
        >
          <div className="p-2.5 rounded-xl bg-[#C59B27] text-white shrink-0 mt-0.5 group-hover:scale-105 transition">
            <Compass className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-[#855D14]">
                Khu Vực 2: Nghiên Cứu & Chú Giải Chuyên Sâu
              </h3>
              <ArrowRight className="w-4 h-4 text-[#855D14] group-hover:translate-x-1 transition" />
            </div>
            <p className="text-xs text-[#5D4037] leading-relaxed">
              Khảo sát bối cảnh lịch sử, từ điển Hy Lạp/Hí-ri, Typology đối chiếu Cựu Ước - Tân Ước và các số Giáo Lý Hội Thánh (GLHTCG).
            </p>
          </div>
        </Link>
      </div>

      {/* 3. Category Pills & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
          {CATHOLIC_BOOK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                selectedCategory === cat.id
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-sm'
                  : 'bg-white text-[#5D4037] border-[#E8DFC8] hover:bg-[#F4EFE6]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Lọc theo tên, viết tắt..."
            className="w-full pl-8 pr-4 py-1.5 bg-white rounded-xl text-xs text-[#2D1E18] border border-[#E8DFC8] focus:outline-none focus:ring-1 focus:ring-[#8B1E2D]"
          />
        </div>
      </div>

      {/* 4. Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="p-5 rounded-2xl bg-white border border-[#E8DFC8] hover:border-[#8B1E2D]/50 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="w-10 h-10 rounded-xl bg-[#FAF4E8] group-hover:bg-[#8B1E2D] text-[#855D14] group-hover:text-white flex items-center justify-center font-serif text-sm font-bold border border-[#C59B27]/30 transition shadow-sm">
                  {book.abbreviation}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {book.categoryName}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-[#2D1E18] group-hover:text-[#8B1E2D] transition">
                {book.name}
              </h3>
              <p className="text-xs text-stone-500 italic mb-2">
                {book.latinName}
              </p>
              <p className="text-xs text-[#5D4037] line-clamp-2 leading-relaxed">
                {book.overview}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setIntroBook(book)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#855D14] hover:text-[#C59B27] transition"
              >
                <Info className="w-3.5 h-3.5" />
                12 Điểm Thần Học
              </button>

              <Link
                href={`/kinh-thanh/${book.id}?chapter=1`}
                className="px-3.5 py-1.5 rounded-lg bg-[#FAF4E8] hover:bg-[#8B1E2D] text-[#855D14] group-hover:text-white text-xs font-semibold border border-[#C59B27]/30 transition shadow-sm"
              >
                Đọc {book.chaptersCount} Chương →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Book Intro Modal */}
      <BookIntroModal book={introBook} onClose={() => setIntroBook(null)} />
    </div>
  );
}
