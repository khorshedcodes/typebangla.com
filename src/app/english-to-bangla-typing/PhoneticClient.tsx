"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Download, Sparkles, BookOpen } from "lucide-react";
import { avroTransliterate } from "../../utils/layouts";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { cn } from "../../utils/cn";

const AVRO_VOWELS = [
  { roman: "a", independent: "আ", sign: "া (কার)" },
  { roman: "i", independent: "ই", sign: "ি (কার)" },
  { roman: "I", independent: "ঈ", sign: "ী (কার)" },
  { roman: "u", independent: "উ", sign: "ু (কার)" },
  { roman: "U", independent: "ঊ", sign: "ূ (কার)" },
  { roman: "e", independent: "এ", sign: "ে (কার)" },
  { roman: "O", independent: "ও", sign: "ো (কার)" },
  { roman: "oi", independent: "ঐ", sign: "ৈ (কার)" },
  { roman: "ou", independent: "ঔ", sign: "ৌ (কার)" },
  { roman: "ri", independent: "ঋ", sign: "ৃ (কার)" },
  { roman: "A / o", independent: "অ", sign: "(breaker)" }
];

const AVRO_CONSONANTS = [
  { roman: "k", bangla: "ক" }, { roman: "kh", bangla: "খ" },
  { roman: "g", bangla: "গ" }, { roman: "gh", bangla: "ঘ" },
  { roman: "c", bangla: "চ" }, { roman: "ch", bangla: "ছ" },
  { roman: "j", bangla: "জ" }, { roman: "jh", bangla: "ঝ" },
  { roman: "T", bangla: "ট" }, { roman: "Th", bangla: "ঠ" },
  { roman: "D", bangla: "ড" }, { roman: "Dh", bangla: "ঢ" },
  { roman: "t", bangla: "ত" }, { roman: "th", bangla: "থ" },
  { roman: "d", bangla: "দ" }, { roman: "dh", bangla: "ধ" },
  { roman: "n", bangla: "ন" }, { roman: "N", bangla: "ণ" },
  { roman: "p", bangla: "প" }, { roman: "f / ph", bangla: "ফ" },
  { roman: "b", bangla: "ব" }, { roman: "v / bh", bangla: "ভ" },
  { roman: "m", bangla: "ম" }, { roman: "z", bangla: "য" },
  { roman: "r", bangla: "র" }, { roman: "l", bangla: "ল" },
  { roman: "sh / S", bangla: "শ / ষ" }, { roman: "s", bangla: "স" },
  { roman: "h", bangla: "হ" }, { roman: "rr / rh", bangla: "ড় / ঢ়" },
  { roman: "y", bangla: "য়" }, { roman: "ng", bangla: "ং" },
  { roman: "H", bangla: "ঃ" }, { roman: "Z", bangla: "ৎ" }
];

const AVRO_FOLAS = [
  { roman: "y / z", bangla: "্য (য-ফলা)" },
  { roman: "w", bangla: "্ব (ব-ফলা)" },
  { roman: "r", bangla: "্র (র-ফলা)" },
  { roman: "+", bangla: "্ (যুক্তাক্ষর)" }
];

