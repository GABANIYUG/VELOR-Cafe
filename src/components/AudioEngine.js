// Audio Engine playing 'Positive Mood.mp3' for VELOR Atmosphere Mode

class AudioEngine {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.fadeInterval = null;
    this.ctx = null;
  }

  init() {
    if (!this.audioElement) {
      this.audioElement = new Audio('/audio/atmosphere.mp3');
      this.audioElement.loop = true;
      this.audioElement.volume = 0.0;
    }
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tactile Soft UI Click Sound
  playClick() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
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

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  // Toggle Atmosphere Mode ('Positive Mood.mp3')
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
    this.init();
    if (this.isPlaying) return;

    if (this.fadeInterval) clearInterval(this.fadeInterval);

    this.audioElement.volume = 0.0;
    const playPromise = this.audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          // Smooth fade-in to 0.45 volume over 1 second
          let vol = 0.0;
          this.fadeInterval = setInterval(() => {
            if (vol < 0.45) {
              vol += 0.05;
              this.audioElement.volume = Math.min(0.45, vol);
            } else {
              clearInterval(this.fadeInterval);
            }
          }, 100);
        })
        .catch((err) => {
          console.warn('Browser restricted audio playback:', err);
        });
    }
  }

  stopAtmosphere() {
    if (!this.audioElement || !this.isPlaying) return;

    if (this.fadeInterval) clearInterval(this.fadeInterval);

    // Smooth fade-out to 0 volume over 600ms
    let vol = this.audioElement.volume;
    this.fadeInterval = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.08;
        this.audioElement.volume = Math.max(0, vol);
      } else {
        clearInterval(this.fadeInterval);
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.isPlaying = false;
      }
    }, 60);
  }
}

export const audioEngine = new AudioEngine();
