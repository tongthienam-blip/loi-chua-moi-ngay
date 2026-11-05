import { NextResponse } from 'next/server';
import { getChapterData } from '@/data/sample-verses';

// ============================================================================
// BẢNG ÁNH XẠ CHUẨN 73 SÁCH KINH THÁNH CÔNG GIÁO (100% TIẾNG VIỆT)
// Ánh xạ từ các mã / tên / viết tắt sang Slug augustino.net và Slug chuẩn
// ============================================================================
const BIBLE_MAP = {
  // --- 46 SÁCH CỰU ƯỚC ---
  'gen': { id: 'gen', slug: 'sang-the', augustino: 'sach-sang-the', name: 'Sáng Thế' },
  'exod': { id: 'exod', slug: 'xuat-hanh', augustino: 'sach-xuat-hanh', name: 'Xuất Hành' },
  'exo': { id: 'exod', slug: 'xuat-hanh', augustino: 'sach-xuat-hanh', name: 'Xuất Hành' },
  'lev': { id: 'lev', slug: 'le-vi', augustino: 'sach-le-vi', name: 'Lê-vi' },
  'num': { id: 'num', slug: 'dan-so', augustino: 'sach-dan-so', name: 'Dân Số' },
  'deut': { id: 'deut', slug: 'de-nhi-luat', augustino: 'sach-de-nhi-luat', name: 'Đệ Nhị Luật' },
  'josh': { id: 'josh', slug: 'gio-sue', augustino: 'sach-gio-sue', name: 'Giô-suê' },
  'judg': { id: 'judg', slug: 'thu-lanh', augustino: 'sach-thu-lanh', name: 'Thủ Lãnh' },
  'ruth': { id: 'ruth', slug: 'rut', augustino: 'sach-rut', name: 'Rút' },
  '1sam': { id: '1sam', slug: '1-sam-uen', augustino: 'sach-sa-mu-en-1', name: '1 Sa-mu-en' },
  '2sam': { id: '2sam', slug: '2-sam-uen', augustino: 'sach-sa-mu-en-2', name: '2 Sa-mu-en' },
  '1kgs': { id: '1kgs', slug: '1-vua', augustino: 'sach-cac-vua-1', name: '1 Các Vua' },
  '1kings': { id: '1kgs', slug: '1-vua', augustino: 'sach-cac-vua-1', name: '1 Các Vua' },
  '2kgs': { id: '2kgs', slug: '2-vua', augustino: 'sach-cac-vua-2', name: '2 Các Vua' },
  '2kings': { id: '2kgs', slug: '2-vua', augustino: 'sach-cac-vua-2', name: '2 Các Vua' },
  '1chr': { id: '1chr', slug: '1-su-bieu', augustino: 'sach-su-bien-1', name: '1 Sử Biên' },
  '1chron': { id: '1chr', slug: '1-su-bieu', augustino: 'sach-su-bien-1', name: '1 Sử Biên' },
  '2chr': { id: '2chr', slug: '2-su-bieu', augustino: 'sach-su-bien-2', name: '2 Sử Biên' },
  '2chron': { id: '2chr', slug: '2-su-bieu', augustino: 'sach-su-bien-2', name: '2 Sử Biên' },
  'ezra': { id: 'ezra', slug: 'et-ra', augustino: 'sach-et-ra', name: 'Ét-ra' },
  'neh': { id: 'neh', slug: 'ne-he-mi-a', augustino: 'sach-no-khe-mi-a', name: 'Nê-hê-mi-a' },
  'tob': { id: 'tob', slug: 'to-bi-a', augustino: 'sach-to-bi-a', name: 'Tô-bi-a' },
  'jdt': { id: 'jdt', slug: 'giu-di-tha', augustino: 'sach-giu-di-tha', name: 'Giu-đi-tha' },
  'esth': { id: 'esth', slug: 'et-ste', augustino: 'sach-et-te', name: 'Ét-te' },
  'est': { id: 'esth', slug: 'et-ste', augustino: 'sach-et-te', name: 'Ét-te' },
  '1macc': { id: '1macc', slug: '1-ma-ca-be', augustino: 'sach-ma-ca-be-1', name: '1 Ma-ca-bê' },
  '2macc': { id: '2macc', slug: '2-ma-ca-be', augustino: 'sach-ma-ca-be-2', name: '2 Ma-ca-bê' },
  'job': { id: 'job', slug: 'giop', augustino: 'sach-giop', name: 'Gióp' },
  'ps': { id: 'ps', slug: 'thanh-vinh', augustino: 'sach-thanh-vinh', name: 'Thánh Vịnh' },
  'prov': { id: 'prov', slug: 'cham-ngon', augustino: 'sach-cham-ngon', name: 'Châm Ngôn' },
  'eccl': { id: 'eccl', slug: 'giang-vien', augustino: 'sach-giang-vien', name: 'Giảng Viên' },
  'eccles': { id: 'eccl', slug: 'giang-vien', augustino: 'sach-giang-vien', name: 'Giảng Viên' },
  'song': { id: 'song', slug: 'diem-ca', augustino: 'sach-diem-ca', name: 'Diễm Ca' },
  'wis': { id: 'wis', slug: 'khon-ngoan', augustino: 'sach-khon-ngoan', name: 'Khôn Ngoan' },
  'sir': { id: 'sir', slug: 'huan-ca', augustino: 'sach-huan-ca', name: 'Huấn Ca' },
  'isa': { id: 'isa', slug: 'i-sai-a', augustino: 'sach-ngon-su-i-sai-a', name: 'I-sai-a' },
  'jer': { id: 'jer', slug: 'gie-re-mi-a', augustino: 'sach-ngon-su-gie-re-mi-a', name: 'Giê-rê-mi-a' },
  'lam': { id: 'lam', slug: 'ca-thuong', augustino: 'sach-ai-ca', name: 'Ca Thương' },
  'bar': { id: 'bar', slug: 'ba-ruc', augustino: 'sach-ba-ruc', name: 'Ba-rúc' },
  'ezek': { id: 'ezek', slug: 'e-ze-ki-en', augustino: 'sach-ngon-su-e-de-ki-en', name: 'Ê-dê-ki-en' },
  'dan': { id: 'dan', slug: 'da-ni-en', augustino: 'sach-ngon-su-da-ni-en', name: 'Đa-ni-en' },
  'hos': { id: 'hos', slug: 'ho-se', augustino: 'sach-ngon-su-ho-se', name: 'Hô-sê' },
  'joel': { id: 'joel', slug: 'gio-en', augustino: 'sach-ngon-su-gio-en', name: 'Giô-en' },
  'amos': { id: 'amos', slug: 'a-mos', augustino: 'sach-ngon-su-a-mot', name: 'A-mốt' },
  'obad': { id: 'obad', slug: 'o-va-di-a', augustino: 'sach-ngon-su-o-va-di-a', name: 'Ô-va-đi-a' },
  'jonah': { id: 'jonah', slug: 'gio-na', augustino: 'sach-ngon-su-gio-na', name: 'Giô-na' },
  'mic': { id: 'mic', slug: 'mi-kha', augustino: 'sach-ngon-su-mi-kha', name: 'Mi-kha' },
  'nah': { id: 'nah', slug: 'na-khum', augustino: 'sach-ngon-su-na-khum', name: 'Na-khum' },
  'hab': { id: 'hab', slug: 'kha-ba-cuc', augustino: 'sach-ngon-su-kha-ba-cuc', name: 'Kha-ba-cúc' },
  'zeph': { id: 'zeph', slug: 'xe-pha-ni-a', augustino: 'sach-ngon-su-xo-pho-ni-a', name: 'Xê-pha-ni-a' },
  'hag': { id: 'hag', slug: 'khac-gai', augustino: 'sach-ngon-su-khac-gai', name: 'Khắc-gai' },
  'zech': { id: 'zech', slug: 'xa-ca-ri-a', augustino: 'sach-ngon-su-da-ca-ri-a', name: 'Xa-ca-ri-a' },
  'mal': { id: 'mal', slug: 'ma-la-khi', augustino: 'sach-ngon-su-ma-la-khi', name: 'Ma-la-khi' },

  // --- 27 SÁCH TÂN ƯỚC ---
  'matt': { id: 'matt', slug: 'mat-theu', augustino: 'tin-mung-theo-thanh-mat-theu', name: 'Mát-thêu' },
  'mark': { id: 'mark', slug: 'mac-co', augustino: 'tin-mung-theo-thanh-mac-co', name: 'Mác-cô' },
  'luke': { id: 'luke', slug: 'lu-ca', augustino: 'tin-mung-theo-thanh-lu-ca', name: 'Lu-ca' },
  'john': { id: 'john', slug: 'gio-an', augustino: 'tin-mung-theo-thanh-gio-an', name: 'Gio-an' },
  'acts': { id: 'acts', slug: 'tong-do-cong-vu', augustino: 'sach-cong-vu-tong-do', name: 'Tông Đồ Công Vụ' },
  'rom': { id: 'rom', slug: 'ro-ma', augustino: 'thu-gui-tin-huu-ro-ma', name: 'Rô-ma' },
  '1cor': { id: '1cor', slug: '1-co-rin-to', augustino: 'thu-1-gui-tin-huu-co-rin-to', name: '1 Cô-rin-tô' },
  '2cor': { id: '2cor', slug: '2-co-rin-to', augustino: 'thu-2-gui-tin-huu-co-rin-to', name: '2 Cô-rin-tô' },
  'gal': { id: 'gal', slug: 'ga-lat', augustino: 'thu-gui-tin-huu-ga-lat', name: 'Ga-lát' },
  'eph': { id: 'eph', slug: 'e-phe-xo', augustino: 'thu-gui-tin-huu-e-phe-xo', name: 'Ê-phê-xô' },
  'phil': { id: 'phil', slug: 'phi-lip-phe', augustino: 'thu-gui-tin-huu-phi-lip-phe', name: 'Phi-líp-phê' },
  'col': { id: 'col', slug: 'co-lo-xe', augustino: 'thu-gui-tin-huu-co-lo-xe', name: 'Cô-lô-xê' },
  '1thess': { id: '1thess', slug: '1-the-xa-lo-ni-ca', augustino: 'thu-1-gui-tin-huu-the-xa-lo-ni-ca', name: '1 Tê-xa-lô-ni-ca' },
  '2thess': { id: '2thess', slug: '2-the-xa-lo-ni-ca', augustino: 'thu-2-gui-tin-huu-the-xa-lo-ni-ca', name: '2 Tê-xa-lô-ni-ca' },
  '1tim': { id: '1tim', slug: '1-ti-mo-the', augustino: 'thu-1-gui-ong-ti-mo-the', name: '1 Ti-mô-thê' },
  '2tim': { id: '2tim', slug: '2-ti-mo-the', augustino: 'thu-2-gui-ong-ti-mo-the', name: '2 Ti-mô-thê' },
  'tit': { id: 'titus', slug: 'ti-to', augustino: 'thu-gui-ong-ti-to', name: 'Ti-tô' },
  'titus': { id: 'titus', slug: 'ti-to', augustino: 'thu-gui-ong-ti-to', name: 'Ti-tô' },
  'philem': { id: 'philem', slug: 'phi-le-mon', augustino: 'thu-gui-ong-phi-le-mon', name: 'Phi-lê-môn' },
  'heb': { id: 'heb', slug: 'do-thai', augustino: 'thu-gui-tin-huu-hip-ri', name: 'Do Thái' },
  'jas': { id: 'jas', slug: 'gia-co-be', augustino: 'thu-cua-thanh-gia-co-be', name: 'Gia-cô-bê' },
  '1pet': { id: '1pet', slug: '1-phe-ro', augustino: 'thu-1-cua-thanh-phe-ro', name: '1 Phê-rô' },
  '2pet': { id: '2pet', slug: '2-phe-ro', augustino: 'thu-2-cua-thanh-phe-ro', name: '2 Phê-rô' },
  '1john': { id: '1john', slug: '1-gio-an', augustino: 'thu-1-cua-thanh-gio-an', name: '1 Gio-an' },
  '2john': { id: '2john', slug: '2-gio-an', augustino: 'thu-2-cua-thanh-gio-an', name: '2 Gio-an' },
  '3john': { id: '3john', slug: '3-gio-an', augustino: 'thu-3-cua-thanh-gio-an', name: '3 Gio-an' },
  'jude': { id: 'jude', slug: 'giu-da', augustino: 'thu-cua-thanh-giu-da', name: 'Giu-đa' },
  'rev': { id: 'rev', slug: 'khai-huyen', augustino: 'sach-khai-huyen', name: 'Khải Huyền' },

  // --- VIẾT TẮT TIẾNG VIỆT PHỔ BIẾN ---
  'st': { id: 'gen', slug: 'sang-the', augustino: 'sach-sang-the', name: 'Sáng Thế' },
  'xh': { id: 'exod', slug: 'xuat-hanh', augustino: 'sach-xuat-hanh', name: 'Xuất Hành' },
  'lv': { id: 'lev', slug: 'le-vi', augustino: 'sach-le-vi', name: 'Lê-vi' },
  'ds': { id: 'num', slug: 'dan-so', augustino: 'sach-dan-so', name: 'Dân Số' },
  'dnl': { id: 'deut', slug: 'de-nhi-luat', augustino: 'sach-de-nhi-luat', name: 'Đệ Nhị Luật' },
  'gs': { id: 'josh', slug: 'gio-sue', augustino: 'sach-gio-sue', name: 'Giô-suê' },
  'tl': { id: 'judg', slug: 'thu-lanh', augustino: 'sach-thu-lanh', name: 'Thủ Lãnh' },
  'rt': { id: 'ruth', slug: 'rut', augustino: 'sach-rut', name: 'Rút' },
  '1sm': { id: '1sam', slug: '1-sam-uen', augustino: 'sach-sa-mu-en-1', name: '1 Sa-mu-en' },
  '2sm': { id: '2sam', slug: '2-sam-uen', augustino: 'sach-sa-mu-en-2', name: '2 Sa-mu-en' },
  '1v': { id: '1kgs', slug: '1-vua', augustino: 'sach-cac-vua-1', name: '1 Các Vua' },
  '2v': { id: '2kgs', slug: '2-vua', augustino: 'sach-cac-vua-2', name: '2 Các Vua' },
  '1sb': { id: '1chr', slug: '1-su-bieu', augustino: 'sach-su-bien-1', name: '1 Sử Biên' },
  '2sb': { id: '2chr', slug: '2-su-bieu', augustino: 'sach-su-bien-2', name: '2 Sử Biên' },
  'er': { id: 'ezra', slug: 'et-ra', augustino: 'sach-et-ra', name: 'Ét-ra' },
  'nh': { id: 'neh', slug: 'ne-he-mi-a', augustino: 'sach-no-khe-mi-a', name: 'Nê-hê-mi-a' },
  'tb': { id: 'tob', slug: 'to-bi-a', augustino: 'sach-to-bi-a', name: 'Tô-bi-a' },
  'gdt': { id: 'jdt', slug: 'giu-di-tha', augustino: 'sach-giu-di-tha', name: 'Giu-đi-tha' },
  'es': { id: 'esth', slug: 'et-ste', augustino: 'sach-et-te', name: 'Ét-te' },
  '1mc': { id: '1macc', slug: '1-ma-ca-be', augustino: 'sach-ma-ca-be-1', name: '1 Ma-ca-bê' },
  '2mc': { id: '2macc', slug: '2-ma-ca-be', augustino: 'sach-ma-ca-be-2', name: '2 Ma-ca-bê' },
  'gp': { id: 'job', slug: 'giop', augustino: 'sach-giop', name: 'Gióp' },
  'tv': { id: 'ps', slug: 'thanh-vinh', augustino: 'sach-thanh-vinh', name: 'Thánh Vịnh' },
  'cn': { id: 'prov', slug: 'cham-ngon', augustino: 'sach-cham-ngon', name: 'Châm Ngôn' },
  'gv': { id: 'eccl', slug: 'giang-vien', augustino: 'sach-giang-vien', name: 'Giảng Viên' },
  'dc': { id: 'song', slug: 'diem-ca', augustino: 'sach-diem-ca', name: 'Diễm Ca' },
  'kn': { id: 'wis', slug: 'khon-ngoan', augustino: 'sach-khon-ngoan', name: 'Khôn Ngoan' },
  'hc': { id: 'sir', slug: 'huan-ca', augustino: 'sach-huan-ca', name: 'Huấn Ca' },
  'is': { id: 'isa', slug: 'i-sai-a', augustino: 'sach-ngon-su-i-sai-a', name: 'I-sai-a' },
  'gr': { id: 'jer', slug: 'gie-re-mi-a', augustino: 'sach-ngon-su-gie-re-mi-a', name: 'Giê-rê-mi-a' },
  'tc': { id: 'lam', slug: 'ca-thuong', augustino: 'sach-ai-ca', name: 'Ca Thương' },
  'br': { id: 'bar', slug: 'ba-ruc', augustino: 'sach-ba-ruc', name: 'Ba-rúc' },
  'ez': { id: 'ezek', slug: 'e-ze-ki-en', augustino: 'sach-ngon-su-e-de-ki-en', name: 'Ê-dê-ki-en' },
  'dn': { id: 'dan', slug: 'da-ni-en', augustino: 'sach-ngon-su-da-ni-en', name: 'Đa-ni-en' },
  'hs': { id: 'hos', slug: 'ho-se', augustino: 'sach-ngon-su-ho-se', name: 'Hô-sê' },
  'ge': { id: 'joel', slug: 'gio-en', augustino: 'sach-ngon-su-gio-en', name: 'Giô-en' },
  'am': { id: 'amos', slug: 'a-mos', augustino: 'sach-ngon-su-a-mot', name: 'A-mốt' },
  'ov': { id: 'obad', slug: 'o-va-di-a', augustino: 'sach-ngon-su-o-va-di-a', name: 'Ô-va-đi-a' },
  'gn': { id: 'jonah', slug: 'gio-na', augustino: 'sach-ngon-su-gio-na', name: 'Giô-na' },
  'mk': { id: 'mic', slug: 'mi-kha', augustino: 'sach-ngon-su-mi-kha', name: 'Mi-kha' },
  'nhm': { id: 'nah', slug: 'na-khum', augustino: 'sach-ngon-su-na-khum', name: 'Na-khum' },
  'khb': { id: 'hab', slug: 'kha-ba-cuc', augustino: 'sach-ngon-su-kha-ba-cuc', name: 'Kha-ba-cúc' },
  'xp': { id: 'zeph', slug: 'xe-pha-ni-a', augustino: 'sach-ngon-su-xo-pho-ni-a', name: 'Xê-pha-ni-a' },
  'hg': { id: 'hag', slug: 'khac-gai', augustino: 'sach-ngon-su-khac-gai', name: 'Khắc-gai' },
  'zc': { id: 'zech', slug: 'xa-ca-ri-a', augustino: 'sach-ngon-su-da-ca-ri-a', name: 'Xa-ca-ri-a' },
  'ml': { id: 'mal', slug: 'ma-la-khi', augustino: 'sach-ngon-su-ma-la-khi', name: 'Ma-la-khi' },
  'mt': { id: 'matt', slug: 'mat-theu', augustino: 'tin-mung-theo-thanh-mat-theu', name: 'Mát-thêu' },
  'mc': { id: 'mark', slug: 'mac-co', augustino: 'tin-mung-theo-thanh-mac-co', name: 'Mác-cô' },
  'lc': { id: 'luke', slug: 'lu-ca', augustino: 'tin-mung-theo-thanh-lu-ca', name: 'Lu-ca' },
  'ga': { id: 'john', slug: 'gio-an', augustino: 'tin-mung-theo-thanh-gio-an', name: 'Gio-an' },
  'cv': { id: 'acts', slug: 'tong-do-cong-vu', augustino: 'sach-cong-vu-tong-do', name: 'Tông Đồ Công Vụ' },
  'rm': { id: 'rom', slug: 'ro-ma', augustino: 'thu-gui-tin-huu-ro-ma', name: 'Rô-ma' },
  '1cr': { id: '1cor', slug: '1-co-rin-to', augustino: 'thu-1-gui-tin-huu-co-rin-to', name: '1 Cô-rin-tô' },
  '2cr': { id: '2cor', slug: '2-co-rin-to', augustino: 'thu-2-gui-tin-huu-co-rin-to', name: '2 Cô-rin-tô' },
  'gl': { id: 'gal', slug: 'ga-lat', augustino: 'thu-gui-tin-huu-ga-lat', name: 'Ga-lát' },
  'ep': { id: 'eph', slug: 'e-phe-xo', augustino: 'thu-gui-tin-huu-e-phe-xo', name: 'Ê-phê-xô' },
  'pl': { id: 'phil', slug: 'phi-lip-phe', augustino: 'thu-gui-tin-huu-phi-lip-phe', name: 'Phi-líp-phê' },
  'cl': { id: 'col', slug: 'co-lo-xe', augustino: 'thu-gui-tin-huu-co-lo-xe', name: 'Cô-lô-xê' },
  '1ts': { id: '1thess', slug: '1-the-xa-lo-ni-ca', augustino: 'thu-1-gui-tin-huu-the-xa-lo-ni-ca', name: '1 Tê-xa-lô-ni-ca' },
  '2ts': { id: '2thess', slug: '2-the-xa-lo-ni-ca', augustino: 'thu-2-gui-tin-huu-the-xa-lo-ni-ca', name: '2 Tê-xa-lô-ni-ca' },
  '1tm': { id: '1tim', slug: '1-ti-mo-the', augustino: 'thu-1-gui-ong-ti-mo-the', name: '1 Ti-mô-thê' },
  '2tm': { id: '2tim', slug: '2-ti-mo-the', augustino: 'thu-2-gui-ong-ti-mo-the', name: '2 Ti-mô-thê' },
  'tt': { id: 'titus', slug: 'ti-to', augustino: 'thu-gui-ong-ti-to', name: 'Ti-tô' },
  'pm': { id: 'philem', slug: 'phi-le-mon', augustino: 'thu-gui-ong-phi-le-mon', name: 'Phi-lê-môn' },
  'dt': { id: 'heb', slug: 'do-thai', augustino: 'thu-gui-tin-huu-hip-ri', name: 'Do Thái' },
  'gc': { id: 'jas', slug: 'gia-co-be', augustino: 'thu-cua-thanh-gia-co-be', name: 'Gia-cô-bê' },
  '1pr': { id: '1pet', slug: '1-phe-ro', augustino: 'thu-1-cua-thanh-phe-ro', name: '1 Phê-rô' },
  '2pr': { id: '2pet', slug: '2-phe-ro', augustino: 'thu-2-cua-thanh-phe-ro', name: '2 Phê-rô' },
  '1ga': { id: '1john', slug: '1-gio-an', augustino: 'thu-1-cua-thanh-gio-an', name: '1 Gio-an' },
  '2ga': { id: '2john', slug: '2-gio-an', augustino: 'thu-2-cua-thanh-gio-an', name: '2 Gio-an' },
  '3ga': { id: '3john', slug: '3-gio-an', augustino: 'thu-3-cua-thanh-gio-an', name: '3 Gio-an' },
  'gd': { id: 'jude', slug: 'giu-da', augustino: 'thu-cua-thanh-giu-da', name: 'Giu-đa' },
  'kh': { id: 'rev', slug: 'khai-huyen', augustino: 'sach-khai-huyen', name: 'Khải Huyền' }
};

