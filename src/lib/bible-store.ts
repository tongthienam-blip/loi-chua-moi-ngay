// ============================================================================
// HỆ THỐNG QUẢN LÝ DỮ LIỆU & LƯU TRỮ TRẠNG THÁI (BIBLE APP STORE)
// Tích hợp LocalStorage tự động, hoàn toàn không cần server phụ thuộc
// ============================================================================

import { DailyLiturgicalReading, DailyReflectionItem, SpiritualJournalRecord, UserPersonalData } from '@/types';
import { LITURGICAL_READINGS_ARCHIVE } from '@/data/liturgical-readings';
import { DAILY_REFLECTIONS_DATABASE } from '@/data/daily-reflections';
import { AuditLogEntry, UserRole } from './auth/rbac';
import { normalizeVietnamese, normalizeObject } from './utils/vietnamese';
import { getVietnamTodayString } from './liturgy/timezone';

const DEFAULT_USER_DATA: UserPersonalData = {
  fontSize: 'base',
  readingTheme: 'light',
  bookmarks: [
    {
      id: 'bm-1',
      bookId: 'gen',
      chapter: 1,
      verse: 1,
      text: 'Thoạt đầu, Thiên Chúa sáng tạo trời và đất.',
      bookName: 'Sáng Thế',
      createdAt: '2026-11-04T08:00:00Z',
    },
    {
      id: 'bm-2',
      bookId: 'matt',
      chapter: 5,
      verse: 3,
      text: 'Phúc thay ai có tâm hồn nghèo khó, vì Nước Trời là của họ.',
      bookName: 'Mátthêu',
      createdAt: '2026-11-04T08:30:00Z',
    }
  ],
  highlights: [],
  personalNotes: [
    {
      id: 'note-1',
      verseId: 'gen-1-1',
      note: 'Lời Chúa nhắc nhở về nguồn cội mọi sự đều từ Thiên Chúa, cần có thái độ tạ ơn mỗi ngày.',
      updatedAt: '2026-11-04T08:15:00Z'
    }
  ],
  activePlanId: 'plan-365',
  completedPlanDays: { 'plan-365': [1, 2, 3] },
  streakDays: 4,
  lastReadDate: getVietnamTodayString(),
  lastReadLocation: {
    bookId: 'matt',
    chapterNumber: 5,
    verseNumber: 1
  }
};

const DEFAULT_JOURNAL_RECORDS: SpiritualJournalRecord[] = [
  {
    id: 'journal-1',
    createdAt: '2026-11-04T07:45:00Z',
    updatedAt: '2026-11-04T07:45:00Z',
    title: 'Bát Phúc - Con đường nên thánh giữa đời thường',
    scriptureReference: 'Mt 5,1-12a',
    scriptureQuote: 'Phúc thay ai có tâm hồn nghèo khó, vì Nước Trời là của họ.',
    touchedByWord: 'Chúa Giêsu không chúc phúc cho kẻ tự mãn, mà là những ai khiêm nhường nhận biết sự bất toàn của mình trước Chúa.',
    personalPrayer: 'Lạy Chúa Giêsu, xin ban cho con tinh thần đơn sơ, khó nghèo để lòng con luôn rộng mở đón nhận ân sủng của Ngài.',
    dailyResolution: 'Hôm nay con sẽ bớt phàn nàn, mỉm cười và sẵn lòng giúp đỡ một đồng nghiệp gặp khó khăn.',
    tags: ['Bát Phúc', 'Khiêm Nhường', 'Sống Phúc Âm']
  }
];

const STORAGE_KEY_USER = 'loi_chua_user_data_v1';
const STORAGE_KEY_READINGS = 'loi_chua_custom_readings_v1';
const STORAGE_KEY_REFLECTIONS = 'loi_chua_custom_reflections_v1';
const STORAGE_KEY_AUDIT = 'loi_chua_admin_audit_v1';
const STORAGE_KEY_JOURNAL = 'loi_chua_spiritual_journal_v1';

