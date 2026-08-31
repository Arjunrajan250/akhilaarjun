import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Shuffle, ChevronRight, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

const REASONS = [
  "The way your eyes light up whenever you talk about things you love.",
  "How safe and peaceful the entire world feels whenever I'm holding your hand.",
  "Your beautiful, unfiltered laughter that instantly cures any bad day I could ever have.",
  "How deeply you care for people, with a tenderness that inspires me every day.",
  "The adorable face you make when you are concentrating really hard on something.",
  "How you believe in my wildest dreams even before I believe in them myself.",
  "Your warm, reassuring hugs that make all my anxiety dissolve into thin air.",
  "The way we can sit in complete silence together and it still feels like the richest conversation.",
  "How your voice is the sweetest sound in this entire universe.",
  "The goofy inside jokes that only you and I will ever understand.",
  "The way you make ordinary grocery runs and coffee stops feel like grand romantic adventures.",
  "How fiercely loyal, honest, and genuine your heart is.",
  "How you always know what I'm thinking with just a single glance across the room.",
  "The way you gently tuck your cold hands into my pockets on chilly evenings.",
  "How proud I feel every single time I introduce you as my partner.",
  "Because you are not just my greatest love, but my absolute best friend and favorite confidante.",
  "The way you remember the smallest, sweetest details about us.",
  "How you turn any house or place into a peaceful, warm home.",
  "The sparkle in your eyes when we watch the stars or city lights together.",
  "Because choosing you on October 6, 2023 was the greatest, easiest decision of my life.",
];

export default function ReasonsDeck({ herName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const handleNext = () => {
    setIsFlipping(true);
    sound.playChime(659.25, 0.2);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % REASONS.length);
      setIsFlipping(false);
    }, 150);
  };

  const handleShuffle = () => {
    sound.playUnlockChord();
    const next = Math.floor(Math.random() * REASONS.length);
    setCurrentIndex(next);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.5, y: 0.7 },
      colors: ['#ec4899', '#f43f5e', '#fbbf24'],
    });
  };

  const handleLoveReason = (e) => {
    setSavedCount((prev) => prev + 1);
    sound.playChime(784, 0.35, 'sine');
    confetti({
      particleCount: 25,
      spread: 50,
      origin: {
        x: e.clientX ? e.clientX / window.innerWidth : 0.5,
        y: e.clientY ? e.clientY / window.innerHeight : 0.5,
      },
      colors: ['#f43f5e', '#ec4899', '#fda4af'],
    });
  };

  return (
    <div className="relative w-full space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>INFINITE REASONS // DAILY CARD DECK</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-white font-display">
          Why I Love <span className="font-semibold gradient-text-romantic">{herName || 'You'}</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light">
          A continuous deck of heartfelt truths. Draw a card whenever you want a reminder of why you are my whole world.
        </p>
      </div>

      {/* Interactive Card */}
      <div className="max-w-xl mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-pink-500/30 bg-slate-900/80 shadow-2xl relative text-center space-y-6 overflow-hidden"
        >
          {/* Card Top Pill */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
            <span className="flex items-center gap-1.5 text-rose-300">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>REASON #{currentIndex + 1} OF ∞</span>
            </span>
            <span className="text-[11px] text-slate-500">
              Card {currentIndex + 1} / {REASONS.length}
            </span>
          </div>

          {/* Reason Text */}
          <div className="py-6 sm:py-8 px-2">
            <p className="text-lg sm:text-2xl font-light font-display text-white leading-relaxed tracking-wide">
              "{REASONS[currentIndex]}"
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2 flex-col sm:flex-row">
            <button
              type="button"
              onClick={handleLoveReason}
              className="w-full sm:w-auto justify-center flex items-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-medium cursor-pointer transition-all active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Keep in Heart {savedCount > 0 && `(${savedCount})`}</span>
            </button>

            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleShuffle}
                title="Shuffle card"
                aria-label="Shuffle card"
                className="p-3 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex-1 sm:flex-initial justify-center flex items-center gap-1.5 px-5 py-2.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-medium shadow-md shadow-rose-500/20 transition-all cursor-pointer active:scale-95"
              >
                <span>Next Reason</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
