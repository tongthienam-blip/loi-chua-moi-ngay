/**
 * TIỆN ÍCH MÚI GIỜ VIỆT NAM (ASIA/HO_CHI_MINH - UTC+7)
 * Đảm bảo ngày phụng vụ luôn được xác định chính xác theo giờ Việt Nam
 * Không bị lệch ngày do múi giờ UTC của server/Vercel/trình duyệt.
 */

export const VIETNAM_TIMEZONE = 'Asia/Ho_Chi_Minh';

/**
 * Lấy chuỗi ngày hiện tại dạng YYYY-MM-DD theo múi giờ Việt Nam
 */
export function getVietnamTodayString(now: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: VIETNAM_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(now);
  } catch (error) {
    console.error('[Timezone] Lỗi định dạng ngày Việt Nam:', error);
    // Dự phòng an toàn: tính UTC+7 thủ công
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const vnTime = new Date(utcTime + (7 * 3600000));
    const year = vnTime.getFullYear();
    const month = String(vnTime.getMonth() + 1).padStart(2, '0');
    const day = String(vnTime.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

/**
 * Phân tích chuỗi YYYY-MM-DD thành { year, month, day } (month từ 1 đến 12)
 */
export function parseDateString(dateStr: string): { year: number; month: number; day: number } {
  const parts = dateStr.split('-').map(p => parseInt(p, 10));
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    const today = getVietnamTodayString();
    const [y, m, d] = today.split('-').map(Number);
    return { year: y, month: m, day: d };
  }
  return { year: parts[0], month: parts[1], day: parts[2] };
}

/**
 * Cộng hoặc trừ số ngày từ chuỗi ngày YYYY-MM-DD
 */
export function addDaysToDate(dateStr: string, days: number): string {
  const { year, month, day } = parseDateString(dateStr);
  // Tạo Date theo mốc trưa (12:00:00) để tránh nhảy ngày do chênh lệch múi giờ
  const d = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  d.setUTCDate(d.getUTCDate() + days);
  
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dayStr = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${dayStr}`;
}

/**
 * Lấy thứ trong tuần (0: Chúa Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)
 */
export function getDayOfWeek(dateStr: string): { dayIndex: number; dayName: string; shortName: string } {
  const { year, month, day } = parseDateString(dateStr);
  const d = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayIndex = d.getUTCDay();

  const names = [
    { dayIndex: 0, dayName: 'Chúa Nhật', shortName: 'CN' },
    { dayIndex: 1, dayName: 'Thứ Hai', shortName: 'T2' },
    { dayIndex: 2, dayName: 'Thứ Ba', shortName: 'T3' },
    { dayIndex: 3, dayName: 'Thứ Tư', shortName: 'T4' },
    { dayIndex: 4, dayName: 'Thứ Năm', shortName: 'T5' },
    { dayIndex: 5, dayName: 'Thứ Sáu', shortName: 'T6' },
    { dayIndex: 6, dayName: 'Thứ Bảy', shortName: 'T7' },
  ];

  return names[dayIndex];
}

/**
 * Định dạng ngày Việt Nam đầy đủ trang nghiêm
 * Ví dụ: "Thứ Năm, ngày 05 tháng 11 năm 2026"
 */
export function formatVietnamDateFull(dateStr: string): string {
  const { year, month, day } = parseDateString(dateStr);
  const { dayName } = getDayOfWeek(dateStr);
  const dayPadded = String(day).padStart(2, '0');
  const monthPadded = String(month).padStart(2, '0');
  return `${dayName}, ngày ${dayPadded} tháng ${monthPadded} năm ${year}`;
}
