import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Sparkles, Keyboard, BookOpen, CheckCircle2, ArrowRight,
  HelpCircle, Zap, Award, Play, ShieldCheck
} from "lucide-react";
import LayoutPracticeClient from "@/app/practice/[layout]/LayoutPracticeClient";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Avro Phonetic Bangla Typing Online — Free Interactive Keymap & Drills | TypeBangla",
  description: "Master Avro Phonetic Bangla typing online. Practice vowels, consonants, conjuncts (যুক্তাক্ষর), and speed drills with instant WPM telemetry and virtual keyboard guide.",
  keywords: [
    "avro phonetic typing online",
    "learn avro bangla typing",
    "avro phonetic rules bangla",
    "how to type bangla with english keyboard",
    "avro typing speed test",
    "typebangla avro course"
  ],
  alternates: { canonical: "https://typebangla.com/avro-phonetic-typing" },
  openGraph: {
    title: "Avro Phonetic Bangla Typing Online — Free Course & Interactive Drills",
    description: "Interactive Avro Phonetic Bangla typing practice with live WPM speed telemetry and virtual keyboard hints.",
    url: "https://typebangla.com/avro-phonetic-typing",
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
            "text": "In Avro, type consonant letters together without spaces. For example, type 'kk' for 'ক্ক', 'kt' for 'ক্ত', or 'kSh' for 'ক্ষ'."
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

export default function AvroPhoneticLandingPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-14 py-10 fade-in">
      <Script
        id="jsonld-avro-landing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO HEADER SECTION */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>PHONETIC TRANSLITERATION STANDARD</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Avro Phonetic Bangla Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master Bangladesh&apos;s most popular phonetic layout. Type Bangla effortlessly using standard English QWERTY keyboard sounds.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/avro">
            <Button className="font-bold text-xs gap-2 px-7 h-11 shadow-md">
              <span>Enroll Free Course (25 Lessons)</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/practice/avro">
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
              <span>Avro Phonetic Keymap Reference</span>
            </h2>
            <p className="text-xs text-muted-foreground">Standard English letter to Bangla character transliteration mapping.</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase w-fit">
            AVRO PHONETIC
          </Badge>
        </div>

        <VirtualKeyboard />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm">Vowels &amp; Signs</h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>a = আ / া</span><span>i = ই / ি</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>ee = ঈ / ী</span><span>u = উ / ু</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>oo = ঊ / ূ</span><span>e = এ / ে</span></div>
              <div className="flex justify-between py-1"><span>OI = ঐ / ৈ</span><span>OU = ঔ / ৌ</span></div>
            </div>
          </Card>

          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm">Consonants</h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>k = ক</span><span>kh = খ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>g = গ</span><span>gh = ঘ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>c = চ</span><span>ch = ছ</span></div>
              <div className="flex justify-between py-1"><span>t = ত</span><span>th = থ</span></div>
            </div>
          </Card>

          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm">Conjuncts (যুক্তাক্ষর)</h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>kk = ক্ক</span><span>kt = ক্ত</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>kSh = ক্ষ</span><span>gg = জ্ঞ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>nd = ন্দ</span><span>nt = ন্ত</span></div>
              <div className="flex justify-between py-1"><span>shch = শ্চ</span><span>tr = ত্র</span></div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. 25-LESSON CURRICULUM SYLLABUS OUTLINE */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              <span>Avro Phonetic 25-Lesson Curriculum Outline</span>
            </h2>
            <p className="text-xs text-muted-foreground">Structured learning path from basic vowels to 60+ WPM typing speed.</p>
          </div>
          <Link href="/courses/avro">
            <Button className="font-bold text-xs gap-1.5 h-9">
              <span>Full Course Syllabus</span>
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Phonetic Vowels (a, i, u, e, o)", desc: "Basic Bangla vowel transliteration rules" },
            { num: "02", title: "Consonants Part 1 (k, g, c, j)", desc: "Primary consonant key mapping" },
            { num: "03", title: "Consonant Digraphs (kh, gh, ch, th)", desc: "Mastering 2-letter consonant sounds" },
            { num: "04", title: "Phonetic Conjuncts (kk, kt, nd)", desc: "Typing combined Bangla letters smoothly" },
            { num: "05", title: "Sentence Flow & Spacebar Rhythm", desc: "Building full sentence typing speed" },
            { num: "06", title: "Speed Sprint & WPM Certification", desc: "Timed speed test with diagnostic analytics" },
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

      {/* 4. SEO FAQS & RICH SNIPPET METADATA */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Avro Phonetic</h2>
          <p className="text-xs text-muted-foreground">Answers to common questions about Avro Phonetic typing.</p>
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
