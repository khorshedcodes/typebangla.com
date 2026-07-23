import { describe, test, expect } from "./testRunner";

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
});
