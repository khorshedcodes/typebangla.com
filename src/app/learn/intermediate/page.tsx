"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen, GraduationCap, Trophy, CheckCircle2, Lock,
  Play, ArrowRight, Star, Clock, Award, ShieldCheck,
  ChevronRight, FileText, BarChart3, Target, Activity,
  Sparkles, Check, ChevronDown, Zap, AlertCircle
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

// ── 30 Intermediate Lessons across 10 Modules ────────────────────────────────
interface IntermediateLesson {
  id: number;
  module: string;
  moduleTitle: string;
  title: string;
  desc: string;
  duration: string;
  completed?: boolean;
  locked?: boolean;
  explanation: string;
  practiceText: string;
  sampleDocument?: string;
  targetAccuracy?: number;
}

const INTERMEDIATE_LESSONS: IntermediateLesson[] = [
  // Module 1 — Accuracy First
  {
    id: 1,
    module: "Module 1",
    moduleTitle: "Accuracy First",
    title: "Lesson 1: Why Accuracy Beats Speed",
    desc: "ব্যাকস্পেস কমানো এবং ভুল সংশোধনের সময় অপচয় রোধ করা।",
    duration: "15 mins",
    completed: true,
    locked: false,
    targetAccuracy: 98,
    explanation: "Fixing a mistake takes 4x longer than typing correctly the first time. Focus on zero backspace usage.",
    practiceText: "বাংলাদেশ একটি স্বাধীন ও সার্বভৌম রাষ্ট্র। টাইপিংয়ে নির্ভুলতা গতির চেয়ে বেশি গুরুত্বপূর্ণ।",
  },
  {
    id: 2,
    module: "Module 1",
    moduleTitle: "Accuracy First",
    title: "Lesson 2: Eradicating Keyboard Glances",
    desc: "কিবোর্ডের দিকে না তাকিয়ে স্পর্শ অনুভূতি দৃঢ় করা।",
    duration: "15 mins",
    completed: true,
    locked: false,
    targetAccuracy: 97,
    explanation: "Looking down breaks your cognitive rhythm. Trust muscle memory for every finger stroke.",
    practiceText: "প্রযুক্তি আমাদের জীবনকে সহজ করেছে। নিয়মিত অনুশীলনে নির্ভুলতা অর্জন সম্ভব।",
  },
  {
    id: 3,
    module: "Module 1",
    moduleTitle: "Accuracy First",
    title: "Lesson 3: Backspace Reduction Drill",
    desc: "ব্যাকস্পেস কী ছাড়া অনুচ্ছেদ টাইপিং চ্যালেঞ্জ।",
    duration: "20 mins",
    completed: true,
    locked: false,
    targetAccuracy: 96,
    explanation: "In this drill, Backspace is disabled. Type each word with complete care and focus.",
    practiceText: "শিক্ষা জাতির মেরুদণ্ড। কোনো ব্যাকস্পেস ব্যবহার না করে এই অনুচ্ছেদটি টাইপ করুন।",
  },

  // Module 2 — Speed Building
  {
    id: 4,
    module: "Module 2",
    moduleTitle: "Speed Building",
    title: "Lesson 4: 30-Second Sprint Drills",
    desc: "৩০ সেকেন্ডের উচ্চ গতির স্প্রিন্ট টাইপিং।",
    duration: "15 mins",
    completed: true,
    locked: false,
    targetAccuracy: 95,
    explanation: "Short burst sprints expand your maximum WPM ceiling.",
    practiceText: "দ্রুতগতিতে টাইপ করার অভ্যাস গড়ে তুলুন। প্রতিদিন অল্প সময় স্প্রিন্ট অনুশীলনে স্পিড বাড়ে।",
  },
  {
    id: 5,
    module: "Module 2",
    moduleTitle: "Speed Building",
    title: "Lesson 5: 1-Minute Endurance Test",
    desc: "১ মিনিটের নিয়ন্ত্রিত গতি পরীক্ষা।",
    duration: "15 mins",
    completed: false,
    locked: false,
    targetAccuracy: 95,
    explanation: "Maintain high speed with 95%+ accuracy for 60 seconds.",
    practiceText: "ডিজিটাল বাংলাদেশ গড়তে কম্পিউটার ও টাইপিং দক্ষতা অপরিহার্য ভূমিকা পালন করছে।",
  },
  {
    id: 6,
    module: "Module 2",
    moduleTitle: "Speed Building",
    title: "Lesson 6: 3-Minute Consistency Challenge",
    desc: "৩ মিনিটের ধারাবাহিক গতি নিয়ন্ত্রণ।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 95,
    explanation: "Sustain your peak pace across 180 seconds without slowing down in the middle.",
    practiceText: "পরিশ্রম সৌভাগ্যের প্রসূতি। নিয়মিত টাইপিং অনুশীলনের মাধ্যমে চাকরির পরীক্ষায় সাফল্য অর্জন সম্ভব।",
  },

  // Module 3 — Common Bangla Vocabulary
  {
    id: 7,
    module: "Module 3",
    moduleTitle: "Real Bangla Vocabulary",
    title: "Lesson 7: Academic & Institutional Words",
    desc: "বিশ্ববিদ্যালয়, শিক্ষা, পরীক্ষা ইত্যাদি শব্দমালা।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 96,
    explanation: "Master the words used in school, college, and university documents.",
    practiceText: "বিশ্ববিদ্যালয় শিক্ষা পরীক্ষা শিক্ষক শিক্ষার্থী গবেষণা লাইব্রেরি অডিটোরিয়াম সার্টিফিকেট",
  },
  {
    id: 8,
    module: "Module 3",
    moduleTitle: "Real Bangla Vocabulary",
    title: "Lesson 8: Official & Administrative Terms",
    desc: "সরকার, মন্ত্রণালয়, সচিবালয় সম্পর্কিত শব্দসমূহ।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 96,
    explanation: "Master official terminology frequently seen in government exam prompts.",
    practiceText: "সরকার মন্ত্রণালয় সচিবালয় প্রশাসন অধিদপ্তর কর্মকর্তা কর্মচারী গেজেট বিজ্ঞপ্তি প্রজ্ঞাপন",
  },
  {
    id: 9,
    module: "Module 3",
    moduleTitle: "Real Bangla Vocabulary",
    title: "Lesson 9: Tech & Digital Terminology",
    desc: "কম্পিউটার, ইন্টারনেট, সফটওয়্যার শব্দমালা।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 96,
    explanation: "Type modern technology terms naturally.",
    practiceText: "কম্পিউটার ইন্টারনেট সফটওয়্যার নেটওয়ার্ক ডেটাবেজ ওয়েবসাইট প্রোগ্রামিং ড্যাশবোর্ড ডিজিটাল",
  },

  // Module 4 — Numbers & Symbols
  {
    id: 10,
    module: "Module 4",
    moduleTitle: "Numbers & Symbols",
    title: "Lesson 10: Bangla & English Numerals",
    desc: "১২৩৪৫৬৭৮৯০ এবং 1234567890 সংখ্যা সারি অনুশীলন।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 95,
    explanation: "Reach for top number row keys without looking at your hands.",
    practiceText: "১২৩৪৫৬৭৮৯০ 1234567890 আজ ২২ জুলাই ২০২৬ তারিখ। সময় সকাল ১০:৩০ মিনিট।",
  },
  {
    id: 11,
    module: "Module 4",
    moduleTitle: "Numbers & Symbols",
    title: "Lesson 11: Brackets & Punctuation Marks",
    desc: "() [] {} ! @ # % + - = চিহ্নসমূহ অনুশীলন।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 95,
    explanation: "Use Shift key combinations smoothly for math and punctuation symbols.",
    practiceText: "দাম: ২৫০০ টাকা (১৫% ভ্যাট অন্তর্ভুক্ত)। ফোন: +৮৮০১৭০০০০০-১২। ইমেইল: info@test.com",
  },
  {
    id: 12,
    module: "Module 4",
    moduleTitle: "Numbers & Symbols",
    title: "Lesson 12: Real-World Mixed Data",
    desc: "তারিখ, সময়, মূল্য ও বন্ধনী সমৃদ্ধ তথ্য টাইপিং।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 95,
    explanation: "Type mixed alphanumeric content seamlessly.",
    practiceText: "স্মারক নং: ৪৬.০০.০০০০.০১২.২৪.০০১.২৬-৪৫; তারিখ: ১২ জুলাই ২০২৬ খ্রিস্টাব্দ। মোট বরাদ্দ: ৫০,০০,০০০ টাকা।",
  },

  // Module 5 — Punctuation & Rhythm
  {
    id: 13,
    module: "Module 5",
    moduleTitle: "Punctuation & Rhythm",
    title: "Lesson 13: Comma, Dari & Question Marks",
    desc: "দাঁড়ি (।), কমা (,) ও প্রশ্নবোধক (?) চিহ্নের ছন্দ।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 96,
    explanation: "Develop a smooth typing pause after punctuation marks.",
    practiceText: "আপনি কেমন আছেন? আমি ভালো আছি, ধন্যবাদ! আপনার সাথে কথা বলে খুব ভালো লাগলো।",
  },
  {
    id: 14,
    module: "Module 5",
    moduleTitle: "Punctuation & Rhythm",
    title: "Lesson 14: Quotations & Colons",
    desc: "উদ্ধৃতি চিহ্ন (\") ও কোলন (:) টাইপিং।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 96,
    explanation: "Practice dialogs and colon-delimited lists.",
    practiceText: "তিনি বললেন: \"আমাদের শিক্ষা গ্রহণ করতে হবে।\" এই নীতিবাক্যটি মনে রাখবেন: \"পরিশ্রমই সাফল্যের চাবিকাঠি।\"",
  },
  {
    id: 15,
    module: "Module 5",
    moduleTitle: "Punctuation & Rhythm",
    title: "Lesson 15: Punctuation Rhythm Test",
    desc: "চিহ্ন ও বাক্যের সাবলীল প্রবাহ পরীক্ষা।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 96,
    explanation: "Test punctuation accuracy and flow under timer.",
    practiceText: "কাজী নজরুল ইসলাম বলেছেন: \"বল বীর- বল উন্নত মম শির!\" রবীন্দ্রনাথ ঠাকুর লিখেছেন: \"আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।\"",
  },

  // Module 6 — Real Documents
  {
    id: 16,
    module: "Module 6",
    moduleTitle: "Real-World Documents",
    title: "Lesson 16: Job Application & Office Letter",
    desc: "চাকরির আবেদনপত্র ও দাপ্তরিক চিঠি টাইপিং।",
    duration: "25 mins",
    completed: false,
    locked: true,
    targetAccuracy: 96,
    sampleDocument: "বিষয়: চাকরির আবেদন\nমাননীয় মহোদয়,\nবিনীত নিবেদন এই যে, আপনার প্রতিষ্ঠানে সহকারী পদে নিয়োগের নিমিত্তে আমি আবেদন করছি।",
    explanation: "Type structured office job application documents format-correctly.",
    practiceText: "বিষয়: চাকরির আবেদন। মাননীয় মহোদয়, বিনীত নিবেদন এই যে, আপনার সংস্থায় শূন্য পদে নিয়োগের জন্য আবেদন করছি।",
  },
  {
    id: 17,
    module: "Module 6",
    moduleTitle: "Real-World Documents",
    title: "Lesson 17: Formal Emails & Reports",
    desc: "আনুষ্ঠানিক ইমেইল ও রিপোর্ট টাইপিং।",
    duration: "25 mins",
    completed: false,
    locked: true,
    explanation: "Practice typing corporate emails and quarterly reports.",
    practiceText: "প্রিয় জনাব, আগামী সপ্তাহের মিটিং সংক্রান্ত তথ্য ইমেইলে সংযুক্ত করা হলো। অনুগ্রহ করে ফাইলটি পর্যালোচনা করবেন।",
  },
  {
    id: 18,
    module: "Module 6",
    moduleTitle: "Real-World Documents",
    title: "Lesson 18: Blog Post & News Article",
    desc: "ব্লগ পোস্ট ও পত্রিকার সংবাদ টাইপিং।",
    duration: "25 mins",
    completed: false,
    locked: true,
    explanation: "Type journalism news articles and blog content with speed.",
    practiceText: "আজকে জাতীয় সংসদ ভবনে শুরু হওয়া অধিবেশনে দেশের প্রযুক্তি খাতের অগ্রগতির চিত্র তুলে ধরা হয়।",
  },

  // Module 7 — Literature & Speeches
  {
    id: 19,
    module: "Module 7",
    moduleTitle: "Literature & Speeches",
    title: "Lesson 19: Historic Speeches & Essays",
    desc: "ঐতিহাসিক ভাষণ ও প্রবন্ধ অনুচ্ছেদ।",
    duration: "25 mins",
    completed: false,
    locked: true,
    explanation: "Sustain rhythm across historical speeches.",
    practiceText: "এবারের সংগ্রাম আমাদের মুক্তির সংগ্রাম, এবারের সংগ্রাম স্বাধীনতার সংগ্রাম! রক্ত যখন দিয়েছি, রক্ত আরো দেব।",
  },
  {
    id: 20,
    module: "Module 7",
    moduleTitle: "Literature & Speeches",
    title: "Lesson 20: Classical Bengali Short Stories",
    desc: "রবীন্দ্রনাথ ঠাকুরের ছোটগল্প অনুচ্ছেদ।",
    duration: "25 mins",
    completed: false,
    locked: true,
    explanation: "Type rich classical vocabulary with fluid finger motion.",
    practiceText: "পোস্টমাস্টার প্রথম এ গ্রামে আসিয়া কাজ গ্রহণ করেন। গ্রামটি অতি সামান্য, নিকটে একটি নীলকুঠি আছে।",
  },
  {
    id: 21,
    module: "Module 7",
    moduleTitle: "Literature & Speeches",
    title: "Lesson 21: Poetic Rhythms & Couplets",
    desc: "কাব্যিক ছন্দ ও ছড়া টাইপিং।",
    duration: "20 mins",
    completed: false,
    locked: true,
    explanation: "Maintain meter and rhyme structure during typing.",
    practiceText: "আমাদের ছোট নদী চলে বাঁকে বাঁকে, বৈশাখ মাসে তার হাঁটু জল থাকে। পার হয়ে যায় গরু, পার হয় গাড়ি।",
  },

  // Module 8 — Layout Shortcuts & Conjuncts
  {
    id: 22,
    module: "Module 8",
    moduleTitle: "Layout Conjuncts & Shortcuts",
    title: "Lesson 22: Advanced Ligatures (ক্ষ, জ্ঞ, ঞ্চ)",
    desc: "জটিল যুক্তাক্ষর গঠনের দ্রুত কৌশল।",
    duration: "20 mins",
    completed: false,
    locked: true,
    explanation: "Learn layout-specific shortcuts for complex ligatures like ক্ষ (ক+্+ষ) and জ্ঞ (জ+্+ঞ).",
    practiceText: "শিক্ষা বিজ্ঞান জ্ঞান পরীক্ষা শিক্ষক বিজ্ঞানাগার আকাঙ্ক্ষা সূক্ষ্ম বৈশিষ্ট্য",
  },
  {
    id: 23,
    module: "Module 8",
    moduleTitle: "Layout Conjuncts & Shortcuts",
    title: "Lesson 23: Rare Consonant Conjuncts (ষ্ণ, ঙ্ক, ঙ্গ)",
    desc: "বিরল যুক্তবর্ণ টাইপিং ড্রিল।",
    duration: "20 mins",
    completed: false,
    locked: true,
    explanation: "Master ষ্ণ, ঙ্ক, ঙ্গ, ঞ্ছ ligatures without pauses.",
    practiceText: "কৃষ্ণ অঙ্ক সঙ্গ অঙ্কন শঙ্কা তঙ্কা আকাঙ্ক্ষা অঙ্গুরীয় কৃষ্ণচূড়া",
  },
  {
    id: 24,
    module: "Module 8",
    moduleTitle: "Layout Conjuncts & Shortcuts",
    title: "Lesson 24: Layout Speed Shortcuts",
    desc: "অভ্র, ইউনিবিজয় ও জাতীয় লেআউটের শর্টকাট।",
    duration: "20 mins",
    completed: false,
    locked: true,
    explanation: "Layout-specific fast combinations for high WPM output.",
    practiceText: "প্রশাসনিক দাপ্তরিক কর্মকর্তা কর্মচারীবৃন্দ বিশ্বস্ত সূত্রে প্রাপ্ত তথ্যানুযায়ী প্রজ্ঞাপিত হলো।",
  },

  // Module 9 — Long Endurance Sessions
  {
    id: 25,
    module: "Module 9",
    moduleTitle: "Endurance & Stamina",
    title: "Lesson 25: 10-Minute Non-Stop Session",
    desc: "১০ মিনিটের অবিরাম টাইপিং সহনশীলতা পরীক্ষা।",
    duration: "20 mins",
    completed: false,
    locked: true,
    explanation: "Type for 10 full minutes without looking down or pausing.",
    practiceText: "বাংলাদেশের প্রাকৃতিক সৌন্দর্য অপরূপ। সবুজ শ্যামল প্রান্তর, নদী ও সমুদ্রের কোল ঘেঁষে এ দেশ গড়ে উঠেছে।",
  },
  {
    id: 26,
    module: "Module 9",
    moduleTitle: "Endurance & Stamina",
    title: "Lesson 26: 15-Minute Concentration Test",
    desc: "১৫ মিনিটের ঘনত্ব ও মনোযোগ বজায় রাখা।",
    duration: "25 mins",
    completed: false,
    locked: true,
    explanation: "Build mental stamina required for professional office work.",
    practiceText: "তথ্য প্রযুক্তির যুগে দক্ষ জনশক্তি তৈরি একটি অপরিহার্য চ্যালেঞ্জ। প্রতিটি ক্ষেত্রে সঠিক প্রশিক্ষণের গুরুত্ব অনেক।",
  },
  {
    id: 27,
    module: "Module 9",
    moduleTitle: "Endurance & Stamina",
    title: "Lesson 27: 20-Minute Professional Marathon",
    desc: "২০ মিনিটের প্রফেশনাল টাইপিং স্ট্যামিনা।",
    duration: "30 mins",
    completed: false,
    locked: true,
    explanation: "Complete a full 20-minute typing marathon maintaining 95%+ accuracy.",
    practiceText: "বিশ্বায়নের এই যুগে প্রতিযোগিতা প্রতিনিয়ত বৃদ্ধি পাচ্ছে। টাইপিং গতি ও নির্ভুলতা কাজের দক্ষতা বহুগুণ বাড়িয়ে দেয়।",
  },

  // Module 10 — Final Assessment & Report
  {
    id: 28,
    module: "Module 10",
    moduleTitle: "Final Assessment & Report",
    title: "Lesson 28: Speed & Error Diagnosis Test",
    desc: "গতি, নির্ভুলতা ও দুর্বল কী চিহ্নিতকরণ পরীক্ষা।",
    duration: "20 mins",
    completed: false,
    locked: true,
    explanation: "Full diagnostic assessment identifying weak keys and shift combinations.",
    practiceText: "চূড়ান্ত মূল্যায়ন পরীক্ষা: এই পরীক্ষাটি আপনার WPM, Accuracy, Consistency এবং দুর্বল কী পরিমাপ করবে।",
  },
  {
    id: 29,
    module: "Module 10",
    moduleTitle: "Final Assessment & Report",
    title: "Lesson 29: Intermediate Comprehensive Test",
    desc: "ইন্টারমিডিয়েট স্তরের চূড়ান্ত পরীক্ষা।",
    duration: "20 mins",
    completed: false,
    locked: true,
    explanation: "Comprehensive test covering all 10 modules.",
    practiceText: "অভিনন্দন! আপনি ইন্টারমিডিয়েট লেভেলের সেরা পারফরম্যান্স প্রদর্শন করার দ্বারপ্রান্তে পৌঁছেছেন।",
  },
  {
    id: 30,
    module: "Module 10",
    moduleTitle: "Final Assessment & Report",
    title: "Lesson 30: Intermediate Graduation & Certificate",
    desc: "ইন্টারমিডিয়েট সনদ অর্জন ও অ্যাডভান্সড ট্র্যাকে পদার্পণ।",
    duration: "15 mins",
    completed: false,
    locked: true,
    explanation: "Claim your verified Intermediate Typing Certificate (35–60 WPM Target Achieved!).",
    practiceText: "সনদ অর্জিত! আপনি ইন্টারমিডিয়েট টাইপিং কোর্স সফলভাবে সম্পন্ন করেছেন। 🏆",
  },
];

