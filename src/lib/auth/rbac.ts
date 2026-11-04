// ============================================================================
// HỆ THỐNG PHÂN QUYỀN VAI TRÒ (RBAC) & BẢO MẬT QUẢN TRỊ
// Nền tảng "Lời Chúa Mỗi Ngày" - Giai đoạn 8
// ============================================================================

export type UserRole = 
  | 'SUPER_ADMIN'          // Quản trị viên tối cao: Toàn quyền cấu hình, phân quyền, sao lưu
  | 'THEOLOGIAN_EDITOR'    // Chuyên gia Thần học: Thẩm định chú giải, GLHTCG, Văn kiện
  | 'LITURGIST'            // Chuyên gia Phụng vụ: Biên tập & kiểm duyệt bài đọc lễ hằng ngày
  | 'CONTENT_MODERATOR'    // Biên tập viên: Quản lý bài suy niệm, duyệt câu hỏi & cảm nhận
  | 'REGISTERED_USER';     // Tín hữu / Độc giả: Đọc, lưu ghi chú, nhật ký cá nhân

export type VerificationStatus = 
  | 'DRAFT'                // Bản thảo đang biên soạn
  | 'PENDING_VERIFICATION' // Chờ chuyên gia thần học / phụng vụ thẩm định
  | 'VERIFIED'             // Đã xác minh nguồn chính thống Công giáo
  | 'PUBLISHED'            // Đã công khai trên ứng dụng
  | 'REJECTED';            // Không đạt tiêu chuẩn học thuyết / nguồn không rõ

export type Permission = 
  // Quản lý Kinh Thánh & Bản dịch
  | 'manage_bible_books'
  | 'edit_bible_study_notes'
  | 'verify_bible_translations'
  // Quản lý Phụng vụ
  | 'manage_liturgical_calendar'
  | 'edit_daily_readings'
  | 'verify_liturgical_readings'
  // Quản lý Giáo lý & Văn kiện
  | 'manage_catechism'
  | 'manage_church_documents'
  | 'verify_theological_links'
  // Quản lý Suy niệm & Nhật ký
  | 'publish_reflections'
  | 'edit_reflections'
  | 'moderate_comments'
  // Quản trị Hệ thống & Người dùng
  | 'manage_users'
  | 'view_audit_logs'
  | 'export_database'
  | 'manage_system_settings';

// BẢNG MA TRẬN PHÂN QUYỀN (PERMISSION MATRIX)
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'manage_bible_books',
    'edit_bible_study_notes',
    'verify_bible_translations',
    'manage_liturgical_calendar',
    'edit_daily_readings',
    'verify_liturgical_readings',
    'manage_catechism',
    'manage_church_documents',
    'verify_theological_links',
    'publish_reflections',
    'edit_reflections',
    'moderate_comments',
    'manage_users',
    'view_audit_logs',
    'export_database',
    'manage_system_settings',
  ],
  THEOLOGIAN_EDITOR: [
    'edit_bible_study_notes',
    'verify_bible_translations',
    'manage_catechism',
    'manage_church_documents',
    'verify_theological_links',
    'publish_reflections',
    'edit_reflections',
  ],
  LITURGIST: [
    'manage_liturgical_calendar',
    'edit_daily_readings',
    'verify_liturgical_readings',
    'publish_reflections',
    'edit_reflections',
  ],
  CONTENT_MODERATOR: [
    'edit_reflections',
    'publish_reflections',
    'moderate_comments',
  ],
  REGISTERED_USER: [],
};

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  roleLabel: string;
  avatarUrl?: string;
  department: string;
  theologicalDegree?: string;
  isActive: boolean;
  lastLogin?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  userName: string;
  userRole: UserRole;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VERIFY' | 'PUBLISH' | 'REJECT';
  actionLabel: string;
  resourceType: 'BIBLE_BOOK' | 'DAILY_READING' | 'REFLECTION' | 'CATECHISM' | 'CHURCH_DOCUMENT' | 'USER_ROLE';
  resourceId: string;
  resourceTitle: string;
  details: string;
}

/**
 * Kiểm tra xem một vai trò có quyền thực hiện hành động cụ thể không
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Kiểm tra quyền truy cập vào trang Admin
 */
export function canAccessAdmin(role: UserRole): boolean {
  return role !== 'REGISTERED_USER';
}

/**
 * Danh sách mô tả chi tiết các vai trò
 */
export const ROLE_DESCRIPTIONS: Record<UserRole, { title: string; desc: string; badgeColor: string }> = {
  SUPER_ADMIN: {
    title: 'Tổng Quản Trị Hệ Thống (Super Admin)',
    desc: 'Toàn quyền cấu hình máy chủ, phân bổ quyền hạn, duyệt xuất bản toàn cầu và xem nhật ký an toàn.',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
  },
  THEOLOGIAN_EDITOR: {
    title: 'Chuyên Gia Thần Học & Giáo Lý',
    desc: 'Chịu trách nhiệm thẩm định tính chính thống của các bài chú giải, đối chiếu Giáo lý Hội Thánh và Văn kiện Huấn quyền.',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  LITURGIST: {
    title: 'Biên Tập Viên Phụng Vụ Thánh',
    desc: 'Soát xét và nhập liệu các bài đọc Lời Chúa theo Lịch Phụng vụ của Hội Đồng Giám Mục Việt Nam và Tòa Thánh.',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  CONTENT_MODERATOR: {
    title: 'Kiểm Duyệt Viên Nội Dung & Suy Niệm',
    desc: 'Quản lý các bài chia sẻ Lời Chúa, lời nguyện và điều phối các tương tác cộng đoàn.',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  REGISTERED_USER: {
    title: 'Tín Hữu / Độc Giả',
    desc: 'Truy cập nội dung công khai, tạo ghi chú cá nhân và ghi nhật ký thiêng liêng.',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
  },
};
