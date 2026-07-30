"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap, ArrowLeft, Play, Lock, CheckCircle2,
  Sparkles, Keyboard, Trophy, Clock, Award, ShieldCheck,
  BookOpen, ChevronRight, RefreshCw, Check, X
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import { getLessonsByCategory, getAllProgress, saveLessonProgress, Lesson, LessonProgress } from "../../../utils/lessons";
import { useAuth } from "../../../context/AuthContext";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import LessonSelector from "../../../components/LessonSelector";
import { ExamCertificateModal } from "../../../components/ExamCertificateModal";
import { saveCertificateRecord } from "../../../lib/firestoreService";
import { AuthModal } from "../../../components/AuthModal";

interface CourseMeta {
  id: string;
  layout: KeyboardLayout;
  title: string;
  titleBn: string;
  desc: string;
  badge: string;
  flag: string;
  targetWpm: string;
}

const COURSE_METAS: Record<string, CourseMeta> = {
  english: {
    id: "english",
    layout: "english",
    title: "English QWERTY Full Keyboard Course",
    titleBn: "ইংরেজি সম্পূর্ণ কীবোর্ড কোর্স",
    desc: "Complete touch-typing mastery from Home Row, Top Row, Bottom Row, and numbers to full 70+ WPM speed.",
    badge: "QWERTY Standard",
    flag: "🇺🇸",
    targetWpm: "40–70+ WPM",
  },
  avro: {
    id: "avro",
    layout: "avro",
    title: "Avro Phonetic Bangla Full Course",
    titleBn: "অভ্র ফোনেটিক বাংলা সম্পূর্ণ কোর্স",
    desc: "Master modern Avro phonetic transliteration. Learn vowels, consonants, conjuncts (যুক্তাক্ষর), and speed drills.",
    badge: "Phonetic Popular",
    flag: "🇧🇩",
    targetWpm: "35–60+ WPM",
  },
  unibijoy: {
    id: "unibijoy",
    layout: "unibijoy",
    title: "UniBijoy Full Course (Bijoy 52)",
    titleBn: "ইউনিবিজয় সম্পূর্ণ কোর্স",
    desc: "Traditional Bijoy-style layout using Unicode character maps. Ideal for publishing, printing, and official work.",
    badge: "Publishing Standard",
    flag: "🇧🇩",
    targetWpm: "30–55+ WPM",
  },
  jatiya: {
    id: "jatiya",
    layout: "jatiya",
    title: "Jatiya BCC Full Course",
    titleBn: "জাতীয় কীবোর্ড সরকারি কোর্স",
    desc: "Official Bangladesh Computer Council (BCC) national layout required for government jobs and ministry typing exams.",
    badge: "Govt Job Standard",
    flag: "🏛️",
    targetWpm: "30–50+ WPM",
  },
  probhat: {
    id: "probhat",
    layout: "probhat",
    title: "Probhat Layout Full Course",
    titleBn: "প্রভাত কীবোর্ড সম্পূর্ণ কোর্স",
    desc: "Intuitive fixed layout aligning similar sounding Bangla characters to English key positions for easy learning.",
    badge: "Intuitive Map",
    flag: "🇧🇩",
    targetWpm: "25–45+ WPM",
  },
  inscript: {
    id: "inscript",
    layout: "inscript",
    title: "Inscript Bangla Full Course",
    titleBn: "ইনস্ক্রিপ্ট বাংলা সম্পূর্ণ কোর্স",
    desc: "Official Inscript layout for West Bengal & National Indian standard Bangla typing. Master home row, consonants, matras, and conjuncts.",
    badge: "India National Standard",
    flag: "🇮🇳",
    targetWpm: "30–50+ WPM",
  },
};

interface CoursePracticeArenaProps {
  lesson: Lesson;
  courseTitle: string;
  totalLessons: number;
  lessonIndex: number;
  nextLesson?: Lesson;
  onBack: () => void;
  onSelectNextLesson: (next: Lesson) => void;
  onClaimCert: () => void;
}

