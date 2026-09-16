/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Target,
  RotateCcw,
  Lock,
  Zap,
  Trophy,
  FileText,
  Sparkles,
  BookMarked
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const BANGLA_LITERARY_PASSAGES = [
  {
    id: "bn-lit-1",
    title: "সোনার তরী — রবীন্দ্রনাথ ঠাকুর",
    text: "গগনে গরজে মেঘ, ঘন বরষা। কূলে একা বসে আছি, নাহি ভরসা। রাশি রাশি ভারা ভারা ধান কাটা হল সারা, ভরা নদী ক্ষুরধারা খরপরশা। কাটিতে কাটিতে ধান এল বরষা।",
    subtitle: "Classic poem excerpt by Rabindranath Tagore"
  },
  {
    id: "bn-lit-2",
    title: "বিদ্রোহী — কাজী নজরুল ইসলাম",
    text: "বল বীর— বল উন্নত মম শির! শির নেহারি’ আমারি, নত-শির ওই শিখর হিমাদ্রির! বল বীর— বল মহাবিশ্বের মহাকাশ ফাড়ি’, চন্দ্র সূর্য গ্রহ তারা আর্ট ফাড়ি’",
    subtitle: "Classic poem excerpt by Kazi Nazrul Islam"
  },
  {
    id: "bn-lit-3",
    title: "বাংলার মুখ আমি দেখিয়াছি — জীবনানন্দ দাশ",
    text: "বাংলার মুখ আমি দেখিয়াছি, তাই আমি পৃথিবীর রূপ খুঁজিতে যাই না আর; অন্ধকারে জেগে উঠে ডুমুরের গাছে চেয়ে দেখি ছাতাটির মতন পাতাটি তার",
    subtitle: "Classic poem excerpt by Jibanananda Das"
  }
];

const BANGLA_CONTEMPORARY_PASSAGES = [
  {
    id: "bn-cont-1",
    title: "ডিজিটাল প্রযুক্তি ও ফ্রিল্যান্সিং ক্যারিয়ার",
    text: "বাংলাদেশে ফ্রিল্যান্সিং ও অনলাইন আউটসোর্সিং তরুণ প্রজন্মের কর্মসংস্থানের নতুন দিগন্ত উন্মোচন করেছে। প্রতিনিয়ত ওয়েব ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং ও গ্রাফিক ডিজাইনে হাজার হাজার তরুণ নিজেদের আত্মকর্মসংস্থান গড়ে তুলছে।",
    subtitle: "Tech & Economy article"
  },
  {
    id: "bn-cont-2",
    title: "স্মার্ট বাংলাদেশ ও ই-গভর্নেন্স",
    text: "নাগরিক সেবা সহজীকরণে সরকারি দপ্তরসমূহে তথ্যপ্রযুক্তির সংযোজন প্রশাসনিক স্বচ্ছতা নিশ্চিত করছে। ঘরে বসে ই-সেবা গ্রহণের মাধ্যমে সময় ও অর্থ উভয়ের সাশ্রয় হচ্ছে।",
    subtitle: "Government technology initiative"
  }
];

const ENGLISH_LITERARY_PASSAGES = [
  {
    id: "en-lit-1",
    title: "Stopping by Woods — Robert Frost",
    text: "The woods are lovely, dark and deep, But I have promises to keep, And miles to go before I sleep, And miles to go before I sleep.",
    subtitle: "Classic English poem excerpt"
  }
];

const ENGLISH_CONTEMPORARY_PASSAGES = [
  {
    id: "en-cont-1",
    title: "Tech Blog: Artificial Intelligence",
    text: "Artificial intelligence is reshaping the tech landscape, enabling developers to build smarter applications and automate complex codebases.",
    subtitle: "Technology article"
  },
  {
    id: "en-cont-2",
    title: "Software Documentation & Deployments",
    text: "To deploy the project to production, run the build command and verify that all static assets are compiled correctly without build errors.",
    subtitle: "Software documentation"
  }
];

function isLessonUnlocked(
  lesson: Lesson,
  progress: Record<string, LessonProgress>,
  lessonList: Lesson[]
): boolean {
  if (lesson.order <= 1) return true;
  const prev = lessonList.find((l) => l.order === lesson.order - 1);
  if (!prev) return true;
  return !!progress[prev.id]?.passed;
}

interface LessonSelectorProps {
  initialLessonId?: string;
}

