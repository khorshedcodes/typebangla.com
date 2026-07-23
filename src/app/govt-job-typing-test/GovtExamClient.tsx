"use client";

import React, { useState } from "react";
import {
  Award, Clock, ShieldCheck, Building2, ChevronDown, ChevronUp,
  Keyboard, FileText, Info, Download
} from "lucide-react";
import ExamCenter from "../../components/ExamCenter";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const REQUIREMENTS = [
  {
    icon: Building2,
    color: "emerald",
    title: "কম্পিউটার অপারেটর পদ",
    body: "বাংলায় সর্বনিম্ন ৩০ WPM এবং ইংরেজিতে ৩৫ WPM গতি আবশ্যক।",
  },
  {
    icon: Keyboard,
    color: "blue",
    title: "কোন লেআউট শিখবেন?",
    body: "সরকারি পরীক্ষায় জাতীয় (Jatiya) অথবা ইউনিবিজয় (UniBijoy) লেআউট প্রচলিত।",
  },
  {
    icon: Award,
    color: "amber",
    title: "ইনস্ট্যান্ট সার্টিফিকেট",
    body: "পরীক্ষা শেষে WPM, নির্ভুলতা সহ ডিজিটাল সার্টিফিকেট ডাউনলোড করুন।",
  },
];

const PASSAGES = [
  {
    label: "বাংলাদেশ ব্যাংক অপারেটর — ৩০ WPM",
    color: "emerald",
    text: "বাংলাদেশের অর্থনৈতিক অগ্রগতি এবং ডিজিটাল ব্যাংক ব্যবস্থার প্রসার গ্রামীণ জীবনযাত্রায় অভূতপূর্ব পরিবর্তন এনেছে। ক্যাশলেস লেনদেন এবং মোবাইল ব্যাংকিং সেবা সাধারণ মানুষের কাছে পৌঁছে গেছে।",
    filename: "bangladesh-bank-typing-passage.txt",
  },
  {
    label: "মন্ত্রণালয় কম্পিউটার অপারেটর — ২৮ WPM",
    color: "amber",
    text: "তথ্যপ্রযুক্তির আধুনিক যুগে সরকারি সেবাসমূহ জনগণের দোড়গোড়ায় পৌঁছে দিতে ই-গভর্নেন্স গুরুত্বপূর্ণ ভূমিকা রাখছে। ডিজিটাল বাংলাদেশ থেকে স্মার্ট বাংলাদেশ গঠনে নাগরিক সেবার আধুনিকায়ন ত্বরান্বিত হচ্ছে।",
    filename: "ministry-typing-passage.txt",
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

function downloadPassage(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function GovtExamClient() {
  const [faqOpen, setFaqOpen] = useState(false);
  const [passagesOpen, setPassagesOpen] = useState(false);

  return (
    <div className="space-y-6 pb-16 fade-in">

      {/* ── HERO BANNER ── */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <Building2 size={260} />
        </div>
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
            <ShieldCheck size={13} className="text-amber-300" />
            <span>বাংলাদেশ সরকারি পরীক্ষার মান অনুযায়ী</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            সরকারি চাকরির টাইপিং টেস্ট
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed">
            বাংলাদেশ ব্যাংক, বিসিএস, মন্ত্রণালয় ও সরকারি দপ্তরের কম্পিউটার অপারেটর পদের জন্য
            — লক্ষ্য <strong>৩০ WPM বাংলা</strong> ও <strong>৩৫ WPM ইংরেজি</strong>।
          </p>
          <div className="flex flex-wrap gap-3 pt-1 text-xs">
            <div className="bg-white/15 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/10">
              <Clock size={14} className="text-amber-300" />
              <span>সময়: ১ / ৫ / ১০ মিনিট</span>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/10">
              <Award size={14} className="text-emerald-300" />
              <span>পাস মার্ক: ৩০ WPM, ৯৫% নির্ভুলতা</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3 INFO CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {REQUIREMENTS.map((r) => {
          const Icon = r.icon;
          const colors: Record<string, string> = {
            emerald: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900",
            blue: "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900",
            amber: "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900",
          };
          const iconColors: Record<string, string> = {
            emerald: "bg-emerald-600", blue: "bg-blue-600", amber: "bg-amber-600",
          };
          return (
            <Card key={r.title} className={`border ${colors[r.color]}`}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`p-2 rounded-lg ${iconColors[r.color]} text-white shrink-0`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">{r.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.body}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── MAIN EXAM WIZARD ── */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <FileText size={17} className="text-emerald-600" />
            পরীক্ষা শুরু করুন — ৩টি ধাপ অনুসরণ করুন
          </h2>
        </div>
        <ExamCenter />
      </div>

      {/* ── DOWNLOADABLE PASSAGES (COLLAPSIBLE) ── */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => setPassagesOpen(!passagesOpen)}
          className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-accent/50 transition-colors text-left"
        >
          <span className="text-sm font-bold text-foreground flex items-center gap-2">
            <Download size={16} className="text-indigo-500" />
            নমুনা পরীক্ষার অনুচ্ছেদ ডাউনলোড করুন
          </span>
          {passagesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {passagesOpen && (
          <div className="px-5 pb-5 pt-1 bg-slate-900 space-y-3">
            <p className="text-xs text-slate-400 pb-2">
              বাংলাদেশ ব্যাংক ও মন্ত্রণালয়ের বিগত বছরের নমুনা অনুচ্ছেদ:
            </p>
            {PASSAGES.map((p) => (
              <div key={p.filename} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold text-${p.color}-400`}>{p.label}</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2 italic">&ldquo;{p.text.slice(0, 90)}...&rdquo;</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadPassage(p.text, p.filename)}
                  className="w-full text-xs h-8 bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white gap-1.5"
                >
                  <Download size={12} />
                  ডাউনলোড (.TXT)
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FAQ (COLLAPSIBLE) ── */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => setFaqOpen(!faqOpen)}
          className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-accent/50 transition-colors text-left"
        >
          <span className="text-sm font-bold text-foreground flex items-center gap-2">
            <Info size={16} className="text-zinc-500" />
            সাধারণ জিজ্ঞাসাবলী (FAQ)
          </span>
          {faqOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {faqOpen && (
          <div className="px-5 pb-5 pt-1 bg-card space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <h4 className="text-xs font-bold text-foreground mb-1">{item.q}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
