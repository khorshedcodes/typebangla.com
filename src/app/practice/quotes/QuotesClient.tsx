"use client";

import React, { useState, useEffect } from "react";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { Quote, Sparkles, BookOpen, User, Feather, Bookmark, RefreshCw, Keyboard as KeyboardIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { cn } from "@/utils/cn";

export interface LiteraryQuote {
  id: string;
  author: string;
  authorBn: string;
  category: "tagore" | "nazrul" | "bangabandhu" | "wisdom" | "english-classic";
  title: string;
  text: string;
}

const LITERARY_QUOTES: LiteraryQuote[] = [
  {
    id: "q-tagore-1",
    author: "Rabindranath Tagore",
    authorBn: "রবীন্দ্রনাথ ঠাকুর",
    category: "tagore",
    title: "গীতাঞ্জলি ও অনবদ্য বাণী",
    text: "চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির, জ্ঞান যেথা মুক্ত, যেথা গৃহের প্রাচীর আপন প্রাঙ্গণতলে দিবসশর্বরী বসুধারে রাখে নাই খণ্ড ক্ষুদ্র করি।"
  },
  {
    id: "q-tagore-2",
    author: "Rabindranath Tagore",
    authorBn: "রবীন্দ্রনাথ ঠাকুর",
    category: "tagore",
    title: "বলাই ও প্রকৃতির বার্তা",
    text: "মানুষের মনের মধ্যে প্রকৃতি যে আনন্দের সুর বাজায়, তাহাই সাহিত্যের ভাষা। সৌন্দর্য ও সত্যের উপাসনাই মানবজীবনের পরম সার্থকতা।"
  },
  {
    id: "q-nazrul-1",
    author: "Kazi Nazrul Islam",
    authorBn: "কাজী নজরুল ইসলাম",
    category: "nazrul",
    title: "বিদ্রোহী ও সাম্যবাদী",
    text: "মহা-বিদ্রোহী রণ-শ্রান্ত, আমি সেই দিন হব শান্ত, যবে উৎপীড়িতের ক্রন্দন-রোল আকাশে বাতাসে ধ্বনিবে না, অত্যাচারীর খড়গ কৃপাণ ভীম রণ-ভূমে রণিবে না।"
  },
  {
    id: "q-nazrul-2",
    author: "Kazi Nazrul Islam",
    authorBn: "কাজী নজরুল ইসলাম",
    category: "nazrul",
    title: "সাম্যবাদের মহিমা",
    text: "গাহি সাম্যের গান— যেখানে আসিয়া এক হয়ে গেছে সব বাধা-ব্যবধান, যেখানে মিশেছে হিন্দু-বৌদ্ধ-মুসলিম-খ্রিস্টান।"
  },
  {
    id: "q-banga-1",
    author: "Bangabandhu Sheikh Mujibur Rahman",
    authorBn: "বঙ্গবন্ধু শেখ মুজিবুর রহমান",
    category: "bangabandhu",
    title: "৭ই মার্চের ঐতিহাসিক ভাষণ",
    text: "এবারের সংগ্রাম আমাদের মুক্তির সংগ্রাম, এবারের সংগ্রাম স্বাধীনতার সংগ্রাম! রক্ত যখন দিয়েছি, রক্ত আরো দেব, এই দেশের মানুষকে মুক্ত করে ছাড়ব ইনশাল্লাহ!"
  },
  {
    id: "q-wisdom-1",
    author: "World Wisdom",
    authorBn: "বিশ্বের অনুপ্রেরণাদায়ক উক্তি",
    category: "wisdom",
    title: "ধৈর্য ও একগ্রতা",
    text: "সফলতা হলো প্রতিনিয়ত ছোট ছোট প্রচেষ্টার সমষ্টি, যা প্রতিদিন পুনরাবৃত্তি করা হয়। ধৈর্য ও একগ্রতাই উন্নতির মূল ভিত্তি।"
  },
  {
    id: "q-eng-1",
    author: "Shakespeare & English Classics",
    authorBn: "উইলিয়াম শেক্সপিয়ার",
    category: "english-classic",
    title: "Hamlet Soliloquy",
    text: "To be, or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles."
  }
];

const BANGLA_LAYOUTS = [
  { id: "avro",     label: "Avro Phonetic (অভ্র)" },
  { id: "unibijoy", label: "UniBijoy (ইউনিবিজয়)" },
  { id: "jatiya",   label: "Jatiya BCC (জাতীয়)" },
  { id: "probhat",  label: "Probhat (প্রভাত)" },
  { id: "inscript", label: "Inscript (ইনস্ক্রিপ্ট)" },
  { id: "unicode",  label: "Unicode (ইউনিকোড)" },
];

const ENGLISH_LAYOUTS = [
  { id: "english",  label: "English QWERTY" },
];

export default function QuotesClient() {
  const {
    activeLayout,
    setActiveLayout,
    setSelectedDuration,
    setTargetText,
    resetTest,
    targetText,
    typedText
  } = useTypingStore();

  const [selectedQuote, setSelectedQuote] = useState<LiteraryQuote | null>(null);
  const [showSelector, setShowSelector] = useState<boolean>(true);

  const isEnglishQuote = selectedQuote?.category === "english-classic";

  const handleSelectQuote = (q: LiteraryQuote) => {
    setSelectedQuote(q);
    setSelectedDuration(0); // Untimed Literary Quote Practice
    if (q.category === "english-classic") {
      setActiveLayout("english");
    } else if (activeLayout === "english") {
      setActiveLayout("avro");
    }
    setTargetText(q.text);
    resetTest();
    setShowSelector(false); // Hide selector cards upon picking quote
  };

  useEffect(() => {
    if (selectedQuote) {
      setTargetText(selectedQuote.text);
      resetTest();
    }
  }, [selectedQuote, activeLayout]);

  const currentAvailableLayouts = isEnglishQuote ? ENGLISH_LAYOUTS : BANGLA_LAYOUTS;
  const nextTargetChar = targetText ? targetText[typedText.length] || "" : "";

  return (
    <div className="space-y-6">
      {/* ── PHASE 1: Quote Selection Grid ── */}
      {showSelector ? (
        <Card className="border-2 border-primary/40 bg-card p-6 rounded-3xl shadow-lg space-y-6 fade-in">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="space-y-1">
              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold">
                LITERATURE SELECTION PHASE
              </Badge>
              <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                <Quote size={20} className="text-primary" />
                <span>অনবদ্য বাংলা ও ইংরেজি সাহিত্য উক্তি নির্বাচন করুন:</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LITERARY_QUOTES.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSelectQuote(q)}
                className="p-5 rounded-2xl text-left border border-border bg-secondary/50 hover:border-primary hover:bg-primary/5 transition-all space-y-2.5 cursor-pointer group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-primary uppercase tracking-wider">{q.authorBn}</span>
                  <Feather size={14} className="text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{q.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-bangla">{q.text}</p>
                <div className="pt-2 text-[11px] font-bold text-primary flex items-center gap-1">
                  <span>অনুশীলন শুরু করুন ➔</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      ) : (
        /* ── PHASE 2: Practice Arena & Quote Switch Bar ── */
        <div className="space-y-6 fade-in">
          {/* Quote Header Bar & Change Button */}
          <Card className="rounded-2xl border border-border bg-card shadow-xs p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-bold">
                  {selectedQuote?.authorBn}
                </Badge>
                <span className="text-xs font-black text-foreground">{selectedQuote?.title}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 italic font-bangla max-w-xl">
                &quot;{selectedQuote?.text}&quot;
              </p>
            </div>

            <Button
              onClick={() => setShowSelector(true)}
              className="font-bold text-xs gap-2 h-10 px-4 bg-primary text-primary-foreground shadow-sm cursor-pointer shrink-0"
            >
              <BookOpen size={15} />
              <span>📚 নতুন সাহিত্য নির্বাচন করুন</span>
            </Button>
          </Card>

          {/* Typing Engine Arena */}
          <TypingArea hideModeHeader={true} />

          {/* Virtual Keyboard & Target Key Highlight */}
          <Card className="rounded-2xl border border-border bg-card shadow-xs p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
              <div className="flex items-center gap-2 text-foreground">
                <KeyboardIcon size={18} className="text-primary" />
                <span className="text-xs sm:text-sm font-black text-foreground">অন-স্ক্রিন কীবোর্ড গাইড (Virtual Keyboard Guide)</span>
              </div>

              {/* Language-Aware Layout Selection Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-muted-foreground uppercase mr-1">লেআউট:</span>
                {currentAvailableLayouts.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveLayout(l.id as KeyboardLayout)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border cursor-pointer",
                      activeLayout === l.id
                        ? "bg-primary text-primary-foreground border-primary shadow-xs font-black"
                        : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Next Key Hint Display */}
            {nextTargetChar && (
              <div className="bg-primary/10 border border-primary/20 p-2.5 rounded-xl text-xs font-bold text-primary flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="animate-pulse" />
                  <span>পরবর্তী বর্ণ (Target Key): <code className="bg-background text-foreground px-2 py-0.5 rounded border border-border font-bangla text-sm font-black">{nextTargetChar === " " ? "Spacebar (স্পেস)" : nextTargetChar}</code></span>
                </span>
                <span className="text-[10px] text-muted-foreground font-mono uppercase">Highlight Enabled</span>
              </div>
            )}

            <VirtualKeyboard activeLayout={activeLayout} nextChar={nextTargetChar} />
          </Card>
        </div>
      )}
    </div>
  );
}
