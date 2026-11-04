-- ============================================================================
-- NỀN TẢNG KINH THÁNH CÔNG GIÁO TOÀN DIỆN - LỜI CHÚA MỖI NGÀY
-- HỆ THỐNG CƠ SỞ DỮ LIỆU POSTGRESQL / SUPABASE & QUẢN TRỊ BẢO MẬT (GIAI ĐOẠN 8)
-- ============================================================================

-- BẬT CÁC EXTENSION CẦN THIẾT
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ----------------------------------------------------------------------------
-- 1. BẢNG PHÂN QUYỀN VÀ QUẢN TRỊ NGƯỜI DÙNG (RBAC)
-- ----------------------------------------------------------------------------
CREATE TYPE user_role_enum AS ENUM (
    'SUPER_ADMIN',          -- Toàn quyền hệ thống
    'THEOLOGIAN_EDITOR',    -- Thẩm định thần học & chú giải
    'LITURGIST',            -- Quản lý phụng vụ & bài đọc lễ
    'CONTENT_MODERATOR',    -- Kiểm duyệt suy niệm & bài viết
    'REGISTERED_USER'       -- Người dùng đọc & học hỏi
);

CREATE TYPE verification_status_enum AS ENUM (
    'DRAFT',                -- Bản thảo đang soạn
    'PENDING_VERIFICATION', -- Chờ chuyên gia thần học duyệt
    'VERIFIED',             -- Đã thẩm định nguồn chính xác
    'PUBLISHED',            -- Đã xuất bản công khai
    'ARCHIVED'              -- Lưu trữ
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role_enum DEFAULT 'REGISTERED_USER',
    avatar_url TEXT,
    theological_credentials TEXT, -- Văn bằng hoặc cơ quan mục vụ
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng lưu vết lịch sử thao tác quản trị (Audit Log)
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id),
    user_email VARCHAR(255),
    action VARCHAR(100) NOT NULL, -- CREATE, UPDATE, DELETE, VERIFY, PUBLISH
    resource_type VARCHAR(100) NOT NULL, -- BIBLE_BOOK, DAILY_READING, CATECHISM, DOCUMENT
    resource_id VARCHAR(255) NOT NULL,
    changes JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. BẢN DỊCH & 73 SÁCH KINH THÁNH CÔNG GIÁO
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bible_translations (
    id VARCHAR(30) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(20) NOT NULL,
    language VARCHAR(10) DEFAULT 'vi',
    imprimatur_info TEXT, -- Giấy phép chuẩn ấn của Hội Đồng Giám Mục
    imprimatur_bishop VARCHAR(255),
    imprimatur_date DATE,
    publisher VARCHAR(255),
    publication_year INT,
    copyright_statement TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bible_books (
    id VARCHAR(30) PRIMARY KEY, -- 'gen', 'exod', 'matt', 'john'
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    latin_name VARCHAR(100) NOT NULL,
    abbreviation VARCHAR(20) NOT NULL,
    testament VARCHAR(10) NOT NULL CHECK (testament IN ('OLD', 'NEW')),
    category VARCHAR(30) NOT NULL CHECK (category IN (
        'PENTATEUCH', 'HISTORICAL', 'WISDOM', 'PROPHETS', 
        'GOSPELS', 'ACTS', 'EPISTLES', 'REVELATION'
    )),
    category_name VARCHAR(100) NOT NULL,
    chapters_count INT NOT NULL CHECK (chapters_count > 0),
    book_order INT NOT NULL UNIQUE,
    
    -- 10 Tiêu chí giới thiệu chuyên sâu chuẩn Thần học Công giáo
    overview TEXT NOT NULL,
    author_tradition TEXT NOT NULL,
    composition_period TEXT NOT NULL,
    historical_context TEXT NOT NULL,
    main_themes JSONB NOT NULL DEFAULT '[]'::jsonb,
    purpose TEXT NOT NULL,
    structure JSONB NOT NULL DEFAULT '[]'::jsonb,
    key_figures JSONB NOT NULL DEFAULT '[]'::jsonb,
    key_verses JSONB NOT NULL DEFAULT '[]'::jsonb,
    theological_significance TEXT NOT NULL,
    
    verification_status verification_status_enum DEFAULT 'VERIFIED',
    verified_by UUID REFERENCES user_profiles(id),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bible_chapters (
    id VARCHAR(60) PRIMARY KEY,
    book_id VARCHAR(30) NOT NULL REFERENCES bible_books(id) ON DELETE CASCADE,
    chapter_number INT NOT NULL,
    title VARCHAR(255),
    summary TEXT NOT NULL,
    historical_context TEXT,
    cultural_context TEXT,
    geography TEXT,
    characters JSONB DEFAULT '[]'::jsonb,
    literary_structure TEXT,
    theological_meaning TEXT,
    christian_message TEXT,
    related_passages JSONB DEFAULT '[]'::jsonb,
    verification_status verification_status_enum DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(book_id, chapter_number)
);

CREATE TABLE IF NOT EXISTS bible_verses (
    id VARCHAR(80) PRIMARY KEY, -- 'gen-1-1'
    book_id VARCHAR(30) NOT NULL REFERENCES bible_books(id) ON DELETE CASCADE,
    chapter_number INT NOT NULL,
    verse_number INT NOT NULL,
    translation_id VARCHAR(30) DEFAULT 'cgv' REFERENCES bible_translations(id),
    text TEXT NOT NULL,
    context_before_after TEXT,
    commentary TEXT,
    theological_themes JSONB DEFAULT '[]'::jsonb,
    related_verses JSONB DEFAULT '[]'::jsonb,
    ccc_links JSONB DEFAULT '[]'::jsonb, -- Mảng số Giáo lý [27, 28]
    church_doc_links JSONB DEFAULT '[]'::jsonb,
    footnotes TEXT,
    verification_status verification_status_enum DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(book_id, chapter_number, verse_number, translation_id)
);

CREATE INDEX IF NOT EXISTS idx_verses_lookup ON bible_verses(book_id, chapter_number, verse_number);
CREATE INDEX IF NOT EXISTS idx_verses_search ON bible_verses USING gin(to_tsvector('simple', text));

-- ----------------------------------------------------------------------------
-- 3. LỊCH PHỤNG VỤ VÀ BÀI ĐỌC PHỤNG VỤ
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS saints (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    feast_day VARCHAR(10) NOT NULL, -- 'MM-DD'
    rank VARCHAR(50) NOT NULL,
    patronage TEXT,
    biography TEXT NOT NULL,
    historical_era VARCHAR(100),
    spiritual_virtues JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reading_date DATE NOT NULL UNIQUE,
    title TEXT NOT NULL,
    season VARCHAR(30) NOT NULL,
    color VARCHAR(20) NOT NULL,
    rank VARCHAR(30) NOT NULL,
    cycle VARCHAR(50),
    liturgical_week VARCHAR(100),
    saint_id VARCHAR(50) REFERENCES saints(id),
    
    first_reading_ref VARCHAR(100) NOT NULL,
    first_reading_passage TEXT,
    first_reading_text TEXT NOT NULL,
    
    psalm_ref VARCHAR(100) NOT NULL,
    psalm_refrain TEXT NOT NULL,
    psalm_verses JSONB NOT NULL,
    
    second_reading_ref VARCHAR(100),
    second_reading_passage TEXT,
    second_reading_text TEXT,
    
    gospel_acclamation_verse VARCHAR(100),
    gospel_acclamation_text TEXT,
    
    gospel_ref VARCHAR(100) NOT NULL,
    gospel_passage TEXT,
    gospel_text TEXT NOT NULL,
    
    opening_prayer TEXT,
    prayer_of_faithful JSONB DEFAULT '[]'::jsonb,
    closing_prayer TEXT,
    source_attribution TEXT NOT NULL,
    verification_status verification_status_enum DEFAULT 'VERIFIED',
    verified_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_readings_date ON daily_readings(reading_date);

-- ----------------------------------------------------------------------------
-- 4. BÀI SUY NIỆM CHUẨN MỰC (8 PHẦN)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reflections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reflection_date DATE NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    scripture_ref VARCHAR(100) NOT NULL,
    scripture_text TEXT NOT NULL,
    background TEXT NOT NULL,
    explanation TEXT NOT NULL,
    core_message TEXT NOT NULL,
    life_application TEXT NOT NULL,
    reflection_questions JSONB NOT NULL,
    practical_resolution TEXT NOT NULL,
    prayer TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(255),
    verification_status verification_status_enum DEFAULT 'PUBLISHED',
    verified_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. GIÁO LÝ HỘI THÁNH CÔNG GIÁO (GLHTCG) & VĂN KIỆN
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS catechism_paragraphs (
    paragraph_number INT PRIMARY KEY,
    pillar INT NOT NULL CHECK (pillar BETWEEN 1 AND 4),
    pillar_name VARCHAR(100) NOT NULL,
    part_name VARCHAR(255) NOT NULL,
    section_name VARCHAR(255),
    chapter_name VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    scriptural_foundations JSONB DEFAULT '[]'::jsonb,
    key_doctrines JSONB DEFAULT '[]'::jsonb,
    related_paragraphs JSONB DEFAULT '[]'::jsonb,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_catechism_pillar ON catechism_paragraphs(pillar);
CREATE INDEX IF NOT EXISTS idx_catechism_search ON catechism_paragraphs USING gin(to_tsvector('simple', content));

CREATE TABLE IF NOT EXISTS church_documents (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    latin_title VARCHAR(255) NOT NULL,
    vietnamese_title VARCHAR(255) NOT NULL,
    promulgator VARCHAR(255) NOT NULL,
    promulgation_date DATE NOT NULL,
    historical_background TEXT NOT NULL,
    purpose TEXT NOT NULL,
    main_themes JSONB NOT NULL DEFAULT '[]'::jsonb,
    summary TEXT NOT NULL,
    key_sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    scripture_connections JSONB NOT NULL DEFAULT '[]'::jsonb,
    topics JSONB NOT NULL DEFAULT '[]'::jsonb,
    verification_status verification_status_enum DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. ĐỐI CHIẾU CỰU ƯỚC - TÂN ƯỚC (TYPOLOGY)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cross_references (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    ot_reference VARCHAR(100) NOT NULL,
    ot_title VARCHAR(255) NOT NULL,
    ot_text TEXT NOT NULL,
    ot_symbolism TEXT NOT NULL,
    nt_reference VARCHAR(100) NOT NULL,
    nt_title VARCHAR(255) NOT NULL,
    nt_text TEXT NOT NULL,
    nt_fulfillment TEXT NOT NULL,
    similarities JSONB NOT NULL,
    contrasts JSONB NOT NULL,
    salvation_history_significance TEXT NOT NULL,
    catholic_tradition TEXT NOT NULL,
    church_father_quote JSONB,
    verification_status verification_status_enum DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. KẾ HOẠCH ĐỌC & DỮ LIỆU CÁ NHÂN (USER DATA)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reading_plans (
    id VARCHAR(50) PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT NOT NULL,
    duration_days INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_label VARCHAR(100) NOT NULL,
    badge VARCHAR(50),
    days_data JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS personal_journal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    scripture_ref VARCHAR(100),
    scripture_quote TEXT,
    touched_by_word TEXT NOT NULL,
    personal_prayer TEXT NOT NULL,
    daily_resolution TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reading_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    plan_id VARCHAR(50) REFERENCES reading_plans(id),
    completed_days JSONB DEFAULT '[]'::jsonb,
    streak_count INT DEFAULT 0,
    last_completed_at DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, plan_id)
);

CREATE TABLE IF NOT EXISTS user_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    book_id VARCHAR(30) REFERENCES bible_books(id),
    chapter INT NOT NULL,
    verse INT NOT NULL,
    custom_label VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, book_id, chapter, verse)
);

CREATE TABLE IF NOT EXISTS user_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    verse_id VARCHAR(80) NOT NULL,
    note_content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 8. THIẾT LẬP BẢO MẬT ROW LEVEL SECURITY (RLS) & PHÂN QUYỀN
-- ----------------------------------------------------------------------------
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;

-- Hàm trợ giúp kiểm tra quyền Admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE id = user_id 
        AND role IN ('SUPER_ADMIN', 'THEOLOGIAN_EDITOR', 'LITURGIST')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Chính sách bảo mật RLS cho User Profiles
CREATE POLICY "Public profiles can be viewed by anyone" ON user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can edit own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Chính sách bảo mật RLS cho Nhật ký & Dữ liệu riêng tư
CREATE POLICY "Users strictly own their journal" ON personal_journal
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users strictly own their reading progress" ON reading_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users strictly own their bookmarks" ON user_bookmarks
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users strictly own their notes" ON user_notes
    FOR ALL USING (auth.uid() = user_id);

-- Chính sách cho Audit Logs (Chỉ SuperAdmin mới được xem)
CREATE POLICY "Only SuperAdmin can view audit logs" ON admin_audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'SUPER_ADMIN'
        )
    );
