"use client";

import React, { useState, useEffect } from "react";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { BANGLA_WORDS_LEVEL_1, BANGLA_WORDS_LEVEL_2, BANGLA_WORDS_LEVEL_3 } from "../../../data/banglaFrequentWords";
import { AlignLeft, RefreshCw } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/utils/cn";

export type WordCategory = "frequent-bn" | "juktakkhor" | "govt-terms" | "english-core";

const ALL_ENGLISH_WORDS = [
  "about", "above", "after", "again", "agree", "allow", "along", "apple", "arena", "artist",
  "basic", "beach", "begin", "black", "board", "brain", "brave", "breeze", "brown", "build",
  "clean", "clear", "clock", "cloud", "coast", "color", "count", "course", "craft", "cyber",
  "daily", "dance", "delay", "depth", "digit", "dirty", "dream", "drill", "drive", "dusk",
  "early", "earth", "eight", "elite", "empty", "enemy", "enjoy", "equal", "event", "every",
  "faith", "false", "field", "fight", "final", "first", "focus", "force", "forest", "front"
];

const JUKTAKKHOR_WORDS = [
  "জ্ঞান", "বিজ্ঞান", "শ্রদ্ধা", "সংস্কৃতি", "স্বাধীনতা", "ঐতিহ্য", "স্মৃতি", "স্পন্দন",
  "প্রতিনিধি", "অগ্রগতি", "প্রজন্ম", "সমন্বয়", "সক্ষমতা", "সুশাসন", "বাস্তবায়ন", "কাঠামো",
  "দক্ষতা", "দূরদর্শিতা", "পেশাদারিত্ব", "ব্রহ্মপুত্র", "আকাঙ্ক্ষা", "সঙ্কট", "অঞ্জলি", "উজ্জ্বল",
  "প্রস্তাব", "সৃষ্টি", "কষ্ট", "স্পষ্ট", "প্রভাত", "শ্রাবণ", "প্রীতি", "সূর্য", "চন্দ্র", "গ্রহ"
];

const GOVT_TERMS = [
  "সচিবালয়", "মন্ত্রণালয়", "প্রশাসন", "ক্যাবিনেট", "অপারেটর", "নিয়োগ", "নথি", "প্রক্রিয়া",
  "রাজস্ব", "কাস্টমস", "আয়কর", "রিটার্ন", "রেগুলেশন", "তদারকি", "পরিদর্শন", "বিজ্ঞপ্তি",
  "পরীক্ষার্থী", "স্বচ্ছতা", "দায়িত্বশীলতা", "সহকারী", "কর্মকর্তা", "অধিদপ্তর", "মহাপরিচালক"
];

const BANGLA_CATEGORIES = [
  { id: "frequent-bn", label: "🔥 সাধারণ শব্দ" },
  { id: "juktakkhor", label: "🧩 যুক্তবর্ণ" },
  { id: "govt-terms", label: "💼 সরকারি" },
];

const KEYBOARD_LAYOUTS = [
  { id: "avro", label: "Avro" },
  { id: "unibijoy", label: "UniBijoy" },
  { id: "jatiya", label: "Jatiya" },
  { id: "probhat", label: "Probhat" },
  { id: "inscript", label: "Inscript" },
  { id: "unicode", label: "Unicode" },
  { id: "english", label: "English" },
];

export default function WordsClient() {
  const { activeLayout, setActiveLayout, setTargetText, resetTest } = useTypingStore();
  const [lang, setLang] = useState<"bangla" | "english">("bangla");
  const [category, setCategory] = useState<WordCategory>("frequent-bn");
  const [wordCount, setWordCount] = useState<number>(50);

  const generateWordsStream = () => {
    let pool: string[] = [];
    if (lang === "english" || category === "english-core") {
      pool = ALL_ENGLISH_WORDS;
    } else if (category === "juktakkhor") {
      pool = JUKTAKKHOR_WORDS;
    } else if (category === "govt-terms") {
      pool = GOVT_TERMS;
    } else {
      pool = [...BANGLA_WORDS_LEVEL_1, ...BANGLA_WORDS_LEVEL_2, ...BANGLA_WORDS_LEVEL_3];
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setTargetText(shuffled.slice(0, wordCount).join(" "));
    resetTest();
  };

  useEffect(() => {
    generateWordsStream();
  }, [category, lang, wordCount, activeLayout]);

  return (
    <div className="space-y-5">

      {/* ── Glassmorphism Pill Toolbar ── */}
      <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-sm px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2">

          {/* Group 1: Language */}
          <div className="flex items-center gap-1">
            {[
              { value: "bangla" as const, label: "🇧🇩 বাংলা" },
              { value: "english" as const, label: "🇬🇧 English" },
            ].map((l) => (
              <button
                key={l.value}
                onClick={() => { setLang(l.value); if (l.value === "english") setCategory("english-core"); else setCategory("frequent-bn"); }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                  lang === l.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <span className="h-4 w-px bg-border mx-1 hidden sm:block" />

          {/* Group 2: Category (Bangla only) */}
          {lang === "bangla" && (
            <div className="flex items-center gap-1 flex-wrap">
              {BANGLA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as WordCategory)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                    category === cat.id
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Divider */}
          <span className="h-4 w-px bg-border mx-1 hidden sm:block" />

          {/* Group 3: Word Count */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-muted-foreground font-semibold mr-1 hidden sm:block">শব্দ</span>
            {[25, 50, 100, 200].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setWordCount(cnt)}
                className={cn(
                  "px-2.5 py-1.5 rounded-full text-xs font-bold transition-all",
                  wordCount === cnt
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {cnt}
              </button>
            ))}
          </div>

          {/* Divider */}
          <span className="h-4 w-px bg-border mx-1 hidden sm:block" />

          {/* Group 4: Refresh */}
          <button
            onClick={generateWordsStream}
            title="নতুন শব্দ লোড করুন"
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <RefreshCw size={14} />
          </button>

        </div>
      </div>

      {/* ── Typing Arena ── */}
      <TypingArea />

      {/* ── Keyboard Layout Selector ── */}
      <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-sm px-4 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">কিবোর্ড লেআউট</span>
          <Badge variant="outline" className="border-primary/50 text-primary font-bold text-[10px] uppercase px-2 py-0.5">
            {activeLayout}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {KEYBOARD_LAYOUTS.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLayout(l.id as KeyboardLayout)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                activeLayout === l.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
        <VirtualKeyboard />
      </div>

    </div>
  );
}
