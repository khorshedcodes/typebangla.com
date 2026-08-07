import level1 from "../../db/bangla_1000_1.json";
import level2 from "../../db/bangla_1000_2.json";
import level3 from "../../db/bangla_1000_3.json";

/**
 * TypeBangla — Bangla Frequent Words & Juktakkhor Drills Database
 */

export const BANGLA_WORDS_LEVEL_1: string[] = level1 as string[];
export const BANGLA_WORDS_LEVEL_2: string[] = level2 as string[];
export const BANGLA_WORDS_LEVEL_3: string[] = level3 as string[];

export const ALL_BANGLA_WORDS: string[] = [
  ...BANGLA_WORDS_LEVEL_1,
  ...BANGLA_WORDS_LEVEL_2,
  ...BANGLA_WORDS_LEVEL_3,
];

export interface WordDrillGroup {
  id: string;
  title: string;
  category: "frequent" | "juktakkhor" | "kars" | "numbers";
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  words: string[];
}

export const BANGLA_FREQUENT_WORDS_DB: WordDrillGroup[] = [
  {
    id: "drill-top-frequent",
    title: "সর্বাধিক ব্যবহৃত ৫০টি বাংলা শব্দ",
    category: "frequent",
    difficulty: "beginner",
    description: "দৈনন্দিন বাংলা টাইপিংয়ে সবচেয়ে বেশি ব্যবহৃত মৌলিক শব্দাবলী।",
    words: [
      "মানুষ", "বাংলাদেশ", "জীবন", "সবুজ", "সুন্দর", "দেশ", "কথা", "আকাশ", "বাতাস", "পানি",
      "নদী", "ফুল", "মাটি", "আলো", "দিন", "রাত", "স্বপ্ন", "ভালোবাসা", "কাজ", "সময়",
      "শিক্ষা", "ভাষা", "বই", "মন", "চোখ", "হাত", "মা", "বাবা", "ভাই", "বোন",
      "বন্ধু", "পথ", "ঘর", "গ্রাম", "শহর", "প্রকৃতি", "পাখি", "বৃক্ষ", "জগৎ", "সত্য",
      "শান্তি", "সুখ", "আশা", "আনন্দ", "স্মৃতি", "গান", "সুর", "বাণী", "রূপ", "হৃদয়"
    ]
  },
  {
    id: "drill-juktakkhor-mastery",
    title: "গুরুত্বপূর্ণ যুক্তাক্ষর অনুশীলন",
    category: "juktakkhor",
    difficulty: "advanced",
    description: "কঠিন যুক্তবর্ণ ও লিগেচারসমূহ (ক্ষ, জ্ঞ, ঞ্চ, ষ্ণ, ঙ্ক, ঙ্গ, ত্ত, দ্ধ)।",
    words: [
      "শিক্ষা", "বিজ্ঞান", "অঞ্চল", "তৃষ্ণা", "অঙ্ক", "সঙ্গীত", "উত্তম", "বুদ্ধি", "শ্রদ্ধা", "ব্রহ্মপুত্র",
      "স্পন্দন", "আকাঙ্ক্ষা", "সঙ্কট", "অঞ্জলি", "উজ্জ্বল", "প্রতিনিধি", "প্রস্তাব", "সৃষ্টি", "কষ্ট", "স্পষ্ট"
    ]
  },
  {
    id: "drill-kar-fola",
    title: "কার ও ফলা অনুশীলন (া ি ী ু ূ ৃ ে ৈ ো ৌ / ্য ্র র্)",
    category: "kars",
    difficulty: "intermediate",
    description: "স্বরচিহ্ন (কার) ও ব্যঞ্জনচিহ্ন (ফলা) ব্যবহারের নির্ভুল ড্রিল।",
    words: [
      "প্রভাত", "শ্রাবণ", "প্রীতি", "সূর্য", "চন্দ্র", "গ্রহ", "নক্ষত্র", "ব্যক্তি", "ন্যায্য", "ধর্ম",
      "কর্ম", "মর্ম", "পূর্ব", "স্বদেশ", "স্বাধীন", "স্মরণ", "স্মৃতি", "স্বাদ", "অমৃত", "সৃজন"
    ]
  },
  {
    id: "drill-numbers-symbols",
    title: "বাংলা সংখ্যা ও মুদ্রা প্রতীক (০-৯, ৳, %)",
    category: "numbers",
    difficulty: "beginner",
    description: "বাংলা সংখ্যা ও গাণিতিক প্রতীক টাইপিং প্র্যাকটিস।",
    words: [
      "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০",
      "৳৫০", "৳১০০", "৳৫০০", "৳১০০০", "৫০%", "৭৫%", "১০০%", "২০২৪", "১৯৭১", "১৯৫২"
    ]
  }
];
