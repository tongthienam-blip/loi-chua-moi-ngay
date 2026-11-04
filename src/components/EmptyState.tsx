import React from 'react';
import { BookOpen, Search, Bookmark, AlertCircle, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'bookmark' | 'reading' | 'notes';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  type = 'search',
  title,
  description,
  actionText,
  onAction
}: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'bookmark':
        return <Bookmark className="w-12 h-12 text-[#C59B27] stroke-[1.5]" />;
      case 'notes':
        return <BookOpen className="w-12 h-12 text-[#8B1E2D] stroke-[1.5]" />;
      default:
        return <Search className="w-12 h-12 text-[#8D6E63] stroke-[1.5]" />;
    }
  };

  const defaultTitles = {
    search: 'Không tìm thấy kết quả phù hợp',
    bookmark: 'Chưa có câu Kinh Thánh nào được đánh dấu',
    reading: 'Không có dữ liệu bài đọc cho ngày này',
    notes: 'Chưa có ghi chú cá nhân'
  };

  const defaultDescriptions = {
    search: 'Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại tên sách, số chương.',
    bookmark: 'Khi đọc Kinh Thánh, hãy nhấn vào biểu tượng dấu trang ở bất kỳ câu nào để lưu lại tại đây.',
    reading: 'Vui lòng chọn một ngày khác trên lịch phụng vụ.',
    notes: 'Nhấn vào câu Kinh Thánh bất kỳ để viết suy niệm và cảm nhận cá nhân.'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#FDFBF7] rounded-2xl border border-[#E8DFC8]/60 my-6">
      <div className="w-20 h-20 rounded-full bg-[#FAF4E8] flex items-center justify-center mb-4 sacred-glow">
        {getIcon()}
      </div>
      <h3 className="font-serif text-lg font-bold text-[#2D1E18] mb-1">
        {title || defaultTitles[type]}
      </h3>
      <p className="text-sm text-[#5D4037] max-w-sm mb-6 leading-relaxed">
        {description || defaultDescriptions[type]}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-sm font-medium transition shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Đã có lỗi xảy ra',
  message = 'Không thể tải nội dung vào lúc này. Xin vui lòng kiểm tra kết nối mạng và thử lại.',
  onRetry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-rose-50/60 rounded-2xl border border-rose-200 my-6">
      <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4 text-[#8B1E2D]">
        <AlertCircle className="w-8 h-8 stroke-[1.75]" />
      </div>
      <h3 className="font-serif text-lg font-bold text-[#8B1E2D] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[#5D4037] max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-sm font-medium transition shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Thử Lại
        </button>
      )}
    </div>
  );
}
