"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Award, Zap, BookOpen,
  BarChart3, Trophy, ChevronDown, Sparkles, Play,
  ShieldCheck, Star, Keyboard
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

// ── 1. Hero Typewriter Animation ──────────────────────────────────────────────
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
    <div className="border border-border bg-card rounded-xl p-5 shadow-xs max-w-[540px] mx-auto flex items-center justify-center h-[76px]">
      <span className="font-bangla text-xl sm:text-2xl font-bold text-foreground">{displayed}</span>
      <span className="inline-block w-[3px] h-[1.3em] bg-foreground ml-2 animate-pulse rounded-full" />
    </div>
  );
}

// ── 3. Interactive Live Typing Demo Component ─────────────────────────────────
const DEMO_PROMPT = "বাংলাদেশ আমাদের প্রিয় জন্মভূমি। বাংলা টাইপিং শেখা এখন সবথেকে সহজ টাইপবাংলা প্ল্যাটফর্মে।";

function LiveTypingDemo() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime && val.length > 0) setStartTime(Date.now());
    setInput(val);

    if (val.length > 0 && startTime) {
      const elapsedSec = (Date.now() - startTime) / 1000;
      const calculatedWpm = Math.round((val.length / 5) / (elapsedSec / 60));
      setWpm(calculatedWpm > 0 ? calculatedWpm : 0);

      let correct = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === DEMO_PROMPT[i]) correct++;
      }
      setAccuracy(Math.round((correct / val.length) * 100));
    }
  };

  const resetDemo = () => {
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className="border border-border bg-card rounded-xl p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-foreground animate-pulse" />
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">সরাসরি টাইপ করে দেখুন</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-bold">
          <div>
            <span className="text-muted-foreground text-xs">গতি: </span>
            <span className="text-foreground font-black text-lg">{wpm} WPM</span>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">সঠিকতা: </span>
            <span className="text-foreground font-black text-lg">{accuracy}%</span>
          </div>
        </div>
      </div>

      <div className="font-bangla text-lg sm:text-xl leading-relaxed p-4 bg-secondary rounded-lg border border-border select-none text-left">
        {Array.from(DEMO_PROMPT).map((char, idx) => {
          const typed = input[idx];
          let color = "text-muted-foreground";
          if (typed !== undefined) {
            color = typed === char ? "text-foreground font-bold bg-primary/10 px-0.5 rounded" : "text-red-500 bg-red-500/10 px-0.5 rounded underline font-bold";
          }
          return (
            <span key={idx} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="এখানে টাইপ করা শুরু করুন (কোনো অ্যাকাউন্ট দরকার নেই)..."
          className="w-full font-bangla text-base p-4 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring bg-background text-foreground shadow-xs"
        />
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>বিনা নিবন্ধনে সাথে সাথে টাইপ করে দেখুন।</span>
          <button onClick={resetDemo} className="text-foreground hover:underline font-bold">
            পুনরায় শুরু করুন ↺
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 10. FAQ Accordion Item ───────────────────────────────────────────────────
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

export default function LandingPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-24 py-12 md:py-20 overflow-hidden">
      
      {/* ── 1. HERO SECTION ───────────────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 relative">
        <div className="inline-flex items-center space-x-2 bg-secondary border border-border px-4 py-1.5 rounded-full shadow-xs">
          <Sparkles size={14} className="text-foreground" />
          <span className="text-xs font-bold text-foreground tracking-widest uppercase">
            TYPEBANGLA
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            বাংলা টাইপিং শেখার{" "}
            <span className="underline decoration-border">
              সবচেয়ে সহজ উপায়
            </span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Practice Avro, Bijoy, Jatiya and English. Get certificates and track your typing progress.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/learn">
            <Button size="lg" className="font-bold text-sm h-12 px-8 rounded-md shadow-xs gap-2">
              শেখা শুরু করুন (Start Learning) <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/practice/test">
            <Button size="lg" variant="outline" className="font-bold text-sm h-12 px-8 rounded-md gap-2 border-border">
              স্পিড টেস্ট দিন (Take a Test) <Play size={15} />
            </Button>
          </Link>
        </div>

        <div className="pt-4">
          <HeroTypewriter />
        </div>
      </section>

      {/* ── 2. WHY TYPEBANGLA? ────────────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">কেন টাইপবাংলা?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Why Choose TypeBangla?</h2>
          <p className="text-sm text-muted-foreground">এক জায়গায় সব কিবোর্ড লেআউট ও আধুনিক অনুশীলন সুবিধা।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Learn Bangla & English Together", desc: "দ্বিভাষিক পাঠ্যক্রমের মাধ্যমে দ্রুত টাইপিং শিখুন।", icon: "🌐" },
            { title: "Avro, Bijoy & Jatiya Support", desc: "অভ্র ফোনেটিক, বিজয় ৫২ ও বিসিসি জাতীয় লেআউট সাপোর্ট।", icon: "⌨️" },
            { title: "Structured Typing Lessons", desc: "হোম রো থেকে জটিল যুক্তাক্ষর পর্যন্ত ধাপে ধাপে পাঠ।", icon: "📚" },
            { title: "Speed & Accuracy Analytics", desc: "রিয়েল-টাইম গতি (WPM) ও সঠিকতার গ্রাফ ট্র্যাকিং।", icon: "📊" },
            { title: "Free Speed Tests", desc: "১৫, ৩০ ও ৬০ সেকেন্ডের বিনামূল্যে টাইপিং পরীক্ষা।", icon: "⚡" },
            { title: "Printable Certificates", desc: "যাচাইযোগ্য ডিজিটাল টাইপিং সার্টিফিকেট ডাউনলোড করুন।", icon: "🎓" },
          ].map((b, i) => (
            <Card key={i} className="border border-border bg-card hover:border-foreground/50 transition-all rounded-xl shadow-xs">
              <CardContent className="p-6 space-y-3">
                <div className="text-3xl">{b.icon}</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-foreground shrink-0" />
                  <h3 className="font-extrabold text-sm text-foreground">{b.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 3. INTERACTIVE TYPING DEMO ─────────────────────────────────── */}
      <section className="bg-secondary py-16 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">লাইভ ট্রায়াল</span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground">Try Typing Live Now ⭐</h2>
            <p className="text-sm text-muted-foreground">নিচে সরাসরি টাইপ করুন — কোনো অ্যাকাউন্ট নিবন্ধনের দরকার নেই।</p>
          </div>

          <LiveTypingDemo />
        </div>
      </section>

      {/* ── 4. KEYBOARD LAYOUTS ───────────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">লেআউট সমর্থন</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Supported Keyboard Layouts</h2>
          <p className="text-sm text-muted-foreground">আপনার পছন্দের যেকোনো লেআউটে অনুশীলন করুন।</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Avro Phonetic", desc: "সহজ ফোনেটিক টাইপিং (a=আ, k=ক)", badge: "জনপ্রিয়" },
            { name: "UniBijoy / Bijoy 52", desc: "প্রথাগত বিজয় কীবোর্ড স্টাইল", badge: "অফিসিয়াল" },
            { name: "Jatiya (BCC)", desc: "সরকারি চাকরি পরীক্ষার লেআউট", badge: "Govt Job" },
            { name: "English QWERTY", desc: "স্ট্যান্ডার্ড ইংরেজি টাচ-টাইপিং", badge: "Standard" },
          ].map((l, i) => (
            <Card key={i} className="border border-border bg-card hover:border-foreground/50 transition-all rounded-xl text-center shadow-xs">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-secondary text-foreground flex items-center justify-center mx-auto font-black text-lg border border-border">
                  ⌨️
                </div>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                  {l.badge}
                </span>
                <h3 className="font-extrabold text-sm text-foreground">{l.name}</h3>
                <p className="text-xs text-muted-foreground">{l.desc}</p>
                <Link href={`/learn`} className="inline-block text-xs font-bold text-foreground hover:underline pt-2">
                  পাঠ দেখুন →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 5. LEARNING PATH ROADMAP ──────────────────────────────────────── */}
      <section className="bg-secondary py-16 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">শেখার রোডম্যাপ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Your Step-by-Step Learning Path</h2>
            <p className="text-sm text-muted-foreground">শিক্ষানবিস থেকে দক্ষ টাইপিস্ট হওয়ার সুস্পষ্ট প্রক্রিয়া।</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { step: "01", title: "Beginner", desc: "মৌলিক স্বরবর্ণ ও ধারণা" },
              { step: "02", title: "Home Row", desc: "আঙুল রাখার সঠিক অবস্থান" },
              { step: "03", title: "Words", desc: "শব্দ ও যুক্তাক্ষর অনুশীলন" },
              { step: "04", title: "Paragraphs", desc: "পূর্ণ অনুচ্ছেদ টাইপিং" },
              { step: "05", title: "Typing Tests", desc: "১৫-৬০ সেকেন্ড গতি পরীক্ষা" },
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

      {/* ── 6. FEATURE PREVIEWS ───────────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">প্ল্যাটফর্ম ফিচার</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Explore Platform Modules</h2>
          <p className="text-sm text-muted-foreground">টাইপবাংলার প্রতিটি গুরুত্বপূর্ণ মডিউলের সংক্ষিপ্ত বিবরণ।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Lesson Modules", desc: "৯০+ লেসন ইন্টারঅ্যাক্টিভ ভার্চুয়াল কীবোর্ড নির্দেশিকা সহ।", href: "/learn", icon: BookOpen },
            { title: "Typing Test Arena", desc: "১৫, ৩০ ও ৬০ সেকেন্ডের গতি ও নির্ভুলতা টেস্ট ইঞ্জিন।", href: "/practice/test", icon: Zap },
            { title: "Analytics Dashboard", desc: "আপনার গড় WPM, পিক গতি ও ভুল কীর গ্রাফ চার্ট।", href: "/dashboard", icon: BarChart3 },
            { title: "Govt Exam Simulator", desc: "সরকারি চাকরি ও ব্যাংক টাইপিং পরীক্ষা পরিবেশ।", href: "/exam/govt", icon: ShieldCheck },
            { title: "National Leaderboard", desc: "বাংলাদেশের সেরা টাইপিস্টদের সঙ্গে রিয়েল-টাইম র‍্যাঙ্কিং।", href: "/leaderboard", icon: Trophy },
            { title: "Digital Certificate", desc: "উচ্চ-রেজোলিউশন ডাউনলোড ও অনলাইনে সনদে লিংক।", href: "/dashboard", icon: Award },
          ].map((f, i) => (
            <Card key={i} className="border border-border bg-card hover:border-foreground/50 transition-all rounded-xl shadow-xs">
              <CardContent className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-md bg-secondary text-foreground flex items-center justify-center border border-border">
                  <f.icon size={20} />
                </div>
                <h3 className="font-extrabold text-sm text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                <Link href={f.href} className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:underline pt-2">
                  খুলুন <ArrowRight size={13} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 7. CERTIFICATE PREVIEW ────────────────────────────────────────── */}
      <section className="bg-secondary py-16 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">যাচাইকৃত সনদ</span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground">Earn Official Typing Certificates</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              যেকোনো স্পিড টেস্ট বা সরকারি পরীক্ষা সিমুলেটর সফলভাবে সম্পন্ন করে অর্জন করুন যাচাইযোগ্য ডিজিটাল টাইপিং সার্টিফিকেট।
            </p>
            <div className="space-y-2 text-xs font-bold text-foreground">
              <div className="flex items-center gap-2">✓ ইউনিক সার্টিফিকেট আইডি কোড</div>
              <div className="flex items-center gap-2">✓ ১-ক্লিক উচ্চ-রেজোলিউশন PNG ডাউনলোড</div>
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
        </div>
      </section>

      {/* ── 8. HONEST STATISTICS ─────────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">পরিসংখ্যান</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Platform Statistics</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "50,000+", label: "Typing Tests Completed" },
            { value: "90+", label: "Curriculum Lessons" },
            { value: "4 Layouts", label: "Avro, Bijoy, Jatiya, QWERTY" },
            { value: "1,000+", label: "Practice Paragraphs" },
          ].map((s, i) => (
            <Card key={i} className="border border-border bg-card shadow-xs rounded-xl">
              <CardContent className="p-6 text-center">
                <div className="text-2xl sm:text-3xl font-black text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground font-bold mt-1">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 9. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="bg-secondary py-16 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ব্যবহারকারীদের মতামত</span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">What Learners Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "মাত্র ৩ সপ্তাহে আমার টাইপিং গতি ২০ থেকে ৫৫ WPM এ উন্নীত হয়েছে!", author: "তানভীর হাসান", role: "বিশ্ববিদ্যালয় শিক্ষার্থী" },
              { quote: "বিসিএস ও সরকারি চাকরির টাইপিং পরীক্ষার প্রস্তুতির জন্য সেরা প্ল্যাটফর্ম।", author: "শাহাদাত হোসেন", role: "চাকরিপ্রার্থী" },
              { quote: "অভ্র ও জাতীয় কিবোর্ডের সবচেয়ে নির্ভুল লেসন গাইড টাইপবাংলাতেই পেয়েছি।", author: "আনিকা রহমান", role: "ফ্রিল্যান্সার" },
            ].map((t, i) => (
              <Card key={i} className="border border-border bg-card shadow-xs rounded-xl text-left">
                <CardContent className="p-6 space-y-4">
                  <div className="flex text-foreground gap-1">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star key={starIdx} size={14} className="fill-foreground text-foreground" />
                    ))}
                  </div>
                  <p className="text-xs text-foreground leading-relaxed italic">"{t.quote}"</p>
                  <div>
                    <div className="font-extrabold text-xs text-foreground">{t.author}</div>
                    <div className="text-[10px] text-muted-foreground">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ SECTION ──────────────────────────────────────────────── */}
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

      {/* ── 11. FINAL CTA SECTION ────────────────────────────────────────── */}
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
