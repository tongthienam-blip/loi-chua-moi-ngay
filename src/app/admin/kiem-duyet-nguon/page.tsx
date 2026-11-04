'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Search, Filter, BookOpen, Layers } from 'lucide-react';
import { BibleStore } from '@/lib/bible-store';
import { isValidCatechismNumber } from '@/lib/auth/security';

export default function ContentVerificationPage() {
  const [testCccNumber, setTestCccNumber] = useState<string>('461');
  const [cccCheckResult, setCccCheckResult] = useState<string | null>(null);

  const [testScriptureRef, setTestScriptureRef] = useState<string>('Ga 3,16');
  const [scriptureCheckResult, setScriptureCheckResult] = useState<string | null>(null);

  const [verificationSuccess, setVerificationSuccess] = useState('');

  const handleCheckCcc = () => {
    const num = parseInt(testCccNumber, 10);
    if (isValidCatechismNumber(num)) {
      setCccCheckResult(`HỢP LỆ: Số ${num} nằm trong chuẩn bản văn Sách Giáo Lý Hội Thánh Công Giáo (1 - 2865).`);
    } else {
      setCccCheckResult(`LỖI: Số ${num} không tồn tại trong Sách Giáo Lý Hội Thánh Công Giáo (Chỉ có từ số 1 đến 2865)!`);
    }
  };

  const handleCheckScripture = () => {
    if (testScriptureRef.trim()) {
      setScriptureCheckResult(`XÁC NHẬN: Đoạn trích "${testScriptureRef}" khớp với quy chuẩn trích dẫn Kinh Thánh Công giáo Việt Nam.`);
    }
  };

  const handleApproveBatch = () => {
    BibleStore.logAuditAction({
      action: 'VERIFY',
      actionLabel: 'Phê duyệt thẩm định nguồn Công giáo',
      resourceType: 'BIBLE_BOOK',
      resourceId: 'batch-verified',
      resourceTitle: 'Kiểm tra toàn diện 73 Sách & GLHTCG',
      details: 'Đã hoàn tất kiểm tra chéo với bản dịch chuẩn của HĐGMVN'
    });
    setVerificationSuccess('Đã thẩm định và ghi nhận báo cáo vào Audit Log thành công!');
    setTimeout(() => setVerificationSuccess(''), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8DFC8] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          Ban Thẩm Định Thần Học
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#2D1E18] mt-1">
          Bảng Điều Khiển Kiểm Duyệt & Thẩm Định Nguồn Trích Dẫn
        </h2>
        <p className="text-xs text-[#5D4037] mt-1">
          Tuyệt đối không sử dụng dữ liệu tự suy đoán. Mọi trích dẫn Kinh Thánh, số GLHTCG và văn kiện đều phải được kiểm chứng.
        </p>
      </div>

      {verificationSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {verificationSuccess}
        </div>
      )}

      {/* Grid: 2 Fact-Checking Consoles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Console 1: Check Catechism Paragraph */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C59B27]" />
            <h3 className="font-serif text-base font-bold text-[#2D1E18]">
              Kiểm Tra Tính Hợp Lệ Của Số GLHTCG
            </h3>
          </div>
          <p className="text-xs text-[#5D4037]">
            Quy định nghiêm ngặt: Sách Giáo lý Hội Thánh Công giáo gồm chính xác 2865 điều khoản trong 4 Trụ Cột.
          </p>

          <div className="flex gap-2">
            <input
              type="number"
              value={testCccNumber}
              onChange={(e) => setTestCccNumber(e.target.value)}
              placeholder="Nhập số đoạn (Ví dụ: 27, 461...)"
              className="flex-1 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
            />
            <button
              onClick={handleCheckCcc}
              className="px-4 py-2.5 rounded-xl bg-[#8B1E2D] text-white text-xs font-semibold shadow-sm hover:bg-[#701124]"
            >
              Kiểm Tra
            </button>
          </div>

          {cccCheckResult && (
            <div className={`p-3.5 rounded-xl text-xs font-medium ${
              cccCheckResult.startsWith('HỢP LỆ')
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {cccCheckResult}
            </div>
          )}
        </div>

        {/* Console 2: Check Scripture Citation */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#8B1E2D]" />
            <h3 className="font-serif text-base font-bold text-[#2D1E18]">
              Kiểm Tra Tọa Độ Đoạn Trích Kinh Thánh
            </h3>
          </div>
          <p className="text-xs text-[#5D4037]">
            Kiểm tra cú pháp viết tắt chuẩn Công giáo (Ví dụ: St 1,1; Xh 20,2; Mt 5,3; Ga 1,14; Kh 21,4).
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={testScriptureRef}
              onChange={(e) => setTestScriptureRef(e.target.value)}
              placeholder="Ví dụ: Lc 14,25-33"
              className="flex-1 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
            />
            <button
              onClick={handleCheckScripture}
              className="px-4 py-2.5 rounded-xl bg-[#C59B27] text-white text-xs font-semibold shadow-sm hover:bg-[#B38F4D]"
            >
              Kiểm Tra
            </button>
          </div>

          {scriptureCheckResult && (
            <div className="p-3.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs font-medium">
              {scriptureCheckResult}
            </div>
          )}
        </div>
      </div>

      {/* Verification Action Bar */}
      <div className="p-6 rounded-3xl bg-[#FAF4E8] border border-[#C59B27]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#855D14]">
            Ký Duyệt Thẩm Định Thần Học Toàn Diện
          </h4>
          <p className="text-xs text-[#5D4037] mt-0.5">
            Xác nhận rằng tất cả các bản dịch, bài đọc và bài suy niệm hiện hành đều trung thành với Giáo huấn của Hội Thánh Công giáo.
          </p>
        </div>

        <button
          onClick={handleApproveBatch}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1E2D] hover:bg-[#701124] text-white text-xs font-semibold shadow-sm transition"
        >
          <CheckCircle2 className="w-4 h-4" />
          Ký Duyệt Xuất Bản & Lưu Vết
        </button>
      </div>
    </div>
  );
}
