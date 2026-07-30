import {
  BANGLA_WORDS_LEVEL_1,
  BANGLA_WORDS_LEVEL_2,
  BANGLA_WORDS_LEVEL_3,
  ALL_BANGLA_WORDS,
} from "../data/banglaFrequentWords";

export interface BanglaLoremOptions {
  /**
   * Total number of words to generate (default: 50)
   */
  wordCount?: number;
  /**
   * Difficulty level: 1 (easy), 2 (medium), 3 (hard/advanced), or "all"
   */
  level?: 1 | 2 | 3 | "all";
  /**
   * Whether to format words into realistic Bangla sentence structures with punctuation
   */
  includePunctuation?: boolean;
}

/**
 * Generates custom Bangla typing practice text / Lorem Ipsum using the 3,000 top words database.
 */
export function generateBanglaPracticeText(options: BanglaLoremOptions = {}): string {
  const {
    wordCount = 50,
    level = "all",
    includePunctuation = false,
  } = options;

  let pool: string[];
  switch (level) {
    case 1:
      pool = BANGLA_WORDS_LEVEL_1;
      break;
    case 2:
      pool = BANGLA_WORDS_LEVEL_2;
      break;
    case 3:
      pool = BANGLA_WORDS_LEVEL_3;
      break;
    default:
      pool = ALL_BANGLA_WORDS;
      break;
  }

  if (!pool || pool.length === 0) {
    return "";
  }

  const selectedWords: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    selectedWords.push(pool[randomIndex]);
  }

  if (!includePunctuation) {
    return selectedWords.join(" ");
  }

  const resultWords: string[] = [];
  let currentSentenceLength = 0;
  let targetSentenceLength = Math.floor(Math.random() * 6) + 6;

  for (let i = 0; i < selectedWords.length; i++) {
    let word = selectedWords[i];
    currentSentenceLength++;

    const isEnd = i === selectedWords.length - 1;
    if (currentSentenceLength >= targetSentenceLength || isEnd) {
      word += "।";
      currentSentenceLength = 0;
      targetSentenceLength = Math.floor(Math.random() * 6) + 6;
    } else if (currentSentenceLength > 3 && Math.random() < 0.2) {
      word += ",";
    }

    resultWords.push(word);
  }

  return resultWords.join(" ");
}
