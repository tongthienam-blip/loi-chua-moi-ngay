'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sun, 
  Moon, 
  Church, 
  Sparkles, 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Heart, 
  Share2, 
  ChevronRight,
  Flame,
  Shield,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { SacredCrossIcon, SacredCornerOrnament } from '@/components/SacredIcons';

export interface PrayerDetail {
  id: string;
  tabId: 'morning' | 'evening' | 'sunday' | 'rosary' | 'common';
  title: string;
  latinTitle?: string;
  timing?: string;
  intention: string;
  tags: string[];
  content: string[];
}

export const CATHOLIC_PRAYERS_DB: PrayerDetail[] = [
  // =========================================================================
  // TAB 1: KINH SÁNG
  // =========================================================================
  {
    id: 'sang-dang-ngay',
    tabId: 'morning',
    title: 'Kinh Dâng Ngày',
    latinTitle: 'Oratio Matutina Offerendi',
    timing: 'Khi vừa thức giấc đầu ngày',
    intention: 'Dâng trọn vẹn tư tưởng, lời nói, việc làm và mọi sự khó nhọc cho Thánh Tâm Chúa Giêsu.',
    tags: ['Kinh Sáng', 'Dâng Ngày', 'Thánh Tâm'],
    content: [
      'Lạy Trái Tim Cực Thánh Đức Chúa Giêsu, con nhờ Trái Tim Vô Nhiễm Đức Mẹ Maria, mà dâng lên Chúa mọi lời cầu nguyện, mọi việc con làm, mọi sự khó nhọc và niềm vui trong ngày hôm nay.',
      'Để đền vì tội lỗi chúng con và cầu nguyện theo mọi ý Chúa muốn khi hiến tế chính mình trên bàn thờ mỗi ngày.',
      'Con đặc biệt dâng mọi sự khó trong ngày hôm nay để cầu nguyện theo ý Đức Thánh Cha trong tháng này. Amen.'
    ]
  },
  {
    id: 'sang-ruoc-le-thieng-lieng',
    tabId: 'morning',
    title: 'Kinh Rước Lễ Thiêng Liêng',
    latinTitle: 'Actus Spiritualis Communionis (Thánh Anphongsô)',
    timing: 'Giờ kinh sáng hoặc khi không thể hiệp lễ trực tiếp',
    intention: 'Khao khát đón rước Chúa Giêsu Thánh Thể ngự vào tâm hồn.',
    tags: ['Kinh Sáng', 'Thánh Thể', 'Hiệp Lễ'],
    content: [
      'Lạy Đức Chúa Giêsu, con tin thật Chúa ngự trong Bí tích Thánh Thể cực thánh.',
      'Con yêu mến Chúa trên hết mọi sự, và con khát khao được rước Chúa vào linh hồn con.',
      'Bởi vì bây giờ con không thể rước Chúa cách bí tích, xin Chúa hãy ngự vào lòng con cách thiêng liêng.',
      'Con xin ôm ấp Chúa như thể Chúa đã ngự thật trong lòng con rồi, và con xin kết hợp trọn vẹn với Chúa. Xin đừng bao giờ để con phải lìa xa Chúa. Amen.'
    ]
  },
  {
    id: 'sang-duc-chua-thanh-than',
    tabId: 'morning',
    title: 'Kinh Đức Chúa Thánh Thần',
    latinTitle: 'Veni Sancte Spiritus',
    timing: 'Trước mọi công việc, học tập và cầu nguyện',
    intention: 'Xin ơn soi sáng, hướng dẫn và đốt lửa mến yêu trong tâm hồn.',
    tags: ['Kinh Sáng', 'Chúa Thánh Thần', 'Ơn Soi Sáng'],
    content: [
      'Chúng con lạy ơn Đức Chúa Thánh Thần thiêng liêng sáng láng vô cùng, chúng con xin Đức Chúa Thánh Thần xuống đầy lòng chúng con, là kẻ tin cậy Đức Chúa Trời, và đốt lửa kính mến Đức Chúa Trời trong lòng chúng con.',
      'Chúng con xin Đức Chúa Trời cho Đức Chúa Thánh Thần xuống.',
      'Đáp: Sửa lại mọi sự trong ngoài chúng con.',
      'Lời nguyện: Chúng con xin Đức Chúa Trời, xưa đã cho Đức Chúa Thánh Thần xuống soi lòng dạy dỗ các Thánh Tông Đồ, thì rầy chúng con cũng xin Đức Chúa Trời cho Đức Chúa Thánh Thần lại xuống, an ủi dạy dỗ chúng con làm những việc lành, vì công nghiệp Đức Chúa Giêsu Kitô là Chúa chúng con. Amen.'
    ]
  },
  {
    id: 'sang-sang-danh',
    tabId: 'morning',
    title: 'Kinh Sáng Danh',
    latinTitle: 'Gloria Patri',
    timing: 'Sau mỗi giờ kinh và dâng lời chúc tụng',
    intention: 'Tôn vinh Thiên Chúa Ba Ngôi chí thánh muôn đời hiển trị.',
    tags: ['Kinh Sáng', 'Thiên Chúa Ba Ngôi', 'Tụng Ca'],
    content: [
      'Sáng danh Đức Chúa Cha và Đức Chúa Con và Đức Chúa Thánh Thần.',
      'Như đã có trước vô cùng và bây giờ và hằng có và đời đời chẳng cùng. Amen.'
    ]
  },
  {
    id: 'sang-truyen-tin',
    tabId: 'morning',
    title: 'Kinh Truyền Tin',
    latinTitle: 'Angelus Domini',
    timing: 'Lúc 6 giờ sáng, 12 giờ trưa và 6 giờ tối',
    intention: 'Kỷ niệm mầu nhiệm Ngôi Lời Nhập Thể trong lòng Đức Trinh Nữ Maria.',
    tags: ['Kinh Sáng', 'Đức Mẹ', 'Truyền Tin'],
    content: [
      'X: Đức Chúa Trời sai Thánh Thiên Thần truyền tin cho Rất Thánh Đức Bà Maria.',
      'Đ: Và Rất Thánh Đức Bà chịu thai bởi phép Đức Chúa Thánh Thần. (Đọc 1 Kinh Kính Mừng)',
      'X: Này tôi là tôi tá Đức Chúa Trời.',
      'Đ: Tôi xin vâng như lời Thánh Thiên Thần truyền. (Đọc 1 Kinh Kính Mừng)',
      'X: Chốc ấy Ngôi Thứ Hai xuống thế làm người.',
      'Đ: Và ở cùng chúng tôi. (Đọc 1 Kinh Kính Mừng)',
      'X: Lạy Rất Thánh Đức Mẹ Chúa Trời, xin cầu cho chúng con.',
      'Đ: Đáng chịu lấy những sự Đức Chúa Kitô đã hứa.',
      'Lời nguyện: Lạy Chúa, chúng con xin Chúa ban ơn xuống trong linh hồn chúng con, là kẻ nhờ lời Thánh Thiên Thần truyền, mà biết thật Đức Chúa Kitô là Con Chúa đã xuống thế làm Người; thì xin vì công ơn Người chịu nạn chịu chết trên cây Thánh giá, cho chúng con ngày sau khi sống lại được đến nơi vinh hiển, cũng vì công nghiệp Đức Chúa Giêsu Kitô là Chúa chúng con. Amen.'
    ]
  },

  // =========================================================================
  // TAB 2: KINH TỐI
  // =========================================================================
  {
    id: 'toi-xet-minh',
    tabId: 'evening',
    title: 'Kinh Ăn Năn Tội & Xét Mình',
    latinTitle: 'Actus Contritionis',
    timing: 'Trước khi đi ngủ ban đêm',
    intention: 'Thành tâm thống hối các tội lỗi và thiếu sót trong ngày, xin ơn thứ tha.',
    tags: ['Kinh Tối', 'Sám Hối', 'Xét Mình'],
    content: [
      'Lạy Chúa là Chúa con, Chúa là Đấng trọn tốt trọn lành vô cùng. Chúa đã dựng nên con, và cho Con Chúa ra đời chịu chết vì con, mà con đã cả lòng phản nghịch lỗi nghĩa cùng Chúa, thì con lo buồn đau đớn, cùng chê ghét mọi tội con trên hết mọi sự.',
      'Con dốc lòng chừa cải, và nhờ ơn Chúa thì con sẽ lánh xa dịp tội, cùng làm việc đền tội cho xứng. Amen.'
    ]
  },
  {
    id: 'toi-cam-on',
    tabId: 'evening',
    title: 'Kinh Cảm Ơn Cuối Ngày',
    latinTitle: 'Gratiarum Actio Vesperi',
    timing: 'Kết thúc một ngày sống',
    intention: 'Tạ ơn Chúa vì muôn ơn lành hồn xác đã thương gìn giữ suốt 24 giờ qua.',
    tags: ['Kinh Tối', 'Tạ Ơn', 'Tri Ân'],
    content: [
      'Con cám ơn Đức Chúa Trời là Chúa lòng lành vô cùng chẳng bỏ con, chẳng để con không không mà chớ thì lại gìn giữ con suốt ngày hôm nay được mọi sự lành, lại cứu lấy con kẻo phải chết tươi ăn năn tội chẳng kịp.',
      'Lại dọn cho con linh hồn và xác con đêm nay được an vui.',
      'Vậy các Thánh Thiên Thần, các Thánh Bổn Mạng và Đức Mẹ Maria gìn giữ con đêm nay khỏi tay ma quỷ cám dỗ và mọi sự dữ. Amen.'
    ]
  },
  {
    id: 'toi-trong-cay',
    tabId: 'evening',
    title: 'Kinh Trông Cậy',
    latinTitle: 'Sub Tuum Praesidium',
    timing: 'Giờ kinh tối gia đình',
    intention: 'Chạy đến nấp bóng cánh nhân từ của Đức Trinh Nữ Maria bảo bọc.',
    tags: ['Kinh Tối', 'Đức Mẹ', 'Bảo Trợ'],
    content: [
      'Chúng con trông cậy Rất Thánh Đức Mẹ Chúa Trời, xin chớ chê chớ bỏ lời chúng con nguyện trong cơn gian nan thiếu thốn, Đức Nữ Đồng Trinh hiển vinh sáng láng.',
      'Đáp: Hằng chữa chúng con cho khỏi mọi sự dữ. Amen.',
      'X: Lạy Rất Thánh Trái Tim Đức Chúa Giêsu. - Đ: Thương xót chúng con.',
      'X: Lạy Trái Tim Cực Thanh Cực Tịnh Rất Thánh Đức Bà Maria. - Đ: Cầu cho chúng con.',
      'X: Lạy Ông Thánh Giuse là bạn thanh sạch Đức Bà Maria trọn đời đồng trinh. - Đ: Cầu cho chúng con.',
      'X: Các Thánh Tử Đạo Việt Nam. - Đ: Cầu cho chúng con.'
    ]
  },
  {
    id: 'toi-an-binh',
    tabId: 'evening',
    title: 'Kinh Xin Bình An & Phó Thác Ban Đêm',
    latinTitle: 'In Manus Tuas, Domine (Completas)',
    timing: 'Trước khi lên giường nghỉ ngơi',
    intention: 'Phó dâng hồn xác vào tay Đấng Tạo Hóa để có giấc ngủ thánh thiện.',
    tags: ['Kinh Tối', 'Bình An', 'Phó Thác'],
    content: [
      'Lạy Chúa, trong tay Chúa, con xin phó thác linh hồn và thể xác con.',
      'Chúa đã chuộc con về, lạy Chúa là Thiên Chúa chân thật.',
      'Xin gìn giữ chúng con như con ngươi mắt Chúa, và che chở chúng con dưới bóng cánh tay Ngài.',
      'Xin ban cho chúng con một đêm an giấc và giờ lâm chung được bình an. Amen.'
    ]
  },

  // =========================================================================
  // TAB 3: KINH CHÚA NHẬT
  // =========================================================================
  {
    id: 'chuanhat-tin-kinh',
    tabId: 'sunday',
    title: 'Kinh Tin Kính (Các Thánh Tông Đồ)',
    latinTitle: 'Symbolum Apostolorum',
    timing: 'Thánh lễ và Phụng vụ Ngày Chúa Nhật',
    intention: 'Tuyên xưng 12 chân lý nền tảng của Đức Tin Công Giáo Tông Truyền.',
    tags: ['Kinh Chúa Nhật', 'Tin Kính', 'Tuyên Xưng'],
    content: [
      'Tôi tin kính Đức Chúa Trời là Cha phép tắc vô cùng dựng nên trời đất.',
      'Tôi tin kính Đức Chúa Giêsu Kitô là Con Một Đức Chúa Cha cùng là Chúa chúng tôi; bởi phép Đức Chúa Thánh Thần mà Người xuống thai, sinh bởi Bà Maria đồng trinh; chịu nạn đời quan Phongxiô Philatô, chịu đóng đinh trên cây Thánh giá, chết và táng xác; xuống ngục tổ tông; ngày thứ ba bởi trong kẻ chết mà sống lại; lên trời ngự bên hữu Đức Chúa Cha phép tắc vô cùng; ngày sau bởi trời lại xuống phán xét kẻ sống và kẻ chết.',
      'Tôi tin kính Đức Chúa Thánh Thần. Tôi tin có Hội Thánh hằng có ở khắp thế này, các thánh thông công. Tôi tin phép tha tội. Tôi tin xác loài người ngày sau sống lại. Tôi tin hằng sống vậy. Amen.'
    ]
  },
  {
    id: 'chuanhat-hoa-binh',
    tabId: 'sunday',
    title: 'Kinh Hòa Bình',
    latinTitle: 'Oratio Sancti Francisci Assisiensis',
    timing: 'Kinh nguyện gia đình và cộng đoàn',
    intention: 'Xin trở nên khí cụ gieo rắc tình thương, lòng thứ tha và niềm hy vọng.',
    tags: ['Kinh Chúa Nhật', 'Hòa Bình', 'Thánh Phanxicô'],
    content: [
      'Lạy Chúa từ nhân, xin làm cho con biết mến yêu và phụng sự Chúa trong mọi người. Lạy Chúa, xin hãy dùng con như khí cụ bình an của Chúa:',
      'Để con đem yêu thương vào nơi oán thù, đem thứ tha vào nơi lăng nhục, đem an hòa vào nơi tranh chấp, đem chân lý vào chốn lỗi lầm.',
      'Đem tin kính vào nơi hoài nghi, đem hy vọng vào nơi thất vọng, đem ánh sáng vào nơi tối tăm, đem niềm vui vào nơi sầu muộn.',
      'Lạy Chúa xin dạy con: Tìm an ủi người hơn được người ủi an; tìm hiểu biết người hơn được người hiểu biết; tìm yêu mến người hơn được người mến yêu.',
      'Vì chính khi hiến thân là khi được nhận lãnh, chính lúc quên mình là lúc gặp lại bản thân, chính khi thứ tha là khi được tha thứ, và chính khi chết đi là khi vui sống muôn đời. Amen.'
    ]
  },
  {
    id: 'chuanhat-nghi-viec',
    tabId: 'sunday',
    title: 'Kinh Nghỉ Việc Ngày Chúa Nhật',
    latinTitle: 'Sanctificatio Diei Domini',
    timing: 'Sáng Chúa Nhật trước khi đi dự lễ',
    intention: 'Thánh hóa Ngày của Chúa, kiêng việc phần xác và bồi dưỡng đời sống thiêng liêng.',
    tags: ['Kinh Chúa Nhật', 'Thánh Hóa', 'Nghỉ Việc'],
    content: [
      'Lạy Chúa, Chúa đã truyền dạy chúng con phải thánh hóa ngày Chúa Nhật để tưởng niệm cuộc Phục Sinh vinh hiển của Chúa Kitô.',
      'Xin cho chúng con biết gác lại những lo toan sinh kế nặng nề, để dành ngày hôm nay thờ phượng Chúa trong sự hiệp nhất Thánh lễ, bồi dưỡng tình thân gia đình và thực thi đức bác ái với những ai đang gặp đau khổ, cô đơn và túng thiếu.',
      'Xin ban ơn dồi dào để ngày hôm nay trở thành nguồn sinh lực mới cho tâm hồn chúng con bước vào tuần lễ mới trong bình an của Chúa. Amen.'
    ]
  },
  {
    id: 'chuanhat-cau-hoi-thanh',
    tabId: 'sunday',
    title: 'Kinh Cầu Cho Đức Giáo Hoàng & Hội Thánh',
    latinTitle: 'Pro Summo Pontifice et Ecclesia',
    timing: 'Ngày Chúa Nhật và các dịp lễ trọng',
    intention: 'Cầu nguyện cho Đức Thánh Cha, các Giám mục và sự hiệp nhất Dân Chúa.',
    tags: ['Kinh Chúa Nhật', 'Đức Giáo Hoàng', 'Hội Thánh'],
    content: [
      'Lạy Thiên Chúa toàn năng hằng hữu, xin đoái nhìn đến Đức Thánh Cha, Đấng kế vị Thánh Phêrô dẫn dắt đoàn chiên Chúa.',
      'Xin gìn giữ ngài được mạnh khỏe, khôn ngoan và tràn đầy ơn Chúa Thánh Thần để can đảm dẫn dắt Hội Thánh vượt qua mọi thử thách của thời đại.',
      'Xin cho mọi tín hữu biết một lòng vâng phục và gắn kết với ngài trong tình bác ái huynh đệ, để toàn thể Hội Thánh trở nên dấu chỉ hữu hình của ơn cứu độ cho muôn dân. Amen.'
    ]
  },

  // =========================================================================
  // TAB 4: LẦN HẠT MÂN CÔI (TOÀN VĂN 4 MẦU NHIỆM)
  // =========================================================================
  {
    id: 'mancoi-nam-su-vui',
    tabId: 'rosary',
    title: 'Năm Sự Vui (Thứ Hai & Thứ Bảy)',
    latinTitle: 'Mysteria Gaudiosa',
    timing: 'Đọc vào Thứ Hai và Thứ Bảy hàng tuần',
    intention: 'Chiêm ngắm mầu nhiệm Ngôi Hai Nhập Thể và thời thơ ấu của Chúa Giêsu.',
    tags: ['Mân Côi', 'Năm Sự Vui', 'Thứ Hai', 'Thứ Bảy'],
    content: [
      '1. Thứ nhất thì ngắm: Thiên Thần truyền tin cho Đức Bà chịu thai. Ta hãy xin cho được ở khiêm nhường. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '2. Thứ hai thì ngắm: Đức Bà đi viếng bà Thánh Isave. Ta hãy xin cho được lòng yêu người. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '3. Thứ ba thì ngắm: Đức Bà sinh Đức Chúa Giêsu nơi máng cỏ. Ta hãy xin cho được lòng khó khăn. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '4. Thứ bốn thì ngắm: Đức Bà dâng Đức Chúa Giêsu trong đền thánh. Ta hãy xin cho được vâng lời chịu lụy. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '5. Thứ năm thì ngắm: Đức Bà tìm được Đức Chúa Giêsu trong đền thánh. Ta hãy xin cho được giữ nghĩa cùng Chúa luôn. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).'
    ]
  },
  {
    id: 'mancoi-nam-su-sang',
    tabId: 'rosary',
    title: 'Năm Sự Sáng (Thứ Năm)',
    latinTitle: 'Mysteria Luminosa',
    timing: 'Đọc vào Thứ Năm hàng tuần (Thánh Gioan Phaolô II thiết lập)',
    intention: 'Chiêm ngắm cuộc đời công khai và ánh sáng mạc khải của Chúa Giêsu.',
    tags: ['Mân Côi', 'Năm Sự Sáng', 'Thứ Năm'],
    content: [
      '1. Thứ nhất thì ngắm: Đức Chúa Giêsu chịu phép rửa tại sông Giođan. Ta hãy xin cho được sống xứng đáng là con cái Chúa. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '2. Thứ hai thì ngắm: Đức Chúa Giêsu dự tiệc cưới Cana và làm phép lạ đầu tiên. Ta hãy xin cho được noi gương Đức Mẹ mà lắng nghe Lời Chúa. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '3. Thứ ba thì ngắm: Đức Chúa Giêsu rao giảng Nước Trời và kêu gọi sám hối. Ta hãy xin cho được hoán cải tâm hồn và tin vào Tin Mừng. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '4. Thứ bốn thì ngắm: Đức Chúa Giêsu biến hình trên núi Tabo. Ta hãy xin cho được biến đổi nhờ ân sủng Chúa. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '5. Thứ năm thì ngắm: Đức Chúa Giêsu lập Bí tích Thánh Thể. Ta hãy xin cho được sốt sắng kết hợp cùng Chúa Giêsu Thánh Thể. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).'
    ]
  },
  {
    id: 'mancoi-nam-su-thuong',
    tabId: 'rosary',
    title: 'Năm Sự Thương (Thứ Ba & Thứ Sáu)',
    latinTitle: 'Mysteria Dolorosa',
    timing: 'Đọc vào Thứ Ba và Thứ Sáu hàng tuần',
    intention: 'Hiệp thông cùng nỗi thống khổ cứu chuộc của Chúa Giêsu trong Cuộc Khổ Nạn.',
    tags: ['Mân Côi', 'Năm Sự Thương', 'Thứ Ba', 'Thứ Sáu'],
    content: [
      '1. Thứ nhất thì ngắm: Đức Chúa Giêsu lo buồn đổ mồ hôi máu nơi vườn Cây Dầu. Ta hãy xin cho được ăn năn tội nên. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '2. Thứ hai thì ngắm: Đức Chúa Giêsu chịu đánh đòn nơi cột đá. Ta hãy xin cho được hãm mình chịu khó. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '3. Thứ ba thì ngắm: Đức Chúa Giêsu chịu đội mão gai. Ta hãy xin cho được chịu mọi sỉ nhục vì Chúa. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '4. Thứ bốn thì ngắm: Đức Chúa Giêsu vác cây Thánh giá lên núi Sọ. Ta hãy xin cho được vác Thánh giá theo chân Chúa. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '5. Thứ năm thì ngắm: Đức Chúa Giêsu chịu chết trên cây Thánh giá. Ta hãy xin cho được đóng đinh tính xác thịt vào Thánh giá Chúa. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).'
    ]
  },
  {
    id: 'mancoi-nam-su-mung',
    tabId: 'rosary',
    title: 'Năm Sự Mừng (Thứ Tư & Chúa Nhật)',
    latinTitle: 'Mysteria Gloriosa',
    timing: 'Đọc vào Thứ Tư và Ngày Chúa Nhật hàng tuần',
    intention: 'Hoan hỷ trong vinh quang Phục Sinh của Chúa Cứu Thế và ơn thưởng Đức Mẹ.',
    tags: ['Mân Côi', 'Năm Sự Mừng', 'Thứ Tư', 'Chúa Nhật'],
    content: [
      '1. Thứ nhất thì ngắm: Đức Chúa Giêsu sống lại từ cõi chết. Ta hãy xin cho được sống lại thật về phần linh hồn. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '2. Thứ hai thì ngắm: Đức Chúa Giêsu lên trời vinh hiển. Ta hãy xin cho được ái mộ những sự trên trời. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '3. Thứ ba thì ngắm: Đức Chúa Thánh Thần hiện xuống trên các Tông Đồ. Ta hãy xin cho được đầy dẫy ơn Chúa Thánh Thần. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '4. Thứ bốn thì ngắm: Đức Mẹ lên trời cả hồn lẫn xác. Ta hãy xin cho được ơn chết lành trong tay Mẹ. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).',
      '5. Thứ năm thì ngắm: Đức Mẹ được thưởng trên trời làm Nữ Vương trời đất. Ta hãy xin cho được hưởng phúc cùng Mẹ trên cõi vĩnh hằng. (Đọc 1 Kinh Lạy Cha, 10 Kinh Kính Mừng, 1 Kinh Sáng Danh, Lời nguyện Fatima).'
    ]
  },
  {
    id: 'mancoi-loi-nguyen-fatima',
    tabId: 'rosary',
    title: 'Lời Nguyện Fatima (Sau mỗi chục Mân Côi)',
    latinTitle: 'Oratio Fatimae',
    timing: 'Đọc sau Kinh Sáng Danh ở mỗi mầu nhiệm',
    intention: 'Cầu xin ơn tha tội và cứu vớt các linh hồn nơi luyện ngục.',
    tags: ['Mân Côi', 'Fatima', 'Cứu Rỗi'],
    content: [
      'Lạy Chúa Giêsu, xin tha tội cho chúng con, xin cứu chúng con khỏi sa hỏa ngục, xin đem các linh hồn lên thiên đàng, nhất là những linh hồn cần đến lòng Chúa thương xót hơn. Amen.'
    ]
  },

  // =========================================================================
  // TAB 5: KINH THƯỜNG DÙNG
  // =========================================================================
  {
    id: 'thuongdung-kinh-lay-cha',
    tabId: 'common',
    title: 'Kinh Lạy Cha',
    latinTitle: 'Pater Noster',
    timing: 'Kinh nguyện căn bản Chúa Giêsu đã truyền dạy',
    intention: 'Quy hướng lòng trí về Cha Trên Trời và phó thác đời sống.',
    tags: ['Thường Dùng', 'Kinh Lạy Cha', 'Chúa Dạy'],
    content: [
      'Lạy Cha chúng con ở trên trời, chúng con nguyện danh Cha cả sáng, Nước Cha trị đến, Ý Cha thể hiện dưới đất cũng như trên trời.',
      'Xin Cha cho chúng con hôm nay lương thực hằng ngày, và tha nợ chúng con như chúng con cũng tha kẻ có nợ chúng con.',
      'Xin chớ để chúng con sa chước cám dỗ, nhưng cứu chúng con cho khỏi sự dữ. Amen.'
    ]
  },
  {
    id: 'thuongdung-kinh-kinh-mung',
    tabId: 'common',
    title: 'Kinh Kính Mừng',
    latinTitle: 'Ave Maria',
    timing: 'Lời chào sứ thần và Giáo Hội tôn vinh Mẹ Thiên Chúa',
    intention: 'Kêu xin Đức Mẹ Maria bầu cử chở che khi này và trong giờ lâm tử.',
    tags: ['Thường Dùng', 'Kinh Kính Mừng', 'Đức Mẹ'],
    content: [
      'Kính mừng Maria đầy ơn phúc, Đức Chúa Trời ở cùng Bà, Bà có phúc lạ hơn mọi người nữ, và Giêsu con lòng Bà gồm phúc lạ.',
      'Thánh Maria Đức Mẹ Chúa Trời, cầu cho chúng con là kẻ có tội, khi này và trong giờ lâm tử. Amen.'
    ]
  },
  {
    id: 'thuongdung-kinh-sang-danh',
    tabId: 'common',
    title: 'Kinh Sáng Danh',
    latinTitle: 'Gloria Patri',
    timing: 'Lời tung hô Ba Ngôi chí thánh',
    intention: 'Tạ ơn và tôn vinh vĩnh hằng.',
    tags: ['Thường Dùng', 'Kinh Sáng Danh', 'Tôn Vinh'],
    content: [
      'Sáng danh Đức Chúa Cha và Đức Chúa Con và Đức Chúa Thánh Thần.',
      'Như đã có trước vô cùng và bây giờ và hằng có và đời đời chẳng cùng. Amen.'
    ]
  },
  {
    id: 'thuongdung-kinh-hay-nho',
    tabId: 'common',
    title: 'Kinh Hãy Nhớ',
    latinTitle: 'Memorare (Thánh Bênađô)',
    timing: 'Khi gặp gian nan, thử thách hoặc cần Mẹ nâng đỡ',
    intention: 'Xác tín rằng chưa từng có ai chạy đến cùng Mẹ mà bị từ chối.',
    tags: ['Thường Dùng', 'Kinh Hãy Nhớ', 'Thánh Bênađô'],
    content: [
      'Lạy Thánh Nữ Đồng Trinh Maria là Mẹ rất nhân từ, xin hãy nhớ xưa nay chưa từng nghe có người nào chạy đến cùng Đức Mẹ, xin bầu chữa cứu giúp, mà Đức Mẹ từ bỏ chẳng nhậm lời.',
      'Nhân vì sự ấy, con lấy lòng trông cậy than thở chạy đến sấp mình dưới chân Đức Mẹ, là Nữ Vương các Thánh Đồng Trinh, xin Mẹ đoái đến con là kẻ tội lỗi.',
      'Lạy Mẹ là Mẹ Ngôi Lời, xin chớ bỏ lời con kêu xin, một dủ lòng thương và nhậm lời con cùng. Amen.'
    ]
  },
  {
    id: 'thuongdung-kinh-lay-nu-vuong',
    tabId: 'common',
    title: 'Kinh Lạy Nữ Vương',
    latinTitle: 'Salve Regina',
    timing: 'Kết thúc tràng chuỗi Mân Côi hoặc kinh tối',
    intention: 'Tôn vinh Mẹ Nữ Vương nhân lành và xin Mẹ đoái thương chốn khách đày.',
    tags: ['Thường Dùng', 'Salve Regina', 'Nữ Vương'],
    content: [
      'Lạy Nữ Vương, Mẹ nhân lành, làm cho chúng con được sống, được vui, được cậy, thân lạy Mẹ!',
      'Chúng con, con cháu E-và ở chốn khách đày kêu đến cùng Mẹ, chúng con ở nơi khóc lóc than thở kêu khẩn Mẹ thương.',
      'Hỡi ôi! Bà là Chúa bầu chúng con, xin ghé mắt thương xem chúng con.',
      'Đến sau khỏi đày, xin cho chúng con được thấy Đức Chúa Giêsu con lòng Bà gồm phúc lạ.',
      'Ôi khoan thay, nhân thay, dịu thay, Thánh Maria trọn đời đồng trinh. Amen.'
    ]
  },
  {
    id: 'thuongdung-kinh-thien-than-ban-menh',
    tabId: 'common',
    title: 'Kinh Thiên Thần Bản Mệnh',
    latinTitle: 'Angele Dei',
    timing: 'Sáng sớm và đêm tối',
    intention: 'Xin Thiên Thần Bản Mệnh gìn giữ, soi sáng và bảo vệ bước đi.',
    tags: ['Thường Dùng', 'Thiên Thần', 'Bảo Vệ'],
    content: [
      'Lạy Thiên Thần Chúa, là Đấng bảo trợ con, bởi lòng nhân lành Chúa đã trao phó con cho Ngài,',
      'Xin soi sáng, gìn giữ, hướng dẫn và cai quản con hôm nay và suốt đời con. Amen.'
    ]
  },
  {
    id: 'thuongdung-lam-dau-an-com',
    tabId: 'common',
    title: 'Kinh Cám Ơn Trước & Sau Bữa Ăn',
    latinTitle: 'Benedictio Mensae',
    timing: 'Trước và sau mỗi bữa ăn của người Kitô hữu',
    intention: 'Tạ ơn Chúa vì của ăn nuôi sống và cầu chúc bình an cho người dọn bữa.',
    tags: ['Thường Dùng', 'Bữa Ăn', 'Tạ Ơn Của Ăn'],
    content: [
      'Trước bữa ăn: Lạy Chúa, xin chúc lành cho chúng con và cho của ăn này chúng con sắp lãnh nhận từ lòng nhân lành Chúa ban, nhờ Đức Kitô Chúa chúng con. Amen.',
      'Sau bữa ăn: Chúng con tạ ơn Chúa toàn năng vì muôn ơn lành Chúa đã thương ban cho chúng con, là Đấng hằng sống và hiển trị muôn đời. Xin cho các linh hồn đã qua đời được an nghỉ muôn đời. Amen.'
    ]
  }
];

