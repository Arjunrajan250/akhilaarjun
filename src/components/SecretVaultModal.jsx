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
      colors: ['#d96b82', '#e8c99b', '#f5e4cb', '#798cb7'],
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#08090e]/90 backdrop-blur-2xl overflow-y-auto">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#0b0e18]/98 border border-[#e8c99b]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] text-white max-h-[92vh] overflow-y-auto"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8c99b]/10 border border-[#e8c99b]/30 text-[#f5e4cb] text-xs font-sans tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#e8c99b] animate-pulse" />
              <span>SACRED HEART SANCTUARY • UNLOCKED</span>
            </div>

            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#b84760] to-[#e8c99b] p-0.5 shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-2xl bg-[#08090e] flex items-center justify-center">
                <Heart className="w-8 h-8 text-[#d96b82] fill-[#d96b82] animate-heart-beat" />
              </div>
            </div>

            <h2 className="text-xl sm:text-3xl font-serif text-white">
              You Found Arjun’s <span className="italic gradient-text-romantic">Deepest Secret</span>
            </h2>
            <p className="text-xs text-[#f5e4cb] font-sans font-medium">
              Sanctuary Verified • Dedicated Exclusively to {herName}
            </p>
          </div>

          {/* Secret Confession Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#faf7f2]/[0.03] border border-[#e8c99b]/25 space-y-4 text-xs sm:text-sm text-[#faf7f2] font-serif leading-relaxed italic">
            <p>
              "If I had to live a thousand lifetimes across a thousand different galaxies, in every single one, I would still search the universe just to find you all over again."
            </p>
            <p>
              "You are not just my greatest love; you are my greatest blessing, my safe harbor, and the brightest light in my life. Loving you is the easiest, most natural thing I have ever done."
            </p>
            <p className="text-[#e8c99b] font-serif text-right pt-2 border-t border-white/10 not-italic font-medium">
              — Forever & Eternally Yours, Arjun ❤️
            </p>
          </div>

          {/* Digital Certificate of Eternal Love */}
          <div className="mt-5 p-4 rounded-2xl border border-[#e8c99b]/30 bg-[#e8c99b]/10 flex items-center gap-3">
            <Award className="w-8 h-8 text-[#e8c99b] shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-[#f5e4cb] block font-serif text-sm">
                Certified Sole Owner of Arjun’s Heart
              </span>
              <span className="text-slate-400 text-[11px] font-sans">
                Valid for: Infinity & Beyond • Zero Expiration Date
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={handleCelebrate}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#b84760] hover:bg-[#d96b82] text-white text-xs font-medium shadow-lg shadow-[#b84760]/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Celebrate With Stardust</span>
            </button>

            <button
              type="button"
              onClick={handleSendWhisper}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-[#e8c99b]/25 text-[#f5e4cb] text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
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
