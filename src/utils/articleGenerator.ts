import {
  GOVT_FULL_LENGTH_ARTICLES_BANGLA,
  GOVT_FULL_LENGTH_ARTICLES_ENGLISH,
  GOVT_QUESTION_BANK,
} from "../data/govtQuestionBank";

export interface ArticleSelectorOptions {
  language?: "bangla" | "english";
  category?: string;
}

/**
 * Returns full-length (200-250 words) government exam typing test articles.
 */
export function getGovtExamArticles(language: "bangla" | "english" = "bangla") {
  return language === "bangla"
    ? GOVT_FULL_LENGTH_ARTICLES_BANGLA
    : GOVT_FULL_LENGTH_ARTICLES_ENGLISH;
}

/**
 * Returns a random full-length (200-250 words) exam article for typing tests.
 */
export function getRandomExamArticle(options: ArticleSelectorOptions = {}) {
  const { language = "bangla" } = options;
  const articles = getGovtExamArticles(language);
  const randomIndex = Math.floor(Math.random() * articles.length);
  return articles[randomIndex];
}
