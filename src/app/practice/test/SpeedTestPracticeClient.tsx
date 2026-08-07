"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { getPassageForDuration } from "../../../utils/lessons/exam/examPassages";
import { Clock, ShieldCheck, Sparkles, RefreshCw, Trophy, Zap, Award } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/utils/cn";

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

  return (
    <div className="space-y-6">
      {/* Test Preset Selection Header */}
      <Card className="border border-border bg-card p-6 rounded-2xl shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span>১. পরীক্ষার সময় ও ভাষা নির্বাচন করুন:</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">টাইমড স্পিড টেস্টে সঠিক গতি (WPM) ও নির্ভুলতা (Accuracy %) মূল্যায়িত হয়</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setLang("bangla"); setupSpeedTest(selectedDuration || 300, "bangla"); }}
              className={cn("px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all", lang === "bangla" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-secondary text-muted-foreground")}
            >
              🇧🇩 বাংলা স্পিড টেস্ট
            </button>
            <button
              onClick={() => { setLang("english"); setupSpeedTest(selectedDuration || 300, "english"); }}
              className={cn("px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all", lang === "english" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-secondary text-muted-foreground")}
            >
              🇬🇧 English Speed Test
            </button>
          </div>
        </div>

        {/* Duration Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {[
            { sec: 60, label: "১ মিনিট", tag: "শর্ট টেস্ট" },
            { sec: 120, label: "২ মিনিট", tag: "কুইক ড্রিল" },
            { sec: 180, label: "৩ মিনিট", tag: "স্ট্যান্ডার্ড" },
            { sec: 300, label: "৫ মিনিট", tag: "সরকারি পরীক্ষা" },
            { sec: 600, label: "১০ মিনিট", tag: "বর্ধিত পরীক্ষা" },
            { sec: 900, label: "১৫ মিনিট", tag: "সিনিয়র লেভেল" },
          ].map((d) => (
            <button
              key={d.sec}
              onClick={() => setupSpeedTest(d.sec)}
              className={cn(
                "p-3 rounded-xl border text-center transition-all space-y-1",
                selectedDuration === d.sec
                  ? "bg-primary/10 border-primary text-foreground shadow-xs ring-1 ring-primary"
                  : "border-border bg-secondary hover:border-foreground/30 text-muted-foreground"
              )}
            >
              <div className="text-xs font-black text-foreground">{d.label}</div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-wider">{d.tag}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Typing Arena */}
      <TypingArea />

      {/* Keyboard Selector & Guide */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-foreground tracking-wider">
            কিবোর্ড লেআউট নির্বাচন:
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
              onClick={() => {
                setActiveLayout(l.id as KeyboardLayout);
                setupSpeedTest(selectedDuration || 300, l.id === "english" ? "english" : "bangla");
              }}
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
