import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

const TELEMETRY_STAGES = [
  {
    seconds: 0,
    badge: 'Establishing Connection',
    title: 'Place & Hold Your Thumb',
    subtitle: 'Connecting to Arjun’s heart frequency (72 BPM)...',
    color: 'from-rose-500/20 to-pink-500/10',
    borderColor: 'border-rose-500/30',
  },
  {
    seconds: 3,
    badge: 'Frequency Synchronized',
    title: 'Beating Exclusively for You',
    subtitle: 'Telemetry verified: 100% of available cardiac energy is locked onto Lechu.',
    color: 'from-pink-500/25 to-purple-500/15',
    borderColor: 'border-pink-500/40',
  },
  {
    seconds: 6,
    badge: 'Calm Sanctuary',
    title: 'The Calming Effect of Your Smile',
    subtitle: 'Did you know? Across any distance or busy workday, my pulse settles the moment I think of your voice.',
    color: 'from-purple-500/25 to-indigo-500/15',
    borderColor: 'border-purple-500/40',
  },
  {
    seconds: 10,
    badge: 'Immutable Life Vow',
    title: 'The Eternal Anchor',
    subtitle: 'As long as this heart pumps blood, you will never walk alone, never be unprotected, and never be loved less than completely.',
    color: 'from-amber-500/25 to-rose-500/20',
    borderColor: 'border-amber-400/50',
  },
  {
    seconds: 15,
    badge: 'Eternity Resonance (100% Sync)',
    title: 'You Hold My Entire Soul',
    subtitle: 'Quantum entanglement complete. Arjun & Lechu: Two hearts beating in one unbroken rhythm forever.',
    color: 'from-rose-600/40 to-amber-500/30',
    borderColor: 'border-rose-400/80',
    isMax: true,
  },
];

