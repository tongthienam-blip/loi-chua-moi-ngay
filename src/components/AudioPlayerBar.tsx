'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Volume2, X, FastForward, RotateCcw } from 'lucide-react';
import { AudioSpeechService } from '@/lib/bible-store';

interface AudioPlayerBarProps {
  title: string;
  passageText: string;
  onClose?: () => void;
}

export function AudioPlayerBar({ title, passageText, onClose }: AudioPlayerBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);

  useEffect(() => {
    // Tự động phát khi mở thanh nghe
    handlePlay();
    return () => {
      AudioSpeechService.stop();
    };
  }, [passageText]);

  const handlePlay = () => {
    if (isPaused) {
      AudioSpeechService.resume();
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      AudioSpeechService.speak(
        passageText,
        speed,
        () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
        () => {
          setIsPlaying(false);
          setIsPaused(false);
        }
      );
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    AudioSpeechService.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    AudioSpeechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const cycleSpeed = () => {
    const speeds = [0.8, 1.0, 1.2, 1.5];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setSpeed(newSpeed);
    if (isPlaying) {
      AudioSpeechService.speak(
        passageText,
        newSpeed,
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <div className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-[450px] z-50 bg-[#2D1E18] text-white p-4 rounded-2xl shadow-sacred-lg border border-[#C59B27]/40 backdrop-blur-md animate-fade-in">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 truncate">
          <Volume2 className="w-5 h-5 text-[#C59B27] shrink-0 animate-pulse" />
          <span className="font-serif text-sm font-semibold truncate text-[#F5EBE6]">
            {title}
          </span>
        </div>
        {onClose && (
          <button
            onClick={() => {
              handleStop();
              onClose();
            }}
            className="p-1 rounded-lg hover:bg-white/10 text-stone-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="w-10 h-10 rounded-full bg-[#C59B27] hover:bg-[#D4AF37] text-[#2D1E18] flex items-center justify-center transition shadow-md"
              title="Tạm dừng"
            >
              <Pause className="w-5 h-5 fill-current" />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="w-10 h-10 rounded-full bg-[#C59B27] hover:bg-[#D4AF37] text-[#2D1E18] flex items-center justify-center transition shadow-md"
              title="Phát âm thanh"
            >
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </button>
          )}

          <button
            onClick={handleStop}
            className="p-2 rounded-xl hover:bg-white/10 text-stone-300 transition"
            title="Dừng hẳn"
          >
            <Square className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              handleStop();
              setTimeout(handlePlay, 100);
            }}
            className="p-2 rounded-xl hover:bg-white/10 text-stone-300 transition"
            title="Nghe lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={cycleSpeed}
          className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#FBF4E2] transition flex items-center gap-1 border border-white/10"
        >
          <FastForward className="w-3 h-3 text-[#C59B27]" />
          {speed}x
        </button>
      </div>
    </div>
  );
}
