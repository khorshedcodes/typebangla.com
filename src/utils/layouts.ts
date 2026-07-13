// Keyboard Layout Mapping Tables for TypeMaster Bangla

export interface LayoutMap {
  [key: string]: {
    normal: string;
    shift: string;
  };
}

// 1. UniBijoy Layout Mapping (maps QWERTY keys to Bangla Unicode)
export const UNI_BIJOY_MAP: LayoutMap = {
  KeyQ: { normal: "ঙ", shift: "ং" },
  KeyW: { normal: "য", shift: "্য" },
  KeyE: { normal: "ড", shift: "ঢ" },
  KeyR: { normal: "প", shift: "ফ" },
  KeyT: { normal: "ট", shift: "ঠ" },
  KeyY: { normal: "চ", shift: "ছ" },
  KeyU: { normal: "জ", shift: "ঝ" },
  KeyI: { normal: "হ", shift: "ঞ" },
  KeyO: { normal: "গ", shift: "ঘ" },
  KeyP: { normal: "ড়", shift: "ঢ়" },
  BracketLeft: { normal: "ৃ", shift: "ঋ" },
  BracketRight: { normal: "ে", shift: "ৈ" },
  
  KeyA: { normal: "ৃ", shift: "ঋ" },
  KeyS: { normal: "ু", shift: "ূ" },
  KeyD: { normal: "ি", shift: "ী" },
  KeyF: { normal: "া", shift: "অ" },
  KeyG: { normal: "্", shift: "।" }, // 'g' is Hasanta/Link, Shift+'g' is Dari (।)
  KeyH: { normal: "ব", shift: "ভ" },
  KeyJ: { normal: "ক", shift: "খ" },
  KeyK: { normal: "ত", shift: "থ" },
  KeyL: { normal: "দ", shift: "ধ" },
  Semicolon: { normal: "স", shift: "ষ" },
  Quote: { normal: "শ", shift: "ী" },
  
  KeyZ: { normal: "্র", shift: "্য" },
  KeyX: { normal: "ও", shift: "ৌ" },
  KeyC: { normal: "ে", shift: "ৈ" },
  KeyV: { normal: "র", shift: "ল" },
  KeyB: { normal: "ন", shift: "ণ" },
  KeyN: { normal: "ষ", shift: "শ" },
  KeyM: { normal: "ম", shift: "ম" },
  Comma: { normal: ",", shift: "<" },
  Period: { normal: ".", shift: ">" },
  Slash: { normal: "উ", shift: "ঊ" },
  
  // Number Row
  Digit1: { normal: "১", shift: "!" },
  Digit2: { normal: "২", shift: "@" },
  Digit3: { normal: "৩", shift: "#" },
  Digit4: { normal: "৪", shift: "$" },
  Digit5: { normal: "৫", shift: "%" },
  Digit6: { normal: "৬", shift: "^" },
  Digit7: { normal: "৭", shift: "&" },
  Digit8: { normal: "৮", shift: "*" },
  Digit9: { normal: "৯", shift: "(" },
  Digit0: { normal: "০", shift: ")" },
  Minus: { normal: "-", shift: "_" },
  Equal: { normal: "=", shift: "+" },
};

// 2. National Jatiya Layout Mapping (BCC Standard)
export const JATIYA_MAP: LayoutMap = {
  KeyQ: { normal: "ৌ", shift: "ঔ" },
  KeyW: { normal: "ূ", shift: "ঊ" },
  KeyE: { normal: "ী", shift: "ঈ" },
  KeyR: { normal: "ু", shift: "উ" },
  KeyT: { normal: "ি", shift: "ই" },
  KeyY: { normal: "ত", shift: "থ" },
  KeyU: { normal: "চ", shift: "ছ" },
  KeyI: { normal: "দ", shift: "ধ" },
  KeyO: { normal: "জ", shift: "ঝ" },
  KeyP: { normal: "ড", shift: "ঢ" },
  BracketLeft: { normal: "ৃ", shift: "ঋ" },
  BracketRight: { normal: "ে", shift: "ৈ" },
  
  KeyA: { normal: "া", shift: "অ" },
  KeyS: { normal: "স", shift: "শ" },
  KeyD: { normal: "্", shift: "।" }, // 'd' is Hasanta/Link
  KeyF: { normal: "া", shift: "আ" },
  KeyG: { normal: "ক", shift: "খ" },
  KeyH: { normal: "ব", shift: "ভ" },
  KeyJ: { normal: "ন", shift: "ণ" },
  KeyK: { normal: "ত", shift: "থ" },
  KeyL: { normal: "ম", shift: "ষ" },
  Semicolon: { normal: "র", shift: "ড়" },
  Quote: { normal: "স", shift: "ষ" },
  
  KeyZ: { normal: "্র", shift: "্য" },
  KeyX: { normal: "ও", shift: "ঐ" },
  KeyC: { normal: "ে", shift: "ৈ" },
  KeyV: { normal: "প", shift: "ফ" },
  KeyB: { normal: "ল", shift: "ঢ়" },
  KeyN: { normal: "ষ", shift: "শ" },
  KeyM: { normal: "হ", shift: "ঞ" },
  Comma: { normal: ",", shift: "ৎ" },
  Period: { normal: ".", shift: "ং" },
  Slash: { normal: "য়", shift: "ঃ" },
  
  // Number Row
  Digit1: { normal: "১", shift: "!" },
  Digit2: { normal: "২", shift: "@" },
  Digit3: { normal: "৩", shift: "#" },
  Digit4: { normal: "৪", shift: "$" },
  Digit5: { normal: "৫", shift: "%" },
  Digit6: { normal: "৬", shift: "^" },
  Digit7: { normal: "৭", shift: "&" },
  Digit8: { normal: "৮", shift: "*" },
  Digit9: { normal: "৯", shift: "(" },
  Digit0: { normal: "০", shift: ")" },
  Minus: { normal: "-", shift: "_" },
  Equal: { normal: "=", shift: "+" },
};

