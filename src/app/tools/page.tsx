import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, Mic, Hash, Target, FileText, AlignLeft, Type, ArrowRight, Wrench, Keyboard, BarChart3 } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export const metadata: Metadata = {
  title: "বাংলা টেক্সট টুলস — কনভার্টার, কাউন্টার, স্লাগ জেনারেটর | TypeBangla",
  description: "বাংলা লেখার জন্য প্রয়োজনীয় সব টুল — ইউনিকোড থেকে বিজয় রূপান্তর, ভয়েস টাইপিং, শব্দ গণনা, স্লাগ জেনারেটর ও আরও অনেক কিছু।",
  alternates: { canonical: "https://typebangla.com/tools" },
};

const ALL_TOOLS = [
  {
    href: "/unicode-to-bijoy-converter",
    icon: RefreshCw,
    title: "Unicode ↔ Bijoy Converter",
    titleBn: "ইউনিকোড থেকে বিজয় কনভার্টার",
    desc: "SutonnyMJ ফন্টের বিজয় টেক্সট ও ইউনিকোড ফরম্যাটের মধ্যে তাৎক্ষণিক দ্বি-মুখী রূপান্তর।",
    badge: "কনভার্টার",
  },
  {
    href: "/bangla-word-counter",
    icon: Hash,
    title: "Word & Character Counter",
    titleBn: "শব্দ ও অক্ষর গণনা",
    desc: "বাংলা টেক্সটের মোট শব্দ, বর্ণ, যুক্তাক্ষর ও পড়ার সময়সীমা বিশ্লেষণ।",
    badge: "টেক্সট এনালাইজার",
  },
  {
    href: "/bangla-voice-typing",
    icon: Mic,
    title: "Bangla Voice Typing",
    titleBn: "ভয়েস টাইপিং (কথা থেকে লেখা)",
    desc: "মাইক্রোফোনে বাংলায় কথা বলুন — স্বয়ংক্রিয়ভাবে নিখুঁত বাংলা টেক্সট লিখিত হবে।",
    badge: "AI ভয়েস",
  },
  {
    href: "/keyboards",
    icon: Keyboard,
    title: "Virtual Keyboard Explorer",
    titleBn: "কীবোর্ড লেআউট মানচিত্র",
    desc: "Avro, UniBijoy, Jatiya, Probhat ও QWERTY কীবোর্ডের ইন্টারেক্টিভ কী ম্যাপ।",
    badge: "লেআউট ম্যাপ",
  },
  {
    href: "/stats",
    icon: BarChart3,
    title: "Typing Telemetry Analyzer",
    titleBn: "টাইপিং অ্যানালাইজার",
    desc: "আপনার টাইপিং গতি, ক্লান্তির লক্ষণ ও ক্ষতিকারক কীজোড় (problematic pairs) বিশ্লেষণ।",
    badge: "এনালাইটিক্স",
  },
  {
    href: "/bangla-slug-generator",
    icon: Wrench,
    title: "Text Cleaner & Slugger",
    titleBn: "SEO স্লাগ জেনারেটর",
    desc: "বাংলা শিরোনাম থেকে পরিষ্কার, SEO-বান্ধব URL স্লাগ ও টেক্সট ফিল্টার তৈরি করুন।",
    badge: "SEO টুল",
  },
];

export default function ToolsPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 fade-in text-foreground">

      {/* Hero */}
      <section className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Wrench size={14} />
          <span>BANGLA TEXT UTILITIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Bangla Text Tools
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Essential converter, counting, voice, and SEO text tools for Bangla typists.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_TOOLS.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <Card
              key={i}
              className="border border-border bg-card hover:border-foreground/50 transition-all rounded-xl shadow-xs flex flex-col justify-between"
            >
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-secondary text-foreground flex items-center justify-center border border-border">
                    <Icon size={20} />
                  </div>
                  <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary">
                    {tool.badge}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-foreground">{tool.title}</h3>
                  <div className="text-xs font-bold text-muted-foreground">{tool.titleBn}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">{tool.desc}</p>
                </div>

                <div className="pt-3 border-t border-border flex justify-end">
                  <Link href={tool.href}>
                    <Button size="sm" className="font-bold text-xs gap-1.5 h-9 rounded-md">
                      Open Tool <ArrowRight size={13} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

    </main>
  );
}
