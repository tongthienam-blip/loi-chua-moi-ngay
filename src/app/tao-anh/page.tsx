'use client';

import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Download, 
  Sparkles, 
  Image as ImageIcon, 
  Share2, 
  Copy, 
  Check, 
  Type, 
  Palette, 
  Shuffle, 
  Layers, 
  Sliders, 
  BookOpen,
  SunMedium
} from 'lucide-react';
import { Skeleton } from '@/components/Skeleton';

interface ColorTemplate {
  id: string;
  name: string;
  bgGradient: string;
  textColor: string;
  refColor: string;
  accentBorder: string;
}

interface CatholicWallpaper {
  id: string;
  name: string;
  url: string;
  category: string;
}

const COLOR_TEMPLATES: ColorTemplate[] = [
  {
    id: 'parchment',
    name: 'Giấy Dó Cổ Điển',
    bgGradient: 'linear-gradient(135deg, #FAF4E8 0%, #F4EFE6 50%, #EADBCE 100%)',
    textColor: '#2D1E18',
    refColor: '#8B1E2D',
    accentBorder: '#B39A70',
  },
  {
    id: 'golden',
    name: 'Ánh Sáng Thánh',
    bgGradient: 'linear-gradient(135deg, #4A3315 0%, #2A1A0B 100%)',
    textColor: '#FDFBF7',
    refColor: '#E5BE53',
    accentBorder: '#C59B27',
  },
  {
    id: 'burgundy',
    name: 'Rượu Vang Phụng Vụ',
    bgGradient: 'linear-gradient(135deg, #701124 0%, #480916 100%)',
    textColor: '#FFFFFF',
    refColor: '#F2E1A9',
    accentBorder: '#B39A70',
  },
  {
    id: 'night',
    name: 'Đêm Thánh Cầu Nguyện',
    bgGradient: 'linear-gradient(135deg, #1E1729 0%, #0F0C14 100%)',
    textColor: '#F5EBE6',
    refColor: '#D4AF37',
    accentBorder: '#8B1E2D',
  },
];

// Kho 8 ảnh nền nghệ thuật Công Giáo tuyển chọn (HD/4K, 200 OK)
const CATHOLIC_WALLPAPERS: CatholicWallpaper[] = [
  {
    id: 'bible-candle',
    name: 'Kinh Thánh & Nến Thánh',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=1920&auto=format&fit=crop',
    category: 'Lời Chúa & Ánh Sáng'
  },
  {
    id: 'stained-glass',
    name: 'Kính Màu Thánh Đường',
    url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=85&w=1920&auto=format&fit=crop',
    category: 'Thánh Đường'
  },
  {
    id: 'altar-candles',
    name: 'Nến Lung Linh Huyền Diệu',
    url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=85&w=1920&auto=format&fit=crop',
    category: 'Phụng Vụ'
  },
  {
    id: 'gothic-cathedral',
    name: 'Vòm Đá Gothic Uy Nghi',
    url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=85&w=1920&auto=format&fit=crop',
    category: 'Kiến Trúc Thánh'
  },
  {
    id: 'vatican-rome',
    name: 'Vatican & Quảng Trường',
    url: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=85&w=1920&auto=format&fit=crop',
    category: 'Tòa Thánh'
  },
  {
    id: 'rose-window',
    name: 'Cửa Sổ Hoa Hồng Cổ Kính',
    url: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=85&w=1920&auto=format&fit=crop',
    category: 'Kính Nghệ Thuật'
  },
  {
    id: 'cross-sunrise',
    name: 'Thánh Giá & Ánh Bình Minh',
    url: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=85&w=1920&auto=format&fit=crop',
    category: 'Phục Sinh'
  },
  {
    id: 'warm-sanctuary',
    name: 'Cung Thánh & Ánh Nắng Ấm',
    url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=85&w=1920&auto=format&fit=crop',
    category: 'Tâm Tình'
  }
];

