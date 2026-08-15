// Keyboard Layout Mapping Tables for TypeBangla

export interface LayoutMap {
  [key: string]: {
    normal: string;
    shift: string;
    altgr?: string;
    altgr_shift?: string;
  };
}

// 1. UniBijoy Layout Mapping
// Exact traditional Bijoy-standard layout (Mustafa Jabbar) converted to Unicode.
// Intentional duplicates preserved as in the original published standard.
export const UNI_BIJOY_MAP: LayoutMap = {
  Backquote: { normal: "\u200c", shift: "\u200d" },
  Backslash: { normal: "\u0983", shift: "\u09ce" },
  BracketLeft: { normal: "[", shift: "{" },
  BracketRight: { normal: "]", shift: "}" },
  Comma: { normal: ",", shift: "<", altgr_shift: "\u2264" },
  Digit0: { normal: "\u09e6", shift: ")", altgr: "\u09f8" },
  Digit1: { normal: "\u09e7", shift: "!", altgr: "\u09f4" },
  Digit2: { normal: "\u09e8", shift: "@", altgr: "\u09f5" },
  Digit3: { normal: "\u09e9", shift: "#", altgr: "\u09f6" },
  Digit4: { normal: "\u09ea", shift: "\u09f3", altgr: "\u09f7" },
  Digit5: { normal: "\u09eb", shift: "%", altgr: "\u09f2" },
  Digit6: { normal: "\u09ec", shift: "\u00f7" },
  Digit7: { normal: "\u09ed", shift: "\u0981", altgr: "\u09fa" },
  Digit8: { normal: "\u09ee", shift: "\u00d7" },
  Digit9: { normal: "\u09ef", shift: "(" },
  Equal: { normal: "=", shift: "+", altgr: "\u2260" },
  KeyA: { normal: "\u09c3", shift: "\u09b0\u09cd", altgr: "\u098b" },
  KeyB: { normal: "\u09a8", shift: "\u09a3", altgr_shift: "\u09c4" },
  KeyC: { normal: "\u09c7", shift: "\u09c8", altgr: "\u098f", altgr_shift: "\u09e0" },
  KeyD: { normal: "\u09bf", shift: "\u09c0", altgr: "\u0987" },
  KeyE: { normal: "\u09a1", shift: "\u09a2", altgr: "\u0988" },
  KeyF: { normal: "\u09be", shift: "\u0985", altgr: "\u0986" },
  KeyG: { normal: "\u09cd", shift: "\u0964", altgr: "\u09cd" },
  KeyH: { normal: "\u09ac", shift: "\u09ad", altgr: "\u09f0" },
  KeyI: { normal: "\u09b9", shift: "\u099e", altgr: "\u0990", altgr_shift: "\u09bd" },
  KeyJ: { normal: "\u0995", shift: "\u0996" },
  KeyK: { normal: "\u09a4", shift: "\u09a5" },
  KeyL: { normal: "\u09a6", shift: "\u09a7" },
  KeyM: { normal: "\u09ae", shift: "\u09b6" },
  KeyN: { normal: "\u09b8", shift: "\u09b7" },
  KeyO: { normal: "\u0997", shift: "\u0998", altgr: "\u0994" },
  KeyP: { normal: "\u09dc", shift: "\u09dd" },
  KeyQ: { normal: "\u0999", shift: "\u0982", altgr_shift: "\u098c" },
  KeyR: { normal: "\u09aa", shift: "\u09ab" },
  KeyS: { normal: "\u09c1", shift: "\u09c2", altgr: "\u0989" },
  KeyT: { normal: "\u099f", shift: "\u09a0" },
  KeyU: { normal: "\u099c", shift: "\u099d", altgr: "\u098a" },
  KeyV: { normal: "\u09b0", shift: "\u09b2", altgr: "\u09f1", altgr_shift: "\u09e3" },
  KeyW: { normal: "\u09af", shift: "\u09df", altgr_shift: "\u09e1" },
  KeyX: { normal: "\u09cb", shift: "\u09cc", altgr: "\u0993", altgr_shift: "\u09d7" },
  KeyY: { normal: "\u099a", shift: "\u099b" },
  KeyZ: { normal: "\u09cd\u09af", shift: "\u09cd\u09b0", altgr_shift: "\u09e2" },
  Minus: { normal: "-", shift: "_", altgr: "\u09f9" },
  Period: { normal: ".", shift: ">", altgr: "\u09bc", altgr_shift: "\u2265" },
  Quote: { normal: "'", shift: "\u0022" },
  Semicolon: { normal: ";", shift: ":" },
  Slash: { normal: "/", shift: "?" },
  Space: { normal: " ", shift: " ", altgr: " ", altgr_shift: " " },
};

