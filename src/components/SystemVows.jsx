import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Copy, 
  ShieldCheck, 
  Heart, 
  BookmarkCheck,
  Cpu
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function SystemVows({ herName, daysTogether }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  const systemSpecs = [
    { key: 'Host Architecture', value: "Arjun's Heart & Soul (x64_Love Edition)" },
    { key: 'Operating System', value: `${herName || 'Lechu'} OS v1.0 [Stable Release]` },
    { key: 'Kernel Engine', value: 'Unconditional Support & Perpetual Devotion' },
    { key: 'Initial Boot Date', value: 'October 6, 2023 00:00:00 UTC' },
    { key: 'System Uptime', value: `${daysTogether} Continuous Days (99.999% Reliability)` },
    { key: 'System Status', value: `PERFECT - Irreversibly In Love with ${herName || 'Lechu'}` },
    { key: 'Memory Allocation', value: '100% Dedicated to Her Smile & Our Shared Dreams' },
    { key: 'Security Protocol', value: 'Zero-Trust for Doubts; Infinite Safe Harbor' },
    { key: 'Failover Strategy', value: 'Self-healing via Her Voice, Hugs, and Gentle Eyes' },
  ];

  const architecturalVows = [
    {
      title: 'Architectural Principle 01: The Non-Negotiable Safe Harbor',
      content:
        'I vow to build a life where you never have to doubt your worth, your beauty, or your place in my world. My arms will forever be the sanctuary where you can drop your armor and breathe easy.',
    },
    {
      title: 'Architectural Principle 02: Reciprocal Support & Elevation',
      content:
        'Just as you are the architect of my peace and my greatest supporter, I will champion every ambition of yours. Your dreams will be given the highest priority in our system resources.',
    },
    {
      title: 'Architectural Principle 03: Fault Tolerance & Grace',
      content:
        'When difficult days arrive, I will listen before speaking, understand before defending, and choose patience over ego. Our connection is immutable, and nothing will shake our foundation.',
    },
    {
      title: 'Architectural Principle 04: The Vow of Eternity',
      content:
        'To love you when you are joyous, to hold you when you are tired, and to look at you decades from now with the exact same awe and butterflies as the day the universe changed on October 6, 2023.',
    },
  ];

  const handleCopy = () => {
    const textToCopy = systemSpecs.map((s) => `${s.key}: ${s.value}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    sound.playChime(660, 0.4, 'sine');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-rose-400" />
          <span>LIFELONG SYSTEM SPECIFICATIONS & VOWS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-white font-display">
          System Requirements <span className="font-semibold gradient-text-romantic">For My Life</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light">
          Formal engineering specification and immutable architectural vows compiled for {herName || 'Lechu'}, my future wife.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => {
            setActiveTab('specs');
            sound.playChime(440, 0.2);
          }}
          className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer text-center active:scale-95 ${
            activeTab === 'specs'
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          System Specs & Telemetry
        </button>
        <button
          onClick={() => {
            setActiveTab('vows');
            sound.playChime(550, 0.2);
          }}
          className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer text-center active:scale-95 ${
            activeTab === 'vows'
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          Immutable Architectural Vows
        </button>
      </div>

      {/* Content Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'specs' ? (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Header Telemetry Bar */}
            <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-heart-beat" />
                <span className="text-xs font-mono text-slate-300 font-medium tracking-wide">
                  Kernel // Devotion & Core Telemetry
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Specs'}</span>
              </button>
            </div>

            {/* Spec Rows */}
            <div className="p-6 sm:p-8 divide-y divide-white/5 font-mono text-xs sm:text-sm">
              {systemSpecs.map((item) => (
                <div key={item.key} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="text-rose-500 font-bold">›</span>
                    {item.key}
                  </span>
                  <span
                    className={`font-medium ${
                      item.key === 'System Status'
                        ? 'text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30'
                        : item.key.includes('OS')
                        ? 'text-rose-300 font-semibold'
                        : 'text-white'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Telemetry Status Footer */}
            <div className="bg-slate-950/60 px-6 py-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified & Immutable (Oct-06-2023 // Infinite Love)
              </span>
              <span className="text-rose-300">All Systems Nominal</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="vows"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {architecturalVows.map((vow, idx) => (
              <motion.div
                key={vow.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-3xl glass-panel-glow border border-rose-500/20 space-y-2"
              >
                <div className="flex items-center gap-2 text-rose-300 font-display font-semibold text-sm sm:text-base">
                  <BookmarkCheck className="w-4 h-4 text-rose-400" />
                  <h4>{vow.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed pl-6">
                  {vow.content}
                </p>
              </motion.div>
            ))}

            <div className="p-6 rounded-3xl glass-panel border border-amber-400/30 text-center space-y-2 bg-gradient-to-r from-amber-500/5 via-rose-500/5 to-purple-500/5">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400 mx-auto animate-heart-beat" />
              <h3 className="text-base sm:text-lg font-serif text-amber-200">
                To My Dearest {herName || 'Lechu'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 italic max-w-xl mx-auto">
                "Code can build worlds, but you are the only one who gave my world meaning. I love you, now and through all iterations of time."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
