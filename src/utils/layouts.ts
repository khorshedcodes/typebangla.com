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
  KeyA: { normal: "\u09c3", shift: "\u098b", altgr: "\u098b" },
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
  // Corrected/Standard Avro rules (longest matches first)
  { eng: "t``", ban: "\u09ce", type: "special" },
  { eng: ",,", ban: "\u09cd", type: "special" },
  { eng: "$", ban: "\u09f3", type: "special" },
  // Bigraphs (Consonants) — longest first
  { eng: "kh", ban: "\u0996", type: "consonant" },
  { eng: "gh", ban: "\u0998", type: "consonant" },
  { eng: "Ng", ban: "\u0999", type: "consonant" },
  { eng: "NG", ban: "\u099e", type: "consonant" },
  { eng: "ng", ban: "\u0982", type: "special" },
  { eng: "ch", ban: "\u099b", type: "consonant" },
  { eng: "jh", ban: "\u099d", type: "consonant" },
  { eng: "th", ban: "\u09a5", type: "consonant" },
  { eng: "dh", ban: "\u09a7", type: "consonant" },
  { eng: "Th", ban: "\u09a0", type: "consonant" },
  { eng: "Dh", ban: "\u09a2", type: "consonant" },
  { eng: "ph", ban: "\u09ab", type: "consonant" },
  { eng: "bh", ban: "\u09ad", type: "consonant" },
  { eng: "Sh", ban: "\u09b7", type: "consonant" },
  { eng: "sh", ban: "\u09b6", type: "consonant" },
  { eng: "rr", ban: "\u09a1\u09bc", type: "special" },
  { eng: "rh", ban: "\u09a2\u09bc", type: "special" },
  { eng: "oy", ban: "\u09af\u09bc", type: "special" },
  // Bigraph Vowels
  { eng: "ou", ban: "\u0994", sign: "\u09cc", type: "vowel" },
  { eng: "oi", ban: "\u0990", sign: "\u09c8", type: "vowel" },
  { eng: "aa", ban: "\u0986", sign: "\u09be", type: "vowel" },
  { eng: "ri", ban: "\u098b", sign: "\u09c3", type: "vowel" },
  // Single Consonants
  { eng: "k", ban: "\u0995", type: "consonant" },
  { eng: "g", ban: "\u0997", type: "consonant" },
  { eng: "c", ban: "\u099a", type: "consonant" },
  { eng: "j", ban: "\u099c", type: "consonant" },
  { eng: "t", ban: "\u09a4", type: "consonant" },
  { eng: "T", ban: "\u099f", type: "consonant" },
  { eng: "d", ban: "\u09a6", type: "consonant" },
  { eng: "D", ban: "\u09a1", type: "consonant" },
  { eng: "p", ban: "\u09aa", type: "consonant" },
  { eng: "f", ban: "\u09ab", type: "consonant" },
  { eng: "b", ban: "\u09ac", type: "consonant" },
  { eng: "v", ban: "\u09ad", type: "consonant" },
  { eng: "m", ban: "\u09ae", type: "consonant" },
  { eng: "z", ban: "\u09af", sign: "\u09cd\u09af", type: "vowel" },
  { eng: "r", ban: "\u09b0", type: "consonant" },
  { eng: "l", ban: "\u09b2", type: "consonant" },
  { eng: "s", ban: "\u09b8", type: "consonant" },
  { eng: "S", ban: "\u09b7", type: "consonant" },
  { eng: "h", ban: "\u09b9", type: "consonant" },
  { eng: "n", ban: "\u09a8", type: "consonant" },
  { eng: "N", ban: "\u09a3", type: "consonant" },
  { eng: "w", ban: "\u0993", sign: "\u09cd\u09ac", type: "vowel" },
  { eng: "y", ban: "\u09af\u09bc", sign: "\u09cd\u09af", type: "vowel" },
  // Single Vowels
  { eng: "a", ban: "\u0986", sign: "\u09be", type: "vowel" },
  { eng: "i", ban: "\u0987", sign: "\u09bf", type: "vowel" },
  { eng: "u", ban: "\u0989", sign: "\u09c1", type: "vowel" },
  { eng: "e", ban: "\u098f", sign: "\u09c7", type: "vowel" },
  { eng: "o", ban: "\u0993", sign: "\u09cb", type: "vowel" },
  { eng: "O", ban: "\u0993", sign: "\u09cb", type: "vowel" },
  { eng: "I", ban: "\u0988", sign: "\u09c0", type: "vowel" },
  { eng: "U", ban: "\u098a", sign: "\u09c2", type: "vowel" },
  { eng: "A", ban: "\u0985", sign: "", type: "vowel" },
  // Specials
  { eng: "+", ban: "\u09cd", type: "special" },
  { eng: "`", ban: "", type: "special" },
  { eng: "H", ban: "\u0983", type: "special" },
  { eng: "^", ban: "\u0981", type: "special" },
  { eng: "Z", ban: "\u09ce", type: "special" },
  { eng: ".`", ban: ".", type: "special" },
  { eng: ".", ban: "\u09e4", type: "special" },
];

