"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { Binary, Sparkles, RefreshCw, Hash, Percent, Keyboard as KeyboardIcon, StopCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/utils/cn";

const BANGLA_NUMBERS_POOL = [
  "১২৩৪৫", "৬৭৮৯০", "১৯৭১", "২০২৪", "৫০০", "৭৫০০", "১০০০০০", "০১৭১১", "০১৮১২",
  "২৪/০৭/২০২৪", "৫০%", "২০০ টাকা", "৫০০০ বিডিটি", "১২+৩৮=৫০", "৳৫০০", "১০০০ টাকা", "১০০% নির্ভুল"
];

const ENGLISH_NUMBERS_POOL = [
  "12345", "67890", "1971", "2024", "500", "7500", "100000", "01711", "01812",
  "24/07/2024", "50%", "$250", "5000 BDT", "12+38=50", "$500", "100% Accuracy!", "@typebangla", "#coding"
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

export default function NumbersClient() {
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
    typedText
  } = useTypingStore();

  const generateContinuousNumberStream = () => {
    // Untimed continuous stream practice (selectedDuration = 0)
    setSelectedDuration(0);

    const pool = isEnglishMode ? ENGLISH_NUMBERS_POOL : BANGLA_NUMBERS_POOL;
    const shuffled = shuffleArray(pool);
    const stream = [...shuffled, ...shuffled, ...shuffled].join(" ");

    setTargetText(stream);
    resetTest();
  };

  useEffect(() => {
    if (isEnglishMode) {
      setActiveLayout("english");
    } else if (activeLayout === "english") {
      setActiveLayout("avro");
    }
    generateContinuousNumberStream();
  }, [langParam]);

  const currentAvailableLayouts = isEnglishMode ? ENGLISH_LAYOUTS : BANGLA_LAYOUTS;
  const nextTargetChar = targetText ? targetText[typedText.length] || "" : "";

  return (
    <div className="space-y-6 fade-in">
      {/* Header Bar */}
      <Card className="rounded-2xl border border-border bg-card shadow-xs p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold">
            {isEnglishMode ? "ENGLISH NUMBERS & SYMBOLS" : "বাংলা সংখ্যা ও চিহ্ন অনুশীলন"}
          </Badge>
          <span className="text-xs text-muted-foreground font-semibold">
            {isEnglishMode ? "Continuous QWERTY Digits & Programming Symbols" : "ক্রমাগত সংখ্যা ও পাঙ্কচুয়েশন ড্রিল"}
          </span>
        </div>

        <Button
          onClick={generateContinuousNumberStream}
          variant="outline"
          size="sm"
          className="text-xs font-bold gap-1.5 border-border cursor-pointer"
        >
          <RefreshCw size={13} />
          <span>রিফ্রেশ (Refresh Stream)</span>
        </Button>
      </Card>

      {/* Typing Engine Arena */}
      <TypingArea hideModeHeader={true} />

      {/* Virtual Keyboard & Target Key Highlight */}
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
