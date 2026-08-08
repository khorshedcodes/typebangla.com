"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { getPassageForDuration } from "../../../utils/lessons/exam/examPassages";
import { RefreshCw } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/utils/cn";

const DURATIONS = [
  { sec: 60,  label: "1 মিনিট",  tag: "শর্ট"    },
  { sec: 120, label: "2 মিনিট",  tag: "কুইক"    },
  { sec: 180, label: "3 মিনিট",  tag: "স্ট্যান্ডার্ড" },
  { sec: 300, label: "5 মিনিট",  tag: "সরকারি"  },
  { sec: 600, label: "10 মিনিট", tag: "বর্ধিত"  },
  { sec: 900, label: "15 মিনিট", tag: "সিনিয়র" },
];

const KEYBOARD_LAYOUTS = [
  { id: "avro",     label: "Avro" },
  { id: "unibijoy", label: "UniBijoy" },
  { id: "jatiya",   label: "Jatiya" },
  { id: "probhat",  label: "Probhat" },
  { id: "inscript", label: "Inscript" },
  { id: "unicode",  label: "Unicode" },
  { id: "english",  label: "English" },
];

export default function SpeedTestPracticeClient() {
  const searchParams = useSearchParams();
  const initialDuration = parseInt(searchParams.get("duration") || "300", 10);
  const initialLayout = (searchParams.get("layout") as KeyboardLayout) || "english";

  const { activeLayout, setActiveLayout, setSelectedDuration, selectedDuration, setTargetText, resetTest } = useTypingStore();
  const [lang, setLang] = useState<"bangla" | "english">(initialLayout === "english" ? "english" : "bangla");

  const setupSpeedTest = (durationSec: number, selectedLang: "bangla" | "english" = lang) => {
    setSelectedDuration(durationSec);
    const p = getPassageForDuration(selectedLang, durationSec);
    setTargetText(p.text);
    resetTest();
  };

  useEffect(() => {
    setActiveLayout(initialLayout);
    setupSpeedTest(initialDuration, initialLayout === "english" ? "english" : "bangla");
  }, [initialDuration, initialLayout]);

  const availableLayouts = lang === "english"
    ? KEYBOARD_LAYOUTS.filter((l) => l.id === "english")
    : KEYBOARD_LAYOUTS.filter((l) => l.id !== "english");

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
          <span className="h-4 w-px bg-border mx-1.5 hidden sm:block" />

          {/* Group 2: Duration Pills */}
          <div className="flex items-center gap-1 flex-wrap">
            {DURATIONS.map((d) => (
              <button
                key={d.sec}
                onClick={() => setupSpeedTest(d.sec)}
                title={d.tag}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                  selectedDuration === d.sec
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <span className="h-4 w-px bg-border mx-1 hidden sm:block" />

          {/* Group 3: Refresh */}
          <button
            onClick={() => setupSpeedTest(selectedDuration || 300)}
            title="নতুন প্যাসেজ লোড করুন"
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
          {availableLayouts.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setActiveLayout(l.id as KeyboardLayout);
                setupSpeedTest(selectedDuration || 300, l.id === "english" ? "english" : "bangla");
              }}
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
