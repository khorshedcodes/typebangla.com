import level1 from "../../db/bangla_sentences_1.json";
import level2 from "../../db/bangla_sentences_2.json";
import level3 from "../../db/bangla_sentences_3.json";

/**
 * TypeBangla — Bangla Sentence Practice Database
 * 300 curated Bangla sentences split across 3 difficulty tiers (100 sentences each).
 */

export const BANGLA_SENTENCES_LEVEL_1: string[] = level1 as string[];
export const BANGLA_SENTENCES_LEVEL_2: string[] = level2 as string[];
export const BANGLA_SENTENCES_LEVEL_3: string[] = level3 as string[];

export const ALL_BANGLA_SENTENCES: string[] = [
  ...BANGLA_SENTENCES_LEVEL_1,
  ...BANGLA_SENTENCES_LEVEL_2,
  ...BANGLA_SENTENCES_LEVEL_3,
];

export interface BanglaSentenceGroup {
  level: 1 | 2 | 3;
  name: string;
  description: string;
  sentences: string[];
}

export const BANGLA_SENTENCE_GROUPS: BanglaSentenceGroup[] = [
  {
    level: 1,
    name: "সহজ বাক্য (Easy)",
    description: "দৈনন্দিন ছোট ছোট বাংলা বাক্য অনুশীলন (৫–১০ শব্দ)।",
    sentences: BANGLA_SENTENCES_LEVEL_1,
  },
  {
    level: 2,
    name: "মধ্যম বাক্য (Medium)",
    description: "সাহিত্য ও সংবাদের প্রমিত বাক্য অনুশীলন (১১–২০ শব্দ)।",
    sentences: BANGLA_SENTENCES_LEVEL_2,
  },
  {
    level: 3,
    name: "কঠিন / সরকারি চাকরি পরীক্ষা (Hard / Exam)",
    description: "জটিল যুক্তবর্ণ, প্রশাসনিক পরিভাষা ও পরীক্ষার বাক্য (২১+ শব্দ)।",
    sentences: BANGLA_SENTENCES_LEVEL_3,
  },
];
