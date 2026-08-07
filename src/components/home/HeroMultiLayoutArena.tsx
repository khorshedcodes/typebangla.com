"use client";

import React, { useState, useEffect, useRef } from "react";
import { RefreshCw, Play } from "lucide-react";
import { getClusterRanges } from "../../utils/grapheme";
import { mapInputToBangla } from "../../utils/layouts";
import { HeroKeyboardVisualizer } from "../HeroKeyboardVisualizer";

const SAMPLE_PASSAGES: Record<string, string[]> = {
  avro: [
    "বাংলাদেশ আমাদের প্রিয় জন্মভূমি। বাংলা টাইপিং শেখা এখন সবথেকে সহজ টাইপবাংলা প্ল্যাটফর্মে।",
    "প্রযুক্তি ও শিক্ষার আলো ছড়িয়ে পড়ুক দূরদূরান্তে। স্বনির্ভর বাংলাদেশ গড়ার লক্ষ্যে আমরা এগিয়ে চলি।",
    "কম্পিউটার অপারেটিং ও বাংলা টাইপিং গতি বাড়াতে নিয়মিত অনুশীলন ও চর্চার বিকল্প নেই।",
  ],
  unibijoy: [
    "জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের স্বপ্নে গড়া সোনার বাংলা গড়াই আমাদের অঙ্গীকার।",
    "ডিজিটাল বাংলাদেশ বিনির্মাণে তথ্যপ্রযুক্তির সঠিক ব্যবহার ও দক্ষ মানবসম্পদ বৃদ্ধি অতীব জরুরি।",
    "বিজয় কীবোর্ড দিয়ে দ্রুত ও নির্ভুলভাবে সকল দাপ্তরিক নথিপত্র তৈরি করা সম্ভব।",
  ],
  jatiya: [
    "বাংলাদেশ সরকারের সরকারি চাকরি পরীক্ষায় কম্পিউটারে ৩০ শব্দ প্রতি মিনিটে গতি অর্জনের বিধান রয়েছে।",
    "বিসিসি অনুমোদিত জাতীয় কীবোর্ড লেআউট সকল সরকারি প্রশাসনিক দপ্তর ও ব্যাংকসমূহে ব্যবহৃত হয়।",
    "সঠিক নিয়মে টাচ টাইপিং অনুশীলন করলে কয়েক সপ্তাহের মধ্যে নির্ভুলতা বহুগুণ বৃদ্ধি পায়।",
  ],
  english: [
    "The quick brown fox jumps over the lazy dog. Daily typing practice increases WPM and accuracy.",
    "Mastering touch typing is essential for modern software development and digital communication.",
    "TypeBangla provides interactive courses for English QWERTY and Bangla layouts completely free.",
  ],
};

const LAYOUT_META: Record<string, { label: string; badge: string; desc: string }> = {
  avro: { label: "Avro Phonetic", badge: "সহজ ফোনের্টিক", desc: "a=আ, k=ক (Banglish style)" },
  unibijoy: { label: "UniBijoy / Bijoy 52", badge: "বিজয় লেআউট", desc: "প্রথাগত বিজয় ৫০ কীবোর্ড" },
  jatiya: { label: "Jatiya (BCC Govt)", badge: "সরকারি পরীক্ষা", desc: "বিসিসি অনুমোদিত জাতীয় কীবোর্ড" },
  english: { label: "English QWERTY", badge: "Standard", desc: "আন্তর্জাতিক স্ট্যান্ডার্ড কীবোর্ড" },
};

