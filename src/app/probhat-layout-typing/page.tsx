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
    }
  ]
};

export default function ProbhatLayoutTypingLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 fade-in">
      <Script
        id="jsonld-probhat-course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Hero */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold px-3 py-1">
            OPEN-SOURCE INTUITIVE FIXED LAYOUT
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            প্রভাত (Probhat Layout) বাংলা টাইপিং শিক্ষা ও প্র্যাকটিস
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            লিনাক্স ও ওপেন সোর্স কম্পিউটিংয়ে বহুল জনপ্রিয় প্রভাত কীবোর্ড লেআউট। ধ্বনিভিত্তিক সহজ পজিশনিং ও শব্দ গঠনের সহজ নিয়মাবলী নিয়ে আমাদের পূর্ণাঙ্গ প্র্যাকটিস ড্যাশবোর্ড।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/courses/probhat">
              <Button className="font-bold text-xs gap-2 h-11 px-6 shadow-md cursor-pointer">
                <Play size={15} />
                <span>প্রভাত সম্পূর্ণ কোর্স (২০ পাঠ)</span>
              </Button>
            </Link>
            <Link href="/practice/probhat">
              <Button variant="outline" className="font-bold text-xs gap-2 h-11 px-6 border-border cursor-pointer">
                <Zap size={15} />
                <span>প্রভাত স্পিড টেস্ট</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Interactive Typing Practice Arena */}
        <Card className="border-2 border-primary/40 bg-card shadow-lg rounded-3xl overflow-hidden p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 text-foreground">
              <Zap size={20} className="text-primary" />
              <h2 className="text-base sm:text-lg font-black text-foreground">সরাসরি প্রভাত (Probhat) টাইপিং টেস্ট ও প্র্যাকটিস অ্যারেনা</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase border-border">
              Probhat Live Engine
            </Badge>
          </div>

          <LayoutPracticeClient layout="probhat" />
        </Card>

        {/* Virtual Keyboard */}
        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 text-foreground">
              <Keyboard className="text-primary" size={20} />
              <h2 className="text-base font-black text-foreground">প্রভাত (Probhat) ভার্চুয়াল কীবোর্ড লেআউট ভিজ্যুয়ালাইজার</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono border-border">Probhat Spec</Badge>
          </div>
          <VirtualKeyboard activeLayout="probhat" />
        </Card>
      </div>
    </div>
  );
}
