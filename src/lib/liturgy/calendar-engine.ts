/**
 * CÔNG CỤ TÍNH LỊCH PHỤNG VỤ CÔNG GIÁO CHUẨN MỰC
 * Theo Quy Chế Tổng Quát Năm Phụng Vụ & Lịch Rôma (Normae Universales de Anno Liturgico et de Calendario)
 * và Lịch Phụng Vụ Giáo Hội Công Giáo Việt Nam (HĐGMVN).
 */

import { LiturgicalSeason, LiturgicalColor, FeastRank } from '@/types';
import { parseDateString, getDayOfWeek, addDaysToDate } from './timezone';

export interface LiturgicalDayMeta {
  date: string;
  season: LiturgicalSeason;
  seasonName: string;
  color: LiturgicalColor;
  colorName: string;
  rank: FeastRank;
  rankName: string;
  cycle: string;           // 'Năm A - Năm II'
  sundayCycle: 'A' | 'B' | 'C';
  weekdayCycle: 'I' | 'II';
  liturgicalWeek: string;  // e.g. 'Tuần XXXI Thường Niên'
  weekNumber: number;      // 1 đến 34
  dayOfWeekName: string;   // 'Thứ Năm'
  title: string;           // 'Thứ Năm Tuần XXXI Mùa Thường Niên'
  saintOfTheDay?: string;
  isSolemnity: boolean;
  isFeast: boolean;
  isMemorial: boolean;
  isVietnamSolemnity?: boolean; // Lễ Trọng riêng tại Việt Nam
  hasSecondReading: boolean;    // Có bài đọc II hay không
}

/**
 * Thuật toán Computus (Meeus/Jones/Butcher) tính ngày Lễ Phục Sinh (Easter Sunday)
 */
export function calculateEaster(year: number): { year: number; month: number; day: number; dateStr: string } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  return { year, month, day, dateStr: `${year}-${monthStr}-${dayStr}` };
}

/**
 * Tính ngày Chúa Nhật I Mùa Vọng (First Sunday of Advent) của một năm
 * Là Chúa Nhật gần ngày 30/11 nhất (trong khoảng 27/11 đến 03/12).
 */
export function getFirstSundayOfAdvent(year: number): string {
  for (let d = 27; d <= 30; d++) {
    const dStr = `${year}-11-${String(d).padStart(2, '0')}`;
    if (getDayOfWeek(dStr).dayIndex === 0) return dStr;
  }
  for (let d = 1; d <= 3; d++) {
    const dStr = `${year}-12-${String(d).padStart(2, '0')}`;
    if (getDayOfWeek(dStr).dayIndex === 0) return dStr;
  }
  return `${year}-11-29`;
}

/**
 * Tính chu kỳ năm Phụng vụ chuẩn xác theo quy chế Rôma
 * Chu kỳ Chúa Nhật: Năm A (Mátthêu), Năm B (Máccô), Năm C (Luca)
 * Chu kỳ Ngày Thường: Năm I (năm lẻ), Năm II (năm chẵn)
 */
export function getLiturgicalCycles(dateStr: string): { 
  sundayCycle: 'A' | 'B' | 'C'; 
  weekdayCycle: 'I' | 'II'; 
  cycleLabel: string 
} {
  const { year } = parseDateString(dateStr);
  const advent1 = getFirstSundayOfAdvent(year);

  // Nếu ngày hiện tại >= Chúa Nhật I Mùa Vọng thì bước vào năm phụng vụ mới (effectiveYear = year + 1)
  const isNewLiturgicalYear = dateStr >= advent1;
  const effectiveYear = isNewLiturgicalYear ? year + 1 : year;

  // Chu kỳ Chúa Nhật:
  // Năm A: 2017, 2020, 2023, 2026, 2029 (effectiveYear % 3 === 2)
  // Năm B: 2018, 2021, 2024, 2027, 2030 (effectiveYear % 3 === 0)
  // Năm C: 2019, 2022, 2025, 2028, 2031 (effectiveYear % 3 === 1)
  const mod = effectiveYear % 3;
  const sundayCycle: 'A' | 'B' | 'C' = mod === 2 ? 'A' : mod === 0 ? 'B' : 'C';

  // Chu kỳ ngày thường:
  // Năm chẵn (2024, 2026, 2028) là Năm II; Năm lẻ (2023, 2025, 2027) là Năm I
  const weekdayCycle: 'I' | 'II' = year % 2 === 0 ? 'II' : 'I';

  return {
    sundayCycle,
    weekdayCycle,
    cycleLabel: `Năm ${sundayCycle} - Năm ${weekdayCycle}`
  };
}

