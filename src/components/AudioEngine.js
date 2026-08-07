// Ultra-Soothing Brownian Rain & Organic Warmth Audio Engine for VELOR

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.noiseNode = null;
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

  // Tactile Soft UI Click (Warm Organic Ceramic Tap)
  playClick() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // Soft Hover Sound
  playHover() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  // Toggle Pure Brownian Rain & Coffee Sanctuary Soundscape
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
    this.masterGain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 1.2);
    this.masterGain.connect(this.ctx.destination);

    // Generate True Brownian Noise (Deep, soothing acoustic rain & soft fireplace warmth)
    // 5 seconds stereo buffer
    const bufferSize = this.ctx.sampleRate * 5;
    const noiseBuffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    const left = noiseBuffer.getChannelData(0);
    const right = noiseBuffer.getChannelData(1);

    let lastOutL = 0.0;
    let lastOutR = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const whiteL = Math.random() * 2 - 1;
      const whiteR = Math.random() * 2 - 1;

      // Brown noise integration filter (attenuates high frequencies by -6dB/octave)
      lastOutL = (lastOutL + 0.02 * whiteL) / 1.02;
      lastOutR = (lastOutR + 0.02 * whiteR) / 1.02;

      left[i] = lastOutL * 2.8;
      right[i] = lastOutR * 2.8;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Gentle low-pass filter for cozy cafe acoustics
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);

    this.noiseNode.connect(filter);
    filter.connect(this.masterGain);

    this.noiseNode.start();
    this.isPlaying = true;
  }

  stopAtmosphere() {
    if (!this.isPlaying) return;

    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
      setTimeout(() => {
        if (this.noiseNode) {
          try { this.noiseNode.stop(); this.noiseNode.disconnect(); } catch (e) {}
          this.noiseNode = null;
        }
        this.isPlaying = false;
      }, 600);
    }
  }
}

export const audioEngine = new AudioEngine();
