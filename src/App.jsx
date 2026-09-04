import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Infinity as InfinityIcon,
  ChevronDown,
  Activity,
  KeyRound
} from 'lucide-react';
import StarfieldBackground from './components/StarfieldBackground';
import RadhaKrishnaBackground from './components/RadhaKrishnaBackground';
import Gateway from './components/Gateway';
import Navbar from './components/Navbar';
import HeartbeatWidget from './components/HeartbeatWidget';
import Timeline from './components/Timeline';
import MemoryGallery from './components/MemoryGallery';
import MoonPhaseSection from './components/MoonPhaseSection';
import LoveLetterVault from './components/LoveLetterVault';
import ReasonsDeck from './components/ReasonsDeck';
import SystemVows from './components/SystemVows';
import MusicSection from './components/MusicSection';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import MobileBottomDock from './components/MobileBottomDock';
import DoubleTapHearts from './components/DoubleTapHearts';
import PWAInstallBanner from './components/PWAInstallBanner';
import SecretVaultModal from './components/SecretVaultModal';
import { MusicProvider } from './context/MusicContext';
import { sound } from './utils/sound';

const START_DATE = new Date('2023-10-06T00:00:00');

function MultiverseApp() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('multiverse_unlocked') === 'true';
  });
  const [herName] = useState('Lechu');
  const [isSecretVaultOpen, setIsSecretVaultOpen] = useState(false);
  const [isDivineVideoEnabled, setIsDivineVideoEnabled] = useState(true);
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - START_DATE.getTime());
      
      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('multiverse_unlocked', 'true');
  };

  return (
    <div className="relative min-h-screen bg-[#08090e] text-[#faf7f2] selection:bg-[#d96b82]/25 selection:text-[#fcdfe6] overflow-x-hidden font-sans">
      {/* Divine Radha-Krishna Ambient Video Background */}
      <RadhaKrishnaBackground 
        isEnabled={isDivineVideoEnabled} 
        opacity={0.32} 
      />

      {/* Universal Starfield Background Canvas */}
      <StarfieldBackground />

      {/* Global Double-Tap Floating Flying Hearts */}
      <DoubleTapHearts />

      {/* Mobile PWA Install Helper Banner */}
      <PWAInstallBanner herName={herName} />

      {/* Secret Easter Egg Modal */}
      <SecretVaultModal
        isOpen={isSecretVaultOpen}
        onClose={() => setIsSecretVaultOpen(false)}
        herName={herName}
      />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="gateway-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 min-h-screen flex items-center justify-center"
          >
            <Gateway onUnlock={handleUnlock} herName={herName} />
          </motion.div>
        ) : (
          <motion.div
            key="multiverse-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            {/* Top Glass Navigation Bar */}
            <Navbar 
              daysTogether={elapsed.days}
              herName={herName}
              onOpenSecretVault={() => setIsSecretVaultOpen(true)}
              isDivineVideoEnabled={isDivineVideoEnabled}
              onToggleDivineVideo={() => setIsDivineVideoEnabled((prev) => !prev)}
            />

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 pt-24 sm:pt-36 pb-32 sm:pb-36 space-y-16 sm:space-y-32">
              
              {/* Hero Section */}
              <section className="relative text-center space-y-8 pt-4 sm:pt-8">
                {/* Hero Headings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-4 max-w-4xl mx-auto"
                >
                  <h1 className="text-3xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-[#faf7f2] font-display leading-tight">
                    Architect of Our <span className="font-semibold gradient-text-champagne">Future</span>
                  </h1>
                  <p className="text-slate-300/85 text-sm sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                    A digital sanctuary and eternal archive compiled for <strong className="text-white font-medium">{herName}</strong> — the woman who gave my world its sweetest meaning.
                  </p>
                </motion.div>

                {/* Live Metric Clock */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel border border-[#e8c99b]/25 shadow-2xl relative overflow-hidden bg-[#0e121c]/80"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#e8c99b] to-transparent" />
                  <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400 mb-4 sm:mb-5 border-b border-white/8 pb-3 gap-2">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#e8c99b] shrink-0" />
                      <span className="tracking-wider text-slate-300 uppercase">TIME SPENT IN LOVE WITH HER</span>
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1.5 font-medium shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      SYNCHRONIZED
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/8">
                      <span className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-white block">
                        {elapsed.days}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-[#e8c99b] uppercase tracking-widest mt-1 block">
                        Days
                      </span>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/8">
                      <span className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-white block">
                        {String(elapsed.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-[#e8c99b] uppercase tracking-widest mt-1 block">
                        Hours
                      </span>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/8">
                      <span className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-white block">
                        {String(elapsed.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-[#e8c99b] uppercase tracking-widest mt-1 block">
                        Mins
                      </span>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/8">
                      <span className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-[#d96b82] block">
                        {String(elapsed.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-[#e8c99b] uppercase tracking-widest mt-1 block">
                        Secs
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/8 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#e8c99b]" />
                      <span>Coordinate: October 6, 2023</span>
                    </span>
                    <span className="text-[#fcdfe6]">
                      Heart Frequency: Bound To You Forever
                    </span>
                  </div>
                </motion.div>

                {/* Hero CTAs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-wrap items-center justify-center gap-3 pt-2"
                >
                  <a
                    href="#heartbeat"
                    onClick={() => sound.playChime(659.25, 0.2)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d96b82] to-[#b84760] hover:from-[#e08599] hover:to-[#c2546c] text-white text-xs sm:text-sm font-medium tracking-wide shadow-lg shadow-[#d96b82]/25 border border-[#e8c99b]/30 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    <Activity className="w-4 h-4 animate-pulse text-[#f5e4cb]" />
                    <span>Feel My Heartbeat</span>
                  </a>

                  <a
                    href="#timeline"
                    onClick={() => sound.playChime(587.33, 0.2)}
                    className="px-5 py-3 rounded-full bg-white/6 hover:bg-white/12 border border-[#e8c99b]/25 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    <Heart className="w-4 h-4 text-[#d96b82]" />
                    <span>Explore Our Story</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </a>
                </motion.div>
              </section>

              {/* 1. Hold to Feel My Heartbeat Sensory Section */}
              <section id="heartbeat" className="scroll-mt-28">
                <HeartbeatWidget herName={herName} />
              </section>

              {/* 2. Chrono Timeline Section */}
              <section id="timeline" className="scroll-mt-28">
                <Timeline herName={herName} />
              </section>

              {/* 3. Memory Constellation Photo Gallery Section */}
              <section id="memories" className="scroll-mt-28">
                <MemoryGallery herName={herName} />
              </section>

              {/* 4. The Moon Under Which We Began Astronomy Visualizer */}
              <section id="moon" className="scroll-mt-28">
                <MoonPhaseSection herName={herName} />
              </section>

              {/* 5. Romantic Soundtrack Section */}
              <MusicSection herName={herName} />

              {/* 6. Swipeable Reasons Why I Love You Card Deck */}
              <section id="reasons" className="scroll-mt-28">
                <ReasonsDeck herName={herName} />
              </section>

              {/* 7. Secret "Open When..." Love Letter Vault */}
              <section id="letters" className="scroll-mt-28">
                <LoveLetterVault herName={herName} />
              </section>

              {/* 8. System Specifications & Vows Section */}
              <section id="vows" className="scroll-mt-28">
                <SystemVows herName={herName} daysTogether={elapsed.days} />
              </section>

            </main>

            {/* Persistent Floating Music Player Dock */}
            <FloatingMusicPlayer />

            {/* Mobile Bottom Quick-Dock Navigation */}
            <MobileBottomDock />

            {/* Footer */}
            <footer className="w-full border-t border-white/8 bg-[#08090e]/90 backdrop-blur-md py-10 px-4 sm:px-6 text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 fill-[#d96b82] text-[#d96b82] animate-heart-beat" />
                <InfinityIcon className="w-5 h-5 text-[#e8c99b]" />
              </div>
              <p className="text-sm font-display text-slate-200">
                Compiled with infinite devotion by Arjun for his <strong className="text-[#e8c99b]">{herName}</strong>
              </p>
              <p className="text-xs font-mono text-slate-500">
                Genesis Coordinate: October 6, 2023 • Eternal Love Unbroken
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setIsSecretVaultOpen(true)}
                  className="flex items-center gap-1.5 text-[#e8c99b]/90 hover:text-[#e8c99b] transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Easter Egg Vault 🔐</span>
                </button>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Zero Downtime Vow
                </span>
                <span>•</span>
                <span>Forever & Always</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <MultiverseApp />
    </MusicProvider>
  );
}
