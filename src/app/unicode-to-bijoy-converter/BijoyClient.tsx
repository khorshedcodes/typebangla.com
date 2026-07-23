"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Download, ArrowRightLeft, Sparkles } from "lucide-react";
import { unicodeToBijoy, bijoyToUnicode } from "../../utils/bijoyConverter";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { cn } from "../../utils/cn";

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
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
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
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 fade-in">
      {/* Page Header */}
      <div className="space-y-0.5">
        <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
          <Sparkles className="text-emerald-600" size={18} />
          <span>Unicode ↔ Bijoy Converter</span>
        </h1>
        <p className="text-xs text-muted-foreground">
          Convert between Unicode and Bijoy ANSI encoding effortlessly.
        </p>
      </div>

      {/* Main Translation Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Panel: Input */}
        <Card className="border border-border bg-card shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-bold text-zinc-900">
              {direction === "uniToBijoy" ? "Unicode Bangla (Input)" : "Bijoy ANSI (Input)"}
            </span>
            <Button 
              variant="outline"
              size="icon"
              onClick={toggleDirection} 
              className="h-8 w-8 rounded-full border-zinc-200"
              title="Switch conversion direction"
            >
              <ArrowRightLeft size={14} className="text-zinc-500" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <textarea
              className="w-full text-base p-5 border-0 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none min-h-[220px] resize-y leading-relaxed font-bangla flex-1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={direction === "uniToBijoy" ? "এখানে ইউনিকোড বাংলা পেস্ট করুন..." : "এখানে বিজয় এএনএসআই (ANSI) লেখা পেস্ট করুন..."}
            />
            <div className="p-4 flex justify-between items-center text-[10px] font-medium text-muted-foreground bg-zinc-50 border-t border-border">
              <span>Characters: {inputText.length}</span>
              {inputText && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText("")} 
                  className="h-7 text-[10px] gap-1 border-zinc-200"
                >
                  <RotateCcw size={11} className="text-zinc-400" />
                  <span>Clear</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Output */}
        <Card className="border border-border bg-card shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-bold text-emerald-700">
              {direction === "uniToBijoy" ? "Bijoy ANSI (Output)" : "Unicode Bangla (Output)"}
            </span>
            {outputText && (
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleCopy} 
                  className={cn("gap-1.5 h-8 border-zinc-200 text-xs", {
                    "border-emerald-200 text-emerald-700 bg-emerald-50/50": copied
                  })}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleDownload} 
                  className="gap-1.5 h-8 border-zinc-200 text-xs text-zinc-650"
                >
                  <Download size={12} />
                  <span>Download</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <div className="p-5 font-bangla text-base min-h-[220px] bg-white leading-relaxed text-zinc-900 break-words flex-1">
              {outputText || (
                <span className="text-zinc-400 text-xs font-sans">
                  রূপান্তরিত লেখা এখানে দেখা যাবে...
                </span>
              )}
            </div>
            <div className="p-4 flex justify-between items-center text-[10px] font-medium text-muted-foreground bg-zinc-50 border-t border-border rounded-b-lg h-[46px]">
              <span>Characters: {outputText.length}</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Info Card */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-zinc-900">Understanding Unicode and Bijoy</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-zinc-600 leading-relaxed">
          <p>
            <strong>Unicode</strong> is the modern global standard for displaying text on websites, smartphones, and social media.
            <strong> Bijoy ANSI</strong> is a legacy keyboard encoding widely used in Bangladesh for desktop publishing softwares like Adobe Illustrator, Photoshop, and printing press layouts. Use this converter to bridge the gap between digital content and professional printing grids!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
