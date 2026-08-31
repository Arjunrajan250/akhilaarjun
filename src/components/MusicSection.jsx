import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Heart, 
  Sparkles, 
  Shuffle,
  Volume2
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export default function MusicSection({ herName }) {
  const { 
    songs, 
    currentSongIndex, 
    isPlaying, 
    playSong, 
    togglePlay, 
    toggleShuffle 
  } = useMusic();

  const handlePlayAll = () => {
    if (!isPlaying) {
      togglePlay();
    }
  };

  const handleShuffleAll = () => {
    toggleShuffle();
    const randomIdx = Math.floor(Math.random() * songs.length);
    playSong(randomIdx);
  };

  return (
    <section id="soundtrack" className="relative scroll-mt-28 space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>CELESTIAL FREQUENCIES // 7 ROMANTIC COMPOSITIONS</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extralight tracking-tight text-white font-display"
        >
          Soundtrack to Our <span className="font-semibold gradient-text-romantic">Universe</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300/80 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed"
        >
          Every note, chord, and rhythm in this collection is tied to a memory of you, <strong className="text-white font-medium">{herName}</strong>. 
          Listen to the songs that remind me of how profoundly you changed my world.
        </motion.p>

        {/* Global Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <button
            type="button"
            onClick={handlePlayAll}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs sm:text-sm font-medium tracking-wide shadow-lg shadow-pink-600/30 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Soundtrack</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span>Play Soundtrack</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleShuffleAll}
            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Shuffle className="w-4 h-4 text-rose-400" />
            <span>Shuffle Universe</span>
          </button>
        </motion.div>
      </div>

      {/* Song Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {songs.map((song, index) => {
          const isCurrent = index === currentSongIndex;
          const isThisPlaying = isCurrent && isPlaying;

          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                isCurrent 
                  ? 'glass-panel-glow border-pink-500/40 bg-slate-950/85 shadow-2xl shadow-pink-500/10' 
                  : 'glass-panel border-white/10 hover:border-pink-500/30 bg-slate-950/60'
              }`}
            >
              {/* Top Accent Gradient Border */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${song.accent} transition-opacity ${
                  isCurrent ? 'opacity-100' : 'opacity-30 group-hover:opacity-80'
                }`} 
              />

              <div>
                {/* Header info & Index Badge */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-rose-400/80 font-semibold">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                      {song.mood}
                    </span>
                  </div>

                  {isThisPlaying && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono">
                      <Volume2 className="w-3 h-3 animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  )}
                </div>

                {/* Song Title & Artist */}
                <div className="space-y-1 mb-3 sm:mb-4">
                  <h3 className="font-display font-bold text-base sm:text-xl text-white group-hover:text-rose-200 transition-colors flex items-center gap-2">
                    <span>{song.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans">
                    {song.artist}
                  </p>
                </div>

                {/* Romantic Dedication Quote */}
                <p className="text-xs text-slate-400 font-light leading-relaxed mb-5 italic border-l-2 border-pink-500/30 pl-3">
                  "{song.description}"
                </p>
              </div>

              {/* Bottom Play Action Row */}
              <div className="pt-3.5 sm:pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-rose-300/80">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{song.tag}</span>
                </div>

                <button
                  type="button"
                  onClick={() => playSong(index)}
                  className={`px-4 py-2.5 sm:py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                    isThisPlaying
                      ? 'bg-rose-600 text-white shadow-rose-600/30 hover:bg-rose-500'
                      : 'bg-white/10 hover:bg-white/20 text-white group-hover:bg-rose-600 group-hover:text-white'
                  }`}
                  aria-label={isThisPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
                >
                  {isThisPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-white" />
                      <span>Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      <span>Play Track</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
