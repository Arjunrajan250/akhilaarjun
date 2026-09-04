import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Feather, Coffee, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

export default function PersonalDevNote({ herName = 'Lechu' }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [loveCount, setLoveCount] = useState(1);

  const handleLoveClick = (e) => {
    setHasLiked(true);
    setLoveCount((prev) => prev + 1);
    haptics.medium();
    sound.playChime(659.25, 0.35, 'sine');
    confetti({
      particleCount: 40,
      spread: 65,
      origin: {
        x: e.clientX ? e.clientX / window.innerWidth : 0.5,
        y: e.clientY ? e.clientY / window.innerHeight : 0.5,
      },
      colors: ['#d96b82', '#e8c99b', '#f5e4cb', '#798cb7'],
    });
  };

  const handleSendHug = () => {
    haptics.success();
    sound.playUnlockChord();
    const msg = encodeURIComponent(`Arjun, I read your personal note on our website... ❤️ Thank you for building this entire world for me. I love you so much! 🫂✨`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  return (
    <section id="devnote" className="relative w-full max-w-4xl mx-auto px-3 sm:px-4 select-none">
      {/* Container Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl p-8 sm:p-12 glass-panel-gold border border-[#e8c99b]/35 bg-[#0b0e18]/95 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-slate-100 overflow-hidden"
      >
        {/* Decorative Washi Tape on top corners */}
        <div className="absolute -top-3 left-10 w-28 h-7 bg-[#e8c99b]/20 border border-[#e8c99b]/40 rotate-[-3deg] backdrop-blur-md rounded shadow-sm pointer-events-none hidden sm:block" />
        <div className="absolute -top-3 right-10 w-28 h-7 bg-[#d96b82]/20 border border-[#d96b82]/40 rotate-[3deg] backdrop-blur-md rounded shadow-sm pointer-events-none hidden sm:block" />

        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#e8c99b]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#d96b82]/10 blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8c99b]/10 border border-[#e8c99b]/25 text-[#f5e4cb] text-xs font-sans tracking-widest uppercase">
            <Feather className="w-3.5 h-3.5 text-[#e8c99b]" />
            <span>A PERSONAL LETTER FROM ARJUN</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-slate-400">
            <Coffee className="w-3.5 h-3.5 text-[#e8c99b]" />
            <span>Handcrafted with late-night coffee & total devotion</span>
          </div>
        </div>

        {/* Main Letter Heading */}
        <h2 className="text-2xl sm:text-4xl font-serif text-white mb-6">
          Why I Built This <span className="italic gradient-text-romantic">For You</span>
        </h2>

        {/* Letter Body */}
        <div className="space-y-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          <p>
            My dearest <strong className="text-[#fcdfe6] font-medium font-serif text-lg">{herName}</strong>,
          </p>

          <p>
            People buy cards that get tucked away in drawers, or flowers that fade after a week. But what you and I have built since <strong className="text-white font-medium">October 6, 2023</strong> is not temporary — it’s a living story that grows richer with every single day.
          </p>

          <p>
            I wanted to create a place that belongs completely to us. A private digital sanctuary where every memory we’ve shared, every inside joke, every song that reminds me of you, and every quiet promise I’ve made in my heart is preserved forever.
          </p>

          <p>
            I spent countless late hours designing every screen, tuning every animation, writing every letter, and coding the heartbeat sensory pulse so that whenever you hold this in your hands, you feel how deeply, fiercely, and endlessly you are loved.
          </p>

          <p>
            You are my greatest peace, my funniest friend, and the absolute love of my life. Thank you for making my existence so beautiful.
          </p>
        </div>

        {/* Handwritten Margin Note */}
        <div className="my-6 p-5 rounded-2xl bg-[#faf7f2]/[0.03] border border-[#e8c99b]/25 text-[#f5e4cb] text-base sm:text-lg font-serif italic leading-snug">
          "P.S. Out of all the multiverses, I would choose you over and over in every single one. ❤️"
        </div>

        {/* Handwritten Signature */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-sans text-slate-400 uppercase tracking-widest block">
              Forever and always yours,
            </span>
            <span className="text-3xl sm:text-4xl font-serif italic text-[#e8c99b] block py-1">
              Arjun
            </span>
            <span className="text-[11px] font-sans text-slate-400 block">
              Written for October 6, 2023 & cherished continuously
            </span>
          </div>

          {/* Interactive Response Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleLoveClick}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#d96b82]/15 hover:bg-[#d96b82]/25 border border-[#d96b82]/35 text-[#fcdfe6] text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-sm"
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-[#d96b82] text-[#d96b82]' : 'text-[#d96b82]'}`} />
              <span>I Love This ({loveCount})</span>
            </button>

            <button
              type="button"
              onClick={handleSendHug}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5.5 py-2.5 rounded-full bg-[#b84760] hover:bg-[#d96b82] text-white text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-lg shadow-[#b84760]/25"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Arjun a Hug 🫂</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