function CoursePracticeArena({
  lesson,
  courseTitle,
  totalLessons,
  lessonIndex,
  nextLesson,
  onBack,
  onSelectNextLesson,
  onClaimCert,
}: CoursePracticeArenaProps) {
  const {
    setTargetText,
    isCompleted,
    elapsedTime,
    typedText,
    targetText,
    resetTest,
  } = useTypingStore();

  const [inputVal, setInputVal] = useState("");
  const [resultState, setResultState] = useState<{
    wpm: number;
    accuracy: number;
    passed: boolean;
  } | null>(null);

  useEffect(() => {
    setTargetText(
      lesson.text,
      lesson.focusKeys,
      lesson.type,
      lesson.inputLanguage,
      lesson.outputPreview
    );
    queueMicrotask(() => {
      setInputVal("");
      setResultState(null);
    });
  }, [lesson, setTargetText]);

  useEffect(() => {
    if (!isCompleted || !elapsedTime || !typedText) return;

    const totalChars = typedText.length;
    const elapsedMinutes = elapsedTime / 60;
    const grossWpm = Math.round(totalChars / 5 / elapsedMinutes);

    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, targetText.length); i++) {
      if (typedText[i] === targetText[i]) correctChars++;
    }
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    const passed = grossWpm >= lesson.targetWpm && accuracy >= 85;

    saveLessonProgress(lesson.id, grossWpm, accuracy, {
      targetWpm: lesson.targetWpm,
      targetAccuracy: 85,
    });

    queueMicrotask(() => {
      setResultState({ wpm: grossWpm, accuracy, passed });
    });
  }, [isCompleted, elapsedTime, typedText, targetText, lesson]);

  const currentNextChar = targetText[typedText.length] || "";

  return (
    <div className="space-y-6 fade-in max-w-5xl mx-auto">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="text-xs font-bold gap-1.5 border-border cursor-pointer hover:bg-secondary"
        >
          <ArrowLeft size={14} /> Back to {courseTitle}
        </Button>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="border-border text-foreground font-mono text-xs px-3 py-1 bg-secondary">
            LESSON {lessonIndex + 1} OF {totalLessons}: {lesson.title}
          </Badge>
          <Badge variant="outline" className="border-primary/40 text-primary font-bold text-xs px-3 py-1 bg-primary/10">
            Target: {lesson.targetWpm} WPM
          </Badge>
        </div>
      </div>

      {/* Lesson Passed / Failed Result Celebration Banner */}
      {resultState && (
        <div
          className={`p-6 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md ${
            resultState.passed
              ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-foreground"
              : "border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 text-foreground"
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-black shrink-0 ${
                resultState.passed ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
              }`}
            >
              {resultState.passed ? <Trophy size={24} /> : <RefreshCw size={24} />}
            </div>
            <div>
              <div className="flex items-center gap-2 font-black text-lg">
                <span>{resultState.passed ? "🎉 Lesson Passed!" : "⚡ Practice Goal Missed"}</span>
                <Badge className={resultState.passed ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"}>
                  {resultState.wpm} WPM | {resultState.accuracy}% Acc
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {resultState.passed
                  ? `Great job! You met the target goal of ${lesson.targetWpm} WPM.`
                  : `Target was ${lesson.targetWpm} WPM & 85% Accuracy. Keep practicing!`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetTest();
                setResultState(null);
                setInputVal("");
              }}
              className="text-xs font-bold gap-1 border-border cursor-pointer"
            >
              <RefreshCw size={13} /> Retry Lesson
            </Button>

            {resultState.passed && nextLesson && (
              <Button
                size="sm"
                onClick={() => onSelectNextLesson(nextLesson)}
                className="font-black text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
              >
                Continue to Lesson {lessonIndex + 2} ({nextLesson.title}) <ChevronRight size={14} />
              </Button>
            )}

            {resultState.passed && !nextLesson && (
              <Button
                size="sm"
                onClick={onClaimCert}
                className="font-black text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
              >
                Claim Certificate <Award size={14} />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Target Text Display Arena */}
      <Card className="border border-border bg-card shadow-xs rounded-2xl overflow-hidden">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-foreground">{lesson.title}</h2>
            <p className="text-xs text-muted-foreground">{lesson.subtitle}</p>
          </div>

          {/* Formatted Target Text Display */}
          <div className="p-6 rounded-xl border border-border bg-secondary/30 font-mono text-lg sm:text-xl leading-relaxed tracking-wide select-none break-words min-h-[100px] flex items-center flex-wrap gap-x-1">
            {targetText.split("").map((char, i) => {
              const typedChar = typedText[i];
              let colorClass = "text-muted-foreground/80";
              const isCurrent = i === typedText.length;

              if (typedChar !== undefined) {
                colorClass = typedChar === char ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-rose-500 dark:text-rose-400 bg-rose-500/10 rounded font-bold underline";
              }

              return (
                <span
                  key={i}
                  className={`${colorClass} ${
                    isCurrent ? "bg-primary text-primary-foreground font-black px-1 rounded ring-2 ring-primary/40 animate-pulse" : ""
                  }`}
                >
                  {char === " " ? "␣" : char}
                </span>
              );
            })}
          </div>

          {/* Interactive Typing Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-foreground">Type the letters displayed above:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetTest();
                  setResultState(null);
                  setInputVal("");
                }}
                className="text-muted-foreground hover:text-foreground text-xs gap-1 h-7"
              >
                <RefreshCw size={12} /> Reset Drill
              </Button>
            </div>

            <input
              type="text"
              value={inputVal}
              onKeyDown={(e) => {
                useTypingStore.getState().handleKeystroke(e.code, e.key, e.shiftKey);
              }}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              placeholder="Start typing here..."
              className="w-full px-5 py-4 rounded-xl border border-input bg-background text-foreground font-mono text-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
              autoFocus
            />
          </div>
        </CardContent>
      </Card>

      {/* Interactive Virtual Keyboard & Hand Placement Guide */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
          <Keyboard size={14} className="text-primary" />
          <span>Interactive Virtual Keyboard & Finger Guide</span>
        </h3>
        <VirtualKeyboard nextChar={currentNextChar} />
      </div>
    </div>
  );
}

export default function CourseDetailClient({ courseId }: { courseId: string }) {
  const meta = COURSE_METAS[courseId] || COURSE_METAS["english"];
  const router = useRouter();
  const { user } = useAuth();
  const { activeLayout, setActiveLayout } = useTypingStore();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showAuthGateModal, setShowAuthGateModal] = useState(false);
  const [unlockAll, setUnlockAll] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      // Automatically lock layout for this course
      setActiveLayout(meta.layout);
      
      // Fetch lessons for this category + layout
      const category = meta.layout === "english" ? "english" : "bangla";
      const lessonList = getLessonsByCategory(category, meta.layout);
      setLessons(lessonList);

      // Fetch user progress
      if (typeof window !== "undefined") {
        setProgress(getAllProgress());
      }
    });
  }, [meta.layout, setActiveLayout]);

  const passedCount = lessons.filter((l) => progress[l.id]?.passed).length;
  const percentComplete = lessons.length > 0 ? Math.round((passedCount / lessons.length) * 100) : 0;
  const isFullyCompleted = percentComplete === 100 && lessons.length > 0;

  // Next unlocked lesson calculation
  const nextUnlockedLesson = lessons.find((l, idx) => {
    if (idx === 0) return !progress[l.id]?.passed;
    return !!progress[lessons[idx - 1]?.id]?.passed && !progress[l.id]?.passed;
  }) || lessons[0];

  // Calculate average WPM across passed lessons
  const passedWpmList = lessons.map((l) => progress[l.id]?.bestWpm || 0).filter((w) => w > 0);
  const avgCourseWpm = passedWpmList.length > 0 ? Math.round(passedWpmList.reduce((a, b) => a + b, 0) / passedWpmList.length) : 45;

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in text-foreground">

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Back to Courses Catalog
        </Link>
        <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary flex items-center gap-1.5">
          <Lock size={12} />
          <span>Active Layout Locked: <strong>{meta.layout.toUpperCase()}</strong></span>
        </Badge>
      </div>

      {/* 100% Course Completion Celebration Banner */}
      {isFullyCompleted && (
        <div className="border-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shrink-0 shadow-xs">
              <Trophy size={26} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-300">
                <CheckCircle2 size={12} /> 100% Course Mastered
              </div>
              <h2 className="text-xl font-black text-foreground mt-1">🎉 Course Completed! Claim Your Certificate</h2>
              <p className="text-xs text-muted-foreground">You passed all {lessons.length} lessons in {meta.title}. Claim your official certificate below.</p>
            </div>
          </div>

          <Button onClick={() => setShowCertModal(true)} size="lg" className="font-black text-xs gap-2 h-11 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shrink-0 cursor-pointer">
            <Award size={16} /> Claim Course Certificate
          </Button>
        </div>
      )}

      {/* Course Hero Banner */}
      <div className="border border-border bg-card rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 bg-grid-pattern">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{meta.flag}</span>
              <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary">
                {meta.badge}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-foreground">{meta.title}</h1>
            <p className="text-xs font-bold text-muted-foreground">{meta.titleBn}</p>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">{meta.desc}</p>

            {/* Primary Start / Continue Action Button */}
            <div className="pt-3 flex items-center gap-3 flex-wrap">
              {passedCount < lessons.length && nextUnlockedLesson && (
                <Button
                  size="lg"
                  onClick={() => {
                    if (!user) {
                      setShowAuthGateModal(true);
                      return;
                    }
                    const targetIdx = lessons.findIndex(l => l.id === nextUnlockedLesson.id) + 1;
                    router.push(`/courses/${courseId}/lesson-${targetIdx}`);
                  }}
                  className="font-black text-xs sm:text-sm gap-2 h-12 px-6 bg-primary text-primary-foreground shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Play size={16} className="fill-current text-primary-foreground" />
                  {passedCount === 0 
                    ? `Start Course (Lesson 1: ${lessons[0]?.title || "Home Row"})` 
                    : `Continue Course: ${nextUnlockedLesson?.title}`}
                </Button>
              )}

              {passedCount > 0 && (
                <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 text-xs flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> {passedCount} / {lessons.length} Lessons Passed
                </Badge>
              )}
            </div>
          </div>

          <div className="text-right shrink-0 space-y-1">
            <div className="text-xs font-bold text-muted-foreground">Course Completion</div>
            <div className="text-3xl font-black text-foreground">{percentComplete}%</div>
            <div className="text-[10px] text-muted-foreground font-semibold">{passedCount} of {lessons.length} Lessons Passed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border">
          <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${percentComplete || 2}%` }} />
        </div>
      </div>

      {/* If an active lesson is selected to play, launch clean Course Practice Arena */}
      {activeLesson ? (
        (() => {
          const currentIdx = lessons.findIndex((l) => l.id === activeLesson.id);
          const nextLesson = lessons[currentIdx + 1];
          return (
            <CoursePracticeArena
              lesson={activeLesson}
              courseTitle={meta.title}
              totalLessons={lessons.length}
              lessonIndex={currentIdx !== -1 ? currentIdx : 0}
              nextLesson={nextLesson}
              onBack={() => {
                setActiveLesson(null);
                if (typeof window !== "undefined") setProgress(getAllProgress());
              }}
              onSelectNextLesson={(next) => setActiveLesson(next)}
              onClaimCert={() => setShowCertModal(true)}
            />
          );
        })()
      ) : (
        <>
          {/* Virtual Keyboard Preview */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Keyboard size={16} className="text-foreground" />
                <h3 className="text-sm font-extrabold text-foreground">Interactive Keymap Reference</h3>
              </div>
              <span className="text-xs text-muted-foreground font-semibold">Layout: {meta.layout.toUpperCase()}</span>
            </div>
            <VirtualKeyboard />
          </div>

          {/* Lesson Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-foreground">Course Curriculum</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Lessons unlock sequentially as you pass target WPM goals</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">{lessons.length} Total Lessons</span>
                <button
                  type="button"
                  onClick={() => setUnlockAll(!unlockAll)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all border flex items-center gap-1 cursor-pointer ${
                    unlockAll
                      ? "bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400"
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {unlockAll ? <Sparkles size={12} /> : <Lock size={12} />}
                  <span>{unlockAll ? "Unlocked All" : "Sequential Lock"}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessons.map((lesson, idx) => {
                const prog = progress[lesson.id];
                const isPassed = !!prog?.passed;
                const bestWpm = prog?.bestWpm || 0;

                const isUnlocked = unlockAll || idx === 0 || (idx > 0 && !!progress[lessons[idx - 1]?.id]?.passed) || isPassed;

                return (
                  <Card
                    key={lesson.id}
                    className={`border transition-all rounded-xl shadow-xs flex flex-col justify-between ${
                      isPassed
                        ? "border-foreground bg-card"
                        : isUnlocked
                        ? "border-border bg-card hover:border-foreground/50"
                        : "border-border/60 bg-secondary/40 opacity-75"
                    }`}
                  >
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-foreground">
                          LESSON {idx + 1}
                        </span>
                        {isPassed ? (
                          <Badge className="bg-primary text-primary-foreground text-[10px] font-bold gap-1">
                            <CheckCircle2 size={11} /> Passed ({bestWpm} WPM)
                          </Badge>
                        ) : isUnlocked ? (
                          <Badge variant="outline" className="border-border text-muted-foreground font-bold text-[10px]">
                            Target: {lesson.targetWpm} WPM
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-border/80 text-muted-foreground/80 font-bold text-[10px] gap-1 bg-secondary">
                            <Lock size={10} /> Locked (Pass Lesson {idx})
                          </Badge>
                        )}
                      </div>

                      <div>
                        <h3 className={`text-base font-black ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>{lesson.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{lesson.subtitle}</p>
                      </div>

                      <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                        <span className="font-mono text-[11px] text-muted-foreground truncate max-w-[150px]">
                          Keys: {lesson.focusKeys || "All"}
                        </span>

                        {isUnlocked ? (
                          <Link href={`/courses/${courseId}/lesson-${idx + 1}`}>
                            <Button
                              size="sm"
                              className="font-bold text-xs h-8 px-3 rounded-md cursor-pointer"
                            >
                              {isPassed ? "Practice Again" : "Start Lesson →"}
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            size="sm"
                            disabled
                            variant="secondary"
                            className="font-bold text-xs h-8 px-3 rounded-md opacity-60 flex items-center gap-1 cursor-not-allowed"
                          >
                            <Lock size={11} /> Locked
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Course Completion Certificate Modal */}
      {showCertModal && (
        <ExamCertificateModal
          isOpen={true}
          onClose={() => setShowCertModal(false)}
          result={{
            wpm: avgCourseWpm,
            accuracy: 96,
            layout: meta.layout,
            duration: 300,
            errors: 0,
            language: meta.layout === "english" ? "english" : "bangla",
            candidateName: user?.displayName || "Typing Course Graduate",
          }}
        />
      )}
      {/* Auth Gate Modal */}
      <AuthModal
        isOpen={showAuthGateModal}
        onClose={() => setShowAuthGateModal(false)}
        initialMode="signup"
      />
    </main>
  );
}
