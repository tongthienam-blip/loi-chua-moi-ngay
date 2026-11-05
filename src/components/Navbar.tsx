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
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/95 dark:bg-[#1A1412]/95 backdrop-blur-md border-b border-[#E7E0D5] dark:border-[#3E302A] transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Logo & App Title: Giữ gọn, không bị cắt hay mất chữ */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#762F3A] to-[#5E252E] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <span className="font-serif text-base sm:text-lg font-bold">☩</span>
            </div>
            <div className="min-w-0">
              <div className="font-serif text-sm sm:text-base font-bold tracking-tight text-[#403A34] dark:text-[#F7F4EE] group-hover:text-[#762F3A] transition truncate">
                LỜI CHÚA MỖI NGÀY
              </div>
              <div className="hidden min-[480px]:block text-[9px] font-semibold tracking-wider uppercase text-[#B39A70] leading-none mt-0.5 truncate">
                Nền Tảng Kinh Thánh Công Giáo
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (5 Mục Chính + Dropdown Khám Phá) */}
          <nav className="hidden md:flex items-center gap-1">
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-[#762F3A] text-white shadow-xs'
                      : 'text-[#655E57] dark:text-[#D7CCC8] hover:text-[#403A34] hover:bg-[#EFEAE0] dark:hover:bg-[#251D1A]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Dropdown Menu Khám Phá Thêm */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isMoreActive || isDropdownOpen
                    ? 'bg-[#FAF4E8] dark:bg-[#251D1A] text-[#762F3A] dark:text-[#E5BE53] border border-[#762F3A]/20 shadow-xs'
                    : 'text-[#655E57] dark:text-[#D7CCC8] hover:text-[#403A34] hover:bg-[#EFEAE0] dark:hover:bg-[#251D1A]'
                }`}
                title="Khám phá các tính năng nghiên cứu và tiện ích"
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span>Khám Phá</span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Popover */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#271E1B] rounded-2xl shadow-sacred-lg border border-[#E7E0D5] dark:border-[#3E302A] p-2 space-y-1 animate-fade-in z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B39A70] border-b border-stone-100 dark:border-stone-800 mb-1">
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
                            ? 'bg-[#FAF4E8] dark:bg-[#312622] text-[#762F3A] dark:text-[#E5BE53]'
                            : 'hover:bg-[#F7F4EE] dark:hover:bg-[#312622] text-[#403A34] dark:text-[#F7F4EE]'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-[#762F3A] text-white' : 'bg-stone-100 dark:bg-stone-800 text-[#655E57]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">
                            {link.label}
                          </div>
                          <div className="text-[11px] text-[#8F877F] mt-0.5 leading-tight">
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
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white dark:bg-[#271E1B] hover:bg-stone-50 text-xs text-[#655E57] dark:text-[#D7CCC8] border border-[#E7E0D5] dark:border-[#3E302A] shadow-xs transition whitespace-nowrap"
              title="Tìm kiếm Kinh Thánh và Giáo lý"
            >
              <Search className="w-3.5 h-3.5 text-[#762F3A] dark:text-[#E5BE53] shrink-0" />
              <span className="hidden sm:inline">Tìm kiếm</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-500 rounded border border-stone-200 dark:border-stone-700">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#271E1B] hover:bg-stone-50 text-[#655E57] dark:text-[#D7CCC8] border border-[#E7E0D5] dark:border-[#3E302A] shadow-xs transition shrink-0"
              title={`Đổi giao diện (Hiện tại: ${currentTheme})`}
            >
              {currentTheme === 'dark' ? (
                <Moon className="w-4 h-4 text-[#B39A70]" />
              ) : (
                <Sun className="w-4 h-4 text-[#B39A70]" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-xl bg-white dark:bg-[#271E1B] text-[#403A34] dark:text-[#F7F4EE] border border-[#E7E0D5] dark:border-[#3E302A] shrink-0"
              title="Mở menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#F7F4EE] dark:bg-[#1A1412] border-b border-[#E7E0D5] dark:border-[#3E302A] px-4 pt-2 pb-5 space-y-3 animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#B39A70]">
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
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#762F3A] text-white shadow-xs'
                        : 'text-[#655E57] dark:text-[#D7CCC8] hover:bg-[#EFEAE0] dark:hover:bg-[#251D1A]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="space-y-1 pt-2 border-t border-[#E7E0D5] dark:border-[#3E302A]">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#B39A70]">
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
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#762F3A] text-white shadow-xs'
                        : 'text-[#655E57] dark:text-[#D7CCC8] hover:bg-[#EFEAE0] dark:hover:bg-[#251D1A]'
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
