import level1 from "../../db/english_1000_1.json";
import level2 from "../../db/english_1000_2.json";
import level3 from "../../db/english_1000_3.json";

/**
 * TypeMaster — English Frequent Words Database
 * 3,000 high-frequency English words split across 3 tiers (1,000 words each).
 */

export const ENGLISH_WORDS_LEVEL_1: string[] = level1 as string[];
export const ENGLISH_WORDS_LEVEL_2: string[] = level2 as string[];
export const ENGLISH_WORDS_LEVEL_3: string[] = level3 as string[];

export const ALL_ENGLISH_WORDS: string[] = [
  ...ENGLISH_WORDS_LEVEL_1,
  ...ENGLISH_WORDS_LEVEL_2,
  ...ENGLISH_WORDS_LEVEL_3,
];

export interface EnglishWordGroup {
  level: 1 | 2 | 3;
  name: string;
  description: string;
  words: string[];
}

export const ENGLISH_WORD_GROUPS: EnglishWordGroup[] = [
  {
    level: 1,
    name: "Top 1,000 Common Words",
    description: "Everyday essential English words for high-speed typing drills.",
    words: ENGLISH_WORDS_LEVEL_1,
  },
  {
    level: 2,
    name: "Intermediate 1,000 Words",
    description: "Expanded vocabulary for intermediate typing accuracy and finger dexterity.",
    words: ENGLISH_WORDS_LEVEL_2,
  },
  {
    level: 3,
    name: "Advanced 1,000 Words",
    description: "Complex and academic English words for advanced typing practice.",
    words: ENGLISH_WORDS_LEVEL_3,
  },
];
