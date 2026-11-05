'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  X, 
  BookOpen, 
  ChevronRight, 
  BookMarked, 
  FileText, 
  Compass, 
  Heart,
  Sparkles,
  Layers
} from 'lucide-react';
import { CATHOLIC_BIBLE_BOOKS } from '@/data/catholic-books';
import { CATECHISM_DATABASE } from '@/data/catechism-data';
import { CHURCH_DOCUMENTS_DATABASE } from '@/data/church-documents';
import { BIBLE_DICTIONARY } from '@/data/bible-dictionary';
import { DAILY_REFLECTIONS_DATABASE } from '@/data/daily-reflections';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchCategoryFilter = 'ALL' | 'BIBLE' | 'CATECHISM' | 'DOCUMENTS' | 'THEOLOGY' | 'REFLECTION';

interface SearchResultItem {
  id: string;
  type: 'BIBLE' | 'CATECHISM' | 'DOCUMENTS' | 'THEOLOGY' | 'REFLECTION';
  typeLabel: string;
  title: string;
  subtitle: string;
  snippet?: string;
  href: string;
  icon: any;
  colorClass: string;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SearchCategoryFilter>('ALL');

  // Lắng nghe phím ESC để đóng modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Bộ kết quả tìm kiếm đa nguồn
  const allResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      // Khi chưa gõ từ khóa: gợi ý các mục tiêu biểu từ mỗi chuyên mục
      const defaultBible = CATHOLIC_BIBLE_BOOKS.slice(0, 4).map((b): SearchResultItem => ({
        id: `bible-${b.id}`,
        type: 'BIBLE',
        typeLabel: 'Kinh Thánh',
        title: `${b.name} (${b.abbreviation})`,
        subtitle: `${b.categoryName} • ${b.chaptersCount} chương • ${b.latinName}`,
        href: `/kinh-thanh/${b.id}?chapter=1`,
        icon: BookOpen,
        colorClass: 'text-[#762F3A] bg-[#762F3A]/10 border-[#762F3A]/20'
      }));

      const defaultCatechism = CATECHISM_DATABASE.slice(0, 2).map((c): SearchResultItem => ({
        id: `ccc-${c.paragraphNumber}`,
        type: 'CATECHISM',
        typeLabel: 'Giáo Lý GLHTCG',
        title: `GLHTCG Điều #${c.paragraphNumber}: ${c.title}`,
        subtitle: `${c.pillarName}`,
        snippet: c.content.slice(0, 100) + '...',
        href: `/giao-ly?num=${c.paragraphNumber}`,
        icon: BookMarked,
        colorClass: 'text-[#B39A70] bg-[#B39A70]/15 border-[#B39A70]/30'
      }));

      const defaultDocs = CHURCH_DOCUMENTS_DATABASE.slice(0, 2).map((d): SearchResultItem => ({
        id: `doc-${d.id}`,
        type: 'DOCUMENTS',
        typeLabel: 'Văn Kiện',
        title: `${d.latinTitle} — ${d.vietnameseTitle}`,
        subtitle: `${d.promulgator} • ${d.year || 'Vatican'}`,
        href: `/nghien-cuu?tab=documents`,
        icon: FileText,
        colorClass: 'text-amber-800 bg-amber-50 border-amber-200'
      }));

