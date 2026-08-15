/**
 * Google Analytics (GA4 gtag.js) Event Tracking Utilities for TypeBangla
 * Measurement ID: G-8E427VGB13
 */

export const GA_MEASUREMENT_ID = "G-8E427VGB13";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Generic safe event dispatcher to gtag
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, eventParams);
    } catch (err) {
      console.warn("Analytics trackEvent error:", err);
    }
  }
}

// ── Speed Test Arena Events ───────────────────────────────────────────────
export function trackSpeedTestStart(duration: number, layout: string, language: string) {
  trackEvent("speed_test_started", {
    duration_seconds: duration,
    duration_minutes: Math.round(duration / 60),
    layout,
    language,
  });
}

export function trackSpeedTestComplete(
  duration: number,
  layout: string,
  language: string,
  wpm: number,
  accuracy: number,
  errors: number
) {
  trackEvent("speed_test_completed", {
    duration_seconds: duration,
    layout,
    language,
    wpm,
    accuracy,
    errors,
  });
}

// ── Govt Job Simulator Exam Events ────────────────────────────────────────
export function trackGovtExamStart(postId: string, postTitle: string, duration: number, layout: string) {
  trackEvent("govt_exam_started", {
    post_id: postId,
    post_title: postTitle,
    duration_seconds: duration,
    layout,
  });
}

export function trackGovtExamComplete(
  postId: string,
  postTitle: string,
  duration: number,
  layout: string,
  wpm: number,
  accuracy: number,
  qualified: boolean
) {
  trackEvent("govt_exam_completed", {
    post_id: postId,
    post_title: postTitle,
    duration_seconds: duration,
    layout,
    wpm,
    accuracy,
    qualified,
  });
}

// ── National Ranked Competition Events ────────────────────────────────────
export function trackRankedExamStart(layout: string) {
  trackEvent("ranked_competition_started", {
    layout,
    duration_seconds: 180,
  });
}

export function trackRankedExamComplete(layout: string, wpm: number, accuracy: number, qualified: boolean) {
  trackEvent("ranked_competition_completed", {
    layout,
    wpm,
    accuracy,
    qualified,
  });
}

// ── Courses & Lesson Progression Events ───────────────────────────────────
export function trackLessonComplete(
  courseId: string,
  lessonId: string,
  wpm: number,
  accuracy: number,
  passed: boolean
) {
  trackEvent("lesson_completed", {
    course_id: courseId,
    lesson_id: lessonId,
    wpm,
    accuracy,
    passed,
  });
}

// ── Arcade Game Events ───────────────────────────────────────────────────
export function trackGameStarted(mode: string, layout: string) {
  trackEvent("game_started", {
    game_mode: mode,
    layout,
  });
}

export function trackGameOver(
  mode: string,
  layout: string,
  score: number,
  level: number,
  wordsCleared: number
) {
  trackEvent("game_over", {
    game_mode: mode,
    layout,
    score,
    level,
    words_cleared: wordsCleared,
  });
}

// ── Developer & Bangla Online Tools Events ────────────────────────────────
export function trackToolUsage(toolName: string, actionName: string = "convert") {
  trackEvent("tool_used", {
    tool_name: toolName,
    action: actionName,
  });
}

// ── Certificate Actions ───────────────────────────────────────────────────
export function trackCertificateAction(
  action: "download_png" | "download_pdf" | "print",
  certId: string,
  mode?: string
) {
  trackEvent("certificate_action", {
    action_type: action,
    certificate_id: certId,
    mode: mode || "standard",
  });
}

// ── Institute Waitlist & Application Events ───────────────────────────────
export function trackWaitlistSubmission(
  instituteName: string,
  role: string,
  expectedStudents: string
) {
  trackEvent("institute_waitlist_submitted", {
    institute_name: instituteName,
    role,
    expected_students: expectedStudents,
  });
}
