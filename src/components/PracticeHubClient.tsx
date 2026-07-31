"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock, AlignLeft, FileText, Quote, Binary, PenLine,
  ArrowRight, Zap, Keyboard, Award, CheckCircle2, Cloud,
  Trophy, ShieldCheck, Sparkles, Activity, Unlock, UserCheck
} from "lucide-react";
import { useTypingStore, KeyboardLayout } from "../store/typingStore";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PracticeMode {
  href: string;
  icon: React.ElementType;
  title: string;
  titleBn: string;
  desc: string;
  badge: string;
  category: "bangla" | "english" | "tests" | "tools";
  targetWpm?: string;
  authBenefit?: string;
}

const ALL_MODES: PracticeMode[] = [
  {
    href: "/practice/sentences?lang=bn",
    icon: FileText,
    title: "Bangla Paragraph Practice",
    titleBn: "বাংলা অনুচ্ছেদ অনুশীলন",
    desc: "সম্পূর্ণ বাংলা বাক্য ও অনুচ্ছেদ টাইপ করে গতি ও প্রবাহমানতা বাড়ান।",
    badge: "প্যারাগ্রাফ",
    category: "bangla",
    targetWpm: "20+ WPM",
    authBenefit: "100% Free Practice",
  },
  {
    href: "/practice/words?lang=bn",
    icon: AlignLeft,
    title: "Bangla Word Practice",
    titleBn: "বাংলা শব্দমালা অনুশীলন",
    desc: "সাধারণ ও জটিল বাংলা শব্দমালা এবং যুক্তাক্ষর সমৃদ্ধ শব্দ চর্চা।",
    badge: "শব্দ ড্রিল",
    category: "bangla",
    targetWpm: "15-25 WPM",
    authBenefit: "Accuracy Focus",
  },
  {
    href: "/practice/quotes",
    icon: Quote,
    title: "Bangla Literature Quotes",
    titleBn: "রবীন্দ্রনাথ ও নজরুলের উদ্ধৃতি",
    desc: "রবীন্দ্রনাথ ঠাকুর, কাজী নজরুল ইসলাম ও বঙ্গবন্ধুর বিখ্যাত অনুচ্ছেদ টাইপিং।",
    badge: "সাহিত্য",
    category: "bangla",
    targetWpm: "25+ WPM",
    authBenefit: "Classic Literature",
  },
  {
    href: "/juktakkhor",
    icon: Sparkles,
    title: "Bangla Juktakkhor Trainer",
    titleBn: "যুক্তাক্ষর মাস্টার ট্রেইনার",
    desc: "৩০+ জটিল বাংলা যুক্তাক্ষরের কী-সিকোয়েন্স ব্রেকডাউন ও ৬০ সেকেন্ড স্পিড স্প্রিন্ট।",
    badge: "যুক্তাক্ষর",
    category: "bangla",
    targetWpm: "Mastery Drill",
    authBenefit: "Keystroke Guide",
  },
  {
    href: "/practice/numbers?lang=bn",
    icon: Binary,
    title: "Bangla Numbers & Symbols",
    titleBn: "বাংলা সংখ্যা ও পাঙ্কচুয়েশন চিহ্ন",
    desc: "বাংলা সংখ্যা (০, ১, ২, ৩...), টাকা চিহ্ন (৳), দাড়ি (।) ও বিশেষ গাণিতিক চিহ্ন চর্চা।",
    badge: "বাংলা সংখ্যা",
    category: "bangla",
    targetWpm: "Accuracy Focus",
    authBenefit: "Bangla Digits & Punctuation",
  },
  {
    href: "/practice/custom",
    icon: PenLine,
    title: "Bangla Custom Text Practice",
    titleBn: "কাস্টম বাংলা টেক্সট টাইপিং",
    desc: "নিজের প্রয়োজনীয় যেকোনো বাংলা লেখা পেস্ট করুন অথবা .TXT ফাইল আপলোড করে অনুশীলন করুন।",
    badge: "কাস্টম বাংলা",
    category: "tools",
    targetWpm: "Custom Speed",
    authBenefit: "Paste or File Upload",
  },
  {
    href: "/practice/sentences?lang=en",
    icon: FileText,
    title: "English Sentence Practice",
    titleBn: "ইংরেজি বাক্য অনুশীলন",
    desc: "স্ট্যান্ডার্ড ইংরেজি বাক্য ও প্যারাগ্রাফ টাইপিং করে নির্ভুলতা নিশ্চিত করুন।",
    badge: "Full Sentences",
    category: "english",
    targetWpm: "30+ WPM",
    authBenefit: "Sentence Flow",
  },
  {
    href: "/practice/words?lang=en",
    icon: AlignLeft,
    title: "English Word Practice",
    titleBn: "ইংরেজি শব্দমালা অনুশীলন",
    desc: "সবচেয়ে বেশি ব্যবহৃত ১০০০+ ইংরেজি শব্দ টাইপিং স্পিড ড্রিলস।",
    badge: "Top 1000 Words",
    category: "english",
    targetWpm: "35+ WPM",
    authBenefit: "1000 Common Words",
  },
  {
    href: "/practice/numbers?lang=en",
    icon: Binary,
    title: "English Numbers & Symbols",
    titleBn: "ইংরেজি সংখ্যা ও কোডিং চিহ্ন",
    desc: "নম্বর রো (0-9), বিশেষ প্রোগ্রামিং চিহ্ন (@#$%^&*), ব্র্যাকেট ও চিহ্ন টাইপিং চর্চা।",
    badge: "English Num & Symbol",
    category: "english",
    targetWpm: "Accuracy Focus",
    authBenefit: "Symbol & Code Focus",
  },
];