// Đăng ký thêm các alias dạng slug tiếng Việt (ví dụ 'sang-the', 'mat-theu', 'to-bi-a')
Object.values(BIBLE_MAP).forEach((item) => {
  if (item && item.slug && !BIBLE_MAP[item.slug]) {
    BIBLE_MAP[item.slug] = item;
  }
  if (item && item.augustino && !BIBLE_MAP[item.augustino]) {
    BIBLE_MAP[item.augustino] = item;
  }
});

/**
 * Hàm chuẩn hóa tên sách tiếng Việt có dấu/không dấu/viết tắt về dạng slug sạch
 */
function normalizeSlug(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Trích xuất khối nội dung chính từ HTML của augustino.net
 */
function extractMainContent(htmlText) {
  if (!htmlText) return '';

  // 1. Tìm thẻ nội dung chính theo thứ tự ưu tiên: .entry-content, div.content, article, main
  const entryMatch = htmlText.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const contentDivMatch = htmlText.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/main>/i) ||
                          htmlText.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const articleMatch = htmlText.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i);
  const mainMatch = htmlText.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);

  const rawBlock = (entryMatch && entryMatch[1]) ||
                   (contentDivMatch && contentDivMatch[1]) ||
                   (articleMatch && articleMatch[1]) ||
                   (mainMatch && mainMatch[1]) ||
                   htmlText;

  // 2. Trích xuất các đoạn văn bản Lời Chúa (<p>...</p>), loại bỏ ảnh bìa hoặc thông tin tác quyền ngoài lề
  const paragraphs = [...rawBlock.matchAll(/<p[\s\S]*?>([\s\S]*?)<\/p>/gi)]
    .map(m => m[0])
    .filter(p => !p.includes('<img') && !p.includes('thanhlinh.net'));

  if (paragraphs.length > 0) {
    return paragraphs.join('\n');
  }

  return rawBlock;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawBook = (searchParams.get('book') || '').trim();
  const chapter = parseInt(searchParams.get('chapter') || '1', 10);

  if (!rawBook) {
    return NextResponse.json({
      success: false,
      error: 'Vui lòng cung cấp tham số book'
    }, { status: 400 });
  }

  const cleanBook = rawBook.toLowerCase();
  const normalizedInput = normalizeSlug(cleanBook);
  const bookInfo = BIBLE_MAP[cleanBook] || BIBLE_MAP[normalizedInput] || {
    id: cleanBook,
    slug: normalizedInput,
    augustino: normalizedInput,
    name: rawBook
  };

  const canonicalId = bookInfo.id || cleanBook;
  const augustinoSlug = bookInfo.augustino || normalizedInput;
  const shortSlug = bookInfo.slug || normalizedInput;

  // Danh sách các URL thử nghiệm trên augustino.net
  const candidateUrls = [
    // Định dạng 1: https://augustino.net/${augustinoSlug} (chương 1) hoặc -chuong-${chapter}
    chapter === 1 
      ? `https://augustino.net/${augustinoSlug}` 
      : `https://augustino.net/${augustinoSlug}-chuong-${chapter}`,
    // Định dạng 2: https://augustino.net/phung-vu/kinh-thanh/${shortSlug}/${chapter}
    `https://augustino.net/phung-vu/kinh-thanh/${shortSlug}/${chapter}`,
    // Định dạng 3: https://augustino.net/${shortSlug}${chapter === 1 ? '' : '-chuong-' + chapter}`
    chapter === 1 
      ? `https://augustino.net/${shortSlug}` 
      : `https://augustino.net/${shortSlug}-chuong-${chapter}`
  ];

  // 1. CÀO DỮ LIỆU TỪ AUGUSTINO.NET
  for (const targetUrl of candidateUrls) {
    try {
      const res = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        cache: 'no-store'
      });

      if (res.ok) {
        const htmlText = await res.text();
        const extracted = extractMainContent(htmlText);

        if (extracted && extracted.trim().length > 60) {
          return NextResponse.json({
            success: true,
            source: 'augustino.net',
            bookId: canonicalId,
            bookName: bookInfo.name,
            chapter,
            html: extracted
          });
        }
      }
    } catch (augustinoErr) {
      // Tiếp tục thử URL kế tiếp
    }
  }

  // 2. NGUỒN DỰ PHÒNG 100% TIẾNG VIỆT (TỪ KHO DỮ LIỆU KINH VIỆN CÔNG GIÁO NỘI BỘ)
  // Tuyệt đối không fallback sang labs.bible.org hoặc bất kỳ API tiếng Anh nào
  try {
    const localChapter = getChapterData(canonicalId, chapter);
    if (localChapter && localChapter.verses && localChapter.verses.length > 0) {
      const formattedHtml = localChapter.verses.map((v) => (
        `<p class="mb-3 leading-relaxed text-justify"><b class="font-serif text-[#762F3A] dark:text-[#E5B54C] mr-2 inline-block select-none">[${v.verseNumber}]</b>${v.text}</p>`
      )).join('\n');

      return NextResponse.json({
        success: true,
        source: 'local-canonical-vietnamese',
        bookId: canonicalId,
        bookName: bookInfo.name,
        chapter,
        html: formattedHtml
      });
    }
  } catch (localErr) {
    console.error('Lỗi nạp kho dự phòng tiếng Việt:', localErr);
  }

  return NextResponse.json({
    success: false,
    error: `Chưa tìm thấy bản văn tiếng Việt cho ${bookInfo.name || canonicalId} chương ${chapter}`
  }, { status: 404 });
}
