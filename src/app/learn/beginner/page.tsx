"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen, GraduationCap, Trophy, CheckCircle2, Lock,
  Play, ArrowRight, Star, Clock, Award, ShieldCheck,
  ChevronRight, Download, FileText, HelpCircle, RefreshCw,
  Sparkles, Check, ChevronDown, Activity, Zap
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

type TrackId = "avro" | "unibijoy" | "jatiya" | "english";

interface TrackInfo {
  id: TrackId;
  name: string;
  nameBn: string;
  badge: string;
  desc: string;
}

const TRACKS: TrackInfo[] = [
  { id: "avro", name: "Avro Phonetic", nameBn: "অভ্র ফোনেটিক", badge: "সবচেয়ে সহজ", desc: "ইংরেজি অক্ষরের সাহায্যে সহজ বাংলা টাইপিং" },
  { id: "unibijoy", name: "UniBijoy", nameBn: "ইউনিবিজয়", badge: "অফিসিয়াল", desc: "প্রথাগত বিজয় ৫২ কিবোর্ড স্টাইল" },
  { id: "jatiya", name: "Jatiya Standard", nameBn: "জাতীয় কীবোর্ড", badge: "Govt Job", desc: "বিসিসি অনুমোদিত সরকারি চাকরির কিবোর্ড" },
  { id: "english", name: "English QWERTY", nameBn: "ইংরেজি কোয়ার্টি", badge: "Standard", desc: "স্ট্যান্ডার্ড ইংরেজি টাচ-টাইপিং" },
];

interface LessonDef {
  id: number;
  module: string;
  moduleTitle: string;
  title: string;
  desc: string;
  duration: string;
  completed?: boolean;
  locked?: boolean;
  explanation: string;
  fingerGuide: string;
  keyDrill: string;
  wordDrill: string[];
  banglaDrill: string[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
  };
}

