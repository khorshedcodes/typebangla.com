/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { useTypingStore } from "../store/typingStore";
import {
  Lesson,
  LessonCategory,
  LessonLevel,
  LessonProgress,
  getLessonsByCategory,
  getAllProgress,
  saveLessonProgress,
  getCourseCompletion,
  clearAllProgress,
} from "../utils/lessons";
import {
  BookOpen,
  Award,
  Check,
  ChevronRight,
  Star,
  Target,
  RotateCcw,
  Lock,
  Zap,
  Trophy,
} from "lucide-react";

// ─── level color helpers ─────────────────────────────────────
const LEVEL_COLORS: Record<LessonLevel, string> = {
  beginner: "#10b981",
  intermediate: "#f59e0b",
  advanced: "#ef4444",
  mastery: "#a855f7",
};

const LEVEL_LABELS: Record<LessonLevel, string> = {
  beginner: "শিক্ষার্থী",
  intermediate: "মাধ্যমিক",
  advanced: "উন্নত",
  mastery: "দক্ষতা",
};

// ─── helpers ────────────────────────────────────────────────
function isLessonUnlocked(
  lesson: Lesson,
  progress: Record<string, LessonProgress>,
  lessonList: Lesson[]
): boolean {
  // First lesson always unlocked
  if (lesson.order <= 1) return true;
  // A lesson is unlocked if the previous lesson was passed OR if any attempt exists
  const prev = lessonList.find((l) => l.order === lesson.order - 1);
  if (!prev) return true;
  return !!progress[prev.id];
}

