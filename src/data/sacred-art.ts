import { normalizeVietnamese } from '@/lib/utils/vietnamese';

export interface SacredArtwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  location: string;
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
  biblicalTheme: string;
  liturgicalColors: ('WHITE' | 'RED' | 'PURPLE' | 'GREEN')[];
  catechismPillars: (1 | 2 | 3 | 4)[];
}

export const SACRED_ARTWORKS: SacredArtwork[] = [
  {
    id: 'creation-of-adam',
    title: 'Thiên Chúa Sáng Tạo Con Người (Adam)',
    artist: 'Michelangelo Buonarroti',
    year: '1511 - 1512',
    location: 'Nhà nguyện Sistina, Vatican',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400&auto=format&fit=crop',
    description: 'Thiên Chúa vươn ngón tay trao ban hơi thở sự sống cho con người, diễn tả phẩm giá tuyệt đỉnh của con người được tạo dựng theo hình ảnh Thiên Chúa (Imago Dei).',
    biblicalTheme: 'St 1,26-27; St 2,7',
    liturgicalColors: ['WHITE', 'GREEN'],
    catechismPillars: [1, 3]
  },
  {
    id: 'annunciation-fra-angelico',
    title: 'Sứ Thần Truyền Tin Cho Đức Mẹ',
    artist: 'Chân phước Fra Angelico',
    year: '1438 - 1445',
    location: 'Tu viện San Marco, Firenze, Ý',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop',
    description: 'Sứ thần Gabriel kính cẩn chào Mẹ Maria; sự vâng phục tuyệt hảo trong đức tin của Đức Trinh Nữ mở ra thời khắc Ngôi Lời Nhập Thể.',
    biblicalTheme: 'Lc 1,26-38; Ga 1,14',
    liturgicalColors: ['WHITE', 'PURPLE'],
    catechismPillars: [1, 4]
  },
  {
    id: 'the-last-supper',
    title: 'Bữa Tiệc Ly & Thiết Lập Bí Tích Thánh Thể',
    artist: 'Leonardo da Vinci',
    year: '1495 - 1498',
    location: 'Tu viện Santa Maria delle Grazie, Milano, Ý',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=400&auto=format&fit=crop',
    description: 'Chúa Giêsu cầm lấy bánh và rượu, thánh hiến thành Mình và Máu Người, thiết lập Hy tế Giao Ước Mới và trao ban Lệnh Truyền Yêu Thương.',
    biblicalTheme: 'Mt 26,26-28; 1Cr 11,23-26; Ga 13',
    liturgicalColors: ['WHITE', 'RED'],
    catechismPillars: [2, 3]
  },
  {
    id: 'the-crucifixion',
    title: 'Hy Tế Cứu Độ Trên Thập Giá Canvê',
    artist: 'Diego Velázquez',
    year: '1632',
    location: 'Bảo tàng Prado, Madrid, Tây Ban Nha',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-195fe57876a4?q=80&w=1200&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1548625361-195fe57876a4?q=80&w=400&auto=format&fit=crop',
    description: 'Đức Kitô chịu hiến tế vì tội lỗi nhân loại. Từ cạnh sườn bị đâm thâu của Người, máu và nước tuôn trào sinh ra các Bí tích của Hội Thánh.',
    biblicalTheme: 'Ga 19,30-34; Pl 2,8; Is 53,5',
    liturgicalColors: ['RED', 'PURPLE'],
    catechismPillars: [1, 2]
  },
  {
    id: 'the-resurrection',
    title: 'Đức Kitô Phục Sinh Vinh Hiển',
    artist: 'Piero della Francesca',
    year: '1463 - 1465',
    location: 'Bảo tàng Sansepolcro, Ý',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1200&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=400&auto=format&fit=crop',
    description: 'Chiến thắng khải hoàn trên tội lỗi và tử thần. Đức Kitô bước ra khỏi mộ đá trong ánh vinh quang rực rỡ, tay cầm cờ chiến thắng cứu rỗi.',
    biblicalTheme: 'Mt 28,1-10; 1Cr 15,20; Ga 20,1-18',
    liturgicalColors: ['WHITE'],
    catechismPillars: [1, 2]
  },
  {
    id: 'pentecost-descent',
    title: 'Chúa Thánh Thần Hiện Xuống Trên Các Tông Đồ',
    artist: 'El Greco',
    year: '1597 - 1600',
    location: 'Bảo tàng Prado, Madrid, Tây Ban Nha',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=400&auto=format&fit=crop',
    description: 'Ngọn lửa Thánh Thần ngự xuống trên Mẹ Maria và các Thánh Tông Đồ trong nhà Tiệc Ly, khai sinh Hội Thánh và sai đi loan báo Tin Mừng.',
    biblicalTheme: 'Cv 2,1-13; Ga 14,26',
    liturgicalColors: ['RED', 'WHITE'],
    catechismPillars: [1, 2]
  },
  {
    id: 'good-shepherd-ravenna',
    title: 'Đức Kitô - Mục Tử Nhân Lành',
    artist: 'Nghệ thuật Mosaic Byzantine',
    year: 'Thế kỷ V (khoảng năm 425)',
    location: 'Lăng Galla Placidia, Ravenna, Ý',
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=400&auto=format&fit=crop',
    description: 'Hình ảnh Mục Tử Nhân Lành dịu hiền giữa đàn chiên bên dòng suối mát, sẵn sàng hiến mạng sống vì từng con chiên.',
    biblicalTheme: 'Tv 23; Ga 10,11-18; Lc 15,4-7',
    liturgicalColors: ['WHITE', 'GREEN'],
    catechismPillars: [1, 3, 4]
  },
  {
    id: 'prodigal-son',
    title: 'Người Cha Nhân Hậu Đón Đứa Con Hoang Đàng',
    artist: 'Rembrandt van Rijn',
    year: '1668 - 1669',
    location: 'Bảo tàng Hermitage, St. Petersburg',
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=400&auto=format&fit=crop',
    description: 'Vòng tay bao dung của người cha ôm chặt đứa con trở về lấm lem bùn đất, bức tranh tuyệt tác về Lòng Thương Xót vô biên của Thiên Chúa trong Bí tích Hòa Giải.',
    biblicalTheme: 'Lc 15,11-32; Ep 2,4-5',
    liturgicalColors: ['PURPLE', 'GREEN'],
    catechismPillars: [2, 3]
  }
];

