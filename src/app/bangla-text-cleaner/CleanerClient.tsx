"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Download, Sparkles, Wand2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { cn } from "../../utils/cn";

export default function CleanerClient() {
  const [inputText, setInputText] = useState("");
  const [removeHtml, setRemoveHtml] = useState(true);
  const [fixPunctuation, setFixPunctuation] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeBlankLines, setRemoveBlankLines] = useState(true);
  const [copied, setCopied] = useState(false);

  const cleanText = (raw: string) => {
    if (!raw) return "";
    let cleaned = raw;

    // Remove HTML tags
    if (removeHtml) {
      cleaned = cleaned.replace(/<[^>]*>/g, "");
    }

    // Fix ZWNJ and invisible zero-width characters
    cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, "");

    // Fix Dari & Comma spacing (exclude closing quotes/brackets from space insertion)
    if (fixPunctuation) {
      cleaned = cleaned
        .replace(/\s+।/g, "।")
        .replace(/।([^\s।\n”"'\)\]\}])/g, "। $1")
        .replace(/\s+,/g, ",")
        .replace(/,([^\s,\n”"'\)\]\}])/g, ", $1");
    }

    // Remove extra spaces
    if (removeExtraSpaces) {
      cleaned = cleaned.replace(/[ \t]+/g, " ");
    }

    // Remove empty blank lines
    if (removeBlankLines) {
      cleaned = cleaned.replace(/\n\s*\n/g, "\n\n");
    }

    return cleaned.trim();
  };

  const outputText = cleanText(inputText);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cleaned-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Wand2 size={14} className="text-primary animate-pulse" />
          <span>TEXT FORMATTER & CLEANER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Bangla Text Cleaner
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          একাধিক স্পেস, ভুল পাঙ্কচুয়েশন, ZWNJ ক্যারেক্টার ও HTML ট্যাগ ফিল্টার করে পরিষ্কার বাংলা টেক্সট পান।
        </p>
      </section>

      {/* Main Cleaner Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Panel: Input */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-black text-foreground">র বাংলা টেক্সট ইনপুট (Raw Input)</span>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <textarea
              className="w-full text-base p-5 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[260px] resize-y leading-relaxed font-sans flex-1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="এখানে এলেমেলো বা মেসড্‌ বাংলা লেখা পেস্ট করুন..."
            />
            <div className="p-4 flex justify-between items-center text-xs font-bold text-muted-foreground bg-secondary border-t border-border rounded-b-2xl">
              <span>অক্ষর: <strong className="text-foreground">{inputText.length}</strong></span>
              {inputText && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText("")}
                  className="h-7 text-xs gap-1 border-border font-bold cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Clear</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Output */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-black text-primary">ফিল্টারকৃত পরিষ্কার বাংলা (Cleaned Output)</span>
            {outputText && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className={cn("gap-1.5 h-8 border-border text-xs font-bold cursor-pointer", {
                    "border-primary text-primary bg-primary/10": copied,
                  })}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-1.5 h-8 border-border text-xs font-bold cursor-pointer"
                >
                  <Download size={12} />
                  <span>Download</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <div className="p-5 text-base min-h-[260px] bg-transparent leading-relaxed text-foreground break-words flex-1 font-mono">
              {outputText || (
                <span className="text-muted-foreground text-xs font-sans">
                  পরিষ্কার টেক্সট আউটপুট এখানে প্রদর্শিত হবে...
                </span>
              )}
            </div>
            <div className="p-4 flex justify-between items-center text-xs font-bold text-muted-foreground bg-secondary border-t border-border rounded-b-2xl h-[46px]">
              <span>অক্ষর: <strong className="text-foreground">{outputText.length}</strong></span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Options Panel */}
      <Card className="border border-border bg-card rounded-2xl p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-black text-foreground">ফিল্টারিং অপশনস (Cleaner Filters)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold text-muted-foreground">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeExtraSpaces}
              onChange={(e) => setRemoveExtraSpaces(e.target.checked)}
              className="accent-primary rounded"
            />
            <span>অতিরিক্ত স্পেস রিমুভ</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={fixPunctuation}
              onChange={(e) => setFixPunctuation(e.target.checked)}
              className="accent-primary rounded"
            />
            <span>দাঁড়ি (।) ও কমা স্পেসিং ফিক্স</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeHtml}
              onChange={(e) => setRemoveHtml(e.target.checked)}
              className="accent-primary rounded"
            />
            <span>HTML ট্যাগ স্ট্রিপ</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeBlankLines}
              onChange={(e) => setRemoveBlankLines(e.target.checked)}
              className="accent-primary rounded"
            />
            <span>খালি ব্ল্যাঙ্ক লাইন ফিল্টার</span>
          </label>
        </div>
      </Card>

    </main>
  );
}
