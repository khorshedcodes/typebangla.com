import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Sparkles, Keyboard, BookOpen, CheckCircle2, ArrowRight,
  HelpCircle, Zap, Award, Play, ShieldCheck, ChevronRight
} from "lucide-react";
import LayoutPracticeClient from "../practice/[layout]/LayoutPracticeClient";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export const metadata: Metadata = {
  title: "English Touch Typing & Speed Practice — QWERTY Engine & Drills | TypeBangla",
  description: "Master English touch typing online. Free 20-lesson course, home row drills, top/bottom row practice, numbers, and 70+ WPM speed tests with live analytics.",
  keywords: [
    "english touch typing online",
    "english typing speed test 60 sec",
    "qwerty finger placement guide",
    "10 finger touch typing practice",
    "typing practice english sentences",
    "typebangla english course"
  ],
  alternates: { canonical: "https://typebangla.com/english-touch-typing" },
  openGraph: {
    title: "English Touch Typing & Speed Practice — Free Course & Interactive Drills",
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
          "name": "What is English Touch Typing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Touch typing is typing without looking at the keyboard buttons, relying on muscle memory and proper home row finger placement (ASDF - JKL;)."
          }
        },
        {
          "@type": "Question",
          "name": "How fast can I type with English Touch Typing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With regular 15-minute daily practice on TypeBangla, learners average 50 to 80+ WPM with 98%+ accuracy."
          }
        }
      ]
    }
  ]
};

export default function EnglishTouchTypingLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 fade-in">
      <Script
        id="jsonld-english-course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Hero */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold px-3 py-1">
            QWERTY 10-FINGER TOUCH TYPING ENGINE
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            English Touch Typing &amp; Speed Practice
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            Master 10-finger English QWERTY touch typing with muscle memory, home row drills, live WPM speed telemetry, and interactive virtual keyboard finger guidance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/courses/english">
              <Button className="font-bold text-xs gap-2 h-11 px-6 shadow-md cursor-pointer">
                <Play size={15} />
                <span>Start Full English Course (20 Lessons)</span>
              </Button>
            </Link>
            <Link href="/practice/test">
              <Button variant="outline" className="font-bold text-xs gap-2 h-11 px-6 border-border cursor-pointer">
                <Zap size={15} />
                <span>1-Min English Speed Test</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Interactive Typing Practice Arena */}
        <Card className="border-2 border-primary/40 bg-card shadow-lg rounded-3xl overflow-hidden p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 text-foreground">
              <Zap size={20} className="text-primary" />
              <h2 className="text-base sm:text-lg font-black text-foreground">Live English Speed Test &amp; Touch Typing Arena</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase border-border">
              English QWERTY Engine
            </Badge>
          </div>

          <LayoutPracticeClient layout="english" />
        </Card>

        {/* Home Row & Touch Typing Guide Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-3xl font-black text-foreground">Touch Typing Finger Placement Standard</h2>
            <p className="text-xs text-muted-foreground">Standard 10-Finger QWERTY Home Row Positioning</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {[
              { title: "Left Hand Home Row", eg: "A S D F (Pinky to Index)", icon: Keyboard },
              { title: "Right Hand Home Row", eg: "J K L ; (Index to Pinky)", icon: Sparkles },
              { title: "Thumb Rule", eg: "Both thumbs rest on Spacebar", icon: BookOpen },
              { title: "Target Speed Metric", eg: "60+ WPM with 98%+ Accuracy", icon: Award },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="bg-card border-border p-5 rounded-2xl space-y-2 shadow-xs">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-xl w-fit">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-mono text-[11px] bg-secondary p-2 rounded-lg border border-border">
                    {item.eg}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Virtual Keyboard */}
        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 text-foreground">
              <Keyboard className="text-primary" size={20} />
              <h2 className="text-base font-black text-foreground">English QWERTY Interactive Keymap Visualizer</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono border-border">QWERTY Layout</Badge>
          </div>
          <VirtualKeyboard activeLayout="english" />
        </Card>
      </div>
    </div>
  );
}
