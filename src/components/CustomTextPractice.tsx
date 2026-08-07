"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText, Play, RefreshCw, FileUp, Sparkle, Clock, Keyboard,
  Target, ShieldCheck, CheckCircle2, Building2
} from "lucide-react";
import { useTypingStore, KeyboardLayout } from "../store/typingStore";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function CustomTextPractice() {
  const router = useRouter();
  const { activeLayout, setActiveLayout } = useTypingStore();

  const [rawText, setRawText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedDurationSec, setSelectedDurationSec] = useState<number>(300); // 5 Min default
  const [targetWpmGoal, setTargetWpmGoal] = useState<number>(30); // 30 WPM default

  const charCount = rawText.trim().length;
  const isTooShort = charCount > 0 && charCount < 50;
  const isWarningShort = charCount >= 50 && charCount < 200 && selectedDurationSec >= 180;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleStartPractice = () => {
    if (!rawText.trim()) return;

    if (typeof window !== "undefined") {
      sessionStorage.setItem("typemaster_custom_text", rawText.trim());
      sessionStorage.setItem("typemaster_custom_wpm_goal", targetWpmGoal.toString());
    }

    router.push(`/practice/custom/test?duration=${selectedDurationSec}&layout=${activeLayout}&goal=${targetWpmGoal}`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-foreground fade-in">
      {/* Hero Banner */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden bg-grid-pattern">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-border text-foreground text-xs font-bold">
            <Sparkle size={14} className="text-primary" />
            <span>CUSTOM DOCUMENT PRACTICE ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Custom Text & Document Practice Setup Portal
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl leading-relaxed">
            Upload your own text files (.txt) or paste custom Bangla/English passages to practice typing with real-time speed telemetry, accuracy, and custom target goals.
          </p>
        </div>
      </div>

      {/* Unified Custom Configurator Card */}
      <Card className="border border-border shadow-xs rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border pb-4 bg-secondary/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-black text-foreground flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                Custom Document Configurator
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">টেক্সট বা ফাইল আপলোড করে পরীক্ষার সময় ও টার্গেট নির্ধারণ করুন</p>
            </div>
            <Badge variant="outline" className="border-primary text-primary font-black bg-primary/10 text-[10px]">
              Goal: {targetWpmGoal} WPM
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-8">
          {/* Section 1: File Drop / Select Area */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
              <span>১. টেক্সট ফাইল আপলোড বা সরাসরি পেস্ট করুন:</span>
            </label>

            <div className="border-2 border-dashed border-border hover:border-foreground/50 rounded-xl p-6 text-center transition-colors bg-secondary/50">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                id="file-upload-input"
                className="hidden"
              />
              <label
                htmlFor="file-upload-input"
                className="cursor-pointer space-y-2 inline-block"
              >
                <div className="w-10 h-10 rounded-full bg-card text-foreground mx-auto flex items-center justify-center border border-border shadow-xs">
                  <FileUp size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    Click to upload a text file (.txt)
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {fileName ? `Selected File: ${fileName}` : "Articles, government notices, office letters, or custom literature"}
                  </p>
                </div>
              </label>
            </div>

            {/* Manual Text Area */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span>বা সরাসরি টেক্সট পেস্ট করুন:</span>
                <span className={`text-[11px] font-bold ${charCount > 0 && charCount < 50 ? "text-rose-500" : "text-muted-foreground"}`}>
                  {charCount} / 50 min characters
                </span>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={6}
                placeholder="এখানে আপনার বাংলা বা ইংরেজি টেক্সট অনুচ্ছেদ পেস্ট করুন (কমপক্ষে ৫০ অক্ষর)..."
                className={`w-full p-4 rounded-xl border bg-background text-foreground font-bangla text-base focus:outline-none focus:ring-1 focus:ring-ring shadow-xs ${
                  isTooShort ? "border-rose-500 focus:ring-rose-500" : "border-input"
                }`}
              />

              {/* Quick Sample Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[11px] font-bold text-muted-foreground">অথবা নমুনা টেক্সট নির্বাচন করুন:</span>
                <button
                  type="button"
                  onClick={() => setRawText("বাংলাদেশ সরকারের প্রশাসনিক ও ডিজিটাল তথ্য ব্যবস্থার আওতায় সকল কর্মকর্তা ও কর্মচারীদের কম্পিউটার পরিচালনায় মৌলিক দক্ষতা অর্জন করা আবশ্যক। ই-নথি ব্যবস্থার সঠিক প্রয়োগে কীবোর্ডের স্পর্শ টাইপিং গতি অর্জনের বিকল্প নেই। নিয়মিত অনুশীলনের মাধ্যমে সঠিক আঙুল বিন্যাস ও নির্ভুলতা অর্জন করা সম্ভব।")}
                  className="text-xs font-bold px-2.5 py-1 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all"
                >
                  🏛️ সরকারি নোটিশ নমুনা
                </button>
                <button
                  type="button"
                  onClick={() => setRawText("আমাদের ছোট নদী চলে বাঁকে বাঁকে, বৈশাখ মাসে তার হাঁটু জল থাকে। পার হয়ে যায় গরু, পার হয় গাড়ি, দুই ধার উঁচু তার, ঢালু তার পাড়ি। চিকচিক করে বালি, কোথা নাই কাদা, একটুখানি নালা, জলের নাই গাঁদা। কলকল কলকল করিতেছে নাদ ঘোলা জল তার আদর নাই কাদ।")}
                  className="text-xs font-bold px-2.5 py-1 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all"
                >
                  📖 সাহিত্য নমুনা
                </button>
                <button
                  type="button"
                  onClick={() => setRawText("Mastering touch typing is essential for modern professional success. Daily interactive drills increase typing speed, accuracy, and overall productivity on computer keyboards.")}
                  className="text-xs font-bold px-2.5 py-1 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all"
                >
                  🔤 English Sample
                </button>
              </div>

              {/* Character Validation Status Badges */}
              {isTooShort && (
                <div className="pt-1">
                  <Badge variant="outline" className="border-rose-500 text-rose-600 bg-rose-50 dark:bg-rose-950/40 text-xs font-bold py-1 px-3">
                    ❌ টেক্সট অত্যন্ত ছোট (কমপক্ষে ৫০টি অক্ষর আবশ্যক)
                  </Badge>
                </div>
              )}

              {isWarningShort && (
                <div className="pt-1">
                  <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/40 text-xs font-bold py-1 px-3">
                    ⚠️ {selectedDurationSec / 60} মিনিটের টাইমারের জন্য টেক্সট ছোট: পরীক্ষা চলাকালীন অনুচ্ছেদটি স্বয়ংক্রিয়ভাবে পুনরাবৃত্তি (Loop) হবে।
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Target WPM Goal */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              <h4 className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
                <Target size={14} className="text-primary" />
                ২. আপনার টার্গেট স্পিড নির্বাচন করুন (Target WPM Goal):
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">অনুশীলন শেষে আপনার পারফরম্যান্স টার্গেটের সাপেক্ষে মূল্যায়িত হবে</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {[20, 30, 40, 50].map((goal) => (
                <button
                  key={goal}
                  onClick={() => setTargetWpmGoal(goal)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    targetWpmGoal === goal
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {goal} WPM
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Timer Duration */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              <h4 className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
                <Clock size={14} className="text-primary" />
                ৩. পরীক্ষার সময় নির্বাচন করুন (Practice Timer):
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">নির্দিষ্ট টাইমার বা আনটাইমড অনুশীলন বেছে নিন</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {[
                { sec: 60, label: "১ মিনিট" },
                { sec: 180, label: "৩ মিনিট" },
                { sec: 300, label: "৫ মিনিট" },
                { sec: 600, label: "১০ মিনিট" },
                { sec: 0, label: "Untimed" },
              ].map((t) => (
                <button
                  key={t.sec}
                  onClick={() => setSelectedDurationSec(t.sec)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border shrink-0 ${
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

          {/* Section 4: Keyboard Layout */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              <h4 className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
                <Keyboard size={14} className="text-primary" />
                ৪. কীবোর্ড লেআউট নির্বাচন করুন (Keyboard Layout):
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">আপনার কীবোর্ড ম্যাপিং বেছে নিন</p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {[
                { id: "jatiya", label: "জাতীয় কীবোর্ড (Jatiya BCC)" },
                { id: "unibijoy", label: "ইউনিবিজয় (UniBijoy 52)" },
                { id: "avro", label: "অভ্র ফোনেটিক (Avro)" },
                { id: "english", label: "English QWERTY" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLayout(tab.id as KeyboardLayout)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                    activeLayout === tab.id
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: SINGLE UNIFIED PRIMARY CTA BUTTON */}
          <div className="border-t border-border pt-6 text-center">
            <Button
              size="lg"
              onClick={handleStartPractice}
              disabled={charCount < 50}
              className="w-full sm:w-auto px-12 font-black text-sm gap-2 h-12 shadow-sm rounded-xl"
            >
              <Play size={16} /> Start Custom Practice Arena →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
