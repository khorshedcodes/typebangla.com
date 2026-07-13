/**
 * TypeMaster — Lesson Index (Orchestrator)
 *
 * This is the single entry point for all lesson data and helpers.
 * Import everything you need from this file:
 *
 *   import { ALL_LESSONS, getLessonsByCategory, getCourseCompletion } from "../utils/lessons";
 */

// ── Re-export types ─────────────────────────────────────────
export type {
  Lesson,
  LessonCategory,
  LessonLevel,
  LessonType,
  InputLanguage,
} from "./types";

// ── Re-export progress helpers ───────────────────────────────
export type { LessonProgress } from "./progress";
export {
  getLessonProgress,
  getAllProgress,
  saveLessonProgress,
  clearAllProgress,
} from "./progress";

// ── Import layout-specific lesson arrays ─────────────────────
import { englishLessons } from "./english/english.lessons";
import { avroLessons } from "./bangla/avro.lessons";
import { unibijoyLessons } from "./bangla/unibijoy.lessons";
import { jatiyaLessons } from "./bangla/jatiya.lessons";

// ── Import types needed in helpers ───────────────────────────
import type { Lesson, LessonCategory } from "./types";
import type { KeyboardLayout } from "../../store/typingStore";

// ── Combined lesson pool ─────────────────────────────────────
export const ALL_LESSONS: Lesson[] = [
  ...englishLessons,
  ...avroLessons,
  ...unibijoyLessons,
  ...jatiyaLessons,
];

// ── Lesson lookup ────────────────────────────────────────────
export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

// ── Category + Layout filtering ─────────────────────────────
export function getLessonsByCategory(
  category: LessonCategory,
  layout?: KeyboardLayout
): Lesson[] {
  if (category === "english") {
    return englishLessons;
  }
  // Bangla — select the correct layout-specific array
  if (layout === "unibijoy") return unibijoyLessons;
  if (layout === "jatiya") return jatiyaLessons;
  return avroLessons; // default / "avro" / "english" (fallback)
}

// ── Course completion stats ──────────────────────────────────
import { getAllProgress } from "./progress";

export function getCourseCompletion(
  category: LessonCategory,
  layout?: KeyboardLayout
): { total: number; passed: number; percentage: number } {
  const lessons = getLessonsByCategory(category, layout);
  const progress = getAllProgress();
  const passed = lessons.filter((l) => progress[l.id]?.passed === true).length;

  return {
    total: lessons.length,
    passed,
    percentage: Math.round((passed / (lessons.length || 1)) * 100),
  };
}
