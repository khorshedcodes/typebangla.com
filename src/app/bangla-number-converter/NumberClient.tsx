"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Download, ArrowRightLeft, Sparkles, Hash } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { cn } from "../../utils/cn";

const BANGLA_NUMBERS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const ENGLISH_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const BANGLA_WORDS_MAP: { [key: string]: string } = {
  "0": "শূন্য", "1": "এক", "2": "দুই", "3": "তিন", "4": "চার", "5": "পাঁচ",
  "6": "ছয়", "7": "সাত", "8": "আট", "9": "নয়", "10": "দশ"
};

export default function NumberClient() {
  const [inputText, setInputText] = useState("");
  const [direction, setDirection] = useState<"enToBn" | "bnToEn">("enToBn");
  const [copied, setCopied] = useState(false);

  const convertNumbers = (text: string, mode: "enToBn" | "bnToEn") => {
    if (!text) return "";
    if (mode === "enToBn") {
      return text.replace(/[0-9]/g, (w) => {
        const val = parseInt(w, 10);
        return isNaN(val) ? w : (BANGLA_NUMBERS[val] || w);
      });
    } else {
      return text.replace(/[০-৯]/g, (w) => {
        const idx = BANGLA_NUMBERS.indexOf(w);
        return idx !== -1 ? ENGLISH_NUMBERS[idx] : w;
      });
    }
  };

  const outputText = convertNumbers(inputText, direction);

  const toggleDirection = () => {
    setDirection((prev) => (prev === "enToBn" ? "bnToEn" : "enToBn"));
    setInputText(outputText);
  };

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
    a.download = `converted-numbers-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Hash size={14} className="text-primary animate-pulse" />
          <span>DIGIT & CURRENCY UTILITY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Bangla Number Converter
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          ইংরেজি ও বাংলা সংখ্যার মধ্যে তাৎক্ষণিক দ্বি-মুখী রূপান্তর (English ↔ Bangla Digits Converter)।
        </p>
      </section>

      {/* Main Converter Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Panel: Input */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-black text-foreground">
              {direction === "enToBn" ? "English Digits (12345)" : "Bangla Digits (১২৩৪৫)"}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDirection}
              className="h-8 w-8 rounded-full border-border cursor-pointer hover:bg-secondary"
              title="Switch direction"
            >
              <ArrowRightLeft size={14} className="text-primary" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <textarea
              className="w-full text-base p-5 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[240px] resize-y leading-relaxed font-sans flex-1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                direction === "enToBn"
                  ? "এখানে ইংরেজি সংখ্যা লিখুন (যেমন: 12345 বা ৳150,00)..."
                  : "এখানে বাংলা সংখ্যা লিখুন (যেমন: ১২৩৪৫ বা ৳১৫০,০০)..."
              }
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
            <span className="text-xs font-black text-primary">
              {direction === "enToBn" ? "Bangla Output (১২৩৪৫)" : "English Output (12345)"}
            </span>
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
            <div className="p-5 text-base min-h-[240px] bg-transparent leading-relaxed text-foreground break-words flex-1 font-mono">
              {outputText || (
                <span className="text-muted-foreground text-xs font-sans">
                  রূপান্তরিত সংখ্যা এখানে দেখা যাবে...
                </span>
              )}
            </div>
            <div className="p-4 flex justify-between items-center text-xs font-bold text-muted-foreground bg-secondary border-t border-border rounded-b-2xl h-[46px]">
              <span>অক্ষর: <strong className="text-foreground">{outputText.length}</strong></span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Info Card */}
      <section className="border border-border bg-card rounded-2xl p-6 sm:p-8 space-y-3 text-xs sm:text-sm text-muted-foreground shadow-xs">
        <h2 className="text-base font-black text-foreground">বাংলা সংখ্যা রূপান্তর নির্দেশিকা</h2>
        <p className="leading-relaxed">
          সরকারি আবেদনপত্র, ব্যাংক চালান, শিক্ষা সনদ ও আর্থিক ইনভয়েস তৈরির জন্য ইংরেজি (0-9) এবং বাংলা (০-৯) সংখ্যার নিখুঁত রূপান্তর অত্যন্ত গুরুত্বপূর্ণ। 
          TypeBangla-এর এই অনলাইন কনভার্টারটি সংখ্যা, টাকা চিহ্ন (৳), কমা এবং পাঙ্কচুয়েশন স্বয়ংক্রিয়ভাবে বজায় রেখে রূপান্তর করে।
        </p>
      </section>
    </main>
  );
}
