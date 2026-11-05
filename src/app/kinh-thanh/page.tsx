'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function BibleContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const bookId = (params?.bookId as string) || 'matt';
  const chapterParam = searchParams?.get('chapter') || '1';

  const [contentHtml, setContentHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchChapter() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/bible-fetch?book=${bookId}&chapter=${chapterParam}`);
        const data = await res.json();
        if (data.success && data.html) {
          setContentHtml(data.html);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChapter();
  }, [bookId, chapterParam]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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

      {isLoading ? (
        <div className="text-center py-12 text-gray-500 animate-pulse">
          Đang tải văn bản Kinh Thánh từ máy chủ...
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

export default function BookPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Đang nạp...</div>}>
      <BibleContent />
    </Suspense>
  );
}