// 2. National Jatiya Layout Mapping
// Exact BCC (Bangladesh Computer Council) published standard.
// Intentional duplicates preserved exactly as in the official BCC specification.
export const JATIYA_MAP: LayoutMap = {
  Backquote: { normal: "`", shift: "~" },
  Backslash: { normal: "\u005c", shift: "\u0965" },
  BracketLeft: { normal: "[", shift: "{" },
  BracketRight: { normal: "]", shift: "}" },
  Comma: { normal: ",", shift: "<" },
  Digit0: { normal: "\u09e6", shift: ")", altgr: "\u09f9" },
  Digit1: { normal: "\u09e7", shift: "!", altgr: "\u09f4" },
  Digit2: { normal: "\u09e8", shift: "@", altgr: "\u09f5" },
  Digit3: { normal: "\u09e9", shift: "#", altgr: "\u09f6" },
  Digit4: { normal: "\u09ea", shift: "\u09f3", altgr: "\u09f3", altgr_shift: "\u09f2" },
  Digit5: { normal: "\u09eb", shift: "%", altgr: "\u09f7" },
  Digit6: { normal: "\u09ec", shift: "^", altgr: "\u09f8" },
  Digit7: { normal: "\u09ed", shift: "&", altgr: "\u0982" },
  Digit8: { normal: "\u09ee", shift: "*" },
  Digit9: { normal: "\u09ef", shift: "(" },
  Equal: { normal: "=", shift: "\u200d", altgr: "\u200d" },
  KeyA: { normal: "\u09c3", shift: "\u09d7", altgr: "\u098b", altgr_shift: "\u09e0" },
  KeyB: { normal: "\u09a8", shift: "\u09a3" },
  KeyC: { normal: "\u09c7", shift: "\u09c8", altgr: "\u098f", altgr_shift: "\u0990" },
  KeyD: { normal: "\u09bf", shift: "\u09c0", altgr: "\u0987", altgr_shift: "\u0988" },
  KeyE: { normal: "\u09a1", shift: "\u09a2", altgr: "\u09c4" },
  KeyF: { normal: "\u09ac", shift: "\u09ad", altgr: "\u09f0", altgr_shift: "\u09f1" },
  KeyG: { normal: "\u09cd", shift: "\u0964", altgr: "\u0965" },
  KeyH: { normal: "\u09be", shift: "\u0985", altgr: "\u0986" },
  KeyI: { normal: "\u09b9", shift: "\u099e", altgr: "\u09bd" },
  KeyJ: { normal: "\u0995", shift: "\u0996" },
  KeyK: { normal: "\u09a4", shift: "\u09a5", altgr: "\u09ce" },
  KeyL: { normal: "\u09a6", shift: "\u09a7", altgr: "\u098c", altgr_shift: "\u09e1" },
  KeyM: { normal: "\u09ae", shift: "\u09b6" },
  KeyN: { normal: "\u09b8", shift: "\u09b7" },
  KeyO: { normal: "\u0997", shift: "\u0998" },
  KeyP: { normal: "\u09dc", shift: "\u09dd" },
  KeyQ: { normal: "\u0999", shift: "\u0982", altgr: "\u09e2", altgr_shift: "\u09e3" },
  KeyR: { normal: "\u09aa", shift: "\u09ab" },
  KeyS: { normal: "\u09c1", shift: "\u09c2", altgr: "\u0989", altgr_shift: "\u098a" },
  KeyT: { normal: "\u099f", shift: "\u09a0" },
  KeyU: { normal: "\u099c", shift: "\u099d" },
  KeyV: { normal: "\u09b0", shift: "\u09b2" },
  KeyW: { normal: "\u09af", shift: "\u09df" },
  KeyX: { normal: "\u09cb", shift: "\u09cc", altgr: "\u0993", altgr_shift: "\u0994" },
  KeyY: { normal: "\u099a", shift: "\u099b" },
  KeyZ: { normal: "\u0981", shift: "\u0983", altgr: "\u09fa" },
  Minus: { normal: "\u200c", shift: "_", altgr: "\u200c" },
  Period: { normal: ".", shift: ">", altgr: "\u09bc" },
  Quote: { normal: "'", shift: "\u0022" },
  Semicolon: { normal: ";", shift: ":" },
  Slash: { normal: "/", shift: "?" },
  Space: { normal: " ", shift: " " },
};


// 3. Avro Phonetic Transliteration Rules Engine
interface TransliterationToken {
  eng: string;
  ban: string;
  sign?: string;
  type: "consonant" | "vowel" | "special";
}

