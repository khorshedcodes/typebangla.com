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
  title: "Probhat Layout Bangla Typing Online — Intuitive Map Drills | TypeBangla",
  description: "Learn Probhat keyboard layout online. Practice fixed intuitive sound-aligned key positions, consonants, vowels, and speed drills with live WPM telemetry.",
  keywords: [
    "probhat layout bangla typing",
    "probhat keyboard layout practice",
    "probhat font typing online",
    "intuitive bangla keyboard map",
    "typebangla probhat course"
  ],
  alternates: { canonical: "https://typebangla.com/probhat-layout-typing" },
  openGraph: {
    title: "Probhat Layout Bangla Typing Online — Free Course & Interactive Drills",
    description: "Master the Probhat intuitive fixed layout with live WPM speed diagnostics.",
    url: "https://typebangla.com/probhat-layout-typing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "Probhat Layout Bangla Typing Course",
      "description": "Learn the intuitive fixed Probhat keyboard layout designed for Linux and open-source Bangla computing.",
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
          "name": "What is Probhat keyboard layout?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Probhat is an intuitive fixed layout that maps similar-sounding English keys directly to Bangla letters (e.g. 'k' maps to 'ক', 'r' maps to 'র')."
          }
        }
      ]
    }
  ]
};

const FAQS = [
  {
    q: "What makes Probhat layout easy to learn?",
    a: "Probhat aligns English keys directly with phonetically matching Bangla characters, making key positions intuitive without complex transliteration rules."
  },
  {
    q: "Is Probhat widely supported in Linux / Ubuntu?",
    a: "Yes, Probhat has been standard in Linux and Unix-like operating systems for over two decades for native Unicode Bangla typing."
  }
];

export default function ProbhatLandingPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-14 py-10 fade-in">
      <Script
        id="jsonld-probhat-landing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO HEADER */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>INTUITIVE FIXED MAP STANDARD</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Probhat Layout Bangla Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master the open-source intuitive fixed layout. Learn key positions where English letter sounds align directly to Bangla keys.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/probhat">
            <Button className="font-bold text-xs gap-2 px-7 h-11 shadow-md">
              <span>Enroll Free Course (20 Lessons)</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/practice?layout=probhat">
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
              <span>Probhat Layout Keymap Reference</span>
            </h2>
            <p className="text-xs text-muted-foreground">Fixed sound-aligned key placement table for Probhat layout.</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase w-fit">
            PROBHAT
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
              <span>Probhat 20-Lesson Curriculum Outline</span>
            </h2>
            <p className="text-xs text-muted-foreground">Structured lessons for mastering Probhat layout finger positions.</p>
          </div>
          <Link href="/courses/probhat">
            <Button className="font-bold text-xs gap-1.5 h-9">
              <span>Full Course Syllabus</span>
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Sound-Aligned Home Row Keys", desc: "Intuitive key placement anchors" },
            { num: "02", title: "Probhat Vowels & Signs", desc: "Mapping vowels and sign modifiers" },
            { num: "03", title: "Top & Bottom Row Consonants", desc: "Reaching upper and lower row keys" },
            { num: "04", title: "Hasanta (/) & Conjuncts", desc: "Forming combined letters in Probhat" },
            { num: "05", title: "Sentence Drills & Paragraph Flow", desc: "Building fluid typing momentum" },
            { num: "06", title: "Probhat Speed Evaluation", desc: "Timed test with live WPM telemetry" },
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
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Probhat Typing</h2>
          <p className="text-xs text-muted-foreground">Answers to common questions about Probhat layout.</p>
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
