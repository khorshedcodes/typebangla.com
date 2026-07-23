"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen, GraduationCap, Trophy, CheckCircle2,
  ArrowRight, Star, Clock, Award, ShieldCheck,
  ChevronRight, FileText, Code, Briefcase, Globe,
  HelpCircle, Sparkles, Check, Play, Keyboard
} from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

export default function EnglishLanguageHubPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16 fade-in text-[#111827]">
      
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <Link href="/" className="hover:text-[#2563EB]">Home</Link>
        <span>/</span>
        <Link href="/learn" className="hover:text-[#2563EB]">Learn Hub</Link>
        <span>/</span>
        <span className="text-[#111827] font-bold">English Typing</span>
      </div>

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#2563EB]">
          <Globe size={15} />
          <span>ENGLISH QWERTY TOUCH TYPING</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#111827] tracking-tight">
          English Typing Course
        </h1>

        <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
          Master touch typing on the standard QWERTY keyboard with speed, 98%+ accuracy, and practical confidence.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-[#111827]">
          <span>✓ Learn proper finger placement</span>
          <span>✓ Improve speed & accuracy</span>
          <span>✓ Practice real English texts</span>
        </div>

        <div className="pt-2">
          <Link href="/learn/beginner?lang=en">
            <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm h-12 px-8 rounded-xl shadow-lg gap-2">
              Start Learning English →
            </Button>
          </Link>
        </div>
      </section>

      {/* ── 2. WHY LEARN ENGLISH TYPING? ────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-[#2563EB] uppercase tracking-widest">কেন ইংরেজি টাইপিং?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Why Learn English Typing?</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {[
            { label: "Coding & Dev", icon: Code },
            { label: "Office Work", icon: Briefcase },
            { label: "Freelancing", icon: Globe },
            { label: "Email Writing", icon: FileText },
            { label: "Academic Essays", icon: GraduationCap },
            { label: "Remote Jobs", icon: ShieldCheck },
          ].map((item, idx) => (
            <Card key={idx} className="border border-[#E5E7EB] bg-[#FFFFFF] shadow-sm rounded-2xl">
              <CardContent className="p-4 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mx-auto">
                  <item.icon size={20} />
                </div>
                <div className="text-xs font-bold text-[#111827]">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 3. COURSE ROADMAP ───────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-[#2563EB] uppercase tracking-widest">শেখার ধাপসমূহ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">English Course Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">🌱</div>
            <h3 className="text-lg font-black">Beginner Course</h3>
            <p className="text-xs text-[#6B7280]">Learn finger placement, Home Row (ASDF JKL;), Top & Bottom rows.</p>
            <Link href="/learn/beginner?lang=en" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                Start Beginner (ASDF JKL;) →
              </Button>
            </Link>
          </Card>

          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">🚀</div>
            <h3 className="text-lg font-black">Intermediate Course</h3>
            <p className="text-xs text-[#6B7280]">Build speed, punctuation, emails, business documents, and 95%+ accuracy.</p>
            <Link href="/learn/intermediate?lang=en" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                Start Intermediate (25–50 WPM) →
              </Button>
            </Link>
          </Card>

          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">🏆</div>
            <h3 className="text-lg font-black">Professional Mastery</h3>
            <p className="text-xs text-[#6B7280]">Master 60–90+ WPM, technical coding symbols, and career specializations.</p>
            <Link href="/learn/advanced?lang=en" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                Unlock Professional (60–90+ WPM) →
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* ── 4. QWERTY KEYBOARD ILLUSTRATION ──────────────────────────────────── */}
      <section className="border border-[#E5E7EB] bg-[#F3F4F6] rounded-3xl p-8 text-center space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-black text-[#2563EB] uppercase tracking-widest">কিবোর্ড লেআউট</span>
          <h2 className="text-2xl font-black text-[#111827]">Standard QWERTY Layout</h2>
        </div>

        <div className="border border-[#E5E7EB] bg-[#FFFFFF] p-6 rounded-2xl max-w-3xl mx-auto font-mono text-sm space-y-2 shadow-inner">
          <div className="flex justify-center gap-1.5 text-[#6B7280]">
            {["Q","W","E","R","T","Y","U","I","O","P"].map((k) => (
              <span key={k} className="w-9 h-10 border border-[#E5E7EB] bg-[#F3F4F6] rounded-lg flex items-center justify-center font-bold text-[#111827]">{k}</span>
            ))}
          </div>
          <div className="flex justify-center gap-1.5">
            {["A","S","D","F","G","H","J","K","L",";"].map((k) => (
              <span key={k} className={`w-9 h-10 border border-[#E5E7EB] rounded-lg flex items-center justify-center font-bold ${["F","J"].includes(k) ? "bg-[#2563EB] text-white ring-2 ring-[#2563EB]" : "bg-[#F3F4F6] text-[#111827]"}`}>{k}</span>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 text-[#6B7280]">
            {["Z","X","C","V","B","N","M",",","."].map((k) => (
              <span key={k} className="w-9 h-10 border border-[#E5E7EB] bg-[#F3F4F6] rounded-lg flex items-center justify-center font-bold text-[#111827]">{k}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CAREER BENEFITS ──────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest">ক্যারিয়ার সুবিধা</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Why English Typing Matters in Careers</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold text-[#111827]">
          {[
            "✔ Software Development & Coding",
            "✔ Data Entry & Analytics",
            "✔ Content Writing & Blogging",
            "✔ Customer Support & Communication",
            "✔ Global Remote Jobs & Upwork",
            "✔ University Higher Education",
          ].map((b, i) => (
            <div key={i} className="border border-[#E5E7EB] bg-[#FFFFFF] p-4 rounded-2xl flex items-center gap-2 shadow-sm">
              <CheckCircle2 size={16} className="text-[#2563EB] shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="border border-[#E5E7EB] bg-[#2563EB] text-white rounded-3xl p-10 text-center space-y-6 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-black">Start Your English Typing Journey</h2>
        <p className="text-sm text-white/90 max-w-xl mx-auto">
          Learn touch typing from scratch or boost your WPM score for free.
        </p>
        <Link href="/learn/beginner?lang=en" className="inline-block pt-2">
          <Button size="lg" className="bg-[#FFFFFF] hover:bg-[#F3F4F6] text-[#2563EB] font-bold text-sm h-12 px-8 rounded-xl shadow-lg">
            Start Beginner English Course →
          </Button>
        </Link>
      </section>

    </main>
  );
}
