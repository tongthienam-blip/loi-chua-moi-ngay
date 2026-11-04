'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Calendar, 
  Flame, 
  Award, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { READING_PLANS_DATABASE } from '@/data/reading-plans';
import { BibleStore } from '@/lib/bible-store';
import { ReadingPlanItem, UserPersonalData } from '@/types';

export default function ReadingPlansPage() {
  const [plans] = useState<ReadingPlanItem[]>(READING_PLANS_DATABASE);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(READING_PLANS_DATABASE[0].id);
  const [userData, setUserData] = useState<UserPersonalData | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'uncompleted'>('all');

  useEffect(() => {
    const data = BibleStore.getUserData();
    setUserData(data);
    if (data.activePlanId && plans.some(p => p.id === data.activePlanId)) {
      setSelectedPlanId(data.activePlanId);
    }
  }, [plans]);

  const activePlan = plans.find(p => p.id === selectedPlanId) || plans[0];
  const completedDays = (userData?.completedPlanDays && userData.completedPlanDays[activePlan.id]) || [];
  const percentCompleted = Math.round((completedDays.length / activePlan.durationDays) * 100);

  const handleToggleDay = (dayNumber: number) => {
    BibleStore.togglePlanDay(activePlan.id, dayNumber);
    setUserData(BibleStore.getUserData());
  };

  const handleSetActivePlan = (planId: string) => {
    BibleStore.setActivePlan(planId);
    setUserData(BibleStore.getUserData());
  };

  const handleResetProgress = () => {
    if (confirm(`Bạn có chắc muốn đặt lại toàn bộ tiến độ của kế hoạch "${activePlan.title}"?`)) {
      const data = BibleStore.getUserData();
      const updated = {
        ...data.completedPlanDays,
        [activePlan.id]: []
      };
      BibleStore.saveUserData({ completedPlanDays: updated });
      setUserData(BibleStore.getUserData());
    }
  };

  const filteredDays = activePlan.days.filter(d => {
    const isDone = completedDays.includes(d.dayNumber);
    if (filterMode === 'completed') return isDone;
    if (filterMode === 'uncompleted') return !isDone;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#855D14]">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Kế hoạch đọc Kinh Thánh</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D1E18]">
                Kế Hoạch Nuôi Dưỡng Lời Chúa
              </h1>
              <p className="text-sm text-[#6D5D55] mt-1 max-w-2xl">
                Lộ trình đọc Kinh Thánh Công giáo có hệ thống. Theo dõi tiến độ hằng ngày, duy trì ngọn lửa đức tin và sống Lời Chúa mỗi ngày.
              </p>
            </div>
            
            {/* Streak Counter Badge */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#E8DFC8] shadow-sm self-start sm:self-auto">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-[#8D6E63] uppercase tracking-wider">Chuỗi đọc liên tục</div>
                <div className="text-lg font-bold text-[#2D1E18]">
                  {userData?.streakDays || 1} ngày liên tiếp
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {plans.map((p) => {
            const isSelected = p.id === selectedPlanId;
            const isDefaultActive = userData?.activePlanId === p.id;
            const pCompleted = (userData?.completedPlanDays && userData.completedPlanDays[p.id]) || [];
            const pPct = Math.round((pCompleted.length / p.durationDays) * 100);

            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlanId(p.id)}
                className={`text-left p-4 rounded-2xl border transition relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#8B1E2D] shadow-md ring-2 ring-[#8B1E2D]/20'
                    : 'bg-white/60 hover:bg-white border-[#E8DFC8] hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D]">
                      {p.durationDays} Ngày
                    </span>
                    {isDefaultActive && (
                      <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Đang theo
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif font-bold text-sm text-[#2D1E18] line-clamp-2 leading-snug">
                    {p.title}
                  </h2>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-between text-[11px] text-[#8D6E63] mb-1">
                    <span>{pCompleted.length}/{p.durationDays} ngày</span>
                    <span className="font-bold text-[#8B1E2D]">{pPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#C59B27] to-[#8B1E2D] transition-all duration-300" 
                      style={{ width: `${Math.min(pPct, 100)}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Plan Details Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E8DFC8]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C59B27]/15 text-[#855D14]">
                  {activePlan.categoryLabel}
                </span>
                <span className="text-xs text-[#8D6E63]">• {activePlan.badge}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1E18]">
                {activePlan.title}
              </h2>
              <p className="text-sm text-[#6D5D55] max-w-3xl leading-relaxed">
                {activePlan.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {userData?.activePlanId !== activePlan.id ? (
                <button
                  onClick={() => handleSetActivePlan(activePlan.id)}
                  className="px-4 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Đặt Làm Kế Hoạch Chính
                </button>
              ) : (
                <div className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Kế Hoạch Chính Hiện Tại
                </div>
              )}

              <button
                onClick={handleResetProgress}
                className="px-3.5 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-semibold transition flex items-center gap-1.5"
                title="Đặt lại tiến độ"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Đặt lại
              </button>
            </div>
          </div>

          {/* Progress Overview Bar */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFC8] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#2D1E18]">
                Tiến độ: <strong className="text-[#8B1E2D]">{completedDays.length}</strong> / {activePlan.durationDays} ngày hoàn thành
              </span>
              <span className="text-[#855D14] font-bold text-sm">{percentCompleted}%</span>
            </div>
            <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#C59B27] via-[#8B1E2D] to-[#550c18] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(percentCompleted, 100)}%` }}
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-[#E8DFC8]">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterMode === 'all'
                    ? 'bg-[#8B1E2D] text-white shadow-sm'
                    : 'text-[#6D5D55] hover:text-[#2D1E18]'
                }`}
              >
                Tất cả ({activePlan.days.length})
              </button>
              <button
                onClick={() => setFilterMode('uncompleted')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterMode === 'uncompleted'
                    ? 'bg-[#8B1E2D] text-white shadow-sm'
                    : 'text-[#6D5D55] hover:text-[#2D1E18]'
                }`}
              >
                Chưa hoàn thành ({activePlan.days.filter(d => !completedDays.includes(d.dayNumber)).length})
              </button>
              <button
                onClick={() => setFilterMode('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterMode === 'completed'
                    ? 'bg-[#8B1E2D] text-white shadow-sm'
                    : 'text-[#6D5D55] hover:text-[#2D1E18]'
                }`}
              >
                Đã đọc xong ({activePlan.days.filter(d => completedDays.includes(d.dayNumber)).length})
              </button>
            </div>

            <div className="text-xs text-[#8D6E63] italic">
              Nhấn vào ô tròn để đánh dấu đã đọc
            </div>
          </div>

          {/* Days List */}
          <div className="space-y-3 pt-2">
            {filteredDays.length === 0 ? (
              <div className="text-center py-12 text-[#8D6E63] bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E8DFC8]">
                Không có ngày nào trong bộ lọc này.
              </div>
            ) : (
              filteredDays.map((day) => {
                const isCompleted = completedDays.includes(day.dayNumber);

                return (
                  <div
                    key={day.dayNumber}
                    className={`p-4 sm:p-5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isCompleted
                        ? 'bg-[#FAF7F2]/60 border-emerald-200/80'
                        : 'bg-white border-[#E8DFC8] hover:border-[#C59B27]'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <button
                        onClick={() => handleToggleDay(day.dayNumber)}
                        className="mt-0.5 sm:mt-0 transition text-stone-400 hover:text-emerald-600 focus:outline-none"
                        title={isCompleted ? 'Hủy đánh dấu' : 'Đánh dấu đã hoàn thành'}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-6 h-6 text-stone-300 hover:text-[#8B1E2D]" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-serif text-sm font-bold ${isCompleted ? 'text-stone-500 line-through' : 'text-[#2D1E18]'}`}>
                            {day.title}
                          </span>
                        </div>

                        {day.focusVerse && (
                          <p className="text-xs text-[#6D5D55] italic line-clamp-2">
                            "{day.focusVerse}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Scripture Passage Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pl-9 sm:pl-0">
                      {day.passages.map((p, idx) => (
                        <Link
                          key={idx}
                          href={`/kinh-thanh/${p.bookId}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#8B1E2D] text-[#8B1E2D] hover:text-white border border-[#E8DFC8] text-xs font-semibold transition shadow-sm"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{p.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
