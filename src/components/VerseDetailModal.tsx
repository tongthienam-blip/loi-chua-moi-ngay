'use client';

import React, { useState, useEffect } from 'react';
import { X, Bookmark, Share2, BookOpen, Layers, Edit3, Check, Image as ImageIcon } from 'lucide-react';
import { BibleVerse } from '@/types';
import { BibleStore } from '@/lib/bible-store';
import Link from 'next/link';

interface VerseDetailModalProps {
  verse: BibleVerse | null;
  bookName: string;
  onClose: () => void;
}

export function VerseDetailModal({ verse, bookName, onClose }: VerseDetailModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (verse) {
      setIsBookmarked(BibleStore.isBookmarked(verse.bookId, verse.chapterNumber, verse.verseNumber));
      setNoteContent(BibleStore.getNote(verse.id));
    }
  }, [verse]);

  if (!verse) return null;

  const handleToggleBookmark = () => {
    const newState = BibleStore.toggleBookmark({
      bookId: verse.bookId,
      chapter: verse.chapterNumber,
      verse: verse.verseNumber,
      text: verse.text,
      bookName
    });
    setIsBookmarked(newState);
  };

  const handleSaveNote = () => {
    BibleStore.saveNote(verse.id, noteContent);
    setIsEditingNote(false);
  };

  const handleCopy = () => {
    const formatted = `"${verse.text}" (${bookName} ${verse.chapterNumber},${verse.verseNumber})`;
    navigator.clipboard.writeText(formatted);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#E8DFC8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 md:p-6 bg-[#F4EFE6] border-b border-[#E8DFC8] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8B1E2D]/10 text-[#8B1E2D] border border-[#8B1E2D]/20">
                Chi tiết câu Lời Chúa
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-[#2D1E18] mt-1">
              {bookName} {verse.chapterNumber},{verse.verseNumber}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200/60 text-[#5D4037] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Verse Text */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-sm">
            <p className="font-serif text-lg md:text-xl text-[#2D1E18] leading-relaxed italic">
              "{verse.text}"
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap gap-2 pt-1 pb-2 border-b border-[#E8DFC8]/60">
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                isBookmarked 
                  ? 'bg-[#C59B27] text-white border-[#C59B27]' 
                  : 'bg-white hover:bg-stone-100 text-[#5D4037] border-[#E8DFC8]'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              {isBookmarked ? 'Đã Lưu Dấu' : 'Đánh Dấu'}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-100 text-[#5D4037] border border-[#E8DFC8] transition"
            >
              {copySuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              {copySuccess ? 'Đã Sao Chép' : 'Sao Chép'}
            </button>

            <Link
              href={`/tao-anh?quote=${encodeURIComponent(verse.text)}&ref=${encodeURIComponent(`${bookName} ${verse.chapterNumber},${verse.verseNumber}`)}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-100 text-[#8B1E2D] border border-[#8B1E2D]/20 transition"
            >
              <ImageIcon className="w-4 h-4" />
              Tạo Ảnh Câu Lời Chúa
            </Link>
          </div>

          {/* Context & Explanation */}
          {verse.commentary && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-[#8B1E2D]">
                <BookOpen className="w-4 h-4" />
                Giải Thích Thần Học & Ngữ Cảnh
              </h4>
              <p className="text-sm text-[#3E2723] leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border border-[#E8DFC8]">
                {verse.commentary}
              </p>
            </div>
          )}

          {/* Catechism Links */}
          {verse.cccLinks && verse.cccLinks.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-[#C59B27]">
                <Layers className="w-4 h-4" />
                Liên Kết Giáo Lý Hội Thánh Công Giáo (GLHTCG)
              </h4>
              <div className="flex flex-wrap gap-2">
                {verse.cccLinks.map((num) => (
                  <Link
                    key={num}
                    href={`/nghien-cuu?tab=catechism&num=${num}`}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF4E8] text-[#855D14] text-xs font-semibold border border-[#C59B27]/40 hover:bg-[#C59B27] hover:text-white transition"
                  >
                    GLHTCG Số {num}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Personal Note Box */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="flex items-center gap-2 font-serif text-sm font-bold text-[#2D1E18]">
                <Edit3 className="w-4 h-4 text-[#8B1E2D]" />
                Ghi Chú & Tâm Tình Cá Nhân
              </h4>
              {!isEditingNote && noteContent && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-xs text-[#8B1E2D] hover:underline font-medium"
                >
                  Sửa ghi chú
                </button>
              )}
            </div>

            {isEditingNote || !noteContent ? (
              <div className="space-y-2">
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Viết cảm nhận, ý cầu nguyện hoặc điều đánh động tâm hồn bạn khi đọc câu Lời Chúa này..."
                  className="w-full h-24 p-3 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/30"
                />
                <div className="flex justify-end gap-2">
                  {noteContent && (
                    <button
                      onClick={() => setIsEditingNote(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-200/50"
                    >
                      Hủy
                    </button>
                  )}
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-1.5 rounded-lg bg-[#8B1E2D] text-white text-xs font-semibold hover:bg-[#701124] transition shadow-sm"
                  >
                    Lưu Ghi Chú
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-white border border-[#E8DFC8] text-sm text-[#3E2723]">
                {noteContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
