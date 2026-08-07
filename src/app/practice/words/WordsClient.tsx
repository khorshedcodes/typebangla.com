"use client";

import React, { useState, useEffect } from "react";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { BANGLA_WORDS_LEVEL_1, BANGLA_WORDS_LEVEL_2, BANGLA_WORDS_LEVEL_3 } from "../../../data/banglaFrequentWords";
import { AlignLeft, Sparkles, RefreshCw, CheckCircle2, Globe, ShieldCheck } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
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
    const selected = shuffled.slice(0, wordCount);
    const resultText = selected.join(" ");

    setTargetText(resultText);
    resetTest();
  };

  useEffect(() => {
    generateWordsStream();
  }, [category, lang, wordCount, activeLayout]);

  return (
    <div className="space-y-6">
      {/* Category & Controls Header */}
      <Card className="border border-border bg-card p-6 rounded-2xl shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
              <AlignLeft size={16} className="text-primary" />
              <span>১. শব্দ ক্যাটাগরি ও ভাষা নির্বাচন করুন:</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">একক শব্দ অনুশীলনে আঙুলের অন্ধ স্পর্শ স্মৃতি (Muscle Memory) গড়ে ওঠে</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setLang("bangla"); setCategory("frequent-bn"); }}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all", lang === "bangla" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-secondary text-muted-foreground")}
            >
              🇧🇩 বাংলা শব্দ
            </button>
            <button
              onClick={() => { setLang("english"); setCategory("english-core"); }}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all", lang === "english" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-secondary text-muted-foreground")}
            >
              🇬🇧 English Words
            </button>
          </div>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {lang === "bangla" ? (
            <>
              {[
                { id: "frequent-bn", label: "🔥 উচ্চ-ফ্রিকোয়েন্সি সাধারণ শব্দ" },
                { id: "juktakkhor", label: "🧩 যুক্তবর্ণ বিশিষ্ট শব্দ" },
                { id: "govt-terms", label: "💼 সরকারি চাকরি ও দাপ্তরিক শব্দ" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as WordCategory)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all",
                    category === cat.id
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 shadow-xs"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </>
          ) : (
            <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/40 text-xs font-bold py-1 px-3">
              🔤 1,000 Most Frequent English Words
            </Badge>
          )}
        </div>

        {/* Word Count Targets */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">শব্দ সংখ্যা:</span>
            {[25, 50, 100, 200].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setWordCount(cnt)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold border transition-all",
                  wordCount === cnt
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {cnt} শব্দ
              </button>
            ))}
          </div>

          <Button size="sm" onClick={generateWordsStream} className="gap-1.5 font-bold text-xs">
            <RefreshCw size={13} />
            <span>নতুন শব্দ লোড করুন</span>
          </Button>
        </div>
      </Card>

      {/* Interactive Typing Arena */}
      <TypingArea />

      {/* Keyboard Layout Guide */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-foreground tracking-wider">
            কিবোর্ড লেআউট পরিবর্তন করুন:
          </h3>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase">
            {activeLayout}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "avro", label: "Avro Phonetic" },
            { id: "unibijoy", label: "UniBijoy" },
            { id: "jatiya", label: "Jatiya (BCC)" },
            { id: "probhat", label: "Probhat" },
            { id: "inscript", label: "Inscript" },
            { id: "unicode", label: "Unicode" },
            { id: "english", label: "English QWERTY" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLayout(l.id as KeyboardLayout)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                activeLayout === l.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
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
