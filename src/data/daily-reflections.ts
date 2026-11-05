import { DailyReflectionItem } from '@/types';
import { normalizeObject } from '@/lib/utils/vietnamese';

// ============================================================================
// SUY NIỆM LỜI CHÚA HẰNG NGÀY - CHUẨN 8 PHẦN LINH ĐẠO CÔNG GIÁO
// 1. Lời Chúa - 2. Bối cảnh - 3. Giải thích - 4. Sứ điệp chính - 
// 5. Liên hệ đời sống - 6. Câu hỏi suy gẫm - 7. Quyết tâm thực hành - 8. Lời nguyện
// ============================================================================

export const DAILY_REFLECTIONS_DATABASE: DailyReflectionItem[] = [
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
