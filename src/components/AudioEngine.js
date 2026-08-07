// Luxury Soothing Acoustic Grand Piano & Cafe Ambiance Engine for VELOR

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.sequenceTimer = null;
    this.stepIndex = 0;

    // Soothing Ambient Lounge Piano Melody Frequencies (Cmaj7 / Fmaj7 Arpeggio)
    // C4, E4, G4, B4, C5, A4, F4, D4, E4, G4, B4, D5
    this.pianoMelody = [
      261.63, // C4
      329.63, // E4
      392.00, // G4
      493.88, // B4
      523.25, // C5
      440.00, // A4
      349.23, // F4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      493.88, // B4
      587.33, // D5
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Synthesize a single organic Acoustic Grand Piano Note
  playPianoNote(freq, velocity = 0.25, duration = 3.0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Primary Fundamental + Harmonics for realistic string acoustics
    const harmonics = [
      { mult: 1.0, gainMult: 1.0 },   // Fundamental
      { mult: 2.0, gainMult: 0.35 },  // 2nd Harmonic
      { mult: 3.0, gainMult: 0.15 },  // 3rd Harmonic
      { mult: 4.0, gainMult: 0.05 },  // 4th Harmonic
    ];

    harmonics.forEach(({ mult, gainMult }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq * mult, now);

      // Low-pass filter simulating wooden piano soundboard acoustics
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);

      // Piano envelope: Fast attack (0.01s), exponential decay
      const initialGain = velocity * gainMult;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(initialGain, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    });
  }

  // Tactile Soft UI Click (Warm Organic Ceramic Tap)
  playClick() {
    try {
      this.init();
      this.playPianoNote(523.25, 0.15, 0.4); // C5 Soft Piano Tap on click
    } catch (e) {}
  }

  // Soft Hover Sound
  playHover() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  // Toggle Soothing Acoustic Piano Lounge Atmosphere
  toggleAtmosphere(onStateChange) {
    this.init();
    if (this.isPlaying) {
      this.stopAtmosphere();
      if (onStateChange) onStateChange(false);
    } else {
      this.startAtmosphere();
      if (onStateChange) onStateChange(true);
    }
  }

  startAtmosphere() {
    if (this.isPlaying) return;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.0);
    this.masterGain.connect(this.ctx.destination);

    // Play initial piano note immediately
    this.stepIndex = 0;
    this.playPianoNote(this.pianoMelody[0], 0.22, 4.0);

    // Loop gentle slow 60 BPM ambient piano melody arpeggio (every 1.6 seconds)
    this.sequenceTimer = setInterval(() => {
      if (!this.isPlaying) return;
      this.stepIndex = (this.stepIndex + 1) % this.pianoMelody.length;
      const freq = this.pianoMelody[this.stepIndex];
      const randomVel = 0.18 + Math.random() * 0.10;
      this.playPianoNote(freq, randomVel, 3.5);
    }, 1600);

    this.isPlaying = true;
  }

  stopAtmosphere() {
    if (!this.isPlaying) return;

    if (this.sequenceTimer) {
      clearInterval(this.sequenceTimer);
      this.sequenceTimer = null;
    }

    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        this.isPlaying = false;
      }, 800);
    }
  }
}

export const audioEngine = new AudioEngine();
