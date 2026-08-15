"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Download, ArrowRightLeft, Sparkles } from "lucide-react";
import { unicodeToBijoy, bijoyToUnicode } from "../../utils/bijoyConverter";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { cn } from "../../utils/cn";
import { trackToolUsage } from "../../utils/analytics";

interface BijoyClientProps {
  initialDirection?: "uniToBijoy" | "bijoyToUni";
}

export default function BijoyClient({ initialDirection = "uniToBijoy" }: BijoyClientProps) {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState<"uniToBijoy" | "bijoyToUni">(initialDirection);

  const outputText = inputText
    ? direction === "uniToBijoy" ? unicodeToBijoy(inputText) : bijoyToUnicode(inputText)
    : "";

  const handleCopy = () => {
    if (!outputText) return;
    trackToolUsage("unicode_bijoy_converter", `copy_${direction}`);
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
    trackToolUsage("unicode_bijoy_converter", `download_${direction}`);
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `bijoy-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const toggleDirection = () => {
    setDirection(prev => prev === "uniToBijoy" ? "bijoyToUni" : "uniToBijoy");
    setInputText(outputText);
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span>BANGLA FONT CONVERTER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Unicode ↔ Bijoy Converter
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          ইউনিকোড বাংলা ও বিজয় এএনএসআই (SutonnyMJ) ফন্টের মধ্যে তাত্ক্ষণিক রূপান্তর।
        </p>
      </section>

      {/* Main Translation Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Panel: Input */}
        <Card className="border border-border bg-card shadow-xs rounded-2xl flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-black text-foreground">
              {direction === "uniToBijoy" ? "Unicode Bangla (Input)" : "Bijoy ANSI (Input)"}
            </span>
            <Button 
              variant="outline"
              size="icon"
              onClick={toggleDirection} 
              className="h-8 w-8 rounded-full border-border cursor-pointer hover:bg-secondary"
              title="Switch conversion direction"
            >
              <ArrowRightLeft size={14} className="text-primary" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <textarea
              className="w-full text-base p-5 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[240px] resize-y leading-relaxed font-sans flex-1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={direction === "uniToBijoy" ? "এখানে ইউনিকোড বাংলা পেস্ট করুন..." : "এখানে বিজয় এএনএসআই (ANSI) লেখা পেস্ট করুন..."}
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
              {direction === "uniToBijoy" ? "Bijoy ANSI (Output)" : "Unicode Bangla (Output)"}
            </span>
            {outputText && (
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleCopy} 
                  className={cn("gap-1.5 h-8 border-border text-xs font-bold cursor-pointer", {
                    "border-primary text-primary bg-primary/10": copied
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
                  রূপান্তরিত লেখা এখানে দেখা যাবে...
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
        <h2 className="text-base font-black text-foreground">ইউনিকোড ও বিজয় টেক্সট কনভার্টার সংক্রান্ত তথ্য</h2>
        <p className="leading-relaxed">
          <strong>ইউনিকোড (Unicode):</strong> আধুনিক স্মার্টফোন, ওয়েব ব্রাউজার ও সোশ্যাল মিডিয়া প্ল্যাটফর্মে বাংলা প্রদর্শনের আন্তর্জাতিক স্ট্যান্ডার্ড মানদণ্ড।
        </p>
        <p className="leading-relaxed">
          <strong>বিজয় (Bijoy ANSI):</strong> অ্যাডোবি ইলাস্ট্রেটর, ফটোশপ ও প্রিন্টিং প্রেসে SutonnyMJ ফন্ট ব্যবহার করে প্রেস পাবলিশিং ও ডিজাইনের জন্য ব্যবহৃত ট্রেডিশনাল কীবোর্ড কোড পেজ।
        </p>
      </section>
    </main>
  );
}