const phoneticTokens: TransliterationToken[] = [
  // === 3-char tokens first (longest-match greedy) ===
  { eng: "rri", ban: "\u098b", sign: "\u09c3", type: "vowel" }, // ঋ/ৃ
  { eng: "kSh", ban: "\u0995\u09cd\u09b7", type: "consonant" }, // ক্ষ
  // === 2-char consonant digraphs ===
  { eng: "kh", ban: "\u0996", type: "consonant" },   // খ
  { eng: "gh", ban: "\u0998", type: "consonant" },   // ঘ
  { eng: "Ng", ban: "\u0999", type: "consonant" },   // ঙ
  { eng: "NG", ban: "\u099e", type: "consonant" },   // ঞ
  { eng: "ng", ban: "\u0982", type: "special" },     // ং (anusvara)
  { eng: "ch", ban: "\u099b", type: "consonant" },   // ছ
  { eng: "jh", ban: "\u099d", type: "consonant" },   // ঝ
  { eng: "Th", ban: "\u09a0", type: "consonant" },   // ঠ
  { eng: "th", ban: "\u09a5", type: "consonant" },   // থ
  { eng: "Dh", ban: "\u09a2", type: "consonant" },   // ঢ
  { eng: "dh", ban: "\u09a7", type: "consonant" },   // ধ
  { eng: "ph", ban: "\u09ab", type: "consonant" },   // ফ
  { eng: "bh", ban: "\u09ad", type: "consonant" },   // ভ
  { eng: "Sh", ban: "\u09b7", type: "consonant" },   // ষ  (capital S + h)
  { eng: "sh", ban: "\u09b6", type: "consonant" },   // শ  (lowercase s + h)
  // 2-char special: rr = Reph (র্) before consonant, else রর
  { eng: "rr", ban: "\u09b0\u09b0", type: "special" }, // রর (Reph logic in engine)
  // 2-char vowels
  { eng: "OI", ban: "\u0990", sign: "\u09c8", type: "vowel" }, // ঐ/ৈ  (official)
  { eng: "OU", ban: "\u0994", sign: "\u09cc", type: "vowel" }, // ঔ/ৌ  (official)
  { eng: "ee", ban: "\u0988", sign: "\u09c0", type: "vowel" }, // ঈ/ী
  { eng: "oo", ban: "\u098a", sign: "\u09c2", type: "vowel" }, // ঊ/ূ
  // === Capital 1-char consonants (special) ===
  { eng: "Rh", ban: "\u09a2\u09bc", type: "consonant" }, // ঢ়  (2-char, before R)
  { eng: "R", ban: "\u09a1\u09bc", type: "consonant" },  // ড়
  { eng: "Y", ban: "\u09af\u09bc", type: "consonant" },  // য়
  { eng: "G", ban: "\u0997", type: "consonant" },         // গ  (alias for g)
  { eng: "J", ban: "\u099c", type: "consonant" },         // জ  (alias for j, official)
  { eng: "S", ban: "\u09b6", type: "consonant" },         // শ  (official: S=sha, Sh=SSA per PDF)
  { eng: "N", ban: "\u09a3", type: "consonant" },         // ণ
  { eng: "T", ban: "\u099f", type: "consonant" },         // ট
  { eng: "D", ban: "\u09a1", type: "consonant" },         // ড
  // === Lowercase single consonants ===
  { eng: "gg", ban: "\u099c\u09cd\u099e", type: "consonant" }, // জ্ঞ (official PDF: gg = জ্ঞ)
  { eng: "k", ban: "\u0995", type: "consonant" },   // ক
  { eng: "q", ban: "\u0995", type: "consonant" },   // ক  (alias, official)
  { eng: "g", ban: "\u0997", type: "consonant" },   // গ
  { eng: "c", ban: "\u099a", type: "consonant" },   // চ
  { eng: "j", ban: "\u099c", type: "consonant" },   // জ
  { eng: "t", ban: "\u09a4", type: "consonant" },   // ত
  { eng: "d", ban: "\u09a6", type: "consonant" },   // দ
  { eng: "p", ban: "\u09aa", type: "consonant" },   // প
  { eng: "f", ban: "\u09ab", type: "consonant" },   // ফ  (alias ph)
  { eng: "b", ban: "\u09ac", type: "consonant" },   // ব
  { eng: "v", ban: "\u09ad", type: "consonant" },   // ভ  (alias bh)
  { eng: "m", ban: "\u09ae", type: "consonant" },   // ম
  { eng: "r", ban: "\u09b0", type: "consonant" },   // র
  { eng: "l", ban: "\u09b2", type: "consonant" },   // ল
  { eng: "s", ban: "\u09b8", type: "consonant" },   // স
  { eng: "h", ban: "\u09b9", type: "consonant" },   // হ
  { eng: "n", ban: "\u09a8", type: "consonant" },   // ন
  { eng: "x", ban: "\u0995\u09cd\u09b8", type: "consonant" }, // ক্স (official)
  // === Fola / semi-vowel tokens (context-sensitive, must come before pure vowels) ===
  // z = য after consonant (ja-fola sign), standalone = য
  { eng: "z", ban: "\u09af", sign: "\u09cd\u09af", type: "vowel" },
  // w = ব-ফলা after consonant, standalone = ও (official)
  { eng: "w", ban: "\u0993", sign: "\u09cd\u09ac", type: "vowel" },
  // y = য়-ফলা after consonant, standalone = য়
  { eng: "y", ban: "\u09af\u09bc", sign: "\u09cd\u09af", type: "vowel" },
  // === Single vowels ===
  { eng: "a", ban: "\u0986", sign: "\u09be", type: "vowel" },   // আ/া
  { eng: "i", ban: "\u0987", sign: "\u09bf", type: "vowel" },   // ই/ি
  { eng: "u", ban: "\u0989", sign: "\u09c1", type: "vowel" },   // উ/ু
  { eng: "e", ban: "\u098f", sign: "\u09c7", type: "vowel" },   // এ/ে
  // o = inherent অ (schwa) — silent after consonant, letter at start
  { eng: "o", ban: "\u0985", sign: "", type: "vowel" },          // অ/inherent
  // O (capital) = ও/ো
  { eng: "O", ban: "\u0993", sign: "\u09cb", type: "vowel" },   // ও/ো
  { eng: "I", ban: "\u0988", sign: "\u09c0", type: "vowel" },   // ঈ/ী
  { eng: "U", ban: "\u098a", sign: "\u09c2", type: "vowel" },   // ঊ/ূ
  { eng: "A", ban: "\u0985", sign: "", type: "vowel" },           // অ (explicit)
  // === Specials ===
  { eng: "+", ban: "\u09cd", type: "special" },     // ্ (hasanta / joiner)
  { eng: "`", ban: "", type: "special" },            // ` (explicit schwa breaker)
  { eng: "H", ban: "\u0983", type: "special" },     // ঃ visarga
  { eng: ":", ban: "\u0983", type: "special" },     // ঃ visarga (alias)
  { eng: "^", ban: "\u0981", type: "special" },     // ঁ chandrabindu
  { eng: "Z", ban: "\u09ce", type: "special" },     // ৎ khanda-ta
  { eng: "$", ban: "\u09f3", type: "special" },     // ৳ taka sign
  { eng: ",,", ban: "\u09cd", type: "special" },    // ্ (hasanta shorthand)
  { eng: "t``", ban: "\u09ce", type: "special" },   // ৎ khanda-ta shorthand
  { eng: ".`", ban: ".", type: "special" },          // literal full-stop
  { eng: ".", ban: "\u0964", type: "special" },     // । (Bengali danda / Dari)
];

