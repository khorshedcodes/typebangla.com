export function generateDrillText(focusKeys: string, length = 280): string {
  const keys = focusKeys.split(/\s+/).filter(Boolean);
  if (keys.length === 0) return "abc";

  // Check if it is a English or Bangla focus keys set
  const isBangla = !focusKeys.match(/[a-zA-Z]/);

  if (isBangla) {
    const BANGLA_DIACRITICS = new Set(["া", "ি", "ী", "ু", "ূ", "ৃ", "ে", "ৈ", "ো", "ৌ", "্", "ং", "ঃ", "ঁ"]);
    const consonants = keys.filter((k) => !BANGLA_DIACRITICS.has(k));
    const diacritics = keys.filter((k) => BANGLA_DIACRITICS.has(k));

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
          `${c1}${c2}${c2}${c1} ${c2}${c1}${c1}${c2}`,
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
      const kars = diacritics.filter((d) => d !== "্");

      const result: string[] = [];
      let currentLen = 0;
      while (currentLen < length) {
        let word = "";

        if (hasHasanta && consonants.length >= 2 && Math.random() > 0.45) {
          // Generate a linked conjunct (e.g. ক + ্ + ত = ক্ত)
          const c1 = consonants[Math.floor(Math.random() * consonants.length)];
          let c2 = consonants[Math.floor(Math.random() * consonants.length)];
          if (c1 === c2 && consonants.length > 1) {
            c2 = consonants.filter((c) => c !== c1)[0];
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
        `${k1}${k2}${k2}${k1} ${k2}${k1}${k1}${k2}`,
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
    const consonants = keys.filter((k) => !vowels.has(k.toLowerCase()));
    const keyVowels = keys.filter((k) => vowels.has(k.toLowerCase()));

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
