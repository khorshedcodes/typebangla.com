import {
  ENGLISH_SENTENCES_LEVEL_1,
  ENGLISH_SENTENCES_LEVEL_2,
  ENGLISH_SENTENCES_LEVEL_3,
  ALL_ENGLISH_SENTENCES,
} from "../data/englishSentences";

export interface SentenceGeneratorOptions {
  /**
   * Number of sentences to retrieve (default: 1)
   */
  count?: number;
  /**
   * Difficulty level: 1 (easy), 2 (medium), 3 (hard/advanced), or "all"
   */
  level?: 1 | 2 | 3 | "all";
}

/**
 * Returns an array of random practice sentences based on difficulty level.
 */
export function getRandomSentences(options: SentenceGeneratorOptions = {}): string[] {
  const { count = 1, level = "all" } = options;

  let pool: string[];
  switch (level) {
    case 1:
      pool = ENGLISH_SENTENCES_LEVEL_1;
      break;
    case 2:
      pool = ENGLISH_SENTENCES_LEVEL_2;
      break;
    case 3:
      pool = ENGLISH_SENTENCES_LEVEL_3;
      break;
    default:
      pool = ALL_ENGLISH_SENTENCES;
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
    // remove picked sentence to prevent immediate repetition within the same batch
    poolCopy.splice(randomIndex, 1);
  }

  return results;
}

/**
 * Returns a combined paragraph string composed of multiple random practice sentences.
 */
export function generateSentenceParagraph(options: SentenceGeneratorOptions = {}): string {
  const sentences = getRandomSentences(options);
  return sentences.join(" ");
}
