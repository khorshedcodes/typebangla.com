"use client";

import React, { useState, useEffect } from "react";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import TypingArea from "../../../components/TypingArea";
import VirtualKeyboard from "../../../components/VirtualKeyboard";
import { Quote, Sparkles, BookOpen, User, Feather, Bookmark } from "lucide-react";
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
    text: "রক্ত যখন দিয়েছি, রক্ত আরো দেব। এ দেশের মানুষকে মুক্ত করে ছাড়ব ইনশাল্লাহ। এবারের সংগ্রাম আমাদের মুক্তির সংগ্রাম, এবারের সংগ্রাম স্বাধীনতার সংগ্রাম।"
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

export default function QuotesClient() {
  const { activeLayout, setActiveLayout, setTargetText, resetTest } = useTypingStore();
  const [selectedQuote, setSelectedQuote] = useState<LiteraryQuote>(LITERARY_QUOTES[0]);

  const selectQuote = (quote: LiteraryQuote) => {
    setSelectedQuote(quote);
    setTargetText(quote.text);
    resetTest();
  };

  useEffect(() => {
    setTargetText(selectedQuote.text);
    resetTest();
  }, [selectedQuote, activeLayout]);

  return (
    <div className="space-y-6">
      {/* Quote Selection Grid */}
      <Card className="border border-border bg-card p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2">
            <Quote size={16} className="text-purple-600" />
            <span>১. সাহিত্য অনুচ্ছেদ ও বিখ্যাত উক্তি নির্বাচন করুন:</span>
          </h2>
          <Badge variant="outline" className="border-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-950/40 text-xs font-bold">
            {selectedQuote.authorBn}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LITERARY_QUOTES.map((q) => (
            <button
              key={q.id}
              onClick={() => selectQuote(q)}
              className={cn(
                "p-4 rounded-xl text-left border transition-all space-y-1.5",
                selectedQuote.id === q.id
                  ? "bg-purple-500/10 border-purple-500 text-foreground shadow-xs ring-1 ring-purple-500"
                  : "border-border bg-secondary hover:border-foreground/40 text-muted-foreground"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-purple-600 uppercase tracking-wider">{q.authorBn}</span>
                <Feather size={12} className="text-purple-500" />
              </div>
              <h3 className="text-xs font-bold text-foreground line-clamp-1">{q.title}</h3>
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{q.text}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Typing Area */}
      <TypingArea />

      {/* Keyboard Selector & Visual Keyboard */}
      <div className="pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-foreground tracking-wider">
            কিবোর্ড লেআউট পরিবর্তন করুন:
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
