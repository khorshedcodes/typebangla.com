import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Keyboard, Award, Sparkles, ShieldCheck, Zap,
  BookOpen, Users, CheckCircle2, Globe, Heart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Us | TypeBangla — Bangladesh's Premier Typing Platform",
  description: "Learn about typebangla.com — our mission to provide free, high-precision English and Bangla typing instruction, government exam preparation, and instant certificate verification.",
  alternates: { canonical: "https://typebangla.com/about" },
};

export default function AboutPage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 fade-in text-foreground">
      {/* Hero Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
          <Sparkles size={14} className="text-emerald-500 animate-pulse" />
          <span>ABOUT TYPEBANGLA PLATFORM</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Empowering Typists Across Bangladesh &amp; Beyond
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">typebangla.com</strong> ইব লার্নিং ও টাইপিং প্রযুক্তির মাধ্যমে শিক্ষার্থীদের দ্রুত ও নিখুঁতভাবে বাংলা ও ইংরেজি টাইপিং শিখতে সাহায্য করে।
        </p>
      </section>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border bg-card shadow-xs rounded-2xl">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-2">
              <Keyboard size={20} />
            </div>
            <CardTitle className="text-base font-bold">৭টি কিবোর্ড লেআউট</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            English, UniBijoy, Jatiya (BCC Govt Standard), Avro Phonetic, Probhat, Inscript, এবং Unicode—সকল স্ট্যান্ডার্ড কিবোর্ড সাপোর্ট।
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-xs rounded-2xl">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2">
              <Award size={20} />
            </div>
            <CardTitle className="text-base font-bold">অনলাইন সার্টিফিকেট</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            ৮৫%+ একিউরেসিতে পরীক্ষা সম্পন্ন করে তাৎক্ষণিক ডাউনলোডযোগ্য গোল্ড ও সিলভার সম্মানজনক সনদপত্র অর্জন করুন।
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-xs rounded-2xl">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 mb-2">
              <ShieldCheck size={20} />
            </div>
            <CardTitle className="text-base font-bold">সরকারি চাকরি সিমুলেটর</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            বাংলাদেশ কম্পিউটার কাউন্সিল (BCC) এবং বিভিন্ন মন্ত্রণালয়ের কম্পিউটার অপারেটর পরীক্ষার হুবহু আসল ফরম্যাটে অনুশীলন।
          </CardContent>
        </Card>
      </div>

      {/* Mission & Vision Section */}
      <Card className="border border-border bg-card shadow-sm rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="space-y-3">
          <Badge variant="outline" className="px-3 py-1 text-xs font-bold text-primary border-primary/30">
            আমাদের লক্ষ্য (Our Mission)
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            কেন TypeBangla বেছে নেবেন?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            আমাদের উদ্দেশ্য ডিজিটাল বাংলাদেশে কর্মসংস্থান, সরকারি চাকরি প্রস্তুতি, কন্টেন্ট রাইটিং এবং ডাটা এন্ট্রি পেশাজীবীদের টাইপিং দক্ষতা সহজ ও বিনামূল্যে বৃদ্ধি করা। কোনো প্রকার সফটওয়্যার ইনস্টল করা ছাড়াই ব্রাউজারেই সরাসরি টাইপ করা যায়।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-foreground pt-4 border-t border-border">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
            <span>১০০% ফ্রি এবং ব্রাউজারেই সফটওয়্যারবিহীন লাইভ টাইপিং</span>
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
            <span>QR কোড ও ইউনিক ট্র্যাকিং কোড ভিত্তিক সার্টিফিকেট ভেরিফিকেশন</span>
          </div>
        </div>
      </Card>

      {/* Footer Tagline */}
      <div className="text-center space-y-2 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <span>Crafted with</span>
          <Heart size={14} className="text-rose-500 fill-rose-500" />
          <span>for typists in Bangladesh and worldwide.</span>
        </p>
      </div>
    </main>
  );
}
