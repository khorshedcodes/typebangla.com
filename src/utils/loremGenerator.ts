import {
  ENGLISH_WORDS_LEVEL_1,
  ENGLISH_WORDS_LEVEL_2,
  ENGLISH_WORDS_LEVEL_3,
  ALL_ENGLISH_WORDS,
} from "../data/englishFrequentWords";

export interface LoremGeneratorOptions {
  /**
   * Total number of words to generate (default: 50)
   */
  wordCount?: number;
  /**
   * Vocabulary difficulty level: 1 (easy), 2 (medium), 3 (hard), or "all"
   */
  level?: 1 | 2 | 3 | "all";
  /**
   * Whether to format words as realistic sentences with punctuation (commas, periods, quotes)
   */
  includePunctuation?: boolean;
  /**
   * Whether to capitalize the first word of each sentence
   */
  capitalizeSentences?: boolean;
}

/**
 * Generates custom English typing practice text / Lorem Ipsum using the 3,000 top words database.
 */
export function generateEnglishPracticeText(options: LoremGeneratorOptions = {}): string {
  const {
    wordCount = 50,
    level = "all",
    includePunctuation = false,
    capitalizeSentences = true,
  } = options;

  let pool: string[];
  switch (level) {
    case 1:
      pool = ENGLISH_WORDS_LEVEL_1;
      break;
    case 2:
      pool = ENGLISH_WORDS_LEVEL_2;
      break;
    case 3:
      pool = ENGLISH_WORDS_LEVEL_3;
      break;
    default:
      pool = ALL_ENGLISH_WORDS;
      break;
  }

  if (!pool || pool.length === 0) {
    return "";
  }

  // Randomly select target number of words from the pool
  const selectedWords: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    selectedWords.push(pool[randomIndex]);
  }

  if (!includePunctuation) {
    return selectedWords.join(" ");
  }

  // Format into pseudo-sentences (sentence lengths between 6 to 14 words)
  const resultWords: string[] = [];
  let currentSentenceLength = 0;
  let targetSentenceLength = Math.floor(Math.random() * 8) + 6;

  for (let i = 0; i < selectedWords.length; i++) {
    let word = selectedWords[i];

    // Capitalize beginning of sentence
    if (currentSentenceLength === 0 && capitalizeSentences) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    currentSentenceLength++;

    // Add punctuation or end sentence
    const isEnd = i === selectedWords.length - 1;
    if (currentSentenceLength >= targetSentenceLength || isEnd) {
      word += ".";
      currentSentenceLength = 0;
      targetSentenceLength = Math.floor(Math.random() * 8) + 6;
    } else if (currentSentenceLength > 3 && Math.random() < 0.25) {
      word += ",";
    }

    resultWords.push(word);
  }

  return resultWords.join(" ");
}
