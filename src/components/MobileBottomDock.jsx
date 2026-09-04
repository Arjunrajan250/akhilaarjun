import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  Camera, 
  Moon, 
  Mail, 
  Music, 
  Activity, 
  Clock
} from 'lucide-react';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

const DOCK_ITEMS = [
  { id: 'hero', href: '#', label: 'Home', icon: Sparkles },
  { id: 'heartbeat', href: '#heartbeat', label: 'Pulse', icon: Activity },
  { id: 'timeline', href: '#timeline', label: 'Story', icon: Clock },
  { id: 'memories', href: '#memories', label: 'Photos', icon: Camera },
  { id: 'moon', href: '#moon', label: 'Moon', icon: Moon },
  { id: 'letters', href: '#letters', label: 'Letters', icon: Mail },
  { id: 'reasons', href: '#reasons', label: 'Reasons', icon: Heart },
  { id: 'soundtrack', href: '#soundtrack', label: 'Music', icon: Music },
];

export default function MobileBottomDock() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['soundtrack', 'vows', 'reasons', 'letters', 'moon', 'memories', 'timeline', 'heartbeat'];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          return;
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, item) => {
    e.preventDefault();
    haptics.light();
    sound.playChime(587.33, 0.15);
    setActiveSection(item.id);

    if (item.href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      aria-label="Mobile quick navigation dock"
      className="fixed bottom-2 inset-x-2 z-40 md:hidden flex justify-center pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-full bg-[#08090e]/92 backdrop-blur-2xl border border-[#e8c99b]/25 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_15px_rgba(232,201,155,0.12)] max-w-full overflow-x-auto scrollbar-none">
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => handleClick(e, item)}
              className={`relative flex flex-col items-center justify-center min-w-[42px] py-1 px-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-90 ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-[#f5e4cb]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#b84760] to-[#d96b82] -z-10 shadow-md shadow-[#b84760]/30 border border-[#e8c99b]/30"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-white' : ''}`} />
              <span className="text-[9px] font-sans tracking-tight mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
