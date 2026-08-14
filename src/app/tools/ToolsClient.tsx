"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  RefreshCw, Mic, Hash, FileText, Wrench, Type,
  ArrowRight, Keyboard, Volume2, Search, Sparkles,
  Layers, CheckCircle2, SlidersHorizontal, BookOpen, Award, LucideIcon, Languages
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export type ToolCategory = "all" | "converters" | "keyboards" | "ai" | "learning";

export interface ToolItem {
  id: string;
  href: string;
  icon: LucideIcon;
  title: string;
  titleBn: string;
  desc: string;
  badge: string;
  category: ToolCategory;
  featured?: boolean;
}

export const TOOLS_DIRECTORY: ToolItem[] = [
  {
    id: "online-keyboard",
    href: "/online-bangla-keyboard",
    icon: Keyboard,
    title: "Online Bangla Keyboard",
    titleBn: "অনলাইন বাংলা কীবোর্ড (সফ্টওয়্যারহীন টাইপ)",
    desc: "অনলাইনে সফটওয়্যার ছাড়াই বাটন ক্লিক করে বা কিবোর্ডে চাপ দিয়ে সহজ ইউনিকোড বাংলা টাইপিং।",
    badge: "ভার্চুয়াল কীবোর্ড",
    category: "keyboards",
    featured: true,
  },
  {
    id: "unicode-to-bijoy",
    href: "/unicode-to-bijoy-converter",
    icon: RefreshCw,
    title: "Unicode ↔ Bijoy Converter",
    titleBn: "ইউনিকোড থেকে বিজয় কনভার্টার",
    desc: "SutonnyMJ ফন্টের বিজয় টেক্সট ও ইউনিকোড ফরম্যাটের মধ্যে তাৎক্ষণিক দ্বি-মুখী রূপান্তর।",
    badge: "কনভার্টার",
    category: "converters",
    featured: true,
  },
  {
    id: "bijoy-to-unicode",
    href: "/bijoy-to-unicode-converter",
    icon: RefreshCw,
    title: "Bijoy to Unicode Converter",
    titleBn: "বিজয় ৫২ থেকে ইউনিকোড কনভার্টার",
    desc: "বিজয় ৫২ বা সুতন্বীএমজে (SutonnyMJ) টেক্সটকে স্ট্যান্ডার্ড ওয়েব ইউনিকোড বাংলায় রূপান্তর করুন।",
    badge: "কনভার্টার",
    category: "converters",
  },
  {
    id: "bangla-lorem",
    href: "/bangla-lorem-ipsum",
    icon: FileText,
    title: "Bangla Lorem Ipsum Generator",
    titleBn: "বাংলা লরেম ইপসাম জেনারেটর",
    desc: "ওয়েব ডিজাইন, ইউআই/ইউএক্স এবং মুদ্রণের জন্য ডামি বাংলা টেক্সট ও প্যারাগ্রাফ জেনারেটর।",
    badge: "লরেম জেনারেটর",
    category: "converters",
  },
  {
    id: "number-converter",
    href: "/bangla-number-converter",
    icon: Hash,
    title: "Bangla Number Converter",
    titleBn: "বাংলা সংখ্যা রূপান্তরকারী (0-9 ↔ ০-৯)",
    desc: "ইংরেজি (0-9) ও বাংলা (০-৯) সংখ্যার মধ্যে কমা ও টাকা চিহ্নের তাৎক্ষণিক রূপান্তর।",
    badge: "ডিজিট কনভার্টার",
    category: "converters",
  },
  {
    id: "word-counter",
    href: "/bangla-word-counter",
    icon: Hash,
    title: "Word & Character Counter",
    titleBn: "শব্দ ও অক্ষর গণনা",
    desc: "বাংলা টেক্সটের মোট শব্দ, বর্ণ, যুক্তাক্ষর ও পড়ার সময়সীমা বিশ্লেষণ।",
    badge: "টেক্সট এনালাইজার",
    category: "converters",
  },
  {
    id: "text-cleaner",
    href: "/bangla-text-cleaner",
    icon: Wrench,
    title: "Bangla Text Cleaner",
    titleBn: "বাংলা টেক্সট ক্লিনার ও স্পেস ফিক্সার",
    desc: "একাধিক স্পেস, ভুল পাঙ্কচুয়েশন, ZWNJ ক্যারেক্টার ও HTML ট্যাগ ফিল্টার করুন।",
    badge: "টেক্সট ফিক্সার",
    category: "converters",
  },
  {
    id: "voice-typing",
    href: "/bangla-voice-typing",
    icon: Mic,
    title: "Bangla Voice Typing",
    titleBn: "ভয়েস টাইপিং (কথা থেকে লেখা)",
    desc: "মাইক্রোফোনে বাংলায় কথা বলুন — স্বয়ংক্রিয়ভাবে নিখুঁত বাংলা টেক্সট লিখিত হবে।",
    badge: "AI ভয়েস",
    category: "ai",
    featured: true,
  },
  {
    id: "english-to-bangla",
    href: "/english-to-bangla-typing",
    icon: Type,
    title: "English to Bangla Typing",
    titleBn: "ইংরেজি টু বাংলা টাইপিং (Phonetic)",
    desc: "ইংরেজিতে টাইপ করুন (e.g. ami banglay gan gai) এবং বাংলা ইউনিকোড পান।",
    badge: "ফোনেটিক টাইপিং",
    category: "keyboards",
  },
  {
    id: "text-to-speech",
    href: "/bangla-text-to-speech",
    icon: Volume2,
    title: "Bangla Text to Speech",
    titleBn: "বাংলা টেক্সট টু স্পিচ রিডার (Voice)",
    desc: "বাংলা লেখা পেস্ট করুন এবং স্পষ্ট ভয়েসে অডিও শুনুন।",
    badge: "অডিও রিডার",
    category: "ai",
  },
  {
    id: "juktakkhor-finder",
    href: "/juktakkhor-finder",
    icon: Keyboard,
    title: "Bangla Juktakkhor Finder",
    titleBn: "বাংলা যুক্তবর্ণ ও কী-ম্যাপিং নির্দেশিকা",
    desc: "Avro, Bijoy 52 ও Jatiya কীবোর্ডে জটিল যুক্তাক্ষর লেখার সহজ গাইড।",
    badge: "যুক্তবর্ণ গাইড",
    category: "learning",
  },
  {
    id: "juktakkhor-trainer",
    href: "/juktakkhor",
    icon: BookOpen,
    title: "Juktakkhor Masterclass & Trainer",
    titleBn: "যুক্তবর্ণ মাস্টারক্ল্যাস ও অনুশীলন",
    desc: "বাংলা ৫০+ জটিল যুক্তাক্ষরের ভাঙন, উচ্চারণ ও ইন্টারেক্টিভ টাইপিং অনুশীলন।",
    badge: "ইন্টারেক্টিভ লার্নিং",
    category: "learning",
  },
  {
    id: "slug-generator",
    href: "/bangla-slug-generator",
    icon: Wrench,
    title: "Text Cleaner & Slugger",
    titleBn: "SEO স্লাগ জেনারেটর",
    desc: "বাংলা শিরোনাম থেকে পরিষ্কার, SEO-বান্ধব URL স্লাগ ও টেক্সট ফিল্টার তৈরি করুন।",
    badge: "SEO টুল",
    category: "converters",
  },
];

