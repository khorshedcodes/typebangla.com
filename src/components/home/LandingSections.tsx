"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// ── HERO TYPEWRITER ANIMATION ──────────────────────────────────────────────
const HERO_TEXTS = [
  "বাংলাদেশ আমার প্রিয় মাতৃভূমি",
  "আমার সোনার বাংলা, আমি তোমায় ভালোবাসি",
  "সহজে শিখুন অভ্র, ইউনিবিজয় ও জাতীয় কিবোর্ড",
];

export function HeroTypewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = HERO_TEXTS[index];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < target.length) {
          setDisplayed(target.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setIsDeleting(false);
          setIndex((i) => (i + 1) % HERO_TEXTS.length);
        }
      }
    }, isDeleting ? 30 : 75);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, index]);

  return (
    <div className="border border-border bg-card/60 backdrop-blur-xs rounded-xl p-4 shadow-xs max-w-[500px] mx-auto flex items-center justify-center h-[64px]">
      <span className="font-bangla text-lg sm:text-xl font-bold text-foreground">{displayed}</span>
      <span className="inline-block w-[2.5px] h-[1.2em] bg-foreground ml-2 animate-pulse rounded-full" />
    </div>
  );
}

// ── GOVT SPEED GAUGE WIDGET ────────────────────────────────────────────────
export function GovtSpeedGaugeWidget() {
  const [userWpm, setUserWpm] = useState(35);

  let statusBadge = { label: "🔴 शिक्षানবিস (Improvement Needed)", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
  if (userWpm >= 40) {
    statusBadge = { label: "🟢 শ্রেষ্ঠ স্পিড (Fully Qualified for both Bangla & English Govt Operator)", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
  } else if (userWpm >= 30) {
    statusBadge = { label: "🟡 যোগ্য (Qualified for Bangla Govt Exam)", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
  }

  return (
    <div className="p-5 sm:p-6 bg-secondary/50 backdrop-blur-md rounded-xl border border-border space-y-4 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-foreground">আপনার বর্তমান স্পিড টেস্ট সিমুলেটর:</span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusBadge.color}`}>
          {statusBadge.label}
        </span>
      </div>

      {/* Slider Control */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono font-bold text-muted-foreground">
          <span>0 WPM</span>
          <span className="text-foreground text-sm font-black">{userWpm} WPM</span>
          <span>80 WPM</span>
        </div>
        <input
          type="range"
          min="0"
          max="80"
          value={userWpm}
          onChange={(e) => setUserWpm(Number(e.target.value))}
          className="w-full accent-primary h-2 bg-secondary rounded-lg cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
        <div className="p-3 bg-card rounded-lg border border-border">
          <span className="text-muted-foreground block text-[10px]">বাংলা সরকারি রিকোয়ারমেন্ট</span>
          <span className="font-extrabold text-foreground text-sm">৩০ WPM</span>
          <span className="block text-[10px] text-muted-foreground">{userWpm >= 30 ? "✓ অর্জিত" : "❌ বাকি আছে"}</span>
        </div>
        <div className="p-3 bg-card rounded-lg border border-border">
          <span className="text-muted-foreground block text-[10px]">ইংরেজি সরকারি রিকোয়ারমেন্ট</span>
          <span className="font-extrabold text-foreground text-sm">৪০ WPM</span>
          <span className="block text-[10px] text-muted-foreground">{userWpm >= 40 ? "✓ অর্জিত" : "❌ বাকি আছে"}</span>
        </div>
        <div className="p-3 bg-card rounded-lg border border-border">
          <span className="text-muted-foreground block text-[10px]">নূন্যতম নির্ভুলতা (Accuracy)</span>
          <span className="font-extrabold text-foreground text-sm">৮৫%+</span>
          <span className="block text-[10px] text-muted-foreground">যাচাইকৃত সনদ মানদণ্ড</span>
        </div>
      </div>
    </div>
  );
}

// ── FAQ ACCORDION ITEM ───────────────────────────────────────────────────
export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden transition-all shadow-xs">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-foreground hover:bg-secondary transition-colors"
      >
        <span>{question}</span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180 text-foreground" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border">
          {answer}
        </div>
      )}
    </div>
  );
}
