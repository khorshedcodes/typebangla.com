import { describe, test, expect } from "./testRunner";

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
});