export const AVRO_BANGLA_LEGEND_MAP: Record<string, { normal: string; shift: string }> = {
  KeyK: { normal: "ক", shift: "খ" },
  KeyG: { normal: "গ", shift: "ঘ" },
  KeyQ: { normal: "ঙ", shift: "ং" },
  KeyC: { normal: "চ", shift: "ছ" },
  KeyJ: { normal: "জ", shift: "ঝ" },
  KeyT: { normal: "ত", shift: "থ" },
  KeyD: { normal: "দ", shift: "ধ" },
  KeyN: { normal: "ন", shift: "ণ" },
  KeyP: { normal: "প", shift: "ফ" },
  KeyF: { normal: "ফ", shift: "ঁ" },
  KeyB: { normal: "ব", shift: "ভ" },
  KeyV: { normal: "ভ", shift: "ৱ" },
  KeyM: { normal: "ম", shift: "্ম" },
  KeyY: { normal: "য", shift: "য়" },
  KeyR: { normal: "র", shift: "ড়" },
  KeyL: { normal: "ল", shift: "্ল" },
  KeyS: { normal: "স", shift: "শ" },
  KeyH: { normal: "হ", shift: "ঃ" },
  KeyA: { normal: "া", shift: "অ" },
  KeyI: { normal: "ি", shift: "ই" },
  KeyU: { normal: "ু", shift: "উ" },
  KeyE: { normal: "ে", shift: "এ" },
  KeyO: { normal: "ো", shift: "ও" },
  KeyW: { normal: "ৈ", shift: "ঐ" },
  KeyZ: { normal: "্য", shift: "ঋ" },
  KeyX: { normal: "্", shift: "ৎ" },
  Period: { normal: "।", shift: ">" },
  Comma: { normal: ",", shift: "<" },
  Equal: { normal: "=", shift: "+" },
  Minus: { normal: "-", shift: "_" },
  Backslash: { normal: "\\", shift: "|" },
  Digit1: { normal: "১", shift: "!" },
  Digit2: { normal: "২", shift: "@" },
  Digit3: { normal: "৩", shift: "#" },
  Digit4: { normal: "৪", shift: "৳" },
  Digit5: { normal: "৫", shift: "%" },
  Digit6: { normal: "৬", shift: "^" },
  Digit7: { normal: "৭", shift: "&" },
  Digit8: { normal: "৮", shift: "*" },
  Digit9: { normal: "৯", shift: "(" },
  Digit0: { normal: "০", shift: ")" },
};

// Characters whose presence as last rendered char licenses a vowel sign (kar)
const signLicensors = new Set([
  "\u0995", "\u0996", "\u0997", "\u0998", "\u0999",
  "\u099a", "\u099b", "\u099c", "\u099d", "\u099e",
  "\u099f", "\u09a0", "\u09a1", "\u09a2", "\u09a3",
  "\u09a4", "\u09a5", "\u09a6", "\u09a7", "\u09a8",
  "\u09aa", "\u09ab", "\u09ac", "\u09ad", "\u09ae",
  "\u09af", "\u09b0", "\u09b2", "\u09b6", "\u09b7",
  "\u09b8", "\u09b9", "\u09a1\u09bc", "\u09a2\u09bc", "\u09af\u09bc", "\u09bc",
  "\u0995\u09cd\u09b7", "\u099c\u09cd\u099e",
  "\u09cd", "\u09cd\u09af", "\u09cd\u09ac", "\u09cd\u09b0", "\u09c3"
]);

