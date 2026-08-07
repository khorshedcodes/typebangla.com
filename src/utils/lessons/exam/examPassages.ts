/**
 * TypeMaster — Exam Passage Library & Utilities
 *
 * Curated literary passages for free typing tests / speed exams.
 * Sources: Famous Bangla and English authors, literature, and nature writing.
 */

import { banglaPassages, ExamPassage } from "../../../data/passages/banglaPassages";
import { englishPassages } from "../../../data/passages/englishPassages";

export type PassageLanguage = "bangla" | "english";
export type PassageDifficulty = "easy" | "medium" | "hard";
export type { ExamPassage };

export { banglaPassages, englishPassages };

// ─────────────────────────────────────────────────────────────
// Combined pool + helpers
// ─────────────────────────────────────────────────────────────
export const ALL_EXAM_PASSAGES: ExamPassage[] = [
  ...banglaPassages,
  ...englishPassages,
];

export function getPassagesByLanguage(language: PassageLanguage): ExamPassage[] {
  return ALL_EXAM_PASSAGES.filter((p) => p.language === language);
}

export function getPassagesByDifficulty(difficulty: PassageDifficulty): ExamPassage[] {
  return ALL_EXAM_PASSAGES.filter((p) => p.difficulty === difficulty);
}

export function getRandomPassage(language?: PassageLanguage): ExamPassage {
  const pool = language
    ? ALL_EXAM_PASSAGES.filter((p) => p.language === language)
    : ALL_EXAM_PASSAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Extends target text to ensure sufficient length for a given duration (1 min, 2 min, 3 min, 5 min, 10 min, 15 min).
 */
export function extendTextForDuration(
  baseText: string,
  durationSec: number = 60,
  language: PassageLanguage = "bangla"
): string {
  if (!durationSec || durationSec <= 0) return baseText;

  const targetMinLength = Math.max(350, Math.round(durationSec * 9.5));
  let currentText = baseText;
  const pool = getPassagesByLanguage(language);

  if (!pool || pool.length === 0) return baseText;

  let attempts = 0;
  while (currentText.length < targetMinLength && attempts < 30) {
    attempts++;
    const nextPassage = pool[(attempts + Math.floor(Math.random() * pool.length)) % pool.length];
    if (nextPassage && nextPassage.text) {
      currentText += " " + nextPassage.text;
    } else {
      currentText += " " + baseText;
    }
  }

  return currentText;
}

export function getPassageForDuration(
  language?: PassageLanguage,
  durationSec: number = 60,
  seedPassage?: ExamPassage
): ExamPassage {
  const lang: PassageLanguage = language || "bangla";
  const base = seedPassage || getRandomPassage(lang);
  const fullText = extendTextForDuration(base.text, durationSec, lang);
  return {
    ...base,
    text: fullText,
  };
}
