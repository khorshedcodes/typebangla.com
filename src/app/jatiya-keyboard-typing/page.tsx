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
  title: "Jatiya BCC Keyboard Bangla Typing — Govt Job Exam Standard | TypeBangla",
  description: "Learn Jatiya (BCC National) keyboard layout online. Official government job typing exam standard in Bangladesh (Computer Operator, Ministry, Bank). Free practice & drills.",
  keywords: [
    "jatiya keyboard typing online",
    "bcc bangla typing test",
    "govt job typing test 30 wpm",
    "computer operator typing exam bd",
    "jatiya layout keymap guide",
    "typebangla jatiya course"
  ],
  alternates: { canonical: "https://typebangla.com/jatiya-keyboard-typing" },
  openGraph: {
    title: "Jatiya BCC Keyboard Typing — Bangladesh Govt Job Standard",
    description: "Prepare for Bangladesh Government Computer Operator exams with official Jatiya layout typing drills.",
    url: "https://typebangla.com/jatiya-keyboard-typing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "Jatiya BCC Government Exam Typing Course",
      "description": "Official Bangladesh Computer Council (BCC) national layout course for government job recruitment exams.",
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
          "name": "What is the Jatiya keyboard layout?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Jatiya (জাতীয়) keyboard is the official national layout standardized by the Bangladesh Computer Council (BCC) for government recruitment exams and ministry work."
          }
        },
        {
          "@type": "Question",
          "name": "What speed is required in Govt Job Typing Exams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Computer Operator and Data Entry Control Operator jobs require at least 30 WPM in Bangla (Jatiya/Bijoy) and 30-40 WPM in English with a minimum 95% accuracy rate."
          }
        }
      ]
    }
  ]
};

const FAQS = [
  {
    q: "What is the Jatiya keyboard layout?",
    a: "Jatiya is the official national Bangla keyboard standard defined by the Bangladesh Computer Council (BCC), mandated for government recruitment examinations."
  },
  {
    q: "What WPM speed is required for Computer Operator Govt Jobs in Bangladesh?",
    a: "Standard requirements are 30 WPM in Bangla and 30–40 WPM in English with at least 95% accuracy during a 5-minute timed test."
  },
  {
    q: "How does Jatiya layout differ from Bijoy 52?",
    a: "Jatiya shares similar key placements with Bijoy but incorporates standardized Unicode character positioning refined by BCC for official government records."
  }
];

export default function JatiyaLandingPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-14 py-10 fade-in">
      <Script
        id="jsonld-jatiya-landing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO HEADER */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>BANGLADESH GOVT EXAM STANDARD (BCC)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Jatiya BCC Keyboard Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Prepare for Bangladesh Govt Job Typing Exams (Computer Operator, Data Entry). Practice official Jatiya layout rules and timed WPM tests.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/jatiya">
            <Button className="font-bold text-xs gap-2 px-7 h-11 shadow-md">
              <span>Enroll Free Course (25 Lessons)</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/practice?layout=jatiya">
            <Button variant="outline" className="font-bold text-xs gap-2 px-6 h-11 border-border">
              <Play size={14} />
              <span>Instant Practice Arena</span>
            </Button>
          </Link>
          <Link href="/exam/govt">
            <Button variant="secondary" className="font-bold text-xs gap-2 px-5 h-11">
              <span>Govt Exam Simulator</span>
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
              <span>Jatiya (BCC National) Keymap Reference</span>
            </h2>
            <p className="text-xs text-muted-foreground font-mono">BCC Standard Unicode mappings for government exams.</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase w-fit">
            JATIYA (BCC)
          </Badge>
        </div>

        <VirtualKeyboard />
      </section>

      {/* 3. 25-LESSON CURRICULUM OUTLINE */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              <span>Jatiya BCC Govt Job Course Syllabus</span>
            </h2>
            <p className="text-xs text-muted-foreground">Structured preparation path targeting 30+ WPM Bangla speed for Govt Computer Operator recruitment.</p>
          </div>
          <Link href="/courses/jatiya">
            <Button className="font-bold text-xs gap-1.5 h-9">
              <span>Full Course Syllabus</span>
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Govt Exam Basics & Finger Anchors", desc: "Official BCC home row finger placements" },
            { num: "02", title: "Consonants & Hasanta Rule ('g')", desc: "Forming official Unicode Bangla characters" },
            { num: "03", title: "Vowels & Sign Kar Positioning", desc: "Vowel sign extensions and number row" },
            { num: "04", title: "Government Exam Conjuncts (যুক্তাক্ষর)", desc: "Essential conjuncts used in Govt Ministry notices" },
            { num: "05", title: "Official Paragraph Drills", desc: "Typing actual Bangladesh Govt recruitment paragraphs" },
            { num: "06", title: "5-Minute Timed Govt Exam Test", desc: "Simulated exam with 5-char error deduction rule" },
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
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Jatiya Typing</h2>
          <p className="text-xs text-muted-foreground">Answers to common questions about Jatiya BCC layout and Govt Job Exams.</p>
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
