'use client';

import React, { useState, useEffect } from 'react';
import { HeartHandshake, Plus, Save, CheckCircle2, AlertCircle, Edit3, BookOpen } from 'lucide-react';
import { DailyReflectionItem } from '@/types';
import { BibleStore } from '@/lib/bible-store';
import { validateEightPartReflection } from '@/lib/auth/security';
import { getVietnamTodayString } from '@/lib/liturgy/timezone';

export default function AdminReflectionsPage() {
  const [reflectionsList, setReflectionsList] = useState<DailyReflectionItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState<DailyReflectionItem>({
    id: '',
    date: getVietnamTodayString(),
    title: '',
    scriptureReference: '',
    scriptureText: '',
    background: '',
    explanation: '',
    coreMessage: '',
    lifeApplication: '',
    reflectionQuestions: [''],
    practicalResolution: '',
    prayer: '',
    category: 'Ơn gọi & Đời sống đức tin',
    author: 'Ban Mục Vụ Kinh Thánh'
  });

  useEffect(() => {
    setReflectionsList(BibleStore.getAllReflections());
  }, []);

  const handleEdit = (item: DailyReflectionItem) => {
    setFormData(item);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra cấu trúc 8 phần nghiêm ngặt
    const validation = validateEightPartReflection({
      background: formData.background,
      explanation: formData.explanation,
      coreMessage: formData.coreMessage,
      lifeApplication: formData.lifeApplication,
      reflectionQuestions: formData.reflectionQuestions,
      practicalResolution: formData.practicalResolution,
      prayer: formData.prayer,
      category: formData.category
    });

    if (!validation.isValid) {
      setErrorMsg(`Chưa đủ chuẩn 8 phần! Thiếu các phần: ${validation.missingFields.join(', ')}`);
      return;
    }

    const itemToSave: DailyReflectionItem = {
      ...formData,
      id: formData.id || `refl-${formData.date}`,
    };

    BibleStore.addOrUpdateReflection(itemToSave);
    setReflectionsList(BibleStore.getAllReflections());
    setSuccessMsg('Đã lưu bài suy niệm chuẩn 8 phần thành công và cập nhật lên hệ thống!');
    setTimeout(() => setSuccessMsg(''), 4000);
    setErrorMsg('');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFC8] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            Linh Đạo & Suy Niệm
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2D1E18] mt-1">
            Quản Lý Bài Suy Niệm Lời Chúa (Chuẩn Mực 8 Phần)
          </h2>
          <p className="text-xs text-[#5D4037] mt-1">
            Bắt buộc phải có đầy đủ 8 phần: Lời Chúa, Bối cảnh, Giải thích, Sứ điệp, Liên hệ, Câu hỏi, Quyết tâm, Lời nguyện.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              id: '',
              date: new Date().toISOString().split('T')[0],
              title: '',
              scriptureReference: '',
              scriptureText: '',
              background: '',
              explanation: '',
              coreMessage: '',
              lifeApplication: '',
              reflectionQuestions: [''],
              practicalResolution: '',
              prayer: '',
              category: 'Ơn gọi & Đời sống đức tin',
              author: 'Ban Mục Vụ Lời Chúa'
            });
            setIsEditing(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Soạn Bài Suy Niệm Mới
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          {errorMsg}
        </div>
      )}

      {/* Editor Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 md:p-8 rounded-3xl bg-white border border-[#8B1E2D]/30 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#8B1E2D]">
              {formData.id ? 'Sửa Bài Suy Niệm' : 'Biên Soạn Bài Suy Niệm Mới'}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-stone-500 hover:text-stone-700"
            >
              Đóng form
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#2D1E18] block mb-1">
                Ngày (YYYY-MM-DD)*
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-[#2D1E18] block mb-1">
                Tiêu Đề Bài Suy Niệm*
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: Lòng Quảng Đại Của Thiên Chúa và Bài Học Quản Lý Khôn Ngoan"
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>
          </div>

          {/* 1. Lời Chúa */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-3">
            <h4 className="text-xs font-bold text-[#8B1E2D] uppercase">
              1. Lời Chúa (Scripture Passage)*
            </h4>
            <input
              type="text"
              required
              value={formData.scriptureReference}
              onChange={(e) => setFormData({ ...formData, scriptureReference: e.target.value })}
              placeholder="Tọa độ câu (Ví dụ: Lc 16,1-8)"
              className="w-full p-2 rounded-xl bg-white border border-[#E8DFC8] text-xs"
            />
            <textarea
              rows={2}
              required
              value={formData.scriptureText}
              onChange={(e) => setFormData({ ...formData, scriptureText: e.target.value })}
              placeholder="Câu Kinh Thánh tâm điểm..."
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
            />
          </div>

          {/* 2 & 3: Bối Cảnh & Giải Thích */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
              <h4 className="text-xs font-bold text-[#2D1E18] uppercase">
                2. Bối Cảnh Lịch Sử / Phụng Vụ*
              </h4>
              <textarea
                rows={4}
                required
                value={formData.background}
                onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                placeholder="Bối cảnh không gian, người nghe, hành trình của Chúa Giêsu..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
              <h4 className="text-xs font-bold text-[#2D1E18] uppercase">
                3. Giải Thích Ý Nghĩa Bản Văn*
              </h4>
              <textarea
                rows={4}
                required
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                placeholder="Giải nghĩa các từ ngữ then chốt và cách hiểu theo truyền thống Hội Thánh..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>
          </div>

          {/* 4 & 5: Sứ Điệp Chính & Liên Hệ Đời Sống */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
              <h4 className="text-xs font-bold text-[#8B1E2D] uppercase">
                4. Sứ Điệp Thần Học Chính Yếu*
              </h4>
              <textarea
                rows={4}
                required
                value={formData.coreMessage}
                onChange={(e) => setFormData({ ...formData, coreMessage: e.target.value })}
                placeholder="Thông điệp cứu độ trung tâm mà Chúa muốn gửi gắm..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
              <h4 className="text-xs font-bold text-[#C59B27] uppercase">
                5. Liên Hệ Đời Sống Kitô Hữu*
              </h4>
              <textarea
                rows={4}
                required
                value={formData.lifeApplication}
                onChange={(e) => setFormData({ ...formData, lifeApplication: e.target.value })}
                placeholder="Thực tế xã hội hôm nay và thái độ của người tín hữu..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>
          </div>

          {/* 6. Câu Hỏi Suy Gẫm */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
            <h4 className="text-xs font-bold text-[#2D1E18] uppercase">
              6. Câu Hỏi Gợi Ý Suy Gẫm (Mỗi câu 1 dòng)*
            </h4>
            <textarea
              rows={3}
              required
              value={formData.reflectionQuestions.join('\n')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reflectionQuestions: e.target.value.split('\n').filter((q) => q.trim())
                })
              }
              placeholder="Tôi đang sử dụng của cải Chúa ban như thế nào?..."
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
            />
          </div>

          {/* 7 & 8: Quyết Tâm & Lời Nguyện */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
              <h4 className="text-xs font-bold text-[#8B1E2D] uppercase">
                7. Quyết Tâm Thực Hành Cụ Thể*
              </h4>
              <textarea
                rows={3}
                required
                value={formData.practicalResolution}
                onChange={(e) => setFormData({ ...formData, practicalResolution: e.target.value })}
                placeholder="Hôm nay tôi quyết tâm làm một việc bác ái..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
              <h4 className="text-xs font-bold text-[#8B1E2D] uppercase">
                8. Lời Nguyện Tâm Tình*
              </h4>
              <textarea
                rows={3}
                required
                value={formData.prayer}
                onChange={(e) => setFormData({ ...formData, prayer: e.target.value })}
                placeholder="Lạy Chúa Giêsu, xin dạy con biết..."
                className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition"
            >
              <Save className="w-4 h-4" />
              Lưu & Xuất Bản Bài Suy Niệm 8 Phần
            </button>
          </div>
        </form>
      )}

      {/* List of Reflections */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-[#2D1E18]">
          Danh Sách Bài Suy Niệm Hiện Có ({reflectionsList.length})
        </h3>

        <div className="divide-y divide-stone-100">
          {reflectionsList.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8B1E2D]">
                    {item.date}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Đủ 8 Phần
                  </span>
                  <span className="text-xs text-stone-400">
                    {item.scriptureReference}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#2D1E18]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#5D4037] line-clamp-1">
                  "{item.coreMessage}"
                </p>
              </div>

              <button
                onClick={() => handleEdit(item)}
                className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#FAF4E8] text-[#8B1E2D] border border-[#E8DFC8] text-xs font-semibold flex items-center gap-1 transition shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Sửa
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
