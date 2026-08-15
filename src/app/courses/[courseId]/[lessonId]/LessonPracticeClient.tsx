"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, CheckCircle2, Sparkles, Keyboard, Trophy,
  Award, ChevronRight, RefreshCw, Lock, Play
} from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { useTypingStore, KeyboardLayout } from "../../../../store/typingStore";
import {
  getLessonsByCategory,
  getAllProgress,
  saveLessonProgress,
  Lesson,
  LessonProgress,
} from "../../../../utils/lessons";
import VirtualKeyboard from "../../../../components/VirtualKeyboard";
import { ExamCertificateModal } from "../../../../components/ExamCertificateModal";
import { CourseCompletionModal } from "../../../../components/CourseCompletionModal";
import { useAuth } from "../../../../context/AuthContext";
import { AuthModal } from "../../../../components/AuthModal";

interface CourseMeta {
  id: string;
  layout: KeyboardLayout;
  title: string;
  titleBn: string;
  badge: string;
  flag: string;
}

const COURSE_METAS: Record<string, CourseMeta> = {
  english: {
    id: "english",
    layout: "english",
    title: "English QWERTY Full Keyboard Course",
    titleBn: "ইংরেজি সম্পূর্ণ কীবোর্ড কোর্স",
    badge: "QWERTY Standard",
    flag: "🇺🇸",
  },
  avro: {
    id: "avro",
    layout: "avro",
    title: "Avro Phonetic Bangla Full Course",
    titleBn: "অভ্র ফোনেটিক বাংলা সম্পূর্ণ কোর্স",
    badge: "Phonetic Popular",
    flag: "🇧🇩",
  },
  unibijoy: {
    id: "unibijoy",
    layout: "unibijoy",
    title: "UniBijoy Full Course (Bijoy 52)",
    titleBn: "ইউনিবিজয় সম্পূর্ণ কোর্স",
    badge: "Publishing Standard",
    flag: "🇧🇩",
  },
  jatiya: {
    id: "jatiya",
    layout: "jatiya",
    title: "Jatiya BCC Full Course",
    titleBn: "জাতীয় কীবোর্ড সরকারি কোর্স",
    badge: "Govt Job Standard",
    flag: "🏛️",
  },
  probhat: {
    id: "probhat",
    layout: "probhat",
    title: "Probhat Layout Full Course",
    titleBn: "প্রভাত কীবোর্ড সম্পূর্ণ কোর্স",
    badge: "Intuitive Map",
    flag: "🇧🇩",
  },
  inscript: {
    id: "inscript",
    layout: "inscript",
    title: "Inscript Bangla Full Course",
    titleBn: "ইনস্ক্রিপ্ট বাংলা সম্পূর্ণ কোর্স",
    badge: "India National Standard",
    flag: "🇮🇳",
  },
};

