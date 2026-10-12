// Web Audio API sound generator for seamless, zero-dependency sound effects
class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Play sparkling chime when clicking buttons
  playChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + index * 0.08);
      osc.stop(this.ctx.currentTime + index * 0.08 + 0.45);
    });
  }

  // Play celebratory explosion sound
  playExplosion() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // Deep boom sub-bass
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, this.ctx.currentTime);
    subOsc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.6);

    subGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start();
    subOsc.stop(this.ctx.currentTime + 0.7);

    // Sparkle fireworks fanfare chords
    const fanfares = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    fanfares.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + 0.1 + idx * 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + 0.1 + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8 + idx * 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + 0.1 + idx * 0.05);
      osc.stop(this.ctx.currentTime + 0.9 + idx * 0.05);
    });
  }
}

export const soundManager = new SoundController();
export default soundManager;
