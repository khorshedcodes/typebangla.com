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

const REAL_BANGLA_WORDS_CLEAN = [
  "অর্থনীতি", "পরিবহন", "পরিবেশ", "জলবায়ু", "প্রযুক্তি", "উদ্ভাবন", "যোগাযোগ", "সচেতনতা",
  "অংশগ্রহণ", "বিশ্ববিদ্যালয়", "মহাবিদ্যালয়", "ইনস্টিটিউট", "একাডেমি", "ল্যাবরেটরি", "পরীক্ষাগার",
  "কেন্দ্র", "লাইব্রেরি", "সংগ্রহশালা", "জাদুঘর", "গ্যালারি", "থিয়েটার", "মিলনায়তন", "হলরুম",
  "ওয়ার্কশপ", "সিম্পোজিয়াম", "আলোচনা", "মতবিনিময়", "গোলটেবিল", "প্যানেল", "মানুষ", "বাংলাদেশ",
  "জীবন", "সবুজ", "সুন্দর", "দেশ", "কথা", "আকাশ", "বাতাস", "পানি", "নদী", "ফুল", "মাটি",
  "আলো", "দিন", "রাত", "স্বপ্ন", "ভালবাসা", "কাজ", "সময়", "শিক্ষা", "ভাষা", "বই", "মন",
  "চোখ", "হাত", "মা", "বাবা", "ভাই", "বোন", "বন্ধু", "পথ", "ঘর", "গ্রাম", "শহর",
  "প্রকৃতি", "পাখি", "বৃক্ষ", "জগৎ", "সত্য", "শান্তি", "সুখ", "আশা", "আনন্দ", "স্মৃতি",
  "গান", "সুর", "বানী", "রূপ", "হৃদয়", "বিজ্ঞান", "অঞ্চল", "তৃষ্ণা", "অঙ্ক", "সঙ্গীত",
  "উত্তম", "বুদ্ধি", "শ্রদ্ধা", "ব্রহ্মপুত্র", "স্পন্দন", "আকাঙ্ক্ষা", "সঙ্কট", "অঞ্জলি", "উজ্জ্বল",
  "প্রতিনিধি", "প্রস্তাব", "সৃষ্টি", "কষ্ট", "স্পষ্ট", "প্রভাত", "শ্রাবণ", "প্রীতি", "সূর্য",
  "চন্দ্র", "গ্রহ", "নক্ষত্র", "ব্যক্তি", "ন্যায্য", "ধর্ম", "কর্ম", "মর্ম", "পূর্ব", "স্বদেশ",
  "স্বাধীন", "স্মরণ", "স্মৃতি", "স্বাদ", "অমৃত", "সৃজন", "সংস্কৃতি", "উন্নয়ন", "অগ্রগতি",
  "ঐতিহ্য", "ইতিহাস", "সাহিত্য", "কবিতা", "উপন্যাস", "গল্প", "নিবন্ধ", "পত্রিকা", "সংবাদ",
  "বার্তা", "তথ্য", "জ্ঞান", "গবেষণা", "আবিষ্কার", "চেতনা", "বিপ্লব", "মুক্তি", "সোনার", "বাংলা"
];

function filterCleanWords(rawWords: string[]): string[] {
  if (!Array.isArray(rawWords)) return REAL_BANGLA_WORDS_CLEAN;
  const filtered = rawWords.filter(
    (w) => typeof w === "string" && !w.includes("_") && !/\d/.test(w) && w.trim().length > 0
  );
  return filtered.length > 10 ? filtered : REAL_BANGLA_WORDS_CLEAN;
}

/**
 * Generates custom Bangla typing practice text / Lorem Ipsum using clean real Bangla words or classic Bangla Lorem Ipsum.
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
        pool = filterCleanWords(BANGLA_WORDS_LEVEL_1);
        break;
      case 2:
        pool = filterCleanWords(BANGLA_WORDS_LEVEL_2);
        break;
      case 3:
        pool = filterCleanWords(BANGLA_WORDS_LEVEL_3);
        break;
      default:
        pool = filterCleanWords(ALL_BANGLA_WORDS);
        break;
    }
  }

  if (!pool || pool.length === 0) {
    pool = REAL_BANGLA_WORDS_CLEAN;
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
