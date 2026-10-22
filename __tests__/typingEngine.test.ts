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

describe("Leaderboard User Deduplication & Raw UID Sanitation", () => {
  test("Duplicate sessions by the same user should deduplicate to their single best WPM score", () => {
    const rawSessions = [
      { userId: "u1", name: "Tanvir Abedin", netWpm: 47, accuracy: 100 },
      { userId: "u1", name: "Tanvir Abedin", netWpm: 47, accuracy: 99 },
      { userId: "FaeOZOoTABNPjlCdRqZQvEORVbb2", name: "FaeOZOoTABNPjlCdRqZQvEORVbb2", netWpm: 42, accuracy: 99 },
      { userId: "u3", name: "sharif", netWpm: 42, accuracy: 99 },
      { userId: "u1", name: "Tanvir Abedin", netWpm: 42, accuracy: 100 },
      { userId: "FaeOZOoTABNPjlCdRqZQvEORVbb2", name: "FaeOZOoTABNPjlCdRqZQvEORVbb2", netWpm: 41, accuracy: 98 },
      { userId: "u1", name: "Tanvir Abedin", netWpm: 40, accuracy: 99 },
    ];

    const isRawUid = (val?: string) => Boolean(val && /^[a-zA-Z0-9_-]{20,}$/.test(val.trim()) && !val.includes(" "));
    const bestUserScores = new Map<string, any>();

    for (const s of rawSessions) {
      const key = s.userId || s.name;
      let displayName = s.name;
      if (!displayName || isRawUid(displayName)) {
        displayName = "Typing Learner";
      }
      const clean = { ...s, name: displayName };
      const existing = bestUserScores.get(key);
      if (!existing) {
        bestUserScores.set(key, clean);
      } else {
        const curScore = clean.netWpm;
        const exScore = existing.netWpm;
        if (curScore > exScore || (curScore === exScore && clean.accuracy > existing.accuracy)) {
          bestUserScores.set(key, clean);
        }
      }
    }

    const deduplicated = Array.from(bestUserScores.values()).sort((a, b) => b.netWpm - a.netWpm);

    // Exactly 3 unique users (Tanvir, FaeOZO... -> Typing Learner, sharif)
    expect(deduplicated.length).toBe(3);
    expect(deduplicated[0].name).toBe("Tanvir Abedin");
    expect(deduplicated[0].netWpm).toBe(47);
    expect(deduplicated[0].accuracy).toBe(100);
    expect(deduplicated[1].name).toBe("Typing Learner");
    expect(deduplicated[1].netWpm).toBe(42);
    expect(deduplicated[2].name).toBe("sharif");
    expect(deduplicated[2].netWpm).toBe(42);
  });
});

describe("Independent Vowel Typing (আ) in Typing Store", () => {
  const { useTypingStore } = require("../src/store/typingStore");

  test("UniBijoy layout types 'আ' via 'g' then 'f' without false error", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("unibijoy");
    store.setTargetText("আজকে");
    store.resetTest();

    // Key 1: 'g' (্)
    useTypingStore.getState().handleKeystroke("KeyG", "g", false);
    expect(useTypingStore.getState().typedText).toBe("্");
    expect(useTypingStore.getState().problematicPairs.includes("আ-্")).toBe(false);

    // Key 2: 'f' (া) -> collapses to 'আ'
    useTypingStore.getState().handleKeystroke("KeyF", "f", false);
    expect(useTypingStore.getState().typedText).toBe("আ");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
  });

  test("UniBijoy layout types 'আ' via Shift+F (অ) then 'f' (া)", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("unibijoy");
    store.setTargetText("আজকে");
    store.resetTest();

    // Key 1: Shift+F (অ)
    useTypingStore.getState().handleKeystroke("KeyF", "F", true);
    expect(useTypingStore.getState().typedText).toBe("অ");

    // Key 2: 'f' (া) -> collapses to 'আ'
    useTypingStore.getState().handleKeystroke("KeyF", "f", false);
    expect(useTypingStore.getState().typedText).toBe("আ");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
  });

  test("Jatiya layout types 'আ' via 'g' then 'h'", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("jatiya");
    store.setTargetText("আজকে");
    store.resetTest();

    // Key 1: 'g' (্)
    useTypingStore.getState().handleKeystroke("KeyG", "g", false);
    expect(useTypingStore.getState().typedText).toBe("্");

    // Key 2: 'h' (া) -> collapses to 'আ'
    useTypingStore.getState().handleKeystroke("KeyH", "h", false);
    expect(useTypingStore.getState().typedText).toBe("আ");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
  });

  test("Avro layout types 'আ' via 'a' and 'aa'", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("avro");
    store.setTargetText("আজকে");
    store.resetTest();

    // Type "aa"
    useTypingStore.getState().handleKeystroke("KeyA", "a", false);
    useTypingStore.getState().handleKeystroke("KeyA", "a", false);
    expect(useTypingStore.getState().typedText).toBe("আ");

    // Type "j"
    useTypingStore.getState().handleKeystroke("KeyJ", "j", false);
    expect(useTypingStore.getState().typedText).toBe("আজ");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
  });
});