export function getArtworkForLiturgicalColor(color: string): SacredArtwork {
  const normColor = color.toUpperCase();
  const matched = SACRED_ARTWORKS.filter(a => a.liturgicalColors.includes(normColor as any));
  if (matched.length > 0) {
    return matched[Math.floor(Math.random() * matched.length)];
  }
  return SACRED_ARTWORKS[0];
}

export function getArtworkForPillar(pillar: number): SacredArtwork {
  const matched = SACRED_ARTWORKS.filter(a => a.catechismPillars.includes(pillar as any));
  if (matched.length > 0) {
    return matched[0];
  }
  return SACRED_ARTWORKS[0];
}

export function getArtworkForBook(bookId: string): SacredArtwork {
  if (['gen', 'exod', 'lev', 'num', 'deut'].includes(bookId)) {
    return SACRED_ARTWORKS[0]; // Creation of Adam
  }
  if (['matt', 'mark', 'luke', 'john'].includes(bookId)) {
    return SACRED_ARTWORKS[2]; // Last Supper
  }
  if (bookId === 'ps') {
    return SACRED_ARTWORKS[6]; // Good Shepherd
  }
  if (bookId === 'acts') {
    return SACRED_ARTWORKS[5]; // Pentecost
  }
  if (bookId === 'rev') {
    return SACRED_ARTWORKS[4]; // Resurrection
  }
  return SACRED_ARTWORKS[1]; // Annunciation
}
