import bnArticles from "../../db/articles_bangla.json";
import enArticles from "../../db/articles_english.json";

/**
 * TypeBangla — Government Job Typing Test Question Bank Repository
 * Past 5 Years Authentic Question Passages & Full-Length 200-250 Word Exam Papers.
 */

export interface GovtExamQuestion {
  id: string;
  category: "secretariat" | "bank" | "nsi" | "nbr" | "judiciary" | "education";
  categoryBn: string;
  year: string;
  title: string;
  targetWpmBn: number;
  targetWpmEn: number;
  minAccuracy: number;
  wordCountBn?: number;
  wordCountEn?: number;
  recommendedTimeMinutes?: number;
  textBn: string;
  textEn: string;
}

export const GOVT_FULL_LENGTH_ARTICLES_BANGLA = bnArticles;
export const GOVT_FULL_LENGTH_ARTICLES_ENGLISH = enArticles;

export const GOVT_QUESTION_BANK: GovtExamQuestion[] = [
  {
    id: "govt-sec-2024",
    category: "secretariat",
    categoryBn: "সচিবালয় ও ক্যাবিনেট বিভাগ",
    year: "২০২৪",
    title: "বাংলাদেশ সচিবালয় কম্পিউটার অপারেটর পরীক্ষা ২০২৪",
    targetWpmBn: 30,
    targetWpmEn: 35,
    minAccuracy: 95,
    wordCountBn: bnArticles[0].wordCount,
    wordCountEn: enArticles[0].wordCount,
    recommendedTimeMinutes: 10,
    textBn: bnArticles[0].textBn,
    textEn: enArticles[0].textEn,
  },
  {
    id: "govt-bb-2024",
    category: "bank",
    categoryBn: "বাংলাদেশ ব্যাংক ও রাষ্ট্রায়ত্ত ব্যাংক",
    year: "২০২৪",
    title: "বাংলাদেশ ব্যাংক অফিসার (ক্যাশ/ডাটা এন্ট্রি) পরীক্ষা ২০২৪",
    targetWpmBn: 30,
    targetWpmEn: 35,
    minAccuracy: 95,
    wordCountBn: bnArticles[1].wordCount,
    wordCountEn: enArticles[1].wordCount,
    recommendedTimeMinutes: 10,
    textBn: bnArticles[1].textBn,
    textEn: enArticles[1].textEn,
  },
  {
    id: "govt-nsi-2023",
    category: "nsi",
    categoryBn: "জাতীয় নিরাপত্তা গোয়েন্দা (NSI)",
    year: "২০২৩",
    title: "এনএসআই ফিল্ড অফিসার ও জুনিয়র ফিল্ড অফিসার টেস্ট ২০২৩",
    targetWpmBn: 28,
    targetWpmEn: 32,
    minAccuracy: 95,
    wordCountBn: bnArticles[2].wordCount,
    wordCountEn: enArticles[2].wordCount,
    recommendedTimeMinutes: 10,
    textBn: bnArticles[2].textBn,
    textEn: enArticles[2].textEn,
  },
  {
    id: "govt-nbr-2023",
    category: "nbr",
    categoryBn: "জাতীয় রাজস্ব বোর্ড ও কাস্টমস",
    year: "২০২৩",
    title: "জাতীয় রাজস্ব বোর্ড (NBR) ডাটা এন্ট্রি অপারেটর টেস্ট ২০২৩",
    targetWpmBn: 28,
    targetWpmEn: 30,
    minAccuracy: 95,
    wordCountBn: bnArticles[3].wordCount,
    wordCountEn: enArticles[3].wordCount,
    recommendedTimeMinutes: 10,
    textBn: bnArticles[3].textBn,
    textEn: enArticles[3].textEn,
  },
  {
    id: "govt-jud-2024",
    category: "judiciary",
    categoryBn: "সুপ্রিম কোর্ট ও জেলা জজ আদালত",
    year: "২০২৪",
    title: "বাংলাদেশ সুপ্রিম কোর্ট ও জজ কোর্ট টাইপিস্ট পরীক্ষা ২০২৪",
    targetWpmBn: 30,
    targetWpmEn: 30,
    minAccuracy: 95,
    wordCountBn: bnArticles[4].wordCount,
    wordCountEn: enArticles[4].wordCount,
    recommendedTimeMinutes: 10,
    textBn: bnArticles[4].textBn,
    textEn: enArticles[4].textEn,
  },
];
