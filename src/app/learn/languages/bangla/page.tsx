import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Keyboard, Sparkles, BookOpen, CheckCircle2, ArrowRight,
  ShieldCheck, Trophy, Globe, Award, HelpCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "বাংলা টাইপিং মাস্টার কোর্স ও কিবোর্ড গাইড — অভ্র, বিজয় ও জাতীয় কীবোর্ড | TypeBangla",
  description: "বিনামূল্যে বাংলা টাইপিং শিখুন। অভ্র ফোনেটিক (Avro), ইউনিবিজয় (UniBijoy) এবং সরকারি চাকরির জন্য বিএসসি জাতীয় (Jatiya BCC) কীবোর্ড মাস্টার করার সম্পূর্ণ টিউটোরিয়াল ও অনুশীলন।",
  alternates: { canonical: "https://typebangla.com/learn/languages/bangla" },
  openGraph: {
    title: "বাংলা কীবোর্ড টাইপিং কোর্স ও গাইড | TypeBangla",
    description: "অভ্র, বিজয় এবং জাতীয় কীবোর্ডে দ্রুত বাংলা টাইপ করার সবচেয়ে সহজ নিয়ম ও ফ্রি অনলাইন কোর্স।",
    url: "https://typebangla.com/learn/languages/bangla",
    type: "website",
  },
};

const JSON_LD_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "name": "Bangla Touch Typing Master Class (Avro, UniBijoy, Jatiya)",
      "description": "Complete guide and interactive lessons for mastering Bangla keyboard layouts including Avro Phonetic, UniBijoy 52, and Jatiya BCC Govt standard.",
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
          "name": "সরকারি চাকরির জন্য কোন বাংলা কীবোর্ড শেখা প্রয়োজন?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "বাংলাদেশ সরকারি চাকরির পরীক্ষা (বিএসসি ও বিভিন্ন মন্ত্রণালয়) এবং সরকারি ই-নথি কাজের জন্য জাতীয় (Jatiya BCC) বা ইউনিবিজয় কীবোর্ড বাধ্যতামূলক।"
          }
        },
        {
          "@type": "Question",
          "name": "অভ্র ফোনেটিক ও বিজয়ের মধ্যে পার্থক্য কী?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "অভ্র ফোনেটিক হলো ইংরেজিতে টাইপ করে বাংলা লেখার মাধ্যম (যেমন: 'ami' ➔ 'আমি')। অন্যদিকে বিজয় হলো ফিক্সড কীবোর্ড লেআউট যেখানে প্রতিটি কী-তে নির্দিষ্ট বাংলা বর্ণ বসানো থাকে।"
          }
        }
      ]
    }
  ]
};

const BANGLA_LAYOUT_CARDS = [
  {
    id: "avro",
    title: "অভ্র ফোনেটিক (Avro Phonetic)",
    badge: "সবচেয়ে জনপ্রিয়",
    desc: "ইংরেজি অক্ষর দিয়ে ফোনেটিক নিয়মে সহজে বাংলা লিখুন। কীবোর্ড মুখস্থ করার প্রয়োজন নেই।",
    link: "/avro-phonetic-typing",
    courseLink: "/courses/avro",
    lessons: "২৫টি লেসন",
    speed: "৩৫–৬০ WPM",
    icon: "⚡",
  },
  {
    id: "unibijoy",
    title: "ইউনিবিজয় (UniBijoy / Bijoy 52)",
    badge: "প্রেস ও অফিসিয়াল",
    desc: "প্রথাগত বিজয় কীবোর্ড যা বইমেলা, পত্রিকা ও অফিসিয়াল টাইপিং কাজের জন্য স্বীকৃত।",
    link: "/bijoy-52-typing",
    courseLink: "/courses/unibijoy",
    lessons: "২৫টি লেসন",
    speed: "৩০–৫৫ WPM",
    icon: "📰",
  },
  {
    id: "jatiya",
    title: "জাতীয় কীবোর্ড (Jatiya BCC Govt)",
    badge: "সরকারি চাকরি বাধ্যতামূলক",
    desc: "বাংলাদেশ কম্পিউটার কাউন্সিল (BCC) কর্তৃক অনুমোদিত সরকারি নিয়োগ পরীক্ষার অফিসিয়াল স্ট্যান্ডার্ড।",
    link: "/jatiya-keyboard-typing",
    courseLink: "/courses/jatiya",
    lessons: "২৫টি লেসন",
    speed: "৩০–৫০ WPM",
    icon: "🏛️",
  },
  {
    id: "probhat",
    title: "প্রভাত কীবোর্ড (Probhat Layout)",
    badge: "সহজ ফিক্সড ম্যাপিং",
    desc: "উচ্চারণভিত্তিক সহজ ফিক্সড কিবোর্ড ম্যাপিং যা খুব দ্রুত আয়ত্ত করা যায়।",
    link: "/probhat-layout-typing",
    courseLink: "/courses/probhat",
    lessons: "২০টি লেসন",
    speed: "২৫–৪৫ WPM",
    icon: "🌅",
  },
];

