import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Sparkles, Keyboard, BookOpen, CheckCircle2, ArrowRight,
  HelpCircle, Zap, Award, Play
} from "lucide-react";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "English Touch Typing Online — QWERTY Speed Drills & Course | TypeBangla",
  description: "Master English touch typing online. Free 20-lesson course, home row drills, top/bottom row practice, numbers, and 70+ WPM speed tests with live analytics.",
  keywords: [
    "english touch typing online",
    "english typing speed test 60 sec",
    "qwerty finger placement guide",
    "typing practice english sentences",
    "typebangla english course"
  ],
  alternates: { canonical: "https://typebangla.com/english-touch-typing" },
  openGraph: {
    title: "English Touch Typing Online — Free Course & Interactive Drills",
    description: "Master QWERTY English touch typing with live WPM telemetry and accuracy tracking.",
    url: "https://typebangla.com/english-touch-typing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "English Touch Typing QWERTY Course",
      "description": "Complete touch typing course to master 10-finger typing on English QWERTY keyboards.",
      "provider": {
        "@type": "Organization",
        "name": "TypeBangla",
        "sameAs": "https://typebangla.com"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is touch typing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Touch typing is typing without looking at the keyboard buttons, relying on muscle memory and proper home row finger placement."
          }
        }
      ]
    }
  ]
};

const FAQS = [
  {
    q: "What is the Home Row in English typing?",
    a: "The Home Row is ASDF for the left hand and JKL; for the right hand. Your index fingers rest on F and J (which have tactile bumps)."
  },
  {
    q: "How fast can I learn touch typing?",
    a: "With 15–20 minutes of daily practice on TypeBangla, most learners achieve 40–60 WPM touch typing within 2–3 weeks."
  }
];

export default function EnglishLandingPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-14 py-10 fade-in">
      <Script
        id="jsonld-english-landing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO HEADER */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>GLOBAL QWERTY STANDARD 🇺🇸</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          English Touch Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master 10-finger touch typing without looking at the keys. Build muscle memory from Home Row to 70+ WPM speed.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/english">
            <Button className="font-bold text-xs gap-2 px-7 h-11 shadow-md">
              <span>Enroll Free Course (20 Lessons)</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/practice?layout=english">
            <Button variant="outline" className="font-bold text-xs gap-2 px-6 h-11 border-border">
              <Play size={14} />
              <span>Instant Practice Arena</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. INTERACTIVE KEYBOARD MAP CHEATSHEET */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Keyboard size={18} className="text-primary" />
              <span>English QWERTY Keymap Reference</span>
            </h2>
            <p className="text-xs text-muted-foreground">Standard 10-finger placement guide for QWERTY keyboards.</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase w-fit">
            ENGLISH QWERTY
          </Badge>
        </div>

        <VirtualKeyboard />
      </section>

      {/* 3. 20-LESSON CURRICULUM OUTLINE */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              <span>English Touch Typing Course Syllabus</span>
            </h2>
            <p className="text-xs text-muted-foreground">Comprehensive QWERTY touch typing course from home row to 70+ WPM speed.</p>
          </div>
          <Link href="/courses/english">
            <Button className="font-bold text-xs gap-1.5 h-9">
              <span>Full Course Syllabus</span>
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Home Row Anchors (ASDF JKL;)", desc: "10-finger placement & tactile F/J bump recognition" },
            { num: "02", title: "Top Row Extensions (QWERTY)", desc: "Reaching upper row keys with correct fingers" },
            { num: "03", title: "Bottom Row Extensions (ZXCVBNM)", desc: "Reaching lower row keys without breaking anchor" },
            { num: "04", title: "Capital Letters & Shift Timing", desc: "Left & Right shift coordination" },
            { num: "05", title: "Number Row & Symbol Drills", desc: "Top number row and common punctuation" },
            { num: "06", title: "Speed Sprint & 70+ WPM Test", desc: "Timed test with live analytics" },
          ].map((item) => (
            <Card key={item.num} className="border border-border bg-card p-4 space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-primary/40 text-primary text-[10px] font-black">
                  Lesson {item.num}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-semibold">Free Access</span>
              </div>
              <h3 className="font-bold text-xs text-foreground">{item.title}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. SEO FAQS */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — English Touch Typing</h2>
          <p className="text-xs text-muted-foreground">Answers to common questions about QWERTY touch typing.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <Card key={i} className="border border-border bg-card p-5 space-y-1.5">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <HelpCircle size={15} className="text-primary shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pl-6">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