const BEGINNER_LESSONS: LessonDef[] = [
  {
    id: 1,
    module: "Module 1",
    moduleTitle: "Getting Started",
    title: "Lesson 1: What is Touch Typing?",
    desc: "কিবোর্ডের দিকে না তাকিয়ে টাইপ করার সঠিক কৌশল।",
    duration: "10 mins",
    completed: true,
    locked: false,
    explanation: "Touch typing is typing without looking at the keyboard. Muscle memory carries fingers to keys.",
    fingerGuide: "Keep eyes on screen. Relax hands.",
    keyDrill: "f j f j f j f j",
    wordDrill: ["fj", "jf", "fjf", "jfj"],
    banglaDrill: ["ক", "খ", "গ", "ঘ"],
    quiz: {
      question: "Which finger is placed on the F key?",
      options: ["Left Index Finger", "Left Ring Finger", "Right Thumb"],
      correct: 0,
    },
  },
  {
    id: 2,
    module: "Module 1",
    moduleTitle: "Getting Started",
    title: "Lesson 2: Posture & Finger Placement",
    desc: "বসার সঠিক ভঙ্গি এবং হোম রো-তে আঙুল স্থাপনের নিয়ম।",
    duration: "12 mins",
    completed: true,
    locked: false,
    explanation: "Sit upright with feet flat on the floor. Curved fingers rest gently on ASDF and JKL;.",
    fingerGuide: "Left hand on A-S-D-F, Right hand on J-K-L-;",
    keyDrill: "a s d f j k l ;",
    wordDrill: ["asdf", "jkl;", "asdfjkl;"],
    banglaDrill: ["অ", "আ", "ই", "ঈ"],
    quiz: {
      question: "Which row is the resting place for fingers?",
      options: ["Top Row", "Home Row", "Bottom Row"],
      correct: 1,
    },
  },
  {
    id: 3,
    module: "Module 1",
    moduleTitle: "Getting Started",
    title: "Lesson 3: Keyboard Anatomy & Accuracy",
    desc: "গতির চেয়ে নির্ভুলতা (Accuracy) আগে অর্জনের টিপস।",
    duration: "15 mins",
    completed: true,
    locked: false,
    explanation: "Focus on 100% accuracy first. Speed builds naturally as muscle memory solidifies.",
    fingerGuide: "Press keys smoothly without force.",
    keyDrill: "ffff jjjj dddd kkkk",
    wordDrill: ["fd", "jk", "df", "kj"],
    banglaDrill: ["উ", "ঊ", "ঋ", "এ"],
    quiz: {
      question: "What is more important for beginners?",
      options: ["Raw Speed", "Accuracy", "Fast Backspace"],
      correct: 1,
    },
  },
  {
    id: 4,
    module: "Module 2",
    moduleTitle: "Home Row Mastery",
    title: "Lesson 4: ASDF & JKL; Foundation",
    desc: "হোম রো-এর মৌলিক ৮টি কী অনুশীলন।",
    duration: "15 mins",
    completed: true,
    locked: false,
    explanation: "Today you practice A S D F and J K L ; in rhythm.",
    fingerGuide: "Left Index: F, Left Middle: D, Left Ring: S, Left Pinky: A",
    keyDrill: "ffff dddd ssss aaaa jjjj kkkk llll",
    wordDrill: ["fall", "sad", "ask", "lads"],
    banglaDrill: ["আম", "আস", "বাংলা", "আমি"],
    quiz: {
      question: "Which key has the tactile bump for left index?",
      options: ["A", "D", "F"],
      correct: 2,
    },
  },
  {
    id: 5,
    module: "Module 2",
    moduleTitle: "Home Row Mastery",
    title: "Lesson 5: G and H Keys Stretch",
    desc: "তর্জনী আঙুল দিয়ে G এবং H কী-তে প্রসারিত করা।",
    duration: "15 mins",
    completed: true,
    locked: false,
    explanation: "Left index stretches right to press G. Right index stretches left to press H.",
    fingerGuide: "F → G (Left Index), J → H (Right Index)",
    keyDrill: "fgf jhj fgf jhj",
    wordDrill: ["flag", "glad", "dash", "half"],
    banglaDrill: ["গঠন", "হাত", "গান", "হাসি"],
    quiz: {
      question: "Which finger presses G and H?",
      options: ["Index Fingers", "Middle Fingers", "Thumbs"],
      correct: 0,
    },
  },
  {
    id: 6,
    module: "Module 2",
    moduleTitle: "Home Row Mastery",
    title: "Lesson 6: Home Row Mini Test",
    desc: "হোম রো-এর ১০টি কী নিয়ে সংক্ষিপ্ত পরীক্ষা।",
    duration: "15 mins",
    completed: true,
    locked: false,
    explanation: "Test your mastery of all 10 Home Row keys.",
    fingerGuide: "Maintain steady typing rhythm.",
    keyDrill: "a s d f g h j k l ;",
    wordDrill: ["flash", "glass", "salad", "dasha"],
    banglaDrill: ["কাজ", "হাসি", "ভাল", "আজ"],
    quiz: {
      question: "What is the resting thumb key?",
      options: ["Enter", "Spacebar", "Shift"],
      correct: 1,
    },
  },
  {
    id: 7,
    module: "Module 3",
    moduleTitle: "Left Hand Keys",
    title: "Lesson 7: Top Row (Q W E R T)",
    desc: "বাম হাতের উপরের সারির কী রিচ অনুশীলন।",
    duration: "15 mins",
    completed: false,
    locked: false,
    explanation: "Reach up from Home Row to press Q, W, E, R, T.",
    fingerGuide: "A→Q, S→W, D→E, F→R, F→T",
    keyDrill: "qwert qwert qwert",
    wordDrill: ["water", "great", "trade", "sweet"],
    banglaDrill: ["করব", "খাব", "যাব", "বসব"],
    quiz: {
      question: "Which finger reaches up to press E?",
      options: ["Left Pinky", "Left Middle Finger", "Left Thumb"],
      correct: 1,
    },
  },
  {
    id: 8,
    module: "Module 3",
    moduleTitle: "Left Hand Keys",
    title: "Lesson 8: Bottom Row (Z X C V B)",
    desc: "বাম হাতের নিচের সারির কী রিচ।",
    duration: "15 mins",
    completed: false,
    locked: true,
    explanation: "Reach down from Home Row to Z, X, C, V, B.",
    fingerGuide: "A→Z, S→X, D→C, F→V, F→B",
    keyDrill: "zxcvb zxcvb zxcvb",
    wordDrill: ["brave", "cave", "exact", "zebra"],
    banglaDrill: ["বই", "কলম", "ছবি", "বাগান"],
    quiz: {
      question: "Which finger presses C?",
      options: ["Left Middle Finger", "Left Index", "Right Pinky"],
      correct: 0,
    },
  },
];

