'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, BookOpen, Calendar, Bot, Heart } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: '/', label: 'Trang Chủ', icon: Sparkles },
    { href: '/kinh-thanh', label: 'Kinh Thánh', icon: BookOpen },
    { href: '/phung-vu', label: 'Phụng Vụ', icon: Calendar },
    { href: '/tro-ly-ai', label: 'Trợ Lý AI', icon: Bot },
    { href: '/ca-nhan', label: 'Cá Nhân', icon: Heart },
  ];

  return (
    <nav 
      aria-label="Thanh điều hướng dưới di động"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F4EE]/95 dark:bg-[#1A1412]/95 backdrop-blur-md border-t border-[#E7E0D5] dark:border-[#3E302A] px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-md transition-colors"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
              isActive
                ? 'text-[#762F3A] dark:text-[#E5BE53] font-bold'
                : 'text-[#8F877F] dark:text-[#A1887F] hover:text-[#403A34]'
            }`}
          >
            <div className={`p-1 rounded-lg transition ${isActive ? 'bg-[#762F3A]/10 dark:bg-[#E5BE53]/15' : ''}`}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
