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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#E8DFC8] px-2 py-1.5 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              isActive
                ? 'text-[#8B1E2D] font-bold'
                : 'text-[#8D6E63] hover:text-[#5D4037]'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${isActive ? 'bg-[#8B1E2D]/10' : ''}`}>
              <Icon className="w-5 h-5 stroke-[1.8]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
