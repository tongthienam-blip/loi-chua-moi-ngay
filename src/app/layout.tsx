import type { Metadata, Viewport } from 'next';
import { Lora, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { Footer } from '@/components/Footer';

const lora = Lora({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#762F3A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Lời Chúa Mỗi Ngày - Nền Tảng Kinh Thánh Công Giáo Toàn Diện',
  description: 'Nền tảng đọc, học hỏi, nghiên cứu và sống Lời Chúa theo truyền thống Hội Thánh Công giáo. 73 sách Kinh Thánh, Bài đọc Phụng vụ hằng ngày, Giáo lý Hội Thánh và Nghiên cứu Thần học.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lời Chúa Mỗi Ngày',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var d = document.documentElement;
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  d.classList.add('dark');
                } else {
                  d.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${beVietnamPro.className} bg-[#F7F4EE] dark:bg-[#1A1615] text-[#403A34] dark:text-[#E7E0D5] min-h-screen flex flex-col antialiased selection:bg-[#762F3A]/20 selection:text-[#762F3A] font-sans transition-colors duration-200`}>
        <Navbar />
        <main className="flex-1 pb-20 md:pb-12">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