export default function LessonPracticeClient({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) {
  const router = useRouter();
  const meta = COURSE_METAS[courseId] || COURSE_METAS["english"];
  const { user } = useAuth();
  const {
    setActiveLayout,
    setTargetText,
    isCompleted,
    elapsedTime,
    typedText,
    targetText,
    resetTest,
  } = useTypingStore();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [showCertModal, setShowCertModal] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [resultState, setResultState] = useState<{
    wpm: number;
    accuracy: number;
    passed: boolean;
  } | null>(null);

  useEffect(() => {
    if (!user) {
      setAuthModalOpen(true);
    }
  }, [user]);

  useEffect(() => {
    queueMicrotask(() => {
      setActiveLayout(meta.layout);
      const category = meta.layout === "english" ? "english" : "bangla";
      const lessonList = getLessonsByCategory(category, meta.layout);
      setLessons(lessonList);

      // Resolve lesson by index or ID
      let foundIdx = -1;
      if (lessonId.startsWith("lesson-") || !isNaN(Number(lessonId))) {
        const parsedNum = parseInt(lessonId.replace("lesson-", ""), 10);
        if (!isNaN(parsedNum) && parsedNum >= 1 && parsedNum <= lessonList.length) {
          foundIdx = parsedNum - 1;
        }
      }

      if (foundIdx === -1) {
        foundIdx = lessonList.findIndex((l) => l.id === lessonId);
      }

      if (foundIdx === -1) foundIdx = 0;

      setLessonIndex(foundIdx);
      const lessonObj = lessonList[foundIdx] || lessonList[0];
      setActiveLesson(lessonObj);

      if (lessonObj) {
        setTargetText(
          lessonObj.text,
          lessonObj.focusKeys,
          lessonObj.type,
          lessonObj.inputLanguage,
          lessonObj.outputPreview
        );
      }
      setInputVal("");
      setResultState(null);
    });
  }, [meta.layout, courseId, lessonId, setActiveLayout, setTargetText]);

  const nextLesson = lessons[lessonIndex + 1];
  const nextLessonUrl = nextLesson ? `/courses/${courseId}/lesson-${lessonIndex + 2}` : null;

  useEffect(() => {
    if (!isCompleted || !elapsedTime || !typedText || !activeLesson) return;

    const totalChars = typedText.length;
    const elapsedMinutes = elapsedTime / 60;

    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, targetText.length); i++) {
      if (typedText[i] === targetText[i]) correctChars++;
    }
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    const netWpm = elapsedMinutes > 0 ? Math.max(0, Math.round((correctChars / 5) / elapsedMinutes)) : 0;
    const passed = netWpm >= activeLesson.targetWpm && accuracy >= 85;

    saveLessonProgress(activeLesson.id, netWpm, accuracy, {
      targetWpm: activeLesson.targetWpm,
      targetAccuracy: 85,
    });

    queueMicrotask(() => {
      setResultState({ wpm: netWpm, accuracy, passed });
      if (passed && !nextLesson) {
        setShowCelebrationModal(true);
      }
    });
  }, [isCompleted, elapsedTime, typedText, targetText, activeLesson, nextLesson]);

  if (!activeLesson) {
    return null;
  }

  const currentNextChar = targetText[typedText.length] || "";

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-in text-foreground">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <Link
          href={`/courses/${courseId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to {meta.title}
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="border-border text-foreground font-mono text-xs px-3 py-1 bg-secondary">
            LESSON {lessonIndex + 1} OF {lessons.length}: {activeLesson.title}
          </Badge>
          <Badge variant="outline" className="border-primary/40 text-primary font-bold text-xs px-3 py-1 bg-primary/10">
            Target: {activeLesson.targetWpm} WPM
          </Badge>
        </div>
      </div>

      {/* Lesson Passed / Goal Missed Result Banner */}
      {resultState && (
        <div
          className={`p-6 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md transition-all ${
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
                  ? `Great job! You met the target goal of ${activeLesson.targetWpm} WPM.`
                  : `Target was ${activeLesson.targetWpm} WPM & 85% Accuracy. Keep practicing!`}
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

            {resultState.passed && nextLessonUrl && (
              <Link href={nextLessonUrl}>
                <Button
                  size="sm"
                  className="font-black text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
                >
                  Continue to Lesson {lessonIndex + 2} ({nextLesson.title}) <ChevronRight size={14} />
                </Button>
              </Link>
            )}

            {resultState.passed && !nextLessonUrl && (
              <Button
                size="sm"
                onClick={() => setShowCertModal(true)}
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
            <h2 className="text-xl font-black text-foreground">{activeLesson.title}</h2>
            <p className="text-xs text-muted-foreground">{activeLesson.subtitle}</p>
          </div>

          {/* Formatted Target Text Display */}
          <div className="p-6 rounded-xl border border-border bg-secondary/30 font-mono text-lg sm:text-xl leading-relaxed tracking-wide select-none break-words min-h-[100px] flex items-center flex-wrap gap-x-1">
            {targetText.split("").map((char, i) => {
              const typedChar = typedText[i];
              let colorClass = "text-muted-foreground/80";
              const isCurrent = i === typedText.length;

              if (typedChar !== undefined) {
                colorClass =
                  typedChar === char
                    ? "text-emerald-600 dark:text-emerald-400 font-bold"
                    : "text-rose-500 dark:text-rose-400 bg-rose-500/10 rounded font-bold underline";
              }

              return (
                <span
                  key={i}
                  className={`${colorClass} ${
                    isCurrent
                      ? "bg-primary text-primary-foreground font-black px-1 rounded ring-2 ring-primary/40 animate-pulse"
                      : ""
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

      {/* Course Completion Certificate Modal */}
      {/* Course Completion Celebration Modal */}
      <CourseCompletionModal
        isOpen={showCelebrationModal}
        onClose={() => setShowCelebrationModal(false)}
        courseTitle={meta.title}
        wpm={resultState?.wpm || 45}
        accuracy={resultState?.accuracy || 95}
        onClaimCertificate={() => setShowCertModal(true)}
      />

      {showCertModal && (
        <ExamCertificateModal
          isOpen={true}
          onClose={() => setShowCertModal(false)}
          result={{
            wpm: resultState?.wpm || 45,
            accuracy: resultState?.accuracy || 95,
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
        isOpen={authModalOpen || !user}
        onClose={() => {
          setAuthModalOpen(false);
          if (!user) router.push(`/courses/${courseId}`);
        }}
        initialMode="signup"
      />
    </main>
  );
}
