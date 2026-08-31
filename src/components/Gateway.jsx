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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden select-none">
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
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-indigo-500 blur-3xl opacity-90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative cosmic rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-pink-500/10 animate-[spin_60s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[700px] h-[700px] rounded-full border border-indigo-500/10 border-dashed animate-[spin_90s_linear_infinite_reverse] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel-glow text-center ${
          shake ? 'animate-[shake_0.5s_ease-in-out]' : ''
        }`}
      >
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>TEMPORAL SECURITY PROTOCOL</span>
        </div>

        {/* Lock Icon Emblem */}
        <div className="relative mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-600/20 to-purple-600/30 border border-pink-500/30 flex items-center justify-center shadow-lg shadow-pink-500/10 group">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <KeyRound className="w-9 h-9 text-rose-400 group-hover:rotate-12 transition-transform duration-300" />
          </motion.div>
          <div className="absolute -bottom-2 -right-2 bg-pink-500/20 p-1.5 rounded-full backdrop-blur-md border border-pink-400/40">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          </div>
        </div>

        {/* Header Titles */}
        <h1 className="text-xl sm:text-3xl font-light tracking-wide text-white mb-2 font-display">
          Enter the Day the <span className="font-semibold gradient-text-romantic">Universe Changed</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm font-light mb-6 sm:mb-8 max-w-xs mx-auto leading-relaxed">
          The exact chronological coordinate where our multiverse converged and my life found its architect.
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
            className="w-full glass-input rounded-2xl py-3.5 sm:py-4 px-4 sm:px-6 text-center text-xl sm:text-3xl font-mono tracking-[0.2em] sm:tracking-[0.35em] text-white placeholder:text-slate-600 outline-none focus:border-rose-400/80 transition-all shadow-inner"
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
              className="text-rose-400 text-sm font-medium tracking-wide mb-4 animate-pulse flex items-center justify-center gap-1.5"
            >
              <span>{errorMessage}</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Quick Hint / Assisted Access */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need a memory clue?</span>
          </button>

          <button
            type="button"
            id="quick-unlock-btn"
            onClick={handleQuickUnlock}
            className="inline-flex items-center gap-1 text-rose-400/80 hover:text-rose-300 transition-colors font-medium cursor-pointer"
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
              className="mt-4 p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-rose-200 text-xs text-left leading-relaxed"
            >
              ✨ <strong className="text-white">Coordinate Hint:</strong> Autumn of 2023. October 6th. The beginning of forever. (Type <code className="text-pink-300 font-mono">10-06-2023</code> or <code className="text-pink-300 font-mono">06-10-2023</code>).
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer System Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-xs text-slate-500 font-mono tracking-widest uppercase flex items-center gap-2"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Quantum Encryption: Dedicated to {herName || 'Lechu'}</span>
      </motion.div>
    </div>
  );
}
