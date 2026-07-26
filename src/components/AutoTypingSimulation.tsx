"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RefreshCw, Zap, Sparkles } from "lucide-react";
import { getClusterRanges } from "../utils/grapheme";

interface AutoTypingSimulationProps {
  manualComponent: React.ReactNode;
}

const SIMULATION_PASSAGE = "বাংলাদেশ আমাদের প্রিয় জন্মভূমি। বাংলা টাইপিং শেখা এখন সবথেকে সহজ টাইপবাংলা প্ল্যাটফর্মে।";

export function AutoTypingSimulation({ manualComponent }: AutoTypingSimulationProps) {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [charIndex, setCharIndex] = useState(0);
  const [simulatedWpm, setSimulatedWpm] = useState(0);
  const [simulatedAccuracy, setSimulatedAccuracy] = useState(100);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-typing simulation timer effect
  useEffect(() => {
    if (mode !== "auto" || !isPlaying) return;

    const timer = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= SIMULATION_PASSAGE.length) {
          // Reset simulation loop
          setSimulatedWpm(0);
          setSimulatedAccuracy(100);
          return 0;
        }

        const nextIndex = prev + 1;
        // Dynamically compute WPM count-up simulation (climbs smoothly up to 62 WPM)
        const progressRatio = nextIndex / SIMULATION_PASSAGE.length;
        const targetWpm = Math.min(62, Math.round(15 + progressRatio * 47));
        setSimulatedWpm(targetWpm);

        // Random realistic accuracy variation (97% - 100%)
        if (nextIndex % 15 === 0) {
          setSimulatedAccuracy(Math.floor(Math.random() * 4) + 97);
        }

        return nextIndex;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [mode, isPlaying]);

  if (mode === "manual") {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center px-2 text-xs font-bold">
          <span className="text-emerald-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ম্যানুয়াল ইন্টারঅ্যাক্টিভ টাইপিং মোড
          </span>
          <button
            onClick={() => setMode("auto")}
            className="text-muted-foreground hover:text-foreground underline flex items-center gap-1"
          >
            অটো সিমুলেশনে ফেরত যান ⚡
          </button>
        </div>
        {manualComponent}
      </div>
    );
  }

  const typedSegment = SIMULATION_PASSAGE.slice(0, charIndex);
  const progressPercent = Math.round((charIndex / SIMULATION_PASSAGE.length) * 100);
  const clusterRanges = getClusterRanges(SIMULATION_PASSAGE);

  return (
    <div className="border border-border/80 bg-card/85 backdrop-blur-xl rounded-3xl p-6 sm:p-9 shadow-[0_0_50px_-12px_rgba(16,185,129,0.25)] hover:border-emerald-500/40 transition-all max-w-4xl mx-auto space-y-6 text-left relative overflow-hidden group">
      
      {/* Simulation Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Zap size={14} className="text-emerald-500" />
            লাইভ অটো টাইপিং ডেমো সিমুলেটর
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 bg-secondary text-foreground hover:bg-secondary/80 rounded-lg text-xs font-bold border border-border flex items-center gap-1"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "পজ" : "প্লে"}</span>
          </button>

          <button
            onClick={() => setMode("manual")}
            className="px-4 py-1.5 bg-emerald-500 text-emerald-950 font-black rounded-xl text-xs shadow-xs hover:bg-emerald-400 transition-all flex items-center gap-1.5"
          >
            <span>সরাসরি নিজে টাইপ করুন ⌨️</span>
          </button>
        </div>
      </div>

      {/* Dynamic Simulated Live Metrics HUD */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-secondary/50 p-3 sm:p-4 rounded-2xl border border-border text-center">
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">লাইভ স্পিড</span>
          <span className="text-lg sm:text-2xl font-black text-foreground transition-all">
            {simulatedWpm} <span className="text-xs font-bold text-muted-foreground">WPM</span>
          </span>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">নির্ভুলতা</span>
          <span className="text-lg sm:text-2xl font-black text-foreground">{simulatedAccuracy}%</span>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">অগ্রগতি</span>
          <span className="text-lg sm:text-2xl font-black text-emerald-500">{progressPercent}%</span>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">স্ট্যাটাস</span>
          <span className="text-xs sm:text-sm font-bold text-foreground truncate block mt-1">অটো প্লেয়িং ⚡</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden border border-border">
        <div
          className="bg-emerald-500 h-full transition-all duration-150 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Auto-Typed Target Text Container with Cluster-Level Color Feedback */}
      <div className="font-bangla text-base sm:text-xl leading-relaxed p-5 sm:p-7 bg-secondary/30 rounded-2xl border border-border select-none min-h-[110px] whitespace-pre-wrap break-words relative">
        {clusterRanges.map(({ cluster, start, end }, idx) => {
          const isFullyTyped = typedSegment.length >= end;
          const isCurrent = typedSegment.length >= start && typedSegment.length < end;

          let statusClass = "text-muted-foreground/60";

          if (isFullyTyped) {
            statusClass = "text-foreground font-bold bg-emerald-500/15 border-b-2 border-emerald-500 rounded-t-xs";
          } else if (isCurrent) {
            statusClass = "text-foreground font-bold bg-primary/25 border-b-2 border-primary animate-pulse rounded-t-xs";
          }

          return (
            <span key={idx} className={statusClass}>
              {cluster === " " ? "\u00A0" : cluster}
            </span>
          );
        })}
      </div>

      {/* Live Helper Footer Bar */}
      <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
        <span className="flex items-center gap-1.5 font-semibold text-foreground">
          <Sparkles size={14} className="text-emerald-500" />
          সিমুলেশন চলছে — যেকোনো সময় কীবোর্ডে টাইপ করতে পারবেন।
        </span>
        <button
          onClick={() => setMode("manual")}
          className="text-foreground hover:underline font-bold"
        >
          ম্যানুয়াল টাইপিং টেস্ট প্লে-গ্রাউন্ড →
        </button>
      </div>

    </div>
  );
}
