"use client";

import React, { useState, useEffect } from "react";
import { generateBanglaPracticeText } from "../../utils/banglaLoremGenerator";
import { Copy, Check, RefreshCw, FileText, Code, Sparkles, Sliders } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function BanglaLoremClient() {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(40);
  const [loremType, setLoremType] = useState<"lorem" | "natural">("lorem");
  const [level, setLevel] = useState<1 | 2 | 3 | "all">("all");
  const [includeHtml, setIncludeHtml] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const generateContent = () => {
    const resultArr: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      const pText = generateBanglaPracticeText({
        wordCount: wordsPerParagraph,
        level,
        type: loremType,
        includePunctuation: true,
      });
      resultArr.push(includeHtml ? `<p>${pText}</p>` : pText);
    }
    setGeneratedText(resultArr.join(includeHtml ? "\n\n" : "\n\n"));
  };

  useEffect(() => {
    generateContent();
  }, [paragraphs, wordsPerParagraph, loremType, level, includeHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalWords = generatedText ? generatedText.trim().split(/\s+/).length : 0;
  const totalChars = generatedText ? generatedText.length : 0;

  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 fade-in text-foreground">
      {/* Header Section */}
      <section className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span>SEO DESIGNER UTILITY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          বাংলা লরেম ইপসাম জেনারেটর
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          ওয়েবসাইট ডিজাইন, ইউআই/ইউএক্স মকআপ এবং প্রিন্টিং মিডিয়া ডিজাইনের জন্য মানসম্মত ডামি বাংলা টেক্সট ও প্যারাগ্রাফ তৈরি করুন।
        </p>
      </section>

      {/* Controls Card */}
      <Card className="border border-border bg-card shadow-xs rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 font-black text-base text-foreground">
              <Sliders size={18} className="text-primary" />
              <span>কাস্টমাইজেশন অপশন (Generator Settings)</span>
            </div>
            <Badge variant="outline" className="text-xs font-bold border-border bg-secondary">
              {loremType === "lorem" ? "Pseudo-Bangla Lorem" : "Natural Bangla"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Paragraphs Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span>অনুচ্ছেদ (Paragraphs):</span>
                <span className="text-primary font-black text-sm">{paragraphs}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value, 10))}
                className="w-full accent-primary cursor-pointer h-2 bg-secondary rounded-lg"
              />
            </div>

            {/* Words per Paragraph Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                <span>শব্দ সংখ্যা (Words/Paragraph):</span>
                <span className="text-primary font-black text-sm">{wordsPerParagraph}</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={wordsPerParagraph}
                onChange={(e) => setWordsPerParagraph(parseInt(e.target.value, 10))}
                className="w-full accent-primary cursor-pointer h-2 bg-secondary rounded-lg"
              />
            </div>

            {/* Text Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground block">
                টেক্সট ধরন (Lorem Mode):
              </label>
              <select
                value={loremType}
                onChange={(e) => setLoremType(e.target.value as "lorem" | "natural")}
                className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-foreground text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value="lorem">ক্লাসিক ফোনেটিক লরেম (লরেম ইপসাম...)</option>
                <option value="natural">৩,০০০+ বাংলা শব্দভাণ্ডার (Natural Bangla DB)</option>
              </select>
            </div>
          </div>

          {/* Vocabulary Tier Selector (Shown when Natural Bangla DB mode is selected) */}
          {loremType === "natural" && (
            <div className="p-4 bg-secondary/50 border border-border rounded-xl space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span>বাংলা শব্দভাণ্ডারের স্তর (3,000+ Words DB Tier):</span>
                <Badge variant="outline" className="text-[10px] border-primary text-primary font-bold">
                  {level === "all" ? "All 3,000 Words" : `Tier ${level}`}
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "all", label: "সকল ৩,০০০ শব্দ" },
                  { id: 1, label: "লেভেল ১ (সহজ শব্দ)" },
                  { id: 2, label: "লেভেল ২ (দাপ্তরিক শব্দ)" },
                  { id: 3, label: "লেভেল ৩ (যুক্তবর্ণ শব্দ)" },
                ].map((tier) => {
                  const isSelected = level === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setLevel(tier.id as 1 | 2 | 3 | "all")}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border text-center cursor-pointer ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-card text-muted-foreground border-border hover:text-foreground"
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons & Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIncludeHtml(!includeHtml)}
                variant={includeHtml ? "default" : "outline"}
                size="sm"
                className="font-bold text-xs gap-1.5 h-9 rounded-xl border-border"
              >
                <Code size={14} />
                <span>HTML &lt;p&gt; ট্যাগসহ</span>
              </Button>

              <Button
                onClick={generateContent}
                variant="outline"
                size="sm"
                className="font-bold text-xs gap-1.5 h-9 rounded-xl border-border cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>পুনরায় জেনারেট</span>
              </Button>
            </div>

            <Button
              onClick={handleCopy}
              className="bg-primary text-primary-foreground font-black text-xs gap-2 h-10 px-6 rounded-xl shadow-xs cursor-pointer hover:opacity-95"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>কপি সম্পন্ন!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>টেক্সট কপি করুন</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Text Area Card */}
      <Card className="border border-border bg-card shadow-xs rounded-2xl relative overflow-hidden">
        <div className="px-6 py-3 bg-secondary border-b border-border flex items-center justify-between">
          <span className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} className="text-primary" />
            <span>জেনারেটেড টেক্সট আউটপুট</span>
          </span>
          <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
            <span>শব্দ: <strong className="text-foreground">{totalWords}</strong></span>
            <span>•</span>
            <span>অক্ষর: <strong className="text-foreground">{totalChars}</strong></span>
          </div>
        </div>
        <CardContent className="p-6">
          <textarea
            readOnly
            value={generatedText}
            rows={10}
            className="w-full bg-transparent text-foreground text-sm sm:text-base leading-relaxed resize-none focus:outline-none font-mono"
          />
        </CardContent>
      </Card>

      {/* SEO Information Footer Section */}
      <section className="border border-border bg-card rounded-2xl p-6 sm:p-8 space-y-4 text-muted-foreground text-xs sm:text-sm shadow-xs">
        <h2 className="text-lg font-black text-foreground">বাংলা লরেম ইপসাম (Bangla Lorem Ipsum) কী এবং কেন প্রয়োজন?</h2>
        <p className="leading-relaxed">
          লরেম ইপসাম (Lorem Ipsum) হলো বিশ্বব্যাপী ওয়েব ডিজাইন, টাইপোগ্রাফি এবং মুদ্রণ শিল্পে ব্যবহৃত স্ট্যান্ডার্ড ডামি বা ফিলার টেক্সট। 
          ওয়েবসাইট বা অ্যাপ ডিজাইনের প্রাথমিক ধাপে মূল কনটেন্ট তৈরি না হওয়া পর্যন্ত আউটলুক ও ইউআই টাইপোগ্রাফি মূল্যায়নের জন্য এই টেক্সট ব্যবহৃত হয়।
        </p>
        <p className="leading-relaxed">
          TypeBangla-এর এই <strong>বাংলা লরেম ইপসাম জেনারেটর</strong> ইউজার ফ্রেন্ডলি অপশনের সাহায্যে রিয়েল-টাইমে ফিলার টেক্সট এবং HTML ট্যাগসহ ডামি প্যারাগ্রাফ তৈরি করতে সাহায্য করে।
        </p>
      </section>
    </main>
  );
}