export default function HeartbeatWidget({ herName = 'Lechu' }) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdDuration, setHoldDuration] = useState(0);
  const [maxStageReached, setMaxStageReached] = useState(false);
  const holdIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const currentStage = [...TELEMETRY_STAGES]
    .reverse()
    .find((stage) => holdDuration >= stage.seconds) || TELEMETRY_STAGES[0];

  const maxTarget = 15;
  const progressPercent = Math.min(100, (holdDuration / maxTarget) * 100);

  const startHold = (e) => {
    if (e) {
      // Prevent context menu on mobile long-press
      if (e.cancelable && e.type === 'touchstart') {
        // don't preventDefault if it breaks scrolling, but prevent context menu
      }
    }
    if (isHolding) return;

    setIsHolding(true);
    startTimeRef.current = Date.now() - holdDuration * 1000;
    sound.startHeartbeatLoop(72);
    haptics.heartbeat();

    holdIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setHoldDuration(elapsed);

      if (elapsed >= 15 && !maxStageReached) {
        setMaxStageReached(true);
        sound.playUnlockChord();
        confetti({
          particleCount: 50,
          spread: 75,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fbbf24', '#c084fc'],
        });
      }
    }, 100);
  };

  const endHold = () => {
    if (!isHolding) return;
    setIsHolding(false);
    sound.stopHeartbeatLoop();
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      sound.stopHeartbeatLoop();
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto px-2 sm:px-4 select-none">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`relative rounded-3xl p-6 sm:p-9 glass-panel-glow border transition-all duration-500 overflow-hidden text-center shadow-2xl ${
          isHolding 
            ? 'border-rose-400/60 shadow-[0_0_50px_rgba(244,63,94,0.25)] bg-slate-900/90' 
            : 'border-pink-500/20 bg-slate-950/70'
        }`}
      >
        {/* Ambient Top Glow Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-80" />

        {/* Floating Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-wider mb-4 sm:mb-6">
          <Activity className={`w-3.5 h-3.5 text-rose-400 ${isHolding ? 'animate-pulse' : ''}`} />
          <span>REAL-TIME SENSORY TELEMETRY // 72 BPM</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-light text-white font-display mb-2">
          Hold to Feel <span className="font-semibold gradient-text-romantic">My Heartbeat</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md mx-auto mb-6 leading-relaxed">
          Place your thumb or finger on the glowing heart below. Feel the real pulse in your palm and listen as our frequencies align.
        </p>

        {/* Interactive Hold Sensory Zone */}
        <div className="relative my-6 sm:my-8 flex flex-col items-center justify-center">
          {/* Concentric Pulsing Radar Rings */}
          <div className="relative flex items-center justify-center">
            {isHolding && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                  transition={{ duration: 0.833, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-rose-500/60 pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
                  transition={{ duration: 0.833, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
                  className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-pink-400/40 pointer-events-none"
                />
              </>
            )}

            {/* Hold Button / Sensor Target */}
            <button
              type="button"
              id="heartbeat-sensor-btn"
              onTouchStart={startHold}
              onTouchEnd={endHold}
              onTouchCancel={endHold}
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onContextMenu={(e) => e.preventDefault()}
              className={`relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 outline-none touch-none ${
                isHolding 
                  ? 'scale-95 bg-gradient-to-tr from-rose-600 to-pink-500 shadow-[0_0_40px_rgba(244,63,94,0.6)]' 
                  : 'hover:scale-105 bg-gradient-to-tr from-rose-950/80 via-slate-900 to-pink-950/60 border-2 border-rose-500/40 shadow-lg shadow-pink-500/10'
              }`}
            >
              {/* Inner Beating Heart Icon */}
              <motion.div
                animate={
                  isHolding 
                    ? { scale: [1, 1.25, 1, 1.15, 1] } 
                    : { scale: [1, 1.08, 1] }
                }
                transition={{
                  duration: isHolding ? 0.833 : 2.0,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart 
                  className={`w-12 h-12 sm:w-16 sm:h-16 transition-colors ${
                    isHolding 
                      ? 'text-white fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' 
                      : 'text-rose-400 fill-rose-500/40'
                  }`} 
                />
              </motion.div>

              <span className={`text-[10px] sm:text-xs font-mono tracking-wider uppercase mt-1 ${
                isHolding ? 'text-white font-semibold animate-pulse' : 'text-rose-300/80'
              }`}>
                {isHolding ? 'HOLDING...' : 'HOLD THUMB'}
              </span>
            </button>
          </div>

          {/* EKG Graph Line */}
          <div className="w-full max-w-xs mt-6 h-6 flex items-center justify-center overflow-hidden opacity-70">
            <svg viewBox="0 0 300 40" className="w-full h-full stroke-rose-400 fill-none stroke-[2]">
              <path 
                d="M 0 20 L 50 20 L 60 5 L 70 35 L 80 15 L 90 25 L 100 20 L 150 20 L 160 5 L 170 35 L 180 15 L 190 25 L 200 20 L 300 20" 
                className={isHolding ? 'animate-ekg' : ''}
              />
            </svg>
          </div>

          {/* Sync Progress Bar */}
          <div className="w-full max-w-sm mt-3 space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-rose-300">
                <Flame className="w-3 h-3 text-rose-400" />
                <span>Quantum Sync Level</span>
              </span>
              <span className="font-semibold text-rose-400">
                {Math.floor(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                style={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Progressive Telemetry Unlock Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.seconds}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 p-5 sm:p-6 rounded-2xl border ${currentStage.borderColor} bg-gradient-to-br ${currentStage.color} text-left relative overflow-hidden backdrop-blur-md shadow-inner`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-rose-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentStage.badge}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {holdDuration > 0 ? `${holdDuration.toFixed(1)}s held` : 'Ready'}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-medium text-white mb-1.5 font-display">
              {currentStage.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              {currentStage.subtitle}
            </p>

            {currentStage.isMax && (
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-amber-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Permanent Synchrony: Arjun’s heart is eternally bound to {herName}.</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Instruction Footer */}
        <p className="mt-4 text-[11px] sm:text-xs text-slate-500 font-mono">
          💡 Tip for mobile: Place your thumb firmly on the sensor to trigger real haptic heartbeat pulses.
        </p>
      </motion.div>
    </div>
  );
}