const QUICK_VERSES = [
  { quote: 'Chính Thầy là con đường, là sự thật và là sự sống.', ref: 'Ga 14,6' },
  { quote: 'Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì.', ref: 'Tv 23,1' },
  { quote: 'Tất cả những ai đang vất vả mang gánh nặng nề, hãy đến cùng tôi, tôi sẽ cho nghỉ ngơi bồi dưỡng.', ref: 'Mt 11,28' },
  { quote: 'Thầy ở cùng anh em mọi ngày cho đến tận thế.', ref: 'Mt 28,20' }
];

function VerseCardMakerContent() {
  const searchParams = useSearchParams();
  const initialQuote = searchParams.get('quote') || 'Chính Thầy là con đường, là sự thật và là sự sống.';
  const initialRef = searchParams.get('ref') || 'Ga 14,6';

  const [quoteText, setQuoteText] = useState(initialQuote);
  const [referenceText, setReferenceText] = useState(initialRef);
  const [bgType, setBgType] = useState<'photo' | 'color'>('photo');
  const [selectedWallpaper, setSelectedWallpaper] = useState<CatholicWallpaper>(CATHOLIC_WALLPAPERS[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<ColorTemplate>(COLOR_TEMPLATES[0]);
  const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait'>('square');
  const [fontSize, setFontSize] = useState<number>(24);
  const [overlayDim, setOverlayDim] = useState<number>(45); // 20% to 80%
  const [isCopied, setIsCopied] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  // Preload ảnh nền đã chọn
  useEffect(() => {
    if (bgType !== 'photo') return;
    setIsImageReady(false);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedWallpaper.url;
    img.onload = () => {
      loadedImageRef.current = img;
      setIsImageReady(true);
    };
    img.onerror = () => {
      loadedImageRef.current = null;
      setIsImageReady(true);
    };
  }, [selectedWallpaper, bgType]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = aspectRatio === 'square' ? 1080 : 1920;
    canvas.width = width;
    canvas.height = height;

    // 1. VẼ NỀN (ẢNH THÁNH ĐƯỜNG HOẶC MÀU PHỤNG VỤ)
    if (bgType === 'photo' && loadedImageRef.current) {
      const img = loadedImageRef.current;
      // Object cover calculations
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let drawW, drawH, drawX, drawY;

      if (imgRatio > canvasRatio) {
        drawH = height;
        drawW = height * imgRatio;
        drawX = (width - drawW) / 2;
        drawY = 0;
      } else {
        drawW = width;
        drawH = width / imgRatio;
        drawX = 0;
        drawY = (height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Lớp phủ tối chống lóa theo độ mờ người dùng chỉnh (Overlay Dim Level)
      const dimAlpha = overlayDim / 100;
      const dimGradient = ctx.createLinearGradient(0, 0, 0, height);
      dimGradient.addColorStop(0, `rgba(0, 0, 0, ${Math.min(dimAlpha + 0.15, 0.95)})`);
      dimGradient.addColorStop(0.5, `rgba(0, 0, 0, ${dimAlpha})`);
      dimGradient.addColorStop(1, `rgba(0, 0, 0, ${Math.min(dimAlpha + 0.25, 0.98)})`);
      ctx.fillStyle = dimGradient;
      ctx.fillRect(0, 0, width, height);

      // Thêm sắc thái Burgundy phụng vụ dịu nhẹ
      ctx.fillStyle = 'rgba(118, 47, 58, 0.18)';
      ctx.fillRect(0, 0, width, height);
    } else {
      // Nền Gradient màu phụng vụ
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
    }

    // Màu sắc chữ và khung viền
    const isDarkBg = bgType === 'photo' || selectedTemplate.id !== 'parchment';
    const primaryTextColor = isDarkBg ? '#FDFBF7' : '#2D1E18';
    const refColor = isDarkBg ? '#E5BE53' : '#762F3A';
    const borderColor = isDarkBg ? 'rgba(229, 190, 83, 0.45)' : 'rgba(179, 154, 112, 0.55)';
    const cornerSymbolColor = isDarkBg ? '#E5BE53' : '#762F3A';

    // 2. KHUNG VIỀN MẠ VÀNG THÁNH THIÊNG (DOUBLE SACRED BORDER)
    const margin = aspectRatio === 'square' ? 56 : 72;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    ctx.lineWidth = 1;
    ctx.strokeRect(margin + 12, margin + 12, width - (margin + 12) * 2, height - (margin + 12) * 2);

    // Hoa văn 4 góc
    const cornerSize = 24;
    ctx.fillStyle = cornerSymbolColor;
    ctx.font = 'bold 20px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('☩', margin + 24, margin + 24);
    ctx.fillText('☩', width - margin - 24, margin + 24);
    ctx.fillText('☩', margin + 24, height - margin - 24);
    ctx.fillText('☩', width - margin - 24, height - margin - 24);

    // 3. BIỂU TƯỢNG THÁNH GIÁ ĐẦU THIỆP
    const topIconY = aspectRatio === 'square' ? 140 : 220;
    ctx.fillStyle = cornerSymbolColor;
    ctx.font = 'bold 42px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('☩', width / 2, topIconY);

    // Đường gạch chỉ vàng thanh mảnh
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 60, topIconY + 30);
    ctx.lineTo(width / 2 + 60, topIconY + 30);
    ctx.stroke();

    // 4. VĂN BẢN CÂU LỜI CHÚA (CENTER WRAP & ELEGANT SERIF)
    ctx.fillStyle = primaryTextColor;
    ctx.font = `italic 500 ${fontSize * 1.85}px Georgia, serif`;
    ctx.textAlign = 'center';

    // Shadow giúp chữ nổi bật tuyệt đối
    if (isDarkBg) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 3;
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 1;
    }

    const maxWidth = width - 260;
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

    const lineHeight = fontSize * 2.85;
    const startY = height / 2 - (lines.length * lineHeight) / 2 + 10;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i].trim(), width / 2, startY + i * lineHeight);
    }

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // 5. TỌA ĐỘ KINH THÁNH
    ctx.fillStyle = refColor;
    ctx.font = 'bold 32px Georgia, serif';
    ctx.fillText(`— ${referenceText} —`, width / 2, startY + lines.length * lineHeight + 55);

    // 6. CHÂN THIỆP TRANG NGHIÊM (100% SẠCH BÓNG TÊN CÁ NHÂN & SĐT)
    const footerY = height - (aspectRatio === 'square' ? 90 : 130);
    ctx.fillStyle = isDarkBg ? 'rgba(247, 244, 238, 0.65)' : 'rgba(64, 58, 52, 0.6)';
    ctx.font = 'bold 15px Georgia, serif';
    ctx.fillText('☩  LỜI CHÚA MỖI NGÀY  ☩', width / 2, footerY);

  }, [quoteText, referenceText, bgType, selectedWallpaper, selectedTemplate, aspectRatio, fontSize, overlayDim]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas, isImageReady]);

  // Đổi ngẫu nhiên ảnh nền
  const handleRandomizeWallpaper = () => {
    setBgType('photo');
    const available = CATHOLIC_WALLPAPERS.filter(w => w.id !== selectedWallpaper.id);
    const randomPick = available[Math.floor(Math.random() * available.length)];
    setSelectedWallpaper(randomPick);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    const safeRef = referenceText.replace(/[\s,]/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    link.download = `Loi-Chua-${safeRef || 'Cau-Nguyen'}-${aspectRatio}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopyQuoteText = () => {
    navigator.clipboard.writeText(`"${quoteText}" — ${referenceText}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-[#403A34] dark:text-[#E7E0D5]">
      
      {/* Header */}
      <div className="border-b border-[#E7E0D5] dark:border-[#3E302A] pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#762F3A]/10 dark:bg-amber-500/10 text-[#762F3A] dark:text-[#E5BE53] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO THIẾT KẾ ẢNH LỜI CHÚA NGHỆ THUẬT</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#762F3A] dark:text-[#E5BE53]">
            Tạo Ảnh Câu Lời Chúa & Thiệp Tâm Tình
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl leading-relaxed">
            Thiết kế ảnh Lời Chúa độ nét cao (Chuẩn HD 1080px) với kho hình nền Thánh đường, Ánh nến lung linh và Kính màu thiêng liêng. Bức thiệp sạch bóng thông tin cá nhân, sẵn sàng cài hình nền hoặc chia sẻ mạng xã hội.
          </p>
        </div>

        {/* Nút Đổi Nền Nhanh */}
        <button
          onClick={handleRandomizeWallpaper}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#762F3A] to-[#8B1E2D] hover:from-[#5E252E] hover:to-[#762F3A] text-white text-xs font-bold shadow-md hover:shadow-lg transition active:scale-95 self-start md:self-auto"
        >
          <Shuffle className="w-4 h-4 text-[#E5BE53]" />
          <span>Đổi Ảnh Khác (Ngẫu Nhiên)</span>
        </button>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =========================================================================
            BỘ ĐIỀU KHIỂN & CÔNG CỤ TÙY BIẾN (5 Cột)
            ========================================================================= */}
        <div className="lg:col-span-5 bg-white dark:bg-[#272220] rounded-3xl p-6 border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm space-y-6">
          
          {/* 1. Câu Kinh Thánh & Tọa Độ */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#762F3A] dark:text-[#E5BE53] flex items-center gap-1.5 font-serif">
                <BookOpen className="w-4 h-4" />
                <span>Nội Dung Câu Lời Chúa*</span>
              </label>
              <button
                onClick={handleCopyQuoteText}
                className="text-[11px] text-stone-500 hover:text-[#762F3A] dark:hover:text-[#E5BE53] flex items-center gap-1 transition"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Đã chép câu' : 'Chép text'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              placeholder="Nhập câu Lời Chúa..."
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1615] border border-[#E7E0D5] dark:border-[#3E302A] text-xs sm:text-sm text-[#403A34] dark:text-[#E7E0D5] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#762F3A] dark:focus:ring-[#E5BE53]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
                placeholder="Tọa độ (Ví dụ: Ga 14,6)"
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A1615] border border-[#E7E0D5] dark:border-[#3E302A] text-xs font-semibold text-[#403A34] dark:text-[#E7E0D5]"
              />

              {/* Gợi Ý Nhanh */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
                {QUICK_VERSES.slice(0, 2).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuoteText(item.quote);
                      setReferenceText(item.ref);
                    }}
                    className="px-2 py-1.5 rounded-lg bg-[#762F3A]/5 dark:bg-amber-500/10 text-[10px] font-bold text-[#762F3A] dark:text-[#E5BE53] whitespace-nowrap hover:bg-[#762F3A]/10 transition"
                  >
                    {item.ref}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Chọn Chế Độ Nền: Ảnh Thánh Đường (Photo) vs Màu Phụng Vụ (Gradient) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#762F3A] dark:text-[#E5BE53] flex items-center gap-1.5 font-serif">
                <Palette className="w-4 h-4" />
                <span>Kho Ảnh Nền Công Giáo Nghệ Thuật</span>
              </label>
              <div className="flex gap-1 bg-[#FAF7F2] dark:bg-[#1A1615] p-1 rounded-xl border border-[#E7E0D5] dark:border-[#3E302A]">
                <button
                  onClick={() => setBgType('photo')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition ${
                    bgType === 'photo' 
                      ? 'bg-[#762F3A] text-white shadow-xs' 
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  Ảnh Thánh Đường
                </button>
                <button
                  onClick={() => setBgType('color')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition ${
                    bgType === 'color' 
                      ? 'bg-[#762F3A] text-white shadow-xs' 
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  Màu Phụng Vụ
                </button>
              </div>
            </div>

            {/* Grid Ảnh Nền Tuyển Chọn */}
            {bgType === 'photo' ? (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {CATHOLIC_WALLPAPERS.map((wp) => (
                    <button
                      key={wp.id}
                      onClick={() => setSelectedWallpaper(wp)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                        selectedWallpaper.id === wp.id
                          ? 'border-[#762F3A] dark:border-[#E5BE53] ring-2 ring-[#762F3A]/40 dark:ring-[#E5BE53]/40 scale-102 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:border-amber-500/40'
                      }`}
                      title={wp.name}
                    >
                      <img
                        src={wp.url}
                        alt={wp.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                        <span className="text-[9px] text-white font-medium truncate w-full text-center">
                          {wp.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Thanh chỉnh độ mờ nền (Overlay Dim Level) */}
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A1615] border border-[#E7E0D5] dark:border-[#3E302A] space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                      <SunMedium className="w-4 h-4 text-[#B39A70]" />
                      Độ Phủ Tối Nền (Giúp Chữ Sắc Nét):
                    </span>
                    <span className="font-mono text-[#762F3A] dark:text-[#E5BE53] font-bold">
                      {overlayDim}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={80}
                    value={overlayDim}
                    onChange={(e) => setOverlayDim(parseInt(e.target.value, 10))}
                    className="w-full accent-[#762F3A] dark:accent-[#E5BE53] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400">
                    <span>Sáng rực rỡ (20%)</span>
                    <span>Cân bằng (45%)</span>
                    <span>Tương phản tối đa (80%)</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Color Template Selector */
              <div className="grid grid-cols-2 gap-2">
                {COLOR_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl)}
                    className={`p-3 rounded-xl text-left border text-xs font-semibold transition ${
                      selectedTemplate.id === tmpl.id
                        ? 'border-[#762F3A] dark:border-[#E5BE53] bg-[#FAF7F2] dark:bg-[#1A1615] text-[#762F3A] dark:text-[#E5BE53] shadow-sm ring-1 ring-[#762F3A]'
                        : 'border-[#E7E0D5] dark:border-[#3E302A] text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ background: tmpl.bgGradient }}
                      />
                      <span className="truncate">{tmpl.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Tùy Chọn Tỷ Lệ Ảnh & Cỡ Chữ */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#762F3A] dark:text-[#E5BE53] flex items-center gap-1 font-serif">
                <Layers className="w-3.5 h-3.5" />
                <span>Tỷ Lệ Ảnh</span>
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAspectRatio('square')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${
                    aspectRatio === 'square'
                      ? 'bg-[#762F3A] text-white border-[#762F3A] shadow-sm'
                      : 'bg-[#FAF7F2] dark:bg-[#1A1615] text-stone-600 dark:text-stone-300 border-[#E7E0D5] dark:border-[#3E302A]'
                  }`}
                >
                  Vuông (1:1)
                </button>
                <button
                  onClick={() => setAspectRatio('portrait')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${
                    aspectRatio === 'portrait'
                      ? 'bg-[#762F3A] text-white border-[#762F3A] shadow-sm'
                      : 'bg-[#FAF7F2] dark:bg-[#1A1615] text-stone-600 dark:text-stone-300 border-[#E7E0D5] dark:border-[#3E302A]'
                  }`}
                >
                  Dọc (9:16)
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#762F3A] dark:text-[#E5BE53] flex items-center gap-1 font-serif">
                  <Type className="w-3.5 h-3.5" />
                  <span>Cỡ Chữ</span>
                </label>
                <span className="text-[11px] font-mono text-stone-400 font-semibold">{fontSize}px</span>
              </div>
              <input
                type="range"
                min={18}
                max={36}
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="w-full mt-2 accent-[#762F3A] dark:accent-[#E5BE53] cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Nút Hành Động Tải Về & Chia Sẻ */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={handleDownload}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#762F3A] to-[#8B1E2D] hover:from-[#5E252E] hover:to-[#762F3A] text-white font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 active:scale-98"
            >
              <Download className="w-4 h-4 text-[#E5BE53]" />
              <span>Tải Thiệp Độ Nét Cao (PNG 1080px)</span>
            </button>

            <p className="text-[11px] text-center text-stone-400 italic">
              Thiệp được kết xuất trực tiếp ở độ phân giải gốc 1080px &bull; Không dính tên cá nhân
            </p>
          </div>

        </div>

        {/* =========================================================================
            KHUNG CANVAS LIVE PREVIEW (7 Cột)
            ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-[#FAF7F2] to-[#F4EFE6] dark:from-[#221C1A] dark:to-[#1A1615] rounded-3xl border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm">
          
          <div className="w-full max-w-[440px] overflow-hidden rounded-2xl shadow-2xl border-4 border-white dark:border-[#272220] transition-all">
            <canvas 
              ref={canvasRef} 
              className="w-full h-auto block select-none"
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-stone-500 dark:text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Kết xuất Canvas 1080px High-Res &bull; Tỷ lệ {aspectRatio === 'square' ? '1:1 (Vuông)' : '9:16 (Dọc Story)'}</span>
          </div>
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
