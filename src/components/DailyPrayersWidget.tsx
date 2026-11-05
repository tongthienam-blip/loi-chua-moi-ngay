'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sun, 
  Moon, 
  Church, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  Heart,
  ChevronDown,
  ChevronUp,
  Share2,
  ExternalLink
} from 'lucide-react';
import { SacredCrossIcon, SacredCornerOrnament } from '@/components/SacredIcons';

export interface PrayerItem {
  id: string;
  title: string;
  latinTitle?: string;
  timing?: string;
  intention: string;
  content: string[];
}

export interface PrayerCategory {
  id: 'morning' | 'evening' | 'sunday' | 'rosary';
  label: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  prayers: PrayerItem[];
}

export const PRAYER_CATEGORIES: PrayerCategory[] = [
  // 1. KINH SÁNG
  {
    id: 'morning',
    label: 'KINH SÁNG',
    badge: 'Khởi đầu ngày mới',
    description: 'Dâng ngày mới, rước lễ thiêng liêng và cầu xin ơn bình an soi dẫn.',
    icon: <Sun className="w-5 h-5 text-[#B39A70]" />,
    prayers: [
      {
        id: 'dang-ngay',
        title: 'Kinh Dâng Ngày',
        latinTitle: 'Oratio Matutina',
        timing: 'Khi vừa thức giấc',
        intention: 'Dâng trọn vẹn tư tưởng, lời nói và việc làm cho Thánh Tâm Chúa Giêsu.',
        content: [
          'Lạy Trái Tim Cực Thánh Đức Chúa Giêsu, con nhờ Trái Tim Vô Nhiễm Đức Mẹ Maria, mà dâng lên Chúa mọi lời cầu nguyện, mọi việc con làm, mọi sự khó nhọc và niềm vui trong ngày hôm nay.',
          'Để đền vì tội lỗi chúng con và cầu nguyện theo mọi ý Chúa muốn khi hiến tế chính mình trên bàn thờ mỗi ngày.',
          'Con đặc biệt dâng mọi sự khó trong ngày để cầu nguyện theo ý Đức Thánh Cha trong tháng này. Amen.'
        ]
      },
      {
        id: 'ruoc-le-thieng-lieng',
        title: 'Kinh Rước Lễ Thiêng Liêng',
        latinTitle: 'Communio Spiritualis (Thánh Anphongsô)',
        timing: 'Khi cầu nguyện sớm hoặc không thể hiệp lễ trực tiếp',
        intention: 'Khao khát đón nhận Chúa Giêsu vào ngự trong linh hồn.',
        content: [
          'Lạy Đức Chúa Giêsu, con tin thật Chúa ngự trong Bí tích Thánh Thể cực thánh.',
          'Con yêu mến Chúa trên hết mọi sự, và con khao khát được rước Chúa vào linh hồn con.',
          'Bởi vì bây giờ con không thể rước Chúa cách bí tích, xin Chúa ngự vào lòng con cách thiêng liêng.',
          'Con xin ôm ấp Chúa như thể Chúa đã ngự trong lòng con rồi, và con xin kết hợp trọn vẹn với Chúa. Xin đừng bao giờ để con phải lìa xa Chúa. Amen.'
        ]
      },
      {
        id: 'xin-on-an-lanh',
        title: 'Kinh Cầu Ơn Bình An Ngày Mới',
        latinTitle: 'Adoration & Protection',
        timing: 'Trước khi bắt đầu công việc',
        intention: 'Xin Chúa gìn giữ đôi bàn tay, tư tưởng và bước đi trọn lành.',
        content: [
          'Lạy Chúa là Cha nhân từ, ánh sáng ban mai xua tan bóng đêm, xin xua tan khỏi tâm hồn con mọi bóng tối của lo âu, giận dữ và bất an.',
          'Xin thánh hóa công việc, học tập và các cuộc gặp gỡ của con hôm nay, để mọi việc con làm đều mưu cầu sáng danh Chúa và sinh ích lợi cho tha nhân.',
          'Xin Đức Mẹ Maria và Thánh Cả Giuse gìn giữ gia đình con trong sự che chở bình an của Chúa. Amen.'
        ]
      }
    ]
  },

  // 2. KINH TỐI
  {
    id: 'evening',
    label: 'KINH TỐI',
    badge: 'Tạ ơn & Giấc ngủ bình an',
    description: 'Xét mình cuối ngày, tạ ơn hồng ân và phó thác giấc ngủ trong tay Chúa.',
    icon: <Moon className="w-5 h-5 text-[#762F3A]" />,
    prayers: [
      {
        id: 'kinh-xet-minh',
        title: 'Kinh Ăn Năn Tội & Xét Mình',
        latinTitle: 'Actus Contritionis',
        timing: 'Cuối ngày trước khi ngủ',
        intention: 'Thành tâm thống hối các lỗi lầm thiếu sót trong ngày và xin Chúa thứ tha.',
        content: [
          'Lạy Chúa là Chúa con, Chúa là Đấng trọn tốt trọn lành vô cùng. Chúa đã dựng nên con, và cho Con Chúa ra đời chịu chết vì con, mà con đã cả lòng phản nghịch lỗi nghĩa cùng Chúa, thì con lo buồn đau đớn, cùng chê ghét mọi tội con trên hết mọi sự.',
          'Con dốc lòng chừa cải, và nhờ ơn Chúa thì con sẽ lánh xa dịp tội cùng làm việc đền tội cho xứng. Amen.'
        ]
      },
      {
        id: 'kinh-cam-on',
        title: 'Kinh Cảm Ơn Cuối Ngày',
        latinTitle: 'Gratiarum Actio',
        timing: 'Tạ ơn vì một ngày đã qua',
        intention: 'Tri ân mọi ơn lành hồn xác Chúa đã thương ban suốt 24 giờ qua.',
        content: [
          'Con cám ơn Đức Chúa Trời là Chúa lòng lành vô cùng chẳng bỏ con, chẳng để con không không mà chớ thì lại gìn giữ con suốt ngày hôm nay được mọi sự lành.',
          'Lại cứu lấy con kẻo phải chết tươi ăn năn tội chẳng kịp. Lại dọn cho con linh hồn và xác con đêm nay được an vui.',
          'Vậy các Thánh Thiên Thần, các Thánh Bổn Mạng và Đức Mẹ Maria gìn giữ con đêm nay khỏi tay ma quỷ cám dỗ và mọi sự dữ. Amen.'
        ]
      },
      {
        id: 'pho-thac-ban-dem',
        title: 'Kinh Phó Thác Giấc Ngủ Bình An',
        latinTitle: 'In Manus Tuas, Domine',
        timing: 'Khi lên giường nghỉ ngơi',
        intention: 'Phó dâng linh hồn và thể xác trong tay Chúa.',
        content: [
          'Lạy Chúa, trong tay Chúa, con xin phó thác hồn xác con.',
          'Chúa đã cứu chuộc chúng con, lạy Chúa là Thiên Chúa thành tín.',
          'Xin gìn giữ con như con ngươi mắt Chúa, và giấu ẩn con dưới bóng cánh che chở chở che của Ngài. Xin ban cho chúng con một đêm an giấc và giờ sau hết được bình an. Amen.'
        ]
      }
    ]
  },

  // 3. KINH NGÀY CHÚA NHẬT
  {
    id: 'sunday',
    label: 'KINH CHÚA NHẬT',
    badge: 'Ngày của Chúa',
    description: 'Tuyên xưng đức tin, cầu cho sự hiệp nhất và hòa bình thế giới.',
    icon: <Church className="w-5 h-5 text-[#B39A70]" />,
    prayers: [
      {
        id: 'kinh-tin-kinh',
        title: 'Kinh Tin Kính (Kinh Các Thánh Tông Đồ)',
        latinTitle: 'Symbolum Apostolorum',
        timing: 'Thánh lễ & Giờ kinh Chúa Nhật',
        intention: 'Tuyên xưng trọn vẹn 12 điều cốt lõi của đức tin Công giáo tông truyền.',
        content: [
          'Tôi tin kính Đức Chúa Trời là Cha phép tắc vô cùng dựng nên trời đất.',
          'Tôi tin kính Đức Chúa Giêsu Kitô là Con Một Đức Chúa Cha cùng là Chúa chúng tôi; bởi phép Đức Chúa Thánh Thần mà Người xuống thai, sinh bởi Bà Maria đồng trinh; chịu nạn đời quan Phongxiô Philatô, chịu đóng đinh trên cây Thánh giá, chết và táng xác; xuống ngục tổ tông; ngày thứ ba bởi trong kẻ chết mà sống lại; lên trời ngự bên hữu Đức Chúa Cha phép tắc vô cùng; ngày sau bởi trời lại xuống phán xét kẻ sống và kẻ chết.',
          'Tôi tin kính Đức Chúa Thánh Thần. Tôi tin có Hội Thánh hằng có ở khắp thế này, các thánh thông công. Tôi tin phép tha tội. Tôi tin xác loài người ngày sau sống lại. Tôi tin hằng sống vậy. Amen.'
        ]
      },
      {
        id: 'kinh-hoa-binh',
        title: 'Kinh Hòa Bình',
        latinTitle: 'Thánh Phanxicô Assisi',
        timing: 'Cầu nguyện cho gia đình & xã hội',
        intention: 'Trở nên khí cụ mang bình an, tình thương và tha thứ của Chúa đến trần gian.',
        content: [
          'Lạy Chúa từ nhân, xin làm cho con biết mến yêu và phụng sự Chúa trong mọi người. Lạy Chúa, xin hãy dùng con như khí cụ bình an của Chúa:',
          'Để con đem yêu thương vào nơi oán thù, đem thứ tha vào nơi lăng nhục, đem an hòa vào nơi tranh chấp, đem chân lý vào chốn lỗi lầm.',
          'Đem tin kính vào nơi hoài nghi, đem hy vọng vào nơi thất vọng, đem ánh sáng vào nơi tối tăm, đem niềm vui vào nơi sầu muộn.',
          'Lạy Chúa xin dạy con: Tìm an ủi người hơn được người ủi an; tìm hiểu biết người hơn được người hiểu biết; tìm yêu mến người hơn được người mến yêu.',
          'Vì chính khi hiến thân là khi được nhận lãnh, chính lúc quên mình là lúc gặp lại bản thân, chính khi tha thứ là khi được tha thứ, và chính khi chết đi là khi vui sống muôn đời. Amen.'
        ]
      }
    ]
  },

  // 4. LẦN HẠT MÂN CÔI
  {
    id: 'rosary',
    label: 'LẦN HẠT MÂN CÔI',
    badge: 'Tràng Hạt Mẹ Maria',
    description: 'Hành trình 20 mầu nhiệm Mân Côi qua các ngày trong tuần cùng Mẹ Maria.',
    icon: <Sparkles className="w-5 h-5 text-[#762F3A]" />,
    prayers: [
      {
        id: 'lich-man-coi',
        title: 'Lịch Lần Hạt Mân Côi Theo Ngày',
        latinTitle: 'Rosarium Virginis Mariae',
        timing: 'Phân bổ phụng vụ 7 ngày',
        intention: 'Học nơi Mẹ Maria cách chiêm ngắm dung nhan Đức Kitô.',
        content: [
          '• Thứ Hai & Thứ Bảy: NĂM SỰ VUI (Mầu nhiệm Nhập Thể và thời thơ ấu của Chúa Giêsu).',
          '• Thứ Ba & Thứ Sáu: NĂM SỰ THƯƠNG (Mầu nhiệm Cuộc Khổ Nạn và Tử Nạn của Chúa Giêsu).',
          '• Thứ Tư & Chúa Nhật: NĂM SỰ MỪNG (Mầu nhiệm Phục Sinh và Vinh Quang Nước Trời).',
          '• Thứ Năm: NĂM SỰ SÁNG (Mầu nhiệm Đời Sống Công Khai và Bí tích Thánh Thể).'
        ]
      },
      {
        id: 'nam-su-vui',
        title: 'Năm Sự Vui (Thứ Hai & Thứ Bảy)',
        latinTitle: 'Mysteria Gaudiosa',
        timing: 'Thứ Hai và Thứ Bảy',
        intention: 'Xin ơn khiêm nhường, yêu người, khó nghèo, vâng phục và tìm kiếm Chúa.',
        content: [
          '1. Thứ nhất thì ngắm: Thiên Thần truyền tin cho Đức Bà chịu thai. Ta hãy xin cho được ở khiêm nhường.',
          '2. Thứ hai thì ngắm: Đức Bà đi viếng bà Thánh Isave. Ta hãy xin cho được lòng yêu người.',
          '3. Thứ ba thì ngắm: Đức Bà sinh Đức Chúa Giêsu nơi máng cỏ. Ta hãy xin cho được lòng khó khăn.',
          '4. Thứ bốn thì ngắm: Đức Bà dâng Đức Chúa Giêsu trong đền thánh. Ta hãy xin cho được vâng lời chịu lụy.',
          '5. Thứ năm thì ngắm: Đức Bà tìm được Đức Chúa Giêsu trong đền thánh. Ta hãy xin cho được giữ nghĩa cùng Chúa luôn.'
        ]
      },
      {
        id: 'nam-su-sang',
        title: 'Năm Sự Sáng (Thứ Năm)',
        latinTitle: 'Mysteria Luminosa',
        timing: 'Thứ Năm',
        intention: 'Chiêm ngưỡng đời vụ công khai của Chúa Giêsu.',
        content: [
          '1. Thứ nhất thì ngắm: Đức Chúa Giêsu chịu phép rửa tại sông Giođan. Ta hãy xin cho được sống xứng đáng là con cái Chúa.',
          '2. Thứ hai thì ngắm: Đức Chúa Giêsu dự tiệc cưới Cana. Ta hãy xin cho được noi gương Đức Mẹ mà lắng nghe Lời Chúa.',
          '3. Thứ ba thì ngắm: Đức Chúa Giêsu rao giảng Nước Trời và kêu gọi sám hối. Ta hãy xin cho được hoán cải tâm hồn.',
          '4. Thứ bốn thì ngắm: Đức Chúa Giêsu biến hình trên núi Tabo. Ta hãy xin cho được biến đổi nhờ ân sủng Chúa.',
          '5. Thứ năm thì ngắm: Đức Chúa Giêsu lập Bí tích Thánh Thể. Ta hãy xin cho được sốt sắng kết hợp cùng Chúa Giêsu Thánh Thể.'
        ]
      },
      {
        id: 'nam-su-thuong',
        title: 'Năm Sự Thương (Thứ Ba & Thứ Sáu)',
        latinTitle: 'Mysteria Dolorosa',
        timing: 'Thứ Ba và Thứ Sáu',
        intention: 'Hiệp thông cùng nỗi thống khổ cứu độ của Chúa Cứu Thế.',
        content: [
          '1. Thứ nhất thì ngắm: Đức Chúa Giêsu lo buồn đổ mồ hôi máu nơi vườn Cây Dầu. Ta hãy xin cho được ăn năn tội nên.',
          '2. Thứ hai thì ngắm: Đức Chúa Giêsu chịu đánh đòn nơi cột đá. Ta hãy xin cho được hãm mình chịu khó.',
          '3. Thứ ba thì ngắm: Đức Chúa Giêsu chịu đội mão gai. Ta hãy xin cho được chịu mọi sỉ nhục vì Chúa.',
          '4. Thứ bốn thì ngắm: Đức Chúa Giêsu vác cây Thánh giá lên núi Sọ. Ta hãy xin cho được vác Thánh giá theo chân Chúa.',
          '5. Thứ năm thì ngắm: Đức Chúa Giêsu chịu chết trên cây Thánh giá. Ta hãy xin cho được đóng đinh tính xác thịt vào Thánh giá Chúa.'
        ]
      },
      {
        id: 'nam-su-mung',
        title: 'Năm Sự Mừng (Thứ Tư & Chúa Nhật)',
        latinTitle: 'Mysteria Gloriosa',
        timing: 'Thứ Tư và Chúa Nhật',
        intention: 'Chia sẻ niềm hoan lạc phục sinh và hy vọng sống lại vinh hiển.',
        content: [
          '1. Thứ nhất thì ngắm: Đức Chúa Giêsu sống lại từ cõi chết. Ta hãy xin cho được sống lại thật về phần linh hồn.',
          '2. Thứ hai thì ngắm: Đức Chúa Giêsu lên trời vinh hiển. Ta hãy xin cho được ái mộ những sự trên trời.',
          '3. Thứ ba thì ngắm: Đức Chúa Thánh Thần hiện xuống trên các Tông Đồ. Ta hãy xin cho được đầy dẫy ơn Chúa Thánh Thần.',
          '4. Thứ bốn thì ngắm: Đức Mẹ lên trời cả hồn lẫn xác. Ta hãy xin cho được ơn chết lành trong tay Mẹ.',
          '5. Thứ năm thì ngắm: Đức Mẹ được thưởng trên trời làm Nữ Vương trời đất. Ta hãy xin cho được hưởng phúc cùng Mẹ trên cõi vĩnh hằng.'
        ]
      }
    ]
  }
];

