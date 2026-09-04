import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Sparkles, Heart, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Gateway({ onUnlock, herName }) {
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  // Normalize date string (strip separators)
  const normalize = (val) => val.replace(/[^0-9]/g, '');

  const handleInputChange = (e) => {
    let val = e.target.value;
    // Auto format MM-DD-YYYY or DD-MM-YYYY
    const digits = normalize(val);
    if (digits.length <= 8) {
      if (digits.length > 4) {
        val = `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
      } else if (digits.length > 2) {
        val = `${digits.slice(0, 2)}-${digits.slice(2, 4)}`;
      } else {
        val = digits;
      }
    }
    setDate(val);
    setError(false);

    // Check validity on 10 characters: 10-06-2023 or 06-10-2023
    if (val === '10-06-2023' || val === '06-10-2023') {
      triggerUnlock();
    } else if (val.length >= 10) {
      setError(true);
      setErrorMessage("That wasn't the day... try again ❤️");
      setShake(true);
      sound.playChime(220, 0.4, 'triangle');
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  const triggerUnlock = () => {
    sound.playUnlockChord();
    setIsWarping(true);
    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  const handleQuickUnlock = () => {
    setDate('10-06-2023');
    triggerUnlock();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden select-none bg-[#08090e]">
      {/* Warp overlay on successful unlock */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#e8c99b] via-[#d96b82] to-[#798cb7] blur-3xl opacity-90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative celestial starlight rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-[#e8c99b]/10 animate-[spin_60s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[700px] h-[700px] rounded-full border border-[#d96b82]/10 border-dashed animate-[spin_90s_linear_infinite_reverse] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel-glow text-center border border-[#e8c99b]/20 shadow-2xl ${
          shake ? 'animate-[shake_0.5s_ease-in-out]' : ''
        }`}
      >
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8c99b]/15 border border-[#e8c99b]/30 text-[#e8c99b] text-xs font-medium tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#e8c99b] animate-pulse" />
          <span>A PRIVATE SANCTUARY FOR US</span>
        </div>

        {/* Lock Icon Emblem */}
        <div className="relative mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1e1927] to-[#2b2131] border border-[#e8c99b]/30 flex items-center justify-center shadow-xl shadow-black/60 group">
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
          >
            <KeyRound className="w-9 h-9 text-[#e8c99b] group-hover:rotate-12 transition-transform duration-300" />
          </motion.div>
          <div className="absolute -bottom-2 -right-2 bg-[#d96b82]/30 p-1.5 rounded-full backdrop-blur-md border border-[#d96b82]/50">
            <Heart className="w-3.5 h-3.5 text-[#d96b82] fill-[#d96b82]" />
          </div>
        </div>

        {/* Header Titles */}
        <h1 className="text-xl sm:text-3xl font-light tracking-wide text-[#faf7f2] mb-2 font-display">
          The Day My World <span className="font-semibold gradient-text-champagne">Changed Forever</span>
        </h1>
        <p className="text-slate-300/85 text-xs sm:text-sm font-light mb-6 sm:mb-8 max-w-xs mx-auto leading-relaxed">
          Enter the date when our story began and you became my favorite part of life.
        </p>

        {/* Temporal Input */}
        <div className="relative mb-5 sm:mb-6">
          <input
            id="temporal-date-input"
            type="text"
            inputMode="numeric"
            autoFocus
            maxLength={10}
            value={date}
            onChange={handleInputChange}
            placeholder="MM-DD-YYYY"
            className="w-full glass-input rounded-2xl py-3.5 sm:py-4 px-4 sm:px-6 text-center text-xl sm:text-3xl font-mono tracking-[0.2em] sm:tracking-[0.35em] text-[#faf7f2] placeholder:text-slate-600 outline-none focus:border-[#e8c99b]/80 transition-all shadow-inner"
          />
          <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 opacity-40" />
          </div>
        </div>

        {/* Error Notification */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-[#e08599] text-sm font-medium tracking-wide mb-4 animate-pulse flex items-center justify-center gap-1.5"
            >
              <span>{errorMessage}</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Quick Hint / Assisted Access */}
        <div className="flex items-center justify-between pt-4 border-t border-white/8 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#e8c99b] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need a clue?</span>
          </button>

          <button
            type="button"
            id="quick-unlock-btn"
            onClick={handleQuickUnlock}
            className="inline-flex items-center gap-1 text-[#e8c99b] hover:text-[#faf7f2] transition-colors font-medium cursor-pointer"
          >
            <span>Oct 6, 2023</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Memory Clue Expanded */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3.5 rounded-xl bg-[#e8c99b]/10 border border-[#e8c99b]/25 text-[#f3e8d0] text-xs text-left leading-relaxed"
            >
              ✨ <strong className="text-white">Clue:</strong> October 6th, 2023. The start of everything. (Type <code className="text-[#e8c99b] font-mono">10-06-2023</code> or <code className="text-[#e8c99b] font-mono">06-10-2023</code>).
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer System Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-xs text-slate-400 font-mono tracking-widest uppercase flex items-center gap-2"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#e8c99b]" />
        <span>Handcrafted with all my love for {herName || 'Lechu'}</span>
      </motion.div>
    </div>
  );
}
