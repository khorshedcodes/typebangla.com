"use client";

import React, { useState, useEffect } from "react";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { BANGLA_SENTENCES_LEVEL_1, BANGLA_SENTENCES_LEVEL_2, BANGLA_SENTENCES_LEVEL_3 } from "../../../data/banglaSentences";
import { ENGLISH_SENTENCES_LEVEL_1, ENGLISH_SENTENCES_LEVEL_2, ENGLISH_SENTENCES_LEVEL_3 } from "../../../data/englishSentences";
import { FileText, Sparkles, RefreshCw, Layers, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/utils/cn";

export default function SentencesClient() {
  const { activeLayout, setActiveLayout, setTargetText, resetTest } = useTypingStore();
  const [lang, setLang] = useState<"bangla" | "english">("bangla");
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [sentenceCount, setSentenceCount] = useState<number>(10);

  const generateSentenceStream = () => {
    let pool: string[] = [];
    if (lang === "bangla") {
      if (level === 1) pool = BANGLA_SENTENCES_LEVEL_1;
      else if (level === 2) pool = BANGLA_SENTENCES_LEVEL_2;
      else pool = BANGLA_SENTENCES_LEVEL_3;
    } else {
      if (level === 1) pool = ENGLISH_SENTENCES_LEVEL_1;
      else if (level === 2) pool = ENGLISH_SENTENCES_LEVEL_2;
      else pool = ENGLISH_SENTENCES_LEVEL_3;
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, sentenceCount);
    const resultText = selected.join(" ");

    setTargetText(resultText);
    resetTest();
  };

  useEffect(() => {
    generateSentenceStream();
  }, [lang, level, sentenceCount, activeLayout]);

  return (
    <div className="space-y-6">
      {/* Controls Card */}
      <Card className="border border-border bg-card p-6 rounded-2xl shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              <span>১. ভাষার কন্টেন্ট ও কাঠিন্য স্তব নির্বাচন করুন:</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">সম্পূর্ণ বাক্য টাইপ করে স্বাভাবিক ব্যাকরণ, দাড়ি-কমা ও টাইপিং ছন্দ তৈরি করুন</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang("bangla")}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all", lang === "bangla" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-secondary text-muted-foreground")}
            >
              🇧🇩 বাংলা বাক্য
            </button>
            <button
              onClick={() => setLang("english")}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all", lang === "english" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-secondary text-muted-foreground")}
            >
              🇬🇧 English Sentences
            </button>
          </div>
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {[
            { lvl: 1, label: "🟢 লেভেল ১: সহজ বাক্য (৫–১০ শব্দ)", desc: "দৈনন্দিন ছোট বার্তা" },
            { lvl: 2, label: "🟡 লেভেল ২: মধ্যম বাক্য (১১–২০ শব্দ)", desc: "সাহিত্য ও পত্রিকা" },
            { lvl: 3, label: "🔴 লেভেল ৩: কঠিন / সরকারি পরীক্ষা (২১+ শব্দ)", desc: "যুক্তবর্ণ ও প্রশাসনিক ভাষা" },
          ].map((l) => (
            <button
              key={l.lvl}
              onClick={() => setLevel(l.lvl as 1 | 2 | 3)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold border transition-all text-left space-y-0.5",
                level === l.lvl
                  ? "bg-indigo-500/10 border-indigo-500 text-indigo-600 shadow-xs"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <div>{l.label}</div>
              <div className="text-[10px] font-normal text-muted-foreground">{l.desc}</div>
            </button>
          ))}
        </div>

        {/* Sentence Count & Refresh */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">বাক্য সংখ্যা:</span>
            {[5, 10, 15, 25].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setSentenceCount(cnt)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold border transition-all",
                  sentenceCount === cnt
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {cnt} বাক্য
              </button>
            ))}
          </div>

          <Button size="sm" onClick={generateSentenceStream} className="gap-1.5 font-bold text-xs">
            <RefreshCw size={13} />
            <span>নতুন বাক্য লোড করুন</span>
          </Button>
        </div>
      </Card>

      {/* Typing Area */}
      <TypingArea />

      {/* Keyboard Selector & Visual Keyboard */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-foreground tracking-wider">
            কিবোর্ড লেআউট নির্বাচন:
          </h3>
          <Badge variant="outline" className="border-primary text-primary font-bold text-xs uppercase">
            {activeLayout}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "avro", label: "Avro Phonetic" },
            { id: "unibijoy", label: "UniBijoy" },
            { id: "jatiya", label: "Jatiya (BCC)" },
            { id: "probhat", label: "Probhat" },
            { id: "inscript", label: "Inscript" },
            { id: "unicode", label: "Unicode" },
            { id: "english", label: "English QWERTY" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLayout(l.id as KeyboardLayout)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                activeLayout === l.id
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>

        <VirtualKeyboard />
      </div>
    </div>
  );
}
