'use client';

import React from 'react';

interface SacredIconProps {
  className?: string;
  size?: number;
}

/**
 * Biểu tượng Thánh Giá Cứu Độ (Crucifix / Byzantine Cross)
 */
export function SacredCrossIcon({ className = "w-6 h-6", size = 24 }: SacredIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="crossGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#F2E1A9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C59B27" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="crossGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF4E2" />
          <stop offset="40%" stopColor="#C59B27" />
          <stop offset="100%" stopColor="#855D14" />
        </linearGradient>
      </defs>
      {/* Radiant Aura rays */}
      <circle cx="32" cy="24" r="20" fill="url(#crossGlow)" opacity="0.6" className="animate-pulse" />
      <g stroke="currentColor" strokeWidth="1" opacity="0.4">
        <line x1="32" y1="4" x2="32" y2="44" strokeDasharray="2 2" />
        <line x1="12" y1="24" x2="52" y2="24" strokeDasharray="2 2" />
        <line x1="18" y1="10" x2="46" y2="38" strokeDasharray="2 2" />
        <line x1="18" y1="38" x2="46" y2="10" strokeDasharray="2 2" />
      </g>
      {/* Vertical beam */}
      <path
        d="M28 8C28 6.89543 28.8954 6 30 6H34C35.1046 6 36 6.89543 36 8V56C36 57.1046 35.1046 58 34 58H30C28.8954 58 28 57.1046 28 56V8Z"
        fill="url(#crossGold)"
      />
      {/* Horizontal beam */}
      <path
        d="M14 20C12.8954 20 12 20.8954 12 22V26C12 27.1046 12.8954 28 14 28H50C51.1046 28 52 27.1046 52 26V22C52 20.8954 51.1046 20 50 20H14Z"
        fill="url(#crossGold)"
      />
      {/* Decorative center diamond & trefoil ends */}
      <circle cx="32" cy="24" r="3.5" fill="#8B1E2D" stroke="#FAF7F2" strokeWidth="1.5" />
      <circle cx="32" cy="6" r="2" fill="#C59B27" />
      <circle cx="12" cy="24" r="2" fill="#C59B27" />
      <circle cx="52" cy="24" r="2" fill="#C59B27" />
      <circle cx="32" cy="58" r="2" fill="#C59B27" />
    </svg>
  );
}

/**
 * Biểu tượng Chim Bồ Câu Chúa Thánh Thần (Holy Spirit Dove)
 */
export function HolySpiritDoveIcon({ className = "w-6 h-6", size = 24 }: SacredIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="doveRays" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#C59B27" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B1E2D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="doveGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FAF4E8" />
          <stop offset="100%" stopColor="#E2D1B2" />
        </linearGradient>
      </defs>
      {/* 7 Holy Spirit Flame rays radiating downward */}
      <g stroke="#C59B27" strokeWidth="1.5" strokeLinecap="round" opacity="0.65">
        <line x1="32" y1="36" x2="32" y2="58" />
        <line x1="28" y1="38" x2="20" y2="54" />
        <line x1="36" y1="38" x2="44" y2="54" />
        <line x1="24" y1="39" x2="10" y2="48" />
        <line x1="40" y1="39" x2="54" y2="48" />
      </g>
      {/* Radiant Circle */}
      <circle cx="32" cy="28" r="18" fill="url(#doveRays)" className="animate-pulse" />
      {/* Dove Body & Wings */}
      <path
        d="M32 14C34 14 36 16 36 19C36 21 34 23 34 25C38 23 44 20 52 20C50 25 46 29 41 31C45 32 49 33 52 35C47 37 41 37 36 35C35 40 34 46 32 50C30 46 29 40 28 35C23 37 17 37 12 35C15 33 19 32 23 31C18 29 14 25 12 20C20 20 26 23 30 25C30 23 28 21 28 19C28 16 30 14 32 14Z"
        fill="url(#doveGold)"
        stroke="#C59B27"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Olive twig */}
      <path
        d="M32 14C32 11 34 8 38 7"
        stroke="#855D14"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="38" cy="7" r="1.5" fill="#4B6B36" />
      <circle cx="35" cy="9" r="1.2" fill="#4B6B36" />
    </svg>
  );
}

/**
 * Biểu tượng Bông Lúa & Chùm Nho Thánh Thể (Eucharistic Wheat & Grapes)
 */
