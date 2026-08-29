import { avroTransliterate } from "./layouts";

export interface PhoneticAnalysis {
  transientText: string;
  matchState: "matching" | "partial" | "deviation";
  predictedOutput: string;
}

// Simple lookup map for reverse transliteration to guide the user on phonetic keystrokes
const BANGLA_PHONETIC_GUIDE: { [key: string]: string } = {
  "অ": "o/A",
  "আ": "a/aa",
  "ই": "i",
  "ঈ": "I",
  "উ": "u",
  "ঊ": "U",
  "ঋ": "rri",
  "এ": "e",
  "ঐ": "oi",
  "ও": "o",
  "ঔ": "ou",
  "া": "a",
  "ি": "i",
  "ী": "I",
  "ু": "u",
  "ূ": "U",
  "ৃ": "rri",
  "ে": "e",
  "ৈ": "oi",
  "ো": "o/O",
  "ৌ": "ou",
  "ক": "k",
  "খ": "kh",
  "গ": "g",
  "ঘ": "gh",
  "ঙ": "Ng",
  "চ": "c",
  "ছ": "ch",
  "জ": "j",
  "ঝ": "jh",
  "ঞ": "NG",
  "ট": "T",
  "ঠ": "Th",
  "ড": "D",
  "ঢ": "Dh",
  "ণ": "N",
  "ত": "t",
  "থ": "th",
  "দ": "d",
  "ধ": "dh",
  "ন": "n",
  "প": "p",
  "ফ": "ph/f",
  "ব": "b",
  "ভ": "bh/v",
  "ম": "m",
  "য": "z",
  "র": "r",
  "ল": "l",
  "শ": "sh",
  "ষ": "Sh",
  "স": "s",
  "হ": "h",
  "ড়": "rr",
  "ঢ়": "rh",
  "য়": "y",
  "ৎ": "t`",
  "ং": "ng",
  "ঃ": "H",
  "ঁ": "^",
  "্": "", // Hasanta is automatic in Avro for double-consonants, or typed explicitly as `,,` or similar
};

/**
 * Returns phonetic roman letters for a specific Bengali character.
 */
export function getPhoneticKeysForChar(char: string): string {
  if (!char) return "";
  
  // If it's a known single character
  if (BANGLA_PHONETIC_GUIDE[char] !== undefined) {
    return BANGLA_PHONETIC_GUIDE[char];
  }

  // Handle common conjunct components
  // For complex ligatures (e.g. ক্ষ -> ক + ষ which is kSh)
  if (char === "ক্ষ") return "kSh";
  if (char === "জ্ঞ") return "gg";
  if (char === "ঞ্চ") return "NGc";
  if (char === "ঞ্জ") return "NGj";
  if (char === "ক্ত") return "kt";
  if (char === "ণ্ড") return "ND";
  
  // General conjunct decomposition: c1 + ্ + c2 (+ ্ + c3)
  if (char.includes("্")) {
    const parts = char.split("্");
    const phoneticParts = parts.map(p => BANGLA_PHONETIC_GUIDE[p] || (p.length === 1 ? p : "?"));
    if (!phoneticParts.includes("?")) {
      return phoneticParts.map(p => p.split("/")[0]).join("");
    }
  }

  return "?";
}

/**
 * Analyzes English phonetic strings to determine the target Bangla rendering.
 */
export function parse_phonetic_input(keystroke_buffer = "", targeted_word = ""): PhoneticAnalysis {
  const safeBuffer = keystroke_buffer || "";
  const safeTarget = targeted_word || "";
  const transientText = avroTransliterate(safeBuffer);
  const cleanTransient = transientText.replace(/\u09cd$/, "");
  
  if (safeTarget === transientText) {
    return {
      transientText,
      matchState: "matching",
      predictedOutput: ""
    };
  }
  
  if (safeTarget.startsWith(transientText) || (cleanTransient && safeTarget.startsWith(cleanTransient))) {
    const remainingTarget = safeTarget.slice(transientText.length);
    const nextChar = remainingTarget[0] || "";
    
    // Look ahead if the next characters form a conjunct
    // Detect if next character is followed by a hasanta and another consonant
    let displayChar = nextChar;
    if (remainingTarget.length >= 3 && remainingTarget[1] === "্") {
      displayChar = remainingTarget.slice(0, 3); // e.g. ক্ + ত
    }
    
    const predicted = getPhoneticKeysForChar(displayChar);
    return {
      transientText,
      matchState: "partial",
      predictedOutput: predicted
    };
  }

  return {
    transientText,
    matchState: "deviation",
    predictedOutput: ""
  };
}
