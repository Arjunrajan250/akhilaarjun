import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, X, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

const LOVE_LETTERS = [
  {
    id: 'stress',
    title: 'When you are stressed or overwhelmed',
    badge: 'Safe Harbor',
    envelopeColor: 'from-[#d96b82]/20 via-[#121624]/80 to-[#0a0c14]',
    borderColor: 'border-[#d96b82]/30',
    seal: '🌸',
    letter: `Take a slow, deep breath, close your eyes, and listen to me:

Nothing happening in this chaotic world is bigger than our peace. You carry so much with so much grace, but you never have to carry it alone. You don't have to be invincible today. 

Drop your shoulders, breathe out the tension, and know that you are deeply loved, unconditionally supported, and fiercely protected. Whenever you are ready, my arms are open, no questions asked. You've got this, and I've got you.`,
  },
  {
    id: 'miss',
    title: 'When you miss me',
    badge: 'Unbroken Orbit',
    envelopeColor: 'from-[#798cb7]/20 via-[#121624]/80 to-[#0a0c14]',
    borderColor: 'border-[#798cb7]/30',
    seal: '🌌',
    letter: `Look up at the night sky for a second. 

The same stars shining above you are shining above me right now. Distance in miles is completely meaningless against the quantum entanglement of our hearts. 

Whenever you miss me, remember that every beat of my heart is already synchronized with yours. I am counting down the exact seconds until I can hold you in my arms again, look into your eyes, and tell you in person how much you mean to me.`,
  },
  {
    id: 'doubt',
    title: 'When you doubt how beautiful you are',
    badge: 'Eternal Radiance',
    envelopeColor: 'from-[#e8c99b]/20 via-[#121624]/80 to-[#0a0c14]',
    borderColor: 'border-[#e8c99b]/30',
    seal: '✨',
    letter: `I wish you could see yourself through my eyes just for one single second. 

You would see a woman who effortlessly illuminates every room she walks into. You would see the kindness in your eyes that heals my soul, the effortless charm of your laugh, and a radiance that makes all the stars in the universe look dim.

You are breathtaking in your finest dress, and you are even more breathtaking in an oversized hoodie with messy hair on a Sunday morning. Never, ever forget how extraordinary you are.`,
  },
  {
    id: 'laugh',
    title: 'When you need a silly smile',
    badge: 'Pure Joy',
    envelopeColor: 'from-[#c49257]/20 via-[#121624]/80 to-[#0a0c14]',
    borderColor: 'border-[#c49257]/30',
    seal: '🎈',
    letter: `Official System Telemetry Alert:
Your cuteness levels have officially exceeded the maximum safe limit allowed by cosmic regulations!

I want you to smile right now. Yes, right this second. Even a silly smirk counts. Remember that time we tried cooking and turned the kitchen into a smoke arena? Or when we laughed so hard our stomachs ached? 

Those goofy, unfiltered, utterly chaotic moments with you are my absolute favorite treasures in this existence. Thank you for making my life an endless joyride.`,
  },
  {
    id: 'future',
    title: 'A letter to my future wife, Lechu',
    badge: 'The Sacred Vow',
    envelopeColor: 'from-[#b84760]/30 via-[#1a121e]/90 to-[#0a0c14]',
    borderColor: 'border-[#e8c99b]/50',
    seal: '💍',
    letter: `To Lechu, the love of my life, my anchor, and my future wife:

From the moment our timeline converged on October 6, 2023, my soul recognized yours. Every single day with you has confirmed what my heart knew from day one: that loving you, Lechu, is the easiest, most sacred, most purposeful thing I will ever do.

I promise to build a life full of laughter, warmth, security, and boundless adventures. I promise to be your biggest cheerleader when you fly high, and your softest cushion when you need rest. 

I loved you yesterday, I love you today, and I will spend every tomorrow proving it to you over and over again. Forever yours, Arjun.`,
  },
];

