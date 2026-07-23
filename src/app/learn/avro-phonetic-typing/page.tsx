import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Sparkles, Keyboard, BookOpen, CheckCircle2, ArrowRight,
  HelpCircle, Zap, Award, Play, ChevronDown
} from "lucide-react";
import LayoutPracticeClient from "@/app/practice/[layout]/LayoutPracticeClient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Learn Avro Phonetic Bangla Typing Online — Free Interactive Practice & Drills | TypeBangla",
  description: "Master Avro Phonetic Bangla typing online. Practice vowels, consonants, conjuncts (যুক্তাক্ষর), and speed drills with instant WPM telemetry and virtual keyboard guide.",
  keywords: [
    "learn avro phonetic typing online",
    "avro bangla typing practice",
    "avro phonetic rules bangla",
    "how to type bangla with english keyboard",
    "avro typing speed test",
    "typebangla avro course"
  ],
  alternates: { canonical: "https://typebangla.com/learn/avro-phonetic-typing" },
  openGraph: {
    title: "Learn Avro Phonetic Bangla Typing Online — Free Course & Drills",
    description: "Interactive Avro Phonetic Bangla typing practice with live WPM speed telemetry and virtual keyboard hints.",
    url: "https://typebangla.com/learn/avro-phonetic-typing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "Avro Phonetic Bangla Typing Course",
      "description": "Comprehensive online course to master Avro phonetic transliteration typing in Bangla using standard QWERTY keyboards.",
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
          "name": "How does Avro Phonetic Bangla typing work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avro Phonetic lets you type Bangla using English letters based on pronunciation. For example, typing 'ami' produces 'আমি', and typing 'bangla' produces 'বাংলা'."
          }
        },
        {
          "@type": "Question",
          "name": "How to type conjuncts (যুক্তাক্ষর) in Avro Phonetic?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Avro, type the consonant letters together. For example, type 'k+k' for 'ক্ক', 'k+t' for 'ক্ত', or 'k+sh' for 'ক্ষ'."
          }
        }
      ]
    }
  ]
};

const FAQS = [
  {
    q: "How does Avro Phonetic Bangla typing work?",
    a: "Avro Phonetic translates English phonetics directly into Bangla characters. You type English letters that sound like the Bangla words (e.g. 'shonar' -> 'সোনার')."
  },
  {
    q: "How do I type Bangla conjuncts (যুক্তাক্ষর) in Avro?",
    a: "Type consonant combinations without spaces. For instance, 'kkt' -> 'ক্ত', 'bondo' -> 'বন্ধ', and 'khoma' -> 'ক্ষমা'."
  },
  {
    q: "Is Avro Phonetic good for beginners?",
    a: "Yes! Avro Phonetic is the easiest layout for beginners because you don't need to memorize a new keyboard map—you just use standard English key positions."
  }
];

export default function LearnAvroPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-12 py-10 fade-in">
      <Script
        id="jsonld-learn-avro"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>PHONETIC TRANSLITERATION STANDARD</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Learn Avro Phonetic Bangla Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master the most popular Bangla typing layout. Type in English phonetics and convert automatically to fluent Bangla with live WPM diagnostics.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/avro">
            <Button className="font-bold text-xs gap-1.5 px-6 h-10">
              <span>Full Avro Course (25 Lessons)</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
          <Link href="/practice/test">
            <Button variant="outline" className="font-bold text-xs gap-1.5 px-5 h-10 border-border">
              <Play size={14} />
              <span>1-Min Speed Test</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Embedded Live Interactive Practice Sandbox */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 mb-4 text-center sm:text-left">
          <h2 className="text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
            <Keyboard size={18} className="text-primary" />
            <span>Interactive Avro Typing Arena</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Type the Bangla prompt below using Avro Phonetic rules. Watch your real-time WPM and accuracy metrics update.
          </p>
        </div>
        <LayoutPracticeClient layout="avro" />
      </section>

      {/* Avro Keymap & Phonetic Rules Guide */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="text-xl font-bold text-foreground">Avro Phonetic Quick Reference Guide</h2>
          <p className="text-xs text-muted-foreground">Common English-to-Bangla key mappings for vowels, consonants, and signs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
              <span>Vowels (স্বরবর্ণ)</span>
            </h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>a = অ</span><span>o / a = আ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>i = ই</span><span>I / ee = ঈ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>u = উ</span><span>U / oo = ঊ</span></div>
              <div className="flex justify-between py-1"><span>e = এ</span><span>oi = ঐ</span></div>
            </div>
          </Card>

          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
              <span>Consonants (ব্যঞ্জনবর্ণ)</span>
            </h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>k = ক</span><span>kh = খ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>g = গ</span><span>gh = ঘ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>ch = চ</span><span>j = জ</span></div>
              <div className="flex justify-between py-1"><span>t = ত</span><span>th = থ</span></div>
            </div>
          </Card>

          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm flex items-center gap-1.5">
              <span>Conjuncts (যুক্তাক্ষর)</span>
            </h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>kk = ক্ক</span><span>kt = ক্ত</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>ksh = ক্ষ</span><span>ggya = জ্ঞ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>nd = ন্দ</span><span>nt = ন্ত</span></div>
              <div className="flex justify-between py-1"><span>shch = শ্চ</span><span>tr = ত্র</span></div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Avro Typing</h2>
          <p className="text-xs text-muted-foreground">Answers to top questions about learning Avro Phonetic Bangla typing.</p>
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
