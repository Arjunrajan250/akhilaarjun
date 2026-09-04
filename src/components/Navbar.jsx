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
  Music, 
  Activity, 
  Moon,
  Video 
} from 'lucide-react';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';
import { useMusic } from '../context/MusicContext';

export default function Navbar({ 
  daysTogether, 
  herName, 
  onOpenSecretVault,
  onOpenHeartbeat,
  isDivineVideoEnabled = true,
  onToggleDivineVideo
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [tapCount, setTapCount] = useState(0);
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

  const handleLogoTap = (e) => {
    e.preventDefault();
    haptics.light();
    sound.playChime(659.25, 0.15);

    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount >= 5) {
      setTapCount(0);
      haptics.easterEgg();
      if (onOpenSecretVault) {
        onOpenSecretVault();
      }
    } else {
      setTimeout(() => {
        setTapCount(0);
      }, 2500);
    }
  };

  const navLinks = [
    { label: 'Pulse', href: '#heartbeat', icon: Activity },
    { label: 'Our Story', href: '#timeline', icon: Clock },
    { label: 'Memories', href: '#memories', icon: Camera },
    { label: 'The Moon', href: '#moon', icon: Moon },
    { label: 'Soundtrack', href: '#soundtrack', icon: Music },
    { label: 'Love Letters', href: '#letters', icon: Sparkles },
    { label: 'Vows', href: '#vows', icon: FileCode },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-2.5 pb-2 transition-all duration-300">
      <div 
        className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border ${
          isScrolled 
            ? 'glass-panel-glow border-[#e8c99b]/25 bg-[#08090e]/90 shadow-2xl backdrop-blur-xl' 
            : 'glass-panel border-white/10 bg-[#08090e]/60 backdrop-blur-md'
        }`}
      >
        {/* Brand / Logo with Easter Egg Multi-Tap */}
        <button 
          type="button"
          className="flex items-center gap-2 group cursor-pointer text-left relative"
          onClick={handleLogoTap}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d96b82] to-[#b84760] flex items-center justify-center shadow-md shadow-[#d96b82]/25 group-hover:scale-105 active:scale-95 transition-transform shrink-0 border border-[#e8c99b]/30">
            <Heart className="w-4 h-4 text-white fill-white animate-heart-beat" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#faf7f2] font-display flex items-center gap-1.5">
              <span>Arjun & {herName || 'Lechu'}</span>
              <Sparkles className="w-3 h-3 text-[#e8c99b] opacity-80" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#e8c99b]/90 -mt-0.5">
              Day {daysTogether || 0} • Eternal Love {tapCount > 1 && `(${tapCount}/5)`}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            if (link.href === '#heartbeat' && onOpenHeartbeat) {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    sound.playChime(493.88, 0.15);
                    onOpenHeartbeat();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-[#faf7f2] hover:bg-white/8 transition-all cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#d96b82]" />
                  <span>{link.label}</span>
                </button>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sound.playChime(493.88, 0.15)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-[#faf7f2] hover:bg-white/8 transition-all cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-[#d96b82]" />
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
                ? 'bg-[#d96b82]/20 border-[#d96b82]/50 text-[#fcdfe6] shadow-md shadow-[#d96b82]/20' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-[#faf7f2] hover:bg-white/10'
            }`}
          >
            <Music className={`w-4 h-4 ${isPlaying ? 'text-[#d96b82] animate-pulse' : ''}`} />
            {isPlaying && (
              <span className="hidden lg:flex items-end gap-0.5 h-3 pr-1">
                <span className="w-0.5 h-3 bg-[#e8c99b] rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                <span className="w-0.5 h-2 bg-[#d96b82] rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.15s]" />
                <span className="w-0.5 h-2.5 bg-[#e8c99b] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s]" />
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
                ? 'bg-white/5 border-white/10 text-slate-400 hover:text-[#faf7f2]' 
                : 'bg-[#e8c99b]/15 border-[#e8c99b]/30 text-[#e8c99b] hover:text-[#faf7f2]'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Divine Radha-Krishna Background Video Toggle */}
          {onToggleDivineVideo && (
            <button
              type="button"
              onClick={onToggleDivineVideo}
              aria-label={isDivineVideoEnabled ? 'Pause divine background video' : 'Play divine background video'}
              title={isDivineVideoEnabled ? 'Divine Ambience: On' : 'Divine Ambience: Off'}
              className={`p-2 rounded-xl sm:rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                isDivineVideoEnabled
                  ? 'bg-[#e8c99b]/20 border-[#e8c99b]/40 text-[#f5e4cb] shadow-sm'
                  : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
              }`}
            >
              <Video className="w-4 h-4" />
              <span className="hidden xl:inline text-[10px] font-sans tracking-wider uppercase font-medium">
                Divine Video
              </span>
            </button>
          )}

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
        <div className="md:hidden mt-2 p-4 rounded-2xl glass-panel-glow border border-[#e8c99b]/25 bg-[#08090e]/95 space-y-1.5 backdrop-blur-xl shadow-2xl animate-[fadeIn_0.2s_ease-out]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            if (link.href === '#heartbeat' && onOpenHeartbeat) {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    sound.playChime(493.88, 0.15);
                    setIsMobileMenuOpen(false);
                    onOpenHeartbeat();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/8 hover:text-[#fcdfe6] transition-colors cursor-pointer text-left"
                >
                  <Icon className="w-4 h-4 text-[#d96b82]" />
                  <span>{link.label}</span>
                </button>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playChime(493.88, 0.15);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/8 hover:text-[#fcdfe6] transition-colors"
              >
                <Icon className="w-4 h-4 text-[#d96b82]" />
                <span>{link.label}</span>
              </a>
            );
          })}

          {onToggleDivineVideo && (
            <button
              type="button"
              onClick={() => {
                onToggleDivineVideo();
                sound.playChime(587.33, 0.15);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/8 transition-colors border-t border-white/10 pt-3 mt-1 cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Video className="w-4 h-4 text-[#e8c99b]" />
                <span>Divine Video Ambience</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans ${isDivineVideoEnabled ? 'bg-[#e8c99b]/25 text-[#f5e4cb] border border-[#e8c99b]/40' : 'bg-white/10 text-slate-400'}`}>
                {isDivineVideoEnabled ? 'Active' : 'Paused'}
              </span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}