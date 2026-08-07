import { describe, test, expect } from "./testRunner";

describe("Typing Engine Formulas & Metrics", () => {
  const calculateWpm = (grossCharacters: number, errors: number, durationSeconds: number) => {
    const minutes = durationSeconds / 60;
    if (minutes === 0) return { grossWpm: 0, netWpm: 0, accuracy: 100 };
    
    // Standard 5 characters per word formula
    const grossWpm = Math.round((grossCharacters / 5) / minutes);
    const netWpm = Math.max(0, Math.round(((grossCharacters - errors * 5) / 5) / minutes));
    const accuracy = grossCharacters > 0 
      ? Math.max(0, Math.round(((grossCharacters - errors) / grossCharacters) * 100))
      : 100;

    return { grossWpm, netWpm, accuracy };
  };

  test("Standard 1-minute test with 250 characters and 0 errors should yield 50 WPM at 100% accuracy", () => {
    const res = calculateWpm(250, 0, 60);
    expect(res.grossWpm).toBe(50);
    expect(res.netWpm).toBe(50);
    expect(res.accuracy).toBe(100);
  });

  test("Test with 5 errors on 250 characters should penalize net WPM and reduce accuracy", () => {
    const res = calculateWpm(250, 5, 60);
    expect(res.grossWpm).toBe(50);
    expect(res.netWpm).toBe(45); // (250 - 25) / 5 = 45
    expect(res.accuracy).toBe(98); // (245 / 250) * 100 = 98%
  });

  test("Net WPM should never be negative even if errors exceed typed words", () => {
    const res = calculateWpm(50, 20, 60);
    expect(res.netWpm).toBe(0);
  });
});

describe("Duration-Aware Passage Content Sufficiency (1m, 5m, 10m, 15m)", () => {
  const { extendTextForDuration, getPassageForDuration } = require("../src/utils/lessons/exam/examPassages");

  test("1-minute test passage should provide at least 500 characters", () => {
    const p = getPassageForDuration("bangla", 60);
    expect(p.text.length).toBeGreaterThanOrEqual(500);
  });

  test("5-minute test passage should provide at least 2500 characters (~500 words)", () => {
    const p = getPassageForDuration("bangla", 300);
    expect(p.text.length).toBeGreaterThanOrEqual(2500);
  });

  test("10-minute test passage should provide at least 5000 characters (~1000 words)", () => {
    const p = getPassageForDuration("bangla", 600);
    expect(p.text.length).toBeGreaterThanOrEqual(5000);
  });

  test("15-minute test passage should provide at least 7500 characters (~1500 words)", () => {
    const p = getPassageForDuration("english", 900);
    expect(p.text.length).toBeGreaterThanOrEqual(7500);
  });
});
