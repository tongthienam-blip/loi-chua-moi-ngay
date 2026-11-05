'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Compass, BookOpen, Layers, FileText, ArrowRight,
  Search, Quote, Languages, BookMarked, Link2,
  ChevronDown, ChevronRight, Info, ExternalLink, Copy, Check
} from 'lucide-react';
import { TYPOLOGY_DATABASE } from '@/data/typology-data';
import { CATECHISM_DATABASE } from '@/data/catechism-data';
import { CHURCH_DOCUMENTS_DATABASE } from '@/data/church-documents';
import {
  BIBLE_DICTIONARY,
  PARALLEL_VERSES_DATABASE,
  BibleDictionaryEntry,
  ParallelVerseEntry
} from '@/data/bible-dictionary';
import {
  SCRIPTURE_CROSSREF_DATABASE,
  ScriptureCrossReferenceEntry
} from '@/data/scripture-crossref';
import { TypologyConnection, CatechismArticle, ChurchDocumentItem } from '@/types';
import { Skeleton } from '@/components/Skeleton';

// ============================================================================
// COMPONENT: TỪ ĐIỂN THUẬT NGỮ
// ============================================================================
function DictionaryTab() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedEntry, setSelectedEntry] = useState<BibleDictionaryEntry>(BIBLE_DICTIONARY[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'Tất cả' },
    { id: 'THEOLOGY', label: 'Thần học' },
    { id: 'CONCEPT', label: 'Khái niệm' },
    { id: 'RITUAL', label: 'Phụng vụ' },
    { id: 'PERSON', label: 'Nhân vật' },
    { id: 'PLACE', label: 'Địa danh' },
  ];

  const filtered = BIBLE_DICTIONARY.filter(e => {
    const matchCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    const q = query.toLowerCase();
    const matchQ = !q || e.term.toLowerCase().includes(q) ||
      (e.termGreek?.toLowerCase().includes(q)) ||
      (e.termHebrew?.toLowerCase().includes(q)) ||
      e.shortDefinition.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Search + List */}
      <div className="lg:col-span-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D6E63]" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tra cứu từ tiếng Việt, Latin, Hy Lạp..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8DFC8] rounded-xl text-sm text-[#2D1E18] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${selectedCategory === c.id
                ? 'bg-[#8B1E2D] text-white'
                : 'bg-white text-[#5D4037] border border-[#E8DFC8] hover:bg-[#FAF7F2]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Entry List */}
        <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.length === 0 && (
            <div className="text-center py-8 text-xs text-[#8D6E63]">Không tìm thấy thuật ngữ phù hợp.</div>
          )}
          {filtered.map(entry => (
            <button
              key={entry.term}
              onClick={() => setSelectedEntry(entry)}
              className={`w-full text-left p-3.5 rounded-xl border transition ${selectedEntry.term === entry.term
                ? 'bg-white border-[#8B1E2D] shadow-sm'
                : 'bg-white/60 border-[#E8DFC8] hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="font-serif font-bold text-sm text-[#2D1E18]">{entry.term}</div>
              {(entry.termGreek || entry.termHebrew) && (
                <div className="text-[11px] text-[#855D14] font-medium mt-0.5">
                  {entry.termGreek || entry.termHebrew}
                  {entry.termLatin && ` • ${entry.termLatin}`}
                </div>
              )}
              <p className="text-[11px] text-[#6D5D55] mt-1 line-clamp-2 leading-relaxed">
                {entry.shortDefinition}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Entry Detail */}
      <div className="lg:col-span-8 space-y-5">
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFC8] shadow-sm">
          {/* Term Header */}
          <div className="pb-5 border-b border-[#E8DFC8] space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold text-[#2D1E18]">{selectedEntry.term}</h2>
              <button
                onClick={() => handleCopy(`${selectedEntry.term}: ${selectedEntry.shortDefinition}`, selectedEntry.term)}
                className="shrink-0 p-2 rounded-lg bg-[#FAF7F2] text-[#6D5D55] hover:text-[#8B1E2D] border border-[#E8DFC8] transition"
              >
                {copiedId === selectedEntry.term ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Multilingual terms */}
            <div className="flex flex-wrap gap-2">
              {selectedEntry.termLatin && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-[11px] font-semibold text-stone-700">
                  <span className="text-stone-500">LAT:</span> {selectedEntry.termLatin}
                </span>
              )}
              {selectedEntry.termGreek && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[11px] font-semibold text-blue-800">
                  <span className="text-blue-500">ΕΛΛ:</span> {selectedEntry.termGreek}
                </span>
              )}
              {selectedEntry.termHebrew && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-[11px] font-semibold text-amber-800" dir="rtl">
                  {selectedEntry.termHebrew}
                </span>
              )}
              {selectedEntry.termEnglish && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-[11px] font-semibold text-emerald-800">
                  <span className="text-emerald-500">EN:</span> {selectedEntry.termEnglish}
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-[#5D4037] leading-relaxed italic">
              {selectedEntry.shortDefinition}
            </p>
          </div>

          {/* Full Explanation */}
          <div className="pt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">Giải Thích Chi Tiết</h3>
              <div className="text-sm text-[#2D1E18] leading-relaxed whitespace-pre-line font-serif">
                {selectedEntry.fullExplanation}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#855D14] uppercase tracking-wider">Cách Dùng Trong Kinh Thánh</h3>
              <p className="text-sm text-[#2D1E18] leading-relaxed">{selectedEntry.biblicalUsage}</p>
            </div>

            {/* Key Verses */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider">Câu Kinh Thánh Chứng Minh</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedEntry.keyVerses.map((v, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-[#8B1E2D]/10 text-[#8B1E2D] text-[11px] font-bold border border-[#8B1E2D]/20">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* CCC Links */}
            {selectedEntry.cccLinks && selectedEntry.cccLinks.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
                <h3 className="text-xs font-bold text-[#855D14] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Liên Kết Giáo Lý Hội Thánh (GLHTCG)
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEntry.cccLinks.map((n, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#C59B27]/15 text-[#855D14] text-[11px] font-bold border border-[#C59B27]/30">
                      Số {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Theological Note */}
            {selectedEntry.theologicalNote && (
              <div className="p-4 rounded-2xl bg-white border-l-4 border-[#8B1E2D] border-t border-r border-b border-[#E8DFC8]">
                <div className="flex items-center gap-1.5 mb-2">
                  <Info className="w-4 h-4 text-[#8B1E2D]" />
                  <span className="text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">Nhận Định Thần Học Công Giáo</span>
                </div>
                <p className="text-sm text-[#2D1E18] leading-relaxed">{selectedEntry.theologicalNote}</p>
              </div>
            )}

            {/* Related Terms */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider">Thuật Ngữ Liên Quan</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedEntry.relatedTerms.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const found = BIBLE_DICTIONARY.find(e => e.term === t);
                      if (found) setSelectedEntry(found);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#8B1E2D]/10 text-stone-700 hover:text-[#8B1E2D] text-[11px] font-semibold border border-stone-200 transition"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: ĐỐI CHIẾU ĐA NGÔN NGỮ (PARALLEL TEXT)
// ============================================================================
function ParallelTextTab() {
  const [selectedVerse, setSelectedVerse] = useState<ParallelVerseEntry>(PARALLEL_VERSES_DATABASE[0]);
  const [expandedKeyword, setExpandedKeyword] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Verse Selector */}
      <div className="lg:col-span-3 space-y-2">
        <h3 className="text-xs font-bold text-[#855D14] uppercase tracking-wider mb-3">
          Chọn Câu Đối Chiếu
        </h3>
        {PARALLEL_VERSES_DATABASE.map(v => (
          <button
            key={v.reference}
            onClick={() => { setSelectedVerse(v); setExpandedKeyword(null); }}
            className={`w-full text-left p-3.5 rounded-xl border transition ${selectedVerse.reference === v.reference
              ? 'bg-white border-[#8B1E2D] shadow-sm'
              : 'bg-white/60 border-[#E8DFC8] hover:bg-white hover:shadow-sm'
            }`}
          >
            <div className="font-bold text-sm text-[#8B1E2D]">{v.reference}</div>
            <div className="text-[11px] text-[#8D6E63] mt-1 line-clamp-2 italic">
              &ldquo;{v.translations[0]?.text.slice(0, 60)}&hellip;&rdquo;
            </div>
          </button>
        ))}
      </div>

      {/* Right: Parallel Display */}
      <div className="lg:col-span-9 space-y-5">
        {/* Reference Header */}
        <div className="bg-gradient-to-r from-[#FAF4E8] to-[#FAF7F2] rounded-3xl p-5 border border-[#E8DFC8]">
          <div className="flex items-center gap-2 mb-1">
            <Languages className="w-5 h-5 text-[#8B1E2D]" />
            <span className="font-bold text-lg text-[#8B1E2D]">{selectedVerse.reference}</span>
          </div>
          <p className="text-xs text-[#6D5D55]">{selectedVerse.translations.length} ngôn ngữ • {selectedVerse.keyWords.length} từ khoá gốc được phân tích</p>
        </div>

        {/* Parallel Translations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {selectedVerse.translations.map((t, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl border ${i === 0 ? 'border-[#8B1E2D]/30 bg-[#8B1E2D]/5' : 'border-[#E8DFC8] bg-white'}`}
            >
              <div className="text-[10px] font-bold text-[#855D14] uppercase tracking-wider mb-2">
                {t.language}
              </div>
              <p className={`leading-relaxed font-serif ${i === 0 ? 'text-sm text-[#2D1E18] font-semibold' : 'text-sm text-[#5D4037]'}`}
                dir={t.translationId === 'hb-masoretic' ? 'rtl' : 'ltr'}>
                {t.text}
              </p>
            </div>
          ))}
        </div>

        {/* Key Words Analysis */}
        {selectedVerse.keyWords.length > 0 && (
          <div className="bg-white rounded-3xl p-5 border border-[#E8DFC8] shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-[#8B1E2D]" />
              Phân Tích Từ Ngữ Gốc
            </h3>
            <div className="space-y-2">
              {selectedVerse.keyWords.map((kw, i) => (
                <div key={i} className="border border-[#E8DFC8] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedKeyword(expandedKeyword === kw.term ? null : kw.term)}
                    className="w-full flex items-center justify-between p-3.5 text-left hover:bg-[#FAF7F2] transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-sm ${kw.language === 'Do Thái' ? 'text-amber-800 text-lg' : 'text-blue-800'}`}
                        dir={kw.language === 'Do Thái' ? 'rtl' : 'ltr'}>
                        {kw.term}
                      </span>
                      <span className="text-[11px] font-mono text-[#855D14] bg-amber-50 px-2 py-0.5 rounded">
                        [{kw.transliteration}]
                      </span>
                      <span className="text-[11px] text-[#8D6E63]">{kw.language}</span>
                    </div>
                    {expandedKeyword === kw.term ? (
                      <ChevronDown className="w-4 h-4 text-[#6D5D55] shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#6D5D55] shrink-0" />
                    )}
                  </button>
                  {expandedKeyword === kw.term && (
                    <div className="px-4 pb-4 pt-2 bg-[#FAF7F2] text-sm text-[#2D1E18] leading-relaxed border-t border-[#E8DFC8]">
                      {kw.meaning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exegetical Note */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DFC8] shadow-sm">
          <h3 className="text-xs font-bold text-[#8B1E2D] uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <Quote className="w-4 h-4" />
            Nhận Định Chú Giải (Exegesis)
          </h3>
          <p className="text-sm text-[#2D1E18] leading-relaxed font-serif">
            {selectedVerse.exegeticalNote}
          </p>
        </div>

        {/* CCC Links */}
        {selectedVerse.cccLinks.length > 0 && (
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFC8] flex items-start gap-3">
            <Layers className="w-5 h-5 text-[#855D14] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#855D14] uppercase tracking-wider mb-1.5">Giáo Lý Liên Quan (GLHTCG)</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedVerse.cccLinks.map((n, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white text-[#855D14] text-[11px] font-bold border border-[#C59B27]/40">
                    Số {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: LIÊN KẾT KINH THÁNH ↔ GLHTCG ↔ VĂN KIỆN
// ============================================================================
function ScriptureLinksTab() {
  const [query, setQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<ScriptureCrossReferenceEntry>(SCRIPTURE_CROSSREF_DATABASE[0]);

  const filtered = SCRIPTURE_CROSSREF_DATABASE.filter(e => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return e.bibleReference.toLowerCase().includes(q) ||
      e.theme.toLowerCase().includes(q) ||
      e.verseText.toLowerCase().includes(q);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Reference List */}
      <div className="lg:col-span-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D6E63]" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm theo câu, chủ đề..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8DFC8] rounded-xl text-sm text-[#2D1E18] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
          />
        </div>

        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {filtered.map(entry => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className={`w-full text-left p-4 rounded-xl border transition ${selectedEntry.id === entry.id
                ? 'bg-white border-[#8B1E2D] shadow-sm'
                : 'bg-white/60 border-[#E8DFC8] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-[#8B1E2D]">{entry.bibleReference}</span>
                <span className="text-[9px] font-semibold bg-[#C59B27]/15 text-[#855D14] px-1.5 py-0.5 rounded">
                  {entry.cccLinks.length} GL • {entry.churchDocumentLinks.length} VK
                </span>
              </div>
              <p className="text-[11px] text-[#6D5D55] font-semibold">{entry.theme}</p>
              <p className="text-[11px] text-[#8D6E63] mt-1 line-clamp-2 italic">"{entry.verseText.slice(0, 70)}..."</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Cross-Reference Detail */}
      <div className="lg:col-span-8 space-y-5">
        {/* Bible Verse Hero */}
        <div className="bg-gradient-to-br from-[#FAF4E8] to-[#FAF7F2] rounded-3xl p-6 border border-[#E8DFC8]">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-[#8B1E2D]" />
            <span className="font-bold text-[#8B1E2D]">{selectedEntry.bibleReference}</span>
            <span className="text-xs text-[#855D14] bg-[#C59B27]/15 px-2 py-0.5 rounded-full border border-[#C59B27]/30">
              {selectedEntry.theme}
            </span>
          </div>
          <blockquote className="font-serif text-base sm:text-lg text-[#2D1E18] leading-relaxed italic border-l-4 border-[#8B1E2D] pl-4">
            "{selectedEntry.verseText}"
          </blockquote>
        </div>

        {/* CCC Links Detail */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DFC8] shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-[#855D14] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            Liên Kết Sách Giáo Lý Hội Thánh Công Giáo (GLHTCG)
          </h3>
          <div className="space-y-3">
            {selectedEntry.cccLinks.map((link, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#C59B27]/15 text-[#855D14] text-xs font-bold border border-[#C59B27]/30">
                    GLHTCG Số {link.paragraphNumber}
                  </span>
                  <span className="font-bold text-sm text-[#2D1E18]">{link.title}</span>
                </div>
                <p className="text-sm text-[#5D4037] leading-relaxed">{link.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Church Document Links */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DFC8] shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#8B1E2D]" />
            Liên Kết Văn Kiện Hội Thánh
          </h3>
          <div className="space-y-3">
            {selectedEntry.churchDocumentLinks.map((doc, i) => (
              <div key={i} className="p-4 rounded-2xl border border-[#E8DFC8] bg-[#FAF7F2]">
                <div className="mb-2">
                  <span className="font-bold text-sm text-[#8B1E2D]">{doc.documentName}</span>
                  <span className="ml-2 text-[11px] text-[#8D6E63]">({doc.documentYear}) • {doc.section}</span>
                </div>
                <blockquote className="font-serif text-sm text-[#2D1E18] italic border-l-3 border-[#C59B27] pl-3 leading-relaxed">
                  "{doc.relevantText}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-References & Tradition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-[#E8DFC8] shadow-sm">
            <h3 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Link2 className="w-3.5 h-3.5 text-[#8B1E2D]" />
              Các Câu Kinh Thánh Song Hành
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedEntry.crossReferences.map((ref, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-[#8B1E2D]/10 text-[#8B1E2D] text-[11px] font-bold border border-[#8B1E2D]/20">
                  {ref}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#E8DFC8] shadow-sm">
            <h3 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Info className="w-3.5 h-3.5 text-[#855D14]" />
              Truyền Thống Công Giáo
            </h3>
            <p className="text-xs text-[#5D4037] leading-relaxed">
              {selectedEntry.catholicTraditionNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: ĐỐI CHIẾU CỰU ƯỚC - TÂN ƯỚC (TYPOLOGY)
// ============================================================================
function TypologyTab() {
  const [selectedTypology, setSelectedTypology] = useState<TypologyConnection>(TYPOLOGY_DATABASE[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 space-y-3">
        <h3 className="font-serif text-sm font-bold text-[#855D14] uppercase tracking-wider">
          Các Chủ Đề Tiên Trưng Nổi Bật
        </h3>
        <div className="space-y-2">
          {TYPOLOGY_DATABASE.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedTypology(item)}
              className={`w-full text-left p-4 rounded-2xl border transition ${selectedTypology.id === item.id
                ? 'bg-white border-[#8B1E2D] shadow-sm'
                : 'bg-white/60 border-[#E8DFC8] hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{item.symbol}</span>
                <div>
                  <div className="font-serif font-bold text-sm text-[#2D1E18] leading-tight">
                    {item.theme || item.title}
                  </div>
                  <div className="text-[11px] text-[#8D6E63] mt-0.5">
                    {item.otPassages?.[0]?.reference || item.otPassage?.reference} &rarr; {item.ntFulfillment?.[0]?.reference || item.ntPassage?.reference}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-8 space-y-5">
        <div className="bg-gradient-to-r from-[#FAF4E8] to-[#FAF7F2] rounded-3xl p-5 border border-[#E8DFC8]">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{selectedTypology.symbol}</span>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2D1E18]">{selectedTypology.theme}</h2>
              <p className="text-xs text-[#6D5D55]">{selectedTypology.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <BookOpen className="w-3.5 h-3.5" /> Cựu Ước (Hình Bóng)
            </h3>
            {selectedTypology.otPassages?.map((p, i) => (
              <div key={i} className="mb-3">
                <div className="font-bold text-sm text-amber-900">{p.reference}</div>
                <p className="text-xs text-[#5D4037] mt-1 italic leading-relaxed">"{p.text}"</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#8B1E2D]/20 shadow-sm">
            <h3 className="text-xs font-bold text-[#8B1E2D] uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <BookOpen className="w-3.5 h-3.5" /> Tân Ước (Thực Tại)
            </h3>
            {selectedTypology.ntFulfillment?.map((p, i) => (
              <div key={i} className="mb-3">
                <div className="font-bold text-sm text-[#8B1E2D]">{p.reference}</div>
                <p className="text-xs text-[#5D4037] mt-1 italic leading-relaxed">"{p.text}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFC8]">
            <h4 className="text-xs font-bold text-[#2D1E18] uppercase mb-2">Điểm Tương Đồng</h4>
            <ul className="space-y-1">
              {selectedTypology.similarities?.map((s, i) => (
                <li key={i} className="text-xs text-[#5D4037] flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFC8]">
            <h4 className="text-xs font-bold text-[#2D1E18] uppercase mb-2">Điểm Vượt Trội (Tân Ước)</h4>
            <ul className="space-y-1">
              {selectedTypology.differences?.map((d, i) => (
                <li key={i} className="text-xs text-[#5D4037] flex items-start gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#8B1E2D] mt-0.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {selectedTypology.catholicTradition && (
          <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] shadow-sm border-l-4 border-l-[#C59B27]">
            <h4 className="text-xs font-bold text-[#855D14] uppercase tracking-wider mb-2">Truyền Thống Giáo Phụ Công Giáo</h4>
            <p className="text-sm text-[#2D1E18] leading-relaxed italic font-serif">{selectedTypology.catholicTradition}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: GIÁO LÝ HỘI THÁNH (CATECHISM)
// ============================================================================
function CatechismTab() {
  const [catechismQuery, setCatechismQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<number | 'ALL'>('ALL');
  const [filteredCatechism, setFilteredCatechism] = useState<CatechismArticle[]>(CATECHISM_DATABASE);
  const [selectedArticle, setSelectedArticle] = useState<CatechismArticle | null>(null);

  useEffect(() => {
    let list = CATECHISM_DATABASE;
    if (selectedPillar !== 'ALL') list = list.filter(c => c.pillar === selectedPillar);
    if (catechismQuery.trim()) {
      const q = catechismQuery.toLowerCase().trim();
      list = list.filter(c =>
        c.paragraphNumber.toString().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q) ||
        c.scripturalFoundations.some(s => s.toLowerCase().includes(q))
      );
    }
    setFilteredCatechism(list);
  }, [catechismQuery, selectedPillar]);

  const pillars = [
    { id: 'ALL' as const, label: 'Tất Cả 4 Trụ Cột' },
    { id: 1, label: 'I. Tuyên Xưng Đức Tin' },
    { id: 2, label: 'II. Cử Hành Phụng Vụ' },
    { id: 3, label: 'III. Đời Sống Kitô Hữu' },
    { id: 4, label: 'IV. Kinh Nguyện' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D6E63]" />
          <input
            value={catechismQuery}
            onChange={e => setCatechismQuery(e.target.value)}
            placeholder="Tìm số GLHTCG, chủ đề, câu Kinh Thánh..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8DFC8] rounded-xl text-sm text-[#2D1E18] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
          />
        </div>

        <div className="space-y-1">
          {pillars.map(p => (
            <button key={String(p.id)} onClick={() => setSelectedPillar(p.id)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition ${selectedPillar === p.id ? 'bg-[#8B1E2D] text-white' : 'bg-white text-[#5D4037] border border-[#E8DFC8] hover:bg-[#FAF7F2]'}`}>
              {p.label}
            </button>
          ))}
        </div>

        <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
          {filteredCatechism.map(art => (
            <button key={art.paragraphNumber} onClick={() => setSelectedArticle(selectedArticle?.paragraphNumber === art.paragraphNumber ? null : art)}
              className={`w-full text-left p-3.5 rounded-xl border transition ${selectedArticle?.paragraphNumber === art.paragraphNumber ? 'bg-white border-[#8B1E2D] shadow-sm' : 'bg-white/60 border-[#E8DFC8] hover:bg-white'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-[#C59B27]/15 text-[#855D14] text-[10px] font-bold">Số {art.paragraphNumber}</span>
              </div>
              <div className="font-serif font-bold text-xs text-[#2D1E18] leading-snug">{art.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-8">
        {selectedArticle ? (
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFC8] shadow-sm space-y-5">
            <div className="pb-4 border-b border-[#E8DFC8]">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-lg bg-[#C59B27]/15 text-[#855D14] text-xs font-bold border border-[#C59B27]/30">GLHTCG Số {selectedArticle.paragraphNumber}</span>
                <span className="text-xs text-[#8D6E63]">{selectedArticle.pillarName}</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-[#2D1E18]">{selectedArticle.title}</h2>
              <p className="text-xs text-[#6D5D55] mt-0.5">{selectedArticle.chapter} • {selectedArticle.section}</p>
            </div>

            <p className="font-serif text-sm text-[#2D1E18] leading-relaxed">{selectedArticle.content}</p>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#8B1E2D] uppercase">Nền Tảng Kinh Thánh</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedArticle.scripturalFoundations.map((r, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-[#8B1E2D]/10 text-[#8B1E2D] text-[11px] font-bold border border-[#8B1E2D]/20">{r}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#2D1E18] uppercase">Các Điểm Giáo Lý Chính</h3>
              <ul className="space-y-2">
                {selectedArticle.keyDoctrines.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#5D4037]">
                    <span className="text-[#C59B27] font-bold mt-0.5">☩</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {selectedArticle.relatedParagraphs && selectedArticle.relatedParagraphs.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8]">
                <h3 className="text-xs font-bold text-[#855D14] uppercase mb-2">Các Số GLHTCG Liên Quan</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.relatedParagraphs.map((n, i) => (
                    <button key={i} onClick={() => {
                      const found = CATECHISM_DATABASE.find(a => a.paragraphNumber === n);
                      if (found) setSelectedArticle(found);
                    }} className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#C59B27]/15 text-[#855D14] text-[11px] font-bold border border-[#C59B27]/30 transition">
                      Số {n}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-[#8D6E63] bg-white rounded-3xl border border-dashed border-[#E8DFC8]">
            <Layers className="w-10 h-10 mx-auto mb-3 text-stone-300" />
            <p className="text-sm font-serif">Chọn một mục GLHTCG bên trái để xem nội dung chi tiết.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: THƯ VIỆN VĂN KIỆN HỘI THÁNH (9 PHÂN LOẠI CHUẨN MỰC)
// ============================================================================
function ChurchDocumentsTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [docQuery, setDocQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<ChurchDocumentItem>(CHURCH_DOCUMENTS_DATABASE[0]);

  const categories = [
    { id: 'ALL', label: 'Tất Cả 9 Nhóm' },
    { id: 'VATICAN_II', label: 'Công đồng Vaticanô II' },
    { id: 'POPE_TEACHINGS', label: 'Giáo huấn Giáo hoàng' },
    { id: 'SOCIAL_DOCTRINE', label: 'Học thuyết Xã hội' },
    { id: 'LITURGY', label: 'Phụng vụ' },
    { id: 'DOCTRINE_FAITH', label: 'Giáo lý & Đức tin' },
    { id: 'FAMILY_HUMAN_DIGNITY', label: 'Gia đình & Sự sống' },
    { id: 'VOCATION_CONSECRATED', label: 'Ơn gọi & Đời tu' },
    { id: 'MISSION_EVANGELIZATION', label: 'Truyền giáo' },
    { id: 'ECOLOGY_ENVIRONMENT', label: 'Môi sinh toàn diện' },
  ];

  const filteredDocs = CHURCH_DOCUMENTS_DATABASE.filter(d => {
    const matchCat = selectedCategory === 'ALL' || d.category === selectedCategory;
    const q = docQuery.toLowerCase().trim();
    const matchQ = !q ||
      d.latinTitle.toLowerCase().includes(q) ||
      d.vietnameseTitle.toLowerCase().includes(q) ||
      d.promulgator.toLowerCase().includes(q) ||
      d.mainThemes.some(t => t.toLowerCase().includes(q)) ||
      d.summary.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Cột trái: Bộ lọc danh mục, tìm kiếm và danh sách văn kiện */}
      <div className="lg:col-span-4 space-y-3">
        {/* Ô tìm kiếm văn kiện */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D6E63]" />
          <input
            type="text"
            value={docQuery}
            onChange={e => setDocQuery(e.target.value)}
            placeholder="Tìm tên Latin, tiếng Việt, tác giả, chủ đề..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8DFC8] rounded-xl text-sm text-[#2D1E18] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
          />
        </div>

        {/* Bộ lọc 9 nhóm phân loại */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                selectedCategory === c.id
                  ? 'bg-[#762F3A] text-white shadow-xs'
                  : 'bg-white text-[#5D4037] border border-[#E8DFC8] hover:bg-[#FAF7F2]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Danh sách các văn kiện phù hợp */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {filteredDocs.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8D6E63] bg-white rounded-2xl border border-dashed border-[#E8DFC8]">
              Không tìm thấy văn kiện nào phù hợp với từ khóa &ldquo;{docQuery}&rdquo;.
            </div>
          ) : (
            filteredDocs.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full text-left p-3.5 rounded-xl border transition ${
                  selectedDoc.id === doc.id
                    ? 'bg-white border-[#762F3A] shadow-sm ring-1 ring-[#762F3A]/20'
                    : 'bg-white/70 border-[#E8DFC8] hover:bg-white hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-serif font-bold text-sm text-[#762F3A] leading-snug">
                    {doc.latinTitle}
                  </span>
                  <span className="text-[10px] font-semibold bg-[#B39A70]/15 text-[#855D14] px-1.5 py-0.5 rounded shrink-0">
                    {doc.year || doc.promulgationDate.slice(-4)}
                  </span>
                </div>
                <div className="font-medium text-xs text-[#2D1E18] line-clamp-1">
                  {doc.vietnameseTitle}
                </div>
                <div className="text-[11px] text-[#8D6E63] mt-0.5">
                  {doc.promulgator} &bull; {doc.categoryName}
                </div>
                <div className="text-[11px] text-[#6D5D55] mt-1 line-clamp-1 italic">
                  {doc.mainTheme || doc.mainThemes[0]}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Cột phải: Chi tiết văn kiện học thuật đầy đủ */}
      <div className="lg:col-span-8 space-y-5">
        {/* Banner Văn Kiện */}
        <div className="bg-gradient-to-br from-[#FAF4E8] to-[#FAF7F2] rounded-3xl p-6 border border-[#E8DFC8] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#762F3A] text-white">
                  {selectedDoc.categoryName}
                </span>
                <span className="text-xs text-[#855D14] font-semibold">
                  {selectedDoc.documentType || 'Văn Kiện Huấn Quyền'}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2D1E18]">
                {selectedDoc.latinTitle}
              </h2>
              <h3 className="font-serif text-base font-semibold text-[#762F3A]">
                {selectedDoc.vietnameseTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#6D5D55]">
                <span><strong>Ban hành bởi:</strong> {selectedDoc.promulgator}</span>
                <span>&bull;</span>
                <span><strong>Ngày:</strong> {selectedDoc.promulgationDate}</span>
              </div>
            </div>

            {selectedDoc.officialSource && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#855D14] bg-white px-3 py-1.5 rounded-xl border border-[#E8DFC8] shrink-0">
                <ExternalLink className="w-3.5 h-3.5" />
                {selectedDoc.officialSource}
              </span>
            )}
          </div>
        </div>

        {/* Nội dung chi tiết văn kiện */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFC8] shadow-sm space-y-5">
          {/* Bối cảnh & Mục đích */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8]/70">
              <span className="text-xs font-bold text-[#762F3A] uppercase tracking-wider block mb-1.5">
                Bối Cảnh Lịch Sử Ra Đời
              </span>
              <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
                {selectedDoc.historicalContext}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8]/70">
              <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider block mb-1.5">
                Mục Đích Ban Hành
              </span>
              <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
                {selectedDoc.purpose}
              </p>
            </div>
          </div>

          {/* Cấu trúc tổng quát */}
          {selectedDoc.structure && (
            <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs">
              <span className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider block mb-1">
                Cấu Trúc Tổng Quát Của Văn Kiện
              </span>
              <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
                {selectedDoc.structure}
              </p>
            </div>
          )}

          {/* Các Chủ Đề Chính */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider">
              Các Chủ Đề Thần Học & Mục Vụ Chính
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedDoc.mainThemes.map((theme, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FAF7F2] text-xs text-[#403A34] border border-[#E8DFC8]/50">
                  <span className="text-[#762F3A] font-bold mt-0.5">☩</span>
                  <span className="leading-relaxed">{theme}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tóm tắt nội dung */}
          <div>
            <h4 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider mb-2">
              Tóm Tắt Toàn Văn
            </h4>
            <p className="text-sm text-[#5D4037] leading-relaxed font-serif bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFC8]">
              {selectedDoc.summary}
            </p>
          </div>

          {/* Tóm tắt từng phần trọng yếu (Key Sections) */}
          {selectedDoc.keySections && selectedDoc.keySections.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#762F3A] uppercase tracking-wider">
                Tóm Tắt Từng Phần & Số Đoạn Tiêu Biểu
              </h4>
              <div className="space-y-3">
                {selectedDoc.keySections.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border-l-4 border-[#762F3A] border-t border-r border-b border-[#E8DFC8] shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#762F3A]">{sec.number} &bull; {sec.heading}</span>
                      {sec.biblicalRoot && sec.biblicalRoot.length > 0 && (
                        <span className="text-[10px] text-[#855D14] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFC8]">
                          {sec.biblicalRoot.join(', ')}
                        </span>
                      )}
                    </div>
                    <blockquote className="font-serif text-xs sm:text-sm text-[#2D1E18] italic leading-relaxed">
                      &ldquo;{sec.excerpt}&rdquo;
                    </blockquote>
                    <p className="text-[11px] text-[#8D6E63] pt-1">
                      <strong>Ý nghĩa thần học:</strong> {sec.theologicalKey}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trích dẫn tiêu biểu */}
          {selectedDoc.keyQuotes && selectedDoc.keyQuotes.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#855D14] uppercase tracking-wider">
                Các Trích Dẫn Thời Danh
              </h4>
              <div className="space-y-2">
                {selectedDoc.keyQuotes.map((q, i) => (
                  <blockquote key={i} className="p-3.5 rounded-xl bg-[#FAF7F2] border-l-4 border-[#B39A70] border border-[#E8DFC8] font-serif text-xs sm:text-sm italic text-[#2D1E18]">
                    &ldquo;{q.text}&rdquo;
                    <span className="block mt-1 font-sans text-[11px] font-bold text-[#855D14] not-italic">
                      — {selectedDoc.latinTitle}, {q.number}
                    </span>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {/* Kinh Thánh liên hệ */}
          {selectedDoc.scriptureConnections && selectedDoc.scriptureConnections.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#2D1E18] uppercase tracking-wider mb-2">
                Nền Tảng Kinh Thánh Liên Hệ
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDoc.scriptureConnections.map((ref, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#762F3A]/10 text-[#762F3A] text-[11px] font-bold border border-[#762F3A]/20">
                    {ref}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
type TabId = 'typology' | 'catechism' | 'documents' | 'dictionary' | 'parallel' | 'scripture-links';

function StudyContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabId) || 'typology';
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);

  const tabs = [
    { id: 'typology' as const, label: 'Tiên Trưng', icon: Compass },
    { id: 'catechism' as const, label: 'GLHTCG', icon: Layers },
    { id: 'documents' as const, label: 'Văn Kiện', icon: FileText },
    { id: 'dictionary' as const, label: 'Từ Điển', icon: BookMarked },
    { id: 'parallel' as const, label: 'Song Ngữ', icon: Languages },
    { id: 'scripture-links' as const, label: 'Liên Kết', icon: Link2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="border-b border-[#E8DFC8] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          Nghiên Cứu Chuyên Sâu
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2D1E18] mt-1">
          Nghiên Cứu & Học Hỏi Kinh Thánh Công Giáo
        </h1>
        <p className="text-xs text-[#5D4037] mt-1 max-w-3xl">
          Tiên trưng Cựu–Tân Ước • Giáo Lý Hội Thánh (GLHTCG) • Văn Kiện Công Đồng • Từ Điển Thần Học • Đối Chiếu Song Ngữ • Liên Kết Kinh Thánh ↔ Giáo Lý
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E8DFC8] shadow-sm">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition ${activeTab === tab.id
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'text-[#5D4037] hover:bg-[#FAF7F2]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'typology' && <TypologyTab />}
      {activeTab === 'catechism' && <CatechismTab />}
      {activeTab === 'documents' && <ChurchDocumentsTab />}
      {activeTab === 'dictionary' && <DictionaryTab />}
      {activeTab === 'parallel' && <ParallelTextTab />}
      {activeTab === 'scripture-links' && <ScriptureLinksTab />}
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-12 w-full max-w-2xl" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-96" />
          <Skeleton className="h-96 col-span-2" />
        </div>
      </div>
    }>
      <StudyContent />
    </Suspense>
  );
}
