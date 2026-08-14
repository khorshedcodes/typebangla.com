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
  title: "Inscript Bangla Typing Online — India National Standard | TypeBangla",
  description: "Master Inscript Indian National Standard layout for Bangla typing online. 45 structured lessons, keymaps, conjuncts, and live speed WPM diagnostics.",
  keywords: [
    "inscript bangla typing online",
    "inscript keyboard layout west bengal",
    "inscript bangla practice drills",
    "indian national standard bangla keyboard",
    "typebangla inscript course"
  ],
  alternates: { canonical: "https://typebangla.com/inscript-bangla-typing" },
  openGraph: {
    title: "Inscript Bangla Typing Online — India National Standard",
    description: "Practice Inscript Bengali keyboard layout with real-time WPM speed telemetry.",
    url: "https://typebangla.com/inscript-bangla-typing",
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
    }
  ]
};

export default function InscriptBanglaTypingLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 fade-in">
      <Script
        id="jsonld-inscript-course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Hero */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold px-3 py-1">
            INDIAN NATIONAL STANDARD (INSCRIPT)
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            ইনস্ক্রিপ্ট (Inscript Bangla) কিবোর্ড টাইপিং ও প্র্যাকটিস
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            ভারত সরকার ও পশ্চিমবঙ্গ রাজ্য সরকারি পরীক্ষা এবং পেশাদার কাজের জন্য ইনস্ক্রিপ্ট বাংলা কিবোর্ড লেআউটে টাইপিং গতি বাড়ান।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/practice/inscript">
              <Button className="font-bold text-xs gap-2 h-11 px-6 shadow-md cursor-pointer">
                <Play size={15} />
                <span>ইনস্ক্রিপ্ট টাইপিং শুরু করুন</span>
              </Button>
            </Link>
            <Link href="/online-bangla-keyboard">
              <Button variant="outline" className="font-bold text-xs gap-2 h-11 px-6 border-border cursor-pointer">
                <Keyboard size={15} />
                <span>অনলাইন কিবোর্ড টুল</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Interactive Typing Practice Arena */}
        <Card className="border-2 border-primary/40 bg-card shadow-lg rounded-3xl overflow-hidden p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 text-foreground">
              <Zap size={20} className="text-primary" />
              <h2 className="text-base sm:text-lg font-black text-foreground">সরাসরি ইনস্ক্রিপ্ট (Inscript) টাইপিং টেস্ট ও প্র্যাকটিস অ্যারেনা</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase border-border">
              Inscript Live Engine
            </Badge>
          </div>

          <LayoutPracticeClient layout="inscript" />
        </Card>

        {/* Virtual Keyboard */}
        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 text-foreground">
              <Keyboard className="text-primary" size={20} />
              <h2 className="text-base font-black text-foreground">ইনস্ক্রিপ্ট (Inscript Bangla) ভার্চুয়াল কীবোর্ড লেআউট ভিজ্যুয়ালাইজার</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono border-border">Inscript Spec</Badge>
          </div>
          <VirtualKeyboard activeLayout="inscript" />
        </Card>
      </div>
    </div>
  );
}
