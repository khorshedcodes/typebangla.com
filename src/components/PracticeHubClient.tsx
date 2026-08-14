"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock, AlignLeft, FileText, Quote, Binary, PenLine,
  ArrowRight, Zap, Keyboard, Award, CheckCircle2, Cloud,
  Trophy, ShieldCheck, Sparkles, Activity, Unlock, UserCheck, Languages
} from "lucide-react";
import { useTypingStore, KeyboardLayout } from "../store/typingStore";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PracticeMode {
  id: string;
  href: string;
  icon: React.ElementType;
  title: string;
  titleBn: string;
  desc: string;
  instructionNote: string;
  badge: string;
  category: "bangla" | "english" | "tools";
}

const BANGLA_MODES: PracticeMode[] = [
  {
    id: "bn-sentences",
    href: "/practice/sentences?lang=bn",
    icon: FileText,
    title: "Bangla Paragraph Practice",
    titleBn: "বাংলা অনুচ্ছেদ অনুশীলন",
    desc: "সম্পূর্ণ বাংলা বাক্য ও অনুচ্ছেদ টাইপ করে গতি ও প্রবাহমানতা বাড়ান।",
    instructionNote: "সহজ থেকে কঠিন বাংলা বাক্য অনুশীলন করে টাইপিং স্পিড বৃদ্ধি করুন।",
    badge: "প্যারাগ্রাফ",
    category: "bangla",
  },
  {
    id: "bn-words",
    href: "/practice/words?lang=bn",
    icon: AlignLeft,
    title: "Bangla Word Practice",
    titleBn: "বাংলা শব্দমালা অনুশীলন",
    desc: "সাধারণ ও জটিল বাংলা শব্দমালা এবং যুক্তাক্ষর সমৃদ্ধ শব্দ চর্চা।",
    instructionNote: "কীবোর্ডের সঠিক বর্ণ পজিশনিং ও শব্দ চেনার গতি বাড়াতে অনুশীলন করুন।",
    badge: "শব্দ ড্রিল",
    category: "bangla",
  },
  {
    id: "bn-quotes",
    href: "/practice/quotes",
    icon: Quote,
    title: "Bangla Literature Quotes",
    titleBn: "রবীন্দ্রনাথ ও নজরুলের উদ্ধৃতি",
    desc: "রবীন্দ্রনাথ ঠাকুর, কাজী নজরুল ইসলাম ও বঙ্গবন্ধুর বিখ্যাত অনুচ্ছেদ টাইপিং।",
    instructionNote: "মানসম্মত সাহিত্যিক বাক্য টাইপিংয়ের মাধ্যমে পেশাদার হাতের গতি তৈরি করুন।",
    badge: "সাহিত্য",
    category: "bangla",
  },
  {
    id: "bn-juktakkhor",
    href: "/juktakkhor",
    icon: Sparkles,
    title: "Bangla Juktakkhor Trainer",
    titleBn: "যুক্তাক্ষর মাস্টার ট্রেইনার",
    desc: "৩০+ জটিল বাংলা যুক্তাক্ষরের কী-সিকোয়েন্স ব্রেকডাউন ও ৬০ সেকেন্ড স্পিড স্প্রিন্ট।",
    instructionNote: "জটিল বাংলা যুক্তবর্ণ লেখার নিয়ম ও ফাস্ট টাইপিং গাইড অনুশীলন করুন।",
    badge: "যুক্তাক্ষর",
    category: "bangla",
  },
  {
    id: "bn-numbers",
    href: "/practice/numbers?lang=bn",
    icon: Binary,
    title: "Bangla Numbers & Symbols",
    titleBn: "বাংলা সংখ্যা ও পাঙ্কচুয়েশন চিহ্ন",
    desc: "বাংলা সংখ্যা (০, ১, ২, ৩...), টাকা চিহ্ন (৳), দাড়ি (।) ও গাণিতিক চিহ্ন চর্চা।",
    instructionNote: "সংখ্যা রো ও দাড়ি-কমা পাঙ্কচুয়েশনের নির্ভুলতা বৃদ্ধি করুন।",
    badge: "সংখ্যা ও চিহ্ন",
    category: "bangla",
  },
];