// Characters whose presence as last rendered char licenses a vowel sign (kar)
const signLicensors = new Set([
  "\u0995", "\u0996", "\u0997", "\u0998", "\u0999",
  "\u099a", "\u099b", "\u099c", "\u099d", "\u099e",
  "\u099f", "\u09a0", "\u09a1", "\u09a2", "\u09a3",
  "\u09a4", "\u09a5", "\u09a6", "\u09a7", "\u09a8",
  "\u09aa", "\u09ab", "\u09ac", "\u09ad", "\u09ae",
  "\u09af", "\u09b0", "\u09b2", "\u09b6", "\u09b7",
  "\u09b8", "\u09b9", "\u09a1\u09bc", "\u09a2\u09bc", "\u09af\u09bc",
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
        // 'o' before a consonant = silent vowel breaker
        if (token.eng === "o" && nextIsConsonant(input, idx + len)) {
          currentToken.ban = "\u0985"; // অ
          currentToken.sign = "";
        }
        // 'rr' before a consonant = Reph (র + ্)
        if (token.eng === "rr" && nextIsConsonant(input, idx + len)) {
          currentToken.ban = "\u09b0\u09cd"; // র্
          currentToken.type = "special";
        }
        if (currentToken.type === "consonant") {
          if (prevToken && prevToken.type === "consonant") result += "\u09cd"; // ্
          result += currentToken.ban;
        } else if (currentToken.type === "vowel") {
          const lastChar = result.length > 0 ? result[result.length - 1] : "";
          if (lastChar && signLicensors.has(lastChar)) {
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
  Backquote: { normal: "\u200d", shift: "~" },
  Backslash: { normal: "\u200c", shift: "\u0965" },
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
  Minus: { normal: "-", shift: "_" },
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
  KeyN: { normal: "\u09b2", shift: "\u09cd\u09af" },
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
  KeyZ: { normal: "\u09cd\u09b0", shift: "\u09b0\u09cd" },
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
 * Universal Input Mapper for Interactive Components & Arenas
 * Translates raw input keystrokes to Bangla script based on active layout.
 */
export function mapInputToBangla(rawInput: string, layout: string): string {
  if (layout === "english") return rawInput;
  if (layout === "avro") return avroTransliterate(rawInput);

  let mapTable: LayoutMap = UNI_BIJOY_MAP;
  if (layout === "jatiya") mapTable = JATIYA_MAP;
  else if (layout === "probhat") mapTable = PROBHAT_MAP;
  else if (layout === "inscript") mapTable = INSCRIPT_MAP;
  else if (layout === "unicode") mapTable = UNICODE_MAP;

  let result = "";
  for (let i = 0; i < rawInput.length; i++) {
    const char = rawInput[i];
    // If character is already Bangla script or space, keep it as is
    if (/[\u0980-\u09FF\s]/.test(char)) {
      result += char;
      continue;
    }

    let keyCode = "";
    let isShift = false;

    if (/[a-zA-Z]/.test(char)) {
      keyCode = `Key${char.toUpperCase()}`;
      isShift = char === char.toUpperCase() && char !== char.toLowerCase();
    } else if (/[0-9]/.test(char)) {
      keyCode = `Digit${char}`;
    } else if (SYMBOL_KEY_MAP[char]) {
      keyCode = SYMBOL_KEY_MAP[char].code;
      isShift = SYMBOL_KEY_MAP[char].shift;
    }

    if (keyCode && mapTable[keyCode]) {
      const mapped = isShift ? mapTable[keyCode].shift : mapTable[keyCode].normal;
      result += mapped !== undefined ? mapped : char;
    } else {
      // Fallback to Avro transliteration if key is not mapped
      result += avroTransliterate(char);
    }
  }

  return result;
}