export function DailyPrayersWidget() {
  // Tự động chọn Tab phù hợp theo thời gian thực
  const defaultTab = useMemo<PrayerCategory['id']>(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 là Chúa Nhật

    if (day === 0) return 'sunday';
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 18 || hour < 5) return 'evening';
    return 'rosary';
  }, []);

  const [activeCategory, setActiveCategory] = useState<PrayerCategory['id']>(defaultTab);
  const [selectedPrayerId, setSelectedPrayerId] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const currentCategory = useMemo(() => {
    return PRAYER_CATEGORIES.find((cat) => cat.id === activeCategory) || PRAYER_CATEGORIES[0];
  }, [activeCategory]);

  // Cài đặt bài kinh mặc định khi chuyển Tab
  React.useEffect(() => {
    if (currentCategory.prayers.length > 0) {
      setSelectedPrayerId(currentCategory.prayers[0].id);
    }
  }, [currentCategory]);

  const activePrayer = useMemo(() => {
    return (
      currentCategory.prayers.find((p) => p.id === selectedPrayerId) ||
      currentCategory.prayers[0]
    );
  }, [currentCategory, selectedPrayerId]);

  // Hàm sao chép nội dung bài kinh
  const handleCopyPrayer = (prayer: PrayerItem) => {
    const textToCopy = `${prayer.title.toUpperCase()}\n${prayer.latinTitle ? `(${prayer.latinTitle})\n` : ''}\nÝ nguyện: ${prayer.intention}\n\n${prayer.content.join('\n\n')}\n\n(Nguồn: Lời Chúa Mỗi Ngày - loi-chua-moi-ngay.vercel.app)`;
    
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedId(prayer.id);
        setTimeout(() => setCopiedId(null), 2500);
      });
    }
  };

  return (
    <section 
      aria-label="Góc Kinh Nguyện Hằng Ngày" 
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#F7F4EE] via-[#FCFBF8] to-[#F1ECE1] dark:from-[#241C18] dark:via-[#1F1714] dark:to-[#181210] border border-[#B39A70]/30 shadow-sacred p-4 sm:p-6 md:p-10 my-8 hover:-translate-y-1 hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
    >
      {/* Hình ảnh nền chìm nghệ thuật Công Giáo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-15 pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=40&w=1200&auto=format&fit=crop')` }}
      />
      {/* Hoa văn góc mạ vàng tôn nghiêm */}
      <SacredCornerOrnament position="top-left" className="absolute top-3 left-3 text-[#B39A70]/40 scale-100 sm:scale-110 pointer-events-none" />
      <SacredCornerOrnament position="top-right" className="absolute top-3 right-3 text-[#B39A70]/40 scale-100 sm:scale-110 pointer-events-none" />
      <SacredCornerOrnament position="bottom-left" className="absolute bottom-3 left-3 text-[#B39A70]/40 scale-100 sm:scale-110 pointer-events-none" />
      <SacredCornerOrnament position="bottom-right" className="absolute bottom-3 right-3 text-[#B39A70]/40 scale-100 sm:scale-110 pointer-events-none" />

      {/* Header khối */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-2.5 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#762F3A]/10 dark:bg-[#762F3A]/30 border border-[#B39A70]/40 text-[#762F3A] dark:text-[#E5BE53] text-[11px] font-bold tracking-widest uppercase">
          <Heart className="w-3.5 h-3.5 text-[#762F3A] dark:text-[#E5BE53]" />
          <span>LỜI NGUYỆN MỖI NGÀY & LINH THAO TÂM HỒN</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#762F3A] dark:text-[#F7F4EE] tracking-tight">
          GÓC KINH NGUYỆN & TÂM TÌNH DÂNG CHÚA
        </h2>

        <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-[#B39A70] to-transparent mx-auto" />

        <p className="text-xs sm:text-sm text-[#736B63] dark:text-[#D7CCC8] font-light leading-relaxed px-2">
          Dâng lời cầu nguyện hằng ngày cùng Giáo Hội để nuôi dưỡng đời sống tâm linh và tìm gặp sự bình an trong ân sủng.
        </p>
      </div>

      {/* 4 MENU / TAB ĐIỀU HƯỚNG
          - Desktop: Hàng ngang 4 Tab sang trọng
          - Mobile: Grid 2x2 nút nhỏ gọn, cân đối, dễ chạm */}
      <div className="relative z-10 max-w-4xl mx-auto mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {PRAYER_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 p-2.5 sm:p-3.5 rounded-2xl border transition-all duration-200 text-center sm:text-left ${
                  isActive
                    ? 'bg-[#762F3A] text-white border-[#B39A70] shadow-lg shadow-[#762F3A]/20 scale-[1.02]'
                    : 'bg-white/80 dark:bg-[#2A201C] text-[#403A34] dark:text-[#F7F4EE] border-[#E7E0D5] dark:border-[#3E302A] hover:border-[#B39A70]/60 hover:bg-white'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/15 text-[#E5BE53]' : 'bg-[#F7F4EE] dark:bg-[#1E1714]'}`}>
                  {cat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xs sm:text-sm tracking-wide">
                    {cat.label}
                  </span>
                  <span className={`text-[10px] sm:text-[11px] leading-tight line-clamp-1 ${isActive ? 'text-[#F7F4EE]/80' : 'text-[#8F877F] dark:text-[#A1887F]'}`}>
                    {cat.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* KHUNG NỘI DUNG BÀI KINH ĐƯỢC CHỌN */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white/90 dark:bg-[#201815]/95 backdrop-blur-md rounded-2xl border border-[#B39A70]/30 shadow-lg p-4 sm:p-6 md:p-8 space-y-5">
        
        {/* Thanh chọn bài kinh trong mục (Sub-menu bài kinh) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-3 border-b border-[#B39A70]/20">
          <span className="text-[11px] font-bold text-[#8F877F] uppercase tracking-wider mr-1">
            Chọn kinh:
          </span>
          {currentCategory.prayers.map((prayer) => {
            const isSelected = prayer.id === activePrayer.id;
            return (
              <button
                key={prayer.id}
                onClick={() => setSelectedPrayerId(prayer.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#B39A70] text-[#241C18] shadow-sm font-bold'
                    : 'bg-[#F7F4EE] dark:bg-[#2A201C] text-[#5C534A] dark:text-[#D7CCC8] hover:bg-[#E7E0D5] dark:hover:bg-[#342722]'
                }`}
              >
                {prayer.title}
              </button>
            );
          })}

          {/* Công cụ tiện ích: Đổi cỡ chữ */}
          <div className="ml-auto flex items-center gap-1.5 text-xs text-[#8F877F]">
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              title="Phóng to / Thu nhỏ chữ đọc kinh"
              className="px-2.5 py-1 rounded-lg border border-[#B39A70]/30 hover:border-[#B39A70] text-[11px] font-bold bg-[#F7F4EE] dark:bg-[#2A201C] text-[#762F3A] dark:text-[#E5BE53]"
            >
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </button>
          </div>
        </div>

        {/* Tiêu đề bài kinh & Ý nguyện */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F7F4EE]/60 dark:bg-[#2A201C]/50 p-3 sm:p-4 rounded-xl border border-[#B39A70]/20">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <SacredCrossIcon size={16} className="text-[#B39A70] shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#762F3A] dark:text-[#E5BE53]">
                {activePrayer.title}
              </h3>
            </div>
            {activePrayer.latinTitle && (
              <p className="text-xs italic text-[#8F877F] dark:text-[#A1887F] pl-6">
                {activePrayer.latinTitle}
              </p>
            )}
            <p className="text-xs text-[#5C534A] dark:text-[#D7CCC8] pl-6 pt-1">
              <strong className="text-[#762F3A] dark:text-[#E5BE53]">Ý nguyện: </strong>
              {activePrayer.intention}
            </p>
          </div>

          {/* Nút Sao Chép Kinh */}
          <button
            onClick={() => handleCopyPrayer(activePrayer)}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-[#B39A70]/60 bg-white dark:bg-[#1E1714] text-[#762F3A] dark:text-[#E5BE53] hover:bg-[#762F3A] hover:text-white shadow-xs"
          >
            {copiedId === activePrayer.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép kinh</span>
              </>
            )}
          </button>
        </div>

        {/* Bản văn toàn văn bài kinh (Văn bản Phụng vụ Tiếng Việt Chuẩn) */}
        <div className="space-y-3.5 py-2 px-1">
          {activePrayer.content.map((paragraph, pIdx) => (
            <p 
              key={pIdx} 
              className={`font-serif text-[#403A34] dark:text-[#F7F4EE] leading-relaxed tracking-wide text-justify ${
                fontSize === 'large' ? 'text-base sm:text-lg sm:leading-loose' : 'text-sm sm:text-base'
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Thanh chân hộp bài kinh & Nút đọc trọn bộ */}
        <div className="pt-3 border-t border-[#B39A70]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8F877F]">
          <span className="italic flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B39A70]" />
            Duy trì thói quen đọc kinh sớm tối để tâm hồn luôn hiệp thông cùng Hội Thánh.
          </span>

          <div className="flex items-center gap-2">
            <Link
              href="/kinh-nguyen"
              className="inline-flex items-center gap-1 font-bold text-[#762F3A] dark:text-[#E5BE53] hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Đọc Trọn Bộ Các Kinh Nguyện →</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DailyPrayersWidget;
