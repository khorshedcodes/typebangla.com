import { describe, test, expect } from "./testRunner";
import { getPassageForDuration } from "../src/utils/lessons/exam/examPassages";
import { useTypingStore } from "../src/store/typingStore";
import { generateDrillText } from "../src/utils/drillGenerator";

interface WpmMetrics {
  grossWpm: number;
  netWpm: number;
  accuracy: number;
}

describe("Typing Engine Formulas & Metrics", () => {
  const calculateWpm = (
    grossCharacters: number,
    errors: number,
    durationSeconds: number
  ): WpmMetrics => {
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
  test("UniBijoy layout types 'আ' via 'g' then 'f' without false error", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("unibijoy");
    store.setTargetText("আজকে");
    store.resetTest();

    // Key 1: 'g' (্)
    useTypingStore.getState().handleKeystroke("KeyG", "g", false);
    expect(useTypingStore.getState().typedText).toBe("্");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
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
    expect(useTypingStore.getState().errorIndices.length).toBe(0);

    // Key 2: 'f' (া) -> collapses to 'আ'
    useTypingStore.getState().handleKeystroke("KeyF", "f", false);
    expect(useTypingStore.getState().typedText).toBe("আ");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
  });

  test("Side-by-side 'অ' and 'া' ('অা') does not turn 'অ' red when typing 'া'", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("unibijoy");
    store.setSelectedDuration(0);
    store.setTargetText("অা");
    store.resetTest();

    // First type 'অ' (Shift+F) -> matches targetText[0] ('অ')
    useTypingStore.getState().handleKeystroke("KeyF", "F", true);
    expect(useTypingStore.getState().typedText).toBe("অ");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);

    // Next type 'া' (f) -> matches targetText[1] ('া'), must NOT collapse 'অ' into 'আ'
    useTypingStore.getState().handleKeystroke("KeyF", "f", false);
    expect(useTypingStore.getState().typedText).toBe("অা");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
    expect(useTypingStore.getState().isCompleted).toBe(true);
  });

  test("generateDrillText never attaches diacritics or hasanta directly to 'অ'", () => {
    const drill = generateDrillText("অ স া ্ ক", 280);
    expect(drill.includes("অা")).toBe(false);
    expect(drill.includes("অ্")).toBe(false);
  });

  test("resetTest preserves curated lesson text instead of overwriting with random drill", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("unibijoy");
    const curated = "কা সা আস ক্ ত্ কা সা আস";
    store.setTargetText(curated, "অ স া ্ ক", "combo");
    store.resetTest();
    expect(useTypingStore.getState().targetText).toBe(curated);
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

  test("Nukta consonants (য়, ড়, ঢ়) normalize and match 1:1 across UniBijoy, Jatiya, Probhat, InScript, Unicode, and Avro", () => {
    const store = useTypingStore.getState();

    // Decomposed input in targetText ("জাতীয় কীবোর্ড বড় দৃঢ়") -> normalized to single codepoints
    store.setActiveLayout("unibijoy");
    store.setSelectedDuration(0);
    store.setTargetText("য় ড় ঢ়");
    store.resetTest();

    expect(useTypingStore.getState().targetText.length).toBe(5); // 'য়', ' ', 'ড়', ' ', 'ঢ়'

    // UniBijoy: Shift+W = য়, P = ড়, Shift+P = ঢ়
    useTypingStore.getState().handleKeystroke("KeyW", "W", true);
    useTypingStore.getState().handleKeystroke("Space", " ", false);
    useTypingStore.getState().handleKeystroke("KeyP", "p", false);
    useTypingStore.getState().handleKeystroke("Space", " ", false);
    useTypingStore.getState().handleKeystroke("KeyP", "P", true);

    expect(useTypingStore.getState().errorIndices.length).toBe(0);
    expect(useTypingStore.getState().isCompleted).toBe(true);
  });

  test("Reph (র্) in 'অর্জনের' and 'সর্বদা' is not retroactively corrupted when typing multi-key vowels later", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("unibijoy");
    store.setSelectedDuration(0);
    store.setTargetText("অর্জন ই");
    store.resetTest();

    // Type 'অ' (Shift+F), 'র্' (Shift+A), 'জ' (u), 'ন' (b), ' ' (Space), 'ই' (g + d)
    useTypingStore.getState().handleKeystroke("KeyF", "F", true);
    useTypingStore.getState().handleKeystroke("KeyA", "A", true);
    useTypingStore.getState().handleKeystroke("KeyU", "u", false);
    useTypingStore.getState().handleKeystroke("KeyB", "b", false);
    useTypingStore.getState().handleKeystroke("Space", " ", false);
    useTypingStore.getState().handleKeystroke("KeyG", "g", false);
    useTypingStore.getState().handleKeystroke("KeyD", "d", false);

    expect(useTypingStore.getState().typedText).toBe("অর্জন ই");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
    expect(useTypingStore.getState().isCompleted).toBe(true);
  });

  test("Jatiya layout supports ৎ (Shift+Backslash) and Probhat/Jatiya support hyphen (-)", () => {
    const store = useTypingStore.getState();
    store.setActiveLayout("jatiya");
    store.setSelectedDuration(0);
    store.setTargetText("হঠাৎ রো-তে");
    store.resetTest();

    // হ (i), ঠ (Shift+T), া (h), ৎ (Shift+Backslash), ' ', র (v), ো (x), - (Minus), ত (k), ে (c)
    useTypingStore.getState().handleKeystroke("KeyI", "i", false);
    useTypingStore.getState().handleKeystroke("KeyT", "T", true);
    useTypingStore.getState().handleKeystroke("KeyH", "h", false);
    useTypingStore.getState().handleKeystroke("Backslash", "|", true);
    useTypingStore.getState().handleKeystroke("Space", " ", false);
    useTypingStore.getState().handleKeystroke("KeyV", "v", false);
    useTypingStore.getState().handleKeystroke("KeyX", "x", false);
    useTypingStore.getState().handleKeystroke("Minus", "-", false);
    useTypingStore.getState().handleKeystroke("KeyK", "k", false);
    useTypingStore.getState().handleKeystroke("KeyC", "c", false);

    expect(useTypingStore.getState().typedText).toBe("হঠাৎ রো-তে");
    expect(useTypingStore.getState().errorIndices.length).toBe(0);
    expect(useTypingStore.getState().isCompleted).toBe(true);
  });
});
