/**
 * TypeMaster — Lesson Progress (localStorage)
 * Isolated module for all progress tracking operations.
 * NOTE: getLessonById is passed in to avoid circular imports with index.ts
 */
import type { Lesson } from "./types";

export interface LessonProgress {
  lessonId: string;
  bestWpm: number;
  bestAccuracy: number;
  attempts: number;
  passed: boolean;
  lastAttempt: string; // ISO date string
}

const PROGRESS_STORAGE_KEY = "typemaster_lesson_progress";

export function getLessonProgress(lessonId: string): LessonProgress | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!raw) return null;
  const all: Record<string, LessonProgress> = JSON.parse(raw);
  return all[lessonId] ?? null;
}

export function getAllProgress(): Record<string, LessonProgress> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!raw) return {};
  return JSON.parse(raw);
}

export function saveLessonProgress(
  lessonId: string,
  wpm: number,
  accuracy: number,
  lesson?: Pick<Lesson, "targetWpm" | "targetAccuracy">
): LessonProgress {
  const existing = getLessonProgress(lessonId);
  const passed = lesson
    ? wpm >= lesson.targetWpm && accuracy >= lesson.targetAccuracy
    : false;

  const updated: LessonProgress = {
    lessonId,
    bestWpm: Math.max(wpm, existing?.bestWpm ?? 0),
    bestAccuracy: Math.max(accuracy, existing?.bestAccuracy ?? 0),
    attempts: (existing?.attempts ?? 0) + 1,
    passed: existing?.passed || passed,
    lastAttempt: new Date().toISOString(),
  };

  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
  const all: Record<string, LessonProgress> = raw ? JSON.parse(raw) : {};
  all[lessonId] = updated;
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(all));

  return updated;
}

export function clearAllProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
}
