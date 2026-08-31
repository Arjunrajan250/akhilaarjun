import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles,
  Clock,
  FileCode,
  Camera,
  Music
} from 'lucide-react';
import { sound } from '../utils/sound';
import { useMusic } from '../context/MusicContext';

export default function Navbar({ daysTogether, herName }) {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isPlaying, togglePlay } = useMusic();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playChime(587.33, 0.3, 'sine');
    }
  };

  const navLinks = [
    { label: 'Timeline', href: '#timeline', icon: Clock },
    { label: 'Our Memories', href: '#memories', icon: Camera },
    { label: 'Soundtrack', href: '#soundtrack', icon: Music },
    { label: 'Love Letters', href: '#letters', icon: Sparkles },
    { label: 'System Vows', href: '#vows', icon: FileCode },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-3 pb-2 transition-all duration-300">
      <div 
        className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border ${
          isScrolled 
            ? 'glass-panel-glow border-pink-500/30 bg-slate-950/85 shadow-2xl backdrop-blur-xl' 
            : 'glass-panel border-white/10 bg-slate-950/50 backdrop-blur-md'
        }`}
      >
        {/* Brand / Logo */}
        <a 
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sound.playChime(659.25, 0.2);
          }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 text-white fill-white animate-heart-beat" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-white font-display flex items-center gap-1.5">
              <span>Arjun & {herName || 'Lechu'}</span>
              <Sparkles className="w-3 h-3 text-pink-400 opacity-70" />
            </span>
            <span className="text-[10px] font-mono text-rose-300/80 -mt-0.5">
              Day {daysTogether || 0} // ∞ Loop
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sound.playChime(493.88, 0.15)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-rose-400/80" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Quick Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Music Toggle */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause romantic soundtrack' : 'Play romantic soundtrack'}
            title={isPlaying ? 'Pause Music' : 'Play Romantic Music'}
            className={`p-2 rounded-xl sm:rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
              isPlaying 
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-md shadow-pink-500/20' 
                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Music className={`w-4 h-4 ${isPlaying ? 'text-pink-400 animate-pulse' : ''}`} />
            {isPlaying && (
              <span className="hidden lg:flex items-end gap-0.5 h-3 pr-1">
                <span className="w-0.5 h-3 bg-rose-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.15s]" />
                <span className="w-0.5 h-2.5 bg-rose-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s]" />
              </span>
            )}
          </button>

          {/* Procedural Sound FX Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute ambient sound FX' : 'Mute ambient sound FX'}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className={`p-2 rounded-xl sm:rounded-full border transition-all cursor-pointer ${
              isMuted 
                ? 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white' 
                : 'bg-rose-500/10 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl glass-panel-glow border border-pink-500/30 bg-slate-950/95 space-y-2 backdrop-blur-xl shadow-2xl animate-[fadeIn_0.2s_ease-out]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playChime(493.88, 0.15);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/10 hover:text-rose-300 transition-colors"
              >
                <Icon className="w-4 h-4 text-rose-400" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}