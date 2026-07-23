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
  title: "Learn Probhat Layout Bangla Typing Online — Intuitive Map Drills | TypeBangla",
  description: "Learn Probhat keyboard layout online. Practice fixed intuitive sound-aligned key positions, consonants, vowels, and speed drills with live WPM telemetry.",
  keywords: [
    "learn probhat layout bangla typing",
    "probhat keyboard layout practice",
    "probhat font typing online",
    "intuitive bangla keyboard map",
    "typebangla probhat course"
  ],
  alternates: { canonical: "https://typebangla.com/learn/probhat-layout-typing" },
  openGraph: {
    title: "Learn Probhat Layout Bangla Typing Online — Free Course & Drills",
    description: "Master the Probhat intuitive fixed layout with live WPM speed diagnostics.",
    url: "https://typebangla.com/learn/probhat-layout-typing",
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

export default function LearnProbhatPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-12 py-10 fade-in">
      <Script
        id="jsonld-learn-probhat"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>INTUITIVE FIXED MAP STANDARD</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Learn Probhat Layout Bangla Typing
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master the open-source intuitive fixed layout. Learn key positions where English letter sounds align directly to Bangla keys.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/probhat">
            <Button className="font-bold text-xs gap-1.5 px-6 h-10">
              <span>Full Probhat Course (20 Lessons)</span>
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
            <span>Interactive Probhat Typing Arena</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Practice Probhat drills with virtual keyboard visual cues.
          </p>
        </div>
        <LayoutPracticeClient layout="probhat" />
      </section>

      {/* FAQ Section */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Probhat Layout</h2>
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
