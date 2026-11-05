'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  Copy, 
  Check, 
  Bookmark, 
  RotateCcw, 
  ChevronRight, 
  ShieldCheck,
  Flame,
  FileText,
  BookMarked,
  Layers,
  GraduationCap,
  Heart,
  Compass
} from 'lucide-react';
import { BibleStore } from '@/lib/bible-store';
import { AssistantMode } from '../api/assistant/route';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  mode?: AssistantMode;
  citations?: {
    scripture?: string[];
    ccc?: number[];
    churchDocs?: string[];
  };
  theologicalTheme?: string;
  disclaimer?: string;
  timestamp: string;
}

const ASSISTANT_MODES: { id: AssistantMode; label: string; icon: any; desc: string }[] = [
  { id: 'BIBLE_QA', label: 'Hỏi đáp Kinh Thánh', icon: BookOpen, desc: 'Giải thích đoạn văn, bối cảnh & ý nghĩa Lời Chúa' },
  { id: 'CATECHISM_LOOKUP', label: 'Tra cứu GLHTCG', icon: BookMarked, desc: 'Tra cứu 2.865 điều Giáo lý Hội Thánh Công giáo' },
  { id: 'THEOLOGY_STUDY', label: 'Nghiên cứu thần học', icon: Compass, desc: 'Tín lý, Kitô học, Tiên trưng & Giáo phụ học' },
  { id: 'CHURCH_DOCUMENTS', label: 'Văn kiện Hội Thánh', icon: FileText, desc: 'Vatican II, Thông điệp & Tông huấn Huấn Quyền' },
  { id: 'MEDITATION', label: 'Suy niệm Lời Chúa', icon: Heart, desc: 'Phương pháp Lectio Divina và áp dụng đời sống' },
  { id: 'EXAM_PREP', label: 'Học tập & Ôn thi', icon: GraduationCap, desc: 'Hệ thống câu hỏi, khái niệm & trắc nghiệm giáo lý' },
];

const SAMPLE_QUESTIONS_BY_MODE: Record<AssistantMode, string[]> = {
  BIBLE_QA: [
    'Tại sao Kinh Thánh Công giáo có 73 sách?',
    'Ý nghĩa Hy tế Thánh Thể trong Phúc Âm Gioan 6?',
    'Quyền bính của Thánh Phêrô và chức Giáo hoàng (Mt 16)?'
  ],
  CATECHISM_LOOKUP: [
    'Tra cứu điều 1324 về Bí tích Thánh Thể',
    'Bốn dấu chỉ của Hội Thánh duy nhất, thánh thiện, công giáo và tông truyền?',
    'Giáo lý về các Bí tích khai tâm Kitô giáo (GLHTCG 1212)?'
  ],
  THEOLOGY_STUDY: [
    'Mầu nhiệm Thiên Chúa Ba Ngôi trong Thần học Công giáo?',
    'Bốn tín điều cốt lõi về Đức Trinh Nữ Maria?',
    'Thuyết Biến Thể (Transubstantiatio) của Thánh Tôma Aquinô?'
  ],
  CHURCH_DOCUMENTS: [
    'Hiến chế Dei Verbum dạy gì về việc đọc Kinh Thánh?',
    'Hiến chế Lumen Gentium về ơn gọi nên thánh phổ quát?',
    'Thông điệp Laudato Si\' về chăm sóc Ngôi Nhà Chung?'
  ],
  MEDITATION: [
    'Gợi ý 5 bước cầu nguyện Lectio Divina với Tin Mừng hôm nay',
    'Làm thế nào để đưa Tám Mối Phúc Thật vào nơi công sở?',
    'Lời nguyện dâng ngày theo tinh thần Thánh Ignatiô Loyola'
  ],
  EXAM_PREP: [
    'Tóm tắt 4 Trụ Cột của Sách Giáo Lý Hội Thánh Công Giáo',
    'Kể tên 7 Bí Tích và phân loại theo 3 nhóm',
    '10 Điều Răn của Thiên Chúa và 6 Điều Răn của Hội Thánh'
  ]
};

