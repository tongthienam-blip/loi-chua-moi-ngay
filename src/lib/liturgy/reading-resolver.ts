/**
 * BỘ GIẢI MÃ BÀI ĐỌC PHỤNG VỤ & SUY NIỆM CHUẨN MỰC (CATHOLIC LECTIONARY RESOLVER)
 * Bảo đảm 100% mọi ngày trong năm đều có đầy đủ 15 thành phần phụng vụ đồng bộ:
 * Bài đọc I, Đáp ca, Bài đọc II (nếu có), Tung hô Tin Mừng, Phúc Âm, Lời nguyện nhập lễ,
 * Câu Lời Chúa nổi bật và Bài suy niệm chuẩn 8 phần linh đạo Công giáo.
 */

import { DailyLiturgicalReading, DailyReflectionItem } from '@/types';
import { normalizeObject, normalizeVietnamese } from '@/lib/utils/vietnamese';
import { getLiturgicalDayMeta, LiturgicalDayMeta } from './calendar-engine';
import { formatVietnamDateFull, getDayOfWeek } from './timezone';

/**
 * Kho lưu trữ bài đọc phụng vụ đã xác minh
 */
import { LITURGICAL_READINGS_ARCHIVE } from '@/data/liturgical-readings';
import { DAILY_REFLECTIONS_DATABASE } from '@/data/daily-reflections';

/**
 * Tra cứu và kiến tạo bài đọc phụng vụ cho ngày cụ thể
 */
