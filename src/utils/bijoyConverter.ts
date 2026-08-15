/**
 * TypeBangla — Unicode ↔ Bijoy ANSI (SutonnyMJ) Converter Library
 *
 * Provides bidirectional conversion between standard Unicode Bangla text and
 * SutonnyMJ / Bijoy ANSI encoding for publication, layout printers, and office documents.
 */

// Comprehensive mapping of Unicode Bangla to SutonnyMJ ANSI characters
export const UNICODE_TO_ANSI: Record<string, string> = {
  "অ": "a",
  "আ": "Av",
  "ই": "B",
  "ঈ": "C",
  "উ": "D",
  "ঊ": "E",
  "ঋ": "F",
  "এ": "G",
  "ঐ": "H",
  "ও": "I",
  "ঔ": "J",
  "ক": "j",
  "খ": "L",
  "গ": "M",
  "ঘ": "N",
  "ঙ": "O",
  "চ": "P",
  "ছ": "Q",
  "জ": "R",
  "ঝ": "S",
  "ঞ": "T",
  "ট": "U",
  "ঠ": "V",
  "ড": "W",
  "ঢ": "X",
  "ণ": "Y",
  "ত": "Z",
  "থ": "_",
  "দ": "`",
  "ধ": "a",
  "ন": "b",
  "প": "c",
  "ফ": "d",
  "ব": "e",
  "ভ": "f",
  "ম": "g",
  "য": "h",
  "র": "i",
  "ল": "k",
  "শ": "l",
  "ষ": "m",
  "স": "n",
  "হ": "o",
  "ড়": "p",
  "ঢ়": "q",
  "য়": "r",
  "ৎ": "s",
  "ং": "t",
  "ঃ": "u",
  "ঁ": "v",
  "া": "v",
  "ি": "w",
  "ী": "x",
  "ু": "y",
  "ূ": "~",
  "ৃ": "„",
  "ে": "c",
  "ৈ": "t",
  "্": "&",
  "।": "|",
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9"
};

// Precise ANSI to Unicode reverse lookup dictionary
export const ANSI_TO_UNICODE: Record<string, string> = {
  "a": "ধ",
  "Av": "আ",
  "B": "ই",
  "C": "ঈ",
  "D": "উ",
  "E": "ঊ",
  "F": "ঋ",
  "G": "এ",
  "H": "ঐ",
  "I": "ও",
  "J": "ঔ",
  "j": "ক",
  "L": "খ",
  "M": "গ",
  "N": "ঘ",
  "O": "ঙ",
  "P": "চ",
  "Q": "ছ",
  "R": "জ",
  "S": "ঝ",
  "T": "ঞ",
  "U": "ট",
  "V": "ঠ",
  "W": "ড",
  "X": "ঢ",
  "Y": "ণ",
  "Z": "ত",
  "_": "থ",
  "`": "দ",
  "b": "ন",
  "c": "প",
  "d": "ফ",
  "e": "ব",
  "f": "ভ",
  "g": "ম",
  "h": "য",
  "i": "র",
  "k": "ল",
  "l": "শ",
  "m": "ষ",
  "n": "স",
  "o": "হ",
  "p": "ড়",
  "q": "ঢ়",
  "r": "য়",
  "s": "ৎ",
  "t": "ং",
  "u": "ঃ",
  "v": "া",
  "w": "ি",
  "x": "ী",
  "y": "ু",
  "~": "ূ",
  "„": "ৃ",
  "&": "্",
  "|": "।",
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯"
};

const CONSONANTS = new Set([
  "ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ", "ট", "ঠ", "ড", "ঢ", "ণ",
  "ত", "থ", "দ", "ধ", "ন", "প", "ফ", "ব", "ভ", "ম", "য", "র", "ল", "শ", "ষ",
  "স", "হ", "ড়", "ঢ়", "য়"
]);

