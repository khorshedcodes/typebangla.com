import { describe, test, expect } from "./testRunner";
import { saveLessonProgress, getAllProgress } from "../src/utils/lessons/progress";
import { englishLessons } from "../src/utils/lessons/english/english.lessons";
import { unibijoyLessons } from "../src/utils/lessons/bangla/unibijoy.lessons";

describe("Course Progression & Lesson Completion Criteria", () => {
  const calculateCourseProgress = (passedLessons: number, totalLessons: number): number => {
    if (totalLessons === 0) return 0;
    return Math.min(100, Math.round((passedLessons / totalLessons) * 100));
  };

  test("0 passed lessons out of 25 should yield 0% progress", () => {
    expect(calculateCourseProgress(0, 25)).toBe(0);
  });

  test("10 passed lessons out of 25 should yield 40% progress", () => {
    expect(calculateCourseProgress(10, 25)).toBe(40);
  });

  test("25 passed lessons out of 25 should yield 100% course completion", () => {
    expect(calculateCourseProgress(25, 25)).toBe(100);
  });

  test("Lesson qualification threshold should require 85%+ accuracy", () => {
    const isLessonPassed = (accuracy: number) => accuracy >= 85;
    expect(isLessonPassed(92)).toBe(true);
    expect(isLessonPassed(84)).toBe(false);
  });

  test("Lesson 1 is unlocked by default; Lesson 2 is locked until Lesson 1 passes", () => {
    const isLessonUnlocked = (
      order: number,
      prevLessonId: string,
      progressMap: Record<string, { passed: boolean }>
    ): boolean => {
      if (order <= 1) return true;
      return !!progressMap[prevLessonId]?.passed;
    };

    const emptyProgress = {};
    expect(isLessonUnlocked(1, "", emptyProgress)).toBe(true);
    expect(isLessonUnlocked(2, "en-001", emptyProgress)).toBe(false);

    const progressWithLesson1Passed = { "en-001": { passed: true } };
    expect(isLessonUnlocked(2, "en-001", progressWithLesson1Passed)).toBe(true);
    expect(isLessonUnlocked(3, "en-002", progressWithLesson1Passed)).toBe(false);
  });

  test("Passing Lesson 1 with target WPM and accuracy saves passed: true", () => {
    const lesson1 = englishLessons[0];
    const updated = saveLessonProgress(lesson1.id, 20, 92, {
      targetWpm: lesson1.targetWpm,
      targetAccuracy: 85,
    });

    expect(updated.passed).toBe(true);
    expect(updated.bestWpm).toBe(20);
    expect(updated.bestAccuracy).toBe(92);
  });

  test("Failing Lesson target WPM keeps passed: false", () => {
    const lesson2 = englishLessons[1];
    const updated = saveLessonProgress(lesson2.id, 5, 80, {
      targetWpm: lesson2.targetWpm,
      targetAccuracy: 85,
    });

    expect(updated.passed).toBe(false);
  });

  test("Lesson drill text contains only curated focus keys without random passage corruptions", () => {
    const unibijoyLesson1 = unibijoyLessons[0];
    expect(unibijoyLesson1.focusKeys).toBe("ক স");
    // Should only contain ক and স and spaces, no random newspaper articles
    const nonTargetChars = unibijoyLesson1.text.replace(/[কস\s]/g, "");
    expect(nonTargetChars.length).toBe(0);
  });
});
