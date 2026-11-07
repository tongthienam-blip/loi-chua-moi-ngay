import { DailyReflectionItem } from '@/types';
import { normalizeObject } from '@/lib/utils/vietnamese';

// ============================================================================
// SUY NIỆM LỜI CHÚA HẰNG NGÀY - CHUẨN 8 PHẦN LINH ĐẠO CÔNG GIÁO
// 1. Lời Chúa - 2. Bối cảnh - 3. Giải thích - 4. Sứ điệp chính - 
// 5. Liên hệ đời sống - 6. Câu hỏi suy gẫm - 7. Quyết tâm thực hành - 8. Lời nguyện
// ============================================================================

export const DAILY_REFLECTIONS_DATABASE: DailyReflectionItem[] = [
  {
    id: 'refl-2026-11-08',
    date: '2026-11-08',
    title: 'Tỉnh Thức & Sẵn Sàng: Đèn Sáng Cùng Dầu Đức Tin Đón Chàng Rể',
    scriptureReference: 'Mt 25,1-13',
    scriptureText: 'Các cô khôn ngoan vừa mang đèn lại vừa mang bình dầu theo... Nửa đêm có tiếng hô to: Kìa chú rể đến, hãy ra đón người! Vậy anh em hãy tỉnh thức, vì anh em không biết ngày nào, giờ nào.',
    background: 'Dụ ngôn Mười Trinh Nữ nằm trong diễn từ cánh chung của Tin Mừng Mátthêu (chương 24-25). Đức Giêsu dùng bối cảnh phong tục đám cưới Do Thái xưa, khi các phù dâu cầm đèn chờ chú rể đến rước dâu vào lúc ban đêm, để dạy về sự tỉnh thức chuẩn bị cho cuộc phán xét và ngày Chúa quang lâm.',
    explanation: 'Ngọn đèn tượng trưng cho ơn gọi và đức tin ban đầu; bình dầu tượng trưng cho đời sống ân sủng, lòng mến cụ thể và các việc lành bác ái được tích lũy bền bỉ qua từng ngày sống. Dầu không thể "vay mượn" hay chia sẻ vào phút chót, bởi lẽ mỗi cá nhân phải đích thân chịu trách nhiệm trước Thiên Chúa về đức tin và việc làm của chính mình.',
    coreMessage: 'Tỉnh thức Kitô giáo không phải là thụ động chờ đợi trong sợ hãi, mà là tích cực sống từng phút giây hiện tại với lòng mến nồng nàn, luôn có đủ dầu đức ái và sự thánh thiện để sẵn sàng nghênh đón Chúa Kitô bất kỳ lúc nào.',
    lifeApplication: 'Chúng ta thường hay trì hoãn việc sám hối, chần chừ làm việc lành hoặc coi nhẹ đời sống nội tâm vì nghĩ "ngày mai vẫn còn kịp". Dụ ngôn cảnh báo: cửa tiệc cưới sẽ đóng lại và không ai biết trước giờ phút của cuộc đời mình. Ngay hôm nay, hãy đổ thêm dầu bác ái và cầu nguyện vào ngọn đèn tâm hồn.',
    reflectionQuestions: [
      'Ngọn đèn đức tin của tôi hiện đang cháy sáng rực rỡ hay chỉ còn le lói khói tàn?',
      'Bình dầu của tôi có chứa đầy những hoa trái yêu thương, tha thứ và phục vụ âm thầm không?',
      'Nếu Chúa gõ cửa cuộc đời tôi đêm nay, tôi sẽ vui mừng đón Người hay lo sợ hốt hoảng như năm trinh nữ khờ dại?'
    ],
    practicalResolution: 'Hôm nay, quyết tâm làm một việc hy sinh bác ái âm thầm giúp đỡ một người đang gặp khó khăn, và dành 10 phút tĩnh tâm xét mình chuẩn bị tâm hồn sốt sắng trước Chúa.',
    prayer: 'Lạy Chúa Giêsu là Chàng Rể chí thánh của Hội Thánh, xin ban cho con sự khôn ngoan thượng giới để con luôn biết gìn giữ ngọn đèn đức tin luôn rực sáng bằng tình yêu mến cụ thể. Xin đừng để con mê ngủ trong những đam mê trần thế, nhưng biết luôn tỉnh thức hân hoan đón chờ ngày Chúa đến. Amen.',
    category: 'Mùa Thường Niên - Cánh chung',
    author: 'Ủy Ban Phụng Tự & Mục Vụ Lời Chúa - HĐGMVN'
  },
  {
    id: 'refl-2026-11-07',
    date: '2026-11-07',
    title: 'Khôn Ngoan & Trung Tín Trong Sử Dụng Tiền Của',
    scriptureReference: 'Lc 16,9-15',
    scriptureText: 'Hãy dùng Tiền Của bất chính mà tạo lấy bạn bè, phòng khi tiền của ấy hết đi, thì họ sẽ đón rước anh em vào nơi ở vĩnh cửu. Ai trung tín trong việc rất nhỏ, thì cũng trung tín trong việc lớn.',
    background: 'Sau khi kể dụ ngôn người quản gia bất lương, Đức Giêsu rút ra bài học sâu sắc cho các môn đệ về cách nhìn nhận và quản lý của cải vật chất trần gian dưới ánh sáng của Nước Trời.',
    explanation: '"Tiền Của bất chính" (Mammon) ở đây chỉ của cải trần thế vốn mang tính phù vân, chóng qua và dễ dẫn con người đến sự quyến luyến bất chính. "Tạo lấy bạn bè" nghĩa là dùng của cải tạm bợ ấy để làm việc bác ái, chia sẻ cho người nghèo khó và túng thiếu - những người sẽ là bạn bè đón tiếp ta vào Nước Chúa.',
    coreMessage: 'Tiền bạc là đầy tớ tốt nhưng là ông chủ tồi tệ. Người môn đệ đích thực không để tiền của làm chủ con tim mình, nhưng coi mọi của cải như ơn Chúa ủy thác để phục vụ lợi ích thiêng liêng và tình huynh đệ.',
    lifeApplication: 'Trong cuộc sống mưu sinh hằng ngày, chúng ta dễ bị cuốn vào vòng xoáy tích lũy của cải mà quên đi sự công chính và lòng nhân hậu. Chúa dạy: trung tín từ việc nhỏ nhất (sự liêm chính nơi công sở, trả công xứng đáng, không gian dối) là thước đo cho lòng trung thành trước mặt Thiên Chúa.',
    reflectionQuestions: [
      'Tôi đang làm chủ tiền bạc hay tiền bạc đang chi phối suy nghĩ, quyết định và tự do của tôi?',
      'Tôi có sẵn lòng trích một phần thu nhập để nâng đỡ những anh chị em nghèo khổ xung quanh không?',
      'Tôi có luôn giữ đức tính trung thực, liêm khiết trong từng việc nhỏ hằng ngày nơi sở làm không?'
    ],
    practicalResolution: 'Thực hành sự trung tín trong một việc bổn phận nhỏ bé hôm nay, và chia sẻ một phần tài chánh cụ thể giúp đỡ người nghèo hoặc việc tông đồ của giáo xứ.',
    prayer: 'Lạy Chúa, mọi sự con có trên đời đều là hồng ân nhưng không do Chúa thương ban. Xin cho con một trái tim tự do thanh thoát, biết dùng của cải chóng qua ở đời này làm phương tiện làm rạng danh Chúa và mưu ích cho tha nhân, ngõ hầu mai sau được Chúa đón vào nơi ở vĩnh hằng. Amen.',
    category: 'Mùa Thường Niên - Đời sống môn đệ',
    author: 'Đan viện Biển Đức Thiên Phước'
  },
  {
    id: 'refl-today',
    date: '2026-11-04',
    title: 'Điều Kiện Để Trở Nên Môn Đệ Đức Kitô: Từ Bỏ & Vác Thập Giá',
    scriptureReference: 'Lc 14,25-33',
    scriptureText: 'Ai không vác thập giá mình mà đi theo Tôi, thì không thể làm môn đệ Tôi được... Ai trong anh em không từ bỏ tất cả của cải mình có, thì không thể làm môn đệ Tôi được.',
    
    // 1. Bối cảnh
    background: 'Đức Giêsu đang trên chặng đường quyết định tiến về Giêrusalem, nơi Ngài sẽ chịu thương khó và chịu chết trên thập giá. Đám đông hào hứng đi theo Ngài vì chứng kiến các phép lạ hoặc hy vọng về một vương quốc trần thế giải phóng khỏi ách đế quốc Rôma. Đức Giêsu quay lại, đối diện với họ và làm rõ những đòi hỏi cốt lõi, không ảo tưởng của bậc sống môn đệ.',
    
    // 2. Giải thích
    explanation: 'Cách diễn đạt "dứt bỏ / ghét" (tiếng Hípri mang nghĩa yêu ít hơn hoặc đặt ưu tiên thứ yếu) không có ý xúi giục căm ghét người thân, nhưng đòi hỏi tình yêu dành cho Đức Kitô phải là số một tuyệt đối, vượt trên mọi tương quan huyết thống hay tình cảm tự nhiên. Hai dụ ngôn xây tháp và vua đi đánh trận nhấn mạnh sự nghiêm túc, tỉnh táo và cân nhắc kỹ lưỡng: bước theo Chúa không phải là một phút bốc đồng cảm xúc, mà là một sự dấn thân trọn vẹn cả cuộc đời.',
    
    // 3. Sứ điệp chính
    coreMessage: 'Làm môn đệ Đức Kitô không phải là cuộc dạo chơi êm đềm hay phương tiện tìm kiếm danh vọng, nhưng là đón nhận Thập Giá mỗi ngày và sẵn sàng từ bỏ những bám víu quyến luyến trần gian để để Chúa làm chủ duy nhất tâm hồn mình.',
    
    // 4. Liên hệ đời sống
    lifeApplication: 'Trong cuộc sống hôm nay ngập tràn chủ nghĩa tiêu thụ và cá nhân hưởng thụ, người Kitô hữu thường dễ bị cám dỗ chọn một thứ "đạo Kitô không có thập giá". Chúng ta muốn ơn cứu độ nhưng ngại hy sinh; muốn yêu thương nhưng sợ thiệt thòi. Chúa mời gọi chúng ta can đảm đặt Ngài lên trên tiền tài, danh vọng và cái tôi ích kỷ.',
    
    // 5. Câu hỏi suy gẫm
    reflectionQuestions: [
      'Điều gì đang là "của cải", "vướng bận" hoặc "tương quan" cản trở tôi dấn thân theo Chúa cách triệt để nhất?',
      'Khi gặp gian nan, thử thách hoặc nghịch cảnh trong gia đình và công việc, tôi đón nhận như một phần của thập giá Chúa hay tôi chỉ biết oán trách, né tránh?',
      'Tôi có dám chọn sống theo giá trị Tin Mừng (trung thực, khiêm nhường, yêu thương kẻ thù) dẫu bị thế gian chê cười hoặc thiệt thòi?'
    ],
    
    // 6. Quyết tâm thực hành
    practicalResolution: 'Hôm nay, tôi quyết tâm từ bỏ một thói quen hưởng thụ hoặc một lời nói phàn nàn; thay vào đó, sẵn lòng làm một việc phục vụ âm thầm cho một người trong gia đình hoặc nơi sở làm mà không đòi hỏi đền đáp.',
    
    // 7. Lời nguyện
    prayer: 'Lạy Chúa Giêsu, Chúa đã yêu thương chúng con đến nỗi tự hiến mạng sống trên cây Thập Giá để cứu chuộc chúng con. Xin ban cho con một trái tim quảng đại, biết can đảm vác thập giá bổn phận hằng ngày mà không sờn lòng nản chí. Xin gỡ bỏ khỏi tâm hồn con những dính bén mù quáng nơi của cải trần thế, để con thanh thản bước đi sau chân Chúa, Đấng là đường, là sự thật và là sự sống đời đời của con. Amen.',
    
    category: 'Ơn gọi & Đời sống đức tin',
    author: 'Lm. Phaolô Nguyễn Văn Thanh - Chuyên san Phụng Vụ & Lời Chúa'
  },
  {
    id: 'refl-yesterday',
    date: '2026-11-03',
    title: 'Bữa Tiệc Nước Trời & Lời Mời Gọi Không Điều Kiện',
    scriptureReference: 'Lc 14,15-24',
    scriptureText: 'Chủ bảo: Hãy ra các đường lộ và bụi bờ rào, ép người ta vào cho đầy nhà của ta. Vì ta bảo cho các ngươi biết: Không ai trong những kẻ đã được mời trước kia sẽ được nếm dự tiệc của ta!',
    background: 'Đức Giêsu dự tiệc tại nhà một thủ lãnh Pharisêu vào ngày Sabát. Nhân câu nói của một thực khách về hạnh phúc được dự tiệc Nước Thiên Chúa, Người đã mạc khải qua dụ ngôn về thái độ từ khước ơn cứu độ của giới lãnh đạo tôn giáo Do Thái và ơn mở rộng Nước Trời cho muôn dân.',
    explanation: 'Các lý do từ chối bữa tiệc (mua đất, tậu bò, lấy vợ) tự thân đều là những sinh hoạt đời thường chính đáng, nhưng chúng trở thành tai hại chết người khi bị đặt cao hơn Lời Mời Gọi của Thiên Chúa. Những người nghèo khổ, tàn tật, đui mù là hình ảnh của những kẻ bị xã hội ruồng bỏ nhưng lại khiêm nhường đón nhận ân sủng cứu rỗi.',
    coreMessage: 'Nước Trời là bữa tiệc của ân sủng nhưng đòi hỏi sự đón nhận với lòng biết ơn và ưu tiên tuyệt đối. Đừng để những bận rộn sự đời làm ta bỏ lỡ lời mời của Chúa.',
    lifeApplication: 'Bao lần chúng ta viện cớ "bận rộn việc gia đình", "áp lực công việc", "thiếu thời gian" để lơ là việc tham dự Thánh Lễ Chúa Nhật, bỏ bê giờ kinh tối gia đình hoặc từ chối giúp đỡ người hoạn nạn? Bận rộn trần thế có thể trở thành cái bẫy ru ngủ linh hồn xa rời Chúa.',
    reflectionQuestions: [
      'Tôi đang coi trọng điều gì hơn cuộc hẹn hò thiêng liêng với Chúa qua Thánh Lễ và Lời Người?',
      'Tôi có thái độ khép kín hay mở lòng đón nhận những người nghèo khổ, yếu thế xung quanh mình?'
    ],
    practicalResolution: 'Dành ra đúng 15 phút thinh lặng buổi tối hôm nay, tắt điện thoại để tạ ơn Chúa và lắng nghe Lời Ngài chỉ dẫn cho cuộc sống.',
    prayer: 'Lạy Chúa, Bữa Tiệc Thánh Thể là hương thơm nếm trước hạnh phúc Nước Trời. Xin chữa lành sự chai đá và lạnh nhạt trong tâm hồn con, để con không bao giờ từ khước lời mời tha thiết của Ngài. Amen.',
    category: 'Bác ái & Tỉnh thức',
    author: 'Đan viện Biển Đức Thiên Phước'
  }
];

import { getReflectionForDate } from '@/lib/liturgy/reading-resolver';

export function getReflectionByDate(dateStr: string): DailyReflectionItem {
  return getReflectionForDate(dateStr);
}