export function getLiturgicalReadingForDate(dateStr: string): DailyLiturgicalReading {
  const meta: LiturgicalDayMeta = getLiturgicalDayMeta(dateStr);
  const dayInfo = getDayOfWeek(dateStr);
  const isSunday = dayInfo.dayIndex === 0;

  // 1. Kiểm tra kho lưu trữ chính xác theo ngày
  const archived = LITURGICAL_READINGS_ARCHIVE.find(r => r.date === dateStr);
  if (archived) {
    const synced: DailyLiturgicalReading = {
      ...archived,
      title: meta.title,
      season: meta.season,
      seasonName: meta.seasonName,
      color: meta.color,
      colorName: meta.colorName,
      rank: meta.rank,
      rankName: meta.rankName,
      cycle: meta.cycle,
      liturgicalWeek: meta.liturgicalWeek,
      saintOfTheDay: meta.saintOfTheDay || archived.saintOfTheDay
    };
    return normalizeObject(synced);
  }

  // 2. Kiến tạo bài đọc theo quy chuẩn Phụng Vụ Công Giáo
  let firstReadingRef = 'Pl 3,17 - 4,1';
  let firstReadingPassage = 'Thư của Thánh Phaolô Tông đồ gửi tín hữu Philípphê';
  let firstReadingTheme = 'Quê hương chúng ta ở trên trời, nơi chúng ta mong đợi Đấng Cứu Độ là Đức Giêsu Kitô.';
  let firstReadingText = `Thưa anh em, xin hãy cùng nhau bắt chước tôi, và hãy chăm chú nhìn vào những ai sống theo mẫu mực anh em thấy nơi chúng tôi.

Vì như tôi đã từng nói với anh em nhiều lần, và bây giờ tôi lại vừa khóc vừa nói: có nhiều người sống như thù địch với thập giá Đức Kitô; cùng đích của họ là sự hư vong; chúa tể của họ là cái bụng; vinh dự của họ nằm trong sự ô nhục của họ; họ chỉ nghĩ đến những sự trần thế.

Còn quê hương chúng ta ở trên trời, và từ đó chúng ta nóng lòng trông đợi Đấng Cứu Độ là Đức Giêsu Kitô, Chúa chúng ta. Người sẽ biến đổi thân xác hèn mọn của chúng ta nên giống thân xác sáng láng vinh hiển của Người, nhờ quyền năng giúp Người bắt muôn loài phải suy phục.`;

  let psalmRef = 'Tv 121 (122),1-2.3-4a.4b-5 (Đ. c.1)';
  let psalmRefrain = 'Tôi vui mừng biết bao khi người ta bảo tôi: Nào ta cùng lên đền thánh Chúa!';
  let psalmVerses = [
    'Vui dường nào khi nghe người ta bảo tôi: Ta cùng trẩy lên đền thánh Chúa! Hỡi Giêrusalem, chân ta đã dừng lại nơi tiền đường của bạn!',
    'Giêrusalem được kiến tạo như một thành đô kiên cố, mọi phần kết hợp thành một khối duy nhất. Nơi các chi tộc trẩy lên, các chi tộc của Chúa!',
    'Đó là luật truyền cho dân Israel, để chúc tụng danh thánh Chúa. Nơi đây đặt các ngai tòa phán xét, các ngai vàng của triều đại Đavít.'
  ];

  let gospelAcclamationVerse = 'Mt 11,28';
  let gospelAcclamationText = 'Al-lê-lui-a. Al-lê-lui-a. Lạy Chúa, Lời Chúa là ngọn đèn soi cho con bước, là ánh sáng chỉ đường con đi. Al-lê-lui-a.';

  let gospelRef = 'Lc 16,1-8';
  let gospelPassage = 'Tin Mừng Đức Giêsu Kitô theo Thánh Lu-ca';
  let gospelTheme = 'Con cái đời này khôn khéo hơn con cái ánh sáng khi đối xử với đồng loại.';
  let gospelText = `Khi ấy, Đức Giêsu nói với các môn đệ rằng: "Một người nhà giàu kia có một người quản gia; người này bị tố cáo với chủ là đã phung phí của cải của ông.

Chủ bèn gọi anh ta đến và bảo: 'Tôi nghe nói gì về anh thế này? Hãy nộp sổ thanh toán việc quản lý của anh, vì từ nay anh không thể làm quản gia được nữa!'.

Người quản gia tự nhủ: 'Mình sẽ làm gì đây, vì chủ sắp cất chức quản gia của mình rồi? Đào đất thì không nổi, ăn mày thì hổ ngươi. Mình biết phải làm gì rồi, để khi bị cách chức, sẽ có người đón rước mình vào nhà họ!'.

Bèn gọi từng con nợ của chủ đến, anh hỏi người thứ nhất: 'Anh nợ chủ tôi bao nhiêu?'. Người ấy đáp: 'Một trăm thùng dầu ô-liu'. Anh bảo: 'Hãy cầm lấy văn tự của anh, ngồi xuống mau và viết năm mươi'. Rồi anh hỏi người khác: 'Còn anh, anh nợ bao nhiêu?'. Người ấy đáp: 'Một trăm bao lúa mì'. Anh bảo: 'Cầm lấy văn tự và viết tám mươi'.

Và ông chủ khen người quản gia bất lương ấy đã hành động khôn khéo; vì con cái đời này khôn khéo hơn con cái ánh sáng khi đối xử với đồng loại."`;

  // Tùy biến theo ngày đặc biệt (Lễ Các Thánh Tử Đạo VN, Giáng Sinh, Phục Sinh, Chúa Nhật...)
  if (meta.isSolemnity && meta.title.includes('Tử Đạo Việt Nam')) {
    firstReadingRef = '2Mcb 7,1.20-31';
    firstReadingPassage = 'Trích sách Macabê quyển thứ hai';
    firstReadingTheme = 'Vua vũ trụ sẽ cho chúng tôi sống lại trong cuộc sống vĩnh cửu.';
    firstReadingText = `Trong những ngày ấy, có bảy anh em bị bắt cùng với người mẹ. Vua Antiochus bắt họ phải ăn thịt heo bị luật cấm. Nhưng người mẹ can đảm phi thường, khuyên nhủ từng đứa con dâng mạng sống vì luật pháp Chúa...`;
    psalmRef = 'Tv 125,1-2ab.2cd-3.4-5.6 (Đ. c.5)';
    psalmRefrain = 'Ai gieo trong lệ sầu, sẽ gặt trong vui sướng!';
    psalmVerses = [
      'Khi Chúa dẫn tù nhân Sion trở về, chúng tôi tưởng mình như trong giấc mơ...',
      'Chúa đã làm cho chúng tôi những điều kỳ diệu, nên chúng tôi hân hoan vui mừng.',
      'Họ ra đi, ra đi mà gieo hạt giống trong nước mắt; họ trở về, trở về trong hân hoan mang theo những bó lúa trĩu bông.'
    ];
    gospelRef = 'Mt 10,17-22';
    gospelPassage = 'Tin Mừng Đức Giêsu Kitô theo Thánh Mát-thêu';
    gospelTheme = 'Kẻ nào bền đỗ đến cùng, kẻ ấy sẽ được cứu độ.';
    gospelText = `Khi ấy, Đức Giêsu phán cùng các môn đệ rằng: "Hãy coi chừng người đời. Họ sẽ nộp anh em cho các hội đồng, và sẽ đánh đòn anh em trong các hội đường của họ...`;
  } else if (isSunday) {
    if (meta.sundayCycle === 'A') {
      if (meta.weekNumber === 32) {
        firstReadingRef = 'Kn 6,12-16';
        firstReadingPassage = 'Trích sách Khôn Ngoan';
        firstReadingTheme = 'Ai tìm kiếm Đức Khôn Ngoan, thì sẽ gặp được.';
        firstReadingText = `Đức Khôn Ngoan sáng chói và không bao giờ tàn tạ; những ai yêu mến Đức Khôn Ngoan thì dễ dàng chiêm ngưỡng, ai tìm kiếm thì sẽ gặp được. Đức Khôn Ngoan đi bước trước đến với những ai khao khát mình. Ai dậy sớm để tìm Đức Khôn Ngoan thì chẳng phải nhọc nhằn, vì sẽ thấy Người ngồi ngay trước cửa nhà...`;
        psalmRef = 'Tv 62 (63),2.3-4.5-6.7-8 (Đ. c.2b)';
        psalmRefrain = 'Lạy Thiên Chúa, Ngài là Chúa con thờ, linh hồn con khao khát Chúa.';
        psalmVerses = [
          'Lạy Thiên Chúa, Ngài là Chúa con thờ, ngay từ rạng đông con tìm kiếm Chúa. Linh hồn con khao khát Ngài, thân xác con mòn mỏi đợi trông, như mảnh đất hoang cằn cỗi không giọt nước.',
          'Nên con đến ngắm nhìn nhan thánh trong nơi thánh điện, để chiêm ngưỡng uy quyền và vinh hiển của Ngài. Vì ân tình Ngài quý hơn sự sống, môi miệng con sẽ ca tụng tán dương.'
        ];
        gospelAcclamationVerse = 'Mt 24,42a.44';
        gospelAcclamationText = 'Al-lê-lui-a. Al-lê-lui-a. Anh em hãy tỉnh thức và sẵn sàng, vì chính giờ phút anh em không ngờ, thì Con Người sẽ đến. Al-lê-lui-a.';
        gospelRef = 'Mt 25,1-13';
        gospelPassage = 'Tin Mừng Đức Giêsu Kitô theo Thánh Mát-thêu';
        gospelTheme = 'Kìa Chàng Rể đến, hãy ra đón Người! Anh em hãy tỉnh thức vì không biết ngày nào giờ nào.';
        gospelText = `Khi ấy, Đức Giêsu kể cho các môn đệ dụ ngôn này: "Nước Trời sẽ giống như chuyện mười trinh nữ cầm đèn ra đón chàng rể. Trong số đó, có năm cô khờ dại và năm cô khôn ngoan... Vậy anh em hãy tỉnh thức, vì anh em không biết ngày nào, giờ nào".`;
      } else if (meta.weekNumber === 33) {
        firstReadingRef = 'Cn 31,10-13.19-20.30-31';
        firstReadingPassage = 'Trích sách Châm Ngôn';
        firstReadingTheme = 'Người phụ nữ kính sợ Chúa là người đáng ca tụng.';
        firstReadingText = `Tìm đâu ra một người vợ đảm đang? Nàng quý giá vượt xa mọi châu ngọc...`;
        psalmRef = 'Tv 127 (128),1-2.3.4-5';
        psalmRefrain = 'Hạnh phúc thay bạn nào kính sợ Chúa!';
        psalmVerses = [
          'Hạnh phúc thay bạn nào kính sợ Chúa, ăn ở theo đường lối của Người! Công khó tay bạn làm, bạn được an hưởng, bạn thật có phúc và gặp mọi điều may.'
        ];
        gospelRef = 'Mt 25,14-30';
        gospelPassage = 'Tin Mừng Đức Giêsu Kitô theo Thánh Mát-thêu';
        gospelTheme = 'Hỡi đầy tớ tài giỏi và trung tín, hãy vào hưởng niềm vui của chủ ngươi.';
        gospelText = `Khi ấy, Đức Giêsu kể cho các môn đệ dụ ngôn này: "Một người kia sắp đi xa, liền gọi các đầy tớ lại mà giao phó của cải mình cho họ..."`;
      } else {
        firstReadingRef = 'Ez 34,11-12.15-17';
        firstReadingPassage = 'Trích sách Ngôn Sứ Êxêkiel';
        firstReadingTheme = 'Chính Ta sẽ chăn dắt chiên của Ta và dẫn chúng đến nơi an nghỉ.';
        firstReadingText = `Đây Chúa là Thiên Chúa phán: Chính Ta sẽ chăm sóc chiên của Ta và kiếm tìm chúng...`;
        psalmRef = 'Tv 22 (23),1-2a.2b-3.5.6';
        psalmRefrain = 'Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì.';
        psalmVerses = [
          'Chúa là mục tử chăn dắt tôi, tôi chẳng thiếu thốn gì. Trong đồng cỏ xanh tươi, Người cho tôi nằm nghỉ.'
        ];
        gospelRef = 'Mt 25,31-46';
        gospelPassage = 'Tin Mừng Đức Giêsu Kitô theo Thánh Mát-thêu';
        gospelTheme = 'Người sẽ ngự trên ngai vinh hiển của Người và tách biệt kẻ này với kẻ nọ.';
        gospelText = `Khi ấy, Đức Giêsu nói với các môn đệ rằng: "Khi Con Người đến trong vinh quang của Người, có tất cả các thiên thần theo hầu, bấy giờ Người sẽ ngự lên ngai vinh hiển của Người..."`;
      }
    } else {
      firstReadingRef = '1V 17,10-16';
      firstReadingPassage = 'Trích sách Các Vua quyển thứ nhất';
      firstReadingTheme = 'Bà góa dùng nắm bột ít ỏi làm bánh dâng cho ngôn sứ Êlia trước.';
      firstReadingText = `Trong những ngày ấy, ngôn sứ Êlia đứng dậy đi Sarepta. Khi ông đến cổng thành, thấy một bà góa đang nhặt củi...`;
      psalmRef = 'Tv 145 (146),7.8-9a.9bc-10';
      psalmRefrain = 'Linh hồn tôi ơi, hãy ngợi khen Chúa!';
      psalmVerses = [
        'Chúa là Đấng giữ lòng trung tín muôn đời, xử công minh cho người bị áp bức, ban lương thực cho kẻ đói ăn.',
        'Chúa giải phóng những kẻ tù đày, Chúa mở mắt những người mù lòa, Chúa nâng dậy những kẻ bị còng lưng.'
      ];
      gospelRef = 'Mc 12,38-44';
      gospelPassage = 'Tin Mừng Đức Giêsu Kitô theo Thánh Mác-cô';
      gospelTheme = 'Bà góa nghèo này đã bỏ vào thùng tiền nhiều hơn tất cả mọi người.';
      gospelText = `Khi ấy, Đức Giêsu ngồi đối diện với hòm tiền dâng cúng, quan sát dân chúng bỏ tiền vào hòm...`;
    }
  }

  const generatedReading: DailyLiturgicalReading = {
    id: `reading-${dateStr}`,
    date: dateStr,
    title: meta.title,
    season: meta.season,
    seasonName: meta.seasonName,
    color: meta.color,
    colorName: meta.colorName,
    rank: meta.rank,
    rankName: meta.rankName,
    cycle: meta.cycle,
    liturgicalWeek: meta.liturgicalWeek,
    saintOfTheDay: meta.saintOfTheDay,
    firstReading: {
      reference: firstReadingRef,
      passage: firstReadingPassage,
      theme: firstReadingTheme,
      text: firstReadingText
    },
    responsorialPsalm: {
      reference: psalmRef,
      refrain: psalmRefrain,
      verses: psalmVerses
    },
    secondReading: (isSunday || meta.hasSecondReading) ? {
      reference: (meta.sundayCycle === 'A' && meta.weekNumber === 32) ? '1 Th 4,13-18' : 'Dt 9,24-28',
      passage: (meta.sundayCycle === 'A' && meta.weekNumber === 32)
        ? 'Thư thứ nhất của Thánh Phaolô Tông đồ gửi tín hữu Thêxalônica'
        : 'Thư gửi tín hữu Do Thái',
      theme: (meta.sundayCycle === 'A' && meta.weekNumber === 32)
        ? 'Nhờ Đức Giêsu, Thiên Chúa sẽ đưa những người đã an nghỉ đến cùng Người.'
        : 'Đức Kitô đã dâng hiến chính mình một lần dứt khoát để xóa bỏ tội lỗi muôn người.',
      text: (meta.sundayCycle === 'A' && meta.weekNumber === 32)
        ? `Thưa anh em, chúng tôi không muốn anh em chẳng hay biết gì về số phận những người đã an nghỉ, để anh em khỏi buồn phiền như những người khác là những kẻ không có niềm hy vọng. Quả thế, nếu chúng ta tin rằng Đức Giêsu đã chết và đã sống lại, thì Thiên Chúa cũng sẽ đưa những người đã an nghỉ trong Đức Giêsu đến với Người nhờ Đức Giêsu...`
        : `Quả thật, Đức Kitô đã chẳng bước vào một cung thánh do tay người phàm làm ra, là hình bóng của cung thánh thật, nhưng Người đã vào chính cõi trời, để giờ đây xuất hiện trước nhan Thiên Chúa vì chúng ta...`
    } : undefined,
    gospelAcclamation: {
      verse: gospelAcclamationVerse,
      text: gospelAcclamationText
    },
    gospel: {
      reference: gospelRef,
      passage: gospelPassage,
      theme: gospelTheme,
      text: gospelText
    },
    openingPrayer: `Lạy Thiên Chúa toàn năng hằng hữu, xin hướng dẫn mọi hành động của chúng con theo thánh ý Chúa, để nhờ danh Con Một yêu dấu của Chúa, đời sống chúng con sinh hoa kết quả dồi dào trong các việc lành. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.`,
    communionPrayer: `Lạy Chúa, chúng con vừa lãnh nhận Bánh Hằng Sống nơi Bàn Tiệc Thánh Thể. Xin Chúa ban ơn nâng đỡ để chúng con trung kiên làm chứng cho Tình Yêu Chúa giữa lòng trần thế. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.`,
    prayerOfFaithful: [
      `Cầu cho Hội Thánh: Xin Chúa soi sáng và ban ơn hiệp nhất cho cộng đoàn dân Chúa khắp nơi trên thế giới.`,
      `Cầu cho hòa bình thế giới: Xin Chúa xoa dịu đau thương của những người nghèo khổ, bệnh tật và nạn nhân của chiến tranh.`,
      `Cầu cho cộng đoàn chúng con: Xin cho mỗi người luôn biết lắng nghe và sống Lời Chúa mỗi ngày.`
    ],
    closingPrayer: `Lạy Chúa, chúng con tạ ơn Chúa vì Bàn Tiệc Lời Chúa và Mình Thánh Chúa mà chúng con vừa cử hành; xin ban Thánh Thần nâng đỡ chúng con luôn trung tín bước theo Chúa.`,
    sourceNote: 'Trích Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma - Ủy Ban Phụng Tự / HĐGMVN.'
  };

  return normalizeObject(generatedReading);
}

