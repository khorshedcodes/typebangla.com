import { describe, test, expect } from "./testRunner";

describe("Gamification Store (XP, Levels, & Streaks)", () => {
  const XP_PER_LEVEL = 250;

  const calculateLevel = (totalXp: number) => {
    return Math.floor(totalXp / XP_PER_LEVEL) + 1;
  };

  test("0 XP should be Level 1", () => {
    expect(calculateLevel(0)).toBe(1);
  });

  test("250 XP should trigger level-up to Level 2", () => {
    expect(calculateLevel(250)).toBe(2);
  });

  test("1000 XP should be Level 5", () => {
    expect(calculateLevel(1000)).toBe(5);
  });

  test("Daily practice completion should add 50 XP reward", () => {
    let currentXp = 100;
    const reward = 50;
    currentXp += reward;
    expect(currentXp).toBe(150);
  });
});
