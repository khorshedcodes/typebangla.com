"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Award, Zap, BookOpen,
  BarChart3, Trophy, ChevronDown, Sparkles, Play,
  ShieldCheck, Star, RefreshCw, Flame, Target, Compass
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

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

    // Calculate accuracy & WPM
    if (val.length > 0) {
      const durationSec = Math.max(1, startTime ? (Date.now() - startTime) / 1000 : 1);
      const calculatedWpm = Math.round((val.length / 5) / (durationSec / 60));
      setWpm(calculatedWpm);

      let correct = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === targetText[i]) correct++;
      }
      setAccuracy(Math.max(0, Math.round((correct / val.length) * 100)));

      // Check completion
      if (val.length >= targetText.length) {
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
    <div className="border border-border bg-card/90 backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-lg max-w-4xl mx-auto space-y-6 text-left relative overflow-hidden">
      
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

      {/* Target Text Container with Character Color Feedback */}
      <div className="font-bangla text-base sm:text-xl leading-relaxed p-4 sm:p-6 bg-secondary/30 rounded-xl border border-border select-none min-h-[100px] whitespace-pre-wrap break-words">
        {Array.from(targetText).map((char, idx) => {
          const typedChar = input[idx];
          let statusClass = "text-muted-foreground";

          if (typedChar !== undefined) {
            if (typedChar === char) {
              statusClass = "text-foreground font-bold bg-emerald-500/15 border-b-2 border-emerald-500 rounded-t-xs";
            } else {
              statusClass = "text-red-500 font-bold bg-red-500/15 border-b-2 border-red-500 underline rounded-t-xs";
            }
          } else if (idx === input.length) {
            statusClass = "text-foreground font-bold bg-primary/20 border-b-2 border-primary animate-pulse rounded-t-xs";
          }

          return (
            <span key={idx} className={statusClass}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>

      {/* Input Field & Control Buttons */}
      <div className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={isCompleted}
            placeholder={isCompleted ? "টেস্ট সম্পন্ন হয়েছে! নিচে ফলাফল দেখুন..." : "এখানে টাইপ করা শুরু করুন (কোনো অ্যাকাউন্ট লাগবে না)..."}
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

        <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground gap-2">
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

// ── 3. FAQ ACCORDION ITEM ───────────────────────────────────────────────────
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

// ── MAIN LANDING PAGE COMPONENT ─────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-24 py-10 md:py-16 overflow-hidden">
      
      {/* ── 1. HERO SECTION & LIVE ARENA ──────────────────────────────────── */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-8 relative">
        <div className="inline-flex items-center space-x-2 bg-secondary border border-border px-4 py-1.5 rounded-full shadow-xs">
          <Sparkles size={14} className="text-foreground" />
          <span className="text-xs font-bold text-foreground tracking-widest uppercase">
            TYPEBANGLA PLATFORM
          </span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
            বাংলা ও ইংরেজি টাইপিং শেখার{" "}
            <span className="underline decoration-border">
              স্মার্ট ডিজিটাল প্ল্যাটফর্ম
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
            Avro, UniBijoy, Jatiya Govt & English touch typing. Free structured lessons, live speed tests, and verified digital certificates.
          </p>
        </div>

        {/* Hero Typewriter */}
        <HeroTypewriter />

        {/* Live Multi-Layout Typing Arena */}
        <div className="pt-4">
          <HeroMultiLayoutArena />
        </div>
      </section>

      {/* ── 2. PLATFORM STATISTICS HUD BAR ────────────────────────────────── */}
      <section className="border-y border-border bg-secondary/40 py-10">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50,000+", label: "টাইপিং পরীক্ষা সম্পন্ন" },
              { value: "7 Layouts", label: "অভ্র, বিজয়, জাতীয়, প্রভাত ও QWERTY" },
              { value: "90+ Lessons", label: "ধাপে ধাপে শিক্ষাক্রম পাঠ" },
              { value: "100% Free", label: "যাচাইযোগ্য ডিজিটাল সনদ" },
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-4xl font-black text-foreground">{s.value}</div>
                <div className="text-xs font-bold text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. GOVT JOB OPERATOR REQUIREMENTS BANNER ──────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border border-border bg-card rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold border border-emerald-500/20">
                <ShieldCheck size={14} /> সরকারি চাকরি ও কম্পিউটার অপারেটর প্রস্তুতি
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">Government Job Operator Exam Criteria</h2>
            </div>
            <Link href="/exam/govt">
              <Button size="sm" className="font-bold text-xs gap-2">
                গভঃ এক্সাম সিমুলেটর <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/50 rounded-xl border border-border space-y-2">
              <div className="text-xs font-bold text-muted-foreground uppercase">বাংলা টাইপিং স্পিড</div>
              <div className="text-2xl font-black text-foreground">৩০ WPM</div>
              <p className="text-xs text-muted-foreground">জাতীয় বিসিসি বা বিজয় কীবোর্ড লেআউট</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-xl border border-border space-y-2">
              <div className="text-xs font-bold text-muted-foreground uppercase">ইংরেজি টাইপিং স্পিড</div>
              <div className="text-2xl font-black text-foreground">৪০ WPM</div>
              <p className="text-xs text-muted-foreground">স্ট্যান্ডার্ড ইংরেজি QWERTY কীবোর্ড</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-xl border border-border space-y-2">
              <div className="text-xs font-bold text-muted-foreground uppercase">নূন্যতম নির্ভুলতা</div>
              <div className="text-2xl font-black text-foreground">৮৫%+ Accuracy</div>
              <p className="text-xs text-muted-foreground">অতিরিক্ত ভুলের জন্য স্পিড কর্তন নিয়ম</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SUPPORTED KEYBOARD LAYOUT EXPLORER ─────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">কীবোর্ড সমর্থক</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Supported Keyboard Layouts</h2>
          <p className="text-sm text-muted-foreground">আপনার পছন্দের যেকোনো লেআউটে অনুশীলন করুন।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Avro Phonetic", desc: "সহজ ফোনেটিক টাইপিং (a=আ, k=ক)", badge: "জনপ্রিয়", icon: "⌨️" },
            { name: "UniBijoy / Bijoy 52", desc: "প্রথাগত বিজয় কীবোর্ড স্টাইল", badge: "অফিসিয়াল", icon: "🏛️" },
            { name: "Jatiya (BCC)", desc: "সরকারি চাকরি পরীক্ষার লেআউট", badge: "Govt Job", icon: "🎖️" },
            { name: "English QWERTY", desc: "স্ট্যান্ডার্ড ইংরেজি টাচ-টাইপিং", badge: "Standard", icon: "🌐" },
          ].map((l, i) => (
            <Card key={i} className="border border-border bg-card hover:border-foreground/50 transition-all rounded-xl shadow-xs text-center">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-secondary text-foreground flex items-center justify-center mx-auto text-2xl border border-border">
                  {l.icon}
                </div>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                  {l.badge}
                </span>
                <h3 className="font-extrabold text-sm text-foreground">{l.name}</h3>
                <p className="text-xs text-muted-foreground">{l.desc}</p>
                <Link href="/learn" className="inline-block text-xs font-bold text-foreground hover:underline pt-2">
                  পাঠ দেখুন →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 5. STEP-BY-STEP LEARNING ROADMAP ──────────────────────────────── */}
      <section className="bg-secondary/40 py-16 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">শেখার রোডম্যাপ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Your Step-by-Step Learning Path</h2>
            <p className="text-sm text-muted-foreground">শিক্ষানবিস থেকে দক্ষ টাইপিস্ট হওয়ার সুস্পষ্ট প্রক্রিয়া।</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { step: "01", title: "Beginner", desc: "মৌলিক ধারণা" },
              { step: "02", title: "Home Row", desc: "আঙুলের সঠিক স্থান" },
              { step: "03", title: "Words", desc: "শব্দ ও যুক্তাক্ষর" },
              { step: "04", title: "Paragraphs", desc: "পূর্ণ অনুচ্ছেদ" },
              { step: "05", title: "Speed Tests", desc: "১৫-৬০ সেকেন্ড টেস্ট" },
              { step: "06", title: "Certificate", desc: "যাচাইকৃত সনদ অর্জন" },
            ].map((path, idx) => (
              <React.Fragment key={idx}>
                <div className="border border-border bg-card p-5 rounded-xl text-center w-36 shadow-xs hover:border-foreground/50 transition-all">
                  <span className="text-xs font-black text-foreground block mb-1">{path.step}</span>
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

      {/* ── 6. CERTIFICATE PREVIEW & VERIFICATION ─────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">যাচাইকৃত সনদ</span>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground">Earn Official Digital Typing Certificates</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            স্পিড টেস্ট বা সরকারি পরীক্ষা সিমুলেটর সম্পন্ন করে অর্জন করুন অনলাইন যাচাইযোগ্য ডিজিটাল টাইপিং সার্টিফিকেট।
          </p>
          <div className="space-y-2 text-xs font-bold text-foreground">
            <div className="flex items-center gap-2">✓ ইউনিক সার্টিফিকেট আইডি কোড</div>
            <div className="flex items-center gap-2">✓ ১-ক্লিক উচ্চ-রেজোলিউশন ডাউনলোড</div>
            <div className="flex items-center gap-2">✓ অনলাইন ভেরিফিকেশন ইউআরএল (/verify/...)</div>
          </div>
          <Link href="/practice/test" className="inline-block pt-2">
            <Button className="font-bold text-xs h-10 px-6 rounded-md shadow-xs">
              সনদ অর্জন করতে টেস্ট দিন
            </Button>
          </Link>
        </div>

        <div className="border border-border bg-card rounded-2xl p-8 shadow-md space-y-6 text-center relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-xs font-black text-foreground tracking-widest uppercase">TYPEBANGLA CERTIFICATE</span>
            <h3 className="text-xl font-black text-foreground">Certificate of Proficiency</h3>
            <p className="text-[10px] text-muted-foreground">This is proudly presented to</p>
          </div>
          <div className="font-bangla text-2xl font-black text-foreground border-b border-border pb-3">
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
            <span className="text-foreground font-bold">VERIFIED CERTIFICATE ✓</span>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">প্রশ্নোত্তর</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Frequently Asked Questions</h2>
          <p className="text-sm text-muted-foreground">সাধারণ কিছু প্রশ্নের উত্তর।</p>
        </div>

        <div className="space-y-3">
          <FaqItem
            question="টাইপবাংলা কি পুরোপুরি বিনামূল্যে?"
            answer="হ্যাঁ, টাইপবাংলার সব কিবোর্ড লেআউট, লেসন, স্পিড টেস্ট ও ডিজিটাল সার্টিফিকেট সার্ভিস বিনামূল্যে ব্যবহার করা যায়।"
          />
          <FaqItem
            question="কোন কোন কীবোর্ড লেআউট সমর্থিত?"
            answer="অভ্র ফোনেটিক (Avro Phonetic), ইউনিবিজয় (UniBijoy), সরকারি বিসিসি জাতীয় (Jatiya), প্রভাত (Probhat) এবং ইংরেজি QWERTY সাপোর্ট করে।"
          />
          <FaqItem
            question="অনুশীলনের জন্য কি অ্যাকাউন্ট খোলা বাধ্যতামূলক?"
            answer="না! আপনি কোনো অ্যাকাউন্ট খোলা ছাড়াই সরাসরি টাইপিং টেস্ট ও লেসন অনুশীলন শুরু করতে পারেন। তবে ফলাফল সেভ করতে বিনামূল্যে রেজিস্টার করা ভালো।"
          />
          <FaqItem
            question="আমি কি যাচাইযোগ্য সার্টিফিকেট পাব?"
            answer="হ্যাঁ! টাইপিং টেস্ট সম্পন্ন করার সাথে সাথে একটি ইউনিক ভেরিফিকেশন আইডি সহ ডিজিটাল সার্টিফিকেট জেনারেট হয় যা যাচাই করা যায়।"
          />
          <FaqItem
            question="এটি কি সরকারি চাকরির টাইপিং পরীক্ষার প্রস্তুতির জন্য উপযোগী?"
            answer="অবশ্যই! আমাদের Exam Simulator মডিউলে সরকারি মন্ত্রণালয় ও ব্যাংক পরীক্ষার টাইপিং সময়সীমা ও স্পিড ক্যাটালগ অনুযায়ী টেস্ট দেওয়া যায়।"
          />
        </div>
      </section>

      {/* ── 8. FINAL CTA BANNER ───────────────────────────────────────────── */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="border border-border bg-primary text-primary-foreground rounded-2xl p-10 text-center space-y-6 shadow-md">
          <h2 className="text-3xl sm:text-4xl font-black">Ready to improve your typing speed?</h2>
          <p className="text-sm text-primary-foreground/80 max-w-xl mx-auto">
            আজই শুরু করুন বাংলা ও ইংরেজি টাইপিং অনুশীলন। সম্পূর্ণ বিনামূল্যে।
          </p>
          <div className="pt-2">
            <Link href="/learn">
              <Button size="lg" variant="secondary" className="font-bold text-sm h-12 px-8 rounded-md shadow-xs">
                বিনামূল্যে শুরু করুন (Start for Free) →
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
