'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Save, CheckCircle2, AlertCircle, Volume2, Edit3, Trash2 } from 'lucide-react';
import { DailyLiturgicalReading, LiturgicalSeason, LiturgicalColor, FeastRank } from '@/types';
import { BibleStore } from '@/lib/bible-store';
import { getVietnamTodayString } from '@/lib/liturgy/timezone';

export default function AdminLiturgicalReadingsPage() {
  const [readingsList, setReadingsList] = useState<DailyLiturgicalReading[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState<DailyLiturgicalReading>({
    id: '',
    date: getVietnamTodayString(),
    title: 'Thứ Sáu Tuần XXXI Mùa Thường Niên',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'GREEN',
    colorName: 'Màu Xanh',
    rank: 'WEEKDAY',
    rankName: 'Ngày Trong Tuần',
    cycle: 'Năm B - Năm II',
    liturgicalWeek: 'Tuần XXXI Thường Niên',
    firstReading: {
      reference: 'Pl 3,17-4,1',
      passage: 'Thư của Thánh Phaolô gửi tín hữu Philípphê',
      theme: 'Quê hương chúng ta ở trên trời, nơi chúng ta mong đợi Đấng Cứu Độ.',
      text: 'Thưa anh em, xin hãy bắt chước tôi, và hãy nhìn vào những người đang sống theo mẫu mực anh em thấy nơi chúng tôi...'
    },
    responsorialPsalm: {
      reference: 'Tv 121 (122),1-2.3-4a.4b-5',
      refrain: 'Tôi vui mừng khi người ta nói với tôi: Chúng ta hãy tiến vào nhà Đức Chúa!',
      verses: [
        'Vui dường nào khi nghe người ta bảo: Ta cùng trẩy lên đền thánh Chúa!',
        'Giêrusalem hỡi, này chân chúng tôi đã dừng lại nơi tiền đình nhà bạn.'
      ]
    },
    gospel: {
      reference: 'Lc 16,1-8',
      passage: 'Tin Mừng Đức Giêsu Kitô theo Thánh Lu-ca',
      theme: 'Người quản gia bất lương và sự khôn khéo của con cái đời này.',
      text: 'Khi ấy, Đức Giêsu nói với các môn đệ rằng: Một người phú hộ kia có một viên quản lý; người ta tố cáo với ông rằng viên quản lý ấy phung phí tài sản của ông...'
    },
    sourceNote: 'Trích Sách Bài Đọc Phụng Vụ Thánh Lễ - Ủy Ban Phụng Tự / HĐGMVN.'
  });

  useEffect(() => {
    setReadingsList(BibleStore.getAllReadings());
  }, []);

  const handleEditReading = (item: DailyLiturgicalReading) => {
    setFormData(item);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.firstReading.text || !formData.gospel.text) {
      setErrorMsg('Vui lòng điền đầy đủ tiêu đề, ngày, Bài Đọc I và Tin Mừng!');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    const itemToSave: DailyLiturgicalReading = {
      ...formData,
      id: formData.id || `reading-${formData.date}`,
    };

    BibleStore.addOrUpdateReading(itemToSave);
    setReadingsList(BibleStore.getAllReadings());
    setSuccessMsg('Đã lưu bài đọc phụng vụ thành công và ghi nhận vào Audit Trail!');
    setTimeout(() => setSuccessMsg(''), 4000);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFC8] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            Quản Lý Phụng Vụ
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2D1E18] mt-1">
            Biên Tập & Nhập Bài Đọc Phụng Vụ Hằng Ngày
          </h2>
          <p className="text-xs text-[#5D4037] mt-1">
            Đối chiếu và nhập bản văn phụng vụ chính thức từ Sách Bài Đọc của Hội Đồng Giám Mục Việt Nam.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              id: '',
              date: new Date().toISOString().split('T')[0],
              title: '',
              season: 'ORDINARY_TIME',
              seasonName: 'Mùa Thường Niên',
              color: 'GREEN',
              colorName: 'Màu Xanh',
              rank: 'WEEKDAY',
              rankName: 'Ngày Trong Tuần',
              cycle: 'Năm B - Năm II',
              liturgicalWeek: 'Tuần Thường Niên',
              firstReading: { reference: '', passage: '', text: '' },
              responsorialPsalm: { reference: '', refrain: '', verses: [''] },
              gospel: { reference: '', passage: '', text: '' },
              sourceNote: 'Trích Sách Bài Đọc Phụng Vụ Thánh Lễ - HĐGMVN.'
            });
            setIsEditing(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Nhập Ngày Mới
        </button>
      </div>

      {/* Notifications */}
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

      {/* Editor Form Modal / Section */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 md:p-8 rounded-3xl bg-white border border-[#8B1E2D]/30 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#8B1E2D]">
              {formData.id ? 'Chỉnh Sửa Bài Đọc' : 'Nhập Dữ Liệu Bài Đọc Phụng Vụ Mới'}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-stone-500 hover:text-stone-700"
            >
              Đóng form
            </button>
          </div>

          {/* Row 1: Date & Title */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#2D1E18] block mb-1">
                Ngày Cử Hành (YYYY-MM-DD)*
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
                Tiêu Đề Ngày Lễ / Phụng Vụ*
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: Thứ Tư Tuần XXXI Mùa Thường Niên - Thánh Carôlô Bôrômêô"
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>
          </div>

          {/* Row 2: Color, Rank, Season */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#2D1E18] block mb-1">
                Màu Phụng Vụ
              </label>
              <select
                value={formData.color}
                onChange={(e) => {
                  const val = e.target.value as LiturgicalColor;
                  const names: Record<LiturgicalColor, string> = {
                    WHITE: 'Màu Trắng',
                    RED: 'Màu Đỏ',
                    PURPLE: 'Màu Tím',
                    GREEN: 'Màu Xanh',
                    ROSE: 'Màu Hồng',
                    GOLD: 'Màu Vàng Đồng',
                  };
                  setFormData({ ...formData, color: val, colorName: names[val] });
                }}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
              >
                <option value="WHITE">Trắng (Phục Sinh, Giáng Sinh, Lễ Thánh Nam Nữ)</option>
                <option value="RED">Đỏ (Thương Khó, Hiện Xuống, Tử Đạo)</option>
                <option value="PURPLE">Tím (Mùa Vọng, Mùa Chay, Cầu Hồn)</option>
                <option value="GREEN">Xanh (Mùa Thường Niên)</option>
                <option value="ROSE">Hồng (Chúa Nhật Gaudete & Laetare)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D1E18] block mb-1">
                Bậc Lễ
              </label>
              <select
                value={formData.rank}
                onChange={(e) => {
                  const val = e.target.value as FeastRank;
                  const names: Record<FeastRank, string> = {
                    SOLEMNITY: 'Lễ Trọng (Solemnitas)',
                    FEAST: 'Lễ Kính (Festum)',
                    MEMORIAL: 'Lễ Nhớ Bắt Buộc (Memoria)',
                    OPTIONAL_MEMORIAL: 'Lễ Nhớ Tùy Chọn',
                    WEEKDAY: 'Ngày Trong Tuần',
                  };
                  setFormData({ ...formData, rank: val, rankName: names[val] });
                }}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
              >
                <option value="SOLEMNITY">Lễ Trọng (Solemnitas)</option>
                <option value="FEAST">Lễ Kính (Festum)</option>
                <option value="MEMORIAL">Lễ Nhớ Bắt Buộc</option>
                <option value="OPTIONAL_MEMORIAL">Lễ Nhớ Tùy Chọn</option>
                <option value="WEEKDAY">Ngày Trong Tuần</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D1E18] block mb-1">
                Chu Kỳ Phụng Vụ
              </label>
              <input
                type="text"
                value={formData.cycle}
                onChange={(e) => setFormData({ ...formData, cycle: e.target.value })}
                placeholder="Năm B - Năm II"
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
              />
            </div>
          </div>

          {/* Section: Bài Đọc I */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-3">
            <h4 className="text-xs font-bold text-[#8B1E2D] uppercase">
              1. Bài Đọc I
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={formData.firstReading.reference}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstReading: { ...formData.firstReading, reference: e.target.value }
                  })
                }
                placeholder="Tọa độ trích (Ví dụ: Pl 2,12-18)"
                className="p-2 rounded-xl bg-white border border-[#E8DFC8] text-xs"
              />
              <input
                type="text"
                value={formData.firstReading.passage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstReading: { ...formData.firstReading, passage: e.target.value }
                  })
                }
                placeholder="Tên sách (Ví dụ: Thư Thánh Phaolô gửi tín hữu Philípphê)"
                className="p-2 rounded-xl bg-white border border-[#E8DFC8] text-xs"
              />
            </div>
            <textarea
              rows={4}
              value={formData.firstReading.text}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstReading: { ...formData.firstReading, text: e.target.value }
                })
              }
              placeholder="Toàn văn Bài Đọc I..."
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
            />
          </div>

          {/* Section: Thánh Vịnh Đáp Ca */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-3">
            <h4 className="text-xs font-bold text-[#C59B27] uppercase">
              2. Thánh Vịnh Đáp Ca
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={formData.responsorialPsalm.reference}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    responsorialPsalm: { ...formData.responsorialPsalm, reference: e.target.value }
                  })
                }
                placeholder="Tọa độ Tv (Ví dụ: Tv 26 (27),1.4.13-14)"
                className="p-2 rounded-xl bg-white border border-[#E8DFC8] text-xs"
              />
              <input
                type="text"
                value={formData.responsorialPsalm.refrain}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    responsorialPsalm: { ...formData.responsorialPsalm, refrain: e.target.value }
                  })
                }
                placeholder="Câu Đáp Ca..."
                className="p-2 rounded-xl bg-white border border-[#E8DFC8] text-xs"
              />
            </div>
            <textarea
              rows={3}
              value={formData.responsorialPsalm.verses.join('\n\n')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  responsorialPsalm: {
                    ...formData.responsorialPsalm,
                    verses: e.target.value.split('\n\n')
                  }
                })
              }
              placeholder="Các khổ thơ thánh vịnh (cách nhau bằng 1 dòng trống)..."
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
            />
          </div>

          {/* Section: Tin Mừng */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#8B1E2D]/20 space-y-3">
            <h4 className="text-xs font-bold text-[#8B1E2D] uppercase">
              3. Tin Mừng (Phúc Âm)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={formData.gospel.reference}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gospel: { ...formData.gospel, reference: e.target.value }
                  })
                }
                placeholder="Tọa độ Tin Mừng (Ví dụ: Lc 14,25-33)"
                className="p-2 rounded-xl bg-white border border-[#E8DFC8] text-xs"
              />
              <input
                type="text"
                value={formData.gospel.passage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gospel: { ...formData.gospel, passage: e.target.value }
                  })
                }
                placeholder="Tin Mừng theo Thánh Luca"
                className="p-2 rounded-xl bg-white border border-[#E8DFC8] text-xs"
              />
            </div>
            <input
              type="text"
              value={formData.gospel.theme || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gospel: { ...formData.gospel, theme: e.target.value }
                })
              }
              placeholder="Chủ đề Tin Mừng (Ví dụ: Ai không từ bỏ hết thảy của cải mình có...)"
              className="w-full p-2 rounded-xl bg-white border border-[#E8DFC8] text-xs"
            />
            <textarea
              rows={5}
              value={formData.gospel.text}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gospel: { ...formData.gospel, text: e.target.value }
                })
              }
              placeholder="Toàn văn Lời Chúa Tin Mừng..."
              className="w-full p-2.5 rounded-xl bg-white border border-[#E8DFC8] text-xs text-[#2D1E18]"
            />
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
              Lưu & Xuất Bản Bài Đọc
            </button>
          </div>
        </form>
      )}

      {/* List of Current Readings */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-[#2D1E18]">
          Danh Sách Bài Đọc Đã Nhập Trong Hệ Thống ({readingsList.length})
        </h3>

        <div className="divide-y divide-stone-100">
          {readingsList.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8B1E2D]">
                    {item.date}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {item.colorName} • {item.rankName}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#2D1E18]">
                  {item.title}
                </h4>
                <div className="text-xs text-stone-500">
                  {item.firstReading.reference} | {item.responsorialPsalm.reference} | {item.gospel.reference}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEditReading(item)}
                  className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#FAF4E8] text-[#8B1E2D] border border-[#E8DFC8] text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Sửa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