/**
 * Đổi số nguyên sang chữ số La Mã (1 -> I, 31 -> XXXI, 34 -> XXXIV)
 */
export function toRomanNumeral(num: number): string {
  const lookup: { [key: string]: number } = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let roman = '';
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman || 'I';
}

/**
 * Danh mục chư thánh, lễ nhớ và lễ trọng cố định
 * Kèm theo Lịch Riêng Giáo Hội Việt Nam (HĐGMVN)
 */
interface FixedMemorial {
  name: string;
  rank: FeastRank;
  rankName: string;
  color: LiturgicalColor;
  colorName: string;
  details?: string;
  isVietnamSolemnity?: boolean; // Lễ Trọng riêng tại Việt Nam
}

const FIXED_MEMORIALS: Record<string, FixedMemorial> = {
  // THÁNG 1
  '01-01': { name: 'Đức Maria, Mẹ Thiên Chúa', rank: 'SOLEMNITY', rankName: 'Lễ Trọng', color: 'WHITE', colorName: 'Màu Trắng', details: 'Bát nhật Giáng Sinh - Tuyên xưng thiên chức Mẹ Thiên Chúa (Theotokos) - Ngày Thế giới Cầu cho Hòa bình.' },
  '01-02': { name: 'Thánh Basiliô Cả và Thánh Grêgôriô Nazianzen, Giám mục', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '01-17': { name: 'Thánh Antôn, Viện phụ', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '01-21': { name: 'Thánh Anê, Trinh nữ, Tử đạo', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '01-24': { name: 'Thánh Phanxicô Salêsiô, Giám mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '01-25': { name: 'Thánh Phaolô Tông Đồ Trở Lại', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },
  '01-28': { name: 'Thánh Tôma Aquinô, Linh mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '01-31': { name: 'Thánh Gioan Bosco, Linh mục', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  
  // THÁNG 2
  '02-02': { name: 'Dâng Chúa Giêsu Trong Đền Thánh (Lễ Nến)', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },
  '02-05': { name: 'Thánh Agata, Trinh nữ, Tử đạo', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '02-06': { name: 'Thánh Phaolô Miki và các bạn tử đạo Nhật Bản', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '02-10': { name: 'Thánh Scholastica, Trinh nữ', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '02-11': { name: 'Đức Mẹ Lộ Đức (Ngày Quốc Tế Bệnh Nhân)', rank: 'OPTIONAL_MEMORIAL', rankName: 'Lễ Nhớ Tùy Chọn', color: 'WHITE', colorName: 'Màu Trắng' },
  '02-14': { name: 'Thánh Cyrillô và Mêthôđiô, Bổn mạng Châu Âu', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '02-22': { name: 'Lập Tông Tòa Thánh Phêrô', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },

  // THÁNG 3
  '03-19': { name: 'Thánh Giuse, Bạn Trăm Năm Đức Maria', rank: 'SOLEMNITY', rankName: 'Lễ Trọng', color: 'WHITE', colorName: 'Màu Trắng', details: 'Quan thầy Hội Thánh Hoàn Vũ và Quan thầy Giáo Hội Việt Nam.' },
  '03-25': { name: 'Lễ Truyền Tin của Chúa', rank: 'SOLEMNITY', rankName: 'Lễ Trọng', color: 'WHITE', colorName: 'Màu Trắng', details: 'Kỷ niệm biến cố Ngôi Lời Nhập Thể trong cung lòng Đức Trinh Nữ Maria.' },

  // THÁNG 4
  '04-06': { name: 'Thánh Phaolô Lê Bảo Tịnh, Linh mục tử đạo', rank: 'OPTIONAL_MEMORIAL', rankName: 'Lễ Nhớ (Lịch VN)', color: 'RED', colorName: 'Màu Đỏ' },
  '04-25': { name: 'Thánh Marcô, Tác giả sách Tin Mừng', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '04-29': { name: 'Thánh Catarina Siêna, Trinh nữ, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },

  // THÁNG 5
  '05-01': { name: 'Thánh Giuse Thợ', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '05-02': { name: 'Thánh Athanasiô, Giám mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '05-03': { name: 'Thánh Philipphê và Thánh Giacôbê, Tông đồ', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '05-13': { name: 'Đức Mẹ Fatima', rank: 'OPTIONAL_MEMORIAL', rankName: 'Lễ Nhớ Tùy Chọn', color: 'WHITE', colorName: 'Màu Trắng' },
  '05-14': { name: 'Thánh Mátthia, Tông đồ', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '05-26': { name: 'Thánh Philipphê Nêri, Linh mục', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '05-31': { name: 'Đức Maria Thăm Viếng Bà Êlisabét', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },

  // THÁNG 6
  '06-01': { name: 'Thánh Giustinô, Tử đạo', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '06-03': { name: 'Thánh Carôlô Lwanga và các bạn tử đạo Uganda', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '06-11': { name: 'Thánh Barnaba, Tông đồ', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '06-13': { name: 'Thánh Antôn Pađôva, Linh mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '06-21': { name: 'Thánh Alôisiô Gonzaga, Tu sĩ', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '06-24': { name: 'Sinh Nhật Thánh Gioan Tẩy Giả', rank: 'SOLEMNITY', rankName: 'Lễ Trọng', color: 'WHITE', colorName: 'Màu Trắng' },
  '06-28': { name: 'Thánh Irênê, Giám mục, Tử đạo, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '06-29': { name: 'Thánh Phêrô và Thánh Phaolô, Tông đồ', rank: 'SOLEMNITY', rankName: 'Lễ Trọng', color: 'RED', colorName: 'Màu Đỏ', details: 'Hai cột trụ vĩ đại của Hội Thánh Rôma và toàn thế giới.' },

  // THÁNG 7
  '07-03': { name: 'Thánh Tôma, Tông đồ', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '07-11': { name: 'Thánh Biển Đức, Viện phụ', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '07-15': { name: 'Thánh Bônaventura, Giám mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '07-22': { name: 'Thánh Maria Mađalêna', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },
  '07-25': { name: 'Thánh Giacôbê, Tông đồ', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '07-26': { name: 'Thánh Gioakim và Thánh Anna, Song thân Đức Maria; Kính Chân Phước Anrê Phú Yên', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng', details: 'Chân phước Anrê Phú Yên: Bổn mạng Huynh trưởng GLV Việt Nam.' },
  '07-29': { name: 'Thánh Martha, Maria và Ladarô', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '07-31': { name: 'Thánh Inhaxiô Loyola, Linh mục; Kính Hai Thánh Tử Đạo Phêrô Đoàn Công Quý và Emmanuel Lê Văn Phụng', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },

  // THÁNG 8
  '08-01': { name: 'Thánh Anphongsô Maria Ligôri, Giám mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-04': { name: 'Thánh Gioan Maria Vianney, Linh mục (Bổn mạng các linh mục xứ)', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-06': { name: 'Chúa Biến Hình Trên Núi Thánh', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-08': { name: 'Thánh Đaminh, Linh mục', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-10': { name: 'Thánh Laurensô, Phó tế, Tử đạo', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '08-11': { name: 'Thánh Clara, Trinh nữ', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-15': { name: 'Đức Mẹ Hồn Xác Lên Trời (Hành Hương La Vang)', rank: 'SOLEMNITY', rankName: 'Lễ Trọng', color: 'WHITE', colorName: 'Màu Trắng', details: 'Mầu nhiệm Đức Maria được đưa về trời cả hồn lẫn xác - Trung tâm Hành hương Đức Mẹ La Vang.' },
  '08-20': { name: 'Thánh Bênađô, Viện phụ, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-21': { name: 'Thánh Giáo hoàng Piô X', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-22': { name: 'Đức Maria Trinh Nữ Nữ Vương', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-24': { name: 'Thánh Batôlômêô, Tông đồ', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '08-27': { name: 'Thánh Mônica, Mẹ Thánh Augustinô', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-28': { name: 'Thánh Augustinô, Giám mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '08-29': { name: 'Thánh Gioan Tẩy Giả Bị Trảm Quyết', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },

  // THÁNG 9
  '09-03': { name: 'Thánh Giáo hoàng Grêgôriô Cả, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '09-08': { name: 'Sinh Nhật Đức Trinh Nữ Maria', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },
  '09-13': { name: 'Thánh Gioan Kim Khẩu, Giám mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '09-14': { name: 'Suy Tôn Thánh Giá Chúa Kitô', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '09-15': { name: 'Đức Mẹ Sầu Bi', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '09-21': { name: 'Thánh Mátthêu, Tông đồ; Kính Thánh Tôma Trần Văn Thiện, Tử đạo (Lịch VN)', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ', details: 'Thánh Tôma Thiện: Bổn mạng Chủng sinh Việt Nam.' },
  '09-27': { name: 'Thánh Vinh Sơn Phaolô, Linh mục', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '09-29': { name: 'Các Tổng Lãnh Thiên Thần Micae, Gabriel và Raphaen', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },
  '09-30': { name: 'Thánh Giêrônimô, Linh mục, Tiến sĩ HT (Dịch giả Vulgata)', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },

  // THÁNG 10
  '10-01': { name: 'Thánh Têrêsa Hài Đồng Giêsu, Trinh nữ, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng', details: 'Bổn mạng các xứ truyền giáo.' },
  '10-02': { name: 'Các Thiên Thần Bản Mệnh', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '10-04': { name: 'Thánh Phanxicô Assisi', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '10-07': { name: 'Đức Mẹ Mân Côi', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '10-15': { name: 'Thánh Têrêsa Avila, Trinh nữ, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '10-17': { name: 'Thánh Inhaxiô Antiôkia, Giám mục, Tử đạo', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '10-18': { name: 'Thánh Luca, Tác giả sách Tin Mừng', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '10-28': { name: 'Thánh Simon và Thánh Giuđa, Tông đồ', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },

  // THÁNG 11
  '11-01': { name: 'Lễ Các Thánh Nam Nữ', rank: 'SOLEMNITY', rankName: 'Lễ Trọng', color: 'WHITE', colorName: 'Màu Trắng', details: 'Tôn vinh muôn vàn các thánh hiển vinh trên Thiên Quốc.' },
  '11-02': { name: 'Cầu Cho Các Tín Hữu Đã Qua Đời (Lễ Cầu Hồn)', rank: 'MEMORIAL', rankName: 'Lễ Cầu Hồn', color: 'PURPLE', colorName: 'Màu Tím', details: 'Toàn thể Hội Thánh hiệp thông cầu nguyện cho các linh hồn nơi luyện ngục.' },
  '11-03': { name: 'Thánh Máctinô Porres, Tu sĩ', rank: 'OPTIONAL_MEMORIAL', rankName: 'Lễ Nhớ Tùy Chọn', color: 'WHITE', colorName: 'Màu Trắng', details: 'Gương sáng bác ái khiêm nhường đối với người nghèo.' },
  '11-04': { name: 'Thánh Carôlô Bôrômêô, Giám mục', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng', details: 'Nhà cải cách vĩ đại thời Công đồng Trentô.' },
  '11-05': { name: 'Thánh Phêrô Nguyễn Văn Lựu, Linh mục tử đạo (Lịch VN)', rank: 'OPTIONAL_MEMORIAL', rankName: 'Lễ Nhớ (Lịch VN)', color: 'RED', colorName: 'Màu Đỏ', details: 'Gương sáng mục tử trung kiên tử đạo vì đức tin tại Việt Nam.' },
  '11-09': { name: 'Cung Hiến Vương Cung Thánh Đường Latêranô', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng', details: 'Nhà thờ Mẹ của mọi nhà thờ tại Rôma và toàn thế giới.' },
  '11-10': { name: 'Thánh Giáo hoàng Lêô Cả, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '11-11': { name: 'Thánh Máctinô Thành Tours, Giám mục', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '11-12': { name: 'Thánh Giôxaphát, Giám mục, Tử đạo', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '11-17': { name: 'Thánh Elisabeth Hungary', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '11-21': { name: 'Đức Mẹ Dâng Mình Trong Đền Thờ', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '11-22': { name: 'Thánh Cecilia, Trinh nữ, Tử đạo', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '11-24': { 
    name: 'Các Thánh Tử Đạo Việt Nam (Anrê Dũng Lạc và các bạn)', 
    rank: 'SOLEMNITY', 
    rankName: 'Đại Lễ Trọng (Lịch VN)', 
    color: 'RED', 
    colorName: 'Màu Đỏ', 
    details: 'Đại Lễ Trọng kính 117 Thánh Tử Đạo Việt Nam - Bổn Mạng Giáo Hội Công Giáo Việt Nam.',
    isVietnamSolemnity: true 
  },
  '11-30': { name: 'Thánh Anrê, Tông đồ', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },

  // THÁNG 12
  '12-03': { name: 'Thánh Phanxicô Xaviê, Linh mục', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng', details: 'Bổn mạng các xứ truyền giáo và Giáo Hội Á Châu.' },
  '12-07': { name: 'Thánh Ambrôsiô, Giám mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '12-08': { name: 'Đức Mẹ Vô Nhiễm Nguyên Tội', rank: 'SOLEMNITY', rankName: 'Lễ Trọng', color: 'WHITE', colorName: 'Màu Trắng', details: 'Tuyên xưng Đức Maria được giữ gìn khỏi mọi vết nhơ nguyên tội.' },
  '12-12': { name: 'Đức Mẹ Guađalupê', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '12-13': { name: 'Thánh Lucia, Trinh nữ, Tử đạo', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'RED', colorName: 'Màu Đỏ' },
  '12-14': { name: 'Thánh Gioan Thánh Giá, Linh mục, Tiến sĩ HT', rank: 'MEMORIAL', rankName: 'Lễ Nhớ Bắt Buộc', color: 'WHITE', colorName: 'Màu Trắng' },
  '12-25': { name: 'Đại Lễ Chúa Giáng Sinh', rank: 'SOLEMNITY', rankName: 'Đại Lễ Trọng', color: 'WHITE', colorName: 'Màu Trắng', details: 'Mầu nhiệm Ngôi Lời Nhập Thể giáng sinh làm người cứu chuộc nhân loại.' },
  '12-26': { name: 'Thánh Stêphanô, Tử đạo tiên khởi', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
  '12-27': { name: 'Thánh Gioan, Tông đồ, Tác giả sách Tin Mừng', rank: 'FEAST', rankName: 'Lễ Kính', color: 'WHITE', colorName: 'Màu Trắng' },
  '12-28': { name: 'Các Thánh Anh Hài, Tử đạo', rank: 'FEAST', rankName: 'Lễ Kính', color: 'RED', colorName: 'Màu Đỏ' },
};

/**
 * Hàm phân tích toàn diện Lịch Phụng Vụ Công Giáo cho bất kỳ ngày nào
 * Áp dụng thứ tự ưu tiên (Table of Liturgical Days) và Lịch Phụng Vụ Việt Nam
 */
export function getLiturgicalDayMeta(dateStr: string): LiturgicalDayMeta {
  const { year, month, day } = parseDateString(dateStr);
  const dayInfo = getDayOfWeek(dateStr);
  const isSunday = dayInfo.dayIndex === 0;

  const { sundayCycle, weekdayCycle, cycleLabel } = getLiturgicalCycles(dateStr);

  // Tính các mốc then chốt của năm phụng vụ
  const easter = calculateEaster(year);
  const easterDateStr = easter.dateStr;
  const ashWednesday = addDaysToDate(easterDateStr, -46);
  const palmSunday = addDaysToDate(easterDateStr, -7);
  const holyThursday = addDaysToDate(easterDateStr, -3);
  const goodFriday = addDaysToDate(easterDateStr, -2);
  const holySaturday = addDaysToDate(easterDateStr, -1);
  const pentecost = addDaysToDate(easterDateStr, 49);
  const trinitySunday = addDaysToDate(pentecost, 7);
  const corpusChristi = addDaysToDate(pentecost, 14);
  const sacredHeart = addDaysToDate(pentecost, 19);
  const adventStart = getFirstSundayOfAdvent(year);
  const christmas = `${year}-12-25`;

  // Mốc Mùa Giáng Sinh của năm trước kéo dài sang tháng 1
  const baptismOfLord = `${year}-01-11`; // Chúa Nhật Lễ Chúa Giêsu Chịu Phép Rửa

  let season: LiturgicalSeason = 'ORDINARY_TIME';
  let seasonName = 'Mùa Thường Niên';
  let defaultColor: LiturgicalColor = 'GREEN';
  let defaultColorName = 'Màu Xanh';
  let defaultRank: FeastRank = isSunday ? 'SOLEMNITY' : 'WEEKDAY';
  let defaultRankName = isSunday ? 'Chúa Nhật' : 'Ngày Trong Tuần';
  let weekNumber = 1;
  let liturgicalWeek = 'Tuần Thường Niên';
  let specialTitle = '';

  // 1. Kiểm tra Mùa Vọng (Advent)
  if (dateStr >= adventStart && dateStr < christmas) {
    season = 'ADVENT';
    seasonName = 'Mùa Vọng';
    defaultColor = 'PURPLE';
    defaultColorName = 'Màu Tím';
    const diffDays = Math.floor((new Date(dateStr).getTime() - new Date(adventStart).getTime()) / (86400000));
    weekNumber = Math.min(4, Math.max(1, Math.floor(diffDays / 7) + 1));
    liturgicalWeek = `Tuần ${toRomanNumeral(weekNumber)} Mùa Vọng`;
    if (isSunday && weekNumber === 3) {
      defaultColor = 'ROSE';
      defaultColorName = 'Màu Hồng (Chúa Nhật Gaudete)';
    }
  }
  // 2. Kiểm tra Mùa Giáng Sinh (Christmas)
  else if (dateStr >= christmas || dateStr <= baptismOfLord) {
    season = 'CHRISTMAS';
    seasonName = 'Mùa Giáng Sinh';
    defaultColor = 'WHITE';
    defaultColorName = 'Màu Trắng';
    liturgicalWeek = 'Mùa Giáng Sinh';
    if (dateStr === christmas) {
      specialTitle = `Đại Lễ Chúa Giáng Sinh (Lễ Đêm & Lễ Ngày - ${cycleLabel})`;
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Đại Lễ Trọng';
    } else if (dateStr === baptismOfLord) {
      specialTitle = `Lễ Chúa Giêsu Chịu Phép Rửa (Kết thúc Mùa Giáng Sinh)`;
      defaultRank = 'FEAST';
      defaultRankName = 'Lễ Kính';
    }
  }
  // 3. Kiểm tra Mùa Chay (Lent) & Tuần Thánh & Tam Nhật Vượt Qua
  else if (dateStr >= ashWednesday && dateStr < easterDateStr) {
    season = 'LENT';
    seasonName = 'Mùa Chay';
    defaultColor = 'PURPLE';
    defaultColorName = 'Màu Tím';

    if (dateStr === ashWednesday) {
      specialTitle = 'Thứ Tư Lễ Tro (Khai mạc Mùa Chay Thánh - Ăn chay kiêng thịt)';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Lễ Trọng';
    } else if (dateStr === palmSunday) {
      specialTitle = `Chúa Nhật Lễ Lá - Tưởng niệm Cuộc Thương Khó của Chúa (${cycleLabel})`;
      defaultColor = 'RED';
      defaultColorName = 'Màu Đỏ';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Lễ Trọng';
    } else if (dateStr === holyThursday) {
      specialTitle = 'Thứ Năm Tuần Thánh - Thánh Lễ Tiệc Ly (Thiết lập Bí tích Thánh Thể & Chức Linh Mục)';
      defaultColor = 'WHITE';
      defaultColorName = 'Màu Trắng';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Lễ Trọng';
    } else if (dateStr === goodFriday) {
      specialTitle = 'Thứ Sáu Tuần Thánh - Tưởng niệm Cuộc Thương Khó và Tử Nạn của Chúa (Ăn chay kiêng thịt)';
      defaultColor = 'RED';
      defaultColorName = 'Màu Đỏ';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Lễ Trọng';
    } else if (dateStr === holySaturday) {
      specialTitle = 'Thứ Bảy Tuần Thánh - Canh thức Vượt Qua';
      defaultColor = 'WHITE';
      defaultColorName = 'Màu Trắng';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Lễ Trọng';
    } else {
      const diffDays = Math.floor((new Date(dateStr).getTime() - new Date(ashWednesday).getTime()) / (86400000));
      weekNumber = Math.min(5, Math.max(1, Math.floor((diffDays - 4) / 7) + 1));
      liturgicalWeek = `Tuần ${toRomanNumeral(weekNumber)} Mùa Chay`;
      if (isSunday && weekNumber === 4) {
        defaultColor = 'ROSE';
        defaultColorName = 'Màu Hồng (Chúa Nhật Laetare)';
      }
    }
  }
  // 4. Kiểm tra Mùa Phục Sinh (Easter Season)
  else if (dateStr >= easterDateStr && dateStr <= pentecost) {
    season = 'EASTER';
    seasonName = 'Mùa Phục Sinh';
    defaultColor = 'WHITE';
    defaultColorName = 'Màu Trắng';

    if (dateStr === easterDateStr) {
      specialTitle = `Đại Lễ Phục Sinh - Chúa Kitô Sống Lại Khải Hoàn (${cycleLabel})`;
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Đại Lễ Trọng';
    } else if (dateStr === pentecost) {
      specialTitle = `Chúa Nhật Chúa Thánh Thần Hiện Xuống - Bế mạc Mùa Phục Sinh (${cycleLabel})`;
      defaultColor = 'RED';
      defaultColorName = 'Màu Đỏ';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Đại Lễ Trọng';
    } else {
      const diffDays = Math.floor((new Date(dateStr).getTime() - new Date(easterDateStr).getTime()) / (86400000));
      weekNumber = Math.min(7, Math.max(1, Math.floor(diffDays / 7) + 1));
      liturgicalWeek = `Tuần ${toRomanNumeral(weekNumber)} Mùa Phục Sinh`;
    }
  }
  // 5. Mùa Thường Niên (Ordinary Time)
  else {
    season = 'ORDINARY_TIME';
    seasonName = 'Mùa Thường Niên';
    defaultColor = 'GREEN';
    defaultColorName = 'Màu Xanh';

    // Tính tuần Mùa Thường Niên dựa trên khoảng cách tới Chúa Nhật I Mùa Vọng
    const diffWeeksToAdvent = Math.floor((new Date(adventStart).getTime() - new Date(dateStr).getTime()) / (7 * 86400000));
    weekNumber = Math.max(1, Math.min(34, 34 - diffWeeksToAdvent));
    liturgicalWeek = `Tuần ${toRomanNumeral(weekNumber)} Thường Niên`;

    // Kiểm tra Lễ Di Động sau Hiện Xuống
    if (dateStr === trinitySunday) {
      specialTitle = `Chúa Nhật Lễ Chúa Ba Ngôi (${cycleLabel})`;
      defaultColor = 'WHITE';
      defaultColorName = 'Màu Trắng';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Lễ Trọng';
    } else if (dateStr === corpusChristi) {
      specialTitle = `Chúa Nhật Lễ Mình và Máu Thánh Chúa Kitô (Corpus Christi)`;
      defaultColor = 'WHITE';
      defaultColorName = 'Màu Trắng';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Lễ Trọng';
    } else if (dateStr === sacredHeart) {
      specialTitle = `Thứ Sáu Lễ Thánh Tâm Chúa Giêsu`;
      defaultColor = 'WHITE';
      defaultColorName = 'Màu Trắng';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Lễ Trọng';
    } else if (weekNumber === 34 && isSunday) {
      specialTitle = `Chúa Nhật XXXIV Thường Niên - Lễ Chúa Kitô Vua Vũ Trụ (${cycleLabel})`;
      defaultColor = 'WHITE';
      defaultColorName = 'Màu Trắng';
      defaultRank = 'SOLEMNITY';
      defaultRankName = 'Đại Lễ Trọng';
    }
  }

  // 6. Kiểm tra các Lễ Cố Định & Lịch Riêng Việt Nam
  const monthDayKey = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const fixedFeast = FIXED_MEMORIALS[monthDayKey];

  let finalRank: FeastRank = defaultRank;
  let finalRankName = defaultRankName;
  let finalColor: LiturgicalColor = defaultColor;
  let finalColorName = defaultColorName;
  let saintOfTheDay = fixedFeast ? fixedFeast.name : undefined;
  let isVietnamSolemnity = false;

  if (fixedFeast) {
    if (fixedFeast.isVietnamSolemnity) {
      isVietnamSolemnity = true;
    }

    // Áp dụng thứ tự ưu tiên (Table of Liturgical Days):
    // A. LỄ TRỌNG (SOLEMNITY)
    if (fixedFeast.rank === 'SOLEMNITY') {
      // Nếu là Chúa Nhật Mùa Vọng, Mùa Chay hoặc Mùa Phục Sinh: Chúa Nhật ưu tiên hơn
      if (isSunday && (season === 'ADVENT' || season === 'LENT' || season === 'EASTER')) {
        // Lễ Trọng được dời ngày hoặc giữ Chúa Nhật
        finalRank = 'SOLEMNITY';
        finalRankName = defaultRankName;
        saintOfTheDay = `${fixedFeast.name} (Trùng Chúa Nhật Mùa ${seasonName} - Cử hành Chúa Nhật)`;
      } else {
        // Nếu là ngày thường HOẶC Chúa Nhật Mùa Thường Niên / Mùa Giáng Sinh: LỄ TRỌNG THAY THẾ
        finalRank = fixedFeast.rank;
        finalRankName = fixedFeast.rankName;
        finalColor = fixedFeast.color;
        finalColorName = fixedFeast.colorName;
        if (fixedFeast.details) {
          saintOfTheDay = `${fixedFeast.name} - ${fixedFeast.details}`;
        }
      }
    } 
    // B. LỄ KÍNH & LỄ NHỚ TRÊN NGÀY THƯỜNG
    else if (!isSunday && (fixedFeast.rank === 'FEAST' || fixedFeast.rank === 'MEMORIAL' || fixedFeast.rank === 'OPTIONAL_MEMORIAL')) {
      // Ngày thường Mùa Chay hoặc Mùa Vọng từ 17/12: Lễ nhớ trở thành tùy chọn
      if (season === 'LENT' && fixedFeast.rank === 'MEMORIAL') {
        finalRank = 'OPTIONAL_MEMORIAL';
        finalRankName = 'Lễ Nhớ Tùy Chọn Trong Mùa Chay';
        saintOfTheDay = fixedFeast.name;
      } else {
        finalRank = fixedFeast.rank;
        finalRankName = fixedFeast.rankName;
        finalColor = fixedFeast.color;
        finalColorName = fixedFeast.colorName;
        if (fixedFeast.details) {
          saintOfTheDay = `${fixedFeast.name} - ${fixedFeast.details}`;
        }
      }
    }
  }

  // 7. Tạo Tiêu Đề Phụng Vụ Hoàn Chỉnh
  let finalTitle = specialTitle;
  if (!finalTitle) {
    if (isSunday) {
      if (fixedFeast && fixedFeast.rank === 'SOLEMNITY' && season === 'ORDINARY_TIME') {
        finalTitle = `${fixedFeast.name} (${fixedFeast.rankName} - ${cycleLabel})`;
      } else {
        finalTitle = `${dayInfo.dayName} ${toRomanNumeral(weekNumber)} ${seasonName} (${cycleLabel})`;
      }
    } else if (fixedFeast && (fixedFeast.rank === 'SOLEMNITY' || fixedFeast.rank === 'FEAST' || fixedFeast.rank === 'MEMORIAL')) {
      finalTitle = `${dayInfo.dayName} ${toRomanNumeral(weekNumber)} ${seasonName} - ${fixedFeast.name} (${fixedFeast.rankName})`;
    } else {
      finalTitle = `${dayInfo.dayName} ${toRomanNumeral(weekNumber)} ${seasonName}`;
    }
  }

  // Xác định ngày có Bài Đọc II: Chúa Nhật HOẶC Lễ Trọng
  const hasSecondReading = isSunday || finalRank === 'SOLEMNITY';

  return {
    date: dateStr,
    season,
    seasonName,
    color: finalColor,
    colorName: finalColorName,
    rank: finalRank,
    rankName: finalRankName,
    cycle: cycleLabel,
    sundayCycle,
    weekdayCycle,
    liturgicalWeek,
    weekNumber,
    dayOfWeekName: dayInfo.dayName,
    title: finalTitle,
    saintOfTheDay,
    isSolemnity: finalRank === 'SOLEMNITY',
    isFeast: finalRank === 'FEAST',
    isMemorial: finalRank === 'MEMORIAL' || finalRank === 'OPTIONAL_MEMORIAL',
    isVietnamSolemnity,
    hasSecondReading
  };
}