export default function PhoneticClient() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);

  const outputText = inputText
    ? inputText.split("\n").map(line => line.split(" ").map(word => avroTransliterate(word)).join(" ")).join("\n")
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
    a.href = url; a.download = `bangla-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Page Header */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span>ENGLISH ➔ BANGLA PHONETIC CONVERTER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          English to Bangla Typing
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          ইংরেজিতে টাইপ করুন (যেমন: ami banglay gan gai) এবং তাৎক্ষণিক বাংলা ইউনিকোড পান (আমি বাংলায় গান গাই)।
        </p>
      </section>

      {/* Two Column Tool Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Editor & Output */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Input Panel */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-3 border-b border-border">
              <span className="text-xs font-black text-foreground">English (Banglish) Input</span>
            </CardHeader>
            <CardContent className="p-0">
              <textarea
                className="w-full text-base p-5 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[160px] resize-y leading-relaxed font-mono"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="এখানে ফোনেটিক লিখুন... (e.g. amar sonar bangla, ami tomay valobashi)"
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

          {/* Output Panel */}
          <Card className="border border-border bg-card shadow-xs rounded-2xl">
            <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-black text-primary">Bangla Unicode Output</span>
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
            <CardContent className="p-0">
              <div className="p-5 text-base min-h-[160px] bg-transparent leading-relaxed text-foreground break-words font-mono">
                {outputText || (
                  <span className="text-muted-foreground text-xs font-sans">
                    বাংলা রূপান্তর এখানে দেখা যাবে...
                  </span>
                )}
              </div>
              <div className="p-4 flex justify-between items-center text-xs font-bold text-muted-foreground bg-secondary border-t border-border rounded-b-2xl h-[46px]">
                <span>অক্ষর: <strong className="text-foreground">{outputText.length}</strong></span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Sticky Rules Guide */}
        <div className="lg:sticky lg:top-20 space-y-4">
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center space-x-2 space-y-0">
              <BookOpen size={16} className="text-emerald-600" />
              <span className="text-xs font-bold text-zinc-900">Phonetic Guide</span>
            </CardHeader>
            <CardContent className="p-4">
              <div className="max-h-[460px] overflow-y-auto pr-1 space-y-4">
                
                {/* Folas Section */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Fola &amp; Linkers</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {AVRO_FOLAS.map((rule, idx) => (
                      <div 
                        key={idx} 
                        className="flex justify-between items-center text-[11px] py-1.5 px-3 rounded-md bg-zinc-50 border border-zinc-150 font-medium"
                      >
                        <code className="text-emerald-600 font-bold font-mono">{rule.roman}</code>
                        <span className="font-bangla text-zinc-900 text-right">{rule.bangla}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vowels & Signs Section */}
                <div className="space-y-1.5 border-t border-zinc-100 pt-3">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Vowels &amp; Vowel Signs (কার)</span>
                  <div className="space-y-1">
                    {AVRO_VOWELS.map((rule, idx) => (
                      <div 
                        key={idx} 
                        className="flex justify-between items-center text-[11px] py-1.5 px-3 rounded-md bg-zinc-50 border border-zinc-150 font-medium"
                      >
                        <code className="text-amber-600 font-bold font-mono">{rule.roman}</code>
                        <div className="flex gap-2 items-center">
                          <span className="font-bangla text-zinc-900">{rule.independent}</span>
                          <span className="text-zinc-300">|</span>
                          <span className="font-bangla text-zinc-500">{rule.sign}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consonants Section */}
                <div className="space-y-1.5 border-t border-zinc-100 pt-3">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Consonants</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {AVRO_CONSONANTS.map((rule, idx) => (
                      <div 
                        key={idx} 
                        className="flex justify-between items-center text-[11px] py-1.5 px-3 rounded-md bg-zinc-50 border border-zinc-150 font-medium"
                      >
                        <code className="text-zinc-500 font-bold font-mono">{rule.roman}</code>
                        <span className="font-bangla text-zinc-900 text-right">{rule.bangla}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <span className="text-xs font-bold text-zinc-900">Conjuncts &amp; Fola Tips</span>
            </CardHeader>
            <CardContent className="text-[11px] text-zinc-650 space-y-2.5 leading-relaxed">
              <div>
                <strong className="text-zinc-800">Bangla Full Stop (daari):</strong> Type <code>.</code> &rarr; । (and type <code>.`</code> &rarr; . for English dot)
              </div>
              <div>
                <strong className="text-zinc-800">Manual Link (+):</strong> Type <code>+</code> to join consonants manually. E.g., <code className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">k+t</code> &rarr; ক্ত
              </div>
              <div>
                <strong className="text-zinc-800">Implicit Breaker (o):</strong> Separate consonants silently using <code>o</code> in middle of word. E.g., <code className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">bor</code> &rarr; বর (while <code className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">helo</code> at end of word &rarr; হেলো)
              </div>
              <div>
                <strong className="text-zinc-800">Join Breaker (`):</strong> Type backtick <code>`</code> to prevent auto-joining of consonants manually. E.g., <code className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">b`r</code> &rarr; বর
              </div>
              <div>
                <strong className="text-zinc-800">Ro-fola (r):</strong> Type <code>r</code> after a consonant. E.g., <code className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">br</code> &rarr; ব্র
              </div>
              <div>
                <strong className="text-zinc-800">Ja-fola (y / z):</strong> Type <code>y</code> or <code>z</code> after a consonant. E.g., <code className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">by</code> &rarr; ব্য
              </div>
              <div>
                <strong className="text-zinc-800">Reph (r):</strong> Type <code>r</code> before a consonant. E.g., <code className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">rk</code> &rarr; র্ক
              </div>
              <div>
                <strong className="text-zinc-800">Ri-kar (ri):</strong> Type <code>ri</code> after a consonant. E.g., <code className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">kri</code> &rarr; কৃ
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </main>
  );
}
