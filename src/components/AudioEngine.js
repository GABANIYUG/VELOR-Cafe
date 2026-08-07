// Web Audio API Synthesizer & Soundscape Engine for VELOR

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isAtmospherePlaying = false;
    this.ambientGain = null;
    this.noiseNode = null;
    this.filterNode = null;
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

  // Tactile Soft UI Click Sound (400Hz soft sine tap)
  playClick() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Quiet fail if browser restricts audio
    }
  }

  // Soft Hover Sound (Soft Sine Pip)
  playHover() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  // Toggle Ambient Sanctuary Soundscape (Vinyl Crackle & Low Warmth Pad)
  toggleAtmosphere(onStateChange) {
    this.init();
    if (this.isAtmospherePlaying) {
      this.stopAtmosphere();
      if (onStateChange) onStateChange(false);
    } else {
      this.startAtmosphere();
      if (onStateChange) onStateChange(true);
    }
  }

  startAtmosphere() {
    if (this.isAtmospherePlaying) return;

    // Buffer size 2 seconds of pink noise for vinyl crackle
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Low-pass filter for warm cafe acoustics
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(450, this.ctx.currentTime);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2.0);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    this.noiseNode.start();
    this.isAtmospherePlaying = true;
  }

  stopAtmosphere() {
    if (!this.isAtmospherePlaying) return;
    if (this.ambientGain) {
      this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);
      setTimeout(() => {
        if (this.noiseNode) {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        }
        this.isAtmospherePlaying = false;
      }, 1000);
    }
  }
}

export const audioEngine = new AudioEngine();
