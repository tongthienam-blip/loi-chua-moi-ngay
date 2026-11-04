// ============================================================================
// HỆ THỐNG AN NINH & BẢO VỆ DỮ LIỆU (SECURITY LAYER)
// Nền tảng "Lời Chúa Mỗi Ngày" - Giai đoạn 8
// ============================================================================

/**
 * Kiểm tra và bảo vệ biến môi trường nhạy cảm
 * Đảm bảo các khóa API bí mật không bao giờ bị lộ ra client-side
 */
export function getSecureServerConfig() {
  if (typeof window !== 'undefined') {
    throw new Error('CẢNH BÁO BẢO MẬT: Không được gọi getSecureServerConfig từ Client-side!');
  }

  return {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    jwtSecret: process.env.JWT_SECRET || 'catholic-bible-platform-secure-jwt-secret-key-2026',
    adminMasterPass: process.env.ADMIN_MASTER_PASSWORD || '',
  };
}

/**
 * Làm sạch chuỗi văn bản (Sanitize) để phòng ngừa tấn công XSS & HTML Injection
 * Phù hợp khi lưu trữ ghi chú cá nhân hoặc phản hồi của người dùng
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Xác thực cấu trúc 8 phần bắt buộc của bài suy niệm Công giáo
 * Trả về danh sách các mục bị thiếu (nếu có)
 */
export interface ReflectionValidationResult {
  isValid: boolean;
  missingFields: string[];
}

export function validateEightPartReflection(reflection: {
  background?: string;
  explanation?: string;
  coreMessage?: string;
  lifeApplication?: string;
  reflectionQuestions?: string[] | string;
  practicalResolution?: string;
  prayer?: string;
  category?: string;
}): ReflectionValidationResult {
  const missing: string[] = [];

  if (!reflection.background?.trim()) missing.push('1. Bối cảnh lịch sử / phụng vụ');
  if (!reflection.explanation?.trim()) missing.push('2. Giải thích ý nghĩa Lời Chúa');
  if (!reflection.coreMessage?.trim()) missing.push('3. Sứ điệp thần học chính yếu');
  if (!reflection.lifeApplication?.trim()) missing.push('4. Liên hệ thực tế đời sống Kitô hữu');
  
  const hasQuestions = Array.isArray(reflection.reflectionQuestions)
    ? reflection.reflectionQuestions.length > 0
    : !!reflection.reflectionQuestions?.trim();
  if (!hasQuestions) missing.push('5. Câu hỏi gợi ý suy gẫm');

  if (!reflection.practicalResolution?.trim()) missing.push('6. Quyết tâm thực hành cụ thể');
  if (!reflection.prayer?.trim()) missing.push('7. Lời nguyện tâm tình');
  if (!reflection.category?.trim()) missing.push('8. Chuyên mục thiêng liêng');

  return {
    isValid: missing.length === 0,
    missingFields: missing,
  };
}

/**
 * Kiểm tra tính hợp lệ của số đoạn Giáo lý Hội Thánh Công giáo (GLHTCG)
 * Quy định chuẩn: Số từ 1 đến 2865
 */
export function isValidCatechismNumber(num: number): boolean {
  return Number.isInteger(num) && num >= 1 && num <= 2865;
}

/**
 * Trình giới hạn tần suất yêu cầu (Rate Limiter) bảo vệ máy chủ & chi phí AI
 */
class InMemoryRateLimiter {
  private requests: Map<string, number[]> = new Map();

  /**
   * Kiểm tra xem IP hoặc UserId có vượt quá ngưỡng cho phép không
   * @param key Khóa định danh (IP hoặc UserId)
   * @param limit Số lần yêu cầu tối đa
   * @param windowMs Khoảng thời gian tính bằng mili giây (ví dụ: 60,000ms = 1 phút)
   */
  public isAllowed(key: string, limit: number = 20, windowMs: number = 60000): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    
    // Lọc bỏ các timestamp ngoài cửa sổ thời gian
    const validTimestamps = timestamps.filter(ts => now - ts < windowMs);
    
    if (validTimestamps.length >= limit) {
      return false;
    }
    
    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);
    return true;
  }
}

export const rateLimiter = new InMemoryRateLimiter();
