// ============================================================================
// HỆ THỐNG PHÂN TÍCH & NẠP DỮ LIỆU KINH THÁNH (BIBLE DATA IMPORTER & PARSER)
// Hỗ trợ chuẩn USFM và JSON chính quy cho 73 Sách Công Giáo
// ============================================================================

import { CATHOLIC_BOOKS } from '@/data/catholic-books';

export interface ParsedVerse {
  bookId: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
}

export interface ParsedChapter {
  bookId: string;
  chapterNumber: number;
  verses: ParsedVerse[];
}

export interface ImportValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    bookId: string;
    bookName: string;
    totalChapters: number;
    totalVerses: number;
  };
}

export class BibleDataImporter {
  /**
   * Phân tích văn bản chuẩn USFM (Unified Standard Format Markers)
   */
  public static parseUSFM(usfmContent: string, fallbackBookId?: string): { chapters: ParsedChapter[]; validation: ImportValidationResult } {
    const lines = usfmContent.split(/\r?\n/);
    const errors: string[] = [];
    const warnings: string[] = [];

    let currentBookId = fallbackBookId || '';
    let currentChapterNum = 0;
    let currentVerses: ParsedVerse[] = [];
    const chaptersMap: Map<number, ParsedVerse[]> = new Map();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // 1. Nhận diện mã sách: \id GEN, \id MAT
      if (line.startsWith('\\id')) {
        const parts = line.split(/\s+/);
        const usfmCode = parts[1]?.toUpperCase() || '';
        const foundBook = CATHOLIC_BOOKS.find(
          b => b.code.toUpperCase() === usfmCode || b.id.toUpperCase() === usfmCode
        );
        if (foundBook) {
          currentBookId = foundBook.id;
        } else {
          warnings.push(`Dòng ${i + 1}: Mã sách USFM "${usfmCode}" không khớp trực tiếp với 73 sách chuẩn. Dùng fallback nếu có.`);
        }
      }

      // 2. Nhận diện chương: \c 1
      else if (line.startsWith('\\c')) {
        const parts = line.split(/\s+/);
        const chapNum = parseInt(parts[1], 10);
        if (!isNaN(chapNum)) {
          if (currentChapterNum > 0 && currentVerses.length > 0) {
            chaptersMap.set(currentChapterNum, [...currentVerses]);
            currentVerses = [];
          }
          currentChapterNum = chapNum;
        }
      }

      // 3. Nhận diện câu: \v 1 Trong lúc khởi đầu...
      else if (line.startsWith('\\v')) {
        if (!currentBookId) {
          errors.push(`Dòng ${i + 1}: Tìm thấy câu Kinh Thánh nhưng chưa xác định được sách.`);
          continue;
        }
        if (currentChapterNum <= 0) {
          errors.push(`Dòng ${i + 1}: Tìm thấy câu Kinh Thánh nhưng chưa xác định được số chương.`);
          continue;
        }

        const match = line.match(/^\\v\s+(\d+)\s+(.+)$/);
        if (match) {
          const vNum = parseInt(match[1], 10);
          // Loại bỏ các thẻ con USFM như \w, \f, \x nếu có
          const cleanText = match[2].replace(/\\[a-z0-9*]+\s?/gi, '').trim();

          currentVerses.push({
            bookId: currentBookId,
            chapterNumber: currentChapterNum,
            verseNumber: vNum,
            text: cleanText
          });
        }
      }
      // Bổ sung các câu tiếp tục sau thẻ đoạn văn \p
      else if (!line.startsWith('\\') && currentVerses.length > 0) {
        // Nối dòng vào câu gần nhất nếu không có thẻ mới
        const lastIdx = currentVerses.length - 1;
        currentVerses[lastIdx].text += ' ' + line.replace(/\\[a-z0-9*]+\s?/gi, '').trim();
      }
    }

    // Đẩy chương cuối cùng vào danh sách
    if (currentChapterNum > 0 && currentVerses.length > 0) {
      chaptersMap.set(currentChapterNum, [...currentVerses]);
    }

    // Kiểm định tính toàn vẹn Quy điển Công giáo
    const targetBook = CATHOLIC_BOOKS.find(b => b.id === currentBookId);
    if (!targetBook) {
      errors.push(`Không tìm thấy sách phù hợp trong danh mục 73 sách Công Giáo.`);
    } else {
      // Kiểm tra số chương có vượt quá quy chuẩn không
      const parsedChapNums = Array.from(chaptersMap.keys());
      const maxChap = Math.max(...parsedChapNums, 0);
      if (maxChap > targetBook.chaptersCount) {
        errors.push(`Sách "${targetBook.name}" chỉ có ${targetBook.chaptersCount} chương, nhưng dữ liệu chứa đến chương ${maxChap}.`);
      }
    }

    const chaptersResult: ParsedChapter[] = [];
    let totalVerses = 0;
    chaptersMap.forEach((verses, chapNum) => {
      chaptersResult.push({
        bookId: currentBookId,
        chapterNumber: chapNum,
        verses
      });
      totalVerses += verses.length;
    });

    chaptersResult.sort((a, b) => a.chapterNumber - b.chapterNumber);

    return {
      chapters: chaptersResult,
      validation: {
        isValid: errors.length === 0,
        errors,
        warnings,
        stats: {
          bookId: currentBookId,
          bookName: targetBook?.name || currentBookId,
          totalChapters: chaptersResult.length,
          totalVerses
        }
      }
    };
  }

  /**
   * Tạo tệp truy vấn SQL Batch để nạp trực tiếp vào Supabase / PostgreSQL
   */
  public static generateSQLBatch(chapters: ParsedChapter[], translationId: string = 'trans-gkpv'): string {
    const lines: string[] = [
      `-- ============================================================================`,
      `-- SQL IMPORT BATCH - DỮ LIỆU KINH THÁNH CÔNG GIÁO`,
      `-- Bản dịch: ${translationId}`,
      `-- Ngày tạo: ${new Date().toISOString()}`,
      `-- ============================================================================`,
      `BEGIN;`
    ];

    for (const chap of chapters) {
      for (const v of chap.verses) {
        const escapedText = v.text.replace(/'/g, "''");
        lines.push(
          `INSERT INTO bible_verses (id, book_id, chapter_number, verse_number, text) ` +
          `VALUES ('${v.bookId}-${v.chapterNumber}-${v.verseNumber}', '${v.bookId}', ${v.chapterNumber}, ${v.verseNumber}, '${escapedText}') ` +
          `ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text;`
        );
      }
    }

    lines.push(`COMMIT;`);
    return lines.join('\n');
  }
}
