import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

const HEART_COLORS = [
  'text-[#d96b82] fill-[#d96b82] drop-shadow-[0_0_14px_rgba(217,107,130,0.8)]',
  'text-[#b84760] fill-[#b84760] drop-shadow-[0_0_14px_rgba(184,71,96,0.8)]',
  'text-[#e8c99b] fill-[#e8c99b] drop-shadow-[0_0_14px_rgba(232,201,155,0.8)]',
  'text-[#f5e4cb] fill-[#f5e4cb] drop-shadow-[0_0_14px_rgba(245,228,203,0.8)]',
  'text-[#798cb7] fill-[#798cb7] drop-shadow-[0_0_14px_rgba(121,140,183,0.8)]',
];

export default function DoubleTapHearts() {
  const [hearts, setHearts] = useState([]);

  const spawnHearts = useCallback((x, y) => {
    haptics.doubleTap();
    sound.playChime(587.33 + Math.random() * 200, 0.35, 'sine');

    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: `${Date.now()}-${i}-${Math.random()}`,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      size: 20 + Math.random() * 22,
      rotation: (Math.random() - 0.5) * 60,
      targetY: y - 100 - Math.random() * 120,
      targetX: x + (Math.random() - 0.5) * 120,
      colorClass: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      delay: i * 0.04,
    }));

    setHearts((prev) => [...prev.slice(-30), ...newHearts]);
  }, []);

  useEffect(() => {
    let lastTapTime = 0;
    let lastTapPos = { x: 0, y: 0 };

    const handleTouchEnd = (e) => {
      // Check if user clicked an interactive input / button
      const target = e.target;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        return;
      }

      const touch = e.changedTouches[0];
      if (!touch) return;

      const currentTime = Date.now();
      const tapLength = currentTime - lastTapTime;
      const distX = Math.abs(touch.clientX - lastTapPos.x);
      const distY = Math.abs(touch.clientY - lastTapPos.y);

      // Double tap detected: < 320ms and < 30px drift
      if (tapLength < 320 && tapLength > 40 && distX < 30 && distY < 30) {
        spawnHearts(touch.clientX, touch.clientY);
        lastTapTime = 0; // reset
      } else {
        lastTapTime = currentTime;
        lastTapPos = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleDoubleClick = (e) => {
      const target = e.target;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        return;
      }
      spawnHearts(e.clientX, e.clientY);
    };

    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('dblclick', handleDoubleClick);

    return () => {
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [spawnHearts]);

  // Clean up hearts after animation
  useEffect(() => {
    if (hearts.length === 0) return;
    const timer = setTimeout(() => {
      setHearts((prev) => prev.slice(6));
    }, 1500);
    return () => clearTimeout(timer);
  }, [hearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              x: h.x,
              y: h.y,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 0.9, 0],
              scale: [0.3, 1.3, 1.1, 0.8],
              x: h.targetX,
              y: h.targetY,
              rotate: h.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: h.delay,
            }}
            style={{ position: 'fixed', left: 0, top: 0 }}
          >
            <Heart 
              className={`w-7 h-7 ${h.colorClass}`} 
              style={{ width: `${h.size}px`, height: `${h.size}px` }} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
