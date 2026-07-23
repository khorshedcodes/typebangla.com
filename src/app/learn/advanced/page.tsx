"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen, GraduationCap, Trophy, CheckCircle2, Lock,
  Play, ArrowRight, Star, Clock, Award, ShieldCheck,
  ChevronRight, FileText, BarChart3, Target, Activity,
  Sparkles, Check, ChevronDown, Zap, AlertCircle, Briefcase,
  Code, PenTool, Database, Terminal, Cpu, CheckSquare
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

// ── 40 Professional Lessons across 10 Modules ────────────────────────────────
interface AdvancedLesson {
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
  targetAccuracy?: number;
}

const ADVANCED_LESSONS: AdvancedLesson[] = [
  // Module 1 — Speed Optimization
  {
    id: 1,
    module: "Module 1",
    moduleTitle: "Speed Optimization",
    title: "Lesson 1: Minimizing Finger Travel Distance",
    desc: "আঙুলের অপ্রয়োজনীয় নড়াচড়া কমিয়ে গতি সর্বোচ্চকরণ।",
    duration: "20 mins",
    completed: true,
    locked: false,
    targetAccuracy: 98,
    explanation: "Keep fingers glued to Home Row level. Micro-movements increase WPM by 15-20%.",
    practiceText: "প্রযুক্তি ও মেধার সমন্বয়ে দ্রুত গতি অর্জন সম্ভব। আঙুলের স্বাভাবিক চলাচল বজায় রাখুন।",
  },
  {
    id: 2,
    module: "Module 1",
    moduleTitle: "Speed Optimization",
    title: "Lesson 2: Cadence & Continuous Typing Rhythm",
    desc: "মেট্রোনোম ছন্দে বিরামহীন কিবোর্ড কীস্ট্রোক।",
    duration: "20 mins",
    completed: true,
    locked: false,
    targetAccuracy: 98,
    explanation: "Type like a clock ticking. Equal time intervals between characters yields higher speed than burst typing.",
    practiceText: "নিয়মিত গতি বজায় রেখে বাক্য সম্পূর্ণ করুন। কোনো শব্দে বেশি থামবেন না।",
  },
  {
    id: 3,
    module: "Module 1",
    moduleTitle: "Speed Optimization",
    title: "Lesson 3: Buffer Reading (Looking 3 Words Ahead)",
    desc: "টাইপ করার সময় চোখের সামনে ৩টি শব্দ এগিয়ে পড়ার কৌশল।",
    duration: "20 mins",
    completed: true,
    locked: false,
    targetAccuracy: 98,
    explanation: "Your eyes should read word N+2 while your fingers finish word N.",
    practiceText: "চোখ থাকবে পরবর্তী বাক্যে এবং আঙুল চলবে পূর্ববর্তী স্মৃতিতে। এটিই প্রফেশনাল টাইপিংয়ের গোপন কৌশল।",
  },
  {
    id: 4,
    module: "Module 1",
    moduleTitle: "Speed Optimization",
    title: "Lesson 4: Sub-Minute Sprint (Target 75+ WPM)",
    desc: "৬০-৯০ WPM লক্ষ্যমাত্রার শর্ট স্প্রিন্ট চ্যালেঞ্জ।",
    duration: "15 mins",
    completed: true,
    locked: false,
    targetAccuracy: 98,
    explanation: "Push your motor speed to maximum velocity.",
    practiceText: "বাংলাদেশ আমাদের গর্ব ও অহংকার। দ্রুতগতির টাইপিং পরীক্ষায় আপনার সর্বোচ্চ দক্ষতা প্রদর্শন করুন।",
  },

  // Module 2 — Difficult Bangla Words
  {
    id: 5,
    module: "Module 2",
    moduleTitle: "Difficult Bangla Words",
    title: "Lesson 5: Complex Syllable Vocabulary",
    desc: "দায়িত্ব, বিশ্ববিদ্যালয়, পরিবেশ শব্দমালা।",
    duration: "20 mins",
    completed: false,
    locked: false,
    targetAccuracy: 98,
    explanation: "Master the words that slow average typists down.",
    practiceText: "দায়িত্ব বিশ্ববিদ্যালয় স্বাধীনতা প্রযুক্তি আন্তর্জাতিক পরিবেশ প্রশাসনিক স্বায়ত্তশাসন",
  },
  {
    id: 6,
    module: "Module 2",
    moduleTitle: "Difficult Bangla Words",
    title: "Lesson 6: High-Frequency Mistyped Words",
    desc: "প্রতিনিয়ত ভুল হওয়া বাংলা শব্দসমূহের স্পেশাল ড্রিল।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Practice words with frequent shift and ligature combinations.",
    practiceText: "মনস্তাত্ত্বিক পুনর্গঠন প্রতিশ্রুতি সংবেদনশীলতা কর্মকর্তা স্বকীয়তা দৃষ্টিভঙ্গি প্রজ্ঞাপন",
  },
  {
    id: 7,
    module: "Module 2",
    moduleTitle: "Difficult Bangla Words",
    title: "Lesson 7: Academic & Institutional Jargon",
    desc: "গবেষণা, ইন্সটিটিউট, সুপ্রীম কোর্ট ইত্যাদি টার্মস।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Type formal institutional vocabulary with total accuracy.",
    practiceText: "ইনস্টিটিউশন বিশ্ববিদ্যালয় মহামান্য সুপ্রীম কোর্ট সাংবিধানিক স্বায়ত্তশাসিত অধিদপ্তর",
  },
  {
    id: 8,
    module: "Module 2",
    moduleTitle: "Difficult Bangla Words",
    title: "Lesson 8: Rapid Word Fluidity Test",
    desc: "জটিল শব্দের বিরামহীন গতি পরীক্ষা।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Test your fluency across complex Bangla vocabulary.",
    practiceText: "আন্তর্জাতিক পরিমণ্ডলে বাংলাদেশের প্রযুক্তিগত উৎকর্ষ সাধনে আমাদের ভূমিকা অপরিহার্য।",
  },

  // Module 3 — Complex Bangla Characters & Ligatures
  {
    id: 9,
    module: "Module 3",
    moduleTitle: "Complex Ligatures & Shortcuts",
    title: "Lesson 9: Advanced Conjuncts (ক্ষ, জ্ঞ, শ্র, ত্র)",
    desc: "ক্ষ, জ্ঞ, শ্র, ত্র যুক্তাক্ষরের মসৃণ টাইপিং।",
    duration: "25 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Type ligatures seamlessly without hesitating for key codes.",
    practiceText: "শিক্ষা বিজ্ঞান জ্ঞান শ্রাবণ ছাত্র ত্রৈমাসিক শিক্ষক জ্ঞানগর্ভ শ্রুতিধর",
  },
  {
    id: 10,
    module: "Module 3",
    moduleTitle: "Complex Ligatures & Shortcuts",
    title: "Lesson 10: Multi-Consonant Clusters (ন্দ্র, স্ত্র, ঙ্ক)",
    desc: "ন্দ্র, স্ত্র, ঙ্ক, ঙ্গ ত্রি-ব্যঞ্জন যুক্ত বর্ণমালা।",
    duration: "25 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Master three-letter consonant clusters without backspace.",
    practiceText: "কেন্দ্র স্বাধীনতা বসন্ত অস্ত্রবস্তু অঙ্কন সংকলন স্বকীয়তা স্বতন্ত্র",
  },
  {
    id: 11,
    module: "Module 3",
    moduleTitle: "Complex Ligatures & Shortcuts",
    title: "Lesson 11: Rare Glyphs (ঞ, ঙ্, ঢ়, ৎ, ং, ঃ)",
    desc: "ঞ, ঙ্, ঢ়, ৎ, ং, ঃ বিশেষ অক্ষরের সঠিক অবস্থান।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Instantly hit obscure symbols without hunting key maps.",
    practiceText: "মিঞা বাঞ্ছনীয় আষাঢ় হঠাৎ সংবৃত্তি দুঃখ অহংকার হূদয়",
  },
  {
    id: 12,
    module: "Module 3",
    moduleTitle: "Complex Ligatures & Shortcuts",
    title: "Lesson 12: Ligature Speed Challenge",
    desc: "যুক্তাক্ষর সমৃদ্ধ দ্রুতগতি চ্যালেঞ্জ।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Combine all complex ligatures into a single continuous test.",
    practiceText: "বিজ্ঞান ও প্রযুক্তির সূক্ষ্ম প্রয়োগে কৃতি শিক্ষকগণের জ্ঞানালোক ছড়িয়ে পড়ুক।",
  },

  // Module 4 — Professional Documents
  {
    id: 13,
    module: "Module 4",
    moduleTitle: "Professional Documents",
    title: "Lesson 13: Official Government Notices",
    desc: "সরকারি প্রজ্ঞাপন ও আদেশনামা টাইপিং।",
    duration: "25 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Type formal government notifications with exact punctuation.",
    practiceText: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার, জনপ্রশাসন মন্ত্রণালয়। শাখা-১, স্মারক নং-৪৬.০০.০০০০। সর্বসাধারণের অবগতির জন্য প্রজ্ঞাপিত করা যাচ্ছে যে...",
  },
  {
    id: 14,
    module: "Module 4",
    moduleTitle: "Professional Documents",
    title: "Lesson 14: Corporate Meeting Minutes",
    desc: "বোর্ড মিটিংয়ের কার্যবিবরণী টাইপিং।",
    duration: "25 mins",
    completed: false,
    locked: true,
    explanation: "Format corporate meeting resolutions rapidly.",
    practiceText: "আজকে অনুষ্ঠিত পরিচালনা পর্ষদের ১০৫তম সভায় নিম্নলিখিত সিদ্ধান্তসমূহ সর্বসম্মতিক্রমে গৃহীত হয়: ১. বার্ষিক বাজেট অনুমোদন।",
  },
  {
    id: 15,
    module: "Module 4",
    moduleTitle: "Professional Documents",
    title: "Lesson 15: Academic Research Articles",
    desc: "গবেষণা প্রবন্ধ ও সাইটেশন টাইপিং।",
    duration: "25 mins",
    completed: false,
    locked: true,
    explanation: "Type dense academic research literature accurately.",
    practiceText: "উন্নয়নশীল দেশসমূহে ডিজিটাল রূপান্তরের প্রভাব শীর্ষক নিবন্ধে বলা হয়েছে যে, প্রাথমিক ও মাধ্যমিক শিক্ষায় প্রযুক্তির অন্তর্ভুক্তি গতি এনেছে।",
  },
  {
    id: 16,
    module: "Module 4",
    moduleTitle: "Professional Documents",
    title: "Lesson 16: Technical Documentation",
    desc: "সফটওয়্যার ম্যানুয়াল ও টেকনিক্যাল গাইড।",
    duration: "25 mins",
    completed: false,
    locked: true,
    explanation: "Type technical documentation mixing Bangla & code references.",
    practiceText: "সিস্টেম ইনস্টলেশনের জন্য নির্দেশিকা: প্রথমে কনফিগারেশন ফাইল আপডেট করুন এবং ডিপ্লয়মেন্ট কমান্ড সম্পাদন করুন।",
  },

  // Module 5 — Long Form Endurance
  {
    id: 17,
    module: "Module 5",
    moduleTitle: "Long Form Endurance",
    title: "Lesson 17: 10-Minute Sustained Typing",
    desc: "১০ মিনিটের পেশাদার অবিরাম টাইপিং।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Build finger and wrist stamina for long office sessions.",
    practiceText: "বাংলাদেশের অর্থনৈতিক অগ্রগতি বৈশ্বিক অঙ্গনে এক অনন্য উচ্চতায় পৌঁছেছে। কৃষি, শিল্প ও সেবা খাতে অভূতপূর্ব সাফল্য অর্জিত হয়েছে।",
  },
  {
    id: 18,
    module: "Module 5",
    moduleTitle: "Long Form Endurance",
    title: "Lesson 18: 15-Minute Marathon",
    desc: "১৫ মিনিটের একটানা মনোযোগ রক্ষা।",
    duration: "25 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Maintain speed consistency without mid-session fatigue.",
    practiceText: "শিক্ষা ও গবেষণায় তরুণ প্রজন্মের সক্রিয় অংশগ্রহণ দেশের ভবিষ্যৎ বিনির্মাণে মূল চালিকাশক্তি হিসেবে কাজ করছে।",
  },
  {
    id: 19,
    module: "Module 5",
    moduleTitle: "Long Form Endurance",
    title: "Lesson 19: 20-Minute Professional Benchmark",
    desc: "২০ মিনিটের প্রফেশনাল বেঞ্চমার্ক পরীক্ষা।",
    duration: "30 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Benchmark your typing speed consistency over 20 minutes.",
    practiceText: "তথ্যপ্রযুক্তির প্রসারের ফলে কর্মসংস্থানের নতুন নতুন ক্ষেত্র উন্মোচিত হচ্ছে। ফ্রিল্যান্সিং ও আউটসোর্সিংয়ে বাংলাদেশ দ্রুত এগিয়ে যাচ্ছে।",
  },
  {
    id: 20,
    module: "Module 5",
    moduleTitle: "Long Form Endurance",
    title: "Lesson 20: 30-Minute Master Endurance",
    desc: "৩০ মিনিটের মাস্টার স্ট্যামিনা চ্যালেঞ্জ।",
    duration: "40 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "The ultimate 30-minute unbroken typing endurance test.",
    practiceText: "বিশ্বায়নের যুগে প্রতিযোগিতা টিকে থাকতে হলে সার্বিক দক্ষতা অর্জনের বিকল্প নেই। প্রতিটি সেক্টরে আধুনিক প্রযুক্তির সর্বোচ্চ ব্যবহার নিশ্চিত করতে হবে।",
  },

  // Module 6 — Exam Preparation
  {
    id: 21,
    module: "Module 6",
    moduleTitle: "Exam Simulation",
    title: "Lesson 21: Fixed-Time Exam Simulator (5 Mins)",
    desc: "সরকারি চাকরির ৫ মিনিটের হুবহু পরীক্ষা।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Simulate government ministry & bank typing test environment.",
    practiceText: "পরীক্ষার নিয়মাবলী: ৫ মিনিটে সর্বনিম্ন ১৫০ শব্দ সঠিক ব্যাকস্পেস ও বিরামচিহ্ন সহ টাইপ করতে হবে।",
  },
  {
    id: 22,
    module: "Module 6",
    moduleTitle: "Exam Simulation",
    title: "Lesson 22: Fixed-Word Count Test (300 Words)",
    desc: "নির্দিষ্ট ৩০০ শব্দের স্পিড টেস্ট।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Type exactly 300 words as fast as possible.",
    practiceText: "উদ্দেশ্য: ৩০০ শব্দ দ্রুততম সময়ে এবং সর্বোচ্চ নির্ভুলতায় সমাপ্ত করা। পরীক্ষা শুরু করুন।",
  },
  {
    id: 23,
    module: "Module 6",
    moduleTitle: "Exam Simulation",
    title: "Lesson 23: Strict Rules Exam Simulation",
    desc: "জিরো-ব্যাকস্পেস পেনাল্টি এক্সাম সিমুলেশন।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 99,
    explanation: "Zero-tolerance error penalty mode used in official BCS screening.",
    practiceText: "কঠোর শর্ত সাপেক্ষে টাইপিং শুরু করুন। প্রতি ভুলের জন্য ৫ WPM স্পিড পেনাল্টি কাটা যাবে।",
  },
  {
    id: 24,
    module: "Module 6",
    moduleTitle: "Exam Simulation",
    title: "Lesson 24: Printable Exam Scorecard",
    desc: "প্রিন্টযোগ্য ফলাফল শিট জেনারেটর।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Generate a printable official exam evaluation scorecard.",
    practiceText: "পরীক্ষা সম্পন্ন হয়েছে। আপনার স্কোরকার্ড পিডিএফ ফাইল আকারে প্রিন্ট করুন।",
  },

  // Module 7 — Mixed Real-World Content
  {
    id: 25,
    module: "Module 7",
    moduleTitle: "Mixed Real-World Content",
    title: "Lesson 25: Dates, Prices & Emails",
    desc: "তারিখ, মূল্য ও ইমেইল ঠিকানা সমৃদ্ধ অনুচ্ছেদ।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Type dates, prices, and email strings smoothly.",
    practiceText: "তারিখ: ১৫ জুলাই ২০২৬। মোট খরচ: ১২,৫০০ টাকা। Email: example@mail.com। Phone: 017XXXXXXXX।",
  },
  {
    id: 26,
    module: "Module 7",
    moduleTitle: "Mixed Real-World Content",
    title: "Lesson 26: Financial Reports & Economic GDP Data",
    desc: "অর্থনৈতিক উপাত্ত ও শতাংশ টাইপিং।",
    duration: "25 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Type financial figures, GDP growth percentages, and tables.",
    practiceText: "বাংলাদেশের GDP প্রবৃদ্ধির হার ৭.৫%। বৈদেশিক মুদ্রার রিজার্ভ ২৫.৪ বিলিয়ন ডলার। বার্ষিক রপ্তানি আয় বৃদ্ধি পেয়েছে।",
  },
  {
    id: 27,
    module: "Module 7",
    moduleTitle: "Mixed Real-World Content",
    title: "Lesson 27: Addresses & Form Data",
    desc: "ঠিকানা, ভোটার আইডি ও পাসপোর্ট তথ্য টাইপিং।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Practice data entry form fields.",
    practiceText: "ঠিকানা: বাড়ি-৪৫, রোড-১২, ধানমন্ডি, ঢাকা-১২০৯। এনআইডি নম্বর: ১৯৪০৫৬৭৮৯০১২৩।",
  },
  {
    id: 28,
    module: "Module 7",
    moduleTitle: "Mixed Real-World Content",
    title: "Lesson 28: Master Mixed Content Sprint",
    desc: "সব ধরনের উপাত্ত সমৃদ্ধ মাস্টার স্প্রিন্ট।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Combine text, numbers, symbols, emails, and prices.",
    practiceText: "স্মারক নং: ৪৬.০১২; তারিখ: ১৫/০৭/২০২৬; মূল্য: ৫,৫০০/=; কন্টাক্ট: admin@typebangla.com।",
  },

  // Module 8 — Productivity & Keyboard Shortcuts
  {
    id: 29,
    module: "Module 8",
    moduleTitle: "Productivity & Shortcuts",
    title: "Lesson 29: Copy/Paste & Text Selection Shortcuts",
    desc: "Ctrl+C, Ctrl+V, Shift+Arrow শব্দ নির্বাচন।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Master keyboard text selection without taking hands off the keyboard.",
    practiceText: "Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+A (Select All), Shift+Left (Select Text).",
  },
  {
    id: 30,
    module: "Module 8",
    moduleTitle: "Productivity & Shortcuts",
    title: "Lesson 30: Word-by-Word Cursor Navigation",
    desc: "Ctrl+Left/Right অ্যারো দিয়ে দ্রুত কার্সার নেভিগেশন।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Navigate whole words instantly using Ctrl+Left / Ctrl+Right.",
    practiceText: "দ্রুততম সময়ে কার্সার সরানোর জন্য Ctrl+অ্যারো কী ব্যবহার করুন। মাউস ছাড়া এডিটিং শিখুন।",
  },
  {
    id: 31,
    module: "Module 8",
    moduleTitle: "Productivity & Shortcuts",
    title: "Lesson 31: Line Deletion & Undo/Redo Mastery",
    desc: "Ctrl+Backspace, Ctrl+Z, Ctrl+Y টেক্সট এডিটিং।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Delete entire words with Ctrl+Backspace and undo mistakes instantly.",
    practiceText: "Ctrl+Backspace দিয়ে এক সাথে পুরো শব্দ মুছে ফেলুন। Ctrl+Z দিয়ে Undo করুন।",
  },
  {
    id: 32,
    module: "Module 8",
    moduleTitle: "Productivity & Shortcuts",
    title: "Lesson 32: Workflow Efficiency Test",
    desc: "মাউসহীন সম্পাদন গতি পরীক্ষা।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Complete a full document edit task purely via keyboard shortcuts.",
    practiceText: "সম্পাদনা চ্যালেঞ্জ: কোনো মাউস স্পর্শ না করে পুরো অনুচ্ছেদটি কপি, পেস্ট ও সংশোধন করুন।",
  },

  // Module 9 — Personal Analytics & Diagnostics
  {
    id: 33,
    module: "Module 9",
    moduleTitle: "Personal Diagnostics",
    title: "Lesson 33: Weak Key Isolation (ঞ, ঢ়, ৎ)",
    desc: "দুর্বল কী চিহ্নিতকরণ ও নিরাময় ড্রিল।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Isolate your personal slowest and most mistyped keys (e.g. ঞ, ঢ়, ৎ).",
    practiceText: "ঞ ঢ় ৎ ঃ ঙ্ ঞ ঢ় ৎ ঃ ঙ্ ঞ ঢ় ৎ বিশেষ অক্ষরসমূহের গতি বৃদ্ধি করুন।",
  },
  {
    id: 34,
    module: "Module 9",
    moduleTitle: "Personal Diagnostics",
    title: "Lesson 34: Shift Combination Fluidity",
    desc: "ডাবল লেটার ও শিফটের সঠিক সময়সাধন।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Eliminate stutter when pressing Shift key combinations.",
    practiceText: "Shift+কীবোর্ড রিচ টাইপিং: উচ্চতর অক্ষর ও চিহ্ন নিখুঁতভাবে প্রেস করুন।",
  },
  {
    id: 35,
    module: "Module 9",
    moduleTitle: "Personal Diagnostics",
    title: "Lesson 35: Error Pattern Elimination",
    desc: "ভুলের পুনরাবৃত্তি বন্ধ করার বিশেষ কৌশল।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Diagnostic breakdown of double letters and punctuation errors.",
    practiceText: "ভুলের প্যাটার্ন সংশোধন: ধীরে কিন্তু ১০০% নির্ভুলভাবে টাইপ করার মানসিক অভ্যাস গড়ুন।",
  },
  {
    id: 36,
    module: "Module 9",
    moduleTitle: "Personal Diagnostics",
    title: "Lesson 36: Telemetry Benchmark Evaluation",
    desc: "গড় WPM (74), নির্ভুলতা (98.6%) ও বিচ্যুতি রিপোর্ট।",
    duration: "20 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Detailed performance insights scorecard generated by telemetry engine.",
    practiceText: "পারফরম্যান্স ড্যাশবোর্ড: গড় গতি ৭৪ WPM, সঠিকতা ৯৮.৬%, স্থিতিশীলতা ৯৬%।",
  },

  // Module 10 — Professional Certification
  {
    id: 37,
    module: "Module 10",
    moduleTitle: "Professional Certification",
    title: "Lesson 37: 10-Minute Comprehensive Assessment",
    desc: "১০ মিনিটের প্রফেশনাল সার্টিফিকেট ফাইনাল টেস্ট।",
    duration: "25 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Comprehensive 10-minute assessment under 98%+ accuracy threshold.",
    practiceText: "চূড়ান্ত প্রফেশনাল টেস্ট: এই পরীক্ষায় আপনার গতি, সঠিকতা ও স্ট্যামিনা যৌথভাবে মূল্যায়িত হবে।",
  },
  {
    id: 38,
    module: "Module 10",
    moduleTitle: "Professional Certification",
    title: "Lesson 38: Mixed-Content Mastery Final",
    desc: "অনুধাবন, ডেটা, প্রতীক ও রচনার মিশ্র টেস্ট।",
    duration: "25 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Final multi-disciplinary typing test.",
    practiceText: "মিশ্র পরীক্ষা: গল্প, অফিসিয়াল ফাইল, ইমেইল, ডেটা ও পরিসংখ্যান সমৃদ্ধ সমাপনী পরীক্ষা।",
  },
  {
    id: 39,
    module: "Module 10",
    moduleTitle: "Professional Certification",
    title: "Lesson 39: Final Performance Audit",
    desc: "সম্পূর্ণ পারফরম্যান্স অডিট ও রেটিং।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Final verification of 60–90+ WPM output readiness.",
    practiceText: "পারফরম্যান্স অডিট সম্পন্ন! আপনার রেজাল্ট প্রফেশনাল স্ট্যান্ডার্ড অর্জন করেছে।",
  },
  {
    id: 40,
    module: "Module 10",
    moduleTitle: "Professional Certification",
    title: "Lesson 40: Professional Graduation & Verified Certificate",
    desc: "প্রফেশনাল সনদ গ্রহণ ও ক্যারিয়ার স্পেশালাইজেশন আনলক।",
    duration: "15 mins",
    completed: false,
    locked: true,
    targetAccuracy: 98,
    explanation: "Claim your Official Professional Typing Certificate & Specializations!",
    practiceText: "অভিনন্দন! আপনি টাইপবাংলা প্রফেশনাল টাইপিং মাস্টার কোর্স সফলভাবে সম্পন্ন করেছেন। 🏆",
  },
];

