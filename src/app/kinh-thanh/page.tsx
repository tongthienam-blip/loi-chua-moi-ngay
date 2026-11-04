'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Info, Search, Filter } from 'lucide-react';
import { CATHOLIC_BIBLE_BOOKS, CATHOLIC_BOOK_CATEGORIES } from '@/data/catholic-books';
import { BibleBook } from '@/types';
import { BookIntroModal } from '@/components/BookIntroModal';

export default function BibleBooksIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [introBook, setIntroBook] = useState<BibleBook | null>(null);

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
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8DFC8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Thư Viện Kinh Thánh
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2D1E18] mt-1">
            73 Sách Kinh Thánh Công Giáo
          </h1>
          <p className="text-xs text-[#5D4037] mt-1">
            Bao gồm 46 sách Cựu Ước (với 7 sách Đệ Nhị Quy Điển) và 27 sách Tân Ước chuẩn quy điển Công giáo.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên sách, viết tắt..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl text-xs text-[#2D1E18] border border-[#E8DFC8] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20 shadow-sm"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
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

      {/* Books Grid */}
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
                Giới Thiệu 10 Điểm
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
