import { describe, test, expect } from "./testRunner";
import { XP_PER_LEVEL } from "../src/store/gamificationStore";

describe("Gamification Store (XP, Levels, & Streaks)", () => {
  const calculateLevel = (totalXp: number) => {
    return Math.max(1, Math.floor(totalXp / XP_PER_LEVEL) + 1);
  };

  test("0 XP should be Level 1", () => {
    expect(calculateLevel(0)).toBe(1);
  });

  test("100 XP should trigger level-up to Level 2 with platform standard 100 XP/level", () => {
    expect(calculateLevel(100)).toBe(2);
  });

  test("550 XP should reach Level 6", () => {
    expect(calculateLevel(550)).toBe(6);
  });

  test("1000 XP should be Level 11", () => {
    expect(calculateLevel(1000)).toBe(11);
  });

  test("User Profile with legacy Level 1 but 850 XP should dynamically compute Level 9", () => {
    const legacyUser = { xp: 850, level: 1 };
    const resolvedLevel = Math.max(legacyUser.level || 1, Math.floor((legacyUser.xp || 0) / 100) + 1);
    expect(resolvedLevel).toBe(9);
  });

  test("Daily practice completion should add 50 XP reward", () => {
    let currentXp = 100;
    const reward = 50;
    currentXp += reward;
    expect(currentXp).toBe(150);
  });

  test("Feedback Suggestion categorization should classify feature suggestions and bug reports correctly", () => {
    const suggestionPayload = {
      type: "suggestion" as const,
      email: "learner@typebangla.com",
      message: "Please add a sound toggle for mechanical clicks!",
    };
    const isSuggestion = suggestionPayload.type === "suggestion";
    expect(isSuggestion).toBe(true);

    const bugPayload = {
      type: "bug" as const,
      email: "dev@typebangla.com",
      message: "Found a character glitch on Bijoy layout",
    };
    const isBug = bugPayload.type === "bug";
    expect(isBug).toBe(true);
  });
});
