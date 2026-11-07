'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Square,
  Volume2,
  X,
  FastForward,
  RotateCcw,
  Sparkles,
  Radio,
  Loader2,
  VolumeX,
} from 'lucide-react';
import { AudioSpeechService } from '@/lib/bible-store';

interface AudioPlayerBarProps {
  title: string;
  passageText: string;
  onClose?: () => void;
}

export function AudioPlayerBar({ title, passageText, onClose }: AudioPlayerBarProps) {
  // Chế độ giọng đọc: 'ai' (AI tiếng Việt tự nhiên) hoặc 'browser' (Web Speech API)
  const [engine, setEngine] = useState<'ai' | 'browser'>('ai');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speed, setSpeed] = useState<number>(0.9); // 0.9x: Chuẩn Phụng Vụ trang nghiêm
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioBlobUrlRef = useRef<string | null>(null);
  const activeTextRef = useRef<string>('');

  // Dọn dẹp văn bản trước khi đọc
  const cleanedText = AudioSpeechService.cleanText(passageText);

  // Khởi tạo HTML5 Audio Element cho Giọng AI
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      // Nếu lỗi mạng khi nạp audio AI, tự động chuyển sang Web Speech API
      setErrorMessage('Chuyển sang giọng đọc trình duyệt...');
      setTimeout(() => {
        setErrorMessage(null);
        setEngine('browser');
      }, 1500);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      if (audioBlobUrlRef.current) {
        URL.revokeObjectURL(audioBlobUrlRef.current);
      }
      AudioSpeechService.stop();
    };
  }, []);

  // Tự động phát khi passageText thay đổi
  useEffect(() => {
    if (!cleanedText) return;
    activeTextRef.current = cleanedText;
    startPlayback(engine, cleanedText, speed);
  }, [passageText]);

  // Cập nhật tốc độ đọc khi speed thay đổi
  useEffect(() => {
    if (audioRef.current && engine === 'ai') {
      audioRef.current.playbackRate = speed;
    }
  }, [speed, engine]);

  // Bắt đầu phát âm thanh
  const startPlayback = async (targetEngine: 'ai' | 'browser', text: string, currentSpeed: number) => {
    if (!text.trim()) return;
    setErrorMessage(null);

    if (targetEngine === 'ai') {
      // Dừng Web Speech nếu đang nói
      AudioSpeechService.stop();

      try {
        setIsLoading(true);
        setIsPlaying(true);

        // Gọi API TTS tiếng Việt tự nhiên
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (!res.ok) {
          throw new Error('Không thể tải giọng AI từ máy chủ');
        }

        const blob = await res.blob();
        if (audioBlobUrlRef.current) {
          URL.revokeObjectURL(audioBlobUrlRef.current);
        }
        const blobUrl = URL.createObjectURL(blob);
        audioBlobUrlRef.current = blobUrl;

        if (audioRef.current) {
          audioRef.current.src = blobUrl;
          audioRef.current.playbackRate = currentSpeed;
          await audioRef.current.play();
          setIsLoading(false);
          setIsPlaying(true);
        }
      } catch (err) {
        console.warn('[AudioPlayerBar] Lỗi phát AI TTS, chuyển sang Web Speech:', err);
        setIsLoading(false);
        setEngine('browser');
        playBrowserSpeech(text, currentSpeed);
      }
    } else {
      // Dừng HTML5 Audio nếu đang phát
      if (audioRef.current) {
        audioRef.current.pause();
      }
      playBrowserSpeech(text, currentSpeed);
    }
  };

  const playBrowserSpeech = (text: string, currentSpeed: number) => {
    setIsLoading(false);
    setIsPlaying(true);
    AudioSpeechService.speak(
      text,
      currentSpeed,
      () => {
        setIsPlaying(false);
      },
      () => {
        setIsPlaying(false);
      }
    );
  };

  const handleTogglePlay = () => {
    if (engine === 'ai') {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (!audioRef.current.src && cleanedText) {
          startPlayback('ai', cleanedText, speed);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } else {
      if (isPlaying) {
        AudioSpeechService.pause();
        setIsPlaying(false);
      } else {
        if (AudioSpeechService.isSpeaking()) {
          AudioSpeechService.resume();
          setIsPlaying(true);
        } else {
          playBrowserSpeech(cleanedText, speed);
        }
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    AudioSpeechService.stop();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleRestart = () => {
    if (engine === 'ai') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        startPlayback('ai', cleanedText, speed);
      }
    } else {
      AudioSpeechService.stop();
      playBrowserSpeech(cleanedText, speed);
    }
  };

  const handleSwitchEngine = (newEngine: 'ai' | 'browser') => {
    if (newEngine === engine) return;
    handleStop();
    setEngine(newEngine);
    startPlayback(newEngine, cleanedText, speed);
  };

  const cycleSpeed = () => {
    const speeds = [0.8, 0.9, 1.0, 1.2];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setSpeed(newSpeed);

    if (engine === 'ai' && audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    } else if (engine === 'browser' && isPlaying) {
      AudioSpeechService.stop();
      playBrowserSpeech(cleanedText, newSpeed);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (engine !== 'ai' || !audioRef.current || !duration) return;
    const target = parseFloat(e.target.value);
    audioRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      role="region"
      aria-label="Trình phát âm thanh Lời Chúa"
      className="fixed bottom-16 md:bottom-6 left-3 right-3 md:left-auto md:right-8 md:w-[480px] z-50 bg-gradient-to-b from-[#2A1C16] to-[#1A100C] text-white p-4 rounded-2xl shadow-2xl border border-[#C59B27]/50 backdrop-blur-md animate-fade-in transition-all"
    >
      {/* Tiêu đề & Nút đóng */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center shrink-0">
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-[#C59B27] animate-spin" />
            ) : (
              <Volume2 className={`w-4 h-4 text-[#C59B27] ${isPlaying ? 'animate-pulse' : ''}`} />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-serif text-sm font-semibold truncate text-[#FBF4E2] tracking-wide">
              {title}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-200/80">
              {engine === 'ai' ? (
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Sparkles className="w-3 h-3" /> Giọng AI Truyền Cảm (Chuẩn VN)
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-300 font-medium">
                  <Radio className="w-3 h-3" /> Giọng Trình Duyệt (Web Speech)
                </span>
              )}
            </div>
          </div>
        </div>

        {onClose && (
          <button
            onClick={() => {
              handleStop();
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white transition shrink-0"
            title="Đóng thanh nghe"
            aria-label="Đóng thanh nghe"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Thông báo lỗi nhẹ (nếu có) */}
      {errorMessage && (
        <div className="mb-2 px-2.5 py-1 rounded bg-amber-500/20 text-amber-200 text-xs border border-amber-500/30">
          {errorMessage}
        </div>
      )}

      {/* Thanh tiến độ cho Giọng AI */}
      {engine === 'ai' && (
        <div className="mb-3 space-y-1">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              disabled={isLoading || duration === 0}
              aria-label="Thanh tua âm thanh Lời Chúa"
              className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#C59B27] disabled:opacity-50"
            />
          </div>
          <div className="flex justify-between text-[10px] text-stone-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{isLoading ? 'Đang chuẩn bị giọng đọc...' : formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Sóng âm thanh sinh động khi đang phát giọng browser */}
      {engine === 'browser' && isPlaying && (
        <div className="flex items-center justify-center gap-1 py-1.5 mb-2">
          <div className="w-1 bg-[#C59B27] h-3 animate-pulse rounded-full" />
          <div className="w-1 bg-[#D4AF37] h-5 animate-pulse delay-75 rounded-full" />
          <div className="w-1 bg-[#FBF4E2] h-4 animate-pulse delay-150 rounded-full" />
          <div className="w-1 bg-[#D4AF37] h-6 animate-pulse delay-100 rounded-full" />
          <div className="w-1 bg-[#C59B27] h-3 animate-pulse rounded-full" />
          <span className="text-[11px] text-stone-300 ml-2 font-serif italic">Đang suy niệm cùng Lời Chúa...</span>
        </div>
      )}

      {/* Bộ điều khiển phát & Chọn giọng & Tốc độ */}
      <div className="flex items-center justify-between pt-1 gap-2 border-t border-white/10">
        {/* Nút Play/Pause & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            disabled={isLoading}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#C59B27] to-[#D4AF37] hover:brightness-110 text-[#2D1E18] flex items-center justify-center transition shadow-lg shadow-black/40 disabled:opacity-50 shrink-0"
            title={isPlaying ? 'Tạm dừng' : 'Phát âm thanh'}
            aria-label={isPlaying ? 'Tạm dừng' : 'Phát âm thanh'}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={handleStop}
            className="p-2 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white transition"
            title="Dừng hẳn"
            aria-label="Dừng hẳn"
          >
            <Square className="w-4 h-4" />
          </button>

          <button
            onClick={handleRestart}
            className="p-2 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white transition"
            title="Nghe lại từ đầu"
            aria-label="Nghe lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Chuyển đổi Giọng AI vs Giọng Trình Duyệt & Chỉnh tốc độ */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="inline-flex rounded-lg bg-black/40 p-0.5 border border-white/10 text-xs">
            <button
              onClick={() => handleSwitchEngine('ai')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition flex items-center gap-1 ${
                engine === 'ai'
                  ? 'bg-[#C59B27] text-[#1A100C] font-semibold shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Giọng AI tiếng Việt tự nhiên, không bao giờ lỗi tiếng Anh"
            >
              <Sparkles className="w-3 h-3" />
              AI
            </button>
            <button
              onClick={() => handleSwitchEngine('browser')}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition flex items-center gap-1 ${
                engine === 'browser'
                  ? 'bg-[#C59B27] text-[#1A100C] font-semibold shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Giọng đọc từ trình duyệt Web Speech API"
            >
              Máy
            </button>
          </div>

          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#FBF4E2] transition flex items-center gap-1 border border-white/10"
            title={`Tốc độ đọc: ${speed}x (Bấm để thay đổi: 0.8x, 0.9x Phụng Vụ, 1.0x, 1.2x)`}
          >
            <FastForward className="w-3 h-3 text-[#C59B27]" />
            {speed}x
          </button>
        </div>
      </div>
    </div>
  );
}
