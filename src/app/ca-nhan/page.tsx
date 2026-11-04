'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  BookOpen, 
  FileEdit, 
  Calendar, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  ArrowRight, 
  Share2, 
  Flame, 
  Heart,
  Image as ImageIcon,
  Plus,
  X,
  RefreshCw,
  User,
  LogIn,
  LogOut,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { BibleStore } from '@/lib/bible-store';
import { UserPersonalData, SpiritualJournalRecord } from '@/types';
import { CATHOLIC_BOOKS } from '@/data/catholic-books';

export default function PersonalSpacePage() {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes' | 'journal' | 'auth' | 'backup' | 'author'>('bookmarks');
  const [userData, setUserData] = useState<UserPersonalData | null>(null);
  const [journalRecords, setJournalRecords] = useState<SpiritualJournalRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isNewJournalModalOpen, setIsNewJournalModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auth state
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  // Form state for creating a new journal entry
  const [newJournalTitle, setNewJournalTitle] = useState('');
  const [newJournalRef, setNewJournalRef] = useState('');
  const [newJournalQuote, setNewJournalQuote] = useState('');
  const [newJournalTouched, setNewJournalTouched] = useState('');
  const [newJournalPrayer, setNewJournalPrayer] = useState('');
  const [newJournalResolution, setNewJournalResolution] = useState('');
  const [newJournalTags, setNewJournalTags] = useState('Đức Tin, Sống Lời Chúa');

  const refreshData = () => {
    setUserData(BibleStore.getUserData());
    setJournalRecords(BibleStore.getJournalRecords());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemoveBookmark = (bm: { bookId: string; chapter: number; verse: number; text: string; bookName: string }) => {
    BibleStore.toggleBookmark(bm);
    refreshData();
  };

  const handleDeleteNote = (verseId: string) => {
    if (confirm('Bạn có chắc muốn xoá ghi chú này?')) {
      BibleStore.saveNote(verseId, '');
      refreshData();
    }
  };

  const handleDeleteJournal = (id: string) => {
    if (confirm('Bạn có chắc muốn xoá mục nhật ký thiêng liêng này?')) {
      BibleStore.deleteJournalRecord(id);
      refreshData();
    }
  };

  const handleCreateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournalTitle.trim() || !newJournalTouched.trim()) {
      alert('Vui lòng nhập tiêu đề và điều đánh động tâm hồn.');
      return;
    }

    BibleStore.saveJournalRecord({
      title: newJournalTitle.trim(),
      scriptureReference: newJournalRef.trim(),
      scriptureQuote: newJournalQuote.trim(),
      touchedByWord: newJournalTouched.trim(),
      personalPrayer: newJournalPrayer.trim(),
      dailyResolution: newJournalResolution.trim(),
      tags: newJournalTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setIsNewJournalModalOpen(false);
    // Reset form
    setNewJournalTitle('');
    setNewJournalRef('');
    setNewJournalQuote('');
    setNewJournalTouched('');
    setNewJournalPrayer('');
    setNewJournalResolution('');
    refreshData();
  };

  const handleExportBackup = () => {
    const jsonStr = BibleStore.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loi-chua-sao-luu-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = () => {
    if (!importJsonText.trim()) return;
    const success = BibleStore.importBackup(importJsonText);
    if (success) {
      setImportStatus('success');
      setImportJsonText('');
      refreshData();
      setTimeout(() => setImportStatus('idle'), 3000);
    } else {
      setImportStatus('error');
    }
  };

  // Auth handlers
  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) return;

    BibleStore.loginUser({
      email: authEmail.trim(),
      fullName: authName.trim() || authEmail.split('@')[0],
      provider: 'email',
      role: 'USER'
    });

    setAuthSuccessMsg(isRegisterMode ? 'Đăng ký và đồng bộ tài khoản thành công!' : 'Đăng nhập thành công!');
    refreshData();
    setTimeout(() => {
      setAuthSuccessMsg('');
      setActiveTab('bookmarks');
    }, 1500);
  };

  const handleGoogleAuth = () => {
    BibleStore.loginUser({
      email: 'tin.huu.conggiao@gmail.com',
      fullName: 'Tín Hữu Kitô Giáo',
      provider: 'google',
      role: 'USER'
    });
    setAuthSuccessMsg('Đăng nhập Google và kết nối đám mây thành công!');
    refreshData();
    setTimeout(() => {
      setAuthSuccessMsg('');
      setActiveTab('bookmarks');
    }, 1500);
  };

  const handleLogout = () => {
    BibleStore.logoutUser();
    refreshData();
  };

  const lastLocationBook = userData?.lastReadLocation 
    ? CATHOLIC_BOOKS.find(b => b.id === userData.lastReadLocation?.bookId)
    : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header Breadcrumb & User Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8DFC8]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#855D14] mb-1">
              <Link href="/" className="hover:underline">Trang chủ</Link>
              <span>/</span>
              <span>Góc Thiêng Liêng Cá Nhân</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D1E18]">
              Không Gian Linh Thao Cá Nhân
            </h1>
            <p className="text-sm text-[#6D5D55] mt-1">
              Lưu trữ những câu Lời Chúa tâm đắc, nhật ký suy niệm và chuỗi ngày nuôi dưỡng đời sống nội tâm.
            </p>
          </div>

          {/* Reading Stats & Resume Reading Hero */}
          <div className="flex flex-wrap items-center gap-3">
            {/* User Profile Pill */}
            {userData?.currentUser ? (
              <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-[#E8DFC8] shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center font-bold text-xs">
                  {userData.currentUser.fullName.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#2D1E18] truncate max-w-[120px]">
                    {userData.currentUser.fullName}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Đã đồng bộ
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('auth')}
                className="bg-white hover:bg-stone-50 border border-[#8B1E2D] text-[#8B1E2D] px-4 py-2.5 rounded-2xl font-bold text-xs shadow-sm transition flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập / Đồng Bộ</span>
              </button>
            )}

            {/* Streak Counter */}
            <div className="bg-white px-4 py-3 rounded-2xl border border-[#E8DFC8] shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#8D6E63] uppercase">Chuỗi ngày đọc Lời Chúa</div>
                <div className="text-base font-bold text-[#2D1E18]">
                  {userData?.streakDays || 1} Ngày liên tục
                </div>
              </div>
            </div>

            {userData?.lastReadLocation && (
              <Link
                href={`/kinh-thanh/${userData.lastReadLocation.bookId}?chapter=${userData.lastReadLocation.chapterNumber}`}
                className="bg-[#8B1E2D] hover:bg-[#701124] text-white px-5 py-3 rounded-2xl font-semibold text-xs shadow-sm transition flex items-center gap-2 group"
              >
                <div>
                  <div className="text-[10px] opacity-80 uppercase tracking-wider">Đọc tiếp lần trước</div>
                  <div className="font-bold text-sm">
                    {lastLocationBook?.name || 'Sách'} {userData.lastReadLocation.chapterNumber}
                    {userData.lastReadLocation.verseNumber ? `:${userData.lastReadLocation.verseNumber}` : ''}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8DFC8] overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'bookmarks'
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'bg-white/80 text-[#5D4037] hover:bg-white border border-[#E8DFC8]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Câu Đã Đánh Dấu ({userData?.bookmarks?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'notes'
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'bg-white/80 text-[#5D4037] hover:bg-white border border-[#E8DFC8]'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>Ghi Chú ({userData?.personalNotes?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('journal')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'journal'
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'bg-white/80 text-[#5D4037] hover:bg-white border border-[#E8DFC8]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Nhật Ký Thiêng Liêng ({journalRecords.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('auth')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'auth'
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'bg-white/80 text-[#5D4037] hover:bg-white border border-[#E8DFC8]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Tài Khoản & Đăng Nhập</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'backup'
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'bg-white/80 text-[#5D4037] hover:bg-white border border-[#E8DFC8]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Sao Lưu & Đồng Bộ</span>
          </button>

          <button
            onClick={() => setActiveTab('author')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              activeTab === 'author'
                ? 'bg-[#8B1E2D] text-white shadow-sm'
                : 'bg-white/80 text-[#5D4037] hover:bg-white border border-[#E8DFC8]'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Tác Giả & Bản Quyền</span>
          </button>
        </div>

        {/* Tab 1: Bookmarks View */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            {(!userData?.bookmarks || userData.bookmarks.length === 0) ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFC8] p-8 space-y-3">
                <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-[#2D1E18]">Chưa có câu Kinh Thánh nào được đánh dấu</h3>
                <p className="text-xs text-[#6D5D55] max-w-md mx-auto">
                  Khi đọc Kinh Thánh, bạn có thể nhấn vào biểu tượng đánh dấu để lưu lại các câu Lời Chúa tâm đắc.
                </p>
                <Link
                  href="/kinh-thanh"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B1E2D] text-white text-xs font-semibold shadow-sm mt-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Mở 73 Sách Kinh Thánh
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-sm hover:border-[#8B1E2D]/40 transition space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#8B1E2D]">
                        {bm.bookName} {bm.chapter}:{bm.verse}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(bm.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <p className="font-serif text-base text-[#2D1E18] leading-relaxed italic">
                      &ldquo;{bm.text}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8DFC8]/60 text-xs">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/kinh-thanh/${bm.bookId}?chapter=${bm.chapter}`}
                          className="inline-flex items-center gap-1 text-[#855D14] hover:underline font-semibold text-[11px]"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Xem toàn chương</span>
                        </Link>
                        <Link
                          href={`/tao-anh?quote=${encodeURIComponent(bm.text)}&ref=${encodeURIComponent(`${bm.bookName} ${bm.chapter},${bm.verse}`)}`}
                          className="inline-flex items-center gap-1 text-[#8B1E2D] hover:underline font-semibold text-[11px]"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Tạo thiệp ảnh</span>
                        </Link>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(bm.id, `"${bm.text}" (${bm.bookName} ${bm.chapter},${bm.verse})`)}
                          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 transition"
                          title="Sao chép câu"
                        >
                          {copiedId === bm.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleRemoveBookmark(bm)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition"
                          title="Bỏ đánh dấu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Notes View */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {(!userData?.personalNotes || userData.personalNotes.length === 0) ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFC8] p-8 space-y-3">
                <FileEdit className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-[#2D1E18]">Chưa có ghi chú cá nhân nào</h3>
                <p className="text-xs text-[#6D5D55] max-w-md mx-auto">
                  Khi đọc Kinh Thánh, nhấn vào bất kỳ câu nào để ghi lại những suy ngẫm, ơn soi sáng và tâm tình của bạn.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.personalNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-5 rounded-2xl bg-white border border-[#E8DFC8] shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#855D14]">Câu {note.verseId}</span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(note.updatedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#2D1E18] whitespace-pre-line leading-relaxed bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DFC8]">
                      {note.note}
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => handleDeleteNote(note.verseId)}
                        className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xoá ghi chú</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Spiritual Journal View */}
        {activeTab === 'journal' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold text-[#855D14] uppercase tracking-wider">
                Nhật Ký Tâm Linh & Sống Lời Chúa
              </span>
              <button
                onClick={() => setIsNewJournalModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Viết Nhật Ký Mới</span>
              </button>
            </div>

            {journalRecords.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFC8] p-8 space-y-3">
                <Sparkles className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-[#2D1E18]">Chưa có bài nhật ký nào</h3>
                <p className="text-xs text-[#6D5D55] max-w-md mx-auto">
                  Hãy ghi lại những điều Lời Chúa đánh động tâm hồn bạn hôm nay và những quyết tâm thực hành cụ thể.
                </p>
                <button
                  onClick={() => setIsNewJournalModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B1E2D] text-white text-xs font-semibold shadow-sm mt-2"
                >
                  <Plus className="w-4 h-4" />
                  Viết Bài Đầu Tiên
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {journalRecords.map((jr) => (
                  <div
                    key={jr.id}
                    className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-4 relative group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DFC8]/60 pb-3">
                      <div>
                        <span className="text-[10px] font-semibold text-[#855D14] uppercase tracking-wider">
                          {jr.scriptureReference}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#2D1E18]">{jr.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <span>{new Date(jr.createdAt).toLocaleDateString('vi-VN')}</span>
                        <button
                          onClick={() => handleDeleteJournal(jr.id)}
                          className="p-1 rounded hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition"
                          title="Xoá"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {jr.scriptureQuote && (
                      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] font-serif text-sm italic text-[#2D1E18]">
                        &ldquo;{jr.scriptureQuote}&rdquo;
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1">
                        <strong className="text-amber-900 block font-serif">Điều Đánh Động</strong>
                        <p className="text-amber-800 leading-relaxed">{jr.touchedByWord}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/60 space-y-1">
                        <strong className="text-rose-900 block font-serif">Lời Cầu Nguyện</strong>
                        <p className="text-rose-800 leading-relaxed">{jr.personalPrayer || 'Tạ ơn Chúa vì Lời Ngài.'}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-1">
                        <strong className="text-emerald-900 block font-bold">Quyết Tâm Sống</strong>
                        <p className="text-emerald-800 leading-relaxed">{jr.dailyResolution || 'Sống yêu thương và bác ái.'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Auth & Account View */}
        {activeTab === 'auth' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center mx-auto">
                  <User className="w-7 h-7" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#2D1E18]">
                  {userData?.currentUser ? 'Tài Khoản Đang Đăng Nhập' : isRegisterMode ? 'Đăng Ký Tài Khoản Tín Hữu' : 'Đăng Nhập Tài Khoản Tín Hữu'}
                </h2>
                <p className="text-xs text-[#6D5D55]">
                  Đồng bộ an toàn mọi câu Lời Chúa đã đánh dấu, ghi chú cá nhân và chuỗi ngày đọc trên mọi thiết bị.
                </p>
              </div>

              {authSuccessMsg && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{authSuccessMsg}</span>
                </div>
              )}

              {userData?.currentUser ? (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500">Họ và tên</span>
                      <span className="text-xs font-bold text-[#2D1E18]">{userData.currentUser.fullName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500">Email</span>
                      <span className="text-xs font-bold text-[#2D1E18]">{userData.currentUser.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500">Hình thức kết nối</span>
                      <span className="text-xs font-semibold uppercase text-[#855D14]">{userData.currentUser.provider}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500">Chuỗi ngày đọc (Streak)</span>
                      <span className="text-xs font-bold text-amber-600">{userData.streakDays} Ngày liên tục</span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng Xuất Khỏi Thiết Bị Này</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Google Sign In Button */}
                  <button
                    onClick={handleGoogleAuth}
                    type="button"
                    className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 border border-[#E8DFC8] text-[#2D1E18] font-bold text-xs shadow-sm transition flex items-center justify-center gap-3"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Tiếp tục với Google</span>
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-[#E8DFC8]"></div>
                    <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-stone-400">Hoặc Email</span>
                    <div className="flex-grow border-t border-[#E8DFC8]"></div>
                  </div>

                  {/* Email & Password Form */}
                  <form onSubmit={handleEmailAuth} className="space-y-3">
                    {isRegisterMode && (
                      <div>
                        <label className="text-xs font-bold text-[#2D1E18] block mb-1">Tên Tín Hữu / Giáo Dân</label>
                        <input
                          type="text"
                          required
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          placeholder="Vd: Giuse Nguyễn Văn A"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-bold text-[#2D1E18] block mb-1">Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D1E18] block mb-1">Mật Khẩu</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-[#8B1E2D] hover:bg-[#701124] text-white font-bold text-xs shadow-md transition"
                    >
                      {isRegisterMode ? 'Đăng Ký Tài Khoản Mới' : 'Đăng Nhập'}
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setIsRegisterMode(!isRegisterMode)}
                        className="text-xs text-[#8B1E2D] hover:underline font-semibold"
                      >
                        {isRegisterMode ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chưa có tài khoản? Đăng ký miễn phí'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Backup & Restore View */}
        {activeTab === 'backup' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-6">
              <div className="border-b border-[#E8DFC8] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#2D1E18]">Sao Lưu & Phục Hồi Dữ Liệu</h3>
                <p className="text-xs text-[#6D5D55] mt-1">
                  Xuất toàn bộ câu đã đánh dấu, ghi chú cá nhân và nhật ký tâm linh sang tệp tin JSON để bảo toàn hoặc chuyển sang thiết bị khác.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-[#2D1E18]">Xuất Tệp Sao Lưu (.JSON)</div>
                    <div className="text-xs text-[#6D5D55]">Lưu trữ an toàn trên máy tính hoặc Google Drive cá nhân.</div>
                  </div>
                  <button
                    onClick={handleExportBackup}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white font-bold text-xs shadow-sm transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải Về Ngay</span>
                  </button>
                </div>

                <div className="pt-2 space-y-3">
                  <label className="font-bold text-xs text-[#2D1E18] block">Phục Hồi Từ Bản Sao Lưu</label>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Dán nội dung tệp JSON đã sao lưu vào đây..."
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs font-mono text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                  <button
                    onClick={handleImportBackup}
                    disabled={!importJsonText.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#855D14] hover:bg-[#6f5010] text-white font-bold text-xs shadow-sm transition disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Khôi Phục Dữ Liệu</span>
                  </button>

                  {importStatus === 'success' && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Đã khôi phục dữ liệu thành công!</span>
                    </div>
                  )}

                  {importStatus === 'error' && (
                    <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold">
                      Dữ liệu JSON không hợp lệ. Vui lòng kiểm tra lại.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Author & Copyright View */}
        {activeTab === 'author' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-[#E8DFC8]">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B1E2D] to-[#701124] text-white flex items-center justify-center font-serif text-3xl font-bold shadow-md shrink-0">
                  ☩
                </div>
                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <h3 className="font-serif text-2xl font-bold text-[#2D1E18]">Lucas Nguyen</h3>
                  <p className="text-xs text-[#855D14] font-bold uppercase tracking-wider">Tác Giả & Nhà Phát Triển Dự Án</p>
                  <p className="text-xs text-[#5D4037] leading-relaxed pt-1">
                    Dự án Lời Chúa Mỗi Ngày được xây dựng với tâm nguyện phụng sự cộng đoàn Dân Chúa, cung cấp một nền tảng đọc, nghiên cứu Kinh Thánh và Giáo lý Công giáo chuyên nghiệp, hiện đại và trung tín với Hội Thánh.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <a
                      href="mailto:anhtuan.employ202@gmail.com"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#8B1E2D] text-[#5D4037] hover:text-white border border-[#E8DFC8] text-xs font-semibold transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>anhtuan.employ202@gmail.com</span>
                    </a>
                    <a
                      href="tel:0368727316"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#8B1E2D] text-[#5D4037] hover:text-white border border-[#E8DFC8] text-xs font-semibold transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>0368727316</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Copyright Statement */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tuyên Bố Bản Quyền</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#8B1E2D]/5 border border-[#8B1E2D]/20 text-xs sm:text-sm text-[#3E2723] leading-relaxed">
                  <strong className="text-[#8B1E2D]">Bản quyền thuộc về Lucas Nguyen - Vui lòng không reup dưới mọi hình thức.</strong>
                  <p className="mt-1 text-xs text-[#6D5D55]">
                    Mọi hành vi sao chép mã nguồn, thương mại hoá trái phép đều bị nghiêm cấm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal: Write New Spiritual Journal */}
      {isNewJournalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#E8DFC8] shadow-sacred-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#2D1E18]">Nhật Ký Thiêng Liêng Mới</h3>
              <button
                onClick={() => setIsNewJournalModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJournal} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#2D1E18] block mb-1">Tiêu Đề Suy Niệm *</label>
                <input
                  type="text"
                  required
                  value={newJournalTitle}
                  onChange={(e) => setNewJournalTitle(e.target.value)}
                  placeholder="Vd: Chúa là Mục Tử nhân lành đời tôi"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-sm text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#2D1E18] block mb-1">Đoạn Kinh Thánh</label>
                  <input
                    type="text"
                    value={newJournalRef}
                    onChange={(e) => setNewJournalRef(e.target.value)}
                    placeholder="Vd: Tv 23,1-6"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#2D1E18] block mb-1">Thẻ Phân Loại</label>
                  <input
                    type="text"
                    value={newJournalTags}
                    onChange={(e) => setNewJournalTags(e.target.value)}
                    placeholder="Vd: Bình an, Tín thác"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#2D1E18] block mb-1">Câu Lời Chúa Ghi Khắc</label>
                <input
                  type="text"
                  value={newJournalQuote}
                  onChange={(e) => setNewJournalQuote(e.target.value)}
                  placeholder="Vd: Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D1E18] block mb-1">Điều Đánh Động Tâm Hồn *</label>
                <textarea
                  required
                  rows={3}
                  value={newJournalTouched}
                  onChange={(e) => setNewJournalTouched(e.target.value)}
                  placeholder="Lời Chúa hôm nay đánh động tôi điều gì trong hoàn cảnh hiện tại..."
                  className="w-full p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D1E18] block mb-1">Lời Cầu Nguyện Cá Nhân</label>
                <textarea
                  rows={2}
                  value={newJournalPrayer}
                  onChange={(e) => setNewJournalPrayer(e.target.value)}
                  placeholder="Tâm tình con muốn thưa cùng Chúa..."
                  className="w-full p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D1E18] block mb-1">Quyết Tâm Thực Hành Hôm Nay</label>
                <input
                  type="text"
                  value={newJournalResolution}
                  onChange={(e) => setNewJournalResolution(e.target.value)}
                  placeholder="Một việc cụ thể con sẽ thực thi hôm nay để làm chứng cho Chúa..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8] text-xs text-[#2D1E18] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsNewJournalModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Huỷ Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white font-semibold shadow-sm"
                >
                  Lưu Vào Nhật Ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
