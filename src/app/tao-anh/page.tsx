'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, Sparkles, Image as ImageIcon, Share2, Copy, Check, Type, Palette } from 'lucide-react';
import { Skeleton } from '@/components/Skeleton';

interface CardTemplate {
  id: string;
  name: string;
  bgColor: string;
  bgGradient: string;
  textColor: string;
  refColor: string;
  accentBorder: string;
}

const TEMPLATES: CardTemplate[] = [
  {
    id: 'parchment',
    name: 'Giấy Dó Trang Nghiêm',
    bgColor: '#FAF4E8',
    bgGradient: 'linear-gradient(135deg, #FAF4E8 0%, #F4EFE6 50%, #EADBCE 100%)',
    textColor: '#2D1E18',
    refColor: '#8B1E2D',
    accentBorder: '#C59B27',
  },
  {
    id: 'golden',
    name: 'Ánh Sáng Thánh',
    bgColor: '#3A2711',
    bgGradient: 'linear-gradient(135deg, #4A3315 0%, #2A1A0B 100%)',
    textColor: '#FDFBF7',
    refColor: '#E5BE53',
    accentBorder: '#C59B27',
  },
  {
    id: 'burgundy',
    name: 'Rượu Vang Phụng Vụ',
    bgColor: '#5A0E1C',
    bgGradient: 'linear-gradient(135deg, #701124 0%, #480916 100%)',
    textColor: '#FFFFFF',
    refColor: '#F2E1A9',
    accentBorder: '#C59B27',
  },
  {
    id: 'night',
    name: 'Đêm Cầu Nguyện',
    bgColor: '#16121D',
    bgGradient: 'linear-gradient(135deg, #1E1729 0%, #0F0C14 100%)',
    textColor: '#F5EBE6',
    refColor: '#D4AF37',
    accentBorder: '#8B1E2D',
  },
];

