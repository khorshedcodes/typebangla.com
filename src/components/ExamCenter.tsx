"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTypingStore, KeyboardLayout } from "../store/typingStore";
import { Award, Clock, FileText, Shuffle, Play, CheckCircle2, Lock, Sparkles, RotateCcw, Trophy, ArrowRight } from "lucide-react";
import {
  ALL_EXAM_PASSAGES,
  ExamPassage,
  PassageLanguage,
  getRandomPassage,
  getPassageForDuration,
} from "../utils/lessons/exam/examPassages";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import TypingArea from "./TypingArea";

const DURATION_OPTIONS = [
  { sec: 60,  label: "১ মিনিট",  labelEn: "1 Min",  desc: "দ্রুত মূল্যায়ন" },
  { sec: 180, label: "৩ মিনিট",  labelEn: "3 Min",  desc: "মাঝারি টেস্ট" },
  { sec: 300, label: "৫ মিনিট",  labelEn: "5 Min",  desc: "সরকারি পরীক্ষার মান" },
  { sec: 600, label: "১০ মিনিট", labelEn: "10 Min", desc: "পূর্ণাঙ্গ চাকরির পরীক্ষা" },
];

const LANG_OPTIONS: { id: PassageLanguage | "all"; label: string }[] = [
  { id: "all",     label: "সব (All)" },
  { id: "bangla",  label: "বাংলা" },
  { id: "english", label: "English" },
];

