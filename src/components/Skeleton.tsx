import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[#EADBCE]/50 rounded-md ${className}`}
    />
  );
}

export function BibleReaderSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-[#E8DFC8]">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
      <div className="space-y-4 pt-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <div className="pt-4 space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
}

export function LiturgySkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Skeleton className="h-16 w-full rounded-xl" />
      <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#E8DFC8]">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}