function VerseCardMakerContent() {
  const searchParams = useSearchParams();
  const initialQuote = searchParams.get('quote') || 'Chính Thầy là con đường, là sự thật và là sự sống.';
  const initialRef = searchParams.get('ref') || 'Ga 14,6';

  const [quoteText, setQuoteText] = useState(initialQuote);
  const [referenceText, setReferenceText] = useState(initialRef);
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(TEMPLATES[0]);
  const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait'>('square');
  const [fontSize, setFontSize] = useState<number>(24);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    drawCanvas();
  }, [quoteText, referenceText, selectedTemplate, aspectRatio, fontSize]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = aspectRatio === 'square' ? 1080 : 1920;
    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    if (selectedTemplate.id === 'parchment') {
      gradient.addColorStop(0, '#FAF4E8');
      gradient.addColorStop(0.5, '#F4EFE6');
      gradient.addColorStop(1, '#EADBCE');
    } else if (selectedTemplate.id === 'golden') {
      gradient.addColorStop(0, '#4A3315');
      gradient.addColorStop(1, '#231508');
    } else if (selectedTemplate.id === 'burgundy') {
      gradient.addColorStop(0, '#701124');
      gradient.addColorStop(1, '#480916');
    } else {
      gradient.addColorStop(0, '#1E1729');
      gradient.addColorStop(1, '#0F0C14');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = selectedTemplate.accentBorder;
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    ctx.fillStyle = selectedTemplate.accentBorder;
    ctx.font = 'bold 36px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('☩', width / 2, 130);

    ctx.fillStyle = selectedTemplate.textColor;
    ctx.font = `italic ${fontSize * 1.8}px Georgia, serif`;
    ctx.textAlign = 'center';

    const maxWidth = width - 240;
    const words = `"${quoteText}"`.split(' ');
    let line = '';
    const lines: string[] = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const lineHeight = fontSize * 2.8;
    const startY = height / 2 - (lines.length * lineHeight) / 2 + 30;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i].trim(), width / 2, startY + i * lineHeight);
    }

    ctx.fillStyle = selectedTemplate.refColor;
    ctx.font = 'bold 32px Georgia, serif';
    ctx.fillText(`— ${referenceText} —`, width / 2, startY + lines.length * lineHeight + 50);

    ctx.fillStyle = selectedTemplate.textColor;
    ctx.globalAlpha = 0.7;
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    ctx.fillText('LỜI CHÚA MỖI NGÀY • TÁC GIẢ: LUCAS NGUYEN (0368727316)', width / 2, height - 90);
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText('Bản quyền thuộc về Lucas Nguyen - Vui lòng không reup dưới mọi hình thức', width / 2, height - 65);
    ctx.globalAlpha = 1.0;
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Loi-Chua-${referenceText.replace(/[\s,]/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      <div className="border-b border-[#E8DFC8] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8B1E2D] uppercase tracking-wider">
          <ImageIcon className="w-4 h-4" />
          Nghệ Thuật Lời Chúa
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2D1E18] mt-1">
          Tạo Ảnh Câu Lời Chúa Trang Nghiêm
        </h1>
        <p className="text-xs text-[#5D4037] mt-1">
          Thiết kế thiệp Lời Chúa chất lượng cao để chia sẻ trên Facebook, Zalo, Instagram hoặc làm hình nền điện thoại.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E8DFC8] shadow-sm space-y-5">
          {/* Quote Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2D1E18] block">
              Câu Kinh Thánh*
            </label>
            <textarea
              rows={3}
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]/20"
            />
          </div>

          {/* Reference Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2D1E18] block">
              Tọa Độ Trích Dẫn*
            </label>
            <input
              type="text"
              value={referenceText}
              onChange={(e) => setReferenceText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs text-[#2D1E18]"
            />
          </div>

          {/* Template Choices */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2D1E18] flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#8B1E2D]" />
              Mẫu Thiết Kế Trang Trọng
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`p-3 rounded-xl text-left border text-xs font-semibold transition ${
                    selectedTemplate.id === tmpl.id
                      ? 'border-[#8B1E2D] bg-[#FAF7F2] text-[#8B1E2D] shadow-sm ring-1 ring-[#8B1E2D]'
                      : 'border-[#E8DFC8] text-[#5D4037] hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-stone-300"
                      style={{ background: tmpl.bgGradient }}
                    />
                    {tmpl.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio & Font Size */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-bold text-[#2D1E18] block mb-1">
                Tỷ Lệ Ảnh
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAspectRatio('square')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                    aspectRatio === 'square'
                      ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                      : 'bg-[#FAF7F2] text-[#5D4037] border-[#E8DFC8]'
                  }`}
                >
                  Vuông (1:1)
                </button>
                <button
                  onClick={() => setAspectRatio('portrait')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl border ${
                    aspectRatio === 'portrait'
                      ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                      : 'bg-[#FAF7F2] text-[#5D4037] border-[#E8DFC8]'
                  }`}
                >
                  Dọc (9:16)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#2D1E18] block mb-1">
                Cỡ Chữ: {fontSize}px
              </label>
              <input
                type="range"
                min={18}
                max={36}
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="w-full mt-2 accent-[#8B1E2D]"
              />
            </div>
          </div>

          {/* Download Action */}
          <button
            onClick={handleDownload}
            className="w-full py-3.5 rounded-2xl bg-[#8B1E2D] hover:bg-[#701124] text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Tải Ảnh Độ Nét Cao (PNG)
          </button>
        </div>

        {/* Live Canvas Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 md:p-6 bg-[#FAF7F2] rounded-3xl border border-[#E8DFC8]">
          <div className="w-full max-w-[420px] overflow-hidden rounded-2xl shadow-2xl border-4 border-white/80">
            <canvas ref={canvasRef} className="w-full h-auto block" />
          </div>
          <span className="text-[11px] text-stone-500 mt-3">
            Bản xem trước trực tiếp (Canvas High-Res 1080p)
          </span>
        </div>
      </div>
    </div>
  );
}

export default function VerseCardMakerPage() {
  return (
    <Suspense fallback={<div className="p-8 max-w-6xl mx-auto"><Skeleton className="h-64 w-full rounded-3xl" /></div>}>
      <VerseCardMakerContent />
    </Suspense>
  );
}
