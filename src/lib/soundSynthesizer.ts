import { useTypingStore } from "../store/typingStore";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTypewriterSound(type: "click" | "error" | "success" | "space") {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Retrieve volume and sound profile from store
    const state = useTypingStore.getState();
    const soundVolume = state.soundVolume !== undefined ? state.soundVolume : 0.5;
    const soundProfile = state.soundProfile || "mechanical";

    if (soundProfile === "retro") {
      if (type === "click") {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(1800, now);
        osc1.frequency.exponentialRampToValueAtTime(1500, now + 0.012);
        gain1.gain.setValueAtTime(0.12 * soundVolume, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

        osc2.type = "square";
        osc2.frequency.setValueAtTime(320, now);
        osc2.frequency.exponentialRampToValueAtTime(160, now + 0.008);
        gain2.gain.setValueAtTime(0.06 * soundVolume, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.015);
        osc2.start(now);
        osc2.stop(now + 0.01);
      } else if (type === "space") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.06);

        gain.gain.setValueAtTime(0.16 * soundVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "error") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(95, now);

        gain.gain.setValueAtTime(0.14 * soundVolume, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === "success") {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(2500, now);
        gain1.gain.setValueAtTime(0.18 * soundVolume, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(3120, now);
        gain2.gain.setValueAtTime(0.08 * soundVolume, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.4);
        osc2.start(now);
        osc2.stop(now + 0.3);
      }
    } else if (soundProfile === "digital") {
      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(1600, now);

        gain.gain.setValueAtTime(0.08 * soundVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.012);
      } else if (type === "space") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.1 * soundVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.025);
      } else if (type === "error") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.12);

        gain.gain.setValueAtTime(0.15 * soundVolume, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "success") {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq * 1.5, now + index * 0.05);

          gain.gain.setValueAtTime(0.08 * soundVolume, now + index * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.15);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + index * 0.05);
          osc.stop(now + index * 0.05 + 0.15);
        });
      }
    } else {
      // Default: mechanical
      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

        gain.gain.setValueAtTime(0.08 * soundVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.02);
      } else if (type === "space") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);

        gain.gain.setValueAtTime(0.12 * soundVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "error") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(130, now);

        gain.gain.setValueAtTime(0.1 * soundVolume, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === "success") {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + index * 0.08);

          gain.gain.setValueAtTime(0.08 * soundVolume, now + index * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + index * 0.08);
          osc.stop(now + index * 0.08 + 0.25);
        });
      }
    }
  } catch (e) {
    console.warn("Failed to play synthesized sound", e);
  }
}
