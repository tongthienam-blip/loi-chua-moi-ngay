import { DailyLiturgicalReading, LiturgicalSeason, LiturgicalColor, FeastRank } from '@/types';
import { normalizeObject } from '@/lib/utils/vietnamese';

// ============================================================================
// HỆ THỐNG BÀI ĐỌC PHỤNG VỤ THÁNH CÔNG GIÁO CHUẨN MỰC
// Bản dịch phụng vụ chính thức - Nguồn Ủy Ban Phụng Tự / HĐGMVN
// Đối chiếu: Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma (Missale Romanum)
// ============================================================================

export const LITURGICAL_READINGS_ARCHIVE: DailyLiturgicalReading[] = [
  // --------------------------------------------------------------------------
  // CHÚA NHẬT: 2026-11-08 (Chúa Nhật XXXII Thường Niên - Năm A)
  // --------------------------------------------------------------------------
  {
    id: 'reading-2026-11-08',
    date: '2026-11-08',
    title: 'Chúa Nhật XXXII Thường Niên - Năm A',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'GREEN',
    colorName: 'Màu Xanh',
    rank: 'SOLEMNITY',
    rankName: 'Chúa Nhật',
    cycle: 'Năm A - Năm II',
    liturgicalWeek: 'Tuần XXXII Thường Niên',
    saintOfTheDay: 'Chúa Nhật XXXII Mùa Thường Niên (Năm A). Kính nhớ mầu nhiệm Nước Trời và lời mời gọi tỉnh thức sẵn sàng.',
    firstReading: {
      reference: 'Kn 6,12-16',
      passage: 'Trích sách Khôn Ngoan',
      theme: 'Ai tìm kiếm Đức Khôn Ngoan, thì sẽ gặp được.',
      text: `Đức Khôn Ngoan sáng chói và không bao giờ tàn tạ; những ai yêu mến Đức Khôn Ngoan thì dễ dàng chiêm ngưỡng, ai tìm kiếm thì sẽ gặp được.

Đức Khôn Ngoan đi bước trước đến với những ai khao khát mình. Ai dậy sớm để tìm Đức Khôn Ngoan thì chẳng phải nhọc nhằn, vì sẽ thấy Người ngồi ngay trước cửa nhà.

Nghĩ đến Đức Khôn Ngoan là sự hoàn hảo của trí thông minh; ai thức khuya vì Đức Khôn Ngoan thì sẽ sớm thoát khỏi mọi lo âu. Vì Đức Khôn Ngoan rảo quanh tìm kiếm những ai xứng đáng với mình, tươi cười hiện ra với họ trên mọi lối đường, và ân cần đón gặp họ trong mọi ý nghĩ tư tưởng.`
    },
    responsorialPsalm: {
      reference: 'Tv 62 (63),2.3-4.5-6.7-8 (Đ. c.2b)',
      refrain: 'Lạy Thiên Chúa, Ngài là Chúa con thờ, linh hồn con khao khát Chúa.',
      verses: [
        'Lạy Thiên Chúa, Ngài là Chúa con thờ, ngay từ rạng đông con tìm kiếm Chúa. Linh hồn con khao khát Ngài, thân xác con mòn mỏi đợi trông, như mảnh đất hoang cằn cỗi không giọt nước.',
        'Nên con đến ngắm nhìn nhan thánh trong nơi thánh điện, để chiêm ngưỡng uy quyền và vinh hiển của Ngài. Vì ân tình Ngài quý hơn sự sống, môi miệng con sẽ ca tụng tán dương.',
        'Trọn cả đời con, con sẽ chúc tụng Chúa; con giơ tay cầu khẩn Thánh Danh Ngài. Hồn con sẽ no thỏa như dự tiệc béo bổ, môi miệng con reo mừng hát ca ngợi khen.',
        'Con tưởng nhớ đến Ngài trên giường ngủ, suốt canh thâu suy niệm về Chúa. Quả thực Ngài đã thương phù trợ, dưới bóng cánh Ngài, con hân hoan reo vui.'
      ]
    },
    secondReading: {
      reference: '1 Th 4,13-18',
      passage: 'Thư thứ nhất của Thánh Phaolô Tông đồ gửi tín hữu Thêxalônica',
      theme: 'Nhờ Đức Giêsu, Thiên Chúa sẽ đưa những người đã an nghỉ đến cùng Người.',
      text: `Thưa anh em, chúng tôi không muốn anh em chẳng hay biết gì về số phận những người đã an nghỉ, để anh em khỏi buồn phiền như những người khác là những kẻ không có niềm hy vọng.

Quả thế, nếu chúng ta tin rằng Đức Giêsu đã chết và đã sống lại, thì Thiên Chúa cũng sẽ đưa những người đã an nghỉ trong Đức Giêsu đến với Người nhờ Đức Giêsu.

Dựa vào Lời của Chúa, chúng tôi nói với anh em điều này: chúng ta là những người đang sống, những người còn sót lại cho đến ngày Chúa quang lâm, chúng ta sẽ chẳng đi trước những người đã an nghỉ đâu. Vì khi có hiệu lệnh phát ra, khi tiếng tổng lãnh thiên thần vang lên và tiếng kèn của Thiên Chúa vang dội, thì chính Chúa sẽ từ trời ngự xuống, và những người đã chết trong Đức Kitô sẽ sống lại trước tiên.

Sau đó, chúng ta là những người đang sống, những người còn sót lại, sẽ cùng với họ được cất lên các đám mây để nghênh đón Chúa trên không trung. Như vậy, chúng ta sẽ ở cùng Chúa mãi mãi. Vậy anh em hãy dùng những lời ấy mà an ủi nâng đỡ lẫn nhau.`
    },
    gospelAcclamation: {
      verse: 'Mt 24,42a.44',
      text: 'Al-lê-lui-a. Al-lê-lui-a. Anh em hãy tỉnh thức và sẵn sàng, vì chính giờ phút anh em không ngờ, thì Con Người sẽ đến. Al-lê-lui-a.'
    },
    gospel: {
      reference: 'Mt 25,1-13',
      passage: 'Tin Mừng Đức Giêsu Kitô theo Thánh Mát-thêu',
      theme: 'Kìa Chàng Rể đến, hãy ra đón Người! Anh em hãy tỉnh thức vì không biết ngày nào giờ nào.',
      text: `Khi ấy, Đức Giêsu kể cho các môn đệ dụ ngôn này: "Nước Trời sẽ giống như chuyện mười trinh nữ cầm đèn ra đón chàng rể. Trong số đó, có năm cô khờ dại và năm cô khôn ngoan.

Năm cô khờ dại mang đèn mà không mang dầu theo. Còn những cô khôn ngoan thì vừa mang đèn lại vừa mang bình dầu theo.

Vì chàng rể đến chậm, nên tất cả các cô thiếp đi và ngủ say. Nửa đêm, có tiếng hô to: 'Kìa chú rể đến, hãy ra đón người!'. Bấy giờ tất cả các trinh nữ ấy đều thức dậy và sửa soạn đèn của mình.

Các cô khờ dại bảo các cô khôn ngoan: 'Xin các chị cho chúng tôi chút dầu của các chị, vì đèn của chúng tôi sắp tắt rồi!'. Các cô khôn ngoan đáp: 'E rằng không đủ cho cả chúng tôi lẫn các chị đâu, tốt hơn các chị hãy ra hàng bán dầu mà mua'.

Trong lúc các cô đi mua, thì chàng rể tới. Những cô đã sẵn sàng thì theo chàng rể vào dự tiệc cưới, và cửa đóng lại.

Sau cùng, các trinh nữ kia cũng đến và thưa: 'Thưa Ngài, thưa Ngài, xin mở cửa cho chúng tôi!'. Nhưng người đáp: 'Thầy bảo thật các cô, thầy không biết các cô là ai!'.

Vậy anh em hãy tỉnh thức, vì anh em không biết ngày nào, giờ nào".`
    },
    openingPrayer: 'Lạy Thiên Chúa toàn năng nhân hậu, xin xua đuổi mọi trở ngại trên đường chúng con đi, để một khi thanh thản cả hồn lẫn xác, chúng con nhiệt thành phụng sự thánh ý Chúa. Chúng con cầu xin nhờ Đức Giêsu Kitô, Con Chúa, Đấng hằng sống và hiển trị cùng Chúa, hiệp nhất với Chúa Thánh Thần đến muôn thuở muôn đời.',
    communionPrayer: 'Lạy Chúa, chúng con vừa được bồi dưỡng bằng Bánh Ban Sự Sống; xin ban ơn Thánh Thần ngự trị trong tâm hồn chúng con, để nhờ sức mạnh của bí tích này, chúng con luôn kiên vững tỉnh thức đón chờ ngày Chúa quang lâm. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.',
    prayerOfFaithful: [
      'Cầu cho Đức Thánh Cha và các Giám mục: Xin Chúa ban cho các ngài sự khôn ngoan thượng giới để dẫn dắt Dân Chúa luôn tỉnh thức trong niềm hy vọng Nước Trời.',
      'Cầu cho các tín hữu đã qua đời: Nhờ mầu nhiệm Đức Kitô phục sinh, xin Chúa thứ tha mọi lỗi lầm và đưa các linh hồn vào dự tiệc cưới muôn đời trên thiên quốc.',
      'Cầu cho những ai đang sống buông thả, quên lãng phần rỗi linh hồn: Xin ánh sáng Lời Chúa đánh thức tâm hồn họ, giúp họ chuẩn bị bình dầu đức tin và bác ái trước khi quá muộn.',
      'Cầu cho cộng đoàn giáo xứ chúng con: Xin cho ngọn đèn đức tin của mỗi người luôn rực sáng bằng những việc lành bác ái và đời sống cầu nguyện trung kiên.'
    ],
    closingPrayer: 'Lạy Chúa, chúng con tạ ơn Chúa vì Bàn Tiệc Lời Chúa và Thánh Thể Chúa Nhật hôm nay; xin chúc lành và gìn giữ gia đình chúng con trong bình an của Chúa suốt tuần lễ mới.',
    sourceNote: 'Trích Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma - Nguồn Ủy Ban Phụng Tự / HĐGMVN.'
  },

  // --------------------------------------------------------------------------
  // THỨ BẢY: 2026-11-07 (Thứ Bảy Tuần XXXI Mùa Thường Niên - Năm II)
  // --------------------------------------------------------------------------
  {
    id: 'reading-2026-11-07',
    date: '2026-11-07',
    title: 'Thứ Bảy Tuần XXXI Mùa Thường Niên',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'GREEN',
    colorName: 'Màu Xanh',
    rank: 'WEEKDAY',
    rankName: 'Ngày Trong Tuần',
    cycle: 'Năm A - Năm II',
    liturgicalWeek: 'Tuần XXXI Thường Niên',
    saintOfTheDay: 'Thứ Bảy Tuần XXXI Thường Niên (Năm II). Thứ Bảy đầu tháng kính nhớ Trái Tim Vô Nhiễm Đức Mẹ.',
    firstReading: {
      reference: 'Pl 4,10-19',
      passage: 'Thư của Thánh Phaolô Tông đồ gửi tín hữu Philípphê',
      theme: 'Với Đấng ban sức mạnh cho tôi, tôi chịu được hết mọi sự.',
      text: `Anh em thân mến, tôi rất vui mừng trong Chúa vì thấy cuối cùng mối quan tâm của anh em đối với tôi lại nở hoa. Mối quan tâm đó, anh em vẫn có, nhưng chỉ thiếu dịp thuận tiện thôi. Không phải vì thiếu thốn mà tôi nói thế, bởi lẽ tôi đã học bằng lòng với số phận hiện tại. Tôi biết sống thiếu thốn và cũng biết sống dư dật. Trong mọi hoàn cảnh và mọi sự, tôi đã học biết bí quyết để được no cũng như phải đói, được dư dật cũng như phải thiếu thốn. Với Đấng ban sức mạnh cho tôi, tôi chịu được hết mọi sự.

Tuy nhiên, anh em đã chia sẻ nỗi gian truân của tôi, như thế là điều tốt lành. Người Philípphê anh em biết rõ: vào thời kỳ đầu rao giảng Tin Mừng, lúc tôi rời khỏi Makêđônia, không có một Hội Thánh nào mở sổ thanh toán chi thu với tôi, ngoại trừ một mình anh em; vì ngay khi tôi ở Thêxalônica, anh em đã hơn một lần gửi đồ tiếp trợ cho nhu cầu của tôi. Không phải là tôi tìm kiếm quà tặng, nhưng tôi tìm kiếm hoa trái dồi dào ghi vào sổ của anh em.

Hiện tôi có đầy đủ mọi sự và còn dư dật nữa. Tôi được tràn trề sau khi đã nhận từ tay anh Êpaphơrôđitô những gì anh em gửi đến, như một hương thơm ngào ngạt, một lễ tế được Chúa chấp nhận và đẹp lòng Người. Thiên Chúa của tôi sẽ thỏa mãn mọi nhu cầu của anh em cách vinh hiển và phong phú trong Đức Kitô Giêsu.`
    },
    responsorialPsalm: {
      reference: 'Tv 111 (112),1-2.5-6.8a và 9 (Đ. c.1a)',
      refrain: 'Phúc thay người kính sợ Chúa!',
      verses: [
        'Phúc thay người kính sợ Chúa, người thiết tha tuân giữ mệnh lệnh của Người. Miêu duệ họ sẽ hùng cường trên mặt đất, dòng dõi người chính trực sẽ được Chúa ban phúc lành.',
        'Phúc thay người biết xót thương và cho vay mượn, biết quản lý công việc mình theo lẽ công minh. Người chính trực sẽ muôn đời không lay chuyển, thiên hạ sẽ muôn đời ghi nhớ người công chính.',
        'Lòng người ấy vững vàng không khiếp sợ, luôn tin tưởng vào Chúa. Người phân phát và bố thí cho kẻ khó nghèo; đức công chính của người ấy sẽ tồn tại muôn đời; uy danh người ấy sẽ trổi vượt trong vinh quang.'
      ]
    },
    gospelAcclamation: {
      verse: '2 Cr 8,9',
      text: 'Al-lê-lui-a. Al-lê-lui-a. Đức Giêsu Kitô vốn giàu sang phú quý, nhưng đã tự ý trở nên nghèo khó vì anh em, để lấy cái nghèo của mình mà làm cho anh em trở nên giàu có. Al-lê-lui-a.'
    },
    gospel: {
      reference: 'Lc 16,9-15',
      passage: 'Tin Mừng Đức Giêsu Kitô theo Thánh Lu-ca',
      theme: 'Nếu anh em không trung tín trong việc sử dụng Tiền Của bất chính, thì ai sẽ giao phó của cải chân thật cho anh em?',
      text: `Khi ấy, Đức Giêsu nói với các môn đệ rằng: "Thầy bảo cho anh em biết: hãy dùng Tiền Của bất chính mà tạo lấy bạn bè, phòng khi tiền của ấy hết đi, thì họ sẽ đón rước anh em vào nơi ở vĩnh cửu.

Ai trung tín trong việc rất nhỏ, thì cũng trung tín trong việc lớn; ai bất lương trong việc rất nhỏ, thì cũng bất lương trong việc lớn. Vậy nếu anh em không trung tín trong việc sử dụng Tiền Của bất chính, thì ai sẽ giao phó của cải chân thật cho anh em? Và nếu anh em không trung tín trong việc sử dụng của cải của người khác, thì ai sẽ ban cho anh em của cải riêng của anh em?

Không gia nhân nào có thể làm tôi hai chủ: vì hoặc sẽ ghét chủ này mà yêu chủ kia, hoặc sẽ gắn bó với chủ này mà khinh dể chủ nọ. Anh em không thể vừa làm tôi Thiên Chúa lại vừa làm tôi Tiền Của được".

Những người Pharisêu vốn ham tiền của, họ nghe tất cả những điều ấy thì cười nhạo Người. Người bảo họ: "Các ông là những kẻ làm ra vẻ công chính trước mặt người đời, nhưng Thiên Chúa thấu suốt lòng các ông; bởi vì điều người đời coi là cao trọng, lại là điều ghê tởm trước mặt Thiên Chúa".`
    },
    openingPrayer: 'Lạy Thiên Chúa toàn năng hằng hữu, xin đoái nhìn đoàn con đang khẩn nguyện, và ban cho chúng con lòng trung tín phụng thờ Chúa giữa những thách đố của đời sống trần gian, để chúng con luôn biết dùng của cải tạm bợ mà mưu cầu phúc vinh vĩnh cửu. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.',
    communionPrayer: 'Lạy Chúa, chúng con vừa dự tiệc Thánh Thể nhiệm mầu; xin cho ơn thiêng của bí tích này biến đổi đời sống chúng con, để chúng con luôn sống công chính và bác ái trọn vẹn với tha nhân. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.',
    prayerOfFaithful: [
      'Cầu cho Hội Thánh: Xin cho các mục tử luôn can đảm làm chứng cho sự thật Tin Mừng, không màng danh lợi trần thế.',
      'Cầu cho các nhà lãnh đạo xã hội: Xin cho họ biết quản lý tài nguyên và công quỹ với tinh thần công chính và ưu tiên phục vụ người nghèo.',
      'Cầu cho những ai đang bị cám dỗ bởi lòng tham tiền của: Xin cho họ nhận ra giá trị vĩnh cửu của Nước Trời để kịp thời hoán cải.',
      'Cầu cho cộng đoàn chúng con: Xin cho mỗi người biết dùng ơn huệ Chúa ban để sinh ích cho linh hồn mình và anh chị em xung quanh.'
    ],
    closingPrayer: 'Lạy Chúa, chúng con tạ ơn Chúa đã nuôi dưỡng chúng con bằng Lời Hằng Sống; xin giúp chúng con đem Lời Chúa vào đời sống mỗi ngày.',
    sourceNote: 'Trích Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma - Nguồn Ủy Ban Phụng Tự / HĐGMVN.'
  },

  // --------------------------------------------------------------------------
  // HÔM NAY: 2026-11-05 (Thứ Năm Tuần XXXI Mùa Thường Niên)
  // --------------------------------------------------------------------------
  {
    id: 'reading-2026-11-05',
    date: '2026-11-05',
    title: 'Thứ Năm Tuần XXXI Mùa Thường Niên',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'GREEN',
    colorName: 'Màu Xanh',
    rank: 'WEEKDAY',
    rankName: 'Ngày Trong Tuần',
    cycle: 'Năm A - Năm II',
    liturgicalWeek: 'Tuần XXXI Thường Niên',
    saintOfTheDay: 'Thánh Phêrô Nguyễn Văn Lựu, Linh mục tử đạo (Kính nhớ theo Lịch Giáo Hội Việt Nam).',
    firstReading: {
      reference: 'Pl 3,3-8a',
      passage: 'Thư của Thánh Phaolô Tông đồ gửi tín hữu Philípphê',
      theme: 'Tôi coi mọi sự là thiệt thòi so với mối lợi tuyệt vời là được biết Đức Kitô Giêsu.',
      text: `Thưa anh em, chính chúng ta mới là những người thực sự chịu phép cắt bì, những người phụng thờ Thiên Chúa nhờ Thần Khí của Người, những người tự hào trong Đức Kitô Giêsu chứ không cậy dựa vào xác phàm. Dầu rằng về phần tôi, tôi có lý do để cậy dựa vào xác phàm. Nếu ai khác tưởng mình có thể cậy dựa vào xác thịt, thì tôi lại càng có lý do hơn: chịu phép cắt bì ngày thứ tám, thuộc dòng giống Israel, chi tộc Bêngiamin, là người Hípri con của người Hípri; về Lề Luật, tôi là người Pharisêu; về lòng nhiệt thành, tôi đã bắt bớ Hội Thánh; còn về sự công chính theo Lề Luật, tôi là người bất khả khiển trách.

Nhưng những gì xưa kia là mối lợi cho tôi, thì vì Đức Kitô, tôi đã coi là thiệt thòi. Hơn nữa, tôi coi tất cả mọi sự là thiệt thòi, so với mối lợi tuyệt vời là được biết Đức Kitô Giêsu, Chúa của tôi!`
    },
    responsorialPsalm: {
      reference: 'Tv 104 (105),2-3.4-5.6-7 (Đ. c.3b)',
      refrain: 'Hãy vui lên, hỡi những tâm hồn tìm kiếm Chúa!',
      verses: [
        'Hãy hát xướng chúc tụng Người, đàn ca tôn vinh Chúa! Hãy loan báo mọi kỳ công của Người! Hãy tự hào vì Thánh Danh Người!',
        'Hãy tìm kiếm Chúa và sức mạnh của Người, luôn luôn tìm kiếm tôn nhan Người! Hãy nhớ lại những kỳ công Người đã thực hiện, những dấu lạ và phán quyết của miệng Người!',
        'Hỡi dòng dõi Abraham, tôi tớ Người, hỡi con cái Giacóp, những kẻ Người tuyển chọn! Chính Người là Đức Chúa, Thiên Chúa chúng ta; các phán quyết của Người bao trùm toàn cõi đất.'
      ]
    },
    gospelAcclamation: {
      verse: 'Mt 11,28',
      text: 'Al-lê-lui-a. Al-lê-lui-a. Tất cả những ai đang vất vả mang gánh nặng nề, hãy đến cùng Tôi, Tôi sẽ cho nghỉ ngơi bồi dưỡng. Al-lê-lui-a.'
    },
    gospel: {
      reference: 'Lc 15,1-10',
      passage: 'Tin Mừng Đức Giêsu Kitô theo Thánh Lu-ca',
      theme: 'Trên trời sẽ vui mừng vì một người tội lỗi ăn năn sám hối hơn là vì chín mươi chín người công chính.',
      text: `Khi ấy, các người thu thuế và các tội nhân đều lui tới với Đức Giêsu để nghe Người giảng. Thấy vậy, những người Pharisêu và các kinh sư liền xầm xì phàn nàn: "Ông này đón tiếp quân tội lỗi và ăn uống với chúng!".

Đức Giêsu bèn kể cho họ dụ ngôn này: "Người nào trong các ông có một trăm con chiên mà bị mất một con, lại không để chín mươi chín con kia ngoài đồng vắng mà đi tìm con chiên lạc cho kỳ được? Khi tìm được rồi, người ấy mừng rỡ vác lên vai. Về đến nhà, ông mời bạn bè và hàng xóm lại và bảo: 'Xin chia vui với tôi, vì tôi đã tìm thấy con chiên bị lạc của tôi!'.

Tôi bảo cho các ông hay: Cũng thế, trên trời sẽ vui mừng vì một người tội lỗi ăn năn sám hối, hơn là vì chín mươi chín người công chính không cần phải sám hối.

Hoặc người phụ nữ nào có mười đồng quan mà đánh mất một đồng, lại không thắp đèn, quét nhà và tìm kiếm cẩn thận cho kỳ được? Khi tìm được rồi, bà mời bạn bè và hàng xóm lại và bảo: 'Xin chia vui với tôi, vì tôi đã tìm thấy đồng quan tôi đã đánh mất!'.

Cũng vậy, Tôi nói cho các ông biết: Giữa các thiên sứ của Thiên Chúa sẽ có niềm vui vì một người tội lỗi ăn năn sám hối."`
    },
    openingPrayer: 'Lạy Thiên Chúa toàn năng nhân hậu, xin xua đuổi mọi nguy hại khỏi chúng con, để hồn an xác mạnh, chúng con được tự do thanh thản thực thi thánh ý Chúa. Chúng con cầu xin nhờ Đức Giêsu Kitô, Con Chúa, là Thiên Chúa và là Chúa chúng con, Đấng hằng sống và hiển trị cùng Chúa, hiệp nhất với Chúa Thánh Thần đến muôn thuở muôn đời.',
    communionPrayer: 'Lạy Chúa, chúng con vừa dự tiệc Thánh Thể để tạ ơn Chúa; xin Chúa ban sức mạnh giúp chúng con luôn trung kiên phụng sự Chúa và dấn thân yêu thương tha nhân. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.',
    prayerOfFaithful: [
      'Cầu cho Hội Thánh: Xin Chúa soi sáng và ban ơn hiệp nhất cho cộng đoàn Dân Chúa khắp nơi trên thế giới.',
      'Cầu cho các mục tử: Xin cho các linh mục luôn có trái tim nhân hậu của Người Mục Tử Nhân Lành đi tìm kiếm chiên lạc.',
      'Cầu cho những người đang lầm đường lạc lối: Xin cho họ nhận biết tình thương tha thứ của Chúa để can đảm trở về.',
      'Cầu cho cộng đoàn chúng con: Xin cho mỗi người chúng con biết mở rộng vòng tay đón nhận và nâng đỡ anh chị em yếu đuối.'
    ],
    closingPrayer: 'Lạy Chúa, chúng con tạ ơn Chúa vì Bàn Tiệc Lời Chúa và Mình Thánh Chúa mà chúng con vừa cử hành; xin ban Thánh Thần nâng đỡ chúng con luôn trung tín bước theo Chúa.',
    sourceNote: 'Trích Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma - Ủy Ban Phụng Tự / HĐGMVN.'
  },

  // --------------------------------------------------------------------------
  // HÔM QUA: 2026-11-04 (Thánh Carôlô Bôrômêô, Giám mục)
  // --------------------------------------------------------------------------
  {
    id: 'reading-2026-11-04',
    date: '2026-11-04',
    title: 'Thứ Tư Tuần XXXI Mùa Thường Niên - Thánh Carôlô Bôrômêô, Giám mục (Lễ Nhớ)',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'WHITE',
    colorName: 'Màu Trắng',
    rank: 'MEMORIAL',
    rankName: 'Lễ Nhớ Bắt Buộc',
    cycle: 'Năm A - Năm II',
    liturgicalWeek: 'Tuần XXXI Thường Niên',
    saintOfTheDay: 'Thánh Carôlô Bôrômêô, Giám mục (1538 - 1584), nhà cải cách vĩ đại thời Công đồng Trentô.',
    firstReading: {
      reference: 'Pl 2,12-18',
      passage: 'Thư của Thánh Phaolô Tông đồ gửi tín hữu Philípphê',
      theme: 'Hãy gắng sức đạt cho được ơn cứu độ; Thiên Chúa chính là Đấng tác động nơi anh em.',
      text: `Anh em thân mến, như anh em đã luôn luôn vâng phục, không phải chỉ khi tôi có mặt, nhưng hơn thế nữa bây giờ khi tôi vắng mặt, anh em hãy biết run sợ mà gắng sức đạt cho được ơn cứu độ của mình. Vì chính Thiên Chúa là Đấng tác động nơi anh em cả ý muốn lẫn hành động theo sở thích tốt lành của Người.

Hãy làm mọi việc mà đừng kêu ca than vãn hay trù trừ phân vân, ngõ hầu anh em trở nên thanh liêm vẹn toàn, con cái bất khả khiển trách của Thiên Chúa giữa một thế hệ gian tà và sa đọa; giữa họ, anh em hãy chiếu sáng như những vì sao trên bầu trời thế giới, bằng cách nắm giữ vững vàng Lời ban sự sống, để tôi có thể tự hào trong ngày Đức Kitô, rằng tôi đã không chạy uổng công, cũng không lao nhọc vô ích.

Nhưng cho dẫu tôi phải đổ máu mình ra như của lễ tưới lên hy lễ và tế phẩm đức tin của anh em, tôi cũng vui mừng và cùng chia sẻ niềm vui ấy với toàn thể anh em. Anh em cũng vậy, hãy hân hoan và cùng chung vui với tôi.`
    },
    responsorialPsalm: {
      reference: 'Tv 26 (27),1.4.13-14 (Đ. c.1a)',
      refrain: 'Chúa là nguồn ánh sáng và ơn cứu độ của tôi.',
      verses: [
        'Chúa là nguồn ánh sáng và ơn cứu độ của tôi, tôi còn phải sợ ai? Chúa là thành lũy bảo vệ mạng sống tôi, tôi nào phải khiếp hãi?',
        'Có một điều tôi nài xin Đức Chúa, một điều tôi tìm kiếm mãi thôi: là được ngụ trong nhà Đức Chúa suốt mọi ngày đời tôi, để ngắm nhìn vẻ duyên dáng của Người và chiêm ngưỡng thánh điện.',
        'Tôi vững tin sẽ được nhìn ngắm lòng nhân hậu của Đức Chúa trong cõi đất dành cho kẻ sống! Hãy cậy trông vào Đức Chúa, hãy mạnh bạo lên, can đảm lên, và cậy trông vào Đức Chúa!'
      ]
    },
    gospelAcclamation: {
      verse: '1 Pr 4,14',
      text: 'Al-lê-lui-a. Al-lê-lui-a. Nếu anh em bị sỉ nhục vì danh Đức Kitô, anh em thật có phúc, vì Thần Khí vinh hiển của Thiên Chúa đang ngự trên anh em. Al-lê-lui-a.'
    },
    gospel: {
      reference: 'Lc 14,25-33',
      passage: 'Tin Mừng Đức Giêsu Kitô theo Thánh Lu-ca',
      theme: 'Ai không từ bỏ hết thảy của cải mình có, thì không thể làm môn đệ Thầy được.',
      text: `Khi ấy, có rất đông người cùng đi đường với Đức Giêsu. Người quay lại bảo họ:

"Ai đến với Tôi mà không dứt bỏ lòng yêu mến cha mẹ, vợ con, anh chị em, và cả mạng sống mình nữa, thì không thể làm môn đệ Tôi được. Ai không vác thập giá mình mà đi theo Tôi, thì không thể làm môn đệ Tôi được.

Quả thế, ai trong anh em muốn xây một cây tháp mà trước tiên lại không ngồi xuống tính toán phí tổn, xem mình có đủ tiền hoàn tất không? Kẻo khi đặt móng rồi mà không thể làm xong, thì mọi người thấy đều chế giễu: 'Người này đã khởi công xây dựng mà không có sức hoàn tất!'.

Hoặc có vua nào đi giao chiến với một vua khác mà trước tiên lại không ngồi bàn tính xem mình có thể đem mười ngàn quân nghênh chiến với đối phương mang hai mươi ngàn quân đánh mình không? Bằng không, khi người kia còn ở đàng xa, vua ấy đã sai sứ giả đến cầu hòa.

Cũng thế, ai trong anh em không từ bỏ tất cả của cải mình có, thì không thể làm môn đệ Tôi được."`
    },
    openingPrayer: 'Lạy Chúa, xin giữ gìn lòng dân Chúa nơi tinh thần sốt mến mà Thánh Giám mục Carôlô Bôrômêô đã nêu gương, để Hội Thánh không ngừng đổi mới theo khuôn mẫu Đức Kitô và chiếu tỏa ánh sáng ơn cứu độ cho toàn thế giới. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.',
    communionPrayer: 'Lạy Chúa, chúng con vừa lãnh nhận Mình và Máu Thánh Đức Kitô; xin ân sủng thánh này củng cố lòng chúng con kiên vững trong đức mến và can trường làm chứng cho sự thật.',
    sourceNote: 'Trích Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma - Ủy Ban Phụng Tự / HĐGMVN.'
  },

  // --------------------------------------------------------------------------
  // HÔM KIA: 2026-11-03 (Thánh Máctinô Porres, Tu sĩ)
  // --------------------------------------------------------------------------
  {
    id: 'reading-2026-11-03',
    date: '2026-11-03',
    title: 'Thứ Ba Tuần XXXI Mùa Thường Niên - Thánh Máctinô Porres (Lễ Nhớ)',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'WHITE',
    colorName: 'Màu Trắng',
    rank: 'OPTIONAL_MEMORIAL',
    rankName: 'Lễ Nhớ Tùy Chọn',
    cycle: 'Năm A - Năm II',
    liturgicalWeek: 'Tuần XXXI Thường Niên',
    saintOfTheDay: 'Thánh Máctinô Porres, Tu sĩ Dòng Đa Minh (1579 - 1639), gương sáng về lòng bác ái khiêm nhường đối với người nghèo và người bệnh tật.',
    firstReading: {
      reference: 'Pl 2,5-11',
      passage: 'Thư của Thánh Phaolô Tông đồ gửi tín hữu Philípphê',
      theme: 'Đức Kitô đã tự hạ mình, vì thế Thiên Chúa đã siêu tôn Người.',
      text: `Anh em hãy có cùng một tâm tình như chính Đức Kitô Giêsu đã có:
Đức Giêsu Kitô vốn dĩ là Thiên Chúa mà không nghĩ phải nhất quyết duy trì địa vị ngang hàng với Thiên Chúa, nhưng đã hoàn toàn trút bỏ vinh quang, mặc lấy thân nô lệ, trở nên giống phàm nhân, sống như một người trần thế.

Người lại còn hạ mình, vâng lời cho đến nỗi bằng lòng chịu chết, chết trên cây thập tự! Chính vì thế, Thiên Chúa đã siêu tôn Người và tặng ban danh hiệu trổi vượt trên muôn ngàn danh hiệu, để khi vừa nghe danh thánh Giêsu, cả trên trời, dưới đất và trong nơi âm phủ, muôn vật phải bái quỳ, và mọi miệng lưỡi phải tuyên xưng rằng: "Đức Giêsu Kitô là Chúa", để tôn vinh Thiên Chúa Cha.`
    },
    responsorialPsalm: {
      reference: 'Tv 21 (22),26b-27.28-30a.31-32 (Đ. c.26a)',
      refrain: 'Lạy Chúa, giữa lòng đại hội, con xin ngợi khen Ngài.',
      verses: [
        'Lời khấn nguyền, con xin giữ trọn trước mặt những người kính sợ Chúa. Kẻ nghèo hèn sẽ được ăn no nê; những ai tìm Chúa sẽ ca tụng Người.',
        'Mọi cùng cõi trần gian sẽ nhớ lại và quay về với Chúa; muôn gia tộc các dân tộc sẽ phủ phục trước nhan Ngài.',
        'Dòng dõi tương lai sẽ phụng sự Người; người ta sẽ truyền tụng về Chúa cho thế hệ mai sau, loan báo đức công chính của Người cho dân chưa sinh ra.'
      ]
    },
    gospelAcclamation: {
      verse: 'Mt 11,28',
      text: 'Al-lê-lui-a. Al-lê-lui-a. Tất cả những ai đang vất vả mang gánh nặng nề, hãy đến cùng Tôi, Tôi sẽ cho nghỉ ngơi bồi dưỡng. Al-lê-lui-a.'
    },
    gospel: {
      reference: 'Lc 14,15-24',
      passage: 'Tin Mừng Đức Giêsu Kitô theo Thánh Lu-ca',
      theme: 'Hãy đi ra các nẻo đường, bắt người ta vào cho đầy nhà của Ta.',
      text: `Khi ấy, một trong những thực khách nghe Đức Giêsu nói liền thưa với Người: "Phúc thay ai được dự tiệc trong Nước Thiên Chúa!".

Người đáp: "Một người kia dọn tiệc lớn và mời nhiều người. Đến giờ tiệc, ông sai đầy tớ đi nói với những kẻ đã được mời: 'Xin mời quý vị đến, mọi sự đã sẵn sàng rồi'. Nhưng tất cả đồng thanh cáo lỗi. Người thứ nhất nói: 'Tôi mới mua một thửa đất, cần phải đi xem; xin cho tôi cáo lỗi'. Người khác nói: 'Tôi mới tậu năm cặp bò, tôi đang đi thử chúng; xin cho tôi cáo lỗi'. Người khác nữa lại nói: 'Tôi mới lấy vợ, nên tôi không thể đến được'.

Người đầy tớ trở về kể lại cho chủ những điều ấy. Chủ nhà nổi giận bảo người đầy tớ: 'Mau ra các đường phố và ngõ hẻm trong thành, đưa những người nghèo khó, tàn tật, đui mù và què quặt vào đây'.

Người đầy tớ thưa: 'Thưa ông, lệnh ông đã được thi hành mà vẫn còn chỗ'. Chủ bảo: 'Hãy ra các đường lộ và bụi bờ rào, ép người ta vào cho đầy nhà của ta. Vì ta bảo cho các ngươi biết: Không ai trong những kẻ đã được mời trước kia sẽ được nếm dự tiệc của ta!'."`
    },
    openingPrayer: 'Lạy Chúa là Đấng đã đưa Thánh Máctinô lên đỉnh trọn lành qua con đường khiêm hạ, xin cho chúng con noi gương sáng của thánh nhân để mai sau được cùng người hưởng vinh phúc trên trời. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.',
    communionPrayer: 'Lạy Chúa, chúng con tạ ơn Chúa vì Bí tích Thánh Thể này; xin cho chúng con luôn nhiệt thành phụng sự tha nhân như Thánh Máctinô xưa.',
    sourceNote: 'Trích Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma - HĐGMVN.'
  },

  // --------------------------------------------------------------------------
  // ĐẠI LỄ RIÊNG VIỆT NAM: 2026-11-24 (CÁC THÁNH TỬ ĐẠO VIỆT NAM - LỄ TRỌNG)
  // --------------------------------------------------------------------------
  {
    id: 'reading-2026-11-24',
    date: '2026-11-24',
    title: 'Đại Lễ Các Thánh Tử Đạo Việt Nam (Anrê Dũng Lạc và các bạn) - Lễ Trọng',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'RED',
    colorName: 'Màu Đỏ',
    rank: 'SOLEMNITY',
    rankName: 'Đại Lễ Trọng (Lịch VN)',
    cycle: 'Năm A - Năm II',
    liturgicalWeek: 'Tuần XXXIV Thường Niên',
    saintOfTheDay: 'Kính 117 Thánh Tử Đạo Việt Nam (Anrê Dũng-Lạc và các bạn) - Bổn mạng Giáo Hội Việt Nam.',
    firstReading: {
      reference: '2Mcb 7,1.20-31',
      passage: 'Trích sách Macabê quyển thứ hai',
      theme: 'Vua vũ trụ sẽ cho chúng tôi sống lại trong cuộc sống vĩnh cửu.',
      text: `Trong những ngày ấy, có bảy anh em bị bắt cùng với người mẹ. Vua Antiochus bắt họ phải ăn thịt heo bị luật cấm. Nhưng người mẹ can đảm phi thường, khuyên nhủ từng đứa con dâng mạng sống vì luật pháp Chúa: "Mẹ không rõ các con đã thành hình trong lòng mẹ thế nào; không phải mẹ ban cho các con thần khí và sự sống... Nhưng chính Đấng Tạo Thành vũ trụ sẽ trả lại cho các con thần khí và sự sống trong lòng thương xót của Người, vì bây giờ các con coi thường bản thân vì lề luật của Người!".`
    },
    responsorialPsalm: {
      reference: 'Tv 125,1-2ab.2cd-3.4-5.6 (Đ. c.5)',
      refrain: 'Ai gieo trong lệ sầu, sẽ gặt trong vui sướng!',
      verses: [
        'Khi Chúa dẫn tù nhân Sion trở về, chúng tôi tưởng mình như trong giấc mơ. Bấy giờ miệng chúng tôi chan hòa nụ cười, lưỡi chúng tôi vang lời ca hát.',
        'Bấy giờ trong các dân tộc người ta nói: Chúa đã làm cho họ những điều kỳ diệu! Phải, Chúa đã làm cho chúng tôi những điều kỳ diệu, nên chúng tôi hân hoan vui mừng.',
        'Lạy Chúa, xin dẫn tù nhân chúng con trở về, như những dòng suối miền Nam! Ai gieo trong lệ sầu, sẽ gặt trong vui sướng.',
        'Họ ra đi, ra đi mà gieo hạt giống trong nước mắt; họ trở về, trở về trong hân hoan mang theo những bó lúa trĩu bông.'
      ]
    },
    secondReading: {
      reference: 'Rm 8,31b-39',
      passage: 'Thư của Thánh Phaolô Tông đồ gửi tín hữu Rôma',
      theme: 'Ai có thể tách chúng ta ra khỏi tình yêu của Đức Kitô?',
      text: `Thưa anh em, có Thiên Chúa bênh đỡ chúng ta, ai còn chống lại được chúng ta? Đấng đã không tiếc chính Con Một, nhưng đã trao nộp Người vì hết thảy chúng ta, lẽ nào Người lại chẳng rộng ban tất cả cho chúng ta cùng với Con của Người sao?

Ai sẽ tố cáo những người được Thiên Chúa tuyển chọn? Chẳng lẽ Thiên Chúa, Đấng làm cho nên công chính? Ai sẽ kết án họ? Chẳng lẽ Đức Giêsu Kitô, Đấng đã chết, hơn nữa đã sống lại và đang ngự bên hữu Thiên Chúa mà chuyển cầu cho chúng ta?

Ai có thể tách chúng ta ra khỏi tình yêu của Đức Kitô? Phải chăng là gian truân, khốn khổ, đói rách, hiểm nguy, bắt bớ hay gươm giáo?... Nhưng trong tất cả những điều ấy, chúng ta toàn thắng nhờ Đấng đã yêu mến chúng ta!`
    },
    gospelAcclamation: {
      verse: 'Lc 9,23',
      text: 'Al-lê-lui-a. Al-lê-lui-a. Ai muốn theo Tôi, phải từ bỏ chính mình, vác thập giá mình hằng ngày mà theo Tôi. Al-lê-lui-a.'
    },
    gospel: {
      reference: 'Lc 9,23-26',
      passage: 'Tin Mừng Đức Giêsu Kitô theo Thánh Lu-ca',
      theme: 'Ai liều mất mạng sống mình vì Thầy, thì sẽ cứu được mạng sống ấy.',
      text: `Khi ấy, Đức Giêsu nói với mọi người rằng: "Ai muốn theo Tôi, phải từ bỏ chính mình, vác thập giá mình hằng ngày mà theo. Quả vậy, ai muốn cứu mạng sống mình thì sẽ mất; còn ai liều mất mạng sống mình vì Tôi, thì sẽ cứu được mạng sống ấy. Vì được cả thế giới mà phải đánh mất chính mình hay phải thiệt thân, thì nào có ích gì?

Ai xấu hổ vì Tôi và những lời của Tôi, thì Con Người cũng sẽ xấu hổ vì kẻ ấy, khi Người ngự đến trong vinh quang của Người, của Chúa Cha và của các thánh thiên sứ."`
    },
    openingPrayer: 'Lạy Thiên Chúa là Cha và là nguồn gốc mọi quyền bính làm cha trên trời dưới đất, Chúa đã ban cho các Thánh Tử Đạo Việt Nam lòng can đảm trung thành với Thánh Giá Con Chúa cho đến chết. Nhờ lời các ngài chuyển cầu, xin cho chúng con luôn biết sống xứng đáng với ơn gọi Kitô hữu và loan báo Tin Mừng cứu độ cho mọi người. Chúng con cầu xin nhờ Đức Giêsu Kitô, Con Chúa, Chúa chúng con.',
    communionPrayer: 'Lạy Chúa, chúng con vừa được bồi dưỡng bằng Bánh Ban Sự Sống trong ngày lễ kính các Thánh Tử Đạo Việt Nam. Xin cho chúng con luôn kiên vững trong đức tin và chan chứa niềm hy vọng, để mai sau cùng các ngài hưởng vinh quang muôn đời. Chúng con cầu xin nhờ Đức Kitô, Chúa chúng con.',
    prayerOfFaithful: [
      'Cầu cho Hội Thánh tại Việt Nam: Xin Chúa ban cho các mục tử và giáo dân lòng can đảm trung kiên giữ vững hạt giống đức tin mà cha ông đã lấy máu đào vun tưới.',
      'Cầu cho quê hương đất nước: Xin Chúa chúc lành cho dân tộc Việt Nam được thái bình thịnh vượng, công bằng và bác ái.',
      'Cầu cho giới trẻ: Xin cho người trẻ luôn tự hào về gia sản đức tin của các Thánh Tử Đạo, biết dấn thân sống thánh thiện và phục vụ giữa lòng xã hội hôm nay.'
    ],
    closingPrayer: 'Lạy Chúa, chúng con tạ ơn Chúa vì gương sáng đức tin của các Thánh Tử Đạo Việt Nam. Xin cho lời cầu bầu của các ngài luôn nâng đỡ gia đình và quê hương chúng con.',
    sourceNote: 'Trích Sách Bài Đọc Thánh Lễ & Sách Lễ Rôma - Lễ Riêng Giáo Hội Việt Nam (HĐGMVN).'
  }
];

import { getLiturgicalReadingForDate } from '@/lib/liturgy/reading-resolver';

export function getLiturgicalReadingByDate(dateStr: string): DailyLiturgicalReading {
  return getLiturgicalReadingForDate(dateStr);
}
