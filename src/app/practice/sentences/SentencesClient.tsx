"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { BANGLA_SENTENCES_LEVEL_1, BANGLA_SENTENCES_LEVEL_2, BANGLA_SENTENCES_LEVEL_3 } from "../../../data/banglaSentences";
import { ENGLISH_SENTENCES_LEVEL_1, ENGLISH_SENTENCES_LEVEL_2, ENGLISH_SENTENCES_LEVEL_3 } from "../../../data/englishSentences";
import { RefreshCw, ArrowLeft, Keyboard as KeyboardIcon, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { cn } from "@/utils/cn";

const LEVELS = [
  { lvl: 1 as const, label: "🟢 সহজ (Level 1)", desc: "৫–১০ শব্দের বাক্য" },
  { lvl: 2 as const, label: "🟡 মধ্যম (Level 2)", desc: "১১–২০ শব্দের বাক্য" },
  { lvl: 3 as const, label: "🔴 কঠিন (Level 3)", desc: "সরকারি ও যুক্তবর্ণ" },
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

import { shuffleArray } from "@/utils/shuffle";

export default function SentencesClient() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get("lang");
  const isEnglishMode = langParam === "en";

  const {
    activeLayout,
    setActiveLayout,
    setSelectedDuration,
    setTargetText,
    resetTest,
    targetText,
    typedText,
    isCompleted
  } = useTypingStore();

  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [sentenceList, setSentenceList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const loadSentenceSet = () => {
    // Sentence Drills are untimed practice (selectedDuration = 0)
    setSelectedDuration(0);

    let pool: string[] = [];
    if (!isEnglishMode) {
      if (level === 1) pool = BANGLA_SENTENCES_LEVEL_1;
      else if (level === 2) pool = BANGLA_SENTENCES_LEVEL_2;
      else pool = BANGLA_SENTENCES_LEVEL_3;
    } else {
      if (level === 1) pool = ENGLISH_SENTENCES_LEVEL_1;
      else if (level === 2) pool = ENGLISH_SENTENCES_LEVEL_2;
      else pool = ENGLISH_SENTENCES_LEVEL_3;
    }
    const shuffled = shuffleArray(pool).slice(0, 10);
    setSentenceList(shuffled);
    setCurrentIndex(0);
    if (shuffled.length > 0) {
      setTargetText(shuffled[0]);
    }
    resetTest();
  };

  useEffect(() => {
    if (isEnglishMode) {
      setActiveLayout("english");
    } else if (activeLayout === "english") {
      setActiveLayout("avro");
    }
    loadSentenceSet();
  }, [langParam, level]);

  // Auto-advance to next sentence when current sentence is completed
  useEffect(() => {
    if (isCompleted && sentenceList.length > 0) {
      if (currentIndex < sentenceList.length - 1) {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setTargetText(sentenceList[nextIdx]);
        resetTest();
      }
    }
  }, [isCompleted, currentIndex, sentenceList]);

  const currentAvailableLayouts = isEnglishMode ? ENGLISH_LAYOUTS : BANGLA_LAYOUTS;
  const nextTargetChar = targetText ? targetText[typedText.length] || "" : "";

  return (
    <div className="space-y-6">
      {/* Back to Hub Link & Progress Badge */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <Link href="/practice" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> প্র্যাকটিস হাব-এ ফিরে যান (Back to Practice Hub)
        </Link>
        <Badge variant="outline" className="text-xs font-mono font-bold border-primary/30 text-primary uppercase">
          SENTENCE DRILL: {currentIndex + 1} OF {sentenceList.length || 10}
        </Badge>
      </div>

      {/* ── Toolbar: Level Selector & Refresh ── */}
      <Card className="rounded-2xl border border-border bg-card shadow-xs p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">

          {/* Difficulty Level Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">লেভেল (Level):</span>
            {LEVELS.map((l) => (
              <button
                key={l.lvl}
                onClick={() => setLevel(l.lvl)}
                title={l.desc}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                  level === l.lvl
                    ? "bg-primary text-primary-foreground border-primary shadow-xs font-black"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Action Controls: Next / Refresh */}
          <div className="flex items-center gap-2">
            <button
              onClick={loadSentenceSet}
              title="নতুন সেট লোড করুন"
              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>নতুন সেট</span>
            </button>
          </div>

        </div>
      </Card>

      {/* ── Typing Arena (1 Sentence at a Time) ── */}
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
