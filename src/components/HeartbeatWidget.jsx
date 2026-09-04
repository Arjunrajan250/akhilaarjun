import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Sparkles, ShieldCheck, Flame, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

const TELEMETRY_STAGES = [
  {
    seconds: 0,
    badge: 'Listening Close',
    title: 'Place & Hold Your Thumb',
    subtitle: 'Connecting to the steady rhythm of Arjun’s heart...',
    color: 'from-[#1a1f30]/80 to-[#121622]/90',
    borderColor: 'border-[#e8c99b]/25',
  },
  {
    seconds: 3,
    badge: 'Beating For You',
    title: 'Every Beat Has Your Name On It',
    subtitle: 'No matter where I am or what I am working on, you are the peaceful pulse beneath every single thought.',
    color: 'from-[#2a1722]/80 to-[#1a1c2c]/90',
    borderColor: 'border-[#d96b82]/35',
  },
  {
    seconds: 6,
    badge: 'My Safe Harbor',
    title: 'You Are My Instant Peace',
    subtitle: 'Whenever life gets loud or stressful, just thinking of your laugh or seeing your eyes slows down my heart and brings me home.',
    color: 'from-[#1c223a]/80 to-[#181a26]/90',
    borderColor: 'border-[#798cb7]/35',
  },
  {
    seconds: 10,
    badge: 'My Lifetime Promise',
    title: 'An Anchor You Can Always Trust',
    subtitle: 'As long as this heart beats in my chest, you will never have to doubt your worth, your beauty, or how deeply you are loved.',
    color: 'from-[#2d2218]/80 to-[#1f1a28]/90',
    borderColor: 'border-[#e8c99b]/45',
  },
  {
    seconds: 15,
    badge: 'Two Hearts As One (Forever)',
    title: 'You Hold My Entire Soul',
    subtitle: 'From October 6, 2023 into forever: Two lives, two souls, intertwined in one unbreakable rhythm.',
    color: 'from-[#331722]/85 to-[#2a2016]/90',
    borderColor: 'border-[#e8c99b]/70',
    isMax: true,
  },
];

export default function HeartbeatWidget({ herName = 'Lechu', onClose }) {
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

  const startHold = () => {
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
          colors: ['#d96b82', '#e8c99b', '#f5e4cb', '#798cb7'],
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

  const handleClose = () => {
    endHold();
    sound.stopHeartbeatLoop();
    if (onClose) onClose();
  };

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
            ? 'border-[#e8c99b]/50 shadow-[0_0_50px_rgba(217,107,130,0.2)] bg-[#0e121c]/95' 
            : 'border-[#e8c99b]/20 bg-[#08090e]/80'
        }`}
      >
        {/* Close Button if in modal */}
        {onClose && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close heartbeat telemetry modal"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Ambient Top Glow Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#e8c99b] to-transparent opacity-80" />

        {/* Floating Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8c99b]/15 border border-[#e8c99b]/30 text-[#e8c99b] text-xs font-mono tracking-wider mb-4 sm:mb-6">
          <Activity className={`w-3.5 h-3.5 text-[#e8c99b] ${isHolding ? 'animate-pulse' : ''}`} />
          <span>HEARTBEAT TELEMETRY • 72 BPM</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-light text-[#faf7f2] font-display mb-2">
          Hold to Feel <span className="font-semibold gradient-text-champagne">My Heartbeat</span>
        </h2>
        <p className="text-slate-300/85 text-xs sm:text-sm font-light max-w-md mx-auto mb-6 leading-relaxed">
          Place and hold your thumb on the glowing sensor below. Feel the real rhythm in your hands as it beats just for you.
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
                  className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-[#e8c99b]/50 pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
                  transition={{ duration: 0.833, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
                  className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-[#d96b82]/40 pointer-events-none"
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
                  ? 'scale-95 bg-gradient-to-tr from-[#d96b82] via-[#b84760] to-[#c49257] shadow-[0_0_45px_rgba(217,107,130,0.5)] border-2 border-[#f5e4cb]' 
                  : 'hover:scale-105 bg-gradient-to-tr from-[#161a28] via-[#201824] to-[#161a28] border-2 border-[#e8c99b]/35 shadow-xl shadow-black/60'
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
                      : 'text-[#d96b82] fill-[#d96b82]/40'
                  }`} 
                />
              </motion.div>

              <span className={`text-[10px] sm:text-xs font-mono tracking-wider uppercase mt-1 ${
                isHolding ? 'text-white font-semibold animate-pulse' : 'text-[#e8c99b]/90'
              }`}>
                {isHolding ? 'HOLDING...' : 'HOLD THUMB'}
              </span>
            </button>
          </div>

          {/* EKG Graph Line */}
          <div className="w-full max-w-xs mt-6 h-6 flex items-center justify-center overflow-hidden opacity-85">
            <svg viewBox="0 0 300 40" className="w-full h-full stroke-[#e8c99b] fill-none stroke-[2]">
              <path 
                d="M 0 20 L 50 20 L 60 5 L 70 35 L 80 15 L 90 25 L 100 20 L 150 20 L 160 5 L 170 35 L 180 15 L 190 25 L 200 20 L 300 20" 
                className={isHolding ? 'animate-ekg' : ''}
              />
            </svg>
          </div>

          {/* Sync Progress Bar */}
          <div className="w-full max-w-sm mt-3 space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-[#e8c99b]">
                <Flame className="w-3 h-3 text-[#e8c99b]" />
                <span>Synchrony Level</span>
              </span>
              <span className="font-semibold text-[#e8c99b]">
                {Math.floor(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#d96b82] via-[#e8c99b] to-[#f5e4cb] shadow-[0_0_10px_rgba(232,201,155,0.4)]"
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
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#e8c99b] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#e8c99b]" />
                <span>{currentStage.badge}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {holdDuration > 0 ? `${holdDuration.toFixed(1)}s held` : 'Ready'}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-medium text-[#faf7f2] mb-1.5 font-display">
              {currentStage.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              {currentStage.subtitle}
            </p>

            {currentStage.isMax && (
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#e8c99b]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Permanent Synchrony: Arjun’s heart is eternally bound to {herName}.</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Instruction Footer */}
        <p className="mt-4 text-[11px] sm:text-xs text-slate-400 font-mono">
          💡 Tip: Place your thumb firmly on the sensor to trigger real haptic heartbeat pulses.
        </p>
      </motion.div>
    </div>
  );
}
