import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Copy, 
  ShieldCheck, 
  Heart, 
  BookmarkCheck,
  Sparkles,
  Scroll
} from 'lucide-react';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

export default function SystemVows({ herName = 'Lechu', daysTogether = 0 }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('vows');

  const cornerstones = [
    { key: 'Where My Heart Rests', value: "Completely in Lechu's Hands" },
    { key: 'Genesis of My Happiness', value: 'October 6, 2023 (The day you walked in)' },
    { key: 'Days of Unbroken Love', value: `${daysTogether} Continuous Days & Counting` },
    { key: 'My State of Mind', value: `Infinitely in love with ${herName}` },
    { key: 'Our Shared Priority', value: 'Building a home of peace, warmth, and laughter' },
    { key: 'Safe Harbor Vow', value: 'You will never have to face a hard day alone' },
    { key: 'My Daily Promise', value: 'To listen, understand, and choose you every single day' },
    { key: 'The Future Horizon', value: 'Hand in hand through every adventure life brings' },
  ];

  const personalVows = [
    {
      num: '01',
      title: 'The Vow of Safe Harbor',
      content:
        'I vow to build a life where you never have to doubt your worth, your beauty, or your place in my heart. My arms will forever be the sanctuary where you can take off the weight of the world, drop your shoulders, and breathe easily.',
    },
    {
      num: '02',
      title: 'The Vow of Unwavering Support',
      content:
        'Just as you are the architect of my peace and my greatest believer, I will champion every dream you have. I will celebrate your victories, hold you through your struggles, and believe in you even when you feel tired.',
    },
    {
      num: '03',
      title: 'The Vow of Patience and Grace',
      content:
        'When difficult or stressful days arrive, I will listen before speaking, seek to understand before defending, and choose kindness and patience over pride. What we have built is sacred, and nothing will ever shake our foundation.',
    },
    {
      num: '04',
      title: 'The Vow of Eternity',
      content:
        'To cherish you when you are joyful, to comfort you when you are tired, and to look into your eyes decades from now with the exact same butterflies, awe, and deep gratitude as the day our story began on October 6, 2023.',
    },
  ];

  const handleCopy = () => {
    const textToCopy = cornerstones.map((s) => `${s.key}: ${s.value}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    haptics.light();
    sound.playChime(660, 0.4, 'sine');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full space-y-8 select-none">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8c99b]/10 border border-[#e8c99b]/25 text-[#f5e4cb] text-xs font-sans tracking-widest uppercase">
          <Scroll className="w-3.5 h-3.5 text-[#e8c99b]" />
          <span>LIFETIME PROMISES & COMMITMENTS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-white">
          My Vows <span className="italic gradient-text-romantic">To You</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
          Written from the bottom of my heart for {herName || 'Lechu'}, my greatest blessing and future wife.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-md mx-auto">
        <button
          onClick={() => {
            setActiveTab('vows');
            haptics.light();
            sound.playChime(550, 0.2);
          }}
          className={`flex-1 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer text-center active:scale-95 ${
            activeTab === 'vows'
              ? 'bg-[#b84760] text-white shadow-lg shadow-[#b84760]/25'
              : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
          }`}
        >
          My Personal Vows
        </button>
        <button
          onClick={() => {
            setActiveTab('specs');
            haptics.light();
            sound.playChime(440, 0.2);
          }}
          className={`flex-1 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer text-center active:scale-95 ${
            activeTab === 'specs'
              ? 'bg-[#b84760] text-white shadow-lg shadow-[#b84760]/25'
              : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
          }`}
        >
          The Cornerstones of Us
        </button>
      </div>

      {/* Content Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'vows' ? (
          <motion.div
            key="vows"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {personalVows.map((vow, idx) => (
              <motion.div
                key={vow.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 sm:p-7 rounded-3xl glass-panel-glow border border-[#e8c99b]/20 bg-[#0e121d]/90 space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#f5e4cb] font-serif font-medium text-base sm:text-lg">
                    <span className="w-6 h-6 rounded-full bg-[#d96b82]/15 border border-[#d96b82]/30 text-[#fcdfe6] text-xs flex items-center justify-center font-mono">
                      {vow.num}
                    </span>
                    <h4>{vow.title}</h4>
                  </div>
                  <Heart className="w-4 h-4 text-[#d96b82]/70 fill-[#d96b82]/20" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed pl-8">
                  {vow.content}
                </p>
              </motion.div>
            ))}

            <div className="p-7 sm:p-8 rounded-3xl glass-panel-gold border border-[#e8c99b]/35 text-center space-y-3 bg-[#111422]/95 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Heart className="w-7 h-7 text-[#d96b82] fill-[#d96b82] mx-auto animate-heart-beat" />
              <h3 className="text-lg sm:text-xl font-serif text-[#f5e4cb]">
                To My Beloved {herName || 'Lechu'}
              </h3>
              <p className="text-xs sm:text-sm text-[#faf7f2]/90 italic max-w-xl mx-auto leading-relaxed font-serif">
                "I promise you a lifetime of warmth, goofy laughter, quiet security, and unwavering devotion. You are my home, today and forever."
              </p>
              <span className="text-2xl sm:text-3xl font-serif italic text-[#e8c99b] block pt-2">
                Forever Yours, Arjun
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto rounded-3xl glass-panel-gold border border-[#e8c99b]/25 overflow-hidden shadow-2xl bg-[#0a0c14]/95"
          >
            {/* Header Bar */}
            <div className="bg-[#0e121d] px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#d96b82] fill-[#d96b82] animate-heart-beat" />
                <span className="text-xs font-sans text-[#f5e4cb] font-medium tracking-wide">
                  Our Immutable Foundations
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans text-slate-300 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#e8c99b]" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Rows */}
            <div className="p-6 sm:p-8 divide-y divide-white/5 text-xs sm:text-sm">
              {cornerstones.map((item) => (
                <div key={item.key} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="text-[#e8c99b] font-bold">✦</span>
                    {item.key}
                  </span>
                  <span
                    className={`font-medium ${
                      item.key.includes('State')
                        ? 'text-[#fcdfe6] font-semibold font-serif'
                        : 'text-white font-serif'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-[#08090e]/90 px-6 py-3 border-t border-white/5 flex items-center justify-between text-[11px] font-sans text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Dedicated exclusively to {herName}
              </span>
              <span className="text-[#e8c99b] font-serif italic">Forever & Always</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

