import {
  BANGLA_WORDS_LEVEL_1,
  BANGLA_WORDS_LEVEL_2,
  BANGLA_WORDS_LEVEL_3,
  ALL_BANGLA_WORDS,
} from "../data/banglaFrequentWords";

export interface BanglaLoremOptions {
  wordCount?: number;
  level?: 1 | 2 | 3 | "all";
  includePunctuation?: boolean;
  type?: "lorem" | "natural";
}

const LOREM_WORDS = [
  "লরেম", "ইপসাম", "ডলার", "সিট", "আমেত", "কনসেকটেতুর", "আদিপিসিসিং", "এলিত",
  "সেদ", "দো", "আইউস্মোদ", "তেম্পোর", "ইনসিদিদুন্ত", "উত", "লাবোরে", "এত",
  "দোলোরে", "মাগ্না", "আলীকুয়া", "উত", "এনিম", "আদ", "মিনিম", "ভেনিয়াম",
  "কিস", "নস্ত্রুদ", "এক্সের্সিতাসিয়োন", "উলামকো", "লাবোরিস", "নিসি", "উত",
  "আলিকুইপ", "েক্স", "এয়া", "কমোদো", "কনসেকুয়াত", "দুইস", "আউতে", "ইরুরে",
  "দোলোর", "ইন", "রেপ্রেহেনদেরিত", "ইন", "ভোলোপ্তাতে", "ভেলিত", "এসে", "সিলুম",
  "দোলোরে", "ইউ", "ফু গিয়াৎ", "নুল্লা", "পারিয়াতুর", "এক্সেপ্তুর", "সিন", "ওক্কাএকাত",
  "কুপাইদাতাত", "নোন", "প্রোইদেন্ত", "সুন্ত", "ইন", "কুল্পা", "কুই", "ওফিসিয়া",
  "দেরুন্ত", "মোল্লিত", "আনিম", "ইদ", "এস্ত", "লাবোরুম"
];

/**
 * Generates custom Bangla typing practice text / Lorem Ipsum using 3,000 top Bangla words or classic Bangla Lorem Ipsum.
 */
export function generateBanglaPracticeText(options: BanglaLoremOptions = {}): string {
  const {
    wordCount = 50,
    level = "all",
    includePunctuation = true,
    type = "lorem",
  } = options;

  let pool: string[];
  if (type === "lorem") {
    pool = LOREM_WORDS;
  } else {
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
  }

  if (!pool || pool.length === 0) {
    pool = ALL_BANGLA_WORDS;
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
    } else if (currentSentenceLength > 3 && Math.random() < 0.25) {
      word += ",";
    }

    resultWords.push(word);
  }

  return resultWords.join(" ");
}
