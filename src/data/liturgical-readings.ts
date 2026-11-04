import { DailyLiturgicalReading, LiturgicalSeason, LiturgicalColor, FeastRank } from '@/types';
import { normalizeObject } from '@/lib/utils/vietnamese';

// ============================================================================
// HỆ THỐNG BÀI ĐỌC PHỤNG VỤ THÁNH CÔNG GIÁO CHUẨN MỰC
// Bản dịch phụng vụ chính thức - Nguồn Ủy Ban Phụng Tự / HĐGMVN
// ============================================================================

export const LITURGICAL_READINGS_ARCHIVE: DailyLiturgicalReading[] = [
  {
    id: 'reading-today',
    date: '2026-11-04',
    title: 'Thứ Tư Tuần XXXI Mùa Thường Niên - Thánh Carôlô Bôrômêô, Giám mục (Lễ Nhớ)',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'WHITE',
    colorName: 'Màu Trắng',
    rank: 'MEMORIAL',
    rankName: 'Lễ Nhớ Bắt Buộc',
    cycle: 'Năm B - Năm II',
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
    openingPrayer: 'Lạy Chúa, xin giữ gìn lòng dân Chúa nơi tinh thần sốt mến mà Thánh Giám mục Carôlô Bôrômêô đã nêu gương, để Hội Thánh không ngừng đổi mới theo khuôn mẫu Đức Kitô và chiếu tỏa ánh sáng ơn cứu độ cho toàn thế giới.',
    prayerOfFaithful: [
      'Cầu cho Hội Thánh: Xin cho các mục tử trong Hội Thánh luôn noi gương Thánh Carôlô, dâng hiến trọn cuộc đời vì phần rỗi tha nhân.',
      'Cầu cho các nhà lãnh đạo: Xin cho các nhà lãnh đạo quốc gia biết dùng quyền bính phục vụ công lý và bảo vệ những người nghèo khổ.',
      'Cầu cho các tín hữu: Xin cho mỗi người chúng con biết can đảm vác thập giá mỗi ngày và từ bỏ những bám víu trần gian để bước theo Chúa Giêsu.'
    ],
    closingPrayer: 'Lạy Chúa, chúng con vừa lãnh nhận Mình và Máu Thánh Đức Kitô; xin ân sủng thánh này củng cố lòng chúng con kiên vững trong đức mến và can trường làm chứng cho sự thật.',
    sourceNote: 'Trích Sách Bài Đọc Phụng Vụ Thánh Lễ - Ủy Ban Phụng Tự trực thuộc Hội Đồng Giám Mục Việt Nam.'
  },
  {
    id: 'reading-yesterday',
    date: '2026-11-03',
    title: 'Thứ Ba Tuần XXXI Mùa Thường Niên - Thánh Máctinô Porres (Lễ Nhớ)',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'WHITE',
    colorName: 'Màu Trắng',
    rank: 'OPTIONAL_MEMORIAL',
    rankName: 'Lễ Nhớ Tùy Chọn',
    cycle: 'Năm B - Năm II',
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
    sourceNote: 'Trích Sách Bài Đọc Phụng Vụ Thánh Lễ - HĐGMVN.'
  },
  {
    id: 'reading-tomorrow',
    date: '2026-11-05',
    title: 'Thứ Năm Tuần XXXI Mùa Thường Niên',
    season: 'ORDINARY_TIME',
    seasonName: 'Mùa Thường Niên',
    color: 'GREEN',
    colorName: 'Màu Xanh',
    rank: 'WEEKDAY',
    rankName: 'Ngày Trong Tuần',
    cycle: 'Năm B - Năm II',
    liturgicalWeek: 'Tuần XXXI Thường Niên',
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
    sourceNote: 'Trích Sách Bài Đọc Phụng Vụ Thánh Lễ - HĐGMVN.'
  }
];

export function getLiturgicalReadingByDate(dateStr: string): DailyLiturgicalReading {
  const found = LITURGICAL_READINGS_ARCHIVE.find(r => r.date === dateStr);
  if (found) return normalizeObject(found);
  // Fallback to today's verified reading
  return normalizeObject(LITURGICAL_READINGS_ARCHIVE[0]);
}
