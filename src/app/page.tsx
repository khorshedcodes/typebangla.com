"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Award, Zap, BookOpen,
  BarChart3, Trophy, ChevronDown, Sparkles, Play,
  ShieldCheck, Star, RefreshCw, Flame, Target, Compass
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { FaqItem } from "../components/home/LandingSections";
import { BLOG_POSTS } from "../utils/blogData";

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
          "text": "হ্যাঁ! টাইপবাংলার সব কিবোর্ড লেআউট, লেসন ও স্পিড টেস্ট সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়।"
        }
      },
      {
        "@type": "Question",
        "name": "কোন কোন কীবোর্ড লেআউট সমর্থিত?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "অভ্র ফোনেটিক, ইউনিবিজয়/বিজয় ৫২, বিসিসি জাতীয়, প্রভাত, ইনস্ক্রিপ্ট এবং ইংরেজি QWERTY — মোট ৬টি কীবোর্ড লেআউট সমর্থিত।"
        }
      },
      {
        "@type": "Question",
        "name": "অনুশীলনের জন্য কি অ্যাকাউন্ট খোলা বাধ্যতামূলক?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "না! মুক্তভাবে টাইপিং প্র্যাকটিস ও স্পিড টেস্টের জন্য কোনো অ্যাকাউন্টের প্রয়োজন নেই। তবে ফুল কোর্সে এনরোল করা, লেসন প্রোগ্রেস সেভ রাখা এবং ভেরিফাইড সার্টিফিকেট পাওয়ার জন্য একটি ফ্রি লার্নার অ্যাকাউন্ট তৈরি করতে হয়।"
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

      {/* ── 1. HERO SECTION ────────────────────────────────────────────── */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-8 relative pt-4">

        {/* Deep Ambient Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-emerald-500/15 via-emerald-500/5 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-2 rounded-full shadow-xs">
          <Sparkles size={14} className="text-emerald-500" />
          <span className="text-xs font-bold text-foreground">
            100% Free & Open-Access Bangla & English Typing Engine 🇧🇩
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
          <Link href="/courses" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-black shadow-lg rounded-2xl gap-2 bg-primary text-primary-foreground hover:opacity-95">
              <span>Start Learning Free →</span>
            </Button>
          </Link>
          <Link href="/practice" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-bold rounded-2xl border-border hover:bg-secondary">
              Try Typing Test
            </Button>
          </Link>
        </div>
      </section>

      {/* ── 2. PLATFORM SOCIAL PROOF & STATS BAR ──────────────────────────── */}
      <section className="border-y border-border bg-secondary/40 backdrop-blur-md py-10">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "⚡", value: "Real-Time", label: "WPM & Accuracy Engine" },
              { icon: "⌨️", value: "6 Layouts", label: "Avro, Bijoy, Jatiya & English" },
              { icon: "🏛️", value: "BCC Specs", label: "Govt Exam Benchmark" },
              { icon: "📜", value: "Verified PDF", label: "Instant QR Certificate" },
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

      {/* ── 3. GOVT JOB & CAREER SPEED CTA CARD ────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border border-border bg-gradient-to-r from-emerald-500/10 via-card to-card backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold border border-emerald-500/20">
              <ShieldCheck size={14} /> সরকারি চাকরি ও ব্যাংক নিয়োগ পরীক্ষা
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">বিসিসি সরকারি চাকরি টাইপিং টেস্ট সিমুলেটর</h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              মন্ত্রণালয় ও ব্যাংক নিয়োগ পরীক্ষার হুবহু ৫ মিনিটের টেস্ট ফরম্যাটে ৩০ WPM বাংলা (জাতীয়/বিজয়) ও ৪০ WPM ইংরেজি পরীক্ষার অনুশীলন করুন।
            </p>
          </div>
          <Link href="/exam/govt" className="shrink-0">
            <Button size="lg" className="font-black text-xs sm:text-sm h-12 px-6 rounded-2xl gap-2 shadow-md bg-emerald-600 hover:bg-emerald-700 text-white border-none">
              <span>সিমুলেটরে টেস্ট দিন ➔</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* ── 4. KEYBOARD LAYOUT CARDS WITH METADATA ─────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">কীবোর্ড সমর্থক</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Supported Keyboard Layouts</h2>
          <p className="text-sm text-muted-foreground">আপনার পছন্দের যেকোনো লেআউটে অনুশীলন করুন।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Avro Phonetic",
              pop: "Phonetic Transliteration",
              diff: "Beginner Friendly",
              audience: "Recommended for Beginners & Students",
              icon: "⌨️",
              link: "/avro-phonetic-typing",
            },
            {
              name: "UniBijoy / Bijoy 52",
              pop: "Unicode & ANSI",
              diff: "Govt Standard",
              audience: "Recommended for Office & Govt Staff",
              icon: "🏛️",
              link: "/bijoy-52-typing",
            },
            {
              name: "Jatiya (BCC)",
              pop: "Govt Required",
              diff: "Official Exam",
              audience: "Recommended for Govt Operator Applicants",
              icon: "🎖️",
              link: "/jatiya-keyboard-typing",
            },
            {
              name: "Probhat Layout",
              pop: "Intuitive Bangla Map",
              diff: "Fixed Layout",
              audience: "Recommended for Writers & Translators",
              icon: "🌅",
              link: "/probhat-layout-typing",
            },
            {
              name: "Inscript Bangla",
              pop: "India National Standard",
              diff: "Regional Standard",
              audience: "Recommended for West Bengal & Regional Typing",
              icon: "🇮🇳",
              link: "/inscript-bangla-typing",
            },
            {
              name: "English QWERTY",
              pop: "Standard Touch Typing",
              diff: "All-Level Practice",
              audience: "Recommended for Global Freelancers & Coders",
              icon: "🌐",
              link: "/english-touch-typing",
            },
          ].map((l, i) => (
            <Card key={i} className="border border-border bg-card/80 backdrop-blur-md hover:border-emerald-500/50 transition-all rounded-2xl p-6 space-y-3 text-center shadow-xs group">
              <div className="w-12 h-12 rounded-2xl bg-secondary text-foreground flex items-center justify-center mx-auto text-2xl border border-border group-hover:scale-110 transition-transform">
                {l.icon}
              </div>
              <h3 className="font-extrabold text-base text-foreground pt-1">{l.name}</h3>
              <div className="flex justify-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {l.pop}
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                  {l.diff}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">{l.audience}</p>
              <Link href={l.link} className="inline-block text-xs font-bold text-emerald-500 hover:underline pt-2">
                পাঠ দেখুন →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 5. TIMELINE LEARNING ROADMAP ─────────────────────────────────────── */}
      <section className="bg-secondary/40 py-16 border-y border-border">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ধাপে ধাপে শেখার রোডম্যাপ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Your Step-by-Step Typing Roadmap</h2>
            <p className="text-sm text-muted-foreground">শিক্ষানবিস থেকে দক্ষ টাইপিস্ট হওয়ার সুস্পষ্ট ৬টি ধাপ।</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {[
              { step: "01", title: "Beginner", desc: "কীবোর্ড ও আঙুল বিন্যাস" },
              { step: "02", title: "Home Row", desc: "হোম রো টাচ টাইপিং" },
              { step: "03", title: "Words", desc: "শব্দ ও যুক্তাক্ষর চর্চা" },
              { step: "04", title: "Sentences", desc: "পূর্ণ বাক্য ও অনুচ্ছেদ" },
              { step: "05", title: "Numbers", desc: "সংখ্যা ও প্রতীক ড্রিল" },
              { step: "06", title: "Speed Test", desc: "১৫-৬০ সেকেন্ড গতি পরীক্ষা" },
              { step: "07", title: "Certificate", desc: "যাচাইকৃত সনদ লাভ" },
            ].map((path, idx) => (
              <React.Fragment key={idx}>
                <div className="border border-border bg-card p-4 rounded-2xl text-center w-32 shadow-xs hover:border-emerald-500/50 hover:scale-105 transition-all">
                  <span className="text-xs font-black text-emerald-500 block mb-1">{path.step}</span>
                  <h4 className="font-extrabold text-xs text-foreground">{path.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{path.desc}</p>
                </div>
                {idx < 6 && (
                  <ArrowRight size={16} className="text-muted-foreground hidden lg:block shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. OUTCOME PROGRESSION ───────────────────────────────────────────── */}
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

      {/* ── 7. TYPING GAMES PREVIEW ──────────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">গেমিফাইড লার্নিং</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Play While Learning</h2>
          <p className="text-sm text-muted-foreground">গেম খেলে আনন্দ নিয়ে কিবোর্ড গতি ও একিউরেসি বাড়ান।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Word Race 🏎️", desc: "শব্দ টাইপ করে রেস জিতেন", badge: "রেসিং গেম", link: "/game?mode=race" },
            { title: "Falling Letters 🌠", desc: "ঝরে পড়া অক্ষরগুলো টাইপ করুন", badge: "রিফ্লেক্স ড্রিল", link: "/game?mode=falling" },
            { title: "Speed Challenge ⚡", desc: "৬০ সেকেন্ডে সর্বোচ্চ শব্দের চ্যালেঞ্জ", badge: "টাইমার মোড", link: "/game?mode=speed" },
            { title: "Time Attack ⏱️", desc: "ভুল না করে দীর্ঘতম সময় টাইপিং", badge: "একিউরেসি গেম", link: "/game?mode=time-attack" },
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

      {/* ── 8. PRACTICE CATEGORIES GRID ─────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">অনুশীলন বিভাগ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Explore Practice Categories</h2>
          <p className="text-sm text-muted-foreground">আপনার নির্দিষ্ট লক্ষ্য অনুযায়ী ক্যাটাগরি বেছে নিন।</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "বাংলা টাইপিং", count: "৩০+ লেসন", icon: "🇧🇩", link: "/courses" },
            { name: "English Touch Typing", count: "২৫+ লেসন", icon: "🌐", link: "/english-touch-typing" },
            { name: "যুক্তাক্ষর মাস্টার", count: "১৫+ ড্রিলস", icon: "🔤", link: "/juktakkhor" },
            { name: "Govt Exam Simulator", count: "সরকারি সিমুলেটর", icon: "🏛️", link: "/exam/govt" },
            { name: "শব্দ অনুশীলন", count: "১০০০+ শব্দ", icon: "📝", link: "/practice/words" },
            { name: "বাক্য অনুশীলন", count: "৫০০+ বাক্য", icon: "💬", link: "/practice/sentences" },
            { name: "সংখ্যা ও প্রতীক", count: "নুমেরিক কীবোর্ড", icon: "🔢", link: "/practice/numbers" },
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

      {/* ── 9. CERTIFICATE ACTION SUITE ──────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">যাচাইকৃত সনদ</span>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground">Earn Official Digital Typing Certificates</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            কোর্স বা পরীক্ষা সিমুলেটর সম্পন্ন করে অর্জন করুন অনলাইন যাচাইযোগ্য ডিজিটাল টাইপিং সার্টিফিকেট।
          </p>
          <div className="space-y-2 text-xs font-bold text-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> ইউনিক সার্টিফিকেট আইডি কোড (TB-XXXXXX)</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> ১-ক্লিক উচ্চ-রেজোলিউশন PDF ডাউনলোড</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> অনলাইন ভেরিফিকেশন লিঙ্ক ও সোশ্যাল শেয়ার</div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/courses">
              <Button className="font-bold text-xs h-10 px-6 rounded-xl shadow-xs">
                সনদ অর্জন করতে কোর্সসমূহ দেখুন →
              </Button>
            </Link>
            <Link href="/verify/TM-DEMO-2026" target="_blank">
              <Button
                variant="outline"
                className="font-bold text-xs h-10 px-5 rounded-xl border-border gap-1"
              >
                সনদ ভেরিফিকেশন উদাহরণ 👁️
              </Button>
            </Link>
          </div>
        </div>

        {/* Holographic Certificate Card */}
        <Link
          href="/verify/TM-DEMO-2026"
          target="_blank"
          className="border border-emerald-500/30 bg-card/90 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6 text-center relative overflow-hidden cursor-pointer hover:border-emerald-500/60 transition-all group block"
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
            <span>ID: TM-DEMO-2026</span>
            <span className="text-emerald-500 font-bold">VERIFIED CERTIFICATE ✓</span>
          </div>
        </Link>
      </section>

      {/* ── 10. INSTITUTE & ENTERPRISE PORTAL (VERSION 2.0) ────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border border-teal-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-8 sm:p-10 shadow-lg space-y-6 text-center sm:text-left text-slate-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest">ইনস্টিটিউট, স্কুল ও কোচিং সেন্টার পোর্টাল 🏫</span>
                <Badge className="bg-amber-500 text-slate-950 font-bold text-[10px]">VERSION 2.0</Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">কম্পিউটার প্রশিক্ষণ কেন্দ্র ও প্রতিষ্ঠানের জন্য</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                মাল্টি-টিচার শিক্ষক প্যানেল, প্রক্টরড টাইপিং পরীক্ষা ইঞ্জিন এবং অনলাইন ভেরিফাইড সনদ প্রদানের জন্য চালু হচ্ছে <strong className="text-teal-400">ইনস্টিটিউট পোর্টাল V2</strong>।
              </p>
            </div>
            <Link href="/institute">
              <Button size="lg" className="font-extrabold text-xs h-12 px-6 rounded-xl shadow-lg shrink-0 gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 border-none">
                <span>Institute V2 Portal &amp; Early Access ➔</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. SEO BLOG GUIDES PREVIEW ─────────────────────────────────────── */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ব্লগ ও গাইডলাইন</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Latest Typing Guides & Articles</h2>
          <p className="text-sm text-muted-foreground">টাইপিং গতি বাড়াতে বিশেষজ্ঞ পরামর্শ ও গাইড।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Card key={post.slug} className="border border-border bg-card/80 backdrop-blur-md rounded-2xl p-6 space-y-3 shadow-xs hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="outline" className="text-[10px] font-bold text-emerald-600 border-emerald-500/30">
                  {post.category}
                </Badge>
                <h3 className="font-extrabold text-sm text-foreground leading-snug line-clamp-2">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>
              <Link href={`/blog/${post.slug}`} className="inline-block text-xs font-bold text-emerald-500 hover:underline pt-2">
                সম্পূর্ণ পড়ুন →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 12. EXPANDED STRUCTURED FAQ ─────────────────────────────────────── */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">প্রশ্নোত্তর</span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Frequently Asked Questions</h2>
          <p className="text-sm text-muted-foreground">টাইপবাংলা প্ল্যাটফর্ম ব্যবহারের সাধারণ প্রশ্নোত্তর।</p>
        </div>

        <div className="space-y-3">
          <FaqItem
            question="টাইপবাংলা কি পুরোপুরি বিনামূল্যে?"
            answer="হ্যাঁ! টাইপবাংলার সব কিবোর্ড লেআউট, লেসন ও স্পিড টেস্ট সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়।"
          />
          <FaqItem
            question="কোন কোন কীবোর্ড লেআউট সমর্থিত?"
            answer="অভ্র ফোনেটিক (Avro), ইউনিবিজয় (UniBijoy), বিসিসি জাতীয় (Jatiya), প্রভাত (Probhat), ইনস্ক্রিপ্ট (Inscript) এবং ইংরেজি QWERTY — মোট ৬টি কীবোর্ড লেআউট সমর্থিত।"
          />
          <FaqItem
            question="অনুশীলনের জন্য কি অ্যাকাউন্ট খোলা বাধ্যতামূলক?"
            answer="না! মুক্তভাবে টাইপিং প্র্যাকটিস ও স্পিড টেস্টের জন্য কোনো অ্যাকাউন্টের প্রয়োজন নেই। তবে ফুল কোর্সে এনরোল করা, লেসন প্রোগ্রেস সেভ রাখা এবং ভেরিফাইড সার্টিফিকেট পাওয়ার জন্য একটি ফ্রি লার্নার অ্যাকাউন্ট তৈরি করতে হয়।"
          />
          <FaqItem
            question="আমি কি অনলাইন যাচাইযোগ্য সার্টিফিকেট পাব?"
            answer="হ্যাঁ! টেস্ট সম্পন্ন করার সাথে সাথেই স্কোরের রিয়েল-টাইম প্রিভিউ পাবেন। তবে কিউআর কোড যুক্ত অফিশিয়াল ভেরিফাইড সার্টিফিকেট ও পিডিএফ ডাউনলোডের জন্য সামান্য টপআপ/ভেরিফিকেশন ফি প্রযোজ্য।"
          />
          <FaqItem
            question="এটি কি সরকারি চাকরির টাইপিং পরীক্ষার প্রস্তুতির জন্য উপযোগী?"
            answer="অবশ্যই! আমাদের Exam Simulator মডিউলে সরকারি মন্ত্রণালয় ও ব্যাংক পরীক্ষার টাইপিং সময়সীমা (৩০ WPM বাংলা / ৪০ WPM ইংরেজি) অনুযায়ী টেস্ট দেওয়া যায়।"
          />
        </div>
      </section>

      {/* ── 13. HIGH-CONVERSION FINAL CTA BANNER ─────────────────────────────── */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="border border-border bg-primary text-primary-foreground rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Ready to Type Faster?</h2>
          <p className="text-sm sm:text-base text-primary-foreground/80 max-w-xl mx-auto">
            Start today. No account required. Free forever.
          </p>
          <div className="pt-2">
            <Link href="/courses">
              <Button size="lg" variant="secondary" className="font-black text-base h-14 px-10 rounded-2xl shadow-lg">
                Start Learning Free →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-card/95 backdrop-blur-md border-t border-border z-40 flex items-center justify-between gap-2 shadow-2xl">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-muted-foreground block">টাইপিং স্পিড বাড়ান</span>
          <span className="text-xs font-black text-foreground">১০০% ফ্রী অনুশীলন</span>
        </div>
        <Link href="/courses">
          <Button size="sm" className="font-extrabold text-xs px-4 h-10 rounded-xl">
            Start Learning Free →
          </Button>
        </Link>
      </div>

    </main>
  );
}
