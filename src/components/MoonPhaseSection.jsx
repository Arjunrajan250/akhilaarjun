import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Moon, 
  Sparkles, 
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

export default function MoonPhaseSection({ herName = 'Lechu' }) {
  const [activeView, setActiveView] = useState('genesis'); // 'genesis' | 'today'
  const [rotationAngle, setRotationAngle] = useState(0);

  // October 6, 2023 Astronomical Telemetry
  const genesisMoonData = {
    date: 'October 6, 2023',
    phaseName: 'Last Quarter Moon (Waning)',
    illumination: '53.8%',
    moonAge: '21.6 Days',
    constellation: 'Gemini ♊ (Coordinates: RA 07h, Dec +22°)',
    distance: '388,412 km',
    altitude: '64.2° Zenith',
    vibe: 'A quiet, serene night when the universe quietly shifted its axis.',
  };

  // Calculate live phase for today
  const getTodayMoonPhase = () => {
    const now = new Date();
    const baseDate = new Date('2000-01-06T18:14:00Z');
    const diffDays = (now.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);
    const cyclePos = (diffDays % 29.53058867) / 29.53058867;
    const illumination = Math.round((1 - Math.cos(cyclePos * 2 * Math.PI)) / 2 * 100);

    return {
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      phaseName: cyclePos < 0.5 ? 'Waxing Moon' : 'Waning Moon',
      illumination: `${illumination}%`,
      moonAge: `${(cyclePos * 29.53).toFixed(1)} Days`,
      constellation: 'Synchronized with Her Heart ❤️',
      distance: '384,400 km (Unbroken Orbit)',
      altitude: 'Eternally Fixed on You',
      vibe: 'Still the exact same moon looking down on our love.',
    };
  };

  const todayMoonData = getTodayMoonPhase();
  const currentData = activeView === 'genesis' ? genesisMoonData : todayMoonData;

  const handleToggleView = (view) => {
    haptics.light();
    sound.playChime(659.25, 0.2);
    setActiveView(view);
  };

  const handleMoonTap = (e) => {
    haptics.medium();
    sound.playChime(784, 0.35, 'sine');
    setRotationAngle((prev) => prev + 45);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: {
        x: e.clientX ? e.clientX / window.innerWidth : 0.5,
        y: e.clientY ? e.clientY / window.innerHeight : 0.5,
      },
      colors: ['#e8c99b', '#d96b82', '#f5e4cb', '#798cb7'],
    });
  };

  return (
    <div id="moon" className="relative w-full space-y-8 select-none">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8c99b]/15 border border-[#e8c99b]/30 text-[#e8c99b] text-xs font-mono tracking-wider">
          <Moon className="w-3.5 h-3.5 text-[#e8c99b]" />
          <span>CELESTIAL EPHEMERIS & ASTRONOMY</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-[#faf7f2] font-display">
          The Moon Under Which <span className="font-semibold gradient-text-champagne">We Began</span>
        </h2>
        <p className="text-slate-300/85 text-xs sm:text-sm font-light">
          The exact lunar coordinates and cosmic night sky that witnessed our timeline converge on October 6, 2023.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => handleToggleView('genesis')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer text-center active:scale-95 ${
            activeView === 'genesis'
              ? 'bg-[#e8c99b]/25 border border-[#e8c99b] text-white shadow-lg shadow-black/40 font-semibold'
              : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
          }`}
        >
          Oct 6, 2023 Sky
        </button>
        <button
          type="button"
          onClick={() => handleToggleView('today')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer text-center active:scale-95 ${
            activeView === 'today'
              ? 'bg-[#e8c99b]/25 border border-[#e8c99b] text-white shadow-lg shadow-black/40 font-semibold'
              : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
          }`}
        >
          Tonight’s Sky
        </button>
      </div>

      {/* Main Celestial Visualizer Card */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: 3D-Styled Glowing Lunar Orb */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl glass-panel border border-[#e8c99b]/25 text-center relative overflow-hidden bg-[#0e121c]/85 shadow-2xl">
          {/* Orbital Stardust Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 rounded-full border border-[#e8c99b]/15 border-dashed animate-[spin_40s_linear_infinite]" />
            <div className="w-72 h-72 rounded-full border border-[#798cb7]/15 animate-[spin_60s_linear_infinite_reverse]" />
          </div>

          {/* Interactive Tap-to-Rotate Moon Sphere with Real Image */}
          <motion.div
            onClick={handleMoonTap}
            animate={{ rotate: rotationAngle }}
            transition={{ type: 'spring', damping: 18, stiffness: 90 }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full cursor-pointer group shadow-[0_0_50px_rgba(232,201,155,0.25)] my-3 flex items-center justify-center select-none"
          >
            {/* Outer Ambient Lunar Aura */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#e8c99b]/20 via-[#798cb7]/15 to-[#d96b82]/15 blur-xl pointer-events-none group-hover:scale-105 transition-transform duration-500" />
            
            {/* Real Moon Photograph */}
            <div className="w-full h-full rounded-full overflow-hidden relative border border-white/25 shadow-2xl bg-black">
              <img
                src="/moon.png"
                alt="Moon on October 6, 2023"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                loading="eager"
              />
              
              {/* Subtle Stardust Shimmer Highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#e8c99b]/10 via-transparent to-[#f5e4cb]/10 pointer-events-none mix-blend-screen" />
            </div>

            {/* Glowing Moon Rim */}
            <div className="absolute -inset-0.5 rounded-full border border-[#e8c99b]/40 pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.25)]" />
          </motion.div>

          {/* Moon Title */}
          <div className="space-y-1 relative z-10 mt-2">
            <h3 className="text-lg font-semibold font-display text-white">
              {currentData.phaseName}
            </h3>
            <p className="text-xs font-mono text-[#e8c99b]">
              Illumination: {currentData.illumination} • Age: {currentData.moonAge}
            </p>
          </div>
        </div>

        {/* Right Side: Astronomical Telemetry & Romantic Quote */}
        <div className="md:col-span-7 space-y-4">
          {/* Main Emotional Quote Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel-glow border border-[#e8c99b]/30 bg-[#0e121c]/90 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-[#e8c99b] text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#e8c99b]" />
              <span>COSMIC CONVERGENCE THEOREM</span>
            </div>

            <p className="text-base sm:text-xl font-light font-display text-white leading-relaxed tracking-wide">
              "Out of 8 billion souls on this planet, under this exact cosmic sky on <strong className="text-[#e8c99b] font-medium">October 6, 2023</strong>, the universe gently guided my world into yours."
            </p>

            <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-xs text-slate-400 font-light italic">
              <span>Arjun’s eternal promise to {herName}</span>
              <Heart className="w-3.5 h-3.5 text-[#d96b82] fill-[#d96b82]" />
            </div>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8">
              <span className="text-slate-400 text-[10px] block mb-1">DATE</span>
              <span className="text-white font-medium block truncate">{currentData.date}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8">
              <span className="text-slate-400 text-[10px] block mb-1">LUNAR AGE</span>
              <span className="text-[#e8c99b] font-medium block truncate">{currentData.moonAge}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8">
              <span className="text-slate-400 text-[10px] block mb-1">DISTANCE</span>
              <span className="text-white font-medium block truncate">{currentData.distance}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8 col-span-2 sm:col-span-3">
              <span className="text-slate-400 text-[10px] block mb-1">SECTOR & CONSTELLATION</span>
              <span className="text-[#f5e4cb] font-medium block">{currentData.constellation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
