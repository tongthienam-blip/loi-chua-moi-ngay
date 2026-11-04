'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';
import { CATHOLIC_BIBLE_BOOKS } from '@/data/catholic-books';
import { BibleBook } from '@/types';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<BibleBook[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredBooks(CATHOLIC_BIBLE_BOOKS.slice(0, 8));
      return;
    }
    const q = query.toLowerCase().trim();
    const matches = CATHOLIC_BIBLE_BOOKS.filter(
      b =>
        b.name.toLowerCase().includes(q) ||
        b.latinName.toLowerCase().includes(q) ||
        b.abbreviation.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q) ||
        b.mainThemes.some(t => t.toLowerCase().includes(q))
    );
    setFilteredBooks(matches);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 bg-white border-b border-[#E8DFC8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8B1E2D]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sách Kinh Thánh, nhân vật, chủ đề thần học..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-[#2D1E18] placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-stone-500 hover:bg-stone-100 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto divide-y divide-stone-100 space-y-1">
          <div className="px-2 py-1 text-xs font-semibold text-[#855D14] uppercase tracking-wider">
            {query.trim() ? `Kết quả tìm kiếm (${filteredBooks.length})` : 'Gợi ý các sách nổi bật'}
          </div>

          {filteredBooks.length === 0 ? (
            <div className="py-8 text-center text-sm text-stone-500">
              Không tìm thấy sách nào khớp với từ khóa "{query}".
            </div>
          ) : (
            filteredBooks.map((b) => (
              <Link
                key={b.id}
                href={`/kinh-thanh/${b.id}?chapter=1`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#F4EFE6] transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center font-serif text-xs font-bold">
                    {b.abbreviation}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#2D1E18] group-hover:text-[#8B1E2D] transition">
                      {b.name} <span className="text-xs font-normal text-stone-500">({b.latinName})</span>
                    </div>
                    <div className="text-xs text-[#5D4037]">
                      {b.categoryName} • {b.chaptersCount} chương
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#8B1E2D] group-hover:translate-x-0.5 transition" />
              </Link>
            ))
          )}
        </div>

        {/* Quick Shortcuts Footer */}
        <div className="p-3 bg-[#F4EFE6] border-t border-[#E8DFC8] flex items-center justify-between text-[11px] text-[#5D4037]">
          <span>Gõ tên sách như "Sáng Thế", "Mt", "Lc", "Khải Huyền"</span>
          <span className="hidden sm:inline">Phím tắt: ESC để đóng</span>
        </div>
      </div>
    </div>
  );
}