// ── Specialization Paths ──────────────────────────────────────────────────────
const SPECIALIZATIONS = [
  { id: "office", name: "Office Professional", icon: Briefcase, desc: "ইমেইল, রিপোর্ট, এক্সেল ডেটা এন্ট্রি ও অফিস ফাইল টাইপিং।" },
  { id: "academic", name: "Student & Research", icon: GraduationCap, desc: "প্রবন্ধ, থিসিস, সাইটেশন ও গবেষণা ল্যাব রিপোর্ট।" },
  { id: "coding", name: "Programmer & Developer", icon: Code, desc: "ইংরেজি কোডিং, চিহ্ন {} [] (), ব্র্যাকেট ও টার্মিনাল কমান্ড।" },
  { id: "content", name: "Content Creator & Blogger", icon: PenTool, desc: "আর্টিকেল, ব্লগ পোস্ট, সোশ্যাল মিডিয়া ও কপিরাইটিং।" },
  { id: "data", name: "Data Entry Specialist", icon: Database, desc: "সংখ্যা, তারিখ, ফিন্যান্সিয়াল টেবিল ও তথ্য ফরম।" },
];

export default function ProfessionalCoursePage() {
  const [activeLesson, setActiveLesson] = useState<AdvancedLesson | null>(null);
  const [drillInput, setDrillInput] = useState("");
  const [showReport, setShowReport] = useState(false);

  const completedCount = ADVANCED_LESSONS.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / ADVANCED_LESSONS.length) * 100);

  const openLessonRunner = (lesson: AdvancedLesson) => {
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
        <span className="text-[#111827] font-bold">Professional Mastery Track</span>
      </div>

      {/* ── 5-TIER CURRICULUM MILESTONES BAR ────────────────────────────────── */}
      <div className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 text-center text-xs">
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-6 h-6 rounded-full bg-[#E5E7EB] text-[#6B7280] flex items-center justify-center font-bold text-[10px]">1</span>
            <span className="font-bold text-[#6B7280]">🌱 Beginner</span>
          </div>
          <ArrowRight size={14} className="text-[#6B7280] hidden sm:block" />

          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-6 h-6 rounded-full bg-[#E5E7EB] text-[#6B7280] flex items-center justify-center font-bold text-[10px]">2</span>
            <span className="font-bold text-[#6B7280]">🚀 Intermediate</span>
          </div>
          <ArrowRight size={14} className="text-[#6B7280] hidden sm:block" />

          <div className="flex items-center gap-1.5 bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1.5 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-[10px]">3</span>
            <span className="font-black text-[#2563EB]">⚡ Professional Mastery (60–90+ WPM)</span>
          </div>
          <ArrowRight size={14} className="text-[#6B7280] hidden sm:block" />

          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-6 h-6 rounded-full bg-[#E5E7EB] text-[#6B7280] flex items-center justify-center font-bold text-[10px]">4</span>
            <span className="font-bold text-[#6B7280]">🏆 Certification</span>
          </div>
          <ArrowRight size={14} className="text-[#6B7280] hidden sm:block" />

          <div className="flex items-center gap-1.5 opacity-60">
            <span className="w-6 h-6 rounded-full bg-[#E5E7EB] text-[#6B7280] flex items-center justify-center font-bold text-[10px]">5</span>
            <span className="font-bold text-[#6B7280]">🎯 Specializations</span>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full border border-[#2563EB]/20">
              কোর্স লেভেল: প্রফেশনাল মাস্টার ট্র্যাকিং
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
              Professional Typing Course
            </h1>

            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              <strong>Goal:</strong> Achieve professional typing skills with speed, consistency, and confidence for career, exams, and daily work.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-bold text-[#111827] pt-1">
              <span className="flex items-center gap-1.5"><Clock size={15} className="text-[#2563EB]" /> ⏱ 10–15 Hours</span>
              <span className="flex items-center gap-1.5"><BookOpen size={15} className="text-[#2563EB]" /> 📚 40 Lessons</span>
              <span className="flex items-center gap-1.5"><Target size={15} className="text-[#2563EB]" /> 🎯 Target: 60–90+ WPM</span>
              <span className="flex items-center gap-1.5"><Award size={15} className="text-[#2563EB]" /> 🏆 Professional Certificate</span>
            </div>
          </div>

          {/* Professional Readiness Telemetry Dashboard Card */}
          <div className="w-full md:w-80 border border-[#E5E7EB] bg-[#F3F4F6] rounded-2xl p-5 space-y-4 shrink-0">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#111827]">Professional Readiness</span>
              <span className="text-[#2563EB] font-black">92%</span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#6B7280]">
                  <span>Average Speed</span>
                  <span className="text-[#2563EB] font-bold">74 WPM</span>
                </div>
                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#6B7280]">
                  <span>Accuracy Rate</span>
                  <span className="text-[#10B981] font-bold">98.6%</span>
                </div>
                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#6B7280]">
                  <span>Longest Session</span>
                  <span className="text-[#F59E0B] font-bold">24 Mins</span>
                </div>
                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] w-[80%]" />
                </div>
              </div>
            </div>

            <Button
              onClick={() => openLessonRunner(ADVANCED_LESSONS[completedCount] || ADVANCED_LESSONS[0])}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl shadow-md gap-2"
            >
              <Play size={14} /> Continue Professional Track
            </Button>
          </div>
        </div>
      </section>

      {/* ── 10 MODULES LIST + SIDEBAR ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Outline */}
        <div className="lg:col-span-1 space-y-4">
          <div className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-2xl p-4 shadow-sm space-y-3 sticky top-20">
            <h3 className="text-xs font-black text-[#111827] uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
              10 Modules Outline
            </h3>
            <div className="space-y-1">
              {[
                "1. Speed Optimization",
                "2. Difficult Words",
                "3. Complex Ligatures",
                "4. Professional Docs",
                "5. Long Endurance",
                "6. Exam Simulation",
                "7. Mixed Real Content",
                "8. Shortcuts Mastery",
                "9. Personal Diagnostics",
                "10. Final Certification",
              ].map((mod, i) => (
                <a
                  key={i}
                  href={`#adv-module-${i + 1}`}
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
            const modLessons = ADVANCED_LESSONS.filter((l) => l.module === `Module ${modNum}`);
            const modTitle = modLessons[0]?.moduleTitle || `Module ${modNum}`;

            return (
              <div key={modNum} id={`adv-module-${modNum}`} className="space-y-4">
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

      {/* ── OPTIONAL CAREER SPECIALIZATIONS SECTION ───────────────────────── */}
      <section className="border border-[#E5E7EB] bg-[#F3F4F6] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-[#2563EB] uppercase tracking-widest">ক্যারিয়ার স্পেশালাইজেশন</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Post-Graduation Specialization Paths</h2>
          <p className="text-sm text-[#6B7280]">কোর্স সম্পন্ন করার পর আপনার কর্মক্ষেত্র অনুযায়ী বিশেষায়িত অনুশীলন পাথ বেছে নিন।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALIZATIONS.map((spec) => (
            <Card key={spec.id} className="border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#2563EB] hover:shadow-lg transition-all rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                  <spec.icon size={20} />
                </div>
                <h3 className="font-extrabold text-sm text-[#111827]">{spec.name}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{spec.desc}</p>
                <Link href="/practice/custom" className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline pt-2">
                  ট্র্যাক নির্বাচন করুন <ArrowRight size={13} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

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
                  <h4 className="text-xs font-bold text-[#2563EB] uppercase">পেশাদার পাঠ অবজেক্টিভ (Professional Lesson Objective)</h4>
                  <p className="text-xs text-[#111827] leading-relaxed">{activeLesson.explanation}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#111827]">লক্ষ্য প্রফেশনাল টেক্সট (Target Professional Text):</label>
                  <div className="font-bangla text-base leading-relaxed p-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-2xl select-none text-[#111827]">
                    {activeLesson.practiceText}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#111827]">এখানে টাইপ করুন (Target Accuracy 98%+):</label>
                  <textarea
                    rows={3}
                    value={drillInput}
                    onChange={(e) => setDrillInput(e.target.value)}
                    placeholder="Type the target professional document passage with 98%+ accuracy..."
                    className="w-full font-bangla text-sm p-4 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#2563EB] outline-none resize-none"
                    autoFocus
                  />
                </div>

                <Button
                  disabled={drillInput.length < 10}
                  onClick={() => setShowReport(true)}
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-11 rounded-xl shadow-md gap-2"
                >
                  পারফরম্যান্স ডায়াগনস্টিক দেখুন (Submit & View Diagnosis) <ArrowRight size={14} />
                </Button>
              </div>
            ) : (
              /* Lesson Report Screen with Weak Keys Detection */
              <div className="text-center space-y-6 py-4">
                <div className="text-5xl">⚡</div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#111827]">Professional Audit Scorecard</h3>
                  <p className="text-xs text-[#6B7280]">আপনার পেশাদার টাইপিং অ্যানালিটিক্স ও দুর্বল কী রিপোর্ট:</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="border border-[#E5E7EB] bg-[#F3F4F6] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6B7280] block font-bold">AVG SPEED</span>
                    <span className="text-lg font-black text-[#2563EB]">74 WPM</span>
                  </div>
                  <div className="border border-[#E5E7EB] bg-[#F3F4F6] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6B7280] block font-bold">ACCURACY</span>
                    <span className="text-lg font-black text-[#10B981]">98.6%</span>
                  </div>
                  <div className="border border-[#E5E7EB] bg-[#F3F4F6] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6B7280] block font-bold">CONSISTENCY</span>
                    <span className="text-lg font-black text-[#6366F1]">96%</span>
                  </div>
                  <div className="border border-[#E5E7EB] bg-[#F3F4F6] p-3 rounded-xl">
                    <span className="text-[10px] text-[#6B7280] block font-bold">WEAK KEYS</span>
                    <span className="text-sm font-black text-[#EF4444]">ঞ, ঢ়, Shift</span>
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
