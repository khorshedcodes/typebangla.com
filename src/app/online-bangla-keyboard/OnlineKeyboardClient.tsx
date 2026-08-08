"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Keyboard, Copy, Download, Volume2, Trash2, CheckCircle2,
  Sparkles, ArrowLeft, RefreshCw, Hash, FileText, Eye, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingBanglaKeyboard from "@/components/FloatingBanglaKeyboard";
import { mapInputToBangla, avroTransliterate } from "@/utils/layouts";
import { useTypingStore, KeyboardLayout } from "@/store/typingStore";

export default function OnlineKeyboardClient() {
  const [text, setText] = useState("");
  const [selectedLayout, setSelectedLayout] = useState<KeyboardLayout>("avro");
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Statistics
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const [avroBuffer, setAvroBuffer] = useState("");

  const handleVirtualKeyClick = (code: string, char: string) => {
    if (code === "Backspace" || char === "Backspace") {
      if (selectedLayout === "avro" && avroBuffer) {
        setAvroBuffer((prev) => prev.slice(0, -1));
      } else {
        setText((prev) => prev.slice(0, -1));
      }
      if (textareaRef.current) textareaRef.current.focus();
      return;
    }

    if (code === "Space" || char === "Space") {
      if (selectedLayout === "avro" && avroBuffer) {
        const ban = avroTransliterate(avroBuffer);
        setText((prev) => prev + ban + " ");
        setAvroBuffer("");
      } else {
        setText((prev) => prev + " ");
      }
      if (textareaRef.current) textareaRef.current.focus();
      return;
    }

    if (!char) return;
    if (selectedLayout === "avro" && /[a-zA-Z]/i.test(char)) {
      setAvroBuffer((prev) => prev + char);
    } else {
      let committed = "";
      if (selectedLayout === "avro" && avroBuffer) {
        committed = avroTransliterate(avroBuffer);
        setAvroBuffer("");
      }
      setText((prev) => prev + committed + char);
    }
    if (textareaRef.current) textareaRef.current.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Backspace") {
      if (selectedLayout === "avro" && avroBuffer) {
        setAvroBuffer((prev) => prev.slice(0, -1));
        e.preventDefault();
      }
      return;
    }

    if (e.code === "Space") {
      if (selectedLayout === "avro" && avroBuffer) {
        const ban = avroTransliterate(avroBuffer);
        setText((prev) => prev + ban + " ");
        setAvroBuffer("");
        e.preventDefault();
      }
      return;
    }

    if (selectedLayout === "avro" && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (/[a-zA-Z]/i.test(e.key)) {
        e.preventDefault();
        setAvroBuffer((prev) => prev + e.key);
      } else {
        if (avroBuffer) {
          e.preventDefault();
          const committed = avroTransliterate(avroBuffer);
          setAvroBuffer("");
          setText((prev) => prev + committed + e.key);
        }
      }
      return;
    }

    // For fixed layout conversion (UniBijoy / Jatiya / Probhat)
    if (selectedLayout !== "avro" && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const converted = mapInputToBangla(e.key, selectedLayout);
      if (converted && converted !== e.key) {
        e.preventDefault();
        const start = textareaRef.current?.selectionStart || text.length;
        const end = textareaRef.current?.selectionEnd || text.length;
        const updated = text.substring(0, start) + converted + text.substring(end);
        setText(updated);
      }
    }
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bangla-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTextToSpeech = () => {
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "bn-BD";
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 fade-in text-foreground">
      {/* Top Breadcrumb & Header */}
      <div className="space-y-3">
        <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> সব টুলসে ফিরে যান
        </Link>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-mono">
                ONLINE VIRTUAL KEYBOARD
              </Badge>
              <span className="text-xs text-muted-foreground font-semibold">১০০% ফ্রি ও সফটওয়্যারবিহীন</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              অনলাইন বাংলা কীবোর্ড (Online Bangla Keyboard)
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              সফটওয়্যার বা কীবোর্ড লেআউট ইনস্টল না করেই যেকোনো ব্রাউজারে সরাসরি বাংলা টাইপ করুন। বাটন ক্লিক করে বা কিবোর্ডে চাপ দিয়ে লেখার সুবিধা।
            </p>
          </div>
        </div>
      </div>

      {/* Main Composition Editor */}
      <Card className="border-2 border-emerald-500/50 bg-card shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-secondary/40 border-b border-border pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Layout Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-foreground">কীবোর্ড মোড:</span>
            {[
              { id: "avro", label: "অভ্র ফোনেটিক (Avro)" },
              { id: "unibijoy", label: "ইউনিবিজয় (UniBijoy)" },
              { id: "jatiya", label: "জাতীয় (Jatiya BCC)" },
              { id: "probhat", label: "প্রভাত (Probhat)" },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedLayout(mode.id as KeyboardLayout)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  selectedLayout === mode.id
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-xs"
                    : "bg-background border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span>শব্দ: <strong className="text-foreground">{wordCount}</strong></span>
            <span>•</span>
            <span>অক্ষর: <strong className="text-foreground">{charCount}</strong></span>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Text Area Input */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={text + (selectedLayout === "avro" ? avroBuffer : "")}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="এখানে ক্লিক করে সরাসরি টাইপ করুন অথবা নিচের ভার্চুয়াল কীবোর্ড বাটনগুলোতে চাপ দিন..."
              className="w-full h-44 sm:h-56 p-4 rounded-xl border border-border bg-background text-foreground font-bangla text-base sm:text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium"
            />
            {selectedLayout === "avro" && avroBuffer && (
              <div className="absolute right-4 bottom-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg text-xs font-mono font-bold shadow-xs">
                ফোনেটিক বাফার: <span>{avroBuffer}</span> ➔ {avroTransliterate(avroBuffer)}
              </div>
            )}
          </div>

          {/* Editor Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                onClick={handleCopy}
                disabled={!text}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-xs cursor-pointer h-9 px-4"
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                <span>{copied ? "কপি হয়েছে!" : "কপি করুন"}</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleDownload}
                disabled={!text}
                className="font-bold text-xs gap-1.5 border-border cursor-pointer h-9 px-3.5"
              >
                <Download size={14} />
                <span>টেক্সট ফাইল ডাইনলোড (.txt)</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleTextToSpeech}
                disabled={!text || isPlayingAudio}
                className="font-bold text-xs gap-1.5 border-border cursor-pointer h-9 px-3.5"
              >
                <Volume2 size={14} className={isPlayingAudio ? "animate-pulse text-emerald-500" : ""} />
                <span>{isPlayingAudio ? "পড়া হচ্ছে..." : "শুনুন (Audio)"}</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => setText("")}
              disabled={!text}
              className="text-xs font-bold text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 cursor-pointer h-9"
            >
              <Trash2 size={14} />
              <span>মুছে ফেলুন</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Embedded Clickable Virtual Keyboard Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <Keyboard className="text-emerald-500" size={20} />
          <h2 className="text-lg font-black text-foreground">ভাসমান ও সরাসরি ক্লিকযোগ্য বাংলা কীবোর্ড</h2>
        </div>
        <FloatingBanglaKeyboard onKeyClick={handleVirtualKeyClick} />
      </section>

      {/* SEO & Instructional Guide Section */}
      <Card className="border border-border bg-card shadow-xs rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="px-3 py-1 text-xs font-bold text-primary border-primary/30">
            কীভাবে ব্যবহার করবেন? (User Guide)
          </Badge>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            অনলাইনে কোনো সফটওয়্যার ছাড়াই বাংলা টাইপিং করার সহজ উপায়
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            আপনার কম্পিউটারে বিজয় ৫২ বা অভ্র সফটওয়্যার ইনস্টল না থাকলেও আমাদের অনলাইন বাংলা কীবোর্ডের মাধ্যমে খুব সহজেই ইউনিকোড বাংলায় যেকোনো চিঠি, আবেদনপত্র বা সোশ্যাল মিডিয়া পোস্ট তৈরি করতে পারবেন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2">
            <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center font-mono font-black text-xs">1</span>
              অভ্র ফোনেটিক টাইপিং
            </span>
            <p className="text-muted-foreground leading-relaxed">
              ইংরেজি অক্ষরের মাধ্যমে টাইপ করুন। যেমন: &quot;bangla&quot; টাইপ করলে তা স্বয়ংক্রিয়ভাবে &quot;বাংলা&quot;-তে রূপান্তরিত হবে।
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2">
            <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center font-mono font-black text-xs">2</span>
              ইউনিবিজয় ও জাতীয়
            </span>
            <p className="text-muted-foreground leading-relaxed">
              আপনার কিবোর্ডের নির্দিষ্ট কী-ম্যাপ (যেমন: j=ক, h=ব, f=া) অনুযায়ী সরাসরি ফিক্সড ইউনিকোড লেআউটে টাইপ করুন।
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-2">
            <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center font-mono font-black text-xs">3</span>
              ক্লিকিং অন-স্ক্রিন কীবোর্ড
            </span>
            <p className="text-muted-foreground leading-relaxed">
              মাউস বা টাচ স্ক্রিনের সাহায্যে স্ক্রিনের ওপর থাকা কিবোর্ড বাটনগুলোতে ক্লিক করে করে সরাসরি বাংলা অক্ষর বসান।
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
}
