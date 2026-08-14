import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Sparkles, Keyboard, BookOpen, CheckCircle2, ArrowRight,
  HelpCircle, Zap, Award, Play, ShieldCheck, FileText, ChevronRight
} from "lucide-react";
import LayoutPracticeClient from "../practice/[layout]/LayoutPracticeClient";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

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
            "text": "Conjuncts are formed naturally by combining consonant letters. For example: k+k = ক্ক, k+sh = ক্ষ, n+d = ন্দ."
          }
        }
      ]
    }
  ]
};

export default function AvroPhoneticTypingLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 fade-in">
      <Script
        id="jsonld-avro-course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Hero */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold px-3 py-1">
            PHONETIC TRANSLITERATION ENGINE
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            অভ্র ফোনেটিক বাংলা টাইপিং শিক্ষা ও অনলাইন প্র্যাকটিস
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            ইংরেজি কিবোর্ডের সাহায্যে সহজে উচ্চারণ অনুযায়ী বাংলা টাইপ শিখুন। অতিরিক্ত কোনো সফটওয়্যার ছাড়াই লাইভ WPM স্পিড অ্যানালিটিক্স ও ভার্চুয়াল কিবোর্ড গাইডের মাধ্যমে চর্চা করুন।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/courses/avro">
              <Button className="font-bold text-xs gap-2 h-11 px-6 shadow-md cursor-pointer">
                <Play size={15} />
                <span>অভ্র সম্পূর্ণ কোর্স শুরু করুন (২৫ পাঠ)</span>
              </Button>
            </Link>
            <Link href="/online-bangla-keyboard">
              <Button variant="outline" className="font-bold text-xs gap-2 h-11 px-6 border-border cursor-pointer">
                <Keyboard size={15} />
                <span>ভার্চুয়াল কিবোর্ড টুল</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Interactive Typing Practice Arena */}
        <Card className="border-2 border-primary/40 bg-card shadow-lg rounded-3xl overflow-hidden p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 text-foreground">
              <Zap size={20} className="text-primary" />
              <h2 className="text-base sm:text-lg font-black text-foreground">সরাসরি অভ্র টাইপিং টেস্ট ও প্র্যাকটিস অ্যারেনা</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase border-border">
              Avro Phonetic Live Mode
            </Badge>
          </div>

          <LayoutPracticeClient layout="avro" />
        </Card>

        {/* Avro Rules & Transliteration Guide Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-3xl font-black text-foreground">অভ্র ফোনেটিক টাইপিংয়ের মূল নিয়মাবলী</h2>
            <p className="text-xs text-muted-foreground">উচ্চারণ অনুযায়ী ইংরেজি অক্ষরের সঠিক ব্যবহার</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {[
              { rule: "Vowel Signs (কার)", eg: "a = া, i = ি, u = ু, e = ে, o = ো", icon: Sparkles },
              { rule: "Basic Consonants (ব্যঞ্জনবর্ণ)", eg: "k = ক, kh = খ, g = গ, gh = ঘ", icon: Keyboard },
              { rule: "Jukttakkhor (যুক্তাক্ষর)", eg: "k+k = ক্ক, k+sh = ক্ষ, n+g = ঙ্গ", icon: BookOpen },
              { rule: "Special Marks (ফলা ও রেফ)", eg: "r = ্র (ফলা), rr = র্ (রেফ)", icon: Award },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="bg-card border-border p-5 rounded-2xl space-y-2 shadow-xs">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-xl w-fit">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-extrabold text-foreground text-sm">{item.rule}</h3>
                  <p className="text-muted-foreground leading-relaxed font-mono text-[11px] bg-secondary p-2 rounded-lg border border-border">
                    {item.eg}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Interactive Virtual Keyboard Visualizer */}
        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 text-foreground">
              <Keyboard className="text-primary" size={20} />
              <h2 className="text-base font-black text-foreground">অভ্র ফোনেটিক ভার্চুয়াল কীবোর্ড লেআউট ভিজ্যুয়ালাইজার</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono border-border">Interactive Layout</Badge>
          </div>
          <VirtualKeyboard activeLayout="avro" />
        </Card>

        {/* FAQ Section */}
        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-foreground">সাধারণ প্রশ্ন ও উত্তর (FAQ)</h2>
            <p className="text-xs text-muted-foreground">অভ্র টাইপিং সম্পর্কিত গুরুত্বপূর্ণ তথ্য</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm">
                <HelpCircle size={15} className="text-primary shrink-0" />
                অভ্র ফোনেটিক টাইপিং কেন সহজ?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                আপনাকে কোনো নির্দিষ্ট কীবোর্ড ম্যাপ মুখস্থ করতে হয় না। আপনি যা উচ্চারণ করেন, ইংরেজি বর্ণ দিয়ে ঠিক সেভাবে টাইপ করলেই তা বাংলায় রূপান্তরিত হয়।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm">
                <HelpCircle size={15} className="text-primary shrink-0" />
                সরকারি চাকরির পরীক্ষায় কি অভ্র ব্যবহার করা যাবে?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                বেশিরভাগ সরকারি নিয়োগ পরীক্ষায় জাতীয় বা ইউনিবিজয় নির্ধারিত থাকে। তবে কম্পিউটার অপারেটর ও প্রাতিষ্ঠানিক কাজে অভ্র বহুল ব্যবহৃত ইউনিকোড স্ট্যান্ডার্ড।
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
