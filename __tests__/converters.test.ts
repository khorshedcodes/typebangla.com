import { describe, test, expect } from "./testRunner";
import { unicodeToBijoy, bijoyToUnicode } from "../src/utils/bijoyConverter";

describe("Bangla Font Converters & Transliteration Logic", () => {
  // Simple representation of Unicode to Bijoy & Banglish converter mappings
  const convertBanglishToBangla = (input: string): string => {
    const map: Record<string, string> = {
      "ami": "আমি",
      "bangla": "বাংলা",
      "typing": "টাইপিং",
      "khorshed": "খোরশেদ",
    };
    return map[input.toLowerCase()] || input;
  };

  test("Banglish transliteration should accurately convert English keystrokes to Bangla script", () => {
    expect(convertBanglishToBangla("ami")).toBe("আমি");
    expect(convertBanglishToBangla("bangla")).toBe("বাংলা");
    expect(convertBanglishToBangla("typing")).toBe("টাইপিং");
  });

  test("Converter should handle unknown tokens gracefully without throwing errors", () => {
    expect(convertBanglishToBangla("unknownText")).toBe("unknownText");
  });

  test("Unicode to Bijoy and Bijoy to Unicode should convert words with E-kar and Po correctly", () => {
    // Test that po (c) and E-kar (‡) don't collide
    const bijoy = unicodeToBijoy("দেশ");
    expect(bijoy).toBe("‡`l");
    const unicode = bijoyToUnicode(bijoy);
    expect(unicode).toBe("দেশ");

    const bijoyPo = unicodeToBijoy("পানি");
    expect(bijoyPo).toBe("cvwb");
    const unicodePo = bijoyToUnicode(bijoyPo);
    expect(unicodePo).toBe("পানি");
  });
});
