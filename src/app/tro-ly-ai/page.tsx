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
  Info,
  ShieldCheck,
  Flame,
  FileText
} from 'lucide-react';
import { BibleStore } from '@/lib/bible-store';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: {
    scripture?: string[];
    ccc?: number[];
    churchDocs?: string[];
  };
  theologicalTheme?: string;
  timestamp: string;
}

const SAMPLE_QUESTIONS = [
  'Tại sao Kinh Thánh Công giáo có 73 sách?',
  'Ý nghĩa Hy tế Thánh Thể trong Phúc Âm Gioan 6?',
  'Quyền bính của Thánh Phêrô và chức Giáo hoàng (Mt 16)?',
  'Bốn tín điều về Đức Mẹ Maria trong Thần học Công giáo?',
  'Mầu nhiệm Thiên Chúa Ba Ngôi trong Kinh Thánh?',
  'Bí tích Hoà Giải (Xưng tội) có nguồn gốc Kinh Thánh thế nào?'
];

export default function CatholicAIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Kính chào quý bạn trong bình an của Chúa Kitô! 

Tôi là **Trợ Lý Thần Học & Kinh Thánh Công Giáo**, được thiết kế để đồng hành cùng bạn học hỏi Lời Chúa, tra cứu Giáo Lý Hội Thánh Công Giáo (GLHTCG) và tìm hiểu các Văn Kiện Huấn Quyền.

