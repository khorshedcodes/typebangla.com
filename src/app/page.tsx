"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Award, Zap, BookOpen,
  BarChart3, Trophy, ChevronDown, Sparkles, Play,
  ShieldCheck, Star, RefreshCw, Flame, Target, Compass
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { getClusterRanges } from "../utils/grapheme";
import { avroTransliterate, mapInputToBangla } from "../utils/layouts";
import { Button } from "../components/ui/button";
import { HeroKeyboardVisualizer } from "../components/HeroKeyboardVisualizer";
import { AutoTypingSimulation } from "../components/AutoTypingSimulation";

// ── PASSAGE DICTIONARY FOR HERO MULTI-LAYOUT ARENA ─────────────────────────────
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

// ── 1. HERO MULTI-LAYOUT ARENA COMPONENT ──────────────────────────────────────
function HeroMultiLayoutArena() {
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

  // Effective typed text (Map input keystrokes to Bangla/English based on active layout)
  const getEffectiveTypedText = (raw: string) => {
    return mapInputToBangla(raw, activeLayout);
  };

  const effectiveInput = getEffectiveTypedText(input);

  // Timer tick
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

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isCompleted) return;

    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    setInput(val);
    const effText = getEffectiveTypedText(val);

    // Calculate accuracy & WPM
    if (effText.length > 0) {
      const durationSec = Math.max(1, startTime ? (Date.now() - startTime) / 1000 : 1);
      const calculatedWpm = Math.round((effText.length / 5) / (durationSec / 60));
      setWpm(calculatedWpm);

      let correct = 0;
      for (let i = 0; i < effText.length; i++) {
        if (effText[i] === targetText[i]) correct++;
      }
      setAccuracy(Math.max(0, Math.round((correct / effText.length) * 100)));

      // Check completion
      if (effText.length >= targetText.length) {
        setIsCompleted(true);
      }
    } else {
      setWpm(0);
      setAccuracy(100);
    }
  };

  // Reset Arena
  const resetArena = () => {
    setInput("");
    setStartTime(null);
    setElapsedSeconds(0);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    if (inputRef.current) inputRef.current.focus();
  };

  // Switch Layout
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

  // Shuffle Passage
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

      {/* Interactive Dual-Legend Mechanical Keyboard Visualizer */}
      <HeroKeyboardVisualizer
        activeLayout={activeLayout}
        nextTargetChar={targetText[effectiveInput.length]}
        lastPressedKey={input.length > 0 ? input[input.length - 1] : ""}
      />

      {/* Input Field & Live Transliteration Preview */}
      <div className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={isCompleted}
            placeholder={
              isCompleted
                ? "টেস্ট সম্পন্ন হয়েছে! নিচে ফলাফল দেখুন..."
                : activeLayout === "avro"
                ? "এখানে Banglish টাইপ করুন (যেমন: bangladesh = বাংলাদেশ)..."
                : activeLayout === "english"
                ? "Type English text here..."
                : "এখানে টাইপ করুন..."
            }
            className="w-full font-bangla text-sm sm:text-base p-4 pr-12 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground shadow-xs disabled:opacity-75"
          />
          <button
            onClick={shufflePassage}
            title="অনুচ্ছেদ পরিবর্তন করুন"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Live Transliteration Output Preview Badge (Only for Avro Phonetic) */}
        {activeLayout === "avro" && (
          <div className="text-xs text-muted-foreground font-semibold flex items-center gap-2 flex-wrap">
            <span>লাইভ বাংলা আউটপুট:</span>
            <span className="text-foreground font-bold font-bangla bg-secondary px-2.5 py-1 rounded-lg border border-border">
              {effectiveInput || "টাইপ করলে এখানে সরাসরি বাংলা দেখা যাবে..."}
            </span>
          </div>
        )}

        <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground gap-2 pt-1">
          <span>লেআউট: <strong className="text-foreground">{LAYOUT_META[activeLayout].label}</strong> — {LAYOUT_META[activeLayout].desc}</span>
          <div className="flex items-center gap-4">
            <button onClick={resetArena} className="text-foreground hover:underline font-bold flex items-center gap-1">
              <RefreshCw size={12} /> পুনরায় শুরু করুন
            </button>
          </div>
        </div>
      </div>

      {/* Completion Modal Card */}
      {isCompleted && (
        <div className="p-6 bg-primary/10 border border-primary/30 rounded-xl space-y-4 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
            <Trophy size={14} /> টেস্ট সম্পন্ন হয়েছে!
          </div>
          <div className="flex justify-center gap-8 text-foreground">
            <div>
              <span className="text-xs text-muted-foreground block">চূড়ান্ত স্পিড</span>
              <span className="text-3xl font-black">{wpm} WPM</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">নির্ভুলতা</span>
              <span className="text-3xl font-black">{accuracy}%</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/learn">
              <Button size="sm" className="font-bold text-xs gap-1.5 h-10 px-5">
                <BookOpen size={14} /> কোর্স শুরু করুন (Start Course)
              </Button>
            </Link>
            <Link href="/practice/test">
              <Button size="sm" variant="outline" className="font-bold text-xs gap-1.5 h-10 px-5 border-border">
                <Zap size={14} /> স্পিড টেস্ট সার্টিফিকেট নিন
              </Button>
            </Link>
            <Button size="sm" variant="ghost" onClick={resetArena} className="font-bold text-xs h-10">
              আবার টাইপ করুন
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}

// ── 2. HERO TYPEWRITER ANIMATION ──────────────────────────────────────────────
const HERO_TEXTS = [
  "বাংলাদেশ আমার প্রিয় মাতৃভূমি",
  "আমার সোনার বাংলা, আমি তোমায় ভালোবাসি",
  "সহজে শিখুন অভ্র, ইউনিবিজয় ও জাতীয় কিবোর্ড",
];

function HeroTypewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = HERO_TEXTS[index];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < target.length) {
          setDisplayed(target.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIndex((i) => (i + 1) % HERO_TEXTS.length);
        }
      }
    }, isDeleting ? 30 : 75);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, index]);

  return (
    <div className="border border-border bg-card/60 backdrop-blur-xs rounded-xl p-4 shadow-xs max-w-[500px] mx-auto flex items-center justify-center h-[64px]">
      <span className="font-bangla text-lg sm:text-xl font-bold text-foreground">{displayed}</span>
      <span className="inline-block w-[2.5px] h-[1.2em] bg-foreground ml-2 animate-pulse rounded-full" />
    </div>
  );
}