export const TABS_CONFIG = [
  { id: 'morning', label: 'KINH SÁNG', icon: Sun, badge: 'Đầu Ngày', count: 5 },
  { id: 'evening', label: 'KINH TỐI', icon: Moon, badge: 'Cuối Ngày', count: 4 },
  { id: 'sunday', label: 'KINH CHÚA NHẬT', icon: Church, badge: 'Ngày Của Chúa', count: 4 },
  { id: 'rosary', label: 'LẦN HẠT MÂN CÔI', icon: Sparkles, badge: '4 Mầu Nhiệm', count: 5 },
  { id: 'common', label: 'KINH THƯỜNG DÙNG', icon: BookOpen, badge: 'Căn Bản', count: 7 },
];

export default function KinhNguyenPage() {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening' | 'sunday' | 'rosary' | 'common'>('morning');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Lọc bài kinh theo Tab và Search Query
  const filteredPrayers = useMemo(() => {
    let result = CATHOLIC_PRAYERS_DB.filter((p) => p.tabId === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = CATHOLIC_PRAYERS_DB.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.intention.toLowerCase().includes(q) ||
          p.content.some((c) => c.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  const handleCopyPrayer = (prayer: PrayerDetail) => {
    const textToCopy = `${prayer.title.toUpperCase()}\n${prayer.latinTitle ? `(${prayer.latinTitle})\n` : ''}\nÝ nguyện: ${prayer.intention}\n\n${prayer.content.join('\n\n')}\n\n(Trích: Kho Kinh Nguyện Công Giáo - Lời Chúa Mỗi Ngày)`;
    
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedId(prayer.id);
        setTimeout(() => setCopiedId(null), 2500);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#1A1412] text-[#403A34] dark:text-[#F7F4EE] transition-colors py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Thanh Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#8F877F] dark:text-[#A1887F]">
          <Link href="/" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] flex items-center gap-1 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Trang Chủ</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B39A70]" />
          <span className="font-bold text-[#762F3A] dark:text-[#E5BE53]">Kho Kinh Nguyện Công Giáo</span>
        </div>

        {/* Hero Header trang Kinh Nguyện */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#762F3A] via-[#5C232D] to-[#3B151C] text-white p-6 sm:p-10 shadow-2xl border-2 border-[#B39A70]/60 text-center">
          <SacredCornerOrnament position="top-left" className="absolute top-3 left-3 text-[#B39A70]/60 scale-125" />
          <SacredCornerOrnament position="top-right" className="absolute top-3 right-3 text-[#B39A70]/60 scale-125" />
          <SacredCornerOrnament position="bottom-left" className="absolute bottom-3 left-3 text-[#B39A70]/60 scale-125" />
          <SacredCornerOrnament position="bottom-right" className="absolute bottom-3 right-3 text-[#B39A70]/60 scale-125" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/40 border border-[#B39A70]/70 text-[#E5BE53] text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E5BE53]" />
              <span>GIA SẢN KINH NGUYỆN CÔNG GIÁO TOÀN DIỆN</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F7F4EE] leading-tight">
              KHO KINH NGUYỆN CÔNG GIÁO
            </h1>

            <div className="w-32 sm:w-44 h-0.5 bg-gradient-to-r from-transparent via-[#E5BE53] to-transparent mx-auto" />

            <p className="text-xs sm:text-sm md:text-base text-[#F7F4EE]/90 font-light leading-relaxed">
              Trọn bộ bản văn các lời kinh phụng vụ, kinh sớm tối, kinh thường dùng và 4 Mầu Nhiệm Mân Côi chuẩn tiếng Việt của Hội Thánh.
            </p>

            {/* Thanh tìm kiếm nhanh */}
            <div className="pt-2 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B39A70]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm kinh nguyện (vd: Dâng Ngày, Mân Côi, Tin Kính...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/50 border border-[#B39A70]/50 text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E5BE53] transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/70 hover:text-white"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            HỆ THỐNG 5 TAB CHÍNH
            ========================================================================= */}
        {!searchQuery && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {TABS_CONFIG.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-200 text-center ${
                    isActive
                      ? 'bg-[#762F3A] text-white border-[#B39A70] shadow-lg shadow-[#762F3A]/25 scale-[1.03]'
                      : 'bg-white dark:bg-[#241C18] text-[#403A34] dark:text-[#F7F4EE] border-[#E7E0D5] dark:border-[#3E302A] hover:border-[#B39A70]/60 hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div className={`p-2 rounded-xl mb-1.5 ${isActive ? 'bg-white/15 text-[#E5BE53]' : 'bg-[#F7F4EE] dark:bg-[#1E1714] text-[#762F3A] dark:text-[#E5BE53]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-xs sm:text-sm tracking-wide">
                    {tab.label}
                  </span>
                  <span className={`text-[10px] mt-0.5 ${isActive ? 'text-[#F7F4EE]/80' : 'text-[#8F877F] dark:text-[#A1887F]'}`}>
                    {tab.badge} ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Thanh công cụ phụ: Đổi cỡ chữ & Kết quả tìm kiếm */}
        <div className="flex items-center justify-between gap-3 text-xs text-[#8F877F] dark:text-[#A1887F] px-1">
          <div>
            {searchQuery ? (
              <span>Tìm thấy <strong>{filteredPrayers.length}</strong> bài kinh phù hợp</span>
            ) : (
              <span>Hiển thị <strong>{filteredPrayers.length}</strong> bài kinh trong chuyên mục</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold">Cỡ chữ:</span>
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="px-2.5 py-1 rounded-lg border border-[#B39A70]/40 text-[#762F3A] dark:text-[#E5BE53] font-bold bg-white dark:bg-[#241C18] hover:border-[#B39A70]"
            >
              {fontSize === 'normal' ? 'A+ (To)' : 'A- (Vừa)'}
            </button>
          </div>
        </div>

        {/* =========================================================================
            DANH SÁCH BÀI KINH THEO TAB HOẶC TÌM KIẾM
            ========================================================================= */}
        <div className="space-y-6">
          {filteredPrayers.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#241C18] rounded-3xl border border-[#E7E0D5] dark:border-[#3E302A] p-6 space-y-3">
              <BookOpen className="w-12 h-12 text-[#B39A70] mx-auto opacity-60" />
              <h3 className="font-serif text-lg font-bold text-[#762F3A] dark:text-[#E5BE53]">
                Không tìm thấy bài kinh phù hợp
              </h3>
              <p className="text-xs text-[#8F877F]">
                Hãy thử tìm kiếm với từ khóa khác như &quot;Dâng Ngày&quot;, &quot;Mân Côi&quot;, &quot;Tin Kính&quot; hoặc &quot;Lạy Cha&quot;.
              </p>
            </div>
          ) : (
            filteredPrayers.map((prayer) => (
              <article
                key={prayer.id}
                id={prayer.id}
                className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#221A16] border border-[#B39A70]/30 shadow-sacred p-5 sm:p-7 md:p-8 space-y-4 transition-all hover:border-[#B39A70]/60"
              >
                {/* Header bài kinh */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#B39A70]/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <SacredCrossIcon size={18} className="text-[#B39A70] shrink-0" />
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#762F3A] dark:text-[#E5BE53]">
                        {prayer.title}
                      </h2>
                    </div>

                    {prayer.latinTitle && (
                      <p className="text-xs italic text-[#8F877F] dark:text-[#A1887F] pl-6">
                        {prayer.latinTitle}
                      </p>
                    )}

                    {prayer.timing && (
                      <div className="flex items-center gap-1.5 text-xs text-[#736B63] dark:text-[#D7CCC8] pl-6 pt-0.5">
                        <Clock className="w-3.5 h-3.5 text-[#B39A70]" />
                        <span>{prayer.timing}</span>
                      </div>
                    )}
                  </div>

                  {/* Nút Sao Chép Kinh */}
                  <button
                    onClick={() => handleCopyPrayer(prayer)}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-[#B39A70]/60 bg-[#F7F4EE] dark:bg-[#2A201C] text-[#762F3A] dark:text-[#E5BE53] hover:bg-[#762F3A] hover:text-white shadow-xs"
                    title="Sao chép toàn văn bài kinh"
                  >
                    {copiedId === prayer.id ? (
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

                {/* Ý nguyện bài kinh */}
                <div className="p-3 rounded-xl bg-[#F7F4EE]/70 dark:bg-[#2A201C]/60 border border-[#B39A70]/20 text-xs">
                  <strong className="text-[#762F3A] dark:text-[#E5BE53]">Ý nguyện thiêng liêng: </strong>
                  <span className="text-[#5C534A] dark:text-[#D7CCC8]">{prayer.intention}</span>
                </div>

                {/* Toàn văn bài kinh */}
                <div className="space-y-3.5 py-1">
                  {prayer.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={`font-serif text-[#403A34] dark:text-[#F7F4EE] leading-relaxed tracking-wide text-justify ${
                        fontSize === 'large' ? 'text-base sm:text-lg sm:leading-loose' : 'text-sm sm:text-base'
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags phân loại */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                  {prayer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-[#F7F4EE] dark:bg-[#1A1412] text-[#8F877F] dark:text-[#A1887F] border border-[#E7E0D5] dark:border-[#3E302A]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>

        {/* Khối gợi ý thiêng liêng cuối trang */}
        <div className="text-center py-8 border-t border-[#B39A70]/30 space-y-3 text-xs text-[#8F877F] dark:text-[#A1887F]">
          <p className="font-serif italic text-sm text-[#762F3A] dark:text-[#E5BE53]">
            &ldquo;Hãy cầu nguyện không ngừng, hãy tạ ơn Thiên Chúa trong mọi hoàn cảnh.&rdquo; (1 Tx 5,17-18)
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold">
            <Link href="/phung-vu" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] underline">
              Xem Bài Đọc Phụng Vụ Hôm Nay
            </Link>
            <span>&bull;</span>
            <Link href="/giao-ly" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] underline">
              Học Hỏi Giáo Lý (GLHTCG)
            </Link>
            <span>&bull;</span>
            <Link href="/ca-nhan" className="hover:text-[#762F3A] dark:hover:text-[#E5BE53] underline">
              Nhật Ký Thiêng Liêng Cá Nhân
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
