'use client';

import React, { useState, useEffect } from 'react';
import { History, Search, Filter, Shield } from 'lucide-react';
import { BibleStore } from '@/lib/bible-store';
import { AuditLogEntry } from '@/lib/auth/rbac';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  useEffect(() => {
    setLogs(BibleStore.getAuditLogs());
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (actionFilter !== 'ALL' && log.action !== actionFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return (
        log.resourceTitle.toLowerCase().includes(q) ||
        log.userName.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8DFC8] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
          <History className="w-4 h-4" />
          An Ninh & Giám Sát
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#2D1E18] mt-1">
          Nhật Ký Thao Tác Quản Trị (Admin Audit Trail)
        </h2>
        <p className="text-xs text-[#5D4037] mt-1">
          Lưu vết bảo mật mọi hành động chỉnh sửa, nhập bài đọc, xuất bản suy niệm và thẩm định nguồn thần học.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên quản trị viên, tài nguyên, nội dung sửa đổi..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] rounded-xl text-xs text-[#2D1E18] border border-[#E8DFC8] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400 mr-1" />
          {['ALL', 'UPDATE', 'VERIFY', 'PUBLISH'].map((act) => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border ${
                actionFilter === act
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-[#FAF7F2] text-[#5D4037] border-[#E8DFC8]'
              }`}
            >
              {act === 'ALL' ? 'Tất cả' : act}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-stone-500 border-b border-stone-200">
                <th className="py-2.5 font-semibold">Thời Gian</th>
                <th className="py-2.5 font-semibold">Người Thực Hiện</th>
                <th className="py-2.5 font-semibold">Hành Động</th>
                <th className="py-2.5 font-semibold">Tài Nguyên</th>
                <th className="py-2.5 font-semibold">Chi Tiết Sửa Đổi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredLogs.map((log) => (
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
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {log.actionLabel}
                    </span>
                  </td>
                  <td className="py-3 font-serif font-semibold text-[#8B1E2D]">
                    {log.resourceTitle}
                  </td>
                  <td className="py-3 text-[#5D4037] max-w-sm">
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
