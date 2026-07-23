import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Sparkles, Keyboard, BookOpen, CheckCircle2, ArrowRight,
  HelpCircle, Zap, Play
} from "lucide-react";
import LayoutPracticeClient from "@/app/practice/[layout]/LayoutPracticeClient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Learn Inscript Bangla Typing Online — India National Standard | TypeBangla",
  description: "Master Inscript Indian National Standard layout for Bangla typing online. 45 structured lessons, keymaps, conjuncts, and live speed WPM diagnostics.",
  keywords: [
    "learn inscript bangla typing online",
    "inscript keyboard layout west bengal",
    "inscript bangla practice drills",
    "indian national standard bangla keyboard",
    "typebangla inscript course"
  ],
  alternates: { canonical: "https://typebangla.com/learn/inscript-bangla-typing" },
  openGraph: {
    title: "Learn Inscript Bangla Typing Online — India National Standard",
    description: "Practice Inscript Bengali keyboard layout with real-time WPM speed telemetry.",
    url: "https://typebangla.com/learn/inscript-bangla-typing",
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

export default function LearnInscriptPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-12 py-10 fade-in">
      <Script
        id="jsonld-learn-inscript"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>INDIA NATIONAL STANDARD 🇮🇳</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Learn Inscript Bangla Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master the official Inscript layout for West Bengal and Government of India exams. Practice keymaps, conjuncts, and speed drills.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/inscript">
            <Button className="font-bold text-xs gap-1.5 px-6 h-10">
              <span>Full Inscript Course (45 Lessons)</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Embedded Live Interactive Practice Sandbox */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 mb-4 text-center sm:text-left">
          <h2 className="text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
            <Keyboard size={18} className="text-primary" />
            <span>Interactive Inscript Typing Arena</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Type Inscript passages with real-time feedback and virtual keyboard prompts.
          </p>
        </div>
        <LayoutPracticeClient layout="inscript" />
      </section>

      {/* FAQ Section */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Inscript Layout</h2>
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
