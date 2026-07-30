import level1 from "../../db/english_sentences_1.json";
import level2 from "../../db/english_sentences_2.json";
import level3 from "../../db/english_sentences_3.json";

/**
 * TypeMaster — English Sentence Practice Database
 * 300 curated sentences split across 3 difficulty tiers (100 sentences each).
 */

export const ENGLISH_SENTENCES_LEVEL_1: string[] = level1 as string[];
export const ENGLISH_SENTENCES_LEVEL_2: string[] = level2 as string[];
export const ENGLISH_SENTENCES_LEVEL_3: string[] = level3 as string[];

export const ALL_ENGLISH_SENTENCES: string[] = [
  ...ENGLISH_SENTENCES_LEVEL_1,
  ...ENGLISH_SENTENCES_LEVEL_2,
  ...ENGLISH_SENTENCES_LEVEL_3,
];

export interface EnglishSentenceGroup {
  level: 1 | 2 | 3;
  name: string;
  description: string;
  sentences: string[];
}

export const ENGLISH_SENTENCE_GROUPS: EnglishSentenceGroup[] = [
  {
    level: 1,
    name: "Easy Sentences",
    description: "Short, everyday English sentences (5–10 words) for speed and rhythm.",
    sentences: ENGLISH_SENTENCES_LEVEL_1,
  },
  {
    level: 2,
    name: "Intermediate Sentences",
    description: "Standard sentences with punctuation and common vocabulary (11–20 words).",
    sentences: ENGLISH_SENTENCES_LEVEL_2,
  },
  {
    level: 3,
    name: "Advanced / Exam Sentences",
    description: "Complex, technical, and quote-heavy sentences (21+ words with numbers and symbols).",
    sentences: ENGLISH_SENTENCES_LEVEL_3,
  },
];
