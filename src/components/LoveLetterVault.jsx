import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

const LOVE_LETTERS = [
  {
    id: 'stress',
    title: 'When you are stressed or overwhelmed',
    badge: 'Safe Harbor',
    envelopeColor: 'from-rose-500/30 to-pink-500/20',
    borderColor: 'border-pink-500/40',
    seal: '🌸',
    letter: `Take a slow, deep breath, close your eyes, and listen to me:

Nothing happening in this chaotic world is bigger than our peace. You carry so much with so much grace, but you never have to carry it alone. You don't have to be invincible today. 

Drop your shoulders, breathe out the tension, and know that you are deeply loved, unconditionally supported, and fiercely protected. Whenever you are ready, my arms are open, no questions asked. You've got this, and I've got you.`,
  },
  {
    id: 'miss',
    title: 'When you miss me',
    badge: 'Unbroken Orbit',
    envelopeColor: 'from-purple-500/30 to-indigo-500/20',
    borderColor: 'border-purple-500/40',
    seal: '🌌',
    letter: `Look up at the night sky for a second. 

The same stars shining above you are shining above me right now. Distance in miles is completely meaningless against the quantum entanglement of our hearts. 

Whenever you miss me, remember that every beat of my heart is already synchronized with yours. I am counting down the exact seconds until I can hold you in my arms again, look into your eyes, and tell you in person how much you mean to me.`,
  },
  {
    id: 'doubt',
    title: 'When you doubt how beautiful you are',
    badge: 'Eternal Truth',
    envelopeColor: 'from-amber-500/30 to-rose-500/20',
    borderColor: 'border-amber-400/40',
    seal: '✨',
    letter: `I wish you could see yourself through my eyes just for one single second. 

You would see a woman who effortlessly illuminates every room she walks into. You would see the kindness in your eyes that heals my soul, the effortless charm of your laugh, and a radiance that makes all the stars in the universe look dim.

You are breathtaking in your finest dress, and you are even more breathtaking in an oversized hoodie with messy hair on a Sunday morning. Never, ever forget how extraordinary you are.`,
  },
  {
    id: 'laugh',
    title: 'When you need a silly smile',
    badge: 'Pure Joy',
    envelopeColor: 'from-emerald-500/30 to-teal-500/20',
    borderColor: 'border-emerald-400/40',
    seal: '🎈',
    letter: `Official System Telemetry Alert:
Your cuteness levels have officially exceeded the maximum safe limit allowed by cosmic regulations!

I want you to smile right now. Yes, right this second. Even a silly smirk counts. Remember that time we tried cooking and turned the kitchen into a smoke arena? Or when we laughed so hard our stomachs ached? 

Those goofy, unfiltered, utterly chaotic moments with you are my absolute favorite treasures in this existence. Thank you for making my life an endless joyride.`,
  },
  {
    id: 'future',
    title: 'A letter to my future wife, Lechu',
    badge: 'The Eternal Vow',
    envelopeColor: 'from-pink-600/40 to-rose-600/30',
    borderColor: 'border-pink-400/60',
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
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#c084fc'],
    });
  };

  return (
    <div className="relative w-full space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-wider">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>CONFIDENTIAL // FOR HER EYES ONLY</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-white font-display">
          The <span className="font-semibold gradient-text-romantic">"Open When..."</span> Vault
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
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
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleOpenLetter(item, e)}
              className="group relative cursor-pointer"
            >
              {/* Envelope Card */}
              <div
                className={`p-6 rounded-3xl glass-panel-glow border ${item.borderColor} bg-gradient-to-br ${item.envelopeColor} shadow-xl transition-all duration-300 relative overflow-hidden`}
              >
                {/* Envelope Flap Accent Lines */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl filter drop-shadow-md select-none">{item.seal}</span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/10 text-rose-200">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-semibold text-white font-display leading-snug group-hover:text-rose-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300/80 font-light">
                    {isOpened ? 'Letter read • Click to reread' : 'Wax seal unbroken • Click to open'}
                  </p>
                </div>

                {/* Bottom Status Bar */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    <span>{isOpened ? 'Archived' : 'Break Seal'}</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl glass-panel-glow border border-pink-500/40 bg-slate-900/95 p-5 sm:p-8 shadow-2xl space-y-4 my-auto overflow-hidden"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl shrink-0">{activeLetter.seal}</span>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block">
                      {activeLetter.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-medium text-white font-display truncate">
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
              <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 font-serif leading-relaxed text-slate-200 text-xs sm:text-base whitespace-pre-line tracking-wide overflow-y-auto flex-1 custom-scrollbar">
                {activeLetter.letter}
              </div>

              {/* Devotional Signoff */}
              <div className="flex items-center justify-between pt-2 text-[11px] sm:text-xs font-mono text-slate-400 shrink-0">
                <span className="flex items-center gap-1.5 text-rose-300">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-heart-beat" />
                  Written with infinite love by Arjun
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLetter(null)}
                  className="px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-sans transition-colors cursor-pointer"
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
