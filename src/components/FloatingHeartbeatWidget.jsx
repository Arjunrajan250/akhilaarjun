import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

export default function FloatingHeartbeatWidget({ onClick }) {
  const handleClick = () => {
    haptics.heartbeat();
    sound.playChime(659.25, 0.2);
    if (onClick) onClick();
  };

  return (
    <aside
      aria-label="Heartbeat sensory telemetry dock"
      className="fixed bottom-16 sm:bottom-6 left-3 sm:left-6 z-40 flex justify-start"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full glass-panel-glow border border-[#e8c99b]/35 bg-[#08090e]/90 shadow-2xl backdrop-blur-xl group cursor-pointer hover:border-[#e8c99b]/60 transition-all text-left"
        title="Hold to Feel Arjun's Heartbeat (72 BPM)"
        aria-label="Open Heartbeat Telemetry"
      >
        {/* Beating Heart Icon with Radar Aura */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#18131d] border border-[#e8c99b]/30 flex items-center justify-center shrink-0 shadow-inner">
          <span className="absolute inset-0 rounded-full bg-[#d96b82]/20 animate-ping opacity-75 pointer-events-none" />
          <Heart className="w-4 h-4 text-[#d96b82] fill-[#d96b82] animate-heart-beat" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] sm:text-xs font-semibold text-white font-display whitespace-nowrap">
              Feel Heartbeat
            </span>
            <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              72 BPM
            </span>
          </div>
          <span className="text-[9px] text-[#e8c99b]/90 font-mono hidden sm:inline">
            Sensory Haptic Pulse
          </span>
        </div>
      </motion.button>
    </aside>
  );
}
