'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const bookId = (params?.bookId as string) || 'matt';
  const chapterParam = searchParams?.get('chapter') || '1';

  const [contentHtml, setContentHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    async function fetchChapter() {
      setIsLoading(true);
      setErrorMsg('');
      try {
        const res = await fetch(`/api/bible-fetch?book=${bookId}&chapter=${chapterParam}`, {
          cache: 'no-store'
        });
        const data = await res.json();
        if (data.success && data.html) {
          setContentHtml(data.html);
        } else {
          setErrorMsg('Đang cập nhật văn bản cho chương này...');
        }
      } catch (err) {
        setErrorMsg('Lỗi kết nối tải dữ liệu.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchChapter();
  }, [bookId, chapterParam]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Thanh chuyển chương */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <Link 
          href={`/kinh-thanh/${bookId}?chapter=${Math.max(1, parseInt(chapterParam) - 1)}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
        >
          ← Chương trước
        </Link>
        <h1 className="text-xl font-bold uppercase">{bookId} - Chương {chapterParam}</h1>
        <Link 
          href={`/kinh-thanh/${bookId}?chapter=${parseInt(chapterParam) + 1}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
        >
          Chương sau →
        </Link>
      </div>

      {/* Hiển thị văn bản Kinh Thánh */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500 animate-pulse">
          Đang tải văn bản Kinh Thánh từ máy chủ...
        </div>
      ) : errorMsg ? (
        <div className="text-center py-8 text-amber-700 bg-amber-50 rounded-xl p-4">
          {errorMsg}
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