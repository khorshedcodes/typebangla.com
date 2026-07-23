"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { getLessonsByCategory } from "../../../utils/lessons";
import {
  RotateCcw, Volume2, VolumeX, ArrowLeft,
  ChevronLeft, ChevronRight, Gauge, Trophy,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import Link2 from "next/link";

interface Props {
  layout: KeyboardLayout;
}

const LAYOUT_NAMES: Record<KeyboardLayout, string> = {
  avro: "অভ্র ফোনেটিক",
  unibijoy: "ইউনিবিজয়",
  jatiya: "জাতীয় কিবোর্ড",
  probhat: "প্রভাত",
  inscript: "ইনস্ক্রিপ্ট",
  unicode: "ইউনিকোড",
  english: "English QWERTY",
};

const LEVEL_LABEL: Record<string, string> = {
  beginner:     "শিক্ষার্থী",
  intermediate: "মধ্যবর্তী",
  advanced:     "উন্নত",
  mastery:      "দক্ষ",
};

const LEVEL_COLOR: Record<string, string> = {
  beginner:     "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
  intermediate: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
  advanced:     "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
  mastery:      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900",
};

export default function LayoutPracticeClient({ layout }: Props) {
  const router = useRouter();

  const {
    targetText, typedText, setTargetText,
    activeLayout, setActiveLayout,
    isStarted, isCompleted, elapsedTime,
    resetTest, updateElapsedTime,
    errorIndices, isRecapTest, startRecapTest, exitRecapTest,
    soundEnabled, setSoundEnabled,
  } = useTypingStore();

  // Sync layout
  useEffect(() => {
    if (layout && activeLayout !== layout) setActiveLayout(layout);
  }, [layout, activeLayout, setActiveLayout]);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStarted && !isCompleted) {
      interval = setInterval(() => updateElapsedTime(), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isStarted, isCompleted, updateElapsedTime]);

  // Lesson list
  const category = layout === "english" ? "english" : "bangla";
  const lessons = getLessonsByCategory(category, layout);
  const activeLessonIndex = lessons.findIndex((l) => l.text === targetText);
  const activeLesson = activeLessonIndex >= 0 ? lessons[activeLessonIndex] : lessons[0];

  // Auto-load first lesson on mount if nothing selected
  useEffect(() => {
    if (!targetText && lessons.length > 0) {
      const first = lessons[0];
      setTargetText(first.text, first.focusKeys, first.type, first.inputLanguage, first.outputPreview);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  const goToLesson = (index: number) => {
    const lesson = lessons[index];
    if (!lesson) return;
    setTargetText(lesson.text, lesson.focusKeys, lesson.type, lesson.inputLanguage, lesson.outputPreview);
    resetTest();
  };

  const nextChar = targetText[typedText.length] || "";
  const finalWpm = Math.round((typedText.length / 5) / (elapsedTime / 60 || 1));
  const finalAccuracy = Math.round(((typedText.length - errorIndices.length) / (typedText.length || 1)) * 100);
  const progress = isStarted ? Math.min(100, Math.round((typedText.length / (targetText.length || 1)) * 100)) : 0;
  const passed = finalWpm >= (activeLesson?.targetWpm ?? 0) && finalAccuracy >= 95;

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-4 space-y-3 fade-in">

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  ONE CLEAN MERGED HEADER — back · lesson nav · controls    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">

        {/* Row 1: back link + layout badge + right controls */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Link href="/practice">
              <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft size={13} />
                <span className="hidden sm:inline">সব লেআউট</span>
              </Button>
            </Link>
            {/* Layout badge — click to go back and switch */}
            <Link href="/practice">
              <Badge
                variant="outline"
                className="text-[11px] font-bold cursor-pointer bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100 transition-colors"
                title="লেআউট পরিবর্তন করতে ক্লিক করুন"
              >
                {LAYOUT_NAMES[layout]}
              </Badge>
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <Link href="/govt-job-typing-test">
              <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs font-bold gap-1 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 hidden sm:flex">
                <Gauge size={13} />
                পরীক্ষা দিন
              </Button>
            </Link>
            <Button
              variant="ghost" size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`h-8 px-2 ${soundEnabled ? "text-emerald-600" : "text-muted-foreground"}`}
              title={soundEnabled ? "সাউন্ড বন্ধ করুন" : "সাউন্ড চালু করুন"}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </Button>
            <Button
              variant="ghost" size="sm"
              onClick={resetTest}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              title="আবার শুরু করুন"
            >
              <RotateCcw size={13} />
            </Button>
          </div>
        </div>

        {/* Row 2: Prev ← Lesson title (clean) → Next  +  meta info */}
        <div className="flex items-center gap-2 px-3 py-2.5">
          {/* Prev */}
          <Button
            variant="ghost" size="sm"
            disabled={activeLessonIndex <= 0}
            onClick={() => goToLesson(activeLessonIndex - 1)}
            className="h-8 w-8 p-0 shrink-0 text-muted-foreground disabled:opacity-30"
            title="আগের পাঠ"
          >
            <ChevronLeft size={16} />
          </Button>

          {/* Lesson info — center, clean text only */}
          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Counter */}
              <span className="text-[11px] font-extrabold text-muted-foreground shrink-0">
                পাঠ {activeLessonIndex + 1}/{lessons.length}
              </span>
              {/* Clean title — no key codes */}
              <span className="text-sm font-extrabold text-foreground truncate">
                {activeLesson?.title ?? "লোড হচ্ছে..."}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Level badge */}
              {activeLesson?.level && (
                <Badge variant="outline" className={`text-[10px] font-bold ${LEVEL_COLOR[activeLesson.level]}`}>
                  {LEVEL_LABEL[activeLesson.level]}
                </Badge>
              )}
              {/* Target WPM */}
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                লক্ষ্য: {activeLesson?.targetWpm ?? "—"} WPM
              </span>
              {/* Live progress bar */}
              {isStarted && progress > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <div className="w-20 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span>{progress}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Next */}
          <Button
            variant="ghost" size="sm"
            disabled={activeLessonIndex >= lessons.length - 1}
            onClick={() => goToLesson(activeLessonIndex + 1)}
            className="h-8 w-8 p-0 shrink-0 text-emerald-600 dark:text-emerald-400 disabled:opacity-30"
            title="পরের পাঠ"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* ── TYPING CANVAS ── */}
      <div className="space-y-4">
        <TypingArea />
        <VirtualKeyboard nextChar={nextChar} />
      </div>

      {/* ── COMPLETION MODAL ── */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={resetTest} />
          <Card className="relative z-50 w-full max-w-sm border border-border shadow-2xl bg-card">
            <CardHeader className="text-center pb-2">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border-2 ${passed ? "bg-emerald-50 border-emerald-300 text-emerald-600 dark:bg-emerald-950/50 dark:border-emerald-700" : "bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/50 dark:border-amber-700"}`}>
                <Trophy size={24} />
              </div>
              <CardTitle className="text-lg font-extrabold">
                {isRecapTest ? "রিক্যাপ সম্পন্ন!" : "পাঠ সম্পন্ন! 🎉"}
              </CardTitle>
              <CardDescription className="text-xs">
                {activeLesson?.title} — পাঠ {activeLessonIndex + 1}/{lessons.length}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pb-5 px-5">
              {/* Score Grid */}
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-border">
                <div className="text-center">
                  <div className={`text-3xl font-extrabold ${finalWpm >= (activeLesson?.targetWpm ?? 0) ? "text-emerald-600" : "text-foreground"}`}>
                    {Math.max(0, finalWpm)}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">WPM</div>
                  <div className="text-[9px] text-muted-foreground">লক্ষ্য {activeLesson?.targetWpm}</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-extrabold ${finalAccuracy >= 95 ? "text-emerald-600" : "text-foreground"}`}>
                    {Math.max(0, Math.min(100, finalAccuracy))}%
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">নির্ভুলতা</div>
                  <div className="text-[9px] text-muted-foreground">লক্ষ্য ৯৫%</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-foreground">{elapsedTime}s</div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">সময়</div>
                  <div className="text-[9px] text-muted-foreground">{errorIndices.length} ভুল</div>
                </div>
              </div>

              {/* Pass / Try again message */}
              {passed ? (
                <p className="text-xs text-center text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-lg py-2.5">
                  ✅ লক্ষ্য পূরণ! পরের পাঠে যাওয়ার জন্য প্রস্তুত।
                </p>
              ) : (
                <p className="text-xs text-center text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg py-2.5">
                  💪 আরও চেষ্টা করুন — লক্ষ্য {activeLesson?.targetWpm} WPM ও ৯৫% নির্ভুলতা
                </p>
              )}
            </CardContent>

            <div className="flex gap-2 px-5 pb-5">
              {isRecapTest ? (
                <>
                  <Button variant="outline" onClick={resetTest} className="flex-1 text-xs">আবার চেষ্টা</Button>
                  <Button onClick={exitRecapTest} className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white">ফিরে যান</Button>
                </>
              ) : activeLessonIndex < lessons.length - 1 ? (
                <>
                  <Button variant="outline" onClick={resetTest} className="flex-1 text-xs">আবার করুন</Button>
                  <Button
                    onClick={() => { resetTest(); goToLesson(activeLessonIndex + 1); }}
                    className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    পরের পাঠ →
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={resetTest} className="flex-1 text-xs">আবার করুন</Button>
                  <Link href="/govt-job-typing-test" className="flex-1">
                    <Button className="w-full text-xs bg-amber-600 hover:bg-amber-700 text-white">
                      পরীক্ষা দিন →
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
