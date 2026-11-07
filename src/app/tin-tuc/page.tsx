'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Newspaper, 
  ExternalLink, 
  Clock, 
  Search, 
  RefreshCw, 
  ArrowLeft, 
  Sparkles, 
  Filter, 
  Church, 
  ChevronRight 
} from 'lucide-react';
import { CatholicNewsItem } from '@/types';
import { Skeleton } from '@/components/Skeleton';

export default function TinTucPage() {
  const [news, setNews] = useState<CatholicNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSource, setSelectedSource] = useState<'ALL' | 'HĐGMVN' | 'Vatican News'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setNews(json.data);
        }
      }
    } catch (err) {
      console.warn('Lỗi tải tin tức:', err);
    } finally {
      setIsLoading(false);
      if (showRefresh) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchSource = selectedSource === 'ALL' || item.source === selectedSource;
      if (!matchSource) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [news, selectedSource, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#1A1615] text-[#403A34] dark:text-[#E7E0D5] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Background Decorative Accent */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1600&auto=format&fit=crop')` }}
      />

      <div className="relative max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#762F3A] bg-white dark:bg-[#272220] text-xs font-semibold text-stone-700 dark:text-stone-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>

          <button
            onClick={() => fetchNews(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#762F3A] bg-white dark:bg-[#272220] text-xs font-semibold text-stone-700 dark:text-stone-300 transition active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#762F3A] dark:text-[#E5BE53]' : ''}`} />
            <span>Cập Nhật Ngay</span>
          </button>
        </div>

        {/* Page Title Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#762F3A]/10 dark:bg-amber-500/10 border border-[#762F3A]/20 dark:border-amber-500/20 text-[#762F3A] dark:text-[#E5BE53] text-xs font-semibold tracking-wider uppercase">
            <Newspaper className="w-4 h-4" />
            <span>THỜI SỰ GIÁO HỘI CÔNG GIÁO VIỆT NAM &amp; TOÀN CẦU</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#762F3A] dark:text-[#E5BE53] tracking-tight">
            Tin Tức &amp; Thông Điệp Huấn Quyền
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
            Hệ thống nạp tin tức tự động theo thời gian thực từ Hội đồng Giám mục Việt Nam (HĐGMVN) và Vatican News Tiếng Việt.
          </p>
        </div>

        {/* Toolbar: Search & Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-[#272220] p-4 rounded-2xl border border-[#E7E0D5] dark:border-[#3E302A] shadow-xs">
          {/* Source Tabs */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: 'ALL', label: 'Tất Cả Nguồn Tin' },
              { id: 'HĐGMVN', label: 'Hội Đồng Giám Mục VN' },
              { id: 'Vatican News', label: 'Vatican News' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSource(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedSource === tab.id
                    ? 'bg-[#762F3A] text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bản tin..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#1A1615] text-xs focus:outline-none focus:ring-2 focus:ring-[#762F3A] dark:focus:ring-[#E5BE53]"
            />
          </div>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#272220] border border-[#E7E0D5] dark:border-[#3E302A] space-y-3 animate-pulse">
                <div className="aspect-video bg-stone-200 dark:bg-stone-800 rounded-xl" />
                <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full" />
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#272220] rounded-3xl border border-[#E7E0D5] dark:border-[#3E302A] space-y-2">
            <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">Không tìm thấy bản tin phù hợp.</p>
            <p className="text-xs text-stone-400">Hãy thử từ khóa khác hoặc nhấn "Cập Nhật Ngay".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-[#272220] border border-[#E7E0D5] dark:border-[#3E302A] hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-3.5">
                  {/* Thumbnail Image */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.source}
                    </div>
                  </div>

                  {/* Date & Category */}
                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="font-semibold text-[#855D14] dark:text-[#E5BE53]">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {item.publishedAt}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif font-bold text-base sm:text-lg text-[#403A34] dark:text-[#F7F4EE] group-hover:text-[#762F3A] dark:group-hover:text-[#E5BE53] transition line-clamp-2 leading-snug">
                    {item.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 mt-4 border-t border-[#E7E0D5]/70 dark:border-[#3E302A] flex items-center justify-between text-xs font-bold text-[#762F3A] dark:text-[#E5BE53]">
                  <span>Xem chi tiết bài viết</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