export class BibleStore {
  // --------------------------------------------------------------------------
  // USER PREFERENCES & PERSONAL DATA
  // --------------------------------------------------------------------------
  public static getUserData(): UserPersonalData {
    if (typeof window === 'undefined') return normalizeObject(DEFAULT_USER_DATA);
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      if (data) return normalizeObject(JSON.parse(data));
    } catch (e) {
      console.warn('Lỗi đọc LocalStorage:', e);
    }
    return normalizeObject(DEFAULT_USER_DATA);
  }

  public static saveUserData(data: Partial<UserPersonalData>): UserPersonalData {
    const current = this.getUserData();
    const updated = { ...current, ...data };
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      } catch (e) {
        console.warn('Lỗi ghi LocalStorage:', e);
      }
    }
    return updated;
  }

  public static loginUser(user: { 
    email: string; 
    fullName: string; 
    provider: 'google' | 'email'; 
    role?: 'USER' | 'CATECHIST' | 'PRIEST' | 'THEOLOGIAN' | 'ADMIN' 
  }): UserPersonalData {
    const currentUser = {
      id: `usr-${Date.now()}`,
      email: user.email,
      fullName: user.fullName || user.email.split('@')[0],
      provider: user.provider,
      role: user.role || 'USER',
      lastLoginAt: new Date().toISOString()
    };
    return this.saveUserData({ currentUser });
  }

  public static logoutUser(): UserPersonalData {
    return this.saveUserData({ currentUser: null });
  }

  public static recordReadingActivity(): number {
    const data = this.getUserData();
    const today = new Date().toISOString().split('T')[0];
    if (data.lastReadDate === today) {
      return data.streakDays;
    }
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = data.lastReadDate === yesterday ? (data.streakDays || 0) + 1 : 1;
    this.saveUserData({
      streakDays: newStreak,
      lastReadDate: today
    });
    return newStreak;
  }

  public static toggleBookmark(bookmark: {
    bookId: string;
    chapter: number;
    verse: number;
    text: string;
    bookName: string;
  }): boolean {
    const data = this.getUserData();
    const index = data.bookmarks.findIndex(
      b => b.bookId === bookmark.bookId && b.chapter === bookmark.chapter && b.verse === bookmark.verse
    );
    if (index >= 0) {
      data.bookmarks.splice(index, 1);
      this.saveUserData({ bookmarks: [...data.bookmarks] });
      return false; // Đã bỏ đánh dấu
    } else {
      data.bookmarks.push({
        id: `bm-${Date.now()}`,
        ...bookmark,
        createdAt: new Date().toISOString()
      });
      this.saveUserData({ bookmarks: [...data.bookmarks] });
      return true; // Đã đánh dấu
    }
  }

  public static isBookmarked(bookId: string, chapter: number, verse: number): boolean {
    const data = this.getUserData();
    return data.bookmarks.some(
      b => b.bookId === bookId && b.chapter === chapter && b.verse === verse
    );
  }

  public static saveNote(verseId: string, noteContent: string): void {
    const data = this.getUserData();
    const index = data.personalNotes.findIndex(n => n.verseId === verseId);
    if (index >= 0) {
      if (!noteContent.trim()) {
        data.personalNotes.splice(index, 1);
      } else {
        data.personalNotes[index].note = noteContent;
        data.personalNotes[index].updatedAt = new Date().toISOString();
      }
    } else if (noteContent.trim()) {
      data.personalNotes.push({
        id: `note-${Date.now()}`,
        verseId,
        note: noteContent,
        updatedAt: new Date().toISOString()
      });
    }
    this.saveUserData({ personalNotes: [...data.personalNotes] });
  }

  public static getNote(verseId: string): string {
    const data = this.getUserData();
    const found = data.personalNotes.find(n => n.verseId === verseId);
    return found ? found.note : '';
  }

  // --------------------------------------------------------------------------
  // READING PLANS & READING LOCATION
  // --------------------------------------------------------------------------
  public static saveLastReadLocation(bookId: string, chapterNumber: number, verseNumber?: number): void {
    const data = this.getUserData();
    const today = new Date().toISOString().split('T')[0];
    
    // Tính toán reading streak
    let streak = data.streakDays || 1;
    if (data.lastReadDate) {
      const last = new Date(data.lastReadDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    this.saveUserData({
      lastReadLocation: { bookId, chapterNumber, verseNumber },
      lastReadDate: today,
      streakDays: streak,
    });
  }

  public static togglePlanDay(planId: string, dayNumber: number): boolean {
    const data = this.getUserData();
    const currentDays = data.completedPlanDays[planId] || [];
    const exists = currentDays.includes(dayNumber);
    
    let updatedDays: number[];
    if (exists) {
      updatedDays = currentDays.filter(d => d !== dayNumber);
    } else {
      updatedDays = [...currentDays, dayNumber].sort((a, b) => a - b);
    }

    const updatedPlanDays = {
      ...data.completedPlanDays,
      [planId]: updatedDays
    };

    this.saveUserData({ completedPlanDays: updatedPlanDays });
    return !exists;
  }

  public static setActivePlan(planId: string): void {
    this.saveUserData({ activePlanId: planId });
  }

  // --------------------------------------------------------------------------
  // NHẬT KÝ THIÊNG LIÊNG (SPIRITUAL JOURNAL)
  // --------------------------------------------------------------------------
  public static getJournalRecords(): SpiritualJournalRecord[] {
    if (typeof window === 'undefined') return normalizeObject(DEFAULT_JOURNAL_RECORDS);
    try {
      const stored = localStorage.getItem(STORAGE_KEY_JOURNAL);
      if (stored) return normalizeObject(JSON.parse(stored));
    } catch (e) {
      console.warn('Lỗi đọc nhật ký thiêng liêng:', e);
    }
    return normalizeObject(DEFAULT_JOURNAL_RECORDS);
  }

  public static saveJournalRecord(
    record: Omit<SpiritualJournalRecord, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
  ): SpiritualJournalRecord {
    const list = this.getJournalRecords();
    const now = new Date().toISOString();
    
    let saved: SpiritualJournalRecord;
    if (record.id) {
      const index = list.findIndex(r => r.id === record.id);
      if (index >= 0) {
        saved = {
          ...list[index],
          ...record,
          updatedAt: now
        };
        list[index] = saved;
      } else {
        saved = {
          ...record,
          id: record.id,
          createdAt: now,
          updatedAt: now
        };
        list.unshift(saved);
      }
    } else {
      saved = {
        ...record,
        id: `journal-${Date.now()}`,
        createdAt: now,
        updatedAt: now
      };
      list.unshift(saved);
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(list));
      } catch (e) {
        console.warn('Lỗi lưu nhật ký thiêng liêng:', e);
      }
    }
    return saved;
  }

  public static deleteJournalRecord(id: string): void {
    const list = this.getJournalRecords();
    const filtered = list.filter(r => r.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(filtered));
      } catch (e) {
        console.warn('Lỗi xoá nhật ký thiêng liêng:', e);
      }
    }
  }

  // --------------------------------------------------------------------------
  // SAO LƯU & PHỤC HỒI DỮ LIỆU CÁ NHÂN (EXPORT / IMPORT BACKUP)
  // --------------------------------------------------------------------------
  public static exportBackup(): string {
    const backup = {
      exportDate: new Date().toISOString(),
      app: 'Lời Chúa Mỗi Ngày - Nền Tảng Kinh Thánh Công Giáo',
      version: '2.0.0',
      userData: this.getUserData(),
      journalRecords: this.getJournalRecords(),
    };
    return JSON.stringify(backup, null, 2);
  }

  public static importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.userData) {
        this.saveUserData(parsed.userData);
      }
      if (parsed.journalRecords && Array.isArray(parsed.journalRecords)) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(parsed.journalRecords));
        }
      }
      return true;
    } catch (e) {
      console.error('Lỗi nhập dữ liệu sao lưu:', e);
      return false;
    }
  }

  // --------------------------------------------------------------------------
  // ADMIN & VERIFICATION ACTIONS
  // --------------------------------------------------------------------------
  public static getAllReadings(): DailyLiturgicalReading[] {
    if (typeof window === 'undefined') return LITURGICAL_READINGS_ARCHIVE;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_READINGS);
      if (stored) {
        const custom: DailyLiturgicalReading[] = JSON.parse(stored);
        return [...custom, ...LITURGICAL_READINGS_ARCHIVE.filter(r => !custom.some(c => c.id === r.id))];
      }
    } catch (e) {
      console.warn(e);
    }
    return LITURGICAL_READINGS_ARCHIVE;
  }

  public static addOrUpdateReading(reading: DailyLiturgicalReading): void {
    const current = this.getAllReadings();
    const updated = [reading, ...current.filter(r => r.id !== reading.id)];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_READINGS, JSON.stringify(updated));
      this.logAuditAction({
        action: 'UPDATE',
        actionLabel: 'Cập nhật bài đọc phụng vụ',
        resourceType: 'DAILY_READING',
        resourceId: reading.id,
        resourceTitle: reading.title,
        details: `Cập nhật ngày ${reading.date} - ${reading.cycle}`
      });
    }
  }

  public static getAllReflections(): DailyReflectionItem[] {
    if (typeof window === 'undefined') return DAILY_REFLECTIONS_DATABASE;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REFLECTIONS);
      if (stored) {
        const custom: DailyReflectionItem[] = JSON.parse(stored);
        return [...custom, ...DAILY_REFLECTIONS_DATABASE.filter(r => !custom.some(c => c.id === r.id))];
      }
    } catch (e) {
      console.warn(e);
    }
    return DAILY_REFLECTIONS_DATABASE;
  }

  public static addOrUpdateReflection(reflection: DailyReflectionItem): void {
    const current = this.getAllReflections();
    const updated = [reflection, ...current.filter(r => r.id !== reflection.id)];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_REFLECTIONS, JSON.stringify(updated));
      this.logAuditAction({
        action: 'UPDATE',
        actionLabel: 'Xuất bản bài suy niệm 8 phần',
        resourceType: 'REFLECTION',
        resourceId: reflection.id,
        resourceTitle: reflection.title,
        details: `Cập nhật bài suy niệm ngày ${reflection.date}`
      });
    }
  }

  public static getAuditLogs(): AuditLogEntry[] {
    const DEFAULT_LOGS: AuditLogEntry[] = [
      {
        id: 'log-1',
        timestamp: '2026-11-04T07:30:00Z',
        userId: 'admin-01',
        userEmail: 'theology.editor@conggiao.vn',
        userName: 'Lm. Gioan Baotixita Nguyễn',
        userRole: 'THEOLOGIAN_EDITOR',
        action: 'VERIFY',
        actionLabel: 'Thẩm định chú giải thần học',
        resourceType: 'BIBLE_BOOK',
        resourceId: 'gen',
        resourceTitle: 'Sách Sáng Thế (10 điểm thần học)',
        details: 'Đã xác minh nguồn phụng vụ và giáo huấn Công đồng Vatican II (Dei Verbum)'
      },
      {
        id: 'log-2',
        timestamp: '2026-11-04T06:15:00Z',
        userId: 'liturgy-02',
        userEmail: 'phungvu@hdgmvn.net',
        userName: 'Thầy Giuse Trần Minh',
        userRole: 'LITURGIST',
        action: 'PUBLISH',
        actionLabel: 'Xuất bản bài đọc phụng vụ',
        resourceType: 'DAILY_READING',
        resourceId: 'reading-today',
        resourceTitle: 'Lễ Thánh Carôlô Bôrômêô',
        details: 'Đối chiếu chính xác bản dịch Phụng Vụ Thánh Lễ của HĐGMVN'
      }
    ];

    if (typeof window === 'undefined') return DEFAULT_LOGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUDIT);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn(e);
    }
    return DEFAULT_LOGS;
  }

  public static logAuditAction(params: {
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VERIFY' | 'PUBLISH' | 'REJECT';
    actionLabel: string;
    resourceType: 'BIBLE_BOOK' | 'DAILY_READING' | 'REFLECTION' | 'CATECHISM' | 'CHURCH_DOCUMENT' | 'USER_ROLE';
    resourceId: string;
    resourceTitle: string;
    details: string;
  }): void {
    const logs = this.getAuditLogs();
    const newEntry: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: 'current-admin',
      userEmail: 'admin@conggiao.vn',
      userName: 'Tổng Quản Trị Hệ Thống',
      userRole: 'SUPER_ADMIN',
      ...params
    };
    logs.unshift(newEntry);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(logs.slice(0, 100)));
      } catch (e) {
        console.warn(e);
      }
    }
  }
}

// ----------------------------------------------------------------------------
// THỰC THI ÂM THANH ĐỌC LỜI CHÚA BẰNG WEB SPEECH API THỰC TẾ
// ----------------------------------------------------------------------------
export class AudioSpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  public static speak(text: string, rate: number = 1.0, onEnd?: () => void, onError?: () => void): void {
    if (!this.synth) return;
    this.stop();

    const cleanText = normalizeVietnamese(text).replace(/[*#_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = rate;

    // Tìm giọng đọc tiếng Việt nếu trình duyệt hỗ trợ
    const voices = this.synth.getVoices();
    const vietnameseVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
    if (vietnameseVoice) {
      utterance.voice = vietnameseVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onError) onError();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public static pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public static resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking && !this.synth.paused);
  }

  public static isPaused(): boolean {
    return !!(this.synth && this.synth.paused);
  }
}