export function HeroMultiLayoutArena() {
  const [activeLayout, setActiveLayout] = useState<string>("avro");
  const [passageIndex, setPassageIndex] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const passages = SAMPLE_PASSAGES[activeLayout] || SAMPLE_PASSAGES.avro;
  const targetText = passages[passageIndex % passages.length];

  const getEffectiveTypedText = (raw: string) => {
    return mapInputToBangla(raw, activeLayout);
  };

  const effectiveInput = getEffectiveTypedText(input);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime && !isCompleted) {
      timer = setInterval(() => {
        const sec = Math.floor((Date.now() - startTime) / 1000);
        setElapsedSeconds(sec);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, isCompleted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isCompleted) return;

    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    setInput(val);
    const effText = getEffectiveTypedText(val);

    if (effText.length > 0) {
      const durationSec = Math.max(1, startTime ? (Date.now() - startTime) / 1000 : 1);
      const calculatedWpm = Math.round((effText.length / 5) / (durationSec / 60));
      setWpm(calculatedWpm);

      let correct = 0;
      for (let i = 0; i < effText.length; i++) {
        if (effText[i] === targetText[i]) correct++;
      }
      setAccuracy(Math.max(0, Math.round((correct / effText.length) * 100)));

      if (effText.length >= targetText.length) {
        setIsCompleted(true);
      }
    } else {
      setWpm(0);
      setAccuracy(100);
    }
  };

  const resetArena = () => {
    setInput("");
    setStartTime(null);
    setElapsedSeconds(0);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleLayoutSwitch = (layoutKey: string) => {
    setActiveLayout(layoutKey);
    setPassageIndex(0);
    setInput("");
    setStartTime(null);
    setElapsedSeconds(0);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
  };

  const shufflePassage = () => {
    setPassageIndex((prev) => prev + 1);
    setInput("");
    setStartTime(null);
    setElapsedSeconds(0);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
  };

  return (
    <div className="border border-border/80 bg-card/85 backdrop-blur-xl rounded-3xl p-6 sm:p-9 shadow-[0_0_50px_-12px_rgba(16,185,129,0.22)] hover:border-emerald-500/40 transition-all max-w-4xl mx-auto space-y-6 text-left relative overflow-hidden group">
      
      {/* Layout Tabs Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black text-foreground uppercase tracking-wider">
            সরাসরি লাইভ টেস্ট প্লে-গ্রাউন্ড
          </span>
        </div>

        {/* Layout Tabs */}
        <div className="flex flex-wrap gap-1 bg-secondary/80 p-1 rounded-xl border border-border">
          {Object.keys(LAYOUT_META).map((key) => {
            const meta = LAYOUT_META[key];
            const isActive = activeLayout === key;
            return (
              <button
                key={key}
                onClick={() => handleLayoutSwitch(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-background text-foreground shadow-xs border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                }`}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Metrics HUD */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-secondary/50 p-3 sm:p-4 rounded-xl border border-border text-center">
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">টাইপিং স্পিড</span>
          <span className="text-lg sm:text-2xl font-black text-foreground">{wpm} <span className="text-xs font-bold text-muted-foreground">WPM</span></span>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">নির্ভুলতা</span>
          <span className="text-lg sm:text-2xl font-black text-foreground">{accuracy}%</span>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">সময়</span>
          <span className="text-lg sm:text-2xl font-black text-foreground">{elapsedSeconds}s</span>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">লেআউট</span>
          <span className="text-xs sm:text-sm font-bold text-foreground truncate block mt-1">{LAYOUT_META[activeLayout].badge}</span>
        </div>
      </div>

      {/* Target Text Container with Cluster-Level Color Feedback */}
      <div className="font-bangla text-base sm:text-xl leading-relaxed p-4 sm:p-6 bg-secondary/30 rounded-xl border border-border select-none min-h-[100px] whitespace-pre-wrap break-words">
        {getClusterRanges(targetText).map(({ cluster, start, end }, idx) => {
          const isFullyTyped = effectiveInput.length >= end;
          const isPartiallyTyped = effectiveInput.length > start && effectiveInput.length < end;
          const isCurrent = effectiveInput.length >= start && effectiveInput.length < end;

          let statusClass = "text-muted-foreground";

          if (isFullyTyped) {
            const typedSegment = effectiveInput.slice(start, end);
            if (typedSegment === cluster) {
              statusClass = "text-foreground font-bold bg-emerald-500/15 border-b-2 border-emerald-500 rounded-t-xs";
            } else {
              statusClass = "text-red-500 font-bold bg-red-500/15 border-b-2 border-red-500 underline rounded-t-xs";
            }
          } else if (isPartiallyTyped || isCurrent) {
            const typedSegment = effectiveInput.slice(start, effectiveInput.length);
            const targetSegment = cluster.slice(0, typedSegment.length);
            if (typedSegment === targetSegment) {
              statusClass = "text-foreground font-bold bg-primary/20 border-b-2 border-primary animate-pulse rounded-t-xs";
            } else {
              statusClass = "text-red-500 font-bold bg-red-500/15 border-b-2 border-red-500 underline rounded-t-xs";
            }
          }

          return (
            <span key={idx} className={statusClass}>
              {cluster === " " ? "\u00A0" : cluster}
            </span>
          );
        })}
      </div>

      {/* Dual-Legend Visualizer */}
      <HeroKeyboardVisualizer
        activeLayout={activeLayout}
        nextTargetChar={targetText[effectiveInput.length]}
        lastPressedKey={input.length > 0 ? input[input.length - 1] : ""}
      />

      {/* Input Field & Transliteration Preview */}
      <div className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={isCompleted}
            placeholder={
              activeLayout === "english"
                ? "Type the English text here..."
                : activeLayout === "avro"
                ? "ইংরেজি কিবোর্ডে বাংলিশ লিখুন (যেমন: bangladesh)..."
                : "এখানে টাইপ করুন..."
            }
            className="w-full bg-background border-2 border-border focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 rounded-xl px-4 py-3 sm:py-4 text-base sm:text-lg font-medium text-foreground placeholder:text-muted-foreground outline-hidden transition-all shadow-inner"
            autoFocus
          />
          {input.length > 0 && activeLayout !== "english" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-500/20 max-w-[150px] truncate">
              {effectiveInput}
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={resetArena}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground bg-secondary/80 hover:bg-secondary px-3 py-2 rounded-lg border border-border transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              রিসেট
            </button>
            <button
              onClick={shufflePassage}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground bg-secondary/80 hover:bg-secondary px-3 py-2 rounded-lg border border-border transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              নতুন প্যারাগ্রাফ
            </button>
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground">
            {LAYOUT_META[activeLayout].desc}
          </span>
        </div>
      </div>
    </div>
  );
}
