import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Globe, Sparkles, BookOpen, CheckCircle2, ArrowRight,
  ShieldCheck, Trophy, Keyboard, Award, HelpCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "English QWERTY Touch Typing Course & Speed Lessons | TypeBangla",
  description: "Master English QWERTY touch typing with speed drills, home row finger placement guide, 70+ WPM speed target, and real-time accuracy telemetry.",
  alternates: { canonical: "https://typebangla.com/learn/languages/english" },
  openGraph: {
    title: "English Touch Typing Master Class | TypeBangla",
    description: "Learn touch typing on standard QWERTY keyboard with interactive lessons and WPM speed drills.",
    url: "https://typebangla.com/learn/languages/english",
    type: "website",
  },
};

const JSON_LD_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "English QWERTY Full Touch Typing Course",
      "description": "Comprehensive touch-typing course covering home row finger placement, top row, bottom row, numbers, and speed building drills for 70+ WPM.",
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
          "name": "How long does it take to learn touch typing in English?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With 15–20 minutes of daily practice on TypeBangla, most learners achieve 40+ WPM touch typing speed within 2 to 3 weeks."
          }
        },
        {
          "@type": "Question",
          "name": "What is the recommended WPM speed for professional work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard professional typing speed ranges from 40 to 60 WPM, while advanced data entry and software engineering benefit from 70+ WPM."
          }
        }
      ]
    }
  ]
};

export default function EnglishLanguageHubPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 fade-in text-foreground">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
        <span>/</span>
        <span className="text-foreground font-bold">English Touch Typing</span>
      </div>

      {/* Hero Section */}
      <section className="border border-border bg-card rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xs max-w-4xl mx-auto bg-grid-pattern">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold text-primary">
          <Globe size={15} />
          <span>ENGLISH QWERTY TOUCH TYPING</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          English Touch Typing Master Course
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master touch typing on standard QWERTY keyboards with proper finger placement, top row, bottom row, numbers, and 70+ WPM speed target drills.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-foreground pt-2">
          <span className="flex items-center gap-1.5 bg-secondary border border-border px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} className="text-emerald-500" /> Home Row &amp; Finger Placement Guide
          </span>
          <span className="flex items-center gap-1.5 bg-secondary border border-border px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} className="text-emerald-500" /> 20+ Interactive Progressive Lessons
          </span>
          <span className="flex items-center gap-1.5 bg-secondary border border-border px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} className="text-emerald-500" /> Real-time WPM &amp; Accuracy Telemetry
          </span>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/courses/english">
            <Button size="lg" className="font-black text-sm h-12 px-8 rounded-xl shadow-xs gap-2 cursor-pointer">
              <span>Start English Course →</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/english-touch-typing">
            <Button variant="outline" size="lg" className="font-bold text-sm h-12 px-8 rounded-xl border-border cursor-pointer">
              <span>Live Speed Arena</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border bg-card rounded-2xl shadow-xs p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
            ⌨️
          </div>
          <h3 className="font-black text-base text-foreground">Home Row Mastery</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Position your fingers on ASDF and JKL; keys. Build automatic muscle memory for fast, error-free touch typing.
          </p>
        </Card>

        <Card className="border border-border bg-card rounded-2xl shadow-xs p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
            ⚡
          </div>
          <h3 className="font-black text-base text-foreground">Speed Drills &amp; Sprinters</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Target 40 WPM to 70+ WPM with high-frequency vocabulary, sentence drills, and paragraph sprint tests.
          </p>
        </Card>

        <Card className="border border-border bg-card rounded-2xl shadow-xs p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
            🏆
          </div>
          <h3 className="font-black text-base text-foreground">Verified Course Certificate</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Complete all 20 lessons to unlock your official downloadable typing certificate with QR verification code.
          </p>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="border border-border bg-card rounded-3xl p-8 shadow-xs space-y-6">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
          <HelpCircle size={20} className="text-primary" />
          <span>Frequently Asked Questions (FAQ)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2 p-5 rounded-2xl bg-secondary/50 border border-border">
            <h3 className="font-bold text-sm text-foreground">How long does it take to reach 50+ WPM?</h3>
            <p className="text-muted-foreground leading-relaxed">
              With 15–20 minutes of daily practice on TypeBangla, most learners reach 50+ WPM in 2 to 3 weeks.
            </p>
          </div>
          <div className="space-y-2 p-5 rounded-2xl bg-secondary/50 border border-border">
            <h3 className="font-bold text-sm text-foreground">Is the course suitable for complete beginners?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Yes! The course begins with step-by-step home row key placement and unlocks lessons sequentially.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
