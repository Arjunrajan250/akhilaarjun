// Mobile Haptic Feedback Utility using Web Vibration API
export const haptics = {
  // Light subtle tap for button clicks or card flips
  light() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Ignore devices that block vibration without user gesture
      }
    }
  },

  // Medium pulse for like hearts or unlock actions
  medium() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(35);
      } catch {}
    }
  },

  // Double tap heart burst
  doubleTap() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([20, 50, 25]);
      } catch {}
    }
  },

  // Heartbeat pattern (Lub-dub)
  heartbeat() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        // lub (25ms), pause (70ms), dub (35ms), long pause (650ms)
        navigator.vibrate([25, 70, 35]);
      } catch {}
    }
  },

  // Success celebration / unlock warp
  success() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 60, 40, 60, 80]);
      } catch {}
    }
  },

  // Easter egg discovery
  easterEgg() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([30, 40, 30, 40, 50, 50, 100]);
      } catch {}
    }
  }
};
