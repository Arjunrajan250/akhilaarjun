import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RadhaKrishnaBackground({ 
  isEnabled = true, 
  opacity = 0.32,
  customVideoUrl = null 
}) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeSrc, setActiveSrc] = useState(customVideoUrl || '/videos/radha-krishna.mp4');

  useEffect(() => {
    if (customVideoUrl) {
      setActiveSrc(customVideoUrl);
      setHasError(false);
      setVideoLoaded(false);
    }
  }, [customVideoUrl]);

  useEffect(() => {
    if (videoRef.current && isEnabled) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [isEnabled, activeSrc]);

  if (!isEnabled) return null;

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none transition-opacity duration-1000"
      style={{ opacity }}
    >
      {/* 1. Animated Video Element */}
      <video
        ref={videoRef}
        key={activeSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => {
          setVideoLoaded(true);
          setHasError(false);
        }}
        onError={() => {
          setHasError(true);
          setVideoLoaded(false);
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && !hasError ? 'opacity-100 scale-105' : 'opacity-0'
        }`}
        style={{
          filter: 'contrast(1.08) brightness(0.92) saturate(1.15)',
        }}
      >
        <source src={activeSrc} type="video/mp4" />
        <source src="/videos/radha-krishna.webm" type="video/webm" />
      </video>

      {/* 2. Ethereal Divine Aura Fallback (Rendered when video is loading or awaiting video file) */}
      {(!videoLoaded || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Subtle Divine Mandala & Flute Starlight Motif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.65, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="relative w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full flex items-center justify-center"
          >
            {/* Outer Sacred Halo */}
            <div className="absolute inset-0 rounded-full border border-[#e8c99b]/15 animate-spin-slow" />
            <div className="absolute inset-8 rounded-full border border-dashed border-[#d96b82]/20 animate-reverse-spin" />
            <div className="absolute inset-24 rounded-full bg-gradient-to-tr from-[#d96b82]/10 via-[#e8c99b]/10 to-[#798cb7]/10 blur-3xl" />

            {/* Sacred Peacock Feather & Starlight Emblem */}
            <svg
              viewBox="0 0 200 200"
              className="w-48 h-48 sm:w-64 sm:h-64 text-[#e8c99b]/25 drop-shadow-[0_0_25px_rgba(232,201,155,0.3)] animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              {/* Flute Motif */}
              <line x1="30" y1="130" x2="170" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="70" cy="115" r="2.5" fill="currentColor" />
              <circle cx="90" cy="107" r="2.5" fill="currentColor" />
              <circle cx="110" cy="100" r="2.5" fill="currentColor" />
              <circle cx="130" cy="92" r="2.5" fill="currentColor" />

              {/* Peacock Feather Curve */}
              <path
                d="M 170 70 C 185 45, 175 20, 145 25 C 120 30, 130 60, 145 65"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 155 35 C 162 40, 160 50, 150 48 C 142 45, 145 38, 155 35 Z"
                fill="#d96b82"
                fillOpacity="0.3"
              />
              <circle cx="153" cy="42" r="3.5" fill="#798cb7" fillOpacity="0.5" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* 3. Deep Midnight Vignette & Editorial Color Mask */}
      {/* Radial center highlight fading into deep midnight obsidian #08090e on edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, transparent 15%, rgba(8, 9, 14, 0.45) 55%, #08090e 95%)',
        }}
      />

      {/* Vertical top & bottom gradient to maintain crisp contrast for Navbar and Footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090e] via-transparent to-[#08090e] opacity-85 pointer-events-none" />

      {/* Warm Starlight Indigo & Rose Specular Tint */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#121624]/40 via-transparent to-[#d96b82]/10 mix-blend-color pointer-events-none" />
    </div>
  );
}
