import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Keyboard, Award, Sparkles, ShieldCheck, Zap,
  BookOpen, Users, CheckCircle2, Globe, Heart, ArrowRight,
  Check, Lock, Building, Cpu, Flame
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us | TypeBangla — Bangladesh's #1 Typing & Certification Platform",
  description: "Learn about TypeBangla (typebangla.com) — Bangladesh's leading online Bangla and English typing platform offering multi-layout practice, government job exam simulators, and verified certificate generation.",
  alternates: { canonical: "https://typebangla.com/about" },
  openGraph: {
    title: "About TypeBangla — Premier Bangla & English Typing Engine",
    description: "Discover our mission to empower students, government job candidates, and professionals with instant WPM telemetry and verified certificates.",
    url: "https://typebangla.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14 fade-in text-foreground">
      {/* 1. HERO BANNER */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
          <Sparkles size={14} className="text-emerald-500 animate-pulse" />
          <span>ABOUT TYPEBANGLA PLATFORM</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
          Empowering Typists Across Bangladesh &amp; Beyond
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">TypeBangla (typebangla.com)</strong> ই-লার্নিং ও রিয়েল-টাইম টাইপিং প্রযুক্তির সমন্বয়ে গঠিত বাংলাদেশের শীর্ষস্থানীয় অনলাইন টাইপিং প্ল্যাটফর্ম। আমরা শিক্ষার্থী, চাকরিপ্রার্থী ও পেশাজীবীদের জন্য বিনামূল্যে ও নির্ভুল টাইপিং অনুশীলনের সুযোগ তৈরি করেছি।
        </p>
      </section>

      {/* 2. STATS OVERVIEW */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Layout Engines", val: "6 Standards", icon: Keyboard, color: "text-primary" },
          { label: "Govt Exam Benchmark", val: "30 / 40 WPM", icon: ShieldCheck, color: "text-emerald-500" },
          { label: "Browser Engine", val: "100% Free", icon: Zap, color: "text-amber-500" },
          { label: "Certificate Audit", val: "Instant QR", icon: Award, color: "text-teal-500" },
        ].map((s, i) => (
          <Card key={i} className="border border-border bg-card shadow-xs rounded-2xl p-5 text-center space-y-1">
            <s.icon size={22} className={`mx-auto mb-1 ${s.color}`} />
            <div className="text-xl sm:text-2xl font-black text-foreground">{s.val}</div>
            <div className="text-xs text-muted-foreground font-semibold">{s.label}</div>
          </Card>
        ))}
      </section>

      {/* 3. CORE PILLARS GRID */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="px-3 py-1 text-xs font-bold text-primary border-primary/30">
            প্ল্যাটফর্মের মূল বৈশিষ্ট্যসমূহ
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Why Choose TypeBangla?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-border bg-card shadow-xs rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Keyboard size={22} />
            </div>
            <h3 className="text-base font-bold text-foreground">৬টি স্ট্যান্ডার্ড কিবোর্ড লেআউট</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              English QWERTY, UniBijoy (Bijoy 52), Jatiya (BCC Govt Standard), Avro Phonetic, Probhat, এবং Inscript — সকল কীবোর্ড লেআউটের লাইভ সমর্থন।
            </p>
          </Card>

          <Card className="border border-border bg-card shadow-xs rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Award size={22} />
            </div>
            <h3 className="text-base font-bold text-foreground">অনলাইন ভেরিফাইড সনদপত্র</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ৮৫%+ একিউরেসিতে স্পিড টেস্ট সম্পন্ন করে তাৎক্ষণিক QR-কোড সমৃদ্ধ গোল্ড ও সিলভার মেধা সনদপত্র অর্জন করুন। ইউনিক আইডি দ্বারা সহজেই অনলাইন ভেরিফাইযোগ্য।
            </p>
          </Card>

          <Card className="border border-border bg-card shadow-xs rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-base font-bold text-foreground">সরকারি চাকরি সিমুলেটর (BCC)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              বাংলাদেশ কম্পিউটার কাউন্সিল (BCC) এবং বিভিন্ন মন্ত্রণালয়ের কম্পিউটার অপারেটর পরীক্ষার হুবহু ৫ মিনিটের টেস্ট ফরম্যাটে টাইপিং অনুশীলন।
            </p>
          </Card>
        </div>
      </section>

      {/* 4. MISSION & VALUES */}
      <Card className="border border-border bg-card shadow-sm rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="space-y-3">
          <Badge variant="outline" className="px-3 py-1 text-xs font-bold text-primary border-primary/30">
            আমাদের লক্ষ্য (Our Vision)
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            সহজ ও বাধা মুক্ত টাইপিং প্ল্যাটফর্ম
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            আমাদের মূল ভিশন হলো প্রতিটি বাংলাভাষী ব্যবহারকারীর জন্য একটি অত্যন্ত সহজ, ব্রাউজার-ভিত্তিক এবং কোনো ইনস্টলেশন ঝামেলা ছাড়া টাইপিং শেখার অনলাইন প্ল্যাটফর্ম গড়ে তোলা। যেকোনো ব্রাউজার ও ডিভাইস থেকে সম্পূর্ণ বিনামূল্যে টাইপিং স্পিড বাড়ানো ও যাচাই করাই আমাদের লক্ষ্য।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-foreground pt-4 border-t border-border">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>১০০% ফ্রি এবং ব্রাউজারেই ইনস্টলেশনবিহীন লাইভ টাইপিং</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>লাইভ WPM, CPM, একিউরেসি ও ভুল এনালাইসিস ইঞ্জিন</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>স্মার্ট ভার্চুয়াল কিবোর্ড গাইড ও ফিঙ্গার পজিশনিং</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>অনলাইন কিউআর ভেরিফাইড সনদপত্র সুবিধা</span>
          </div>
        </div>
      </Card>

      {/* 5. FOUNDER & ENGINEERING LEADERSHIP */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <Badge variant="outline" className="px-3 py-1 text-xs font-bold text-primary border-primary/30">
            প্রতিষ্ঠাতা ও কারিগরি নেতৃত্ব
          </Badge>
          <h2 className="text-2xl font-black text-foreground">Founder &amp; Lead Engineer</h2>
        </div>

        <Card className="border border-border bg-card shadow-xs rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-emerald-500 text-primary-foreground flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
              KA
            </div>
            <div className="space-y-2 flex-1">
              <div className="space-y-0.5">
                <h3 className="text-xl font-black text-foreground">Khorshed Alam</h3>
                <p className="text-xs font-extrabold text-primary">Founder &amp; Lead Developer — TypeBangla</p>
                <p className="text-[11px] font-semibold text-muted-foreground">
                  Maintenance Engineer (Electrical) &amp; CSE Student at Uttara University
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                TypeBangla engine is architected and engineered by <strong className="text-foreground">Khorshed Alam</strong> with a vision to build Bangladesh&apos;s fastest, most accessible, and zero-barrier web typing instruction platform.
              </p>
              <div className="pt-1">
                <a
                  href="https://khorshed-alam.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:underline"
                >
                  <span>Visit Portfolio Website: khorshed-alam.com</span>
                  <Globe size={13} />
                </a>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 5. CTA BOTTOM */}
      <section className="border border-primary/30 bg-primary/5 rounded-3xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-black text-foreground">আজই টাইপিং স্পিড টেস্ট দিন!</h2>
        <p className="text-xs text-muted-foreground max-w-xl mx-auto">
          আপনার বর্তমান WPM গতি পরিমাপ করুন এবং বিনামূল্যে সার্টিফিকেট অর্জন করুন।
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
              <span>যোগাযোগ ও সাপোর্ট</span>
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