export function PracticeHubClient() {
  const { history, activeLayout, setActiveLayout } = useTypingStore();
  const [selectedTab, setSelectedTab] = useState<"all" | "bangla" | "english" | "tools">("all");

  const bestWpm = history && history.length > 0 ? Math.max(...history.map((h) => h.wpm)) : 0;
  const avgAccuracy = history && history.length > 0
    ? Math.round(history.reduce((acc, h) => acc + h.accuracy, 0) / history.length)
    : 0;

  const filteredModes = selectedTab === "all"
    ? ALL_MODES
    : ALL_MODES.filter((m) => m.category === selectedTab);

  const BANGLA_LAYOUT_OPTIONS: { id: KeyboardLayout; name: string }[] = [
    { id: "avro", name: "Avro Phonetic" },
    { id: "unibijoy", name: "UniBijoy 52" },
    { id: "jatiya", name: "Jatiya BCC" },
    { id: "probhat", name: "Probhat Layout" },
    { id: "inscript", name: "Inscript Bangla" },
  ];

  const ENGLISH_LAYOUT_OPTIONS: { id: KeyboardLayout; name: string }[] = [
    { id: "english", name: "English QWERTY" },
  ];

  return (
    <div className="space-y-12">
      {/* ── LIVE TELEMETRY & STATS HEADER ── */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden bg-grid-pattern space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-bold border border-border">
              <Zap size={14} className="text-primary animate-pulse" />
              <span>UNTIMED SKILL DRILLS & MUSCLE MEMORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Bangla & English Practice Hub
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              Build muscle memory and typing precision with structured word drills, literature passages, Juktakkhor breakdowns, and custom text.
            </p>
          </div>

          {/* User Quick Telemetry Badges */}
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
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Tests Taken</div>
              <div className="text-lg font-black text-foreground">{history ? history.length : 0}</div>
            </div>
          </div>
        </div>

        {/* Layout Switcher Bar */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Keyboard size={16} className="text-primary" />
            <span>Selected Keyboard Layout:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[...BANGLA_LAYOUT_OPTIONS, ...ENGLISH_LAYOUT_OPTIONS].map((layout) => (
              <button
                key={layout.id}
                onClick={() => setActiveLayout(layout.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  activeLayout === layout.id
                    ? "bg-primary text-primary-foreground border-primary shadow-xs scale-105"
                    : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {layout.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── GOVT JOB EXAM QUICK ACCESS BANNER ── */}
        <div className="pt-4 border-t border-border relative z-10">
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 shadow-xs">
                🏛️
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-foreground">Govt Job Typing Exam Simulator</span>
                  <Badge variant="outline" className="text-[10px] border-primary text-primary font-bold">BCC Official Standard</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Practicing for Ministry, Bank, or Computer Operator exams? Test your 30 WPM speed &amp; accuracy in standard 5-min exam mode.
                </p>
              </div>
            </div>
            <Link href="/exam/govt" className="shrink-0 w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto text-xs font-bold gap-1.5 px-5 h-9">
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
            { id: "all", label: "All Practice Drills", count: ALL_MODES.length },
            { id: "bangla", label: "🇧🇩 Bangla Drills", count: ALL_MODES.filter(m => m.category === "bangla").length },
            { id: "english", label: "🌐 English Drills", count: ALL_MODES.filter(m => m.category === "english").length },
            { id: "tools", label: "🛠️ Custom & Tools", count: ALL_MODES.filter(m => m.category === "tools").length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
              selectedTab === tab.id
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* ── MODE CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModes.map((mode, i) => {
          const Icon = mode.icon;
          const isEnglishDrill = mode.category === "english" || mode.href.includes("lang=en") || mode.href.includes("/tests/english");
          const cardLayoutOptions = isEnglishDrill ? ENGLISH_LAYOUT_OPTIONS : BANGLA_LAYOUT_OPTIONS;
          const currentLayout = isEnglishDrill ? "english" : (activeLayout === "english" ? "avro" : activeLayout);

          return (
            <Card
              key={i}
              className="border border-border bg-card hover:border-foreground/50 transition-all rounded-2xl shadow-xs flex flex-col justify-between group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-secondary text-foreground flex items-center justify-center border border-border group-hover:border-foreground/40 transition-all">
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

                {/* Contextual In-Card Layout Selection Pills */}
                <div className="pt-2 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                    <span>Layout for this drill:</span>
                    <span className="text-primary font-black uppercase">{currentLayout}</span>
                  </div>
                  <div className={`grid gap-1 ${isEnglishDrill ? "grid-cols-1" : "grid-cols-3 sm:grid-cols-5"}`}>
                    {cardLayoutOptions.map((layout) => {
                      const isSelected = currentLayout === layout.id;
                      return (
                        <button
                          key={layout.id}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!isEnglishDrill) {
                              setActiveLayout(layout.id);
                            }
                          }}
                          className={`px-1.5 py-1 rounded text-[10px] font-bold transition-all text-center border truncate cursor-pointer ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-secondary/60 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {layout.name.split(" ")[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-border space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-muted-foreground flex items-center gap-1">
                      <Trophy size={13} className="text-amber-500" /> Target:
                    </span>
                    <span className="font-black text-foreground">{mode.targetWpm}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Unlock size={12} className="text-emerald-500" /> Free Guest Access
                    </span>
                    <span className="flex items-center gap-1 text-sky-500 font-semibold">
                      <Cloud size={12} /> {mode.authBenefit}
                    </span>
                  </div>

                  <Link href={`${mode.href}${mode.href.includes("?") ? "&" : "?"}layout=${currentLayout}`} className="block pt-1">
                    <Button className="w-full font-black text-xs gap-2 h-10 rounded-xl shadow-xs bg-primary text-primary-foreground hover:opacity-95">
                      <span>Start in {currentLayout.toUpperCase()}</span>
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
