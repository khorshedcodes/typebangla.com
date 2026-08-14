"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, Trophy, Lock } from "lucide-react";
import { useTypingStore, KeyboardLayout } from "../../../store/typingStore";
import { getRandomPassage, getPassageForDuration, PassageLanguage } from "../../../utils/lessons/exam/examPassages";
import ExamCenter from "../../../components/ExamCenter";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

interface SlugMeta {
  slug: string;
  title: string;
  titleBn: string;
  duration: number;
  layout?: KeyboardLayout;
  lang: PassageLanguage;
}

const SLUG_METAS: Record<string, SlugMeta> = {
  "1min": {
    slug: "1min",
    title: "1-Minute Speed Test",
    titleBn: "১ মিনিট স্পিড টেস্ট",
    duration: 60,
    lang: "bangla",
  },
  "3min": {
    slug: "3min",
    title: "3-Minutes Endurance Test",
    titleBn: "৩ মিনিট সহনশীলতা পরীক্ষা",
    duration: 180,
    lang: "english",
    layout: "english",
  },
  "5min": {
    slug: "5min",
    title: "5-Minutes Official Speed Test",
    titleBn: "৫ মিনিট অফিসিয়াল গতি পরীক্ষা",
    duration: 300,
    lang: "bangla",
  },
  "avro": {
    slug: "avro",
    title: "Avro Phonetic Bangla Test",
    titleBn: "অভ্র ফোনেটিক গতি পরীক্ষা",
    duration: 60,
    lang: "bangla",
    layout: "avro",
  },
  "unibijoy": {
    slug: "unibijoy",
    title: "UniBijoy 52 Bangla Test",
    titleBn: "ইউনিবিজয় ৫২ গতি পরীক্ষা",
    duration: 60,
    lang: "bangla",
    layout: "unibijoy",
  },
  "english": {
    slug: "english",
    title: "English QWERTY Speed Test",
    titleBn: "ইংরেজি কীবোর্ড গতি পরীক্ষা",
    duration: 60,
    lang: "english",
    layout: "english",
  },
  "govt": {
    slug: "govt",
    title: "Jatiya BCC Govt Job Exam Simulator",
    titleBn: "সরকারি চাকরির টাইপিং পরীক্ষা সিমুলেটর",
    duration: 300,
    lang: "bangla",
    layout: "jatiya",
  },
};

export default function TestSlugClient({ testSlug }: { testSlug: string }) {
  const meta = SLUG_METAS[testSlug] || SLUG_METAS["1min"];
  const { setSelectedDuration, setActiveLayout, setTargetText } = useTypingStore();

  useEffect(() => {
    setSelectedDuration(meta.duration);
    if (meta.layout) {
      setActiveLayout(meta.layout);
    }
    const passage = getPassageForDuration(meta.lang, meta.duration);
    setTargetText(passage.text);
  }, [meta, setSelectedDuration, setActiveLayout, setTargetText]);

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 fade-in text-foreground">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link href="/tests">
          <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5 border-border cursor-pointer hover:bg-secondary">
            <ArrowLeft size={14} /> Try Another Test
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          {meta.layout && (
            <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary flex items-center gap-1.5">
              <Lock size={12} />
              <span>Layout Locked: <strong>{meta.layout.toUpperCase()}</strong></span>
            </Badge>
          )}
          <Badge variant="outline" className="border-border text-foreground font-bold bg-secondary flex items-center gap-1.5">
            <Clock size={12} />
            <span>Duration: <strong>{meta.duration}s</strong></span>
          </Badge>
        </div>
      </div>

      {/* Exam Center Launcher */}
      <ExamCenter />
    </main>
  );
}
