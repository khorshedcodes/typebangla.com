/**
 * Local Web Audio API Keyboard Sound Synthesizer
 * Zero external assets or paid APIs required.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    try {
      void audioCtx.resume().catch(() => {});
    } catch {
      // Ignore autoplay policy restriction
    }
  }
  return audioCtx;
}

export function playKeySound(profile: "mechanical" | "retro" | "digital" = "mechanical", volume = 0.5) {
  if (volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (profile === "mechanical") {
      // Mechanical switch click
      osc.type = "sine";
      osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

      gain.gain.setValueAtTime(volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.start(now);
      osc.stop(now + 0.04);
    } else if (profile === "retro") {
      // Deep thock sound
      osc.type = "triangle";
      osc.frequency.setValueAtTime(350 + Math.random() * 50, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);

      gain.gain.setValueAtTime(volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.start(now);
      osc.stop(now + 0.055);
    } else {
      // Digital high-pitched blip
      osc.type = "square";
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(volume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.start(now);
      osc.stop(now + 0.025);
    }
  } catch {
    // Ignore audio context autoplay restrictions
  }
}

export function playErrorSound(volume = 0.5) {
  if (volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.12);

    gain.gain.setValueAtTime(volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch {
    // Ignore autoplay restriction errors
  }
}
