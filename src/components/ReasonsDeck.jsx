import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Heart, Shuffle, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

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
  "How you make me want to be the best version of myself every single day.",
  "The peaceful look on your face when you are asleep next to me.",
  "How effortlessly brilliant, witty, and sharp you are in everything you do.",
  "Because out of all the multiverses in infinite space, I got the one with you."
];

function SwipeableCard({ 
  reason, 
  index, 
  total, 
  onSwipeRight, 
  onSwipeLeft 
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.4, 0.9, 1, 0.9, 0.4]);
  
  // Overlay indicators
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nextOpacity = useTransform(x, [-20, -120], [0, 1]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 90 || velocity > 400) {
      haptics.medium();
      onSwipeRight();
    } else if (offset < -90 || velocity < -400) {
      haptics.light();
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
      className="p-7 sm:p-10 rounded-3xl glass-panel-glow border border-pink-500/30 bg-slate-900/90 shadow-2xl relative text-center space-y-6 overflow-hidden cursor-grab touch-pan-y"
    >
      {/* Visual Swipe Stamp Overlays */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-6 right-6 z-20 pointer-events-none px-3 py-1 rounded-xl border-2 border-rose-400 bg-rose-500/30 text-rose-200 font-bold font-display text-sm tracking-wider uppercase rotate-12 shadow-lg"
      >
        ❤️ LOVE THIS
      </motion.div>

      <motion.div
        style={{ opacity: nextOpacity }}
        className="absolute top-6 left-6 z-20 pointer-events-none px-3 py-1 rounded-xl border-2 border-indigo-400 bg-indigo-500/30 text-indigo-200 font-bold font-display text-sm tracking-wider uppercase -rotate-12 shadow-lg"
      >
        💫 NEXT
      </motion.div>

      {/* Card Top Pill */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
        <span className="flex items-center gap-1.5 text-rose-300">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
          <span>REASON #{index + 1} OF ∞</span>
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          {index + 1} / {total}
        </span>
      </div>

      {/* Reason Text */}
      <div className="py-6 sm:py-8 px-2">
        <p className="text-lg sm:text-2xl font-light font-display text-white leading-relaxed tracking-wide">
          "{reason}"
        </p>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
        <span className="flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Swipe Left (Next)
        </span>
        <span>•</span>
        <span className="flex items-center gap-1 text-rose-400">
          Swipe Right (Love) <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

export default function ReasonsDeck({ herName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const handleNext = () => {
    haptics.light();
    sound.playChime(659.25, 0.2);
    setCurrentIndex((prev) => (prev + 1) % REASONS.length);
  };

  const handleSwipeRight = () => {
    setSavedCount((prev) => prev + 1);
    sound.playChime(784, 0.35, 'sine');
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.7, y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24'],
    });
    setCurrentIndex((prev) => (prev + 1) % REASONS.length);
  };

  const handleShuffle = () => {
    haptics.medium();
    sound.playUnlockChord();
    const next = Math.floor(Math.random() * REASONS.length);
    setCurrentIndex(next);
    confetti({
      particleCount: 35,
      spread: 65,
      origin: { x: 0.5, y: 0.7 },
      colors: ['#ec4899', '#f43f5e', '#fbbf24'],
    });
  };

  const handleLoveReason = (e) => {
    setSavedCount((prev) => prev + 1);
    haptics.medium();
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
          <span>INFINITE REASONS // SWIPEABLE DECK</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-white font-display">
          Why I Love <span className="font-semibold gradient-text-romantic">{herName || 'You'}</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light">
          Swipe cards left or right just like a deck of heartfelt truths. Draw whenever you want a reminder of why you are my whole world.
        </p>
      </div>

      {/* Interactive Swipeable Card Area */}
      <div className="max-w-xl mx-auto px-2">
        <AnimatePresence mode="wait">
          <SwipeableCard
            key={currentIndex}
            reason={REASONS[currentIndex]}
            index={currentIndex}
            total={REASONS.length}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleNext}
          />
        </AnimatePresence>

        {/* Action Controls Bar Below Card */}
        <div className="flex items-center justify-between mt-5 gap-2 flex-col sm:flex-row">
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
      </div>
    </div>
  );
}
