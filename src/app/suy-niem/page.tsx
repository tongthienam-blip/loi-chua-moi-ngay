'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { HeartHandshake, Volume2, Bookmark, CheckCircle2, BookOpen, Calendar, HelpCircle, Target, Sparkles, Plus, Save } from 'lucide-react';
import { getReflectionByDate } from '@/data/daily-reflections';
import { DailyReflectionItem, SpiritualJournalRecord } from '@/types';
import { AudioPlayerBar } from '@/components/AudioPlayerBar';
import { BibleStore } from '@/lib/bible-store';
import { getVietnamTodayString, addDaysToDate, formatVietnamDateFull } from '@/lib/liturgy/timezone';

export default function DailyReflectionAndJournalPage() {
  const [selectedDate, setSelectedDate] = useState(() => getVietnamTodayString());
  const [reflection, setReflection] = useState<DailyReflectionItem>(() => 
    getReflectionByDate(getVietnamTodayString())
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const todayStr = useMemo(() => getVietnamTodayString(), []);
  const yesterdayStr = useMemo(() => addDaysToDate(todayStr, -1), [todayStr]);
  const tomorrowStr = useMemo(() => addDaysToDate(todayStr, 1), [todayStr]);

  // Midnight listener
  useEffect(() => {
    const checkMidnight = () => {
      const currentToday = getVietnamTodayString();
      if (selectedDate === todayStr && currentToday !== todayStr) {
        setSelectedDate(currentToday);
        setReflection(getReflectionByDate(currentToday));
      }
    };

    const interval = setInterval(checkMidnight, 60000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkMidnight();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [selectedDate, todayStr]);

  const handleDateChange = (newDateStr: string) => {
    if (!newDateStr) return;
    setSelectedDate(newDateStr);
    setReflection(getReflectionByDate(newDateStr));
  };

  // Journal form state
  const [journalEntries, setJournalEntries] = useState<SpiritualJournalRecord[]>([]);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalThought, setJournalThought] = useState('');
  const [journalPrayer, setJournalPrayer] = useState('');
  const [journalResolution, setJournalResolution] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // Load local journal from user data
    const local = localStorage.getItem('loi_chua_spiritual_journal_v1');
    if (local) {
      try {
        setJournalEntries(JSON.parse(local));
      } catch (e) {
        console.warn(e);
      }
    }
  }, []);

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalThought.trim()) return;

    const newEntry: SpiritualJournalRecord = {
      id: `entry-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: journalTitle.trim() || `Tâm tình ngày ${new Date().toLocaleDateString('vi-VN')}`,
      scriptureReference: reflection.scriptureReference,
      scriptureQuote: reflection.scriptureText,
      touchedByWord: journalThought,
      personalPrayer: journalPrayer,
      dailyResolution: journalResolution,
      tags: [reflection.category]
    };

    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('loi_chua_spiritual_journal_v1', JSON.stringify(updated));

    setJournalTitle('');
    setJournalThought('');
    setJournalPrayer('');
    setJournalResolution('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in">
      {/* 0. Date Navigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#8B1E2D]" />
          <span className="font-serif text-sm font-bold text-[#2D1E18]">
            Suy Niệm Theo Ngày Phụng Vụ
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => handleDateChange(yesterdayStr)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedDate === yesterdayStr
                ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                : 'bg-black/5 border-transparent hover:bg-black/10'
            }`}
          >
            Hôm Qua
          </button>
          <button
            onClick={() => handleDateChange(todayStr)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedDate === todayStr
                ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                : 'bg-black/5 border-transparent hover:bg-black/10'
            }`}
          >
            Hôm Nay
          </button>
          <button
            onClick={() => handleDateChange(tomorrowStr)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              selectedDate === tomorrowStr
                ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                : 'bg-black/5 border-transparent hover:bg-black/10'
            }`}
          >
            Ngày Mai
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-black/5 text-xs font-semibold border border-black/10 focus:outline-none"
          />
        </div>
      </div>

      {/* 1. Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#FAF4E8] to-[#F4EFE6] border border-[#E8DFC8] shadow-sacred space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8B1E2D] text-white">
            Linh Đạo 8 Phần Chuẩn Mực
          </span>
          <button
            onClick={() => setIsPlayingAudio(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#8B1E2D] border border-[#8B1E2D]/20 text-xs font-semibold shadow-sm hover:bg-stone-50 transition"
          >
            <Volume2 className="w-4 h-4" />
            Lắng Nghe Bài Suy Niệm
          </button>
        </div>

        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2D1E18]">
          {reflection.title}
        </h1>
        <div className="text-xs text-[#855D14] font-semibold">
          Chuyên mục: {reflection.category} • Ngày: {formatVietnamDateFull(selectedDate)}
        </div>
      </div>

      {/* 2. Cấu Trúc 8 Phần Suy Niệm */}
      <div className="space-y-6">
        {/* Phần 1: Lời Chúa */}
        <section className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-3">
          <span className="text-xs font-bold text-[#8B1E2D] uppercase tracking-wider block">
            1. Lời Chúa ({reflection.scriptureReference})
          </span>
          <blockquote className="font-serif text-base md:text-lg text-[#2D1E18] italic border-l-4 border-[#8B1E2D] pl-4">
            "{reflection.scriptureText}"
          </blockquote>
        </section>

        {/* Phần 2: Bối Cảnh Lịch Sử & Phụng Vụ */}
        <section className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-2">
          <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider block">
            2. Bối Cảnh Lịch Sử & Phụng Vụ
          </span>
          <p className="text-sm text-[#3E2723] leading-relaxed">
            {reflection.background}
          </p>
        </section>

        {/* Phần 3: Giải Thích Ý Nghĩa Bản Văn */}
        <section className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-2">
          <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider block">
            3. Giải Thích Ý Nghĩa Bản Văn
          </span>
          <p className="text-sm text-[#3E2723] leading-relaxed">
            {reflection.explanation}
          </p>
        </section>

        {/* Phần 4: Sứ Điệp Thần Học Chính Yếu */}
        <section className="p-6 rounded-3xl bg-[#FAF4E8] border border-[#C59B27]/40 shadow-sm space-y-2">
          <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider block">
            4. Sứ Điệp Thần Học Chính Yếu
          </span>
          <p className="font-serif text-sm font-semibold text-[#2D1E18] leading-relaxed">
            {reflection.coreMessage}
          </p>
        </section>

        {/* Phần 5: Liên Hệ Thực Tế Đời Sống */}
        <section className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-2">
          <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider block">
            5. Liên Hệ Thực Tế Đời Sống
          </span>
          <p className="text-sm text-[#3E2723] leading-relaxed">
            {reflection.lifeApplication}
          </p>
        </section>

        {/* Phần 6: Câu Hỏi Gợi Ý Suy Gẫm */}
        <section className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-3">
          <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider block flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#C59B27]" />
            6. Câu Hỏi Gợi Ý Suy Gẫm
          </span>
          <div className="space-y-2">
            {reflection.reflectionQuestions.map((q, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs font-medium text-[#2D1E18]">
                {q}
              </div>
            ))}
          </div>
        </section>

        {/* Phần 7: Quyết Tâm Thực Hành Cụ Thể */}
        <section className="p-6 rounded-3xl bg-[#FFF9FA] border border-[#8B1E2D]/30 shadow-sm space-y-2">
          <span className="text-xs font-bold text-[#8B1E2D] uppercase tracking-wider block flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#8B1E2D]" />
            7. Quyết Tâm Thực Hành Cụ Thể
          </span>
          <p className="font-serif text-sm font-bold text-[#8B1E2D] italic">
            "{reflection.practicalResolution}"
          </p>
        </section>

        {/* Phần 8: Lời Nguyện Tâm Tình */}
        <section className="p-6 rounded-3xl bg-white border-2 border-[#C59B27]/40 shadow-sm space-y-2">
          <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider block flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            8. Lời Nguyện Kết Thúc
          </span>
          <p className="font-serif text-sm text-[#2D1E18] italic leading-relaxed pl-3 border-l-2 border-[#C59B27]">
            "{reflection.prayer}"
          </p>
        </section>
      </div>

      {/* 3. Nhật Ký Thiêng Liêng Riêng Tư */}
      <section className="p-6 md:p-8 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-5">
        <div className="border-b border-stone-100 pb-3">
          <span className="text-xs font-bold text-[#8B1E2D] uppercase tracking-wider block">
            Không Gian Riêng Tư
          </span>
          <h3 className="font-serif text-xl font-bold text-[#2D1E18]">
            Nhật Ký Thiêng Liêng Của Bạn
          </h3>
          <p className="text-xs text-[#5D4037] mt-0.5">
            Ghi lại điều Lời Chúa đánh động tâm hồn bạn, lời cầu nguyện riêng và quyết tâm cá nhân hôm nay. Dữ liệu được bảo mật an toàn trên thiết bị của bạn.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Đã lưu trang nhật ký thiêng liêng thành công!
          </div>
        )}

        <form onSubmit={handleSaveJournal} className="space-y-4">
          <input
            type="text"
            value={journalTitle}
            onChange={(e) => setJournalTitle(e.target.value)}
            placeholder="Tiêu đề tâm tình (Tùy chọn)..."
            className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none"
          />

          <textarea
            rows={3}
            required
            value={journalThought}
            onChange={(e) => setJournalThought(e.target.value)}
            placeholder="Điều gì trong câu Lời Chúa hôm nay đánh động tâm hồn bạn nhất?..."
            className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <textarea
              rows={2}
              value={journalPrayer}
              onChange={(e) => setJournalPrayer(e.target.value)}
              placeholder="Lời thưa thầm thĩ dâng lên Chúa..."
              className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none"
            />
            <textarea
              rows={2}
              value={journalResolution}
              onChange={(e) => setJournalResolution(e.target.value)}
              placeholder="Quyết tâm sống cụ thể của bạn..."
              className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition"
            >
              <Save className="w-4 h-4" />
              Lưu Vào Nhật Ký Thiêng Liêng
            </button>
          </div>
        </form>

        {/* Existing Journal Entries */}
        {journalEntries.length > 0 && (
          <div className="pt-6 border-t border-stone-100 space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#2D1E18]">
              Những Ghi Chép Cũ ({journalEntries.length})
            </h4>

            <div className="space-y-3">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#8B1E2D]">
                    <span>{entry.title}</span>
                    <span className="text-[10px] text-stone-400 font-normal">
                      {new Date(entry.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <p className="text-xs text-[#2D1E18] leading-relaxed">
                    {entry.touchedByWord}
                  </p>
                  {entry.personalPrayer && (
                    <p className="text-xs text-stone-600 italic">
                      "Lời nguyện: {entry.personalPrayer}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Audio Player Bar */}
      {isPlayingAudio && (
        <AudioPlayerBar
          title={`Suy niệm: ${reflection.title}`}
          passageText={`${reflection.coreMessage}. ${reflection.lifeApplication}. Lời nguyện: ${reflection.prayer}`}
          onClose={() => setIsPlayingAudio(false)}
        />
      )}
    </div>
  );
}