export default function LoveLetterVault({ herName }) {
  const [activeLetter, setActiveLetter] = useState(null);
  const [openedLetters, setOpenedLetters] = useState({});

  const handleOpenLetter = (letter, e) => {
    setActiveLetter(letter);
    setOpenedLetters((prev) => ({ ...prev, [letter.id]: true }));
    sound.playUnlockChord();
    confetti({
      particleCount: 45,
      spread: 70,
      origin: {
        x: e.clientX ? e.clientX / window.innerWidth : 0.5,
        y: e.clientY ? e.clientY / window.innerHeight : 0.5,
      },
      colors: ['#d96b82', '#e8c99b', '#f5e4cb', '#798cb7'],
    });
  };

  return (
    <div className="relative w-full space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8c99b]/10 border border-[#e8c99b]/25 text-[#f5e4cb] text-xs font-sans tracking-widest uppercase">
          <Mail className="w-3.5 h-3.5 text-[#e8c99b]" />
          <span>SEALED CORRESPONDENCE • PRIVATE ARCHIVE</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-white">
          The <span className="italic gradient-text-romantic">"Open When..."</span> Vault
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
          Interactive letters sealed with devotion. Click any envelope whenever your heart seeks comfort, truth, or laughter, {herName || 'my love'}.
        </p>
      </div>

      {/* Letters Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {LOVE_LETTERS.map((item) => {
          const isOpened = openedLetters[item.id];
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleOpenLetter(item, e)}
              className="group relative cursor-pointer"
            >
              {/* Envelope Card */}
              <div
                className={`p-7 rounded-3xl glass-panel-glow border ${item.borderColor} bg-gradient-to-br ${item.envelopeColor} shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden`}
              >
                {/* Envelope Flap Accent Lines */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#e8c99b]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl filter drop-shadow-md select-none">{item.seal}</span>
                  <span className="text-[10px] font-sans tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#08090e]/80 border border-[#e8c99b]/20 text-[#f5e4cb]">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-serif font-medium text-white leading-snug group-hover:text-[#fcdfe6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light">
                    {isOpened ? 'Letter opened • Click to read again' : 'Wax seal unbroken • Click to open'}
                  </p>
                </div>

                {/* Bottom Status Bar */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans">
                  <span className="text-[#e8c99b] flex items-center gap-1.5 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-[#d96b82] text-[#d96b82]" />
                    <span>{isOpened ? 'Archived Letter' : 'Break Wax Seal'}</span>
                  </span>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Card Displaying the Opened Letter */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLetter(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#08090e]/90 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl glass-panel-gold border border-[#e8c99b]/35 bg-[#0b0e18]/98 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] space-y-4 my-auto overflow-hidden"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">{activeLetter.seal}</span>
                  <div className="truncate">
                    <span className="text-[10px] font-sans text-[#e8c99b] uppercase tracking-widest block font-medium">
                      {activeLetter.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif text-white truncate">
                      {activeLetter.title}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLetter(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Romantic Letter Text */}
              <div className="p-5 sm:p-7 rounded-2xl bg-[#faf7f2]/[0.03] border border-[#e8c99b]/15 font-serif leading-relaxed text-[#faf7f2] text-sm sm:text-base whitespace-pre-line tracking-wide overflow-y-auto flex-1 custom-scrollbar italic">
                {activeLetter.letter}
              </div>

              {/* Devotional Signoff */}
              <div className="flex items-center justify-between pt-2 text-[11px] sm:text-xs font-sans text-slate-400 shrink-0">
                <span className="flex items-center gap-1.5 text-[#f5e4cb]">
                  <Heart className="w-3.5 h-3.5 fill-[#d96b82] text-[#d96b82] animate-heart-beat" />
                  Written with eternal love by Arjun
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLetter(null)}
                  className="px-4.5 py-1.5 rounded-full bg-[#b84760] hover:bg-[#d96b82] text-white text-xs font-serif tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Keep in Heart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

