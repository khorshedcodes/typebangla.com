import { create } from "zustand";
import { UNI_BIJOY_MAP, JATIYA_MAP, avroTransliterate } from "../utils/layouts";

export type KeyboardLayout = "english" | "unibijoy" | "jatiya" | "avro";
export type SoundProfile = "mechanical" | "retro" | "digital";

export interface ExamResult {
  id: string;
  date: string;
  layout: KeyboardLayout;
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
  language: "english" | "bangla";
}

interface TypingState {
  // Settings
  activeLayout: KeyboardLayout;
  soundEnabled: boolean;
  soundVolume: number;
  soundProfile: SoundProfile;
  selectedDuration: number; // in seconds (0 for infinite/lessons)
  
  // Test State
  targetText: string;
  typedText: string;
  phoneticBuffer: string; // Used for Avro Phonetic word-level parsing
  isStarted: boolean;
  isCompleted: boolean;
  startTime: number | null;
  elapsedTime: number; // in seconds
  keystrokes: number;
  backspaceCount: number;
  errorIndices: number[]; // Indices of incorrect chars in targetText
  inputLanguage: "bangla" | "latin";
  outputPreview?: string;
  originalText?: string;
  focusKeys?: string;
  lessonType?: string;
  isRecapTest: boolean;
  
  // History
  history: ExamResult[];

