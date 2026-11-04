'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, HeartHandshake, CheckCircle2, History, Plus, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BibleStore } from '@/lib/bible-store';
import { AuditLogEntry } from '@/lib/auth/rbac';

export default function AdminDashboardPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    setAuditLogs(BibleStore.getAuditLogs().slice(0, 5));
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#8B1E2D]">
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              100% Xác Minh
            </span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#2D1E18]">
            73 Sách
          </div>
          <p className="text-xs text-[#5D4037]">
            46 Cựu Ước (gồm 7 Đệ Nhị Quy Điển) + 27 Tân Ước.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#C59B27]">
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Phụng Vụ Chuẩn
            </span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#2D1E18]">
            Lịch Phụng Vụ
          </div>
          <p className="text-xs text-[#5D4037]">
            Bài đọc I, Đáp ca, Bài đọc II, Tin Mừng theo chu kỳ.
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-[#8B1E2D]">
            <HeartHandshake className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
              Linh Đạo 8 Phần
            </span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#2D1E18]">
            Suy Niệm
          </div>
          <p className="text-xs text-[#5D4037]">
            Lời Chúa, bối cảnh, sứ điệp, câu hỏi, quyết tâm, lời nguyện.
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              RBAC Bật
            </span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#2D1E18]">
            Bảo Mật
          </div>
          <p className="text-xs text-[#5D4037]">
            Phân quyền 5 cấp bậc & Audit Trail toàn diện.
          </p>
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-4">
        <h2 className="font-serif text-base font-bold text-[#2D1E18]">
          Thao Tác Quản Trị Nhanh
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/phung-vu"
            className="p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#FAF4E8] border border-[#E8DFC8] hover:border-[#8B1E2D] transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#2D1E18]">
                Nhập Bài Đọc Phụng Vụ
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#8B1E2D]" />
          </Link>

          <Link
            href="/admin/suy-niem"
            className="p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#FAF4E8] border border-[#E8DFC8] hover:border-[#8B1E2D] transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C59B27] text-white flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#2D1E18]">
                Soạn Bài Suy Niệm 8 Phần
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#C59B27]" />
          </Link>

          <Link
            href="/admin/kiem-duyet-nguon"
            className="p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#FAF4E8] border border-[#E8DFC8] hover:border-purple-600 transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-[#2D1E18]">
                Thẩm Định Nguồn Trích Dẫn
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-purple-700" />
          </Link>
        </div>
      </div>

      {/* 3. Recent Audit Logs Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#8B1E2D]" />
            <h3 className="font-serif text-sm font-bold text-[#2D1E18]">
              Nhật Ký Thao Tác Quản Trị Gần Đây (Audit Trail)
            </h3>
          </div>
          <Link
            href="/admin/audit-logs"
            className="text-xs font-semibold text-[#8B1E2D] hover:underline"
          >
            Xem tất cả nhật ký →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-stone-500 border-b border-stone-200">
                <th className="py-2.5 font-semibold">Thời Gian</th>
                <th className="py-2.5 font-semibold">Người Thực Hiện</th>
                <th className="py-2.5 font-semibold">Hành Động</th>
                <th className="py-2.5 font-semibold">Tài Nguyên</th>
                <th className="py-2.5 font-semibold">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50/60">
                  <td className="py-3 text-stone-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString('vi-VN')} {new Date(log.timestamp).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="py-3 font-semibold text-[#2D1E18]">
                    {log.userName}
                    <span className="block text-[10px] text-stone-400 font-normal">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {log.actionLabel}
                    </span>
                  </td>
                  <td className="py-3 font-serif font-semibold text-[#8B1E2D]">
                    {log.resourceTitle}
                  </td>
                  <td className="py-3 text-[#5D4037] max-w-xs truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
