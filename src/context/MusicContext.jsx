import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { SONGS } from '../data/songsData';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [songs] = useState(SONGS);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(null);

  const currentSong = songs[currentSongIndex] || songs[0];

  // Initialize Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Update src when currentSongIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const wasPlaying = isPlayingRef.current;
    audio.src = encodeURI(currentSong.src);
    audio.load();

    if (wasPlaying) {
      audio.play().catch((err) => {
        console.warn('Playback error:', err);
        setIsPlaying(false);
      });
    }
  }, [currentSongIndex, currentSong]);

  // Handle song ended
  const handleSongEnded = useCallback(() => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.warn);
      }
      return;
    }

    if (isShuffle && songs.length > 1) {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * songs.length);
      } while (nextIdx === currentSongIndex);
      setCurrentSongIndex(nextIdx);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
  }, [isRepeat, isShuffle, songs.length, currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener('ended', handleSongEnded);
    return () => audio.removeEventListener('ended', handleSongEnded);
  }, [handleSongEnded]);

  const playSong = useCallback((songOrIndex) => {
    let index = -1;
    if (typeof songOrIndex === 'number') {
      index = songOrIndex;
    } else if (typeof songOrIndex === 'object' && songOrIndex !== null) {
      index = songs.findIndex((s) => s.id === songOrIndex.id);
    }

    if (index >= 0 && index < songs.length) {
      const audio = audioRef.current;
      if (index === currentSongIndex) {
        if (audio) {
          if (audio.paused) {
            audio.play().catch(console.warn);
            setIsPlaying(true);
          } else {
            audio.pause();
            setIsPlaying(false);
          }
        }
      } else {
        setCurrentSongIndex(index);
        setIsPlaying(true);
        if (audio) {
          audio.src = encodeURI(songs[index].src);
          audio.load();
          audio.play().catch(console.warn);
        }
      }
    }
  }, [songs, currentSongIndex]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      if (!audio.src) {
        audio.src = encodeURI(currentSong.src);
        audio.load();
      }
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback prevented:', err);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentSong]);

  const nextSong = useCallback(() => {
    if (isShuffle && songs.length > 1) {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * songs.length);
      } while (nextIdx === currentSongIndex);
      playSong(nextIdx);
    } else {
      const nextIdx = (currentSongIndex + 1) % songs.length;
      playSong(nextIdx);
    }
  }, [isShuffle, songs.length, currentSongIndex, playSong]);

  const prevSong = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    const prevIdx = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prevIdx);
  }, [currentSongIndex, songs.length, playSong]);

  const seek = useCallback((timeInSeconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(timeInSeconds, duration || 0));
    setCurrentTime(audio.currentTime);
  }, [duration]);

  const setVolume = useCallback((newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.muted = newMuted;
  }, [isMuted]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  const value = {
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
    isLoading,
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
