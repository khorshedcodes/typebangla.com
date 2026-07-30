import {
  BANGLA_SENTENCES_LEVEL_1,
  BANGLA_SENTENCES_LEVEL_2,
  BANGLA_SENTENCES_LEVEL_3,
  ALL_BANGLA_SENTENCES,
} from "../data/banglaSentences";

export interface BanglaSentenceOptions {
  /**
   * Number of sentences to retrieve (default: 1)
   */
  count?: number;
  /**
   * Difficulty level: 1 (easy), 2 (medium), 3 (hard/exam), or "all"
   */
  level?: 1 | 2 | 3 | "all";
}

/**
 * Returns an array of random practice sentences based on difficulty level.
 */
export function getRandomBanglaSentences(options: BanglaSentenceOptions = {}): string[] {
  const { count = 1, level = "all" } = options;

  let pool: string[];
  switch (level) {
    case 1:
      pool = BANGLA_SENTENCES_LEVEL_1;
      break;
    case 2:
      pool = BANGLA_SENTENCES_LEVEL_2;
      break;
    case 3:
      pool = BANGLA_SENTENCES_LEVEL_3;
      break;
    default:
      pool = ALL_BANGLA_SENTENCES;
      break;
  }

  if (!pool || pool.length === 0) {
    return [];
  }

  const results: string[] = [];
  const poolCopy = [...pool];

  for (let i = 0; i < count; i++) {
    if (poolCopy.length === 0) break;
    const randomIndex = Math.floor(Math.random() * poolCopy.length);
    results.push(poolCopy[randomIndex]);
    poolCopy.splice(randomIndex, 1);
  }

  return results;
}

/**
 * Returns a combined paragraph string composed of multiple random Bangla practice sentences.
 */
export function generateBanglaSentenceParagraph(options: BanglaSentenceOptions = {}): string {
  const sentences = getRandomBanglaSentences(options);
  return sentences.join(" ");
}
