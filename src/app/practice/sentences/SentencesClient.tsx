"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { BANGLA_SENTENCES_LEVEL_1, BANGLA_SENTENCES_LEVEL_2, BANGLA_SENTENCES_LEVEL_3 } from "../../../data/banglaSentences";
import { ENGLISH_SENTENCES_LEVEL_1, ENGLISH_SENTENCES_LEVEL_2, ENGLISH_SENTENCES_LEVEL_3 } from "../../../data/englishSentences";
import { RefreshCw } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/utils/cn";

const KEYBOARD_LAYOUTS = [
  { id: "avro", label: "Avro" },
  { id: "unibijoy", label: "UniBijoy" },
  { id: "jatiya", label: "Jatiya" },
  { id: "probhat", label: "Probhat" },
  { id: "inscript", label: "Inscript" },
  { id: "unicode", label: "Unicode" },
  { id: "english", label: "English" },
];

const LEVELS = [
  { lvl: 1 as const, label: "🟢 সহজ", desc: "৫–১০ শব্দের বাক্য" },
  { lvl: 2 as const, label: "🟡 মধ্যম", desc: "১১–২০ শব্দের বাক্য" },
  { lvl: 3 as const, label: "🔴 কঠিন", desc: "সরকারি ও যুক্তবর্ণ" },
];

export default function SentencesClient() {
  const { activeLayout, setActiveLayout, setTargetText, resetTest } = useTypingStore();
  const [lang, setLang] = useState<"bangla" | "english">("bangla");
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [sentenceCount, setSentenceCount] = useState<number>(10);

  const generateSentenceStream = () => {
    let pool: string[] = [];
    if (lang === "bangla") {
      if (level === 1) pool = BANGLA_SENTENCES_LEVEL_1;
      else if (level === 2) pool = BANGLA_SENTENCES_LEVEL_2;
      else pool = BANGLA_SENTENCES_LEVEL_3;
    } else {
      if (level === 1) pool = ENGLISH_SENTENCES_LEVEL_1;
      else if (level === 2) pool = ENGLISH_SENTENCES_LEVEL_2;
      else pool = ENGLISH_SENTENCES_LEVEL_3;
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setTargetText(shuffled.slice(0, sentenceCount).join(" "));
    resetTest();
  };

  useEffect(() => {
    generateSentenceStream();
  }, [lang, level, sentenceCount, activeLayout]);

  return (
    <div className="space-y-5">
      {/* Back to Hub Link */}
      <Link href="/practice" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
        ← প্র্যাকটিস হাব-এ ফিরে যান
      </Link>

      {/* ── Glassmorphism Pill Toolbar ── */}
      <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-sm px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2">

          {/* Group 1: Language */}
          <div className="flex items-center gap-1">
            {[
              { value: "bangla" as const, label: "🇧🇩 বাংলা বাক্য" },
              { value: "english" as const, label: "🇬🇧 English" },
            ].map((l) => (
              <button
                key={l.value}
                onClick={() => setLang(l.value)}
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

          {/* Group 2: Difficulty Level */}
          <div className="flex items-center gap-1 flex-wrap">
            {LEVELS.map((l) => (
              <button
                key={l.lvl}
                onClick={() => setLevel(l.lvl)}
                title={l.desc}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                  level === l.lvl
                    ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <span className="h-4 w-px bg-border mx-1 hidden sm:block" />

          {/* Group 3: Sentence Count */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-muted-foreground font-semibold mr-1 hidden sm:block">বাক্য</span>
            {[5, 10, 15, 25].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setSentenceCount(cnt)}
                className={cn(
                  "px-2.5 py-1.5 rounded-full text-xs font-bold transition-all",
                  sentenceCount === cnt
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
            onClick={generateSentenceStream}
            title="নতুন বাক্য লোড করুন"
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
