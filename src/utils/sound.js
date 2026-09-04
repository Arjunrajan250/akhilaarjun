// Web Audio API synth tones for ambient cosmic sounds and feedback (Zero external asset dependencies)
import { haptics } from './haptics';

class SoundFX {
  constructor() {
    this.ctx = null;
    this.ambientGain = null;
    this.isMuted = false;
    this.heartbeatInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(frequency = 528, duration = 0.8, type = 'sine') {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      // Slight pitch bend for dreamlike tone
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.4, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio note failed", e);
    }
  }

  playUnlockChord() {
    haptics.success();
    // Ethereal major chord (F# - A# - C# - F - G#)
    const notes = [370, 466, 554, 698, 830];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 2.0, 'sine');
      }, idx * 120);
    });
  }

  playHeartbeat(triggerHaptic = true) {
    if (triggerHaptic) {
      haptics.heartbeat();
    }

    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.2);

      // Lub-dub second beat
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const now2 = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(65, now2);
        osc2.frequency.exponentialRampToValueAtTime(32, now2 + 0.18);

        gain2.gain.setValueAtTime(0.16, now2);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.2);

        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc2.start();
        osc2.stop(now2 + 0.22);
      }, 140);
    } catch (e) {
      console.warn("Heartbeat sound error", e);
    }
  }

  startHeartbeatLoop(bpm = 72) {
    this.stopHeartbeatLoop();
    const intervalMs = (60 / bpm) * 1000;
    this.playHeartbeat(true);
    this.heartbeatInterval = setInterval(() => {
      this.playHeartbeat(true);
    }, intervalMs);
  }

  stopHeartbeatLoop() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const sound = new SoundFX();

