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
  title: "Jatiya BCC Keyboard Bangla Typing — Govt Job Exam Standard | TypeBangla",
  description: "Learn Jatiya (BCC National) keyboard layout online. Official government job typing exam standard in Bangladesh (Computer Operator, Ministry, Bank). Free practice & drills.",
  keywords: [
    "jatiya keyboard typing online",
    "bcc bangla typing test",
    "govt job typing test 30 wpm",
    "computer operator typing exam bd",
    "jatiya layout keymap guide",
    "typebangla jatiya course"
  ],
  alternates: { canonical: "https://typebangla.com/jatiya-keyboard-typing" },
  openGraph: {
    title: "Jatiya BCC Keyboard Typing — Bangladesh Govt Job Standard",
    description: "Prepare for Bangladesh Government Computer Operator exams with official Jatiya layout typing drills.",
    url: "https://typebangla.com/jatiya-keyboard-typing",
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
    }
  ]
};

export default function JatiyaKeyboardTypingLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 fade-in">
      <Script
        id="jsonld-jatiya-course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Hero */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold px-3 py-1">
            GOVT RECRUITMENT STANDARD (BCC JATIYA)
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            জাতীয় (Jatiya BCC) কীবোর্ড টাইপিং ও সরকারি চাকরি প্রস্তুতি
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            বাংলাদেশ কম্পিউটার কাউন্সিল (BCC) কর্তৃক অনুমোদিত জাতীয় কিবোর্ড লেআউট। সরকারি কম্পিউটার অপারেটর, সাঁটমুদ্রাক্ষরিক ও ডাটা এন্ট্রি নিয়োগ পরীক্ষার জন্য ৩০ WPM গতি নিশ্চিত করুন।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/exam/govt">
              <Button className="font-bold text-xs gap-2 h-11 px-6 shadow-md cursor-pointer">
                <Award size={15} />
                <span>সরকারি চাকরি এক্সাম সিমুলেটরে যান</span>
              </Button>
            </Link>
            <Link href="/courses/jatiya">
              <Button variant="outline" className="font-bold text-xs gap-2 h-11 px-6 border-border cursor-pointer">
                <Play size={15} />
                <span>জাতীয় লেআউট কোর্স (২৫ পাঠ)</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Interactive Typing Practice Arena */}
        <Card className="border-2 border-primary/40 bg-card shadow-lg rounded-3xl overflow-hidden p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 text-foreground">
              <Zap size={20} className="text-primary" />
              <h2 className="text-base sm:text-lg font-black text-foreground">সরাসরি জাতীয় (Jatiya BCC) টাইপিং টেস্ট অ্যারেনা</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase border-border">
              Jatiya BCC Live Engine
            </Badge>
          </div>

          <LayoutPracticeClient layout="jatiya" />
        </Card>

        {/* Keymap Visualizer */}
        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 text-foreground">
              <Keyboard className="text-primary" size={20} />
              <h2 className="text-base font-black text-foreground">জাতীয় (Jatiya BCC) কীবোর্ড লেআউট গাইড</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono border-border">BCC Standard</Badge>
          </div>
          <VirtualKeyboard activeLayout="jatiya" />
        </Card>
      </div>
    </div>
  );
}