// ─── Component ───────────────────────────────────────────────
export default function LessonSelector() {
  const { setTargetText, isCompleted, elapsedTime, typedText, targetText, resetTest, activeLayout } =
    useTypingStore();

  const [selectedCategory, setSelectedCategory] = useState<LessonCategory>("bangla");
  const [activeLessonId, setActiveLessonId] = useState<string>("bn-avro-001");
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // ── Load lessons + progress from localStorage on mount & when layout/category changes ──
  useEffect(() => {
    const p = getAllProgress();
    setProgress(p);

    // Set default lesson based on category and layout
    const currentLessons = getLessonsByCategory(selectedCategory, activeLayout);
    const firstLesson = currentLessons[0];
    if (firstLesson) {
      setActiveLessonId(firstLesson.id);
      setTargetText(
        firstLesson.text,
        firstLesson.focusKeys,
        firstLesson.type,
        firstLesson.inputLanguage,
        firstLesson.outputPreview
      );
    }
  }, [setTargetText, selectedCategory, activeLayout]);

  // ── Save progress when a test completes ──
  useEffect(() => {
    if (!isCompleted || !activeLessonId) return;

    const wpm = Math.round((typedText.length / 5) / (elapsedTime / 60 || 1));
    const correct = typedText.split("").filter((c, i) => c === targetText[i]).length;
    const accuracy = Math.round((correct / (typedText.length || 1)) * 100);

    // Find the active lesson to pass its targets for pass/fail evaluation
    const allLessons = getLessonsByCategory(selectedCategory, activeLayout);
    const activeLesson = allLessons.find((l) => l.id === activeLessonId);
    const updated = saveLessonProgress(
      activeLessonId,
      Math.max(0, wpm),
      Math.max(0, accuracy),
      activeLesson
    );
    setProgress((prev) => ({ ...prev, [activeLessonId]: updated }));
  }, [isCompleted]); // eslint-disable-line react-hooks/exhaustive-deps

  const lessons = getLessonsByCategory(selectedCategory, activeLayout);
  const completion = getCourseCompletion(selectedCategory, activeLayout);

  const handleToggleCategory = (category: LessonCategory) => {
    setSelectedCategory(category);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    if (!isLessonUnlocked(lesson, progress, lessons)) return;
    setActiveLessonId(lesson.id);
    setTargetText(
      lesson.text,
      lesson.focusKeys,
      lesson.type,
      lesson.inputLanguage,
      lesson.outputPreview
    );
    resetTest();
  };

  const handleClearProgress = () => {
    clearAllProgress();
    setProgress({});
    setShowClearConfirm(false);
  };

  const activeLesson = lessons.find((l) => l.id === activeLessonId);
  const activeLessonProgress = activeLessonId ? progress[activeLessonId] : null;

  return (
    <div className="glass-card flex flex-col gap-5" style={{ height: "fit-content" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2" style={{ marginBottom: "0.15rem" }}>
            <BookOpen size={20} className="text-emerald" />
            <span>টাইপিং কোর্স</span>
          </h3>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            বিশেষজ্ঞ হওয়ার পথ — ধাপে ধাপে
          </p>
        </div>
        <button
          onClick={() => setShowClearConfirm(!showClearConfirm)}
          title="Reset all progress"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
            padding: "0.25rem",
          }}
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {showClearConfirm && (
        <div
          style={{
            padding: "0.75rem",
            backgroundColor: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.78rem",
            color: "#f87171",
          }}
        >
          সব অগ্রগতি মুছে ফেলবেন?{" "}
          <button
            onClick={handleClearProgress}
            style={{
              marginLeft: "0.5rem",
              padding: "0.15rem 0.5rem",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            হ্যাঁ
          </button>
          <button
            onClick={() => setShowClearConfirm(false)}
            style={{
              marginLeft: "0.25rem",
              padding: "0.15rem 0.5rem",
              background: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            না
          </button>
        </div>
      )}

      {/* ── Category Toggle ── */}
      <div
        style={{
          display: "flex",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius-sm)",
          padding: "0.2rem",
          border: "1px solid var(--border-color)",
        }}
      >
        {(["bangla", "english"] as LessonCategory[]).map((cat) => {
          const comp = getCourseCompletion(cat, activeLayout);
          return (
            <button
              key={cat}
              onClick={() => handleToggleCategory(cat)}
              style={{
                flex: 1,
                padding: "0.5rem 0.25rem",
                background:
                  selectedCategory === cat ? "var(--primary-emerald)" : "transparent",
                color: selectedCategory === cat ? "white" : "var(--text-secondary)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.82rem",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.1rem",
              }}
            >
              <span>{cat === "bangla" ? "বাংলা কোর্স" : "English Course"}</span>
              <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>
                {comp.passed}/{comp.total} পাস
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Progress Bar ── */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            marginBottom: "0.3rem",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Trophy size={12} />
            কোর্স অগ্রগতি
          </span>
          <span style={{ color: "var(--primary-emerald)", fontWeight: "700" }}>
            {completion.percentage}%
          </span>
        </div>
        <div
          style={{
            height: "5px",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${completion.percentage}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, var(--primary-emerald), #34d399)",
              borderRadius: "99px",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* ── Active Lesson Stats (if progress exists) ── */}
      {activeLessonProgress && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.5rem",
          }}
        >
          {[
            { label: "সেরা WPM", value: activeLessonProgress.bestWpm, icon: <Zap size={11} /> },
            {
              label: "সেরা নির্ভুলতা",
              value: `${activeLessonProgress.bestAccuracy}%`,
              icon: <Target size={11} />,
            },
            {
              label: "মোট চেষ্টা",
              value: activeLessonProgress.attempts,
              icon: <RotateCcw size={11} />,
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: "0.4rem 0.5rem",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.2rem",
                  marginBottom: "0.15rem",
                }}
              >
                {item.icon}
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  color: "var(--primary-emerald)",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Active Lesson Target ── */}
      {activeLesson && (
        <div
          style={{
            padding: "0.6rem 0.75rem",
            backgroundColor: "hsla(164, 95%, 23%, 0.12)",
            border: "1px solid hsla(164, 95%, 43%, 0.25)",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "0.1rem" }}>
              লক্ষ্যমাত্রা
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-primary)" }}>
              {activeLesson.targetWpm} WPM · {activeLesson.targetAccuracy}% নির্ভুলতা
            </div>
          </div>
          {activeLessonProgress?.passed ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                color: "#10b981",
                fontSize: "0.78rem",
                fontWeight: "700",
              }}
            >
              <Check size={14} />
              পাস হয়েছে
            </div>
          ) : (
            <Star size={16} style={{ color: "var(--accent-gold)", opacity: 0.6 }} />
          )}
        </div>
      )}

      {/* ── Lessons List ── */}
      <div
        className="flex flex-col gap-2"
        style={{ maxHeight: "480px", overflowY: "auto", paddingRight: "0.2rem" }}
      >
        {lessons.map((lesson) => {
          const isActive = lesson.id === activeLessonId;
          const lessonProgress = progress[lesson.id];
          const isPassed = lessonProgress?.passed === true;
          const hasAttempt = !!lessonProgress;
          const unlocked = isLessonUnlocked(lesson, progress, lessons);
          const levelColor = LEVEL_COLORS[lesson.level];

          return (
            <div
              key={lesson.id}
              onClick={() => handleSelectLesson(lesson)}
              title={unlocked ? lesson.subtitle : "আগের পাঠটি সম্পন্ন করুন"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.7rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: isActive
                  ? "hsla(164, 95%, 23%, 0.15)"
                  : hasAttempt
                  ? "hsla(164, 80%, 15%, 0.08)"
                  : "var(--bg-secondary)",
                border: isActive
                  ? "1px solid var(--primary-emerald)"
                  : `1px solid ${hasAttempt ? "hsla(164, 60%, 30%, 0.25)" : "var(--border-color)"}`,
                cursor: unlocked ? "pointer" : "not-allowed",
                transition: "all 0.18s",
                opacity: unlocked ? 1 : 0.45,
              }}
            >
              {/* Left: lesson number + info */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flex: 1, minWidth: 0 }}>
                {/* Number Badge */}
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: isPassed
                      ? "var(--primary-emerald)"
                      : isActive
                      ? "hsla(164, 95%, 30%, 0.3)"
                      : "var(--bg-tertiary)",
                    border: `1px solid ${isPassed ? "var(--primary-emerald)" : "var(--border-color)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    color: isPassed ? "white" : "var(--text-muted)",
                  }}
                >
                  {isPassed ? <Check size={12} /> : unlocked ? lesson.order : <Lock size={10} />}
                </div>

                {/* Title + tags */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: isActive ? "white" : "var(--text-primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {lesson.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.15rem" }}>
                    {/* Level chip */}
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: "700",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase",
                        color: levelColor,
                        backgroundColor: `${levelColor}18`,
                        padding: "0.05rem 0.3rem",
                        borderRadius: "2px",
                      }}
                    >
                      {LEVEL_LABELS[lesson.level]}
                    </span>
                    {/* Focus keys */}
                    <span
                      style={{
                        fontSize: "0.6rem",
                        color: "var(--text-muted)",
                        maxWidth: "120px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lesson.focusKeys}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: WPM badge or arrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                {lessonProgress && (
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: "700",
                      color: "var(--accent-gold)",
                      backgroundColor: "rgba(251,191,36,0.08)",
                      padding: "0.1rem 0.35rem",
                      borderRadius: "3px",
                      border: "1px solid rgba(251,191,36,0.2)",
                    }}
                  >
                    {lessonProgress.bestWpm} wpm
                  </div>
                )}
                {isActive ? (
                  <ChevronRight size={14} style={{ color: "var(--primary-emerald)" }} />
                ) : isPassed ? (
                  <Award size={14} style={{ color: "var(--primary-emerald)" }} />
                ) : (
                  <ChevronRight size={14} style={{ color: "var(--text-muted)", opacity: 0.4 }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
