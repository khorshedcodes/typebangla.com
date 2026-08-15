"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { getPassageForDuration } from "../../../utils/lessons/exam/examPassages";
import { RefreshCw, ArrowLeft, Keyboard as KeyboardIcon, Sparkles } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { cn } from "@/utils/cn";

const DURATIONS = [
  { sec: 60,  label: "1 মিনিট",  tag: "1 min" },
  { sec: 120, label: "2 মিনিট",  tag: "2 min" },
  { sec: 180, label: "3 মিনিট",  tag: "3 min" },
  { sec: 300, label: "5 মিনিট",  tag: "5 min" },
  { sec: 600, label: "10 মিনিট", tag: "10 min" },
  { sec: 900, label: "15 মিনিট", tag: "15 min" },
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

export default function SpeedTestPracticeClient() {
  const searchParams = useSearchParams();
  const initialDuration = parseInt(searchParams.get("duration") || "300", 10);
  const initialLayout = (searchParams.get("layout") as KeyboardLayout) || "avro";

  const {
    activeLayout,
    setActiveLayout,
    setSelectedDuration,
    selectedDuration,
    setTargetText,
    resetTest,
    targetText,
    typedText
  } = useTypingStore();

  const [lang, setLang] = useState<"bangla" | "english">(initialLayout === "english" ? "english" : "bangla");

  const setupSpeedTest = (durationSec: number, selectedLang: "bangla" | "english" = lang) => {
    setSelectedDuration(durationSec);
    const p = getPassageForDuration(selectedLang, durationSec);
    setTargetText(p.text);
    resetTest();
  };

  useEffect(() => {
    const nextLayout = initialLayout === "english" ? "english" : initialLayout;
    setActiveLayout(nextLayout);
    setupSpeedTest(initialDuration, initialLayout === "english" ? "english" : "bangla");
  }, [initialDuration, initialLayout]);

  const currentAvailableLayouts = lang === "english" ? ENGLISH_LAYOUTS : BANGLA_LAYOUTS;
  const nextTargetChar = targetText ? targetText[typedText.length] || "" : "";

  return (
    <div className="space-y-6">
      {/* Back to Practice Hub Link */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <Link href="/practice" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> প্র্যাকটিস হাব-এ ফিরে যান (Back to Practice Hub)
        </Link>
        <Badge variant="outline" className="text-xs font-mono font-bold border-primary/30 text-primary uppercase">
          TIMED SPEED TEST ARENA
        </Badge>
      </div>

      {/* ── Toolbar: Language & Duration Pills ── */}
      <Card className="rounded-2xl border border-border bg-card shadow-xs p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">

          {/* Group 1: Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ভাষা:</span>
            {[
              { value: "bangla" as const, label: "🇧🇩 বাংলা" },
              { value: "english" as const, label: "🇬🇧 English" },
            ].map((l) => (
              <button
                key={l.value}
                onClick={() => {
                  setLang(l.value);
                  const nextLayout = l.value === "english" ? "english" : (activeLayout === "english" ? "avro" : activeLayout);
                  setActiveLayout(nextLayout);
                  setupSpeedTest(selectedDuration || 300, l.value);
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border",
                  lang === l.value
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Group 2: Duration Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">সময়সীমা:</span>
            {DURATIONS.map((d) => (
              <button
                key={d.sec}
                onClick={() => setupSpeedTest(d.sec)}
                title={d.tag}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                  selectedDuration === d.sec
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/50 shadow-xs font-black"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Group 3: Refresh Passage */}
          <button
            onClick={() => setupSpeedTest(selectedDuration || 300)}
            title="নতুন প্যাসেজ লোড করুন"
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>নতুন প্যাসেজ</span>
          </button>

        </div>
      </Card>

      {/* ── Typing Engine Arena ── */}
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
                onClick={() => {
                  const nextLang = l.id === "english" ? "english" : "bangla";
                  setLang(nextLang);
                  setActiveLayout(l.id as KeyboardLayout);
                  setupSpeedTest(selectedDuration || 300, nextLang);
                }}
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
