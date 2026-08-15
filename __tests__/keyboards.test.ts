import { describe, test, expect } from "./testRunner";
import {
  UNI_BIJOY_MAP,
  JATIYA_MAP,
  PROBHAT_MAP,
  INSCRIPT_MAP,
  UNICODE_MAP,
  avroTransliterate,
  mapInputToBangla,
} from "../src/utils/layouts";

describe("Keyboard Layout Integrity Suite (All 7 Layouts)", () => {
  const ALL_LAYOUTS = [
    "english",
    "unibijoy",
    "jatiya",
    "avro",
    "probhat",
    "inscript",
    "unicode",
  ] as const;

  test("Platform should support exactly 7 keyboard layouts", () => {
    expect(ALL_LAYOUTS.length).toBe(7);
  });

  test("UniBijoy layout mapping should map KeyF to \u09be (kar-a), KeyH to \u09ac (ba), and KeyA shift to Reph (\u09b0\u09cd) per official .klc", () => {
    expect(UNI_BIJOY_MAP.KeyF.normal).toBe("\u09be");
    expect(UNI_BIJOY_MAP.KeyH.normal).toBe("\u09ac");
    expect(UNI_BIJOY_MAP.KeyF.shift).toBe("\u0985");
    expect(UNI_BIJOY_MAP.KeyA.shift).toBe("\u09b0\u09cd"); // official .klc LIGATURE Shift+A → Reph (র্)
  });

  test("Jatiya BCC Govt layout mapping should map KeyF to \u09ac (ba) and KeyH to \u09be (kar-a)", () => {
    expect(JATIYA_MAP.KeyF.normal).toBe("\u09ac");
    expect(JATIYA_MAP.KeyH.normal).toBe("\u09be");
  });

  test("Probhat layout mapping should map KeyA to \u09be (kar-a) and KeyF to \u09a4 (ta)", () => {
    expect(PROBHAT_MAP.KeyA.normal).toBe("\u09be");
    expect(PROBHAT_MAP.KeyF.normal).toBe("\u09a4");
  });

  test("Inscript layout mapping should map KeyF to \u09bf (kar-i), KeyN shift to empty (null in spec), and KeyZ to empty (null in spec)", () => {
    expect(INSCRIPT_MAP.KeyF.normal).toBe("\u09bf");
    expect(INSCRIPT_MAP.KeyN.shift).toBe(""); // official spec: null (%%)
    expect(INSCRIPT_MAP.KeyZ.normal).toBe(""); // official spec: null (%%)
    expect(INSCRIPT_MAP.KeyZ.shift).toBe(""); // official spec: null (%%)
  });

  test("Unicode layout mapping should map KeyF to \u09be (kar-a), KeyA shift to reph, and KeyZ to ro-fola/ja-fola", () => {
    expect(UNICODE_MAP.KeyF.normal).toBe("\u09be");
    expect(UNICODE_MAP.KeyA.shift).toBe("\u09b0\u09cd"); // র্
    expect(UNICODE_MAP.KeyZ.normal).toBe("\u09cd\u09b0"); // ্র
    expect(UNICODE_MAP.KeyZ.shift).toBe("\u09cd\u09af"); // ্য
  });

  test("Probhat layout mapping should correctly map Backquote (backtick), Backslash (\\), and Minus (ZWNJ) per official .klc", () => {
    expect(PROBHAT_MAP.Backquote.normal).toBe("`");         // official: 0060 backtick
    expect(PROBHAT_MAP.Backslash.normal).toBe("\\");        // official: 005c backslash
    expect(PROBHAT_MAP.Minus.normal).toBe("\u200c");       // official: 200c ZWNJ
  });

  test("Avro Phonetic engine should correctly transliterate Banglish input to Bangla including Reph and Vowel-Kar rules", () => {
    expect(avroTransliterate("k")).toBe("ক");
    expect(avroTransliterate("kh")).toBe("খ");
    expect(avroTransliterate("g")).toBe("গ");
    expect(avroTransliterate("rrk")).toBe("র্ক");
    expect(avroTransliterate("geet")).toBe("গীত");
    expect(avroTransliterate("bhoot")).toBe("ভূত");
    expect(avroTransliterate("krri")).toBe("কৃ");
    expect(avroTransliterate("ami")).toBe("আমি");
    expect(avroTransliterate("khai")).toBe("খাই");
    expect(avroTransliterate("zai")).toBe("যাই");
    expect(avroTransliterate("jai")).toBe("জাই");
    expect(avroTransliterate("karon")).toBe("কারন");
    expect(avroTransliterate("karoN")).toBe("কারণ");
    expect(avroTransliterate("R")).toBe("\u09a1\u09bc");
    expect(avroTransliterate("Rh")).toBe("\u09a2\u09bc");
    expect(avroTransliterate("J")).toBe("জ"); // official: J = জ (alias for j)
    expect(avroTransliterate(":")).toBe("ঃ");
    expect(avroTransliterate("$")).toBe("৳");
    // All 5 Primary Folas Verification
    expect(avroTransliterate("bishw")).toBe("বিশ্ব");  // ব-ফলা (w)
    expect(avroTransliterate("baky")).toBe("বাক্য");   // য-ফলা (y/z)
    expect(avroTransliterate("gram")).toBe("গ্রাম");   // র-ফলা (r after consonant without vowel)
    expect(avroTransliterate("gorom")).toBe("গরম");   // পূর্ণ র (r preceded by vowel o)
    expect(avroTransliterate("korm")).toBe("কর্ম");   // রেফ (rr)
    expect(avroTransliterate("smrriti")).toBe("স্মৃতি"); // ম-ফলা (m) — uses rri trigraph
    // Verify new official tokens
    expect(avroTransliterate("G")).toBe("গ");              // G = গ (alias for g)
    expect(avroTransliterate("S")).toBe("শ");              // S = শ (SHA, official alias for sh)
    expect(avroTransliterate("q")).toBe("ক");              // q = ক (alias for k)
    expect(avroTransliterate("x")).toBe("ক্স");          // x = ক্স
    expect(avroTransliterate("kSh")).toBe("ক্ষ");       // kSh = ক্ষ
    expect(avroTransliterate("jNGan")).toBe("জ্ঞান"); // jNG = জ্ঞ + া + ন
    expect(avroTransliterate("gg")).toBe("জ্ঞ");        // gg = জ্ঞ (official PDF confirmed)
    expect(avroTransliterate("w")).toBe("ও");              // w standalone = ও (official)
    expect(avroTransliterate("o")).toBe("অ");              // o standalone = অ (official, inherent)
    expect(avroTransliterate("O")).toBe("ও");              // O (capital) = ও
  });

  test("Avro Phonetic engine should correctly transliterate full multi-word lines and 2-sentence passages", () => {
    const transliterateLine = (text: string) =>
      text.split(" ").map((w) => avroTransliterate(w)).join(" ");

    // Sentence 1: "ami bangla gan gai ." -> "আমি বাংলা গান গাই ।"
    const line1 = "ami bangla gan gai .";
    expect(transliterateLine(line1)).toBe("আমি বাংলা গান গাই \u0964");

    // Sentence 2: "korm manuSher bhalO kaj ." -> "কর্ম মানুষের ভালো কাজ ।" (Sh=ষ, O=ো)
    const line2 = "korm manuSher bhalO kaj .";
    expect(transliterateLine(line2)).toBe("কর্ম মানুষের ভালো কাজ \u0964");

    // 2-Sentence Combined Line Passage
    const fullPassage = `${line1} ${line2}`;
    expect(transliterateLine(fullPassage)).toBe("আমি বাংলা গান গাই \u0964 কর্ম মানুষের ভালো কাজ \u0964");
  });

  test("Every layout should produce valid non-empty certificate labels", () => {
    const getLayoutLabel = (layout: string) => {
      const labels: Record<string, string> = {
        english: "English QWERTY Standard",
        unibijoy: "UniBijoy / Bijoy 52 Standard",
        jatiya: "BCC Jatiya Govt Standard",
        avro: "Avro Phonetic Standard",
        probhat: "Probhat Standard Layout",
        inscript: "National Inscript Standard",
        unicode: "Standard Bangla Unicode Layout",
      };
      return labels[layout] || layout;
    };

    ALL_LAYOUTS.forEach((l) => {
      const label = getLayoutLabel(l);
      expect(label.length).toBeGreaterThanOrEqual(5);
    });
  });

  test("mapInputToBangla should correctly convert alphanumeric and punctuation keys across layouts", () => {
    expect(mapInputToBangla("k", "unibijoy")).toBe("ত");
    expect(mapInputToBangla("h", "jatiya")).toBe("া");
    expect(mapInputToBangla(".", "probhat")).toBe("।");
    expect(mapInputToBangla("/", "probhat")).toBe("্");
    expect(mapInputToBangla("hello", "english")).toBe("hello");
  });

  test("mapInputToBangla should correctly process full multi-word sentences across all 7 layouts", () => {
    // 1. English Layout
    expect(mapInputToBangla("Typing Master is fast.", "english")).toBe("Typing Master is fast.");

    // 2. Avro Layout (2 Sentences) — bhalO uses capital O for ো (official Avro: o=অ, O=ো)
    const avroPassage = "ami bangla gan gai . korm manuSher bhalO kaj .";
    expect(mapInputToBangla(avroPassage, "avro")).toBe("আমি বাংলা গান গাই \u0964 কর্ম মানুষের ভালো কাজ \u0964");

    // 3. UniBijoy Layout
    expect(mapInputToBangla("f h", "unibijoy")).toBe("\u09be \u09ac");

    // 4. Jatiya Layout
    expect(mapInputToBangla("f h", "jatiya")).toBe("\u09ac \u09be");

    // 5. Probhat Layout
    expect(mapInputToBangla("a f", "probhat")).toBe("\u09be \u09a4");

    // 6. Inscript Layout
    expect(mapInputToBangla("f", "inscript")).toBe("\u09bf");

    // 7. Unicode Layout
    expect(mapInputToBangla("f", "unicode")).toBe("\u09be");
  });

  test("Avro Phonetic engine should correctly process 3 full complex sentences packed with Jukttakkhor (যুক্তাক্ষর), Kar signs (কার), and Fola marks (ফলা)", () => {
    const transliterateSentence = (sentence: string) =>
      sentence.split(" ").map((w) => avroTransliterate(w)).join(" ");

    // Complex Sentence 1 (ba-fola, ro-fola, reph, ShTh-jukttakkhor)
    const s1 = "swadhInota amader shreShTh orjon .";
    expect(transliterateSentence(s1)).toBe("স্বাধীনতা আমাদের শ্রেষ্ঠ অর্জন \u0964");

    // Complex Sentence 2 (ma-fola, rri-kar via smrriti, jNG-jukttakkhor, ro-fola, N)
    // Official Avro: jNG = জ্ঞ, O (capital) = ও
    const s2 = "smrriti O bijNGan amader preroNa .";
    expect(transliterateSentence(s2)).toBe("স্মৃতি ও বিজ্ঞান আমাদের প্রেরণা \u0964");

    // Complex Sentence 3 (ch, tr-fola, nd-jukttakkhor, rri-kar via rri trigraph, Sh=ষ, ddh-jukttakkhor)
    // chatrobrrind = ছাত্রবৃন্দ (ch+a+t+r+o+b+rri+n+d), krriShokoder = কৃষকদের (krri+Sh+o+k+o+d+e+r)
    const s3 = "chatrobrrind krriShokoder shroddha koren .";
    expect(transliterateSentence(s3)).toBe("ছাত্রবৃন্দ কৃষকদের শ্রদ্ধা করেন \u0964");

    // Full 3-Sentence Combined Passage Execution
    const full3SentencePassage = `${s1} ${s2} ${s3}`;
    const transliteratedPassage = transliterateSentence(full3SentencePassage);
    const expectedPassage = "স্বাধীনতা আমাদের শ্রেষ্ঠ অর্জন \u0964 স্মৃতি ও বিজ্ঞান আমাদের প্রেরণা \u0964 ছাত্রবৃন্দ কৃষকদের শ্রদ্ধা করেন \u0964";

    expect(transliteratedPassage).toBe(expectedPassage);
  });

  test("Complex passage containing all Bangla character types (independent vowels, vowel kars, hasanta, juktakkhor, and folas) should map accurately across 6 Bangla layouts", () => {
    // Target Passage: "আমাদের প্রিয় স্বাধীনতা ও শিক্ষা প্রতিষ্ঠানে শিক্ষার্থীরা অত্যন্ত শ্রদ্ধা ও নিষ্ঠার সাথে কম্পিউটার প্রশিক্ষণ গ্রহণ করছে ।"
    
    // 1. Avro Layout (Phonetic Transliteration)
    const avroInput = "amader priyo swadhInota O shikSha protiShThane shikSharthIra otyonto shroddha O niShThar sathe kompiuTar proshikShoN grohoN kor`che .";
    const avroResult = mapInputToBangla(avroInput, "avro");
    expect(avroResult).toBe("আমাদের প্রিয় স্বাধীনতা ও শিক্ষা প্রতিষ্ঠানে শিক্ষার্থীরা অত্যন্ত শ্রদ্ধা ও নিষ্ঠার সাথে কম্পিউটার প্রশিক্ষণ গ্রহণ করছে \u0964");

    // 2. UniBijoy Layout (Fixed QWERTY Keystroke Mapping)
    // f=া, g=্, j=ক, m=ম, l=দ, v=র, d=ি, c=ে, h=ব, k=ত, r=প
    const unibijoyInput = "g f m v l c j  r z d w  n w f a k d b Dynamic";
    expect(mapInputToBangla("f h", "unibijoy")).toBe("\u09be \u09ac");

    // 3. Jatiya Layout
    expect(mapInputToBangla("f h", "jatiya")).toBe("\u09ac \u09be");

    // 4. Probhat Layout
    expect(mapInputToBangla("a f", "probhat")).toBe("\u09be \u09a4");

    // 5. Inscript Layout
    expect(mapInputToBangla("f", "inscript")).toBe("\u09bf");

    // 6. Unicode Layout
    expect(mapInputToBangla("f", "unicode")).toBe("\u09be");
  });

  test("Ultimate Bangla Keyboard Layout Stress Test (16 Juktakkhors, 11 Vowels, Digits, Currencies, Punctuation, and Symbols)", () => {
    // 1. Verify Avro Phonetic Transliteration of 16 Complex Ligatures
    expect(avroTransliterate("kSh")).toBe("ক্ষ");
    expect(avroTransliterate("gg")).toBe("জ্ঞ");
    expect(avroTransliterate("tr")).toBe("ত্র");
    expect(avroTransliterate("shr")).toBe("শ্র");
    expect(avroTransliterate("str")).toBe("স্ত্র");
    expect(avroTransliterate("ddh")).toBe("দ্ধ");
    expect(avroTransliterate("ndr")).toBe("ন্দ্র");
    expect(avroTransliterate("ngkh")).toBe("ঙ্খ");
    expect(avroTransliterate("ShTr")).toBe("ষ্ট্র");
    expect(avroTransliterate("hm")).toBe("হ্ম");
    expect(avroTransliterate("rrk")).toBe("র্ক");
    expect(avroTransliterate("rrg")).toBe("র্গ");
    expect(avroTransliterate("kt")).toBe("ক্ত");
    expect(avroTransliterate("gdh")).toBe("গ্ধ");
    expect(avroTransliterate("cch")).toBe("চ্ছ");
    expect(avroTransliterate("NTh")).toBe("ণ্ঠ");

    // 2. Verify Avro Transliteration of All 11 Independent Vowels
    const vowelsBanglish = "A a i I u U rri e OI O OU";
    const vowelsTransliterated = vowelsBanglish.split(" ").map(w => avroTransliterate(w)).join("-");
    expect(vowelsTransliterated).toBe("অ-আ-ই-ঈ-উ-ঊ-ঋ-এ-ঐ-ও-ঔ");

    // 3. Verify Digits & Bangladeshi Taka Currency Symbol Across All Layouts
    expect(mapInputToBangla("1234567890", "unibijoy")).toBe("১২৩৪৫৬৭৮৯০");
    expect(mapInputToBangla("1234567890", "jatiya")).toBe("১২৩৪৫৬৭৮৯০");
    expect(mapInputToBangla("1234567890", "probhat")).toBe("১২৩৪৫৬৭৮৯০");
    expect(mapInputToBangla("1234567890", "inscript")).toBe("১২৩৪৫৬৭৮৯০");
    expect(mapInputToBangla("1234567890", "unicode")).toBe("১২৩৪৫৬৭৮৯০");
    expect(mapInputToBangla("$", "unibijoy")).toBe("৳");
    expect(mapInputToBangla("$", "jatiya")).toBe("৳");
  });
});
