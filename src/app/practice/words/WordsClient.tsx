"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { BANGLA_WORDS_LEVEL_1, BANGLA_WORDS_LEVEL_2, BANGLA_WORDS_LEVEL_3 } from "../../../data/banglaFrequentWords";
import { AlignLeft, RefreshCw, ArrowLeft, Keyboard as KeyboardIcon, Sparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { cn } from "@/utils/cn";

export type WordCategory = "frequent-bn" | "juktakkhor" | "govt-terms" | "english-core";

const ALL_ENGLISH_WORDS = [
  "about", "above", "after", "again", "agree", "allow", "along", "apple", "arena", "artist",
  "basic", "beach", "begin", "black", "board", "brain", "brave", "breeze", "brown", "build",
  "clean", "clear", "clock", "cloud", "coast", "color", "count", "course", "craft", "cyber",
  "daily", "dance", "delay", "depth", "digit", "dirty", "dream", "drill", "drive", "dusk",
  "early", "earth", "eight", "elite", "empty", "enemy", "enjoy", "equal", "event", "every",
  "faith", "false", "field", "fight", "final", "first", "focus", "force", "forest", "front",
  "great", "green", "group", "guard", "guide", "happy", "heart", "heavy", "house", "image"
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

const BANGLA_LAYOUTS = [
  { id: "avro",     label: "Avro Phonetic (অভ্র)" },
  { id: "unibijoy", label: "UniBijoy (ইউনিবিজয়)" },
  { id: "jatiya",   label: "Jatiya BCC (জাতীয়)" },
  { id: "probhat",  label: "Probhat (প্রভাত)" },
  { id: "inscript", label: "Inscript (ইনস্ক্রিপ্ট)" },
  { id: "unicode",  label: "Unicode (ইউনিকোড)" },
];

const ENGLISH_LAYOUTS = [
  { id: "english",  label: "English QWERTY" },
];

export default function WordsClient() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get("lang");
  const isEnglishMode = langParam === "en";
  const lang = isEnglishMode ? "english" : "bangla";

  const {
    activeLayout,
    setActiveLayout,
    setSelectedDuration,
    setTargetText,
    resetTest,
    targetText,
    typedText
  } = useTypingStore();

  const [category, setCategory] = useState<WordCategory>(isEnglishMode ? "english-core" : "frequent-bn");
  const [wordCount, setWordCount] = useState<number>(30);

  const generateWordsStream = () => {
    // Word Drills are untimed practice (selectedDuration = 0)
    setSelectedDuration(0);

    let pool: string[] = [];
    if (isEnglishMode || category === "english-core") {
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
    if (isEnglishMode) {
      setActiveLayout("english");
    } else if (activeLayout === "english") {
      setActiveLayout("avro");
    }
    generateWordsStream();
  }, [category, langParam, wordCount, activeLayout]);

  const currentAvailableLayouts = isEnglishMode ? ENGLISH_LAYOUTS : BANGLA_LAYOUTS;
  const nextTargetChar = targetText ? targetText[typedText.length] || "" : "";

  return (
    <div className="space-y-6">
      {/* Back to Hub Link */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <Link href="/practice" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> প্র্যাকটিস হাব-এ ফিরে যান (Back to Practice Hub)
        </Link>
        <Badge variant="outline" className="text-xs font-mono font-bold border-primary/30 text-primary uppercase">
          UNTIMED WORD DRILL ARENA
        </Badge>
      </div>

      {/* ── Toolbar: Category & Word Count Pills ── */}
      <Card className="rounded-2xl border border-border bg-card shadow-xs p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">

          {/* Category Selector (Bangla only) */}
          {!isEnglishMode ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ক্যাটাগরি:</span>
              {BANGLA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as WordCategory)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                    category === cat.id
                      ? "bg-primary text-primary-foreground border-primary shadow-xs font-black"
                      : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold">
                🌐 High-Frequency English Words (1000+ Vocabulary)
              </Badge>
            </div>
          )}

          {/* Word Count Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">শব্দ সংখ্যা:</span>
            {[20, 30, 50, 100].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setWordCount(cnt)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                  wordCount === cnt
                    ? "bg-primary text-primary-foreground border-primary shadow-xs font-black"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {cnt} শব্দ
              </button>
            ))}

            <button
              onClick={generateWordsStream}
              title="নতুন শব্দ রিফ্রেশ করুন"
              className="ml-2 px-3 py-1.5 rounded-xl text-xs font-bold border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>রিফ্রেশ</span>
            </button>
          </div>

        </div>
      </Card>

      {/* ── Typing Arena ── */}
      <TypingArea hideModeHeader={true} />

      {/* ── Virtual Keyboard & Target Key Highlight ── */}
      <Card className="rounded-2xl border border-border bg-card shadow-xs p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2 text-foreground">
            <KeyboardIcon size={18} className="text-primary" />
            <span className="text-xs sm:text-sm font-black text-foreground">অন-স্ক্রিন কীবোর্ড গাইড (Virtual Keyboard Guide)</span>
          </div>

          {/* Language-Aware Layout Selection Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-muted-foreground uppercase mr-1">লেআউট:</span>
            {currentAvailableLayouts.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveLayout(l.id as KeyboardLayout)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border cursor-pointer",
                  activeLayout === l.id
                    ? "bg-primary text-primary-foreground border-primary shadow-xs font-black"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Target Next Key Hint Display */}
        {nextTargetChar && (
          <div className="bg-primary/10 border border-primary/20 p-2.5 rounded-xl text-xs font-bold text-primary flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="animate-pulse" />
              <span>পরবর্তী বর্ণ (Target Key): <code className="bg-background text-foreground px-2 py-0.5 rounded border border-border font-bangla text-sm font-black">{nextTargetChar === " " ? "Spacebar (স্পেস)" : nextTargetChar}</code></span>
            </span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase">Highlight Enabled</span>
          </div>
        )}

        <VirtualKeyboard activeLayout={activeLayout} nextChar={nextTargetChar} />
      </Card>

    </div>
  );
}
