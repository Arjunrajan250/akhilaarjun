import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Share, 
  PlusSquare, 
  MoreVertical, 
  Download, 
  X, 
  Heart
} from 'lucide-react';
import { sound } from '../utils/sound';
import { haptics } from '../utils/haptics';

export default function PWAInstallBanner({ herName = 'Lechu' }) {
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    // Listen for native Android/Chrome install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    haptics.light();
    sound.playChime(587.33, 0.25);
    
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowModal(false);
      }
    } else {
      setShowModal(true);
    }
  };

  const isStandalone = 
    typeof window !== 'undefined' && 
    (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);

  // If already standalone PWA, no need to show banner
  if (isStandalone) return null;

  return (
    <>
      {/* Floating Discreet Trigger Button for Mobile */}
      <div className="fixed top-20 right-4 z-30 sm:hidden">
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => {
            sound.playChime(659.25, 0.2);
            haptics.light();
            setShowModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b0e18]/90 border border-[#e8c99b]/40 text-[#f5e4cb] text-[11px] font-sans font-medium shadow-lg backdrop-blur-xl active:scale-95 transition-transform"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#e8c99b]" />
          <span>Save App</span>
        </motion.button>
      </div>

      {/* Instructional Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-[#08090e]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-md bg-[#0b0e18]/98 border border-[#e8c99b]/35 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {/* App Icon Preview */}
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#b84760] to-[#e8c99b] p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-2xl bg-[#08090e] flex flex-col items-center justify-center">
                    <Heart className="w-7 h-7 text-[#d96b82] fill-[#d96b82] animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-serif text-white">
                  Add "Arjun & {herName}" to Home Screen
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                  Turn this website into your private full-screen mobile app with no browser address bars!
                </p>
              </div>

              {/* Android Native Direct Install (if available) */}
              {deferredPrompt && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full mb-5 py-3.5 px-4 rounded-2xl bg-[#b84760] hover:bg-[#d96b82] text-white font-serif tracking-wide text-sm shadow-lg shadow-[#b84760]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Install App in 1-Tap</span>
                </button>
              )}

              {/* Step-by-Step Instructions */}
              <div className="space-y-4 text-xs font-sans">
                {/* iOS Instructions */}
                <div className={`p-4 rounded-2xl border ${isIOS ? 'bg-[#faf7f2]/[0.05] border-[#e8c99b]/40' : 'bg-white/5 border-white/10'}`}>
                  <div className="font-medium text-[#f5e4cb] mb-2 flex items-center gap-1.5 font-serif text-sm">
                    <span>🍎 On iPhone / iPad (Safari):</span>
                  </div>
                  <ol className="space-y-2.5 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#d96b82]/20 text-[#fcdfe6] flex items-center justify-center shrink-0 font-mono text-[10px]">1</span>
                      <span>Tap the <strong className="text-white">Share</strong> button at the bottom of Safari (<Share className="w-3.5 h-3.5 inline text-[#798cb7] mx-1" />).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#d96b82]/20 text-[#fcdfe6] flex items-center justify-center shrink-0 font-mono text-[10px]">2</span>
                      <span>Scroll down and tap <strong className="text-white">Add to Home Screen</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-[#e8c99b] mx-1" />).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#d96b82]/20 text-[#fcdfe6] flex items-center justify-center shrink-0 font-mono text-[10px]">3</span>
                      <span>Tap <strong className="text-white">Add</strong> in the top right. You now have a private app! ✨</span>
                    </li>
                  </ol>
                </div>

                {/* Android Instructions */}
                <div className={`p-4 rounded-2xl border ${!isIOS ? 'bg-[#faf7f2]/[0.05] border-[#e8c99b]/40' : 'bg-white/5 border-white/10'}`}>
                  <div className="font-medium text-[#f5e4cb] mb-2 flex items-center gap-1.5 font-serif text-sm">
                    <span>🤖 On Android (Chrome):</span>
                  </div>
                  <ol className="space-y-2.5 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#d96b82]/20 text-[#fcdfe6] flex items-center justify-center shrink-0 font-mono text-[10px]">1</span>
                      <span>Tap the <strong className="text-white">Three Dots menu</strong> (<MoreVertical className="w-3.5 h-3.5 inline text-slate-300 mx-1" />) at the top right.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#d96b82]/20 text-[#fcdfe6] flex items-center justify-center shrink-0 font-mono text-[10px]">2</span>
                      <span>Tap <strong className="text-white">Install App</strong> or <strong className="text-white">Add to Home screen</strong>.</span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Bottom Done */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full mt-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors"
              >
                Got It, Let’s Explore!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
