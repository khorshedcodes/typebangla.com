import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Keyboard, Award, Sparkles, ShieldCheck, Zap,
  Globe, Mail, ArrowRight, CheckCircle2, Gamepad2, Building2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "আমাদের কথা (About Us) | TypeBangla — Bangla & English Typing Engine",
  description: "TypeBangla (typebangla.com) — বিনামূল্যে ব্রাউজারভিত্তিক বাংলা ও ইংরেজি কিবোর্ড টাইপিং, সরকারি চাকরির এক্সাম সিমুলেটর এবং অনলাইন ভেরিফাইড সনদপত্র প্ল্যাটফর্ম। প্রতিষ্ঠাতা: খোরশেদ আলম।",
  alternates: { canonical: "https://typebangla.com/about" },
  openGraph: {
    title: "About TypeBangla — Premier Bangla & English Typing Engine",
    description: "Discover our mission to empower students, government job candidates, and professionals with instant WPM telemetry and verified certificates.",
    url: "https://typebangla.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 fade-in text-foreground">
      
      {/* 1. HERO BANNER */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full text-xs font-extrabold text-primary">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span>TYPEBANGLA PLATFORM &amp; MISSION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
          সহজ, আধুনিক ও বাধারহিত টাইপিং প্রযুক্তি
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">TypeBangla (typebangla.com)</strong> ই-লার্নিং ও রিয়েল-টাইম কিবোর্ড প্রযুক্তির সমন্বয়ে গঠিত অত্যন্ত সহজ ও আধুনিক অনলাইন টাইপিং প্ল্যাটফর্ম। আমাদের মিশন হলো কোনো সফ্টওয়্যার ইন্সটলেশনের ঝামেলা ছাড়া প্রতিটি শিক্ষার্থী, চাকরিপ্রার্থী ও পেশাজীবীর জন্য বিনামূল্যে নির্ভুল টাইপিং অনুশীলনের সুযোগ তৈরি করা।
        </p>
      </section>

      {/* 2. STATS OVERVIEW */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "সমর্থিত কীবোর্ড লেআউট", val: "৭টি লেআউট", icon: Keyboard, color: "text-primary" },
          { label: "সরকারি চাকরির মানদণ্ড", val: "৩০ / ৩৫ WPM", icon: ShieldCheck, color: "text-emerald-500" },
          { label: "ব্রাউজার টাইপিং ইঞ্জিন", val: "১০০% ফ্রি", icon: Zap, color: "text-amber-500" },
          { label: "সনদপত্র অনলাইন যাচাই", val: "ইনস্ট্যান্ট QR", icon: Award, color: "text-teal-500" },
        ].map((s, i) => (
          <Card key={i} className="border border-border bg-card shadow-xs rounded-2xl p-5 text-center space-y-1">
            <s.icon size={22} className={`mx-auto mb-1 ${s.color}`} />
            <div className="text-xl sm:text-2xl font-black text-foreground">{s.val}</div>
            <div className="text-xs text-muted-foreground font-semibold">{s.label}</div>
          </Card>
        ))}
      </section>

      {/* 3. PLATFORM CORE FEATURES GRID */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="px-3 py-1 text-xs font-bold text-primary border-primary/30">
            প্ল্যাটফর্মের প্রধান বৈশিষ্ট্যসমূহ
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Why TypeBangla?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-border bg-card shadow-xs rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Keyboard size={22} />
            </div>
            <h3 className="text-base font-bold text-foreground">৭টি কিবোর্ড লেআউট সাপোর্ট</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              জাতীয় (BCC), বিজয় বায়ান্ন, অভ্র ফোনেটিক, প্রভাত, ইনস্ক্রিপ্ট, ইউনিকোড এবং English QWERTY — সকল প্রচলিত কিবোর্ড লেআউটের রিয়েল-টাইম লাইভ সাপোর্ট।
            </p>
          </Card>

          <Card className="border border-border bg-card shadow-xs rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-base font-bold text-foreground">সরকারি চাকরির পরীক্ষা সিমুলেটর</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              বাংলাদেশ কম্পিউটার কাউন্সিল (BCC) ও বিভিন্ন মন্ত্রণালয়ের কম্পিউটার অপারেটর ও ডেটা এন্ট্রি নিয়োগ পরীক্ষার হুবহু টেস্ট ফরম্যাট ও ভুল ক্যারেক্টার কাটার নিয়মাবলী।
            </p>
          </Card>

          <Card className="border border-border bg-card shadow-xs rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500">
              <Award size={22} />
            </div>
            <h3 className="text-base font-bold text-foreground">QR-ভেরিফাইড সনদপত্র</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              নির্ধারিত পাশ মার্ক স্পর্শ করার পর কিউআর কোড যুক্ত ডিজিটাল সনদপত্র অর্জন করুন। ইউনিক আইডি দ্বারা অনলাইনে তাৎক্ষণিক যাচাইযোগ্য।
            </p>
          </Card>
        </div>
      </section>

      {/* 4. MISSION & VISION STATEMENT */}
      <Card className="border border-border bg-card shadow-sm rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="space-y-3">
          <Badge variant="outline" className="px-3 py-1 text-xs font-bold text-primary border-primary/30">
            আমাদের ভিশন (Our Vision)
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            প্রতিটি বাংলাভাষী টাইপিস্টের জন্য সহজ ও উন্মুক্ত প্ল্যাটফর্ম
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            TypeBangla-র মূল ভিশন হলো প্রতিটি বাংলাভাষী ব্যবহারকারীর জন্য একটি উন্মুক্ত, অত্যন্ত দ্রুত এবং সফ্টওয়্যার ইন্সটলেশনের ঝামেলামুক্ত অনলাইন টাইপিং প্ল্যাটফর্ম বজায় রাখা। যেকোনো ডিভাইস বা মোবাইল-কম্পিউটার ব্রাউজার থেকে সরাসরি যুক্ত হয়ে টাইপিং দক্ষতা বৃদ্ধিতে সহায়তা করাই আমাদের একমাত্র অঙ্গসংস্থান।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-foreground pt-4 border-t border-border">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>১০০% ফ্রি এবং ইন্সটলেশনবিহীন লাইভ ব্রাউজার টাইপিং</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>লাইভ Net WPM, Accuracy ও নির্ভুলতা বিশ্লেষণ ব্যবস্থা</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>স্মার্ট ভার্চুয়াল কিবোর্ড নির্দেশক ও ৭ লেআউট গাইড</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>অনলাইন কিউআর কোড দ্বারা যাচাইযোগ্য মেধা সনদপত্র</span>
          </div>
        </div>
      </Card>

      {/* 5. FOUNDER & ENGINEERING LEADERSHIP */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <Badge variant="outline" className="px-3 py-1 text-xs font-bold text-primary border-primary/30">
            প্রতিষ্ঠাতা ও কারিগরি নেতৃত্ব
          </Badge>
          <h2 className="text-2xl font-black text-foreground">Founder &amp; Engineering Leadership</h2>
        </div>

        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
              KA
            </div>
            <div className="space-y-3 flex-1">
              <div className="space-y-0.5">
                <h3 className="text-xl font-black text-foreground">Khorshed Alam</h3>
                <p className="text-xs font-extrabold text-primary">Founder &amp; Lead Developer — TypeBangla</p>
                <p className="text-xs font-semibold text-muted-foreground">
                  Maintenance Engineer (Electrical) &amp; CSE Student at Uttara University
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                TypeBangla engine is architected and built by <strong className="text-foreground">Khorshed Alam</strong> with a vision to provide Bangladesh&apos;s fastest, most accessible, and zero-barrier typing practice and verification platform for learners, job candidates, and typists.
              </p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 border-t border-border/60">
                <a
                  href="https://khorshed-alam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:underline"
                >
                  <Globe size={14} />
                  <span>Portfolio: khorshed-alam.com</span>
                </a>

                <a
                  href="mailto:hello@khorshed-alam.com"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <Mail size={14} />
                  <span>Email: hello@khorshed-alam.com</span>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="border border-primary/30 bg-primary/5 rounded-3xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-black text-foreground">আজই টাইপিং গতি পরীক্ষা করুন!</h2>
        <p className="text-xs text-muted-foreground max-w-xl mx-auto">
          আপনার বর্তমান WPM পরিমাপ করুন এবং নিখরচায় টাইপিং অনুশীলন শুরু করুন।
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link href="/practice/test">
            <Button className="font-bold text-xs gap-2 px-6 h-10 shadow-md">
              <span>স্পিড টেস্ট শুরু করুন</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="font-bold text-xs gap-2 px-5 h-10 border-border">
              <span>যোগাযোগ কেন্দ্র</span>
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
