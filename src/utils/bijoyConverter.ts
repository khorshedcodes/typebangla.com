/**
 * TypeBangla — Unicode to Bijoy ANSI Converter Library
 *
 * Provides functions to convert Unicode Bangla text to Bijoy ANSI encoding
 * (compatible with SutonnyMJ and other legacy ANSI Bangla fonts) and vice-versa.
 */

// Mapping of Unicode characters to SutonnyMJ ANSI characters
const unicodeToAnsiMap: Record<string, string> = {
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

// Reversing mapping for Bijoy to Unicode conversion
const ansiToUnicodeMap: Record<string, string> = {};
for (const [uni, ansi] of Object.entries(unicodeToAnsiMap)) {
  ansiToUnicodeMap[ansi] = uni;
}

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
    
    // Check if the current character is a consonant
    if (CONSONANTS.has(char)) {
      // Look ahead to check if this is part of a consonant cluster (e.g. ক + ্ + ত)
      const cluster = [char];
      let j = i + 1;
      while (j < chars.length && chars[j] === "্" && j + 1 < chars.length && CONSONANTS.has(chars[j + 1])) {
        cluster.push("্");
        cluster.push(chars[j + 1]);
        j += 2;
      }
      
      // Update our loop counter past the cluster
      i = j - 1;
      
      // Check if there is a vowel sign (kar) following this consonant/cluster
      const nextChar = chars[i + 1] || "";
      
      // Handle kars that need to be reordered BEFORE the consonant (ি, ে, ৈ, ো, ৌ)
      if (nextChar === "ি") {
        // Move "ি" (SutonnyMJ code "w") before the cluster
        result.push("w");
        cluster.forEach(c => result.push(unicodeToAnsiMap[c] || c));
        i++; // skip the "ি" in next loop
      } else if (nextChar === "ে") {
        result.push("c");
        cluster.forEach(c => result.push(unicodeToAnsiMap[c] || c));
        i++;
      } else if (nextChar === "ৈ") {
        result.push("t");
        cluster.forEach(c => result.push(unicodeToAnsiMap[c] || c));
        i++;
      } else if (nextChar === "ো") {
        // "ো" is split: "ে" (c) before consonant and "া" (v) after consonant
        result.push("c");
        cluster.forEach(c => result.push(unicodeToAnsiMap[c] || c));
        result.push("v");
        i++;
      } else if (nextChar === "ৌ") {
        // "ৌ" is split: "ে" (c) before consonant and "ৗ" (w) after consonant
        result.push("c");
        cluster.forEach(c => result.push(unicodeToAnsiMap[c] || c));
        result.push("š"); // "š" or similar is the suffix code for ৌ in SutonnyMJ
        i++;
      } else {
        // No pre-positioned kar, just convert the consonant/cluster directly
        cluster.forEach(c => result.push(unicodeToAnsiMap[c] || c));
      }
    } else {
      // Normal conversion
      result.push(unicodeToAnsiMap[char] || char);
    }
  }

  return result.join("");
}

/**
 * Converts Bijoy ANSI text (SutonnyMJ layout) back into standard Unicode Bangla
 */
export function bijoyToUnicode(text: string): string {
  if (!text) return "";

  // A simplified reverse converter that handles base characters
  const chars = Array.from(text);
  const result: string[] = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    
    // Check if it's a pre-positioned kar (e.g. w, c, t)
    if (char === "w" || char === "c" || char === "t") {
      let kar = char === "w" ? "ি" : char === "c" ? "ে" : "ৈ";
      
      // Look ahead to find the consonant or consonant cluster it attaches to
      let j = i + 1;
      const cluster: string[] = [];
      
      while (j < chars.length) {
        const nextUni = ansiToUnicodeMap[chars[j]] || chars[j];
        if (CONSONANTS.has(nextUni)) {
          cluster.push(nextUni);
          j++;
          // check if followed by Hasanta link + consonant
          if (j < chars.length && chars[j] === "&") {
            cluster.push("্");
            j++;
            if (j < chars.length) {
              const linkedUni = ansiToUnicodeMap[chars[j]] || chars[j];
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
      
      // Check if there is a trailing "v" (া) or "š" (ৗ) which merges the pre-kar into "ো" or "ৌ"
      if (char === "c" && j < chars.length && chars[j] === "v") {
        kar = "ো";
        j++;
      } else if (char === "c" && j < chars.length && chars[j] === "š") {
        kar = "ৌ";
        j++;
      }
      
      // Output the cluster first, then the kar (standard Unicode order)
      result.push(...cluster);
      result.push(kar);
      
      // Move index past the processed characters
      i = j - 1;
    } else {
      result.push(ansiToUnicodeMap[char] || char);
    }
  }

  return result.join("");
}