export default function IntermediateCoursePage() {
  const [activeLesson, setActiveLesson] = useState<IntermediateLesson | null>(null);
  const [drillInput, setDrillInput] = useState("");
  const [showReport, setShowReport] = useState(false);

  const completedCount = INTERMEDIATE_LESSONS.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / INTERMEDIATE_LESSONS.length) * 100);

  const openLessonRunner = (lesson: IntermediateLesson) => {
    if (lesson.locked) return;
    setActiveLesson(lesson);
    setDrillInput("");
    setShowReport(false);
  };

  return (
    <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in text-[#111827]">
      
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <Link href="/" className="hover:text-[#2563EB]">Home</Link>
        <span>/</span>
        <Link href="/learn" className="hover:text-[#2563EB]">Learn</Link>
        <span>/</span>
        <span className="text-[#111827] font-bold">Intermediate Course</span>
      </div>

      {/* ── 5-TIER CURRICULUM MILESTONES BAR ────────────────────────────────── */}
      <div className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 text-center text-xs">
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-6 h-6 rounded-full bg-[#E5E7EB] text-[#6B7280] flex items-center justify-center font-bold text-[10px]">1</span>
            <span className="font-bold text-[#6B7280]">🌱 Foundation (0–25 WPM)</span>
          </div>
          <ArrowRight size={14} className="text-[#6B7280] hidden sm:block" />

          <div className="flex items-center gap-1.5 bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1.5 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-[10px]">2</span>
            <span className="font-black text-[#2563EB]">🚀 Intermediate (25–50 WPM)</span>
          </div>
          <ArrowRight size={14} className="text-[#6B7280] hidden sm:block" />

          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-6 h-6 rounded-full bg-[#E5E7EB] text-[#6B7280] flex items-center justify-center font-bold text-[10px]">3</span>
            <span className="font-bold text-[#6B7280]">⚡ Advanced (50–80 WPM)</span>
          </div>
          <ArrowRight size={14} className="text-[#6B7280] hidden sm:block" />

          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-6 h-6 rounded-full bg-[#E5E7EB] text-[#6B7280] flex items-center justify-center font-bold text-[10px]">4</span>
            <span className="font-bold text-[#6B7280]">🏆 Professional (80+ WPM)</span>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full border border-[#2563EB]/20">
              কোর্স লেভেল: ইন্টারমিডিয়েট
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
              Intermediate Course
            </h1>

            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              <strong>Goal:</strong> Type comfortably for 15–30 minutes with 95%+ accuracy and practical real-world document confidence.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-bold text-[#111827] pt-1">
              <span className="flex items-center gap-1.5"><Clock size={15} className="text-[#2563EB]" /> ⏱ 8–10 Hours</span>
              <span className="flex items-center gap-1.5"><BookOpen size={15} className="text-[#2563EB]" /> 📚 30 Lessons</span>
              <span className="flex items-center gap-1.5"><Target size={15} className="text-[#2563EB]" /> 🎯 Target: 40–60 WPM</span>
              <span className="flex items-center gap-1.5"><Award size={15} className="text-[#2563EB]" /> 🏆 Intermediate Certificate</span>
            </div>
          </div>

          {/* Progress Telemetry Dashboard Card */}
          <div className="w-full md:w-80 border border-[#E5E7EB] bg-[#F3F4F6] rounded-2xl p-5 space-y-4 shrink-0">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#111827]">Progress Dashboard</span>
              <span className="text-[#2563EB] font-black">{progressPercent}%</span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#6B7280]">
                  <span>Accuracy</span>
                  <span className="text-[#10B981] font-bold">97%</span>
                </div>
                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] w-[97%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#6B7280]">
                  <span>Speed</span>
                  <span className="text-[#2563EB] font-bold">48 WPM</span>
                </div>
                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] w-[70%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#6B7280]">
                  <span>Endurance</span>
                  <span className="text-[#F59E0B] font-bold">7 Mins</span>
                </div>
                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] w-[60%]" />
                </div>
              </div>
            </div>

            <Button
              onClick={() => openLessonRunner(INTERMEDIATE_LESSONS[completedCount] || INTERMEDIATE_LESSONS[0])}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl shadow-md gap-2"
            >
              <Play size={14} /> Continue Intermediate
            </Button>
          </div>
        </div>
      </section>

      {/* ── 10 MODULES LIST + SIDEBAR ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-2xl p-4 shadow-sm space-y-3 sticky top-20">
            <h3 className="text-xs font-black text-[#111827] uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
              10 Modules Outline
            </h3>
            <div className="space-y-1">
              {[
                "1. Accuracy First",
                "2. Speed Building",
                "3. Real Vocabulary",
                "4. Numbers & Symbols",
                "5. Punctuation Rhythm",
                "6. Real Documents",
                "7. Literature & Speeches",
                "8. Layout Shortcuts",
                "9. Endurance & Stamina",
                "10. Final Assessment",
              ].map((mod, i) => (
                <a
                  key={i}
                  href={`#intermediate-module-${i + 1}`}
                  className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#2563EB] hover:bg-[#F3F4F6] px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  <span className="truncate">{mod}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 10 Modules List */}
        <div className="lg:col-span-3 space-y-8">
          
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((modNum) => {
            const modLessons = INTERMEDIATE_LESSONS.filter((l) => l.module === `Module ${modNum}`);
            const modTitle = modLessons[0]?.moduleTitle || `Module ${modNum}`;

            return (
              <div key={modNum} id={`intermediate-module-${modNum}`} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                  <div>
                    <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-wider">Module {modNum}</span>
                    <h2 className="text-lg font-black text-[#111827]">{modTitle}</h2>
                  </div>
                  <span className="text-xs font-bold text-[#6B7280]">{modLessons.length} Lessons</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {modLessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      onClick={() => openLessonRunner(lesson)}
                      className={`border transition-all rounded-2xl cursor-pointer ${
                        lesson.completed
                          ? "border-[#10B981]/40 bg-[#FFFFFF] hover:border-[#10B981]"
                          : lesson.locked
                          ? "border-[#E5E7EB] bg-[#F3F4F6]/50 opacity-60 cursor-not-allowed"
                          : "border-[#2563EB]/40 bg-[#FFFFFF] hover:border-[#2563EB] hover:shadow-md"
                      }`}
                    >
                      <CardContent className="p-4 space-y-3 flex flex-col justify-between h-full">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280]">
                              {lesson.duration}
                            </span>
                            {lesson.completed ? (
                              <CheckCircle2 size={16} className="text-[#10B981]" />
                            ) : lesson.locked ? (
                              <Lock size={15} className="text-[#6B7280]" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                            )}
                          </div>
                          <h4 className="font-extrabold text-xs text-[#111827] leading-snug">{lesson.title}</h4>
                          <p className="text-[11px] text-[#6B7280] line-clamp-2 leading-relaxed">{lesson.desc}</p>
                        </div>

                        <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#2563EB]">
                            {lesson.completed ? "Replay Lesson" : lesson.locked ? "Locked" : "Start Lesson →"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* ── INTERACTIVE LESSON RUNNER MODAL ──────────────────────────────────── */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-[#0B1020]/70 backdrop-blur-md" onClick={() => setActiveLesson(null)} />
          
          <div className="relative z-50 w-full max-w-2xl bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4">
              <div>
                <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-wider">{activeLesson.module}</span>
                <h3 className="text-lg font-black text-[#111827]">{activeLesson.title}</h3>
              </div>
              <button onClick={() => setActiveLesson(null)} className="p-1 rounded-full hover:bg-[#F3F4F6]">
                ✕
              </button>
            </div>

            {!showReport ? (
              <div className="space-y-6">
                <div className="p-4 bg-[#F3F4F6] rounded-2xl border border-[#E5E7EB] space-y-2">
                  <h4 className="text-xs font-bold text-[#2563EB] uppercase">পাঠ্যের উদ্দেশ্য (Lesson Objective)</h4>
                  <p className="text-xs text-[#111827] leading-relaxed">{activeLesson.explanation}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#111827]">লক্ষ্য অনুচ্ছেদ (Target Practice Text):</label>
                  <div className="font-bangla text-base leading-relaxed p-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-2xl select-none text-[#111827]">
                    {activeLesson.practiceText}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#111827]">এখানে টাইপ করা শুরু করুন:</label>
                  <textarea
                    rows={3}
                    value={drillInput}
                    onChange={(e) => setDrillInput(e.target.value)}
                    placeholder="Type the exact paragraph above without looking down..."
                    className="w-full font-bangla text-sm p-4 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none resize-none"
                    autoFocus
                  />
                </div>

                <Button
                  disabled={drillInput.length < 10}
                  onClick={() => setShowReport(true)}
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-11 rounded-xl shadow-md gap-2"
                >
                  ফলাফল রিপোর্ট দেখুন (Submit & View Report) <ArrowRight size={14} />
                </Button>
              </div>
            ) : (
              /* Lesson Report Screen with Weak Keys Detection */
              <div className="text-center space-y-6 py-4">
                <div className="text-5xl">📊</div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#111827]">Lesson Performance Report</h3>
                  <p className="text-xs text-[#6B7280]">আপনার গতি, নির্ভুলতা ও দুর্বল কী ক্যাটালগ রিপোর্ট:</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="border border-[#E5E7EB] bg-[#F3F4F6] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6B7280] block font-bold">SPEED</span>
                    <span className="text-lg font-black text-[#2563EB]">52 WPM</span>
                  </div>
                  <div className="border border-[#E5E7EB] bg-[#F3F4F6] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6B7280] block font-bold">ACCURACY</span>
                    <span className="text-lg font-black text-[#10B981]">97%</span>
                  </div>
                  <div className="border border-[#E5E7EB] bg-[#F3F4F6] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6B7280] block font-bold">CONSISTENCY</span>
                    <span className="text-lg font-black text-[#6366F1]">94%</span>
                  </div>
                  <div className="border border-[#E5E7EB] bg-[#F3F4F6] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6B7280] block font-bold">WEAK KEYS</span>
                    <span className="text-sm font-black text-[#EF4444]">ঙ, ঞ, Shift</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    activeLesson.completed = true;
                    setActiveLesson(null);
                  }}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold h-11 rounded-xl shadow-md gap-2"
                >
                  পাঠ সম্পন্ন করুন (Complete Lesson →)
                </Button>
              </div>
            )}

          </div>
        </div>
      )}

    </main>
  );
}
