'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Calendar, 
  Search, 
  Sparkles, 
  Shield, 
  Compass, 
  Moon, 
  Sun, 
  Menu, 
  X,
  Bot,
  Award,
  Heart,
  BookMarked,
  Info,
  ChevronDown,
  Layers
} from 'lucide-react';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 5 Mục chính hiển thị trực tiếp trên Header
  const primaryNavLinks = [
    { href: '/', label: 'Trang Chủ', icon: Sparkles },
    { href: '/kinh-thanh', label: '73 Sách', icon: BookOpen },
    { href: '/phung-vu', label: 'Phụng Vụ', icon: Calendar },
    { href: '/giao-ly', label: 'Giáo Lý', icon: BookMarked },
    { href: '/gioi-thieu', label: 'Tác Giả', icon: Info },
  ];

  // Các mục phụ đưa vào Dropdown "Khám Phá"
  const moreNavLinks = [
    { href: '/nghien-cuu', label: 'Nghiên Cứu Thần Học', icon: Compass, desc: 'Đối chiếu song ngữ, từ điển & tiên trưng' },
    { href: '/tro-ly-ai', label: 'Trợ Lý Thần Học AI', icon: Bot, desc: 'Hỏi đáp Huấn quyền & Giáo lý Hội Thánh' },
    { href: '/ke-hoach-doc', label: 'Kế Hoạch Đọc', icon: Award, desc: 'Lộ trình 365 ngày, 90 ngày Tân Ước' },
    { href: '/ca-nhan', label: 'Không Gian Cá Nhân', icon: Heart, desc: 'Đánh dấu, ghi chú & nhật ký tâm linh' },
    { href: '/admin', label: 'Quản Trị Hệ Thống', icon: Shield, desc: 'Kiểm duyệt nguồn & phân quyền' },
  ];

  const allNavLinks = [...primaryNavLinks, ...moreNavLinks];

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Đóng dropdown khi chuyển trang
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const cycleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'sepia' : currentTheme === 'sepia' ? 'dark' : 'light';
    setCurrentTheme(nextTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-sepia', 'theme-dark');
      if (nextTheme !== 'light') {
        document.documentElement.classList.add(`theme-${nextTheme}`);
      }
    }
  };

  const isMoreActive = moreNavLinks.some(link => pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)));

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          
          {/* Logo & App Title with Sacred Cross Glowing Halo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative">
              {/* Glowing Pulsing Radial Halo */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C59B27]/40 via-[#8B1E2D]/30 to-[#C59B27]/40 blur-sm animate-sacred-radiance pointer-events-none" />
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#8B1E2D] to-[#701124] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(197,155,39,0.5)] transition-all">
                <span className="font-serif text-lg sm:text-xl font-bold">☩</span>
              </div>
            </div>
            <div className="hidden min-[380px]:block">
              <div className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#2D1E18] group-hover:text-[#8B1E2D] transition leading-none whitespace-nowrap">
                LỜI CHÚA MỖI NGÀY
              </div>
              <div className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#855D14] mt-0.5 whitespace-nowrap">
                Nền Tảng Kinh Thánh Công Giáo
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (5 Mục Chính + Dropdown Khám Phá) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-[#8B1E2D] text-white shadow-sm'
                      : 'text-[#5D4037] hover:text-[#2D1E18] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Dropdown Menu Khám Phá Thêm */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isMoreActive || isDropdownOpen
                    ? 'bg-[#FAF4E8] text-[#8B1E2D] border border-[#8B1E2D]/30 shadow-sm'
                    : 'text-[#5D4037] hover:text-[#2D1E18] hover:bg-[#F4EFE6]'
                }`}
                title="Khám phá các tính năng nghiên cứu và tiện ích"
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Khám Phá</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Popover */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-sacred-lg border border-[#E8DFC8] p-2 space-y-1 animate-fade-in z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#855D14] border-b border-stone-100 mb-1">
                    Tiện Ích & Nghiên Cứu
                  </div>
                  {moreNavLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition ${
                          isActive
                            ? 'bg-[#FAF4E8] text-[#8B1E2D]'
                            : 'hover:bg-[#FAF7F2] text-[#2D1E18]'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-[#8B1E2D] text-white' : 'bg-stone-100 text-[#5D4037]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight flex items-center gap-1">
                            {link.label}
                          </div>
                          <div className="text-[11px] text-[#8D6E63] mt-0.5 leading-tight">
                            {link.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Toolbar Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-xs text-[#5D4037] border border-[#E8DFC8] shadow-sm transition whitespace-nowrap"
              title="Tìm kiếm toàn bộ Kinh Thánh và Giáo lý"
            >
              <Search className="w-4 h-4 text-[#8B1E2D] shrink-0" />
              <span className="hidden sm:inline">Tìm kiếm</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-stone-100 text-stone-500 rounded border border-stone-200">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#5D4037] border border-[#E8DFC8] shadow-sm transition shrink-0"
              title={`Đổi giao diện (Hiện tại: ${currentTheme})`}
            >
              {currentTheme === 'dark' ? (
                <Moon className="w-4 h-4 text-[#C59B27]" />
              ) : (
                <Sun className="w-4 h-4 text-[#C59B27]" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/80 text-[#2D1E18] border border-[#E8DFC8] shrink-0"
              title="Mở menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Hiển thị đầy đủ cả 2 nhóm mục) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DFC8] px-4 pt-2 pb-5 space-y-3 animate-fade-in max-h-[85vh] overflow-y-auto">
            {/* Nhóm mục chính */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#855D14]">
                Mục Chính
              </div>
              {primaryNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#8B1E2D] text-white shadow-sm'
                        : 'text-[#5D4037] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Nhóm tiện ích mở rộng */}
            <div className="space-y-1 pt-2 border-t border-[#E8DFC8]">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#855D14]">
                Khám Phá & Tiện Ích
              </div>
              {moreNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#8B1E2D] text-white shadow-sm'
                        : 'text-[#5D4037] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
