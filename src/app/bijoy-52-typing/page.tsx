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
  title: "Bijoy 52 & UniBijoy Bangla Typing Online — Free Keymap & Course | TypeBangla",
  description: "Master Bijoy 52 and UniBijoy Bangla typing online. Learn fixed keymaps, SutonnyMJ to Unicode rules, conjuncts (যুক্তাক্ষর), and speed drills with instant WPM diagnostics.",
  keywords: [
    "bijoy 52 typing online",
    "unibijoy bangla typing practice",
    "sutonnymj keymap guide",
    "bijoy 52 keyboard layout bangla",
    "bijoy typing speed test",
    "typebangla bijoy course"
  ],
  alternates: { canonical: "https://typebangla.com/bijoy-52-typing" },
  openGraph: {
    title: "Bijoy 52 & UniBijoy Bangla Typing Online — Free Course & Interactive Drills",
    description: "Interactive Bijoy 52 and UniBijoy Bangla typing practice with live WPM speed telemetry and virtual keyboard hints.",
    url: "https://typebangla.com/bijoy-52-typing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "Bijoy 52 & UniBijoy Bangla Typing Course",
      "description": "Master traditional Bijoy layout typing using web-standard UniBijoy character mappings.",
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
          "name": "What is the difference between Bijoy 52 and UniBijoy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bijoy 52 relies on legacy ANSI fonts like SutonnyMJ. UniBijoy uses the exact same keymap layout as Bijoy 52 but outputs modern Unicode text readable on all web browsers, smartphones, and social media."
          }
        },
        {
          "@type": "Question",
          "name": "How to type conjuncts (যুক্তাক্ষর) in Bijoy / UniBijoy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Bijoy layout, type First Consonant + 'g' (Hasant) + Second Consonant. For example, to type 'ক্ষ', press 'k' + 'g' + 'Shift+N'."
          }
        }
      ]
    }
  ]
};

const FAQS = [
  {
    q: "What is the difference between Bijoy 52 and UniBijoy?",
    a: "Bijoy 52 outputs legacy SutonnyMJ ANSI text, while UniBijoy uses the exact same key map to output web-compatible Unicode text."
  },
  {
    q: "How do I type conjuncts (যুক্তাক্ষর) in Bijoy 52 / UniBijoy?",
    a: "Press the first consonant key, then press 'g' (Link / Hasant), followed by the second consonant key. E.g., 'k' + 'g' + 'k' = 'ক্ক'."
  },
  {
    q: "Why is Bijoy 52 required for publishing and printing?",
    a: "Most printing presses, newspapers, and official graphic design software in Bangladesh historically standardized on Bijoy 52 / SutonnyMJ."
  }
];

export default function BijoyLandingPage() {
  return (
    <main className="w-full bg-background text-foreground space-y-14 py-10 fade-in">
      <Script
        id="jsonld-bijoy-landing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO HEADER */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary" />
          <span>PUBLISHING &amp; PRINTING STANDARD</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Bijoy 52 &amp; UniBijoy Typing Online
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Master Bangladesh&apos;s traditional publishing layout. Learn key positions, Link-g conjuncts, and boost your printing WPM speed.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/courses/unibijoy">
            <Button className="font-bold text-xs gap-2 px-7 h-11 shadow-md">
              <span>Enroll Free Course (25 Lessons)</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/practice?layout=unibijoy">
            <Button variant="outline" className="font-bold text-xs gap-2 px-6 h-11 border-border">
              <Play size={14} />
              <span>Instant Practice Arena</span>
            </Button>
          </Link>
          <Link href="/unicode-to-bijoy-converter">
            <Button variant="secondary" className="font-bold text-xs gap-2 px-5 h-11">
              <span>Bijoy ↔ Unicode Converter</span>
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
              <span>Bijoy 52 / UniBijoy Keymap Reference</span>
            </h2>
            <p className="text-xs text-muted-foreground">Essential key positions and Hasant (&apos;g&apos;) conjunct formation rule.</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase w-fit">
            UNI_BIJOY
          </Badge>
        </div>

        <VirtualKeyboard />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm">Vowels &amp; Signs</h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>Shift+F = অ</span><span>f = আকার (া)</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>d = ইকার (ি)</span><span>Shift+D = ঈকার (ী)</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>s = উকার (ু)</span><span>Shift+S = ঊকার (ূ)</span></div>
              <div className="flex justify-between py-1"><span>c = একার (ে)</span><span>Shift+C = ঐকার (ৈ)</span></div>
            </div>
          </Card>

          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm">Consonants</h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>j = ক</span><span>Shift+J = খ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>o = গ</span><span>Shift+O = ঘ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>y = চ</span><span>Shift+Y = ছ</span></div>
              <div className="flex justify-between py-1"><span>k = ত</span><span>Shift+K = থ</span></div>
            </div>
          </Card>

          <Card className="border border-border bg-card p-4 space-y-2">
            <h3 className="font-extrabold text-foreground text-sm">Link-g Rule (যুক্তাক্ষর)</h3>
            <div className="space-y-1 text-muted-foreground font-mono">
              <div className="flex justify-between border-b border-border/50 py-1"><span>j + g + j = ক্ক</span><span>j + g + k = ক্ত</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>j + g + Shift+N = ক্ষ</span><span>u + g + Shift+I = জ্ঞ</span></div>
              <div className="flex justify-between border-b border-border/50 py-1"><span>v + g + l = ন্দ</span><span>v + g + k = ন্ত</span></div>
              <div className="flex justify-between py-1"><span>p + g + y = শ্চ</span><span>k + g + z = ত্র</span></div>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. 25-LESSON CURRICULUM OUTLINE */}
      <section className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              <span>UniBijoy (Bijoy 52) 25-Lesson Curriculum Outline</span>
            </h2>
            <p className="text-xs text-muted-foreground">Step-by-step structured lessons from home row keys to full 55+ WPM typing speed.</p>
          </div>
          <Link href="/courses/unibijoy">
            <Button className="font-bold text-xs gap-1.5 h-9">
              <span>Full Course Syllabus</span>
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Home Row Basics (ফ, গ, ক, ত)", desc: "Left hand & right hand primary finger anchor keys" },
            { num: "02", title: "Vowels & Sign Kar (া, ি, ী, ু, ূ)", desc: "Essential Bangla vowel sign placement" },
            { num: "03", title: "Top Row Consonants (প, ফ, গ, ঘ)", desc: "Reaching upper row key positions" },
            { num: "04", title: "Bottom Row Consonants (ন, ম, স, ব)", desc: "Lower row finger extensions & spacebar rhythm" },
            { num: "05", title: "Link-g Rule (যুক্তাক্ষর ক্ক, ক্ত, ক্ষ)", desc: "Mastering Hasant 'g' for complex conjunct formation" },
            { num: "06", title: "Speed & Accuracy Evaluation", desc: "5-minute timed test with live WPM & error diagnostics" },
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
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions — Bijoy Typing</h2>
          <p className="text-xs text-muted-foreground">Answers to common questions about Bijoy 52 and UniBijoy layout.</p>
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
