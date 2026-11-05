'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const bookId = params?.bookId as string;
  const chapterParam = searchParams?.get('chapter') || '1';

  const [contentHtml, setContentHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchChapter() {
      if (!bookId) return;
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/bible-fetch?book=${bookId}&chapter=${chapterParam}`);
        const data = await res.json();
        if (data.success && data.html) {
          setContentHtml(data.html);
        } else {
          setError('Không thể tải nội dung chương này.');
        }
      } catch (err) {
        setError('Lỗi kết nối khi tải dữ liệu Kinh Thánh.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchChapter();
  }, [bookId, chapterParam]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Thanh điều hướng chương */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <Link 
          href={`/kinh-thanh/${bookId}?chapter=${Math.max(1, parseInt(chapterParam) - 1)}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
        >
          ← Chương trước
        </Link>
        <h1 className="text-2xl font-bold capitalize">
          {bookId} - Chương {chapterParam}
        </h1>
        <Link 
          href={`/kinh-thanh/${bookId}?chapter=${parseInt(chapterParam) + 1}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
        >
          Chương sau →
        </Link>
      </div>

      {/* Hiển thị nội dung văn bản Kinh Thánh */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg animate-pulse">Đang tải Kinh Thánh từ augustino.net...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500 bg-red-50 rounded-xl p-4">
          {error}
        </div>
      ) : (
        <div 
          className="bible-content prose max-w-none text-gray-800 leading-relaxed text-lg bg-white p-6 rounded-2xl shadow-sm border"
          dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />
      )}
    </div>
  );
}