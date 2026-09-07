import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Repeat, 
  ChevronUp, 
  Disc3, 
  Heart,
  Music2,
  ListMusic,
  X
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { haptics } from '../utils/haptics';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function FloatingMusicPlayer() {
  const {
    songs,
    currentSong,
    currentSongIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    isRepeat,
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  } = useMusic();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* 1. Collapsed Floating Mini Pill (Visible when player is minimized) */}
      {!isExpanded && (
        <aside 
          aria-label="Audio player dock" 
          className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex justify-end pointer-events-auto"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <motion.div
            key="collapsed-player"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 sm:pr-3 rounded-full glass-panel-glow border border-[#e8c99b]/35 bg-[#08090e]/92 shadow-2xl backdrop-blur-xl group cursor-pointer hover:border-[#e8c99b]/60 transition-all max-w-[170px] sm:max-w-none"
            onClick={() => {
              haptics.light();
              setIsExpanded(true);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsExpanded(true);
              }
            }}
          >
            {/* Spinning Disc Avatar */}
            <div className="relative w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#0d1017] border border-[#e8c99b]/30 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ 
                  repeat: isPlaying ? Infinity : 0, 
                  duration: 6, 
                  ease: 'linear' 
                }}
                className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-tr ${currentSong.accent} opacity-85`}
              >
                <Disc3 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
              </motion.div>
            </div>

            {/* Track Info Preview */}
            <div className="flex flex-col min-w-0 max-w-[70px] sm:max-w-[170px] pr-0.5 text-left">
              <div className="flex items-center gap-1">
                <span className="text-[10px] sm:text-xs font-semibold text-white truncate font-display">
                  {currentSong.title}
                </span>
                {isPlaying && (
                  <div className="hidden sm:flex items-end gap-0.5 h-2.5 shrink-0">
                    <span className="w-0.5 h-2.5 bg-[#e8c99b] rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-1.5 bg-[#d96b82] rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.15s]" />
                    <span className="w-0.5 h-2 bg-[#e8c99b] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s]" />
                  </div>
                )}
              </div>
              <span className="text-[8px] sm:text-[10px] text-[#e8c99b]/90 truncate">
                {currentSong.artist}
              </span>
            </div>

            {/* Quick Play/Pause Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                haptics.light();
                togglePlay();
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d96b82] hover:bg-[#c2546c] flex items-center justify-center text-white shadow-md shadow-[#d96b82]/30 transition-transform active:scale-90 cursor-pointer shrink-0"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
              ) : (
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white ml-0.5" />
              )}
            </button>

            {/* Expand Arrow */}
            <div className="pl-0.5 text-slate-400 group-hover:text-[#e8c99b] transition-colors hidden sm:block">
              <ChevronUp className="w-4 h-4" />
            </div>
          </motion.div>
        </aside>
      )}

      {/* 2. Expanded Player: Responsive Luxury Bottom Sheet on Mobile, Floating Card on Desktop */}
      <AnimatePresence>
        {isExpanded && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-end sm:justify-end sm:p-6 bg-black/65 backdrop-blur-md transition-all"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                haptics.light();
                setIsExpanded(false);
              }
            }}
          >
            {/* Modal / Card Container */}
            <motion.div
              key="expanded-player-sheet"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full sm:w-96 max-h-[84vh] sm:max-h-[88vh] overflow-y-auto rounded-t-[2.2rem] sm:rounded-3xl glass-panel-glow border-t sm:border border-[#e8c99b]/40 p-5 sm:p-6 shadow-[0_-15px_50px_rgba(0,0,0,0.8),0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl bg-[#0c101a]/95 text-white relative overflow-x-hidden"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)' }}
            >
              {/* Mobile Dismiss Drag Indicator Bar */}
              <div 
                className="w-12 h-1.5 rounded-full bg-white/25 hover:bg-white/40 transition-colors mx-auto mb-3.5 sm:hidden cursor-pointer active:scale-95"
                onClick={() => {
                  haptics.light();
                  setIsExpanded(false);
                }}
                aria-label="Dismiss Player"
                role="button"
              />

              {/* Background Ambient Cosmic Glows */}
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#e8c99b]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[#d96b82]/15 blur-3xl pointer-events-none" />

              {/* Top Bar: Label & Action Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#e8c99b]">
                  <Music2 className="w-3.5 h-3.5 text-[#e8c99b] animate-pulse" />
                  <span className="tracking-wider uppercase">MUSIC SANCTUARY • {currentSongIndex + 1}/{songs.length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      setShowQueue(!showQueue);
                    }}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      showQueue 
                        ? 'bg-[#e8c99b]/25 border-[#e8c99b]/40 text-[#f5e4cb]' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                    title="Toggle Track List"
                    aria-label="Toggle Track List"
                  >
                    <ListMusic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      setIsExpanded(false);
                    }}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
                    title="Close Player"
                    aria-label="Close Player"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Queue Drawer or Main View */}
              {showQueue ? (
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 my-3 custom-scrollbar">
                  {songs.map((song, idx) => {
                    const isCurrent = idx === currentSongIndex;
                    return (
                      <button
                        key={song.id}
                        type="button"
                        onClick={() => {
                          haptics.light();
                          playSong(idx);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs cursor-pointer ${
                          isCurrent
                            ? 'bg-[#e8c99b]/15 border border-[#e8c99b]/35 text-white'
                            : 'bg-white/5 hover:bg-white/10 border border-transparent text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`font-mono text-[10px] ${isCurrent ? 'text-[#e8c99b] font-bold' : 'text-slate-500'}`}>
                            0{idx + 1}
                          </span>
                          <div className="truncate">
                            <p className={`font-medium truncate ${isCurrent ? 'text-[#f5e4cb]' : 'text-slate-200'}`}>
                              {song.title}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">{song.artist}</p>
                          </div>
                        </div>
                        {isCurrent && isPlaying && (
                          <div className="flex items-end gap-0.5 h-3 shrink-0">
                            <span className="w-0.5 h-3 bg-[#e8c99b] rounded-full animate-pulse" />
                            <span className="w-0.5 h-2 bg-[#d96b82] rounded-full animate-pulse" />
                            <span className="w-0.5 h-2.5 bg-[#e8c99b] rounded-full animate-pulse" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <>
                  {/* Spinning Vinyl Record Visual */}
                  <div className="my-4 sm:my-5 flex flex-col items-center justify-center">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                      {/* Glowing outer aura */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${currentSong.accent} blur-xl opacity-40 transition-opacity ${isPlaying ? 'opacity-70 scale-105' : 'opacity-20'}`} />
                      
                      {/* Vinyl Disc */}
                      <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ 
                          repeat: isPlaying ? Infinity : 0, 
                          duration: 8, 
                          ease: 'linear' 
                        }}
                        className="relative w-full h-full rounded-full bg-[#0d1017] border-4 border-[#1c2230] shadow-xl flex items-center justify-center overflow-hidden"
                      >
                        {/* Vinyl grooves */}
                        <div className="absolute inset-2 rounded-full border border-slate-700/30" />
                        <div className="absolute inset-5 rounded-full border border-slate-700/40" />
                        <div className="absolute inset-8 rounded-full border border-slate-700/50" />
                        
                        {/* Center Label */}
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentSong.accent} flex items-center justify-center shadow-md p-2 text-center`}>
                          <Disc3 className={`w-5 h-5 text-white ${isPlaying ? 'animate-spin' : ''}`} />
                        </div>
                      </motion.div>

                      {/* Romantic Heart badge */}
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#d96b82] border border-white/20 flex items-center justify-center shadow-md shadow-[#d96b82]/40">
                        <Heart className="w-3.5 h-3.5 fill-white text-white" />
                      </div>
                    </div>

                    {/* Track Info */}
                    <div className="text-center mt-3 sm:mt-4 px-2 space-y-1 w-full">
                      <h4 className="font-display font-semibold text-base sm:text-lg text-white truncate">
                        {currentSong.title}
                      </h4>
                      <p className="text-xs text-[#e8c99b]/90 font-sans truncate">
                        {currentSong.artist}
                      </p>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e8c99b]/15 border border-[#e8c99b]/25 text-[10px] font-mono text-[#f5e4cb] mt-1">
                        {currentSong.mood} • {currentSong.tag}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Seek Bar & Timestamps */}
              <div className="space-y-1.5 mt-3">
                <div className="relative flex items-center group">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => seek(Number(e.target.value))}
                    aria-label="Seek track position"
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#e8c99b] hover:h-2 transition-all"
                    style={{
                      background: `linear-gradient(to right, #e8c99b ${progressPercent}%, rgba(255, 255, 255, 0.1) ${progressPercent}%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between mt-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    haptics.light();
                    toggleShuffle();
                  }}
                  className={`p-2.5 sm:p-2 rounded-full transition-colors cursor-pointer active:scale-95 ${
                    isShuffle ? 'text-[#e8c99b] bg-[#e8c99b]/20' : 'text-slate-400 hover:text-white'
                  }`}
                  title={isShuffle ? 'Shuffle Enabled' : 'Shuffle Off'}
                  aria-label="Toggle shuffle"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      prevSong();
                    }}
                    className="p-3 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-transform active:scale-95 cursor-pointer"
                    title="Previous Song"
                    aria-label="Previous track"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      togglePlay();
                    }}
                    className="p-4 sm:p-4 rounded-full bg-gradient-to-r from-[#d96b82] to-[#b84760] hover:from-[#e08599] hover:to-[#c2546c] text-white shadow-lg shadow-[#d96b82]/30 border border-[#e8c99b]/30 transition-transform active:scale-95 cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      nextSong();
                    }}
                    className="p-3 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-transform active:scale-95 cursor-pointer"
                    title="Next Song"
                    aria-label="Next track"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    haptics.light();
                    toggleRepeat();
                  }}
                  className={`p-2.5 sm:p-2 rounded-full transition-colors cursor-pointer active:scale-95 ${
                    isRepeat ? 'text-[#e8c99b] bg-[#e8c99b]/20' : 'text-slate-400 hover:text-white'
                  }`}
                  title={isRepeat ? 'Repeat Song Enabled' : 'Repeat Off'}
                  aria-label="Toggle repeat"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Control Bar */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/8 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    haptics.light();
                    toggleMute();
                  }}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label="Toggle mute"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#d96b82]" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume slider"
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#e8c99b]"
                />
                <span className="font-mono text-[10px] w-7 text-right">
                  {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