// ── 4. LIVE ACTIVITY TICKER ──────────────────────────────────────────────────
function LiveActivityTicker() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickers = [
    "🎉 রাশেদ আহমেদ (ঢাকা) — স্পিড টেস্টে ৪২ WPM অর্জন করলেন!",
    "🏆 সুমাইয়া আক্তার (চট্টগ্রাম) — অনার্সে গোল্ড সনদ লাভ করেছেন!",
    "🏛️ হাসান মাহমুদ (সিলেট) — সরকারি এক্সাম সিমুলেটরে পাস করেছেন!",
    "⚡ টাইপবাংলা ড্রাইভার — নতুন জাতীয় (Jatiya BCC Govt) লেআউট আপগ্রেড সম্পন্ন!",
  ];

  useEffect(() => {
    const t = setInterval(() => setTickerIndex((i) => (i + 1) % tickers.length), 4000);
    return () => clearInterval(t);
  }, [tickers.length]);

  return (
    <div className="bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-500 py-2.5 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 overflow-hidden select-none">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      <span className="truncate">
        {tickers[tickerIndex]}
      </span>
    </div>
  );
}

// ── 5. GOVT SPEED GAUGE WIDGET ────────────────────────────────────────────────
function GovtSpeedGaugeWidget() {
  const [userWpm, setUserWpm] = useState(35);

  let statusBadge = { label: "🔴 শিক্ষানবিস (Improvement Needed)", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
  if (userWpm >= 40) {
    statusBadge = { label: "🟢 শ্রেষ্ঠ স্পিড (Fully Qualified for both Bangla & English Govt Operator)", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
  } else if (userWpm >= 30) {
    statusBadge = { label: "🟡 যোগ্য (Qualified for Bangla Govt Exam)", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
  }

  return (
    <div className="p-5 sm:p-6 bg-secondary/50 backdrop-blur-md rounded-xl border border-border space-y-4 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-foreground">আপনার বর্তমান স্পিড টেস্ট সিমুলেটর:</span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusBadge.color}`}>
          {statusBadge.label}
        </span>
      </div>

      {/* Slider Control */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono font-bold text-muted-foreground">
          <span>0 WPM</span>
          <span className="text-foreground text-sm font-black">{userWpm} WPM</span>
          <span>80 WPM</span>
        </div>
        <input
          type="range"
          min="0"
          max="80"
          value={userWpm}
          onChange={(e) => setUserWpm(Number(e.target.value))}
          className="w-full accent-primary h-2 bg-secondary rounded-lg cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
        <div className="p-3 bg-card rounded-lg border border-border">
          <span className="text-muted-foreground block text-[10px]">বাংলা সরকারি রিকোয়ারমেন্ট</span>
          <span className="font-extrabold text-foreground text-sm">৩০ WPM</span>
          <span className="block text-[10px] text-muted-foreground">{userWpm >= 30 ? "✓ অর্জিত" : "❌ বাকি আছে"}</span>
        </div>
        <div className="p-3 bg-card rounded-lg border border-border">
          <span className="text-muted-foreground block text-[10px]">ইংরেজি সরকারি রিকোয়ারমেন্ট</span>
          <span className="font-extrabold text-foreground text-sm">৪০ WPM</span>
          <span className="block text-[10px] text-muted-foreground">{userWpm >= 40 ? "✓ অর্জিত" : "❌ বাকি আছে"}</span>
        </div>
        <div className="p-3 bg-card rounded-lg border border-border">
          <span className="text-muted-foreground block text-[10px]">নূন্যতম নির্ভুলতা (Accuracy)</span>
          <span className="font-extrabold text-foreground text-sm">৮৫%+</span>
          <span className="block text-[10px] text-muted-foreground">যাচাইকৃত সনদ মানদণ্ড</span>
        </div>
      </div>
    </div>
  );
}

// ── 6. FAQ ACCORDION ITEM ───────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden transition-all shadow-xs">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-foreground hover:bg-secondary transition-colors"
      >
        <span>{question}</span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180 text-foreground" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border">
          {answer}
        </div>
      )}
    </div>
  );
}

// ── MAIN LANDING PAGE COMPONENT (CRO OPTIMIZED MASTER PROMPT) ────────────────
export default function LandingPage() {
  const [showCertModal, setShowCertModal] = useState(false);

  // Schema.org JSON-LD Structured Data for Google SEO Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "টাইপবাংলা কি পুরোপুরি বিনামূল্যে?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "হ্যাঁ, টাইপবাংলার সব কিবোর্ড লেআউট, লেসন, স্পিড টেস্ট ও ডিজিটাল সার্টিফিকেট সার্ভিস সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়।"
        }
      },
      {
        "@type": "Question",
        "name": "কোন কোন কীবোর্ড লেআউট সমর্থিত?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "অভ্র ফোনেটিক (Avro Phonetic), ইউনিবিজয় (UniBijoy), সরকারি বিসিসি জাতীয় (Jatiya), প্রভাত (Probhat) এবং ইংরেজি QWERTY কীবোর্ড সমর্থিত।"
        }
      },
      {
        "@type": "Question",
        "name": "এটি কি সরকারি চাকরির টাইপিং পরীক্ষার প্রস্তুতির জন্য উপযোগী?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "অবশ্যই! আমাদের Exam Simulator মডিউলে সরকারি মন্ত্রণালয় ও ব্যাংক পরীক্ষার টাইপিং সময়সীমা (৩০ WPM বাংলা / ৪০ WPM ইংরেজি) অনুযায়ী টেস্ট দেওয়া যায়।"
        }
      }
    ]
  };

  return (
    <main className="w-full bg-background text-foreground space-y-24 pb-24 overflow-hidden">
      
      {/* Schema.org FAQ Structured Data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Live Milestone Ticker */}
      <LiveActivityTicker />

      {/* ── 1. HERO SECTION (CRO CONVERSION ENGINE) ───────────────────────── */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-8 relative pt-4">
        
        {/* Deep Ambient Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-emerald-500/15 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-2 rounded-full shadow-xs">
          <span className="text-amber-400 text-xs font-bold">★★★★★</span>
          <span className="text-xs font-bold text-foreground">
            Trusted by 50,000+ learners across Bangladesh 🇧🇩
          </span>
        </div>

        {/* Outcome-Focused Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
            বাংলা টাইপিং শিখুন —{" "}
            <span className="underline decoration-emerald-500 decoration-4 underline-offset-4">
              ১০ গুণ দ্রুত, সঠিক
            </span>{" "}
            এবং চাকরির জন্য প্রস্তুত হন
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
            অভ্র ফোনেটিক, বিজয় ৫২, সরকারি জাতীয় কীবোর্ড ও ইংরেজি টাচ টাইপিং — এক জায়গায় ফ্রিতে শিখুন।
          </p>
        </div>

        {/* Key Benefits Checklist */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-foreground max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> সরকারি চাকরির প্রস্তুতি</div>
          <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> যাচাইকৃত ডিজিটাল সার্টিফিকেট</div>
          <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> সব কীবোর্ড লেআউট</div>
          <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> ১০০% ফ্রি প্র্যাকটিস</div>
        </div>

        {/* High-Conversion Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <Link href="/learn" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-black shadow-lg rounded-2xl gap-2 bg-primary text-primary-foreground hover:opacity-95">
              <span>Start Learning Free →</span>
            </Button>
          </Link>
          <Link href="/practice/test" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-bold rounded-2xl border-border hover:bg-secondary">
              Try Typing Test
            </Button>
          </Link>
        </div>

        {/* Hero Typewriter Animation */}
        <HeroTypewriter />

        {/* Auto-Typing Simulation & Interactive Typing Arena */}
        <div className="pt-4">
          <AutoTypingSimulation manualComponent={<HeroMultiLayoutArena />} />
        </div>
      </section>

      {/* ── 2. PLATFORM SOCIAL PROOF & STATS BAR ──────────────────────────── */}
      <section className="border-y border-border bg-secondary/40 backdrop-blur-md py-10">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "👨‍🎓", value: "50,000+", label: "Students" },
              { icon: "🏆", value: "2 Million+", label: "Words Typed" },
              { icon: "⌨️", value: "7 Layouts", label: "Keyboard Layouts" },
              { icon: "📜", value: "5,000+", label: "Certificates Issued" },
            ].map((s, i) => (
              <div key={i} className="space-y-1.5 p-4 rounded-2xl hover:bg-secondary/60 transition-colors border border-transparent hover:border-border">
                <div className="text-2xl">{s.icon}</div>
                <div className="text-2xl sm:text-4xl font-black text-foreground">{s.value}</div>
                <div className="text-xs font-bold text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. GOVT JOB & CAREER SPEED GAUGE SECTION ──────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border border-border bg-card/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold border border-emerald-500/20">
                <ShieldCheck size={14} /> সরকারি চাকরি ও ক্যারিয়ার স্পিড মানদণ্ড
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">Why Typing Speed Matters For Your Career</h2>
            </div>
            <Link href="/exam/govt">
              <Button size="sm" className="font-bold text-xs gap-2">
                গভঃ এক্সাম সিমুলেটর <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {/* Interactive Govt Speed Gauge Slider Widget */}
          <GovtSpeedGaugeWidget />
        </div>
      </section>

      {/* ── 4. KEYBOARD LAYOUT CARDS WITH METADATA (ITEM #5) ───────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">কীবোর্ড সমর্থক</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Supported Keyboard Layouts</h2>
          <p className="text-sm text-muted-foreground">আপনার পছন্দের যেকোনো লেআউটে অনুশীলন করুন।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Avro Phonetic",
              rating: "⭐⭐⭐⭐⭐ 4.9",
              pop: "78% Popular",
              diff: "Beginner Friendly",
              audience: "Recommended for Beginners & Students",
              icon: "⌨️",
            },
            {
              name: "UniBijoy / Bijoy 52",
              rating: "⭐⭐⭐⭐⭐ 4.8",
              pop: "18% Popular",
              diff: "Govt Standard",
              audience: "Recommended for Office & Govt Staff",
              icon: "🏛️",
            },
            {
              name: "Jatiya (BCC)",
              rating: "⭐⭐⭐⭐⭐ 4.9",
              pop: "Govt Required",
              diff: "Official Exam",
              audience: "Recommended for Govt Operator Applicants",
              icon: "🎖️",
            },
            {
              name: "English QWERTY",
              rating: "⭐⭐⭐⭐⭐ 5.0",
              pop: "Standard",
              diff: "Touch Typing",
              audience: "Recommended for Global Freelancers & Coders",
              icon: "🌐",
            },
          ].map((l, i) => (
            <Card key={i} className="border border-border bg-card/80 backdrop-blur-md hover:border-emerald-500/50 transition-all rounded-2xl p-6 space-y-3 text-center shadow-xs group">
              <div className="w-12 h-12 rounded-2xl bg-secondary text-foreground flex items-center justify-center mx-auto text-2xl border border-border group-hover:scale-110 transition-transform">
                {l.icon}
              </div>
              <div className="text-[10px] text-amber-400 font-bold">{l.rating}</div>
              <h3 className="font-extrabold text-base text-foreground">{l.name}</h3>
              <div className="flex justify-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {l.pop}
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                  {l.diff}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">{l.audience}</p>
              <Link href="/learn" className="inline-block text-xs font-bold text-emerald-500 hover:underline pt-2">
                পাঠ দেখুন →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 5. TIMELINE LEARNING ROADMAP (DUOLINGO STYLE - ITEM #6) ─────────── */}
      <section className="bg-secondary/40 py-16 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ধাপে ধাপে শেখার রোডম্যাপ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Your Step-by-Step Typing Roadmap</h2>
            <p className="text-sm text-muted-foreground">শিক্ষানবিস থেকে দক্ষ টাইপিস্ট হওয়ার সুস্পষ্ট ৬টি ধাপ।</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { step: "01", title: "Beginner", desc: "কীবোর্ড ও আঙুল বিন্যাস" },
              { step: "02", title: "Home Row", desc: "হোম রো টাচ টাইপিং" },
              { step: "03", title: "Words", desc: "শব্দ ও যুক্তাক্ষর চর্চা" },
              { step: "04", title: "Sentences", desc: "পূর্ণ বাক্য ও অনুচ্ছেদ" },
              { step: "05", title: "Speed Test", desc: "১৫-৬০ সেকেন্ড গতি পরীক্ষা" },
              { step: "06", title: "Certificate", desc: "যাচাইকৃত সনদ লাভ" },
            ].map((path, idx) => (
              <React.Fragment key={idx}>
                <div className="border border-border bg-card p-5 rounded-2xl text-center w-36 shadow-xs hover:border-emerald-500/50 hover:scale-105 transition-all">
                  <span className="text-xs font-black text-emerald-500 block mb-1">{path.step}</span>
                  <h4 className="font-extrabold text-sm text-foreground">{path.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">{path.desc}</p>
                </div>
                {idx < 5 && (
                  <ArrowRight size={18} className="text-muted-foreground hidden md:block shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. OUTCOME PROGRESSION ("WHAT WILL YOU ACHIEVE?" ITEM #7) ───────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ফলাফল ও অগ্রগতি</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">What Will You Achieve?</h2>
          <p className="text-sm text-muted-foreground">নিয়মিত অনুশীলনে আপনার টাইপিং গতির সম্ভাব্য বৃদ্ধি।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { time: "Day 1", wpm: "10 WPM", desc: "আঙুলের সঠিক স্থান চিহ্নিতকরণ", badge: "সূচনা" },
            { time: "Week 2", wpm: "25 WPM", desc: "কীবোর্ডের দিকে না তাকিয়ে টাইপিং", badge: "টাচ টাইপিং" },
            { time: "Month 1", wpm: "40 WPM", desc: "সরকারি পরীক্ষার গতিসীমা স্পর্শ 🏆", badge: "পরীক্ষায় যোগ্য" },
            { time: "Month 3", wpm: "60+ WPM", desc: "প্রফেশনাল এক্সপার্ট টাইপিস্ট স্পিড 🚀", badge: "এক্সপার্ট" },
          ].map((g, i) => (
            <Card key={i} className="border border-border bg-card/80 backdrop-blur-md rounded-2xl p-6 space-y-3 text-center shadow-xs">
              <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {g.badge}
              </span>
              <div className="text-xs text-muted-foreground font-bold">{g.time}</div>
              <div className="text-3xl font-black text-foreground">{g.wpm}</div>
              <p className="text-xs text-muted-foreground">{g.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 7. STUDENT TESTIMONIALS & SUCCESS STORIES (ITEM #8) ─────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">সাফল্যের গল্প</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Real Student Transformations</h2>
          <p className="text-sm text-muted-foreground">টাইপবাংলা ব্যবহারকারীদের বাস্তব অভিজ্ঞতার গল্প।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "তানজিল আহমেদ",
              role: "কম্পিউটার অপারেটর পরীক্ষার্থী",
              before: "18 WPM",
              after: "52 WPM",
              text: "টাইপবাংলার গভঃ এক্সাম সিমুলেটর দিয়ে প্র্যাকটিস করে মাত্র ৩ সপ্তাহে আমার স্পিড ১৮ থেকে ৫২ ডাব্লিউপিএম হয়। সরকারি টেস্টে পাস করেছি!",
              stars: "★★★★★",
            },
            {
              name: "ফারহানা ইয়াসমিন",
              role: "বিশ্ববিদ্যালয় শিক্ষার্থী",
              before: "22 WPM",
              after: "58 WPM",
              text: "অভ্র ও বিজয় কীবোর্ড দুটোই এক জায়গায় শেখার এত সুন্দর সিস্টেম আর কোথাও দেখিনি। অনলাইন সার্টিফিকেট পেয়ে অনেক উপকৃত হয়েছি।",
              stars: "★★★★★",
            },
            {
              name: "কামরুল হাসান",
              role: "ফ্রিল্যান্স ডেটা এন্ট্রি স্পেশালিস্ট",
              before: "25 WPM",
              after: "68 WPM",
              text: "টাইপিং গেম ও স্পিড ড্রিলস দিয়ে টাইপিং প্র্যাকটিস করা যেমন মজার, তেমনই কার্যকর। এখন অনেক দ্রুত ক্লায়েন্টের কাজ জমা দিতে পারি।",
              stars: "★★★★★",
            },
          ].map((t, i) => (
            <Card key={i} className="border border-border bg-card/80 backdrop-blur-md rounded-2xl p-6 space-y-4 shadow-sm relative">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-foreground">{t.name}</h4>
                  <span className="text-[10px] text-muted-foreground block">{t.role}</span>
                </div>
                <span className="text-amber-400 text-xs font-bold">{t.stars}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-secondary/50 rounded-xl text-xs font-bold font-mono">
                <span>Before: <strong className="text-muted-foreground">{t.before}</strong></span>
                <span className="text-emerald-500">➔ Now: <strong>{t.after}</strong></span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 8. TYPING GAMES PREVIEW (ITEM #9) ─────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">গেমিফাইড লার্নিং</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Play While Learning</h2>
          <p className="text-sm text-muted-foreground">গেম খেলে আনন্দ নিয়ে কিবোর্ড গতি ও একিউরেসি বাড়ান।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Word Race 🏎️", desc: "শব্দ টাইপ করে রেস জিতেন", badge: "রেসিং গেম", link: "/game" },
            { title: "Falling Letters 🌠", desc: "ঝরে পড়া অক্ষরগুলো টাইপ করুন", badge: "রিফ্লেক্স ড্রিল", link: "/game" },
            { title: "Speed Challenge ⚡", desc: "৬০ সেকেন্ডে সর্বোচ্চ শব্দের চ্যালেঞ্জ", badge: "টাইমার মোড", link: "/game" },
            { title: "Time Attack ⏱️", desc: "ভুল না করে দীর্ঘতম সময় টাইপিং", badge: "একিউরেসি গেম", link: "/game" },
          ].map((g, i) => (
            <Card key={i} className="border border-border bg-card/80 backdrop-blur-md rounded-2xl p-6 space-y-3 text-center shadow-xs hover:border-emerald-500/50 transition-all group">
              <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                {g.badge}
              </span>
              <h3 className="font-extrabold text-base text-foreground">{g.title}</h3>
              <p className="text-xs text-muted-foreground">{g.desc}</p>
              <Link href={g.link} className="inline-block pt-2">
                <Button size="sm" variant="outline" className="font-bold text-xs rounded-xl border-border gap-1">
                  গেম খেলুন <Play size={12} />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 9. FULL 8 PRACTICE CATEGORIES GRID (ITEM #10) ──────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">অনুশীলন বিভাগ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Explore Practice Categories</h2>
          <p className="text-sm text-muted-foreground">আপনার নির্দিষ্ট লক্ষ্য অনুযায়ী ক্যাটাগরি বেছে নিন।</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "বাংলা টাইপিং", count: "৩০+ লেসন", icon: "🇧🇩", link: "/courses" },
            { name: "English Touch Typing", count: "২৫+ লেসন", icon: "🌐", link: "/learn/english-touch-typing" },
            { name: "যুক্তাক্ষর মাস্টার", count: "১৫+ ড্রিলস", icon: "🔤", link: "/juktakkhor" },
            { name: "Govt Exam Simulator", count: "সরকারি সিমুলেটর", icon: "🏛️", link: "/exam/govt" },
            { name: "শব্দ অনুশীলন", count: "১০০০+ শব্দ", icon: "📝", link: "/practice/words" },
            { name: "বাক্য অনুশীলন", count: "৫০০+ বাক্য", icon: "💬", link: "/practice/sentences" },
            { name: "সংখ্যা ও প্রতীক", count: "নুমেরিক কীবোর্ড", icon: "🔢", link: "/practice/custom" },
            { name: "কাস্টম টেক্সট", count: "নিজের লেখা টাইপ", icon: "⚙️", link: "/practice/custom" },
          ].map((c, i) => (
            <Link key={i} href={c.link} className="border border-border bg-card/80 p-5 rounded-2xl text-center hover:border-emerald-500/50 hover:bg-secondary/50 transition-all shadow-xs space-y-2 group">
              <div className="text-2xl group-hover:scale-110 transition-transform">{c.icon}</div>
              <h4 className="font-extrabold text-sm text-foreground">{c.name}</h4>
              <span className="text-[10px] text-muted-foreground block font-bold">{c.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 10. CERTIFICATE ACTION SUITE (ITEM #11) ───────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">যাচাইকৃত সনদ</span>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground">Earn Official Digital Typing Certificates</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            স্পিড টেস্ট বা সরকারি পরীক্ষা সিমুলেটর সম্পন্ন করে অর্জন করুন অনলাইন যাচাইযোগ্য ডিজিটাল টাইপিং সার্টিফিকেট।
          </p>
          <div className="space-y-2 text-xs font-bold text-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> ইউনিক সার্টিফিকেট আইডি কোড (TB-XXXXXX)</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> ১-ক্লিক উচ্চ-রেজোলিউশন PDF ডাউনলোড</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> অনলাইন ভেরিফিকেশন লিঙ্ক ও সোশ্যাল শেয়ার</div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/practice/test">
              <Button className="font-bold text-xs h-10 px-6 rounded-xl shadow-xs">
                সনদ অর্জন করতে টেস্ট দিন
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setShowCertModal(true)}
              className="font-bold text-xs h-10 px-5 rounded-xl border-border"
            >
              সনদ অ্যাকশন প্রিভিউ 👁️
            </Button>
          </div>
        </div>

        {/* Holographic Certificate Card */}
        <div
          onClick={() => setShowCertModal(true)}
          className="border border-emerald-500/30 bg-card/90 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6 text-center relative overflow-hidden cursor-pointer hover:border-emerald-500/60 transition-all group"
        >
          <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-bold">
            GOLD HONORS BADGE 🎖️
          </div>
          <div className="space-y-1 pt-2">
            <span className="text-xs font-black text-foreground tracking-widest uppercase">TYPEBANGLA CERTIFICATE</span>
            <h3 className="text-xl font-black text-foreground">Certificate of Proficiency</h3>
            <p className="text-[10px] text-muted-foreground">This is proudly presented to</p>
          </div>
          <div className="font-bangla text-2xl font-black text-foreground border-b border-border pb-3 group-hover:text-emerald-500 transition-colors">
            আরিফুল ইসলাম
          </div>
          <div className="flex justify-center gap-8 text-xs font-bold">
            <div>
              <span className="text-muted-foreground block text-[10px]">TYPING SPEED</span>
              <span className="text-xl font-black text-foreground">75 WPM</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px]">ACCURACY</span>
              <span className="text-xl font-black text-foreground">98%</span>
            </div>
          </div>
          <div className="pt-2 flex justify-between items-center text-[9px] text-muted-foreground border-t border-border">
            <span>ID: TB-2026-8841</span>
            <span className="text-emerald-500 font-bold">VERIFIED CERTIFICATE ✓</span>
          </div>
        </div>
      </section>

      {/* ── 11. INSTITUTE & ENTERPRISE PORTAL (ITEM #12) ───────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border border-border bg-card/80 backdrop-blur-md rounded-2xl p-8 sm:p-10 shadow-lg space-y-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">স্কুল, কোচিং ও ইনস্টিটিউট পোর্টাল 🏫</span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">For Schools, Universities & Coaching Centers</h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                আপনার প্রতিষ্ঠানের শিক্ষার্থীদের জন্য ব্যাচভিত্তিক টাইপিং পরীক্ষা পরিচালনা, শিক্ষক ড্যাশবোর্ড ও ব্র্যান্ডেড সার্টিফিকেট ইস্যু করুন।
              </p>
            </div>
            <Link href="/institute">
              <Button size="lg" className="font-extrabold text-xs h-12 px-6 rounded-xl shadow-xs shrink-0 gap-2">
                <span>ইনস্টিটিউট পোর্টালে যান</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 12. SEO BLOG GUIDES PREVIEW (ITEM #13) ─────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ব্লগ ও গাইডলাইন</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Latest Typing Guides & Articles</h2>
          <p className="text-sm text-muted-foreground">টাইপিং গতি বাড়াতে বিশেষজ্ঞ পরামর্শ ও গাইড।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "কিভাবে টাইপিং স্পিড ৩ গুণ বাড়াবেন?",
              desc: "টাচ টাইপিংয়ের মৌলিক নীতি ও দৈনিক ২০ মিনিটের কার্যকর অনুশীলন রুটিন।",
              link: "/blog",
            },
            {
              title: "অভ্র বনাম বিজয়: সরকারি চাকরির জন্য কোনটি শিখবেন?",
              desc: "বিসিসি অনুমোদিত জাতীয় কীবোর্ড ও বিজয় কীবোর্ডের মধ্যে তুলনামূলক বিশ্লেষণ।",
              link: "/blog",
            },
            {
              title: "সরকারি কম্পিউটার অপারেটর টাইপিং পরীক্ষার সম্পূর্ণ প্রস্তুতি",
              desc: "৩০ WPM বাংলা ও ৪০ WPM ইংরেজি টাইপিংয়ে পাস করার টেকনিক ও নিয়মাবলী।",
              link: "/blog",
            },
          ].map((b, i) => (
            <Card key={i} className="border border-border bg-card/80 backdrop-blur-md rounded-2xl p-6 space-y-3 shadow-xs hover:border-emerald-500/50 transition-all">
              <h3 className="font-extrabold text-sm text-foreground leading-snug">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              <Link href={b.link} className="inline-block text-xs font-bold text-emerald-500 hover:underline pt-2">
                পড়ুন →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 13. EXPANDED STRUCTURED FAQ (ITEM #14 & #21) ──────────────────── */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">প্রশ্নোত্তর</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Frequently Asked Questions</h2>
          <p className="text-sm text-muted-foreground">টাইপবাংলা প্ল্যাটফর্ম ব্যবহারের সাধারণ প্রশ্নোত্তর।</p>
        </div>

        <div className="space-y-3">
          <FaqItem
            question="টাইপবাংলা কি পুরোপুরি বিনামূল্যে?"
            answer="হ্যাঁ, টাইপবাংলার সব কিবোর্ড লেআউট, লেসন, স্পিড টেস্ট ও ডিজিটাল সার্টিফিকেট সার্ভিস সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়।"
          />
          <FaqItem
            question="কোন কোন কীবোর্ড লেআউট সমর্থিত?"
            answer="অভ্র ফোনেটিক (Avro Phonetic), ইউনিবিজয় (UniBijoy), সরকারি বিসিসি জাতীয় (Jatiya), প্রভাত (Probhat) এবং ইংরেজি QWERTY কীবোর্ড সমর্থিত।"
          />
          <FaqItem
            question="অনুশীলনের জন্য কি অ্যাকাউন্ট খোলা বাধ্যতামূলক?"
            answer="না! আপনি কোনো অ্যাকাউন্ট খোলা ছাড়াই সরাসরি টাইপিং টেস্ট ও লেসন অনুশীলন শুরু করতে পারেন।"
          />
          <FaqItem
            question="আমি কি অনলাইন যাচাইযোগ্য সার্টিফিকেট পাব?"
            answer="হ্যাঁ! স্পিড টেস্ট বা এক্সাম সিমুলেটর সম্পন্ন করার সাথে সাথে ইউনিক ভেরিফিকেশন আইডি (TB-XXXXXX) সহ ডিজিটাল সার্টিফিকেট পাবেন।"
          />
          <FaqItem
            question="এটি কি সরকারি চাকরির টাইপিং পরীক্ষার প্রস্তুতির জন্য উপযোগী?"
            answer="অবশ্যই! আমাদের Exam Simulator মডিউলে সরকারি মন্ত্রণালয় ও ব্যাংক পরীক্ষার টাইপিং সময়সীমা (৩০ WPM বাংলা / ৪০ WPM ইংরেজি) অনুযায়ী টেস্ট দেওয়া যায়।"
          />
        </div>
      </section>

      {/* ── 14. HIGH-CONVERSION FINAL CTA BANNER (ITEM #15) ───────────────── */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="border border-border bg-primary text-primary-foreground rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Ready to Type Faster?</h2>
          <p className="text-sm sm:text-base text-primary-foreground/80 max-w-xl mx-auto">
            Start today. No account required. Free forever.
          </p>
          <div className="pt-2">
            <Link href="/learn">
              <Button size="lg" variant="secondary" className="font-black text-base h-14 px-10 rounded-2xl shadow-lg">
                Start Learning Free →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom CTA Bar (Item #17) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-card/95 backdrop-blur-md border-t border-border z-40 flex items-center justify-between gap-2 shadow-2xl">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-muted-foreground block">টাইপিং স্পিড বাড়ান</span>
          <span className="text-xs font-black text-foreground">১০০% ফ্রী অনুশীলন</span>
        </div>
        <Link href="/learn">
          <Button size="sm" className="font-extrabold text-xs px-4 h-10 rounded-xl">
            Start Learning Free →
          </Button>
        </Link>
      </div>

      {/* Certificate Modal & Action Suite Preview */}
      {showCertModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-5 text-center shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground font-bold text-xs"
            >
              ✕ বন্ধ করুন
            </button>
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-xl border border-emerald-500/20">
              🏆
            </div>
            <h3 className="text-lg font-black">যাচাইকৃত টাইপিং সার্টিফিকেট</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              স্পিড টেস্ট সম্পন্ন করার সাথে সাথেই আপনার কিবোর্ড স্পিড ও একিউরেসি সহ অনলাইন সনদের ভেরিফিকেশন আইডি জেনারেট হয়।
            </p>
            <div className="p-4 bg-secondary/50 rounded-xl text-left text-xs font-mono space-y-1.5 border border-border">
              <div><strong>সনদ আইডি:</strong> TM-VERIFIED-9912</div>
              <div><strong>স্ট্যাটাস:</strong> 🟢 Verified (অনলাইন যাচাইকৃত)</div>
              <div><strong>পরীক্ষার্থী:</strong> আরিফুল ইসলাম</div>
              <div><strong>স্কোর:</strong> ৭৫ WPM | ৯৮% Accuracy</div>
            </div>

            {/* Certificate Action Suite Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <Button size="sm" className="font-bold text-[11px] gap-1">
                📄 Download PDF
              </Button>
              <Button size="sm" variant="outline" className="font-bold text-[11px] border-border gap-1">
                🔍 Verify ID
              </Button>
              <Button size="sm" variant="secondary" className="font-bold text-[11px] gap-1">
                🔗 LinkedIn
              </Button>
              <Button size="sm" variant="secondary" className="font-bold text-[11px] gap-1">
                🌐 Facebook
              </Button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}