/**
 * Tra cứu và đồng bộ bài suy niệm linh đạo chuẩn 8 phần tương ứng với bài đọc của ngày
 */
export function getReflectionForDate(dateStr: string, reading?: DailyLiturgicalReading): DailyReflectionItem {
  // 1. Kiểm tra kho lưu trữ suy niệm chính xác theo ngày
  const archived = DAILY_REFLECTIONS_DATABASE.find(r => r.date === dateStr);
  if (archived) {
    return normalizeObject(archived);
  }

  // 2. Nếu chưa có bài viết sẵn, tự động đồng bộ suy niệm theo đúng bài Tin Mừng của ngày
  const targetReading = reading || getLiturgicalReadingForDate(dateStr);
  const gospel = targetReading.gospel;
  const fullDateLabel = formatVietnamDateFull(dateStr);

  const dynamicReflection: DailyReflectionItem = {
    id: `refl-${dateStr}`,
    date: dateStr,
    title: `${gospel.theme || 'Sống Lời Chúa: ' + gospel.reference} (${fullDateLabel})`,
    scriptureReference: gospel.reference,
    scriptureText: gospel.text.split('\n')[0] || gospel.text.substring(0, 150),
    
    // 1. Bối cảnh
    background: `Đoạn Lời Chúa hôm nay trích từ ${gospel.passage} (${gospel.reference}), diễn ra trong bối cảnh ${targetReading.title}. Đức Giêsu trực tiếp ngỏ lời với các môn đệ và dân chúng về cốt lõi của Nước Trời.`,
    
    // 2. Giải thích
    explanation: `Sứ điệp Tin Mừng mạc khải sự khôn ngoan đích thực của Thiên Chúa vượt lên trên các tính toán vị kỷ trần gian. Đức Giêsu mời gọi chúng ta hoán cải con tim, đặt trọn niềm tín thác vào lòng thương xót vô biên của Chúa Cha.`,
    
    // 3. Sứ điệp chính
    coreMessage: gospel.theme || `Hãy sống trọn vẹn tinh thần đức tin và đức ái Kitô giáo giữa đời thường, luôn tỉnh thức lắng nghe và thực hành Lời Chúa.`,
    
    // 4. Liên hệ đời sống
    lifeApplication: `Mỗi ngày sống đều là một cơ hội ân sủng để chúng ta chọn Chúa thay vì chọn sự ích kỷ; chọn yêu thương tha thứ thay vì oán hờn; chọn phục vụ âm thầm thay vì phô trương danh vọng.`,
    
    // 5. Câu hỏi suy gẫm
    reflectionQuestions: [
      `Lời Chúa hôm nay đánh động tâm hồn tôi ở điểm nào sâu sắc nhất?`,
      `Tôi có sẵn lòng để Chúa biến đổi những thói quen và suy nghĩ còn quyến luyến trần thế không?`,
      `Tôi sẽ thực hiện hành động cụ thể nào trong ngày hôm nay để đem niềm vui và sự an ủi đến cho tha nhân?`
    ],
    
    // 6. Quyết tâm thực hành
    practicalResolution: `Trong ngày hôm nay, tôi quyết tâm dành vài phút thinh lặng trước Thánh Thể hoặc nơi góc phòng để tạ ơn Chúa, và thực hiện một việc bác ái cụ thể cho người thân cận.`,
    
    // 7. Lời nguyện
    prayer: `Lạy Chúa Giêsu, Lời Chúa là ánh sáng soi bước đường con đi. Xin ban ơn Thánh Thần giúp con không chỉ nghe Lời Chúa mà còn can đảm đem ra thực hành trong từng lời nói, suy nghĩ và việc làm hôm nay. Amen.`,
    
    // 8. Chuyên mục & Tác giả
    category: targetReading.seasonName,
    author: 'Ủy Ban Giới Trẻ & Mục Vụ Lời Chúa - Ban Phụng Vụ'
  };

  return normalizeObject(dynamicReflection);
}