/**
 * Converts Unicode Bangla text to Bijoy ANSI text (SutonnyMJ font layout)
 */
export function unicodeToBijoy(text: string): string {
  if (!text) return "";

  const chars = Array.from(text);
  const result: string[] = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (CONSONANTS.has(char)) {
      const cluster = [char];
      let j = i + 1;
      while (j < chars.length && chars[j] === "্" && j + 1 < chars.length && CONSONANTS.has(chars[j + 1])) {
        cluster.push("্");
        cluster.push(chars[j + 1]);
        j += 2;
      }

      i = j - 1;
      const nextChar = chars[i + 1] || "";

      if (nextChar === "ি") {
        result.push("w");
        cluster.forEach(c => result.push(UNICODE_TO_ANSI[c] || c));
        i++;
      } else if (nextChar === "ে") {
        result.push("c");
        cluster.forEach(c => result.push(UNICODE_TO_ANSI[c] || c));
        i++;
      } else if (nextChar === "ৈ") {
        result.push("t");
        cluster.forEach(c => result.push(UNICODE_TO_ANSI[c] || c));
        i++;
      } else if (nextChar === "ো") {
        result.push("c");
        cluster.forEach(c => result.push(UNICODE_TO_ANSI[c] || c));
        result.push("v");
        i++;
      } else if (nextChar === "ৌ") {
        result.push("c");
        cluster.forEach(c => result.push(UNICODE_TO_ANSI[c] || c));
        result.push("\u0160");
        i++;
      } else {
        cluster.forEach(c => result.push(UNICODE_TO_ANSI[c] || c));
      }
    } else {
      result.push(UNICODE_TO_ANSI[char] || char);
    }
  }

  return result.join("");
}

/**
 * Converts Bijoy ANSI text (SutonnyMJ layout) back into standard Unicode Bangla
 */
export function bijoyToUnicode(text: string): string {
  if (!text) return "";

  const chars = Array.from(text);
  const result: string[] = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === "w" || char === "c") {
      let kar = char === "w" ? "ি" : "ে";
      let j = i + 1;
      const cluster: string[] = [];

      while (j < chars.length) {
        const nextUni = ANSI_TO_UNICODE[chars[j]] || chars[j];
        if (CONSONANTS.has(nextUni)) {
          cluster.push(nextUni);
          j++;
          if (j < chars.length && chars[j] === "&") {
            cluster.push("্");
            j++;
            if (j < chars.length) {
              const linkedUni = ANSI_TO_UNICODE[chars[j]] || chars[j];
              if (CONSONANTS.has(linkedUni)) {
                cluster.push(linkedUni);
                j++;
              }
            }
          }
          break;
        } else {
          break;
        }
      }

      if (char === "c" && j < chars.length && (chars[j] === "v" || chars[j] === "\u0160" || chars[j] === "š")) {
        kar = "ো";
        j++;
      } else if (char === "c" && j < chars.length && (chars[j] === "\u0160" || chars[j] === "š")) {
        kar = "ৌ";
        j++;
      }

      result.push(...cluster);
      result.push(kar);
      i = j - 1;
    } else if (char === "t") {
      // Position-aware 't': If followed by a consonant, it's OI-kar ('ৈ'); otherwise Anusvara ('ং')
      let j = i + 1;
      const nextUni = j < chars.length ? (ANSI_TO_UNICODE[chars[j]] || chars[j]) : "";
      if (CONSONANTS.has(nextUni)) {
        const cluster: string[] = [];
        while (j < chars.length) {
          const cUni = ANSI_TO_UNICODE[chars[j]] || chars[j];
          if (CONSONANTS.has(cUni)) {
            cluster.push(cUni);
            j++;
          } else break;
        }
        result.push(...cluster);
        result.push("ৈ");
        i = j - 1;
      } else {
        result.push("ং");
      }
    } else {
      result.push(ANSI_TO_UNICODE[char] || char);
    }
  }

  return result.join("");
}
