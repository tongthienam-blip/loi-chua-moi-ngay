'use client';

import React from 'react';
import { X, BookOpen, User, Clock, Compass, Bookmark, Cross, Target, ListOrdered } from 'lucide-react';
import { BibleBook } from '@/types';
import Link from 'next/link';

interface BookIntroModalProps {
  book: BibleBook | null;
  onClose: () => void;
}

export function BookIntroModal({ book, onClose }: BookIntroModalProps) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#E8DFC8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#F4EFE6] border-b border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8B1E2D] text-[#FAF7F2] flex items-center justify-center font-serif text-lg font-bold shadow-md">
              {book.abbreviation}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#855D14] uppercase tracking-wider">
                  {book.categoryName} • {book.chaptersCount} Chương
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2D1E18]">
                Sách {book.name} ({book.latinName})
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/60 text-[#5D4037] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 10 Tiêu Chuẩn Giới Thiệu Chuyên Sâu */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 1. Tổng quan & Ý nghĩa thần học then chốt */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-sm space-y-3">
            <h3 className="font-serif text-base font-bold text-[#8B1E2D] flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              1. Giới Thiệu Tổng Quan
            </h3>
            <p className="text-sm text-[#3E2723] leading-relaxed">
              {book.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2. Tác giả & Truyền thống */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
              <h4 className="font-serif text-sm font-bold text-[#2D1E18] flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-[#8B1E2D]" />
                2. Tác Giả & Nghiên Cứu
              </h4>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                {book.authorTradition}
              </p>
            </div>

            {/* 3. Thời điểm & Bối cảnh */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
              <h4 className="font-serif text-sm font-bold text-[#2D1E18] flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#C59B27]" />
                3. Thời Điểm Hình Thành
              </h4>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                {book.compositionPeriod}
              </p>
            </div>

            {/* 4. Bối cảnh lịch sử */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
              <h4 className="font-serif text-sm font-bold text-[#2D1E18] flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4 text-[#5D4037]" />
                4. Bối Cảnh Lịch Sử
              </h4>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                {book.historicalContext}
              </p>
            </div>

            {/* 6. Mục đích biên soạn */}
            <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
              <h4 className="font-serif text-sm font-bold text-[#2D1E18] flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[#8B1E2D]" />
                6. Mục Đích Biên Soạn
              </h4>
              <p className="text-xs text-[#5D4037] leading-relaxed">
                {book.purpose}
              </p>
            </div>
          </div>

          {/* 5. Chủ đề chính */}
          <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
            <h4 className="font-serif text-sm font-bold text-[#2D1E18] flex items-center gap-2 mb-3">
              <Bookmark className="w-4 h-4 text-[#C59B27]" />
              5. Chủ Đề Chính
            </h4>
            <div className="flex flex-wrap gap-2">
              {book.mainThemes.map((theme, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF4E8] text-[#855D14] border border-[#C59B27]/30"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* 7. Cấu trúc tổng quát */}
          {book.structure && book.structure.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
              <h4 className="font-serif text-sm font-bold text-[#2D1E18] flex items-center gap-2 mb-3">
                <ListOrdered className="w-4 h-4 text-[#8B1E2D]" />
                7. Cấu Trúc Tổng Quát
              </h4>
              <div className="divide-y divide-stone-100">
                {book.structure.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-start gap-3">
                    <span className="font-serif text-xs font-bold text-[#8B1E2D] shrink-0 w-24">
                      Chương {item.chapters}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[#2D1E18]">{item.section}</div>
                      <div className="text-xs text-[#5D4037]">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. Những nhân vật quan trọng */}
          <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
            <h4 className="font-serif text-sm font-bold text-[#2D1E18] mb-2">
              8. Những Nhân Vật Quan Trọng
            </h4>
            <p className="text-xs text-[#5D4037]">
              {book.keyFigures.join(' • ')}
            </p>
          </div>

          {/* 9. Những câu Kinh Thánh nổi bật */}
          <div className="p-4 rounded-xl bg-[#FAF4E8] border border-[#C59B27]/40 space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#855D14]">
              9. Những Câu Kinh Thánh Nổi Bật
            </h4>
            <div className="space-y-2">
              {book.keyVerses.map((kv, idx) => (
                <div key={idx} className="text-xs text-[#3E2723]">
                  <strong className="text-[#8B1E2D] font-serif">{kv.reference}:</strong> "{kv.text}"
                </div>
              ))}
            </div>
          </div>

          {/* 10. Ý nghĩa Thần học Công giáo */}
          <div className="p-5 rounded-2xl bg-white border border-[#8B1E2D]/30 shadow-sm space-y-2">
            <h3 className="font-serif text-sm font-bold text-[#8B1E2D] flex items-center gap-2">
              <Cross className="w-4 h-4" />
              10. Ý Nghĩa Thần Học Công Giáo
            </h3>
            <p className="text-xs text-[#2D1E18] leading-relaxed">
              {book.theologicalSignificance}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F4EFE6] border-t border-[#E8DFC8] flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-200/50 rounded-xl"
          >
            Đóng
          </button>
          <Link
            href={`/kinh-thanh/${book.id}?chapter=1`}
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition"
          >
            Bắt Đầu Đọc Chương 1
          </Link>
        </div>
      </div>
    </div>
  );
}