      return [...defaultBible, ...defaultCatechism, ...defaultDocs];
    }

    const results: SearchResultItem[] = [];

    // 1. Tìm trong 73 Sách Kinh Thánh
    CATHOLIC_BIBLE_BOOKS.forEach((b) => {
      if (
        b.name.toLowerCase().includes(q) ||
        b.latinName.toLowerCase().includes(q) ||
        b.abbreviation.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q) ||
        b.mainThemes.some((t) => t.toLowerCase().includes(q))
      ) {
        results.push({
          id: `bible-${b.id}`,
          type: 'BIBLE',
          typeLabel: 'Kinh Thánh',
          title: `${b.name} (${b.abbreviation})`,
          subtitle: `${b.categoryName} • ${b.chaptersCount} chương • ${b.latinName}`,
          snippet: b.overview.slice(0, 110) + '...',
          href: `/kinh-thanh/${b.id}?chapter=1`,
          icon: BookOpen,
          colorClass: 'text-[#762F3A] bg-[#762F3A]/10 border-[#762F3A]/20'
        });
      }
    });

    // 2. Tìm trong Giáo Lý Hội Thánh Công Giáo (GLHTCG)
    CATECHISM_DATABASE.forEach((c) => {
      const matchNum = c.paragraphNumber.toString() === q || `số ${c.paragraphNumber}` === q || `#${c.paragraphNumber}` === q;
      const matchText = c.title.toLowerCase().includes(q) || c.content.toLowerCase().includes(q);
      if (matchNum || matchText) {
        results.push({
          id: `ccc-${c.paragraphNumber}`,
          type: 'CATECHISM',
          typeLabel: 'Giáo Lý GLHTCG',
          title: `Điều #${c.paragraphNumber}: ${c.title}`,
          subtitle: `${c.pillarName}`,
          snippet: c.content.slice(0, 110) + '...',
          href: `/giao-ly?num=${c.paragraphNumber}`,
          icon: BookMarked,
          colorClass: 'text-[#B39A70] bg-[#B39A70]/15 border-[#B39A70]/30'
        });
      }
    });

    // 3. Tìm trong Văn Kiện Hội Thánh
    CHURCH_DOCUMENTS_DATABASE.forEach((d) => {
      if (
        d.latinTitle.toLowerCase().includes(q) ||
        d.vietnameseTitle.toLowerCase().includes(q) ||
        d.promulgator.toLowerCase().includes(q) ||
        d.mainThemes.some((t) => t.toLowerCase().includes(q)) ||
        d.summary.toLowerCase().includes(q)
      ) {
        results.push({
          id: `doc-${d.id}`,
          type: 'DOCUMENTS',
          typeLabel: 'Văn Kiện',
          title: `${d.latinTitle} — ${d.vietnameseTitle}`,
          subtitle: `${d.promulgator} • ${d.categoryName}`,
          snippet: d.summary.slice(0, 110) + '...',
          href: `/nghien-cuu?tab=documents`,
          icon: FileText,
          colorClass: 'text-amber-800 bg-amber-50 border-amber-200'
        });
      }
    });

    // 4. Tìm trong Từ Điển Thần Học
    BIBLE_DICTIONARY.forEach((entry) => {
      if (
        entry.term.toLowerCase().includes(q) ||
        (entry.termGreek && entry.termGreek.toLowerCase().includes(q)) ||
        (entry.termHebrew && entry.termHebrew.toLowerCase().includes(q)) ||
        entry.shortDefinition.toLowerCase().includes(q)
      ) {
        results.push({
          id: `dict-${entry.term}`,
          type: 'THEOLOGY',
          typeLabel: 'Thần Học',
          title: `${entry.term} ${entry.pronunciation ? `[${entry.pronunciation}]` : entry.termLatin ? `(${entry.termLatin})` : ''}`,
          subtitle: `Thuật ngữ Kinh Thánh • ${entry.category}`,
          snippet: entry.shortDefinition,
          href: `/nghien-cuu?tab=dictionary&q=${encodeURIComponent(entry.term)}`,
          icon: Compass,
          colorClass: 'text-blue-800 bg-blue-50 border-blue-200'
        });
      }
    });

    // 5. Tìm trong Bài Suy Niệm Phụng Vụ
    DAILY_REFLECTIONS_DATABASE.forEach((ref) => {
      if (
        ref.title.toLowerCase().includes(q) ||
        ref.coreMessage.toLowerCase().includes(q) ||
        ref.scriptureReference.toLowerCase().includes(q) ||
        ref.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: `ref-${ref.id}`,
          type: 'REFLECTION',
          typeLabel: 'Suy Niệm',
          title: ref.title,
          subtitle: `${ref.scriptureReference} • ${ref.author}`,
          snippet: ref.coreMessage.slice(0, 110) + '...',
          href: `/suy-niem?date=${ref.date}`,
          icon: Heart,
          colorClass: 'text-rose-800 bg-rose-50 border-rose-200'
        });
      }
    });

    return results;
  }, [query]);

  // Lọc theo tabs phân loại
  const filteredResults = useMemo(() => {
    if (activeFilter === 'ALL') return allResults;
    return allResults.filter((r) => r.type === activeFilter);
  }, [allResults, activeFilter]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#F7F4EE] dark:bg-[#1A1412] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E7E0D5] dark:border-[#3E302A] flex flex-col max-h-[85vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-3.5 sm:p-4 bg-white dark:bg-[#241C18] border-b border-[#E7E0D5] dark:border-[#3E302A] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#762F3A] dark:text-[#E5BE53] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm 73 sách, số Giáo lý (GLHTCG), văn kiện, thuật ngữ..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-[#403A34] dark:text-[#F7F4EE] placeholder-[#8F877F] dark:placeholder-[#A1887F] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              title="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-[#8F877F] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="px-3.5 py-2 bg-white/70 dark:bg-[#241C18]/70 border-b border-[#E7E0D5] dark:border-[#3E302A] flex flex-wrap gap-1.5 text-xs">
          {[
            { id: 'ALL' as const, label: 'Tất Cả' },
            { id: 'BIBLE' as const, label: 'Kinh Thánh' },
            { id: 'CATECHISM' as const, label: 'Giáo Lý' },
            { id: 'DOCUMENTS' as const, label: 'Văn Kiện' },
            { id: 'THEOLOGY' as const, label: 'Thần Học' },
            { id: 'REFLECTION' as const, label: 'Suy Niệm' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                activeFilter === cat.id
                  ? 'bg-[#762F3A] text-white shadow-xs'
                  : 'bg-white dark:bg-[#1A1412] text-[#736B63] dark:text-[#A1887F] border border-[#E7E0D5] dark:border-[#3E302A] hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-3 sm:p-4 overflow-y-auto divide-y divide-[#E7E0D5]/50 dark:divide-[#3E302A] space-y-1">
          <div className="px-2 py-1 text-[11px] font-bold text-[#B39A70] dark:text-[#E5BE53] uppercase tracking-wider flex items-center justify-between">
            <span>
              {query.trim() ? `Kết quả tìm kiếm (${filteredResults.length})` : 'Gợi ý các nội dung nổi bật'}
            </span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#8F877F] dark:text-[#A1887F] space-y-2">
              <p>Không tìm thấy nội dung nào khớp với từ khóa &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-[#B39A70]">Gợi ý: Thử gõ số điều (ví dụ "1324"), tên sách ("Mátthêu"), hoặc từ khóa ("Thánh Thể", "Dei Verbum").</p>
            </div>
          ) : (
            filteredResults.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.id}
                  href={r.href}
                  onClick={onClose}
                  className="flex items-start justify-between p-3 rounded-2xl hover:bg-white dark:hover:bg-[#241C18] transition group"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-serif text-xs font-bold border shrink-0 mt-0.5 ${r.colorClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${r.colorClass}`}>
                          {r.typeLabel}
                        </span>
                        <span className="text-xs text-[#8F877F] dark:text-[#A1887F] truncate">
                          {r.subtitle}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[#403A34] dark:text-[#F7F4EE] group-hover:text-[#762F3A] dark:group-hover:text-[#E5BE53] transition line-clamp-1">
                        {r.title}
                      </div>
                      {r.snippet && (
                        <p className="text-xs text-[#736B63] dark:text-[#D7CCC8] mt-1 line-clamp-2 leading-relaxed">
                          {r.snippet}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#762F3A] dark:group-hover:text-[#E5BE53] group-hover:translate-x-0.5 transition shrink-0 mt-2" />
                </Link>
              );
            })
          )}
        </div>

        {/* Quick Shortcuts Footer */}
        <div className="p-3 bg-[#F4EFE6] dark:bg-[#15100E] border-t border-[#E7E0D5] dark:border-[#3E302A] flex items-center justify-between text-[11px] text-[#736B63] dark:text-[#A1887F]">
          <span>Gõ tìm kiếm trên 73 Sách Thánh, 2.865 điều Giáo lý và Văn kiện Huấn Quyền</span>
          <span className="hidden sm:inline">Phím tắt: ESC để đóng</span>
        </div>
      </div>
    </div>
  );
}
