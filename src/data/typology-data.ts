import { TypologyConnection } from '@/types';

// ============================================================================
// HỆ THỐNG ĐỐI CHIẾU TIÊN TRƯNG CỰU ƯỚC - TÂN ƯỚC (BIBLICAL TYPOLOGY)
// "Tân Ước ẩn tàng trong Cựu Ước, Cựu Ước sáng tỏ trong Tân Ước" - Thánh Augustinô
// ============================================================================

export const TYPOLOGY_DATABASE: TypologyConnection[] = [
  {
    id: 'typo-adam-christ',
    title: 'Ađam Cũ và Đức Kitô - Ađam Mới',
    category: 'Nhân chủng học & Cứu chuộc học',
    otPassage: {
      reference: 'St 2,7; 3,1-19',
      title: 'Ađam đầu tiên sa ngã',
      text: 'Đức Chúa là Thiên Chúa lấy bụi đất nặn ra con người... Vì ngươi đã nghe lời vợ mà ăn trái cây Ta cấm, đất đai sẽ bị nguyền rủa vì ngươi.',
      symbolism: 'Ađam là thủ lãnh đầu tiên của nhân loại tạo dựng; vì bất tuân và kiêu ngạo, tội lỗi và sự chết đã xâm nhập vào trần gian.'
    },
    ntPassage: {
      reference: 'Rm 5,12-19; 1Cr 15,21-22.45',
      title: 'Đức Kitô - Ađam Mới vâng phục trọn hảo',
      text: 'Thật vậy, như vì một người bất tuân mà muôn người hóa thành tội nhân, thì cũng nhờ một người vâng phục mà muôn người được tác thành công chính.',
      fulfillment: 'Đức Kitô là Khởi Nguyên Mới của nhân loại tái sinh; qua sự vâng phục tuyệt đối trên cây Thập Giá, Người đã bẻ gãy quyền lực sự chết và phục hồi sự sống vĩnh cửu.'
    },
    similarities: [
      'Cả hai đều là thủ lãnh đại diện cho toàn thể nhân loại.',
      'Hành vi của họ tác động trực tiếp và biến đổi tình trạng muôn người.',
      'Cả hai đều đối diện với cơn cám dỗ và sự thử thách đức vâng phục.'
    ],
    contrasts: [
      'Ađam sa ngã trong vườn địa đàng sum suê; Đức Kitô chiến thắng trong hoang địa cằn cỗi và vườn Cây Dầu thống khổ.',
      'Ađam kiêu ngạo muốn "bằng Thiên Chúa"; Đức Kitô vốn là Thiên Chúa đã tự hạ "vâng phục cho đến chết trên thập tự".',
      'Ađam mang lại sự phán xét và án chết; Đức Kitô ban tặng ân sủng và sự sống lại muôn đời.'
    ],
    salvationHistorySignificance: 'Mầu nhiệm tái tạo (Recapitulatio): Đức Kitô thâu họp toàn thể lịch sử nhân loại vào chính Người để thánh hóa và cứu chuộc từ gốc rễ.',
    catholicTradition: 'Các Giáo phụ dạy: Eva sinh ra từ cạnh sườn Ađam đang ngủ; Hội Thánh và các Bí tích (Thánh Tẩy, Thánh Thể) sinh ra từ cạnh sườn Đức Kitô bị đâm thâu khi Người an giấc trên Thập Giá.',
    churchFatherQuote: {
      father: 'Thánh Irênê thành Lyon (Adversus Haereses III, 21, 10)',
      quote: 'Nút thắt của sự bất tuân nơi Eva đã được cởi mở bởi sự vâng phục của Đức Maria; và điều mà trinh nữ Eva đã cột lại bởi sự hoài nghi thì Trinh Nữ Maria đã tháo ra bởi đức tin.',
      source: 'Adversus Haereses (Chống Lạc Giáo)'
    }
  },
  {
    id: 'typo-passover-lamb',
    title: 'Chiên Vượt Qua và Đức Giêsu Kitô - Chiên Thiên Chúa',
    category: 'Phụng tự & Hy tế cứu độ',
    otPassage: {
      reference: 'Xh 12,1-14',
      title: 'Con chiên vẹn toàn trong đêm Vượt Qua',
      text: 'Con chiên phải vẹn toàn, giống đực, một tuổi... lấy máu nó bôi lên hai khung cửa... Khi thấy máu, Ta sẽ vượt qua, tai ương sẽ không giáng xuống tiêu diệt các ngươi.',
      symbolism: 'Chiên hiến tế cứu con đầu lòng Israel thoát khỏi lưỡi gươm thiên sứ hủy diệt và mở đường giải phóng khỏi ách nô lệ Ai Cập.'
    },
    ntPassage: {
      reference: 'Ga 1,29; 19,36; 1Cr 5,7; 1Pr 1,18-19',
      title: 'Đức Kitô - Chiên Thiên Chúa chịu hiến tế',
      text: 'Đây là Chiên Thiên Chúa, Đấng xóa bỏ tội trần gian... Chiên Vượt Qua của chúng ta là Đức Kitô đã chịu hiến tế.',
      fulfillment: 'Đức Giêsu chịu đóng đinh đúng vào giờ sát tế chiên vượt qua trong Đền Thờ; máu Người đổ ra cứu chuộc nhân loại khỏi ách nô lệ tội lỗi và hỏa ngục.'
    },
    similarities: [
      'Chiên phải tinh tuyền, không tì vết; Đức Kitô hoàn toàn thánh thiện vô tội.',
      'Không một cái xương nào của con chiên bị đánh gãy (Xh 12,46; Ga 19,36).',
      'Thịt chiên phải được ăn trong bữa tiệc; Mình Đức Kitô được trao ban trong Tiệc Thánh Thể.'
    ],
    contrasts: [
      'Máu chiên súc vật chỉ là dấu chỉ tạm thời; Máu Đức Kitô có giá trị cứu chuộc vô song vĩnh cửu.',
      'Chiên xưa chỉ giải cứu một dân tộc khỏi ách nô lệ trần thế; Chiên Thiên Chúa cứu toàn thể vũ trụ khỏi cái chết muôn đời.'
    ],
    salvationHistorySignificance: 'Chuyển biến từ Lễ Vượt Qua Cũ (Pesach) sang Lễ Vượt Qua Mới (Pascha Christianum) trong Bí tích Thánh Thể và Mầu nhiệm Phục Sinh.',
    catholicTradition: 'Trong mỗi Thánh Lễ Công giáo, linh mục nâng Mình Thánh và lặp lại lời tuyên xưng của Gioan Tẩy Giả: "Đây Chiên Thiên Chúa, Đấng xóa tội trần gian. Phúc cho ai được mời đến dự tiệc Chiên Thiên Chúa".',
    churchFatherQuote: {
      father: 'Thánh Gioan Kim Khẩu (Bài giảng Phục Sinh)',
      quote: 'Nếu máu của một con chiên vô tri còn có sức cứu thoát dân Chúa khỏi tai ương của thần chết Ai Cập, phương chi Máu Con Chiên Thiên Chúa Chí Thánh lại không thanh tẩy linh hồn chúng ta khỏi mọi vết nhơ tội lỗi sao?',
      source: 'Bài giảng thứ 46 về Tin Mừng Gioan'
    }
  },
  {
    id: 'typo-moses-jesus',
    title: 'Môsê và Đức Giêsu Kitô - Đấng Ban Luật & Trung Gian Mới',
    category: 'Mạc khải & Lãnh đạo cứu độ',
    otPassage: {
      reference: 'Đnl 18,15.18; Xh 24,8',
      title: 'Lời hứa về vị Ngôn sứ như Môsê',
      text: 'Đức Chúa sẽ cho xuất hiện một ngôn sứ như tôi xuất thân từ giữa anh em... Đây là máu giao ước Đức Chúa đã lập với anh em.',
      symbolism: 'Môsê là vị trung gian giao ước cũ, giải phóng dân, ăn chay 40 ngày trên núi và ban Lề Luật khắc trên bia đá.'
    },
    ntPassage: {
      reference: 'Mt 5-7; Dt 3,1-6; 9,15',
      title: 'Đức Giêsu - Đấng Trung Gian của Giao Ước Mới',
      text: 'Lề Luật đã được ban qua ông Môsê, còn ân sủng và sự thật thì đến nhờ Đức Giêsu Kitô. Môsê trung tín như người đầy tớ, còn Đức Kitô trung tín như người Con làm chủ ngôi nhà.',
      fulfillment: 'Đức Giêsu vượt qua Môsê vì Người chính là Thiên Chúa lập Giao Ước Mới, ghi khắc Luật Yêu Thương vào lòng dạ con người.'
    },
    similarities: [
      'Cả hai lúc sơ sinh đều thoát khỏi án tử giết các bé trai (Pharaô - Hêrôđê).',
      'Cả hai đều ăn chay 40 ngày đêm trước khi công bố sứ vụ.',
      'Cả hai đều thực hiện phép lạ hóa bánh nuôi dân trong hoang địa.'
    ],
    contrasts: [
      'Môsê không được vào Đất Hứa vì phút giây nghi ngờ; Đức Giêsu tự mình mở cửa Đất Hứa Thiên Đàng cho mọi kẻ tin.',
      'Môsê chỉ nhìn thấy phía sau lưng Thiên Chúa; Đức Giêsu từ ngực Chúa Cha mạc khải trọn vẹn Tôn Nhan Thiên Chúa.'
    ],
    salvationHistorySignificance: 'Hoàn tất lời sấm ngôn Đnl 18: Đức Giêsu là Ngôn sứ Tối hậu mà muôn dân phải lắng nghe trọn vẹn.',
    catholicTradition: 'Phụng vụ Công giáo chiêm ngưỡng Đức Giêsu trong biến cố Biến Hình (Mt 17): Môsê và Êlia hiện ra đàm đạo với Đức Giêsu, biểu trưng cho Lề Luật và các Ngôn Sứ phục vụ và làm chứng cho Chúa Kitô.'
  }
];
