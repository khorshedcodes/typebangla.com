"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Keyboard, Copy, Download, Volume2, Trash2, CheckCircle2,
  Sparkles, ArrowLeft, RefreshCw, Hash, FileText, Eye, ShieldCheck,
  Maximize2, Minimize2
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import FloatingBanglaKeyboard from "../../components/FloatingBanglaKeyboard";
import { mapInputToBangla, avroTransliterate } from "../../utils/layouts";
import { KeyboardLayout } from "../../store/typingStore";

export default function OnlineKeyboardClient() {
  const [text, setText] = useState("");
  const [selectedLayout, setSelectedLayout] = useState<KeyboardLayout>("avro");
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showFloatingKeyboard, setShowFloatingKeyboard] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Statistics
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const [avroBuffer, setAvroBuffer] = useState("");

  const handleVirtualKeyClick = (code: string, char: string, isShift?: boolean) => {
    // 1. Backspace Key
    if (code === "Backspace" || char === "Backspace" || char === "Bksp") {
      if (selectedLayout === "avro" && avroBuffer) {
        setAvroBuffer((prev) => prev.slice(0, -1));
      } else {
        setText((prev) => prev.slice(0, -1));
      }
      if (textareaRef.current) textareaRef.current.focus();
      return;
    }

    // 2. Space Key
    if (code === "Space" || char === "Space" || char.toLowerCase().includes("space")) {
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

    // 3. Enter Key
    if (code === "Enter" || char === "Enter") {
      if (selectedLayout === "avro" && avroBuffer) {
        const ban = avroTransliterate(avroBuffer);
        setText((prev) => prev + ban + "\n");
        setAvroBuffer("");
      } else {
        setText((prev) => prev + "\n");
      }
      if (textareaRef.current) textareaRef.current.focus();
      return;
    }

    // 4. Tab Key
    if (code === "Tab" || char === "Tab") {
      setText((prev) => prev + "\t");
      if (textareaRef.current) textareaRef.current.focus();
      return;
    }

    if (!char) return;

    // 5. Avro Phonetic Transliteration Mode
    if (selectedLayout === "avro") {
      if (/[a-zA-Z]/i.test(char)) {
        setAvroBuffer((prev) => prev + char);
      } else {
        let committed = "";
        if (avroBuffer) {
          committed = avroTransliterate(avroBuffer);
          setAvroBuffer("");
        }
        setText((prev) => prev + committed + char);
      }
    } 
    // 6. English Mode
    else if (selectedLayout === "english") {
      setText((prev) => prev + char);
    } 
    // 7. Fixed Layout Conversion (UniBijoy / Jatiya / Probhat / Inscript / Unicode)
    else {
      const converted = mapInputToBangla(char, selectedLayout, isShift);
      setText((prev) => prev + (converted || char));
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

    // For fixed layout conversion (UniBijoy / Jatiya / Probhat / Inscript / Unicode)
    if (selectedLayout !== "avro" && selectedLayout !== "english" && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const converted = mapInputToBangla(e.key, selectedLayout, e.shiftKey);
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
    if (!text && !avroBuffer) return;
    const fullText = text + (selectedLayout === "avro" && avroBuffer ? avroTransliterate(avroBuffer) : "");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fullText = text + (selectedLayout === "avro" && avroBuffer ? avroTransliterate(avroBuffer) : "");
    if (!fullText) return;
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bangla-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTextToSpeech = () => {
    const fullText = text + (selectedLayout === "avro" && avroBuffer ? avroTransliterate(avroBuffer) : "");
    if (!fullText || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fullText);
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
              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono font-bold">
                STANDALONE ONLINE VIRTUAL KEYBOARD
              </Badge>
              <span className="text-xs text-muted-foreground font-semibold">১০০% ফ্রি ও ইনস্টলেশনবিহীন</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              অনলাইন বাংলা কীবোর্ড (Online Bangla Keyboard)
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              সফটওয়্যার বা কীবোর্ড লেআউট ইনস্টল না করেই সরাসরি ব্রাউজারে অভ্র ফোনেটিক, ইউনিবিজয়, জাতীয়, প্রভাত ও ইউনিকোড বাংলায় টাইপ করুন।
            </p>
          </div>

          <Button
            onClick={() => setShowFloatingKeyboard((prev) => !prev)}
            variant="outline"
            className="font-bold text-xs gap-2 border-primary/40 text-primary hover:bg-primary/10 h-10 px-4 shrink-0 shadow-xs cursor-pointer"
          >
            <Keyboard size={16} />
            <span>{showFloatingKeyboard ? "ভাসমান উইন্ডো বন্ধ করুন" : "📱 ভাসমান কিবোর্ড চালু করুন"}</span>
          </Button>
        </div>
      </div>

      {/* Main Composition Editor Card */}
      <Card className="border-2 border-primary/40 bg-card shadow-md rounded-2xl overflow-hidden">
        <CardHeader className="bg-secondary/50 border-b border-border pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4">
          {/* Layout Selector (Supports all 7 Layouts) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-black text-foreground mr-1">লেআউট মোড:</span>
            {[
              { id: "avro", label: "অভ্র (Avro)" },
              { id: "unibijoy", label: "ইউনিবিজয় (UniBijoy)" },
              { id: "jatiya", label: "জাতীয় (Jatiya)" },
              { id: "probhat", label: "প্রভাত (Probhat)" },
              { id: "inscript", label: "ইনস্ক্রিপ্ট (Inscript)" },
              { id: "unicode", label: "ইউনিকোড (Unicode)" },
              { id: "english", label: "English" },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setSelectedLayout(mode.id as KeyboardLayout);
                  setAvroBuffer("");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedLayout === mode.id
                    ? "bg-primary text-primary-foreground border-primary shadow-xs font-black"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground shrink-0">
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
              value={text + (selectedLayout === "avro" && avroBuffer ? avroTransliterate(avroBuffer) : "")}
              onChange={(e) => {
                if (selectedLayout !== "avro") {
                  setText(e.target.value);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="এখানে সরাসরি টাইপ করুন অথবা নিচের অন-স্ক্রিন কিবোর্ড বাটনগুলোতে মাউস/টাচ ক্লিক করুন..."
              className="w-full h-44 sm:h-56 p-4 rounded-xl border border-border bg-background text-foreground font-bangla text-base sm:text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary resize-none font-medium shadow-inner"
            />
            
            {/* Live Avro Phonetic Buffer Badge */}
            {selectedLayout === "avro" && avroBuffer && (
              <div className="absolute right-4 bottom-4 bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-xs flex items-center gap-2">
                <span>ফোনেটিক বাফার: <code className="text-foreground font-black underline">{avroBuffer}</code></span>
                <span>➔</span>
                <span className="font-bangla font-black text-sm">{avroTransliterate(avroBuffer)}</span>
              </div>
            )}
          </div>

          {/* Editor Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                onClick={handleCopy}
                disabled={!text && !avroBuffer}
                className="font-bold text-xs gap-1.5 shadow-xs cursor-pointer h-9 px-4"
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                <span>{copied ? "কপি হয়েছে!" : "কপি করুন (Copy Text)"}</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleDownload}
                disabled={!text && !avroBuffer}
                className="font-bold text-xs gap-1.5 border-border cursor-pointer h-9 px-3.5"
              >
                <Download size={14} />
                <span>ডাউনলোড (.txt)</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleTextToSpeech}
                disabled={(!text && !avroBuffer) || isPlayingAudio}
                className="font-bold text-xs gap-1.5 border-border cursor-pointer h-9 px-3.5"
              >
                <Volume2 size={14} className={isPlayingAudio ? "animate-pulse text-primary" : ""} />
                <span>{isPlayingAudio ? "পড়া হচ্ছে..." : "শুনুন (Text-to-Speech)"}</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => { setText(""); setAvroBuffer(""); }}
              disabled={!text && !avroBuffer}
              className="text-xs font-bold text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 cursor-pointer h-9"
            >
              <Trash2 size={14} />
              <span>মুছে ফেলুন</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Embedded Inline Virtual Keyboard */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 text-foreground">
            <Keyboard className="text-primary" size={22} />
            <h2 className="text-lg font-black text-foreground">সরাসরি অন-স্ক্রিন ভার্চুয়াল বাংলা কীবোর্ড</h2>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono uppercase font-bold border-border">
            MODE: {selectedLayout.toUpperCase()}
          </Badge>
        </div>

        <Card className="border border-border bg-card shadow-xs rounded-2xl p-4 sm:p-6 overflow-x-auto">
          <div className="flex flex-col items-center">
            <FloatingBanglaKeyboard
              onKeyClick={handleVirtualKeyClick}
              className="static transform-none max-w-full shadow-none border-none bg-transparent p-0"
            />
          </div>
        </Card>
      </section>

      {/* Floating Keyboard Overlay Mode */}
      {showFloatingKeyboard && (
        <FloatingBanglaKeyboard onKeyClick={handleVirtualKeyClick} />
      )}

      {/* SEO & Instructional User Guide Section */}
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
          <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-2">
            <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary inline-flex items-center justify-center font-mono font-black text-xs">1</span>
              অভ্র ফোনেটিক টাইপিং
            </span>
            <p className="text-muted-foreground leading-relaxed">
              ইংরেজি অক্ষরের মাধ্যমে টাইপ করুন। যেমন: &quot;bangla&quot; টাইপ করলে তা স্বয়ংক্রিয়ভাবে &quot;বাংলা&quot;-তে রূপান্তরিত হবে।
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-2">
            <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary inline-flex items-center justify-center font-mono font-black text-xs">2</span>
              ইউনিবিজয়, জাতীয় ও প্রভাত
            </span>
            <p className="text-muted-foreground leading-relaxed">
              আপনার কিবোর্ডের নির্দিষ্ট কী-ম্যাপ (যেমন: j=ক, h=ব, f=া) অনুযায়ী সরাসরি ফিক্সড ইউনিকোড লেআউটে টাইপ করুন।
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-secondary/40 space-y-2">
            <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary inline-flex items-center justify-center font-mono font-black text-xs">3</span>
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