export default function BanglaLanguageHubPage() {
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
        <span className="text-foreground font-bold">Bangla Master Curriculum</span>
      </div>

      {/* Hero Section */}
      <section className="border border-border bg-card rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xs max-w-4xl mx-auto bg-grid-pattern">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold text-primary">
          <Keyboard size={15} />
          <span>BANGLA TYPING MASTER CURRICULUM</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          বাংলা কীবোর্ড টাইপিং কোর্স ও অনলাইন গাইড
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-bangla">
          অভ্র ফোনেটিক, ইউনিবিজয় এবং সরকারি বিএসসি জাতীয় কীবোর্ডে সঠিক আঙুল বিন্যাসে দ্রুত ও নির্ভুল বাংলা টাইপিং শিখুন সম্পূর্ণ বিনামূল্যে।
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-foreground pt-2">
          <span className="flex items-center gap-1.5 bg-secondary border border-border px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} className="text-emerald-500" /> অভ্র, বিজয় ও জাতীয় কীবোর্ড সাপোর্টেড
          </span>
          <span className="flex items-center gap-1.5 bg-secondary border border-border px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} className="text-emerald-500" /> যুক্তাক্ষর ও কার বর্ণমালার বিশেষ ড্রিল
          </span>
          <span className="flex items-center gap-1.5 bg-secondary border border-border px-3 py-1.5 rounded-full">
            <CheckCircle2 size={13} className="text-emerald-500" /> সরকারি বিএসসি ৩০ WPM পরীক্ষা প্রস্তুতি
          </span>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/courses">
            <Button size="lg" className="font-black text-sm h-12 px-8 rounded-xl shadow-xs gap-2 cursor-pointer">
              <span>সকল কোর্স দেখুন</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/practice">
            <Button variant="outline" size="lg" className="font-bold text-sm h-12 px-8 rounded-xl border-border cursor-pointer">
              <span>ফ্রি প্র্যাকটিস হাব</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Bangla Layout Cards Grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">কিবোর্ড কারিকুলাম</span>
          <h2 className="text-2xl font-black text-foreground">আপনার কীবোর্ড লেআউট বেছে নিন</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BANGLA_LAYOUT_CARDS.map((card) => (
            <Card key={card.id} className="border border-border bg-card rounded-2xl shadow-xs hover:border-primary/50 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{card.icon}</span>
                  <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 font-bold text-xs">
                    {card.badge}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-foreground">{card.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-bangla">{card.desc}</p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-foreground">
                  <span>📖 {card.lessons}</span>
                  <span>⏱ {card.speed}</span>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link href={card.courseLink} className="flex-1">
                    <Button size="sm" className="w-full font-bold text-xs gap-1.5 h-9 cursor-pointer">
                      <BookOpen size={13} /> পাঠক্রম ও লেসন
                    </Button>
                  </Link>
                  <Link href={card.link} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full font-bold text-xs gap-1.5 h-9 border-border cursor-pointer">
                      <span>লাইভ অ্যারেনা</span>
                      <ArrowRight size={13} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border border-border bg-card rounded-3xl p-8 shadow-xs space-y-6">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
          <HelpCircle size={20} className="text-primary" />
          <span>বাংলা টাইপিং সম্পর্কিত সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2 p-5 rounded-2xl bg-secondary/50 border border-border">
            <h3 className="font-bold text-sm text-foreground">১. সরকারি চাকরির জন্য কোন কীবোর্ড প্রয়োজন?</h3>
            <p className="text-muted-foreground leading-relaxed font-bangla">
              বাংলাদেশ সরকারি চাকরির পরীক্ষা (বিএসসি ও বিভিন্ন মন্ত্রণালয়) এবং সরকারি ই-নথি কাজের জন্য জাতীয় (Jatiya BCC) বা ইউনিবিজয় কীবোর্ড বাধ্যতামূলক।
            </p>
          </div>
          <div className="space-y-2 p-5 rounded-2xl bg-secondary/50 border border-border">
            <h3 className="font-bold text-sm text-foreground">২. নতুনদের জন্য কোনটি দিয়ে শুরু করা সহজ?</h3>
            <p className="text-muted-foreground leading-relaxed font-bangla">
              নতুনদের জন্য অভ্র ফোনেটিক (Avro Phonetic) সবচেয়ে সহজ, কারণ ইংরেজি অক্ষরের উচ্চারণে বাংলা লেখা যায় (যেমন: &apos;ami&apos; ➔ &apos;আমি&apos;)।
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
