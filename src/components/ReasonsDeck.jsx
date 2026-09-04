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
  const rotate = useTransform(x, [-200, 200], [-16, 16]);
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
      whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
      className="p-8 sm:p-11 rounded-3xl glass-panel-glow border border-[#e8c99b]/25 bg-[#0e121d]/95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative text-center space-y-6 overflow-hidden cursor-grab touch-pan-y"
    >
      {/* Visual Swipe Stamp Overlays */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-6 right-6 z-20 pointer-events-none px-3.5 py-1.5 rounded-xl border border-[#d96b82] bg-[#d96b82]/20 text-[#fcdfe6] font-serif text-sm tracking-wider uppercase rotate-12 shadow-lg backdrop-blur-md"
      >
        ✦ ADORE THIS
      </motion.div>

      <motion.div
        style={{ opacity: nextOpacity }}
        className="absolute top-6 left-6 z-20 pointer-events-none px-3.5 py-1.5 rounded-xl border border-[#798cb7] bg-[#798cb7]/20 text-[#e0e7ff] font-serif text-sm tracking-wider uppercase -rotate-12 shadow-lg backdrop-blur-md"
      >
        ✦ NEXT
      </motion.div>

      {/* Card Top Pill */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
        <span className="flex items-center gap-1.5 text-[#e8c99b]">
          <Heart className="w-3.5 h-3.5 fill-[#d96b82] text-[#d96b82] animate-pulse" />
          <span className="font-sans font-medium tracking-wide uppercase text-[11px] text-[#f5e4cb]">REASON #{index + 1} OF ∞</span>
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          {index + 1} / {total}
        </span>
      </div>

      {/* Reason Text */}
      <div className="py-6 sm:py-9 px-2">
        <p className="text-xl sm:text-2xl font-serif text-[#faf7f2] leading-relaxed tracking-wide italic font-normal">
          "{reason}"
        </p>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex items-center justify-center gap-4 text-[11px] font-sans text-slate-400 pt-3 border-t border-white/5">
        <span className="flex items-center gap-1">
          <ArrowLeft className="w-3 h-3 text-[#798cb7]" /> Swipe Left (Next)
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1 text-[#e8c99b]">
          Swipe Right (Love) <ArrowRight className="w-3 h-3 text-[#d96b82]" />
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
      colors: ['#d96b82', '#e8c99b', '#f5e4cb', '#798cb7'],
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
      colors: ['#d96b82', '#e8c99b', '#f5e4cb', '#c49257'],
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
      colors: ['#d96b82', '#e8c99b', '#fcdfe6', '#b84760'],
    });
  };

  return (
    <div className="relative w-full space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8c99b]/10 border border-[#e8c99b]/25 text-[#f5e4cb] text-xs font-sans tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#e8c99b] animate-pulse" />
          <span>ENDLESS DEVOTION • CARD DECK</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-white">
          Why I Love <span className="italic gradient-text-romantic">{herName || 'You'}</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
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
            className="w-full sm:w-auto justify-center flex items-center gap-1.5 px-4.5 py-2.5 sm:py-2 rounded-full bg-[#d96b82]/15 hover:bg-[#d96b82]/25 border border-[#d96b82]/35 text-[#fcdfe6] text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 fill-[#d96b82] text-[#d96b82]" />
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
              <Shuffle className="w-4 h-4 text-[#e8c99b]" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 sm:flex-initial justify-center flex items-center gap-1.5 px-5.5 py-2.5 sm:py-2 rounded-full bg-[#b84760] hover:bg-[#d96b82] text-white text-xs font-medium shadow-md shadow-[#b84760]/25 transition-all cursor-pointer active:scale-95"
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