export default function LessonSelector({ initialLessonId }: LessonSelectorProps = {}) {
  const { 
    setTargetText, 
    isCompleted, 
    elapsedTime, 
    startTime,
    typedText, 
    targetText, 
    resetTest, 
    activeLayout,
    problematicPairs
  } = useTypingStore();

  const [selectedCategory, setSelectedCategory] = useState<LessonCategory>("bangla");
  const [mainMode, setMainMode] = useState<"curriculum" | "passages">("curriculum");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<1 | 2 | 3>(1);
  const [passageType, setPassageType] = useState<"literary" | "contemporary" | "weakKey">("literary");
  
  const [activeLessonId, setActiveLessonId] = useState<string>("bn-avro-001");
  const [activePassageId, setActivePassageId] = useState<string>("");
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isGridExpanded, setIsGridExpanded] = useState(false);

  const generateSynthesizedDrill = useCallback(() => {
    if (selectedCategory === "bangla") {
      const weakLetters = problematicPairs.map(p => p.split("-")[0]).filter(Boolean);
      if (weakLetters.length > 0) {
        const repeats = weakLetters.slice(0, 3);
        const segments = [];
        for (let i = 0; i < 6; i++) {
          const letter = repeats[Math.floor(Math.random() * repeats.length)];
          segments.push(`${letter}া${letter} ${letter}ি${letter}্${letter} ${letter}ো${letter}`);
        }
        return `AI দুর্বল কিপ্যাড ড্রিল: ${segments.join(" ")} ক্ষতিকর ক্ষারক জ্ঞান কাঞ্চনজঙ্ঘা`;
      }
      return "AI যুক্তাক্ষর চ্যালেঞ্জ ড্রিল: পরীক্ষা পরীক্ষার্থী ক্ষতিকর ক্ষারক বিজ্ঞানীর জ্ঞান অর্জনের গৌরবে কাঞ্চনজঙ্ঘা শক্ত রক্তদান";
    } else {
      const weakKeys = problematicPairs.map(p => p.split("-")[0].toLowerCase()).filter(Boolean);
      if (weakKeys.length > 0) {
        const repeats = weakKeys.slice(0, 3);
        const segments = [];
        for (let i = 0; i < 6; i++) {
          const k = repeats[Math.floor(Math.random() * repeats.length)];
          segments.push(`${k}a${k} ${k}e${k} ${k}o${k}`);
        }
        return `AI Key Drill: ${segments.join(" ")} system architecture optimization deployment`;
      }
      return "AI Speed Drill: quick brown fox jumps over the lazy dog system architecture performance test";
    }
  }, [selectedCategory, problematicPairs]);

  useEffect(() => {
    const isEng = activeLayout === "english";
    setSelectedCategory(isEng ? "english" : "bangla");
  }, [activeLayout]);

  useEffect(() => {
    const saved = getAllProgress();
    setProgress(saved);

    const lessons = getLessonsByCategory(selectedCategory, activeLayout);
    if (lessons.length > 0) {
      const target = initialLessonId ? lessons.find((l) => l.id === initialLessonId) : null;
      const savedActiveId = typeof window !== "undefined" ? localStorage.getItem("last_active_lesson_id") : null;
      const initial = target || lessons.find((l) => l.id === savedActiveId) || lessons[0];
      setActiveLessonId(initial.id);
      setTargetText(
        initial.text,
        initial.focusKeys,
        initial.type,
        initial.inputLanguage,
        initial.outputPreview
      );
    }
  }, [selectedCategory, activeLayout, initialLessonId]);

  useEffect(() => {
    if (!isCompleted || !typedText || mainMode !== "curriculum") return;

    const allLessons = getLessonsByCategory(selectedCategory, activeLayout);
    const lesson = allLessons.find((l) => l.id === activeLessonId);
    if (!lesson) return;

    const totalChars = typedText.length;
    const durationSec = startTime ? Math.max(1, (Date.now() - startTime) / 1000) : Math.max(1, elapsedTime);
    const elapsedMinutes = durationSec / 60;
    const grossWpm = Math.round(totalChars / 5 / elapsedMinutes);

    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, targetText.length); i++) {
      if (typedText[i] === targetText[i]) correctChars++;
    }
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    const updated = saveLessonProgress(lesson.id, grossWpm, accuracy, { targetWpm: lesson.targetWpm, targetAccuracy: 85 });
    setProgress((prev) => ({ ...prev, [lesson.id]: updated }));
  }, [isCompleted, startTime, elapsedTime, typedText, targetText, activeLessonId, selectedCategory, activeLayout, mainMode]);

  const allLessons = getLessonsByCategory(selectedCategory, activeLayout);
  
  const currentLevelLessons = allLessons.filter((l) => {
    if (selectedLevelFilter === 1) return l.level === "beginner";
    if (selectedLevelFilter === 2) return l.level === "intermediate" || l.level === "advanced";
    return l.level === "mastery";
  });

  const activeLessonIndex = currentLevelLessons.findIndex(l => l.id === activeLessonId);

  const completion = getCourseCompletion(selectedCategory, activeLayout);

  const handleSelectLesson = (lesson: Lesson) => {
    if (!isLessonUnlocked(lesson, progress, allLessons)) return;
    setActiveLessonId(lesson.id);
    if (typeof window !== "undefined") localStorage.setItem("last_active_lesson_id", lesson.id);
    setTargetText(
      lesson.text,
      lesson.focusKeys,
      lesson.type,
      lesson.inputLanguage,
      lesson.outputPreview
    );
    setIsGridExpanded(false);
    resetTest();
  };

  const handleSelectPassage = (id: string, text: string) => {
    setActivePassageId(id);
    const isEng = selectedCategory === "english";
    setTargetText(
      text,
      "all",
      "paragraph",
      isEng ? "latin" : (activeLayout === "avro" ? "bangla" : "latin"),
      ""
    );
    setIsGridExpanded(false);
    resetTest();
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      const prev = currentLevelLessons[activeLessonIndex - 1];
      if (prev) handleSelectLesson(prev);
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < currentLevelLessons.length - 1) {
      const next = currentLevelLessons[activeLessonIndex + 1];
      if (next && isLessonUnlocked(next, progress, allLessons)) handleSelectLesson(next);
    }
  };

  const handleClearProgress = () => {
    clearAllProgress();
    setProgress({});
    setShowClearConfirm(false);
  };

  return (
    <div className="border border-border rounded-xl bg-card p-4 sm:p-5 shadow-xs space-y-4 fade-in">
      
      {/* 1. SLIM HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Mode Switcher Pills */}
        <div className="inline-flex p-1 rounded-lg bg-secondary border border-border">
          <button
            onClick={() => setMainMode("curriculum")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mainMode === "curriculum" 
                ? "bg-primary text-primary-foreground shadow-xs" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen size={14} />
            <span>Guided Curriculum</span>
          </button>

          <button
            onClick={() => setMainMode("passages")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mainMode === "passages" 
                ? "bg-primary text-primary-foreground shadow-xs" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookMarked size={14} />
            <span>Passages & Drills</span>
          </button>
        </div>

        {/* Right: Quick Controls & Progress Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-secondary border border-border px-2.5 py-1 rounded-md text-xs font-bold text-foreground">
            <Trophy size={13} className="text-foreground" />
            <span>{completion.percentage}% Done</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsGridExpanded(!isGridExpanded)}
            className="h-8 px-2.5 text-xs font-medium gap-1.5 border-border"
          >
            <span>{isGridExpanded ? "Hide Cards" : "Browse All"}</span>
            {isGridExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowClearConfirm(!showClearConfirm)}
            title="Reset course progress"
            className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0 border-border"
          >
            <RotateCcw size={13} />
          </Button>
        </div>
      </div>

      {/* 2. COMPACT LESSON CONTROL BAR */}
      {mainMode === "curriculum" && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-secondary p-3 rounded-lg border border-border">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">Level:</span>
            <select
              value={selectedLevelFilter}
              onChange={(e) => setSelectedLevelFilter(Number(e.target.value) as 1 | 2 | 3)}
              className="bg-background text-foreground font-semibold border border-input rounded-md text-xs px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value={1}>Level 1: Basic Keys (স্বরবর্ণ ও ব্যঞ্জনবর্ণ)</option>
              <option value={2}>Level 2: Vowel Signs (কার ও ফলা)</option>
              <option value={3}>Level 3: Mastery (যুক্তাক্ষর দক্ষতা)</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <select
              value={activeLessonId}
              onChange={(e) => {
                const target = allLessons.find(l => l.id === e.target.value);
                if (target) handleSelectLesson(target);
              }}
              className="w-full bg-background text-foreground font-bold border border-input rounded-md text-xs px-3 py-1.5 focus:outline-none cursor-pointer truncate"
            >
              {currentLevelLessons.map((l, idx) => (
                <option key={l.id} value={l.id}>
                  {idx + 1}. {l.title} (Target: {l.targetWpm} WPM)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={activeLessonIndex <= 0}
              onClick={handlePrevLesson}
              className="h-8 px-2 text-xs gap-1 border-border"
              title="Previous Lesson"
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline">Prev</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={activeLessonIndex >= currentLevelLessons.length - 1}
              onClick={handleNextLesson}
              className="h-8 px-2 text-xs gap-1 border-border font-semibold"
              title="Next Lesson"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="p-3 bg-secondary border border-border rounded-md text-xs text-foreground flex items-center justify-between">
          <span>Are you sure you want to reset all lesson progress badges?</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setShowClearConfirm(false)} className="h-6 text-[10px]">Cancel</Button>
            <Button size="sm" variant="destructive" onClick={handleClearProgress} className="h-6 text-[10px]">Reset All</Button>
          </div>
        </div>
      )}

      {/* 3. EXPANDABLE LESSON CARDS GRID */}
      {isGridExpanded && mainMode === "curriculum" && (
        <div className="space-y-4 pt-2 animate-in fade-in duration-200 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>Select any card below to start practice:</span>
            <span>{currentLevelLessons.length} lessons in this level</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto p-1">
            {currentLevelLessons.map((lesson) => {
              const isUnlocked = isLessonUnlocked(lesson, progress, allLessons);
              const lessonProg = progress[lesson.id];
              const isSelected = activeLessonId === lesson.id;

              return (
                <Card
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`border transition-all cursor-pointer select-none relative overflow-hidden glass-card-hover ${
                    isSelected
                      ? "border-emerald-500 bg-secondary/90 ring-2 ring-emerald-500/30 shadow-md scale-[1.02]"
                      : isUnlocked
                      ? "border-border/80 bg-card hover:border-foreground/50 shadow-xs"
                      : "border-border/60 bg-secondary/40 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <CardContent className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground line-clamp-1">
                        {lesson.title}
                      </span>
                      {lessonProg?.passed ? (
                        <Check size={14} className="text-foreground shrink-0" />
                      ) : !isUnlocked ? (
                        <Lock size={13} className="text-muted-foreground shrink-0" />
                      ) : null}
                    </div>

                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {lesson.subtitle}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border">
                      <span>Target: {lesson.targetWpm} WPM</span>
                      {lessonProg && (
                        <span className="font-semibold text-foreground">
                          {lessonProg.bestWpm} WPM ({lessonProg.bestAccuracy}%)
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: PASSAGE & DRILL ARENA */}
      {mainMode === "passages" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "literary", label: "📖 Literary Classics" },
                { id: "contemporary", label: "📰 News & Technology" },
                { id: "weakKey", label: "⚡ AI Weak-Key Drill" },
              ].map((p) => {
                const isActive = passageType === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPassageType(p.id as "literary" | "contemporary" | "weakKey");
                      if (p.id === "weakKey") {
                        handleSelectPassage("ai-weak-key", generateSynthesizedDrill());
                      }
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                      isActive 
                        ? "bg-primary text-primary-foreground border-primary shadow-xs" 
                        : "bg-card border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsGridExpanded(!isGridExpanded)}
              className="h-8 text-xs font-medium gap-1 border-border"
            >
              <span>{isGridExpanded ? "Hide Passages" : "Browse Passages"}</span>
              {isGridExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
          </div>

          {passageType === "weakKey" && (
            <Card className="border border-border bg-secondary p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles size={15} className="text-foreground" />
                  <span>AI Targeted Keystroke Diagnostic Drill</span>
                </span>
                <Button 
                  size="sm" 
                  onClick={() => handleSelectPassage("ai-weak-key", generateSynthesizedDrill())}
                  className="h-7 text-xs"
                >
                  Regenerate Drill
                </Button>
              </div>
              <p className="text-xs text-foreground font-mono bg-background p-3 rounded-md border border-border leading-relaxed">
                {generateSynthesizedDrill()}
              </p>
            </Card>
          )}

          {isGridExpanded && passageType !== "weakKey" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto p-1 animate-in fade-in duration-200">
              {(selectedCategory === "bangla" 
                ? (passageType === "literary" ? BANGLA_LITERARY_PASSAGES : BANGLA_CONTEMPORARY_PASSAGES)
                : (passageType === "literary" ? ENGLISH_LITERARY_PASSAGES : ENGLISH_CONTEMPORARY_PASSAGES)
              ).map((p) => {
                const isSelected = activePassageId === p.id;
                return (
                  <Card
                    key={p.id}
                    onClick={() => handleSelectPassage(p.id, p.text)}
                    className={`border transition-all cursor-pointer p-3.5 space-y-2 ${
                      isSelected
                        ? "border-primary bg-secondary ring-1 ring-primary shadow-xs"
                        : "border-border bg-card hover:border-foreground/50 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-foreground">{p.title}</h4>
                      <Badge variant="outline" className="text-[10px]">
                        {p.text.length} Chars
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      &quot;{p.text}&quot;
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border">
                      <span>{p.subtitle}</span>
                      {isSelected && <span className="font-bold text-foreground">Active Passage</span>}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