// 3. Avro Phonetic Transliteration Rules Engine
// Maps roman character combinations to Bengali Unicode
const phoneticRules: [RegExp, string][] = [
  // Consonant clusters & complex vowels
  [/kh/gi, "খ"],
  [/gh/gi, "ঘ"],
  [/Ng/g, "ঙ"],
  [/ng/gi, "ং"],
  [/ch/gi, "ছ"],
  [/jh/gi, "ঝ"],
  [/th/g, "থ"],
  [/dh/g, "ধ"],
  [/Th/g, "ঠ"],
  [/Dh/g, "ঢ"],
  [/ph/gi, "ফ"],
  [/bh/gi, "ভ"],
  [/Sh/g, "ষ"],
  [/sh/g, "শ"],
  [/rr/gi, "ড়"],
  [/rh/gi, "ঢ়"],
  [/oy/gi, "য়"],
  
  // Vowels (Independent or Sign depending on position)
  [/ou/gi, "ৌ"],
  [/oi/gi, "ৈ"],
  [/aa/gi, "া"],
  [/io/gi, "িও"],
  
  // Single consonants
  [/k/gi, "ক"],
  [/g/gi, "গ"],
  [/c/gi, "চ"],
  [/j/gi, "জ"],
  [/t/g, "ত"],
  [/T/g, "ট"],
  [/d/g, "দ"],
  [/D/g, "ড"],
  [/p/gi, "প"],
  [/f/gi, "ফ"],
  [/b/gi, "ব"],
  [/v/gi, "ভ"],
  [/m/gi, "ম"],
  [/z/gi, "য"],
  [/r/gi, "র"],
  [/l/gi, "ল"],
  [/s/gi, "স"],
  [/h/gi, "হ"],
  [/n/g, "ন"],
  [/N/g, "ণ"],
  [/w/gi, "ও"],
  [/y/gi, "য়"],
  
  // Standalone/vowel overrides
  [/o/g, "ও"],
  [/a/g, "আ"],
  [/i/g, "ই"],
  [/u/g, "উ"],
  [/e/g, "এ"],
  [/I/g, "ঈ"],
  [/U/g, "ঊ"],
  [/O/g, "ও"],
  [/A/g, "অ"],
];

const consonants = new Set([
  "ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ", "ট", "ঠ", "ড", "ঢ", "ণ",
  "ত", "থ", "দ", "ধ", "ন", "প", "ফ", "ব", "ভ", "ম", "য", "র", "ল", "শ", "ষ",
  "স", "হ", "ড়", "ঢ়", "য়"
]);

const vowelSigns: { [key: string]: string } = {
  "আ": "া",
  "ই": "ি",
  "ঈ": "ী",
  "উ": "ু",
  "ঊ": "ূ",
  "ঋ": "ৃ",
  "এ": "ে",
  "ঐ": "ৈ",
  "ও": "ো",
  "ঔ": "ৌ"
};

/**
 * Transliterates a given Banglish word to Bangla.
 * Implements vowel-sign rules (kar) after consonants and auto-consonant conjuncting.
 */
export function avroTransliterate(input: string): string {
  if (!input) return "";

  let output = input;

  // Apply basic mapping rules
  for (const [regex, replacement] of phoneticRules) {
    output = output.replace(regex, replacement);
  }

  // Parse character-by-character to fix vowel signs (kars) & cluster conjuncts
  const chars = Array.from(output);
  const result: string[] = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const prev = result[result.length - 1];

    // 1. Vowel Sign Conversion: If vowel follows a consonant, convert it to its vowel sign (kar)
    if (vowelSigns[char] && prev && consonants.has(prev)) {
      result.push(vowelSigns[char]);
      continue;
    }
    
    // 2. Handle 'a' -> 'া' conversion exceptions
    if (char === "আ" && prev && consonants.has(prev)) {
      result.push("া");
      continue;
    }

    // 3. Handle double consonant conjunct creation (e.g. kk -> ক্ক)
    // If current is a consonant, and previous is also a consonant (not separated by vowel sign/kar)
    if (consonants.has(char) && prev && consonants.has(prev)) {
      result.push("্"); // Insert Hasanta link
    }

    result.push(char);
  }

  return result.join("");
}