const ENGLISH_MODES: PracticeMode[] = [
  {
    id: "en-sentences",
    href: "/practice/sentences?lang=en",
    icon: FileText,
    title: "English Sentence Practice",
    titleBn: "ইংরেজি বাক্য অনুশীলন",
    desc: "স্ট্যান্ডার্ড ইংরেজি বাক্য ও প্যারাগ্রাফ টাইপিং করে নির্ভুলতা নিশ্চিত করুন।",
    instructionNote: "10-finger touch typing and sentence flow speed building.",
    badge: "Full Sentences",
    category: "english",
  },
  {
    id: "en-words",
    href: "/practice/words?lang=en",
    icon: AlignLeft,
    title: "English Word Practice",
    titleBn: "ইংরেজি শব্দমালা অনুশীলন",
    desc: "সবচেয়ে বেশি ব্যবহৃত ১০০০+ ইংরেজি শব্দ টাইপিং স্পিড ড্রিলস।",
    instructionNote: "Master top 1000 high-frequency English vocabulary words.",
    badge: "Top 1000 Words",
    category: "english",
  },
  {
    id: "en-numbers",
    href: "/practice/numbers?lang=en",
    icon: Binary,
    title: "English Numbers & Symbols",
    titleBn: "ইংরেজি সংখ্যা ও কোডিং চিহ্ন",
    desc: "নম্বর রো (0-9), বিশেষ প্রোগ্রামিং চিহ্ন (@#$%^&*), ব্র্যাকেট ও চিহ্ন টাইপিং চর্চা।",
    instructionNote: "Number row, brackets, and developer programming symbol drills.",
    badge: "Num & Symbol",
    category: "english",
  },
  {
    id: "mixed-bilingual",
    href: "/bangla-english-mixed-typing-test",
    icon: Languages,
    title: "Bilingual Mixed Speed Test",
    titleBn: "বাংলা-ইংরেজি দ্বিমুখী মিক্সড টেস্ট",
    desc: "BPSC ও ব্যাংক পরীক্ষার জন্য একটি টেস্টেই বাংলা ও ইংরেজি মিক্সড টাইপিং প্র্যাকটিস।",
    instructionNote: "BPSC and Bank Govt exam bilingual alternating language test.",
    badge: "Bilingual Test",
    category: "english",
  },
];

const TOOL_MODES: PracticeMode[] = [
  {
    id: "bn-custom",
    href: "/practice/custom",
    icon: PenLine,
    title: "Bangla Custom Text Practice",
    titleBn: "কাস্টম বাংলা টেক্সট টাইপিং",
    desc: "নিজের প্রয়োজনীয় যেকোনো বাংলা লেখা পেস্ট করুন অথবা .TXT ফাইল আপলোড করে অনুশীলন করুন।",
    instructionNote: "নিজের প্রশ্নপত্র, দরখাস্ত বা ফাইল পেস্ট করে প্র্যাকটিস করুন।",
    badge: "কাস্টম বাংলা",
    category: "tools",
  },
];