  // Actions
  setTargetText: (
    text: string,
    focusKeys?: string,
    lessonType?: string,
    inputLanguage?: "bangla" | "latin",
    outputPreview?: string
  ) => void;
  startRecapTest: () => void;
  exitRecapTest: () => void;
  startTest: () => void;
  resetTest: () => void;
  completeTest: () => void;
  updateElapsedTime: () => void;
  handleKeystroke: (code: string, key: string, isShift: boolean) => void;
  setActiveLayout: (layout: KeyboardLayout) => void;
  setSelectedDuration: (duration: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setSoundProfile: (profile: SoundProfile) => void;
  loadHistory: () => void;
  clearHistory: () => void;
}

// Web Audio API Sound Synthesizer (Zero asset download required)
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTypewriterSound(type: "click" | "error" | "success" | "space") {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Retrieve volume and sound profile from store
    const state = useTypingStore.getState();
    const soundVolume = state.soundVolume !== undefined ? state.soundVolume : 0.5;
    const soundProfile = state.soundProfile || "mechanical";

    if (soundProfile === "retro") {
      if (type === "click") {
        // Metallic retro typewriter key click
        // Combining a fast high-pitch metallic click and a short low mechanical echo
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
        // Heavier carriage thud sound for retro spaces
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
        // Harsh error typewriter buzz
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
        // Satisfying metallic office/carriage return bell (ding!)
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
        // Clean high-pitch digital click
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
        // Lower pitch digital click
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
        // Electronic slide down for error
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
        // Arpeggio of upward electronic synth notes
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
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

function generateDrillText(focusKeys: string, length = 280): string {
  const keys = focusKeys.split(/\s+/).filter(Boolean);
  if (keys.length === 0) return "abc";

  // Check if it is a English or Bangla focus keys set
  const isBangla = !focusKeys.match(/[a-zA-Z]/);

  if (isBangla) {
    const BANGLA_DIACRITICS = new Set(["া", "ি", "ী", "ু", "ূ", "ৃ", "ে", "ৈ", "ো", "ৌ", "্", "ং", "ঃ", "ঁ"]);
    const consonants = keys.filter(k => !BANGLA_DIACRITICS.has(k));
    const diacritics = keys.filter(k => BANGLA_DIACRITICS.has(k));

    // Case 1: Only diacritics are focused (e.g. Vowel Signs "া ি ী ু ূ")
    if (consonants.length === 0 && diacritics.length > 0) {
      // Pair them with standard base consonants (ক, ত, স, দ)
      const baseConsonants = ["ক", "ত", "স", "দ"];
      const result: string[] = [];
      let currentLen = 0;
      while (currentLen < length) {
        const c = baseConsonants[Math.floor(Math.random() * baseConsonants.length)];
        const d = diacritics[Math.floor(Math.random() * diacritics.length)];
        const word = c + d;
        result.push(word);
        currentLen += word.length + 1;
      }
      return result.join(" ");
    }

    // Case 2: Only consonants are focused (e.g. Lesson 1: "ক ত")
    if (consonants.length > 0 && diacritics.length === 0) {
      // If 1 or 2 keys, generate rhythmic finger alternations
      if (consonants.length <= 2) {
        const c1 = consonants[0];
        const c2 = consonants[1] || consonants[0];
        const patterns = [
          `${c1} ${c2} ${c1} ${c2}`,
          `${c1}${c1} ${c2}${c2} ${c1}${c2} ${c2}${c1}`,
          `${c1}${c2}${c1} ${c2}${c1}${c2}`,
          `${c1}${c1}${c2} ${c2}${c2}${c1}`,
          `${c1}${c2}${c2}${c1} ${c2}${c1}${c1}${c2}`
        ];
        const result: string[] = [];
        let currentLen = 0;
        while (currentLen < length) {
          const pat = patterns[Math.floor(Math.random() * patterns.length)];
          result.push(pat);
          currentLen += pat.length + 1;
        }
        return result.join(" ");
      } else {
        // More than 2 consonants, generate permutation blocks (rolls)
        const result: string[] = [];
        let currentLen = 0;
        while (currentLen < length) {
          const wordLen = Math.floor(Math.random() * 3) + 3;
          let word = "";
          for (let i = 0; i < wordLen; i++) {
            word += consonants[Math.floor(Math.random() * consonants.length)];
          }
          result.push(word);
          currentLen += word.length + 1;
        }
        return result.join(" ");
      }
    }

    // Case 3: Both consonants and diacritics are focused
    if (consonants.length > 0 && diacritics.length > 0) {
      const hasHasanta = diacritics.includes("্");
      const kars = diacritics.filter(d => d !== "্");

      const result: string[] = [];
      let currentLen = 0;
      while (currentLen < length) {
        let word = "";
        
        if (hasHasanta && consonants.length >= 2 && Math.random() > 0.45) {
          // Generate a linked conjunct (e.g. ক + ্ + ত = ক্ত)
          const c1 = consonants[Math.floor(Math.random() * consonants.length)];
          let c2 = consonants[Math.floor(Math.random() * consonants.length)];
          if (c1 === c2 && consonants.length > 1) {
            c2 = consonants.filter(c => c !== c1)[0];
          }
          word = c1 + "্" + c2;
          // Optionally add a vowel sign (kar)
          if (kars.length > 0 && Math.random() > 0.5) {
            word += kars[Math.floor(Math.random() * kars.length)];
          }
        } else {
          // Standard CV syllable
          const cvCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 CV blocks
          for (let i = 0; i < cvCount; i++) {
            const c = consonants[Math.floor(Math.random() * consonants.length)];
            const d = diacritics[Math.floor(Math.random() * diacritics.length)];
            word += c + d;
          }
        }
        
        result.push(word);
        currentLen += word.length + 1;
      }
      return result.join(" ");
    }
  } else {
    // English layout generator
    // Case 1: Alternating drills for 1 or 2 keys (e.g., Lesson 1: "f d")
    if (keys.length <= 2) {
      const k1 = keys[0];
      const k2 = keys[1] || keys[0];
      const patterns = [
        `${k1} ${k2} ${k1} ${k2}`,
        `${k1}${k1} ${k2}${k2} ${k1}${k2} ${k2}${k1}`,
        `${k1}${k2}${k1} ${k2}${k1}${k2}`,
        `${k1}${k1}${k2} ${k2}${k2}${k1}`,
        `${k1}${k2}${k2}${k1} ${k2}${k1}${k1}${k2}`
      ];
      const result: string[] = [];
      let currentLen = 0;
      while (currentLen < length) {
        const pat = patterns[Math.floor(Math.random() * patterns.length)];
        result.push(pat);
        currentLen += pat.length + 1;
      }
      return result.join(" ");
    }

    // Case 2: Pseudo-words & rolls for more keys (e.g. Home row combinations)
    const vowels = new Set(["a", "e", "i", "o", "u", "y"]);
    const consonants = keys.filter(k => !vowels.has(k.toLowerCase()));
    const keyVowels = keys.filter(k => vowels.has(k.toLowerCase()));

    const result: string[] = [];
    let currentLen = 0;

    while (currentLen < length) {
      let word = "";
      if (consonants.length > 0 && keyVowels.length > 0) {
        const wordType = Math.random() > 0.5 ? "CVC" : "VCV";
        if (wordType === "CVC") {
          word += consonants[Math.floor(Math.random() * consonants.length)];
          word += keyVowels[Math.floor(Math.random() * keyVowels.length)];
          word += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
          word += keyVowels[Math.floor(Math.random() * keyVowels.length)];
          word += consonants[Math.floor(Math.random() * consonants.length)];
          word += keyVowels[Math.floor(Math.random() * keyVowels.length)];
        }
      } else {
        const wordLen = Math.floor(Math.random() * 3) + 3; // 3 to 5
        for (let i = 0; i < wordLen; i++) {
          word += keys[Math.floor(Math.random() * keys.length)];
        }
      }
      result.push(word);
      currentLen += word.length + 1;
    }
    return result.join(" ");
  }

  return "abc";
}

export const useTypingStore = create<TypingState>((set, get) => ({
  // Initial Settings
  activeLayout: "english",
  soundEnabled: true,
  soundVolume: 0.5,
  soundProfile: "mechanical",
  selectedDuration: 60, // Default 1 minute
  
  // Initial Test State
  targetText: "সিলেট ও মৌলভীবাজারে মৃদু ভূকম্পন অনুভূত হয়েছে। আবহাওয়া অধিদপ্তর জানায়, ভূমিকম্পের উৎপত্তিস্থল ছিল আসামের করিমগঞ্জ এলাকায়।",
  typedText: "",
  phoneticBuffer: "",
  isStarted: false,
  isCompleted: false,
  startTime: null,
  elapsedTime: 0,
  keystrokes: 0,
  backspaceCount: 0,
  errorIndices: [],
  inputLanguage: "bangla",
  outputPreview: undefined,
  originalText: undefined,
  focusKeys: undefined,
  lessonType: undefined,
  isRecapTest: false,
  
  history: [],

  // Load results history
  loadHistory: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("typemaster_history");
      if (stored) {
        set({ history: JSON.parse(stored) });
      }
    }
  },

  clearHistory: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("typemaster_history");
      set({ history: [] });
    }
  },

  setTargetText: (text, focusKeys, lessonType, inputLanguage = "bangla", outputPreview) => {
    let finalTargetText = text;
    if (focusKeys && focusKeys !== "all" &&
        (lessonType === "drill" || lessonType === "combo" || lessonType === "pair")) {
      // Longer drill lengths = more muscle memory per session
      // drill: 2-4 keys → 280 chars (~60-90s at beginner pace)
      // combo: full row combos → 360 chars (~90s)
      // pair:  aspirated pairs → 300 chars (~75s)
      const drillLength =
        lessonType === "combo" ? 360 :
        lessonType === "pair"  ? 300 :
        280; // drill
      finalTargetText = generateDrillText(focusKeys, drillLength);
    }

    let finalOutputPreview = outputPreview;
    if (get().activeLayout === "avro" && inputLanguage === "latin" && focusKeys && focusKeys !== "all" &&
        (lessonType === "drill" || lessonType === "combo" || lessonType === "pair")) {
      // For Avro drills, we dynamically generate outputPreview by transliterating the finalTargetText word-by-word
      finalOutputPreview = finalTargetText.split(" ").map(w => avroTransliterate(w)).join(" ");
    }

    set({
      targetText: finalTargetText,
      inputLanguage,
      outputPreview: finalOutputPreview,
      originalText: text,
      focusKeys,
      lessonType,
      selectedDuration: 0, // Reset to standard untimed/free run
      isRecapTest: false, // Reset recap test flag
      typedText: "",
      phoneticBuffer: "",
      isStarted: false,
      isCompleted: false,
      startTime: null,
      elapsedTime: 0,
      keystrokes: 0,
      backspaceCount: 0,
      errorIndices: []
    });
  },

  startRecapTest: () => {
    const { focusKeys, inputLanguage, activeLayout } = get();
    if (!focusKeys) return;

    // Generate recap challenge sequence: shorter 200 characters suited for 30s timed test
    const nextTargetText = generateDrillText(focusKeys, 200);
    let nextOutputPreview = undefined;
    if (activeLayout === "avro" && inputLanguage === "latin") {
      nextOutputPreview = nextTargetText.split(" ").map(w => avroTransliterate(w)).join(" ");
    }

    set({
      targetText: nextTargetText,
      outputPreview: nextOutputPreview,
      selectedDuration: 30, // 30 seconds timed test
      isRecapTest: true,
      typedText: "",
      phoneticBuffer: "",
      isStarted: false,
      isCompleted: false,
      startTime: null,
      elapsedTime: 0,
      keystrokes: 0,
      backspaceCount: 0,
      errorIndices: []
    });
  },

  exitRecapTest: () => {
    const { originalText, focusKeys, lessonType, inputLanguage, outputPreview } = get();
    if (originalText !== undefined) {
      get().setTargetText(originalText, focusKeys, lessonType, inputLanguage, outputPreview);
    }
  },

  startTest: () => {
    set({
      isStarted: true,
      startTime: Date.now(),
      elapsedTime: 0
    });
  },

  resetTest: () => {
    const { focusKeys, lessonType, inputLanguage, activeLayout, isRecapTest } = get();
    let nextTargetText = get().targetText;
    let nextOutputPreview = get().outputPreview;

    if (focusKeys && focusKeys !== "all") {
      // 200 characters for 30-second timed recaps, otherwise standard values
      const drillLength = isRecapTest ? 200 :
        lessonType === "combo" ? 360 :
        lessonType === "pair"  ? 300 :
        280; // drill
      nextTargetText = generateDrillText(focusKeys, drillLength);
      
      if (activeLayout === "avro" && inputLanguage === "latin") {
        nextOutputPreview = nextTargetText.split(" ").map(w => avroTransliterate(w)).join(" ");
      }
    }

    set({
      targetText: nextTargetText,
      outputPreview: nextOutputPreview,
      typedText: "",
      phoneticBuffer: "",
      isStarted: false,
      isCompleted: false,
      startTime: null,
      elapsedTime: 0,
      keystrokes: 0,
      backspaceCount: 0,
      errorIndices: []
    });
  },

  completeTest: () => {
    const { soundEnabled, targetText, typedText, activeLayout, elapsedTime, errorIndices, history } = get();
    if (soundEnabled) {
      playTypewriterSound("success");
    }
    
    // Calculate final metrics
    const wpm = Math.round((typedText.length / 5) / (elapsedTime / 60 || 1));
    const accuracy = Math.round(((typedText.length - errorIndices.length) / (typedText.length || 1)) * 100);
    
    const result: ExamResult = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString("bn-BD"),
      layout: activeLayout,
      wpm: Math.max(0, wpm),
      accuracy: Math.max(0, Math.min(100, accuracy)),
      duration: elapsedTime,
      errors: errorIndices.length,
      language: targetText.match(/[a-zA-Z]/) ? "english" : "bangla"
    };

    const newHistory = [result, ...history];
    if (typeof window !== "undefined") {
      localStorage.setItem("typemaster_history", JSON.stringify(newHistory));
    }

    set({
      isCompleted: true,
      history: newHistory
    });
  },

  updateElapsedTime: () => {
    const { isStarted, isCompleted, selectedDuration, elapsedTime } = get();
    if (!isStarted || isCompleted) return;
    
    const nextTime = elapsedTime + 1;
    
    // Timed test limit check
    if (selectedDuration > 0 && nextTime >= selectedDuration) {
      set({ elapsedTime: nextTime });
      get().completeTest();
    } else {
      set({ elapsedTime: nextTime });
    }
  },

  // Main Keystroke Handling Engine
  handleKeystroke: (code, key, isShift) => {
    const { 
      isStarted, 
      isCompleted, 
      activeLayout, 
      targetText, 
      typedText, 
      phoneticBuffer, 
      soundEnabled 
    } = get();

    if (isCompleted) return;

    // Start timer on first keystroke
    if (!isStarted) {
      get().startTest();
    }

    set((state) => ({ keystrokes: state.keystrokes + 1 }));

    // --- 1. Handle Backspace ---
    if (key === "Backspace") {
      if (soundEnabled) playTypewriterSound("click");
      
      set((state) => ({ backspaceCount: state.backspaceCount + 1 }));

      if (activeLayout === "avro" && phoneticBuffer.length > 0) {
        // Backspace removes last phonetic key
        const newPhonetic = phoneticBuffer.slice(0, -1);
        const newTrans = avroTransliterate(newPhonetic);
        
        // Replace current word portion in typedText
        const lastSpace = typedText.lastIndexOf(" ");
        const baseText = lastSpace !== -1 ? typedText.substring(0, lastSpace + 1) : "";
        const nextTyped = baseText + newTrans;
        
        // Re-evaluate error indices
        const errors = getErrorIndices(nextTyped, targetText);
        
        set({ 
          phoneticBuffer: newPhonetic,
          typedText: nextTyped,
          errorIndices: errors
        });
        return;
      }

      if (typedText.length > 0) {
        const nextTyped = typedText.slice(0, -1);
        const errors = getErrorIndices(nextTyped, targetText);
        set({ 
          typedText: nextTyped,
          errorIndices: errors
        });
      }
      return;
    }

    // --- 2. Handle Space ---
    if (key === " ") {
      if (soundEnabled) playTypewriterSound("space");

      let nextTyped = typedText;
      if (activeLayout === "avro" && phoneticBuffer.length > 0) {
        // Space commits Avro phonetic buffer and resets it
        const committedWord = avroTransliterate(phoneticBuffer);
        const lastSpace = typedText.lastIndexOf(" ");
        const baseText = lastSpace !== -1 ? typedText.substring(0, lastSpace + 1) : "";
        nextTyped = baseText + committedWord + " ";
        set({ phoneticBuffer: "" });
      } else {
        nextTyped = typedText + " ";
      }

      const errors = getErrorIndices(nextTyped, targetText);
      set({ 
        typedText: nextTyped,
        errorIndices: errors
      });

      // Complete automatically if we matched target length
      if (nextTyped.length >= targetText.length) {
        get().completeTest();
      }
      return;
    }

    // Ignore other utility keys (Control, Alt, Escape, etc.)
    if (key.length > 1 && !key.startsWith("Digit") && !key.startsWith("Key")) {
      return;
    }

    // --- 3. Resolve Input Letter based on layout ---
    let resolvedChar = "";
    
    if (activeLayout === "english" || (activeLayout === "avro" && get().inputLanguage === "latin")) {
      resolvedChar = key;
    } else if (activeLayout === "unibijoy") {
      const mapped = UNI_BIJOY_MAP[code];
      if (mapped) {
        resolvedChar = isShift ? mapped.shift : mapped.normal;
      }
    } else if (activeLayout === "jatiya") {
      const mapped = JATIYA_MAP[code];
      if (mapped) {
        resolvedChar = isShift ? mapped.shift : mapped.normal;
      }
    } else if (activeLayout === "avro" && get().inputLanguage === "bangla") {
      // English character added to phonetic string
      if (/[a-zA-Z]/i.test(key)) {
        const nextPhonetic = phoneticBuffer + key;
        const currentTrans = avroTransliterate(nextPhonetic);
        
        const lastSpace = typedText.lastIndexOf(" ");
        const baseText = lastSpace !== -1 ? typedText.substring(0, lastSpace + 1) : "";
        resolvedChar = ""; // Handled separately
        
        const nextTyped = baseText + currentTrans;
        const errors = getErrorIndices(nextTyped, targetText);
        
        if (soundEnabled) playTypewriterSound("click");
        
        set({
          phoneticBuffer: nextPhonetic,
          typedText: nextTyped,
          errorIndices: errors
        });
        
        if (nextTyped.length >= targetText.length) {
          get().completeTest();
        }
        return;
      }
    }

    // Append resolved layout key
    if (resolvedChar) {
      const nextTyped = typedText + resolvedChar;
      const errors = getErrorIndices(nextTyped, targetText);
      const isError = nextTyped.length > targetText.length || nextTyped[nextTyped.length - 1] !== targetText[nextTyped.length - 1];

      if (soundEnabled) {
        playTypewriterSound(isError ? "error" : "click");
      }

      set({ 
        typedText: nextTyped,
        errorIndices: errors
      });

      if (nextTyped.length >= targetText.length) {
        get().completeTest();
      }
    }
  },

  setActiveLayout: (layout) => {
    set({ 
      activeLayout: layout,
      typedText: "",
      phoneticBuffer: "",
      isStarted: false,
      isCompleted: false,
      startTime: null,
      elapsedTime: 0,
      keystrokes: 0,
      backspaceCount: 0,
      errorIndices: []
    });
  },

  setSelectedDuration: (duration) => set({ selectedDuration: duration }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setSoundVolume: (volume) => set({ soundVolume: volume }),
  setSoundProfile: (profile) => set({ soundProfile: profile })
}));

// Helpers for checking typing matches
function getErrorIndices(typed: string, target: string): number[] {
  const errors: number[] = [];
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== target[i]) {
      errors.push(i);
    }
  }
  return errors;
}