function ExamCenterContent() {
  const searchParams = useSearchParams();
  const {
    selectedDuration, setSelectedDuration,
    setTargetText, targetText,
    history, activeLayout, setActiveLayout,
  } = useTypingStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [langFilter, setLangFilter] = useState<PassageLanguage | "all">("bangla");
  const [selectedPassage, setSelectedPassage] = useState<ExamPassage | null>(null);

  // Auto-detect URL query params from Test Cards launch
  useEffect(() => {
    const lang = searchParams.get("lang");
    const layout = searchParams.get("layout");
    const duration = searchParams.get("duration");

    if (!lang && !layout && !duration) return;

    let targetLang: PassageLanguage = "bangla";

    if (lang === "en" || lang === "english") {
      targetLang = "english";
      setLangFilter("english");
    } else if (lang === "bn" || lang === "bangla") {
      targetLang = "bangla";
      setLangFilter("bangla");
    }

    if (layout) {
      setActiveLayout(layout as KeyboardLayout);
    }

    const durSec = duration ? Number(duration) : 60;
    if (duration) {
      setSelectedDuration(durSec);
    }

    // If launched from a test card, pick a random passage for specified duration
    const p = getPassageForDuration(targetLang, durSec);
    setSelectedPassage(p);
    setStep(3);
    setTargetText(p.text);
  }, [searchParams, setActiveLayout, setSelectedDuration, setTargetText]);

  const [authorFilter, setAuthorFilter] = useState<string>("all");

  const filteredPassages = ALL_EXAM_PASSAGES.filter((p) => {
    const matchesLang = langFilter === "all" || p.language === langFilter;
    const matchesAuthor =
      authorFilter === "all" ||
      (authorFilter === "rabindranath" && p.author.includes("রবীন্দ্রনাথ")) ||
      (authorFilter === "nazrul" && p.author.includes("নজরুল")) ||
      (authorFilter === "sukumar" && p.author.includes("সুকুমার")) ||
      (authorFilter === "bankim" && p.author.includes("বঙ্কিম")) ||
      (authorFilter === "saratchandra" && p.author.includes("শরৎচন্দ্র")) ||
      (authorFilter === "humayun" && p.author.includes("হুমায়ূন"));
    return matchesLang && matchesAuthor;
  });

  const handlePickPassage = (p: ExamPassage) => {
    const extendedP = getPassageForDuration(p.language, selectedDuration, p);
    setSelectedPassage(extendedP);
    setStep(3);
  };

  const handleRandom = () => {
    const lang = langFilter === "all" ? undefined : langFilter;
    const p = getPassageForDuration(lang, selectedDuration);
    setSelectedPassage(p);
    setStep(3);
  };

  const handleStartExam = () => {
    if (!selectedPassage) return;
    const extendedP = getPassageForDuration(selectedPassage.language, selectedDuration, selectedPassage);
    setTargetText(extendedP.text);
  };

  const handleNewPassage = () => {
    const lang = langFilter === "all" ? undefined : langFilter;
    const p = getPassageForDuration(lang, selectedDuration);
    setSelectedPassage(p);
    setTargetText(p.text);
  };

  // If targetText is active, render Typing Arena with Top HUD
  if (targetText && targetText.length > 0) {
    return (
      <div className="space-y-6 fade-in">
        {/* Vercel Test HUD Bar */}
        <div className="border border-border bg-card rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary flex items-center gap-1.5 px-3 py-1">
              <Lock size={12} />
              <span>Layout Locked: <strong>{activeLayout.toUpperCase()}</strong></span>
            </Badge>

            <Badge variant="outline" className="border-border text-foreground font-semibold bg-secondary flex items-center gap-1.5 px-3 py-1">
              <Clock size={12} />
              <span>Duration: <strong>{selectedDuration}s</strong></span>
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleNewPassage} className="text-xs font-bold gap-1.5 border-border">
              <Shuffle size={13} /> Change Passage
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTargetText("")} className="text-xs font-bold gap-1.5 border-border">
              <RotateCcw size={13} /> Exit Test
            </Button>
          </div>
        </div>

        {/* Typing Arena */}
        <TypingArea />
      </div>
    );
  }

  return (
    <div className="space-y-5 fade-in">

      {/* STEP INDICATOR */}
      <div className="flex items-center gap-2">
        {[
          { n: 1, label: "ভাষা বেছে নিন" },
          { n: 2, label: "অনুচ্ছেদ বেছে নিন" },
          { n: 3, label: "পরীক্ষা শুরু করুন" },
        ].map((s, i) => (
          <React.Fragment key={s.n}>
            <button
              onClick={() => setStep(s.n as 1 | 2 | 3)}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                step === s.n
                  ? "text-foreground"
                  : step > s.n
                  ? "text-muted-foreground cursor-pointer hover:text-foreground"
                  : "text-muted-foreground/50 cursor-not-allowed"
              }`}
              disabled={step < s.n}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 transition-all ${
                step > s.n
                  ? "bg-primary text-primary-foreground"
                  : step === s.n
                  ? "bg-primary text-primary-foreground ring-2 ring-ring/30"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {step > s.n ? <CheckCircle2 size={14} /> : s.n}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < 2 && (
              <div className={`flex-1 h-0.5 rounded-full transition-colors ${
                step > s.n ? "bg-foreground" : "bg-border"
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* STEP 1: PICK LANGUAGE */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">কোন ভাষায় পরীক্ষা দিতে চান?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setLangFilter(opt.id); setStep(2); }}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border text-sm font-bold transition-all ${
                  langFilter === opt.id
                    ? "border-primary bg-secondary text-foreground ring-1 ring-primary"
                    : "border-border bg-card text-foreground hover:border-foreground/50"
                }`}
              >
                <span className="text-2xl">
                  {opt.id === "bangla" ? "বাংলা" : opt.id === "english" ? "Aa" : "বা+Aa"}
                </span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: PICK PASSAGE */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              একটি অনুচ্ছেদ বেছে নিন
              <span className="ml-2 text-xs font-normal text-muted-foreground">({filteredPassages.length}টি উপলব্ধ)</span>
            </p>
            <Button
              variant="outline" size="sm"
              onClick={handleRandom}
              className="h-8 text-xs gap-1.5 border-border"
            >
              <Shuffle size={13} />
              র‍্যান্ডম বেছে নিন
            </Button>
          </div>

          {/* Author Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "all", label: "সকল লেখক" },
              { id: "rabindranath", label: "রবীন্দ্রনাথ ঠাকুর" },
              { id: "nazrul", label: "কাজী নজরুল ইসলাম" },
              { id: "sukumar", label: "সুকুমার রায়" },
              { id: "bankim", label: "বঙ্কিমচন্দ্র" },
              { id: "saratchandra", label: "শরৎচন্দ্র" },
              { id: "humayun", label: "হুমায়ূন আহমেদ" },
            ].map((author) => (
              <button
                key={author.id}
                onClick={() => setAuthorFilter(author.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  authorFilter === author.id
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {author.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
            {filteredPassages.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePickPassage(p)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all group ${
                  selectedPassage?.id === p.id
                    ? "border-primary bg-secondary ring-1 ring-primary"
                    : "border-border bg-card hover:border-foreground/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-extrabold text-foreground group-hover:underline transition-colors">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{p.author} · {p.source}</p>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-1 italic">
                      &ldquo;{p.text.slice(0, 60)}...&rdquo;
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="outline" className="text-[10px] font-semibold">
                      {p.difficulty === "easy" ? "সহজ" : p.difficulty === "medium" ? "মধ্যম" : "কঠিন"}
                    </Badge>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      {p.language === "bangla" ? "বাংলা" : "English"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: SET TIMER + START */}
      {step === 3 && selectedPassage && (
        <div className="space-y-5">
          <div className="bg-secondary border border-border rounded-xl p-4 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold text-foreground">{selectedPassage.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{selectedPassage.author}</p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="text-[11px] text-foreground hover:underline font-semibold shrink-0"
              >
                পরিবর্তন করুন
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic">
              &ldquo;{selectedPassage.text.slice(0, 120)}...&rdquo;
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Clock size={14} className="text-foreground" />
              পরীক্ষার সময় নির্বাচন করুন
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DURATION_OPTIONS.map((d) => (
                <button
                  key={d.sec}
                  onClick={() => setSelectedDuration(d.sec)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all text-center ${
                    selectedDuration === d.sec
                      ? "border-primary bg-secondary text-foreground ring-1 ring-primary font-bold"
                      : "border-border bg-card text-foreground hover:border-foreground/50"
                  }`}
                >
                  <span className="text-base font-extrabold">{d.label}</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">{d.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleStartExam}
            size="lg"
            className="w-full text-base h-12 rounded-xl gap-3 shadow-sm font-bold"
          >
            <Play size={18} className="fill-primary-foreground" />
            পরীক্ষা শুরু করুন
          </Button>

          <p className="text-center text-[11px] text-muted-foreground">
            প্রথম কী চাপার সাথে সাথে টাইমার শুরু হবে
          </p>

          <div className="border-t border-border pt-4 text-center space-y-2.5">
            <p className="text-[11px] font-medium text-muted-foreground">
              অফিসিয়াল ভেরিফাইড সার্টিফিকেট অর্জন করতে আমাদের জাতীয় প্রতিযোগিতা বা সরকারি পরীক্ষায় অংশ নিন:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Link href="/exam/ranked" className="w-full sm:w-auto">
                <Button size="sm" variant="outline" className="w-full text-xs font-extrabold gap-1.5 border-border">
                  <Trophy size={13} className="text-amber-500" />
                  জাতীয় প্রতিযোগিতা (৩ মিনিট) <ArrowRight size={12} />
                </Button>
              </Link>
              <Link href="/exam/govt" className="w-full sm:w-auto">
                <Button size="sm" variant="secondary" className="w-full text-xs font-bold gap-1.5 border-border">
                  <Award size={13} />
                  সরকারি পরীক্ষা সিমুলেটর
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExamCenter() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-xs text-muted-foreground">Loading Test Arena...</div>}>
      <ExamCenterContent />
    </Suspense>
  );
}
