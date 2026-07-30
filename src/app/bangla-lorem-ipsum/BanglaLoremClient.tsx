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
        includePunctuation: true,
      });
      resultArr.push(includeHtml ? `<p>${pText}</p>` : pText);
    }
    setGeneratedText(resultArr.join(includeHtml ? "\n\n" : "\n\n"));
  };

  useEffect(() => {
    generateContent();
  }, [paragraphs, wordsPerParagraph, level, includeHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 text-sm rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> SEO Tool
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            বাংলা লরেম ইপসাম জেনারেটর
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            ওয়েবসাইট ডিজাইন, ইউআই/ইউএক্স মকআপ এবং প্রিন্ট ডিজাইনের জন্য মানসম্পন্ন বাংলা ডামি টেক্সট তৈরি করুন।
          </p>
        </div>

        {/* Controls Card */}
        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg border-b border-slate-800 pb-3">
              <Sliders className="w-5 h-5" /> কাস্টমাইজেশন অপশন
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Paragraphs Slider */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex justify-between">
                  <span>অনুচ্ছেদ (Paragraphs):</span>
                  <span className="text-emerald-400 font-bold">{paragraphs}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={paragraphs}
                  onChange={(e) => setParagraphs(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer bg-slate-800 h-2 rounded-lg"
                />
              </div>

              {/* Words per Paragraph Slider */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex justify-between">
                  <span>শব্দ সংখ্যা (Words/Paragraph):</span>
                  <span className="text-emerald-400 font-bold">{wordsPerParagraph}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={wordsPerParagraph}
                  onChange={(e) => setWordsPerParagraph(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer bg-slate-800 h-2 rounded-lg"
                />
              </div>

              {/* Vocabulary Level Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">
                  শব্দভাণ্ডারের স্তর (Vocabulary Tier):
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value === "all" ? "all" : (parseInt(e.target.value, 10) as 1 | 2 | 3))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">সকল ৩,০০০ শব্দ (মিশ্র)</option>
                  <option value="1">লেভেল ১ (সহজ মৌলিক শব্দ)</option>
                  <option value="2">লেভেল ২ (মধ্যম দাপ্তরিক শব্দ)</option>
                  <option value="3">লেভেল ৩ (কঠিন যুক্তবর্ণ শব্দ)</option>
                </select>
              </div>
            </div>

            {/* Action Buttons & Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setIncludeHtml(!includeHtml)}
                  variant={includeHtml ? "default" : "outline"}
                  size="sm"
                  className={includeHtml ? "bg-emerald-600 hover:bg-emerald-500" : "border-slate-700 text-slate-300 hover:bg-slate-800"}
                >
                  <Code className="w-4 h-4 mr-1.5" /> HTML &lt;p&gt; ট্যাগ
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={generateContent}
                  variant="outline"
                  size="sm"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <RefreshCw className="w-4 h-4 mr-1.5" /> নতুনভাবে জেনারেট
                </Button>
                <Button
                  onClick={handleCopy}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                  size="sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" /> কপি সম্পন্ন!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1.5" /> কপি করুন
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Text Area */}
        <Card className="bg-slate-900 border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="px-6 py-3 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" /> আউটপুট টেক্সট ({paragraphs * wordsPerParagraph} শব্দ)
            </span>
          </div>
          <CardContent className="p-6">
            <textarea
              readOnly
              value={generatedText}
              rows={10}
              className="w-full bg-transparent text-slate-200 text-base leading-relaxed resize-none focus:outline-none font-sans"
            />
          </CardContent>
        </Card>

        {/* SEO Information Footer Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4 text-slate-400 text-sm">
          <h2 className="text-lg font-bold text-slate-200">বাংলা লরেম ইপসাম কী এবং কেন ব্যবহৃত হয়?</h2>
          <p>
            লরেম ইপসাম (Lorem Ipsum) হলো বিশ্বব্যাপী ওয়েব ডিজাইন, টাইপোগ্রাফি এবং পাবলিশিং ইন্ডাস্ট্রিতে ব্যবহৃত ডামি বা ফিলার টেক্সট। 
            ডিজাইন প্রক্রিয়ায় মূল কনটেন্ট উপস্থিত না থাকলে ভিজ্যুয়াল আউটলুক ও লেআউট প্রদর্শনের জন্য ডামি টেক্সট ব্যবহার করা হয়।
          </p>
          <p>
            TypeMaster-এর এই **বাংলা লরেম ইপসাম জেনারেটর** টুলটি ৩,০০০টি বিশুদ্ধ ও উচ্চ-ফ্রিকোয়েন্সি বাংলা শব্দের ডাটাবেজ থেকে র্যান্ডম বাক্য তৈরি করে, 
            যা আপনার ডিজাইনে প্রাকৃতিক বাংলা লেখার অনুভূতি ফুটিয়ে তোলে।
          </p>
        </div>

      </div>
    </div>
  );
}