export function PracticeHubClient() {
  const { user } = useAuth();
  const { history, activeLayout, setActiveLayout } = useTypingStore();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "bangla" | "english" | "tools">("all");

  const bestWpm = history && history.length > 0 ? Math.max(...history.map((h) => h.wpm)) : 0;
  const avgAccuracy = history && history.length > 0
    ? Math.round(history.reduce((acc, h) => acc + h.accuracy, 0) / history.length)
    : 0;

  const BANGLA_LAYOUT_OPTIONS: { id: KeyboardLayout; name: string }[] = [
    { id: "avro", name: "Avro" },
    { id: "unibijoy", name: "UniBijoy" },
    { id: "jatiya", name: "Jatiya" },
    { id: "probhat", name: "Probhat" },
    { id: "inscript", name: "Inscript" },
  ];

  const renderCard = (mode: PracticeMode) => {
    const Icon = mode.icon;
    const isBangla = mode.category === "bangla";

    return (
      <Card
        key={mode.id}
        className="border border-border bg-card hover:border-primary/50 transition-all rounded-2xl shadow-xs flex flex-col justify-between group"
      >
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <Icon size={22} />
            </div>
            <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary text-[11px]">
              {mode.badge}
            </Badge>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">{mode.title}</h3>
            <div className="text-xs font-bold text-muted-foreground">{mode.titleBn}</div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">{mode.desc}</p>
          </div>

          {/* Instructional User Note */}
          <div className="p-3 bg-secondary/50 rounded-xl border border-border text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
            <span>{mode.instructionNote}</span>
          </div>

          {/* Layout Selector Pill (Bangla Only) */}
          {isBangla && (
            <div className="pt-2 border-t border-border space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                <span>কীবোর্ড লেআউট নির্বাচন করুন:</span>
                <span className="text-primary font-black uppercase">{activeLayout}</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {BANGLA_LAYOUT_OPTIONS.map((layout) => {
                  const isSelected = activeLayout === layout.id;
                  return (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveLayout(layout.id);
                      }}
                      className={`px-1.5 py-1 rounded-lg text-[10px] font-bold transition-all text-center border truncate cursor-pointer ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-xs font-black"
                          : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {layout.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Link href={mode.href} className="block pt-2">
            <Button className="w-full font-black text-xs gap-2 h-10 rounded-xl shadow-xs bg-primary text-primary-foreground hover:opacity-95 cursor-pointer">
              <span>অনুশীলন শুরু করুন</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-12">
      {/* ── CLEAN TOP HEADER CARD ── */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold border border-primary/20">
              <Zap size={14} className="text-primary animate-pulse" />
              <span>UNTIMED SKILL DRILLS & MUSCLE MEMORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Bangla &amp; English Practice Hub
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              সঠিক আঙুলের অবস্থান ও পেশি স্মৃতি (muscle memory) তৈরির জন্য বাংলা ও ইংরেজি টাইপিং ড্রিলস।
            </p>
          </div>

          {/* User Record Telemetry (Only when logged in AND has history) */}
          {user && history && history.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-secondary rounded-xl px-4 py-2.5 border border-border text-center">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Best Speed</div>
                <div className="text-lg font-black text-foreground">{bestWpm} <span className="text-xs font-semibold text-muted-foreground">WPM</span></div>
              </div>

              <div className="bg-secondary rounded-xl px-4 py-2.5 border border-border text-center">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Avg Accuracy</div>
                <div className="text-lg font-black text-foreground">{avgAccuracy}%</div>
              </div>

              <div className="bg-secondary rounded-xl px-4 py-2.5 border border-border text-center">
                <div className="text-[10px] font-bold text-muted-foreground uppercase font-mono">Tests Taken</div>
                <div className="text-lg font-black text-foreground">{history.length}</div>
              </div>
            </div>
          )}
        </div>

        {/* ── GOVT JOB EXAM QUICK ACCESS BANNER ── */}
        <div className="pt-4 border-t border-border">
          <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 shadow-xs">
                🏛️
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-foreground">Govt Job Typing Exam Simulator</span>
                  <Badge variant="outline" className="text-[10px] border-primary text-primary font-bold">BCC Standard</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  সরকারি চাকরির কম্পিউটার অপারেটর পরীক্ষার জন্য ৫ মিনিটের পরীক্ষা দিন।
                </p>
              </div>
            </div>
            <Link href="/exam/govt" className="shrink-0 w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto text-xs font-bold gap-1.5 px-5 h-9 cursor-pointer">
                <span>Start Govt Exam</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── CATEGORY FILTER TABS ── */}
      <div className="flex items-center gap-2 flex-wrap border-b border-border pb-4">
        {(
          [
            { id: "all", label: "সব ড্রিলস (All Practice)" },
            { id: "bangla", label: "🇧🇩 বাংলা টাইপিং ড্রিলস" },
            { id: "english", label: "🌐 English Typing Drills" },
            { id: "tools", label: "🛠️ কাস্টম ও প্র্যাকটিস টুলস" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
              selectedCategory === tab.id
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SEPARATED PRACTICE SECTIONS ── */}
      
      {/* 1. Bangla Practice Section */}
      {(selectedCategory === "all" || selectedCategory === "bangla") && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="text-xl">🇧🇩</span>
            <h2 className="text-xl font-black text-foreground">বাংলা টাইপিং অনুশীলন (Bangla Practice Modes)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BANGLA_MODES.map(renderCard)}
          </div>
        </section>
      )}

      {/* 2. English Practice Section */}
      {(selectedCategory === "all" || selectedCategory === "english") && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="text-xl">🌐</span>
            <h2 className="text-xl font-black text-foreground">English Typing Practice Modes (ইংরেজি অনুশীলন)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGLISH_MODES.map(renderCard)}
          </div>
        </section>
      )}

      {/* 3. Custom & Tools Section */}
      {(selectedCategory === "all" || selectedCategory === "tools") && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="text-xl">🛠️</span>
            <h2 className="text-xl font-black text-foreground">কাস্টম ও টেক্সট টুলস (Custom Text Practice)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOL_MODES.map(renderCard)}
          </div>
        </section>
      )}
    </div>
  );
}
