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
  title: "Inscript Bangla Typing Online — India National Standard | TypeBangla",
  description: "Master Inscript Indian National Standard layout for Bangla typing online. 45 structured lessons, keymaps, conjuncts, and live speed WPM diagnostics.",
  keywords: [
    "inscript bangla typing online",
    "inscript keyboard layout west bengal",
    "inscript bangla practice drills",
    "indian national standard bangla keyboard",
    "typebangla inscript course"
  ],
  alternates: { canonical: "https://typebangla.com/inscript-bangla-typing" },
  openGraph: {
    title: "Inscript Bangla Typing Online — India National Standard",
    description: "Practice Inscript Bengali keyboard layout with real-time WPM speed telemetry.",
    url: "https://typebangla.com/inscript-bangla-typing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "Inscript Bangla Typing Course",
      "description": "Official Indian National Standard layout course for Bengali typing in West Bengal and Government of India exams.",
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
          "name": "What is the Inscript Bengali layout?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Inscript (Short for Indian Script) is the official standardized keyboard overlay defined by the Government of India (TDIL) for Indian language script input."
          }
        }
      ]
    }
  ]
};

const FAQS = [
  {
    q: "What is the Inscript layout for Bengali?",
    a: "Inscript is the official National Standard keyboard layout standardized by the Government of India for typing Indian languages, including Bengali in West Bengal & Tripura."
  },
  {
    q: "How many lessons are included in the Inscript course?",
    a: "Our curriculum includes 45 comprehensive lessons covering home row, top row, vowels, consonants, conjuncts, and timed speed sprints."
  }
];

export default function InscriptLandingPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-14 py-10 fade-in">
      <Script
        id="jsonld-inscript-landing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO HEADER */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>INDIA NATIONAL STANDARD 🇮🇳</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Inscript Bangla Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master the official Inscript layout for West Bengal and Government of India exams. Practice keymaps, conjuncts, and speed drills.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/inscript">
            <Button className="font-bold text-xs gap-2 px-7 h-11 shadow-md">
              <span>Enroll Free Course (45 Lessons)</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/practice?layout=inscript">
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
              <span>Inscript Bengali Keymap Reference</span>
            </h2>
            <p className="text-xs text-muted-foreground">Official Government of India (TDIL) Inscript layout mapping.</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase w-fit">
            INSCRIPT 🇮🇳
          </Badge>
        </div>

        <VirtualKeyboard />
      </section>

      {/* 3. 45-LESSON CURRICULUM OUTLINE */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              <span>Inscript Bengali 45-Lesson Curriculum Outline</span>
            </h2>
            <p className="text-xs text-muted-foreground">Complete course covering vowels, consonants, matras, and complex Indian script conjuncts.</p>
          </div>
          <Link href="/courses/inscript">
            <Button className="font-bold text-xs gap-1.5 h-9">
              <span>Full Course Syllabus</span>
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Inscript Vowels (Left Hand Anchor)", desc: "Left hand vowel and sign placement" },
            { num: "02", title: "Inscript Consonants (Right Hand Anchor)", desc: "Right hand consonant positions" },
            { num: "03", title: "Shift Consonants & Aspirated Sounds", desc: "Reaching upper shift consonant keys" },
            { num: "04", title: "Virama ('d') Conjunct Rules", desc: "Forming complex Bengali ligatures using Virama" },
            { num: "05", title: "Official Exam Sentences", desc: "Practicing government recruitment paragraphs" },
            { num: "06", title: "Speed Evaluation & Certification", desc: "Timed test with live diagnostic analytics" },
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
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Inscript Typing</h2>
          <p className="text-xs text-muted-foreground">Answers to common questions about Inscript layout.</p>
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
