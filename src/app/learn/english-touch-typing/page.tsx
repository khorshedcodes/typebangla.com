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
  title: "Learn English Touch Typing Online — QWERTY Speed Drills & Tests | TypeBangla",
  description: "Master English touch typing online. Free 20-lesson course, home row drills, top/bottom row practice, numbers, and 70+ WPM speed tests with live analytics.",
  keywords: [
    "learn english touch typing online",
    "english typing speed test 60 sec",
    "qwerty finger placement guide",
    "typing practice english sentences",
    "typebangla english course"
  ],
  alternates: { canonical: "https://typebangla.com/learn/english-touch-typing" },
  openGraph: {
    title: "Learn English Touch Typing Online — Free Course & Drills",
    description: "Master QWERTY English touch typing with live WPM telemetry and accuracy tracking.",
    url: "https://typebangla.com/learn/english-touch-typing",
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

export default function LearnEnglishPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-12 py-10 fade-in">
      <Script
        id="jsonld-learn-english"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>GLOBAL QWERTY STANDARD 🇺🇸</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Learn English Touch Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master 10-finger touch typing without looking at the keys. Build muscle memory from Home Row to 70+ WPM speed.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/english">
            <Button className="font-bold text-xs gap-1.5 px-6 h-10">
              <span>Full English Course (20 Lessons)</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
          <Link href="/practice/sentences?lang=en">
            <Button variant="outline" className="font-bold text-xs gap-1.5 px-5 h-10 border-border">
              <span>English Sentences Drills</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Embedded Live Interactive Practice Sandbox */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 mb-4 text-center sm:text-left">
          <h2 className="text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
            <Keyboard size={18} className="text-primary" />
            <span>Interactive English Typing Arena</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Type English practice passages with real-time speed and error telemetry.
          </p>
        </div>
        <LayoutPracticeClient layout="english" />
      </section>

      {/* FAQ Section */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — English Touch Typing</h2>
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
