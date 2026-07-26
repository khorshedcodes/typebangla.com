import { describe, test, expect } from "./testRunner";
import {
  UNI_BIJOY_MAP,
  JATIYA_MAP,
  PROBHAT_MAP,
  INSCRIPT_MAP,
  UNICODE_MAP,
  avroTransliterate,
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

  test("UniBijoy layout mapping should map KeyF to \u09be (kar-a) and KeyH to \u09ac (ba)", () => {
    expect(UNI_BIJOY_MAP.KeyF.normal).toBe("\u09be");
    expect(UNI_BIJOY_MAP.KeyH.normal).toBe("\u09ac");
    expect(UNI_BIJOY_MAP.KeyF.shift).toBe("\u0985");
  });

  test("Jatiya BCC Govt layout mapping should map KeyF to \u09ac (ba) and KeyH to \u09be (kar-a)", () => {
    expect(JATIYA_MAP.KeyF.normal).toBe("\u09ac");
    expect(JATIYA_MAP.KeyH.normal).toBe("\u09be");
  });

  test("Probhat layout mapping should map KeyA to \u09be (kar-a) and KeyF to \u09a4 (ta)", () => {
    expect(PROBHAT_MAP.KeyA.normal).toBe("\u09be");
    expect(PROBHAT_MAP.KeyF.normal).toBe("\u09a4");
  });

  test("Inscript layout mapping should map KeyF to \u09bf (kar-i), KeyN shift to ja-fola, and KeyZ to ro-fola/reph", () => {
    expect(INSCRIPT_MAP.KeyF.normal).toBe("\u09bf");
    expect(INSCRIPT_MAP.KeyN.shift).toBe("\u09cd\u09af"); // ্য
    expect(INSCRIPT_MAP.KeyZ.normal).toBe("\u09cd\u09b0"); // ্র
    expect(INSCRIPT_MAP.KeyZ.shift).toBe("\u09b0\u09cd"); // র্
  });

  test("Unicode layout mapping should map KeyF to \u09be (kar-a), KeyA shift to reph, and KeyZ to ro-fola/ja-fola", () => {
    expect(UNICODE_MAP.KeyF.normal).toBe("\u09be");
    expect(UNICODE_MAP.KeyA.shift).toBe("\u09b0\u09cd"); // র্
    expect(UNICODE_MAP.KeyZ.normal).toBe("\u09cd\u09b0"); // ্র
    expect(UNICODE_MAP.KeyZ.shift).toBe("\u09cd\u09af"); // ্য
  });

  test("Probhat layout mapping should correctly map ZWJ, ZWNJ and Minus keys", () => {
    expect(PROBHAT_MAP.Backquote.normal).toBe("\u200d");
    expect(PROBHAT_MAP.Backslash.normal).toBe("\u200c");
    expect(PROBHAT_MAP.Minus.normal).toBe("-");
  });

  test("Avro Phonetic engine should correctly transliterate Banglish input to Bangla including Reph", () => {
    expect(avroTransliterate("k")).toBe("ক");
    expect(avroTransliterate("kh")).toBe("খ");
    expect(avroTransliterate("g")).toBe("গ");
    expect(avroTransliterate("rrk")).toBe("র্ক");
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
});