function nextIsConsonant(input: string, startIdx: number): boolean {
  if (startIdx >= input.length) return false;
  for (const token of phoneticTokens) {
    if (token.type === "consonant") {
      if (input.substr(startIdx, token.eng.length) === token.eng) return true;
    }
  }
  return false;
}

/**
 * Transliterates Romanised Bangla to Unicode Bangla using token-based parsing.
 * Handles: auto conjuncts, + joiner, ` breaker, vowel signs (kar),
 *          ro-fola, ja-fola, ba-fola, reph, chandrabindu, visarga, khanda-ta.
 */
export function avroTransliterate(input: string): string {
  if (!input) return "";
  let result = "";
  let idx = 0;
  let prevToken: TransliterationToken | null = null;

  while (idx < input.length) {
    let matched = false;
    for (const token of phoneticTokens) {
      const len = token.eng.length;
      if (input.substr(idx, len) === token.eng) {
        const currentToken = { ...token };
        // 'rr' before a consonant = Reph (র + ্); otherwise = রর (double ra)
        if (token.eng === "rr") {
          if (nextIsConsonant(input, idx + len)) {
            currentToken.ban = "\u09b0\u09cd"; // র্
            currentToken.type = "special";
          } else {
            currentToken.ban = "\u09b0\u09b0"; // রর
            currentToken.type = "special";
          }
        }
        if (currentToken.type === "consonant") {
          if (prevToken && prevToken.type === "consonant") result += "\u09cd"; // ্
          result += currentToken.ban;
        } else if (currentToken.type === "vowel") {
          const last1 = result.length >= 1 ? result.slice(-1) : "";
          const last2 = result.length >= 2 ? result.slice(-2) : "";
          const isLicensor = (last1 && signLicensors.has(last1)) || (last2 && signLicensors.has(last2));
          if (isLicensor) {
            result += currentToken.sign !== undefined ? currentToken.sign : currentToken.ban;
          } else {
            result += currentToken.ban;
          }
        } else {
          result += currentToken.ban;
        }
        prevToken = currentToken;
        idx += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += input[idx];
      prevToken = null;
      idx++;
    }
  }
  return result;
}

// Mapped from Probhat layout findings
export const PROBHAT_MAP: LayoutMap = {
  Backquote: { normal: "`", shift: "~" },
  Backslash: { normal: "\\", shift: "\u0965" },
  BracketLeft: { normal: "\u09c7", shift: "\u09c8" },
  BracketRight: { normal: "\u09cb", shift: "\u09cc", altgr: "\u09d7" },
  Comma: { normal: ",", shift: "\u09c3" },
  Digit0: { normal: "\u09e6", shift: ")", altgr: "\u09f8", altgr_shift: "\u09f9" },
  Digit1: { normal: "\u09e7", shift: "!", altgr: "\u09f4" },
  Digit2: { normal: "\u09e8", shift: "@", altgr: "\u09f5" },
  Digit3: { normal: "\u09e9", shift: "#", altgr: "\u09f6" },
  Digit4: { normal: "\u09ea", shift: "\u09f3", altgr: "\u09f7", altgr_shift: "\u09f2" },
  Digit5: { normal: "\u09eb", shift: "%" },
  Digit6: { normal: "\u09ec", shift: "^" },
  Digit7: { normal: "\u09ed", shift: "\u099e", altgr_shift: "\u09fa" },
  Digit8: { normal: "\u09ee", shift: "\u09ce" },
  Digit9: { normal: "\u09ef", shift: "(" },
  Equal: { normal: "=", shift: "\u200d" },
  KeyA: { normal: "\u09be", shift: "\u0985", altgr: "\u098c", altgr_shift: "\u09e0" },
  KeyB: { normal: "\u09ac", shift: "\u09ad" },
  KeyC: { normal: "\u099a", shift: "\u099b" },
  KeyD: { normal: "\u09a1", shift: "\u09a2", altgr: "\u09c4", altgr_shift: "\u09e2" },
  KeyE: { normal: "\u09c0", shift: "\u0988" },
  KeyF: { normal: "\u09a4", shift: "\u09a5" },
  KeyG: { normal: "\u0997", shift: "\u0998" },
  KeyH: { normal: "\u09b9", shift: "\u0983", altgr: "\u09bd" },
  KeyI: { normal: "\u09bf", shift: "\u0987" },
  KeyJ: { normal: "\u099c", shift: "\u099d" },
  KeyK: { normal: "\u0995", shift: "\u0996" },
  KeyL: { normal: "\u09b2", shift: "\u0982" },
  KeyM: { normal: "\u09ae", shift: "\u0999" },
  KeyN: { normal: "\u09a8", shift: "\u09a3" },
  KeyO: { normal: "\u0993", shift: "\u0994" },
  KeyP: { normal: "\u09aa", shift: "\u09ab" },
  KeyQ: { normal: "\u09a6", shift: "\u09a7" },
  KeyR: { normal: "\u09b0", shift: "\u09dc" },
  KeyS: { normal: "\u09b8", shift: "\u09b7", altgr: "\u09e1", altgr_shift: "\u09e3" },
  KeyT: { normal: "\u099f", shift: "\u09a0" },
  KeyU: { normal: "\u09c1", shift: "\u0989" },
  KeyV: { normal: "\u0986", shift: "\u098b" },
  KeyW: { normal: "\u09c2", shift: "\u098a" },
  KeyX: { normal: "\u09b6", shift: "\u09dd" },
  KeyY: { normal: "\u098f", shift: "\u0990" },
  KeyZ: { normal: "\u09df", shift: "\u09af" },
  Minus: { normal: "\u200c", shift: "_" },
  Period: { normal: "\u0964", shift: "\u0981", altgr: "\u09bc" },
  Quote: { normal: "'", shift: "\u0022" },
  Semicolon: { normal: ";", shift: ":" },
  Slash: { normal: "\u09cd", shift: "?" },
  Space: { normal: " ", shift: " " },
};

// Mapped from Inscript layout findings
export const INSCRIPT_MAP: LayoutMap = {
  Backquote: { normal: "\u200c", shift: "\u200d", altgr: "`", altgr_shift: "~" },
  Backslash: { normal: "\u09dc", shift: "\u09dd", altgr: "\u005c", altgr_shift: "|" },
  BracketLeft: { normal: "\u09a1", shift: "\u09a2", altgr: "[", altgr_shift: "{" },
  BracketRight: { normal: "\u09bc", shift: "\u099e", altgr: "]", altgr_shift: "}" },
  Comma: { normal: ",", shift: "\u09b7", altgr_shift: "<" },
  Digit0: { normal: "\u09e6", shift: ")", altgr: "\u09c4" },
  Digit1: { normal: "\u09e7", shift: "!", altgr: "\u09f4" },
  Digit2: { normal: "\u09e8", shift: "@", altgr: "\u09f5" },
  Digit3: { normal: "\u09e9", shift: "#", altgr: "\u09f6" },
  Digit4: { normal: "\u09ea", shift: "\u09f2", altgr: "\u09f3" },
  Digit5: { normal: "\u09eb", shift: "\u0022", altgr: "\u09f7" },
  Digit6: { normal: "\u09ec", shift: "'", altgr: "\u09fa" },
  Digit7: { normal: "\u09ed", shift: "&", altgr: "\u09f8" },
  Digit8: { normal: "\u09ee", shift: "*", altgr: "\u09e1" },
  Digit9: { normal: "\u09ef", shift: "(", altgr: "\u098c" },
  Equal: { normal: "\u09c3", shift: "\u098b", altgr: "=", altgr_shift: "+" },
  KeyA: { normal: "\u09cb", shift: "\u0993" },
  KeyB: { normal: "\u09f1", shift: "\u09f0" },
  KeyC: { normal: "\u09ae", shift: "\u09a3" },
  KeyD: { normal: "\u09cd", shift: "\u0985" },
  KeyE: { normal: "\u09be", shift: "\u0986", altgr: "\u09e0" },
  KeyF: { normal: "\u09bf", shift: "\u0987" },
  KeyG: { normal: "\u09c1", shift: "\u0989" },
  KeyH: { normal: "\u09aa", shift: "\u09ab" },
  KeyI: { normal: "\u0997", shift: "\u0998" },
  KeyJ: { normal: "\u09b0", shift: "\u09ce" },
  KeyK: { normal: "\u0995", shift: "\u0996" },
  KeyL: { normal: "\u09a4", shift: "\u09a5" },
  KeyM: { normal: "\u09b8", shift: "\u09b6" },
  KeyN: { normal: "\u09b2", shift: "" },
  KeyO: { normal: "\u09a6", shift: "\u09a7" },
  KeyP: { normal: "\u099c", shift: "\u099d" },
  KeyQ: { normal: "\u09cc", shift: "\u0994", altgr: "\u09d7" },
  KeyR: { normal: "\u09c0", shift: "\u0988", altgr: "\u09d7" },
  KeyS: { normal: "\u09c7", shift: "\u098f" },
  KeyT: { normal: "\u09c2", shift: "\u098a", altgr: "\u09e2" },
  KeyU: { normal: "\u09b9", shift: "\u0999" },
  KeyV: { normal: "\u09a8", shift: "\u0965" },
  KeyW: { normal: "\u09c8", shift: "\u0990", altgr: "\u09e3" },
  KeyX: { normal: "\u0982", shift: "\u0981", altgr: "\u09fa" },
  KeyY: { normal: "\u09ac", shift: "\u09ad" },
  KeyZ: { normal: "", shift: "" },
  Minus: { normal: "-", shift: "\u0983" },
  Period: { normal: ".", shift: "\u0964", altgr: "\u09bd", altgr_shift: ">" },
  Quote: { normal: "\u099f", shift: "\u09a0", altgr: "'", altgr_shift: "\u0022" },
  Semicolon: { normal: "\u099a", shift: "\u099b", altgr: ";", altgr_shift: ":" },
  Slash: { normal: "\u09af", shift: "\u09af", altgr: "/", altgr_shift: "?" },
  Space: { normal: " ", shift: " " },
};

// Mapped from Unicode layout findings
export const UNICODE_MAP: LayoutMap = {
  Backquote: { normal: "\u200c", shift: "\u200d" },
  Backslash: { normal: "\u09f1", shift: "\u09f0" },
  BracketLeft: { normal: "[", shift: "{" },
  BracketRight: { normal: "]", shift: "}" },
  Comma: { normal: ",", shift: "<" },
  Digit0: { normal: "\u09e6", shift: ")", altgr: "\u09f8", altgr_shift: "\u09f9" },
  Digit1: { normal: "\u09e7", shift: "!", altgr: "\u09f4" },
  Digit2: { normal: "\u09e8", shift: "@", altgr: "\u09f5" },
  Digit3: { normal: "\u09e9", shift: "#", altgr: "\u09f6" },
  Digit4: { normal: "\u09ea", shift: "\u09f3", altgr: "\u09f7", altgr_shift: "\u09f2" },
  Digit5: { normal: "\u09eb", shift: "%" },
  Digit6: { normal: "\u09ec", shift: "\u0983" },
  Digit7: { normal: "\u09ed", shift: "\u0981", altgr_shift: "\u09fa" },
  Digit8: { normal: "\u09ee", shift: "\u00d7" },
  Digit9: { normal: "\u09ef", shift: "(" },
  Equal: { normal: "=", shift: "+" },
  KeyA: { normal: "\u09c3", shift: "\u09b0\u09cd", altgr: "\u098c", altgr_shift: "\u09e0" },
  KeyB: { normal: "\u09a8", shift: "\u09a3" },
  KeyC: { normal: "\u09c7", shift: "\u09c8" },
  KeyD: { normal: "\u09bf", shift: "\u09c0", altgr: "\u09c4", altgr_shift: "\u09e2" },
  KeyE: { normal: "\u09a1", shift: "\u09a2" },
  KeyF: { normal: "\u09be", shift: "\u0985" },
  KeyG: { normal: "\u09cd", shift: "\u0964" },
  KeyH: { normal: "\u09ac", shift: "\u09ad" },
  KeyI: { normal: "\u09b9", shift: "\u099e", altgr: "\u09bd" },
  KeyJ: { normal: "\u0995", shift: "\u0996" },
  KeyK: { normal: "\u09a4", shift: "\u09a5" },
  KeyL: { normal: "\u09a6", shift: "\u09a7" },
  KeyM: { normal: "\u09ae", shift: "\u09b6" },
  KeyN: { normal: "\u09b8", shift: "\u09b7" },
  KeyO: { normal: "\u0997", shift: "\u0998" },
  KeyP: { normal: "\u09dc", shift: "\u09dd" },
  KeyQ: { normal: "\u0999", shift: "\u0982" },
  KeyR: { normal: "\u09aa", shift: "\u09ab" },
  KeyS: { normal: "\u09c1", shift: "\u09c2", altgr: "\u09e1", altgr_shift: "\u09e3" },
  KeyT: { normal: "\u099f", shift: "\u09a0" },
  KeyU: { normal: "\u099c", shift: "\u099d" },
  KeyV: { normal: "\u09b0", shift: "\u09b2" },
  KeyW: { normal: "\u09af", shift: "\u09df" },
  KeyX: { normal: "\u09cb", shift: "\u09cc", altgr_shift: "\u09d7" },
  KeyY: { normal: "\u099a", shift: "\u099b" },
  KeyZ: { normal: "\u09cd\u09b0", shift: "\u09cd\u09af" },
  Minus: { normal: "-", shift: "\u09ce" },
  Period: { normal: ".", shift: ">", altgr: "\u09bc" },
  Quote: { normal: "'", shift: "\u0022" },
  Semicolon: { normal: ";", shift: ":" },
  Slash: { normal: "/", shift: "?" },
  Space: { normal: " ", shift: " " },
};

const SYMBOL_KEY_MAP: Record<string, { code: string; shift: boolean }> = {
  "!": { code: "Digit1", shift: true },
  "@": { code: "Digit2", shift: true },
  "#": { code: "Digit3", shift: true },
  "$": { code: "Digit4", shift: true },
  "%": { code: "Digit5", shift: true },
  "^": { code: "Digit6", shift: true },
  "&": { code: "Digit7", shift: true },
  "*": { code: "Digit8", shift: true },
  "(": { code: "Digit9", shift: true },
  ")": { code: "Digit0", shift: true },
  "-": { code: "Minus", shift: false },
  "_": { code: "Minus", shift: true },
  "=": { code: "Equal", shift: false },
  "+": { code: "Equal", shift: true },
  "[": { code: "BracketLeft", shift: false },
  "{": { code: "BracketLeft", shift: true },
  "]": { code: "BracketRight", shift: false },
  "}": { code: "BracketRight", shift: true },
  "\\": { code: "Backslash", shift: false },
  "|": { code: "Backslash", shift: true },
  ";": { code: "Semicolon", shift: false },
  ":": { code: "Semicolon", shift: true },
  "'": { code: "Quote", shift: false },
  '"': { code: "Quote", shift: true },
  ",": { code: "Comma", shift: false },
  "<": { code: "Comma", shift: true },
  ".": { code: "Period", shift: false },
  ">": { code: "Period", shift: true },
  "/": { code: "Slash", shift: false },
  "?": { code: "Slash", shift: true },
  "`": { code: "Backquote", shift: false },
  "~": { code: "Backquote", shift: true },
};

/**
 * Converts Hasanta (্) + Kar sequence to Independent Bangla Vowels (for UniBijoy, Jatiya, Unicode)
 * e.g., ্ + ি -> ই (Rossho I), ্ + ী -> ঈ (Dirgho I), ্ + া -> আ, etc.
 */
export function applyHasantaVowelConversion(input: string): string {
  if (!input || !input.includes("\u09cd") || input.length <= 1) return input;

  return input
    .replace(/([\u0985-\u09b9\u09dc-\u09df])\u09b0\u09cd/g, "\u09b0\u09cd$1") // Reph reordering (consonant + র্ -> র্ + consonant)
    .replace(/\u09cd\u09bf/g, "\u0987") // ্ + ি -> ই (Rossho I)
    .replace(/\u09cd\u09c0/g, "\u0988") // ্ + ী -> ঈ (Dirgho I)
    .replace(/\u09cd\u09be/g, "\u0986") // ্ + া -> আ
    .replace(/\u09cd\u09c1/g, "\u0989") // ্ + ু -> উ
    .replace(/\u09cd\u09c2/g, "\u098a") // ্ + ূ -> ঊ
    .replace(/\u09cd\u09c3/g, "\u098b") // ্ + ৃ -> ঋ
    .replace(/\u09cd\u09c7/g, "\u098f") // ্ + ে -> এ
    .replace(/\u09cd\u09c8/g, "\u0990") // ্ + ৈ -> ঐ
    .replace(/\u09cd\u09cb/g, "\u0993") // ্ + ো -> ও
    .replace(/\u09cd\u09cc/g, "\u0994"); // ্ + ৌ -> ঔ
}

/**
 * Universal Input Mapper for Interactive Components & Arenas
 * Translates raw input keystrokes to Bangla script based on active layout.
 */
export function mapInputToBangla(rawInput: string, layout: string, isShiftPressed = false): string {
  if (!rawInput) return "";
  const MODIFIER_KEYS = new Set([
    "ShiftLeft", "ShiftRight", "ControlLeft", "ControlRight",
    "AltLeft", "AltRight", "CapsLock", "Tab", "Enter", "Backspace", "Escape", "MetaLeft", "MetaRight"
  ]);
  if (MODIFIER_KEYS.has(rawInput)) return "";

  if (layout === "english") return rawInput;
  if (layout === "avro") return avroTransliterate(rawInput);

  let mapTable: LayoutMap = UNI_BIJOY_MAP;
  if (layout === "jatiya") mapTable = JATIYA_MAP;
  else if (layout === "probhat") mapTable = PROBHAT_MAP;
  else if (layout === "inscript") mapTable = INSCRIPT_MAP;
  else if (layout === "unicode") mapTable = UNICODE_MAP;

  // 1. Direct Keyboard Event Code lookup (e.g. "KeyK", "Digit1", "Semicolon", "Space")
  if (rawInput.startsWith("Numpad")) {
    const digitMatch = rawInput.match(/^Numpad([0-9])$/);
    if (digitMatch) {
      const digitCode = `Digit${digitMatch[1]}`;
      if (mapTable[digitCode]) {
        const mapped = isShiftPressed ? mapTable[digitCode].shift : mapTable[digitCode].normal;
        return mapped !== undefined ? mapped : "";
      }
    }
  }

  if (mapTable[rawInput]) {
    const mapped = isShiftPressed ? mapTable[rawInput].shift : mapTable[rawInput].normal;
    return mapped !== undefined ? mapped : "";
  }
  if (rawInput === "Space") return " ";

  // 2. Character string mapping (e.g. "k", "A", "hello")
  let result = "";
  for (let i = 0; i < rawInput.length; i++) {
    const char = rawInput[i];
    // If character is already Bangla script or space, keep it as is
    if (/[\u0980-\u09FF\s]/.test(char)) {
      result += char;
      continue;
    }

    let keyCode = "";
    let isShift = isShiftPressed;

    if (/[a-zA-Z]/.test(char)) {
      keyCode = `Key${char.toUpperCase()}`;
      if (!isShiftPressed) {
        isShift = char === char.toUpperCase() && char !== char.toLowerCase();
      }
    } else if (/[0-9]/.test(char)) {
      keyCode = `Digit${char}`;
    } else if (SYMBOL_KEY_MAP[char]) {
      keyCode = SYMBOL_KEY_MAP[char].code;
      if (!isShiftPressed) {
        isShift = SYMBOL_KEY_MAP[char].shift;
      }
    }

    if (keyCode && mapTable[keyCode]) {
      const mapped = isShift ? mapTable[keyCode].shift : mapTable[keyCode].normal;
      result += mapped !== undefined ? mapped : char;
    } else {
      // Fallback to Avro transliteration if key is not mapped
      result += avroTransliterate(char);
    }
  }

  return applyHasantaVowelConversion(result);
}


