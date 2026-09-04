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
      badge: 'The First Spark',
      title: 'When My Entire World Changed',
      subtitle: 'The day you walked into my life',
      description:
        'The unforgettable day you entered my reality. Before this date, time was just passing by; from this moment onward, every day found its purpose. You didn’t just enter my life; you became my home.',
      tags: ['Our First Chapter', 'October 6, 2023', 'Best Day of My Life'],
      icon: Flame,
      color: 'from-[#e8c99b] to-[#d96b82]',
      active: true,
    },
    {
      date: 'The Unfolding Journey',
      badge: 'Late Night Talks',
      title: 'Hours That Turned Into Minutes',
      subtitle: 'Falling in love with who you are',
      description:
        'Discovering that behind your bright smile is the sweetest, kindest, and most caring soul I have ever known. You listened to my wildest dreams, stood by me on hard days, and showed me what true love really feels like.',
      tags: ['Heart-to-Heart Talks', 'Unconditional Care', 'My Safe Place'],
      icon: Compass,
      color: 'from-[#d96b82] to-[#798cb7]',
      active: true,
    },
    {
      date: 'Today & Every Day',
      badge: 'My Greatest Anchor',
      title: 'My Best Friend & Biggest Supporter',
      subtitle: 'Waking up grateful for you',
      description:
        'Every single morning begins with gratitude for you. Through work deadlines, late nights, and everyday hurdles, knowing you believe in me turns every challenge into joy. You take care of my heart better than anyone ever could.',
      tags: ['My Peace', 'Best Friend', 'Unmatched Partner'],
      icon: Heart,
      color: 'from-[#d96b82] to-[#e8c99b]',
      active: true,
    },
    {
      date: 'The Horizon',
      badge: 'Our Future Dream',
      title: 'A Home Full of Laughter & Warmth',
      subtitle: 'Building our life side by side',
      description:
        'Waking up under the same roof. Coffee brewed together in the quiet morning light. Traveling to places we’ve dreamed about, laughing at our silly inside jokes, and building a sanctuary of pure warmth and happiness.',
      tags: ['Our Sanctuary', 'Traveling Together', 'Shared Dreams'],
      icon: Home,
      color: 'from-[#798cb7] to-[#e8c99b]',
      active: true,
    },
    {
      date: 'The Forever (∞)',
      badge: 'My Forever Wife',
      title: 'To the Love of My Life',
      subtitle: 'A promise for a lifetime',
      description:
        'Walking down the aisle to meet the woman who holds my entire heart. Looking into your eyes and promising you every beat of my heart, every bit of my strength, and a lifetime of being your biggest cheerleader and devoted partner. Forever and always.',
      tags: ['Until The End of Time', 'My Future Wife', 'Forever Yours'],
      icon: InfinityIcon,
      color: 'from-[#e8c99b] via-[#d96b82] to-[#c49257]',
      highlight: true,
      active: true,
    },
  ];

  return (
    <div className="relative w-full space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8c99b]/15 border border-[#e8c99b]/30 text-[#e8c99b] text-xs font-mono tracking-wider">
          <Clock className="w-3.5 h-3.5 text-[#e8c99b]" />
          <span>OUR STORY IN CHAPTERS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-[#faf7f2] font-display">
          The <span className="font-semibold gradient-text-champagne">Arjun & {herName || 'Lechu'}</span> Story
        </h2>
        <p className="text-slate-300/85 text-xs sm:text-sm font-light leading-relaxed">
          From the first spark on October 6, 2023, tracing our path through every shared smile into eternity.
        </p>
      </div>

      {/* Vertical Chrono Track */}
      <div className="relative max-w-4xl mx-auto px-2 sm:px-0">
        {/* Central glowing vertical timeline beam */}
        <div className="absolute left-5 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#d96b82] via-[#e8c99b] to-[#c49257] shadow-[0_0_15px_rgba(232,201,155,0.4)]" />

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
                        ? 'bg-gradient-to-tr from-[#e8c99b] via-[#d96b82] to-[#798cb7] border-[#faf7f2] shadow-[#d96b82]/40 ring-4 ring-[#e8c99b]/25 animate-pulse'
                        : 'bg-[#0e121c] border-[#e8c99b]/40 shadow-black'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        milestone.highlight ? 'text-white' : 'text-[#e8c99b]'
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
                        ? 'glass-panel-glow border border-[#e8c99b]/45 shadow-2xl shadow-black/80 bg-[#121624]/90'
                        : 'glass-panel border border-white/10 hover:border-[#e8c99b]/30 bg-[#0e121c]/80'
                    }`}
                  >
                    {/* Date and Badge */}
                    <div
                      className={`flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs font-mono text-[#e8c99b] font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-[#e8c99b]/15 border border-[#e8c99b]/35">
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
                    <div className="text-xs text-[#d96b82] font-medium mb-2 sm:mb-3">
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
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
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
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full glass-panel border border-[#e8c99b]/35 text-[#f3e8d0] text-xs sm:text-sm font-display tracking-wider uppercase max-w-full flex-wrap justify-center shadow-lg bg-[#0e121c]/85">
          <InfinityIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#e8c99b] animate-spin shrink-0" style={{ animationDuration: '14s' }} />
          <span className="text-center">Timeline Status: An Infinite Love That Never Ends</span>
        </div>
      </div>
    </div>
  );
}
