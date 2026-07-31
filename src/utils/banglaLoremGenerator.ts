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

const AUTHENTIC_BANGLA_WORDS = [
  "বাংলাদেশ", "সংস্কৃতি", "উন্নয়ন", "প্রযুক্তি", "অর্থনীতি", "শিক্ষা", "সাহিত্য", "প্রকৃতি",
  "সমাজ", "গবেষণা", "ইতিহাস", "ঐতিহ্য", "স্বাধীনতা", "বিকাশ", "সমৃদ্ধি", "অনুপাত",
  "বায়ুমণ্ডল", "সংগ্রাম", "বিজ্ঞান", "অঞ্চল", "উৎসব", "শিল্প", "কবিতা", "উপন্যাস",
  "গল্প", "নিবন্ধ", "পত্রিকা", "সংবাদ", "বার্তা", "তথ্য", "জ্ঞান", "চেতনা",
  "বিপ্লব", "মুক্তি", "সোনার", "বাংলা", "প্রজন্ম", "ভবিষ্যৎ", "পরিবেশ", "জলবায়ু",
  "উদ্ভাবন", "যোগাযোগ", "সচেতনতা", "অংশগ্রহণ", "বিশ্ববিদ্যালয়", "মহাবিদ্যালয়", "ইনস্টিটিউট", "একাডেমি",
  "পরীক্ষাগার", "কেন্দ্র", "লাইব্রেরি", "সংগ্রহশালা", "জাদুঘর", "গ্যালারি", "থিয়েটার", "মিলনায়তন",
  "ওয়ার্কশপ", "আলোচনা", "মতবিনিময়", "গোলটেবিল", "মানুষ", "জীবন", "সবুজ", "সুন্দর",
  "দেশ", "কথা", "আকাশ", "বাতাস", "পানি", "নদী", "ফুল", "মাটি", "আলো",
  "দিন", "রাত", "স্বপ্ন", "ভালবাসা", "কাজ", "সময়", "ভাষা", "বই", "মন",
  "চোখ", "হাত", "মা", "বাবা", "ভাই", "বোন", "বন্ধু", "পথ", "ঘর",
  "গ্রাম", "শহর", "পাখি", "বৃক্ষ", "জগৎ", "সত্য", "শান্তি", "সুখ", "আশা",
  "আনন্দ", "স্মৃতি", "গান", "সুর", "বানী", "রূপ", "হৃদয়", "সঙ্গীত", "উত্তম",
  "বুদ্ধি", "শ্রদ্ধা", "ব্রহ্মপুত্র", "স্পন্দন", "আকাঙ্ক্ষা", "সঙ্কট", "অঞ্জলি", "উজ্জ্বল", "প্রতিনিধি",
  "প্রস্তাব", "সৃষ্টি", "কষ্ট", "স্পষ্ট", "প্রভাত", "শ্রাবণ", "প্রীতি", "সূর্য", "চন্দ্র",
  "গ্রহ", "নক্ষত্র", "ব্যক্তি", "ন্যায্য", "ধর্ম", "কর্ম", "মর্ম", "পূর্ব", "স্বদেশ",
  "স্বাধীন", "স্মরণ", "স্মৃতি", "স্বাদ", "অমৃত", "সৃজন", "অগ্রগতি", "প্রজন্ম", "সমন্বয়",
  "সক্ষমতা", "সুশাসন", "পরিকল্পনা", "বাস্তবায়ন", "কাঠামো", "সফলতা", "দূরদর্শিতা", "দক্ষতা", "পেশাদারিত্ব"
];

function filterCleanWords(rawWords: string[]): string[] {
  if (!Array.isArray(rawWords)) return AUTHENTIC_BANGLA_WORDS;
  const filtered = rawWords.filter(
    (w) => typeof w === "string" && !w.includes("_") && !/\d/.test(w) && w.trim().length > 0
  );
  return filtered.length > 10 ? filtered : AUTHENTIC_BANGLA_WORDS;
}

/**
 * Generates custom Bangla typing practice text / Lorem Ipsum using 100% authentic Bangla vocabulary.
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
    pool = AUTHENTIC_BANGLA_WORDS;
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
    pool = AUTHENTIC_BANGLA_WORDS;
  }

  const selectedWords: string[] = [];
  
  // If classic lorem type, start with "লরেম ইপসাম" for branding recognition
  if (type === "lorem") {
    selectedWords.push("লরেম", "ইপসাম");
  }

  while (selectedWords.length < wordCount) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const word = pool[randomIndex];
    if (word && word !== "লরেম" && word !== "ইপসাম") {
      selectedWords.push(word);
    }
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
