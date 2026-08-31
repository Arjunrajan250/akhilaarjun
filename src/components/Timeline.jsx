import React from 'react';
import { motion } from 'framer-motion';
import { 
  Infinity as InfinityIcon, 
  Heart, 
  Home, 
  Compass, 
  Flame, 
  Clock
} from 'lucide-react';

export default function Timeline({ herName }) {
  const milestones = [
    {
      date: 'October 6, 2023',
      badge: 'Genesis Coordinate',
      title: 'The Spark: When The Universe Changed',
      subtitle: 'The Moment Life Found Its Anchor',
      description:
        'The day you entered my reality. Before this date, time was just sequential noise; from this moment onward, every second became purposeful. You weren’t just a person who walked in; you became my home.',
      tags: ['First Chapter', 'Destiny Initialized', 'Coordinate 10-06-2023'],
      icon: Flame,
      color: 'from-amber-400 to-rose-500',
      active: true,
    },
    {
      date: 'The Unfolding Journey',
      badge: 'Deepening Ties',
      title: 'Late Night Talks & Silent Synchrony',
      subtitle: 'Building the Foundation of Peace',
      description:
        'Hours turning into minutes. Discovering that behind your warmth is a brilliant, caring, unbreakable soul. You listened to my biggest dreams, calmed my fiercest anxieties, and showed me what true loyalty feels like.',
      tags: ['Unconditional Care', 'Safe Harbor', 'Total Trust'],
      icon: Compass,
      color: 'from-pink-500 to-purple-500',
      active: true,
    },
    {
      date: 'Today & Every Day',
      badge: 'Current Runtime',
      title: 'My Greatest Support System & Best Friend',
      subtitle: 'Architect of My Peace',
      description:
        'Every single morning begins with gratitude for you. Through work deadlines, complex builds, and daily hurdles, knowing you believe in me turns every obstacle into victory. You take care of my heart better than anyone ever could.',
      tags: ['Living Miracle', 'Pillar of Strength', 'Unrivaled Partner'],
      icon: Heart,
      color: 'from-rose-500 to-pink-500',
      active: true,
    },
    {
      date: 'The Horizon',
      badge: 'Pre-Compiled Future',
      title: 'Our Next Dimension: A Shared Home',
      subtitle: 'Designing Our Haven',
      description:
        'Waking up under the same roof. Coffee brewed together in the quiet morning light. Traveling the world hand-in-hand, laughing at silly inside jokes, and building a sanctuary of warmth, laughter, and joy.',
      tags: ['Our Sanctuary', 'Forever Memories', 'Shared Dreams'],
      icon: Home,
      color: 'from-purple-500 to-indigo-500',
      active: true,
    },
    {
      date: 'The Forever (∞)',
      badge: 'Forever Reality',
      title: 'The Future: My Wife',
      subtitle: 'The Vow of Eternity',
      description:
        'Walking down the aisle to meet the woman who holds my entire soul. Looking into your eyes and promising you every beat of my heart, every bit of my strength, and a lifetime of being your fierce protector and deepest admirer. Forever and ever.',
      tags: ['Until The End of Time', 'My Forever Wife', 'Infinite Loop of Love'],
      icon: InfinityIcon,
      color: 'from-amber-300 via-rose-400 to-indigo-400',
      highlight: true,
      active: true,
    },
  ];

  return (
    <div className="relative w-full space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-wider">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span>CHRONO-SPATIAL TRAJECTORY</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-white font-display">
          The <span className="font-semibold gradient-text-romantic">Arjun & {herName || 'Lechu'}</span> Timeline
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
          From the initial quantum spark on October 6, 2023, tracing an unbroken trajectory into infinity (∞).
        </p>
      </div>

      {/* Vertical Chrono Track */}
      <div className="relative max-w-4xl mx-auto px-2 sm:px-0">
        {/* Central glowing vertical timeline beam */}
        <div className="absolute left-5 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-500 via-purple-500 to-amber-300 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />

        <div className="space-y-8 sm:space-y-16">
          {milestones.map((milestone, idx) => {
            const Icon = milestone.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-2 sm:top-4 flex items-center justify-center z-20">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center p-2 border shadow-lg backdrop-blur-md transition-transform ${
                      milestone.highlight
                        ? 'bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 border-amber-300 shadow-rose-500/40 ring-4 ring-rose-500/20 animate-pulse'
                        : 'bg-slate-900 border-rose-500/40 shadow-black'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        milestone.highlight ? 'text-white' : 'text-rose-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-[calc(100%-2.75rem)] ml-11 sm:ml-0 sm:w-1/2 min-w-0 ${
                    isEven ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'
                  }`}
                >
                  <div
                    className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                      milestone.highlight
                        ? 'glass-panel-glow border border-amber-400/40 shadow-2xl shadow-rose-500/15'
                        : 'glass-panel border border-white/10 hover:border-rose-500/30'
                    }`}
                  >
                    {/* Date and Badge */}
                    <div
                      className={`flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs font-mono text-rose-300 font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-rose-500/15 border border-rose-500/30">
                        {milestone.date}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        {milestone.badge}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h3
                      className={`text-base sm:text-xl font-semibold text-white font-display mb-1 leading-snug ${
                        milestone.highlight ? 'gradient-text-gold' : ''
                      }`}
                    >
                      {milestone.title}
                    </h3>
                    <div className="text-xs text-rose-400/90 font-medium mb-2 sm:mb-3">
                      {milestone.subtitle}
                    </div>

                    {/* Milestone Body */}
                    <p className="text-xs sm:text-sm text-slate-300/90 font-light leading-relaxed mb-3.5 sm:mb-4">
                      {milestone.description}
                    </p>

                    {/* Tags */}
                    <div
                      className={`flex flex-wrap gap-1 sm:gap-1.5 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Eternity Inscription Footer */}
      <div className="text-center pt-4 sm:pt-6 px-2">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full glass-panel border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-display tracking-wider uppercase max-w-full flex-wrap justify-center shadow-lg">
          <InfinityIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-spin shrink-0" style={{ animationDuration: '12s' }} />
          <span className="text-center">Timeline Status: Infinite Loop Executing For You</span>
        </div>
      </div>
    </div>
  );
}
