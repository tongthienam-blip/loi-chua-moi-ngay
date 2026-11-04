'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, BookOpen, Calendar, HeartHandshake, CheckCircle2, History, Users, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const adminNav = [
    { href: '/admin', label: 'Tổng Quan Bảng Điều Khiển', icon: Shield },
    { href: '/admin/phung-vu', label: 'Quản Lý Bài Đọc Phụng Vụ', icon: Calendar },
    { href: '/admin/suy-niem', label: 'Quản Lý Bài Suy Niệm (8 Phần)', icon: HeartHandshake },
    { href: '/admin/kiem-duyet-nguon', label: 'Thẩm Định & Kiểm Duyệt Nguồn', icon: CheckCircle2 },
    { href: '/admin/audit-logs', label: 'Nhật Ký Lịch Sử (Audit Logs)', icon: History },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Admin Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#2D1E18] to-[#4A2D1F] text-white shadow-sacred">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#C59B27] text-[#2D1E18] flex items-center justify-center font-serif text-xl font-bold shadow-md">
            ☩
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8B1E2D] text-white">
                GIAI ĐOẠN 8: QUẢN TRỊ & BẢO MẬT
              </span>
              <span className="text-xs text-stone-300">
                Vai trò: Super Admin & Chuyên gia Thần học
              </span>
            </div>
            <h1 className="font-serif text-xl font-bold text-white mt-0.5">
              Hệ Thống Quản Trị Trung Ương - Lời Chúa Mỗi Ngày
            </h1>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-stone-200 transition border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Về Giao Diện Người Dùng
        </Link>
      </div>

      {/* Admin Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E8DFC8]">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D] shadow-sm'
                  : 'bg-white text-[#5D4037] border-[#E8DFC8] hover:bg-[#F4EFE6]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Child Admin Pages */}
      <div>{children}</div>
    </div>
  );
}