export default function BeginnerCourseOverview() {
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("avro");
  const [activeLesson, setActiveLesson] = useState<LessonDef | null>(null);
  const [lessonStep, setLessonStep] = useState<"intro" | "drill" | "quiz" | "complete">("intro");
  const [drillInput, setDrillInput] = useState("");
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<boolean | null>(null);

  const completedCount = BEGINNER_LESSONS.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / BEGINNER_LESSONS.length) * 100);

  const openLessonRunner = (lesson: LessonDef) => {
    if (lesson.locked) return;
    setActiveLesson(lesson);
    setLessonStep("intro");
    setDrillInput("");
    setQuizChoice(null);
    setQuizScore(null);
  };

  return (
    <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in text-[#111827]">
      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <Link href="/" className="hover:text-[#2563EB]">Home</Link>
        <span>/</span>
        <Link href="/learn" className="hover:text-[#2563EB]">Learn Hub</Link>
        <span>/</span>
        <span className="text-[#111827] font-bold">Beginner Course</span>
      </div>

      <section className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full border border-[#2563EB]/20">
              🌱 Beginner Foundation Track
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
              Beginner Course
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              Learn Bangla touch typing from scratch. No prior experience needed.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-bold text-[#111827] pt-1">
              <span className="flex items-center gap-1.5"><Clock size={15} className="text-[#2563EB]" /> ⏱ 4–6 Hours</span>
              <span className="flex items-center gap-1.5"><BookOpen size={15} className="text-[#2563EB]" /> 📖 20 Lessons</span>
              <span className="flex items-center gap-1.5"><Award size={15} className="text-[#2563EB]" /> 🏆 Beginner Certificate</span>
            </div>
          </div>

          <div className="w-full md:w-80 border border-[#E5E7EB] bg-[#F3F4F6] rounded-2xl p-5 space-y-4 shrink-0">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Your Progress</span>
              <span className="text-[#2563EB] font-black">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#2563EB] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <Button
              onClick={() => openLessonRunner(BEGINNER_LESSONS[completedCount] || BEGINNER_LESSONS[0])}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl shadow-md gap-2"
            >
              <Play size={14} /> Continue Lesson {completedCount + 1}
            </Button>
          </div>
        </div>
      </section>

      {/* Lesson Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-black">Beginner Lessons (20 Total)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BEGINNER_LESSONS.map((lesson) => (
            <Card
              key={lesson.id}
              onClick={() => openLessonRunner(lesson)}
              className={`border transition-all rounded-2xl cursor-pointer ${
                lesson.completed
                  ? "border-[#10B981]/40 bg-[#FFFFFF]"
                  : lesson.locked
                  ? "border-[#E5E7EB] bg-[#F3F4F6]/50 opacity-60 cursor-not-allowed"
                  : "border-[#2563EB]/40 bg-[#FFFFFF] hover:border-[#2563EB]"
              }`}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#6B7280]">{lesson.duration}</span>
                  {lesson.completed ? <CheckCircle2 size={16} className="text-[#10B981]" /> : <Lock size={15} className="text-[#6B7280]" />}
                </div>
                <h4 className="font-extrabold text-xs text-[#111827]">{lesson.title}</h4>
                <p className="text-[11px] text-[#6B7280]">{lesson.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
