"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award, Clock, ShieldCheck, Building2, ChevronDown, ChevronUp,
  Keyboard, FileText, Info, Download, CheckCircle2, Play, Target,
  Settings
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";

interface GovtPost {
  id: string;
  title: string;
  titleBn: string;
  dept: string;
  wpmBn: number;
  wpmEn: number;
  minAcc: number;
  badge: string;
  desc: string;
}

const GOVT_POSTS: GovtPost[] = [
  {
    id: "computer-operator",
    title: "Computer Operator",
    titleBn: "কম্পিউটার অপারেটর",
    dept: "মন্ত্রণালয়, বিভাগ ও বাংলাদেশ ব্যাংক",
    wpmBn: 30,
    wpmEn: 35,
    minAcc: 95,
    badge: "Official Standard (৩০/৩৫ WPM)",
    desc: "সকল সরকারি মন্ত্রণালয়, অধিদপ্তর ও ব্যাংকের কম্পিউটার অপারেটর পদের স্ট্যান্ডার্ড মানদণ্ড।",
  },
  {
    id: "data-entry",
    title: "Data Entry Operator",
    titleBn: "ডেটা এন্ট্রি অপারেটর",
    dept: "বিসিএস, নির্বাচন কমিশন ও রাজস্ব বোর্ড",
    wpmBn: 28,
    wpmEn: 30,
    minAcc: 95,
    badge: "Data Standard (২৮/৩০ WPM)",
    desc: "তথ্য সংগ্রাহক, এনবিআর ও নির্বাচন কমিশনের ডেটা প্রসেসিং পদের জন্য নির্ধারিত টেস্ট।",
  },
  {
    id: "office-assistant",
    title: "Office Assistant Typist",
    titleBn: "অফিস সহকারী কাম মুদ্রাক্ষরিক",
    dept: "জেলা প্রশাসকের কার্যালয় ও সকল দপ্তর",
    wpmBn: 20,
    wpmEn: 20,
    minAcc: 90,
    badge: "Entry Standard (২০ WPM)",
    desc: "মাঠ পর্যায় ও জেলা ভিত্তিক অফিস সহকারী পদের প্রাথমিক গতি ও নির্ভুলতা সিমুলেশন।",
  },
  {
    id: "custom",
    title: "Custom Govt Exam Preset",
    titleBn: "কাস্টম গভঃ প্রিসেট",
    dept: "কাস্টম টার্গেট স্পিড ও টাইমার নির্ধারণ",
    wpmBn: 30,
    wpmEn: 30,
    minAcc: 95,
    badge: "Custom Target Goal",
    desc: "নিজের পছন্দমতো টার্গেট গতি ও টাইমার মিনিট নির্ধারণ করে সরকারি পরীক্ষা অনুশীলন করুন।",
  },
];

const FAQ = [
  {
    q: "১. সরকারি কম্পিউটার অপারেটর পরীক্ষায় কত WPM গতি লাগে?",
    a: "অধিকাংশ সরকারি মন্ত্রণালয় ও ব্যাংকের ক্ষেত্রে বাংলায় সর্বনিম্ন ৩০ WPM এবং ইংরেজিতে ৩৫ WPM গতি প্রয়োজন। সাথে সর্বনিম্ন ৯৫% নির্ভুলতা নিশ্চিত করতে হয়।",
  },
  {
    q: "২. সরকারি পরীক্ষার জন্য কোন কীবোর্ড লেআউট শেখা ভালো?",
    a: "সরকারি চাকরির পরীক্ষায় জাতীয় কীবোর্ড (Jatiya) বা বিজয় বায়ান্ন/ইউনিবিজয় লেআউট সবচেয়ে বেশি প্রচলিত।",
  },
  {
    q: "৩. কিভাবে দ্রুত টাইপিং গতি বাড়ানো সম্ভব?",
    a: "প্রতিদিন ২০-৩০ মিনিট টাইপিং ড্রিল করুন। সঠিক আঙুলের পজিশন বজায় রাখুন এবং কীবোর্ডের দিকে না তাকিয়ে স্ক্রিনের দিকে তাকানোর অভ্যাস গড়ে তুলুন।",
  },
];

