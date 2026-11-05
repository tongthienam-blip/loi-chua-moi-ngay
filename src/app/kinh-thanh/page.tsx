'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Info, Search, Filter, Compass } from 'lucide-react';
import { CATHOLIC_BIBLE_BOOKS, CATHOLIC_BOOK_CATEGORIES } from '@/data/catholic-books';
import { BibleBook } from '@/types';
import { BookIntroModal } from '@/components/BookIntroModal';

function BibleLibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryBook = searchParams?.get('book');
  const queryChapter = searchParams?.get('chapter') || '1';

  // Nếu người dùng truy cập dạng /kinh-thanh?book=... thì tự động chuyển hướng đúng về route động
  useEffect(() => {
    if (queryBook) {
      router.replace(`/kinh-thanh/${queryBook}?chapter=${queryChapter}`);
    }
  }, [queryBook, queryChapter, router]);

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [introBook, setIntroBook] = useState<BibleBook | null>(null);

  const filteredBooks = CATHOLIC_BIBLE_BOOKS.filter((book) => {
    // Lọc theo phân loại
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

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        book.name.toLowerCase().includes(q) ||
        book.latinName.toLowerCase().includes(q) ||
        book.abbreviation.toLowerCase().includes(q) ||
        book.categoryName.toLowerCase().includes(q) ||
        book.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in pb-24 md:pb-16">
      {/* Tiêu đề trang & Ô tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7E0D5] dark:border-[#3E302A]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#762F3A] dark:text-[#E5BE53] uppercase tracking-wider font-serif">
            <BookOpen className="w-4 h-4" />
            Thư Viện Kinh Thánh Công Giáo
          </div>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-[#403A34] dark:text-[#F7F4EE] mt-1">
            73 Sách Kinh Thánh Trọn Bộ
          </h1>
          <p className="text-xs md:text-sm text-[#736B63] dark:text-[#A1887F] mt-1.5 max-w-2xl">
            Bao gồm 46 sách Cựu Ước (với 7 sách Đệ Nhị Quy Điển) và 27 sách Tân Ước chuẩn quy điển Công giáo. Toàn văn tiếng Việt nguyên bản theo Nhóm Các Giờ Kinh Phụng Vụ.
          </p>
        </div>

        {/* Thanh tìm kiếm nhanh */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên sách, viết tắt (St, Mt, Tb...)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#241C18] rounded-xl text-xs text-[#403A34] dark:text-[#F7F4EE] border border-[#E7E0D5] dark:border-[#3E302A] focus:outline-none focus:ring-2 focus:ring-[#762F3A]/30 shadow-xs"
          />
        </div>
      </div>

      {/* Bộ lọc Danh mục / Thể loại */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
        {CATHOLIC_BOOK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              selectedCategory === cat.id
                ? 'bg-[#762F3A] text-white border-[#762F3A] shadow-xs'
                : 'bg-white dark:bg-[#241C18] text-[#5D4037] dark:text-[#D7CCC8] border-[#E7E0D5] dark:border-[#3E302A] hover:bg-[#F4EFE6] dark:hover:bg-[#2E2420]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Lưới 73 Sách */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#241C18] border border-[#E7E0D5] dark:border-[#3E302A] hover:border-[#762F3A] dark:hover:border-[#B39A70] shadow-xs hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="w-10 h-10 rounded-xl bg-[#FAF4E8] dark:bg-[#2E2420] group-hover:bg-[#762F3A] text-[#762F3A] dark:text-[#E5BE53] group-hover:text-white flex items-center justify-center font-serif text-sm font-bold border border-[#B39A70]/30 transition shadow-xs">
                  {book.abbreviation}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {book.categoryName}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-[#403A34] dark:text-[#F7F4EE] group-hover:text-[#762F3A] dark:group-hover:text-[#E5BE53] transition">
                {book.name}
              </h3>
              <p className="text-xs text-stone-500 italic mb-2">
                {book.latinName}
              </p>
              <p className="text-xs text-[#736B63] dark:text-[#A1887F] line-clamp-2 leading-relaxed">
                {book.overview}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E7E0D5] dark:border-[#3E302A] flex items-center justify-between gap-2">
              <button
                onClick={() => setIntroBook(book)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B39A70] hover:text-[#762F3A] transition"
              >
                <Info className="w-3.5 h-3.5" />
                Giới thiệu
              </button>

              <Link
                href={`/kinh-thanh/${book.id}?chapter=1`}
                className="px-3.5 py-1.5 rounded-xl bg-[#FAF4E8] dark:bg-[#2E2420] hover:bg-[#762F3A] dark:hover:bg-[#762F3A] text-[#762F3A] dark:text-[#E5BE53] hover:text-white dark:hover:text-white text-xs font-semibold border border-[#B39A70]/30 transition shadow-xs"
              >
                Đọc {book.chaptersCount} Chương →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal giới thiệu sách */}
      <BookIntroModal book={introBook} onClose={() => setIntroBook(null)} />
    </div>
  );
}

export default function BibleBooksPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-stone-500">Đang nạp Thư viện 73 Sách...</div>}>
      <BibleLibraryContent />
    </Suspense>
  );
}