export function EucharisticWheatGrapesIcon({ className = "w-6 h-6", size = 24 }: SacredIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="wheatGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF4E2" />
          <stop offset="50%" stopColor="#D9B343" />
          <stop offset="100%" stopColor="#946A16" />
        </linearGradient>
        <linearGradient id="grapesPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A84C66" />
          <stop offset="60%" stopColor="#701124" />
          <stop offset="100%" stopColor="#480916" />
        </linearGradient>
      </defs>
      {/* Left side: Wheat ear (Bông lúa mì) */}
      <path d="M22 56C22 46 22 24 22 10" stroke="#C59B27" strokeWidth="1.5" strokeLinecap="round" />
      {/* Wheat grains */}
      <ellipse cx="18" cy="14" rx="4" ry="2.5" transform="rotate(-30 18 14)" fill="url(#wheatGold)" />
      <ellipse cx="26" cy="17" rx="4" ry="2.5" transform="rotate(30 26 17)" fill="url(#wheatGold)" />
      <ellipse cx="18" cy="22" rx="4" ry="2.5" transform="rotate(-30 18 22)" fill="url(#wheatGold)" />
      <ellipse cx="26" cy="25" rx="4" ry="2.5" transform="rotate(30 26 25)" fill="url(#wheatGold)" />
      <ellipse cx="18" cy="30" rx="4" ry="2.5" transform="rotate(-30 18 30)" fill="url(#wheatGold)" />
      <ellipse cx="26" cy="33" rx="4" ry="2.5" transform="rotate(30 26 33)" fill="url(#wheatGold)" />
      <ellipse cx="22" cy="8" rx="2.5" ry="4" fill="url(#wheatGold)" />

      {/* Right side: Grapes cluster (Chùm nho Thánh Thể) */}
      <g>
        {/* Row 1 */}
        <circle cx="38" cy="26" r="4" fill="url(#grapesPurple)" stroke="#F2E1A9" strokeWidth="0.5" />
        <circle cx="46" cy="26" r="4" fill="url(#grapesPurple)" stroke="#F2E1A9" strokeWidth="0.5" />
        <circle cx="54" cy="26" r="4" fill="url(#grapesPurple)" stroke="#F2E1A9" strokeWidth="0.5" />
        {/* Row 2 */}
        <circle cx="42" cy="33" r="4" fill="url(#grapesPurple)" stroke="#F2E1A9" strokeWidth="0.5" />
        <circle cx="50" cy="33" r="4" fill="url(#grapesPurple)" stroke="#F2E1A9" strokeWidth="0.5" />
        {/* Row 3 */}
        <circle cx="46" cy="40" r="4" fill="url(#grapesPurple)" stroke="#F2E1A9" strokeWidth="0.5" />
        {/* Row 4 */}
        <circle cx="46" cy="47" r="3.2" fill="url(#grapesPurple)" stroke="#F2E1A9" strokeWidth="0.5" />
        {/* Stem & Vine leaf */}
        <path d="M46 22C46 16 48 14 52 12" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M46 16C43 14 41 16 41 19C44 20 46 18 46 16Z" fill="#4B6B36" />
      </g>
    </svg>
  );
}

/**
 * Biểu tượng Hào Quang Phụng Vụ / Mặt Nguyệt Thánh Thể (Liturgical Sacred Halo / Monstrance)
 */
export function LiturgicalHaloIcon({ className = "w-6 h-6", size = 24 }: SacredIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="haloCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FBF4E2" />
          <stop offset="80%" stopColor="#E5BE53" />
          <stop offset="100%" stopColor="#855D14" />
        </radialGradient>
      </defs>
      {/* 16 Sunburst rays */}
      <g stroke="#C59B27" strokeWidth="1.5" strokeLinecap="round">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const x1 = 32 + 18 * Math.cos(rad);
          const y1 = 32 + 18 * Math.sin(rad);
          const x2 = 32 + (i % 2 === 0 ? 28 : 24) * Math.cos(rad);
          const y2 = 32 + (i % 2 === 0 ? 28 : 24) * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {/* Ornate Rings */}
      <circle cx="32" cy="32" r="16" stroke="#C59B27" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="32" cy="32" r="13" stroke="#8B1E2D" strokeWidth="1" />
      {/* Host (Bánh Thánh) */}
      <circle cx="32" cy="32" r="10" fill="url(#haloCenter)" />
      {/* Center IHS monogram cross */}
      <path d="M32 26V38M28 29H36" stroke="#8B1E2D" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Dải Hoa Văn Trang Trí Công Giáo Cổ Điển (Arabesque Filigree Divider)
 */
export function SacredOrnamentDivider({ className = "w-full my-6" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 select-none ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59B27]/40 to-[#C59B27]" />
      <div className="flex items-center gap-1.5 text-[#C59B27]">
        <span className="text-[10px] opacity-70">❖</span>
        <span className="font-serif font-bold text-sm text-[#8B1E2D]">☩</span>
        <span className="text-[10px] opacity-70">❖</span>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C59B27]/40 to-[#C59B27]" />
    </div>
  );
}

/**
 * Hoa văn góc Công giáo cổ kính (Sacred Corner Ornament)
 */
export function SacredCornerOrnament({ 
  position = 'top-left', 
  className = '' 
}: { 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; 
  className?: string 
}) {
  const rotation = 
    position === 'top-right' ? 'rotate-90' :
    position === 'bottom-right' ? 'rotate-180' :
    position === 'bottom-left' ? '-rotate-90' : '';

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none transition-all duration-300 ${rotation} ${className}`}
    >
      <path d="M2 2H18C18 2 8 4 8 12C8 20 2 20 2 20V2Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M2 2H20M2 2V20M6 6H14M6 6V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="6" r="1.5" fill="#8B1E2D" />
      <circle cx="14" cy="2" r="1" fill="#C59B27" />
      <circle cx="2" cy="14" r="1" fill="#C59B27" />
    </svg>
  );
}

/**
 * Hiệu ứng hạt ánh sáng lấp lánh (Floating Sparks / Shimmer)
 */
export function FloatingSparks({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      <span className="absolute top-2 left-6 text-[#C59B27] text-xs animate-spark-1">✦</span>
      <span className="absolute top-5 right-8 text-[#E5BE53] text-[10px] animate-spark-2">✧</span>
      <span className="absolute bottom-6 left-12 text-[#C59B27] text-[11px] animate-spark-3">✦</span>
      <span className="absolute bottom-4 right-14 text-[#F2E1A9] text-xs animate-spark-4">✧</span>
    </div>
  );
}