export default function GovtExamClient() {
  const router = useRouter();
  const { activeLayout, setActiveLayout } = useTypingStore();

  const [selectedPost, setSelectedPost] = useState<GovtPost>(GOVT_POSTS[0]);
  const [selectedDurationSec, setSelectedDurationSec] = useState<number>(300); // 5 Min default
  const [customWpmGoal, setCustomWpmGoal] = useState<number>(30); // 30 WPM default for custom preset
  const [faqOpen, setFaqOpen] = useState(false);

  const isCustomPost = selectedPost.id === "custom";
  const requiredWpm = isCustomPost ? customWpmGoal : (activeLayout === "english" ? selectedPost.wpmEn : selectedPost.wpmBn);
  const requiredAcc = selectedPost.minAcc;

  // On configurator mount: default to Jatiya if a non-govt layout (avro, probhat, etc.) is active
  useEffect(() => {
    const govtLayouts = ["jatiya", "unibijoy", "english"];
    if (!govtLayouts.includes(activeLayout)) {
      setActiveLayout("jatiya");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartExam = () => {
    router.push(`/exam/govt/test?post=${selectedPost.id}&customWpm=${requiredWpm}&duration=${selectedDurationSec}&layout=${activeLayout}`);
  };

  return (
    <div className="space-y-8 pb-16 fade-in text-foreground">

      {/* ── HERO BANNER ── */}
      <div className="border border-border bg-card rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden bg-grid-pattern">
        <div className="space-y-3 text-center sm:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-border text-foreground text-xs font-bold">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>TYPEBANGLA GOVT EXAM SIMULATOR</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Government Job Typing Exam Setup Portal
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Configure your post parameters below for Bangladesh Bank, Ministries, BCS, and NBR operator tests — Target: <strong>30 WPM Bangla</strong> & <strong>35 WPM English</strong> with 95%+ Accuracy.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs font-bold text-foreground">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> 1, 3, 5, 10 & 15 Min Timers</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> BCC Benchmark (TypeBangla Verified)</span>
            <span className="flex items-center gap-1.5"><Award size={14} className="text-amber-500" /> TypeBangla Verified Certificate</span>
          </div>
        </div>
      </div>

      {/* ── UNIFIED GOVT EXAM CONFIGURATOR ── */}
      <Card className="border border-border bg-card rounded-2xl shadow-xs overflow-hidden">
        <CardHeader className="border-b border-border pb-4 bg-secondary/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-black text-foreground flex items-center gap-2">
                <Building2 size={18} className="text-primary" />
                Government Exam Configurator
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">পদ, পরীক্ষার সময় ও কীবোর্ড লেআউট নির্ধারণ করে পরীক্ষা শুরু করুন</p>
            </div>
            <Badge variant="outline" className="border-primary text-primary font-black bg-primary/10 text-[10px]">
              Target: {requiredWpm} WPM • {requiredAcc}% Acc
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* Section 1: Job Post Cards (3 Ministry Presets + 1 Custom Preset) */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
              <span>১. লক্ষ্যভিত্তিক পদ নির্বাচন করুন:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GOVT_POSTS.map((post) => {
                const isSelected = selectedPost.id === post.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`cursor-pointer transition-all rounded-xl border p-4 flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "border-foreground ring-2 ring-foreground bg-secondary shadow-xs"
                        : "border-border bg-card hover:border-foreground/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-border text-foreground font-bold text-[10px] bg-background">
                        {post.badge}
                      </Badge>
                      {isSelected && <CheckCircle2 size={18} className="text-foreground shrink-0" />}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-foreground flex items-center gap-1.5">
                        {post.id === "custom" && <Settings size={14} className="text-primary" />}
                        {post.titleBn}
                      </h3>
                      <div className="text-[10px] font-bold text-muted-foreground">{post.title}</div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed pt-1 line-clamp-2">{post.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-border space-y-1 text-[11px] font-bold">
                      {post.id === "custom" ? (
                        <div className="flex justify-between text-foreground">
                          <span className="text-muted-foreground">🎯 কাস্টম লক্ষ্য</span>
                          <span>{customWpmGoal} WPM</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between text-foreground">
                            <span className="text-muted-foreground">🇧🇩 বাংলা লক্ষ্য</span>
                            <span>{post.wpmBn} WPM</span>
                          </div>
                          <div className="flex justify-between text-foreground">
                            <span className="text-muted-foreground">🇺🇸 ইংরেজি লক্ষ্য</span>
                            <span>{post.wpmEn} WPM</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between text-foreground">
                        <span className="text-muted-foreground">🎯 নির্ভুলতা পাশ মার্ক</span>
                        <span>{post.minAcc}% Accuracy</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 1B: Custom WPM Goal Input (Rendered only when Custom Preset is selected) */}
          {isCustomPost && (
            <div className="p-4 rounded-xl bg-secondary/40 border border-border space-y-3 fade-in">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                  <Target size={14} className="text-primary" />
                  কাস্টম টার্গেট স্পিড নির্ধারণ করুন (Custom Target WPM):
                </label>
                <Badge variant="outline" className="border-border text-foreground font-bold bg-background text-xs">
                  Selected Goal: {customWpmGoal} WPM
                </Badge>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                {[20, 25, 30, 35, 40, 45, 50, 60].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setCustomWpmGoal(goal)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      customWpmGoal === goal
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {goal} WPM
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Timer Duration */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              <h4 className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
                <Clock size={14} className="text-primary" />
                ২. পরীক্ষার সময় নির্বাচন করুন (Exam Timer):
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">সরকারি নিয়োগ পরীক্ষায় সাধারণত ৫ বা ১০ মিনিটের সময় দেওয়া হয়</p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {[
                { sec: 60, label: "১ মিনিট" },
                { sec: 180, label: "৩ মিনিট" },
                { sec: 300, label: "৫ মিনিট (Standard)" },
                { sec: 600, label: "১০ মিনিট (Extended)" },
                { sec: 900, label: "১৫ মিনিট" },
              ].map((t) => (
                <button
                  key={t.sec}
                  onClick={() => setSelectedDurationSec(t.sec)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                    selectedDurationSec === t.sec
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Keyboard Layout */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              <h4 className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
                <Keyboard size={14} className="text-primary" />
                ৩. কীবোর্ড লেআউট নির্বাচন করুন (Keyboard Layout):
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">আপনার কীবোর্ড ম্যাপিং বেছে নিন</p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {[
                { id: "jatiya", label: "জাতীয় কীবোর্ড (Jatiya BCC)", note: "সরকারি মানদণ্ড" },
                { id: "unibijoy", label: "ইউনিবিজয় (UniBijoy 52)", note: "প্রচলিত" },
                { id: "english", label: "English QWERTY", note: null },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLayout(tab.id as KeyboardLayout)}
                  title={tab.note || undefined}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                    activeLayout === tab.id
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}{tab.note && <span className="ml-1 text-[9px] opacity-70">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3.5: Authentic Past Question Bank */}
          <div className="border-t border-border pt-6 space-y-3">
            <h4 className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
              <FileText size={14} className="text-emerald-500" />
              ৪. বিগত বছরের প্রশ্ন ব্যাংক (Authentic Govt Past Question Bank):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: "govt-sec-2024", title: "বাংলাদেশ সচিবালয় ২০২৪", dept: "সচিবালয় ও ক্যাবিনেট" },
                { id: "govt-bb-2024", title: "বাংলাদেশ ব্যাংক ২০২৪", dept: "বাংলাদেশ ব্যাংক" },
                { id: "govt-nsi-2023", title: "NSI ফিল্ড অফিসার ২০২৩", dept: "জাতীয় নিরাপত্তা গোয়েন্দা" },
                { id: "govt-nbr-2023", title: "NBR কাস্টমস ২০২৩", dept: "জাতীয় রাজস্ব বোর্ড" },
                { id: "govt-jud-2024", title: "সুপ্রিম কোর্ট ২০২৪", dept: "বিচারালয় ও আইন মন্ত্রণালয়" },
                { id: "govt-edu-2024", title: "শিক্ষা অধিদপ্তর ২০২৪", dept: "প্রাথমিক ও মাধ্যমিক শিক্ষা" },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={handleStartExam}
                  className="p-3 rounded-xl border border-border bg-card hover:border-foreground/40 cursor-pointer transition-all flex flex-col justify-between space-y-1 shadow-xs opacity-80 hover:opacity-100"
                  title="শীঘ্রই আসছে — বিগত বছরের আসল প্রশ্ন। এখন ক্লিক করলে স্ট্যান্ডার্ড পরীক্ষা শুরু হবে।"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground line-clamp-1">{item.title}</span>
                    <Badge variant="outline" className="text-[9px] font-bold border-amber-500/40 text-amber-600 dark:text-amber-400">শীঘ্রই</Badge>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{item.dept}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Info size={10} />
              বিগত বছরের আসল প্রশ্নপত্র শীঘ্রই যোগ করা হবে। এখন ক্লিক করলে নির্বাচিত কনফিগারেশনে পরীক্ষা শুরু হবে।
            </p>
          </div>

          {/* Section 4: SINGLE UNIFIED PRIMARY CTA BUTTON */}
          <div className="border-t border-border pt-6 text-center">
            <Button
              size="lg"
              onClick={handleStartExam}
              className="w-full sm:w-auto px-12 font-black text-sm gap-2 h-12 shadow-sm rounded-xl"
            >
              <Play size={16} /> Start Government Exam Arena →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Collapsible FAQ */}
      <div className="border border-border rounded-xl overflow-hidden bg-card shadow-xs">
        <button
          onClick={() => setFaqOpen(!faqOpen)}
          className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-secondary transition-colors text-left"
        >
          <span className="text-xs font-extrabold text-foreground flex items-center gap-2">
            <Info size={15} className="text-foreground" />
            সাধারণ জিজ্ঞাসাবলী (Govt Exam FAQ)
          </span>
          {faqOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {faqOpen && (
          <div className="p-4 space-y-3 border-t border-border bg-secondary/50">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-border pb-2.5 last:border-0 last:pb-0">
                <h4 className="text-xs font-bold text-foreground mb-0.5">{item.q}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