Mọi giải thích đều tuân thủ chặt chẽ Truyền Thống Tông Truyền và Chân Lý Mạc Khải. Bạn có thể nhấn vào các câu hỏi gợi ý bên dưới hoặc tự do đặt bất kỳ thắc mắc nào về đức tin.`,
      theologicalTheme: 'Lời Chào Mục Vụ',
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
        body: JSON.stringify({ message: textToSend.trim() })
      });

      if (!res.ok) throw new Error('Lỗi phản hồi từ máy chủ');
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        citations: data.citations,
        theologicalTheme: data.theologicalTheme,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Xin lỗi bạn, hiện tại không thể kết nối tới cơ sở dữ liệu thần học. Vui lòng thử lại sau giây lát.',
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
      personalPrayer: 'Lạy Chúa, xin cho con biết yêu mến Lời Ngài và áp dụng vào đời sống mỗi ngày.',
      dailyResolution: 'Sống Lời Chúa bằng thái độ khiêm nhường và bác ái với tha nhân.',
      tags: ['Học Hỏi Kinh Thánh', 'Thần Học Công Giáo', msg.theologicalTheme || 'Đức Tin']
    });
    setSavedJournalId(msg.id);
    setTimeout(() => setSavedJournalId(null), 2500);
  };

  const handleClearHistory = () => {
    if (confirm('Bạn có muốn làm mới cuộc đối thoại?')) {
      setMessages([messages[0]]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-6 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col space-y-6">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DFC8] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#855D14] mb-1">
              <Link href="/" className="hover:underline">Trang chủ</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Trợ lý Kinh Thánh Công giáo</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1E18] flex items-center gap-2.5">
              <span>Trợ Lý Thần Học & Kinh Thánh</span>
              <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-[#8B1E2D]/10 text-[#8B1E2D] border border-[#8B1E2D]/20">
                Magisterium AI
              </span>
            </h1>
            <p className="text-xs text-[#6D5D55] mt-1">
              Giải thích Kinh Thánh, tra cứu Giáo Lý (GLHTCG) và Văn Kiện Công Đồng trung thành với Huấn Quyền Hội Thánh.
            </p>
          </div>

          <button
            onClick={handleClearHistory}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-[#6D5D55] border border-[#E8DFC8] text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Làm mới
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#855D14] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            Gợi ý câu hỏi thần học phổ biến:
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-left text-xs bg-white hover:bg-[#FAF7F2] text-[#2D1E18] hover:text-[#8B1E2D] border border-[#E8DFC8] hover:border-[#8B1E2D] px-3 py-1.5 rounded-xl transition shadow-sm font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="flex-1 bg-white rounded-3xl border border-[#E8DFC8] shadow-sm p-4 sm:p-6 flex flex-col justify-between space-y-4 min-h-[460px]">
          
          <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[11px] font-bold text-[#855D14]">
                      {isAssistant ? '☩ Trợ Lý Thần Học' : 'Bạn'}
                    </span>
                    <span className="text-[10px] text-[#8D6E63]">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-sm text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-[#FAF7F2] text-[#2D1E18] border border-[#E8DFC8]'
                        : 'bg-[#8B1E2D] text-white'
                    }`}
                  >
                    {/* Thematic Header */}
                    {msg.theologicalTheme && (
                      <div className="mb-2 pb-2 border-b border-[#E8DFC8]/60 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-[#C59B27]" />
                        <span className="text-xs font-bold text-[#855D14]">
                          {msg.theologicalTheme}
                        </span>
                      </div>
                    )}

                    {/* Message Body */}
                    <div className="whitespace-pre-wrap font-serif text-sm sm:text-base leading-relaxed">
                      {msg.text}
                    </div>

                    {/* Citations Badges */}
                    {isAssistant && msg.citations && (
                      <div className="mt-4 pt-3 border-t border-[#E8DFC8] space-y-2">
                        {msg.citations.scripture && msg.citations.scripture.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#8D6E63] uppercase">Kinh Thánh:</span>
                            {msg.citations.scripture.map((sc, i) => (
                              <span key={i} className="text-[11px] font-semibold bg-white text-[#8B1E2D] px-2 py-0.5 rounded border border-[#E8DFC8]">
                                {sc}
                              </span>
                            ))}
                          </div>
                        )}

                        {msg.citations.ccc && msg.citations.ccc.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#8D6E63] uppercase">Giáo Lý (GLHTCG):</span>
                            {msg.citations.ccc.map((c, i) => (
                              <Link
                                key={i}
                                href={`/nghien-cuu?tab=catechism&search=${c}`}
                                className="text-[11px] font-bold bg-[#C59B27]/15 text-[#855D14] hover:bg-[#C59B27]/30 px-2 py-0.5 rounded border border-[#C59B27]/30 transition"
                              >
                                Số {c}
                              </Link>
                            ))}
                          </div>
                        )}

                        {msg.citations.churchDocs && msg.citations.churchDocs.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#8D6E63] uppercase">Văn Kiện:</span>
                            {msg.citations.churchDocs.map((doc, i) => (
                              <Link
                                key={i}
                                href={`/nghien-cuu?tab=church-docs`}
                                className="text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-[#2D1E18] px-2 py-0.5 rounded border border-stone-200 transition"
                              >
                                {doc}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Bar for Assistant Messages */}
                    {isAssistant && (
                      <div className="mt-4 pt-2 flex items-center justify-end gap-2 text-xs">
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1.5 rounded-lg hover:bg-white text-[#6D5D55] transition flex items-center gap-1"
                          title="Sao chép nội dung"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold text-[11px]">Đã sao chép</span>
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
                          className="p-1.5 rounded-lg hover:bg-white text-[#6D5D55] transition flex items-center gap-1"
                          title="Lưu vào Nhật ký thiêng liêng"
                        >
                          {savedJournalId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold text-[11px]">Đã lưu nhật ký</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5 text-[#8B1E2D]" />
                              <span className="text-[11px]">Lưu vào nhật ký</span>
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
              <div className="flex items-center gap-2 text-xs text-[#8D6E63] bg-[#FAF7F2] p-3 rounded-2xl w-fit border border-[#E8DFC8] animate-pulse">
                <Sparkles className="w-4 h-4 text-[#8B1E2D] animate-spin" />
                <span>Đang tra cứu Kinh Thánh, Giáo Lý và Huấn Quyền...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="pt-2 border-t border-[#E8DFC8]">
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
                placeholder="Nhập câu hỏi Kinh Thánh, Giáo Lý, hoặc thắc mắc đức tin..."
                className="flex-1 px-4 py-3 bg-[#FAF7F2] rounded-2xl border border-[#E8DFC8] text-sm text-[#2D1E18] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-5 py-3 rounded-2xl bg-[#8B1E2D] hover:bg-[#701124] disabled:opacity-50 text-white font-semibold text-sm transition shadow-sm flex items-center gap-2"
              >
                <span>Hỏi</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Magisterium Disclaimer Notice */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC8] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#6D5D55]">
          <ShieldCheck className="w-5 h-5 text-[#855D14] shrink-0 mt-0.5" />
          <div>
            <strong>Ghi chú thần học:</strong> Mọi phản hồi đều được đối chiếu với Kinh Thánh Công giáo 73 cuốn, Sách Giáo Lý Hội Thánh Công Giáo (GLHTCG) và các Văn kiện Công đồng Vaticanô II. Đối với các vấn đề lương tâm cá nhân, hôn nhân hoặc mục vụ bí tích cụ thể, người tín hữu luôn cần lắng nghe sự hướng dẫn trực tiếp từ các vị mục tử và linh mục linh hướng của Hội Thánh.
          </div>
        </div>

      </div>
    </div>
  );
}
