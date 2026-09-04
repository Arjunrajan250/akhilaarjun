import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  X, 
  Award, 
  Send,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

export default function SecretVaultModal({ isOpen, onClose, herName = 'Lechu' }) {

  const handleCelebrate = () => {
    haptics.success();
    sound.playUnlockChord();
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#38bdf8', '#c084fc'],
    });
  };

  const handleSendWhisper = () => {
    haptics.medium();
    sound.playChime(784, 0.35, 'sine');
    const message = encodeURIComponent(`I found your secret Easter Egg Vault on our website! 🔐✨ I love you so much Arjun! ❤️`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-slate-950/95 border border-pink-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(244,63,94,0.3)] text-white max-h-[92vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close secret vault"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Header Badge */}
          <div className="text-center space-y-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>CLASSIFIED QUANTUM ARCHIVE // UNLOCKED</span>
            </div>

            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 to-amber-500 p-0.5 shadow-xl shadow-pink-500/30 flex items-center justify-center">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                <Heart className="w-8 h-8 text-rose-400 fill-rose-500 animate-heart-beat" />
              </div>
            </div>

            <h2 className="text-xl sm:text-3xl font-light font-display text-white">
              You Found Arjun’s <span className="font-semibold gradient-text-romantic">Deepest Secret</span>
            </h2>
            <p className="text-xs text-rose-300 font-mono">
              Authentication Verified: Dedicated to {herName}
            </p>
          </div>

          {/* Secret Confession Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-pink-950/40 via-slate-900/90 to-purple-950/40 border border-pink-500/30 space-y-4 text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
            <p>
              "If I had to live a thousand lifetimes across a thousand different galaxies, in every single one, I would still search the universe just to find you all over again."
            </p>
            <p>
              "You are not just my greatest love; you are my greatest blessing, my safe harbor, and the brightest light in my life. Loving you is the easiest, most natural thing I have ever done."
            </p>
            <p className="text-rose-300 font-serif italic text-right pt-2 border-t border-white/10">
              — Forever & Eternally Yours, Arjun ❤️
            </p>
          </div>

          {/* Digital Certificate of Eternal Love */}
          <div className="mt-5 p-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-300 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-amber-200 block font-display">
                Certified Sole Owner of Arjun’s Heart
              </span>
              <span className="text-slate-300 text-[11px]">
                Valid for: Infinity & Beyond // Zero Expiration Date
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={handleCelebrate}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-medium shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Celebrate With Confetti</span>
            </button>

            <button
              type="button"
              onClick={handleSendWhisper}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-rose-200 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Whisper to Arjun 💬</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
