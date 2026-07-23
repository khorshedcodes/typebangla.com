import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Sparkles, Keyboard, BookOpen, CheckCircle2, ArrowRight,
  HelpCircle, Zap, Award, Play
} from "lucide-react";
import LayoutPracticeClient from "@/app/practice/[layout]/LayoutPracticeClient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Learn Jatiya BCC Keyboard Bangla Typing — Govt Job Exam Standard | TypeBangla",
  description: "Learn Jatiya (BCC National) keyboard layout online. Official government job typing exam standard in Bangladesh (Computer Operator, Ministry, Bank). Free practice & drills.",
  keywords: [
    "learn jatiya keyboard typing online",
    "bcc bangla typing test",
    "govt job typing test 30 wpm",
    "computer operator typing exam bd",
    "jatiya layout keymap guide",
    "typebangla jatiya course"
  ],
  alternates: { canonical: "https://typebangla.com/learn/jatiya-keyboard-typing" },
  openGraph: {
    title: "Learn Jatiya BCC Keyboard Typing — Bangladesh Govt Job Standard",
    description: "Prepare for Bangladesh Government Computer Operator exams with official Jatiya layout typing drills.",
    url: "https://typebangla.com/learn/jatiya-keyboard-typing",
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

export default function LearnJatiyaPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-12 py-10 fade-in">
      <Script
        id="jsonld-learn-jatiya"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>BANGLADESH GOVT EXAM STANDARD (BCC)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Learn Jatiya BCC Keyboard Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Prepare for Ministry, Bank, and Computer Operator recruitment exams. Master official BCC Jatiya key positions and reach 30+ WPM.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/exam/govt">
            <Button className="font-bold text-xs gap-1.5 px-6 h-10">
              <span>Govt Exam Simulator (5-Min Test)</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
          <Link href="/courses/jatiya">
            <Button variant="outline" className="font-bold text-xs gap-1.5 px-5 h-10 border-border">
              <span>Full Jatiya Course (25 Lessons)</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Embedded Live Interactive Practice Sandbox */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 mb-4 text-center sm:text-left">
          <h2 className="text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
            <Keyboard size={18} className="text-primary" />
            <span>Interactive Jatiya Typing Arena</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Practice typing official BCC passage material using the Jatiya layout.
          </p>
        </div>
        <LayoutPracticeClient layout="jatiya" />
      </section>

      {/* Jatiya Govt Exam Requirements Card */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="text-xl font-bold text-foreground">BCC Govt Exam Speed Benchmarks</h2>
          <p className="text-xs text-muted-foreground">Official speed and accuracy criteria for Bangladesh Public Service recruitment.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <Card className="border border-border bg-card p-5 space-y-2 text-center">
            <Badge variant="outline" className="mx-auto text-[10px]">Bangla Speed Target</Badge>
            <div className="text-3xl font-black text-foreground">30 WPM</div>
            <p className="text-xs text-muted-foreground">Minimum speed in 5-minute continuous typing test.</p>
          </Card>

          <Card className="border border-border bg-card p-5 space-y-2 text-center">
            <Badge variant="outline" className="mx-auto text-[10px]">English Speed Target</Badge>
            <div className="text-3xl font-black text-foreground">40 WPM</div>
            <p className="text-xs text-muted-foreground">Standard English requirement for Computer Operator posts.</p>
          </Card>

          <Card className="border border-border bg-card p-5 space-y-2 text-center">
            <Badge variant="outline" className="mx-auto text-[10px]">Accuracy Benchmark</Badge>
            <div className="text-3xl font-black text-foreground">95%+</div>
            <p className="text-xs text-muted-foreground">Maximum allowed error rate of 5% on official evaluation.</p>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Jatiya Layout</h2>
          <p className="text-xs text-muted-foreground">Common questions about government recruitment typing tests.</p>
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
