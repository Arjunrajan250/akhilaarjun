import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  MapPin, 
  Calendar, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Camera,
  Search,
  Shuffle,
  Play,
  Pause,
  Grid3X3,
  LayoutGrid,
  ChevronDown,
  Clock,
  Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { MEMORIES_DATA, CATEGORIES, YEARS } from '../data/memoriesData';

const INITIAL_DISPLAY_COUNT = 12;
const PAGE_INCREMENT = 12;

export default function MemoryGallery({ herName }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);
  const [viewMode, setViewMode] = useState('polaroid'); // 'polaroid' | 'compact'
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);
  const [likedPhotos, setLikedPhotos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('multiverse_liked_photos') || '{}');
    } catch {
      return {};
    }
  });

  // Filter memories according to Category, Year, and Search
  const filteredMemories = useMemo(() => {
    return MEMORIES_DATA.filter((m) => {
      const matchesCategory = activeCategory === 'all' || m.category === activeCategory;
      const matchesYear = activeYear === 'all' || String(m.year) === String(activeYear);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        m.title.toLowerCase().includes(query) ||
        m.subtitle.toLowerCase().includes(query) ||
        m.location.toLowerCase().includes(query) ||
        m.story.toLowerCase().includes(query) ||
        m.date.toLowerCase().includes(query);

      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [activeCategory, activeYear, searchQuery]);

  // Sliced items for display
  const displayedMemories = useMemo(() => {
    return filteredMemories.slice(0, visibleCount);
  }, [filteredMemories, visibleCount]);

  const hasMore = visibleCount < filteredMemories.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_INCREMENT, filteredMemories.length));
    sound.playChime(587.33, 0.2, 'sine');
  };

  const handleShowAll = () => {
    setVisibleCount(filteredMemories.length);
    sound.playChime(659.25, 0.25, 'sine');
  };

  // Heart Reaction
  const handleLike = (e, id) => {
    e.stopPropagation();
    setLikedPhotos((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      try {
        localStorage.setItem('multiverse_liked_photos', JSON.stringify(next));
      } catch {
        // local storage fallback
      }
      return next;
    });

    sound.playChime(784, 0.35, 'sine');
    confetti({
      particleCount: 28,
      spread: 60,
      origin: {
        x: e.clientX ? e.clientX / window.innerWidth : 0.5,
        y: e.clientY ? e.clientY / window.innerHeight : 0.5,
      },
      colors: ['#ec4899', '#f43f5e', '#fb7185', '#fda4af', '#fbbf24'],
    });
  };

  // Lightbox Handlers
  const handleOpenLightbox = (index) => {
    setSelectedPhotoIndex(index);
    sound.playChime(528, 0.25, 'sine');
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredMemories.length - 1));
    sound.playChime(440, 0.15);
  }, [filteredMemories.length]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev < filteredMemories.length - 1 ? prev + 1 : 0));
    sound.playChime(660, 0.15);
  }, [filteredMemories.length]);

  // Surprise Me / Pick Random Memory
  const handleSurpriseMe = () => {
    if (filteredMemories.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredMemories.length);
    setSelectedPhotoIndex(randomIndex);
    sound.playUnlockChord();
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#f43f5e', '#a855f7', '#fbbf24', '#38bdf8'],
    });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleCloseLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handlePrev, handleNext]);

  // Slideshow auto-advance timer
  useEffect(() => {
    let timer;
    if (isSlideshowActive && isSlideshowPlaying && filteredMemories.length > 0) {
      timer = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % filteredMemories.length);
        sound.playChime(528, 0.1, 'sine');
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isSlideshowActive, isSlideshowPlaying, filteredMemories.length]);

  const totalHearts = useMemo(() => {
    return Object.values(likedPhotos).reduce((acc, count) => acc + count, 0);
  }, [likedPhotos]);

  return (
    <div className="relative w-full space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono tracking-wider shadow-sm">
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>VISUAL CHRONICLES // 50+ ETERNAL MEMORIES ARCHIVE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-light text-white font-display">
          Our <span className="font-semibold gradient-text-romantic">Memory Constellation</span>
        </h2>

        <p className="text-slate-300/90 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
          Every frozen frame is an eternal coordinate of our universe. Captured and compiled for{' '}
          <strong className="text-white font-medium">{herName || 'Lechu'}</strong>.
        </p>

        {/* Live Archive Metrics Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <Sparkle className="w-3.5 h-3.5 text-pink-400" />
            <strong className="text-white font-semibold">{filteredMemories.length}</strong> Memories Loaded
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <strong className="text-rose-200 font-semibold">{totalHearts}</strong> Hearts Given
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            Oct 2023 - Forever
          </span>
        </div>
      </div>

      {/* Control Center: Search, View Mode, Surprise Me & Slideshow */}
      <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-white/10 shadow-xl space-y-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(INITIAL_DISPLAY_COUNT);
              }}
              placeholder="Search by moment, location, or memory..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-slate-950/60 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Interactive Feature Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Surprise Me Button */}
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-amber-100 text-xs font-medium transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>Surprise Me</span>
            </button>

            {/* Slideshow Mode Button */}
            <button
              type="button"
              onClick={() => {
                setIsSlideshowActive(true);
                setSlideshowIndex(0);
                setIsSlideshowPlaying(true);
                sound.playChime(660, 0.3, 'sine');
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-rose-500/20 border border-rose-500/40 hover:border-rose-400 text-rose-200 hover:text-white text-xs font-medium transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>Slideshow</span>
            </button>

            {/* View Mode Toggle: Polaroid vs Compact */}
            <div className="flex items-center p-1 rounded-full bg-slate-950/70 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setViewMode('polaroid');
                  sound.playChime(493.88, 0.15);
                }}
                title="Polaroid Grid View"
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  viewMode === 'polaroid'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('compact');
                  sound.playChime(528, 0.15);
                }}
                title="Compact Masonry View"
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  viewMode === 'compact'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Year Filter Chips */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-rose-400" />
            Epoch:
          </span>
          {YEARS.map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => {
                setActiveYear(yr);
                setVisibleCount(INITIAL_DISPLAY_COUNT);
                sound.playChime(440, 0.15);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeYear === yr
                  ? 'bg-rose-500/30 text-rose-200 border border-rose-500 font-semibold'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {yr === 'all' ? 'All Years' : yr}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setVisibleCount(INITIAL_DISPLAY_COUNT);
                sound.playChime(493.88, 0.15);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Zero Results State */}
      {filteredMemories.length === 0 && (
        <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 space-y-4 max-w-lg mx-auto">
          <Sparkles className="w-8 h-8 text-rose-400 mx-auto animate-pulse" />
          <h3 className="text-lg font-medium text-white">No constellations match your search</h3>
          <p className="text-xs text-slate-400">
            Try clearing your search query or selecting a different year or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setActiveYear('all');
            }}
            className="px-4 py-2 rounded-full bg-rose-500 text-white text-xs font-medium cursor-pointer hover:bg-rose-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Gallery Grid Display */}
      {displayedMemories.length > 0 && (
        <>
          {viewMode === 'polaroid' ? (
            /* Polaroid View: Realistic tilted cards with pins */
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-2"
            >
              <AnimatePresence mode="popLayout">
                {displayedMemories.map((photo, idx) => {
                  const isLiked = (likedPhotos[photo.id] || 0) > 0;
                  return (
                    <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, delay: (idx % 6) * 0.04 }}
                      whileHover={{ 
                        scale: 1.03, 
                        rotate: 0, 
                        zIndex: 20,
                        transition: { duration: 0.25, ease: 'easeOut' } 
                      }}
                      style={{ rotate: `${photo.rotation}deg` }}
                      onClick={() => handleOpenLightbox(idx)}
                      className="group relative cursor-pointer"
                    >
                      {/* Polaroid Frame */}
                      <div className="p-4 sm:p-5 rounded-3xl glass-panel-glow border border-pink-500/20 bg-slate-900/75 hover:border-pink-400/50 shadow-2xl transition-all duration-300">
                        {/* Polaroid Pin */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-300 via-rose-300 to-pink-400 shadow-md border border-white/40 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-slate-950/60" />
                        </div>

                        {/* Photo Image Canvas */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950/80 mb-4 border border-white/10">
                          <img
                            src={photo.src}
                            alt={photo.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          />

                          {/* Top Right Quick Expand Indicator */}
                          <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>

                          {/* Bottom Floating Location Badge */}
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-200">
                            <MapPin className="w-3 h-3 text-rose-400" />
                            <span>{photo.location}</span>
                          </div>

                          {/* Index Badge */}
                          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                            #{photo.id}
                          </div>
                        </div>

                        {/* Caption Section */}
                        <div className="space-y-2 px-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-base sm:text-lg font-medium text-white font-display tracking-tight group-hover:text-rose-200 transition-colors line-clamp-1">
                                {photo.title}
                              </h3>
                              <p className="text-xs text-rose-300/80 italic font-serif line-clamp-1">
                                "{photo.subtitle}"
                              </p>
                            </div>

                            {/* Heart Reaction */}
                            <button
                              type="button"
                              onClick={(e) => handleLike(e, photo.id)}
                              aria-label="Send Love"
                              title="Click to send love"
                              className={`p-2 rounded-full border transition-all cursor-pointer shrink-0 ${
                                isLiked
                                  ? 'bg-rose-500/30 border-rose-500 text-rose-400 scale-110'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-rose-300 hover:bg-rose-500/20'
                              }`}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  isLiked ? 'fill-rose-500 text-rose-500 animate-heart-beat' : ''
                                }`}
                              />
                            </button>
                          </div>

                          <p className="text-xs text-slate-300/80 font-light line-clamp-2 leading-relaxed">
                            {photo.story}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-rose-400" />
                              {photo.date}
                            </span>
                            {(likedPhotos[photo.id] || 0) > 0 && (
                              <span className="text-rose-300 font-medium">
                                ❤️ {likedPhotos[photo.id]} Loved
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Compact Masonry View: High-density sleek modern card wall */
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-2"
            >
              <AnimatePresence mode="popLayout">
                {displayedMemories.map((photo, idx) => {
                  const isLiked = (likedPhotos[photo.id] || 0) > 0;
                  return (
                    <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -6 }}
                      onClick={() => handleOpenLightbox(idx)}
                      className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-pink-400/40 shadow-xl cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] bg-slate-950">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        
                        {/* Heart Button Overlay */}
                        <button
                          type="button"
                          onClick={(e) => handleLike(e, photo.id)}
                          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 text-slate-300 hover:text-rose-400 transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-medium text-white line-clamp-1 group-hover:text-rose-200">
                            {photo.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-rose-400" />
                            {photo.location}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Load More / Pagination Controls */}
          <div className="pt-8 text-center space-y-4 max-w-md mx-auto">
            {/* Progress Counter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>Displaying {displayedMemories.length} of {filteredMemories.length}</span>
                <span>{Math.round((displayedMemories.length / filteredMemories.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
                  style={{ width: `${(displayedMemories.length / filteredMemories.length) * 100}%` }}
                />
              </div>
            </div>

            {hasMore ? (
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-rose-500/20 border border-white/20 hover:border-rose-500/50 text-white text-xs sm:text-sm font-medium transition-all shadow-lg hover:shadow-rose-500/20 cursor-pointer flex items-center gap-2"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>Reveal 12 More Memories</span>
                </button>
                <button
                  type="button"
                  onClick={handleShowAll}
                  className="px-4 py-3 rounded-full bg-transparent hover:bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs font-mono transition-all cursor-pointer"
                >
                  Show All ({filteredMemories.length})
                </button>
              </div>
            ) : (
              <div className="text-xs font-mono text-slate-500 pt-2 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>All {filteredMemories.length} coordinates displayed // Infinitely expanding</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredMemories[selectedPhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl glass-panel-glow border border-pink-500/30 overflow-hidden shadow-2xl bg-slate-900/95 my-auto"
            >
              {/* Top Bar Controls */}
              <div className="p-3.5 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60 shrink-0">
                <div className="flex items-center gap-2 text-rose-300 font-mono text-[11px] sm:text-xs truncate">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse shrink-0" />
                  <span className="truncate">#{filteredMemories[selectedPhotoIndex].id} ({selectedPhotoIndex + 1}/{filteredMemories.length})</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleLike(e, filteredMemories[selectedPhotoIndex].id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-medium cursor-pointer hover:bg-rose-500/30 transition-all active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    <span>
                      {likedPhotos[filteredMemories[selectedPhotoIndex].id] || 0}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseLightbox}
                    aria-label="Close memory modal"
                    className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Content Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-y-auto flex-1 custom-scrollbar">
                {/* Photo Display View */}
                <div className="relative md:col-span-7 bg-slate-950 flex items-center justify-center p-3 sm:p-6 min-h-[240px] sm:min-h-[440px]">
                  <img
                    src={filteredMemories[selectedPhotoIndex].src}
                    alt={filteredMemories[selectedPhotoIndex].title}
                    className="max-h-[350px] sm:max-h-[500px] w-full object-contain rounded-2xl shadow-2xl border border-white/10"
                  />

                  {/* Navigation Arrows */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-rose-500 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-rose-500 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Romantic Story Detail View */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-slate-900/50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-rose-300">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      <span>{filteredMemories[selectedPhotoIndex].date}</span>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{filteredMemories[selectedPhotoIndex].location}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-white font-display leading-tight">
                      {filteredMemories[selectedPhotoIndex].title}
                    </h3>
                    <p className="text-sm text-rose-300 font-serif italic">
                      "{filteredMemories[selectedPhotoIndex].subtitle}"
                    </p>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                        {filteredMemories[selectedPhotoIndex].story}
                      </p>
                    </div>
                  </div>

                  {/* Devotional Note Footer & Keyboard Hint */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="text-xs text-slate-400 font-light italic flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 flex-shrink-0 animate-heart-beat" />
                      <span>Every memory with you is my favorite chapter.</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      Keyboard: Use ← Left / → Right arrows to navigate, ESC to close
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Autoplay Slideshow Overlay */}
      <AnimatePresence>
        {isSlideshowActive && filteredMemories[slideshowIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950/96 backdrop-blur-2xl p-6 sm:p-10 select-none"
          >
            {/* Top Slideshow Control Bar */}
            <div className="w-full max-w-5xl flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-rose-300 font-mono text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                <span>SLIDESHOW THEATER // {slideshowIndex + 1} OF {filteredMemories.length}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  {isSlideshowPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isSlideshowPlaying ? 'Pause' : 'Resume'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSlideshowActive(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-rose-500 text-white border border-white/20 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage Image & Story */}
            <div className="relative w-full max-w-4xl flex-1 flex flex-col items-center justify-center my-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideshowIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="flex flex-col items-center justify-center max-w-3xl text-center space-y-4"
                >
                  <div className="relative max-h-[55vh] rounded-3xl overflow-hidden shadow-2xl border border-pink-500/30 glass-panel-glow">
                    <img
                      src={filteredMemories[slideshowIndex].src}
                      alt={filteredMemories[slideshowIndex].title}
                      className="max-h-[55vh] w-auto object-contain"
                    />
                  </div>

                  <div className="space-y-1.5 px-4 max-w-2xl">
                    <div className="text-xs font-mono text-rose-300">
                      {filteredMemories[slideshowIndex].date} • {filteredMemories[slideshowIndex].location}
                    </div>
                    <h3 className="text-xl sm:text-3xl font-display text-white font-medium">
                      {filteredMemories[slideshowIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light italic leading-relaxed">
                      "{filteredMemories[slideshowIndex].story}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Nav Buttons */}
              <button
                type="button"
                onClick={() => setSlideshowIndex((prev) => (prev > 0 ? prev - 1 : filteredMemories.length - 1))}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-rose-500 text-white backdrop-blur-md border border-white/20 cursor-pointer transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => setSlideshowIndex((prev) => (prev + 1) % filteredMemories.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-rose-500 text-white backdrop-blur-md border border-white/20 cursor-pointer transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Progress Bar */}
            <div className="w-full max-w-5xl space-y-2 z-10">
              <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${((slideshowIndex + 1) / filteredMemories.length) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Multiverse Cinema Mode</span>
                <span>Auto-advancing every 4.5s</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
