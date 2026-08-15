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
            "text": "Bijoy 52 uses ANSI (SutonnyMJ) encoding, whereas UniBijoy maps the exact same physical key locations to modern web Unicode standards."
          }
        }
      ]
    }
  ]
};

export default function Bijoy52TypingLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 fade-in">
      <Script
        id="jsonld-bijoy-course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Hero */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold px-3 py-1">
            TRADITIONAL FIXED LAYOUT STANDARD
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            বিজয় ৫২ ও ইউনিবিজয় টাইপিং শিক্ষা ও অনলাইন প্র্যাকটিস
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            বাংলাদেশের অফিস-আদালত ও প্রকাশনায় বহুল ব্যবহৃত বিজয় কিবোর্ড লেআউট অনলাইন প্র্যাকটিস করুন। SutonnyMJ এর কী-ম্যাপ হুবহু বজায় রেখে ওয়েব-স্ট্যান্ডার্ড ইউনিবিজয় টাইপিং শিখুন।
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/courses/unibijoy">
              <Button className="font-bold text-xs gap-2 h-11 px-6 shadow-md cursor-pointer">
                <Play size={15} />
                <span>ইউনিবিজয় সম্পূর্ণ কোর্স শুরু করুন (২৫ পাঠ)</span>
              </Button>
            </Link>
            <Link href="/practice/unibijoy">
              <Button variant="outline" className="font-bold text-xs gap-2 h-11 px-6 border-border cursor-pointer">
                <Zap size={15} />
                <span>স্পিড ড্রিল শুরু করুন</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Interactive Typing Practice Arena */}
        <Card className="border-2 border-primary/40 bg-card shadow-lg rounded-3xl overflow-hidden p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 text-foreground">
              <Zap size={20} className="text-primary" />
              <h2 className="text-base sm:text-lg font-black text-foreground">সরাসরি বিজয় (UniBijoy) টাইপিং টেস্ট ও প্র্যাকটিস অ্যারেনা</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono font-bold uppercase border-border">
              UniBijoy Live Engine
            </Badge>
          </div>

          <LayoutPracticeClient layout="unibijoy" />
        </Card>

        {/* Keymap Guide */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-3xl font-black text-foreground">বিজয় ৫২ কিবোর্ডের প্রধান কী-পজিশন</h2>
            <p className="text-xs text-muted-foreground">SutonnyMJ ও ইউনিবিজয় কিবোর্ডের জন্য মুখস্থ করার মতো গুরুত্বপূর্ণ কীসমূহ</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {[
              { title: "ক-বর্গীয় বর্ণসমূহ", eg: "j = ক,  shift+j = খ,  h = ব,  f = া", icon: Keyboard },
              { title: "যুক্তাক্ষর লিংক বা হসন্ত", eg: "g = ্ (হসন্ত)। যেমন: g+j = ক্ক", icon: Sparkles },
              { title: "কার চিহ্নসমূহ", eg: "d = ি,  shift+d = ী,  s = ু,  shift+s = ূ,  c = ে", icon: BookOpen },
              { title: "রেফ ও ফৌলা", eg: "shift+a = র্ (রেফ),  z = ্র (র-ফলা)", icon: Award },
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
              <h2 className="text-base font-black text-foreground">ইউনিবিজয় (Bijoy 52) ভার্চুয়াল কীবোর্ড লেআউট গাইড</h2>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono border-border">Interactive Keymap</Badge>
          </div>
          <VirtualKeyboard activeLayout="unibijoy" />
        </Card>
      </div>
    </div>
  );
}