export default function CatholicAIAssistantPage() {
  const [activeMode, setActiveMode] = useState<AssistantMode>('BIBLE_QA');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      mode: 'BIBLE_QA',
      text: `Kính chào bạn trong bình an và ân sủng của Chúa Kitô! 

Tôi là **Trợ Lý Học Hỏi Kinh Thánh Công Giáo**, được xây dựng để đồng hành cùng bạn trên hành trình:
1. Học hỏi và hiểu sâu Lời Chúa trong 73 cuốn Sách Thánh.
2. Tra cứu chính xác Sách Giáo Lý Hội Thánh Công Giáo (GLHTCG).
3. Đào sâu các Văn Kiện Huấn Quyền và Học Thuyết Xã Hội Công Giáo.
4. Gợi ý phương pháp suy niệm Lectio Divina và ôn tập giáo lý đức tin.

Mọi câu trả lời đều dẫn nguồn Kinh Thánh, số Giáo lý hoặc văn kiện cụ thể. Bạn có thể chọn chế độ bên trên hoặc nhấn vào các gợi ý bên dưới để bắt đầu.`,
      theologicalTheme: 'Lời Chào Mục Vụ & Giới Thiệu Trợ Lý Học Hỏi',
      disclaimer: 'Trợ lý AI là công cụ hỗ trợ học hỏi, không phải là Huấn quyền Hội Thánh và không thay thế sự hướng dẫn mục vụ.',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedJournalId, setSavedJournalId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      mode: activeMode,
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend.trim(),
          mode: activeMode
        })
      });

      if (!res.ok) throw new Error('Lỗi phản hồi từ máy chủ');
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        mode: data.mode || activeMode,
        text: data.answer,
        citations: data.citations,
        theologicalTheme: data.theologicalTheme,
        disclaimer: data.disclaimer,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        mode: activeMode,
        text: 'Xin lỗi bạn, hiện tại không thể kết nối tới cơ sở dữ liệu học hỏi. Vui lòng thử lại sau giây lát.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToJournal = (msg: ChatMessage) => {
    BibleStore.saveJournalRecord({
      title: msg.theologicalTheme || 'Học hỏi Lời Chúa & Thần Học',
      scriptureQuote: msg.citations?.scripture?.join(', ') || 'Lời Chúa',
      touchedByWord: msg.text.slice(0, 300) + '...',
      personalPrayer: 'Lạy Chúa, xin cho con biết yêu mến Lời Ngài và đem ra thực hành trong đời sống mỗi ngày.',
      dailyResolution: 'Sống Lời Chúa bằng thái độ khiêm nhường, yêu thương và hiệp nhất với Hội Thánh.',
      tags: ['Học Hỏi Kinh Thánh', 'Thần Học Công Giáo', msg.theologicalTheme || 'Đức Tin']
    });
    setSavedJournalId(msg.id);
    setTimeout(() => setSavedJournalId(null), 2500);
  };

  const handleClearHistory = () => {
    if (confirm('Bạn có muốn làm mới cuộc đối thoại học hỏi?')) {
      setMessages([messages[0]]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#1A1412] py-6 px-3 sm:px-6 lg:px-8 flex flex-col transition-colors pb-24 md:pb-12">
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col space-y-5">
        
        {/* Header Breadcrumb & Định vị Trợ lý */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E0D5] dark:border-[#3E302A] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B39A70] dark:text-[#E5BE53] mb-1">
              <Link href="/" className="hover:underline">Trang chủ</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Học hỏi Kinh Thánh & Đức Tin</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#403A34] dark:text-[#F7F4EE] flex items-center gap-2.5">
              <span>Trợ Lý Học Hỏi Kinh Thánh Công Giáo</span>
            </h1>
            <p className="text-xs text-[#736B63] dark:text-[#A1887F] mt-1">
              Đồng hành học tập, tra cứu GLHTCG, nghiên cứu thần học và văn kiện Hội Thánh với nguồn trích dẫn rõ ràng.
            </p>
          </div>

          <button
            onClick={handleClearHistory}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 dark:bg-[#241C18] dark:hover:bg-[#2E2420] text-[#736B63] dark:text-[#D7CCC8] border border-[#E7E0D5] dark:border-[#3E302A] text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Làm mới
          </button>
        </div>

        {/* Thanh chọn 6 Chế Độ Học Hỏi */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#B39A70] dark:text-[#E5BE53] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Chọn Chế Độ Học Tập:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {ASSISTANT_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isActive
                      ? 'bg-[#762F3A] text-white border-[#762F3A] shadow-sm'
                      : 'bg-white dark:bg-[#241C18] text-[#403A34] dark:text-[#F7F4EE] border-[#E7E0D5] dark:border-[#3E302A] hover:border-[#762F3A]/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#762F3A] dark:text-[#E5BE53]'}`} />
                    <span className="text-xs font-bold truncate">{mode.label}</span>
                  </div>
                  <span className={`text-[10px] line-clamp-1 leading-tight ${isActive ? 'text-white/80' : 'text-[#8F877F] dark:text-[#A1887F]'}`}>
                    {mode.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggestion Chips theo từng Chế Độ */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#736B63] dark:text-[#A1887F] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B39A70]" />
            <span>Gợi ý câu hỏi chế độ &ldquo;{ASSISTANT_MODES.find(m => m.id === activeMode)?.label}&rdquo;:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_QUESTIONS_BY_MODE[activeMode].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-left text-xs bg-white dark:bg-[#241C18] hover:bg-[#F7F4EE] dark:hover:bg-[#2E2420] text-[#403A34] dark:text-[#F7F4EE] hover:text-[#762F3A] border border-[#E7E0D5] dark:border-[#3E302A] hover:border-[#762F3A] px-3 py-1.5 rounded-xl transition shadow-xs font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="flex-1 bg-white dark:bg-[#241C18] rounded-3xl border border-[#E7E0D5] dark:border-[#3E302A] shadow-sm p-4 sm:p-6 flex flex-col justify-between space-y-4 min-h-[460px]">
          
          <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-1">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[11px] font-bold text-[#B39A70] dark:text-[#E5BE53]">
                      {isAssistant ? '☩ Trợ Lý Học Hỏi' : 'Bạn'}
                    </span>
                    <span className="text-[10px] text-[#8F877F] dark:text-[#A1887F]">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[95%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-xs text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-[#F7F4EE] dark:bg-[#1A1412] text-[#403A34] dark:text-[#F7F4EE] border border-[#E7E0D5] dark:border-[#3E302A]'
                        : 'bg-[#762F3A] text-white'
                    }`}
                  >
                    {/* Thematic Header */}
                    {msg.theologicalTheme && (
                      <div className="mb-3 pb-2 border-b border-[#E7E0D5] dark:border-[#3E302A] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Flame className="w-4 h-4 text-[#B39A70] dark:text-[#E5BE53]" />
                          <span className="text-xs font-bold text-[#762F3A] dark:text-[#E5BE53]">
                            {msg.theologicalTheme}
                          </span>
                        </div>
                        {msg.mode && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#B39A70]/15 text-[#B39A70] dark:text-[#E5BE53]">
                            {ASSISTANT_MODES.find(m => m.id === msg.mode)?.label}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Message Body */}
                    <div className="whitespace-pre-wrap font-serif text-sm sm:text-base leading-relaxed">
                      {msg.text}
                    </div>

                    {/* Citations Badges */}
                    {isAssistant && msg.citations && (
                      <div className="mt-4 pt-3 border-t border-[#E7E0D5] dark:border-[#3E302A] space-y-2">
                        {msg.citations.scripture && msg.citations.scripture.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#8F877F] dark:text-[#A1887F] uppercase">Kinh Thánh:</span>
                            {msg.citations.scripture.map((sc, i) => (
                              <span key={i} className="text-[11px] font-semibold bg-white dark:bg-[#241C18] text-[#762F3A] dark:text-[#E5BE53] px-2 py-0.5 rounded border border-[#E7E0D5] dark:border-[#3E302A]">
                                {sc}
                              </span>
                            ))}
                          </div>
                        )}

                        {msg.citations.ccc && msg.citations.ccc.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#8F877F] dark:text-[#A1887F] uppercase">Giáo Lý (GLHTCG):</span>
                            {msg.citations.ccc.map((c, i) => (
                              <Link
                                key={i}
                                href={`/giao-ly?num=${c}`}
                                className="text-[11px] font-bold bg-[#B39A70]/15 text-[#B39A70] dark:text-[#E5BE53] hover:underline px-2 py-0.5 rounded border border-[#B39A70]/30 transition"
                              >
                                Số {c}
                              </Link>
                            ))}
                          </div>
                        )}

                        {msg.citations.churchDocs && msg.citations.churchDocs.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#8F877F] dark:text-[#A1887F] uppercase">Văn Kiện:</span>
                            {msg.citations.churchDocs.map((doc, i) => (
                              <Link
                                key={i}
                                href={`/nghien-cuu?tab=documents`}
                                className="text-[11px] font-medium bg-white dark:bg-[#241C18] hover:underline text-[#403A34] dark:text-[#F7F4EE] px-2 py-0.5 rounded border border-[#E7E0D5] dark:border-[#3E302A] transition"
                              >
                                {doc}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Disclaimer box inside message */}
                    {isAssistant && msg.disclaimer && (
                      <div className="mt-3 text-[11px] text-[#8F877F] dark:text-[#A1887F] italic bg-black/5 dark:bg-white/5 p-2 rounded-xl">
                        &bull; {msg.disclaimer}
                      </div>
                    )}

                    {/* Action Bar for Assistant Messages */}
                    {isAssistant && (
                      <div className="mt-4 pt-2 flex items-center justify-end gap-2 text-xs border-t border-[#E7E0D5]/50 dark:border-[#3E302A]">
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#241C18] text-[#736B63] dark:text-[#D7CCC8] transition flex items-center gap-1"
                          title="Sao chép nội dung"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold text-[11px]">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Sao chép</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleSaveToJournal(msg)}
                          className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#241C18] text-[#736B63] dark:text-[#D7CCC8] transition flex items-center gap-1"
                          title="Lưu vào Nhật ký thiêng liêng"
                        >
                          {savedJournalId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold text-[11px]">Đã lưu nhật ký</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5 text-[#762F3A] dark:text-[#E5BE53]" />
                              <span className="text-[11px]">Lưu nhật ký</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#8F877F] dark:text-[#A1887F] bg-[#F7F4EE] dark:bg-[#1A1412] p-3 rounded-2xl w-fit border border-[#E7E0D5] dark:border-[#3E302A] animate-pulse">
                <Sparkles className="w-4 h-4 text-[#762F3A] dark:text-[#E5BE53] animate-spin" />
                <span>Đang tra cứu Kinh Thánh, Giáo Lý và Văn Kiện Huấn Quyền...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="pt-2 border-t border-[#E7E0D5] dark:border-[#3E302A]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Hỏi đáp theo chế độ: ${ASSISTANT_MODES.find(m => m.id === activeMode)?.label}...`}
                className="flex-1 px-4 py-3 bg-[#F7F4EE] dark:bg-[#1A1412] rounded-2xl border border-[#E7E0D5] dark:border-[#3E302A] text-sm text-[#403A34] dark:text-[#F7F4EE] placeholder-[#8F877F] dark:placeholder-[#A1887F] focus:outline-none focus:ring-2 focus:ring-[#762F3A]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-5 py-3 rounded-2xl bg-[#762F3A] hover:bg-[#5E252E] disabled:opacity-50 text-white font-semibold text-sm transition shadow-xs flex items-center gap-2 shrink-0"
              >
                <span>Hỏi</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Tuyên bố miễn trách nhiệm & Giới hạn mục vụ */}
        <div className="bg-[#F7F4EE] dark:bg-[#241C18] border border-[#E7E0D5] dark:border-[#3E302A] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#736B63] dark:text-[#D7CCC8]">
          <ShieldCheck className="w-5 h-5 text-[#B39A70] dark:text-[#E5BE53] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#762F3A] dark:text-[#E5BE53] block font-bold mb-0.5">Nguyên tắc mục vụ & Thẩm quyền:</strong>
            Trợ lý AI là công cụ hỗ trợ học tập và nghiên cứu, <strong>không phải là Huấn quyền Hội Thánh</strong> và không thể thay thế sự hướng dẫn mục vụ hoặc tòa giải tội. Đối với các vấn đề luân lý lương tâm, hôn nhân và bí tích cụ thể, người tín hữu luôn cần vâng phục và đón nhận sự hướng dẫn trực tiếp từ các Chủ Chăn và Linh mục linh hướng.
          </div>
        </div>

      </div>
    </div>
  );
}