const CATEGORY_TABS: { id: ToolCategory; label: string; count?: number }[] = [
  { id: "all", label: "সব টুলস (All)" },
  { id: "converters", label: "কনভার্টার ও টেক্সট" },
  { id: "keyboards", label: "কীবোর্ড ও টাইপিং" },
  { id: "ai", label: "AI ও ভয়েস টুলস" },
  { id: "learning", label: "শিক্ষা ও যুক্তবর্ণ গাইড" },
];

export default function ToolsClient() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return TOOLS_DIRECTORY.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.titleBn.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q) ||
        tool.badge.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">

      {/* Hero Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground shadow-xs">
          <Sparkles size={14} className="text-amber-500" />
          <span>১৪টি প্রিমিয়াম ফ্রি বাংলা টেক্সট ইউটিলিটি</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          বাংলা টেক্সট ও টাইপিং টুলস
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          অনলাইন কীবোর্ড, ইউনিকোড ↔ বিজয় রূপান্তর, AI ভয়েস টাইপিং, শব্দ গণনা ও SEO স্লাগ জেনারেটর — এক জায়গায় সম্পূর্ণ নিখরচায়।
        </p>
      </section>

      {/* Search & Category Filter Controls */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-3.5 rounded-2xl shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "border-transparent bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="টুল খুঁজুন (e.g. voice, bijoy)..."
              className="w-full bg-secondary border border-border rounded-xl pl-9 pr-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1 font-semibold">
          <span>
            প্রদর্শিত হচ্ছে: <strong className="text-foreground">{filteredTools.length}টি টুল</strong>
          </span>
          {searchQuery && (
            <span>
              অনুসন্ধান ফিল্টার: &ldquo;<strong className="text-foreground">{searchQuery}</strong>&rdquo;
            </span>
          )}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className="border border-border bg-card hover:border-foreground/50 transition-all rounded-2xl shadow-xs flex flex-col justify-between group"
            >
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-secondary text-foreground flex items-center justify-center border border-border group-hover:scale-105 transition-transform">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-border text-foreground font-bold bg-secondary text-[11px] px-2.5 py-0.5"
                  >
                    {tool.badge}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <div className="text-xs font-bold text-muted-foreground">{tool.titleBn}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1 line-clamp-2">
                    {tool.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex justify-end">
                  <Link href={tool.href} className="w-full sm:w-auto">
                    <Button size="sm" className="w-full font-bold text-xs gap-1.5 h-9 rounded-xl">
                      টুল খুলুন <ArrowRight size={13} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 space-y-3 bg-secondary/30 rounded-2xl border border-dashed border-border">
          <Search size={32} className="mx-auto text-muted-foreground" />
          <p className="text-sm font-bold text-foreground">কোনো টুল পাওয়া যায়নি</p>
          <p className="text-xs text-muted-foreground">
            আপনার অনুসন্ধান &ldquo;{searchQuery}&rdquo; এর সাথে সামঞ্জস্যপূর্ণ কোনো টুল খুঁজে পাওয়া যায়নি।
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
            className="text-xs font-bold border-border"
          >
            সব ফিল্টার রিসেট করুন
          </Button>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-secondary via-card to-secondary border border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-black text-foreground">টাইপিং স্পিড টেস্ট দিতে চান?</h3>
          <p className="text-xs text-muted-foreground">
            সরকারি চাকরি ও প্রতিযোগিতামূলক পরীক্ষার জন্য আমাদের ৫ ও ১০ মিনিটের লাইভ টেস্ট আর্টিকেলে অংশ নিন।
          </p>
        </div>
        <Link href="/exam/govt">
          <Button size="lg" className="font-extrabold text-xs gap-2 rounded-xl shrink-0 shadow-xs">
            <Award size={15} /> সরকারি পরীক্ষা সিমুলেটর
          </Button>
        </Link>
      </section>

    </main>
  );
}
