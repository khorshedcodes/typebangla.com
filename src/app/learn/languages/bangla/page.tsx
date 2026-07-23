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

export default function BanglaLanguageHubPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16 fade-in text-[#111827]">
      
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <Link href="/" className="hover:text-[#2563EB]">Home</Link>
        <span>/</span>
        <Link href="/learn" className="hover:text-[#2563EB]">Learn Hub</Link>
        <span>/</span>
        <span className="text-[#111827] font-bold">Bangla Typing</span>
      </div>

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#2563EB]">
          <Keyboard size={15} />
          <span>BANGLA TYPING HUB</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#111827] tracking-tight">
          বাংলা টাইপিং কোর্স
        </h1>

        <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
          অভ্র ফোনেটিক, ইউনিবিজয় ও সরকারি বিসিসি জাতীয় কিবোর্ডে বাংলা টাইপিং মাস্টার করুন সহজ উপায়ে।
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-[#111827]">
          <span>✓ অভ্র, বিজয় ও জাতীয় সাপোর্ট</span>
          <span>✓ যুক্তাক্ষর ও জটিল বর্ণমালা</span>
          <span>✓ সরকারি চাকরির পরীক্ষা প্রস্তুতি</span>
        </div>

        <div className="pt-2">
          <Link href="/learn/beginner?lang=bn">
            <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm h-12 px-8 rounded-xl shadow-lg gap-2">
              বাংলা শেখা শুরু করুন →
            </Button>
          </Link>
        </div>
      </section>

      {/* ── 2. KEYBOARD LAYOUT SELECTION ────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-[#2563EB] uppercase tracking-widest">কিবোর্ড নির্বাচন</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Choose Keyboard Layout</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">⌨️</div>
            <h3 className="text-lg font-black">Avro Phonetic (অভ্র)</h3>
            <p className="text-xs text-[#6B7280]">ইংরেজি অক্ষরের সাহায্যে সহজ বাংলা টাইপিং (a=আ, k=ক)। নতুনদের জন্য সেরা।</p>
            <Link href="/learn/avro" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                অভ্র লেআউটে শুরু করুন →
              </Button>
            </Link>
          </Card>

          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">🏛️</div>
            <h3 className="text-lg font-black">Jatiya Standard (জাতীয়)</h3>
            <p className="text-xs text-[#6B7280]">বিসিসি অনুমোদিত প্রমিত জাতীয় কিবোর্ড। সরকারি চাকরির পরীক্ষার জন্য আবশ্যক।</p>
            <Link href="/learn/jatiya" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                জাতীয় কীবোর্ডে শুরু করুন →
              </Button>
            </Link>
          </Card>

          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">🏢</div>
            <h3 className="text-lg font-black">UniBijoy (ইউনিবিজয়)</h3>
            <p className="text-xs text-[#6B7280]">প্রথাগত বিজয় ৫২ কিবোর্ড স্টাইল। কর্পোরেট অফিস ও প্রকাশনার জন্য আদর্শ।</p>
            <Link href="/learn/unibijoy" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                ইউনিবিজয় লেআউটে শুরু করুন →
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* ── 3. COURSE ROADMAP ───────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-[#2563EB] uppercase tracking-widest">শেখার রোডম্যাপ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Bangla Course Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">🌱</div>
            <h3 className="text-lg font-black">Beginner Course</h3>
            <p className="text-xs text-[#6B7280]">স্বরবর্ণ, ব্যঞ্জনবর্ণ, হোম রো ও মৌলিক ২০ পাঠ।</p>
            <Link href="/learn/beginner?lang=bn" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                বিগিনার কোর্স (0–25 WPM) →
              </Button>
            </Link>
          </Card>

          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">🚀</div>
            <h3 className="text-lg font-black">Intermediate Course</h3>
            <p className="text-xs text-[#6B7280]">যুক্তাক্ষর, বিরামচিহ্ন, চাকরির আবেদনপত্র ও ৩০ পাঠ।</p>
            <Link href="/learn/intermediate?lang=bn" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                ইন্টারমিডিয়েট (25–50 WPM) →
              </Button>
            </Link>
          </Card>

          <Card className="border border-[#E5E7EB] bg-[#FFFFFF] rounded-3xl p-6 space-y-4 hover:border-[#2563EB] transition-all">
            <div className="text-3xl">🏆</div>
            <h3 className="text-lg font-black">Professional Mastery</h3>
            <p className="text-xs text-[#6B7280]">সরকারি মক টেস্ট, প্রফেশনাল ফাইল ও ৪০ পাঠ।</p>
            <Link href="/learn/advanced?lang=bn" className="block pt-2">
              <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold h-10 rounded-xl">
                প্রফেশনাল মাস্টারি (60–90+ WPM) →
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* ── 4. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="border border-[#E5E7EB] bg-[#2563EB] text-white rounded-3xl p-10 text-center space-y-6 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-black">বাংলা টাইপিংয়ে দক্ষতা অর্জন করুন</h2>
        <p className="text-sm text-white/90 max-w-xl mx-auto">
          আজই শুরু করুন বাংলা টাইপিং অনুশীলন। সম্পূর্ণ বিনামূল্যে।
        </p>
        <Link href="/learn/beginner?lang=bn" className="inline-block pt-2">
          <Button size="lg" className="bg-[#FFFFFF] hover:bg-[#F3F4F6] text-[#2563EB] font-bold text-sm h-12 px-8 rounded-xl shadow-lg">
            বিগিনার বাংলা কোর্স শুরু করুন →
          </Button>
        </Link>
      </section>

    </main>
  );
}
