'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Newspaper, 
  ExternalLink, 
  Clock, 
  RefreshCw, 
  ArrowRight, 
  Sparkles, 
  Bookmark, 
  Church, 
  ChevronRight 
} from 'lucide-react';
import { CatholicNewsItem } from '@/types';

export function CatholicNewsWidget() {
  const [news, setNews] = useState<CatholicNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedTime, setUpdatedTime] = useState<string>('Vừa xong');

  const fetchNews = async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setNews(json.data.slice(0, 4)); // Lấy 4 bài viết thời sự mới nhất
          setUpdatedTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
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
    // Tự động làm mới mỗi 60 giây
    const interval = setInterval(() => {
      fetchNews();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      aria-label="Tin tức Giáo hội và Huấn quyền HĐGMVN"
      className="relative overflow-hidden bg-white dark:bg-[#272220] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E7E0D5] dark:border-[#B39A70]/40 shadow-sm transition-all duration-300 space-y-6"
    >
      {/* Background chìm nghệ thuật */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-10 pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=40&w=1200&auto=format&fit=crop')` }}
      />

      {/* Header Khối Tin Tức */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E7E0D5] dark:border-[#3E302A] pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#762F3A]/10 dark:bg-amber-500/10 text-[#762F3A] dark:text-[#E5BE53] text-[11px] font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>THỜI SỰ GIÁO HỘI &amp; HUẤN QUYỀN HĐGMVN</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#762F3A] dark:text-[#E5BE53]">
            Tin Tức &amp; Thông Điệp Hội Đồng Giám Mục
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
            Dòng sự kiện Công Giáo, tiếng nói Huấn Quyền và sinh hoạt Dân Chúa được tự động cập nhật theo thời gian thực từ HĐGMVN và Vatican News.
          </p>
        </div>

        {/* Nút Làm Mới & Xem Thêm */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => fetchNews(true)}
            disabled={isRefreshing}
            className="p-2.5 rounded-xl border border-[#E7E0D5] dark:border-[#3E302A] hover:border-[#762F3A] text-stone-500 hover:text-[#762F3A] dark:hover:text-[#E5BE53] text-xs font-semibold transition active:scale-95 disabled:opacity-50"
            title="Cập nhật tin mới nhất"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#762F3A] dark:text-[#E5BE53]' : ''}`} />
          </button>

          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#762F3A] hover:bg-[#5E252E] text-white text-xs font-bold tracking-wider uppercase shadow-sm hover:shadow transition"
          >
            <span>Xem Tất Cả Tin Tức HĐGMVN</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E5BE53]" />
          </Link>
        </div>
      </div>

      {/* Danh sách thẻ bài tin tức Grid 4 Cột */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3 p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1615] animate-pulse border border-[#E7E0D5] dark:border-[#3E302A]">
              <div className="aspect-video w-full bg-stone-200 dark:bg-stone-800 rounded-xl" />
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
              <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-full" />
              <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
            </div>
          ))
        ) : (
          news.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1615] border border-[#E7E0D5] dark:border-[#3E302A] hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Thumbnail Image */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
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

                {/* Article Title */}
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#403A34] dark:text-[#F7F4EE] group-hover:text-[#762F3A] dark:group-hover:text-[#E5BE53] transition line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 mt-3 border-t border-[#E7E0D5]/70 dark:border-[#3E302A] flex items-center justify-between text-xs font-semibold text-[#762F3A] dark:text-[#E5BE53]">
                <span>Đọc bản tin trọn vẹn</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))
        )}
      </div>

      {/* Footer status nhỏ */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400 dark:text-stone-500 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Tự động đồng bộ tin tức thời gian thực &bull; Cập nhật lúc {updatedTime}</span>
        </div>
        <div className="italic">
          Nguồn chính thức: Hội đồng Giám mục Việt Nam (hdgmvietnam.com) &amp; Vatican News Tiếng Việt
        </div>
      </div>
    </section>
  );
}
export default CatholicNewsWidget;
